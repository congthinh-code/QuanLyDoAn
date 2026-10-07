import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { timeStamp } from 'node:console';
import { timestamp } from 'rxjs';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  checkHello(){
    return{
      status:'OK',
      message: 'NestJS và Angular kết nối thành công',
      timestamp: new Date().toISOString(),
    }
  }
}
