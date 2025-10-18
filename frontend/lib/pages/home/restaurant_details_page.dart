import 'package:flutter/material.dart';
import 'package:nibbles/pages/map/map_page.dart';
import 'package:nibbles/pages/menu_scanner/menu_scanner_page.dart';
import 'package:nibbles/service/profile/profile_service.dart';
import 'package:nibbles/service/profile/restaurant_dto.dart';
import 'package:nibbles/service/restaurant-menu/dish_dto.dart';
import 'package:nibbles/service/restaurant-menu/restaurant_menu_service.dart';
import 'package:nibbles/widgets/dish_card.dart';

class RestaurantDetailsPage extends StatefulWidget {
  final RestaurantDto restaurant;
  final bool isFavorite;

  const RestaurantDetailsPage({
    super.key,
    required this.restaurant,
    required this.isFavorite,
  });

  @override
  State<RestaurantDetailsPage> createState() => _RestaurantDetailsPageState();
}

class _RestaurantDetailsPageState extends State<RestaurantDetailsPage> {
  final ProfileService _profileService = ProfileService();
  final RestaurantMenuService _restaurantMenuService = RestaurantMenuService();
  late bool _isFavorite;
  List<DishDto> _dishes = [];
  bool _isLoadingDishes = false;

  @override
  void initState() {
    super.initState();
    _isFavorite = widget.isFavorite;
    _loadDishes();
  }

  Future<void> _loadDishes() async {
    setState(() {
      _isLoadingDishes = true;
    });

    try {
      final dishes = await _restaurantMenuService.getDishes(
        widget.restaurant.id,
      );
      if (mounted) {
        setState(() {
          _dishes = dishes;
          _isLoadingDishes = false;
        });
      }
    } catch (e) {
      debugPrint('Error loading dishes: $e');
      if (mounted) {
        setState(() {
          _isLoadingDishes = false;
        });
      }
    }
  }

