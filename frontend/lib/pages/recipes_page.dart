import 'package:flutter/material.dart';
import 'package:dio/dio.dart';
import 'package:nibbles/core/logger.dart';

enum RecipeDifficulty { easy, medium, hard, any }

class RecipesPage extends StatefulWidget {
  const RecipesPage({super.key});

  @override
  State<RecipesPage> createState() => _RecipesPageState();
}

class _RecipesPageState extends State<RecipesPage> {
  final dio = Dio();
  final _logger = getLogger();
  final List<String> ingredients = [];
  final List<String> appliances = [];
  final TextEditingController _ingredientInputController =
      TextEditingController();
  final TextEditingController _applianceInputController =
      TextEditingController();
  bool matchDietaryRequirements = false;
  bool includeAllIngredients = false;
  RecipeDifficulty selectedDifficulty = RecipeDifficulty.any;

  @override
  void dispose() {
    _ingredientInputController.dispose();
    _applianceInputController.dispose();
    super.dispose();
  }

  void _addIngredient(String ingredient) {
    if (ingredient.isNotEmpty) {
      setState(() {
        ingredients.add(ingredient);
        _ingredientInputController.clear();
      });
    }
  }

  void _removeIngredient(String ingredient) {
    setState(() {
      ingredients.remove(ingredient);
    });
  }

  void _addAppliance(String appliance) {
    if (appliance.isNotEmpty) {
      setState(() {
        appliances.add(appliance);
        _applianceInputController.clear();
      });
    }
  }

  void _removeAppliance(String appliance) {
    setState(() {
      appliances.remove(appliance);
    });
  }

  void _showAppliancesDrawer() {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      builder: (BuildContext context) {
        return StatefulBuilder(
          builder: (BuildContext context, StateSetter setDrawerState) {
            return DraggableScrollableSheet(
              initialChildSize: 1,
              minChildSize: 1,
              maxChildSize: 1,
              builder: (context, scrollController) {
                return Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Kitchen Appliances',
                        style: Theme.of(context).textTheme.headlineSmall,
                      ),
                      const SizedBox(height: 16),
                      Row(
                        children: [
                          Expanded(
                            child: TextField(
                              controller: _applianceInputController,
                              decoration: const InputDecoration(
                                hintText: 'Add an appliance',
                                border: OutlineInputBorder(),
                              ),
                              onSubmitted: (value) {
                                _addAppliance(value);
                                setDrawerState(() {});
                              },
                            ),
                          ),
                          IconButton(
                            icon: const Icon(Icons.add),
                            onPressed: () {
                              _addAppliance(_applianceInputController.text);
                              setDrawerState(() {});
                            },
                          ),
                        ],
                      ),
                      const SizedBox(height: 16),
                      Expanded(
                        child: ListView.builder(
                          controller: scrollController,
                          itemCount: appliances.length,
                          itemBuilder: (context, index) {
                            return ListTile(
                              title: Text(appliances[index]),
                              trailing: IconButton(
                                icon: const Icon(Icons.delete),
                                onPressed: () {
                                  _removeAppliance(appliances[index]);
                                  setDrawerState(() {});
                                },
                              ),
                            );
                          },
                        ),
                      ),
                    ],
                  ),
                );
              },
            );
          },
        );
      },
    );
  }

  Future<void> _generateRecipes() async {
    try {
      final response = await dio.post(
        'recipes',
        data: {
          'ingredients': ingredients,
          'appliances': appliances,
          'matchDietaryRequirements': matchDietaryRequirements,
          'includeAllIngredients': includeAllIngredients,
          'difficulty': selectedDifficulty.name,
        },
      );

      if (response.statusCode == 200) {
        // TODO: Handle the recipes response
        _logger.d(response.data);
      }
    } catch (e) {
      // Show error dialog
      showDialog(
        context: context,
        builder: (BuildContext context) {
          return AlertDialog(
            title: const Text('Error'),
            content: Text('Failed to generate recipes: ${e.toString()}'),
            actions: [
              TextButton(
                onPressed: () => Navigator.of(context).pop(),
                child: const Text('OK'),
              ),
            ],
          );
        },
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Card(
      shadowColor: Colors.transparent,
      margin: const EdgeInsets.all(8.0),
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: _ingredientInputController,
                    decoration: const InputDecoration(
                      hintText: 'Add an ingredient',
                      border: OutlineInputBorder(),
                    ),
                    onSubmitted: _addIngredient,
                  ),
                ),
                IconButton(
                  icon: const Icon(Icons.add),
                  onPressed:
                      () => _addIngredient(_ingredientInputController.text),
                ),
              ],
            ),
            const SizedBox(height: 16),
            Expanded(
              child: Container(
                decoration: BoxDecoration(
                  border: Border.all(color: Colors.green, width: 2),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: ListView.builder(
                  padding: EdgeInsets.zero,
                  itemCount: ingredients.length,
                  itemBuilder: (context, index) {
                    return ListTile(
                      title: Text(ingredients[index]),
                      trailing: IconButton(
                        icon: const Icon(Icons.delete),
                        onPressed: () => _removeIngredient(ingredients[index]),
                      ),
                    );
                  },
                ),
              ),
            ),
            const SizedBox(height: 16),
            Container(
              decoration: BoxDecoration(
                border: Border.all(color: Colors.red.shade200, width: 2),
                borderRadius: BorderRadius.circular(8),
              ),
              child: Column(
                children: [
                  SwitchListTile(
                    title: const Text('Match Dietary Requirements'),
                    value: matchDietaryRequirements,
                    onChanged: (bool value) {
                      setState(() {
                        matchDietaryRequirements = value;
                      });
                    },
                  ),
                  SwitchListTile(
                    title: const Text('Include All Ingredients'),
                    value: includeAllIngredients,
                    onChanged: (bool value) {
                      setState(() {
                        includeAllIngredients = value;
                      });
                    },
                  ),
                  ListTile(
                    title: const Text('Recipe Difficulty'),
                    contentPadding: EdgeInsets.only(left: 16.0, right: 16.0),
                  ),
                  Align(
                    alignment: Alignment.center,
                    child: SingleChildScrollView(
                      scrollDirection: Axis.horizontal,
                      child: Wrap(
                        spacing: 8.0,
                        children:
                            RecipeDifficulty.values.map((difficulty) {
                              return ChoiceChip(
                                label: Text(difficulty.name.toUpperCase()),
                                selected: selectedDifficulty == difficulty,
                                onSelected: (bool selected) {
                                  setState(() {
                                    selectedDifficulty = difficulty;
                                  });
                                },
                              );
                            }).toList(),
                      ),
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.all(16.0),
                    child: SizedBox(
                      width: double.infinity,
                      child: ElevatedButton.icon(
                        onPressed: _showAppliancesDrawer,
                        icon: const Icon(Icons.kitchen),
                        label: const Text('Kitchen Appliances'),
                      ),
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16.0),
              child: SizedBox(
                width: double.infinity,
                child: ElevatedButton.icon(
                  onPressed: _generateRecipes,
                  icon: const Icon(Icons.restaurant_menu),
                  label: const Text('Generate Recipes'),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Theme.of(context).primaryColor,
                    foregroundColor: Colors.white,
                    padding: const EdgeInsets.symmetric(vertical: 16.0),
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
