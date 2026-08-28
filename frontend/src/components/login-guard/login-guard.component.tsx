'use client';

import LoaderFullScreen from '@components/loader/loader-fullscreen';
import { useUserStore } from '@services/user/user.service';
import { useAssistantStore } from '@sk-web-gui/ai';
import { redirectToLoginOnAuthFailure } from '@utils/auth-redirect';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

interface LoginGuardProps {
  children?: React.ReactNode;
}

export const LoginGuard: React.FC<LoginGuardProps> = ({ children }) => {
  const user = useUserStore((state) => state.user);
  const getMe = useUserStore((state) => state.getMe);
  const resetUser = useUserStore((state) => state.reset);
  const setApiBaseUrl = useAssistantStore((state) => state.setApiBaseUrl);
  const setStream = useAssistantStore((state) => state.setStream);
  const setApiServiceConfig = useAssistantStore((state) => state.setApiServiceConfig);
  const path = usePathname();
  const publicPaths = ['/login', '/login/popup-complete', '/logout'];
  const isPublicPath = publicPaths.some((publicPath) => path === publicPath || path.endsWith(publicPath));

  useEffect(() => {
    if (isPublicPath) {
      return;
    }

    void getMe().catch((error) => {
      resetUser();
      redirectToLoginOnAuthFailure(error);
    });
  }, [getMe, isPublicPath, resetUser]);

  useEffect(() => {
    setApiBaseUrl(process.env.NEXT_PUBLIC_API_URL ?? '');
  }, [setApiBaseUrl]);

  useEffect(() => {
    setStream(true);
  }, [setStream]);

  useEffect(() => {
    setApiServiceConfig({ credentials: 'include' });
  }, [setApiServiceConfig]);

  const showChildren = (user.name && user.username) || isPublicPath;

  return showChildren ? children : <LoaderFullScreen />;
};
