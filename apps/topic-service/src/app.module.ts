import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TopicModule } from './topic/topics.module';
import { DeTai } from './topic/entities/detai.entity';
import { DangKy } from './topic/entities/dangky.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'localhost',
      username: 'thao',
      password: '123456',
      database: 'quanlydoan_topic_db',
      entities: [DeTai, DangKy],
      synchronize: false, // Tắt synchronize để tránh bị timeout do lock bảng
      options: {
        encrypt: false,
        trustServerCertificate: true,
        instanceName: 'SQLEXPRESS',
      },
    }),
    TopicModule,
  ],
})
export class AppModule {}