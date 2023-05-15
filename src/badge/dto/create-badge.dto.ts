import { IsString, IsNumber, MinLength, MaxLength } from 'class-validator';

export class CreateBadgeDto {
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  titulo: string;

  @IsString()
  @MinLength(1)
  @MaxLength(500)
  descripcion: string;

  @IsNumber()
  score: number;

  @IsNumber()
  no: number;

  @IsString()
  url: string;
}
