import { Message, SessionPublic } from '@data-contracts/backend/data-contracts';
import { AssistantInfo } from '@sk-web-gui/ai';
import { ChatHistory, ChatHistoryEntry } from 'src/types/history.type';

const getMessageAssistant = (message: Message, assistant: AssistantInfo) => {
  const tools = Array.isArray(message.tools) ? message.tools : [];
  const toolAssistant = tools.find((tool) => tool?.assistants?.length)?.assistants?.[0];

  return {
    id: toolAssistant?.id ?? assistant.id,
    name: toolAssistant?.handle ?? assistant.name,
    avatar: assistant.avatar,
  };
};

export const mapSessionMessagesToHistory = (session: SessionPublic, assistant: AssistantInfo): ChatHistory => {
  return (session.messages ?? []).flatMap((message): ChatHistoryEntry[] => {
    const entries: ChatHistoryEntry[] = [];

    if (message.question?.trim()) {
      entries.push({
        origin: 'user',
        text: message.question,
        id: `${message.id ?? crypto.randomUUID()}-question`,
        done: true,
        files: message.files,
      });
    }

    if (message.answer?.trim()) {
      entries.push({
        origin: 'assistant',
        text: message.answer,
        id: `${message.id ?? crypto.randomUUID()}-answer`,
        done: true,
        references:
          message.references?.slice(0, 3).map((reference) => ({
            title: reference.metadata?.title || reference.metadata?.url || '',
            url: reference.metadata?.url || '',
          })) || [],
        files: message.generated_files,
        assistantInfo: getMessageAssistant(message, assistant),
      });
    }

    return entries;
  });
};

