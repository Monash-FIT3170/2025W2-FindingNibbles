import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { GooglePlacesApiService } from '../google-places-api/google-places-api.service';
import { Prisma, Restaurant } from 'prisma/generated';
import { NearbyQueryDto } from './dto/nearby-query.dto';
import { AutocompleteQueryDto } from './dto/autocomplete-query.dto';
import { TextSearchQueryDto } from './dto/text-search-query.dto';
import { NearbyByCuisineQueryDto } from './dto/nearby-by-cuisine-query.dto';

@Controller('restaurant')
export class RestaurantController {
  constructor(
    private readonly restaurantService: RestaurantService,
    private readonly googlePlacesService: GooglePlacesApiService,
  ) {}

  // Fetch all restaurants with optional pagination, sorting, and filtering
  @Get()
  async findAll(
    @Query('skip') skip?: string,
    @Query('take') take?: string,
    @Query('orderBy') orderBy?: string,
    @Query('cuisineId') cuisineId?: string,
    @Query('swLat') swLat?: string,
    @Query('swLng') swLng?: string,
    @Query('neLat') neLat?: string,
    @Query('neLng') neLng?: string,
  ): Promise<Restaurant[]> {
    // Check if bounds parameters are provided
    if (swLat && swLng && neLat && neLng) {
      const swLatNum = parseFloat(swLat);
      const swLngNum = parseFloat(swLng);
      const neLatNum = parseFloat(neLat);
      const neLngNum = parseFloat(neLng);

      // Validate the coordinates
      if (
        isNaN(swLatNum) ||
        isNaN(swLngNum) ||
        isNaN(neLatNum) ||
        isNaN(neLngNum)
      ) {
        throw new BadRequestException('Invalid latitude or longitude values.');
      }

      // Handle cuisine filtering with bounds
      if (cuisineId) {
        const cuisineIdNum = parseInt(cuisineId);
        if (isNaN(cuisineIdNum)) {
          throw new BadRequestException('Invalid cuisine ID value.');
        }
        const result = await this.restaurantService.findInBoundsWithCuisine(
          swLatNum,
          swLngNum,
          neLatNum,
          neLngNum,
          cuisineIdNum,
        );
        return result;
      }

      const result = await this.restaurantService.findInBounds(
        swLatNum,
        swLngNum,
        neLatNum,
        neLngNum,
      );
      return result;
    }

    // Handle cuisine filtering without bounds
    if (cuisineId) {
      const cuisineIdNum = parseInt(cuisineId);
      if (isNaN(cuisineIdNum)) {
        throw new BadRequestException('Invalid cuisine ID value.');
      }

      let orderByObject: Prisma.RestaurantOrderByWithRelationInput | undefined =
        undefined;
      if (orderBy === 'rating') {
        orderByObject = { rating: 'desc' };
      } else if (orderBy === 'popular') {
        orderByObject = { viewCount: 'desc' };
      }

      return this.restaurantService.findByCuisine(cuisineIdNum, {
        skip: skip ? Number(skip) : undefined,
        take: take ? Number(take) : undefined,
        orderBy: orderByObject,
      });
    }

    // If no bounds or cuisine are provided, return paginated and sorted restaurants
    let orderByObject: Prisma.RestaurantOrderByWithRelationInput | undefined =
      undefined;
    if (orderBy === 'rating') {
      orderByObject = { rating: 'desc' };
    } else if (orderBy === 'popular') {
      orderByObject = { viewCount: 'desc' };
    }

    return this.restaurantService.findAll({
      skip: skip ? Number(skip) : undefined,
      take: take ? Number(take) : undefined,
      orderBy: orderByObject,
    });
  }

  // Fetch restaurants by name
  @Get('search/:name')
  findByName(@Param('name') name: string) {
    return this.restaurantService.findByName(name);
  }

  // Fetch restaurants by cuisine ID
  @Get('cuisine/:id')
  findByCuisine(@Param('id', ParseIntPipe) id: number) {
    return this.restaurantService.findByCuisine(id);
  }

  // Fetch restaurants by cuisine ID with bounds
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const restaurant = await this.restaurantService.findOneById(id);

    if (!restaurant) {
      throw new NotFoundException(`Restaurant with ID ${id} not found`);
    }

