import type { Lang } from "./i18n";
import { localize, type Localized } from "./localize";

type PostInfo = {
  slug: string;
  /** تاريخ النشر بصيغة YYYY-MM-DD */
  date: string;
};

type PostText = {
  title: string;
  tag: string;
  excerpt: string;
  body: { heading?: string; text: string }[];
};

export type Post = PostInfo & PostText;

// لإضافة مقال: أضف عنصرًا هنا بنصّيه العربي والإنجليزي ثم أعد البناء (npm run build).
const postEntries: Localized<PostInfo, PostText>[] = [
  {
    slug: "how-to-study-math",
    date: "2026-10-01",
    ar: {
      title: "كيف تذاكر الرياضيات بطريقة صحيحة؟",
      tag: "نصائح",
      excerpt: "الرياضيات لا تُحفظ بل تُمارَس. عادات بسيطة تصنع الفرق.",
      body: [
        {
          text: "كثير من الطلاب يقرأ الحل ويظن أنه فهم، ثم يتفاجأ في الاختبار. الفهم الحقيقي يظهر عندما تحل المسألة بنفسك والكتاب مغلق.",
        },
        {
          heading: "حلّ قبل أن تقرأ الحل",
          text: "حاول عشر دقائق على الأقل قبل النظر إلى الإجابة. المحاولة حتى لو كانت خاطئة تجهّز عقلك لاستقبال الطريقة الصحيحة.",
        },
        {
          heading: "قليل دائم خير من كثير منقطع",
          text: "نصف ساعة يوميًا أفضل من أربع ساعات ليلة الاختبار. التكرار المتباعد يثبّت المهارة.",
        },
        {
          heading: "اكتب أخطاءك",
          text: "خصّص صفحة في دفترك للأخطاء المتكررة وراجعها قبل كل اختبار؛ معظم الدرجات تضيع في أخطاء معروفة سلفًا.",
        },
      ],
    },
    en: {
      title: "How to study math the right way",
      tag: "Tips",
      excerpt: "Math is practised, not memorised. A few simple habits make the difference.",
      body: [
        {
          text: "Many students read a solution, feel they understood it, and are then surprised in the exam. Real understanding shows when you solve the problem yourself with the book closed.",
        },
        {
          heading: "Try before you read the solution",
          text: "Give it at least ten minutes before looking at the answer. Even a wrong attempt prepares your mind to take in the right method.",
        },
        {
          heading: "A little every day beats a lot once",
          text: "Half an hour a day is better than four hours the night before the exam. Spaced repetition makes the skill stick.",
        },
        {
          heading: "Write down your mistakes",
          text: "Keep a page in your notebook for the mistakes you repeat and review it before every exam; most marks are lost to mistakes you already know about.",
        },
      ],
    },
  },
  {
    slug: "common-algebra-mistakes",
    date: "2026-09-20",
    ar: {
      title: "خمسة أخطاء شائعة في الجبر",
      tag: "جبر",
      excerpt: "من توزيع الإشارة السالبة إلى تربيع المجموع: أخطاء تتكرر كل عام.",
      body: [
        {
          heading: "توزيع الإشارة السالبة",
          text: "‎−(x − 3)‎ تساوي ‎−x + 3‎ وليس ‎−x − 3‎. الإشارة السالبة تُضرب في كل حد داخل القوس.",
        },
        {
          heading: "تربيع المجموع",
          text: "‎(a + b)²‎ لا يساوي ‎a² + b²‎، بل ‎a² + 2ab + b²‎. جرّب بأرقام بسيطة لتتأكد.",
        },
        {
          heading: "القسمة على متغير",
          text: "عند قسمة طرفي معادلة على x تفقد الحل x = 0. الأفضل أن تنقل الحدود وتحلّل.",
        },
        {
          heading: "نسيان الجذر السالب",
          text: "إذا كان x² = 9 فإن x = 3 أو x = −3. كثيرون يكتبون الحل الموجب فقط.",
        },
        {
          heading: "ترتيب العمليات",
          text: "الأسس أولًا، ثم الضرب والقسمة، ثم الجمع والطرح. ‎−3²‎ تساوي ‎−9‎ بينما ‎(−3)²‎ تساوي 9.",
        },
      ],
    },
    en: {
      title: "Five common mistakes in algebra",
      tag: "Algebra",
      excerpt:
        "From distributing a minus sign to squaring a sum: mistakes that come back every year.",
      body: [
        {
          heading: "Distributing the minus sign",
          text: "−(x − 3) equals −x + 3, not −x − 3. The minus sign multiplies every term inside the brackets.",
        },
        {
          heading: "Squaring a sum",
          text: "(a + b)² is not a² + b²; it is a² + 2ab + b². Try it with small numbers to check.",
        },
        {
          heading: "Dividing by a variable",
          text: "When you divide both sides of an equation by x you lose the solution x = 0. It is safer to move the terms to one side and factor.",
        },
        {
          heading: "Forgetting the negative root",
          text: "If x² = 9 then x = 3 or x = −3. Many students write only the positive solution.",
        },
        {
          heading: "Order of operations",
          text: "Powers first, then multiplication and division, then addition and subtraction. −3² equals −9 while (−3)² equals 9.",
        },
      ],
    },
  },
  {
    slug: "math-in-daily-life",
    date: "2026-09-05",
    ar: {
      title: "أين نستخدم الرياضيات في حياتنا؟",
      tag: "ثقافة رياضية",
      excerpt: "من حساب الخصومات إلى خرائط الجوال: الرياضيات حولنا في كل مكان.",
      body: [
        { text: "سؤال «متى سنستفيد من هذا؟» سؤال مشروع، وإجابته أقرب مما تتوقع." },
        {
          heading: "في التسوق",
          text: "النسبة المئوية تخبرك هل العرض حقيقي، وأي العبوتين أرخص للوحدة الواحدة.",
        },
        {
          heading: "في الطريق",
          text: "تطبيقات الخرائط تعتمد على الهندسة وحساب المثلثات لحساب المسافات وأقصر المسارات.",
        },
        {
          heading: "في القرارات",
          text: "الاحتمالات والإحصاء تساعدك على قراءة الأخبار والأرقام دون أن تنخدع بها.",
        },
      ],
    },
    en: {
      title: "Where do we use math in everyday life?",
      tag: "Math culture",
      excerpt:
        "From working out discounts to the maps on your phone: math is everywhere around us.",
      body: [
        {
          text: "“When will we ever use this?” is a fair question, and the answer is closer than you think.",
        },
        {
          heading: "While shopping",
          text: "Percentages tell you whether an offer is real and which of two packs is cheaper per unit.",
        },
        {
          heading: "On the road",
          text: "Map apps rely on geometry and trigonometry to compute distances and shortest routes.",
        },
        {
          heading: "When deciding",
          text: "Probability and statistics help you read news and numbers without being fooled by them.",
        },
      ],
    },
  },
];

export const postSlugs = postEntries.map((post) => post.slug);

export function getPosts(lang: Lang): Post[] {
  return postEntries.map((entry) => localize(entry, lang));
}

export function getPost(lang: Lang, slug: string): Post | undefined {
  return getPosts(lang).find((post) => post.slug === slug);
}
