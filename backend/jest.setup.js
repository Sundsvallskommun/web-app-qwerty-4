process.env.NODE_ENV = process.env.NODE_ENV || 'test';
process.env.APP_NAME = process.env.APP_NAME || 'backend-test';
process.env.BASE_URL_PREFIX = process.env.BASE_URL_PREFIX || '/api';
process.env.CREDENTIALS = process.env.CREDENTIALS || 'true';
process.env.LOG_FORMAT = process.env.LOG_FORMAT || 'dev';
process.env.LOG_DIR = process.env.LOG_DIR || 'data/logs';
process.env.ORIGIN = process.env.ORIGIN || 'http://localhost:3000';
process.env.PORT = process.env.PORT || '3000';
process.env.SECRET_KEY = process.env.SECRET_KEY || 'test-secret';
process.env.SESSION_MEMORY = process.env.SESSION_MEMORY || 'true';
process.env.SWAGGER_ENABLED = process.env.SWAGGER_ENABLED || 'false';
process.env.API_BASE_URL = process.env.API_BASE_URL || 'http://localhost';
process.env.CLIENT_KEY = process.env.CLIENT_KEY || 'client-key';
process.env.CLIENT_SECRET = process.env.CLIENT_SECRET || 'client-secret';
process.env.SAML_CALLBACK_URL = process.env.SAML_CALLBACK_URL || 'http://localhost/api/saml/login/callback';
process.env.SAML_SUCCESS_REDIRECT = process.env.SAML_SUCCESS_REDIRECT || 'http://localhost/login';

