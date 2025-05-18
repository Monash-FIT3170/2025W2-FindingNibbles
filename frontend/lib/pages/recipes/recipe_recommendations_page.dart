import 'package:flutter/material.dart';
import 'recipe_ingredients_page.dart';

class RecipePage extends StatefulWidget {
  const RecipePage({super.key});

  @override
  State<RecipePage> createState() => _RecipePageState();
}

class _RecipePageState extends State<RecipePage> {
  // Sample data for recipes
  final List<List<Map<String, String>>> recipePages = [
    [
      {
        'title': 'Traditional spare ribs baked',
        'time': '55 min',
        'difficulty': 'Hard',
        'image': 'assets/images/spare_ribs.jpg',
      },
      {
        'title': 'Spice Roasted Chicken with Flavored Rice',
        'time': '30 min',
        'difficulty': 'Medium',
        'image': 'assets/images/roasted_chicken.jpg',
      },
      {
        'title': 'Spicy fried rice mix chicken bali',
        'time': '25 min',
        'difficulty': 'Medium',
        'image': 'assets/images/fried_rice.jpg',
      },
    ],
    [
      {
        'title': 'Grilled Salmon with Lemon Butter',
        'time': '40 min',
        'difficulty': 'Easy',
        'image': 'assets/images/grilled_salmon.jpg',
      },
      {
        'title': 'Vegetarian Pasta Primavera',
        'time': '35 min',
        'difficulty': 'Easy',
        'image': 'assets/images/pasta_primavera.jpg',
      },
      {
        'title': 'Beef Stroganoff',
        'time': '50 min',
        'difficulty': 'Hard',
        'image': 'assets/images/beef_stroganoff.jpg',
      },
    ],
  ];

    // Function to determine the difficulty color
  Color _getDifficultyColor(String difficulty) {
    if (difficulty == 'Hard') { // hard will be red 
      return Colors.red;
    } else if (difficulty == 'Medium') { // medium will be orange
      return Colors.orange;
    } else {
      return Colors.green; // easy will be green
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Based on Your Ingredients:'),
        backgroundColor: Color(0xFFB4436C), // The color from the screenshot
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: ListView.builder(
          itemCount: recipes.length,
          itemBuilder: (context, index) {
            return Card(
              margin: EdgeInsets.symmetric(vertical: 10),
              elevation: 4,
              child: ListTile(
                contentPadding: EdgeInsets.all(16),
                title: Text(recipes[index]['title']!),
                subtitle: Row(
                  children: [
                    Icon(
                      Icons.access_time,
                      size: 16,
                    ),
                    SizedBox(width: 5),
                    Text(recipes[index]['time']!),
                    SizedBox(width: 20),
                    Text(
                      recipes[index]['difficulty']!,
                      style: TextStyle(
                        color: _getDifficultyColor(recipes[index]['difficulty']!),
                      ),
                    ),
                  ],
                ),
                trailing: IconButton(
                  icon: Icon(Icons.favorite_border),
                  onPressed: () {
                    // Implement the favorite functionality here
                  },
                ),
                onTap: () {
                  // Implement tap action here (e.g., go to recipe details page)
                },
              ),
            );
          },
        ),
      ),
    );
  }

  }