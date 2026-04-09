'use client';

import { apiURL } from '@utils/api-url';
import axios, { AxiosError } from 'axios';

export interface ApiResponse<T = unknown> {
  data: T;
  message: string;
}

export const handleError = (error: AxiosError<ApiResponse>) => {
  const pathName = globalThis?.location.pathname;
  const normalizedPathName =
    process.env.NEXT_PUBLIC_BASE_PATH && pathName.startsWith(process.env.NEXT_PUBLIC_BASE_PATH) ?
      pathName.replace(process.env.NEXT_PUBLIC_BASE_PATH, '')
    : pathName;
  //TODO: Refactor to be more compliant with NextJS routing standards
  if (error?.response?.status === 401 && !normalizedPathName.startsWith('/login')) {
    globalThis.location.href = `${process.env?.NEXT_PUBLIC_BASE_PATH}/login?path=${globalThis.location.pathname}&failMessage=${error.response.data.message}`;
  }
  throw error;
};

const defaultOptions = {
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const get = <T>(url: string, options?: { [key: string]: any }) =>
  axios.get<T>(apiURL(url), { ...defaultOptions, ...options }).catch(handleError);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const post = <T, D = any>(url: string, data: D, options?: { [key: string]: any }) => {
  return axios.post<T>(apiURL(url), data, { ...defaultOptions, ...options }).catch(handleError);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const remove = <T>(url: string, options?: { [key: string]: any }) => {
  return axios.delete<T>(apiURL(url), { ...defaultOptions, ...options }).catch(handleError);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const patch = <T, D = any>(url: string, data: D, options?: { [key: string]: any }) => {
  return axios.patch<T>(apiURL(url), data, { ...defaultOptions, ...options }).catch(handleError);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const put = <T, D = any>(url: string, data: D, options?: { [key: string]: any }) => {
  return axios.put<T>(apiURL(url), data, { ...defaultOptions, ...options }).catch(handleError);
};

export const apiService = { get, post, put, patch, delete: remove };
