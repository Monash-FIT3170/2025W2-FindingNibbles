import 'package:nibbles/service/profile/recipe_dto.dart';

class CalorieLogDto {
  final int id;
  final int calories;
  final DateTime date;
  final String? mealName;
  final RecipeDto? recipe;

  CalorieLogDto({
    required this.id,
    required this.calories,
    required this.date,
    this.mealName,
    this.recipe,
  });

  factory CalorieLogDto.fromJson(Map<String, dynamic> json) {
    return CalorieLogDto(
      id: json['id'],
      calories: json['calories'],
      date: DateTime.parse(json['date']),
      mealName: json['mealName'],
      recipe:
          json['recipe'] != null ? RecipeDto.fromJson(json['recipe']) : null,
    );
  }
}
