import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RestaurantMenuService } from './restaurant-menu.service';
import { RestaurantMenuController } from './restaurant-menu.controller';
import { DatabaseModule } from '../database/database.module';
import { GeminiModule } from '../gemini/gemini.module';

@Module({
  controllers: [RestaurantMenuController],
  providers: [RestaurantMenuService],
  imports: [DatabaseModule, ConfigModule, GeminiModule],
})
export class RestaurantMenuModule {}
