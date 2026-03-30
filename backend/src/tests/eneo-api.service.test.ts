describe('EneoApiService headers', () => {
  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('uses api-key in development', () => {
    jest.isolateModules(() => {
      jest.doMock('@/config', () => ({
        ...jest.requireActual('@/config'),
        ENEO_API_KEY: 'dev-key',
        NODE_ENV: 'development',
      }));
      const EneoApiService = require('@/services/eneo-api.service').default;
      const service = new EneoApiService();

      const headers = service.getAuthHeader({ session: { authToken: 'ignored' } });

      expect(headers).toEqual({ 'api-key': 'dev-key' });
    });
  });

  it('adds X-Authorization in production without replacing the gateway Authorization header', () => {
    jest.isolateModules(() => {
      jest.doMock('@/config', () => ({
        ...jest.requireActual('@/config'),
        ENEO_API_KEY: 'dev-key',
        NODE_ENV: 'production',
      }));
      const EneoApiService = require('@/services/eneo-api.service').default;
      const service = new EneoApiService();

      const headers = service.getAuthHeader({ session: { authToken: 'user-token' } });

      expect(headers).toEqual({ 'X-Authorization': 'Bearer user-token' });
      expect(headers.Authorization).toBeUndefined();
    });
  });
});
