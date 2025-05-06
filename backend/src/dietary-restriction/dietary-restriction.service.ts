import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from 'generated/prisma';

@Injectable()
export class DietaryRestrictionService {
  constructor(private readonly db: DatabaseService) {}
  async create(newDietary: Prisma.DietaryRestrictionCreateInput) {
    return this.db.dietaryRestriction.create({ data: newDietary });
  }

  async findAll() {
    return this.db.dietaryRestriction.findMany();
  }
}
