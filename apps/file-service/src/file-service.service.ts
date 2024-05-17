import { Injectable } from '@nestjs/common';

@Injectable()
export class FileServiceService {
  getHello(): string {
    return 'Hello from file-service!';
  }
}
