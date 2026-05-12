'use client';

import EmptyLayout from '@layouts/empty-layout/empty-layout.component';
import { Button, FormErrorMessage } from '@sk-web-gui/react';
import { appURL } from '@utils/app-url';
import { getLoginPopupStorageKey, LOGIN_POPUP_MESSAGE_TYPE } from '@utils/login-popup';
import type { LoginPopupResult } from '@utils/login-popup';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { capitalize } from 'underscore.string';

const LoginPopupComplete: React.FC = () => {
  const searchParams = useSearchParams();
  const { t } = useTranslation();
  const [showFallback, setShowFallback] = useState(false);

  const flowId = searchParams.get('flowId') ?? '';
  const redirectPath = searchParams.get('redirectPath') ?? '/';
  const failMessage = searchParams.get('failMessage') ?? undefined;

  useEffect(() => {
    if (!flowId) {
      setShowFallback(true);
      return;
    }

    const result: LoginPopupResult = {
      type: LOGIN_POPUP_MESSAGE_TYPE,
      flowId,
      redirectPath,
      failMessage,
    };

    try {
      window.opener?.postMessage(result, window.location.origin);
    } catch {
      // The storage event below is the fallback for opener messaging.
    }

    try {
      window.localStorage.setItem(getLoginPopupStorageKey(flowId), JSON.stringify(result));
    } catch {
      // If storage is unavailable, the user still gets the fallback button.
    }

    window.setTimeout(() => {
      window.close();
      window.setTimeout(() => {
        setShowFallback(true);
      }, 250);
    }, 100);
  }, [failMessage, flowId, redirectPath]);

  const onContinue = () => {
    window.close();

    if (failMessage) {
      const loginPageUrl = new URL(appURL('/login'));
      loginPageUrl.searchParams.set('failMessage', failMessage);
      window.location.assign(loginPageUrl.toString());
      return;
    }

    window.location.assign(appURL(redirectPath));
  };

  if (!showFallback) {
    return null;
  }

  return (
    <EmptyLayout>
      <main>
        <div className="flex items-center justify-center min-h-dvh">
          <div className="max-w-3xl w-full flex flex-col p-20 text-center items-center">
            <div className="mb-14">
              <h1 className="mb-10 text-display-3-sm md:text-display-3-md xl:text-display-3-lg">
                {t('common:app_name')}
              </h1>
              <p className="my-0">{t(failMessage ? 'login:popup.failure' : 'login:popup.success')}</p>
            </div>

            <Button onClick={onContinue} className="w-fit">
              {capitalize(t('common:close'))}
            </Button>

            {failMessage && <FormErrorMessage className="mt-lg">{t(`login:errors.${failMessage}`)}</FormErrorMessage>}
          </div>
        </div>
      </main>
    </EmptyLayout>
  );
};

export default LoginPopupComplete;
