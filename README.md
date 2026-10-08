<div align="center">

# رياضيات المعلم · Teacher's Math

موقع شروحات رياضيات تفاعلي للطلاب، بالعربية والإنجليزية
<br>
An interactive math lessons website for students, in Arabic and English

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=nextdotjs)
![React](https://img.shields.io/badge/React-19-149eca?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06b6d4?logo=tailwindcss&logoColor=white)
![Apache](https://img.shields.io/badge/Apache-2.4-d22128?logo=apache&logoColor=white)

[العربية](#العربية) · [English](#english)

</div>

---

<div dir="rtl">

## العربية

موقع ثابت يجمع لطلاب معلم رياضيات كل ما يحتاجونه خارج الحصة: شرح الدرس، مثال محلول، فيديو، وأدوات يجرّبون بها الفكرة بأيديهم.

### المزايا

- 📚 **شروحات** مقسمة حسب المرحلة (ابتدائي، متوسط، ثانوي) مع قانون ومثال محلول لكل درس
- 🖱️ **رسومات تفاعلية**: مقارنة الكسور، نظرية فيثاغورس، المستقيم، القطع المكافئ
- 🧮 **آلة حاسبة علمية** تعمل بلوحة المفاتيح، بمحلل تعابير خاص بلا `eval`
- 📝 **مدونة** و ✉️ **نموذج تواصل**
- 🌍 **لغتان** (`/ar/` و `/en/`) مع قلب الاتجاه تلقائيًا
- 🌙 **وضع داكن وفاتح** يحفظ اختيار الزائر
- 🔎 **SEO**: Open Graph و `hreflang` و sitemap

### التقنيات

| التقنية | الدور |
|---|---|
| Next.js 16 (App Router) | توليد الموقع الثابت (SSG) |
| React 19 + TypeScript | الواجهة والمكونات التفاعلية |
| Tailwind CSS 4 | التنسيق وألوان الوضعين |
| Turbopack | التطوير والبناء |
| Lucide | الأيقونات |
| Apache + HTTP/2 | الاستضافة |

### التشغيل

المتطلبات: Node.js 20 أو أحدث.

<div dir="ltr">

```bash
git clone https://github.com/ForContactEmad/riyadiyat-almoallem.git
cd riyadiyat-almoallem
npm install
cp .env.example .env.local
npm run dev
```

</div>

ثم افتح <http://localhost:3000>

### الأوامر

| الأمر | الوظيفة |
|---|---|
| `npm run dev` | خادم التطوير |
| `npm run build` | بناء الموقع الثابت في `out/` |
| `npm run check` | فحص الأنواع + ESLint + الاختبارات |
| `npm test` | اختبارات الوحدات (تحتاج Node 22.6+) |
| `npm run format` | تنسيق الكود بـ Prettier |

### متغيرات البيئة

| المتغير | الوظيفة |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | رابط الموقع النهائي (Open Graph و sitemap) |
| `NEXT_PUBLIC_WEB3FORMS_KEY` | مفتاح [Web3Forms](https://web3forms.com) لنموذج التواصل (اختياري) |

إن تُرك المفتاح فارغًا يستخدم النموذج `public/api/contact.php`، ويحتاج استضافة فيها PHP.

### بنية المشروع

<div dir="ltr">

```
app/[lang]/     الصفحات لكل لغة
components/     الواجهة، مقسّمة حسب الميزة
lib/            المنطق والبيانات (بلا واجهة) مع اختباراتها
  i18n/         نصوص الواجهة
  lessons.ts    الدروس
  posts.ts      المقالات
public/         الملفات الثابتة و ‎.htaccess‎
deploy/         مثال إعداد Apache
```

</div>

### النشر على Apache

1. ضع رابط الموقع في `NEXT_PUBLIC_SITE_URL`.
2. نفّذ `npm run build`.
3. ارفع محتويات `out/` إلى `DocumentRoot`، ومعها `.htaccess`.
4. فعّل HTTP/2 حسب `deploy/apache-vhost.conf`.

</div>

---

## English

A static website that gives a math teacher's students everything they need outside class: the lesson explained, a worked example, a video, and tools to try the idea with their own hands.

### Features

- 📚 **Lessons** grouped by stage (primary, middle, high school), each with a formula and a worked example
- 🖱️ **Interactive drawings**: fraction comparison, the Pythagorean theorem, lines, parabolas
- 🧮 **Scientific calculator** with keyboard support and a custom expression parser (no `eval`)
- 📝 **Blog** and ✉️ **contact form**
- 🌍 **Two languages** (`/ar/` and `/en/`) with automatic RTL/LTR
- 🌙 **Dark and light modes** that remember the visitor's choice
- 🔎 **SEO**: Open Graph, `hreflang`, sitemap

### Tech stack

| Technology | Role |
|---|---|
| Next.js 16 (App Router) | Static site generation (SSG) |
| React 19 + TypeScript | UI and interactive components |
| Tailwind CSS 4 | Styling and theme colours |
| Turbopack | Development and build |
| Lucide | Icons |
| Apache + HTTP/2 | Hosting |

### Getting started

Requires Node.js 20 or newer.

```bash
git clone https://github.com/ForContactEmad/riyadiyat-almoallem.git
cd riyadiyat-almoallem
npm install
cp .env.example .env.local
npm run dev
```

Then open <http://localhost:3000>

### Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Builds the static site into `out/` |
| `npm run check` | Type-check + ESLint + tests |
| `npm test` | Unit tests (needs Node 22.6+) |
| `npm run format` | Formats the code with Prettier |

### Environment variables

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Final site URL (Open Graph and sitemap) |
| `NEXT_PUBLIC_WEB3FORMS_KEY` | [Web3Forms](https://web3forms.com) key for the contact form (optional) |

If the key is empty, the form uses `public/api/contact.php`, which needs hosting with PHP.

### Project structure

```
app/[lang]/     pages for each language
components/     UI, grouped by feature
lib/            logic and data (no UI), with tests
  i18n/         UI strings
  lessons.ts    lessons
  posts.ts      blog posts
public/         static files and .htaccess
deploy/         example Apache config
```

### Deploying to Apache

1. Set the site URL in `NEXT_PUBLIC_SITE_URL`.
2. Run `npm run build`.
3. Upload the contents of `out/` to the `DocumentRoot`, including `.htaccess`.
4. Enable HTTP/2 following `deploy/apache-vhost.conf`.
