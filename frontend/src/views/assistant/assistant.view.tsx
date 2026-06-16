'use client';
import { AIFeed } from '@components/ai-feed';
import { AssistantAvatar } from '@components/assistant-avatar/assistant-avatar';
import { AssistantInput } from '@components/assistant-input/assistant-input.component';
import { AssistantPanel, SessionEntry } from '@components/assistant-panel/assistant-panel.component';
import { ResponsiveModal } from '@components/responsive-modal/responsive-modal.component';
import { useChatTargetSessions } from '@hooks/chat-targets/use-chat-target-sessions.hook';
import { useSpaceStore } from '@hooks/spaces/use-space-store.hook';
import { useAssistantPanel } from '@hooks/use-assistant-panel.hook';
import { useBackgroundAnswerNotification } from '@hooks/use-background-answer-notification';
import { useLocalStorage } from '@hooks/use-localstorage.hook';
import { useChat } from '@hooks/useChat';
import { getConversation } from '@services/conversation.service';
import { AssistantInfo, AssistantPresentation, useSessions } from '@sk-web-gui/ai';
import { Button, cx, Icon, useSnackbar, useThemeQueries } from '@sk-web-gui/react';
import { appURL } from '@utils/app-url';
import {
  getChatTargetAvatar,
  getChatTargetIdentity,
  getGroupChatAssistantIdentityMap,
  toAssistantInfo,
} from '@utils/chat-target';
import { mapSessionMessagesToHistory } from '@utils/map-session-history';
import { EllipsisVertical, MessageCircle, PanelLeftOpen, Plus } from 'lucide-react';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { capitalize } from 'underscore.string';
import type { ChatTarget } from '../../types/chat-target';
import { useSpace } from '@hooks/spaces/use-space.hook';

interface AssistantViewProps {
  assistant: ChatTarget;
  sessionId?: string;
}

const isOwnedByTarget = (session: SessionEntry | undefined, target: ChatTarget) => {
  if (!session) {
    return false;
  }

  if (session.targetId === target.id && session.targetType === target.targetType) {
    return true;
  }

  return target.targetType === 'assistant' && session.assistantId === target.id;
};

