import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:nibbles/core/logger.dart';

class LogoutWidget extends StatelessWidget {
  final VoidCallback onLogout;

  const LogoutWidget({super.key, required this.onLogout});

  Future<void> _handleLogout(BuildContext context) async {
    const storage = FlutterSecureStorage();
    final logger = getLogger();

    final navigator = Navigator.of(context);
    final scaffoldMessenger = ScaffoldMessenger.of(context);

    try {
      // Clear Authentication Tokens
      await storage.delete(key: 'access_token');
      await storage.delete(key: 'refresh_token');

      scaffoldMessenger.showSnackBar(
        const SnackBar(
          content: Text('You have been logged out successfully.'),
          duration: Duration(seconds: 2),
        ),
      );
    } catch (e) {
      logger.d('Error clearing tokens: $e');
    } finally {
      // Redirect to Login/Title Screen
      navigator.pushNamedAndRemoveUntil('/title', (route) => false);
      onLogout();
    }
  }

  @override
  Widget build(BuildContext context) {
    final primary = Theme.of(context).primaryColor;
    return Card(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: ListTile(
        leading: Container(
          decoration: BoxDecoration(color: primary, shape: BoxShape.circle),
          padding: const EdgeInsets.all(8),
          child: const Icon(Icons.logout, color: Colors.white),
        ),
        title: const Text(
          'Log Out',
          style: TextStyle(fontWeight: FontWeight.bold),
        ),
        trailing: const Icon(Icons.arrow_forward_ios, size: 16),
        onTap: () => _handleLogout(context), // Call _handleLogout
      ),
    );
  }
}
