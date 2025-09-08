import {
  IsArray,
  IsString,
  IsNumber,
  IsOptional,
  ArrayNotEmpty,
  IsNotEmpty,
} from 'class-validator';

export type BestDishErrorType =
  | 'NO_SUITABLE_DISHES'
  | 'DATABASE_ERROR';

export class GetBestDishDto {
  @IsArray()
  @IsString({ each: true })
  dietaryRequirements: string[];
}

export class BestDishResponseDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsString()
  @IsOptional()
  category?: string;

  @IsArray()
  @IsString({ each: true })
  dietaryTags: string[];

  @IsNumber()
  @IsNotEmpty()
  restaurantId: number;

  @IsString()
  @IsNotEmpty()
  restaurantName: string;
}

export class GetBestDishSuccessResponseDto {
  @IsNotEmpty()
  success: true;

  @IsNotEmpty()
  dish: BestDishResponseDto;

  @IsString()
  @IsNotEmpty()
  message: string;
}

export class GetBestDishErrorResponseDto {
  @IsNotEmpty()
  success: false;

  @IsString()
  @IsNotEmpty()
  error: string;

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsArray()
  @IsString({ each: true })
  requestedDietaryRequirements: string[];

  @IsNumber()
  @IsNotEmpty()
  restaurantId: number;
}
