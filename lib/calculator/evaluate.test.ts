import assert from "node:assert/strict";
import { test } from "node:test";
import { CalculatorError, evaluate, formatResult } from "./evaluate.ts";

const close = (actual: number, expected: number) =>
  assert.ok(Math.abs(actual - expected) < 1e-9, `${actual} ≠ ${expected}`);
const failsWith = (expression: string, code: string) =>
  assert.throws(
    () => evaluate(expression),
    (error) => error instanceof CalculatorError && error.code === code,
  );

test("يحترم أولوية العمليات والأقواس", () => {
  assert.equal(evaluate("2+3×4"), 14);
  assert.equal(evaluate("(2+3)×4"), 20);
  assert.equal(evaluate("2×(3+4)^2"), 98);
  assert.equal(evaluate("10÷4"), 2.5);
});

test("الإشارة السالبة والأس", () => {
  assert.equal(evaluate("−3^2"), -9);
  assert.equal(evaluate("(−3)^2"), 9);
  assert.equal(evaluate("2^3^2"), 512);
  assert.equal(evaluate("2^−1"), 0.5);
});

test("الدوال والثوابت ووحدة الزاوية", () => {
  close(evaluate("sin(30)", "deg"), 0.5);
  close(evaluate("sin(π÷2)", "rad"), 1);
  assert.equal(evaluate("√(16)"), 4);
  assert.equal(evaluate("log(1000)"), 3);
  close(evaluate("ln(e)"), 1);
});

test("المضروب والنسبة المئوية والضرب الضمني", () => {
  assert.equal(evaluate("5!"), 120);
  assert.equal(evaluate("50%"), 0.5);
  close(evaluate("2π"), 2 * Math.PI);
  assert.equal(evaluate("3(4+1)"), 15);
});

test("يقبل الأرقام العربية", () => {
  assert.equal(evaluate("١٢+٣"), 15);
});

test("يرمي أخطاء برموز واضحة", () => {
  failsWith("1÷0", "divisionByZero");
  failsWith("2+", "syntax");
  failsWith("(2+3", "syntax");
  failsWith("foo(2)", "syntax");
  failsWith("2.5!", "factorial");
  failsWith("√(−1)", "undefined");
});

test("تنسيق الناتج", () => {
  assert.equal(formatResult(0.1 + 0.2), "0.3");
  assert.equal(formatResult(-0), "0");
  assert.equal(formatResult(1e15), "1.000000e+15");
});
