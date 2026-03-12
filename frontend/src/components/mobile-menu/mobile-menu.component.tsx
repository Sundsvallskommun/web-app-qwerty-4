'use client';

import { useLocalStorage } from '@hooks/use-localstorage.hook';
import { ColorSchemeMode, GuiProvider, useThemeQueries } from '@sk-web-gui/react';
import { useRef } from 'react';
import { useShallow } from 'zustand/shallow';
import { SpaceMenu } from './components/space-menu.component';

export const MobileMenu: React.FC = () => {
  const [open, setOpen] = useLocalStorage(useShallow((state) => [state.menuOpen, state.setMenuOpen]));
  const { isMaxSmallDevice } = useThemeQueries();

  const styleRef = useRef<HTMLDivElement>(null);
  return (
    <GuiProvider colorScheme={ColorSchemeMode.Dark} ref={styleRef}>
      <div ref={styleRef} className="relative z-50 bg-transparent">
        {styleRef.current && isMaxSmallDevice && (
          <div
            className="absolute text-body h-screen max-h-screen w-screen max-w-screen bg-background-200 flex flex-col justify-between py-8 px-8 transition-position overflow-hidden"
            style={{ right: open ? '0' : '100%' }}
          >
            <SpaceMenu onClose={() => setOpen(false)} />
          </div>
        )}
      </div>
    </GuiProvider>
  );
};
