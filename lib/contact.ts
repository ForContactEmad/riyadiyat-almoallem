/**
 * إرسال نموذج التواصل. طريقتان يُختار بينهما حسب وجود مفتاح Web3Forms:
 *   1) Web3Forms: يرسل من المتصفح مباشرة ويعمل على أي استضافة.
 *   2) PHP: ملف ‎public/api/contact.php‎ على خادم Apache.
 */

/** مفتاح Web3Forms (عام بطبيعته). يوضع في ‎.env.local‎ */
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const PHP_ENDPOINT = "/api/contact.php";

export type ContactResult =
  | { ok: true }
  /** الخادم رفض الرسالة، وقد يذكر السبب بلغة الزائر. */
  | { ok: false; reason: "rejected"; message?: string }
  /** لم نصل إلى الخادم أصلًا أو لم يُفهم ردّه. */
  | { ok: false; reason: "unreachable" };

export async function sendContactMessage(form: FormData, siteName: string): Promise<ContactResult> {
  try {
    return WEB3FORMS_KEY
      ? await sendViaWeb3Forms(form, siteName, WEB3FORMS_KEY)
      : await sendViaPhp(form);
  } catch {
    return { ok: false, reason: "unreachable" };
  }
}

async function sendViaWeb3Forms(
  form: FormData,
  siteName: string,
  accessKey: string,
): Promise<ContactResult> {
  form.append("access_key", accessKey);
  form.append("subject", `${siteName}: ${form.get("topic")}`);
  form.append("from_name", String(form.get("name")));

  const response = await fetch(WEB3FORMS_ENDPOINT, {
    method: "POST",
    body: form,
    headers: { Accept: "application/json" },
  });
  const data: { success?: boolean } = await response.json();

  return data.success ? { ok: true } : { ok: false, reason: "rejected" };
}

async function sendViaPhp(form: FormData): Promise<ContactResult> {
  const response = await fetch(PHP_ENDPOINT, { method: "POST", body: form });
  const data: { ok?: boolean; error?: string } = await response.json();

  return data.ok ? { ok: true } : { ok: false, reason: "rejected", message: data.error };
}
