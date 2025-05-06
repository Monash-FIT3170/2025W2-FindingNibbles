import { Module } from '@nestjs/common';
import { CuisineService } from './cuisine.service';
import { CuisineController } from './cuisine.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [CuisineController],
  providers: [CuisineService],
  exports: [CuisineService],
})
export class CuisineModule {}
