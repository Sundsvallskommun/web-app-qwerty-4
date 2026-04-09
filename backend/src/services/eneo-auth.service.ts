import { ENEO_TENANT_ID } from '@/config';
import { getApiBase } from '@/config/api-config';
import { CallbackRequest, InitiateAuthResponse, UserPublic } from '@/data-contracts/eneo-sundsvall/data-contracts';
import { HttpException } from '@/exceptions/HttpException';
import { User } from '@/interfaces/users.interface';
import { apiURL } from '@/utils/util';
import { logger } from '@utils/logger';
import axios, { AxiosError, AxiosHeaders, AxiosInstance, AxiosRequestConfig, AxiosRequestHeaders } from 'axios';
import { randomUUID } from 'crypto';
import ApiTokenService from './api-token.service';

const apiTokenService = new ApiTokenService();

class EneoAuthService {
  private instance: AxiosInstance;
  private basePath = `${getApiBase('eneo-sundsvall')}/auth`;
  private usersBasePath = `${getApiBase('eneo-sundsvall')}/users`;

  constructor() {
    this.instance = axios.create();
  }

  private async withGatewayHeaders(headers?: AxiosRequestHeaders): Promise<AxiosHeaders> {
    const token = await apiTokenService.getToken();

    return AxiosHeaders.from({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'X-Request-Id': randomUUID(),
      ...headers,
    });
  }

  private async request<T>(config: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.instance({
        ...config,
        url: apiURL(config.url),
        headers: await this.withGatewayHeaders(config.headers as AxiosRequestHeaders),
      });

      return response.data as T;
    } catch (error: unknown | AxiosError) {
      if (axios.isAxiosError(error) && error.response?.data) {
        logger.error(`Eneo auth request failed with status: ${error.response.status}`);
        logger.error('Error details:', error.response.data);
        logger.error('Error url:', error.response.config.url);
        throw new HttpException(error.response.status ?? 500, error.response.data?.detail ?? 'Internal server error');
      }

      logger.error('Unknown eneo auth error:', error);
      throw new HttpException(500, 'Internal server error');
    }
  }

  public async initiateAuth(redirectUri: string): Promise<InitiateAuthResponse> {
    const params: Record<string, string> = {
      redirect_uri: redirectUri,
    };
    if (ENEO_TENANT_ID) {
      params.tenant = ENEO_TENANT_ID;
    }

    return this.request<InitiateAuthResponse>({
      method: 'GET',
      url: `${this.basePath}/initiate`,
      params,
    });
  }

  public async callbackAuth(data: CallbackRequest): Promise<string> {
    return this.request<string>({
      method: 'POST',
      url: `${this.basePath}/callback`,
      data,
    });
  }

  public async getCurrentUser(authToken: string): Promise<UserPublic> {
    return this.request<UserPublic>({
      method: 'GET',
      url: `${this.usersBasePath}/me/`,
      headers: {
        'X-Authorization': `Bearer ${authToken}`,
      },
    });
  }

  public async getSessionUser(authToken: string): Promise<User> {
    const currentUser = await this.getCurrentUser(authToken);
    const username = currentUser.username || currentUser.email;

    return {
      username,
      name: username,
      givenName: username,
      surname: '',
    };
  }
}

export default EneoAuthService;
