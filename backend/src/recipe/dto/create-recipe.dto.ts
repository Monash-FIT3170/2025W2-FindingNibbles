import {
  IsNotEmpty,
  ArrayNotEmpty,
  IsBoolean,
  IsIn,
  IsArray,
} from 'class-validator';

export const RecipeDifficultyLevels = ['easy', 'medium', 'hard', 'any'];
export type RecipeDifficultyLevel = (typeof RecipeDifficultyLevels)[number];

export class CreateRecipeDto {

  @IsArray()
  ingredients: string[];

  @IsArray()
  dietaryRequirements: string[];

  @IsArray()
  kitchenAppliances: number[];

  @IsBoolean()
  @IsNotEmpty()
  includeAllIngredients: boolean;

  @IsIn(RecipeDifficultyLevels)
  difficultyLevel: RecipeDifficultyLevel;
}
