import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import proxy from 'express-http-proxy'

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Chuyển hướng các request gửi tới /api/auth/* sang auth-service (http://localhost:3001)
    consumer
      .apply(
        proxy('http://localhost:3001', {
          proxyReqPathResolver: (req : any) => {
            // Biến đổi đường dẫn: /api/auth/login -> /auth/login
            return req.originalUrl.replace(/^\/api/, '');
          },
        }),
      )
      .forRoutes('auth'); // Áp dụng cho route bắt đầu bằng /api/auth
  }
}
