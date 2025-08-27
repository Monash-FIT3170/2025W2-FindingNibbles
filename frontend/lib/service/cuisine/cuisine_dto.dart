class CuisineDto {
  final int id;
  final String name;
  bool isFavourite; // <-- added

  CuisineDto({
    required this.id,
    required this.name,
    this.isFavourite = false, // default to false if missing
  });

  factory CuisineDto.fromJson(Map<String, dynamic> json) {
    return CuisineDto(
      id: json['id'],
      name: json['name'],
      isFavourite: json['isFavourite'] ??
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
      'isFavourite': isFavourite,
    };
  }
}
