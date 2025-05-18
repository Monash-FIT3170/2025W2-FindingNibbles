import 'package:flutter/material.dart';
import 'dart:convert';

class RecipePage extends StatelessWidget {
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

  // Function to determine the difficulty color
  Color _getDifficultyColor(String difficulty) {
    if (difficulty == 'Hard') {
      return Colors.red;
    } else if (difficulty == 'Medium') {
      return Colors.orange;
    } else {
      return Colors.green;
    }
  }
}