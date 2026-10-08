import { Clock } from "lucide-react";

export default function Duration({ minutes, unit }: { minutes: number; unit: string }) {
  return (
    <span className="flex items-center gap-1 text-muted">
      <Clock size={14} aria-hidden /> {minutes} {unit}
    </span>
  );
}
