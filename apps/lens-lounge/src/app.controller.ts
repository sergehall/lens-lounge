import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
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

  @Get('api')
  getHelloApp(): string {
    return this.appService.getHello();
  }

  @Get('api/version')
  async getHello(): Promise<string> {
    const version = await this.baseConfig.getVersion('VERSION_2');
    const hostname = os.hostname();
    return `<h1>VERSION: ${version}. Hello from ${hostname}</h1>`;
  }
}
