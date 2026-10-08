/**
 * غلاف آمن حول localStorage: التخزين قد يكون محظورًا (تصفح خفي، إعدادات الخصوصية)
 * فلا يصح أن يتعطل الموقع بسببه.
 */

export function readStorage(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function writeStorage(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    // التخزين غير متاح: نتجاهل، والاختيار يبقى لهذه الصفحة فقط
  }
}
