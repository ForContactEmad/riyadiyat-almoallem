import { cn } from "@/lib/classNames";

/** نص رياضي: يُعرض دائمًا من اليسار إلى اليمين حتى داخل فقرة عربية. */
export default function MathText({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <span className={cn("math", className)}>{children}</span>;
}
