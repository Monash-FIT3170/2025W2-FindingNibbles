// lib/service/profile/history_service.dart
import 'package:shared_preferences/shared_preferences.dart';
import 'package:nibbles/service/profile/restaurant_dto.dart';
import 'dart:convert';
import 'package:nibbles/core/logger.dart';

class HistoryService {
  static const _historyKey = 'browsing_history';
  final _logger = getLogger();

  Future<void> addToHistory(RestaurantDto restaurant) async {
    final prefs = await SharedPreferences.getInstance();
    final existing = prefs.getStringList(_historyKey) ?? [];

    // Normalize to correct JSON keys (avoid underscore mismatch)
    final restaurantJson = jsonEncode({
      'id': restaurant.id,
      'placeId': restaurant.placeId,
      'name': restaurant.name,
      'latitude': restaurant.latitude,
      'longitude': restaurant.longitude,
      'businessStatus': restaurant.businessStatus,
      'icon': restaurant.icon,
      'rating': restaurant.rating,
      'userRatingsTotal': restaurant.userRatingsTotal,
      'priceLevel': restaurant.priceLevel,
      'address': restaurant.address,
      'formattedPhoneNum': restaurant.formattedPhoneNum,
      'website': restaurant.website,
      'menuUrl': restaurant.menuUrl,
      'dineIn': restaurant.dineIn,
      'takeout': restaurant.takeout,
      'delivery': restaurant.delivery,
      'servesBreakfast': restaurant.servesBreakfast,
      'servesLunch': restaurant.servesLunch,
      'servesDinner': restaurant.servesDinner,
      'wheelchairAccessibleEntrance': restaurant.wheelchairAccessibleEntrance,
      'viewCount': restaurant.viewCount,
      'createdAt': restaurant.createdAt.toIso8601String(),
      'updatedAt': restaurant.updatedAt.toIso8601String(),
      'restaurantCuisines':
          restaurant.restaurantCuisines?.map((rc) => rc.toJson()).toList(),
    });

    // Remove duplicates
    existing.removeWhere((r) {
      try {
        final decoded = jsonDecode(r);
        return decoded['id'] == restaurant.id;
      } catch (_) {
        return false;
      }
    });

    existing.insert(0, restaurantJson);

    // Limit to 20 recent entries
    if (existing.length > 20) {
      existing.removeRange(20, existing.length);
    }

    await prefs.setStringList(_historyKey, existing);
  }

  Future<List<RestaurantDto>> getHistory() async {
    final prefs = await SharedPreferences.getInstance();
    final existing = prefs.getStringList(_historyKey) ?? [];

    List<RestaurantDto> restaurants = [];
    for (final r in existing) {
      try {
        restaurants.add(RestaurantDto.fromJson(jsonDecode(r)));
      } catch (e) {
        _logger.e("Error decoding restaurant history: $e");
      }
    }

    return restaurants;
  }

  Future<void> clearHistory() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove(_historyKey);
  }
}
