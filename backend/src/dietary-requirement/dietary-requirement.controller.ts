import { Controller, Get, Post, Body } from '@nestjs/common';
import { DietaryRequirementService } from './dietary-requirement.service';
import { CreateDietaryRequirementDto } from './dto/create-dietary-requirement.dto';

@Controller('dietary-Requirement')
export class DietaryRequirementController {
  constructor(
    private readonly dietaryRequirementService: DietaryRequirementService,
  ) {}

  @Post()
  create(@Body() createDietaryRequirementDto: CreateDietaryRequirementDto) {
    return this.dietaryRequirementService.create(createDietaryRequirementDto);
  }

  @Get()
  findAll() {
    return this.dietaryRequirementService.findAll();
  }
}
