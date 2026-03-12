'use client';

import LoaderFullScreen from '@components/loader/loader-fullscreen';
import { useUserStore } from '@services/user/user.service';
import { useAssistantStore } from '@sk-web-gui/ai';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

interface LoginGuardProps {
  children?: React.ReactNode;
}

export const LoginGuard: React.FC<LoginGuardProps> = ({ children }) => {
  const user = useUserStore((state) => state.user);
  const getMe = useUserStore((state) => state.getMe);
  const setApiBaseUrl = useAssistantStore((state) => state.setApiBaseUrl);
  const setStream = useAssistantStore((state) => state.setStream);
  const setApiServiceConfig = useAssistantStore((state) => state.setApiServiceConfig);
  const path = usePathname();
  const protectedPaths = ['/login', '/logout'];

  useEffect(() => {
    getMe();
  }, [getMe]);

  useEffect(() => {
    setApiBaseUrl(process.env.NEXT_PUBLIC_API_URL ?? '');
  }, [setApiBaseUrl]);

  useEffect(() => {
    setStream(true);
  }, [setStream]);

  useEffect(() => {
    setApiServiceConfig({ credentials: 'include' });
  }, [setApiServiceConfig]);

  const showChildren = (user.name && user.username) || protectedPaths.includes(path);

  return showChildren ? children : <LoaderFullScreen />;
};
