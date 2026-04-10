jest.mock('@sk-web-gui/ai', () => ({
  useAssistantStore: {
    getState: () => ({
      apiBaseUrl: 'http://localhost:3001/api',
    }),
  },
}));

jest.mock('@services/api.service', () => ({
  apiService: {
    get: jest.fn(),
  },
}));

import { apiService } from '@services/api.service';
import { getAzureToken } from '@services/azure-service';

describe('Azure service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('caches the Azure token between calls', async () => {
    (apiService.get as jest.Mock).mockResolvedValue({
      data: {
        data: {
          token: 'speech-token',
          region: 'swedencentral',
        },
      },
    });

    const first = await getAzureToken();
    const second = await getAzureToken();

    expect(first).toEqual({ authToken: 'speech-token', region: 'swedencentral' });
    expect(second).toEqual({ authToken: 'speech-token', region: 'swedencentral' });
    expect(apiService.get).toHaveBeenCalledTimes(1);
    expect(apiService.get).toHaveBeenCalledWith('/azure/login');
  });
});
