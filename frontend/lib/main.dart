import 'package:flutter/material.dart';
import 'package:nibbles/pages/auth/title_page.dart';
import 'package:nibbles/navigation/app_navigation.dart';
import 'package:nibbles/service/auth/auth_service.dart';
import 'package:nibbles/theme/app_theme.dart';

final GlobalKey<NavigatorState> navigatorKey = GlobalKey<NavigatorState>();
const String appName = 'FINDINGNIBBLES';
const String appMotto = 'Find Food Fast';

final ThemeData appTheme = ThemeData(
  useMaterial3: true,
  colorScheme: ColorScheme(
    brightness: Brightness.light,
    primary: Color(0xFFB4435C),
    onPrimary: Colors.white,
    secondary: Color(0xFFF4CDD5),
    onSecondary: Colors.black,
    error: Colors.red.shade700,
    onError: Colors.white,
    background: Colors.white,
    onBackground: Colors.black,
    surface: Colors.white,
    onSurface: Colors.black,
  ),
  textTheme: Typography.blackCupertino.apply(
    bodyColor: Colors.black,
    displayColor: Colors.black,
  ),
  scaffoldBackgroundColor: Colors.white,
  appBarTheme: AppBarTheme(
    backgroundColor: Color(0xFFB4435C),
    foregroundColor: Colors.white,
    elevation: 0,
  ),
  elevatedButtonTheme: ElevatedButtonThemeData(
    style: ElevatedButton.styleFrom(
      backgroundColor: Color(0xFFB4435C),
      foregroundColor: Colors.white,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
    ),
  ),
  inputDecorationTheme: InputDecorationTheme(
    border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
    focusedBorder: OutlineInputBorder(
      borderSide: BorderSide(color: Color(0xFFB4435C)),
    ),
  ),
);

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
      theme: AppTheme.themeData, // Use the centralized theme
      initialRoute: isAuthenticated ? '/home' : '/title',
      routes: {
        '/title':
            (context) => const TitlePage(title: appName, subtitle: appMotto),
        '/home': (context) => const AppNavigation(),
      },
    );
  }
}
