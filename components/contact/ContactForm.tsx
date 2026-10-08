"use client";
import { useState } from "react";
import { CircleAlert, CircleCheck, LoaderCircle, Send } from "lucide-react";
import { sendContactMessage } from "@/lib/contact";
import { getDictionary, type Dictionary, type Lang } from "@/lib/i18n";
import { site } from "@/lib/site";

type ContactText = Dictionary["contact"];
type Submission = { status: "idle" | "sending" | "sent" } | { status: "failed"; message: string };

const LIMITS = { name: 80, email: 120, messageMin: 10, messageMax: 3000 };
const fieldClass =
  "mt-1 w-full rounded-lg border border-line bg-card px-3 py-2.5 focus:border-accent focus:outline-none";

export default function ContactForm({ lang }: { lang: Lang }) {
  const { name: siteName, contact: text } = getDictionary(lang);
  const [submission, setSubmission] = useState<Submission>({ status: "idle" });
  const isSending = submission.status === "sending";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setSubmission({ status: "sending" });

    const result = await sendContactMessage(new FormData(form), siteName);
    if (result.ok) {
      form.reset();
      setSubmission({ status: "sent" });
      return;
    }

    const message =
      result.reason === "unreachable" ? text.noServer : (result.message ?? text.failed);
    setSubmission({ status: "failed", message });
  }

  if (submission.status === "sent") {
    return <SuccessMessage text={text} onSendAnother={() => setSubmission({ status: "idle" })} />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* يخبر معالج PHP بلغة رسائل الخطأ */}
      <input type="hidden" name="lang" value={lang} />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={text.name}>
          <input
            name="name"
            required
            maxLength={LIMITS.name}
            autoComplete="name"
            className={fieldClass}
          />
        </Field>
        <Field label={text.email}>
          <input
            name="email"
            type="email"
            required
            maxLength={LIMITS.email}
            autoComplete="email"
            dir="ltr"
            className={fieldClass}
          />
        </Field>
      </div>

      <Field label={text.topic}>
        <select name="topic" className={fieldClass} defaultValue={text.topics[0]}>
          {text.topics.map((topic) => (
            <option key={topic}>{topic}</option>
          ))}
        </select>
      </Field>

      <Field label={text.message}>
        <textarea
          name="message"
          required
          minLength={LIMITS.messageMin}
          maxLength={LIMITS.messageMax}
          rows={6}
          className={fieldClass}
        />
      </Field>

      <SpamTraps />

      {submission.status === "failed" && <ErrorMessage message={submission.message} text={text} />}

      <button
        disabled={isSending}
        className="flex items-center gap-2 rounded-lg bg-board px-6 py-3 font-bold text-white transition hover:bg-board-deep disabled:opacity-60"
      >
        {isSending ? (
          <LoaderCircle size={18} className="animate-spin" aria-hidden />
        ) : (
          <Send size={18} className="rtl:-scale-x-100" aria-hidden />
        )}
        {isSending ? text.sending : text.send}
      </button>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block text-sm font-bold">
      {label}
      {children}
    </label>
  );
}

/**
 * حقول مخفية لا يراها الزائر، والروبوتات تملؤها فتُرفض رسائلها:
 * botcheck يفحصه Web3Forms، و website يفحصه contact.php
 */
function SpamTraps() {
  return (
    <>
      <input type="checkbox" name="botcheck" tabIndex={-1} className="hidden" aria-hidden />
      <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
    </>
  );
}

function ErrorMessage({ message, text }: { message: string; text: ContactText }) {
  return (
    <p
      className="flex items-start gap-2 rounded-lg bg-danger/10 p-3 text-sm text-danger"
      role="alert"
    >
      <CircleAlert size={18} className="mt-0.5 shrink-0" aria-hidden />
      <span>
        {message} {text.direct}{" "}
        <a className="underline" dir="ltr" href={`mailto:${site.email}`}>
          {site.email}
        </a>
      </span>
    </p>
  );
}

function SuccessMessage({ text, onSendAnother }: { text: ContactText; onSendAnother: () => void }) {
  return (
    <div className="rounded-xl border border-accent bg-accent/10 p-6 text-center" role="status">
      <CircleCheck className="mx-auto text-accent" size={40} aria-hidden />
      <p className="mt-2 text-lg font-bold">{text.okTitle}</p>
      <p className="text-sm text-muted">{text.okText}</p>
      <button onClick={onSendAnother} className="mt-4 text-sm font-bold text-accent underline">
        {text.again}
      </button>
    </div>
  );
}
