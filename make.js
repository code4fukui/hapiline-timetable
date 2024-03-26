import { CSV } from "https://js.sabae.cc/CSV.js";

const parse = async (fn) => {
  const data = await CSV.fetch(fn);
  const res = [];
  const dir = data[0][0];
  for (let i = 2; i < data[0].length; i++) {
    const d = {
      ID: data[0][i],
      方向: dir,
      始発駅: data[1][i],
      終着駅: data[2][i],
    };
    for (let j = 3; j < data.length; j++) {
      const st = data[j][0];
      if (!st) break;
      d[st + "_" + data[j][1]] = data[j][i];
    }
    res.push(d);
  }
  return res;
};

const data = [
  ...await parse("hapiline-nobori.csv"),
  ...await parse("hapiline-kudari.csv"),
];
await Deno.writeTextFile("hapiline-timetable.csv", CSV.stringify(data));


