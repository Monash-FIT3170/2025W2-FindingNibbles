import 'package:nibbles/core/logger.dart';

class Appliance {
  final int id;
  final String name;
  bool isSelected;

  Appliance({required this.id, required this.name, this.isSelected = false});
}

class ApplianceService {
  final _logger = getLogger();

  // Mock data for appliances
  final List<Map<String, dynamic>> _mockAppliances = [
    {'id': 1, 'name': 'Oven'},
    {'id': 2, 'name': 'Microwave'},
    {'id': 3, 'name': 'Blender'},
    {'id': 4, 'name': 'Food Processor'},
    {'id': 5, 'name': 'Air Fryer'},
    {'id': 6, 'name': 'Slow Cooker'},
    {'id': 7, 'name': 'Mixer'},
    {'id': 8, 'name': 'Toaster'},
    {'id': 9, 'name': 'Pressure Cooker'},
    {'id': 10, 'name': 'Rice Cooker'},
  ];

  /// Fetches the user's available appliances (mocked data)
  Future<List<Appliance>> fetchAppliances({
    List<int>? selectedAppliances,
  }) async {
    _logger.d('Fetching appliances (mock data)');

    // Simulate network delay
    await Future.delayed(const Duration(milliseconds: 500));

    // Return mock appliances
    return _mockAppliances.map((item) {
      return Appliance(
        id: item['id'],
        name: item['name'],
        isSelected: selectedAppliances?.contains(item['id']) ?? false,
      );
    }).toList();
  }

  /// Creates a new appliance entry for the user (mock implementation)
  Future<bool> createAppliance(String name) async {
    _logger.d('Creating appliance: $name (mock implementation)');
    await Future.delayed(const Duration(milliseconds: 300));

    // Add to mock data with a new ID
    _mockAppliances.add({'id': _mockAppliances.length + 1, 'name': name});

    return true;
  }

  /// Deletes a user's appliance (mock implementation)
  Future<bool> deleteAppliance(int id) async {
    _logger.d('Deleting appliance ID: $id (mock implementation)');
    await Future.delayed(const Duration(milliseconds: 300));

    // Remove from mock data
    _mockAppliances.removeWhere((appliance) => appliance['id'] == id);

    return true;
  }
}
