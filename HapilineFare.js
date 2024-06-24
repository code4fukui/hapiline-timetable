import { CSV } from "https://code4fukui.github.io/CSV/CSV.js";

export class HapilineFare {
  static async create(base = "./") {
    const fare = await CSV.fetch(base + "hapiline-fare_regular.csv");
    return new HapilineFare(fare);
  }
  constructor(fare) {
    this.fare = fare;
  }
  getFare(fromstation, tostation) {
    if (fromstation == tostation) return null; // 入場料?
    const getY = (st) => this.fare.findIndex(i => i[0] == st || i[1] == st);
    const getX = (st) => this.fare.findIndex(i => {
      for (let j = i.length - 1; j > 0; j--) {
        if (i[j] == st) return true;
      }
      return false;
    });
    const y = getY(fromstation);
    const x = getX(tostation);
    if (x < 0 || y < 0) return null;
    //console.log(x, y, this.fare[y]);
    const n = this.fare[y][x + 1];
    if (n) return parseInt(n);
    const y2 = getY(tostation);
    const x2 = getX(fromstation);
    if (x2 < 0 || y2 < 0) return null;
    //console.log(x2, y2, this.fare[y2]);
    const n2 = this.fare[y2][x2 + 1];
    if (n2) return parseInt(n2);
    return null; // ??
  }
};
