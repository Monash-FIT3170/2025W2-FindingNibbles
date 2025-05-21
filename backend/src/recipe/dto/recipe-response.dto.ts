import {
  IsString,
  IsNumber,
  IsArray,
  IsEnum,
  ValidateNested,
  IsNotEmpty,
  ArrayNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
import { RecipeDifficulty } from './create-recipe.dto';

export class RecipeDataDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  cook_time: number;

  @IsNumber()
  @IsNotEmpty()
  servings: number;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  ingredients: string[];

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  steps: string[];

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  nutritional_info: string[];

  @IsEnum(RecipeDifficulty)
  @IsNotEmpty()
  difficulty: RecipeDifficulty;

  @IsString()
  @IsNotEmpty()
  cuisine: string;
}

export class RecipeResponseDto {
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => RecipeDataDto)
  recipes: RecipeDataDto[];
}

export class GeminiResponseDto {
  @ValidateNested()
  @Type(() => RecipeResponseDto)
  candidates: {
    content: {
      parts: {
        text: string;
      }[];
    };
  }[];
}
