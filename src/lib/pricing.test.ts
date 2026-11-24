import { test } from "node:test";
import assert from "node:assert/strict";
import { quote, formatUsd, isVolume } from "./pricing.ts";

test("hasta 3 usuarios mensual pagan solo el plan", () => {
  assert.equal(quote(1, "mensual").total, 65);
  const q = quote(3, "mensual");
  assert.equal(q.extraUsers, 0);
  assert.equal(q.total, 65);
});

test("5 usuarios mensual: 2 adicionales a $10", () => {
  const q = quote(5, "mensual");
  assert.equal(q.extraUsers, 2);
  assert.equal(q.extraCost, 20);
  assert.equal(q.total, 85);
  assert.equal(q.perMonth, 85);
});

test("5 usuarios anual: plan $650 + 2 adicionales a $100", () => {
  const q = quote(5, "anual");
  assert.equal(q.base, 650);
  assert.equal(q.extraCost, 200);
  assert.equal(q.total, 850);
  assert.ok(Math.abs(q.perMonth - 70.8333) < 0.001);
});

test("10 usuarios todavía se cotizan; más de 10 es precio por volumen", () => {
  assert.equal(isVolume(10), false);
  assert.equal(quote(10, "mensual").total, 135);
  assert.equal(isVolume(11), true);
});

test("formatUsd: enteros sin decimales, fracciones con dos", () => {
  assert.equal(formatUsd(25), "$25");
  assert.equal(formatUsd(350 / 12), "$29.17");
});
