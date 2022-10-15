abstract class IWeightRepository {
  /// This class represents the single source of truth for weight in the app.
  ///
  /// It is an interface which can be implemented as
  double get weightKg;

  set weightKg(double _);
}
