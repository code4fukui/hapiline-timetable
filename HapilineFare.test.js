import * as t from "https://deno.land/std/testing/asserts.ts";
import { HapilineFare } from "./HapilineFare.js";

const fare = await HapilineFare.create();

Deno.test("simple", () => {
  t.assertEquals(fare.getFare("鯖江", "武生"), 220);
  t.assertEquals(fare.getFare("鯖江", "敦賀"), 890);
});
Deno.test("reverse", () => {
  t.assertEquals(fare.getFare("鯖江", "福井"), 280);
  t.assertEquals(fare.getFare("鯖江", "北鯖江"), 220);
  t.assertEquals(fare.getFare("敦賀", "鯖江"), 890);
});
Deno.test("same", () => {
  t.assertEquals(fare.getFare("鯖江", "鯖江"), null);
});
Deno.test("illegal", () => {
  t.assertEquals(fare.getFare("鯖江", "東京"), null);
});
