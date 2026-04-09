'use client';

import LoaderFullScreen from '@components/loader/loader-fullscreen';
import EmptyLayout from '@layouts/empty-layout/empty-layout.component';
import { Button, FormErrorMessage } from '@sk-web-gui/react';
import { appURL } from '@utils/app-url';
import { loginUrl } from '@utils/login-url';
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
  const { t } = useTranslation();

  const isLoggedOut = searchParams.get('loggedout') === '';
  const failMessage = searchParams.get('failMessage');

  const initalFocus = useRef<HTMLButtonElement>(null);
  const setInitalFocus = () => {
    setTimeout(() => {
      initalFocus?.current?.focus();
    });
  };

  const onLogin = () => {
    const searchPath = searchParams.get('path');
    const nonLoginPath = !pathName?.match(/\/login/) && pathName; // Contains path as long as it's not /login
    const nonLoginSearch = !searchPath?.match(/\/login|\/logout/) && searchPath; // Contains redirect path as long as it's not /login or /logout
    const path = nonLoginPath || nonLoginSearch || '/';

    const url = new URL(loginUrl);
    const queries = new URLSearchParams({
      successRedirect: `${appURL(path as string)}`,
      failureRedirect: `${appURL()}/login`,
    });
    url.search = queries.toString();
    // NOTE: send user to login with SSO
    router.push(url.toString());
  };

  useEffect(() => {
    setInitalFocus();
    if (!router) return;

    if (isLoggedOut) {
      router.push('/login');
      setIsLoading(false);
    } else {
      if (!failMessage && autoLogin) {
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
        <div className="flex items-center justify-center min-h-lvh">
          <div className="max-w-5xl w-full flex flex-col p-20 text-center items-center">
            <div className="mb-14">
              <h1 className="mb-10 text-display-3-sm md:text-display-3-md xl:text-display-3-lg">
                {t('common:app_name')}
              </h1>
              <p className="my-0">{t('login:description')}</p>
            </div>

            <Button onClick={() => onLogin()} ref={initalFocus} data-cy="loginButton" className="w-fit">
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
