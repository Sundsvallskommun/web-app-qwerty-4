import { SAML_SUCCESS_REDIRECT } from '@config';
import express from 'express';
import { isValidOrigin } from './isValidOrigin';
import { isValidUrl } from './util';

const sessionCookieName = 'connect.sid';

export interface AuthRedirects {
  successRedirect: URL;
  failureRedirect: URL;
}

export const getRedirectUrl = (value: unknown, fallback: string): URL => {
  if (typeof value === 'string' && isValidUrl(value) && isValidOrigin(value)) {
    return new URL(value);
  }

  return new URL(fallback);
};

export const getAuthRedirectsFromRelayState = (relayState?: string): AuthRedirects => {
  const [successRedirectInput, failureRedirectInput] = relayState?.split(',') ?? [];
  const successRedirect = getRedirectUrl(successRedirectInput, SAML_SUCCESS_REDIRECT);
  const failureRedirect = getRedirectUrl(failureRedirectInput, successRedirect.toString());

  return { successRedirect, failureRedirect };
};

export const getAuthRedirectsFromRequest = (req: express.Request): AuthRedirects => {
  const successRedirectInput = req.session.returnTo || req.query.successRedirect;
  const failureRedirectInput = req.query.failureRedirect;
  const successRedirect = getRedirectUrl(successRedirectInput, SAML_SUCCESS_REDIRECT);
  const failureRedirect = getRedirectUrl(failureRedirectInput, successRedirect.toString());

  return { successRedirect, failureRedirect };
};

export const getAuthRedirectsFromSession = (req: express.Request): AuthRedirects => {
  const successRedirect = getRedirectUrl(req.session.authSuccessRedirect, SAML_SUCCESS_REDIRECT);
  const failureRedirect = getRedirectUrl(req.session.authFailureRedirect, successRedirect.toString());

  return { successRedirect, failureRedirect };
};

export const addFailMessage = (redirectUrl: URL, failMessage: string): URL => {
  const url = new URL(redirectUrl.toString());
  const queries = new URLSearchParams(url.searchParams);
  queries.set('failMessage', failMessage);
  url.search = queries.toString();

  return url;
};

export const clearAuthFlowSession = (req: express.Request) => {
  req.session.authState = undefined;
  req.session.authSuccessRedirect = undefined;
  req.session.authFailureRedirect = undefined;
};

export const clearAuthenticatedSession = (req: express.Request, res: express.Response, callback: (err?: Error) => void) => {
  const clearSession = () => {
    req.session.authToken = undefined;
    req.session.passport = undefined;
    req.session.user = undefined;
    req.session.messages = [];
    clearAuthFlowSession(req);

    req.session.destroy(destroyErr => {
      if (destroyErr) {
        callback(destroyErr);
        return;
      }

      res.clearCookie(sessionCookieName);
      callback();
    });
  };

  if (typeof req.logout === 'function') {
    req.logout(err => {
      if (err) {
        callback(err);
        return;
      }

      clearSession();
    });
    return;
  }

  clearSession();
};
