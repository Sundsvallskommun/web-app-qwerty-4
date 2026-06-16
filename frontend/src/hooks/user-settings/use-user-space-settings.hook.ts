import { UserSpaceSettingsDto } from '@data-contracts/backend/data-contracts';
import { ensureSpaceApplicationsLoaded } from '@hooks/spaces/space-loading.service';
import { getUserSpaceSettings, updateUserSpaceSettings } from '@services/user-space-settings.service';
import { useSnackbar } from '@sk-web-gui/react';
import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useShallow } from 'zustand/shallow';
import { useUserSpaceSettingsStore } from './use-user-space-settings-store.hook';
import { normalizeUserSpaceSettingIds, normalizeUserSpaceSettings } from './user-space-settings.utils';

export const useUserSpaceSettings = () => {
  const [settings, loaded, loading, attempted, setSettings, setLoaded, setLoading, setAttempted] =
    useUserSpaceSettingsStore(
      useShallow((state) => [
        state.settings,
        state.loaded,
        state.loading,
        state.attempted,
        state.setSettings,
        state.setLoaded,
        state.setLoading,
        state.setAttempted,
      ])
    );
  const message = useSnackbar();
  const { t } = useTranslation();

  const refresh = useCallback(async () => {
    if (useUserSpaceSettingsStore.getState().loading) {
      return;
    }

    setAttempted(true);
    setLoading(true);

    try {
      const res = await getUserSpaceSettings();
      setSettings(normalizeUserSpaceSettings(res));
      setLoaded(true);
    } catch (error: any) {
      message({
        position: 'bottom',
        message: t(`crud:getone.error.${error?.response?.status}`, { resource: t('spaces:name_many') }),
      });
    } finally {
      setLoading(false);
    }
  }, [message, setAttempted, setLoaded, setLoading, setSettings, t]);

  const setUserSpaceSettings = useCallback(
    async (nextSettings: UserSpaceSettingsDto) => {
      const normalizedSettings = normalizeUserSpaceSettings(nextSettings);
      const previousSettings = useUserSpaceSettingsStore.getState().settings;

      setSettings(normalizedSettings);

      try {
        const res = await updateUserSpaceSettings(normalizedSettings);
        setSettings(normalizeUserSpaceSettings(res));
        setLoaded(true);
      } catch (error: any) {
        setSettings(previousSettings);
        message({
          position: 'bottom',
          message: t(`crud:update.error.${error?.response?.status}`, { resource: t('spaces:name_many') }),
        });
      }
    },
    [message, setLoaded, setSettings, t]
  );

  const setGroupSharedAssistantsBySpace = useCallback(
    (groupSharedAssistantsBySpace: boolean) => {
      void setUserSpaceSettings({
        ...useUserSpaceSettingsStore.getState().settings,
        groupSharedAssistantsBySpace,
      });
    },
    [setUserSpaceSettings]
  );

  const setSpaceVisible = useCallback(
    (spaceId: string, visible: boolean) => {
      const normalizedId = spaceId.trim();
      if (!normalizedId) {
        return;
      }

      if (visible) {
        void ensureSpaceApplicationsLoaded(normalizedId);
      }

      const currentSettings = useUserSpaceSettingsStore.getState().settings;
      const hiddenSpaceIds =
        visible ?
          currentSettings.hiddenSpaceIds.filter((id) => id !== normalizedId)
        : normalizeUserSpaceSettingIds([...currentSettings.hiddenSpaceIds, normalizedId]);

      void setUserSpaceSettings({
        ...currentSettings,
        hiddenSpaceIds,
      });
    },
    [setUserSpaceSettings]
  );

  useEffect(() => {
    if (!attempted && !loading && !loaded) {
      void refresh();
    }
  }, [attempted, loaded, loading, refresh]);

  return {
    ...settings,
    loaded,
    loading,
    refresh,
    setUserSpaceSettings,
    setGroupSharedAssistantsBySpace,
    setSpaceVisible,
  };
};
