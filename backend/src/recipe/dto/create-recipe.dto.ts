export class CreateRecipeDto {
  // title: string;
  // description: string;
  // ingredients: string[];
  // instructions: string[];
  // imageUrl?: string;
  // prepTime?: number; // in minutes
  // cookTime?: number; // in minutes
  // servings?: number;
  // cuisine?: string;
  // dietaryRestrictions?: string[];
  // tags?: string[];
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  missing_ingredients: string[];
  estimated_time_minutes: number;
  servings: number;
  dietary_tags: string[];
  difficulty_level: number;
  image_url: string;
  nutritional_info: string[];
  cuisineId: number;
  cuisine: string[];
}
