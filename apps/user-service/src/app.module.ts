import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StudentsModule } from './students/students.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',

      host: 'localhost',
      port: 1433,

      username: 'sa',
      password: '123456',

      database: 'quanlydoan',

      autoLoadEntities: true,

      // Database va bang da duoc tao bang database.sql
      synchronize: false,

      options: {
        encrypt: false,
        trustServerCertificate: true,
      },
    }),

    StudentsModule,
  ],
})
export class AppModule {}