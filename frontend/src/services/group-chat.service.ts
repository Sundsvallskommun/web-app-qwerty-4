import { GroupChatPublic } from '@data-contracts/backend/data-contracts';
import { apiService } from '@services/api.service';

export const getGroupChat = (id: string) => {
  return apiService.get<GroupChatPublic>(`/group-chats/${id}`).then((res) => res.data);
};
