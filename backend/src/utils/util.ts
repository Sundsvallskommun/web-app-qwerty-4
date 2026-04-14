import { API_BASE_URL, BASE_URL_PREFIX } from '@config';
/**
 * @method isEmpty
 * @param {String | Number | Object} value
 * @returns {Boolean} true & false
 * @description this value is Empty Check
 */
export const isEmpty = (value: string | number | object): boolean => {
  if (value === null) {
    return true;
  } else if (typeof value !== 'number' && value === '') {
    return true;
  } else if (typeof value === 'undefined' || value === undefined) {
    return true;
  } else if (value !== null && typeof value === 'object' && !Object.keys(value).length) {
    return true;
  } else {
    return false;
  }
};

export const localApi = (...parts: string[]): string => {
  const urlParts = [BASE_URL_PREFIX, ...parts];
  return urlParts.map(pathPart => pathPart?.replace(/(\/$)/g, '')).join('/');
};

export const apiURL = (...parts: string[]): string => {
  const urlParts = [API_BASE_URL, ...parts];
  const trailingSlash = parts?.at(-1)?.endsWith('/') ? '/' : '';
  return urlParts.map(pathPart => pathPart?.replace(/(^\/|\/$)/g, '')).join('/') + trailingSlash;
};

export const isValidUrl = (string: string) => {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === 'http:' || url.protocol === 'https:';
};
