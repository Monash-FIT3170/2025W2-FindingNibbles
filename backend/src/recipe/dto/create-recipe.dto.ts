import { IsNotEmpty, IsEnum, ArrayNotEmpty, IsArray } from 'class-validator';

export enum RecipeDifficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
  ANY = 'any',
}

export class CreateRecipeDto {
  @ArrayNotEmpty()
  ingredients: string[];

  @IsArray()
  dietaryRequirements: number[];

  @ArrayNotEmpty()
  kitchenAppliances: number[];

  @IsEnum(RecipeDifficulty)
  @IsNotEmpty()
  difficultyLevel: RecipeDifficulty;
}
