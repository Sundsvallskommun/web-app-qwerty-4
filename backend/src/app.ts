import {
  APP_NAME,
  BASE_URL_PREFIX,
  CREDENTIALS,
  LOG_FORMAT,
  NODE_ENV,
  ORIGIN,
  PORT,
  SAML_CALLBACK_URL,
  SAML_ENTRY_SSO,
  SAML_FAILURE_REDIRECT,
  SAML_IDP_PUBLIC_CERT,
  SAML_ISSUER,
  SAML_LOGOUT_CALLBACK_URL,
  SAML_PRIVATE_KEY,
  SAML_PUBLIC_KEY,
  SAML_SUCCESS_REDIRECT,
  SECRET_KEY,
  SESSION_MEMORY,
  SWAGGER_ENABLED,
} from '@config';
import errorMiddleware from '@middlewares/error.middleware';
import { Strategy, VerifiedCallback } from '@node-saml/passport-saml';
import {
  addFailMessage,
  clearAuthenticatedSession,
  clearAuthFlowSession,
  getAuthRedirectsFromRelayState,
  getAuthRedirectsFromRequest,
  getAuthRedirectsFromSession,
  getRedirectUrl,
} from '@utils/auth.util';
import { logger, stream } from '@utils/logger';
import bodyParser from 'body-parser';
import 'class-transformer/cjs/storage';
// @ts-ignore - class-transformer/cjs/storage doesn't have proper types
const { defaultMetadataStorage } = require('class-transformer/cjs/storage');
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import session, { Store } from 'express-session';
import { existsSync, mkdirSync } from 'fs';
import helmet from 'helmet';
import hpp from 'hpp';
import createMemoryStore from 'memorystore';
import morgan from 'morgan';
import passport from 'passport';
import { join } from 'path';
import 'reflect-metadata';
import { getMetadataArgsStorage, useExpressServer } from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import createFileStore from 'session-file-store';
import swaggerUi from 'swagger-ui-express';
import EneoAuthService from './services/eneo-auth.service';
import { HttpException } from './exceptions/HttpException';
import { Profile } from './interfaces/profile.interface';
import { User } from './interfaces/users.interface';
import { additionalConverters } from './utils/custom-validation-classes';

const corsWhitelist = ORIGIN?.split(',') ?? [];
const isDevelopment = NODE_ENV === 'development';
const eneoAuthService = new EneoAuthService();
// @ts-ignore - Type conflict between @types/express-session versions is expected
const SessionStoreCreate = SESSION_MEMORY ? createMemoryStore(session) : createFileStore(session);
const sessionTTL = 31 * 24 * 60 * 60;
// NOTE: memory uses ms while file uses seconds
const sessionStore = new (SessionStoreCreate as any)(SESSION_MEMORY ? { checkPeriod: sessionTTL * 1000 } : { path: './data/sessions' }) as Store;

passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user: User, done) {
  done(null, user);
});

const samlStrategy = isDevelopment
  ? new Strategy(
      {
        disableRequestedAuthnContext: true,
        identifierFormat: 'urn:oasis:names:tc:SAML:2.0:nameid-format:transient',
        callbackUrl: SAML_CALLBACK_URL || '',
        entryPoint: SAML_ENTRY_SSO,
        // decryptionPvk: SAML_PRIVATE_KEY,
        privateKey: SAML_PRIVATE_KEY,
        // Identity Provider's public key
        idpCert: SAML_IDP_PUBLIC_CERT || '',
        issuer: SAML_ISSUER || '',
        wantAssertionsSigned: false,
        wantAuthnResponseSigned: false,
        acceptedClockSkewMs: 1000,
        audience: false,
        logoutCallbackUrl: SAML_LOGOUT_CALLBACK_URL,
      },
      async function (profile: Profile, done: VerifiedCallback) {
        if (!profile) {
          return done({
            name: 'SAML_MISSING_PROFILE',
            message: 'Missing SAML profile',
          });
        }
        const { givenName, surname, citizenIdentifier, username } = profile;

        if (!givenName || !surname || !citizenIdentifier) {
          return done({
            name: 'SAML_MISSING_ATTRIBUTES',
            message: 'Missing profile attributes',
          });
        }

        try {
          const findUser: User = {
            username: username,
            name: `${givenName} ${surname}`,
            givenName: givenName,
            surname: surname,
          };

          done(null, findUser);
        } catch (err) {
          if (err instanceof HttpException && err?.status === 404) {
            // Handle missing person form Citizen
            done(err);
          }
          done({ name: 'UNKNOWN_ERROR', message: 'UNKNOWN_ERROR' });
        }
      } as any,
      async function (_profile: Profile, done: VerifiedCallback) {
        return done(null, {});
      } as any,
    )
  : null;

