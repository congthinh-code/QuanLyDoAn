import { IsNotEmpty, IsString, IsOptional, IsInt, Min } from 'class-validator';

export class CreateDeTaiDto {
  @IsNotEmpty()
  @IsString()
  tendetai: string;

  @IsOptional()
  @IsString()
  mota?: string;

  @IsNotEmpty()
  @IsString()
  giangvien: string;

  @IsInt()
  @Min(1)
  soluongtoida: number;
}