"use client";
import { useState } from "react";
import { getDictionary, type Lang } from "@/lib/i18n";
import Slider from "@/components/ui/Slider";
import WidgetLayout, { boardSvgClass, ltrStyle } from "./WidgetLayout";

const MAX_SIDE = 10;
const UNIT = 22; // وحدات SVG لكل وحدة طول
const ORIGIN = { x: 40, y: 280 }; // رأس الزاوية القائمة
const RIGHT_ANGLE_MARK = 14;

const roundTo2 = (value: number) => Math.round(value * 100) / 100;

export default function PythagorasExplorer({ lang }: { lang: Lang }) {
  const [a, setA] = useState(3);
  const [b, setB] = useState(4);
  const { widgets: text } = getDictionary(lang);

  const sumOfSquares = a * a + b * b;
  const hypotenuse = roundTo2(Math.sqrt(sumOfSquares));

  // رؤوس المثلث: الزاوية القائمة، نهاية الضلع الأفقي b، نهاية الضلع الرأسي a
  const baseEnd = { x: ORIGIN.x + b * UNIT, y: ORIGIN.y };
  const heightEnd = { x: ORIGIN.x, y: ORIGIN.y - a * UNIT };
  const midX = ORIGIN.x + (b * UNIT) / 2;
  const midY = ORIGIN.y - (a * UNIT) / 2;

  const figure = (
    <svg
      viewBox="0 0 320 320"
      style={ltrStyle}
      className={boardSvgClass}
      role="img"
      aria-label={text.triangle(a, b, hypotenuse)}
    >
      <polygon
        points={`${ORIGIN.x},${ORIGIN.y} ${baseEnd.x},${baseEnd.y} ${heightEnd.x},${heightEnd.y}`}
        strokeWidth="2.5"
        strokeLinejoin="round"
        className="fill-chalk/20 stroke-chalk"
      />
      <rect
        x={ORIGIN.x}
        y={ORIGIN.y - RIGHT_ANGLE_MARK}
        width={RIGHT_ANGLE_MARK}
        height={RIGHT_ANGLE_MARK}
        className="fill-none stroke-white"
      />
      <g fontSize="15" fontWeight="700" textAnchor="middle" className="fill-white">
        <text x={ORIGIN.x - 18} y={midY + 5}>
          a={a}
        </text>
        <text x={midX} y={ORIGIN.y + 22}>
          b={b}
        </text>
        <text x={midX + 26} y={midY - 8} className="fill-chalk">
          c={hypotenuse}
        </text>
      </g>
    </svg>
  );

  return (
    <WidgetLayout figure={figure}>
      <Slider label={text.sideA} value={a} min={1} max={MAX_SIDE} onChange={setA} />
      <Slider label={text.sideB} value={b} min={1} max={MAX_SIDE} onChange={setB} />
      <div className="math space-y-1 rounded-md bg-paper p-3 text-center" aria-live="polite">
        <p>
          {a}² + {b}² = {a * a} + {b * b} = {sumOfSquares}
        </p>
        <p className="text-lg font-bold">
          c = √{sumOfSquares} = {hypotenuse}
        </p>
      </div>
      <p className="text-sm text-muted">{text.pythHint}</p>
    </WidgetLayout>
  );
}
