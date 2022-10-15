// There are 6.35kg in one stone, and 14 pounds equal a stone
double stonePoundsToKg(StonePounds stonePounds) {
  return stonePounds.stone * 6.35 + stonePounds.pounds * 0.453592;
}

StonePounds kgToStonePounds(double kg) {
  double pounds = kg * 2.20462;
  int stone = (pounds / 14).floor();
  double remainingPounds = pounds - (stone * 14);
  return StonePounds(stone, remainingPounds.roundToDouble().toInt());
}

class StonePounds {
  final int stone;
  final int pounds;
  const StonePounds(this.stone, this.pounds);

  bool operator >(StonePounds other) {
    int thisWeight = (stone * 14) + pounds;
    int otherWeight = (other.stone * 14) + other.pounds;
    if (thisWeight > otherWeight) {
      return true;
    } else {
      return false;
    }
  }
}
