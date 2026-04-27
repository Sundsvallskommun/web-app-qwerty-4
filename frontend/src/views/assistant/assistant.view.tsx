'use client';
import { AIFeed } from '@components/ai-feed';
import { AssistantAvatar } from '@components/assistant-avatar/assistant-avatar';
import { AssistantInput } from '@components/assistant-input/assistant-input.component';
import { AssistantPanel, SessionEntry } from '@components/assistant-panel/assistant-panel.component';
import { AssistantPublic } from '@data-contracts/backend/data-contracts';
import { useAssistantSessions } from '@hooks/assistants/use-assistant-sessions.hook';
import { useAssistantPanel } from '@hooks/use-assistant-panel.hook';
import { useBackgroundAnswerNotification } from '@hooks/use-background-answer-notification';
import { useLocalStorage } from '@hooks/use-localstorage.hook';
import { useChat } from '@hooks/useChat';
import { getAssistantSession } from '@services/assistant.service';
import { AssistantInfo, AssistantPresentation, useSessions } from '@sk-web-gui/ai';
import { Button, cx, Icon, useSnackbar, useThemeQueries } from '@sk-web-gui/react';
import { appURL } from '@utils/app-url';
import { getAssistantAvatar } from '@utils/get-assistant-avatar';
import { mapSessionMessagesToHistory } from '@utils/map-session-history';
import { CircleEllipsis, MessageCircle, PanelLeftOpen, Plus } from 'lucide-react';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { capitalize } from 'underscore.string';

interface AssistantViewProps {
  assistant: AssistantPublic;
  sessionId?: string;
}

