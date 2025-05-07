import 'package:flutter/material.dart';
import 'package:nibbles/pages/auth/title_page.dart';
import 'package:nibbles/navigation/app_navigation.dart';

final GlobalKey<NavigatorState> navigatorKey = GlobalKey<NavigatorState>();

void main() {
  runApp(const MainApp());
}

class MainApp extends StatelessWidget {
  const MainApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'FindingNibbles',
      navigatorKey: navigatorKey, // Assign the navigator key
      theme: ThemeData(primarySwatch: Colors.pink),
      initialRoute: '/title',
      routes: {
        '/title': (context) => const TitlePage(),
        '/home': (context) => const AppNavigation(),
      },
    );
  }
}
