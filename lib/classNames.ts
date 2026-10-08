/** يدمج أسماء الأصناف ويتجاهل القيم الفارغة: cn("a", isActive && "b") */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
