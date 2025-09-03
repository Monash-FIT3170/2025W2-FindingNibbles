import 'package:flutter/material.dart';
import 'package:nibbles/pages/menu_scanner/menu_scanner_page.dart';
import 'package:nibbles/service/cuisine/cuisine_dto.dart';
import 'package:nibbles/service/cuisine/cuisine_service.dart';
import 'package:nibbles/service/profile/profile_service.dart';
import 'package:nibbles/service/profile/restaurant_dto.dart';
import 'package:nibbles/service/restaurant/restaurant_service.dart';
import 'package:nibbles/theme/app_theme.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  final ProfileService _profileService = ProfileService();
  List<RestaurantDto> _restaurants = [];
  bool _isLoading = false;
  List<CuisineDto> _availableCuisines = [];
  List<CuisineDto> _favoriteCuisines = []; // track liked cuisines
  CuisineDto? _selectedCuisine;
  int _minimumRating = 1;

  @override
  void initState() {
    super.initState();
    _fetchRestaurants();
    _fetchCuisines();
    _loadFavouriteCuisines(); // load favourite cuisines
  }

  Future<void> _loadFavouriteCuisines() async {
    try {
      final favourites = await _profileService.getUserCuisines();
      setState(() {
        _favoriteCuisines = favourites;
      });
    } catch (e) {
      debugPrint("Failed to load favourite cuisines: $e");
    }
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
              )
              : await RestaurantService().getAllRestaurants(orderBy: 'rating');

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
                      onChanged: (value) async {
                        setState(() => _selectedCuisine = value);
                        if (value != null) {
                          // ✅ check if already liked dynamically
                          await _loadFavouriteCuisines();
                          final alreadyLiked = _favoriteCuisines.any(
                            (c) => c.id == value.id,
                          );

                          if (!alreadyLiked) {
                            final shouldAdd = await showDialog<bool>(
                              context: context,
                              builder:
                                  (ctx) => AlertDialog(
                                    title: Text("Add to favourites?"),
                                    content: Text(
                                      "Do you want to add ${value.name} to your liked cuisines?",
                                    ),
                                    actions: [
                                      TextButton(
                                        onPressed:
                                            () => Navigator.pop(ctx, false),
                                        child: const Text("No"),
                                      ),
                                      TextButton(
                                        onPressed:
                                            () => Navigator.pop(ctx, true),
                                        child: const Text("Yes"),
                                      ),
                                    ],
                                  ),
                            );

                            if (shouldAdd == true) {
                              try {
                                await _profileService.addCuisinePreference(
                                  value.id,
                                );
                                setState(() {
                                  _favoriteCuisines.add(value);
                                });
                                ScaffoldMessenger.of(context).showSnackBar(
                                  SnackBar(
                                    content: Text(
                                      "${value.name} added to favourites",
                                    ),
                                  ),
                                );
                              } catch (e) {
                                debugPrint("Failed to add ${value.name}: $e");
                                ScaffoldMessenger.of(context).showSnackBar(
                                  SnackBar(
                                    content: Text(
                                      "Could not add ${value.name}",
                                    ),
                                  ),
                                );
                              }
                            }
                          }
                        }
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
                  onPressed: () async {
                    Navigator.pop(context);
                    await _fetchRestaurants();
                    await _loadFavouriteCuisines(); // ✅ refresh favourites after search
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
        backgroundColor: AppTheme.colorScheme.primary,
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
                            mainAxisSpacing: 8,
                            crossAxisSpacing: 8,
                            childAspectRatio: 1,
                          ),
                      itemBuilder: (context, index) {
                        final restaurant = _restaurants[index];
                        return Card(
                          child: InkWell(
                            onTap: () {
                              showDialog(
                                context: context,
                                builder:
                                    (context) => AlertDialog(
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
                                        crossAxisAlignment:
                                            CrossAxisAlignment.start,
                                        children: [
                                          RichText(
                                            text: TextSpan(
                                              style:
                                                  DefaultTextStyle.of(
                                                    context,
                                                  ).style,
                                              children: [
                                                const TextSpan(
                                                  text: 'Rating: ',
                                                  style: TextStyle(
                                                    fontWeight: FontWeight.bold,
                                                  ),
                                                ),
                                                TextSpan(
                                                  text:
                                                      restaurant.rating
                                                          .toString(),
                                                ),
                                              ],
                                            ),
                                          ),
                                          const SizedBox(height: 8),
                                          RichText(
                                            text: TextSpan(
                                              style:
                                                  DefaultTextStyle.of(
                                                    context,
                                                  ).style,
                                              children: [
                                                const TextSpan(
                                                  text: 'Total reviews: ',
                                                  style: TextStyle(
                                                    fontWeight: FontWeight.bold,
                                                  ),
                                                ),
                                                TextSpan(
                                                  text:
                                                      restaurant
                                                          .userRatingsTotal
                                                          .toString(),
                                                ),
                                              ],
                                            ),
                                          ),
                                          const SizedBox(height: 8),
                                          RichText(
                                            text: TextSpan(
                                              style:
                                                  DefaultTextStyle.of(
                                                    context,
                                                  ).style,
                                              children: [
                                                const TextSpan(
                                                  text: 'PH: ',
                                                  style: TextStyle(
                                                    fontWeight: FontWeight.bold,
                                                  ),
                                                ),
                                                TextSpan(
                                                  text:
                                                      restaurant
                                                          .formattedPhoneNum ??
                                                      'Not available',
                                                ),
                                              ],
                                            ),
                                          ),
                                          const SizedBox(height: 8),
                                          RichText(
                                            text: TextSpan(
                                              style:
                                                  DefaultTextStyle.of(
                                                    context,
                                                  ).style,
                                              children: [
                                                const TextSpan(
                                                  text: 'Address: ',
                                                  style: TextStyle(
                                                    fontWeight: FontWeight.bold,
                                                  ),
                                                ),
                                                TextSpan(
                                                  text: restaurant.address,
                                                ),
                                              ],
                                            ),
                                          ),
                                        ],
                                      ),
                                      actions: [
                                        TextButton(
                                          onPressed:
                                              () => Navigator.pop(context),
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
                                          style: theme.textTheme.titleSmall
                                              ?.copyWith(
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
                                              builder:
                                                  (context) => MenuScannerPage(
                                                    restaurantId: restaurant.id,
                                                    restaurantName:
                                                        restaurant.name,
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
