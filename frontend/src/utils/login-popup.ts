export const LOGIN_POPUP_MESSAGE_TYPE = 'qwerty-login-popup-complete';
const LOGIN_POPUP_STORAGE_PREFIX = 'qwerty-login-popup';

export interface LoginPopupResult {
  type: typeof LOGIN_POPUP_MESSAGE_TYPE;
  flowId: string;
  redirectPath: string;
  failMessage?: string;
}

export const createLoginFlowId = (): string => {
  return globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`;
};

export const getLoginPopupStorageKey = (flowId: string): string => `${LOGIN_POPUP_STORAGE_PREFIX}:${flowId}`;

export const isLoginPopupResult = (value: unknown): value is LoginPopupResult => {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const result = value as Partial<LoginPopupResult>;
  return result.type === LOGIN_POPUP_MESSAGE_TYPE && typeof result.flowId === 'string';
};

export const isStandalonePwa = (): boolean => {
  const navigatorWithStandalone = navigator as Navigator & { standalone?: boolean };
  return window.matchMedia('(display-mode: standalone)').matches || navigatorWithStandalone.standalone === true;
};
