/** تحليل الدالة ‎y = ax² + bx + c‎ (وتشمل المستقيم عند ‎a = 0‎). */

export type Point = { x: number; y: number };

export type Analysis =
  | { kind: "constant" }
  | { kind: "linear"; roots: [number] }
  | { kind: "quadratic"; discriminant: number; roots: number[]; vertex: Point };

export function evaluatePolynomial(a: number, b: number, c: number, x: number): number {
  return a * x * x + b * x + c;
}

export function analyze(a: number, b: number, c: number): Analysis {
  if (a === 0) {
    return b === 0 ? { kind: "constant" } : { kind: "linear", roots: [-c / b] };
  }

  const discriminant = b * b - 4 * a * c;
  const vertexX = -b / (2 * a);
  const vertex = { x: vertexX, y: evaluatePolynomial(a, b, c, vertexX) };

  return { kind: "quadratic", discriminant, roots: realRoots(a, b, discriminant), vertex };
}

/** الجذور الحقيقية مرتبة تصاعديًا. */
function realRoots(a: number, b: number, discriminant: number): number[] {
  if (discriminant < 0) return [];
  if (discriminant === 0) return [-b / (2 * a)];

  const sqrt = Math.sqrt(discriminant);
  return [(-b - sqrt) / (2 * a), (-b + sqrt) / (2 * a)].sort((left, right) => left - right);
}
