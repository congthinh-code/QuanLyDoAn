import { Controller, Post, Body, UseGuards, Get, Req } from '@nestjs/common';
import * as express from 'express'; // <- Sửa dòng này
import { AppService } from './app.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard, Roles } from './guards/roles.guard';

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

  // Cập nhật kiểu dữ liệu req thành express.Request
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req: express.Request) {
    return {
      message: 'Lấy thông tin cá nhân thành công!',
      user: (req as any).user,
    };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Get('admin-only')
  getAdminData() {
    return {
      message: 'Dữ liệu bảo mật dành riêng cho ADMIN!',
    };
  }
}