class Recipe {
  final String title;
  final String imageUrl;
  final int cookingTime;
  final List<String> ingredients;
  final List<String> instructions;
  final String difficulty;
  bool isFavorite;

  Recipe({
    required this.title,
    required this.imageUrl,
    required this.cookingTime,
    required this.ingredients,
    required this.instructions,
    this.difficulty = 'Easy', // 👈 Default to 'Easy' if not provided
    this.isFavorite = false,
  });
}