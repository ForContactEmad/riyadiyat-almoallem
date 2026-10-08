/**
 * مُقيِّم تعابير رياضية آمن (بدون eval) بطريقة النزول التعاودي.
 *
 * ترتيب الأولوية من الأدنى إلى الأعلى:
 *   الجمع والطرح ← الضرب والقسمة ← الإشارة ← الأس ← (! و %) ← الأعداد والأقواس والدوال
 */

export type AngleMode = "deg" | "rad";
export type CalculatorErrorCode = "syntax" | "divisionByZero" | "undefined" | "factorial";

/** خطأ يحمل رمزًا تترجمه الواجهة إلى رسالة بلغة الزائر. */
export class CalculatorError extends Error {
  code: CalculatorErrorCode;

  constructor(code: CalculatorErrorCode) {
    super(code);
    this.name = "CalculatorError";
    this.code = code;
  }
}

/** أكبر عدد يمكن حساب مضروبه قبل تجاوز حدود الأعداد العشرية. */
const MAX_FACTORIAL_INPUT = 170;

const toRadians = (angle: number, mode: AngleMode) =>
  mode === "deg" ? (angle * Math.PI) / 180 : angle;

const FUNCTIONS: Record<string, (x: number, mode: AngleMode) => number> = {
  sin: (x, mode) => Math.sin(toRadians(x, mode)),
  cos: (x, mode) => Math.cos(toRadians(x, mode)),
  tan: (x, mode) => Math.tan(toRadians(x, mode)),
  sqrt: (x) => Math.sqrt(x),
  ln: (x) => Math.log(x),
  log: (x) => Math.log10(x),
  abs: (x) => Math.abs(x),
};

const CONSTANTS: Record<string, number> = { pi: Math.PI, e: Math.E };

const ARABIC_DIGITS = "٠١٢٣٤٥٦٧٨٩";
const NUMBER_PATTERN = /^(\d+\.?\d*|\.\d+)/;
const NAME_PATTERN = /^[a-z]+/;

/** يوحّد رموز الواجهة (× ÷ − √ والأرقام العربية) إلى الصيغة التي يفهمها المحلل. */
function normalize(input: string): string {
  return input
    .replace(/\s+/g, "")
    .replace(/×/g, "*")
    .replace(/÷/g, "/")
    .replace(/−/g, "-")
    .replace(/√/g, "sqrt")
    .replace(/[٠-٩]/g, (digit) => String(ARABIC_DIGITS.indexOf(digit)))
    .replace(/٫/g, ".");
}

function factorial(n: number): number {
  if (n < 0 || !Number.isInteger(n) || n > MAX_FACTORIAL_INPUT) {
    throw new CalculatorError("factorial");
  }
  let product = 1;
  for (let i = 2; i <= n; i++) product *= i;
  return product;
}

class ExpressionParser {
  private source: string;
  private angleMode: AngleMode;
  private position = 0;

  constructor(source: string, angleMode: AngleMode) {
    this.source = source;
    this.angleMode = angleMode;
  }

  parse(): number {
    const value = this.parseSum();
    if (this.position < this.source.length) throw new CalculatorError("syntax");
    if (!Number.isFinite(value)) throw new CalculatorError("undefined");
    return value;
  }

  private peek(): string | undefined {
    return this.source[this.position];
  }

  private rest(): string {
    return this.source.slice(this.position);
  }

  /** يتقدّم إن كان الرمز التالي هو المتوقع، ويُرجع هل تقدّم. */
  private consume(expected: string): boolean {
    if (this.peek() !== expected) return false;
    this.position++;
    return true;
  }

  private expect(expected: string): void {
    if (!this.consume(expected)) throw new CalculatorError("syntax");
  }

  private parseSum(): number {
    let value = this.parseProduct();
    for (;;) {
      if (this.consume("+")) value += this.parseProduct();
      else if (this.consume("-")) value -= this.parseProduct();
      else return value;
    }
  }

  private parseProduct(): number {
    let value = this.parseSigned();
    for (;;) {
      if (this.consume("*")) {
        value *= this.parseSigned();
      } else if (this.consume("/")) {
        const divisor = this.parseSigned();
        if (divisor === 0) throw new CalculatorError("divisionByZero");
        value /= divisor;
      } else if (this.startsImplicitFactor()) {
        value *= this.parseSigned();
      } else {
        return value;
      }
    }
  }

  /** الضرب الضمني: ‎2π‎ ، ‎3(4+1)‎ ، ‎2sin(30)‎ */
  private startsImplicitFactor(): boolean {
    const next = this.peek();
    return next !== undefined && (next === "(" || next === "π" || /[a-z]/.test(next));
  }

  private parseSigned(): number {
    if (this.consume("-")) return -this.parseSigned();
    if (this.consume("+")) return this.parseSigned();
    return this.parsePower();
  }

  private parsePower(): number {
    const base = this.parsePostfix();
    // الأس يرتبط من اليمين: ‎2^3^2 = 2^(3^2)‎
    return this.consume("^") ? Math.pow(base, this.parseSigned()) : base;
  }

  private parsePostfix(): number {
    let value = this.parsePrimary();
    for (;;) {
      if (this.consume("!")) value = factorial(value);
      else if (this.consume("%")) value /= 100;
      else return value;
    }
  }

  private parsePrimary(): number {
    if (this.consume("(")) return this.parseGroup();
    if (this.consume("π")) return Math.PI;

    const number = NUMBER_PATTERN.exec(this.rest());
    if (number) {
      this.position += number[0].length;
      return parseFloat(number[0]);
    }

    const name = NAME_PATTERN.exec(this.rest());
    if (name) {
      this.position += name[0].length;
      return this.parseNamed(name[0]);
    }

    throw new CalculatorError("syntax");
  }

  /** ما بعد القوس المفتوح حتى إغلاقه. */
  private parseGroup(): number {
    const value = this.parseSum();
    this.expect(")");
    return value;
  }

  private parseNamed(name: string): number {
    if (name in CONSTANTS) return CONSTANTS[name];

    const fn = FUNCTIONS[name];
    if (!fn) throw new CalculatorError("syntax");
    this.expect("(");
    return fn(this.parseGroup(), this.angleMode);
  }
}

export function evaluate(expression: string, angleMode: AngleMode = "deg"): number {
  return new ExpressionParser(normalize(expression), angleMode).parse();
}

const DISPLAY_PRECISION = 1e10;
const LARGE_NUMBER = 1e12;
const SMALL_NUMBER = 1e-7;

/** يقرّب الناتج للعرض، ويستخدم الصيغة العلمية للأعداد الكبيرة جدًا أو الصغيرة جدًا. */
export function formatResult(value: number): string {
  const rounded = Math.round(value * DISPLAY_PRECISION) / DISPLAY_PRECISION;
  const magnitude = Math.abs(rounded);
  if (rounded !== 0 && (magnitude >= LARGE_NUMBER || magnitude < SMALL_NUMBER)) {
    return value.toExponential(6);
  }
  return String(rounded === 0 ? 0 : rounded);
}
