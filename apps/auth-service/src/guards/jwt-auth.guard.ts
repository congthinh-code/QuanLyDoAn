import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Thiếu token hoặc token không hợp lệ!');
    }

    const token = authHeader.split(' ')[1];
    try {
      // Giải mã token và lưu payload vào request.user
      const payload = await this.jwtService.verifyAsync(token);
      request.user = payload; 
      return true;
    } catch {
      throw new UnauthorizedException('Token đã hết hạn hoặc không hợp lệ!');
    }
  }
}