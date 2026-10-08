import type { Lang, Stage } from "./i18n";
import { localize, type Localized } from "./localize";

export type Widget = "fractions" | "pythagoras" | "quadratic" | "linear";

type LessonInfo = {
  slug: string;
  stage: Stage;
  minutes: number;
  /** معرّف فيديو يوتيوب (الجزء بعد v=). اتركه فارغًا حتى يُرفع الفيديو. */
  videoId?: string;
  widget?: Widget;
};

type LessonText = {
  title: string;
  summary: string;
  formula?: string;
  sections: { heading: string; body: string[] }[];
  example: { question: string; steps: string[]; answer: string };
};

export type Lesson = LessonInfo & LessonText;

// لإضافة درس: أضف عنصرًا هنا بنصّيه العربي والإنجليزي ثم أعد البناء.
const lessonEntries: Localized<LessonInfo, LessonText>[] = [
  {
    slug: "fractions",
    stage: "primary",
    minutes: 8,
    widget: "fractions",
    ar: {
      title: "الكسور: المعنى والمقارنة",
      summary: "ما معنى البسط والمقام؟ وكيف نقارن بين كسرين بسهولة؟",
      formula: "a/b  ⟶  a جزء من b أجزاء متساوية",
      sections: [
        {
          heading: "ما هو الكسر؟",
          body: [
            "الكسر يعبّر عن جزء من كلٍّ مقسوم إلى أجزاء متساوية. المقام (الرقم السفلي) يخبرنا إلى كم جزء قُسّم الكل، والبسط (الرقم العلوي) يخبرنا كم جزءًا أخذنا.",
            "كلما كبر المقام مع ثبات البسط صغر الجزء؛ فربع الفطيرة أصغر من نصفها.",
          ],
        },
        {
          heading: "مقارنة الكسور",
          body: [
            "إذا تساوى المقامان نقارن البسطين مباشرة. وإذا اختلفا نوحّد المقامات أولًا، أو نستخدم الضرب التبادلي.",
          ],
        },
      ],
      example: {
        question: "أيهما أكبر: 3/4 أم 5/8؟",
        steps: ["نوحّد المقامات على 8:  3/4 = 6/8", "نقارن البسطين: 6 > 5"],
        answer: "3/4 أكبر من 5/8",
      },
    },
    en: {
      title: "Fractions: meaning and comparison",
      summary: "What do the numerator and denominator mean, and how do we compare two fractions?",
      formula: "a/b  ⟶  a parts out of b equal parts",
      sections: [
        {
          heading: "What is a fraction?",
          body: [
            "A fraction describes part of a whole that has been split into equal parts. The denominator (bottom number) tells us how many parts the whole was split into, and the numerator (top number) tells us how many of them we took.",
            "With the same numerator, a bigger denominator means a smaller piece: a quarter of a pie is smaller than half of it.",
          ],
        },
        {
          heading: "Comparing fractions",
          body: [
            "If the denominators are equal, compare the numerators directly. If they differ, first rewrite both fractions with a common denominator, or use cross-multiplication.",
          ],
        },
      ],
      example: {
        question: "Which is larger: 3/4 or 5/8?",
        steps: ["Use the common denominator 8:  3/4 = 6/8", "Compare the numerators: 6 > 5"],
        answer: "3/4 is larger than 5/8",
      },
    },
  },
  {
    slug: "percentages",
    stage: "primary",
    minutes: 7,
    ar: {
      title: "النسبة المئوية",
      summary: "تحويل الكسور إلى نسب مئوية وحساب الخصومات والزيادات.",
      formula: "النسبة % = (الجزء ÷ الكل) × 100",
      sections: [
        {
          heading: "الفكرة",
          body: [
            "النسبة المئوية كسر مقامه 100. فعندما نقول 25% نعني 25 من كل 100، أي الربع.",
            "لإيجاد نسبة من عدد: نحوّل النسبة إلى كسر عشري ثم نضرب. مثلًا 15% من 200 = 0.15 × 200.",
          ],
        },
        {
          heading: "الخصم والزيادة",
          body: [
            "السعر بعد خصم نسبته p% يساوي السعر الأصلي × (1 − p/100)، وبعد زيادة p% يساوي السعر الأصلي × (1 + p/100).",
          ],
        },
      ],
      example: {
        question: "سعر حقيبة 80 ريالًا وعليها خصم 25%. كم السعر بعد الخصم؟",
        steps: ["قيمة الخصم = 0.25 × 80 = 20 ريالًا", "السعر الجديد = 80 − 20"],
        answer: "60 ريالًا",
      },
    },
    en: {
      title: "Percentages",
      summary: "Turning fractions into percentages and working out discounts and increases.",
      formula: "percent = (part ÷ whole) × 100",
      sections: [
        {
          heading: "The idea",
          body: [
            "A percentage is a fraction with denominator 100. When we say 25% we mean 25 out of every 100, which is a quarter.",
            "To find a percentage of a number, turn the percentage into a decimal and multiply. For example 15% of 200 = 0.15 × 200.",
          ],
        },
        {
          heading: "Discounts and increases",
          body: [
            "The price after a p% discount is the original price × (1 − p/100), and after a p% increase it is the original price × (1 + p/100).",
          ],
        },
      ],
      example: {
        question:
          "A bag costs 80 riyals and has a 25% discount. What is the price after the discount?",
        steps: ["Discount = 0.25 × 80 = 20 riyals", "New price = 80 − 20"],
        answer: "60 riyals",
      },
    },
  },
  {
    slug: "linear-equations",
    stage: "middle",
    minutes: 10,
    widget: "linear",
    ar: {
      title: "المعادلة الخطية وتمثيلها بيانيًا",
      summary: "الميل والمقطع الصادي، وكيف يتغير المستقيم بتغيّرهما.",
      formula: "y = m·x + b",
      sections: [
        {
          heading: "الميل والمقطع",
          body: [
            "في المعادلة y = mx + b يمثّل m ميل المستقيم: مقدار تغيّر y عندما تزيد x بمقدار واحد. ويمثّل b نقطة تقاطع المستقيم مع محور الصادات.",
            "الميل الموجب يعني مستقيمًا صاعدًا، والسالب هابطًا، والصفر مستقيمًا أفقيًا.",
          ],
        },
        {
          heading: "حل المعادلة",
          body: [
            "حل المعادلة mx + b = 0 هو النقطة التي يقطع فيها المستقيم محور السينات: x = −b ÷ m (بشرط m ≠ 0).",
          ],
        },
      ],
      example: {
        question: "حل المعادلة 2x + 6 = 0",
        steps: ["ننقل 6 للطرف الآخر: 2x = −6", "نقسم الطرفين على 2"],
        answer: "x = −3",
      },
    },
    en: {
      title: "Linear equations and their graphs",
      summary: "Slope and y-intercept, and how the line changes when they change.",
      formula: "y = m·x + b",
      sections: [
        {
          heading: "Slope and intercept",
          body: [
            "In y = mx + b, m is the slope of the line: how much y changes when x increases by one. b is the point where the line crosses the y-axis.",
            "A positive slope gives a rising line, a negative slope a falling line, and a zero slope a horizontal line.",
          ],
        },
        {
          heading: "Solving the equation",
          body: [
            "The solution of mx + b = 0 is the point where the line crosses the x-axis: x = −b ÷ m (as long as m ≠ 0).",
          ],
        },
      ],
      example: {
        question: "Solve 2x + 6 = 0",
        steps: ["Move 6 to the other side: 2x = −6", "Divide both sides by 2"],
        answer: "x = −3",
      },
    },
  },
  {
    slug: "pythagoras",
    stage: "middle",
    minutes: 9,
    widget: "pythagoras",
    ar: {
      title: "نظرية فيثاغورس",
      summary: "العلاقة بين أضلاع المثلث القائم الزاوية مع تجربة تفاعلية.",
      formula: "a² + b² = c²",
      sections: [
        {
          heading: "نص النظرية",
          body: [
            "في المثلث القائم الزاوية، مربع طول الوتر (الضلع المقابل للزاوية القائمة) يساوي مجموع مربعي طولي الضلعين الآخرين.",
            "النظرية تعمل في الاتجاهين: إذا تحققت العلاقة في مثلث فهو قائم الزاوية.",
          ],
        },
        {
          heading: "متى نستخدمها؟",
          body: [
            "لإيجاد ضلع مجهول في مثلث قائم، ولحساب المسافة بين نقطتين في المستوى الإحداثي، وفي مسائل الارتفاعات والسلالم والأقطار.",
          ],
        },
      ],
      example: {
        question: "مثلث قائم ضلعا القائمة فيه 6 سم و 8 سم. أوجد طول الوتر.",
        steps: ["c² = 6² + 8² = 36 + 64 = 100", "c = √100"],
        answer: "10 سم",
      },
    },
    en: {
      title: "The Pythagorean theorem",
      summary: "How the sides of a right triangle are related, with an interactive experiment.",
      formula: "a² + b² = c²",
      sections: [
        {
          heading: "The statement",
          body: [
            "In a right triangle, the square of the hypotenuse (the side opposite the right angle) equals the sum of the squares of the other two sides.",
            "It works both ways: if the relation holds in a triangle, that triangle is a right triangle.",
          ],
        },
        {
          heading: "When do we use it?",
          body: [
            "To find an unknown side of a right triangle, to compute the distance between two points on the coordinate plane, and in problems about heights, ladders and diagonals.",
          ],
        },
      ],
      example: {
        question: "A right triangle has legs of 6 cm and 8 cm. Find the hypotenuse.",
        steps: ["c² = 6² + 8² = 36 + 64 = 100", "c = √100"],
        answer: "10 cm",
      },
    },
  },
  {
    slug: "quadratic-equations",
    stage: "high",
    minutes: 12,
    widget: "quadratic",
    ar: {
      title: "المعادلة التربيعية والقطع المكافئ",
      summary: "المميز، الجذور، ورأس القطع المكافئ مع رسم تفاعلي.",
      formula: "x = (−b ± √(b² − 4ac)) / 2a",
      sections: [
        {
          heading: "الصورة العامة",
          body: [
            "المعادلة التربيعية تُكتب على الصورة ax² + bx + c = 0 حيث a ≠ 0، وتمثيلها البياني قطع مكافئ يفتح للأعلى إذا كان a موجبًا وللأسفل إذا كان سالبًا.",
          ],
        },
        {
          heading: "المميز",
          body: [
            "المميز Δ = b² − 4ac يحدد عدد الحلول الحقيقية: إذا كان موجبًا فهناك حلّان، وإذا ساوى صفرًا فحلٌّ واحد مكرر، وإذا كان سالبًا فلا حلول حقيقية.",
            "رأس القطع يقع عند x = −b ÷ 2a، وهو أدنى نقطة أو أعلى نقطة في المنحنى.",
          ],
        },
      ],
      example: {
        question: "حل المعادلة x² − 5x + 6 = 0",
        steps: ["Δ = (−5)² − 4·1·6 = 25 − 24 = 1", "x = (5 ± 1) ÷ 2"],
        answer: "x = 2  أو  x = 3",
      },
    },
    en: {
      title: "Quadratic equations and the parabola",
      summary: "The discriminant, the roots and the vertex, with an interactive graph.",
      formula: "x = (−b ± √(b² − 4ac)) / 2a",
      sections: [
        {
          heading: "The general form",
          body: [
            "A quadratic equation is written ax² + bx + c = 0 with a ≠ 0. Its graph is a parabola that opens upward when a is positive and downward when a is negative.",
          ],
        },
        {
          heading: "The discriminant",
          body: [
            "The discriminant Δ = b² − 4ac tells us how many real solutions there are: two if it is positive, one repeated solution if it is zero, and none if it is negative.",
            "The vertex is at x = −b ÷ 2a, the lowest or highest point of the curve.",
          ],
        },
      ],
      example: {
        question: "Solve x² − 5x + 6 = 0",
        steps: ["Δ = (−5)² − 4·1·6 = 25 − 24 = 1", "x = (5 ± 1) ÷ 2"],
        answer: "x = 2  or  x = 3",
      },
    },
  },
  {
    slug: "arithmetic-sequences",
    stage: "high",
    minutes: 10,
    ar: {
      title: "المتتابعات الحسابية",
      summary: "الحد العام ومجموع أول n حدًّا في المتتابعة الحسابية.",
      formula: "aₙ = a₁ + (n − 1)·d",
      sections: [
        {
          heading: "التعريف",
          body: [
            "المتتابعة الحسابية قائمة أعداد الفرق بين كل حدين متتاليين فيها ثابت، ويسمى هذا الفرق أساس المتتابعة d.",
          ],
        },
        {
          heading: "المجموع",
          body: [
            "مجموع أول n حدًّا يساوي عدد الحدود مضروبًا في متوسط الحدين الأول والأخير: Sₙ = n × (a₁ + aₙ) ÷ 2.",
          ],
        },
      ],
      example: {
        question: "أوجد الحد العاشر في المتتابعة 3، 7، 11، …",
        steps: ["a₁ = 3 والأساس d = 4", "a₁₀ = 3 + (10 − 1) × 4 = 3 + 36"],
        answer: "39",
      },
    },
    en: {
      title: "Arithmetic sequences",
      summary: "The general term and the sum of the first n terms.",
      formula: "aₙ = a₁ + (n − 1)·d",
      sections: [
        {
          heading: "Definition",
          body: [
            "An arithmetic sequence is a list of numbers in which the difference between consecutive terms is constant. That difference is called the common difference d.",
          ],
        },
        {
          heading: "The sum",
          body: [
            "The sum of the first n terms equals the number of terms times the average of the first and last terms: Sₙ = n × (a₁ + aₙ) ÷ 2.",
          ],
        },
      ],
      example: {
        question: "Find the tenth term of the sequence 3, 7, 11, …",
        steps: ["a₁ = 3 and the common difference is d = 4", "a₁₀ = 3 + (10 − 1) × 4 = 3 + 36"],
        answer: "39",
      },
    },
  },
];

export const lessonSlugs = lessonEntries.map((lesson) => lesson.slug);

export function getLessons(lang: Lang): Lesson[] {
  return lessonEntries.map((entry) => localize(entry, lang));
}

export function getLesson(lang: Lang, slug: string): Lesson | undefined {
  return getLessons(lang).find((lesson) => lesson.slug === slug);
}

export function getNextLesson(lang: Lang, slug: string): Lesson | undefined {
  const lessons = getLessons(lang);
  const index = lessons.findIndex((lesson) => lesson.slug === slug);
  return index === -1 ? undefined : lessons[index + 1];
}
