import { config } from 'dotenv';
import { APIS } from './api-config';

export { APIS };

config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const SWAGGER_ENABLED = process.env.SWAGGER_ENABLED === 'true';
export const SESSION_MEMORY = process.env.SESSION_MEMORY === 'true';
export const SAML_SUCCESS_REDIRECT = process.env.SAML_SUCCESS_REDIRECT ?? '/';
export const AZURE_REGION = process.env.AZURE_REGION ?? '';

export const {
  APP_NAME,
  NODE_ENV,
  PORT,
  API_BASE_URL,
  AZURE_SUBSCRIPTION_KEY,
  LOG_FORMAT,
  LOG_DIR,
  ORIGIN,
  SECRET_KEY,
  CLIENT_KEY,
  CLIENT_SECRET,
  BASE_URL_PREFIX,
  AUTH_CALLBACK_URL,
  SAML_CALLBACK_URL,
  SAML_LOGOUT_CALLBACK_URL,
  SAML_SUCCESS_BASE,
  SAML_FAILURE_REDIRECT,
  SAML_FAILURE_REDIRECT_MESSAGE,
  SAML_LOGOUT_REDIRECT,
  SAML_ENTRY_SSO,
  SAML_AUDIENCE,
  SAML_ISSUER,
  SAML_IDP_PUBLIC_CERT,
  SAML_PRIVATE_KEY,
  SAML_PUBLIC_KEY,
  ENEO_API_KEY,
  ENEO_TENANT_ID,
} = process.env;
