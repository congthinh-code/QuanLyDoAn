import { Controller, Post, Get, Body, Param, ParseIntPipe } from '@nestjs/common';
import { TopicService } from './topics.service'; // Thêm 's' vào topics.service
import { CreateDeTaiDto } from './dto/create-detai.dto';

@Controller('topics')
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  @Post()
  async createDeTai(@Body() createDeTaiDto: CreateDeTaiDto) {
    return await this.topicService.createDeTai(createDeTaiDto);
  }

  @Get()
  async getAllDeTai() {
    return await this.topicService.getAllDeTai();
  }

  @Get(':id')
  async getDeTaiById(@Param('id', ParseIntPipe) id: number) {
    return await this.topicService.getDeTaiById(id);
  }

  @Get(':id/students')
  async getSinhVienDangKyByDeTai(@Param('id', ParseIntPipe) id: number) {
    return await this.topicService.getSinhVienDangKyByDeTai(id);
  }
}