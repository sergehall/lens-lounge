import { BadGatewayException, Injectable } from '@nestjs/common';

const OUTBOUND_REQUEST_TIMEOUT_MS = 5_000;
const HEROKU_VERSION_URL =
  'https://lens-lounge-3112bdef3757.herokuapp.com/version';
const JSON_PLACEHOLDER_POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

export interface JsonPlaceholderPost {
  readonly userId: number;
  readonly id: number;
  readonly title: string;
  readonly body: string;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isJsonPlaceholderPost(value: unknown): value is JsonPlaceholderPost {
  return (
    isRecord(value) &&
    typeof value.userId === 'number' &&
    typeof value.id === 'number' &&
    typeof value.title === 'string' &&
    typeof value.body === 'string'
  );
}

function parseJsonPlaceholderPosts(
  value: unknown,
): readonly JsonPlaceholderPost[] {
  if (!Array.isArray(value) || !value.every(isJsonPlaceholderPost)) {
    throw new Error('JSONPlaceholder returned an invalid posts payload');
  }

  return value;
}

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getHerokuVersion(): Promise<string> {
    return this.fetchExternal(
      HEROKU_VERSION_URL,
      'text/html',
      (response) => response.text(),
      'Failed to fetch Heroku version',
    );
  }

  getJsonPlaceholderPosts(): Promise<readonly JsonPlaceholderPost[]> {
    return this.fetchExternal(
      JSON_PLACEHOLDER_POSTS_URL,
      'application/json',
      async (response) =>
        parseJsonPlaceholderPosts((await response.json()) as unknown),
      'Failed to fetch placeholder posts',
    );
  }

  private async fetchExternal<T>(
    url: string,
    accept: string,
    parseResponse: (response: Response) => Promise<T>,
    failureMessage: string,
  ): Promise<T> {
    try {
      const response = await fetch(url, {
        headers: { Accept: accept },
        signal: AbortSignal.timeout(OUTBOUND_REQUEST_TIMEOUT_MS),
      });

      if (!response.ok) {
        throw new Error(
          `Upstream request failed with HTTP status ${response.status}`,
        );
      }

      return await parseResponse(response);
    } catch (error: unknown) {
      const reason = error instanceof Error ? error.message : 'Unknown error';
      console.error(`${failureMessage}: ${reason}`);
      throw new BadGatewayException(failureMessage, { cause: error });
    }
  }
}
