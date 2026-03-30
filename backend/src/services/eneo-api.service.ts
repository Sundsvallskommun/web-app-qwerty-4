import { AxiosRequestConfig } from 'axios';
import ApiService from './api.service';
import { ENEO_API_KEY, NODE_ENV } from '@/config';
import { RequestWithUser } from '@/interfaces/auth.interface';

class EneoApiService {
  private apiService = new ApiService();

  private getAuthHeader = (req: RequestWithUser): AxiosRequestConfig['headers'] => {
    if (NODE_ENV === 'development') {
      return { 'api-key': ENEO_API_KEY };
    }

    return { 'X-Authorization': `Bearer ${req.session.authToken}` };
  };

  public async get<T>(config: AxiosRequestConfig, req: RequestWithUser) {
    return this.apiService.get<T>({ ...config, headers: { ...config.headers, ...this.getAuthHeader(req) } }, req.user);
  }

  public async post<T, D>(config: AxiosRequestConfig<D>, req: RequestWithUser) {
    return this.apiService.post<T, D>({ ...config, headers: { ...config.headers, ...this.getAuthHeader(req) } }, req.user);
  }

  public async patch<T, D>(config: AxiosRequestConfig<D>, req: RequestWithUser) {
    return this.apiService.patch<T, D>({ ...config, headers: { ...config.headers, ...this.getAuthHeader(req) } }, req.user);
  }

  public async delete<T>(config: AxiosRequestConfig, req: RequestWithUser) {
    return this.apiService.delete<T>({ ...config, headers: { ...config.headers, ...this.getAuthHeader(req) } }, req.user);
  }
}

export default EneoApiService;
