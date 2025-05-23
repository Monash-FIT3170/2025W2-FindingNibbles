import {
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
  Max,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer'; // Needed for @Type()

export class UpdateUserLocationDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  @Min(-90)
  @Max(90)
  @Type(() => Number)
  latitude?: number;

  @IsOptional()
  @IsNumber()
  @Min(-180)
  @Max(180)
  @Type(() => Number)
  longitude?: number;

  @IsOptional()
  @IsBoolean()
  isDefault?: boolean;
}
