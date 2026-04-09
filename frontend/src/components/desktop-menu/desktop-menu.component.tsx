'use client';

import { useLocalStorage } from '@hooks/use-localstorage.hook';
import {
  Button,
  ColorSchemeMode,
  cx,
  Divider,
  GuiProvider,
  Icon,
  SearchField,
  useThemeQueries,
} from '@sk-web-gui/react';
import { useEffect, useRef, useState } from 'react';
import { useShallow } from 'zustand/shallow';
import { DesktopAssistantMenu } from './components/desktop-assistant-menu.component';
import { SearchAssistant } from '@components/search-assistant/search-assistant.component';
import { Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const DesktopMenu: React.FC = () => {
  const [open, setOpen] = useLocalStorage(useShallow((state) => [state.menuOpen, state.setMenuOpen]));
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);
  const { t } = useTranslation();
  const { isMinMediumDevice } = useThemeQueries();
  const styleRef = useRef<HTMLDivElement>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleOpenSearch = () => {
    setSearchOpen(true);
    setTimeout(() => {
      inputRef?.current?.focus?.();
    }, 100);
  };

  return (
    <div
      className="hidden md:block grow-0 shrink-0 w-fit relative transition-all"
      style={{ width: open || searchOpen ? '40rem' : '7.2rem' }}
    >
      <div className="absolute top-0 bottom-0 left-0 right-0" ref={styleRef}>
        {mounted && (
          <GuiProvider colorScheme={ColorSchemeMode.Dark} ref={styleRef}>
            <>
              {isMinMediumDevice && (
                <div className="text-body h-svh max-h-svh bg-background-200 flex flex-col justify-between py-8 px-8">
                  <div className={cx('w-full flex justify-center p-8', searchOpen ? 'h-svh' : 'h-auto')}>
                    {searchOpen ?
                      <SearchAssistant
                        searchRef={inputRef}
                        openPosition="absolute"
                        open={searchOpen}
                        onCloseSearch={() => setSearchOpen(false)}
                      />
                    : open ?
                      <SearchField
                        value=""
                        onChange={() => {}}
                        size="md"
                        onFocus={() => setSearchOpen(true)}
                        showResetButton={true}
                        className="grow shrink"
                        placeholder={t('assistants:find_assistant')}
                      />
                    : <Button variant="tertiary" size="md" iconButton onClick={handleOpenSearch}>
                        <Icon icon={<Search />} />
                      </Button>
                    }
                  </div>

                  <DesktopAssistantMenu />
                </div>
              )}
            </>
          </GuiProvider>
        )}
      </div>
    </div>
  );
};
