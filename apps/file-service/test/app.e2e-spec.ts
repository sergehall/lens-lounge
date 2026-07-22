import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { FileServiceModule } from './../src/file-service.module';

describe('FileServiceController (e2e)', () => {
  let app: INestApplication;
  let baseUrl: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [FileServiceModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.listen(0, '127.0.0.1');
    baseUrl = await app.getUrl();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/api/file-service (GET)', async () => {
    const response = await fetch(`${baseUrl}/api/file-service`);

    expect(response.status).toBe(200);
    await expect(response.text()).resolves.toBe('Hello from file-service!');
  });
});
