import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
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

  @IsNotEmpty()
  @IsNumber()
  calories: number;
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

export class RecipeFromFrontEnd {
  title: string;

  description: string;

  ingredients: string[];

  instructions: string[];

  estimatedTimeMinutes: number;

  servings: number;

  nutritionalInfo: string[];

  difficultyLevel: RecipeDifficulty;

  cuisine: string;

  calories: number;

  imageURL?: string;
}

export class RecipeDto {
  id: number;

  title: string;

  description: string;

  ingredients: string[];

  instructions: string[];

  estimatedTimeMinutes: number;

  servings: number;

  dietaryTags: string[];

  nutritionalInfo: string[];

  difficultyLevel: string;

  cuisineId: number;

  cuisine: string;
}
