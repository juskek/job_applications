abstract class WeightLocalDataSource {
  /// This class represents a data source, in this case
  /// weight is simplified as a constant int in kg.
  ///
  /// In production this class will work in tandem with a remote data source,
  /// e.g. WeightRemoteDataSource which interacts with an external API to
  /// retrieve and sync data.
  static double weightKg = 0.0;
}
