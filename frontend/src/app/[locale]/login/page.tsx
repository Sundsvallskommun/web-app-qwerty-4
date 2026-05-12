'use client';

import LoaderFullScreen from '@components/loader/loader-fullscreen';
import EmptyLayout from '@layouts/empty-layout/empty-layout.component';
import { Button, FormErrorMessage } from '@sk-web-gui/react';
import { appURL } from '@utils/app-url';
import { loginUrl } from '@utils/login-url';
import {
  createLoginFlowId,
  getLoginPopupStorageKey,
  isLoginPopupResult,
  isStandalonePwa,
} from '@utils/login-popup';
import type { LoginPopupResult } from '@utils/login-popup';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { capitalize } from 'underscore.string';

// Turn on/off automatic login
const autoLogin = true;

const Login: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isPwa, setIsPwa] = useState(false);
  const [isPopupLoginPending, setIsPopupLoginPending] = useState(false);
  const { t } = useTranslation();

  const isLoggedOut = searchParams.get('loggedout') === '';
  const failMessage = searchParams.get('failMessage');

  const initalFocus = useRef<HTMLButtonElement>(null);
  const loginPopup = useRef<Window | null>(null);
  const loginPopupFlowId = useRef<string | null>(null);
  const loginPopupClosedTimer = useRef<number | undefined>(undefined);

  const setInitalFocus = () => {
    setTimeout(() => {
      initalFocus?.current?.focus();
    });
  };

  const clearLoginPopupClosedTimer = () => {
    if (loginPopupClosedTimer.current) {
      window.clearInterval(loginPopupClosedTimer.current);
      loginPopupClosedTimer.current = undefined;
    }
  };

  const getRedirectPath = () => {
    const searchPath = searchParams.get('path');
    const nonLoginPath = !pathName?.match(/\/login/) && pathName; // Contains path as long as it's not /login
    const nonLoginSearch = !searchPath?.match(/\/login|\/logout/) && searchPath; // Contains redirect path as long as it's not /login or /logout
    return (nonLoginPath || nonLoginSearch || '/').toString();
  };

  const getLoginUrl = (successRedirect: string, failureRedirect: string) => {
    const url = new URL(loginUrl);
    const queries = new URLSearchParams({
      successRedirect,
      failureRedirect,
    });
    url.search = queries.toString();
    return url.toString();
  };

  const navigateToLogin = (redirectPath: string) => {
    // NOTE: external auth should use full-page navigation (not Next router navigation)
    // to preserve expected behavior in mobile standalone contexts.
    window.location.assign(getLoginUrl(`${appURL(redirectPath)}`, `${appURL()}/login`));
  };

  const onPopupLoginComplete = (result: LoginPopupResult) => {
    if (result.flowId !== loginPopupFlowId.current) {
      return;
    }

    clearLoginPopupClosedTimer();
    loginPopupFlowId.current = null;
    setIsPopupLoginPending(false);
    window.localStorage.removeItem(getLoginPopupStorageKey(result.flowId));

    if (loginPopup.current && !loginPopup.current.closed) {
      loginPopup.current.close();
    }

    window.focus();
    loginPopup.current = null;

    if (result.failMessage) {
      setErrorMessage(t(`login:errors.${result.failMessage}`));
      setIsLoading(false);
      setInitalFocus();
      return;
    }

    window.location.assign(appURL(result.redirectPath));
  };

  const openLoginPopup = (redirectPath: string) => {
    const flowId = createLoginFlowId();
    const completionUrl = new URL(appURL('/login/popup-complete'));
    completionUrl.searchParams.set('flowId', flowId);
    completionUrl.searchParams.set('redirectPath', redirectPath);

    const authUrl = getLoginUrl(completionUrl.toString(), completionUrl.toString());
    const popup = window.open(authUrl, `qwerty-login-${flowId}`, 'popup,width=500,height=720');

    if (!popup) {
      navigateToLogin(redirectPath);
      return;
    }

    setErrorMessage('');
    setIsPopupLoginPending(true);
    loginPopup.current = popup;
    loginPopupFlowId.current = flowId;
    popup.focus();

    clearLoginPopupClosedTimer();
    loginPopupClosedTimer.current = window.setInterval(() => {
      if (loginPopup.current?.closed && loginPopupFlowId.current === flowId) {
        clearLoginPopupClosedTimer();
        loginPopup.current = null;
        loginPopupFlowId.current = null;
        setIsPopupLoginPending(false);
        setInitalFocus();
      }
    }, 500);
  };

  const onLogin = () => {
    const redirectPath = getRedirectPath();

    if (isPwa) {
      openLoginPopup(redirectPath);
      return;
    }

    navigateToLogin(redirectPath);
  };

  useEffect(() => {
    setIsPwa(isStandalonePwa());
    setInitalFocus();
    if (!router) return;

    if (isLoggedOut) {
      router.push('/login');
      setIsLoading(false);
    } else {
      if (!failMessage && autoLogin && !isStandalonePwa()) {
        // autologin
        onLogin();
      } else if (failMessage) {
        setErrorMessage(t(`login:errors.${failMessage}`));
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin || !isLoginPopupResult(event.data)) {
        return;
      }

      onPopupLoginComplete(event.data);
    };

    const onStorage = (event: StorageEvent) => {
      if (!loginPopupFlowId.current || event.key !== getLoginPopupStorageKey(loginPopupFlowId.current) || !event.newValue) {
        return;
      }

      try {
        const result = JSON.parse(event.newValue);
        if (isLoginPopupResult(result)) {
          onPopupLoginComplete(result);
        }
      } catch {
        return;
      }
    };

    window.addEventListener('message', onMessage);
    window.addEventListener('storage', onStorage);

    return () => {
      window.removeEventListener('message', onMessage);
      window.removeEventListener('storage', onStorage);
      clearLoginPopupClosedTimer();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t]);

  if (isLoading) {
    // to not flash the login-screen on autologin
    return (
      <EmptyLayout>
        <LoaderFullScreen />
      </EmptyLayout>
    );
  }

  return (
    <EmptyLayout>
      <main>
        <div className="flex items-center justify-center min-h-dvh">
          <div className="max-w-5xl w-full flex flex-col p-20 text-center items-center">
            <div className="mb-14">
              <h1 className="mb-10 text-display-3-sm md:text-display-3-md xl:text-display-3-lg">
                {t('common:app_name')}
              </h1>
              <p className="my-0">{t('login:description')}</p>
            </div>

            <Button
              onClick={() => onLogin()}
              ref={initalFocus}
              data-cy="loginButton"
              className="w-fit"
              disabled={isPopupLoginPending}
            >
              {capitalize(t('common:login'))}
            </Button>

            {errorMessage && <FormErrorMessage className="mt-lg">{errorMessage}</FormErrorMessage>}
          </div>
        </div>
      </main>
    </EmptyLayout>
  );
};

export default Login;
