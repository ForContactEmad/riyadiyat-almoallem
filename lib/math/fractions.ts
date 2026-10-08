export type Comparison = "<" | "=" | ">";

/** يقارن ‎n1/d1‎ و ‎n2/d2‎ بالضرب التبادلي (المقامان موجبان). */
export function compareFractions(n1: number, d1: number, n2: number, d2: number): Comparison {
  const left = n1 * d2;
  const right = n2 * d1;
  if (left === right) return "=";
  return left > right ? ">" : "<";
}
