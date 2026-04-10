import {
  AssistantPublic,
  CursorPaginatedResponseSessionMetadataPublic,
  SessionFeedback,
  SessionPublic,
} from '@data-contracts/backend/data-contracts';
import { apiService } from '@services/api.service';

export const getAssistant = (id: string) => {
  return apiService.get<AssistantPublic>(`/assistants/${id}`).then((res) => res.data);
};

export const getAssistantSessions = (id: string) => {
  return apiService
    .get<CursorPaginatedResponseSessionMetadataPublic>(`/assistants/${id}/sessions`)
    .then((res) => res.data);
};

export const getAssistantSession = (id: string, sessionId: string) => {
  return apiService.get<SessionPublic>(`/assistants/${id}/sessions/${sessionId}`).then((res) => res.data);
};
export const giveFeedback = async (feedback: SessionFeedback, sessionId: string) => {
  return apiService.post(`/conversations/${sessionId}/feedback`, feedback).then((res) => res.data);
};
