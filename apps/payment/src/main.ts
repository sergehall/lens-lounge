import { NestFactory } from '@nestjs/core';
import { PaymentModule } from './payment.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(PaymentModule, {
    rawBody: true,
  });

  // Retrieve the port from environment variables, default to 5002 if not provided
  const port = process.env.PORT || 5002;

  // Start the application and listen on the specified port
  await app.listen(port, () => {
    console.log(`Payment app listening on port: ${port}`);
  });

  const baseUrl = await app.getUrl();
  console.log(`Application is running on url: ${baseUrl}`);
}
bootstrap();
