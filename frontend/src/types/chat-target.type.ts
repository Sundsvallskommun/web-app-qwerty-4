import {
  AssistantPublic,
  AssistantSparse,
  GroupChatPublic,
  GroupChatSparse,
} from '@data-contracts/backend/data-contracts';

export type ChatTargetType = 'assistant' | 'group_chat';

export type ChatTargetSparseBase = AssistantSparse | GroupChatSparse;
export type ChatTargetBase = AssistantPublic | GroupChatPublic;

export type ChatTargetSparse = ChatTargetSparseBase & {
  targetType: ChatTargetType;
  isPersonal?: boolean;
};

export type ChatTarget = ChatTargetBase & {
  targetType: ChatTargetType;
  isPersonal?: boolean;
};

export interface ChatTargetIdentity {
  id: string;
  name: string;
  avatar?: string;
}

export interface ChatTargetAssistantIdentityMap {
  [assistantId: string]: ChatTargetIdentity;
}
