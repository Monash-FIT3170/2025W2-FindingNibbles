import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { RestaurantMenuService } from './restaurant-menu.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('restaurant-menu')
export class RestaurantMenuController {
  constructor(private readonly restaurantMenuService: RestaurantMenuService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async analyse(@UploadedFile() menu: Express.Multer.File) {
    return this.restaurantMenuService.analyseMenu(menu);
  }
}
