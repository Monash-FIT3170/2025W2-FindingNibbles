import { Module } from '@nestjs/common';
import { DietaryRequirementService } from './dietary-requirement.service';
import { DietaryRequirementController } from './dietary-requirement.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  controllers: [DietaryRequirementController],
  providers: [DietaryRequirementService],
  imports: [DatabaseModule],
  exports: [DietaryRequirementService],
})
export class DietaryRequirementModule {}
