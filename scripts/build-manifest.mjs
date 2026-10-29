// Source of truth for the section schemas in twilight-bundle.json and the templates/*.json files.
// Run from the repo root: node scripts/build-manifest.mjs
import fs from "node:fs";
import { templates } from "./lib/templates.mjs";
import { L, area, collection, color, colorFields, drop, icon, image, line, num, products, sectionBase, sw, text, url } from "./lib/fields.mjs";

const ROOT = process.cwd();
const RESULTS = [["1", "النتيجة 1"], ["2", "النتيجة 2"], ["3", "النتيجة 3"]];

const components = [
  {
    title: "رأس الصفحة",
    icon: "sicon-store",
    name: "page-header",
    key: "1cc0428b-a46d-46eb-a726-7cb39da9b9ed",
    image: "",
    props: { "min-height": "76px" },
    fields: [
      image("logo", "الشعار", "", "اتركه فارغاً لاستخدام شعار متجرك"),
      image("logo_dark", "شعار الوضع الداكن", "", "يظهر في الوضع الداكن وفوق الصور في الرأس الشفاف، وبدونه يظهر شعارك باللون الأبيض"),
      num("logo_height", "ارتفاع الشعار (px)", 56, 24, 140),
      drop("align", "مكان الشعار", [["center", "الوسط"], ["start", "البداية"]], "center"),
      line("hd-line-1"),
      sw("sticky", "تثبيت الرأس أعلى الصفحة عند التمرير", true),
      sw("transparent", "رأس شفاف فوق القسم الأول", false, "يظهر فوق صورة القسم الأول، وتظهر خلفيته عند التمرير"),
      sw("show_shadow", "خط سفلي للرأس", true),
      line("hd-line-2", "روابط أقسام الصفحة"),
      collection("nav", "رابط", [
        text("label", "النص", L("", "")),
        text("target", "معرّف القسم", "", { multilang: false, desc: "نفس المعرّف المكتوب في إعدادات القسم" }),
      ], [], 0, 6),
      line("hd-line-3", "زر الشراء"),
      sw("show_buy", "إظهار زر الشراء", true),
      text("buy_text", "نص الزر", L("تسوّق الآن", "Shop now")),
      line("hd-line-4", "ألوان الصفحة"),
      color("brand_color", "لون البراند", "", "لون واحد تُبنى منه ألوان الصفحة كلها في الوضع الفاتح والداكن. اتركه فارغاً لاستخدام ألوان متجرك"),
      sw("show_mode_toggle", "زر التبديل بين الوضع الفاتح والداكن", true, "يتذكر اختيار العميل"),
      drop("default_mode", "الوضع الافتراضي للصفحة", [["light", "فاتح"], ["dark", "داكن"], ["system", "حسب جهاز الزائر"]], "light"),
      // Here the colors adjust the whole page palette, so the header has no scheme of its own
      ...colorFields({ scheme: false }),
    ],
  },
  {
    title: "القسم الافتتاحي",
    icon: "sicon-image",
    name: "hero",
    key: "413f94fa-1f89-4306-b4d9-32e83f695134",
    image: "",
    props: { "min-height": "480px" },
    fields: [
      drop("layout", "الشكل", [["overlay", "النص فوق الصورة"], ["split", "النص بجانب الصورة"]], "overlay"),
      drop("media", "نوع الخلفية", [["image", "صورة"], ["video", "فيديو"]], "image"),
      image("image", "صورة الكمبيوتر", "", "المقاس المقترح 1920×1080. اتركها فارغة لاستخدام صورة المنتج"),
      image("image_mobile", "صورة الجوال", "", "المقاس المقترح 900×1200"),
      url("video_url", "رابط فيديو الكمبيوتر (MP4)", ""),
      url("video_url_mobile", "رابط فيديو الجوال (MP4)", ""),
      image("poster", "صورة تظهر قبل تشغيل الفيديو", ""),
      num("overlay", "قوة الطبقة الداكنة فوق الصورة (%)", 35, 0, 80, "في شكل النص فوق الصورة فقط"),
      num("height", "الارتفاع (% من الشاشة)", 85, 50, 100),
      drop("content_align", "مكان النص", [["center", "الوسط"], ["start", "البداية"]], "center"),
      line("hero-line-1", "النصوص والزر"),
      text("badge", "شارة صغيرة فوق العنوان", L("تشكيلة الشتاء", "Winter collection")),
      text("title", "العنوان", L("دفء يليق بليالي الشتاء", "Warmth made for winter nights"), { max: 120 }),
      area("subtitle", "الوصف", L("لحاف ناعم وخفيف الوزن، بحشوة تدفّيك من غير ما تثقل عليك", "A soft, light comforter whose fill keeps you warm without weighing you down")),
      text("buy_text", "نص الزر", L("أضف للسلة", "Add to cart")),
      sw("show_price", "إظهار السعر بجانب الزر", true),
      products("product", "المنتج في صفحات العروض والمعاينة", "صفحة المنتج تعرض منتجها تلقائياً"),
      line("hero-line-2", "كمّل الطقم: إضافات تدخل السلة مع المنتج"),
      products("addons", "منتجات الإضافة (حتى 3)", "مثل أكياس المخدات أو واقي المرتبة. لو ليها مقاس أو لون، العميل يختاره تحتها", true),
      text("addons_label", "نص فوق الإضافات", L("كمّل الطقم:", "Complete the set:")),
      sw("addons_checked", "الإضافات مختارة من البداية", false),
      sectionBase().find((f) => f.id === "section_id"),
      ...colorFields(),
    ],
  },
  {
    title: "درجة الدفء ودفا مدينتك",
    icon: "sicon-sun",
    name: "warmth-guide",
    key: "65d938f1-080c-4cb9-9700-3f6783128e36",
    image: "",
    props: { "min-height": "420px" },
    fields: [
      ...sectionBase(L("اختر درجة الدفء", "Choose your warmth"), L("نفس اللحاف بثلاث درجات، حسب برودة ليلك", "The same comforter in three weights, for how cold your nights get"), "warmth"),
      products("product", "المنتج اللي فيه درجات الدفء", "صفحة المنتج تعرض منتجها تلقائياً"),
      line("wg-line-1", "الدرجات (حتى 3، من الأخف للأدفى)"),
      collection("levels", "درجة", [
        text("name", "الاسم", L("", "")),
        text("option_value", "اسم الخيار في المنتج", "", { multilang: false, desc: "زي ما هو مكتوب في خيارات المنتج، عشان الزر يختاره لوحده. فارغ = نفس الاسم" }),
        text("badge", "شارة", L("", ""), { desc: "مثل الأكثر مبيعاً. الكارت اللي عليه شارة بيظهر مختار أول ما الصفحة تفتح" }),
        text("ideal_for", "مناسب لمين", L("", "")),
        text("spec_1", "معلومة 1", L("", ""), { desc: "مثل الحشوة: 250 جم" }),
        text("spec_2", "معلومة 2", L("", "")),
        num("warmth", "الدفء من 5", 3, 1, 5),
        image("image", "صورة", ""),
      ], [], 0, 3),
      line("wg-line-2", "دفا مدينتك"),
      sw("show_city", "اختيار المدينة واقتراح الدرجة", true, "القائمة فيها مدن السعودية ومتوسط برودة ليالي يناير"),
      text("city_label", "السؤال", L("في أي مدينة أنت؟", "Which city are you in?")),
      num("heavy_at", "الدرجة الثقيلة لما الليل يوصل لـ (°) أو أقل", 6, -10, 20),
      num("light_at", "الدرجة الخفيفة لما الليل يكون (°) أو أكتر", 14, 0, 30),
      collection("cities", "مدينة", [text("name", "المدينة", L("", "")), num("night", "متوسط برودة الليل في الشتاء (°)", 10, -15, 35)], [], 0, 25),
      text("buy_text", "نص الزر", L("", ""), { desc: "فارغ = أضف (اسم الدرجة) للسلة" }),
      ...colorFields(),
    ],
  },
  {
    title: "دليل المقاس",
    icon: "sicon-pencil-ruler",
    name: "size-guide",
    key: "a262db9e-fd71-40e6-95c7-ed4ea9451592",
    image: "",
    props: { "min-height": "420px" },
    fields: [
      ...sectionBase(L("سريرك كم مقاسه؟", "What size is your bed?"), L("اختر مقاس سريرك ونقولك مقاس المفرش اللي يغطيه", "Pick your bed and we show the cover that fits it"), "size"),
      products("product", "المنتج اللي فيه المقاسات", "صفحة المنتج تعرض منتجها تلقائياً"),
      collection("sizes", "مقاس", [
        text("bed", "اسم مقاس السرير", L("", "")),
        text("bed_size", "مقاس السرير", L("", ""), { desc: "مثل 180×200 سم" }),
        text("cover_size", "مقاس المفرش المناسب", L("", ""), { desc: "مثل 240×260 سم. الرسمة بتحسب النازل من كل جانب" }),
        text("option_value", "اسم الخيار في المنتج", "", { multilang: false, desc: "فارغ = نفس اسم المقاس" }),
        text("note", "ملاحظة", L("", "")),
      ], [], 0, 6),
      text("buy_text", "نص الزر", L("", ""), { desc: "فارغ = أضف مقاس (الاسم) للسلة" }),
      ...colorFields(),
    ],
  },
  {
    title: "تفاصيل الطقم والعناية",
    icon: "sicon-list",
    name: "set-details",
    key: "c7205b80-64a1-4157-84da-a2881e4c92a9",
    image: "",
    props: { "min-height": "360px" },
    fields: [
      ...sectionBase(L("إيه اللي في الطقم؟", "What's in the set?"), L("", ""), "set"),
      image("image", "صورة جانبية", ""),
      sw("show_total", "إظهار عدد القطع الكلي", true),
      text("total_label", "النص بجانب العدد", L("قطع في الطقم", "pieces in the set")),
      collection("pieces", "قطعة", [
        drop("type", "نوع القطعة (الأيقونة)", [["comforter", "لحاف"], ["duvet-cover", "غطاء لحاف"], ["flat-sheet", "شرشف"], ["fitted-sheet", "شرشف بأستك"], ["pillowcase", "كيس مخدة"], ["pillow", "مخدة"], ["cushion", "مخدة ديكور"], ["throw", "بطانية"], ["bed-skirt", "تنورة سرير"], ["protector", "واقي مرتبة"]], "comforter"),
        text("name", "الاسم", L("", ""), { desc: "فارغ = اسم النوع" }),
        num("count", "العدد", 1, 1, 12),
        text("size", "المقاس", L("", "")),
      ], [], 0, 12),
      line("sd-line-1", "العناية والغسيل"),
      text("care_title", "العنوان", L("العناية والغسيل", "Care")),
      collection("care", "رمز", [
        drop("symbol", "الرمز", [["wash-30", "غسالة على 30°"], ["wash-40", "غسالة على 40°"], ["hand-wash", "غسيل يدوي"], ["no-bleach", "بدون مبيض"], ["tumble-low", "مجفف على حرارة واطية"], ["no-tumble", "بدون مجفف"], ["line-dry", "نشر على الحبل"], ["dry-flat", "تجفيف مفرود"], ["iron-low", "كي على حرارة واطية"], ["no-iron", "بدون كي"], ["dry-clean", "تنظيف جاف"], ["no-dry-clean", "بدون تنظيف جاف"]], "wash-30"),
        text("text", "النص", L("", ""), { desc: "فارغ = اسم الرمز" }),
      ], [], 0, 8),
      text("care_note", "ملاحظة تحت الرموز", L("", "")),
      ...colorFields(),
    ],
  },
  {
    title: "قارن الخامات",
    icon: "sicon-fabric-swatch",
    name: "fabric-compare",
    key: "5e5e937a-94c0-4553-8ea7-f0bc17126010",
    image: "",
    props: { "min-height": "420px" },
    fields: [
      ...sectionBase(L("أي خامة تناسبك؟", "Which fabric suits you?"), L("الإحساس والدفء ومناسبة لمين، في نظرة واحدة", "The feel, the warmth and who it suits, at a glance"), "fabrics"),
      collection("fabrics", "خامة", [
        text("name", "الاسم", L("", "")),
        text("tagline", "وصف بكلمتين", L("", ""), { desc: "مثل ناعم ويدفّي" }),
        image("image", "صورة", ""),
        text("feel", "الإحساس", L("", "")),
        num("warmth", "الدفء من 5", 3, 1, 5),
        text("best_for", "مناسب لـ", L("", "")),
        text("badge", "شارة", L("", "")),
        text("link_text", "نص الرابط", L("", "")),
        text("link", "الرابط أو معرّف قسم", "", { multilang: false, desc: "رابط منتج أو قسم في المتجر، أو معرّف قسم في الصفحة مثل warmth" }),
      ], [], 0, 4),
      ...colorFields(),
    ],
  },
  {
    title: "ابنِ سريرك",
    icon: "sicon-bed-single",
    name: "build-bed",
    key: "2e03a6d7-5807-45bb-9a51-c060b863ce80",
    image: "",
    props: { "min-height": "520px" },
    fields: [
      ...sectionBase(L("ابنِ سريرك ووفّر", "Build your bed and save"), L("اختر اللحاف والشرشف والمخدات، وأضفهم للسلة مرة واحدة", "Pick the comforter, sheets and pillows, then add them in one go"), "bed"),
      collection("steps", "خطوة", [
        text("title", "عنوان الخطوة", L("", "")),
        products("products", "منتجات الخطوة (حتى 6)", "", true),
        sw("optional", "خطوة اختيارية", false, "تبدأ فاضية، والعميل يختار منها لو حب"),
      ], [], 0, 4),
      num("discount_percent", "نسبة خصم الباقة المعروضة (%)", 0, 0, 90, "تظهر السعر بعد الخصم. لازم تعمل نفس الخصم في سلة (التسويق ← العروض الخاصة)، والصفحة مش بتطبقه"),
      text("offer_text", "نص العرض", L("", ""), { desc: "مثل خصم 15% على السرير الكامل" }),
      text("buy_text", "نص الزر", L("أضف السرير كامل للسلة", "Add the whole bed")),
      ...colorFields(),
    ],
  },
  {
    title: "اختبار: أي مفرش يناسبك؟",
    icon: "sicon-help",
    name: "bed-quiz",
    key: "d77897bb-23b7-4597-b4a9-27b12b97f108",
    image: "",
    props: { "min-height": "420px" },
    fields: [
      ...sectionBase(L("", ""), L("", ""), "quiz"),
      image("image", "صورة", ""),
      text("intro", "سؤال البداية", L("محتار أي مفرش يناسبك؟ جاوب على 3 أسئلة ونقترح عليك", "Not sure which one suits you? Answer 3 questions")),
      text("start_text", "نص زر البداية", L("ابدأ الاختبار", "Start the quiz")),
      line("qz-line-q", "الأسئلة: كل إجابة تودّي لنتيجة من التلاتة، والنتيجة اللي تاخد أكتر إجابات تظهر"),
      collection("questions", "سؤال", [
        text("q", "السؤال", L("", "")),
        text("a1", "إجابة 1", L("", "")), drop("a1_to", "تودّي لـ", RESULTS, "1"),
        text("a2", "إجابة 2", L("", "")), drop("a2_to", "تودّي لـ", RESULTS, "2"),
        text("a3", "إجابة 3 (اختياري)", L("", "")), drop("a3_to", "تودّي لـ", RESULTS, "3"),
      ], [], 0, 4),
      line("qz-line-r1", "النتيجة 1"),
      text("r1_title", "العنوان", L("", "")),
      area("r1_text", "الوصف", L("", "")),
      products("r1_product", "المنتج المقترح", ""),
      image("r1_image", "صورة", ""),
      line("qz-line-r2", "النتيجة 2"),
      text("r2_title", "العنوان", L("", "")),
      area("r2_text", "الوصف", L("", "")),
      products("r2_product", "المنتج المقترح", ""),
      image("r2_image", "صورة", ""),
      line("qz-line-r3", "النتيجة 3"),
      text("r3_title", "العنوان", L("", "")),
      area("r3_text", "الوصف", L("", "")),
      products("r3_product", "المنتج المقترح", ""),
      image("r3_image", "صورة", ""),
      ...colorFields(),
    ],
  },
  {
    title: "اشترِ اللوك كله",
    icon: "sicon-image",
    name: "shop-room",
    key: "9c84f08d-c931-4b22-beb0-5bde650fa3c7",
    image: "",
    props: { "min-height": "480px" },
    fields: [
      ...sectionBase(L("اشترِ الغرفة كما هي", "Shop the whole room"), L("اضغط على الأرقام لتعرف كل قطعة", "Tap a number to see each piece"), "room"),
      image("image", "صورة الغرفة", "", "صورة عرضية، والنقط بتتحط عليها بالنسبة المئوية"),
      text("image_alt", "وصف الصورة (لقارئ الشاشة)", L("", "")),
      collection("spots", "نقطة", [
        products("product", "المنتج", ""),
        num("x", "المكان أفقياً من اليسار (%)", 50, 0, 100),
        num("y", "المكان رأسياً من فوق (%)", 50, 0, 100),
      ], [], 0, 6),
      text("buy_text", "نص زر إضافة الكل", L("أضف اللوك كامل للسلة", "Add the whole look")),
      ...colorFields(),
    ],
  },
  {
    title: "آراء العملاء",
    icon: "sicon-chat-bubbles",
    name: "reviews",
    key: "ab15930a-b913-4f04-83eb-c69044254b66",
    image: "",
    props: { "min-height": "420px" },
    fields: [
      ...sectionBase(L("آراء عملائنا", "What our customers say"), L("اختر الموضوع اللي يهمك: الدفء أو النعومة أو المقاس", "Pick what matters to you: warmth, softness or size"), "reviews"),
      sw("show_summary", "إظهار ملخص التقييمات", true),
      area("summary_text", "ملخص آراء العملاء", L("", "")),
      collection("questions", "سؤال", [text("q", "السؤال", L("", "")), area("a", "الإجابة", L("", ""))], [], 0, 6),
      line("rv-line-1", "الآراء: نص، أو تسجيل صوتي، أو صور، أو كلها معاً"),
      collection("items", "رأي", [
        text("name", "اسم العميل", L("", "")),
        text("city", "المدينة", L("", "")),
        text("place", "أين قيل الرأي", L("", ""), { desc: "مثل في العرس أو في الدوام" }),
        num("rate", "التقييم من 5", 5, 1, 5),
        area("text", "الرأي", L("", "")),
        url("audio_url", "رابط التسجيل الصوتي (MP3)", "", "ارفع الملف في أي مكان وضع رابطه هنا. يفضّل أقل من 30 ثانية"),
        image("image_1", "صورة 1", ""),
        image("image_2", "صورة 2", ""),
        image("image_3", "صورة 3", ""),
        image("avatar", "صورة العميل", "", "اختياري، تظهر الأحرف الأولى عند عدم رفع صورة"),
        sw("verified", "عميل مؤكد", false, "فعّله فقط لعميل اشترى المنتج فعلاً"),
        line("rv-item-line", "تفاصيل الشراء"),
        text("bought", "اشترى", L("", ""), { desc: "مثل لحاف كينج - متوسط" }),
        text("topics", "مواضيع الرأي", L("", ""), { desc: "مفصولة بفاصلة، مثل: الدفء، النعومة. تظهر أزرار فلترة بها" }),
      ], [
        // Filled per template
      ], 0, 12),
      ...colorFields(),
    ],
  },
  {
    title: "هدية مع طلبك",
    icon: "sicon-gift",
    name: "gift-bar",
    key: "944a0b49-a119-40c6-80b0-b87ac8a3de99",
    image: "",
    props: { "min-height": "200px" },
    fields: [
      ...sectionBase(L("هدية مع طلبك", "A gift with your order"), L("", ""), "gifts"),
      collection("tiers", "هدية", [
        num("amount", "عند الشراء بمبلغ", 300, 1, 100000),
        text("reward", "الهدية", L("", "")),
        image("image", "صورة الهدية", ""),
      ], [], 0, 3),
      text("wrap_text", "سطر التغليف", L("", ""), { desc: "مثل كل الطلبات تتغلف هدية مجاناً" }),
      line("gb-line-1", "الهدية نفسها تعملها في سلة (التسويق ← العروض الخاصة). القسم بيعرضها ويحسب الباقي من السلة، ومش بيضيف حاجة لوحده"),
      ...colorFields(),
    ],
  },
  {
    title: "شريط الثقة",
    icon: "sicon-shield-check",
    name: "trust-strip",
    key: "cc79ffdb-1ecd-4f81-b1fc-752967e7e001",
    image: "",
    props: { "min-height": "120px" },
    fields: [
      ...sectionBase(L("", ""), L("", ""), "trust"),
      drop("layout", "الشكل", [["compact", "شريط صغير"], ["full", "قسم كامل"]], "compact", "الشريط الصغير يخفي العنوان، ويظهر لو مفيش خطوات"),
      collection("badges", "ميزة", [icon("icon", "الأيقونة", "sicon-check"), text("text", "النص", L("", ""))], [], 0, 6),
      line("ts-line-1", "إزاي بنعملها (اختياري)"),
      collection("steps", "خطوة", [text("title", "العنوان", L("", "")), area("text", "الوصف", L("", "")), image("image", "صورة", "")], [], 0, 4),
      ...colorFields(),
    ],
  },
  {
    title: "الأسئلة الشائعة",
    icon: "sicon-help",
    name: "faq",
    key: "b4c240ef-5f25-4e05-90cb-87b0d07b9ec0",
    image: "",
    props: { "min-height": "240px" },
    fields: [
      ...sectionBase(L("أسئلة متكررة", "Questions"), L("", ""), "faq"),
      collection("faqs", "سؤال", [text("q", "السؤال", L("", "")), area("a", "الإجابة", L("", ""))], [], 0, 10),
      ...colorFields(),
    ],
  },
  {
    title: "تذييل الصفحة",
    icon: "sicon-window-layout",
    name: "page-footer",
    key: "ea053b47-a43d-4a89-9ac4-62eb17f18086",
    image: "",
    props: { "min-height": "160px" },
    fields: [
      image("logo", "الشعار", "", "اتركه فارغاً لاستخدام شعار متجرك"),
      image("logo_dark", "شعار الوضع الداكن", ""),
      area("about", "نبذة قصيرة", L("", "")),
      line("ft-line-1", "التواصل"),
      text("phone", "رقم الجوال", "", { multilang: false, placeholder: "+966500000000" }),
      text("whatsapp", "رقم واتساب", "", { multilang: false, placeholder: "966500000000" }),
      text("email", "البريد الإلكتروني", "", { multilang: false }),
      collection("social", "حساب", [icon("icon", "الأيقونة", "sicon-instagram"), url("url", "الرابط", "")], [], 0, 6),
      line("ft-line-2"),
      sw("show_payments", "إظهار وسائل الدفع المفعلة في المتجر", true),
      text("copyright", "نص الحقوق", L("© {year} {store}", "© {year} {store}"), { desc: "{year} تصبح السنة الحالية و{store} اسم متجرك" }),
      ...colorFields(),
    ],
  },
  {
    title: "شريط الشراء الثابت",
    icon: "sicon-shopping-bag",
    name: "sticky-buy",
    key: "3bd0c775-170c-4d76-bee3-63b820bbfe9b",
    image: "",
    props: { "min-height": "64px" },
    fields: [
      line("sb-line-1", "يظهر أسفل الشاشة بعد تجاوز القسم الأول، ويختفي عند ظهور الشراء السريع"),
      drop("show_on", "يظهر على", [["both", "الجوال والكمبيوتر"], ["mobile", "الجوال فقط"], ["desktop", "الكمبيوتر فقط"]], "both"),
      sw("show_price", "إظهار اسم المنتج والسعر", true),
      sw("show_quantity", "إظهار الكمية", true, "الكمية المختارة تنتقل للشراء السريع"),
      text("buy_text", "نص الزر", L("اشتري الآن", "Buy now"), { desc: "في صفحة العروض يظهر نص الزر الرئيسي للصفحة إذا تركته فارغاً" }),
      ...colorFields(),
    ],
  },
];

