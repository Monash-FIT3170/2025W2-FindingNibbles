/// DTO for Google Places restaurant results
class GooglePlacesRestaurantDto {
  final String placeId;
  final String name;
  final double latitude;
  final double longitude;
  final double? rating;
  final int? userRatingsTotal;
  final int? priceLevel;
  final String? businessStatus;
  final String? vicinity;
  final List<GooglePlacesPhotoDto>? photos;
  final List<String> types;
  final GooglePlacesOpeningHoursDto? openingHours;

  GooglePlacesRestaurantDto({
    required this.placeId,
    required this.name,
    required this.latitude,
    required this.longitude,
    this.rating,
    this.userRatingsTotal,
    this.priceLevel,
    this.businessStatus,
    this.vicinity,
    this.photos,
    required this.types,
    this.openingHours,
  });

  factory GooglePlacesRestaurantDto.fromJson(Map<String, dynamic> json) {
    return GooglePlacesRestaurantDto(
      placeId: json['place_id'] ?? '',
      name: json['name'] ?? '',
      latitude: (json['latitude'] ?? 0.0).toDouble(),
      longitude: (json['longitude'] ?? 0.0).toDouble(),
      rating: json['rating']?.toDouble(),
      userRatingsTotal: json['user_ratings_total'],
      priceLevel: json['price_level'],
      businessStatus: json['business_status'],
      vicinity: json['vicinity'],
      photos:
          json['photos'] != null
              ? (json['photos'] as List)
                  .map((photo) => GooglePlacesPhotoDto.fromJson(photo))
                  .toList()
              : null,
      types: json['types'] != null ? List<String>.from(json['types']) : [],
      openingHours:
          json['opening_hours'] != null
              ? GooglePlacesOpeningHoursDto.fromJson(json['opening_hours'])
              : null,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'place_id': placeId,
      'name': name,
      'latitude': latitude,
      'longitude': longitude,
      'rating': rating,
      'user_ratings_total': userRatingsTotal,
      'price_level': priceLevel,
      'business_status': businessStatus,
      'vicinity': vicinity,
      'photos': photos?.map((photo) => photo.toJson()).toList(),
      'types': types,
      'opening_hours': openingHours?.toJson(),
    };
  }
}

class GooglePlacesPhotoDto {
  final String photoReference;
  final int height;
  final int width;

  GooglePlacesPhotoDto({
    required this.photoReference,
    required this.height,
    required this.width,
  });

  factory GooglePlacesPhotoDto.fromJson(Map<String, dynamic> json) {
    return GooglePlacesPhotoDto(
      photoReference: json['photo_reference'] ?? '',
      height: json['height'] ?? 0,
      width: json['width'] ?? 0,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'photo_reference': photoReference,
      'height': height,
      'width': width,
    };
  }
}

class GooglePlacesOpeningHoursDto {
  final bool? openNow;

  GooglePlacesOpeningHoursDto({this.openNow});

  factory GooglePlacesOpeningHoursDto.fromJson(Map<String, dynamic> json) {
    return GooglePlacesOpeningHoursDto(openNow: json['open_now']);
  }

  Map<String, dynamic> toJson() {
    return {'open_now': openNow};
  }
}
