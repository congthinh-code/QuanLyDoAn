import {
  ValidationPipe,
} from '@nestjs/common';

import {
  NestFactory,
} from '@nestjs/core';

import {
  AppModule,
} from './app.module';

async function bootstrap() {
  const app =
    await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:4200', // Hoặc để true để cho phép tất cả các nguồn
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const port =
    process.env.PORT || 3003;

  await app.listen(port);

  console.log(
    `User Service đang chạy tại http://localhost:${port}`,
  );
}

bootstrap();