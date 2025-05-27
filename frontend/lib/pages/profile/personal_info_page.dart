import 'package:flutter/material.dart';
import 'package:nibbles/service/auth/auth_service.dart';
import 'package:nibbles/service/profile/profile_service.dart';
import 'package:nibbles/service/profile/user_dto.dart';
import 'package:nibbles/service/profile/user_location_dto.dart';
import 'package:nibbles/core/logger.dart';
import 'package:nibbles/pages/profile/change_password_page.dart';
import 'package:nibbles/theme/app_theme.dart';
import 'package:nibbles/pages/profile/location_selection_page.dart';
import 'package:latlong2/latlong.dart';

class PersonalInfoPage extends StatefulWidget {
  const PersonalInfoPage({super.key});

  @override
  PersonalInfoPageState createState() => PersonalInfoPageState();
}

class PersonalInfoPageState extends State<PersonalInfoPage> {
  final AuthService _authService = AuthService();
  final ProfileService _profileService = ProfileService();
  late Future<Map<String, dynamic>> _personalInfo;
  UserLocationDto? _homeLocation;
  final _logger = getLogger();

  // Feature flag for profile picture editing
  final bool _canEditProfilePicture = false; 

  @override
  void initState() {
    super.initState();
    _loadUserInfo();
    _fetchHomeLocation();
  }

  Future<void> _loadUserInfo() async {
    setState(() {
      _personalInfo = _authService.getUserProfile();
    });
  }

