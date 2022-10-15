import 'package:fitbit_weight_selector_2022/index.dart';
import 'package:fitbit_weight_selector_2022/ui/components/weight_value_selector.dart';
import 'package:fitbit_weight_selector_2022/ui/home_page_view_model.dart';
import 'package:fitbit_weight_selector_2022/ui/components/weight_units_selector.dart';

class MyHomePage extends StatelessWidget {
  MyHomePage({super.key});
  final HomePageViewModel homePageViewModel = getIt<HomePageViewModel>();

  @override
  Widget build(BuildContext context) {
    homePageViewModel.initValues();
    return Scaffold(
      appBar: AppBar(
        title: const Text('Fitbit Weight Selector Demo'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Selector<HomePageViewModel, double>(
              selector: (p0, p1) => p1.savedWeightKg,
              builder: (context, value, child) => Text(
                  'Weight saved in data source: ${homePageViewModel.savedWeightKg} kg'),
            ),
            const SizedBox(height: 50),
            WeightUnitsSelector(homePageViewModel: homePageViewModel),
            const SizedBox(height: 20),
            WeightValueSelector(homePageViewModel: homePageViewModel),
            const SizedBox(height: 20),
            ElevatedButton(
                key: const ValueKey('SaveButton'),
                onPressed: () => homePageViewModel.saveInDataSource(),
                child: const Text('Save')),
          ],
        ),
      ),
    );
  }
}
