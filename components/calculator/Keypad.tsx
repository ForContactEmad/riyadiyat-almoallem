import { Delete } from "lucide-react";
import { CALCULATOR_KEYS, type CalculatorKey, type KeyVariant } from "@/lib/calculator/keys";
import { cn } from "@/lib/classNames";

const variantClass: Record<KeyVariant, string> = {
  digit: "h-12 bg-key text-key-ink hover:bg-white",
  function: "h-12 bg-white/10 text-sm text-white hover:bg-white/20",
  operator: "h-12 bg-key-operator text-white hover:brightness-110",
  danger: "h-12 bg-key-danger text-white hover:brightness-110",
  equals: "row-span-2 bg-chalk text-board-deep hover:brightness-95",
};

type KeypadProps = {
  onPress: (key: CalculatorKey) => void;
  labels: { delete: string; clear: string };
};

export default function Keypad({ onPress, labels }: KeypadProps) {
  const accessibleName = (key: CalculatorKey) => {
    if (key.action === "backspace") return labels.delete;
    if (key.action === "clear") return labels.clear;
    return key.label;
  };

  return (
    <div className="grid grid-cols-5 gap-2">
      {CALCULATOR_KEYS.map((key) => (
        <button
          key={key.label}
          // منع انتقال التركيز إلى الزر عند النقر بالفأرة، حتى لا يعيد Enter ضغط آخر زر
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => onPress(key)}
          aria-label={accessibleName(key)}
          className={cn(
            "grid place-items-center rounded-lg font-bold transition active:scale-95",
            variantClass[key.variant],
          )}
        >
          {key.action === "backspace" ? <Delete size={18} aria-hidden /> : key.label}
        </button>
      ))}
    </div>
  );
}
