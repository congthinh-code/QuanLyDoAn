import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { DangKy } from './dangky.entity';

@Entity('detai')
export class DeTai {
  @PrimaryGeneratedColumn({ name: 'madetai' })
  id: number;

  @Column({ name: 'tendetai', length: 200 })
  tendetai: string;

  @Column({ name: 'mota', type: 'nvarchar', length: 'max', nullable: true })
  mota: string;

  @Column({ name: 'giangvien', length: 100 })
  giangvien: string;

  @Column({ name: 'soluongtoida', type: 'int' })
  soluongtoida: number;

  @Column({ name: 'soluongdadangky', type: 'int', default: 0 })
  soluongdadangky: number;

  @OneToMany(() => DangKy, (dangky) => dangky.detai)
  danhSachDangKy: DangKy[];
}