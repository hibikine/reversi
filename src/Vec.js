/**
 * ベクトルクラス
 */
export default class Vec {
  constructor(x = 0, y = 0){
    this.x = x;
    this.y = y;
  }

  /**
   * 加算
   */
  add(vec) {
    return new Vec(this.x + vec.x, this.y + vec.y);
  }

  /**
   * 減算
   */
  sub(vec) {
    return new Vec(this.x - vec.x, this.y - vec.y);
  }

  /**
   * 複製
   */
  clone() {
    return new Vec(this.x, this.y);
  }
}
