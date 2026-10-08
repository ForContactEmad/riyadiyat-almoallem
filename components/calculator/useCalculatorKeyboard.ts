"use client";
import { useEffect } from "react";
import {
  KEYBOARD_ACTIONS,
  KEYBOARD_INSERTS,
  TYPEABLE_CHARACTER,
  type KeyAction,
} from "@/lib/calculator/keys";

type Handlers = { insert: (text: string) => void; runAction: (action: KeyAction) => void };

/** هل الزائر يكتب في حقل أو يفعّل زرًا؟ عندها لا نخطف ضغطة المفتاح. */
function isTypingElsewhere(event: KeyboardEvent): boolean {
  const target = event.target as HTMLElement;
  const isField = target.tagName === "INPUT" || target.tagName === "TEXTAREA";
  const isActivatingButton = target.tagName === "BUTTON" && event.key === "Enter";
  return isField || isActivatingButton;
}

/** يربط لوحة المفاتيح بالآلة الحاسبة: الأرقام والعمليات، Enter للناتج، Esc للمسح. */
export function useCalculatorKeyboard({ insert, runAction }: Handlers) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.ctrlKey || event.metaKey || event.altKey || isTypingElsewhere(event)) return;

      const action = KEYBOARD_ACTIONS[event.key];
      const text =
        KEYBOARD_INSERTS[event.key] ?? (TYPEABLE_CHARACTER.test(event.key) ? event.key : null);
      if (!action && !text) return;

      event.preventDefault();
      if (action) runAction(action);
      else if (text) insert(text);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [insert, runAction]);
}
