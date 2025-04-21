// Type definitions for custom data structures
export type RestaurantPhoto = {
  photoReference: string;
  height: number;
  width: number;
  htmlAttributions: string[];
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
}
