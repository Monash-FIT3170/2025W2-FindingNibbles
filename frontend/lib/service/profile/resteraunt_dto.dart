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
  final DateTime createdAt;
  final DateTime updatedAt;

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
    required this.createdAt,
    required this.updatedAt,
  });

  // Factory method to create a DTO from JSON
  factory RestaurantDto.fromJson(Map<String, dynamic> json) {
    return RestaurantDto(
      id: json['id'] as int,
      placeId: json['place_id'] as String,
      name: json['name'] as String,
      latitude: (json['latitude'] as num).toDouble(),
      longitude: (json['longitude'] as num).toDouble(),
      businessStatus: json['businessStatus'] as String?,
      icon: json['icon'] as String?,
      rating:
          json['rating'] != null ? (json['rating'] as num).toDouble() : null,
      userRatingsTotal: json['userRatingsTotal'] as int?,
      priceLevel: json['priceLevel'] as int?,
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
      createdAt: DateTime.parse(json['createdAt'] as String),
      updatedAt: DateTime.parse(json['updatedAt'] as String),
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
      'createdAt': createdAt.toIso8601String(),
      'updatedAt': updatedAt.toIso8601String(),
    };
  }
}
