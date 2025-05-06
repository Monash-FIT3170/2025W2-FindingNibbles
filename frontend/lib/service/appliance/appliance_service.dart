import 'package:dio/dio.dart';
import 'package:nibbles/core/dio_client.dart';
import 'package:nibbles/core/logger.dart';

class Appliance {
  final int id;
  final String name;
  bool isSelected;

  Appliance({required this.id, required this.name, this.isSelected = false});
}

class ApplianceService {
  final Dio _dio = DioClient().client;
  final _logger = getLogger();

  /// Fetches the user's available appliances from the backend
  Future<List<Appliance>> fetchAppliances({
    List<int>? selectedAppliances,
  }) async {
    try {
      final response = await _dio.get('/user/appliance');
      if (response.statusCode == 200) {
        List<dynamic> appliancesData = response.data as List<dynamic>;

        return appliancesData.map((item) {
          return Appliance(
            id: item['id'],
            name: item['name'],
            isSelected: selectedAppliances?.contains(item['id']) ?? false,
          );
        }).toList();
      }
      return [];
    } catch (e) {
      _logger.e('Failed to fetch appliances: ${e.toString()}');
      throw Exception('Failed to load appliances: ${e.toString()}');
    }
  }

  /// Creates a new appliance entry for the user
  Future<bool> createAppliance(String name) async {
    try {
      final response = await _dio.post('/user/appliance', data: {'name': name});
      return response.statusCode == 201;
    } catch (e) {
      _logger.e('Failed to create appliance: ${e.toString()}');
      return false;
    }
  }

  /// Deletes a user's appliance
  Future<bool> deleteAppliance(int id) async {
    try {
      final response = await _dio.delete('/user/appliance/$id');
      return response.statusCode == 200;
    } catch (e) {
      _logger.e('Failed to delete appliance: ${e.toString()}');
      return false;
    }
  }
}
