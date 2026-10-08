import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/classNames";

type DirectionalArrowProps = {
  /** forward = اتجاه القراءة (يمين في الإنجليزية، يسار في العربية) */
  direction: "forward" | "back";
  size?: number;
  className?: string;
};

/** سهم ينقلب تلقائيًا مع اتجاه الصفحة (RTL/LTR). */
export default function DirectionalArrow({
  direction,
  size = 16,
  className,
}: DirectionalArrowProps) {
  const Icon = direction === "forward" ? ArrowRight : ArrowLeft;
  return <Icon size={size} className={cn("rtl:rotate-180", className)} aria-hidden />;
}
