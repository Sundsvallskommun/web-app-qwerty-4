import { apiURL } from './api-url';

export const iconUrl = (iconId?: string) => {
  if (!iconId) return;
  return apiURL(`/icons/${iconId}`);
};
