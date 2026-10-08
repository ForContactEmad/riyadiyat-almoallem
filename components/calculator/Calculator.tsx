"use client";
import { getDictionary, type Lang } from "@/lib/i18n";
import AngleModeToggle from "./AngleModeToggle";
import Display from "./Display";
import History from "./History";
import Keypad from "./Keypad";
import { useCalculator } from "./useCalculator";
import { useCalculatorKeyboard } from "./useCalculatorKeyboard";

export default function Calculator({ lang }: { lang: Lang }) {
  const { calculator: text } = getDictionary(lang);
  const calculator = useCalculator();
  useCalculatorKeyboard(calculator);

  const errorMessage = calculator.errorCode ? text.errors[calculator.errorCode] : null;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,26rem)_1fr]">
      {/* لوحة الآلة تبقى LTR في اللغتين: هذا ترتيب الأزرار المألوف */}
      <div className="rounded-2xl bg-board-deep p-4 shadow-xl" dir="ltr">
        <div className="mb-3 flex items-center justify-between">
          <AngleModeToggle
            mode={calculator.angleMode}
            onChange={calculator.setAngleMode}
            label={text.angle}
          />
          <span className="text-xs text-white/50">Ans = {calculator.lastAnswer}</span>
        </div>
        <Display
          expression={calculator.expression}
          result={calculator.result}
          errorMessage={errorMessage}
        />
        <Keypad onPress={calculator.pressKey} labels={{ delete: text.del, clear: text.clear }} />
      </div>

      <History
        entries={calculator.history}
        onRecall={calculator.recall}
        labels={{ title: text.history, empty: text.empty }}
      />
    </div>
  );
}
