import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DietaryRestrictionService } from './dietary-restriction.service';
import { CreateDietaryRestrictionDto } from './dto/create-dietary-restriction.dto';
import { UpdateDietaryRestrictionDto } from './dto/update-dietary-restriction.dto';

@Controller('dietary-restriction')
export class DietaryRestrictionController {
  constructor(private readonly dietaryRestrictionService: DietaryRestrictionService) {}

  @Post()
  create(@Body() createDietaryRestrictionDto: CreateDietaryRestrictionDto) {
    return this.dietaryRestrictionService.create(createDietaryRestrictionDto);
  }

  @Get()
  findAll() {
    return this.dietaryRestrictionService.findAll();
  }
}
