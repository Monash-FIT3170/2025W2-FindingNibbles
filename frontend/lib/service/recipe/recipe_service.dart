import 'package:http/http.dart' as http;
import 'dart:convert';

class RecipeService {
  static Future<List<dynamic>> fetchRecipes() async {
    final response = await http.post(
      Uri.parse('http://localhost:3000/api/recipes'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({
        'ingredients': ['chicken', 'spinach', 'garlic'],
        'restrictions': ['gluten-free', 'kosher'],
        'utensils': ['oven', 'stovetop'],
        'count': 3,
      }),
    );

    if (response.statusCode == 200) {
      return jsonDecode(response.body)['recipes'];
    } else {
      throw Exception('Failed to load recipes');
    }
  }
}


