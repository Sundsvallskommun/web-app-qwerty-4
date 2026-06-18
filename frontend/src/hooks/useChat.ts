import { EventSourceMessage, fetchEventSource } from '@microsoft/fetch-event-source';
import {
  AssistantSettings,
  ChatEntryReference,
  ConversationVersion,
  SkHeaders,
  useAssistantStore,
  useSessions,
} from '@sk-web-gui/ai';
import {
  AskResponse,
  ConversationRequest,
  FilePublic,
  SseIntricEventIntricEventTypeEnum,
  SSEToolCall,
  ToolCallInfo,
} from '@data-contracts/backend/data-contracts';
import { AssistantInfo } from '@sk-web-gui/ai';
import { MentionedAssistant } from '@components/ai-feed/at-assistant-util';
import React from 'react';
import { ChatHistory, ChatHistoryEntry } from '../types/history.type';
import { ChatTargetAssistantIdentityMap } from '../types/chat-target.type';

interface useChatOptions {
  settings?: AssistantSettings & {
    is_group_chat?: boolean;
    show_response_label?: boolean;
    target_name?: string;
    target_avatar?: string;
    chat_target_assistants?: ChatTargetAssistantIdentityMap;
  };
  sessionId?: string;
  apiBaseUrl?: string;
  stream?: boolean;
  conversationVersion?: ConversationVersion;
}

type UseChatResult = {
  history: ChatHistory;
  addHistoryEntry: (historyEntry: ChatHistoryEntry) => void;
  newSession: () => void;
  done?: boolean;
  session?: {
    history?: ChatHistory;
    done?: boolean;
    isNew?: boolean;
    id?: string;
    name?: string;
    feedback?: unknown;
  };
  sendQuery: (
    query: string,
    files?: FilePublic[],
    addToHistory?: { question: boolean; answer: boolean } | boolean,
    mentionedAssistants?: MentionedAssistant[]
  ) => Promise<AskResponse | void> | void;
};

type AskResponseWithToolCalls = AskResponse & { tool_calls?: ToolCallInfo[] };

const createConversationUrl = (baseUrl: string, version: ConversationVersion = 1) => {
  const url = new URL(`${baseUrl}/conversations`);
  url.searchParams.set('version', `${version}`);
  return url.toString();
};

const mapReferencesToChatEntryReferences = (references: AskResponse['references'] = []): ChatEntryReference[] => {
  return references.map((reference) => ({
    id: reference.id,
    title: reference.metadata?.title || reference.metadata?.url || reference.id,
    url: reference.metadata?.url || undefined,
  }));
};

const getToolCallKey = (tool: ToolCallInfo) =>
  tool.tool_call_id || `${tool.server_name}:${tool.tool_name}:${JSON.stringify(tool.arguments ?? {})}`;

const mergeToolCalls = (existing: ToolCallInfo[] = [], incoming: ToolCallInfo[] = []): ToolCallInfo[] => {
  const merged = [...existing];

  incoming.forEach((tool) => {
    const key = getToolCallKey(tool);
    const index = merged.findIndex((currentTool) => getToolCallKey(currentTool) === key);

    if (index === -1) {
      merged.push(tool);
      return;
    }

    merged[index] = {
      ...merged[index],
      ...tool,
    };
  });

  return merged;
};

const getAssistantInfoFromResponse = (
  response: AskResponse | undefined,
  options?: {
    currentAssistantId?: string;
    showResponseLabel?: boolean;
    groupChatAssistants?: ChatTargetAssistantIdentityMap;
  }
) => {
  if (options?.showResponseLabel === false) {
    return undefined;
  }

  const responseAssistant = response?.tools?.assistants?.[0];
  if (!responseAssistant) {
    return undefined;
  }

  if (responseAssistant.id === options?.currentAssistantId) {
    return undefined;
  }

  const responseAssistantIdentity =
    options?.groupChatAssistants?.[responseAssistant.id] ?? {
      id: responseAssistant.id,
      name: responseAssistant.handle,
    };

  return {
    ...responseAssistantIdentity,
    avatar: responseAssistantIdentity.avatar,
  };
};

