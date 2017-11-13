class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  plus(point) {
    return new Point(point.x + this.x, point.y + this.y)
  }
}
