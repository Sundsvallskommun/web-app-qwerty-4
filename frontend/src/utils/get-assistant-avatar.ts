import {
  AssistantPublic,
  AssistantSparse,
  GroupChatPublic,
  GroupChatSparse,
} from '@data-contracts/backend/data-contracts';
import { getChatTargetAvatar } from './chat-target';

export const getAssistantAvatar = (
  assistant?: AssistantPublic | AssistantSparse | GroupChatPublic | GroupChatSparse,
  personal?: boolean
): string | undefined => {
  return getChatTargetAvatar(assistant, personal);
};
