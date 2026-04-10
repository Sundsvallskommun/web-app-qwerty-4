describe('azure.service', () => {
  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('fails when Azure credentials are missing', async () => {
    await jest.isolateModulesAsync(async () => {
      jest.doMock('@/config', () => ({
        ...jest.requireActual('@/config'),
        AZURE_REGION: '',
        AZURE_SUBSCRIPTION_KEY: '',
      }));

      const { getToken } = require('@/services/azure.service');

      await expect(getToken()).rejects.toMatchObject({
        httpCode: 500,
        message: 'Azure Speech service is not configured',
      });
    });
  });

  it('returns the Azure token from Speech STS', async () => {
    await jest.isolateModulesAsync(async () => {
      const post = jest.fn().mockResolvedValue({ data: 'speech-token' });

      jest.doMock('axios', () => ({
        __esModule: true,
        default: {
          post,
          isAxiosError: jest.fn(() => false),
        },
      }));
      jest.doMock('@/config', () => ({
        ...jest.requireActual('@/config'),
        AZURE_REGION: 'swedencentral',
        AZURE_SUBSCRIPTION_KEY: 'test-key',
      }));

      const { getToken } = require('@/services/azure.service');

      await expect(getToken()).resolves.toBe('speech-token');
      expect(post).toHaveBeenCalledWith(
        'https://swedencentral.api.cognitive.microsoft.com/sts/v1.0/issueToken',
        undefined,
        {
          headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': 'test-key',
          },
        },
      );
    });
  });

  it('maps Azure upstream failures to a gateway error', async () => {
    await jest.isolateModulesAsync(async () => {
      const error = {
        response: {
          status: 401,
          data: { error: 'Unauthorized' },
        },
        message: 'Request failed',
      };

      jest.doMock('axios', () => ({
        __esModule: true,
        default: {
          post: jest.fn().mockRejectedValue(error),
          isAxiosError: jest.fn(() => true),
        },
      }));
      jest.doMock('@/config', () => ({
        ...jest.requireActual('@/config'),
        AZURE_REGION: 'swedencentral',
        AZURE_SUBSCRIPTION_KEY: 'test-key',
      }));

      const { getToken } = require('@/services/azure.service');

      await expect(getToken()).rejects.toMatchObject({
        httpCode: 502,
        message: 'Could not fetch Azure Speech token',
      });
    });
  });
});
