import {
  IsArray,
  IsString,
  IsNumber,
  IsOptional,
  ArrayNotEmpty,
  IsNotEmpty,
} from 'class-validator';

export class GetRandomDishDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  dietaryRequirements: string[];
}

export class RandomDishResponseDto {
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

export class GetRandomDishSuccessResponseDto {
  @IsNotEmpty()
  success: true;

  @IsNotEmpty()
  dish: RandomDishResponseDto;

  @IsString()
  @IsNotEmpty()
  message: string;
}

export class GetRandomDishErrorResponseDto {
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
}