export const AssistantView: React.FC<AssistantViewProps> = ({ assistant, sessionId }) => {
  const { id } = useParams();
  const { t } = useTranslation();

  const assistantInfo: AssistantInfo = useMemo(
    () => ({
      name: t(`assistants:name.${assistant.name}`, { defaultValue: assistant.name }),
      id: assistant.id,
      shortName: assistant.name.charAt(0),
      description: assistant?.description ?? undefined,
      avatar: getAssistantAvatar(assistant, id === 'personal'),
    }),
    [assistant, id]
  );

  const setMenuOpen = useLocalStorage((state) => state.setMenuOpen);
  const { isAssistantPanelOpen, openAssistantPanel, closeAssistantPanel } = useAssistantPanel();

  const { isMinMediumDevice, isMaxSmallDevice } = useThemeQueries();
  const { history, sendQuery, newSession, session } = useChat({ sessionId, settings: { assistantId: assistant.id } });
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
  } = useAssistantSessions(assistant.id);
  const pathName = usePathname();
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);
  const hydratedSessionRef = useRef<string>('');
  const promotedSessionRef = useRef<string>('');
  const historyDoneStateRef = useRef<Record<string, boolean>>({});
  const notifiedAnswerIdsRef = useRef<Set<string>>(new Set());
  const message = useSnackbar();

  const [showPanelTriggerIcon, setShowPanelTriggerIcon] = useState(false);
  const [sessionLoading, setSessionLoading] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
    if (isMinMediumDevice) {
      openAssistantPanel();
    } else {
      closeAssistantPanel();
    }
  }, [assistant.id, closeAssistantPanel, isMinMediumDevice, openAssistantPanel, setMenuOpen]);

  const handleAutoScroll = () => {
    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }, 10);
  };

  useEffect(() => {
    handleAutoScroll();
  }, [history]);

  useEffect(() => {
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
          entry.assistantInfo?.name?.trim() || assistant.name || process.env.NEXT_PUBLIC_APP_NAME || 'Assistant';
        const notificationIcon =
          typeof entry.assistantInfo?.avatar === 'string' ?
            entry.assistantInfo.avatar
          : getAssistantAvatar(assistant, id === 'personal');

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
  }, [assistant, assistant.name, history, id, isBackground, notifyAnswer, pathName]);

  const assistantSessions = useMemo(() => {
    const merged = new Map<string, SessionEntry>();

    persistedSessions.forEach((sessionMeta) => {
      const localSession = sessionsById?.[sessionMeta.id];
      merged.set(sessionMeta.id, {
        id: sessionMeta.id,
        name: localSession?.name?.trim() || sessionMeta.name,
        created_at: localSession?.created_at ?? sessionMeta.created_at,
        updated_at: localSession?.updated_at ?? sessionMeta.updated_at,
        assistantId: assistant.id,
        history: localSession?.history,
        isNew: false,
      });
    });

    Object.values(sessionsById || {})
      .filter((localSession) => localSession.assistantId === assistant.id && localSession.id && !localSession.isNew)
      .forEach((localSession) => {
        const existing = merged.get(localSession.id);
        merged.set(localSession.id, {
          ...(existing ?? {}),
          ...localSession,
          id: localSession.id,
          name: localSession.name?.trim() || existing?.name,
          created_at: localSession.created_at ?? existing?.created_at,
          updated_at: localSession.updated_at ?? existing?.updated_at,
          assistantId: assistant.id,
          isNew: false,
        });
      });

    return Array.from(merged.values());
  }, [assistant.id, persistedSessions, sessionsById]);

  useEffect(() => {
    if (!sessionId) {
      hydratedSessionRef.current = '';
      setSessionLoading(false);
      return;
    }

    const hydrationKey = `${assistant.id}:${sessionId}`;
    const existingSession = sessionsById?.[sessionId];
    const isHydrated =
      existingSession?.assistantId === assistant.id &&
      !existingSession?.isNew &&
      (!!existingSession?.history?.length || !!existingSession?.name);

    if (hydratedSessionRef.current === hydrationKey || isHydrated) {
      hydratedSessionRef.current = hydrationKey;
      setSessionLoading(false);
      return;
    }

    let cancelled = false;
    setSessionLoading(true);

    getAssistantSession(assistant.id, sessionId)
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
          assistantId: assistant.id,
          history: mapSessionMessagesToHistory(sessionData, assistantInfo),
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
    assistant.id,
    assistantInfo,
    changeSessionId,
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
          {isMinMediumDevice && isAssistantPanelOpen && (
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
              data-fullscreen={isMinMediumDevice}
            >
              <div className="min-w-0 flex flex-1 items-center gap-6">
                {isMaxSmallDevice && (
                  <Button
                    size="sm"
                    variant="tertiary"
                    iconButton
                    inverted={!isMinMediumDevice}
                    onClick={() => setMenuOpen(true)}
                  >
                    <Icon icon={<PanelLeftOpen />} />
                  </Button>
                )}
                {(isMaxSmallDevice || !isAssistantPanelOpen) &&
                  (isMaxSmallDevice ?
                    <button
                      type="button"
                      onClick={openAssistantPanel}
                      onMouseEnter={() => setShowPanelTriggerIcon(true)}
                      onMouseLeave={() => setShowPanelTriggerIcon(false)}
                      onFocus={() => setShowPanelTriggerIcon(true)}
                      onBlur={() => setShowPanelTriggerIcon(false)}
                      aria-haspopup="menu"
                      aria-expanded={isAssistantPanelOpen}
                      className="rounded-button-md text-left focus-visible:ring ring-ring"
                    >
                      <div className="sk-ai-corner-module-header-title">
                        <AssistantAvatar assistant={assistantInfo} size={'sm'} />
                        <div className="sk-ai-corner-module-header-heading">
                          <span className="sk-ai-corner-module-header-heading-name">{assistant.name}</span>
                        </div>
                        <span
                          aria-hidden="true"
                          className={cx(
                            'text-light-secondary flex h-full items-center',
                            showPanelTriggerIcon ? 'opacity-100 transition-opacity' : 'opacity-0 transition-opacity'
                          )}
                        >
                          <Icon icon={<CircleEllipsis />} />
                        </span>
                      </div>
                    </button>
                  : <></>)}
              </div>
              {isMinMediumDevice && (
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
                inverted={!isMinMediumDevice}
                onClick={handleNew}
              >
                {capitalize(t('common:new_chat'))}
              </Button>
            </div>
            <div
              data-fullscreen={isMinMediumDevice}
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
                  avatars={{
                    assistant: (
                      <AssistantAvatar
                        assistant={{
                          name: assistant.name,
                          avatar: getAssistantAvatar(assistant, id === 'personal'),
                          shortName: assistant.name.charAt(0),
                          description: assistant.description ?? undefined,
                          id: assistant.id,
                        }}
                      />
                    ),
                    user: (
                      <AssistantAvatar
                        assistant={{
                          name: 'Du',
                          shortName: 'Du',
                          description: assistant.description ?? undefined,
                        }}
                      />
                    ),
                  }}
                  sessionId={activeSessionId}
                  className="grow w-full"
                />
              : <AssistantPresentation size={isMinMediumDevice ? 'lg' : 'sm'} assistant={assistantInfo} />}
            </div>
            <AssistantInput onSend={handleSend} history={history} disabled={sessionLoading} />
          </div>
        </div>

        {isMaxSmallDevice && isAssistantPanelOpen && (
          <div className="absolute inset-0 z-20 bg-background-content">
            <AssistantPanel
              assistant={assistant}
              assistantInfo={assistantInfo}
              currentSessionId={sessionId}
              sessions={assistantSessions}
              loading={sessionsLoading}
              mobile
              onClose={closeAssistantPanel}
            />
          </div>
        )}
      </div>
    </div>
  );
};
