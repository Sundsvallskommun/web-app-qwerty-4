import { PinnedAssistantsDto } from '@data-contracts/backend/data-contracts';
import { apiService } from '@services/api.service';

export const getPinnedAssistants = () => {
  return apiService.get<PinnedAssistantsDto>('/assistants/pinned').then((res) => res.data);
};

export const updatePinnedAssistants = (data: PinnedAssistantsDto) => {
  return apiService.put<PinnedAssistantsDto, PinnedAssistantsDto>('/assistants/pinned', data).then((res) => res.data);
};
