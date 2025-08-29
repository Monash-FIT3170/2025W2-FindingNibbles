import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from 'prisma/generated';
import { DietaryRequirementDto } from './dto/create-dietary-requirement.dto';

@Injectable()
export class DietaryRequirementService {
  constructor(private readonly db: DatabaseService) {}
  async create(newDietary: Prisma.DietaryRequirementCreateInput) {
    return this.db.dietaryRequirement.create({ data: newDietary });
  }

  async findAll(): Promise<DietaryRequirementDto[]> {
    const dietaryRequirements = await this.db.dietaryRequirement.findMany();
    return dietaryRequirements.map((dietary) => ({
      ...dietary,
      description: dietary.description ?? undefined,
    }));
  }
}
