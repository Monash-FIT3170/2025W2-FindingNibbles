import { Body, Controller, Post, Req, Get} from "@nestjs/common";
import { UserService } from "./user.service";
import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/strategies/jwt/jwt-auth.guard";
import { RequestUser } from "src/types";
import { CreateDietaryRestrictionDto } from "src/dietary-restriction/dto/create-dietary-restriction.dto";

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

    @UseGuards(JwtAuthGuard)
    @Post('add-dietaryRestriction')
    addDietaryRestriction(@Req() req: RequestUser,
                        @Body() dietaryId: number) {
        return this.userService.addDietaryRestriction(req.user.id, dietaryId);}

    @UseGuards(JwtAuthGuard)
    @Post('remove-dietaryRestriction')
    removeDietaryRestriction(@Req() req: RequestUser,
                        @Body() dietaryId: number) {
        return this.userService.removeDietaryRestriction(req.user.id, dietaryId);}

    @UseGuards(JwtAuthGuard)
    @Get('user-dietaryRestrictions')
    getUserDietaryRestrictions(@Req() req: RequestUser) {
        return this.userService.getDietaryRestrictions(req.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Post('create-dietaryRestriction')
    createDietaryRestriction(@Req() req: RequestUser,
            @Body() dietaryRestriction: CreateDietaryRestrictionDto) {
        return this.userService.createUserSpecificDietaryRestriction(req.user.id, dietaryRestriction);
    }
}




