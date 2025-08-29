// Type definitions for custom data structures
export type RestaurantPhoto = {
  photoReference: string;
  height: number;
  width: number;
  htmlAttributions: string[];
};

export type CsvRestaurantData = {
  census_year: number;
  block_id: number;
  property_id: number;
  base_property_id: number;
  building_address: string;
  clue_small_area: string;
  trading_name: string;
  business_address: string;
  industry_code: number;
  industry_description: string;
  seating_type: string;
  number_of_seats: number;
  longitude: string;
  latitude: string;
  location: string;
};

export interface RestaurantData {
  place_id: string;
  name: string;
  latitude: number;
  longitude: number;
  businessStatus: string;
  icon: string;
  rating: number;
  userRatingsTotal: number;
  priceLevel?: number;
  formattedAddress: string;
  formattedPhoneNum?: string;
  website?: string;
  photos: RestaurantPhoto[];
  cuisines: CuisineData[];
}

export interface CuisineData {
  name: string;
  description?: string;
}