const upsertToolHistoryEntry = (
  history: ChatHistory,
  entry: Pick<ChatHistoryEntry, 'id' | 'assistantInfo'> & { toolCalls: ToolCallInfo[]; done?: boolean }
): ChatHistory => {
  const newHistory = [...history];
  const lastEntry = newHistory.at(-1);

  if (lastEntry?.origin === 'assistant' && lastEntry.kind === 'tool') {
    newHistory[newHistory.length - 1] = {
      ...lastEntry,
      done: entry.done ?? lastEntry.done,
      assistantInfo: entry.assistantInfo ?? lastEntry.assistantInfo,
      toolCalls: mergeToolCalls(lastEntry.toolCalls, entry.toolCalls),
    };
    return newHistory;
  }

  if (lastEntry?.origin === 'assistant' && lastEntry.kind !== 'tool' && !lastEntry.done && !lastEntry.text.trim()) {
    newHistory[newHistory.length - 1] = {
      ...lastEntry,
      id: entry.id,
      kind: 'tool',
      text: '',
      done: entry.done ?? lastEntry.done,
      assistantInfo: entry.assistantInfo ?? lastEntry.assistantInfo,
      toolCalls: mergeToolCalls([], entry.toolCalls),
    };
    return newHistory;
  }

  newHistory.push({
    origin: 'assistant',
    kind: 'tool',
    text: '',
    id: entry.id,
    done: entry.done ?? false,
    assistantInfo: entry.assistantInfo,
    toolCalls: mergeToolCalls([], entry.toolCalls),
  });

  return newHistory;
};

const finalizePendingEntries = (history: ChatHistory): ChatHistory => {
  const newHistory = [...history];

  for (let index = newHistory.length - 1; index >= 0; index--) {
    const entry = newHistory[index];

    if (entry.origin !== 'assistant' || entry.done) {
      break;
    }

    newHistory[index] = { ...entry, done: true };
  }

  return newHistory;
};

const finalizePendingToolEntries = (history: ChatHistory): ChatHistory => {
  const newHistory = [...history];

  for (let index = newHistory.length - 1; index >= 0; index--) {
    const entry = newHistory[index];

    if (entry.origin !== 'assistant') {
      break;
    }

    if (entry.kind === 'tool' && !entry.done) {
      newHistory[index] = { ...entry, done: true };
      continue;
    }

    break;
  }

  return newHistory;
};

const isToolCallEvent = (event: EventSourceMessage, parsedData?: unknown) =>
  event.event === SseIntricEventIntricEventTypeEnum.ToolCall ||
  (typeof parsedData === 'object' &&
    parsedData !== null &&
    'intric_event_type' in parsedData &&
    parsedData.intric_event_type === SseIntricEventIntricEventTypeEnum.ToolCall);

const mapMentionedAssistantsToTools = (mentionedAssistants: MentionedAssistant[] = []) =>
  mentionedAssistants.length > 0 ?
    {
      assistants: mentionedAssistants.map((assistant) => ({
        id: assistant.id,
        handle: assistant.handle,
      })),
    }
  : undefined;

