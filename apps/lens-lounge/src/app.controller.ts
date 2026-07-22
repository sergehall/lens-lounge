import { Controller, Get } from '@nestjs/common';
import { AppService, type JsonPlaceholderPost } from './app.service';
import * as os from 'os';
import { BaseConfig } from '../config/base/base.config';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('App')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly baseConfig: BaseConfig,
  ) {}

  @Get()
  getHelloApp(): string {
    return this.appService.getHello();
  }

  @Get('version')
  async getVersionApp(): Promise<string> {
    const version = await this.baseConfig.getVersion('VERSION_2');
    const hostname = os.hostname();
    return `<h1>VERSION: ${version}. Hello from ${hostname}</h1>`;
  }

  @Get('heroku-version')
  getHerokuVersion(): Promise<string> {
    return this.appService.getHerokuVersion();
  }

  @Get('placeholder/posts')
  jsonPlaceholder(): Promise<readonly JsonPlaceholderPost[]> {
    return this.appService.getJsonPlaceholderPosts();
  }
}
