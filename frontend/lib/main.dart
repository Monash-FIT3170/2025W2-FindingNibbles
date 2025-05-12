import 'package:flutter/material.dart';
import 'package:nibbles/pages/auth/title_page.dart';
import 'package:nibbles/navigation/app_navigation.dart';
import 'package:nibbles/service/auth/auth_service.dart';

final GlobalKey<NavigatorState> navigatorKey = GlobalKey<NavigatorState>();
const String appName = 'FINDINGNIBBLES';
const String appMotto = 'Find Food Fast';

void main() async {
  // Ensure that all services are initialised before running this section.
  // Used when there are services that are running asynchronously.
  WidgetsFlutterBinding.ensureInitialized();

  // check if the user is authenticated
  final authService = AuthService();
  final bool isAuthenticated = await authService.checkLoginStatus();
  runApp(MainApp(isAuthenticated: isAuthenticated));
}

class MainApp extends StatelessWidget {
  final bool isAuthenticated;
  const MainApp({super.key, required this.isAuthenticated});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: appName,
      navigatorKey: navigatorKey,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.pink),
      ),
      initialRoute: isAuthenticated ? '/home' : '/title',
      routes: {
        '/title':
            (context) => const TitlePage(title: appName, subtitle: appMotto),
        '/home': (context) => const AppNavigation(),
      },
    );
  }
}
