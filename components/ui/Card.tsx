import { cn } from "@/lib/classNames";

/** الشكل الأساسي للبطاقات. يُستخدم مباشرة مع ‎<Link>‎ حين تكون البطاقة كلها رابطًا. */
export const cardClass = "rounded-xl border border-line bg-card";
export const interactiveCardClass = cn(cardClass, "transition hover:border-accent hover:shadow-md");

type CardProps = { className?: string; children: React.ReactNode };

export default function Card({ className, children }: CardProps) {
  return <div className={cn(cardClass, className)}>{children}</div>;
}
