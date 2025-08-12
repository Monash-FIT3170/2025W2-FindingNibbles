import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  Client,
  Status,
  PlacesNearbyRequest,
  PlaceDetailsRequest,
  PlaceAutocompleteRequest,
  TextSearchRequest,
} from '@googlemaps/google-maps-services-js';

export interface NearbyRestaurantResult {
  place_id: string;
  name: string;
  latitude: number;
  longitude: number;
  rating?: number;
  user_ratings_total?: number;
  price_level?: number;
  business_status?: string;
  vicinity?: string;
  photos?: Array<{
    photo_reference: string;
    height: number;
    width: number;
  }>;
  types: string[];
  opening_hours?: {
    open_now?: boolean;
  };
}

export interface RestaurantDetailsResult {
  place_id: string;
  name: string;
  latitude: number;
  longitude: number;
  formatted_address?: string;
  formatted_phone_number?: string;
  international_phone_number?: string;
  website?: string;
  rating?: number;
  user_ratings_total?: number;
  price_level?: number;
  business_status?: string;
  opening_hours?: {
    open_now?: boolean;
    periods?: Array<{
      open: { day: number; time?: string };
      close?: { day: number; time?: string };
    }>;
    weekday_text?: string[];
  };
  photos?: Array<{
    photo_reference: string;
    height: number;
    width: number;
    html_attributions: string[];
  }>;
  types: string[];
  reviews?: Array<{
    author_name: string;
    author_url?: string;
    language?: string;
    profile_photo_url?: string;
    rating: number;
    relative_time_description: string;
    text: string;
    time: number;
  }>;
  url?: string;
  utc_offset?: number;
  vicinity?: string;
}

export interface AutocompleteResult {
  place_id: string;
  description: string;
  structured_formatting: {
    main_text: string;
    secondary_text?: string;
  };
  types: string[];
}

export interface RestaurantReview {
  author_name: string;
  author_url?: string;
  language?: string;
  profile_photo_url?: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
}

@Injectable()
export class GooglePlacesApiService {
  private client: Client;
  private apiKey: string;

  constructor(private configService: ConfigService) {
    this.client = new Client({});
    this.apiKey = this.configService.get<string>('GOOGLE_PLACES_API_KEY')!;

    if (!this.apiKey) {
      throw new Error('GOOGLE_PLACES_API_KEY is required but not provided');
    }
  }

  /**
   * Search for nearby restaurants
   */
  async getNearbyRestaurants(
    latitude: number,
    longitude: number,
    radius: number = 1500,
    keyword?: string,
    minprice?: number,
    maxprice?: number,
    opennow?: boolean,
  ): Promise<NearbyRestaurantResult[]> {
    try {
      const params: PlacesNearbyRequest['params'] = {
        location: { lat: latitude, lng: longitude },
        radius,
        type: 'restaurant',
        key: this.apiKey,
        ...(keyword ? { keyword } : {}),
        ...(minprice !== undefined ? { minprice } : {}),
        ...(maxprice !== undefined ? { maxprice } : {}),
        ...(opennow !== undefined ? { opennow } : {}),
      };

      const response = await this.client.placesNearby({ params });

      if (
        response.data.status !== Status.OK &&
        response.data.status !== Status.ZERO_RESULTS
      ) {
        throw new Error(`Google Places API error: ${response.data.status}`);
      }

      return response.data.results
        .filter((place) =>
          Boolean(place.place_id && place.name && place.geometry?.location),
        )
        .map((place) => ({
          place_id: place.place_id as string,
          name: place.name as string,
          latitude: place.geometry!.location.lat,
          longitude: place.geometry!.location.lng,
          rating: place.rating,
          user_ratings_total: place.user_ratings_total,
          price_level: place.price_level,
          business_status: place.business_status,
          vicinity: place.vicinity,
          photos:
            place.photos?.slice(0, 5).map((photo) => ({
              photo_reference: photo.photo_reference,
              height: photo.height,
              width: photo.width,
            })) || [],
          types: place.types || [],
          opening_hours: place.opening_hours
            ? { open_now: place.opening_hours.open_now }
            : undefined,
        }));
    } catch (error) {
      console.error('Error fetching nearby restaurants:', error);
      throw new BadRequestException('Failed to fetch nearby restaurants');
    }
  }

