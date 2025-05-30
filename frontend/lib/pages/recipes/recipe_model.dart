enum RecipeDifficulty { easy, medium, hard, any }

class RecipeModel {
  final String title;
  final String description;
  final List<String> ingredients;
  final List<String> instructions;
  final int estimatedTimeMinutes;
  final int servings;
  final List<String> dietaryTags;
  final List<String> nutritionalInfo;
  final RecipeDifficulty difficultyLevel;
  final String cuisine;
  bool isFavorite;

  RecipeModel({
    required this.title,
    required this.description,
    required this.ingredients,
    required this.instructions,
    required this.estimatedTimeMinutes,
    required this.servings,
    required this.dietaryTags,
    required this.nutritionalInfo,
    required this.difficultyLevel,
    required this.cuisine,
    this.isFavorite = false,
  });

  factory RecipeModel.fromJson(Map<String, dynamic> json) {
    return RecipeModel(
      title: json['title'] as String,
      description: json['description'] as String,
      ingredients: List<String>.from(json['ingredients'] as List),
      instructions: List<String>.from(json['instructions'] as List),
      estimatedTimeMinutes: json['estimatedTimeMinutes'] as int,
      servings: json['servings'] as int,
      dietaryTags: List<String>.from(json['dietaryTags'] as List),
      nutritionalInfo: List<String>.from(json['nutritionalInfo'] as List),
      difficultyLevel: RecipeDifficulty.values.firstWhere(
        (e) => e.name == json['difficultyLevel'],
      ),
      cuisine: json['cuisine'] as String,
    );
  }

  Map<String, dynamic> toJson() => {
    'title': title,
    'description': description,
    'ingredients': ingredients,
    'instructions': instructions,
    'estimatedTimeMinutes': estimatedTimeMinutes,
    'servings': servings,
    'dietaryTags': dietaryTags,
    'nutritionalInfo': nutritionalInfo,
    'difficultyLevel': difficultyLevel.name,
    'cuisine': cuisine,
  };
}
