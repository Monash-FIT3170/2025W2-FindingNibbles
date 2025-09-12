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
import { GetBestDishDto } from './dto/get-best-dish.dto';

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

  @Post(':restaurantId/best-dish')
  async getBestDish(
    @Param('restaurantId') restaurantId: string,
    @Body() getBestDishDto: GetBestDishDto,
  ) {
    const restaurantIdNum = parseInt(restaurantId, 10);
    const result = await this.restaurantMenuService.getBestDishForRestaurant(
      restaurantIdNum,
      getBestDishDto.dietaryRequirements,
    );
    return result;
  }
}
