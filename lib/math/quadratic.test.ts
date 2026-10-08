import assert from "node:assert/strict";
import { test } from "node:test";
import { analyze } from "./quadratic.ts";
import { compareFractions } from "./fractions.ts";
import { formatMath, formatSignedTerm } from "./format.ts";

test("معادلة تربيعية بحلّين", () => {
  assert.deepEqual(analyze(1, -2, -3), {
    kind: "quadratic",
    discriminant: 16,
    roots: [-1, 3],
    vertex: { x: 1, y: -4 },
  });
});

test("الجذور مرتبة حتى مع a سالبة", () => {
  const result = analyze(-1, 0, 4);
  assert.equal(result.kind, "quadratic");
  assert.deepEqual(result.kind === "quadratic" && result.roots, [-2, 2]);
});

test("حل مكرر، وبلا حلول حقيقية", () => {
  const repeated = analyze(1, -2, 1);
  assert.deepEqual(repeated.kind === "quadratic" && repeated.roots, [1]);
  const none = analyze(1, 0, 1);
  assert.deepEqual(none.kind === "quadratic" && none.roots, []);
});

test("المستقيم والثابت", () => {
  assert.deepEqual(analyze(0, 2, 6), { kind: "linear", roots: [-3] });
  assert.deepEqual(analyze(0, 0, 5), { kind: "constant" });
});

test("مقارنة الكسور", () => {
  assert.equal(compareFractions(3, 4, 5, 8), ">");
  assert.equal(compareFractions(1, 2, 2, 4), "=");
  assert.equal(compareFractions(1, 3, 1, 2), "<");
});

test("تنسيق الأعداد", () => {
  assert.equal(formatMath(-1.456), "−1.46");
  assert.equal(formatMath(-0.001), "0");
  assert.equal(formatSignedTerm(-3), "− 3");
  assert.equal(formatSignedTerm(2), "+ 2");
});
