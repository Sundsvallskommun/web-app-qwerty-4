import { FilePublic } from '@data-contracts/backend/data-contracts';
import { AssistantInfo, AssistantSession } from '@sk-web-gui/ai';

export type Origin = 'user' | 'assistant' | 'system';
export interface ChatEntryReference {
  id: string;
  title: string;
  url?: string;
}
export interface ChatHistoryEntry {
  origin: Origin;
  text: string;
  references?: ChatEntryReference[];
  id: string;
  done?: boolean;
  files?: FilePublic[];
  /**
   * Optional assistant information.
   * For group chat assistants.
   */
  assistantInfo?: Pick<AssistantInfo, 'id' | 'name' | 'avatar'>;
}
export type ChatHistory = ChatHistoryEntry[];
export type SessionHistory = AssistantSession[];
