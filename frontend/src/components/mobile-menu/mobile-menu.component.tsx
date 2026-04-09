'use client';

import { useLocalStorage } from '@hooks/use-localstorage.hook';
import { ColorSchemeMode, GuiProvider, useThemeQueries } from '@sk-web-gui/react';
import { useEffect, useRef, useState } from 'react';
import { useShallow } from 'zustand/shallow';
import { SpaceMenu } from './components/space-menu.component';

export const MobileMenu: React.FC = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  const [open, setOpen] = useLocalStorage(useShallow((state) => [state.menuOpen, state.setMenuOpen]));
  const { isMaxSmallDevice } = useThemeQueries();

  const styleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <div ref={styleRef} className="relative z-50 bg-transparent">
      {mounted && (
        <GuiProvider colorScheme={ColorSchemeMode.Dark} ref={styleRef}>
          {styleRef.current && isMaxSmallDevice && (
            <div
              className="absolute text-body h-svh max-h-svh w-screen max-w-screen bg-background-200 flex flex-col justify-between py-8 px-8 transition-position overflow-hidden"
              style={{ right: open ? '0' : '100%' }}
            >
              {open && <SpaceMenu onClose={() => setOpen(false)} />}
            </div>
          )}
        </GuiProvider>
      )}
    </div>
  );
};
