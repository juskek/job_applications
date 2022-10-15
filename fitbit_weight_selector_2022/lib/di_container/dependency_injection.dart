import 'package:fitbit_weight_selector_2022/di_container/dependency_injection.config.dart';
import 'package:get_it/get_it.dart';
import 'package:injectable/injectable.dart';

final getIt = GetIt.instance;

@InjectableInit(
  initializerName: r'$initGetIt', // default
  preferRelativeImports: true, // default
  asExtension: false, // default
)
void configureDependencyInjection(String environment) =>
    $initGetIt(getIt, environment: environment);

abstract class Env {
  static const prod = 'prod';
  static const mock = 'mock';
}
