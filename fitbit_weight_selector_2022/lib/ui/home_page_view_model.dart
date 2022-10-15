import 'package:fitbit_weight_selector_2022/data/i_weight_repository.dart';
import 'package:fitbit_weight_selector_2022/index.dart';
import 'package:fitbit_weight_selector_2022/utils/imperial_si_units_converter.dart';

@Singleton()
class HomePageViewModel extends ChangeNotifier {
  HomePageViewModel(this.weightRepository);
  final IWeightRepository weightRepository;
  bool _imperialUnits = false; // false is kg, true is pounds
  bool get imperialUnits => _imperialUnits;
  double get savedWeightKg => weightRepository.weightKg;

  /// Limits to show on picker
  final int minKg = 0;
  final int maxKg = 200;

  final int minKgDec = 0;
  final int maxKgDec = 9;

  final int minSt = 0;

  final int minLbs = 0;

  late int maxSt; // depends on maxKg
  late int maxLbs;

  late double maxWeightKg;
  late StonePounds maxWeightStLbs;

  set imperialUnits(bool _) {
    _imperialUnits = _;

    notifyListeners();
  }

  void initValues() {
    _siFirstValue = savedWeightKg.toInt();
    _siSecondValue = ((savedWeightKg - _siFirstValue) * 10).toInt();

    maxWeightKg = maxKg + maxKgDec / 10;
    maxWeightStLbs = kgToStonePounds(maxWeightKg);
    maxSt = maxWeightStLbs.stone;

    updateLbsLimits(kgToStonePounds(savedWeightKg).stone);
  }

  //! kg whole
  int _siFirstValue = 0; // what is shown on ui, can be in kg or stone/lbs
  int get siFirstValue => _siFirstValue;
  set siFirstValue(int _) {
    // update kg whole number
    _siFirstValue = _;
    // update stone and pounds as well
    StonePounds stonePounds =
        kgToStonePounds(_siFirstValue + (_siSecondValue / 10));
    _imperialFirstValue = stonePounds.stone;
    _imperialSecondValue = stonePounds.pounds;
    setSelectedWeight();

    notifyListeners();
  }

  //! kg decimal
  int _siSecondValue = 0;
  int get siSecondValue => _siSecondValue;

  set siSecondValue(int _) {
    // update kg dec number
    _siSecondValue = _;
    // update stone and pounds as well
    StonePounds stonePounds =
        kgToStonePounds(_siFirstValue + (_siSecondValue / 10));
    _imperialFirstValue = stonePounds.stone;
    _imperialSecondValue = stonePounds.pounds;
    setSelectedWeight();

    notifyListeners();
  }

  //! Stone
  int _imperialFirstValue = 0; // what is shown on ui, can be in kg or stone/lbs
  int get imperialFirstValue => _imperialFirstValue;

  set imperialFirstValue(int _) {
    updateLbsLimits(_);
    // update imperial stone
    _imperialFirstValue = _;
    // update kg int and decimal as well
    double kg =
        stonePoundsToKg(StonePounds(_imperialFirstValue, _imperialSecondValue));
    _siFirstValue = kg.floor();
    _siSecondValue = ((kg % _siFirstValue) * 10).round();
    setSelectedWeight();

    notifyListeners();
  }

  //! Pounds
  int _imperialSecondValue = 0;
  int get imperialSecondValue => _imperialSecondValue;
  set imperialSecondValue(int _) {
    // update imperial pounds
    _imperialSecondValue = _;
    // update kg int and decimal as well
    double kg =
        stonePoundsToKg(StonePounds(_imperialFirstValue, _imperialSecondValue));
    _siFirstValue = kg.floor();
    _siSecondValue = (kg % _siFirstValue).roundToDouble().toInt();
    setSelectedWeight();
    notifyListeners();
  }

  double selectedWeightKg = 0;
  StonePounds selectedWeightStLbs = const StonePounds(0, 0);

  void setSelectedWeight() {
    selectedWeightKg = siFirstValue + (siSecondValue / 10);
    selectedWeightStLbs = StonePounds(imperialFirstValue, imperialSecondValue);
  }

  void updateLbsLimits(int currentSt) {
    // correct max Lbs display if on maxSt so that it does not exceed the maxKg when changing back
    if (currentSt == maxSt) {
      maxLbs = maxWeightStLbs.pounds;
    } else {
      maxLbs = 13;
    }
    notifyListeners();
  }

  void saveInDataSource() {
    weightRepository.weightKg = selectedWeightKg;
    notifyListeners();
  }
}
