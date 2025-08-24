import 'package:flutter/material.dart';
import 'package:nibbles/pages/menu_scanner/menu_scanner_page.dart';
import 'package:nibbles/service/cuisine/cuisine_dto.dart';
import 'package:nibbles/service/cuisine/cuisine_service.dart';
import 'package:nibbles/service/restaurant/google_places_restaurant_dto.dart';
import 'package:nibbles/service/restaurant/restaurant_service.dart';
import 'package:nibbles/theme/app_theme.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  List<GooglePlacesRestaurantDto> _restaurants = [];
  bool _isLoading = false;
  List<CuisineDto> _availableCuisines = [];
  CuisineDto? _selectedCuisine;
  int _minimumRating = 1;
  
  // Search functionality
  final TextEditingController _searchController = TextEditingController();
  String _searchQuery = '';
  bool _isSearchMode = false;
  List<String> _searchSuggestions = [];
  bool _showSuggestions = false;

  // Default location - you should get this from user's current location
  final double _defaultLat = -37.8136; // Melbourne
  final double _defaultLng = 144.9631;

  @override
  void initState() {
    super.initState();
    _fetchRestaurants();
    _fetchCuisines();
  }

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
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
      List<GooglePlacesRestaurantDto> allRestaurants;
      
      // If in search mode, perform text search
      if (_isSearchMode && _searchQuery.isNotEmpty) {
        allRestaurants = await RestaurantService().searchWithGooglePlaces(
          query: _searchQuery,
          latitude: _defaultLat,
          longitude: _defaultLng,
          radius: 5000, // 5km radius
        );
      } 
      // If cuisine filter is selected
      else if (_selectedCuisine != null) {
        allRestaurants = await RestaurantService().searchByCuisineWithGooglePlaces(
          cuisine: _selectedCuisine!.name,
          latitude: _defaultLat,
          longitude: _defaultLng,
          radius: 5000, // 5km radius
        );
      } 
      // Default: get nearby restaurants
      else {
        allRestaurants = await RestaurantService().getNearbyWithKeyword(
          latitude: _defaultLat,
          longitude: _defaultLng,
          radius: 5000, // 5km radius
        );
      }

      final filteredRestaurants = allRestaurants
          .where((restaurant) =>
              restaurant.rating != null &&
              restaurant.rating! >= _minimumRating)
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

  /// Perform search when user types in search bar
  void _performSearch(String query) {
    setState(() {
      _searchQuery = query.trim();
      _isSearchMode = _searchQuery.isNotEmpty;
      _selectedCuisine = null; // Clear cuisine filter when searching
    });
    _fetchRestaurants();
  }

  /// Clear search and return to default view
  void _clearSearch() {
    setState(() {
      _searchController.clear();
      _searchQuery = '';
      _isSearchMode = false;
      _showSuggestions = false;
      _searchSuggestions.clear();
    });
    _fetchRestaurants();
  }

  /// Get autocomplete suggestions
  Future<void> _getSearchSuggestions(String query) async {
    if (query.length < 2) {
      setState(() {
        _showSuggestions = false;
        _searchSuggestions.clear();
      });
      return;
    }

    try {
      final suggestions = await RestaurantService().getRestaurantAutocompleteSuggestions(
        input: query,
        latitude: _defaultLat,
        longitude: _defaultLng,
        radius: 5000,
      );

      setState(() {
        _searchSuggestions = suggestions
            .map((suggestion) => suggestion.description)
            .take(5) // Limit to 5 suggestions
            .toList();
        _showSuggestions = _searchSuggestions.isNotEmpty;
      });
    } catch (e) {
      debugPrint('Error getting search suggestions: $e');
      setState(() {
        _showSuggestions = false;
        _searchSuggestions.clear();
      });
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

  // Format price level for Google Places (0-4 scale)
  String formatPriceLevel(int? level) {
    if (level == null) return 'Price: ?';
    switch (level) {
      case 0:
        return 'Price: Free';
      case 1:
        return 'Price: \$';
      case 2:
        return 'Price: \$\$';
      case 3:
        return 'Price: \$\$\$';
      case 4:
        return 'Price: \$\$\$\$';
      default:
        return 'Price: ?';
    }
  }

  Widget _buildActiveFiltersChip() {
    List<String> activeFilters = [];

    // Add cuisine filter if selected (but not when in search mode)
    if (_selectedCuisine != null && !_isSearchMode) {
      activeFilters.add(_selectedCuisine!.name);
    }

    // Add minimum rating filter if above default
    if (_minimumRating > 1) {
      activeFilters.add('$_minimumRating+ ⭐');
    }

    if (activeFilters.isEmpty) return const SizedBox.shrink();

    return Positioned(
      top: 0,
      right: 0,
      child: Chip(
        label: Text(
          activeFilters.join(' • '),
          style: const TextStyle(fontSize: 12),
        ),
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
        automaticallyImplyLeading: false, // Hide back button
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
      body: Column(
        children: [
          // Search Bar with Autocomplete
          Container(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              children: [
                TextField(
                  controller: _searchController,
                  decoration: InputDecoration(
                    hintText: 'Search restaurants (e.g., "pizza", "Italian", "McDonald\'s")',
                    prefixIcon: const Icon(Icons.search),
                    suffixIcon: _isSearchMode
                        ? IconButton(
                            icon: const Icon(Icons.clear),
                            onPressed: _clearSearch,
                          )
                        : null,
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                    filled: true,
                    fillColor: Theme.of(context).colorScheme.surface,
                  ),
                  onChanged: (value) {
                    // Get suggestions for autocomplete
                    _getSearchSuggestions(value);
                    
                    // Add debouncing for actual search
                    Future.delayed(const Duration(milliseconds: 800), () {
                      if (_searchController.text == value) {
                        _performSearch(value);
                      }
                    });
                  },
                  onSubmitted: (value) {
                    setState(() => _showSuggestions = false);
                    _performSearch(value);
                  },
                ),
                
                // Autocomplete suggestions
                if (_showSuggestions && _searchSuggestions.isNotEmpty)
                  Container(
                    margin: const EdgeInsets.only(top: 4),
                    decoration: BoxDecoration(
                      color: Theme.of(context).colorScheme.surface,
                      borderRadius: BorderRadius.circular(8),
                      border: Border.all(color: Colors.grey.shade300),
                    ),
                    child: ListView.builder(
                      shrinkWrap: true,
                      itemCount: _searchSuggestions.length,
                      itemBuilder: (context, index) {
                        return ListTile(
                          dense: true,
                          leading: const Icon(Icons.search, size: 20),
                          title: Text(
                            _searchSuggestions[index],
                            style: const TextStyle(fontSize: 14),
                          ),
                          onTap: () {
                            _searchController.text = _searchSuggestions[index];
                            setState(() => _showSuggestions = false);
                            _performSearch(_searchSuggestions[index]);
                          },
                        );
                      },
                    ),
                  ),
              ],
            ),
          ),
          
          // Restaurant List
          Expanded(
            child: Stack(
              children: [
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 8.0),
                  child: _isLoading
                      ? const Center(child: CircularProgressIndicator())
                      : _restaurants.isEmpty
                      ? Center(
                          child: Column(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Icon(
                                _isSearchMode ? Icons.search_off : Icons.restaurant,
                                size: 64,
                                color: Colors.grey[400],
                              ),
                              const SizedBox(height: 16),
                              Text(
                                _isSearchMode 
                                    ? 'No restaurants found for "$_searchQuery"'
                                    : 'No restaurants found.',
                                style: TextStyle(color: Colors.grey[600]),
                                textAlign: TextAlign.center,
                              ),
                              if (_isSearchMode) ...[
                                const SizedBox(height: 8),
                                TextButton(
                                  onPressed: _clearSearch,
                                  child: const Text('Clear search'),
                                ),
                              ],
                            ],
                          ),
                        )
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
                        );
                      },
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
}
