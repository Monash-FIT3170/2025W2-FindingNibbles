import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from 'generated/prisma';
import { DietaryRestrictionDto } from './dto/create-dietary-restriction.dto';

@Injectable()
export class DietaryRestrictionService {
  constructor(private readonly db: DatabaseService) {}
  async create(newDietary: Prisma.DietaryRestrictionCreateInput) {
    return this.db.dietaryRestriction.create({ data: newDietary });
  }

  async findAll(): Promise<DietaryRestrictionDto[]> {
    const dietaryRestrictions = await this.db.dietaryRestriction.findMany();
    return dietaryRestrictions.map((dietary) => ({
      ...dietary,
      description: dietary.description ?? undefined,
    }));
  }
}
