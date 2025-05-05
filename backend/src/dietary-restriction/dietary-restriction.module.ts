import { Module } from '@nestjs/common';
import { DietaryRestrictionService } from './dietary-restriction.service';
import { DietaryRestrictionController } from './dietary-restriction.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  controllers: [DietaryRestrictionController],
  providers: [DietaryRestrictionService],
  imports: [DatabaseModule]
})
export class DietaryRestrictionModule {}
