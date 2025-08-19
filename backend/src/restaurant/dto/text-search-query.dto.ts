import {
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class TextSearchQueryDto {
  @IsNotEmpty()
  @IsString()
  query!: string;

  @IsOptional()
  @IsLatitude()
  lat?: string;

  @IsOptional()
  @IsLongitude()
  lng?: string;

  @IsOptional()
  @IsNumberString()
  radius?: string;
}
