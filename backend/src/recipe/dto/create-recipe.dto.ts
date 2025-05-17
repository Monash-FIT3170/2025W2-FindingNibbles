import {
  IsNotEmpty,
  IsBoolean,
  IsArray,
  IsEnum,
  ArrayNotEmpty
} from 'class-validator';

export enum RecipeDifficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
  ANY = 'any',
}

export class CreateRecipeDto {
  @ArrayNotEmpty()
  ingredients: string[];

  @ArrayNotEmpty()
  dietaryRequirements: number[]; 

  @ArrayNotEmpty()
  kitchenAppliances: number[]; // Appliance IDs

  @IsBoolean()
  @IsNotEmpty()
  includeAllIngredients: boolean;

  @IsEnum(RecipeDifficulty)
  @IsNotEmpty()
  difficulty_level: RecipeDifficulty;
}
