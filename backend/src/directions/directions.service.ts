import { Injectable, BadRequestException } from '@nestjs/common';

export interface Waypoint {
  hint: string;
  distance: number;
  location: [number, number];
  name: string;
}

export interface Route {
  legs: {
    steps: any[];
    weight: number;
    distance: number;
    summary: string;
    duration: number;
  }[];
  weight_name: string;
  geometry: string;
  weight: number;
  distance: number;
  duration: number;
}

export interface DirectionsResponse {
  code: string;
  waypoints: Waypoint[];
  routes: Route[];
}

@Injectable()
export class DirectionsService {
  async getDirections(
    startLat: string,
    startLon: string,
    endLat: string,
    endLon: string,
  ): Promise<DirectionsResponse> {
    if (!process.env.LOCATIONIQ_API_KEY) {
      throw new BadRequestException('LocationIQ API key not configured');
    }

    // Validate coordinates
    const startLatNum = parseFloat(startLat);
    const startLonNum = parseFloat(startLon);
    const endLatNum = parseFloat(endLat);
    const endLonNum = parseFloat(endLon);

    if (
      isNaN(startLatNum) ||
      isNaN(startLonNum) ||
      isNaN(endLatNum) ||
      isNaN(endLonNum)
    ) {
      throw new BadRequestException('Invalid coordinates provided');
    }

    // LocationIQ API URL format: coordinates separated by semicolon
    const coordinates = `${startLon},${startLat};${endLon},${endLat}`; // Note: lon,lat format for LocationIQ
    const baseUrl = 'https://us1.locationiq.com/v1/directions/driving';
    const url = `${baseUrl}/${coordinates}?key=${process.env.LOCATIONIQ_API_KEY}&geometries=polyline&overview=full&steps=true`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'User-Agent': 'FindingNibbles/1.0',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `LocationIQ API error: ${response.status} ${response.statusText} - ${errorText}`,
        );
      }

      const data = (await response.json()) as DirectionsResponse;

      if (data.code !== 'Ok') {
        // Provide more specific error messages based on common error codes
        let errorMessage = `LocationIQ API returned error code: ${data.code}`;
        switch (data.code) {
          case 'NoRoute':
            errorMessage =
              'No route could be found between the specified locations';
            break;
          case 'NoSegment':
            errorMessage =
              'One of the supplied input coordinates could not snap to street segment';
            break;
          case 'InvalidInput':
            errorMessage = 'The input coordinates are invalid';
            break;
          default:
            errorMessage = `LocationIQ API error: ${data.code}`;
        }

        throw new Error(errorMessage);
      }

      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(
          `Failed to fetch directions: ${error.message}`,
        );
      }
      throw new BadRequestException(
        'Failed to fetch directions: Unknown error',
      );
    }
  }
}
