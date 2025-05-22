import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class LogoutWidget extends StatelessWidget {
  final VoidCallback onLogout;

  const LogoutWidget({Key? key, required this.onLogout}) : super(key: key);

  Future<void> _handleLogout(BuildContext context) async {
    const storage = FlutterSecureStorage();

    try {
      // Clear Authentication Tokens
      await storage.delete(key: 'access_token');
      await storage.delete(key: 'refresh_token');

      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('You have been logged out successfully.'),
          duration: Duration(seconds: 2),
        ),
      );
    } catch (e) {
      print('Error clearing tokens: $e');
    } finally {
      // Redirect to Login/Title Screen
      Navigator.pushNamedAndRemoveUntil(context, '/title', (route) => false);
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
