import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  private defaultLimit: number;
  constructor(private readonly configService: ConfigService) {
    this.defaultLimit = configService.get<number>('defaultLimit');
  }
  getHello(): string {
    return 'Hello World!';
  }
}
