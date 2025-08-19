import {
  IsBooleanString,
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class NearbyQueryDto {
  @IsNotEmpty()
  @IsLatitude()
  lat!: string;

  @IsNotEmpty()
  @IsLongitude()
  lng!: string;

  @IsOptional()
  @IsNumberString()
  radius?: string;

  @IsOptional()
  @IsString()
  keyword?: string;

  @IsOptional()
  @IsNumberString()
  minprice?: string;

  @IsOptional()
  @IsNumberString()
  maxprice?: string;

  @IsOptional()
  @IsBooleanString()
  opennow?: string;
}
