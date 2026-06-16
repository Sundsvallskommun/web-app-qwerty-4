import {
  AssistantPublic,
  SessionFeedback,
} from '@data-contracts/backend/data-contracts';
import { apiService } from '@services/api.service';

export const getAssistant = (id: string) => {
  return apiService.get<AssistantPublic>(`/assistants/${id}`).then((res) => res.data);
};
export const giveFeedback = async (feedback: SessionFeedback, sessionId: string) => {
  return apiService.post(`/conversations/${sessionId}/feedback`, feedback).then((res) => res.data);
};
