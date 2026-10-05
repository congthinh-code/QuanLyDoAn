import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Taikhoan } from './taikhoan/taikhoan.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'DESKTOP-HPVT16T',
      port: 1433,
      username: 'sa',
      password: '123456', // Mật khẩu bạn vừa đặt ở bước 1
      database: 'auth_db',
      entities: [Taikhoan],
      synchronize: true,
      options: {
        encrypt: false,
        trustServerCertificate: true,
      },
    }),
    TypeOrmModule.forFeature([Taikhoan]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'super_secret_key',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}