import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Cho Angular gọi API (cổng 4200)
  app.enableCors({
    origin: 'http://localhost:4200', // Đặt chính xác Origin của Angular
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Authorization', // Thêm Authorization để gửi JWT Token!
    credentials: true, // Sửa thành credentials (viết thường, có 's')
  });
  
  app.setGlobalPrefix('api');
  const PORT = process.env.PORT_GATEWAY || 3000;
  await app.listen(PORT);
  console.log(`🚀 API Gateway đang chạy tại: http://localhost:${PORT}/api`);
}
void bootstrap();