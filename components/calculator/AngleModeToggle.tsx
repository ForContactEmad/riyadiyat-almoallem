import type { AngleMode } from "@/lib/calculator/evaluate";
import { cn } from "@/lib/classNames";

const MODES: AngleMode[] = ["deg", "rad"];

type AngleModeToggleProps = { mode: AngleMode; onChange: (mode: AngleMode) => void; label: string };

export default function AngleModeToggle({ mode, onChange, label }: AngleModeToggleProps) {
  return (
    <div
      className="flex overflow-hidden rounded-md border border-white/20 text-xs font-bold"
      role="group"
      aria-label={label}
    >
      {MODES.map((option) => (
        <button
          key={option}
          onClick={() => onChange(option)}
          aria-pressed={mode === option}
          className={cn(
            "px-3 py-1.5",
            mode === option ? "bg-chalk text-board-deep" : "text-white/70",
          )}
        >
          {option.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
