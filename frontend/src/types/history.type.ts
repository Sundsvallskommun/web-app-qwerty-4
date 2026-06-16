import { FilePublic, ToolCallInfo } from '@data-contracts/backend/data-contracts';
import { AssistantInfo, AssistantSession } from '@sk-web-gui/ai';
import type { MentionedAssistant } from '@components/ai-feed/at-assistant-util';

export type Origin = 'user' | 'assistant' | 'system';
export type ChatEntryKind = 'message' | 'tool';
export interface ChatEntryReference {
  id: string;
  title: string;
  url?: string;
}
export interface ChatHistoryEntry {
  origin: Origin;
  kind?: ChatEntryKind;
  text: string;
  references?: ChatEntryReference[];
  id: string;
  done?: boolean;
  files?: FilePublic[];
  toolCalls?: ToolCallInfo[];
  /**
   * Optional assistant information.
   * For attributed assistant responses, such as group chats or delegated tool assistants.
   */
  assistantInfo?: Pick<AssistantInfo, 'id' | 'name' | 'avatar'>;
  mentionedAssistants?: MentionedAssistant[];
}
export type ChatHistory = ChatHistoryEntry[];
export type SessionHistory = AssistantSession[];
