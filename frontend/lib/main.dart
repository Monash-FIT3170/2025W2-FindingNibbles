import 'package:flutter/material.dart';
import 'package:nibbles/pages/auth/title_page.dart';
import 'package:nibbles/navigation/app_navigation.dart';

final GlobalKey<NavigatorState> navigatorKey = GlobalKey<NavigatorState>();
const String appName = 'FINDINGNIBBLES';
const String appMotto = 'Find Food Fast';

void main() {
  runApp(const MainApp());
}

class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: appName,
      navigatorKey: navigatorKey,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.pink),
      ),
      initialRoute: '/title',
      routes: {
        '/title':
            (context) => const TitlePage(title: appName, subtitle: appMotto),
        '/home': (context) => const AppNavigation(),
      },
    );
  }
}
