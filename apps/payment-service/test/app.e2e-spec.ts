import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { PaymentServiceModule } from '../src/payment-service.module';

describe('PaymentServiceController (e2e)', () => {
  let app: INestApplication;
  let baseUrl: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [PaymentServiceModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.listen(0, '127.0.0.1');
    baseUrl = await app.getUrl();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/api/payment-service (GET)', async () => {
    const response = await fetch(`${baseUrl}/api/payment-service`);

    expect(response.status).toBe(200);
    await expect(response.text()).resolves.toBe('Hello from payment-service!');
  });
});
