'use client';

import { useLocalStorage } from '@hooks/use-localstorage.hook';
import { useUserStore } from '@services/user/user.service';
import { Button, ColorSchemeMode, Icon, cx } from '@sk-web-gui/react';
import { Check, LogOut, Monitor, Moon, Sun, User, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { capitalize } from 'underscore.string';
import { useShallow } from 'zustand/shallow';

interface SidebarUserMenuProps {
  size?: 'sm' | 'md';
  onClose?: () => void;
}

const colorSchemes: ColorSchemeMode[] = [ColorSchemeMode.Light, ColorSchemeMode.Dark, ColorSchemeMode.System];

const colorSchemeIcons: Record<ColorSchemeMode, React.JSX.Element> = {
  [ColorSchemeMode.Light]: <Sun />,
  [ColorSchemeMode.Dark]: <Moon />,
  [ColorSchemeMode.System]: <Monitor />,
};

export const SidebarUserMenu: React.FC<SidebarUserMenuProps> = ({ size = 'md', onClose }) => {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [colorScheme, setColorScheme, groupSharedAssistantsBySpace, setGroupSharedAssistantsBySpace] = useLocalStorage(
    useShallow((state) => [
      state.colorScheme,
      state.setColorScheme,
      state.groupSharedAssistantsBySpace,
      state.setGroupSharedAssistantsBySpace,
    ])
  );
  const user = useUserStore(useShallow((state) => state.user));

  const displayName = useMemo(() => user.name?.trim() || user.username?.trim() || 'User', [user.name, user.username]);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleOpenMenu = () => {
    setMenuOpen(true);
  };

  const handleLogout = () => {
    setMenuOpen(false);
    onClose?.();
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
    window.location.assign(`${basePath}/logout`);
  };

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  return (
    <>
      <Button variant="tertiary" iconButton size={size} aria-label={t('common:user_menu.title')} onClick={handleOpenMenu}>
        <Icon icon={<User />} />
      </Button>

      {menuOpen && (
        <div className="absolute inset-0 z-40 bg-background-200 px-16 py-12 flex flex-col gap-16">
          <div className="flex items-center justify-between gap-8">
            <span className="text-base font-bold text-dark-primary truncate">{displayName}</span>
            <Button variant="tertiary" iconButton aria-label={t('common:close')} onClick={closeMenu} className="shrink-0">
              <Icon icon={<X />} />
            </Button>
          </div>

          <fieldset className="flex flex-col gap-8 rounded-groups bg-background-100 px-12 pb-12 pt-8 border-0">
            <legend className="px-4 text-small font-semibold text-dark-secondary">
              {t('common:user_menu.color_scheme')}
            </legend>
            {colorSchemes.map((scheme) => (
              <button
                key={scheme}
                type="button"
                role="menuitemradio"
                aria-checked={scheme === colorScheme}
                onClick={() => setColorScheme(scheme)}
                className={cx(
                  'w-full flex items-center justify-between rounded-button-md px-12 py-10',
                  'hover:bg-menu-item-surface-hover focus-visible:outline-none focus-visible:ring ring-ring'
                )}
              >
                <span className="flex items-center gap-12">
                  <Icon icon={colorSchemeIcons[scheme]} />
                  {t(`common:user_menu.color_schemes.${scheme}`)}
                </span>
                {scheme === colorScheme && <Icon.Padded size={18} rounded icon={<Check />} />}
              </button>
            ))}
          </fieldset>

          <fieldset className="flex flex-col gap-8 rounded-groups bg-background-100 px-12 pb-12 pt-8 border-0">
            <legend className="px-4 text-small font-semibold text-dark-secondary">
              {t('common:user_menu.assistant_view')}
            </legend>
            <button
              type="button"
              role="switch"
              aria-checked={groupSharedAssistantsBySpace}
              onClick={() => setGroupSharedAssistantsBySpace(!groupSharedAssistantsBySpace)}
              className={cx(
                'w-full flex items-center justify-between rounded-button-md px-12 py-10 text-left',
                'hover:bg-menu-item-surface-hover focus-visible:outline-none focus-visible:ring ring-ring'
              )}
            >
              <span className="text-dark-primary">{t('common:user_menu.group_shared_assistants_by_space')}</span>
              <span
                className={cx(
                  'h-20 w-36 rounded-full transition-colors relative',
                  groupSharedAssistantsBySpace ? 'bg-background-content' : 'bg-background-300'
                )}
                aria-hidden
              >
                <span
                  className={cx(
                    'absolute top-2 h-16 w-16 rounded-full bg-white transition-all',
                    groupSharedAssistantsBySpace ? 'left-18' : 'left-2'
                  )}
                />
              </span>
            </button>
          </fieldset>

          <div className="mt-auto">
            <Button
              variant="tertiary"
              showBackground={false}
              className="w-full justify-start"
              onClick={handleLogout}
              leftIcon={<Icon icon={<LogOut />} />}
            >
              {capitalize(t('common:logout'))}
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
