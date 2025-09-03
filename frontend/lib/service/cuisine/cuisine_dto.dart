class CuisineDto {
  final int id;
  final String name;
  final String? description; // <-- added
  bool isFavourite; // <-- already present

  CuisineDto({
    required this.id,
    required this.name,
    this.description, // optional by default
    this.isFavourite = false,
  });

  factory CuisineDto.fromJson(Map<String, dynamic> json) {
    return CuisineDto(
      id: json['id'],
      name: json['name'],
      description: json['description'], // <-- map from JSON
      isFavourite:
          json['isFavourite'] ??
          json['is_favourite'] ??
          json['favourite'] ??
          false,
    );
  }

  // Converts the CuisineDto object to a JSON map.
  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'description': description, // <-- include in JSON
      'isFavourite': isFavourite,
    };
  }
}
