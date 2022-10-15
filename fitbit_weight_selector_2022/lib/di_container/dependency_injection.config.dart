// GENERATED CODE - DO NOT MODIFY BY HAND

// **************************************************************************
// InjectableConfigGenerator
// **************************************************************************

// ignore_for_file: no_leading_underscores_for_library_prefixes
import 'package:get_it/get_it.dart' as _i1;
import 'package:injectable/injectable.dart' as _i2;

import '../data/i_weight_repository.dart' as _i3;
import '../data/mock_weight_repository.dart' as _i4;
import '../data/weight_repository.dart' as _i5;
import '../ui/home_page_view_model.dart' as _i6;

const String _mock = 'mock';
const String _prod = 'prod';
// ignore_for_file: unnecessary_lambdas
// ignore_for_file: lines_longer_than_80_chars
/// initializes the registration of provided dependencies inside of [GetIt]
_i1.GetIt $initGetIt(
  _i1.GetIt get, {
  String? environment,
  _i2.EnvironmentFilter? environmentFilter,
}) {
  final gh = _i2.GetItHelper(
    get,
    environment,
    environmentFilter,
  );
  gh.singleton<_i3.IWeightRepository>(
    _i4.MockWeightRepository(),
    registerFor: {_mock},
  );
  gh.singleton<_i3.IWeightRepository>(
    _i5.WeightRepository(),
    registerFor: {_prod},
  );
  gh.singleton<_i6.HomePageViewModel>(
      _i6.HomePageViewModel(get<_i3.IWeightRepository>()));
  return get;
}
