'use client';

import { useLocalStorage } from '@hooks/use-localstorage.hook';
import { ColorSchemeMode, GuiProvider, useThemeQueries } from '@sk-web-gui/react';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useShallow } from 'zustand/shallow';
import { SpaceMenu } from './components/space-menu.component';
import { SidebarUserMenu } from '@components/sidebar-user-menu/sidebar-user-menu.component';

export const MobileMenu: React.FC = () => {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState<boolean>(false);
  const [isRendered, setIsRendered] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [open, setOpen] = useLocalStorage(useShallow((state) => [state.menuOpen, state.setMenuOpen]));
  const { isMaxSmallDevice } = useThemeQueries();

  const styleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !isMaxSmallDevice) {
      setIsRendered(false);
      setIsVisible(false);
      return;
    }

    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let rafId: number | undefined;
    let rafId2: number | undefined;

    if (open) {
      setIsRendered(true);
      setIsVisible(false);
      rafId = window.requestAnimationFrame(() => {
        rafId2 = window.requestAnimationFrame(() => {
          setIsVisible(true);
        });
      });
    } else if (isRendered) {
      setIsVisible(false);
      timeoutId = setTimeout(() => {
        setIsRendered(false);
      }, 300);
    }

    return () => {
      if (rafId !== undefined) {
        window.cancelAnimationFrame(rafId);
      }
      if (rafId2 !== undefined) {
        window.cancelAnimationFrame(rafId2);
      }
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }
    };
  }, [isMaxSmallDevice, isRendered, mounted, open]);

  return (
    <div ref={styleRef} className="relative z-50 bg-transparent">
      {mounted && (
        <GuiProvider colorScheme={ColorSchemeMode.Dark} ref={styleRef}>
          {styleRef.current && isMaxSmallDevice && isRendered && (
            <div className="fixed inset-0 z-50">
              <button
                type="button"
                aria-label={t('common:close')}
                className={`absolute inset-0 transition-opacity duration-300 ${
                  isVisible ? 'opacity-100' : 'opacity-0'
                } bg-primitives-overlay-darken-6 dark:bg-primitives-overlay-darken-8`}
                onClick={() => setOpen(false)}
              />
              <div
                className={`absolute text-body top-0 bottom-0 left-0 h-dvh max-h-dvh w-[calc(100vw-50px)] max-w-[calc(100vw-50px)] bg-background-200 flex flex-col justify-between py-8 px-8 overflow-hidden transition-transform duration-300 ease-out ${
                  isVisible ? 'translate-x-0' : '-translate-x-full'
                }`}
              >
                <SpaceMenu onClose={() => setOpen(false)} />
                <div className="px-8 py-8 shrink-0">
                  <SidebarUserMenu size="sm" />
                </div>
              </div>
            </div>
          )}
        </GuiProvider>
      )}
    </div>
  );
};
