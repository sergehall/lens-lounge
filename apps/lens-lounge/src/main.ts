import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigType } from '../config/configuration';
import { ConfigService } from '@nestjs/config';
import { createApp } from '../create-app';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true,
  });

  // Apply configurations using the createApp function (assuming it configures the app)
  createApp(app);

  // Retrieve the configuration service to access environment variables
  const configService = app.get(ConfigService<ConfigType, true>);
  console.log(
    `Configuration loaded: ${JSON.stringify(configService.get('PORT'))}`,
  );

  // Retrieve the port from environment variables, default to 5000 if not provided
  const port = configService.get<number>('PORT') || 5000;

  // const port = 5000;

  // Start the application and listen on the specified port
  await app.listen(port, () => {
    console.log(`Lens-lounge app listening on port: ${port}`);
  });

  const baseUrl = await app.getUrl();
  console.log(`Application is running on url: ${baseUrl}`);
}
bootstrap();
