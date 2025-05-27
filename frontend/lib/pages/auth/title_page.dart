import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:nibbles/pages/auth/login_page.dart';
import 'package:nibbles/pages/auth/create_account_page.dart';
import 'package:nibbles/theme/app_theme.dart';

class TitlePage extends StatelessWidget {
  final String title;
  final String subtitle;

  const TitlePage({super.key, required this.title, required this.subtitle});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.colorScheme.primary,
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 24),
          child: Column(
            children: [
              const SizedBox(height: 200),
              // logo
              SvgPicture.asset(
                'assets/images/FindingNibbles.svg',
                height: 100,
                colorFilter: ColorFilter.mode(
                  AppTheme.colorScheme.onPrimary,
                  BlendMode.srcIn,
                ),
              ),
              const SizedBox(height: 120),
              // headline
              Text(
                'Join the foodie revolution!',
                style: AppTheme.textTheme.headlineSmall,
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 16),
              // description
              Text(
                'AI-powered dining decisions - so you never have to “nibble” on indecision again',
                style: AppTheme.textTheme.bodyMedium,
                textAlign: TextAlign.center,
              ),
              const Spacer(),
              // Sign In button (outlined)
              SizedBox(
                width: double.infinity,
                child: OutlinedButton(
                  onPressed:
                      () => Navigator.push(
                        context,
                        MaterialPageRoute(builder: (_) => LoginPage()),
                      ),
                  child: const Text('SIGN IN'),
                ),
              ),
              const SizedBox(height: 12),
              // Register button (filled)
              SizedBox(
                width: double.infinity,
                child: ElevatedButton(
                  onPressed:
                      () => Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (_) => const CreateAccountPage(),
                        ),
                      ),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: AppTheme.colorScheme.surface,
                    foregroundColor: AppTheme.colorScheme.onSurface,
                    padding: const EdgeInsets.symmetric(vertical: 16),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(38),
                    ),
                  ),
                  child: const Text('REGISTER'),
                ),
              ),
              const SizedBox(height: 40),
            ],
          ),
        ),
      ),
    );
  }
}
