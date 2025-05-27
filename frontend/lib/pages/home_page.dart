import 'package:flutter/material.dart';
import 'package:nibbles/service/cuisine/cuisine_dto.dart';
import 'package:nibbles/service/cuisine/cuisine_service.dart';
import 'package:nibbles/service/profile/restaurant_dto.dart';
import 'package:nibbles/service/restaurant/restaurant_service.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  List<RestaurantDto> _restaurants = [];
  bool _isLoading = false;
  List<CuisineDto> _availableCuisines = [];
  CuisineDto? _selectedCuisine;
  int _minimumRating = 1;

  @override
  void initState() {
    super.initState();
    _fetchRestaurants();
    _fetchCuisines();
  }

    Future<void> _fetchCuisines() async {
    try {
      final cuisines = await CuisineService().getAllCuisines();
      setState(() {
        _availableCuisines = cuisines;
      });
    } catch (e) {
      debugPrint('Error fetching cuisines: $e');
    }
  }


  Future<void> _fetchRestaurants() async {
    setState(() => _isLoading = true);
    try {
      final allRestaurants = _selectedCuisine != null
        ? await RestaurantService().getRestaurantsByCuisine(
          cuisineId: _selectedCuisine!.id,
            orderBy: 'rating',
          )
        : await RestaurantService().getAllRestaurants(orderBy: 'rating');

      final filteredRestaurants = allRestaurants
        .where((restaurant) => restaurant.rating != null && restaurant.rating! >= _minimumRating)
        .toList();
      
      setState(() {
        _restaurants = filteredRestaurants;
        _isLoading = false;
      });
    } catch (e) {
      debugPrint('Error fetching restaurants: $e');
      setState(() => _isLoading = false);
    }
  }

    void _showFilterDialog() {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return StatefulBuilder(
          builder: (context, setState) {
            return AlertDialog(
              title: const Text('Filter Restaurants'),
              content: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  ListTile(
                    leading: const Icon(Icons.star),
                    title: const Text('Min Rating'),
                    subtitle: DropdownButton<int>(
                      value: _minimumRating,
                      isExpanded: true,
                      items:
                          List.generate(5, (index) => index + 1)
                              .map(
                                (rating) => DropdownMenuItem(
                                  value: rating,
                                  child: Row(
                                    children: [
                                      Text('$rating'),
                                      const Icon(Icons.star),
                                    ],
                                  ),
                                ),
                              )
                              .toList(),
                      onChanged: (value) {
                        setState(() {
                          _minimumRating = value!;
                        });
                      },
                    ),
                  ),
                  ListTile(
                    leading: const Icon(Icons.restaurant_menu),
                    title: const Text('Cuisine'),
                    subtitle: DropdownButton<CuisineDto?>(
                      value: _selectedCuisine,
                      isExpanded: true,
                      items: [
                        const DropdownMenuItem<CuisineDto?>(
                          value: null,
                          child: Text('All'),
                        ),
                        ..._availableCuisines.map((cuisine) => DropdownMenuItem(
                              value: cuisine,
                              child: Text(cuisine.name),
                            )),
                      ],
                      onChanged: (value) {
                        setState(() => _selectedCuisine = value);
                      },
                    ),
                  ),
                ],
              ),
              actions: [
                TextButton(
                  onPressed: () => Navigator.pop(context),
                  child: const Text('Cancel'),
                ),
                TextButton(
                  onPressed: () {
                    Navigator.pop(context);
                    _fetchRestaurants();
                  },
                  child: const Text('Apply'),
                ),
              ],
            );
          },
        );
      },
    );
  }

  // assuming RestaurantDto has priceLevel or similar, otherwise adapt
  String formatPriceLevel(int? level) {
    if (level == null) {
      return 'Price: ?';
    }
    return 'Price: ${'\$' * level}';
  }

    Widget _buildActiveFiltersChip() {
    List<String> activeFilters = [];

    if (_selectedCuisine != null) {
      activeFilters.add(_selectedCuisine!.name);
    }

    if (_minimumRating > 1) {
      activeFilters.add('$_minimumRating+ ⭐');
    }

    if (activeFilters.isEmpty) return const SizedBox.shrink();

    return Positioned(
      top: 0,
      right: 0,
      child: Chip(
        label: Text(activeFilters.join(' • ')),
        deleteIcon: const Icon(Icons.close, size: 18),
        onDeleted: () {
          setState(() {
            _selectedCuisine = null;
            _minimumRating = 1;
          });
          _fetchRestaurants();
        },
        backgroundColor: Colors.blue.shade100,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Nearby Restaurants'),
        automaticallyImplyLeading: false, // Hide back button
        actions: [
          IconButton(
            icon: const Icon(Icons.filter_alt_rounded),
            onPressed: _showFilterDialog,
          ),
        ],
      ),
      body: Stack(
        children: [
          Padding(
            padding: const EdgeInsets.all(8.0),
              child: _isLoading
                ? const Center(child: CircularProgressIndicator())
                : _restaurants.isEmpty
                  ? const Center(child: Text('No restaurants found.'))
                  : GridView.builder(
                  itemCount: _restaurants.length,
                  gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                    crossAxisCount: 2,
                    mainAxisSpacing: 4,
                    crossAxisSpacing: 4,
                    childAspectRatio: 3 / 2,
                  ),
                  itemBuilder: (context, index) {
                    final restaurant = _restaurants[index];
                    return Card(
                      child: Padding(
                        padding: const EdgeInsets.all(12.0),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              restaurant.name,
                              style: theme.textTheme.titleSmall?.copyWith(
                                color: colorScheme.primary,
                              ),
                              maxLines: 1,
                              overflow: TextOverflow.ellipsis,
                            ),
                            const SizedBox(height: 4),
                            Row(
                              children: [
                                Icon(
                                  Icons.star,
                                  color: colorScheme.secondary,
                                  size: 18,
                                ),
                                const SizedBox(width: 4),
                                Text(
                                  restaurant.rating?.toStringAsFixed(1) ?? '',
                                  style: const TextStyle(
                                    fontWeight: FontWeight.w500,
                                  ),
                                ),
                              ],
                            ),
                            const SizedBox(height: 4),
                            Text(formatPriceLevel(restaurant.priceLevel)),
                                ],
                              ),
                            ),
                          );
                        },
                      ),
          ),
          _buildActiveFiltersChip(),
        ],
      ),
    );
  }
}
