import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Cho Angular gọi API (cổng 4200)
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept',
    Credential: true,
  });
  
  app.setGlobalPrefix('api');
  const PORT = process.env.PORT_GATEWAY || 3000;
  await app.listen(PORT);
  console.log(`🚀 API Gateway đang chạy tại: http://localhost:${PORT}/api`);
}
void bootstrap();
