import 'package:fitbit_weight_selector_2022/index.dart';
import 'package:fitbit_weight_selector_2022/ui/components/weight_units_selector.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:integration_test/integration_test.dart';

import 'package:fitbit_weight_selector_2022/main.dart' as app;

void main() {
  IntegrationTestWidgetsFlutterBinding.ensureInitialized();

  group('end-to-end test', () {
    testWidgets('check basic functionality', (tester) async {
      app.main();
      await tester.pumpAndSettle();

      // init finders
      final unitsFinder = find.byType(WeightUnitsSelector);
      final firstValueFinder = find.byKey(const ValueKey('FirstValuePicker'));
      final secondValueFinder = find.byKey(const ValueKey('SecondValuePicker'));
      final saveFinder = find.byKey(const ValueKey('SaveButton'));

      // find widgets
      expect(unitsFinder, findsOneWidget);
      expect(firstValueFinder, findsOneWidget);
      expect(secondValueFinder, findsOneWidget);
      expect(saveFinder, findsOneWidget);

      // scroll to 7 kg
      await tester.dragUntilVisible(
          find.text('9'), firstValueFinder, const Offset(0, -50));
      await tester.pumpAndSettle();

      // change units to st/lbs
      await tester.tap(unitsFinder);
      await tester.pumpAndSettle();

      // check that it 7 kg =  1 stone and 1.4324 lb = 1 st 1 lb

      expect(find.descendant(of: firstValueFinder, matching: find.text('1')),
          findsOneWidget);
      expect(find.descendant(of: secondValueFinder, matching: find.text('1')),
          findsOneWidget);
    });
  });
}
