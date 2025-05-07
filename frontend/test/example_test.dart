import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

class CounterWidget extends StatefulWidget {
  const CounterWidget({super.key});

  @override
  CounterWidgetState createState() => CounterWidgetState();
}

class CounterWidgetState extends State<CounterWidget> {
  int _counter = 0;

  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: <Widget>[
        Text('Counter Value:'),
        Text(
          '$_counter',
          style: Theme.of(context).textTheme.headlineMedium,
          key: const Key('counter_value'),
        ),
        ElevatedButton(
          onPressed: _incrementCounter,
          key: const Key('increment_button'),
          child: const Text('Increment'),
        ),
      ],
    );
  }
}

void main() {
  group('Unit Tests', () {
    test('String operations example', () {
      final recipeTitle = 'Pasta Carbonara';
      expect(recipeTitle.contains('Pasta'), isTrue);
      expect(recipeTitle.toLowerCase(), equals('pasta carbonara'));
    });
  });

  group('Widget Tests', () {
    testWidgets('Counter increments when button is tapped', (
      WidgetTester tester,
    ) async {
      // Build our widget
      await tester.pumpWidget(
        const MaterialApp(home: Scaffold(body: CounterWidget())),
      );

      // Verify initial state
      expect(find.text('0'), findsOneWidget);
      expect(find.text('1'), findsNothing);

      // Tap the increment button
      await tester.tap(find.byKey(const Key('increment_button')));
      // Rebuild the widget with the new state
      await tester.pump();

      // Verify the counter incremented
      expect(find.text('0'), findsNothing);
      expect(find.text('1'), findsOneWidget);
    });

    testWidgets('Widget has all expected UI elements', (
      WidgetTester tester,
    ) async {
      // Build our widget
      await tester.pumpWidget(
        const MaterialApp(home: Scaffold(body: CounterWidget())),
      );

      // Check that all expected elements are present
      expect(find.text('Counter Value:'), findsOneWidget);
      expect(find.byType(ElevatedButton), findsOneWidget);
      expect(find.text('Increment'), findsOneWidget);
    });
  });
}
