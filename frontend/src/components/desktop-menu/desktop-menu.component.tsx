'use client';

import { useLocalStorage } from '@hooks/use-localstorage.hook';
import { ColorSchemeMode, GuiProvider, useThemeQueries } from '@sk-web-gui/react';
import { useRef } from 'react';
import { useShallow } from 'zustand/shallow';

export const DesktopMenu: React.FC = () => {
  const [open, setOpen] = useLocalStorage(useShallow((state) => [state.menuOpen, state.setMenuOpen]));
  const { isMinMediumDevice } = useThemeQueries();

  const styleRef = useRef<HTMLDivElement>(null);
  return (
    <GuiProvider colorScheme={ColorSchemeMode.Dark} ref={styleRef}>
      <div ref={styleRef} className="grow-0 shrink-0 w-fit">
        {isMinMediumDevice && (
          <div
            className="text-body h-screen max-h-screen bg-background-200 flex flex-col justify-between py-8 px-8 transition-position overflow-hidden"
            style={{ width: open ? '40rem' : '7.2rem' }}
          ></div>
        )}
      </div>
    </GuiProvider>
  );
};
