import type { AxiosError } from 'axios';

interface ApiResponseLike {
  message?: string;
}

const LOGIN_PATH_SUFFIXES = ['/login', '/login/popup-complete', '/logout'];

const isAuthFailure = (status?: number, message?: string) => {
  return status === 401 || message === 'NOT_AUTHORIZED' || message === 'AUTH_FAILED';
};

const isPublicAuthPath = (pathname: string) => {
  return LOGIN_PATH_SUFFIXES.some((suffix) => pathname.endsWith(suffix));
};

const getCurrentPath = (location: Location) => {
  return `${location.pathname}${location.search}${location.hash}`;
};

const getLoginPath = () => {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
  return `${basePath}/login`;
};

export const redirectToLoginOnAuthFailure = (error: unknown): boolean => {
  if (!globalThis.location) {
    return false;
  }

  const axiosError = error as AxiosError<ApiResponseLike> | undefined;
  const status = axiosError?.response?.status;
  const message = axiosError?.response?.data?.message;

  if (!isAuthFailure(status, message)) {
    return false;
  }

  const { location } = globalThis;

  if (isPublicAuthPath(location.pathname)) {
    return true;
  }

  const params = new URLSearchParams({
    path: getCurrentPath(location),
  });

  if (message) {
    params.set('failMessage', message);
  }

  location.assign(`${getLoginPath()}?${params.toString()}`);
  return true;
};
