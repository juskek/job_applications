import 'package:fitbit_weight_selector_2022/index.dart';
import 'package:fitbit_weight_selector_2022/ui/home_page_view_model.dart';
import 'package:numberpicker/numberpicker.dart';
import 'package:tuple/tuple.dart';

class WeightValueSelector extends StatelessWidget {
  const WeightValueSelector({required this.homePageViewModel, super.key});
  final HomePageViewModel homePageViewModel;
  @override
  Widget build(BuildContext context) {
    return Selector<HomePageViewModel, Tuple5>(
      selector: (p0, p1) => Tuple5(p1.imperialUnits, p1.imperialFirstValue,
          p1.imperialSecondValue, p1.siFirstValue, p1.siSecondValue),
      builder: (context, value, child) => Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Center(
            child: NumberPicker(
              key: const ValueKey('FirstValuePicker'),
              haptics: true,
              value: homePageViewModel.imperialUnits
                  ? homePageViewModel.imperialFirstValue
                  : homePageViewModel.siFirstValue,
              minValue: homePageViewModel.imperialUnits
                  ? homePageViewModel.minSt
                  : homePageViewModel.minKg,
              maxValue: homePageViewModel.imperialUnits
                  ? homePageViewModel.maxSt
                  : homePageViewModel.maxKg,
              onChanged: (value) => homePageViewModel.imperialUnits
                  ? homePageViewModel.imperialFirstValue = value
                  : homePageViewModel.siFirstValue = value,
            ),
          ),
          Text(
            homePageViewModel.imperialUnits ? 'st' : '.',
            style: const TextStyle(fontSize: 20, fontWeight: FontWeight.w400),
          ),
          NumberPicker(
            key: const ValueKey('SecondValuePicker'),
            haptics: true,
            value: homePageViewModel.imperialUnits
                ? homePageViewModel.imperialSecondValue
                : homePageViewModel.siSecondValue,
            minValue: homePageViewModel.imperialUnits
                ? homePageViewModel.minLbs
                : homePageViewModel.minKgDec,
            maxValue: homePageViewModel.imperialUnits
                ? homePageViewModel.maxLbs
                : homePageViewModel.maxKgDec,
            onChanged: (value) => homePageViewModel.imperialUnits
                ? homePageViewModel.imperialSecondValue = value
                : homePageViewModel.siSecondValue = value,
          ),
          Text(
            homePageViewModel.imperialUnits ? 'lbs' : 'kg',
            style: const TextStyle(fontSize: 20, fontWeight: FontWeight.w400),
          ),
        ],
      ),
    );
  }
}
