import 'package:flutter/material.dart';
import 'package:nibbles/service/cuisine/cuisine_service.dart';
import 'package:nibbles/service/profile/restaurant_dto.dart';
import 'package:nibbles/service/restaurant/restaurant_service.dart';
import './restaurant_filter_widget.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> with RestaurantFilterMixin {
  List<RestaurantDto> _restaurants = [];
  bool _isLoading = false;

  @override
  void initState() {
    super.initState();
    _fetchRestaurants();
    _fetchCuisines();
  }

  Future<void> _fetchCuisines() async {
    try {
      final cuisines = await CuisineService().getAllCuisines();
      setAvailableCuisines(cuisines); // Use mixin method
    } catch (e) {
      debugPrint('Error fetching cuisines: $e');
    }
  }

  Future<void> _fetchRestaurants() async {
    setState(() => _isLoading = true);
    try {
      final allRestaurants = currentFilter.selectedCuisine != null
          ? await RestaurantService().getRestaurantsByCuisine(
              cuisineId: currentFilter.selectedCuisine!.id,
              orderBy: 'rating',
            )
          : await RestaurantService().getAllRestaurants(orderBy: 'rating');

      final filteredRestaurants = applyRatingFilter(allRestaurants); // Use mixin method

      setState(() {
        _restaurants = filteredRestaurants;
        _isLoading = false;
      });
    } catch (e) {
      debugPrint('Error fetching restaurants: $e');
      setState(() => _isLoading = false);
    }
  }

  @override
  void onFilterChanged(RestaurantFilterData filter) {
    // Called when filters are applied
    _fetchRestaurants();
  }

  // Remove the old formatPriceLevel method - assuming it exists in RestaurantDto or create as extension
  String formatPriceLevel(int? level) {
    if (level == null) {
      return 'Price: ?';
    }
    return 'Price: ${'\$' * level}';
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Nearby Restaurants'),
        automaticallyImplyLeading: false,
        actions: [
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
            onPressed: () => showFilterDialog(context), // Use mixin method
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
          // Use the new filter chip widget
          Positioned(
            top: 0,
            right: 0,
            child: RestaurantFilterChip(
              filter: currentFilter,
              onClear: clearFilters, // Use mixin method
              showForMap: false, // List view style
            ),
          ),
        ],
      ),
    );
  }
}