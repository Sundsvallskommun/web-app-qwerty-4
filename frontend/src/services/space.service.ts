import { Applications, PaginatedResponseSpaceSparse, SpacePublic } from '@data-contracts/backend/data-contracts';
import { apiService } from '@services/api.service';

export const getSpaces = (include_applications: boolean, include_personal: boolean) => {
  return apiService.get<PaginatedResponseSpaceSparse>('spaces', { params: { include_applications, include_personal } });
};

export const getSpace = (id: string) => {
  return apiService.get<SpacePublic>(`spaces/${id}`);
};
export const getPersonalSpace = () => {
  return apiService.get<SpacePublic>(`spaces/personal`);
};

export const getSpaceApplications = (id: string) => {
  return apiService.get<Applications>(`spaces/${id}/applications`).then((res) => res.data);
};
