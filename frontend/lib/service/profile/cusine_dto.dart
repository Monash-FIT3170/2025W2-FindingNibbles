class CuisineDto {
  final String id;
  final String name;
  final String? imageUrl; // optional if you want to display pictures

  CuisineDto({
    required this.id,
    required this.name,
    this.imageUrl,
  });

  factory CuisineDto.fromJson(Map<String, dynamic> json) {
    return CuisineDto(
      id: json['id'] as String,
      name: json['name'] as String,
      imageUrl: json['imageUrl'] as String?, // depends on your backend response
    );
  }
}
