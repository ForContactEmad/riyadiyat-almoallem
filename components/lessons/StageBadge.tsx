import { cn } from "@/lib/classNames";

export default function StageBadge({ label, className }: { label: string; className?: string }) {
  return (
    <span
      className={cn("rounded-full bg-accent/15 px-2.5 py-0.5 font-bold text-accent", className)}
    >
      {label}
    </span>
  );
}
