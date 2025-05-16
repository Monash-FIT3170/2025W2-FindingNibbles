import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from 'generated/prisma';

@Injectable()
export class ApplianceService {
  constructor(private readonly db: DatabaseService) {}

  async create(newAppliance: Prisma.ApplianceCreateInput) {
    return this.db.appliance.create({ data: newAppliance });
  }

  async findAll() {
    return this.db.appliance.findMany();
  }
}
