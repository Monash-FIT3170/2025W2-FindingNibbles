import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { DirectionsService, DirectionsResponse } from './directions.service';

@Controller('directions')
export class DirectionsController {
  constructor(private readonly directionsService: DirectionsService) {}

  @Get()
  async getDirections(
    @Query('startLat') startLat: string,
    @Query('startLon') startLon: string,
    @Query('endLat') endLat: string,
    @Query('endLon') endLon: string,
  ): Promise<DirectionsResponse> {
    // Validate required parameters
    if (!startLat || !startLon || !endLat || !endLon) {
      throw new BadRequestException(
        'Missing required parameters: startLat, startLon, endLat, endLon',
      );
    }

    // Validate that coordinates are valid numbers
    const coords = [startLat, startLon, endLat, endLon];
    for (const coord of coords) {
      const num = parseFloat(coord);
      if (isNaN(num)) {
        throw new BadRequestException(`Invalid coordinate: ${coord}`);
      }
      // Basic latitude/longitude validation
      if (coord === startLat || coord === endLat) {
        if (num < -90 || num > 90) {
          throw new BadRequestException(`Invalid latitude: ${coord}`);
        }
      } else {
        if (num < -180 || num > 180) {
          throw new BadRequestException(`Invalid longitude: ${coord}`);
        }
      }
    }

    // Log the request for debugging
    console.log(`Directions request: ${startLat},${startLon} to ${endLat},${endLon}`);

    const directions = await this.directionsService.getDirections(
      startLat,
      startLon,
      endLat,
      endLon,
    );
    return directions;
  }
}
