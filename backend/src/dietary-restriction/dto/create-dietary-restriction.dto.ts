export class DietaryRestrictionDto {
  id: number;

  name: string;

  description?: string;
}

export class CreateDietaryRestrictionDto {
  name: string;

  description?: string;
}
