import { UserSpaceSettingsDto } from '@data-contracts/backend/data-contracts';
import { apiService } from '@services/api.service';

export const getUserSpaceSettings = () => {
  return apiService.get<UserSpaceSettingsDto>('/user-settings/spaces').then((res) => res.data);
};

export const updateUserSpaceSettings = (data: UserSpaceSettingsDto) => {
  return apiService
    .put<UserSpaceSettingsDto, UserSpaceSettingsDto>('/user-settings/spaces', data)
    .then((res) => res.data);
};
