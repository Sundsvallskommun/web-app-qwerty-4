import { getConversationSessions } from '@services/conversation.service';
import { useSnackbar } from '@sk-web-gui/react';
import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useShallow } from 'zustand/shallow';
import { useAssistantSessionsStore } from './use-assistant-sessions-store.hook';

interface RefreshAssistantSessionsOptions {
  background?: boolean;
}

export const useAssistantSessions = (assistantId?: string) => {
  const [sessionsByAssistantId, loadedByAssistantId, loadingByAssistantId, setAssistantSessions, setAssistantLoaded, setAssistantLoading] =
    useAssistantSessionsStore(
      useShallow((state) => [
        state.sessionsByAssistantId,
        state.loadedByAssistantId,
        state.loadingByAssistantId,
        state.setAssistantSessions,
        state.setAssistantLoaded,
        state.setAssistantLoading,
      ])
    );

  const message = useSnackbar();
  const { t } = useTranslation();

  const data = assistantId ? sessionsByAssistantId[assistantId] ?? [] : [];
  const loaded = assistantId ? loadedByAssistantId[assistantId] ?? false : false;
  const loading = assistantId ? loadingByAssistantId[assistantId] ?? false : false;

  const refresh = useCallback(
    async ({ background = false }: RefreshAssistantSessionsOptions = {}) => {
      if (!assistantId) {
        return [];
      }

      const currentState = useAssistantSessionsStore.getState();
      const hasCachedData =
        !!currentState.loadedByAssistantId[assistantId] || !!currentState.sessionsByAssistantId[assistantId]?.length;
      const shouldShowBlockingLoader = !background && !hasCachedData;

      if (shouldShowBlockingLoader) {
        setAssistantLoading(assistantId, true);
      }

      try {
        const res = await getConversationSessions('assistant', assistantId);
        setAssistantSessions(assistantId, res.items ?? []);
        setAssistantLoaded(assistantId, true);
        return res.items ?? [];
      } catch (error) {
        const status = (error as { response?: { status?: number } })?.response?.status;

        if (!background) {
          message({
            position: 'bottom',
            message: t(`crud:getmany.error.${status}`, { resource: 'sessioner' }),
          });
        }
        return currentState.sessionsByAssistantId[assistantId] ?? [];
      } finally {
        if (shouldShowBlockingLoader) {
          setAssistantLoading(assistantId, false);
        }
      }
    },
    [assistantId, message, setAssistantLoaded, setAssistantLoading, setAssistantSessions, t]
  );

  useEffect(() => {
    if (!assistantId) {
      return;
    }

    const currentState = useAssistantSessionsStore.getState();
    const hasLoadedCache = currentState.loadedByAssistantId[assistantId] ?? false;

    if (hasLoadedCache) {
      void refresh({ background: true });
      return;
    }

    void refresh();
  }, [assistantId, refresh]);

  return { data, loaded, loading, refresh };
};
