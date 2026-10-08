const MINUS_SIGN = "−"; // علامة الطرح الطباعية (U+2212) بدل الشرطة العادية

/** يقرّب إلى منزلتين ويستخدم علامة الطرح الطباعية: ‎-1.456 ← −1.46‎ */
export function formatMath(value: number): string {
  const rounded = Math.round(value * 100) / 100;
  return String(rounded === 0 ? 0 : rounded).replace("-", MINUS_SIGN);
}

/** حدّ بإشارته للاستخدام داخل معادلة: ‎+ 3‎ أو ‎− 3‎ */
export function formatSignedTerm(value: number): string {
  return value < 0 ? `${MINUS_SIGN} ${formatMath(Math.abs(value))}` : `+ ${formatMath(value)}`;
}
