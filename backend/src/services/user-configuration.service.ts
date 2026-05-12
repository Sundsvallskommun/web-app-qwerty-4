import { MUNICIPALITY_ID, NAMESPACE } from '@/config';
import { getApiBase } from '@/config/api-config';
import { Configuration as ConfigurationInterface } from '@/data-contracts/configuration/data-contracts';
import { User } from '@/interfaces/users.interface';
import ApiService from '@/services/api.service';

type ConfigurationData = Record<string, string[]>;

export class UserConfigurationService {
  private apiService = new ApiService();
  private basePath = `${getApiBase('configuration')}/${MUNICIPALITY_ID}/${NAMESPACE}/configurations`;

  private getApplication = (user: User) => user.username.toLowerCase();

  private getConfigurationUrl = (user: User) => `${this.basePath}/${this.getApplication(user)}`;

  public async getConfiguration(user: User): Promise<ConfigurationInterface | undefined> {
    try {
      const result = await this.apiService.get<ConfigurationInterface>({ url: this.getConfigurationUrl(user) }, user);
      return result.data;
    } catch (e: any) {
      if (e?.status === 404 || e?.httpCode === 404) {
        return undefined;
      }

      throw e;
    }
  }

  public async updateConfigurationData(user: User, data: ConfigurationData): Promise<ConfigurationInterface> {
    const existingConfiguration = await this.getConfiguration(user);
    const url = this.getConfigurationUrl(user);
    const payload: ConfigurationInterface = {
      data: {
        ...(existingConfiguration?.data ?? {}),
        ...data,
      },
    };

    try {
      const result = await this.apiService.put<ConfigurationInterface, ConfigurationInterface>({ url, data: payload }, user);
      return result.data;
    } catch (e: any) {
      if (e?.status !== 404 && e?.httpCode !== 404) {
        throw e;
      }
    }

    const result = await this.apiService.post<ConfigurationInterface, ConfigurationInterface>({ url, data: payload }, user);
    return result.data;
  }
}
