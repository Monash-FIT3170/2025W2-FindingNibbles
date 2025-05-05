import { Injectable, OnModuleInit } from '@nestjs/common';
// goes back three levels from dist/src/database → dist → backend → generated/prisma
import { PrismaClient } from '../../generated/prisma';

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
