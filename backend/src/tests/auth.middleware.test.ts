import authMiddleware from '@/middlewares/auth.middleware';

const createRequest = () =>
  ({
    isAuthenticated: jest.fn(() => false),
    session: {
      user: undefined,
      authToken: undefined,
    },
    user: undefined,
  }) as any;

describe('authMiddleware', () => {
  it('authorizes production sessions with a stored user and token', async () => {
    const req = createRequest();
    const next = jest.fn();
    req.session.user = {
      username: 'alice',
      name: 'Alice',
      givenName: 'Alice',
      surname: 'Example',
    };
    req.session.authToken = 'token';

    await authMiddleware(req, {} as any, next);

    expect(req.user).toEqual(req.session.user);
    expect(next).toHaveBeenCalledWith();
  });

  it('rejects unauthenticated requests without a production session', async () => {
    const req = createRequest();
    const next = jest.fn();

    await authMiddleware(req, {} as any, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next.mock.calls[0][0].status).toBe(401);
    expect(next.mock.calls[0][0].message).toBe('NOT_AUTHORIZED');
  });
});
