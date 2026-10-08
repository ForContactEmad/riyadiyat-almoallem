const RADIUS = 60;
const CENTER = 70;
const TOP = -Math.PI / 2; // نبدأ التقطيع من أعلى الدائرة

const pointAt = (angle: number) =>
  `${CENTER + RADIUS * Math.cos(angle)},${CENTER + RADIUS * Math.sin(angle)}`;

/** مسار شريحة رقم index من أصل total. الدائرة الكاملة حالة خاصة لأن القوس لا يرسم 360°. */
function slicePath(index: number, total: number): string {
  if (total === 1) {
    return `M ${CENTER - RADIUS},${CENTER} a ${RADIUS},${RADIUS} 0 1,0 ${2 * RADIUS},0 a ${RADIUS},${RADIUS} 0 1,0 ${-2 * RADIUS},0`;
  }
  const start = TOP + (index / total) * 2 * Math.PI;
  const end = TOP + ((index + 1) / total) * 2 * Math.PI;
  return `M ${CENTER},${CENTER} L ${pointAt(start)} A ${RADIUS},${RADIUS} 0 0,1 ${pointAt(end)} Z`;
}

type FractionPieProps = { numerator: number; denominator: number; label: string };

/** دائرة مقسّمة إلى denominator شريحة، الملوّن منها numerator. */
export default function FractionPie({ numerator, denominator, label }: FractionPieProps) {
  return (
    <figure className="text-center">
      <svg viewBox="0 0 140 140" className="w-32 rounded-lg bg-board" role="img" aria-label={label}>
        {Array.from({ length: denominator }, (_, index) => (
          <path
            key={index}
            d={slicePath(index, denominator)}
            strokeWidth="2"
            className={index < numerator ? "fill-chalk stroke-board" : "fill-white/10 stroke-board"}
          />
        ))}
      </svg>
      <figcaption className="math mt-1 text-lg font-bold">
        {numerator}/{denominator}
      </figcaption>
    </figure>
  );
}
