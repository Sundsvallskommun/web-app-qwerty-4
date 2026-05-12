'use client';

import { useLocalStorage } from '@hooks/use-localstorage.hook';
import { useSpaces } from '@hooks/spaces/use-spaces.hook';
import { useUserSpaceSettings } from '@hooks/user-settings/use-user-space-settings.hook';
import { useUserStore } from '@services/user/user.service';
import { Button, ColorSchemeMode, Divider, Icon, Switch, cx } from '@sk-web-gui/react';
import { Check, ChevronLeft, ChevronRight, LogOut, Monitor, Moon, Settings2, Sun, User } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { capitalize } from 'underscore.string';
import { useShallow } from 'zustand/shallow';
import { ResponsiveModal } from '@components/responsive-modal/responsive-modal.component';

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
  const [settingsView, setSettingsView] = useState<'main' | 'spaces'>('main');
  const [colorScheme, setColorScheme] = useLocalStorage(
    useShallow((state) => [state.colorScheme, state.setColorScheme])
  );
  const { data: spaces } = useSpaces();
  const { groupSharedAssistantsBySpace, hiddenSpaceIds, setGroupSharedAssistantsBySpace, setSpaceVisible } =
    useUserSpaceSettings();
  const user = useUserStore(useShallow((state) => state.user));

  const displayName = useMemo(() => user.name?.trim() || user.username?.trim() || 'User', [user.name, user.username]);
  const sharedSpaces = useMemo(() => spaces.filter((space) => !space.personal), [spaces]);

  const closeMenu = () => {
    setMenuOpen(false);
    setSettingsView('main');
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

  const label = <h1 className="sk-modal-dialog-header-title m-0">{t('common:user_menu.title')}</h1>;
  const sharedSpacesLabel = (
    <div className="flex gap-4 items-center">
      <Button
        variant="tertiary"
        iconButton
        showBackground={false}
        aria-label={t('common:back')}
        onClick={() => setSettingsView('main')}
      >
        <Icon icon={<ChevronLeft />} />
      </Button>
      <h1 className="sk-modal-dialog-header-title m-0">{t('common:user_menu.shared_spaces')}</h1>
    </div>
  );

  return (
    <>
      <Button
        variant="tertiary"
        iconButton
        size={size}
        aria-label={t('common:user_menu.title')}
        onClick={handleOpenMenu}
      >
        <Icon icon={<Settings2 />} />
      </Button>

      <ResponsiveModal
        open={menuOpen}
        onClose={closeMenu}
        label={settingsView === 'main' ? label : sharedSpacesLabel}
        desktopMaxWidth="68rem"
        mobileBottomSheet
        hideMobileCloseButton
        mobileAutoHeight
        enableMobileDragToClose
        className="!bg-background-100"
        contentClassName="flex flex-col gap-16 py-12"
      >
        {settingsView === 'main' ?
          <>
            <fieldset className="flex flex-col gap-8 rounded-groups bg-background-200 px-12 pb-12 pt-8 border-0">
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

            <button
              type="button"
              onClick={() => setSettingsView('spaces')}
              className={cx(
                'w-full flex items-center justify-between rounded-button-md px-12 py-10',
                'hover:bg-menu-item-surface-hover focus-visible:outline-none focus-visible:ring ring-ring'
              )}
            >
              <span>{t('common:user_menu.shared_spaces')}</span>
              <Icon icon={<ChevronRight />} />
            </button>
            <Divider />
            <div className="mt-auto">
              <div className="text-base font-bold text-dark-primary truncate px-4">{displayName}</div>
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
          </>
        : <>
            <fieldset className="flex flex-col gap-8 rounded-groups bg-background-200 px-12 pb-12 pt-8 border-0">
              <legend className="px-4 text-small font-semibold text-dark-secondary">
                {t('common:user_menu.assistant_view')}
              </legend>
              <Switch
                onChange={() => setGroupSharedAssistantsBySpace(!groupSharedAssistantsBySpace)}
                checked={groupSharedAssistantsBySpace}
              >
                {t('common:user_menu.group_shared_assistants_by_space')}
              </Switch>
            </fieldset>

            <fieldset className="flex flex-col gap-8 rounded-groups bg-background-200 px-12 pb-12 pt-8 border-0">
              <legend className="px-4 text-small font-semibold text-dark-secondary">
                {t('common:user_menu.show_space')}
              </legend>
              {sharedSpaces.map((space) => (
                <Switch
                  key={space.id}
                  onChange={() => setSpaceVisible(space.id, hiddenSpaceIds.includes(space.id))}
                  checked={!hiddenSpaceIds.includes(space.id)}
                >
                  {space.name}
                </Switch>
              ))}
            </fieldset>
          </>
        }
      </ResponsiveModal>
    </>
  );
};
