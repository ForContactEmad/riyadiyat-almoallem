/** تخطيط مشترك للرسومات التفاعلية: الرسم في جهة وأدوات التحكم في الجهة الأخرى. */
export default function WidgetLayout({
  figure,
  children,
}: {
  figure: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-6 md:grid-cols-[auto_1fr] md:items-center">
      {figure}
      <div className="space-y-3">{children}</div>
    </div>
  );
}

/** أصناف لوحة الرسم (السبورة). الرسم يبقى LTR دائمًا لأن المحاور لا تنقلب مع اللغة. */
export const boardSvgClass = "mx-auto w-full max-w-xs rounded-lg bg-board";
export const ltrStyle = { direction: "ltr" } as const;
