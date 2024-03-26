import { CSV } from "https://code4fukui.github.io/CSV/CSV.js";
import { Time } from "https://js.sabae.cc/DateTime.js";

export class HapilineTimetable {
  static async create() {
    const data = await CSV.fetchJSON("hapiline-timetable.csv");
    return new HapilineTimetable(data);
  }
  constructor(data) {
    this.data = data;
  }
  getTrains(fromstation, tostation) {
    return this.data.filter(i => {
      const from = i[fromstation + "_発"];
      const to = i[tostation + "_着"];
      if (!from || !to) return false;
      const fromt = new Time(from);
      const tot = new Time(to);
      const d = tot.toMinutes() - fromt.toMinutes();
      //console.log(fromstation, tostation, d, i.ID, i.方向);
      return d >= 0 || d < -22 * 60;
    });
  }
  getNextTrains(fromstation, tostation, maxlen = 3, nowm) {
    const trs = this.getTrains(fromstation, tostation);
    const now = nowm || new Time().quantizeMinutes().toMinutes();
    const res = trs.filter(i => {
      const from = i[fromstation + "_発"];
      const fromt = new Time(from);
      const d = now - fromt.toMinutes();
      return d <= 0;
    });
    if (res.length > maxlen) res.length = maxlen;
    return res;
  }
  getStations() {
    const v = this.data[0];
    const res = new Set();
    for (const name in v) {
      if (name.endsWith("_発") || name.endsWith("_着")) {
        const st = name.substring(0, name.length - 2);
        res.add(st);
      }
    }
    return Array.from(res);
  }
};
