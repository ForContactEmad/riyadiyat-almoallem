import type { NextConfig } from "next";

// تصدير ثابت (SSG): ناتج البناء مجلد out/ يُرفع كما هو إلى Apache.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true, // كل صفحة تصبح مجلد/index.html فيخدمها Apache بدون قواعد إعادة كتابة
  images: { unoptimized: true },
  experimental: { globalNotFound: true }, // صفحة 404 موحّدة (app/global-not-found.tsx)
  turbopack: {
    rules: {
      "*.css": { loaders: ["@tailwindcss/turbopack"], as: "*.css" },
    },
  },
};

export default nextConfig;
