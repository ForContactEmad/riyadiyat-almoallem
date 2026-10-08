/** تعريف أزرار الآلة الحاسبة بالترتيب الذي تظهر به (5 أعمدة). */

export type KeyAction = "clear" | "backspace" | "evaluate" | "answer";
export type KeyVariant = "digit" | "function" | "operator" | "danger" | "equals";

export type CalculatorKey = {
  label: string;
  variant: KeyVariant;
  /** النص الذي يُضاف إلى التعبير. إن غاب يُضاف label نفسه. */
  insert?: string;
  /** زر ينفّذ أمرًا بدل إضافة نص. */
  action?: KeyAction;
};

const fn = (label: string, insert = label): CalculatorKey => ({
  label,
  insert,
  variant: "function",
});
const op = (label: string, insert = label): CalculatorKey => ({
  label,
  insert,
  variant: "operator",
});
const digit = (label: string): CalculatorKey => ({ label, variant: "digit" });

export const CALCULATOR_KEYS: CalculatorKey[] = [
  fn("sin", "sin("),
  fn("cos", "cos("),
  fn("tan", "tan("),
  fn("√", "√("),
  fn("x^y", "^"),
  fn("ln", "ln("),
  fn("log", "log("),
  fn("π"),
  fn("e"),
  fn("n!", "!"),
  fn("("),
  fn(")"),
  fn("%"),
  { label: "AC", variant: "danger", action: "clear" },
  { label: "⌫", variant: "danger", action: "backspace" },
  digit("7"),
  digit("8"),
  digit("9"),
  op("÷"),
  op("x²", "^2"),
  digit("4"),
  digit("5"),
  digit("6"),
  op("×"),
  { label: "Ans", variant: "operator", action: "answer" },
  digit("1"),
  digit("2"),
  digit("3"),
  op("−"),
  { label: "=", variant: "equals", action: "evaluate" },
  digit("0"),
  digit("."),
  op("(−)", "−"),
  op("+"),
];

/** مفاتيح لوحة المفاتيح التي تُكتب في التعبير كما هي أو بعد تحويلها. */
export const KEYBOARD_INSERTS: Record<string, string> = { "*": "×", "/": "÷", "-": "−" };
export const KEYBOARD_ACTIONS: Record<string, KeyAction> = {
  Enter: "evaluate",
  "=": "evaluate",
  Backspace: "backspace",
  Escape: "clear",
};
export const TYPEABLE_CHARACTER = /^[0-9.+()^%!]$/;
