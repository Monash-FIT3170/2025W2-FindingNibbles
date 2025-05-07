import { IsNotEmpty } from 'class-validator';

export class CreateDietaryRestrictionDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;
}
