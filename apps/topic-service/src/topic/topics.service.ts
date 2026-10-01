import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeTai } from './entities/detai.entity';
import { DangKy } from './entities/dangky.entity';
import { CreateDeTaiDto } from './dto/create-detai.dto';

@Injectable()
export class TopicService {
  constructor(
    @InjectRepository(DeTai)
    private readonly deTaiRepository: Repository<DeTai>,
    @InjectRepository(DangKy)
    private readonly dangKyRepository: Repository<DangKy>,
  ) {}

  async createDeTai(dto: CreateDeTaiDto): Promise<DeTai> {
    const deTai = this.deTaiRepository.create(dto);
    return await this.deTaiRepository.save(deTai);
  }

  async getAllDeTai(): Promise<DeTai[]> {
    return await this.deTaiRepository.find();
  }

  async getDeTaiById(id: number): Promise<DeTai> {
    const deTai = await this.deTaiRepository.findOne({ where: { id } });
    if (!deTai) {
      throw new NotFoundException(`Không tìm thấy đề tài với ID: ${id}`);
    }
    return deTai;
  }

  async getSinhVienDangKyByDeTai(madetai: number) {
    const deTai = await this.deTaiRepository.findOne({ where: { id: madetai } });
    if (!deTai) {
      throw new NotFoundException(`Không tìm thấy đề tài với ID: ${madetai}`);
    }

    const danhSachDangKy = await this.dangKyRepository.find({
      where: { madetai },
      select: {
        id: true,
        masv: true,
        ngay_dangky: true,
      },
    });

    return {
      madetai: deTai.id,
      tendetai: deTai.tendetai,
      giangvien: deTai.giangvien,
      tongSoSinhVien: danhSachDangKy.length,
      danhSachSinhVien: danhSachDangKy,
    };
  }
}