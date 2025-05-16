import { Module } from '@nestjs/common';
import { ApplianceService } from './appliace.service';
import { ApplianceController } from './appliance.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  controllers: [ApplianceController],
  providers: [ApplianceService],
  imports: [DatabaseModule],
  exports: [ApplianceService],
})
export class ApplianceModule {}
