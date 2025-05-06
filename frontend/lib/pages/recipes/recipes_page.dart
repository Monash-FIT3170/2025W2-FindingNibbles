import 'package:flutter/material.dart';
import 'package:dio/dio.dart';
import 'package:nibbles/core/logger.dart';

enum RecipeDifficulty { easy, medium, hard, any }

// Model class for kitchen appliances
class Appliance {
  final int id;
  final String name;
  bool isSelected;

  Appliance({required this.id, required this.name, this.isSelected = false});
}

class RecipesPage extends StatefulWidget {
  const RecipesPage({super.key});

  @override
  State<RecipesPage> createState() => _RecipesPageState();
}

class _RecipesPageState extends State<RecipesPage> {
  final dio = Dio();
  final _logger = getLogger();
  final List<String> ingredients = [];
  final List<int> appliances = [];
  final TextEditingController _ingredientInputController =
      TextEditingController();
  final TextEditingController _applianceInputController =
      TextEditingController();
  bool useDietaries = false;
  bool includeAllIngredients = false;
  RecipeDifficulty selectedDifficulty = RecipeDifficulty.any;
  List<Appliance> availableAppliances = [];
  bool isLoadingAppliances = false;

  @override
  void initState() {
    super.initState();
    _fetchAppliances();
  }

  // Fetch available appliances from the backend
  Future<void> _fetchAppliances() async {
    setState(() {
      isLoadingAppliances = true;
    });

    try {
      // Fetch user's appliances from the backend
      final response = await dio.get('/user/appliance');
      if (response.statusCode == 200) {
        List<dynamic> appliancesData = response.data as List<dynamic>;
        setState(() {
          availableAppliances =
              appliancesData.map((item) {
                return Appliance(
                  id: item['id'],
                  name: item['name'],
                  isSelected: appliances.contains(item['id']),
                );
              }).toList();
        });
      }
    } catch (e) {
      _logger.e('Failed to fetch appliances: ${e.toString()}');
      // Show a snackbar with the error
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Failed to load appliances: ${e.toString()}'),
            backgroundColor: Colors.red,
          ),
        );
      }
    } finally {
      if (mounted) {
        setState(() {
          isLoadingAppliances = false;
        });
      }
    }
  }

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

  // Toggle appliance selection and update the appliances list
  void _toggleAppliance(Appliance appliance, StateSetter setDrawerState) {
    setDrawerState(() {
      appliance.isSelected = !appliance.isSelected;

      // Update the appliances list based on selection
      if (appliance.isSelected) {
        if (!appliances.contains(appliance.id)) {
          appliances.add(appliance.id);
        }
      } else {
        appliances.remove(appliance.id);
      }
    });
  }

  void _addAppliance(int appliance) {
    setState(() {
      appliances.add(appliance);
      _applianceInputController.clear();
    });
  }

  void _removeAppliance(int appliance) {
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
              initialChildSize: 0.8,
              minChildSize: 0.5,
              maxChildSize: 0.95,
              builder: (context, scrollController) {
                return Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text(
                            'Kitchen Appliances',
                            style: Theme.of(context).textTheme.headlineSmall,
                          ),
                          TextButton.icon(
                            onPressed: () {
                              Navigator.pop(context);
                            },
                            icon: const Icon(Icons.check),
                            label: const Text('Done'),
                          ),
                        ],
                      ),
                      const SizedBox(height: 8),
                      const Text(
                        'Select appliances available in your kitchen:',
                        style: TextStyle(fontSize: 16),
                      ),
                      const SizedBox(height: 16),
                      if (isLoadingAppliances)
                        const Center(child: CircularProgressIndicator())
                      else if (availableAppliances.isEmpty)
                        const Center(
                          child: Text(
                            'No appliances found. Please try again later.',
                          ),
                        )
                      else
                        Expanded(
                          child: ListView.builder(
                            controller: scrollController,
                            itemCount: availableAppliances.length,
                            itemBuilder: (context, index) {
                              final appliance = availableAppliances[index];
                              return CheckboxListTile(
                                title: Text(appliance.name),
                                value: appliance.isSelected,
                                onChanged: (bool? value) {
                                  _toggleAppliance(appliance, setDrawerState);
                                },
                              );
                            },
                          ),
                        ),
                      const SizedBox(height: 16),
                      SizedBox(
                        width: double.infinity,
                        child: ElevatedButton(
                          onPressed: () {
                            _fetchAppliances();
                            Navigator.pop(context);
                          },
                          child: const Text('Save Selection'),
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
        'recipe',
        data: {
          'ingredients': ingredients,
          'useDietaries': useDietaries,
          'kitchenAppliances': appliances,
          'includeAllIngredients': includeAllIngredients,
          'difficultyLevel': selectedDifficulty.name,
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
                    value: useDietaries,
                    onChanged: (bool value) {
                      setState(() {
                        useDietaries = value;
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
                  if (appliances.isNotEmpty)
                    Padding(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 16.0,
                        vertical: 8.0,
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Selected Appliances:',
                            style: TextStyle(
                              fontWeight: FontWeight.bold,
                              fontSize: 14,
                            ),
                          ),
                          const SizedBox(height: 8),
                          Wrap(
                            spacing: 8.0,
                            runSpacing: 4.0,
                            children:
                                availableAppliances
                                    .where((a) => appliances.contains(a.id))
                                    .map(
                                      (appliance) => Chip(
                                        label: Text(appliance.name),
                                        deleteIcon: const Icon(
                                          Icons.clear,
                                          size: 16,
                                        ),
                                        onDeleted: () {
                                          setState(() {
                                            _removeAppliance(appliance.id);
                                            appliance.isSelected = false;
                                          });
                                        },
                                      ),
                                    )
                                    .toList(),
                          ),
                        ],
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
