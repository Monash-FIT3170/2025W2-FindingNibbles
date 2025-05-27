import { IsNotEmpty } from 'class-validator';

export class DietaryRequirementDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  name: string;

  description?: string;
}

export class CreateDietaryRequirementDto {
  @IsNotEmpty()
  name: string;

  description?: string;
}
