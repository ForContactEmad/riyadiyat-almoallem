import { History as HistoryIcon } from "lucide-react";
import Card from "@/components/ui/Card";
import type { HistoryEntry } from "./useCalculator";

type HistoryProps = {
  entries: HistoryEntry[];
  onRecall: (expression: string) => void;
  labels: { title: string; empty: string };
};

/** آخر العمليات. الضغط على عملية يعيد تعبيرها إلى الشاشة. */
export default function History({ entries, onRecall, labels }: HistoryProps) {
  return (
    <Card className="rounded-2xl p-5">
      <h2 className="flex items-center gap-2 font-bold">
        <HistoryIcon size={18} aria-hidden /> {labels.title}
      </h2>
      {entries.length === 0 ? (
        <p className="mt-3 text-sm text-muted">{labels.empty}</p>
      ) : (
        <ul className="mt-3 divide-y divide-line">
          {entries.map(({ expression, result }, index) => (
            <li key={index}>
              <button
                onClick={() => onRecall(expression)}
                className="math flex w-full justify-between gap-4 py-2 text-left hover:text-accent"
                dir="ltr"
              >
                <span className="truncate">{expression}</span>
                <span className="font-bold">= {result}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
