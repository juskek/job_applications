import 'package:fitbit_weight_selector_2022/utils/imperial_si_units_converter.dart';
import 'package:flutter_test/flutter_test.dart';

void testImperialSIConversion() {
  group('testImperialSIConversion', () {
    test('testStonePoundsToKg', () {
      final kg = stonePoundsToKg(const StonePounds(11, 4));
      // should be 71.6676 kg
      expect(kg.toStringAsPrecision(4), 71.66.toStringAsPrecision(4));
    });

    test('testKgToStonePoundsRoundUp', () {
      final stonePounds = kgToStonePounds(62.5);
      // should be 9 stone and 11.7889 lb
      expect(stonePounds.stone, 9);
      expect(stonePounds.pounds, 12); // rounded  up to 12
    });
    test('testKgToStonePoundsRoundDown', () {
      final stonePounds = kgToStonePounds(62.3);
      // should be 9 stone and 11.348 lb
      expect(stonePounds.stone, 9);
      expect(stonePounds.pounds, 11); // rounded down to 11
    });
  });
}
