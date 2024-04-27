import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as process from 'node:process';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true,
  });

  // Retrieve the port from environment variables, default to 5000 if not provided
  const port = process.env.PORT || 5000;

  // Start the application and listen on the specified port
  await app.listen(port, () => {
    console.log(`Example app listening on port: ${port}`);
  });

  const baseUrl = await app.getUrl();
  console.log(`Application is running on url: ${baseUrl}`);
}
bootstrap();
