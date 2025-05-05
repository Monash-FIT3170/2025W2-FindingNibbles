import 'package:flutter/material.dart';

class LogoutWidget extends StatelessWidget {
  final VoidCallback onLogout;

  const LogoutWidget({Key? key, required this.onLogout}) : super(key: key);

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
        onTap: onLogout,
      ),
    );
  }
}
