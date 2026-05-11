import { getPinnedAssistants, updatePinnedAssistants } from '@services/pinned-assistants.service';
import { useSnackbar } from '@sk-web-gui/react';
import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useShallow } from 'zustand/shallow';
import { usePinnedAssistantsStore } from './use-pinned-assistants-store.hook';

const normalizePinnedAssistantIds = (ids: unknown): string[] => {
  if (!Array.isArray(ids)) {
    return [];
  }

  const uniqueIds = new Set<string>();

  ids.forEach((id) => {
    if (typeof id !== 'string') {
      return;
    }

    const normalizedId = id.trim();
    if (!normalizedId) {
      return;
    }

    uniqueIds.add(normalizedId);
  });

  return [...uniqueIds];
};

export const usePinnedAssistants = () => {
  const [ids, loaded, loading, attempted, setIds, setLoaded, setLoading, setAttempted] = usePinnedAssistantsStore(
    useShallow((state) => [
      state.ids,
      state.loaded,
      state.loading,
      state.attempted,
      state.setIds,
      state.setLoaded,
      state.setLoading,
      state.setAttempted,
    ])
  );
  const message = useSnackbar();
  const { t } = useTranslation();

  const refresh = useCallback(async () => {
    if (usePinnedAssistantsStore.getState().loading) {
      return;
    }

    setAttempted(true);
    setLoading(true);

    try {
      const res = await getPinnedAssistants();
      setIds(normalizePinnedAssistantIds(res?.ids));
      setLoaded(true);
    } catch (error: any) {
      message({
        position: 'bottom',
        message: t(`crud:getmany.error.${error?.response?.status}`, { resource: 'assistenter' }),
      });
    } finally {
      setLoading(false);
    }
  }, [message, setAttempted, setIds, setLoaded, setLoading, t]);

  const setPinnedAssistantIds = useCallback(
    async (nextIds: string[]) => {
      const normalizedIds = normalizePinnedAssistantIds(nextIds);
      const previousIds = usePinnedAssistantsStore.getState().ids;

      setIds(normalizedIds);

      try {
        const res = await updatePinnedAssistants({ ids: normalizedIds });
        setIds(normalizePinnedAssistantIds(res?.ids));
        setLoaded(true);
      } catch (error: any) {
        setIds(previousIds);
        message({
          position: 'bottom',
          message: t(`crud:update.error.${error?.response?.status}`, { resource: 'assistenter' }),
        });
      }
    },
    [message, setIds, setLoaded, t]
  );

  const togglePinnedAssistantId = useCallback(
    (id: string) => {
      const normalizedId = id.trim();
      if (!normalizedId) {
        return;
      }

      const currentIds = usePinnedAssistantsStore.getState().ids;
      const nextIds =
        currentIds.includes(normalizedId) ?
          currentIds.filter((currentId) => currentId !== normalizedId)
        : [...currentIds, normalizedId];

      void setPinnedAssistantIds(nextIds);
    },
    [setPinnedAssistantIds]
  );

  useEffect(() => {
    if (!attempted && !loading && !loaded) {
      void refresh();
    }
  }, [attempted, loaded, loading, refresh]);

  return {
    pinnedAssistantIds: ids,
    loaded,
    loading,
    refresh,
    setPinnedAssistantIds,
    togglePinnedAssistantId,
  };
};
