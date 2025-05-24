class UserLocationDto {
  final int? id;
  final String name;
  final double latitude;
  final double longitude;
  final bool isDefault; // Added this field

  UserLocationDto({
    this.id,
    required this.name,
    required this.latitude,
    required this.longitude,
    this.isDefault = false, // Default to false
  });

  factory UserLocationDto.fromJson(Map<String, dynamic> json) {
    return UserLocationDto(
      id: json['id'],
      name: json['name'],
      latitude: json['latitude'].toDouble(),
      longitude: json['longitude'].toDouble(),
      isDefault: json['isDefault'] ?? false, // Handle null case
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'latitude': latitude,
      'longitude': longitude,
      'isDefault': isDefault,
    };
  }
}

class CreateUserLocationDto {
  final String name;
  final double latitude;
  final double longitude;
  final bool? isDefault;

  CreateUserLocationDto({
    required this.name,
    required this.latitude,
    required this.longitude,
    this.isDefault,
  });

  Map<String, dynamic> toJson() {
    return {
      'name': name,
      'latitude': latitude,
      'longitude': longitude,
      if (isDefault != null) 'isDefault': isDefault,
    };
  }
}

class UpdateUserLocationDto {
  final int id;
  final String? name;
  final double? latitude;
  final double? longitude;
  final bool? isDefault;

  UpdateUserLocationDto({
    required this.id,
    this.name,
    this.latitude,
    this.longitude,
    this.isDefault,
  });

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      if (name != null) 'name': name,
      if (latitude != null) 'latitude': latitude,
      if (longitude != null) 'longitude': longitude,
      if (isDefault != null) 'isDefault': isDefault,
    };
  }
}
