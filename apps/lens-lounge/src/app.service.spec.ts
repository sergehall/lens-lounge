import { BadGatewayException } from '@nestjs/common';
import { AppService, type JsonPlaceholderPost } from './app.service';

describe('AppService', () => {
  let service: AppService;
  let fetchSpy: jest.SpiedFunction<typeof fetch>;

  beforeEach(() => {
    service = new AppService();
    fetchSpy = jest.spyOn(globalThis, 'fetch');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('returns the Heroku version response as text', async () => {
    fetchSpy.mockResolvedValue(new Response('<h1>VERSION: 2</h1>'));

    await expect(service.getHerokuVersion()).resolves.toBe(
      '<h1>VERSION: 2</h1>',
    );
    expect(fetchSpy).toHaveBeenCalledWith(
      'https://lens-lounge-3112bdef3757.herokuapp.com/version',
      {
        headers: { Accept: 'text/html' },
        signal: expect.any(AbortSignal),
      },
    );
  });

  it('returns validated JSONPlaceholder posts', async () => {
    const posts: readonly JsonPlaceholderPost[] = [
      {
        userId: 1,
        id: 1,
        title: 'A post',
        body: 'Post body',
      },
    ];
    fetchSpy.mockResolvedValue(
      new Response(JSON.stringify(posts), {
        headers: { 'Content-Type': 'application/json' },
      }),
    );

    await expect(service.getJsonPlaceholderPosts()).resolves.toEqual(posts);
  });

  it('translates unsuccessful HTTP responses into Bad Gateway errors', async () => {
    fetchSpy.mockResolvedValue(new Response(null, { status: 503 }));
    jest.spyOn(console, 'error').mockImplementation(() => undefined);

    const request = service.getHerokuVersion();

    await expect(request).rejects.toBeInstanceOf(BadGatewayException);
    await expect(request).rejects.toMatchObject({
      message: 'Failed to fetch Heroku version',
    });
  });

  it('rejects invalid JSONPlaceholder payloads', async () => {
    fetchSpy.mockResolvedValue(
      new Response(JSON.stringify([{ id: 'not-a-number' }]), {
        headers: { 'Content-Type': 'application/json' },
      }),
    );
    jest.spyOn(console, 'error').mockImplementation(() => undefined);

    const request = service.getJsonPlaceholderPosts();

    await expect(request).rejects.toBeInstanceOf(BadGatewayException);
    await expect(request).rejects.toMatchObject({
      message: 'Failed to fetch placeholder posts',
    });
  });
});
