import { Entity, Column, PrimaryColumn, CreateDateColumn } from 'typeorm';

@Entity('taikhoan')
export class Taikhoan {
  @PrimaryColumn()
  id: string; // Trùng với masv hoặc username (Ví dụ: "SV01")

  @Column({ unique: true })
  username: string;

  @Column()
  password: string; // Lưu chuỗi đã mã hóa Bcrypt

  @Column({ default: 'STUDENT' }) // 'STUDENT', 'TEACHER', 'ADMIN'
  role: string;

  @CreateDateColumn()
  createdAt: Date;
}