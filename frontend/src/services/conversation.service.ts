import {
  CursorPaginatedResponseSessionMetadataPublic,
  SessionPublic,
} from '@data-contracts/backend/data-contracts';
import type { ChatTargetType } from '../types/chat-target';
import { apiService } from '@services/api.service';

const getConversationTargetParams = (targetType: ChatTargetType, targetId: string) =>
  targetType === 'group_chat' ? { group_chat_id: targetId } : { assistant_id: targetId };

export const getConversationSessions = (targetType: ChatTargetType, targetId: string) => {
  return apiService
    .get<CursorPaginatedResponseSessionMetadataPublic>('/conversations', {
      params: getConversationTargetParams(targetType, targetId),
    })
    .then((res) => res.data);
};

export const getConversation = (sessionId: string) => {
  return apiService.get<SessionPublic>(`/conversations/${sessionId}`).then((res) => res.data);
};
