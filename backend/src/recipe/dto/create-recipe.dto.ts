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
  @IsNotEmpty()
  ingredients: string[];

  // We don't need values in the array,
  // but we do want the parameter present.
  @IsArray()
  dietaries: number[];

  @ArrayNotEmpty()
  appliances: number[];

  @IsBoolean()
  @IsNotEmpty()
  includeAllIngredients: boolean;

  @IsIn(RecipeDifficultyLevels)
  difficultyLevel: RecipeDifficultyLevel;
}
