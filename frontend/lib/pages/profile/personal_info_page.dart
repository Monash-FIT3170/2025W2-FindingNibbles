import 'package:flutter/material.dart';
import 'package:nibbles/service/auth/auth_service.dart';
import 'package:nibbles/service/profile/profile_service.dart';
import 'package:nibbles/service/profile/user_dto.dart';
import 'package:nibbles/core/logger.dart';
import 'package:nibbles/pages/profile/change_password_page.dart';

class PersonalInfoPage extends StatefulWidget {
  const PersonalInfoPage({super.key});

  @override
  PersonalInfoPageState createState() => PersonalInfoPageState();
}

class PersonalInfoPageState extends State<PersonalInfoPage> {
  final AuthService _authService = AuthService();
  final ProfileService _profileService = ProfileService();
  late Future<Map<String, dynamic>> _personalInfo;
  final _logger = getLogger();

  @override
  void initState() {
    super.initState();
    _loadUserInfo();
  }

  Future<void> _loadUserInfo() async {
    _personalInfo = _authService.getUserProfile();
    setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;

    return Scaffold(
      backgroundColor: colorScheme.primary,
      appBar: AppBar(
        backgroundColor: colorScheme.primary,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: Colors.white),
          onPressed: () => Navigator.pop(context),
        ),
        title: const Text(
          'Personal Info',
          style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
        ),
      ),
      body: FutureBuilder<Map<String, dynamic>>(
        future: _personalInfo,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(
              child: CircularProgressIndicator(color: Colors.white),
            );
          } else if (snapshot.hasError) {
            return Center(
              child: Text(
                'Error: ${snapshot.error}',
                style: const TextStyle(color: Colors.white),
              ),
            );
          } else if (!snapshot.hasData) {
            return const Center(
              child: Text(
                'No user details found.',
                style: TextStyle(color: Colors.white),
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
                      Container(
                        width: 120,
                        height: 120,
                        decoration: BoxDecoration(
                          color: Colors.white.withOpacity(0.3),
                          shape: BoxShape.circle,
                        ),
                        child: ClipOval(
                          child: Icon(
                            Icons.person,
                            size: 80,
                            color: Colors.white.withOpacity(0.8),
                          ),
                        ),
                      ),
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
                    color: Colors.white,
                    borderRadius: BorderRadius.only(
                      topLeft: Radius.circular(32),
                      topRight: Radius.circular(32),
                    ),
                  ),
                  child: SingleChildScrollView(
                    child: Padding(
                      padding: const EdgeInsets.all(16.0),
                      child: Column(
                        children: [
                          _buildInfoField(
                            context,
                            'First Name',
                            user['firstName'] ?? 'Example First Name',
                            onEdit:
                                (value) =>
                                    _handleFieldUpdate('firstName', value),
                          ),
                          _buildDivider(),
                          _buildInfoField(
                            context,
                            'Last Name',
                            user['lastName'] ?? 'Example Last Name',
                            onEdit:
                                (value) =>
                                    _handleFieldUpdate('lastName', value),
                          ),
                          _buildDivider(),
                          _buildInfoField(
                            context,
                            'Email',
                            user['email'] ?? 'example@mail.com',
                            onEdit:
                                (value) => _handleFieldUpdate('email', value),
                          ),
                          _buildDivider(),

                          // Change Password button
                          const SizedBox(height: 32),
                          SizedBox(
                            width: double.infinity,
                            child: ElevatedButton(
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
                                backgroundColor: Colors.grey.shade500,
                                foregroundColor: Colors.white,
                                shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(12),
                                ),
                                padding: const EdgeInsets.symmetric(
                                  vertical: 16,
                                ),
                              ),
                              child: Row(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: [
                                  const Text('Change Password'),
                                  const SizedBox(width: 8),
                                  Icon(Icons.lock, size: 20),
                                ],
                              ),
                            ),
                          ),
                          const SizedBox(height: 24),
                        ],
                      ),
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

  Widget _buildInfoField(
    BuildContext context,
    String label,
    String value, {
    required Function(String) onEdit,
  }) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 12.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            label,
            style: TextStyle(
              color: Theme.of(context).colorScheme.primary,
              fontSize: 16,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 4),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                value,
                style: TextStyle(fontSize: 16, color: Colors.grey.shade600),
              ),
              IconButton(
                icon: Icon(
                  Icons.edit,
                  color: Theme.of(context).colorScheme.primary,
                  size: 20,
                ),
                onPressed: () => _showEditDialog(context, label, value, onEdit),
              ),
            ],
          ),
        ],
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
          title: Text('Edit $fieldName'),
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

  Widget _buildDivider() {
    return const Divider(thickness: 1);
  }

  Future<void> _handleFieldUpdate(String fieldName, String newValue) async {
    UpdateUserDto? data;
    switch (fieldName) {
      case 'firstName':
        data = UpdateUserDto(firstName: newValue);
        break;
      case 'lastName':
        data = UpdateUserDto(lastName: newValue);
        break;
      case 'email':
        data = UpdateUserDto(email: newValue);
        break;
      default:
        return;
    }

    try {
      await _profileService.updateUserProfile(data);
      _loadUserInfo(); // Reload user info to reflect the changes
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('$fieldName updated successfully!')),
        );
      }
    } catch (error) {
      _logger.d('Error updating $fieldName: $error');
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
