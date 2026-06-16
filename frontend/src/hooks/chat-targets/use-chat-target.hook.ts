import { useSpaces } from '@hooks/spaces/use-spaces.hook';
import { getAssistant } from '@services/assistant.service';
import { getGroupChat } from '@services/group-chat.service';
import { getPersonalSpace } from '@services/space.service';
import { useSnackbar } from '@sk-web-gui/react';
import { toChatTarget } from '@utils/chat-target';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { ChatTarget } from '../../types/chat-target';

export const useChatTarget = (id: string) => {
  const [data, setData] = useState<ChatTarget | null>(null);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { data: spaces, personalLoaded, loaded: spacesLoaded } = useSpaces();
  const message = useSnackbar();
  const { t } = useTranslation();

  const resolvedTarget = useMemo(() => {
    const personalSpace = spaces.find((space) => space.personal);
    const isPersonalAssistant = personalSpace?.default_assistant?.id === id;

    if (id === 'personal' || isPersonalAssistant) {
      return { kind: 'personal_assistant' as const };
    }

    const assistantMatch = spaces
      .flatMap((space) => space.applications?.assistants.items ?? [])
      .find((assistant) => assistant.id === id);

    if (assistantMatch) {
      return { kind: 'assistant' as const };
    }

    const groupChatMatch = spaces
      .flatMap((space) => space.applications?.group_chats.items ?? [])
      .find((groupChat) => groupChat.id === id);

    if (groupChatMatch) {
      return { kind: 'group_chat' as const };
    }

    return { kind: 'unknown' as const };
  }, [id, spaces]);

  useEffect(() => {
    if (id !== 'personal') {
      return;
    }

    setLoading(true);
    setLoaded(false);

    if (!personalLoaded) {
      return;
    }

    const personalSpace = spaces.find((space) => space.personal);
    const personalAssistant = personalSpace?.default_assistant;

    if (personalAssistant) {
      setData(toChatTarget(personalAssistant as any, { isPersonal: true }));
      setLoaded(true);
      setLoading(false);
      return;
    }

    getPersonalSpace()
      .then((res) => {
        const fallbackAssistant = res.data?.default_assistant;
        if (fallbackAssistant) {
          setData(toChatTarget(fallbackAssistant as any, { isPersonal: true }));
          setLoaded(true);
        }
      })
      .catch((error) =>
        message({
          position: 'bottom',
          message: t(`crud:getone.error.${error?.response?.status}`, { resource: t('assistants:the_name_one') }),
        })
      )
      .finally(() => setLoading(false));
  }, [id, message, personalLoaded, spaces, t]);

  useEffect(() => {
    if (id === 'personal') {
      return;
    }

    if (resolvedTarget.kind === 'unknown' && !spacesLoaded) {
      return;
    }

    let cancelled = false;
    setLoading(true);
    setLoaded((currentLoaded) => (data?.id === id ? currentLoaded : false));

    const load = async () => {
      const request = (async (): Promise<ChatTarget | undefined> => {
        if (resolvedTarget.kind === 'personal_assistant') {
          const personalAssistant = await getPersonalSpace().then((res) => res.data?.default_assistant);
          return personalAssistant ? toChatTarget(personalAssistant as any, { isPersonal: true }) : undefined;
        }

        if (resolvedTarget.kind === 'assistant') {
          const assistant = await getAssistant(id);
          return toChatTarget(assistant);
        }

        if (resolvedTarget.kind === 'group_chat') {
          const groupChat = await getGroupChat(id);
          return toChatTarget(groupChat);
        }

        try {
          const assistant = await getAssistant(id);
          return toChatTarget(assistant);
        } catch {
          const groupChat = await getGroupChat(id);
          return toChatTarget(groupChat);
        }
      })();

      try {
        const target = await request;
        if (!cancelled && target) {
          setData(target);
          setLoaded(true);
        }
      } catch (error: any) {
        if (!cancelled) {
          message({
            position: 'bottom',
            message: t(`crud:getone.error.${error?.response?.status}`, { resource: t('assistants:the_name_one') }),
          });
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void load();

    return () => {
      cancelled = true;
    };
  }, [id, message, resolvedTarget.kind, spacesLoaded, t]);

  return { data, loaded, loading };
};
