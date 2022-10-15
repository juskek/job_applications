import 'package:fitbit_weight_selector_2022/data/i_weight_repository.dart';
import 'package:fitbit_weight_selector_2022/index.dart';
import 'package:fitbit_weight_selector_2022/ui/components/weight_units_selector.dart';
import 'package:fitbit_weight_selector_2022/ui/home_page.dart';
import 'package:fitbit_weight_selector_2022/ui/home_page_view_model.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mockito/mockito.dart';

void testDemoPage() {
  setUpAll(() {
    configureDependencyInjection(Env.mock);
  });
  testWidgets('DemoPage', (WidgetTester tester) async {
    var weightRepository = getIt<IWeightRepository>();
    when(weightRepository.weightKg).thenReturn(0.0);

    await tester.pumpWidget(
      MaterialApp(
        builder: (context, child) => MultiProvider(
          providers: [
            ChangeNotifierProvider(
                create: (context) => getIt<HomePageViewModel>()),
          ],
          child: MyHomePage(),
        ),
      ),
    );

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
  });
}
