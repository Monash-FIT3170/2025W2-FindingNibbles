class CuisineDto {
  final int id;
  final String name;

  CuisineDto({
    required this.id,
    required this.name,
  });

  factory CuisineDto.fromJson(Map<String, dynamic> json) {
    return CuisineDto(
      id: json['id'],
      name: json['name'],
    );
  }
}