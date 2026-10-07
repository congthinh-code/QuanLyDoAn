import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TopicService } from './topics.service';
import { TopicController } from './topics.controller';
import { DeTai } from './entities/detai.entity';
import { DangKy } from './entities/dangky.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DeTai, DangKy])],
  controllers: [TopicController],
  providers: [TopicService],
})
export class TopicModule {}