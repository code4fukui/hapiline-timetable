//import { GeoCodingJP } from "https://code4fukui.github.io/GeoCodingJP/GeoCodingJP.js";
import { GeoCodingJP } from "https://code4fukui.github.io/fukui_eatsafe/GeoCodingJP.js";
import { CSV } from "https://code4fukui.github.io/CSV/CSV.js";

const data = await CSV.fetchJSON("hapiline-station.csv");
for (const d of data) {
  const ll = await GeoCodingJP.decode(d.住所); 
  console.log(ll);
  Object.assign(d, ll);
}
await Deno.writeTextFile("hapiline-station_pos.csv", CSV.stringify(data));
