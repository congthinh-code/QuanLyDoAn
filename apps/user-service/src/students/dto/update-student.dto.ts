import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateStudentDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  hoten?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  lop?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  khoa?: string;

  @IsOptional()
  @IsEmail(
    {},
    {
      message: 'Email không đúng định dạng',
    },
  )
  email?: string;

  @IsOptional()
  @IsBoolean({
    message: 'Trạng thái phải là true hoặc false',
  })
  trangthai?: boolean;
}