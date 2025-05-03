import { Body, Controller, Post, Req, Get} from "@nestjs/common";
import { UserService } from "./user.service";
import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/strategies/jwt/jwt-auth.guard";

@Controller('user')
export class UserController {
    constructor(readonly userService: UserService) {}


    @UseGuards(JwtAuthGuard)
    @Post('favourite-restaurant')
    favouriteRestaurant(@Req() req: RequestUser,
                        @Body() restaurantId: number) {
        return this.userService.favouriteRestaurant(req.user.id, restaurantId);}

    
    @UseGuards(JwtAuthGuard)
    @Post('unfavourite-restaurant')
    unfavouriteRestaurant(@Req() req: RequestUser,
                        @Body() restaurantId: number) {
        return this.userService.unfavouriteRestaurant(req.user.id, restaurantId);}

    @UseGuards(JwtAuthGuard)
    @Get('favourited-restaurants')
    getFavouritedRestaurants(@Req() req: RequestUser) {
        return this.userService.getFavouritedRestaurants(req.user.id);
    }
}





