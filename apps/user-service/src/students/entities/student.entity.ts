import {
  Column,
  Entity,
  PrimaryColumn,
} from 'typeorm';

@Entity('sinhvien')
export class Student {
  @PrimaryColumn({
    type: 'varchar',
    length: 20,
  })
  masv: string;

  @Column({
    type: 'nvarchar',
    length: 100,
  })
  hoten: string;

  @Column({
    type: 'varchar',
    length: 50,
  })
  lop: string;

  @Column({
    type: 'nvarchar',
    length: 100,
  })
  khoa: string;

  @Column({
    type: 'varchar',
    length: 100,
    unique: true,
  })
  email: string;

  @Column({
    type: 'bit',
    default: true,
  })
  trangthai: boolean;
}