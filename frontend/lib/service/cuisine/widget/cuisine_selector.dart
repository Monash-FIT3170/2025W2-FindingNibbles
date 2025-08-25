import 'package:flutter/material.dart';
import 'package:nibbles/service/cuisine/cuisine_service.dart';
import 'package:nibbles/service/cuisine/cuisine_dto.dart';
import 'package:nibbles/service/profile/profile_service.dart';

class CuisineSelector extends StatefulWidget {
  const CuisineSelector({super.key, required Null Function(dynamic cuisine) onSelected});

  @override
  State<CuisineSelector> createState() => _CuisineSelectorState();
}

class _CuisineSelectorState extends State<CuisineSelector> {
  final CuisineService _cuisineService = CuisineService();
  final ProfileService _profileService = ProfileService();

  List<CuisineDto> _allCuisines = [];
  List<CuisineDto> _favouriteCuisines = [];
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _loadCuisines();
  }

  Future<void> _loadCuisines() async {
    try {
      final all = await _cuisineService.getAllCuisines();
      final favs = await _profileService.getFavouriteCuisines();

      setState(() {
        _allCuisines = all;
        _favouriteCuisines = favs;
        _isLoading = false;
      });
    } catch (e) {
      debugPrint("Error loading cuisines: $e");
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
        await _profileService.addFavouriteCuisine(cuisine.id); // <- cuisine is CuisineDto
        setState(() {
          _favouriteCuisines.add(cuisine);
        });
      }
    } catch (e) {
      debugPrint("Error toggling favourite cuisine: $e");
    }
  }

  @override
  Widget build(BuildContext context) {
    if (_isLoading) {
      return const Center(child: CircularProgressIndicator());
    }

    return ListView.builder(
      shrinkWrap: true,
      itemCount: _allCuisines.length,
      itemBuilder: (context, index) {
        final cuisine = _allCuisines[index];
        final isFav = _isFavourite(cuisine);

        return ListTile(
          title: Text(cuisine.name),
          trailing: IconButton(
            icon: Icon(
              isFav ? Icons.star : Icons.star_border,
              color: isFav ? Colors.amber : Colors.grey,
            ),
            onPressed: () => _toggleFavourite(cuisine),
          ),
        );
      },
    );
  }
}
