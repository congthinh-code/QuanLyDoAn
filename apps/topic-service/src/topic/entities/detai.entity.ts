import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { DangKy } from './dangky.entity';

@Entity('detai')
export class DeTai {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  tendetai: string;

  @Column({ type: 'text', nullable: true })
  mota: string;

  @Column({ length: 100 })
  giangvien: string;

  @Column({ type: 'int', default: 5 })
  soluongtoida: number;

  @Column({ type: 'int', default: 0 })
  soluongdadangky: number;

  @OneToMany(() => DangKy, (dangky) => dangky.detai)
  danhSachDangKy: DangKy[];
}