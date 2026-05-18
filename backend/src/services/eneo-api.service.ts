import { AxiosRequestConfig } from 'axios';
import ApiService from './api.service';
import { ENEO_API_KEY, NODE_ENV } from '@/config';
import { HttpException } from '@/exceptions/HttpException';
import { RequestWithUser } from '@/interfaces/auth.interface';
import EneoAuthService from './eneo-auth.service';

class EneoApiService {
  private apiService = new ApiService();
  private authService = new EneoAuthService();

  private getAuthHeader = (req: RequestWithUser): AxiosRequestConfig['headers'] => {
    if (NODE_ENV === 'development') {
      return { 'api-key': ENEO_API_KEY };
    }

    return { 'X-Authorization': `Bearer ${req.session.authToken}` };
  };

  private isUnauthorizedError = (error: unknown): error is HttpException & { httpCode?: number } => {
    return error instanceof HttpException || (typeof error === 'object' && error !== null && ('status' in error || 'httpCode' in error));
  };

  private getErrorStatus = (error: HttpException & { httpCode?: number }) => {
    return error.status ?? error.httpCode;
  };

  private isImmediateBadTokenPath = (url?: string) => {
    return url?.endsWith('/users/me/') || url?.endsWith('/spaces/type/personal/');
  };

  private async classifyUnauthorizedError(error: unknown, config: AxiosRequestConfig, req: RequestWithUser): Promise<never> {
    if (!this.isUnauthorizedError(error) || this.getErrorStatus(error) !== 401) {
      throw error;
    }

    if (NODE_ENV === 'development') {
      throw error;
    }

    if (this.isImmediateBadTokenPath(config.url) || !(await this.authService.validateSessionToken(req.session?.authToken))) {
      throw new HttpException(401, 'NOT_AUTHORIZED');
    }

    throw new HttpException(403, 'MISSING_PERMISSIONS');
  }

  private async withUnauthorizedClassification<T>(
    config: AxiosRequestConfig,
    req: RequestWithUser,
    operation: () => Promise<T>
  ): Promise<T> {
    try {
      return await operation();
    } catch (error) {
      return this.classifyUnauthorizedError(error, config, req);
    }
  }

  public async get<T>(config: AxiosRequestConfig, req: RequestWithUser) {
    const preparedConfig = { ...config, headers: { ...config.headers, ...this.getAuthHeader(req) } };
    return this.withUnauthorizedClassification(preparedConfig, req, () => this.apiService.get<T>(preparedConfig, req.user));
  }

  public async post<T, D>(config: AxiosRequestConfig<D>, req: RequestWithUser) {
    const preparedConfig = { ...config, headers: { ...config.headers, ...this.getAuthHeader(req) } };
    return this.withUnauthorizedClassification(preparedConfig, req, () => this.apiService.post<T, D>(preparedConfig, req.user));
  }

  public async patch<T, D>(config: AxiosRequestConfig<D>, req: RequestWithUser) {
    const preparedConfig = { ...config, headers: { ...config.headers, ...this.getAuthHeader(req) } };
    return this.withUnauthorizedClassification(preparedConfig, req, () => this.apiService.patch<T, D>(preparedConfig, req.user));
  }

  public async delete<T>(config: AxiosRequestConfig, req: RequestWithUser) {
    const preparedConfig = { ...config, headers: { ...config.headers, ...this.getAuthHeader(req) } };
    return this.withUnauthorizedClassification(preparedConfig, req, () => this.apiService.delete<T>(preparedConfig, req.user));
  }
}

export default EneoApiService;
