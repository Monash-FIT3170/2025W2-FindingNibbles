import 'dart:math';

import 'package:flutter/material.dart';
import 'package:nibbles/pages/home/restaurant_details_page.dart';
import 'package:nibbles/pages/menu_scanner/menu_scanner_page.dart';
import 'package:nibbles/pages/recipes/widgets/dice_widget.dart';
import 'package:nibbles/pages/shared/widgets/cuisine_selection_dialog.dart';
import 'package:nibbles/pages/shared/widgets/restaurant_filter_dialog.dart';
import 'package:nibbles/service/cuisine/cuisine_dto.dart';
import 'package:nibbles/service/cuisine/cuisine_service.dart';
import 'package:nibbles/service/profile/profile_service.dart';
import 'package:nibbles/service/profile/restaurant_dto.dart';
import 'package:nibbles/service/restaurant-menu/best_dish_dto.dart';
import 'package:nibbles/service/restaurant-menu/restaurant_menu_service.dart';
import 'package:nibbles/service/restaurant/restaurant_service.dart';
import 'package:nibbles/theme/app_theme.dart';
import 'package:nibbles/widgets/search_decoration.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  final ProfileService _profileService = ProfileService();
  final RestaurantMenuService _restaurantMenuService = RestaurantMenuService();
  final Random _random = Random();
  final ScrollController _scrollController = ScrollController();
  List<RestaurantDto> _restaurants = [];
  bool _isLoading = false;
  bool _isLoadingMore = false;
  bool _hasMoreData = true;
  int _currentPage = 0;
  static const int _pageSize = 20;
  List<CuisineDto> _availableCuisines = [];
  List<CuisineDto> _favoriteCuisines = []; // track liked cuisines
  List<int> _favoriteRestaurantIds = [];
  CuisineDto? _selectedCuisine;
  int _minimumRating = 1;
  final TextEditingController _searchController = TextEditingController();
  String _searchQuery = '';
  bool _isSearchMode = false;

  @override
  void initState() {
    super.initState();
    _fetchRestaurants();
    _fetchCuisines();
    _loadFavouriteCuisines(); // load favourite cuisines
    _loadFavoriteRestaurants();
    _setupScrollListener();
  }

  @override
  void dispose() {
    _searchController.dispose();
    _scrollController.dispose();
    super.dispose();
  }

  void _setupScrollListener() {
    _scrollController.addListener(() {
      if (_scrollController.position.pixels >=
          _scrollController.position.maxScrollExtent - 200) {
        _loadMoreRestaurants();
      }
    });
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

  Future<void> _loadFavoriteRestaurants() async {
    try {
      final favoriteRestaurants =
          await _profileService.getFavouriteRestaurants();
      setState(() {
        _favoriteRestaurantIds =
            favoriteRestaurants.map((restaurant) => restaurant.id).toList();
      });
    } catch (e) {
      debugPrint("Failed to load favorite restaurants: $e");
    }
  }

  Future<void> _toggleFavoriteRestaurant(int restaurantId) async {
    final wasAlreadyFavorite = _favoriteRestaurantIds.contains(restaurantId);

    // Optimistic update - update UI immediately
    setState(() {
      if (wasAlreadyFavorite) {
        _favoriteRestaurantIds.remove(restaurantId);
      } else {
        _favoriteRestaurantIds.add(restaurantId);
      }
    });

    try {
      if (wasAlreadyFavorite) {
        await _profileService.removeFavouriteRestaurant(restaurantId);
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(
              content: Text('Restaurant removed from favorites'),
              duration: Duration(seconds: 2),
            ),
          );
        }
      } else {
        await _profileService.addFavouriteRestaurant(restaurantId);
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(
              content: Text('Restaurant added to favorites'),
              duration: Duration(seconds: 2),
            ),
          );
        }
      }
    } catch (e) {
      // Revert the optimistic update on error
      setState(() {
        if (wasAlreadyFavorite) {
          _favoriteRestaurantIds.add(restaurantId);
        } else {
          _favoriteRestaurantIds.remove(restaurantId);
        }
      });

      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Failed to update favorites: $e'),
            backgroundColor: Theme.of(context).colorScheme.error,
            duration: const Duration(seconds: 3),
          ),
        );
      }
      debugPrint("Failed to toggle favorite restaurant: $e");
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

  Future<void> _fetchRestaurants({bool isLoadMore = false}) async {
    if (isLoadMore) {
      if (_isLoadingMore || !_hasMoreData) return;
      setState(() => _isLoadingMore = true);
    } else {
      setState(() {
        _isLoading = true;
        _currentPage = 0;
        _hasMoreData = true;
      });
    }

    try {
      List<RestaurantDto> newRestaurants;

      if (_isSearchMode && _searchQuery.isNotEmpty) {
        newRestaurants = await RestaurantService().searchRestaurantsByName(
          _searchQuery,
        );
        if (isLoadMore) {
          setState(() {
            _hasMoreData = false;
            _isLoadingMore = false;
          });
          return;
        }
      } else {
        final skip = isLoadMore ? _currentPage * _pageSize : 0;

        newRestaurants =
            _selectedCuisine != null
                ? await RestaurantService().getRestaurantsByCuisine(
                  cuisineId: _selectedCuisine!.id,
                  orderBy: 'rating',
                  skip: skip,
                  take: _pageSize,
                )
                : await RestaurantService().getAllRestaurants(
                  orderBy: 'rating',
                  skip: skip,
                  take: _pageSize,
                );
      }

      final filteredRestaurants =
          newRestaurants
              .where(
                (restaurant) =>
                    restaurant.rating != null &&
                    restaurant.rating! >= _minimumRating,
              )
              .toList();

      setState(() {
        if (isLoadMore) {
          // Get existing restaurant IDs to prevent duplicates
          final existingIds = _restaurants.map((r) => r.id).toSet();

          // Only add restaurants that aren't already in the list
          final uniqueRestaurants =
              filteredRestaurants
                  .where((restaurant) => !existingIds.contains(restaurant.id))
                  .toList();

          _restaurants.addAll(uniqueRestaurants);
          _currentPage++;
          _isLoadingMore = false;
          if (filteredRestaurants.length < _pageSize) {
            _hasMoreData = false;
          }
        } else {
          _restaurants = filteredRestaurants;
          _currentPage = 1;
          _isLoading = false;
          if (filteredRestaurants.length < _pageSize) {
            _hasMoreData = false;
          }
        }
      });
    } catch (e) {
      debugPrint('Error fetching restaurants: $e');
      setState(() {
        if (isLoadMore) {
          _isLoadingMore = false;
        } else {
          _isLoading = false;
        }
      });
    }
  }

  Future<void> _loadMoreRestaurants() async {
    await _fetchRestaurants(isLoadMore: true);
  }

  void _onSearchChanged(String query) {
    setState(() {
      _searchQuery = query.trim();
      _isSearchMode = _searchQuery.isNotEmpty;
    });

    Future.delayed(const Duration(milliseconds: 500), () {
      if (_searchQuery == query.trim()) {
        _fetchRestaurants();
      }
    });
  }

  void _clearSearch() {
    _searchController.clear();
    setState(() {
      _searchQuery = '';
      _isSearchMode = false;
    });
    _fetchRestaurants();
  }

  void _showFilterDialog() {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return RestaurantFilterDialog(
          initialMinimumRating: _minimumRating,
          initialSelectedCuisine: _selectedCuisine,
          availableCuisines: _availableCuisines,
          isSearchMode: _isSearchMode,
          searchQuery: _searchQuery,
          onApply: (minimumRating, selectedCuisine) async {
            setState(() {
              _selectedCuisine = selectedCuisine;
              _minimumRating = minimumRating;
            });

            await _fetchRestaurants();
            await _loadFavouriteCuisines();
          },
          showCuisineSelectionDialog: ({bool skipApplyLogic = false}) async {
            return await showDialog<CuisineDto>(
              context: context,
              builder: (BuildContext context) {
                return CuisineSelectionDialog(
                  availableCuisines: _availableCuisines,
                  favoriteCuisines: _favoriteCuisines,
                  allowSelectingFavorited: true,
                  skipApplyLogic: skipApplyLogic,
                  onCuisineSelected:
                      skipApplyLogic
                          ? null
                          : (cuisine) async {
                            await _loadFavouriteCuisines();
                            final alreadyLiked = _favoriteCuisines.any(
                              (c) => c.id == cuisine.id,
                            );

                            if (!alreadyLiked) {
                              if (!context.mounted) return;
                              final shouldAdd = await showDialog<bool>(
                                context: context,
                                builder:
                                    (ctx) => AlertDialog(
                                      title: const Text("Add to favourites?"),
                                      content: Text(
                                        "Do you want to add ${cuisine.name} to your liked cuisines?",
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
                                    cuisine.id,
                                  );
                                  setState(() {
                                    _favoriteCuisines.add(cuisine);
                                  });
                                  if (!context.mounted) return;
                                  ScaffoldMessenger.of(context).showSnackBar(
                                    SnackBar(
                                      content: Text(
                                        "${cuisine.name} added to favourites",
                                      ),
                                    ),
                                  );
                                } catch (e) {
                                  debugPrint(
                                    "Failed to add ${cuisine.name}: $e",
                                  );
                                  if (!context.mounted) return;
                                  ScaffoldMessenger.of(context).showSnackBar(
                                    SnackBar(
                                      content: Text(
                                        "Could not add ${cuisine.name}",
                                      ),
                                    ),
                                  );
                                }
                              }
                            }
                          },
                );
              },
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

    if (_isSearchMode && _searchQuery.isNotEmpty) {
      activeFilters.add('Search: "$_searchQuery"');
    }

    if (!_isSearchMode && _selectedCuisine != null) {
      activeFilters.add(_selectedCuisine!.name);
    }

    if (_minimumRating > 1) {
      activeFilters.add('$_minimumRating+ ⭐');
    }

    if (activeFilters.isEmpty) return const SizedBox.shrink();

    return Positioned(
      top: 16,
      right: 16,
      child: Chip(
        label: Text(
          activeFilters.join(' • '),
          style: TextStyle(color: AppTheme.colorScheme.onPrimary),
        ),
        deleteIcon: Icon(
          Icons.close,
          size: 18,
          color: AppTheme.colorScheme.onPrimary,
        ),
        onDeleted: () {
          if (_isSearchMode) {
            _clearSearch();
          } else {
            setState(() {
              _selectedCuisine = null;
              _minimumRating = 1;
            });
            _fetchRestaurants();
          }
        },
        backgroundColor: AppTheme.colorScheme.primary,
      ),
    );
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
      // Refresh preferred cuisines to get the latest
      await _loadFavouriteCuisines();

      if (!mounted) return;

      // Filter available cuisines to only preferred ones
      final preferredCuisines =
          _availableCuisines
              .where(
                (cuisine) =>
                    _favoriteCuisines.any((fav) => fav.id == cuisine.id),
              )
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
                take: 20,
              )
              : await RestaurantService().getAllRestaurants(
                orderBy: 'rating',
                take: 20,
              );

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
        _currentPage = 1;
        _hasMoreData = filteredRestaurants.length >= _pageSize;
      });

      // Create subtitle with cuisine info if filtered
      final cuisineInfo =
          _selectedCuisine != null
              ? '\nCuisine: ${_selectedCuisine!.name}'
              : '';

      // Show result modal with restaurant details and open it after closing
      _showDiceResultModal(
        title: 'Random Restaurant Selected!',
        subtitle:
            '${randomRestaurant.name}\n${randomRestaurant.rating?.toStringAsFixed(1) ?? "No rating"} ⭐$cuisineInfo',
        icon: Icons.restaurant,
        highlightedRestaurant: randomRestaurant,
        onCloseAction: () => _openRestaurantDetails(randomRestaurant),
      );
    } catch (e) {
      setState(() => _isLoading = false);
      debugPrint('Error selecting random restaurant: $e');
      if (mounted) {
        _showErrorDialog('Failed to load restaurants');
      }
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
    VoidCallback? onCloseAction,
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
            // Execute custom close action if provided
            if (onCloseAction != null) {
              onCloseAction();
            } else if (highlightedRestaurant != null) {
              // Default behavior: highlight the restaurant
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

  void _openRestaurantDetails(RestaurantDto restaurant) {
    // Navigate to the new Restaurant Details Page
    Navigator.push(
      context,
      MaterialPageRoute(
        builder:
            (context) => RestaurantDetailsPage(
              restaurant: restaurant,
              isFavorite: _favoriteRestaurantIds.contains(restaurant.id),
              selectedCuisineName: _selectedCuisine?.name,
            ),
      ),
    ).then((_) {
      // Refresh favorite status when returning from details page
      _loadFavoriteRestaurants();
    });
  }

  void _showBestDishModal(RestaurantDto restaurant) {
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Row(
            children: [
              Icon(
                Icons.restaurant,
                color: Theme.of(context).colorScheme.primary,
              ),
              const SizedBox(width: 8),
              Expanded(
                child: Text(
                  restaurant.name,
                  style: const TextStyle(fontSize: 18),
                ),
              ),
              IconButton(
                icon: const Icon(Icons.close),
                onPressed: () => Navigator.of(context).pop(),
                iconSize: 20,
              ),
            ],
          ),
          content: const Text(
            'Do you want me to choose the best dish for you?',
            style: TextStyle(fontSize: 16),
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.of(context).pop(),
              child: const Text('No, thanks'),
            ),
            ElevatedButton(
              onPressed: () async {
                Navigator.of(context).pop();
                await _chooseBestDish(restaurant);
              },
              child: const Text('Yes, please!'),
            ),
          ],
        );
      },
    );
  }

  Future<void> _chooseBestDish(RestaurantDto restaurant) async {
    try {
      // Show loading dialog
      showDialog(
        context: context,
        barrierDismissible: false,
        builder:
            (context) => AlertDialog(
              content: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  const CircularProgressIndicator(),
                  const SizedBox(height: 16),
                  Text(
                    'Finding the perfect dish for you...',
                    textAlign: TextAlign.center,
                    style: Theme.of(context).textTheme.bodyMedium,
                  ),
                ],
              ),
            ),
      );

      // Get user's dietary requirements from profile
      List<String> dietaryRequirements = [];
      try {
        final userDietaryRequirements =
            await _profileService.getDietaryRequirements();
        dietaryRequirements =
            userDietaryRequirements.map((dietary) => dietary.name).toList();
      } catch (e) {
        debugPrint('Error getting user dietary requirements: $e');
      }

      final response = await _restaurantMenuService.getBestDish(
        restaurant.id,
        dietaryRequirements,
      );

      // Close loading dialog
      if (mounted) Navigator.of(context).pop();

      if (response.isSuccess) {
        final dish = response.success!.dish;
        _showDishResultModal(dish, restaurant);
      } else {
        final error = response.error!;
        _showErrorModal(error.message, restaurant);
      }
    } catch (e) {
      // Close loading dialog if still open
      if (mounted) Navigator.of(context).pop();

      debugPrint('Error getting best dish: $e');
      _showErrorModal(
        'Sorry, we encountered an error while finding the best dish. Please try again.',
        restaurant,
      );
    }
  }

  void _showDishResultModal(BestDishDto dish, RestaurantDto restaurant) {
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Row(
            children: [
              Icon(
                Icons.restaurant_menu,
                color: Theme.of(context).colorScheme.primary,
              ),
              const SizedBox(width: 8),
              const Expanded(child: Text('Perfect Dish Found!')),
              IconButton(
                icon: const Icon(Icons.close),
                onPressed: () => Navigator.of(context).pop(),
                iconSize: 20,
              ),
            ],
          ),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                dish.name,
                style: const TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 8),
              if (dish.description != null) ...[
                Text(dish.description!),
                const SizedBox(height: 8),
              ],
              if (dish.price != null) ...[
                Text(
                  'Price: \$${dish.price!.toStringAsFixed(2)}',
                  style: const TextStyle(fontWeight: FontWeight.w500),
                ),
                const SizedBox(height: 8),
              ],
              if (dish.dietaryTags.isNotEmpty) ...[
                Text(
                  'Dietary: ${dish.dietaryTags.join(', ')}',
                  style: TextStyle(
                    color: Theme.of(context).colorScheme.secondary,
                    fontWeight: FontWeight.w500,
                  ),
                ),
                const SizedBox(height: 8),
              ],
              Text(
                'At ${dish.restaurantName}',
                style: TextStyle(
                  color: Theme.of(context).colorScheme.primary,
                  fontStyle: FontStyle.italic,
                ),
              ),
            ],
          ),
          actions: [
            TextButton(
              onPressed: () async {
                Navigator.of(context).pop();
                await _chooseBestDish(restaurant);
              },
              child: const Text('Choose another dish'),
            ),
            ElevatedButton(
              onPressed: () => Navigator.of(context).pop(),
              child: const Text('Perfect!'),
            ),
          ],
        );
      },
    );
  }

  void _showErrorModal(String message, RestaurantDto restaurant) {
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Row(
            children: [
              Icon(
                Icons.info_outline,
                color: Theme.of(context).colorScheme.error,
              ),
              const SizedBox(width: 8),
              const Expanded(child: Text('No Suitable Dishes')),
              IconButton(
                icon: const Icon(Icons.close),
                onPressed: () => Navigator.of(context).pop(),
                iconSize: 20,
              ),
            ],
          ),
          content: Text(message),
          actions: [
            TextButton(
              onPressed: () async {
                Navigator.of(context).pop();
                await _chooseBestDish(restaurant);
              },
              child: const Text('Try again'),
            ),
            ElevatedButton(
              onPressed: () => Navigator.of(context).pop(),
              child: const Text('OK'),
            ),
          ],
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;

    return Scaffold(
      appBar: AppBar(
        title: const Text('All Restaurants'),
        centerTitle: true,
        automaticallyImplyLeading: false,
        actions: [
          DiceRollWidget(
            onPressed: _handleDiceRoll,
            isEnabled: !_isLoading && _availableCuisines.isNotEmpty,
          ),
          IconButton(
            icon: const Icon(Icons.filter_alt_rounded),
            onPressed: _showFilterDialog,
          ),
        ],
      ),
      body: Column(
        children: [
          // Search Bar
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: TextField(
              controller: _searchController,
              onChanged: _onSearchChanged,
              decoration: buildSearchDecoration(
                colorScheme: Theme.of(context).colorScheme,
                hintText: 'Search restaurants by name...',
                suffixIcon:
                    _searchQuery.isNotEmpty
                        ? IconButton(
                          icon: const Icon(Icons.clear),
                          onPressed: _clearSearch,
                        )
                        : null,
              ),
            ),
          ),
          // Restaurant Grid
          Expanded(
            child: Stack(
              children: [
                Padding(
                  padding: const EdgeInsets.all(8.0),
                  child:
                      _isLoading
                          ? const Center(child: CircularProgressIndicator())
                          : _restaurants.isEmpty
                          ? Center(
                            child: Text(
                              _isSearchMode && _searchQuery.isNotEmpty
                                  ? 'No restaurants found for "$_searchQuery"'
                                  : 'No restaurants found.',
                            ),
                          )
                          : Column(
                            children: [
                              Expanded(
                                child: GridView.builder(
                                  controller: _scrollController,
                                  itemCount: _restaurants.length,
                                  gridDelegate:
                                      const SliverGridDelegateWithFixedCrossAxisCount(
                                        crossAxisCount: 2,
                                        mainAxisSpacing: 8,
                                        crossAxisSpacing: 8,
                                        childAspectRatio: 0.75,
                                      ),
                                  itemBuilder: (context, index) {
                                    final restaurant = _restaurants[index];
                                    final isFavorite = _favoriteRestaurantIds
                                        .contains(restaurant.id);
                                    return Card(
                                      clipBehavior: Clip.antiAlias,
                                      child: InkWell(
                                        onTap:
                                            () => _openRestaurantDetails(
                                              restaurant,
                                            ),
                                        child: Column(
                                          crossAxisAlignment:
                                              CrossAxisAlignment.start,
                                          children: [
                                            // Restaurant Image
                                            Expanded(
                                              flex: 3,
                                              child: Stack(
                                                fit: StackFit.expand,
                                                children: [
                                                  restaurant.imageUrl != null
                                                      ? Image.network(
                                                        restaurant.imageUrl!,
                                                        fit: BoxFit.cover,
                                                        errorBuilder: (
                                                          context,
                                                          error,
                                                          stackTrace,
                                                        ) {
                                                          return Container(
                                                            color:
                                                                colorScheme
                                                                    .surfaceContainerHighest,
                                                            child: Icon(
                                                              Icons.restaurant,
                                                              size: 40,
                                                              color:
                                                                  colorScheme
                                                                      .onSurfaceVariant,
                                                            ),
                                                          );
                                                        },
                                                      )
                                                      : Container(
                                                        color:
                                                            colorScheme
                                                                .surfaceContainerHighest,
                                                        child: Icon(
                                                          Icons.restaurant,
                                                          size: 40,
                                                          color:
                                                              colorScheme
                                                                  .onSurfaceVariant,
                                                        ),
                                                      ),
                                                  // Action buttons overlay
                                                  Positioned(
                                                    top: 4,
                                                    right: 4,
                                                    child: Row(
                                                      children: [
                                                        // Heart Icon
                                                        GestureDetector(
                                                          onTap:
                                                              () =>
                                                                  _toggleFavoriteRestaurant(
                                                                    restaurant
                                                                        .id,
                                                                  ),
                                                          child: Container(
                                                            padding:
                                                                const EdgeInsets.all(
                                                                  6,
                                                                ),
                                                            decoration:
                                                                BoxDecoration(
                                                                  color:
                                                                      Colors
                                                                          .black54,
                                                                  shape:
                                                                      BoxShape
                                                                          .circle,
                                                                ),
                                                            child: Icon(
                                                              isFavorite
                                                                  ? Icons
                                                                      .favorite
                                                                  : Icons
                                                                      .favorite_border,
                                                              color:
                                                                  isFavorite
                                                                      ? Colors
                                                                          .red
                                                                      : Colors
                                                                          .white,
                                                              size: 18,
                                                            ),
                                                          ),
                                                        ),
                                                        const SizedBox(
                                                          width: 4,
                                                        ),
                                                        // QR Code Icon
                                                        GestureDetector(
                                                          onTap: () async {
                                                            if (restaurant
                                                                    .menuUrl ==
                                                                'menu-analysed') {
                                                              _showBestDishModal(
                                                                restaurant,
                                                              );
                                                            } else {
                                                              final result = await Navigator.push(
                                                                context,
                                                                MaterialPageRoute(
                                                                  builder:
                                                                      (
                                                                        context,
                                                                      ) => MenuScannerPage(
                                                                        restaurantId:
                                                                            restaurant.id,
                                                                        restaurantName:
                                                                            restaurant.name,
                                                                      ),
                                                                ),
                                                              );

                                                              if (result ==
                                                                  true) {
                                                                _fetchRestaurants();
                                                              }
                                                            }
                                                          },
                                                          child: Container(
                                                            padding:
                                                                const EdgeInsets.all(
                                                                  6,
                                                                ),
                                                            decoration:
                                                                BoxDecoration(
                                                                  color:
                                                                      Colors
                                                                          .black54,
                                                                  shape:
                                                                      BoxShape
                                                                          .circle,
                                                                ),
                                                            child: Icon(
                                                              restaurant.menuUrl ==
                                                                      'menu-analysed'
                                                                  ? Icons
                                                                      .restaurant
                                                                  : Icons
                                                                      .qr_code_scanner,
                                                              color:
                                                                  Colors.white,
                                                              size: 18,
                                                            ),
                                                          ),
                                                        ),
                                                      ],
                                                    ),
                                                  ),
                                                ],
                                              ),
                                            ),
                                            // Restaurant Details
                                            Expanded(
                                              flex: 2,
                                              child: Padding(
                                                padding: const EdgeInsets.all(
                                                  8.0,
                                                ),
                                                child: Column(
                                                  crossAxisAlignment:
                                                      CrossAxisAlignment.start,
                                                  mainAxisAlignment:
                                                      MainAxisAlignment
                                                          .spaceBetween,
                                                  children: [
                                                    Text(
                                                      restaurant.name,
                                                      style: theme
                                                          .textTheme
                                                          .titleSmall
                                                          ?.copyWith(
                                                            color:
                                                                colorScheme
                                                                    .primary,
                                                            fontWeight:
                                                                FontWeight.bold,
                                                          ),
                                                      maxLines: 1,
                                                      overflow:
                                                          TextOverflow.ellipsis,
                                                    ),
                                                    Row(
                                                      children: [
                                                        Icon(
                                                          Icons.star,
                                                          color:
                                                              colorScheme
                                                                  .secondary,
                                                          size: 14,
                                                        ),
                                                        const SizedBox(
                                                          width: 4,
                                                        ),
                                                        Text(
                                                          restaurant.rating
                                                                  ?.toStringAsFixed(
                                                                    1,
                                                                  ) ??
                                                              'N/A',
                                                          style:
                                                              const TextStyle(
                                                                fontWeight:
                                                                    FontWeight
                                                                        .w500,
                                                                fontSize: 12,
                                                              ),
                                                        ),
                                                        const SizedBox(
                                                          width: 8,
                                                        ),
                                                        Text(
                                                          formatPriceLevel(
                                                            restaurant
                                                                .priceLevel,
                                                          ),
                                                          style:
                                                              const TextStyle(
                                                                fontSize: 12,
                                                              ),
                                                        ),
                                                      ],
                                                    ),
                                                    // Cuisine tags
                                                    if (restaurant
                                                        .cuisineNames
                                                        .isNotEmpty)
                                                      Wrap(
                                                        spacing: 4,
                                                        runSpacing: 2,
                                                        children:
                                                            _sortCuisinesByFilter(
                                                                  restaurant
                                                                      .cuisineNames,
                                                                  _selectedCuisine
                                                                      ?.name,
                                                                )
                                                                .take(
                                                                  2,
                                                                ) // Limit to 2 tags to fit in card
                                                                .map(
                                                                  (
                                                                    cuisine,
                                                                  ) => Container(
                                                                    padding: const EdgeInsets.symmetric(
                                                                      horizontal:
                                                                          6,
                                                                      vertical:
                                                                          2,
                                                                    ),
                                                                    decoration: BoxDecoration(
                                                                      color:
                                                                          colorScheme
                                                                              .secondaryContainer,
                                                                      borderRadius:
                                                                          BorderRadius.circular(
                                                                            8,
                                                                          ),
                                                                    ),
                                                                    child: Text(
                                                                      cuisine,
                                                                      style: TextStyle(
                                                                        fontSize:
                                                                            9,
                                                                        color:
                                                                            colorScheme.onSecondaryContainer,
                                                                        fontWeight:
                                                                            FontWeight.w500,
                                                                      ),
                                                                    ),
                                                                  ),
                                                                )
                                                                .toList(),
                                                      ),
                                                  ],
                                                ),
                                              ),
                                            ),
                                          ],
                                        ),
                                      ),
                                    );
                                  },
                                ),
                              ),
                              // Pagination loading indicator
                              if (_isLoadingMore)
                                const Padding(
                                  padding: EdgeInsets.all(16.0),
                                  child: Center(
                                    child: CircularProgressIndicator(),
                                  ),
                                ),
                            ],
                          ),
                ),
                _buildActiveFiltersChip(),
              ],
            ),
          ),
        ],
      ),
    );
  }

  // Helper method to sort cuisines with selected cuisine first
  List<String> _sortCuisinesByFilter(
    List<String> cuisines,
    String? selectedCuisine,
  ) {
    if (selectedCuisine == null || !cuisines.contains(selectedCuisine)) {
      return cuisines;
    }
    return [selectedCuisine, ...cuisines.where((c) => c != selectedCuisine)];
  }
}