  Future<void> _fetchHomeLocation() async {
    try {
      final location = await _profileService.getDefaultLocation();
      setState(() {
        _homeLocation = location;
      });
    } catch (e) {
      _logger.d('Failed to fetch home location: $e');
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Failed to load home location: $e')),
      );
    }
  }

  Future<void> _navigateToLocationSelection({
    UserLocationDto? initialLocation,
  }) async {
    final result = await Navigator.push(
      context,
      MaterialPageRoute(
        builder:
            (context) => LocationSelectionPage(
              initialLocation:
                  initialLocation != null
                      ? LatLng(
                        initialLocation.latitude,
                        initialLocation.longitude,
                      )
                      : null,
              initialLocationId: initialLocation?.id,
            ),
      ),
    );

    if (result != null && result is Map<String, dynamic>) {
      final String name = result['name'];
      final String streetAddress = result['streetAddress'] ?? '';
      final double latitude = result['latitude'];
      final double longitude = result['longitude'];
      final bool isDefault = result['isDefault'];
      final int? id = result['id'] as int?;

      try {
        if (id == null) {
          // CREATE new location
          final newLocation = await _profileService.createLocation(
            CreateUserLocationDto(
              name: name,
              streetAddress: streetAddress,
              latitude: latitude,
              longitude: longitude,
              isDefault: isDefault,
            ),
          );
          setState(() {
            _homeLocation = newLocation;
          });
          if (!mounted) return;
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('Home location added successfully!')),
          );
        } else {
          // UPDATE existing location
          final updatedLocation = await _profileService.updateLocation(
            id,
            UpdateUserLocationDto(
              id: id,
              name: name,
              streetAddress: streetAddress,
              latitude: latitude,
              longitude: longitude,
              isDefault: isDefault,
            ),
          );
          setState(() {
            _homeLocation = updatedLocation;
          });
          if (!mounted) return;
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(
              content: Text('Home location updated successfully!'),
            ),
          );
        }
      } catch (e) {
        if (!mounted) return;
        ScaffoldMessenger.of(
          context,
        ).showSnackBar(SnackBar(content: Text('Failed to save location: $e')));
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.colorScheme.primary,
      appBar: AppBar(
        backgroundColor: AppTheme.colorScheme.primary,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: AppTheme.surfaceColor),
          onPressed: () => Navigator.pop(context),
        ),
        title: const Text(
          'Personal Info',
          style: TextStyle(
            color: AppTheme.surfaceColor,
            fontWeight: FontWeight.bold,
          ),
        ),
      ),
      body: FutureBuilder<Map<String, dynamic>>(
        future: _personalInfo,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(
              child: CircularProgressIndicator(color: AppTheme.errorColor),
            );
          } else if (snapshot.hasError) {
            return Center(
              child: Text(
                'Error: ${snapshot.error}',
                style: const TextStyle(color: AppTheme.errorColor),
              ),
            );
          } else if (!snapshot.hasData) {
            return const Center(
              child: Text(
                'No user details found.',
                style: TextStyle(color: AppTheme.errorColor),
              ),
            );
          }

          final user = snapshot.data!;

          return Column(
            children: [
              // Profile picture section
              Center(
                child: Padding(
                  padding: const EdgeInsets.symmetric(vertical: 24),
                  child: Stack(
                    children: [
                      // Placeholder for profile picture
                      CircleAvatar(
                        radius: 60, 
                        backgroundColor: AppTheme.textBody,
                        child: Icon(
                          Icons.person,
                          size: 80,
                          color: AppTheme.primaryColor,
                        ),
                      ),

                      // Conditional edit button not implemented yet
                      if (_canEditProfilePicture)
                        Positioned(
                          right: 0,
                          bottom: 0,
                          child: Container(
                            padding: const EdgeInsets.all(4),
                            decoration: BoxDecoration(
                              color: Colors.blue.shade800,
                              shape: BoxShape.circle,
                            ),
                            child: const Icon(
                              Icons.edit,
                              color: Colors.white,
                              size: 24,
                            ),
                          ),
                        ),
                    ],
                  ),
                ),
              ),

              // Form fields in white container with rounded top corners
              Expanded(
                child: Container(
                  decoration: const BoxDecoration(
                    color: AppTheme.surfaceColor,
                    borderRadius: BorderRadius.only(
                      topLeft: Radius.circular(32),
                      topRight: Radius.circular(32),
                    ),
                  ),
                  child: SingleChildScrollView(
                    padding: const EdgeInsets.all(24.0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        _buildFormField(
                          context,
                          'First Name',
                          user['firstName'] ?? 'Example First Name',
                          Icons.badge_outlined,
                          onEdit:
                              (value) => _handleFieldUpdate('firstName', value),
                        ),
                        _buildFormField(
                          context,
                          'Last Name',
                          user['lastName'] ?? 'Example Last Name',
                          Icons.badge_outlined,
                          onEdit:
                              (value) => _handleFieldUpdate('lastName', value),
                        ),
                        _buildFormField(
                          context,
                          'Email',
                          user['email'] ?? 'example@mail.com',
                          Icons.email_outlined,
                          onEdit: (value) => _handleFieldUpdate('email', value),
                        ),
                        _buildLocationField(context),

                        const SizedBox(height: 32),

                        // Change Password button
                        SizedBox(
                          width: double.infinity,
                          child: ElevatedButton.icon(
                            onPressed: () {
                              Navigator.push(
                                context,
                                MaterialPageRoute(
                                  builder:
                                      (context) => const ChangePasswordPage(),
                                ),
                              );
                            },
                            style: ElevatedButton.styleFrom(
                              backgroundColor:
                                  Colors.grey[600], // Gray background
                              foregroundColor: Colors.white,
                              elevation: 0, // Flat button style
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(12),
                              ),
                              padding: const EdgeInsets.symmetric(vertical: 16),
                            ),
                            icon: const Icon(Icons.lock_outline),
                            label: const Text(
                              'Change Password',
                              style: TextStyle(fontWeight: FontWeight.w500),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            ],
          );
        },
      ),
    );
  }

  // New method to build form-style fields
  Widget _buildFormField(
    BuildContext context,
    String label,
    String value,
    IconData icon, { // Keep the parameter for backward compatibility
    required Function(String) onEdit,
    bool enabled = true,
  }) {
    return Container(
      margin: const EdgeInsets.only(bottom: 16),
      decoration: BoxDecoration(
        color: Colors.grey.shade50,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: Colors.grey.shade200),
      ),
      child: ListTile(
        // Remove the leading icon
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              label,
              style: const TextStyle(
                fontSize: 12,
                color: Colors.grey,
                fontWeight: FontWeight.w500,
              ),
            ),
            const SizedBox(height: 4),
            Text(
              value,
              style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w500),
            ),
          ],
        ),
        trailing:
            enabled
                ? IconButton(
                  icon: const Icon(Icons.edit_outlined, size: 20),
                  color: AppTheme.primaryColor,
                  onPressed:
                      () => _showEditDialog(context, label, value, onEdit),
                )
                : null,
        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      ),
    );
  }

  // Updated location field to match the new design without the leading icon
  Widget _buildLocationField(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 16),
      decoration: BoxDecoration(
        color: Colors.grey.shade50,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: Colors.grey.shade200),
      ),
      child: ListTile(
        // Remove the leading icon
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Home Location',
              style: TextStyle(
                fontSize: 12,
                color: Colors.grey,
                fontWeight: FontWeight.w500,
              ),
            ),
            const SizedBox(height: 4),
            Text(
              _homeLocation != null
                  ? (_homeLocation!.streetAddress?.isNotEmpty ?? false
                      ? _homeLocation!.streetAddress!
                      : _homeLocation!.name)
                  : 'No home location set',
              style: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.w500,
                fontStyle:
                    _homeLocation == null ? FontStyle.italic : FontStyle.normal,
                color: _homeLocation == null ? Colors.grey : Colors.black,
              ),
            ),
          ],
        ),
        trailing: IconButton(
          icon: Icon(
            _homeLocation != null ? Icons.edit_location : Icons.add_location,
            color: AppTheme.primaryColor,
          ),
          onPressed:
              () =>
                  _navigateToLocationSelection(initialLocation: _homeLocation),
        ),
        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      ),
    );
  }

  void _showEditDialog(
    BuildContext context,
    String fieldName,
    String currentValue,
    Function(String) onEdit,
  ) {
    final TextEditingController controller = TextEditingController(
      text: currentValue,
    );

    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text(
            'Edit $fieldName',
            style: const TextStyle(fontSize: 18, color: AppTheme.primaryColor),
          ),
          content: TextField(
            controller: controller,
            decoration: InputDecoration(hintText: 'Enter new $fieldName'),
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.of(context).pop(),
              child: const Text('Cancel'),
            ),
            TextButton(
              onPressed: () {
                if (controller.text.isNotEmpty) {
                  onEdit(controller.text);
                  Navigator.of(context).pop();
                }
              },
              child: const Text('Save'),
            ),
          ],
        );
      },
    );
  }

  Future<void> _handleFieldUpdate(String fieldName, String newValue) async {
    UpdateUserDto? data;
    String displayFieldName = fieldName;
    switch (fieldName) {
      case 'firstName':
        data = UpdateUserDto(firstName: newValue);
        displayFieldName = 'First Name';
        break;
      case 'lastName':
        data = UpdateUserDto(lastName: newValue);
        displayFieldName = 'Last Name';
        break;
      case 'email':
        data = UpdateUserDto(email: newValue);
        displayFieldName = 'Email';
        break;
      default:
        return;
    }

    try {
      await _profileService.updateUserProfile(data);
      await _loadUserInfo(); // Reload user info to reflect the changes
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('$displayFieldName updated successfully!')),
        );
      }
    } catch (error) {
      _logger.d('Error updating $displayFieldName: $error');
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('An error occurred while updating.')),
        );
      }
    }
  }
}

extension StringCasingExtension on String {
  String capitalize() =>
      length > 0 ? '${this[0].toUpperCase()}${substring(1).toLowerCase()}' : '';
}
