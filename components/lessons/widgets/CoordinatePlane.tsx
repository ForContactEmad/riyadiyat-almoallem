import { boardSvgClass, ltrStyle } from "./WidgetLayout";

/** المستوى الإحداثي يمتد من ‎−RANGE‎ إلى ‎+RANGE‎ على المحورين. */
export const PLANE_RANGE = 10;
const PLANE_SIZE = 320; // بوحدات SVG

export const toSvgX = (x: number) => ((x + PLANE_RANGE) / (2 * PLANE_RANGE)) * PLANE_SIZE;
export const toSvgY = (y: number) =>
  PLANE_SIZE - ((y + PLANE_RANGE) / (2 * PLANE_RANGE)) * PLANE_SIZE;

export const isInsidePlane = (x: number, y = 0) =>
  Math.abs(x) <= PLANE_RANGE && Math.abs(y) <= PLANE_RANGE;

const GRID_LINES = Array.from({ length: 2 * PLANE_RANGE + 1 }, (_, index) => index - PLANE_RANGE);

/** شبكة ومحوران، وما يُرسم فوقهما يُمرَّر كـ children. */
export default function CoordinatePlane({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <svg
      viewBox={`0 0 ${PLANE_SIZE} ${PLANE_SIZE}`}
      style={ltrStyle}
      className={boardSvgClass}
      role="img"
      aria-label={label}
    >
      <g className="stroke-white/10">
        {GRID_LINES.map((value) => (
          <g key={value}>
            <line x1={toSvgX(value)} y1={0} x2={toSvgX(value)} y2={PLANE_SIZE} />
            <line x1={0} y1={toSvgY(value)} x2={PLANE_SIZE} y2={toSvgY(value)} />
          </g>
        ))}
      </g>
      <g className="stroke-white/70">
        <line x1={0} y1={toSvgY(0)} x2={PLANE_SIZE} y2={toSvgY(0)} />
        <line x1={toSvgX(0)} y1={0} x2={toSvgX(0)} y2={PLANE_SIZE} />
      </g>
      {children}
    </svg>
  );
}
