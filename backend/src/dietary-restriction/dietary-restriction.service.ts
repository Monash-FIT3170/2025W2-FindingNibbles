import { Injectable } from '@nestjs/common';
import { CreateDietaryRestrictionDto } from './dto/create-dietary-restriction.dto';
import { UpdateDietaryRestrictionDto } from './dto/update-dietary-restriction.dto';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from 'generated/prisma';

@Injectable()
export class DietaryRestrictionService {
  constructor(private readonly db: DatabaseService) {}
  create(newDietary: Prisma.DietaryRestrictionCreateInput) {
    return this.db.dietaryRestriction.create({ data: newDietary });
  }
}
