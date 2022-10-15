import 'package:animated_toggle_switch/animated_toggle_switch.dart';
import 'package:fitbit_weight_selector_2022/index.dart';
import 'package:fitbit_weight_selector_2022/ui/home_page_view_model.dart';

class WeightUnitsSelector extends StatelessWidget {
  const WeightUnitsSelector({required this.homePageViewModel, super.key});
  final HomePageViewModel homePageViewModel;
  @override
  Widget build(BuildContext context) {
    return Selector<HomePageViewModel, bool>(
      selector: (p0, p1) => p1.imperialUnits,
      builder: (context, value, child) => AnimatedToggleSwitch<bool>.dual(
        current: homePageViewModel.imperialUnits,
        first: false,
        second: true,
        dif: 50.0,
        borderColor: Colors.transparent,
        borderWidth: 5.0,
        height: 55,
        boxShadow: const [
          BoxShadow(
            color: Colors.black26,
            spreadRadius: 1,
            blurRadius: 2,
            offset: Offset(0, 1.5),
          ),
        ],
        onChanged: (b) => homePageViewModel.imperialUnits = b,
        colorBuilder: (b) => b ? Colors.grey : Colors.grey,
        iconBuilder: (value) => value
            ? const Icon(MdiIcons.weightPound)
            : const Icon(MdiIcons.weightKilogram),
        textBuilder: (value) => value
            ? const Center(child: Text('st/lbs'))
            : const Center(child: Text('kg')),
      ),
    );
  }
}
