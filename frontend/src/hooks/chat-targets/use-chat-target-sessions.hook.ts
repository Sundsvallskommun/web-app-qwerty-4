import { getConversationSessions } from '@services/conversation.service';
import type { ChatTargetType } from '../../types/chat-target';
import { useSnackbar } from '@sk-web-gui/react';
import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useShallow } from 'zustand/shallow';
import { useChatTargetSessionsStore } from './use-chat-target-sessions-store.hook';

interface RefreshChatTargetSessionsOptions {
  background?: boolean;
}

const getTargetKey = (targetId: string, targetType: ChatTargetType) => `${targetType}:${targetId}`;

export const useChatTargetSessions = (targetId?: string, targetType?: ChatTargetType) => {
  const [sessionsByTargetKey, loadedByTargetKey, loadingByTargetKey, setTargetSessions, setTargetLoaded, setTargetLoading] =
    useChatTargetSessionsStore(
      useShallow((state) => [
        state.sessionsByTargetKey,
        state.loadedByTargetKey,
        state.loadingByTargetKey,
        state.setTargetSessions,
        state.setTargetLoaded,
        state.setTargetLoading,
      ])
    );

  const message = useSnackbar();
  const { t } = useTranslation();
  const targetKey = targetId && targetType ? getTargetKey(targetId, targetType) : '';

  const data = targetKey ? sessionsByTargetKey[targetKey] ?? [] : [];
  const loaded = targetKey ? loadedByTargetKey[targetKey] ?? false : false;
  const loading = targetKey ? loadingByTargetKey[targetKey] ?? false : false;

  const refresh = useCallback(
    async ({ background = false }: RefreshChatTargetSessionsOptions = {}) => {
      if (!targetId || !targetType || !targetKey) {
        return [];
      }

      const currentState = useChatTargetSessionsStore.getState();
      const hasCachedData = !!currentState.loadedByTargetKey[targetKey] || !!currentState.sessionsByTargetKey[targetKey]?.length;
      const shouldShowBlockingLoader = !background && !hasCachedData;

      if (shouldShowBlockingLoader) {
        setTargetLoading(targetKey, true);
      }

      try {
        const res = await getConversationSessions(targetType, targetId);
        setTargetSessions(targetKey, res.items ?? []);
        setTargetLoaded(targetKey, true);
        return res.items ?? [];
      } catch (error) {
        const status = (error as { response?: { status?: number } })?.response?.status;

        if (!background) {
          message({
            position: 'bottom',
            message: t(`crud:getmany.error.${status}`, { resource: 'sessioner' }),
          });
        }

        return currentState.sessionsByTargetKey[targetKey] ?? [];
      } finally {
        if (shouldShowBlockingLoader) {
          setTargetLoading(targetKey, false);
        }
      }
    },
    [message, setTargetLoaded, setTargetLoading, setTargetSessions, t, targetId, targetKey, targetType]
  );

  useEffect(() => {
    if (!targetId || !targetType || !targetKey) {
      return;
    }

    const currentState = useChatTargetSessionsStore.getState();
    const hasLoadedCache = currentState.loadedByTargetKey[targetKey] ?? false;

    if (hasLoadedCache) {
      void refresh({ background: true });
      return;
    }

    void refresh();
  }, [refresh, targetId, targetKey, targetType]);

  return { data, loaded, loading, refresh };
};
