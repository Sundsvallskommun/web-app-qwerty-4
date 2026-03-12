import { FilePublic } from '@data-contracts/backend/data-contracts';
import { apiService } from './api.service';

export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append('upload_file', file);

  return apiService
    .post<FilePublic, FormData>('/files', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    .then((res) => res.data);
};
