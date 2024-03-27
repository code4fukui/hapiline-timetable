import { fetchOrLoad } from "https://js.sabae.cc/fetchOrLoad.js";
import { HTMLParser } from "https://js.sabae.cc/HTMLParser.js";
import { CSV } from "https://code4fukui.github.io/CSV/CSV.js";

const scrapeStation = async (url) => {
  if (!url) return {};
  const html = await fetchOrLoad(url);
  const dom = HTMLParser.parse(html);

  /*
                            <div class="BlockHeader">
                <h1 class="CurrentStation StationName">
                  <span class="Main">敦賀</span>
                  <span class="Kana">つるが</span>
                  <span class="Romaji">Tsuruga</span>
                </h1>
  
                <script>
                var tmp_st_name = $('.StationBlock .BlockHeader .CurrentStation .Main');
                tmp_st_name.addClass('length' + tmp_st_name.text().length);
                </script>

                <ul class="PrevNextStation StationList">
                  <li class="PrevStation">
                                      </li>
                  <li class="NextStation">
                                        <a href="./2">
                      <span class="Icon icon-triangle-right add-icons"></span>
                      <span class="Label StationName">
                        <span class="Kana">みなみいまじょう</span>
                        <span class="Romaji">Minami-Imajo</span>
                      </span>
                    </a>
  */
  const res = {};
  res.id = dom.querySelector("h1.CurrentStation .Romaji").text;
  res.name = dom.querySelector("h1.CurrentStation .Main").text;
  res.kana = dom.querySelector("h1.CurrentStation .Kana").text;

  res.previd = dom.querySelector("li.PrevStation .Romaji")?.text;
  res.nextid = dom.querySelector("li.NextStation .Romaji")?.text;

  const trs = dom.querySelectorAll("main.PageContents tr");
  for (const tr of trs) {
    const ths = tr.querySelectorAll("th");
    const tds = tr.querySelectorAll("td");
    for (let i = 0; i < ths.length; i++) {
      const th = ths[i];
      const td = tds[i];
      const name = th.text.trim();
      const val = td.text.trim();
      if (name) res[name] = val;
    }
  }
  console.log(res);
  return res;
};

const data = await CSV.fetchJSON("hapiline-station_src.csv");
for (const d of data) {
  const url = d.出典URL;
  const d2 = await scrapeStation(url);
  console.log(d2);
  delete d.出典URL;
  Object.assign(d, d2);
  d.時刻表URL = "https://trainlocation.hapi-line.co.jp/timetable/" + d.id;
  d.出典URL = url;
}
await Deno.writeTextFile("hapiline-station.csv", CSV.stringify(data));