export const AssistantView: React.FC<AssistantViewProps> = ({ assistant, sessionId }) => {
  const { id } = useParams();
  const { t } = useTranslation();
  const isPersonalRoute = id === 'personal';
  const assistantInfo: AssistantInfo = useMemo(
    () => ({
      ...toAssistantInfo(assistant),
      name: t(`assistants:name.${assistant.name}`, { defaultValue: assistant.name }),
      description: 'description' in assistant ? (assistant.description ?? undefined) : undefined,
    }),
    [assistant, t]
  );
  const setMenuOpen = useLocalStorage((state) => state.setMenuOpen);
  const { isAssistantPanelOpen, openAssistantPanel, closeAssistantPanel } = useAssistantPanel();
  const { isMinLargeDevice, isMaxMediumDevice } = useThemeQueries();
  const targetAvatar = getChatTargetAvatar(assistant, isPersonalRoute);
  const knownAssistants = useMemo(
    () => [
      ...useSpaceStore
        .getState()
        .spaces.flatMap((space) => [
          ...(space.default_assistant ? [space.default_assistant] : []),
          ...(space.applications?.assistants.items ?? []),
        ])
        .map((candidate) => ({
          id: candidate.id,
          icon_id: candidate.icon_id,
        }))
        .filter((candidate, index, array) => array.findIndex((entry) => entry.id === candidate.id) === index),
    ],
    []
  );
  const groupChatAssistants = useMemo(
    () => getGroupChatAssistantIdentityMap(assistant, knownAssistants),
    [assistant, knownAssistants]
  );
  const showResponseLabel = 'show_response_label' in assistant ? assistant.show_response_label : true;
  const showHistoryAssistantInfo = assistant.targetType === 'group_chat' && showResponseLabel;
  const enableAssistantAts =
    assistant.isPersonal === true ||
    (assistant.targetType === 'group_chat' &&
      'allow_mentions' in assistant &&
      assistant.allow_mentions === true);
  const { history, sendQuery, newSession, session } = useChat({
    sessionId,
    settings: {
      assistantId: assistant.id,
      is_group_chat: assistant.targetType === 'group_chat',
      show_response_label: showResponseLabel,
      target_name: assistantInfo.name,
      target_avatar: targetAvatar,
      chat_target_assistants: groupChatAssistants,
    },
  });
  const { isBackground, notifyAnswer, requestPermission } = useBackgroundAnswerNotification();
  const [sessionsById, newStoreSession, changeSessionId, updateSession] = useSessions((state) => [
    state.sessions as Record<string, SessionEntry>,
    state.newSession,
    state.changeSessionId,
    state.updateSession,
  ]);
  const {
    data: persistedSessions,
    loading: sessionsLoading,
    refresh: refreshAssistantSessions,
  } = useChatTargetSessions(assistant.id, assistant.targetType);
  const pathName = usePathname();
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);
  const hydratedSessionRef = useRef<string>('');
  const promotedSessionRef = useRef<string>('');
  const historyDoneStateRef = useRef<Record<string, boolean>>({});
  const notifiedAnswerIdsRef = useRef<Set<string>>(new Set());
  const message = useSnackbar();
  const [sessionLoading, setSessionLoading] = useState(false);
  const { data: space } = useSpace(assistant.space_id);

  useEffect(() => {
    setMenuOpen(false);
    if (isMinLargeDevice) {
      openAssistantPanel();
    } else {
      closeAssistantPanel();
    }
  }, [assistant.id, closeAssistantPanel, isMinLargeDevice, openAssistantPanel, setMenuOpen]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }, 10);

    return () => clearTimeout(timeout);
  }, [history]);

  useEffect(() => {
    const targetIdentity = getChatTargetIdentity({ ...assistant, name: assistantInfo.name });

    history.forEach((entry) => {
      const wasDone = historyDoneStateRef.current[entry.id];

      if (
        wasDone === false &&
        entry.origin === 'assistant' &&
        entry.done &&
        entry.text.trim() &&
        !notifiedAnswerIdsRef.current.has(entry.id) &&
        isBackground
      ) {
        const notificationTitle =
          entry.assistantInfo?.name?.trim() || targetIdentity?.name || process.env.NEXT_PUBLIC_APP_NAME || 'Assistant';
        const notificationIcon =
          typeof entry.assistantInfo?.avatar === 'string' ? entry.assistantInfo.avatar : targetIdentity?.avatar;

        void notifyAnswer({
          id: entry.id,
          title: notificationTitle,
          body: entry.text,
          icon: notificationIcon,
          targetUrl: appURL(pathName),
        });
        notifiedAnswerIdsRef.current.add(entry.id);
      }

      historyDoneStateRef.current[entry.id] = !!entry.done;
    });
  }, [assistant, assistantInfo.name, history, isBackground, notifyAnswer, pathName]);

  const assistantSessions = useMemo(() => {
    const merged = new Map<string, SessionEntry>();

    persistedSessions.forEach((sessionMeta) => {
      const localSession = sessionsById?.[sessionMeta.id];
      merged.set(sessionMeta.id, {
        id: sessionMeta.id,
        name: localSession?.name?.trim() || sessionMeta.name,
        created_at: localSession?.created_at ?? sessionMeta.created_at,
        updated_at: localSession?.updated_at ?? sessionMeta.updated_at,
        assistantId: assistant.targetType === 'assistant' ? assistant.id : undefined,
        targetId: assistant.id,
        targetType: assistant.targetType,
        history: localSession?.history,
        isNew: false,
      });
    });

    Object.values(sessionsById || {})
      .filter((localSession) => isOwnedByTarget(localSession, assistant) && localSession.id && !localSession.isNew)
      .forEach((localSession) => {
        const existing = merged.get(localSession.id);
        merged.set(localSession.id, {
          ...(existing ?? {}),
          ...localSession,
          id: localSession.id,
          name: localSession.name?.trim() || existing?.name,
          created_at: localSession.created_at ?? existing?.created_at,
          updated_at: localSession.updated_at ?? existing?.updated_at,
          assistantId: assistant.targetType === 'assistant' ? assistant.id : undefined,
          targetId: assistant.id,
          targetType: assistant.targetType,
          isNew: false,
        });
      });

    return Array.from(merged.values());
  }, [assistant, persistedSessions, sessionsById]);

  useEffect(() => {
    if (!sessionId) {
      hydratedSessionRef.current = '';
      setSessionLoading(false);
      return;
    }

    const hydrationKey = `${assistant.targetType}:${assistant.id}:${sessionId}`;
    const existingSession = sessionsById?.[sessionId];
    const isHydrated =
      isOwnedByTarget(existingSession, assistant) && !existingSession?.isNew && !!existingSession?.history?.length;

    if (hydratedSessionRef.current === hydrationKey || isHydrated) {
      hydratedSessionRef.current = hydrationKey;
      setSessionLoading(false);
      return;
    }

    let cancelled = false;
    setSessionLoading(true);

    getConversation(sessionId)
      .then((sessionData) => {
        if (cancelled) return;

        if (!sessionsById?.[sessionId]) {
          const temporarySessionId = newStoreSession();
          changeSessionId(temporarySessionId, sessionId);
        }

        updateSession(sessionId, (currentSession) => ({
          ...(currentSession ?? { id: sessionId }),
          id: sessionId,
          name: sessionData.name,
          created_at: sessionData.created_at ? new Date(sessionData.created_at) : currentSession?.created_at,
          updated_at: sessionData.updated_at ? new Date(sessionData.updated_at) : currentSession?.updated_at,
          assistantId: assistant.targetType === 'assistant' ? assistant.id : undefined,
          targetId: assistant.id,
          targetType: assistant.targetType,
          history: mapSessionMessagesToHistory(sessionData, assistantInfo, {
            target: assistant,
            groupChatAssistants,
          }),
          isNew: false,
          done: true,
        }));

        hydratedSessionRef.current = hydrationKey;
      })
      .catch((error) => {
        if (cancelled) return;
        message({
          position: 'bottom',
          message: t(`crud:getone.error.${error?.response?.status}`, { resource: 'sessionen' }),
        });
        router.push(`/assistant/${id}`);
      })
      .finally(() => {
        if (!cancelled) {
          setSessionLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [
    assistant,
    assistantInfo,
    changeSessionId,
    groupChatAssistants,
    id,
    message,
    newStoreSession,
    router,
    sessionId,
    sessionsById,
    t,
    updateSession,
  ]);

  useEffect(() => {
    if (!sessionId) {
      return;
    }

    void refreshAssistantSessions({ background: true });
  }, [refreshAssistantSessions, sessionId]);

  useEffect(() => {
    if (sessionId || !session?.id || session?.isNew || !session.history?.length) {
      return;
    }

    if (promotedSessionRef.current === session.id) {
      return;
    }

    promotedSessionRef.current = session.id;
    void refreshAssistantSessions({ background: true });
  }, [refreshAssistantSessions, session, sessionId]);

  const handleNew = () => {
    if (sessionId) {
      router.push(pathName.replace(`/${sessionId}`, ''));
    }
    newSession();
  };

  const handleSend = (query: string, files?: Parameters<typeof sendQuery>[1]) => {
    void requestPermission();
    sendQuery(query, files);
  };

  const activeSessionId = session?.id || sessionId;
  const sessionTitle =
    session?.name?.trim() ||
    history.find((entry) => entry.origin === 'user' && entry.text?.trim())?.text?.trim() ||
    capitalize(t('common:new_chat'));

  return (
    <div className="h-dvh w-full overflow-hidden">
      <div
        data-fullscreen="true"
        className="max-w-screen  bg-background-content relative w-full grow shrink max-h-full h-full overflow-hidden gap-0 items-center justify-start"
      >
        <div className="sk-ai-corner-module-content flex h-full min-w-0 w-full">
          {isMinLargeDevice && isAssistantPanelOpen && (
            <AssistantPanel
              assistant={assistant}
              assistantInfo={assistantInfo}
              currentSessionId={sessionId}
              sessions={assistantSessions}
              loading={sessionsLoading}
              onClose={closeAssistantPanel}
            />
          )}

          <div className="sk-ai-corner-module-content-row sk-ai-corner-module-content-main min-w-0 grow">
            <div
              className="sk-ai-corner-module-header rounded-0 relative"
              data-variant="default"
              data-inverted="true"
              data-fullscreen={isMinLargeDevice}
            >
              <div className="min-w-0 flex flex-1 items-center gap-16 lg:gap-6 ">
                {isMaxMediumDevice && (
                  <Button
                    size="sm"
                    variant="tertiary"
                    iconButton
                    inverted={!isMinLargeDevice}
                    onClick={() => setMenuOpen(true)}
                  >
                    <Icon icon={<PanelLeftOpen />} />
                  </Button>
                )}
                {(isMaxMediumDevice || !isAssistantPanelOpen) &&
                  (isMaxMediumDevice ?
                    <button
                      type="button"
                      onClick={openAssistantPanel}
                      aria-haspopup="menu"
                      aria-expanded={isAssistantPanelOpen}
                      className="rounded-button-md text-left focus-visible:ring ring-ring"
                    >
                      <div className="sk-ai-corner-module-header-title">
                        <AssistantAvatar assistant={assistantInfo} size={'sm'} />
                        <div className="sk-ai-corner-module-header-heading">
                          <span className="sk-ai-corner-module-header-heading-name">{assistantInfo.name}</span>
                        </div>
                        <span aria-hidden="true" className={cx('text-primitives-gray-400 flex h-full items-center')}>
                          <Icon size="20px" icon={<EllipsisVertical />} />
                        </span>
                      </div>
                    </button>
                  : <></>)}
              </div>
              {isMinLargeDevice && (
                <div className="absolute max-w-[calc(100%-30rem)] left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center">
                  <div className="text-dark-primary max-w-full inline-flex min-w-0 items-center gap-8 rounded-button-md px-16 py-8">
                    <Icon className="grow-0 shrink-0" icon={<MessageCircle />} size={18} />
                    <span className="truncate text-base font-bold grow shrink">{sessionTitle}</span>
                  </div>
                </div>
              )}
              <Button
                size="sm"
                variant="tertiary"
                rightIcon={<Icon icon={<Plus />} />}
                inverted={!isMinLargeDevice}
                onClick={handleNew}
                iconButton={isMaxMediumDevice}
                aria-label={isMaxMediumDevice ? t('common:new_chat') : undefined}
              >
                {isMinLargeDevice && capitalize(t('common:new_chat'))}
              </Button>
            </div>
            <div
              data-fullscreen={isMinLargeDevice}
              className="sk-ai-corner-module-feed grow w-full items-center max-w-full"
              ref={scrollRef}
            >
              {sessionLoading && sessionId && !history.length ?
                <div className="rounded-groups bg-tertiary-surface mx-auto mt-24 max-w-[40rem] px-16 py-14 text-small text-dark-secondary">
                  Laddar konversation...
                </div>
              : history.length > 0 ?
                <AIFeed
                  history={history}
                  showTitles={false}
                  space={space ?? undefined}
                  enableAssistantAts={enableAssistantAts}
                  getAssistantInfoFromHistory={showHistoryAssistantInfo}
                  titles={{
                    assistant: {
                      show: showHistoryAssistantInfo,
                      title: assistantInfo.name,
                    },
                    system: {
                      show: false,
                      title: assistantInfo.name,
                    },
                    user: {
                      show: false,
                      title: 'Du',
                    },
                  }}
                  avatars={{
                    assistant: (
                      <AssistantAvatar
                        assistant={{
                          name: assistantInfo.name,
                          avatar: targetAvatar,
                          shortName: assistantInfo.name.charAt(0),
                          description: assistantInfo.description,
                          id: assistant.id,
                        }}
                      />
                    ),
                    user: (
                      <AssistantAvatar
                        assistant={{
                          name: 'Du',
                          shortName: 'Du',
                          description: assistantInfo.description,
                        }}
                      />
                    ),
                  }}
                  sessionId={activeSessionId}
                  className="grow w-full"
                />
              : <AssistantPresentation size={isMinLargeDevice ? 'lg' : 'sm'} assistant={assistantInfo} />}
            </div>
            <AssistantInput onSend={handleSend} history={history} disabled={sessionLoading} />
          </div>
        </div>

        {isMaxMediumDevice && (
          <ResponsiveModal
            open={isAssistantPanelOpen}
            onClose={closeAssistantPanel}
            label={assistantInfo.name}
            mobileBottomSheet
            mobileAutoHeight
            hideMobileCloseButton
            enableMobileDragToClose
            className="!bg-background-content"
            contentClassName="!px-0 !pb-0"
          >
            <AssistantPanel
              assistant={assistant}
              assistantInfo={assistantInfo}
              currentSessionId={sessionId}
              sessions={assistantSessions}
              loading={sessionsLoading}
              mobile
              hideCloseButton
              onClose={closeAssistantPanel}
            />
          </ResponsiveModal>
        )}
      </div>
    </div>
  );
};
