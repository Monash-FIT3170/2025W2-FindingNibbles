class UserLocationDto {
  final int? id;
  final String name;
  final String? streetAddress; // Optional field for street address
  final double latitude;
  final double longitude;
  final bool isDefault; // Added this field

  UserLocationDto({
    this.id,
    required this.name,
    this.streetAddress, // Optional field
    required this.latitude,
    required this.longitude,
    this.isDefault = false, // Default to false
  });

  factory UserLocationDto.fromJson(Map<String, dynamic> json) {
    return UserLocationDto(
      id: json['id'],
      name: json['name'],
      streetAddress: json['streetAddress'], // Optional field
      latitude: json['latitude'].toDouble(),
      longitude: json['longitude'].toDouble(),
      isDefault: json['isDefault'] ?? false, // Handle null case
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'streetAddress': streetAddress, // Optional field
      'latitude': latitude,
      'longitude': longitude,
      'isDefault': isDefault,
    };
  }
}

class CreateUserLocationDto {
  final String name;
  final String? streetAddress; // Optional field for street address
  final double latitude;
  final double longitude;
  final bool? isDefault;

  CreateUserLocationDto({
    required this.name,
    this.streetAddress, // Optional field
    required this.latitude,
    required this.longitude,
    this.isDefault,
  });

  Map<String, dynamic> toJson() {
    return {
      'name': name,
      'streetAddress': streetAddress, // Optional field
      'latitude': latitude,
      'longitude': longitude,
      if (isDefault != null) 'isDefault': isDefault,
    };
  }
}

class UpdateUserLocationDto {
  final int id;
  final String? name;
  final String? streetAddress; // Optional field for street address
  final double? latitude;
  final double? longitude;
  final bool? isDefault;

  UpdateUserLocationDto({
    required this.id,
    this.name,
    this.streetAddress, // Optional field
    this.latitude,
    this.longitude,
    this.isDefault,
  });

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      if (name != null) 'name': name,
      if (streetAddress != null) 'streetAddress': streetAddress,
      if (latitude != null) 'latitude': latitude,
      if (longitude != null) 'longitude': longitude,
      if (isDefault != null) 'isDefault': isDefault,
    };
  }
}
