import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Student } from './entities/student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  // Lấy danh sách tất cả sinh viên
  findAll() {
    return this.studentRepository.find({
      order: {
        masv: 'ASC',
      },
    });
  }

  // Lấy chi tiết một sinh viên
  async findOne(masv: string) {
    const student = await this.studentRepository.findOne({
      where: {
        masv,
      },
    });

    if (!student) {
      throw new NotFoundException(
        `Không tìm thấy sinh viên ${masv}`,
      );
    }

    return student;
  }

  // Thêm sinh viên
  async create(data: CreateStudentDto) {
    // Kiểm tra trùng mã sinh viên
    const existingStudent =
      await this.studentRepository.findOne({
        where: {
          masv: data.masv,
        },
      });

    if (existingStudent) {
      throw new ConflictException(
        `Mã sinh viên ${data.masv} đã tồn tại`,
      );
    }

    // Kiểm tra trùng email
    const existingEmail =
      await this.studentRepository.findOne({
        where: {
          email: data.email,
        },
      });

    if (existingEmail) {
      throw new ConflictException(
        `Email ${data.email} đã tồn tại`,
      );
    }

    const student =
      this.studentRepository.create(data);

    return this.studentRepository.save(student);
  }

  // Sửa sinh viên
  async update(
    masv: string,
    data: UpdateStudentDto,
  ) {
    const student = await this.findOne(masv);

    // Nếu thay email thì kiểm tra email mới
    if (
      data.email &&
      data.email !== student.email
    ) {
      const existingEmail =
        await this.studentRepository.findOne({
          where: {
            email: data.email,
          },
        });

      if (existingEmail) {
        throw new ConflictException(
          `Email ${data.email} đã tồn tại`,
        );
      }
    }

    Object.assign(student, data);

    return this.studentRepository.save(student);
  }

  // Xóa sinh viên
  async remove(masv: string) {
    const student = await this.findOne(masv);

    await this.studentRepository.remove(student);

    return {
      message: `Xóa sinh viên ${masv} thành công`,
    };
  }
}