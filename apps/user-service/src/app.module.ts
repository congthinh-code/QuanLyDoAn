import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StudentsModule } from './students/students.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],

      useFactory: (configService: ConfigService) => ({
        type: 'mssql',

        host: configService.get<string>('DB_HOST'),
        port: Number(configService.get<string>('DB_PORT')),

        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),

        database: configService.get<string>('DB_DATABASE'),

        autoLoadEntities: true,

        // Database đã được tạo bằng database.sql
        synchronize: false,

        options: {
          encrypt: false,
          trustServerCertificate: true,
        },
      }),
    }),

    StudentsModule,
  ],
})
export class AppModule {}