import {
  IsString,
  IsNumber,
  IsArray,
  ValidateNested,
  IsNotEmpty,
  ArrayNotEmpty,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

export class MenuItemDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsArray()
  @IsString({ each: true })
  dietaryTags: string[];

  @IsString()
  @IsOptional()
  category?: string;
}

export class AnalyseRestaurantMenuResponseDto {
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => MenuItemDto)
  menu_items: MenuItemDto[];
}
