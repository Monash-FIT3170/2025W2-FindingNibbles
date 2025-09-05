import 'multer';

import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Param,
  Body,
} from '@nestjs/common';
import { RestaurantMenuService } from './restaurant-menu.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetRandomDishDto } from './dto/random-dish.dto';

/**
 * CONTROLLER UPDATES NEEDED:
 *
 * Input Changes:
 * - Add restaurant ID parameter to menu upload endpoint
 * - Validate restaurant exists before processing menu
 * - Enhanced error responses for missing/invalid restaurant
 *
 * Response Format:
 * - Return saved dish records with database IDs
 * - Include dietary classifications and timestamps
 * - Provide summary of stored vs skipped items
 * - Clear error messages for validation failures
 */

@Controller('restaurant-menu')
export class RestaurantMenuController {
  constructor(private readonly restaurantMenuService: RestaurantMenuService) {}

  @Post(':restaurantId')
  @UseInterceptors(FileInterceptor('file'))
  async analyse(
    @Param('restaurantId') restaurantId: string,
    @UploadedFile() menu: Express.Multer.File,
  ) {
    const restaurantIdNum = parseInt(restaurantId, 10);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const result = await this.restaurantMenuService.analyseAndStoreMenu(
      menu,
      restaurantIdNum,
    );
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return result;
  }

  @Post('random-dish')
  async getRandomDish(@Body() getRandomDishDto: GetRandomDishDto) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const result =
      await this.restaurantMenuService.getRandomDishByDietaryRequirements(
        getRandomDishDto.dietaryRequirements,
      );
    return result;
  }
}
