import 'package:fitbit_weight_selector_2022/data/i_weight_repository.dart';
import 'package:fitbit_weight_selector_2022/data/weight_local_data_source.dart';
import 'package:fitbit_weight_selector_2022/di_container/dependency_injection.dart';
import 'package:injectable/injectable.dart';

@Singleton(as: IWeightRepository, env: [Env.prod])
class WeightRepository implements IWeightRepository {
  @override
  double get weightKg => WeightLocalDataSource.weightKg;
  @override
  set weightKg(double _) {
    WeightLocalDataSource.weightKg = _;
  }
}
