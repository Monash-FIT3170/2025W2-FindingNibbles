import '../cuisine/cuisine_dto.dart';
class RestaurantDto {
  final int id;
  final String placeId; // Google Places ID
  final String name;
  final double latitude;
  final double longitude;
  final String? businessStatus;
  final String? icon;
  final double? rating;
  final int? userRatingsTotal;
  final int? priceLevel;
  final bool hasDetails;
  final String? formattedAddress;
  final String? formattedPhoneNum;
  final String? website;
  final bool? dineIn;
  final bool? takeout;
  final bool? delivery;
  final bool? servesBreakfast;
  final bool? servesLunch;
  final bool? servesDinner;
  final bool? wheelchairAccessibleEntrance;
  final int? viewCount; // Added to support popularity sorting
  final DateTime createdAt;
  final DateTime updatedAt;
  final List<RestaurantCuisineDto>? restaurantCuisines; // Added cuisine relations


  RestaurantDto({
    required this.id,
    required this.placeId,
    required this.name,
    required this.latitude,
    required this.longitude,
    this.businessStatus,
    this.icon,
    this.rating,
    this.userRatingsTotal,
    this.priceLevel,
    required this.hasDetails,
    this.formattedAddress,
    this.formattedPhoneNum,
    this.website,
    this.dineIn,
    this.takeout,
    this.delivery,
    this.servesBreakfast,
    this.servesLunch,
    this.servesDinner,
    this.wheelchairAccessibleEntrance,
    this.viewCount,
    required this.createdAt,
    required this.updatedAt,
    this.restaurantCuisines,

  });

  // Factory method to create a DTO from JSON
  factory RestaurantDto.fromJson(Map<String, dynamic> json) {
    return RestaurantDto(
      id: json['id'] as int,
      placeId:
          json['placeId'] as String? ?? '', // Provide a default value if null
      name:
          json['name'] as String? ??
          'Unknown', // Provide a default value if null
      latitude: (json['latitude'] as num).toDouble(),
      longitude: (json['longitude'] as num).toDouble(),
      businessStatus: json['businessStatus'] as String?,
      icon: json['icon'] as String?,
      rating: (json['rating'] as num?)?.toDouble(),
      userRatingsTotal: json['userRatingsTotal'] as int?,
      priceLevel: json['priceLevel'] as int?,
      hasDetails: json['hasDetails'] as bool,
      formattedAddress: json['formattedAddress'] as String?,
      formattedPhoneNum: json['formattedPhoneNum'] as String?,
      website: json['website'] as String?,
      dineIn: json['dineIn'] as bool?,
      takeout: json['takeout'] as bool?,
      delivery: json['delivery'] as bool?,
      servesBreakfast: json['servesBreakfast'] as bool?,
      servesLunch: json['servesLunch'] as bool?,
      servesDinner: json['servesDinner'] as bool?,
      wheelchairAccessibleEntrance:
          json['wheelchairAccessibleEntrance'] as bool?,
      viewCount: json['viewCount'] as int?,
      createdAt: DateTime.parse(json['createdAt'] as String),
      updatedAt: DateTime.parse(json['updatedAt'] as String),
      restaurantCuisines: json['restaurantCuisines'] != null
          ? (json['restaurantCuisines'] as List)
              .map((item) => RestaurantCuisineDto.fromJson(item))
              .toList()
          : null,
    );
  }

  // Method to convert the DTO to JSON
  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'place_id': placeId,
      'name': name,
      'latitude': latitude,
      'longitude': longitude,
      'businessStatus': businessStatus,
      'icon': icon,
      'rating': rating,
      'userRatingsTotal': userRatingsTotal,
      'priceLevel': priceLevel,
      'hasDetails': hasDetails,
      'formattedAddress': formattedAddress,
      'formattedPhoneNum': formattedPhoneNum,
      'website': website,
      'dineIn': dineIn,
      'takeout': takeout,
      'delivery': delivery,
      'servesBreakfast': servesBreakfast,
      'servesLunch': servesLunch,
      'servesDinner': servesDinner,
      'wheelchairAccessibleEntrance': wheelchairAccessibleEntrance,
      'viewCount': viewCount,
      'createdAt': createdAt.toIso8601String(),
      'updatedAt': updatedAt.toIso8601String(),
      'restaurantCuisines': restaurantCuisines?.map((item) => item.toJson()).toList(),
    };
  }

  // Helper method to get all cuisine names
  List<String> get cuisineNames {
    return restaurantCuisines
        ?.map((rc) => rc.cuisine?.name ?? '')
        .where((name) => name.isNotEmpty)
        .toList() ?? [];
  }

  // Helper method to check if restaurant has a specific cuisine
  bool hasCuisine(int cuisineId) {
    return restaurantCuisines?.any((rc) => rc.cuisineId == cuisineId) ?? false;
  }
}

// Supporting DTOs for the relations
class RestaurantCuisineDto {
  final int id;
  final int restaurantId;
  final int cuisineId;
  final CuisineDto? cuisine;

  RestaurantCuisineDto({
    required this.id,
    required this.restaurantId,
    required this.cuisineId,
    this.cuisine,
  });

  factory RestaurantCuisineDto.fromJson(Map<String, dynamic> json) {
    return RestaurantCuisineDto(
      id: json['id'] as int,
      restaurantId: json['restaurantId'] as int,
      cuisineId: json['cuisineId'] as int,
      cuisine: json['cuisine'] != null 
          ? CuisineDto.fromJson(json['cuisine']) 
          : null,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'restaurantId': restaurantId,
      'cuisineId': cuisineId,
      'cuisine': cuisine?.toJson(),
    };
  }
}