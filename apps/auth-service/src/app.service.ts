import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  OnModuleInit,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Taikhoan } from './taikhoan/taikhoan.entity';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    @InjectRepository(Taikhoan)
    private taikhoanRepository: Repository<Taikhoan>,
    private jwtService: JwtService,
  ) {}

  // Tự động khởi tạo hoặc cập nhật mật khẩu chuẩn cho SV01 khi chạy
  async onModuleInit() {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('123456', salt);

    const user = await this.taikhoanRepository.findOne({
      where: { username: 'SV01' },
    });

    if (!user) {
      const testAccount = this.taikhoanRepository.create({
        username: 'SV01',
        password: hashedPassword,
        role: 'STUDENT',
      } as Partial<Taikhoan>);
      await this.taikhoanRepository.save(testAccount);
      console.log('✅ Đã khởi tạo tài khoản SV01 với pass: 123456');
    } else {
      user.password = hashedPassword;
      await this.taikhoanRepository.save(user);
      console.log('✅ Đã cập nhật lại mật khẩu hash chuẩn cho SV01: 123456');
    }
  }

  // 1. Hàm Đăng nhập
  async login(username: string, pass: string) {
    console.log('--> Đang thử login với:', { username, pass });
    const user = await this.taikhoanRepository.findOne({
      where: { username },
    });
    if (!user) {
      throw new UnauthorizedException('Tên đăng nhập không tồn tại');
    }

    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Mật khẩu không chính xác');
    }

    // Cấp JWT Token
    const payload = { sub: user.id || user.username, username: user.username, role: user.role };
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: {
        id: user.id || user.username,
        username: user.username,
        role: user.role,
      },
    };
  }

  // 2. Hàm Đăng ký (Sử dụng Partial<Taikhoan> để hết gạch đỏ)
  async register(dto: Record<string, any>) {
    const existingUser = await this.taikhoanRepository.findOne({
      where: { username: dto.username },
    });
    if (existingUser) {
      throw new BadRequestException('Tên đăng nhập đã tồn tại');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const newUser = this.taikhoanRepository.create({
      ...dto,
      password: hashedPassword,
    } as Partial<Taikhoan>);

    return await this.taikhoanRepository.save(newUser);
  }
}