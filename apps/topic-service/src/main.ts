import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // Tự động kiểm tra dữ liệu DTO
  app.enableCors();
  await app.listen(3000);
  console.log('Topic Service đang chạy tại port: 3000');
}
bootstrap();