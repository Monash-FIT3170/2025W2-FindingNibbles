import { IsNotEmpty, ArrayNotEmpty, IsBoolean, IsIn } from 'class-validator';

export class CreateRecipeDto {
  @IsNotEmpty()
  ingredients: string[];

  @IsBoolean()
  @IsNotEmpty()
  useDietaries: boolean;

  @ArrayNotEmpty()
  kitchenAppliances: number[];

  @IsBoolean()
  @IsNotEmpty()
  includeAllIngredients: boolean;

  @IsIn(['easy', 'medium', 'hard', 'any'])
  difficulty_level: 'easy' | 'medium' | 'hard' | 'any';
}
