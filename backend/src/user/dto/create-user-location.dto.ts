import {
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsNotEmpty,
  Max,
  Min,
} from 'class-validator';

export class CreateUserLocationDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  streetAddress?: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(-90)
  @Max(90)
  latitude: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(-180)
  @Max(180)
  longitude: number;

  @IsOptional()
  @IsBoolean()
  isDefault?: boolean;
}