  /**
   * Get detailed information about a specific restaurant
   */
  async getRestaurantDetails(
    placeId: string,
  ): Promise<RestaurantDetailsResult | null> {
    try {
      const params: PlaceDetailsRequest['params'] = {
        place_id: placeId,
        fields: [
          'place_id',
          'name',
          'geometry',
          'formatted_address',
          'formatted_phone_number',
          'international_phone_number',
          'website',
          'rating',
          'user_ratings_total',
          'price_level',
          'business_status',
          'opening_hours',
          'photos',
          'types',
          'reviews',
          'url',
          'utc_offset',
          'vicinity',
        ],
        key: this.apiKey,
      };

      const response = await this.client.placeDetails({ params });

      if (response.data.status !== Status.OK) {
        if (response.data.status === Status.NOT_FOUND) {
          return null;
        }
        throw new Error(`Google Places API error: ${response.data.status}`);
      }

      const place = response.data.result;
      if (
        !place ||
        !place.place_id ||
        !place.name ||
        !place.geometry?.location
      ) {
        return null;
      }

      return {
        place_id: place.place_id,
        name: place.name,
        latitude: place.geometry.location.lat,
        longitude: place.geometry.location.lng,
        formatted_address: place.formatted_address,
        formatted_phone_number: place.formatted_phone_number,
        international_phone_number: place.international_phone_number,
        website: place.website,
        rating: place.rating,
        user_ratings_total: place.user_ratings_total,
        price_level: place.price_level,
        business_status: place.business_status,
        opening_hours: place.opening_hours
          ? {
              open_now: place.opening_hours.open_now,
              periods: place.opening_hours.periods?.map((p) => ({
                open: { day: p.open.day, time: p.open.time },
                ...(p.close
                  ? { close: { day: p.close.day, time: p.close.time } }
                  : {}),
              })),
              weekday_text: place.opening_hours.weekday_text,
            }
          : undefined,
        photos:
          place.photos?.map((photo) => ({
            photo_reference: photo.photo_reference,
            height: photo.height,
            width: photo.width,
            html_attributions: photo.html_attributions,
          })) || [],
        types: place.types || [],
        reviews:
          place.reviews?.map((review) => ({
            author_name: review.author_name,
            author_url: review.author_url,
            language: review.language,
            profile_photo_url: review.profile_photo_url,
            rating: review.rating,
            relative_time_description: review.relative_time_description,
            text: review.text,
            time:
              typeof review.time === 'number'
                ? review.time
                : Number(review.time),
          })) || [],
        url: place.url,
        utc_offset: place.utc_offset,
        vicinity: place.vicinity,
      };
    } catch (error) {
      console.error(`Error fetching restaurant details for ${placeId}:`, error);
      throw new BadRequestException('Failed to fetch restaurant details');
    }
  }

  /**
   * Autocomplete search for restaurants
   */
  async autocompleteRestaurants(
    input: string,
    latitude?: number,
    longitude?: number,
    radius?: number,
  ): Promise<AutocompleteResult[]> {
    try {
      const params: PlaceAutocompleteRequest['params'] = {
        input,
        types: 'establishment' as PlaceAutocompleteRequest['params']['types'],
        key: this.apiKey,
        ...(latitude !== undefined && longitude !== undefined
          ? { location: { lat: latitude, lng: longitude } }
          : {}),
        ...(radius ? { radius } : {}),
      };

      const response = await this.client.placeAutocomplete({ params });

      if (
        response.data.status !== Status.OK &&
        response.data.status !== Status.ZERO_RESULTS
      ) {
        throw new Error(`Google Places API error: ${response.data.status}`);
      }

      const filteredPredictions = response.data.predictions.filter(
        (prediction) =>
          prediction.types?.some((type) =>
            [
              'restaurant',
              'food',
              'meal_takeaway',
              'meal_delivery',
              'cafe',
            ].includes(type),
          ),
      );

      return filteredPredictions.map((prediction) => ({
        place_id: prediction.place_id,
        description: prediction.description,
        structured_formatting: {
          main_text: prediction.structured_formatting.main_text,
          secondary_text: prediction.structured_formatting.secondary_text,
        },
        types: prediction.types || [],
      }));
    } catch (error) {
      console.error('Error in autocomplete search:', error);
      throw new BadRequestException('Failed to perform autocomplete search');
    }
  }

  /**
   * Get photo URL from photo reference
   */
  getPhotoUrl(photoReference: string, maxWidth: number = 400): string {
    return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxWidth}&photo_reference=${photoReference}&key=${this.apiKey}`;
  }

  /**
   * Text search for restaurants
   */
  async searchRestaurants(
    query: string,
    latitude?: number,
    longitude?: number,
    radius?: number,
  ): Promise<NearbyRestaurantResult[]> {
    try {
      const params: TextSearchRequest['params'] = {
        query,
        key: this.apiKey,
        ...(latitude !== undefined && longitude !== undefined
          ? { location: { lat: latitude, lng: longitude } }
          : {}),
        ...(radius ? { radius } : {}),
      };

      const response = await this.client.textSearch({ params });

      if (
        response.data.status !== Status.OK &&
        response.data.status !== Status.ZERO_RESULTS
      ) {
        throw new Error(`Google Places API error: ${response.data.status}`);
      }

      return response.data.results
        .filter((place) =>
          Boolean(place.place_id && place.name && place.geometry?.location),
        )
        .map((place) => ({
          place_id: place.place_id as string,
          name: place.name as string,
          latitude: place.geometry!.location.lat,
          longitude: place.geometry!.location.lng,
          rating: place.rating,
          user_ratings_total: place.user_ratings_total,
          price_level: place.price_level,
          business_status: place.business_status,
          vicinity: place.vicinity,
          photos:
            place.photos?.slice(0, 5).map((photo) => ({
              photo_reference: photo.photo_reference,
              height: photo.height,
              width: photo.width,
            })) || [],
          types: place.types || [],
          opening_hours: place.opening_hours
            ? { open_now: place.opening_hours.open_now }
            : undefined,
        }));
    } catch (error) {
      console.error('Error in text search:', error);
      throw new BadRequestException('Failed to search restaurants');
    }
  }
}
