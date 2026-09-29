import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Controller('sinhvien')
export class StudentsController {
  constructor(
    private readonly studentsService: StudentsService,
  ) {}

  // GET /sinhvien
  @Get()
  findAll() {
    return this.studentsService.findAll();
  }

  // GET /sinhvien/:masv
  @Get(':masv')
  findOne(
    @Param('masv') masv: string,
  ) {
    return this.studentsService.findOne(masv);
  }

  // POST /sinhvien
  @Post()
  create(
    @Body() data: CreateStudentDto,
  ) {
    return this.studentsService.create(data);
  }

  // PUT /sinhvien/:masv
  @Put(':masv')
  update(
    @Param('masv') masv: string,
    @Body() data: UpdateStudentDto,
  ) {
    return this.studentsService.update(
      masv,
      data,
    );
  }

  // DELETE /sinhvien/:masv
  @Delete(':masv')
  remove(
    @Param('masv') masv: string,
  ) {
    return this.studentsService.remove(masv);
  }
}