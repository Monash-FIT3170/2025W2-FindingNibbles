import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RestaurantMenuService } from './restaurant-menu.service';
import { RestaurantMenuController } from './restaurant-menu.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  controllers: [RestaurantMenuController],
  providers: [RestaurantMenuService],
  imports: [DatabaseModule, ConfigModule],
})
export class RestaurantMenuModule {}
