import 'package:fitbit_weight_selector_2022/data/i_weight_repository.dart';
import 'package:fitbit_weight_selector_2022/index.dart';
import 'package:mockito/mockito.dart';

@Singleton(as: IWeightRepository, env: [Env.mock])
class MockWeightRepository extends Mock implements IWeightRepository {
  @override
  double get weightKg =>
      // ignore: invalid_use_of_visible_for_testing_member
      super.noSuchMethod(Invocation.getter(#weightKg), returnValue: double.nan);
}
