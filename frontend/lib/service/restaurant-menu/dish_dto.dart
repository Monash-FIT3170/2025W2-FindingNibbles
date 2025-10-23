class DishDto {
  final int id;
  final String name;
  final String? description;
  final double? price;
  final String? category;
  final int? calories;
  final List<String> dietaryTags;

  DishDto({
    required this.id,
    required this.name,
    this.description,
    this.price,
    this.category,
    this.calories,
    required this.dietaryTags,
  });

  factory DishDto.fromJson(Map<String, dynamic> json) {
    return DishDto(
      id: json['id'] as int,
      name: json['name'] as String,
      description: json['description'] as String?,
      price: json['price'] != null ? (json['price'] as num).toDouble() : null,
      category: json['category'] as String?,
      calories: json['calories'] as int?,
      dietaryTags:
          (json['dietaryTags'] as List<dynamic>?)
              ?.map((e) => e as String)
              .toList() ??
          [],
    );
  }
}
