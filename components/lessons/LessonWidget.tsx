import type { Lang } from "@/lib/i18n";
import type { Widget } from "@/lib/lessons";
import FractionVisualizer from "./widgets/FractionVisualizer";
import FunctionGrapher from "./widgets/FunctionGrapher";
import PythagorasExplorer from "./widgets/PythagorasExplorer";

/** يختار الرسم التفاعلي المناسب للدرس. لإضافة رسم جديد: أضف نوعه في Widget ثم حالة هنا. */
export default function LessonWidget({ widget, lang }: { widget: Widget; lang: Lang }) {
  switch (widget) {
    case "fractions":
      return <FractionVisualizer lang={lang} />;
    case "pythagoras":
      return <PythagorasExplorer lang={lang} />;
    case "quadratic":
      return <FunctionGrapher mode="quadratic" lang={lang} />;
    case "linear":
      return <FunctionGrapher mode="linear" lang={lang} />;
  }
}