  Future<void> _toggleFavorite() async {
    final wasAlreadyFavorite = _isFavorite;

    // Optimistic update
    setState(() => _isFavorite = !_isFavorite);

    try {
      if (wasAlreadyFavorite) {
        await _profileService.removeFavouriteRestaurant(widget.restaurant.id);
      } else {
        await _profileService.addFavouriteRestaurant(widget.restaurant.id);
      }
    } catch (e) {
      // Revert on error
      setState(() => _isFavorite = wasAlreadyFavorite);
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Failed to update favorite: $e')),
        );
      }
    }
  }

  void _navigateToMap() {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => MapPage(targetRestaurant: widget.restaurant),
      ),
    );
  }

  void _navigateToMenuScanner() async {
    await Navigator.push(
      context,
      MaterialPageRoute(
        builder:
            (context) => MenuScannerPage(
              restaurantId: widget.restaurant.id,
              restaurantName: widget.restaurant.name,
            ),
      ),
    );
    // Reload dishes after returning from menu scanner
    _loadDishes();
  }

  String _formatPriceLevel(int? level) {
    if (level == null) return 'N/A';
    return '\$' * level;
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;

    return Scaffold(
      body: CustomScrollView(
        slivers: [
          // Hero Image with Restaurant Name and Favorite Button
          SliverAppBar(
            expandedHeight: 300,
            pinned: true,
            leading: IconButton(
              icon: const Icon(Icons.arrow_back),
              onPressed: () => Navigator.pop(context),
              style: IconButton.styleFrom(
                backgroundColor: Colors.black54,
                foregroundColor: Colors.white,
              ),
            ),
            flexibleSpace: FlexibleSpaceBar(
              background: Stack(
                fit: StackFit.expand,
                children: [
                  // Restaurant Image
                  widget.restaurant.imageUrl != null
                      ? Image.network(
                        widget.restaurant.imageUrl!,
                        fit: BoxFit.cover,
                        errorBuilder: (context, error, stackTrace) {
                          return Container(
                            color: colorScheme.surfaceContainerHighest,
                            child: Icon(
                              Icons.restaurant,
                              size: 80,
                              color: colorScheme.onSurfaceVariant,
                            ),
                          );
                        },
                      )
                      : Container(
                        color: colorScheme.surfaceContainerHighest,
                        child: Icon(
                          Icons.restaurant,
                          size: 80,
                          color: colorScheme.onSurfaceVariant,
                        ),
                      ),
                  // Gradient overlay for better text visibility
                  Container(
                    decoration: BoxDecoration(
                      gradient: LinearGradient(
                        begin: Alignment.topCenter,
                        end: Alignment.bottomCenter,
                        colors: [Colors.transparent, Colors.black87],
                      ),
                    ),
                  ),
                  // Restaurant Name at bottom
                  Positioned(
                    bottom: 16,
                    left: 16,
                    right: 60,
                    child: Text(
                      widget.restaurant.name,
                      style: theme.textTheme.headlineMedium?.copyWith(
                        color: Colors.white,
                        fontWeight: FontWeight.bold,
                        shadows: [Shadow(blurRadius: 8, color: Colors.black87)],
                      ),
                    ),
                  ),
                ],
              ),
            ),
            actions: [
              // Favorite Button
              Padding(
                padding: const EdgeInsets.only(right: 8.0),
                child: IconButton(
                  icon: Icon(
                    _isFavorite ? Icons.favorite : Icons.favorite_border,
                    color: _isFavorite ? Colors.red : Colors.white,
                    size: 28,
                  ),
                  onPressed: _toggleFavorite,
                ),
              ),
            ],
          ),

          // Restaurant Details
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Rating, Price, and Get Directions
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      // Rating and Price column
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            // Rating
                            Text(
                              'Rating',
                              style: theme.textTheme.titleMedium?.copyWith(
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            const SizedBox(height: 8),
                            Row(
                              children: [
                                Icon(
                                  Icons.star,
                                  color: colorScheme.secondary,
                                  size: 18,
                                ),
                                const SizedBox(width: 4),
                                Text(
                                  widget.restaurant.rating?.toStringAsFixed(
                                        1,
                                      ) ??
                                      'N/A',
                                  style: theme.textTheme.bodyMedium?.copyWith(
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                                if (widget.restaurant.userRatingsTotal !=
                                    null) ...[
                                  const SizedBox(width: 4),
                                  Text(
                                    '(${widget.restaurant.userRatingsTotal})',
                                    style: theme.textTheme.bodySmall?.copyWith(
                                      color: colorScheme.onSurfaceVariant,
                                    ),
                                  ),
                                ],
                              ],
                            ),
                            const SizedBox(height: 16),
                            // Price
                            Text(
                              'Price',
                              style: theme.textTheme.titleMedium?.copyWith(
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            const SizedBox(height: 8),
                            Text(
                              _formatPriceLevel(widget.restaurant.priceLevel),
                              style: theme.textTheme.bodyMedium?.copyWith(
                                color: colorScheme.primary,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ],
                        ),
                      ),
                      // Get Directions Button
                      ElevatedButton.icon(
                        onPressed: _navigateToMap,
                        icon: const Icon(Icons.directions, size: 20),
                        label: const Text('Get Directions'),
                        style: ElevatedButton.styleFrom(
                          backgroundColor: colorScheme.primary,
                          foregroundColor: colorScheme.onPrimary,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 16),

                  // Cuisines
                  if (widget.restaurant.cuisineNames.isNotEmpty) ...[
                    Text(
                      'Cuisines',
                      style: theme.textTheme.titleMedium?.copyWith(
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 8),
                    Wrap(
                      spacing: 8,
                      runSpacing: 8,
                      children:
                          widget.restaurant.cuisineNames
                              .map(
                                (cuisine) => Chip(
                                  label: Text(cuisine),
                                  backgroundColor:
                                      colorScheme.secondaryContainer,
                                  labelStyle: TextStyle(
                                    color: colorScheme.onSecondaryContainer,
                                    fontWeight: FontWeight.w500,
                                  ),
                                ),
                              )
                              .toList(),
                    ),
                    const SizedBox(height: 16),
                  ],

                  // Address
                  if (widget.restaurant.address != null) ...[
                    Row(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Icon(
                          Icons.location_on,
                          color: colorScheme.primary,
                          size: 20,
                        ),
                        const SizedBox(width: 8),
                        Expanded(
                          child: Text(
                            widget.restaurant.address!,
                            style: theme.textTheme.bodyMedium,
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 16),
                  ],

                  // Website
                  if (widget.restaurant.website != null) ...[
                    Row(
                      children: [
                        Icon(
                          Icons.language,
                          color: colorScheme.primary,
                          size: 20,
                        ),
                        const SizedBox(width: 8),
                        Expanded(
                          child: Text(
                            widget.restaurant.website!,
                            style: theme.textTheme.bodyMedium?.copyWith(
                              color: colorScheme.primary,
                              decoration: TextDecoration.underline,
                            ),
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 16),
                  ],

                  const Divider(height: 32),

                  // Dishes Section
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        'Dishes',
                        style: theme.textTheme.titleLarge?.copyWith(
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      ElevatedButton(
                        onPressed: _navigateToMenuScanner,
                        style: ElevatedButton.styleFrom(
                          backgroundColor: colorScheme.primary,
                          foregroundColor: colorScheme.onPrimary,
                        ),
                        child: const Text('Scan Menu'),
                      ),
                    ],
                  ),
                  const SizedBox(height: 16),

                  // Dishes List or Empty State
                  if (_isLoadingDishes)
                    const Center(
                      child: Padding(
                        padding: EdgeInsets.all(32.0),
                        child: CircularProgressIndicator(),
                      ),
                    )
                  else if (_dishes.isEmpty)
                    Container(
                      padding: const EdgeInsets.all(32),
                      decoration: BoxDecoration(
                        color: colorScheme.surfaceContainerHighest,
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: Center(
                        child: Column(
                          children: [
                            Icon(
                              Icons.restaurant_menu,
                              size: 48,
                              color: colorScheme.onSurfaceVariant,
                            ),
                            const SizedBox(height: 16),
                            Text(
                              'No dishes available yet',
                              style: theme.textTheme.titleMedium?.copyWith(
                                color: colorScheme.onSurfaceVariant,
                              ),
                            ),
                            const SizedBox(height: 8),
                            Text(
                              'Use the Menu Scanner to add dishes',
                              style: theme.textTheme.bodySmall?.copyWith(
                                color: colorScheme.onSurfaceVariant,
                              ),
                              textAlign: TextAlign.center,
                            ),
                          ],
                        ),
                      ),
                    )
                  else
                    // Display dishes in cards
                    ListView.builder(
                      shrinkWrap: true,
                      physics: const NeverScrollableScrollPhysics(),
                      itemCount: _dishes.length,
                      itemBuilder: (context, index) {
                        return DishCard(dish: _dishes[index]);
                      },
                    ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