export const useChat = (options?: useChatOptions): UseChatResult => {
  const sessionId = React.useMemo(() => options?.sessionId || '', [options?.sessionId]);
  const _incomingSettings = React.useMemo(() => options?.settings, [options?.settings]);

  const [currentSession, setCurrentSession] = React.useState<string>(sessionId || '');
  const [_settings, _stream, _apiBaseUrl, _conversationVersion, apikey, apiServiceConfig] = useAssistantStore(
    (state) => [
      state.settings,
      state.stream,
      state.apiBaseUrl,
      state.conversationVersion,
      state.apikey,
      state.apiServiceConfig,
    ]
  );
  const settings = _incomingSettings || _settings;
  const { assistantId, user: _user, hash, app } = settings;
  const user = _user || '';
  const stream = options?.stream ?? _stream ?? true;
  const apiBaseUrl = options?.apiBaseUrl || _apiBaseUrl;
  const conversationVersion = options?.conversationVersion ?? _conversationVersion ?? 1;
  const isGroupChat = options?.settings?.is_group_chat ?? _settings.is_group_chat ?? false;
  const showResponseLabel = options?.settings?.show_response_label ?? true;
  const targetAvatar = options?.settings?.target_avatar;
  const groupChatAssistants = options?.settings?.chat_target_assistants;
  const currentAssistantInfoRef = React.useRef<Pick<AssistantInfo, 'id' | 'name' | 'avatar'> | undefined>(undefined);

  const [session, newSession, updateHistory, updateSession, setDone, changeSessionId] = useSessions((state) => [
    state.sessions[currentSession],
    state.newSession,
    state.updateHistory,
    state.updateSession,
    state.setDone,
    state.changeSessionId,
  ]);

  const history = session?.history || [];
  const done = session?.done;
  const isNew = session?.isNew;

  const createNewSession = React.useCallback(() => {
    const id = newSession();
    setCurrentSession(id);
    // eslint-disable-next-line
  }, [sessionId]);

  const updateSessionId = (id: string) => {
    changeSessionId(currentSession, id);
    setCurrentSession(id);
  };

  const setSessionName = (name?: string) => {
    const _name = name || history.at(0)?.text || '';
    updateSession(currentSession, (session) => ({ ...session, name: _name, updated_at: new Date() }));
  };

  React.useEffect(() => {
    if (sessionId) {
      if (sessionId !== currentSession) setCurrentSession(sessionId);
    } else {
      createNewSession();
    }
    // eslint-disable-next-line
  }, [sessionId]);

  React.useEffect(() => {
    if (!currentSession || !assistantId) return;

    updateSession(
      currentSession,
      (session) =>
        ({
          ...session,
          assistantId,
        }) as typeof session
    );
  }, [assistantId, currentSession, updateSession]);

  const addHistoryEntry = (historyEntry: ChatHistoryEntry) => {
    updateHistory(currentSession, (history) => [...(history || []), historyEntry]);
  };

  const streamQuery = (
    query: string,
    assistantId: string,
    session_id: string,
    user?: string,
    hash?: string,
    files?: FilePublic[],
    addToHistory: boolean = true,
    mentionedAssistants: MentionedAssistant[] = []
  ) => {
    const answerId = crypto.randomUUID();
    const toolEntryId = crypto.randomUUID();
    currentAssistantInfoRef.current = undefined;

    if (!session.name) {
      setSessionName(query);
    }
    setDone(currentSession, false);

    if (addToHistory) {
      addHistoryEntry({
        origin: 'assistant',
        kind: 'message',
        text: '',
        id: answerId,
        done: false,
        assistantInfo: currentAssistantInfoRef.current,
      });
    }

    const url = createConversationUrl(apiBaseUrl || '', conversationVersion);

    let _id = '';
    let references: ChatEntryReference[] = [];

    const skHeaders: SkHeaders = {
      _skuser: user,
      _skassistant: assistantId,
      _skhash: hash,
      _skapp: app || '',
      _apikey: apikey,
    };

    const body: ConversationRequest = {
      question: query,
      session_id: isNew ? undefined : session_id || undefined,
      assistant_id: isGroupChat ? undefined : assistantId,
      group_chat_id: isGroupChat ? assistantId : undefined,
      stream: true,
      files: files?.length ? files.map((file) => ({ id: file.id })) : undefined,
      tools: mapMentionedAssistantsToTools(mentionedAssistants),
    };

    fetchEventSource(url, {
      method: 'POST',
      body: JSON.stringify(body),
      ...apiServiceConfig,
      headers: {
        Accept: 'text/event-stream',
        ...skHeaders,
        ...((apiServiceConfig?.headers ?? {}) as Record<string, string>),
      },
      onopen(res: Response) {
        if (res.status >= 400 && res.status < 500 && res.status !== 429) {
          if (addToHistory) {
            updateHistory(currentSession, (history: ChatHistory) => {
              const newHistory = [...history];
              const index = history.findIndex((chat) => chat.id === answerId);
              if (index > -1) {
                newHistory[index] = {
                  origin: 'system',
                  kind: 'message',
                  text: 'Ett fel intrÃ¤ffade, assistenten gav inget svar.',
                  id: answerId,
                  done: true,
                };
              }
              return newHistory;
            });
          }
          console.error('Client-side error ', res);
        }
        return Promise.resolve();
      },
      onmessage(event: EventSourceMessage) {
        if (!addToHistory) {
          return;
        }

        let parsedData: AskResponse | SSEToolCall;
        try {
          parsedData = JSON.parse(event.data);
        } catch {
          console.error('Error when parsing response as json. Returning.');
          return;
        }

        if (isToolCallEvent(event, parsedData)) {
          const toolData = parsedData as SSEToolCall;
          updateHistory(currentSession, (history: ChatHistory) =>
            upsertToolHistoryEntry(history, {
              id: toolEntryId,
              toolCalls: toolData.tools || [],
              assistantInfo: currentAssistantInfoRef.current,
            })
          );
          return;
        }

        const answerData = parsedData as AskResponse;
        if (currentSession !== answerData.session_id && isNew) {
          _id = answerData.session_id;
        }

        const parsedReferences = mapReferencesToChatEntryReferences(answerData.references || []);
        if (parsedReferences.length > 0) {
          references = parsedReferences;
        }

        updateHistory(currentSession, (history: ChatHistory) => {
          const newHistory = finalizePendingToolEntries(history);
          const index = newHistory.findIndex((chat) => chat.id === answerId);
          const newAssistantInfo = getAssistantInfoFromResponse(answerData, {
            currentAssistantId: assistantId,
            showResponseLabel,
            groupChatAssistants,
          });
          if (newAssistantInfo) {
            currentAssistantInfoRef.current = newAssistantInfo;
          }

          if (index === -1 || newHistory[index]?.kind === 'tool') {
            newHistory.push({
              origin: 'assistant',
              kind: 'message',
              text: answerData?.answer ?? '',
              id: answerId,
              assistantInfo: newAssistantInfo ?? currentAssistantInfoRef.current,
              references,
              done: false,
            });
          } else {
            newHistory[index] = {
              ...newHistory[index],
              origin: 'assistant',
              kind: 'message',
              text: newHistory[index]?.text + (answerData?.answer ?? ''),
              done: false,
              assistantInfo: newAssistantInfo ?? newHistory[index]?.assistantInfo ?? currentAssistantInfoRef.current,
              references: references.length > 0 ? references : newHistory[index]?.references,
            };
          }

          return newHistory;
        });
      },
      onclose() {
        let id = currentSession;
        if (currentSession !== _id && isNew) {
          updateSessionId(_id);
          id = _id;
        }
        if (addToHistory) {
          updateHistory(id, (history: ChatHistory) => {
            const newHistory = finalizePendingEntries(finalizePendingToolEntries(history));
            const index = newHistory.findIndex((chat) => chat.id === answerId);

            if (index > -1) {
              if (newHistory[index].kind === 'tool') {
                return newHistory;
              }
              newHistory[index] = {
                ...newHistory[index],
                kind: 'message',
                done: true,
                references: references.length > 0 ? references : newHistory[index]?.references,
              };
            }

            return newHistory;
          });
        }
        setDone(currentSession, true);
      },
      onerror(err: unknown) {
        console.error('There was an error from server', err);
        addHistoryEntry({
          origin: 'system',
          kind: 'message',
          text: 'Ett fel intrÃ¤ffade, kunde inte kommunicera med assistent.',
          id: '0',
          done: true,
        });
        setDone(currentSession, true);
        throw err;
      },
    }).catch(() => setDone(currentSession, true));
  };

  const sendQuery = (
    query: string,
    files?: FilePublic[],
    addToHistory?: { question: boolean; answer: boolean } | boolean,
    mentionedAssistants: MentionedAssistant[] = []
  ) => {
    const addQuestionToHistory = typeof addToHistory === 'boolean' ? addToHistory : (addToHistory?.question ?? true);
    const addAnswerToHistory = typeof addToHistory === 'boolean' ? addToHistory : (addToHistory?.answer ?? true);

    if (!assistantId) {
      addHistoryEntry({
        origin: 'system',
        kind: 'message',
        text: 'Ett fel intrÃ¤ffade, ingen assistent att kommunicera med.',
        id: '0',
        done: true,
      });
      setDone(currentSession, true);
      return;
    }

    if (session?.feedback) {
      updateSession(currentSession, (currentSessionState) => ({
        ...currentSessionState,
        feedback: undefined,
      }));
    }

    const questionId = crypto.randomUUID();
    if (addQuestionToHistory) {
      addHistoryEntry({
        origin: 'user',
        kind: 'message',
        text: query,
        id: questionId,
        files,
        done: true,
        mentionedAssistants,
      });
    }

    if (stream) {
      streamQuery(
        query,
        assistantId,
        isNew ? '' : currentSession,
        user,
        hash ?? '',
        files,
        addAnswerToHistory,
        mentionedAssistants
      );
    } else {
      setDone(currentSession, false);
      const answerId = crypto.randomUUID();
      currentAssistantInfoRef.current = undefined;
      if (!session.name) {
        setSessionName(query);
      }
      const url = createConversationUrl(apiBaseUrl || '', conversationVersion);
      const skHeaders: SkHeaders = {
        _skuser: user,
        _skassistant: assistantId,
        _skhash: hash,
        _skapp: app || '',
        _apikey: apikey,
      };
      const body: ConversationRequest = {
        question: query,
        session_id: isNew ? undefined : currentSession || undefined,
        assistant_id: isGroupChat ? undefined : assistantId,
        group_chat_id: isGroupChat ? assistantId : undefined,
        stream: false,
        files: files?.length ? files.map((file) => ({ id: file.id })) : undefined,
        tools: mapMentionedAssistantsToTools(mentionedAssistants),
      };

      return fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        ...apiServiceConfig,
        headers: {
          Accept: 'application/json',
          ...skHeaders,
          ...((apiServiceConfig?.headers ?? {}) as Record<string, string>),
        },
      })
        .then((res) => {
          if (res.status === 401) {
            throw new Error('401 Not authorized');
          }

          return res.json();
        })
        .then((res: AskResponseWithToolCalls) => {
          const responseAssistantInfo = getAssistantInfoFromResponse(res, {
            currentAssistantId: assistantId,
            showResponseLabel,
            groupChatAssistants,
          });
          if (responseAssistantInfo) {
            currentAssistantInfoRef.current = responseAssistantInfo;
          }

          if (addAnswerToHistory) {
            updateHistory(currentSession, (history: ChatHistory) => {
              const newHistory =
                res.tool_calls?.length ?
                  upsertToolHistoryEntry(history, {
                    id: crypto.randomUUID(),
                    toolCalls: res.tool_calls,
                    done: true,
                    assistantInfo: responseAssistantInfo ?? currentAssistantInfoRef.current,
                  })
                : [...history];

              newHistory.push({
                origin: 'assistant',
                kind: 'message',
                text: res?.answer ?? '',
                id: answerId,
                assistantInfo: responseAssistantInfo ?? currentAssistantInfoRef.current,
                done: true,
                references: mapReferencesToChatEntryReferences(res.references || []),
              });

              return newHistory;
            });
          }
          setDone(currentSession, true);
          if (session.id !== res.session_id && isNew) {
            updateSessionId(res.session_id);
          }
          return res;
        })
        .catch((e) => {
          console.error('Error occured:', e);
          if (addAnswerToHistory) {
            updateHistory(currentSession, (history: ChatHistory) => [
              ...history,
              {
                origin: 'system',
                kind: 'message',
                text: 'Ett fel intrÃ¤ffade, assistenten gav inget svar',
                id: answerId,
                done: true,
              },
            ]);
          }
          setDone(currentSession, true);
        });
    }
  };

  return {
    history,
    addHistoryEntry,
    newSession: createNewSession,
    done,
    session,
    sendQuery,
  };
};
