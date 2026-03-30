import { apiURL } from './api-url';

export const loginUrl = process.env.NODE_ENV === 'development' ? apiURL('/saml/login') : apiURL('/auth/login');
