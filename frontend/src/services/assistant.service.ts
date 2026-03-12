import { AssistantPublic } from '@data-contracts/backend/data-contracts';
import { apiService } from '@services/api.service';

export const getAssistant = (id: string) => {
  return apiService.get<AssistantPublic>(`/assistants/${id}`).then((res) => res.data);
};
