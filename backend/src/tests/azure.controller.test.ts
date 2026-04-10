import request from 'supertest';
import { localApi } from '@/utils/util';

describe('AzureController', () => {
  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('returns the Azure token response shape', async () => {
    await jest.isolateModulesAsync(async () => {
      jest.doMock('@/middlewares/auth.middleware', () => ({
        __esModule: true,
        default: (_req: unknown, _res: unknown, next: () => void) => next(),
      }));
      jest.doMock('@/services/azure.service', () => ({
        getToken: jest.fn().mockResolvedValue('speech-token'),
      }));
      jest.doMock('@/config', () => ({
        ...jest.requireActual('@/config'),
        AZURE_REGION: 'swedencentral',
      }));

      const App = require('@/app').default;
      const { AzureController } = require('@/controllers/azure.controller');
      const app = new App([AzureController]);

      const response = await request(app.getServer()).get(localApi('azure/login')).expect(200);

      expect(response.body).toEqual({
        data: { token: 'speech-token', region: 'swedencentral' },
        message: 'success',
      });
    });
  });

  it('preserves service errors instead of replacing them', async () => {
    await jest.isolateModulesAsync(async () => {
      jest.doMock('@/middlewares/auth.middleware', () => ({
        __esModule: true,
        default: (_req: unknown, _res: unknown, next: () => void) => next(),
      }));
      jest.doMock('@/services/azure.service', () => ({
        getToken: jest.fn().mockRejectedValue({ httpCode: 502, message: 'Could not fetch Azure Speech token' }),
      }));
      jest.doMock('@/config', () => ({
        ...jest.requireActual('@/config'),
        AZURE_REGION: 'swedencentral',
      }));

      const App = require('@/app').default;
      const { AzureController } = require('@/controllers/azure.controller');
      const app = new App([AzureController]);

      const response = await request(app.getServer()).get(localApi('azure/login')).expect(502);

      expect(response.body).toEqual({ message: 'Could not fetch Azure Speech token' });
    });
  });
});
