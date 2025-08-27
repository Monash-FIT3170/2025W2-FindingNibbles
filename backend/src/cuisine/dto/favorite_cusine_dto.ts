// cuisine.dto.ts
export class CuisineDto {
  id: number;
  name: string;
  description?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
  isFavourite?: boolean; // added this field
}
