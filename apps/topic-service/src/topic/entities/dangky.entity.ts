import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { DeTai } from './detai.entity';

@Entity('dangky')
export class DangKy {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  madetai: number;

  @Column({ length: 50 })
  masv: string;

  @CreateDateColumn({ type: 'timestamp' })
  ngay_dangky: Date;

  @ManyToOne(() => DeTai, (detai) => detai.danhSachDangKy, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'madetai' })
  detai: DeTai;
}