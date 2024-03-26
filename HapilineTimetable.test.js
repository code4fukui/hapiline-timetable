import * as t from "https://deno.land/std/testing/asserts.ts";
import { HapilineTimetable } from "./HapilineTimetable.js";
import { Time } from "https://js.sabae.cc/DateTime.js";

const tt = await HapilineTimetable.create();

Deno.test("simple", async () => {
  const res = tt.getTrains("鯖江", "福井");
  const chk = {
    "始発駅": "敦賀",
    "敦賀_発": "5:32",
    "敦賀_着": "",
    "方向": "下り",
    "武生_発": "6:03",
    "武生_着": "6:03",
    "福井_発": "",
    "福井_着": "6:23",
    "終着駅": "芦原温泉",
    "鯖江_発": "6:09",
    "鯖江_着": "6:08",
     ID: "1221M",
  };
  t.assertEquals(res.length, 38);
  t.assertEquals(res[0], chk);
});
Deno.test("reverse", async () => {
  const res = tt.getTrains("福井", "鯖江");
  const chk = {
    "始発駅": "福井",
    "敦賀_発": "",
    "敦賀_着": "6:13",
    "方向": "上り",
    "武生_発": "5:41",
    "武生_着": "5:41",
    "福井_発": "5:21",
    "福井_着": "",
    "終着駅": "敦賀",
    "鯖江_発": "5:36",
    "鯖江_着": "5:36",
    ID: "1220M",
  };
  t.assertEquals(res.length, 39);
  t.assertEquals(res[0], chk);
});
Deno.test("tsuruga", async () => {
  const res = tt.getTrains("鯖江", "敦賀");
  t.assertEquals(res.length, 30);
});
Deno.test("tsuruga reverse", async () => {
  const res = tt.getTrains("敦賀", "鯖江");
  t.assertEquals(res.length, 29);
});
Deno.test("not yet", async () => {
  t.assertEquals(tt.getTrains("今庄", "福井"), []);
});
Deno.test("same", async () => {
  t.assertEquals(tt.getTrains("福井", "福井"), []);
});
Deno.test("getNextTrains", async () => {
  const chk = {
    "始発駅": "福井",
    "敦賀_発": "",
    "敦賀_着": "8:57",
    "方向": "上り",
    "武生_発": "8:27",
    "武生_着": "8:26",
    "福井_発": "8:06",
    "福井_着": "",
    "終着駅": "敦賀",
    "鯖江_発": "8:22",
    "鯖江_着": "8:21",
    ID: "1226M",
  };
  t.assertEquals(tt.getNextTrains("鯖江", "敦賀", 1, new Time("08:20").toMinutes()), [chk]);
});
Deno.test("not yet", async () => {
  t.assertEquals(tt.getStations(), ["福井", "鯖江", "武生", "敦賀"]);
});
