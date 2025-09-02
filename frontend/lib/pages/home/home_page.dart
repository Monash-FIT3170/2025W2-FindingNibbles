import 'package:flutter/material.dart';
import 'package:nibbles/pages/menu_scanner/menu_scanner_page.dart';
import 'package:nibbles/service/cuisine/cuisine_dto.dart';
import 'package:nibbles/service/cuisine/cuisine_service.dart';
import 'package:nibbles/service/profile/restaurant_dto.dart';
import 'package:nibbles/service/restaurant/restaurant_service.dart';
import 'package:nibbles/pages/recipes/widgets/dice_widget.dart';
import 'package:nibbles/theme/app_theme.dart';
import 'dart:math';

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
  final Random _random = Random();

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
      final allRestaurants =
          _selectedCuisine != null
              ? await RestaurantService().getRestaurantsByCuisine(
                cuisineId: _selectedCuisine!.id,
                orderBy: 'rating',
                take: 20,
              )
              : await RestaurantService().getAllRestaurants(
                orderBy: 'rating',
                take: 20,
              );

      final filteredRestaurants =
          allRestaurants
              .where(
                (restaurant) =>
                    restaurant.rating != null &&
                    restaurant.rating! >= _minimumRating,
              )
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

  void _handleDiceRoll() {
    if (_availableCuisines.isEmpty) return;

    _showDiceSelectionDialog();
  }

  void _showDiceSelectionDialog() {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Row(
            children: [
              Icon(Icons.casino, color: Theme.of(context).colorScheme.primary),
              const SizedBox(width: 8),
              const Text('Random Cuisine'),
            ],
          ),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              ListTile(
                leading: const Icon(Icons.favorite),
                title: const Text('Preferred Cuisines'),
                subtitle: const Text('Random from your favorites'),
                onTap: () {
                  Navigator.pop(context);
                  _selectRandomPreferredCuisine();
                },
              ),
              ListTile(
                leading: const Icon(Icons.restaurant_menu),
                title: const Text('All Cuisines'),
                subtitle: const Text('Random from all available'),
                onTap: () {
                  Navigator.pop(context);
                  _selectRandomAllCuisine();
                },
              ),
              ListTile(
                leading: const Icon(Icons.restaurant),
                title: const Text('Random Restaurant'),
                subtitle: Text(
                  _selectedCuisine != null
                      ? 'Random from ${_selectedCuisine!.name} restaurants'
                      : 'Random from all restaurants',
                ),
                onTap: () {
                  Navigator.pop(context);
                  _selectRandomRestaurant();
                },
              ),
            ],
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(context),
              child: const Text('Cancel'),
            ),
          ],
        );
      },
    );
  }

  void _selectRandomPreferredCuisine() async {
    try {
      // Get user's preferred cuisines
      final userPreferences = await _getUserCuisinePreferences();

      if (!mounted) return;

      if (userPreferences.isEmpty) {
        _showNoPreferredCuisinesDialog();
        return;
      }

      // Filter available cuisines to only preferred ones
      final preferredCuisines =
          _availableCuisines
              .where((cuisine) => userPreferences.contains(cuisine.id))
              .toList();

      if (preferredCuisines.isEmpty) {
        _showNoPreferredCuisinesDialog();
        return;
      }

      // Randomly select from preferred cuisines
      final randomCuisine =
          preferredCuisines[_random.nextInt(preferredCuisines.length)];

      setState(() {
        _selectedCuisine = randomCuisine;
      });

      // Show result modal
      _showDiceResultModal(
        title: 'Random Preferred Cuisine!',
        subtitle: randomCuisine.name,
        icon: Icons.favorite,
      );

      // Fetch restaurants for the selected cuisine
      _fetchRestaurants();
    } catch (e) {
      debugPrint('Error selecting random preferred cuisine: $e');
      if (mounted) {
        _showErrorDialog('Failed to load preferred cuisines');
      }
    }
  }

  void _selectRandomAllCuisine() {
    // Randomly select a cuisine from all available
    final randomCuisine =
        _availableCuisines[_random.nextInt(_availableCuisines.length)];

    setState(() {
      _selectedCuisine = randomCuisine;
    });

    // Show result modal
    _showDiceResultModal(
      title: 'Random Cuisine Selected!',
      subtitle: randomCuisine.name,
      icon: Icons.restaurant_menu,
    );

    // Fetch restaurants for the selected cuisine
    _fetchRestaurants();
  }

  void _selectRandomRestaurant() async {
    try {
      setState(() => _isLoading = true);

      // Get restaurants based on current cuisine filter
      final allRestaurants =
          _selectedCuisine != null
              ? await RestaurantService().getRestaurantsByCuisine(
                cuisineId: _selectedCuisine!.id,
                orderBy: 'rating',
              )
              : await RestaurantService().getAllRestaurants(orderBy: 'rating');

      if (!mounted) return;

      // Apply rating filter
      final filteredRestaurants =
          allRestaurants
              .where(
                (restaurant) =>
                    restaurant.rating != null &&
                    restaurant.rating! >= _minimumRating,
              )
              .toList();

      if (filteredRestaurants.isEmpty) {
        setState(() => _isLoading = false);
        final cuisineText =
            _selectedCuisine != null
                ? ' for ${_selectedCuisine!.name} cuisine'
                : '';
        _showErrorDialog(
          'No restaurants found matching your criteria$cuisineText',
        );
        return;
      }

      // Randomly select a restaurant
      final randomRestaurant =
          filteredRestaurants[_random.nextInt(filteredRestaurants.length)];

      // Update the restaurants list with the filtered results
      setState(() {
        _restaurants = filteredRestaurants;
        _isLoading = false;
      });

      // Create subtitle with cuisine info if filtered
      final cuisineInfo =
          _selectedCuisine != null
              ? '\nCuisine: ${_selectedCuisine!.name}'
              : '';

      // Show result modal with restaurant details
      _showDiceResultModal(
        title: 'Random Restaurant Selected!',
        subtitle:
            '${randomRestaurant.name}\n${randomRestaurant.rating?.toStringAsFixed(1) ?? "No rating"} ⭐$cuisineInfo',
        icon: Icons.restaurant,
        highlightedRestaurant: randomRestaurant,
      );
    } catch (e) {
      setState(() => _isLoading = false);
      debugPrint('Error selecting random restaurant: $e');
      if (mounted) {
        _showErrorDialog('Failed to load restaurants');
      }
    }
  }

  // Implementation using your ProfileService
  Future<List<int>> _getUserCuisinePreferences() async {
    try {
      // TO BE IMPLEMENTED AFTER JACK HAS FINISHED CUISINES
      throw UnimplementedError('User cuisine preferences not implemented yet');
    } catch (e) {
      debugPrint('Error fetching user cuisine preferences: $e');
      return [];
    }
  }

  void _showNoPreferredCuisinesDialog() {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('No Preferred Cuisines'),
          content: const Text(
            'You haven\'t selected any preferred cuisines yet. '
            'Go to your profile to set your cuisine preferences, '
            'or select "All Cuisines" for a random choice from all available options.',
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(context),
              child: const Text('OK'),
            ),
          ],
        );
      },
    );
  }

  void _showErrorDialog(String message) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('Error'),
          content: Text(message),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(context),
              child: const Text('OK'),
            ),
          ],
        );
      },
    );
  }

  void _showDiceResultModal({
    required String title,
    required String subtitle,
    required IconData icon,
    RestaurantDto? highlightedRestaurant,
  }) {
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (BuildContext context) {
        return DiceResultModal(
          title: title,
          subtitle: subtitle,
          icon: icon,
          onClose: () {
            Navigator.of(context).pop();
            // If we have a highlighted restaurant, scroll to it after modal closes
            if (highlightedRestaurant != null) {
              _highlightRestaurant(highlightedRestaurant);
            }
          },
        );
      },
    );
  }

  void _highlightRestaurant(RestaurantDto targetRestaurant) {
    // Add a brief delay to let the modal close animation complete
    Future.delayed(const Duration(milliseconds: 500), () {
      if (!mounted) return;

      // Find the index of the target restaurant in the current list
      final index = _restaurants.indexWhere((r) => r.id == targetRestaurant.id);

      if (index != -1) {
        // Show a brief highlight effect using SnackBar
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(
              '🎯 Found your random pick: ${targetRestaurant.name}',
            ),
            duration: const Duration(seconds: 3),
            backgroundColor: Theme.of(context).colorScheme.primary,
            behavior: SnackBarBehavior.floating,
          ),
        );
      }
    });
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
                        ..._availableCuisines.map(
                          (cuisine) => DropdownMenuItem(
                            value: cuisine,
                            child: Text(cuisine.name),
                          ),
                        ),
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

    final colorScheme = Theme.of(context).colorScheme;
    final textTheme = Theme.of(context).textTheme;

    return Positioned(
      top: 16,
      right: 16,
      child: Chip(
        label: Text(
          activeFilters.join(' • '),
          style: textTheme.labelMedium?.copyWith(color: colorScheme.onPrimary),
        ),
        deleteIcon: Icon(Icons.close, size: 18, color: colorScheme.onPrimary),
        onDeleted: () {
          setState(() {
            _selectedCuisine = null;
            _minimumRating = 1;
          });
          _fetchRestaurants();
        },
        backgroundColor: colorScheme.primary,
        elevation: 2,
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
          DiceRollWidget(
            onPressed: _handleDiceRoll,
            isEnabled: !_isLoading && _availableCuisines.isNotEmpty,
          ),
          IconButton(
            icon: const Icon(Icons.qr_code_scanner),
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => const MenuScannerPage(),
                ),
              );
            },
            tooltip: 'Scan Menu',
          ),
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
            child:
                _isLoading
                    ? const Center(child: CircularProgressIndicator())
                    : _restaurants.isEmpty
                    ? const Center(child: Text('No restaurants found.'))
                    : GridView.builder(
                      itemCount: _restaurants.length,
                      gridDelegate:
                          const SliverGridDelegateWithFixedCrossAxisCount(
                            crossAxisCount: 2,
                            mainAxisSpacing: 4,
                            crossAxisSpacing: 4,
                            childAspectRatio: 3 / 2,
                          ),
                      itemBuilder: (context, index) {
                        final restaurant = _restaurants[index];
                        return Card(
                          child: InkWell(
                            onTap: () {
                              showDialog(
                                context: context,
                                builder: (context) => AlertDialog(
                                  title: Text(
                                    restaurant.name,
                                    style: TextStyle(
                                      fontSize: 18,
                                      fontWeight: FontWeight.bold,
                                      color: colorScheme.onSurface,
                                    ),
                                  ),
                                  content: Column(
                                    mainAxisSize: MainAxisSize.min,
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      RichText(
                                        text: TextSpan(
                                          style: DefaultTextStyle.of(context).style,
                                          children: [
                                            const TextSpan(
                                              text: 'Rating: ',
                                              style: TextStyle(fontWeight: FontWeight.bold),
                                            ),
                                            TextSpan(
                                              text: '${restaurant.rating}',
                                            ),
                                          ],
                                        ),
                                      ),
                                      const SizedBox(height: 8),
                                      RichText(
                                        text: TextSpan(
                                          style: DefaultTextStyle.of(context).style,
                                          children: [
                                            const TextSpan(
                                              text: 'Total reviews: ',
                                              style: TextStyle(fontWeight: FontWeight.bold),
                                            ),
                                            TextSpan(
                                              text: '${restaurant.userRatingsTotal}',
                                            ),
                                          ],
                                        ),
                                      ),
                                      const SizedBox(height: 8),
                                      RichText(
                                        text: TextSpan(
                                          style: DefaultTextStyle.of(context).style,
                                          children: [
                                            const TextSpan(
                                              text: 'PH: ',
                                              style: TextStyle(fontWeight: FontWeight.bold),
                                            ),
                                            TextSpan(
                                              text: '${restaurant.formattedPhoneNum ?? 'Not available'}',
                                            ),
                                          ],
                                        ),
                                      ),
                                      const SizedBox(height: 8),
                                      RichText(
                                        text: TextSpan(
                                          style: DefaultTextStyle.of(context).style,
                                          children: [
                                            const TextSpan(
                                              text: 'Address: ',
                                              style: TextStyle(fontWeight: FontWeight.bold),
                                            ),
                                            TextSpan(
                                              text: '${restaurant.address}',
                                            ),
                                          ],
                                        ),
                                      ),
                                    ],
                                  ),
                                  actions: [
                                    TextButton(
                                      onPressed: () => Navigator.pop(context),
                                      child: const Text('Close'),
                                    ),
                                  ],
                                ),
                              );
                            },
                            child: Padding(
                              padding: const EdgeInsets.all(12.0),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Row(
                                    children: [
                                      Expanded(
                                        child: Text(
                                          restaurant.name,
                                          style: theme.textTheme.titleSmall?.copyWith(
                                            color: colorScheme.primary,
                                          ),
                                          maxLines: 1,
                                          overflow: TextOverflow.ellipsis,
                                        ),
                                      ),
                                      IconButton(
                                        icon: const Icon(Icons.qr_code_scanner),
                                        iconSize: 20,
                                        padding: EdgeInsets.zero,
                                        constraints: const BoxConstraints(),
                                        onPressed: () {
                                          Navigator.push(
                                            context,
                                            MaterialPageRoute(
                                              builder: (context) => MenuScannerPage(
                                                restaurantId: restaurant.id,
                                                restaurantName: restaurant.name,
                                              ),
                                            ),
                                          );
                                        },
                                      ),
                                    ],
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
                                        restaurant.rating?.toStringAsFixed(1) ??
                                            '',
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