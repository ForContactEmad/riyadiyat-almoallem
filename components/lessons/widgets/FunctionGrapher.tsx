"use client";
import { useState } from "react";
import { getDictionary, type Dictionary, type Lang } from "@/lib/i18n";
import { formatMath, formatSignedTerm } from "@/lib/math/format";
import { analyze, evaluatePolynomial, type Analysis } from "@/lib/math/quadratic";
import MathText from "@/components/ui/MathText";
import Slider from "@/components/ui/Slider";
import CoordinatePlane, { isInsidePlane, PLANE_RANGE, toSvgX, toSvgY } from "./CoordinatePlane";
import WidgetLayout from "./WidgetLayout";

type Mode = "quadratic" | "linear";
type WidgetText = Dictionary["widgets"];

const INITIAL: Record<Mode, { a: number; b: number; c: number }> = {
  quadratic: { a: 1, b: -2, c: -3 },
  linear: { a: 0, b: 1, c: 2 },
};
const SAMPLE_STEP = 0.1;
/** نقاط أبعد من هذا خارج اللوحة بكثير، ورسمها يشوّه المنحنى. */
const MAX_PLOTTED_Y = PLANE_RANGE * 3;
const POINT_RADIUS = 5;

/** يرسم ‎y = ax² + bx + c‎. في الوضع الخطي تُثبَّت ‎a = 0‎ فيصبح ‎y = bx + c‎. */
export default function FunctionGrapher({ mode, lang }: { mode: Mode; lang: Lang }) {
  const [a, setA] = useState(INITIAL[mode].a);
  const [b, setB] = useState(INITIAL[mode].b);
  const [c, setC] = useState(INITIAL[mode].c);
  const { widgets: text } = getDictionary(lang);

  const isLinear = mode === "linear";
  const analysis = analyze(a, b, c);
  const equation = formatEquation(a, b, c, isLinear);
  const roots = "roots" in analysis ? analysis.roots : [];
  const vertex = analysis.kind === "quadratic" ? analysis.vertex : null;

  const figure = (
    <CoordinatePlane label={`${text.graphOf} ${equation}`}>
      <polyline
        points={sampleCurve(a, b, c)}
        fill="none"
        strokeWidth="2.5"
        strokeLinejoin="round"
        className="stroke-chalk"
      />
      {roots
        .filter((root) => isInsidePlane(root))
        .map((root) => (
          <circle
            key={root}
            cx={toSvgX(root)}
            cy={toSvgY(0)}
            r={POINT_RADIUS}
            className="fill-graph-root stroke-white"
          />
        ))}
      {vertex && isInsidePlane(vertex.x, vertex.y) && (
        <circle
          cx={toSvgX(vertex.x)}
          cy={toSvgY(vertex.y)}
          r={POINT_RADIUS}
          className="fill-graph-vertex stroke-white"
        />
      )}
    </CoordinatePlane>
  );

  return (
    <WidgetLayout figure={figure}>
      <p className="math rounded-md bg-paper py-2 text-center text-lg font-bold">{equation}</p>

      {!isLinear && <Slider label="a" value={a} min={-3} max={3} step={0.5} onChange={setA} />}
      <Slider
        label={isLinear ? text.slope : "b"}
        value={b}
        min={-6}
        max={6}
        step={0.5}
        onChange={setB}
      />
      <Slider
        label={isLinear ? text.intercept : "c"}
        value={c}
        min={-8}
        max={8}
        step={0.5}
        onChange={setC}
      />

      <p className="text-sm" aria-live="polite">
        <AnalysisSummary analysis={analysis} text={text} />
      </p>
      {vertex && (
        <p className="text-sm">
          {text.vertex}{" "}
          <MathText>
            ({formatMath(vertex.x)} , {formatMath(vertex.y)})
          </MathText>
        </p>
      )}
      <Legend rootsLabel={text.roots} vertexLabel={isLinear ? null : text.vertexShort} />
    </WidgetLayout>
  );
}

function formatEquation(a: number, b: number, c: number, isLinear: boolean): string {
  const tail = `${formatSignedTerm(c)}`;
  return isLinear
    ? `y = ${formatMath(b)}x ${tail}`
    : `y = ${formatMath(a)}x² ${formatSignedTerm(b)}x ${tail}`;
}

/** نقاط المنحنى بصيغة سمة points في ‎<polyline>‎ */
function sampleCurve(a: number, b: number, c: number): string {
  const points: string[] = [];
  for (let x = -PLANE_RANGE; x <= PLANE_RANGE + SAMPLE_STEP / 2; x += SAMPLE_STEP) {
    const y = evaluatePolynomial(a, b, c, x);
    if (Math.abs(y) <= MAX_PLOTTED_Y)
      points.push(`${toSvgX(x).toFixed(1)},${toSvgY(y).toFixed(1)}`);
  }
  return points.join(" ");
}

const Bold = ({ children }: { children: React.ReactNode }) => (
  <MathText className="font-bold">{children}</MathText>
);
const Root = ({ value }: { value: number }) => <Bold>x = {formatMath(value)}</Bold>;

/** وصف نصي لنتيجة التحليل: عدد الحلول وقيمها. */
function AnalysisSummary({ analysis, text }: { analysis: Analysis; text: WidgetText }) {
  if (analysis.kind === "constant") return text.horizontal;

  if (analysis.kind === "linear") {
    return (
      <>
        {text.crossesAt} <Root value={analysis.roots[0]} />
      </>
    );
  }

  const { discriminant, roots } = analysis;
  return (
    <>
      {text.disc} <Bold>Δ = {formatMath(discriminant)}</Bold>
      {" — "}
      {roots.length === 2 && (
        <>
          {text.twoRoots} <Root value={roots[0]} /> {text.and} <Root value={roots[1]} />
        </>
      )}
      {roots.length === 1 && (
        <>
          {text.oneRoot} <Root value={roots[0]} />
        </>
      )}
      {roots.length === 0 && text.noRoots}
    </>
  );
}

function Legend({ rootsLabel, vertexLabel }: { rootsLabel: string; vertexLabel: string | null }) {
  const dot = "inline-block size-2.5 rounded-full";
  return (
    <p className="flex gap-4 text-xs text-muted">
      <span>
        <i className={`${dot} bg-graph-root`} /> {rootsLabel}
      </span>
      {vertexLabel && (
        <span>
          <i className={`${dot} bg-graph-vertex`} /> {vertexLabel}
        </span>
      )}
    </p>
  );
}
