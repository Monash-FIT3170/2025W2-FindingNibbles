import {
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class AutocompleteQueryDto {
  @IsNotEmpty()
  @IsString()
  input!: string;

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
