import 'package:flutter/material.dart';
import 'package:nibbles/service/cuisine/cuisine_dto.dart';
import 'package:nibbles/service/profile/profile_service.dart';

class CuisineSelector extends StatefulWidget {
  final List<CuisineDto> cuisines; // ✅ Now passed in instead of fetching
  final Function(CuisineDto?) onSelected;

  const CuisineSelector({
    super.key,
    required this.cuisines,
    required this.onSelected,
  });

  @override
  State<CuisineSelector> createState() => _CuisineSelectorState();
}

class _CuisineSelectorState extends State<CuisineSelector> {
  final ProfileService _profileService = ProfileService();

  List<CuisineDto> _favouriteCuisines = [];
  CuisineDto? _selectedCuisine;
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _loadFavourites();
  }

  Future<void> _loadFavourites() async {
    try {
      final favs = await _profileService.getFavouriteCuisines();
      setState(() {
        _favouriteCuisines = favs;
        _isLoading = false;
      });
    } catch (e) {
      debugPrint("Error loading favourite cuisines: $e");
      setState(() => _isLoading = false);
    }
  }

  bool _isFavourite(CuisineDto cuisine) {
    return _favouriteCuisines.any((c) => c.id == cuisine.id);
  }

  Future<void> _toggleFavourite(CuisineDto cuisine) async {
    try {
      if (_isFavourite(cuisine)) {
        await _profileService.removeFavouriteCuisine(cuisine.id);
        setState(() {
          _favouriteCuisines.removeWhere((c) => c.id == cuisine.id);
        });
      } else {
        await _profileService.addFavouriteCuisine(cuisine.id);
        setState(() {
          _favouriteCuisines.add(cuisine);
        });
      }
    } catch (e) {
      debugPrint("Error toggling favourite cuisine: $e");
    }
  }

  void _handleCuisineSelect(CuisineDto cuisine) {
    setState(() {
      _selectedCuisine =
          _selectedCuisine?.id == cuisine.id ? null : cuisine;
    });
    widget.onSelected(_selectedCuisine);
  }

  @override
  Widget build(BuildContext context) {
    if (_isLoading) {
      return const Center(child: CircularProgressIndicator());
    }

    return ListView.builder(
      shrinkWrap: true,
      itemCount: widget.cuisines.length, // ✅ use passed-in list
      itemBuilder: (context, index) {
        final cuisine = widget.cuisines[index];
        final isFav = _isFavourite(cuisine);
        final isSelected = _selectedCuisine?.id == cuisine.id;

        return Card(
          elevation: isSelected ? 4 : 1,
          color: isSelected
              ? Theme.of(context).colorScheme.primary.withOpacity(0.1)
              : null,
          child: ListTile(
            title: Text(
              cuisine.name,
              style: TextStyle(
                fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
              ),
            ),
            trailing: IconButton(
              icon: Icon(
                isFav ? Icons.favorite : Icons.favorite_border,
                color: isFav ? Colors.red : Colors.grey,
              ),
              onPressed: () => _toggleFavourite(cuisine),
            ),
            onTap: () => _handleCuisineSelect(cuisine),
          ),
        );
      },
    );
  }
}
