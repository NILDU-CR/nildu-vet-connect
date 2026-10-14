import { test } from "node:test";
import assert from "node:assert/strict";
import { quote, formatUsd } from "./pricing.ts";

test("1 usuario mensual paga solo el plan de lanzamiento", () => {
  const q = quote(1, "mensual");
  assert.equal(q.extraUsers, 0);
  assert.equal(q.total, 25);
  assert.equal(q.regularTotal, 45);
});

test("3 usuarios mensual: 2 adicionales a $5", () => {
  const q = quote(3, "mensual");
  assert.equal(q.extraUsers, 2);
  assert.equal(q.extraCost, 10);
  assert.equal(q.total, 35);
  assert.equal(q.perMonth, 35);
  assert.equal(q.regularTotal, 55);
});

test("3 usuarios anual: plan $250 + 2 adicionales a $50", () => {
  const q = quote(3, "anual");
  assert.equal(q.base, 250);
  assert.equal(q.extraCost, 100);
  assert.equal(q.total, 350);
  assert.ok(Math.abs(q.perMonth - 29.1667) < 0.001);
  assert.equal(q.regularTotal, 550);
});

test("formatUsd: enteros sin decimales, fracciones con dos", () => {
  assert.equal(formatUsd(25), "$25");
  assert.equal(formatUsd(350 / 12), "$29.17");
});
