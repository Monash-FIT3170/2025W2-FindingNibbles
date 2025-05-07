import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class RestaurantsService {
  constructor(private readonly db: DatabaseService) {}
  findAll() {
    return this.db.restaurant.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} restaurant`;
  }

  // Fetch restaurants within the specified bounding box
  async findInBounds(
    swLat: number,
    swLng: number,
    neLat: number,
    neLng: number,
  ) {
    return this.db.restaurant.findMany({
      where: {
        latitude: {
          gte: swLat, // Greater than or equal to swLat
          lte: neLat, // Less than or equal to neLat
        },
        longitude: {
          gte: swLng, // Greater than or equal to swLng
          lte: neLng, // Less than or equal to neLng
        },
      },
    });
  }
}
