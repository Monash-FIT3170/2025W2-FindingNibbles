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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dietaryRestrictionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDietaryRestrictionDto: UpdateDietaryRestrictionDto) {
    return this.dietaryRestrictionService.update(+id, updateDietaryRestrictionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dietaryRestrictionService.remove(+id);
  }
}
