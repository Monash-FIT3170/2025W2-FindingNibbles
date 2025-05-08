import {
  IsNotEmpty,
  IsBoolean,
  IsArray,
  IsEnum,
} from 'class-validator';

export enum RecipeDifficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
  ANY = 'any',
}

export class CreateRecipeDto {
  @IsArray()
  ingredients: string[];

  @IsArray()
  dietaryRequirements: string[]; // Can include 'saved', custom tags, or both

  @IsArray()
  kitchenAppliances: number[]; // Appliance IDs

  @IsBoolean()
  @IsNotEmpty()
  includeAllIngredients: boolean;

  @IsEnum(RecipeDifficulty)
  difficulty_level: RecipeDifficulty;
}