    await this.restaurantService.incrementViewCount(id);
    return restaurant;
  }

  // ========================
  // Google Places API Endpoints
  // ========================

  /**
   * Get nearby restaurants using Google Places API
   * GET /restaurant/places/nearby?lat=<latitude>&lng=<longitude>&radius=<radius>&keyword=<keyword>&minprice=<minprice>&maxprice=<maxprice>&opennow=<boolean>
   */
  @Get('places/nearby')
  async getNearbyRestaurants(@Query() query: NearbyQueryDto) {
    const latitude = parseFloat(query.lat);
    const longitude = parseFloat(query.lng);

    return this.googlePlacesService.getNearbyRestaurants(
      latitude,
      longitude,
      query.radius ? parseInt(query.radius) : undefined,
      query.keyword,
      query.minprice ? parseInt(query.minprice) : undefined,
      query.maxprice ? parseInt(query.maxprice) : undefined,
      query.opennow === 'true',
    );
  }

  /**
   * Get restaurant details using Google Places API
   * GET /restaurant/places/details/:placeId
   */
  @Get('places/details/:placeId')
  async getRestaurantDetails(@Param('placeId') placeId: string) {
    if (!placeId) {
      throw new BadRequestException('Place ID is required');
    }

    const details =
      await this.googlePlacesService.getRestaurantDetails(placeId);

    if (!details) {
      throw new NotFoundException(
        `Restaurant with place ID ${placeId} not found`,
      );
    }

    return details;
  }

  /**
   * Autocomplete restaurant search using Google Places API
   * GET /restaurant/places/autocomplete?input=<search_term>&lat=<latitude>&lng=<longitude>&radius=<radius>
   */
  @Get('places/autocomplete')
  async autocompleteRestaurants(@Query() query: AutocompleteQueryDto) {
    const input = query.input;
    let latitude: number | undefined;
    let longitude: number | undefined;

    if (query.lat && query.lng) {
      latitude = parseFloat(query.lat);
      longitude = parseFloat(query.lng);
    }

    return this.googlePlacesService.autocompleteRestaurants(
      input,
      latitude,
      longitude,
      query.radius ? parseInt(query.radius) : undefined,
    );
  }

  /**
   * Search restaurants by text query using Google Places API
   * GET /restaurant/places/search?query=<search_term>&lat=<latitude>&lng=<longitude>&radius=<radius>
   */
  @Get('places/search')
  async searchRestaurants(@Query() queryDto: TextSearchQueryDto) {
    let latitude: number | undefined;
    let longitude: number | undefined;

    if (queryDto.lat && queryDto.lng) {
      latitude = parseFloat(queryDto.lat);
      longitude = parseFloat(queryDto.lng);
    }

    return this.googlePlacesService.searchRestaurants(
      queryDto.query,
      latitude,
      longitude,
      queryDto.radius ? parseInt(queryDto.radius) : undefined,
    );
  }

  /**
   * Nearby search by cuisine keyword. Wraps Google Text Search with "<cuisine> restaurant".
   * GET /restaurant/places/nearby-by-cuisine?cuisine=italian&lat=..&lng=..&radius=..
   */
  @Get('places/nearby-by-cuisine')
  async nearbyByCuisine(@Query() query: NearbyByCuisineQueryDto) {
    const latitude = parseFloat(query.lat);
    const longitude = parseFloat(query.lng);
    const keyword = `${query.cuisine} restaurant`;

    return this.googlePlacesService.searchRestaurants(
      keyword,
      latitude,
      longitude,
      query.radius ? parseInt(query.radius) : undefined,
    );
  }

  /**
   * Get photo URL from photo reference
   * GET /restaurant/places/photo/:photoReference?maxWidth=<width>
   */
  @Get('places/photo/:photoReference')
  getPhotoUrl(
    @Param('photoReference') photoReference: string,
    @Query('maxWidth') maxWidth?: string,
  ) {
    if (!photoReference) {
      throw new BadRequestException('Photo reference is required');
    }

    const width = maxWidth ? parseInt(maxWidth) : 400;
    return {
      photoUrl: this.googlePlacesService.getPhotoUrl(photoReference, width),
    };
  }
}