const applyValues = (component, values = {}) => {
  const copy = structuredClone(component);
  for (const field of copy.fields || []) {
    if (!(field.id in values)) continue;
    field.value = values[field.id];
    if (field.format === "dropdown-list" || field.format === "switch") field.selected = values[field.id];
  }
  return copy;
};

const file = `${ROOT}/twilight-bundle.json`;
const bundle = JSON.parse(fs.readFileSync(file, "utf8"));
bundle.components = components;
const previous = new Map((bundle.templates || []).map((t) => [t.path, t]));
bundle.templates = templates.map((t) => ({
  id: t.id,
  path: `templates.${t.name}`,
  category_id: t.category_id,
  primary_color: "",
  // RESET_THUMBS=1 points back at the local thumbnails so tw-preview uploads the new ones
  thumbnail: (!process.env.RESET_THUMBS && previous.get(`templates.${t.name}`)?.thumbnail) || `templates-thumbs/${t.name}.jpg`,
  is_default: t.is_default,
  ...(previous.get(`templates.${t.name}`)?.public_preview_url ? { public_preview_url: previous.get(`templates.${t.name}`).public_preview_url } : {}),
}));
fs.writeFileSync(file, JSON.stringify(bundle, null, 4) + "\n");

if (templates.length) fs.mkdirSync(`${ROOT}/templates`, { recursive: true });
for (const t of templates) {
  const unknown = t.order.filter((name) => !components.some((c) => c.name === name));
  if (unknown.length) throw new Error(`unknown component in ${t.name}: ${unknown.join(", ")}`);
  const list = t.order.map((name) => applyValues(components.find((c) => c.name === name), t.values[name]));
  fs.writeFileSync(`${ROOT}/templates/${t.name}.json`, JSON.stringify({ id: t.id, components: list }, null, 2) + "\n");
}
console.log("components:", components.map((c) => c.name).join(", ") || "(none)");
console.log("templates:", templates.map((t) => `${t.name}(${t.order.length})`).join(", ") || "(none)");
