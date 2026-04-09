'use client';

import LoaderFullScreen from '@components/loader/loader-fullscreen';
import { PWAInstaller } from '@components/pwa-installer/pwa-installer.component';
import { useLocalStorage } from '@hooks/use-localstorage.hook';
import { useUserStore } from '@services/user/user.service';
import { GuiProvider } from '@sk-web-gui/react';
import dayjs from 'dayjs';
import 'dayjs/locale/sv';
import updateLocale from 'dayjs/plugin/updateLocale';
import utc from 'dayjs/plugin/utc';
import { ReactNode, useEffect, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';

dayjs.extend(utc);
dayjs.locale('sv');
dayjs.extend(updateLocale);
dayjs.updateLocale('sv', {
  months: [
    'Januari',
    'Februari',
    'Mars',
    'April',
    'Maj',
    'Juni',
    'Juli',
    'Augusti',
    'September',
    'Oktober',
    'November',
    'December',
  ],
  monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'],
});

interface ClientApplicationProps {
  children: ReactNode;
}

const AppLayout = ({ children }: ClientApplicationProps) => {
  const colorScheme = useLocalStorage(useShallow((state) => state.colorScheme));
  const getMe = useUserStore((state) => state.getMe);
  const [mounted, setMounted] = useState(false);
  const [showPwaInstaller, setShowPwaInstaller] = useState<boolean>(true);

  useEffect(() => {
    getMe();
    setMounted(true);
  }, [getMe, setMounted]);

  if (!mounted) {
    return <LoaderFullScreen />;
  }

  return (
    <GuiProvider colorScheme={colorScheme}>
      <PWAInstaller open={showPwaInstaller} onClose={() => setShowPwaInstaller(false)} />
      {children}
    </GuiProvider>
  );
};

export default AppLayout;