class App {
  public app: express.Application;
  public env: string;
  public port: string | number;
  public swaggerEnabled: boolean;

  constructor(Controllers: Function[]) {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 3000;
    this.swaggerEnabled = SWAGGER_ENABLED || false;

    this.initializeDataFolders();

    this.initializeMiddlewares();
    this.initializeRoutes(Controllers);
    if (this.swaggerEnabled) {
      this.initializeSwagger(Controllers);
    }
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    this.app.use(morgan(LOG_FORMAT ?? 'dev', { stream }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());

    this.app.use(
      session({
        secret: SECRET_KEY ?? '',
        resave: false,
        saveUninitialized: false,
        store: sessionStore as Store,
        cookie: {
          sameSite: 'lax',
        },
      }),
    );

    this.app.use(passport.initialize());
    this.app.use(passport.session());
    if (samlStrategy) {
      passport.use('saml', samlStrategy as any);
    }

    this.app.use(
      cors({
        credentials: CREDENTIALS,
        origin: function (origin, callback) {
          if (origin === undefined || corsWhitelist.indexOf(origin) !== -1 || corsWhitelist.indexOf('*') !== -1) {
            callback(null, true);
          } else {
            if (NODE_ENV == 'development') {
              callback(null, true);
            } else {
              callback(new Error('Not allowed by CORS'));
            }
          }
        },
      }),
    );

    if (isDevelopment) {
      this.initializeDevelopmentAuthRoutes();
    } else {
      this.initializeProductionAuthRoutes();
    }
  }

  private initializeDevelopmentAuthRoutes() {
    this.app.get(
      `${BASE_URL_PREFIX}/saml/login`,
      (req, res, next) => {
        if (req.session.returnTo) {
          req.query.RelayState = req.session.returnTo;
        } else if (req.query.successRedirect) {
          req.query.RelayState = req.query.successRedirect;
        }
        if (req.query.failureRedirect) {
          req.query.RelayState = `${req.query.RelayState},${req.query.failureRedirect}`;
        }
        next();
      },
      (req, res, next) => {
        passport.authenticate('saml', {
          failureRedirect: SAML_FAILURE_REDIRECT,
        })(req, res, next);
      },
    );

    this.app.get(`${BASE_URL_PREFIX}/saml/metadata`, (req, res) => {
      res.type('application/xml');
      const metadata = samlStrategy!.generateServiceProviderMetadata(SAML_PUBLIC_KEY ?? '', SAML_PUBLIC_KEY ?? '');
      res.status(200).send(metadata);
    });

    this.app.get(
      `${BASE_URL_PREFIX}/saml/logout`,
      (req, res, next) => {
        if (req.session.returnTo) {
          req.query.RelayState = req.session.returnTo;
        } else if (req.query.successRedirect) {
          req.query.RelayState = req.query.successRedirect;
        }
        next();
      },
      (req, res, next) => {
        const successRedirect = getRedirectUrl(req.query.successRedirect, SAML_SUCCESS_REDIRECT).toString();

        samlStrategy!.logout(req as any, () => {
          clearAuthenticatedSession(req, res, err => {
            if (err) {
              return next(err);
            }
            res.redirect(successRedirect);
          });
        });
      },
    );

    this.app.get(`${BASE_URL_PREFIX}/saml/logout/callback`, bodyParser.urlencoded({ extended: false }), (req, res, next) => {
      const failMessage = req.session.messages?.[0] || 'NOT_AUTHORIZED';

      clearAuthenticatedSession(req, res, err => {
        if (err) {
          return next(err);
        }

        const { failureRedirect } = getAuthRedirectsFromRelayState(req.body?.RelayState);
        res.redirect(addFailMessage(failureRedirect, failMessage).toString());
      });
    });

    this.app.post(`${BASE_URL_PREFIX}/saml/login/callback`, bodyParser.urlencoded({ extended: false }), (req, res, next) => {
      const { successRedirect, failureRedirect } = getAuthRedirectsFromRelayState(req.body?.RelayState);

      passport.authenticate('saml', (err: any, user: any) => {
        if (err) {
          res.redirect(addFailMessage(failureRedirect, err?.name || 'NOT_AUTHORIZED').toString());
        } else if (!user) {
          res.redirect(addFailMessage(failureRedirect, 'NO_USER').toString());
        } else {
          req.session.regenerate(sessionErr => {
            if (sessionErr) {
              return next(sessionErr);
            }

            req.login(user, loginErr => {
              if (loginErr) {
                res.redirect(addFailMessage(failureRedirect, 'NOT_AUTHORIZED').toString());
                return;
              }
              return res.redirect(successRedirect.toString());
            });
          });
        }
      })(req, res, next);
    });
  }

  private initializeProductionAuthRoutes() {
    this.app.get(`${BASE_URL_PREFIX}/auth/login`, async (req, res, next) => {
      const { successRedirect, failureRedirect } = getAuthRedirectsFromRequest(req);

      try {
        const { authorization_url, state } = await eneoAuthService.initiateAuth(SAML_CALLBACK_URL || '');

        req.session.authState = state;
        req.session.authSuccessRedirect = successRedirect.toString();
        req.session.authFailureRedirect = failureRedirect.toString();

        req.session.save(saveErr => {
          if (saveErr) {
            return next(saveErr);
          }

          return res.redirect(authorization_url);
        });
      } catch (error) {
        logger.error('Error initiating production auth flow:', error);
        res.redirect(addFailMessage(failureRedirect, 'NOT_AUTHORIZED').toString());
      }
    });

    this.app.get(`${BASE_URL_PREFIX}/auth/logout`, (req, res, next) => {
      const successRedirect = getRedirectUrl(req.query.successRedirect, SAML_SUCCESS_REDIRECT);

      clearAuthenticatedSession(req, res, err => {
        if (err) {
          return next(err);
        }

        res.redirect(successRedirect.toString());
      });
    });

    this.app.get(`${BASE_URL_PREFIX}/auth/login/callback`, async (req, res, next) => {
      const { successRedirect, failureRedirect } = getAuthRedirectsFromSession(req);
      const code = typeof req.query.code === 'string' ? req.query.code : undefined;
      const state = typeof req.query.state === 'string' ? req.query.state : undefined;

      if (!code || !state || !req.session.authState || state !== req.session.authState) {
        clearAuthFlowSession(req);
        req.session.save(() => {
          res.redirect(addFailMessage(failureRedirect, 'NOT_AUTHORIZED').toString());
        });
        return;
      }

      try {
        const authTokenResponse = await eneoAuthService.callbackAuth({ code, state });
        const authToken = typeof authTokenResponse === 'string' ? authTokenResponse : authTokenResponse?.access_token;
        const user = await eneoAuthService.getSessionUser(authToken);

        req.session.regenerate(sessionErr => {
          if (sessionErr) {
            return next(sessionErr);
          }

          req.session.authToken = authToken;
          req.session.user = user;
          req.session.messages = [];
          req.user = user;

          req.session.save(saveErr => {
            if (saveErr) {
              return next(saveErr);
            }

            return res.redirect(successRedirect.toString());
          });
        });
      } catch (error) {
        logger.error('Error completing production auth callback:', error);
        clearAuthFlowSession(req);
        req.session.save(() => {
          res.redirect(addFailMessage(failureRedirect, 'NO_USER').toString());
        });
      }
    });
  }

  private initializeRoutes(controllers: Function[]) {
    useExpressServer(this.app, {
      routePrefix: BASE_URL_PREFIX,
      controllers: controllers,
      defaultErrorHandler: false,
    });
  }

  private initializeSwagger(controllers: Function[]) {
    const schemas = validationMetadatasToSchemas({
      classTransformerMetadataStorage: defaultMetadataStorage,
      refPointerPrefix: '#/components/schemas/',
      additionalConverters: additionalConverters,
    });

    const routingControllersOptions = {
      routePrefix: `${BASE_URL_PREFIX}`,
      controllers: controllers,
    };

    const storage = getMetadataArgsStorage();
    const spec = routingControllersToSpec(storage, routingControllersOptions, {
      components: {
        schemas: schemas as { [schema: string]: any },
        securitySchemes: {
          basicAuth: {
            scheme: 'basic',
            type: 'http',
          },
        },
      },
      info: {
        title: `${APP_NAME} Proxy API`,
        description: '',
        version: '1.0.0',
      },
    });

    this.app.use(`${BASE_URL_PREFIX}/swagger.json`, (req: express.Request, res: express.Response) => {
      res.json(spec);
    });
    this.app.use(`${BASE_URL_PREFIX}/api-docs`, swaggerUi.serve, swaggerUi.setup(spec));
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private initializeDataFolders() {
    const databaseDir: string = join(__dirname, '../data/database');
    if (!existsSync(databaseDir)) {
      mkdirSync(databaseDir, { recursive: true });
    }
    const logsDir: string = join(__dirname, '../data/logs');
    if (!existsSync(logsDir)) {
      mkdirSync(logsDir, { recursive: true });
    }
    const sessionsDir: string = join(__dirname, '../data/sessions');
    if (!existsSync(sessionsDir)) {
      mkdirSync(sessionsDir, { recursive: true });
    }
  }
}

export default App;
