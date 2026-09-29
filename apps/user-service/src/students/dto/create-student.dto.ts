import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateStudentDto {
  @IsNotEmpty({
    message: 'Mã sinh viên không được để trống',
  })
  @IsString()
  @MaxLength(20)
  masv: string;

  @IsNotEmpty({
    message: 'Họ tên không được để trống',
  })
  @IsString()
  @MaxLength(100)
  hoten: string;

  @IsNotEmpty({
    message: 'Lớp không được để trống',
  })
  @IsString()
  @MaxLength(50)
  lop: string;

  @IsNotEmpty({
    message: 'Khoa không được để trống',
  })
  @IsString()
  @MaxLength(100)
  khoa: string;

  @IsNotEmpty({
    message: 'Email không được để trống',
  })
  @IsEmail(
    {},
    {
      message: 'Email không đúng định dạng',
    },
  )
  email: string;

  @IsBoolean({
    message: 'Trạng thái phải là true hoặc false',
  })
  trangthai: boolean;
}