"use client";
import { useCallback, useState } from "react";
import {
  CalculatorError,
  evaluate,
  formatResult,
  type AngleMode,
  type CalculatorErrorCode,
} from "@/lib/calculator/evaluate";
import type { CalculatorKey, KeyAction } from "@/lib/calculator/keys";

export type HistoryEntry = { expression: string; result: string };

const HISTORY_LIMIT = 8;
const INITIAL_RESULT = "0";

/** الناتج السالب أو بالصيغة العلمية يُحاط بقوسين حتى لا يختلط بما قبله في التعبير. */
const asOperand = (value: string) =>
  value.startsWith("-") || value.includes("e") ? `(${value})` : value;

/** حالة الآلة الحاسبة ومنطقها، مفصولة عن العرض. */
export function useCalculator() {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState(INITIAL_RESULT);
  const [errorCode, setErrorCode] = useState<CalculatorErrorCode | null>(null);
  const [angleMode, setAngleMode] = useState<AngleMode>("deg");
  const [lastAnswer, setLastAnswer] = useState(INITIAL_RESULT);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  const insert = useCallback((text: string) => {
    setErrorCode(null);
    setExpression((current) => current + text);
  }, []);

  const calculate = useCallback(() => {
    if (!expression) return;
    try {
      const answer = formatResult(evaluate(expression, angleMode));
      setResult(answer);
      setLastAnswer(answer);
      setErrorCode(null);
      setHistory((entries) => [{ expression, result: answer }, ...entries].slice(0, HISTORY_LIMIT));
    } catch (error) {
      setErrorCode(error instanceof CalculatorError ? error.code : "syntax");
    }
  }, [expression, angleMode]);

  const runAction = useCallback(
    (action: KeyAction) => {
      switch (action) {
        case "evaluate":
          return calculate();
        case "answer":
          return insert(asOperand(lastAnswer));
        case "backspace":
          setErrorCode(null);
          return setExpression((current) => current.slice(0, -1));
        case "clear":
          setErrorCode(null);
          setExpression("");
          return setResult(INITIAL_RESULT);
      }
    },
    [calculate, insert, lastAnswer],
  );

  const pressKey = useCallback(
    (key: CalculatorKey) => (key.action ? runAction(key.action) : insert(key.insert ?? key.label)),
    [runAction, insert],
  );

  return {
    expression,
    result,
    errorCode,
    angleMode,
    lastAnswer,
    history,
    setAngleMode,
    insert,
    runAction,
    pressKey,
    recall: setExpression,
  };
}
