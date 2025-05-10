import 'package:flutter/material.dart';
import 'package:nibbles/pages/auth/login_page.dart';
import 'package:nibbles/pages/auth/create_account_page.dart';

class TitlePage extends StatelessWidget {
  final String title;
  final String subtitle;

  const TitlePage({super.key, required this.title, required this.subtitle});

  @override
  Widget build(BuildContext context) {
    final textTheme = Theme.of(context).textTheme;

    return Scaffold(
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 32),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const SizedBox(),
              Column(
                children: [
                  Text(title, style: textTheme.displayLarge),
                  const SizedBox(height: 4),
                  Text(subtitle, style: textTheme.headlineSmall),
                ],
              ),
              Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  OutlinedButton(
                    onPressed:
                        () => Navigator.push(
                          context,
                          MaterialPageRoute(builder: (context) => LoginPage()),
                        ),
                    child: Text('SIGN IN'),
                  ),
                  const SizedBox(height: 12),
                  ElevatedButton(
                    onPressed:
                        () => Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (_) => const CreateAccountPage(),
                          ),
                        ),
                    child: Text('REGISTER'),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
