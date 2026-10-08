"use client";
import { useState } from "react";
import { getDictionary, type Lang } from "@/lib/i18n";
import { compareFractions } from "@/lib/math/fractions";
import Slider from "@/components/ui/Slider";
import FractionPie from "./FractionPie";
import { ltrStyle } from "./WidgetLayout";

const MAX_DENOMINATOR = 12;

/** حالة كسر واحد. البسط لا يتجاوز المقام حتى لو صُغّر المقام بعده. */
function useFraction(initialNumerator: number, initialDenominator: number) {
  const [rawNumerator, setNumerator] = useState(initialNumerator);
  const [denominator, setDenominator] = useState(initialDenominator);
  const numerator = Math.min(rawNumerator, denominator);
  return { numerator, denominator, setNumerator, setDenominator };
}

export default function FractionVisualizer({ lang }: { lang: Lang }) {
  const first = useFraction(3, 4);
  const second = useFraction(5, 8);
  const { widgets: text } = getDictionary(lang);

  const comparison = compareFractions(
    first.numerator,
    first.denominator,
    second.numerator,
    second.denominator,
  );

  return (
    <div className="space-y-5">
      <div style={ltrStyle} className="flex items-center justify-center gap-5">
        <FractionPie
          numerator={first.numerator}
          denominator={first.denominator}
          label={text.of(first.numerator, first.denominator)}
        />
        <span className="math text-4xl font-extrabold text-accent" aria-live="polite">
          {comparison}
        </span>
        <FractionPie
          numerator={second.numerator}
          denominator={second.denominator}
          label={text.of(second.numerator, second.denominator)}
        />
      </div>

      <div className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
        <FractionControls
          fraction={first}
          numeratorLabel={text.num1}
          denominatorLabel={text.den1}
        />
        <FractionControls
          fraction={second}
          numeratorLabel={text.num2}
          denominatorLabel={text.den2}
        />
      </div>

      {/* الضرب التبادلي الذي بُنيت عليه المقارنة */}
      <p className="math text-center text-sm text-muted">
        {first.numerator} × {second.denominator} = {first.numerator * second.denominator}
        {"   "}
        {comparison}
        {"   "}
        {second.numerator} × {first.denominator} = {second.numerator * first.denominator}
      </p>
    </div>
  );
}

type FractionControlsProps = {
  fraction: ReturnType<typeof useFraction>;
  numeratorLabel: string;
  denominatorLabel: string;
};

function FractionControls({ fraction, numeratorLabel, denominatorLabel }: FractionControlsProps) {
  return (
    <div className="space-y-2">
      <Slider
        label={numeratorLabel}
        value={fraction.numerator}
        min={0}
        max={fraction.denominator}
        onChange={fraction.setNumerator}
      />
      <Slider
        label={denominatorLabel}
        value={fraction.denominator}
        min={1}
        max={MAX_DENOMINATOR}
        onChange={fraction.setDenominator}
      />
    </div>
  );
}
