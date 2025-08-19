import {
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class NearbyByCuisineQueryDto {
  @IsNotEmpty()
  @IsLatitude()
  lat!: string;

  @IsNotEmpty()
  @IsLongitude()
  lng!: string;

  @IsNotEmpty()
  @IsString()
  cuisine!: string; // e.g., "italian", "japanese"

  @IsOptional()
  @IsNumberString()
  radius?: string;
}
