class RecipeDto {
  final int id;
  final String title;
  final String description;
  final List<String> ingredients;
  final List<String> instructions;
  final int estimatedTimeMinutes;
  final int servings;
  final List<String> dietaryTags;
  final List<String> nutritionalInfo;
  final String difficultyLevel;
  final String? imageURL;
  final int cuisineId;
  final String cuisine;
  final int? logId;

  RecipeDto({
    required this.id,
    required this.title,
    required this.description,
    required this.ingredients,
    required this.instructions,
    required this.estimatedTimeMinutes,
    required this.servings,
    required this.dietaryTags,
    required this.nutritionalInfo,
    required this.difficultyLevel,
    this.imageURL,
    required this.cuisineId,
    required this.cuisine,
    this.logId,
  });

  /// Factory method to create a `RecipeDto` from a JSON object
  factory RecipeDto.fromJson(Map<String, dynamic> json) {
    return RecipeDto(
      id: json['id'] as int,
      title: json['title'] as String,
      description: json['description'] as String,
      ingredients: List<String>.from(json['ingredients'] as List),
      instructions: List<String>.from(json['instructions'] as List),
      estimatedTimeMinutes: json['estimatedTimeMinutes'] as int,
      servings: json['servings'] as int,
      dietaryTags: List<String>.from(json['dietaryTags'] as List),
      nutritionalInfo: List<String>.from(json['nutritionalInfo'] as List),
      difficultyLevel: json['difficultyLevel'] as String,
      imageURL: json['imageURL'] as String?,
      cuisineId: json['cuisineId'] as int,
      cuisine: json['cuisine'] as String,
      logId: json['logId'] as int?,
    );
  }

  /// Method to convert a `RecipeDto` to a JSON object
  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'title': title,
      'description': description,
      'ingredients': ingredients,
      'instructions': instructions,
      'estimatedTimeMinutes': estimatedTimeMinutes,
      'servings': servings,
      'dietaryTags': dietaryTags,
      'nutritionalInfo': nutritionalInfo,
      'difficultyLevel': difficultyLevel,
      'imageURL': imageURL,
      'cuisineId': cuisineId,
      'cuisine': cuisine,
      'logId': logId,
    };
  }
}
