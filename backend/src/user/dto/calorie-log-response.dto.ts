import { RecipeDto } from 'src/recipe/dto/recipe-response.dto';

export class CalorieLogResponseDto {
  id: number;
  calories: number;
  date: Date;
  mealName?: string | null;
  recipe?: RecipeDto;
}
