const NON_BREAKING_SPACE = " "; // يحفظ ارتفاع السطر حين يكون التعبير فارغًا

type DisplayProps = { expression: string; result: string; errorMessage: string | null };

export default function Display({ expression, result, errorMessage }: DisplayProps) {
  return (
    <div className="board-grid mb-3 rounded-lg bg-board p-3 text-right">
      <p className="math min-h-6 overflow-x-auto whitespace-nowrap text-white/70">
        {expression || NON_BREAKING_SPACE}
      </p>
      <p
        className="math overflow-x-auto whitespace-nowrap text-3xl font-bold text-white"
        aria-live="polite"
      >
        {errorMessage ? (
          <span dir="auto" className="font-sans text-base text-on-board-error">
            {errorMessage}
          </span>
        ) : (
          result
        )}
      </p>
    </div>
  );
}
