import { Controller, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('auth')
export class AppController {
  constructor(private authService: AppService) {}

  @Post('login')
  async login(@Body() body: Record<string, any>) {
    return this.authService.login(body.username, body.password);
  }
  @Post('register')
  async register(@Body() body: Record<string, any>) {
    return this.authService.register(body);
  }
}