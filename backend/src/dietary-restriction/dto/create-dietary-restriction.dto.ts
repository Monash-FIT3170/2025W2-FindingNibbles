import { IsNotEmpty } from "class-validator";

export class DietaryRestrictionDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  name: string;

  description?: string;
}

export class CreateDietaryRestrictionDto {
  @IsNotEmpty()
  name: string;

  description?: string;
}
