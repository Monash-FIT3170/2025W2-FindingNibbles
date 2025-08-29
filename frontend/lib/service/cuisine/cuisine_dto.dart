class CuisineDto {
  final int id;
  final String name;
  final String? description;

  CuisineDto({required this.id, required this.name, this.description});

  factory CuisineDto.fromJson(Map<String, dynamic> json) {
    return CuisineDto(
      id: json['id'],
      name: json['name'],
      description: json['description'],
    );
  }

  // Converts the CuisineDto object to a JSON map.
  Map<String, dynamic> toJson() {
    return {'id': id, 'name': name, 'description': description};
  }
}
