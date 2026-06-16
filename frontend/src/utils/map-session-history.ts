import { Message, SessionPublic } from '@data-contracts/backend/data-contracts';
import { AssistantInfo } from '@sk-web-gui/ai';
import { MentionedAssistant } from '@components/ai-feed/at-assistant-util';
import { ChatHistory, ChatHistoryEntry } from '../types/history.type';
import { ChatTarget, ChatTargetAssistantIdentityMap } from '../types/chat-target.type';
const getMessageAssistant = (
  message: Message,
  assistant: AssistantInfo,
  options?: {
    target?: ChatTarget;
    groupChatAssistants?: ChatTargetAssistantIdentityMap;
  }
) => {
  const target = options?.target;
  if (target && 'show_response_label' in target && target.show_response_label === false) {
    return undefined;
  }

  const toolAssistant = message.tools?.assistants?.[0];
  if (!toolAssistant) {
    return undefined;
  }

  const namedAssistant =
    (toolAssistant?.id && options?.groupChatAssistants?.[toolAssistant.id]) ||
    (toolAssistant ?
      {
        id: toolAssistant.id,
        name: toolAssistant.handle,
      }
    : undefined);

  return {
    id: namedAssistant?.id ?? assistant.id,
    name: namedAssistant?.name ?? assistant.name,
    avatar: namedAssistant?.avatar,
  };
};

const getMentionedAssistants = (message: Message): MentionedAssistant[] =>
  (message.tools?.assistants ?? []).map((assistant) => ({
    id: assistant.id,
    name: assistant.handle,
    handle: assistant.handle,
  }));

export const mapSessionMessagesToHistory = (
  session: SessionPublic,
  assistant: AssistantInfo,
  options?: {
    target?: ChatTarget;
    groupChatAssistants?: ChatTargetAssistantIdentityMap;
  }
): ChatHistory => {
  return (session.messages ?? []).flatMap((message): ChatHistoryEntry[] => {
    const entries: ChatHistoryEntry[] = [];

    if (message.question?.trim()) {
      entries.push({
        origin: 'user',
        kind: 'message',
        text: message.question,
        id: `${message.id ?? crypto.randomUUID()}-question`,
        done: true,
        files: message.files,
        mentionedAssistants: getMentionedAssistants(message),
      });
    }

    if ((message.tool_calls?.length ?? 0) > 0) {
      entries.push({
        origin: 'assistant',
        kind: 'tool',
        text: '',
        id: `${message.id ?? crypto.randomUUID()}-tools`,
        done: true,
        toolCalls: message.tool_calls,
        assistantInfo: getMessageAssistant(message, assistant, options),
      });
    }

    if (message.answer?.trim()) {
      entries.push({
        origin: 'assistant',
        kind: 'message',
        text: message.answer,
        id: `${message.id ?? crypto.randomUUID()}-answer`,
        done: true,
        references:
          message.references?.map((reference) => ({
            id: reference.id,
            title: reference.metadata?.title || reference.metadata?.url || reference.id,
            url: reference.metadata?.url || undefined,
        })) || [],
        files: message.generated_files,
        assistantInfo: getMessageAssistant(message, assistant, options),
      });
    }

    return entries;
  });
};
