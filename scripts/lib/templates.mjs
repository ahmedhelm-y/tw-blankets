// Template content for the three Mafrashik templates. Products come from the preview store (1616473), which
// holds sample fashion products; the photos are free Burst photos kept on the store-assets branch, and the
// texts are written for bedding. The merchant swaps the products and photos for their own.
import { L, opt } from "./fields.mjs";

const ASSETS = "https://raw.githubusercontent.com/ahmedhelm-y/tw-blankets/store-assets/";
const img = (name) => `${ASSETS}img/${name}.jpg`;
// Sample logo for the template previews; the merchant swaps it for their own, or clears it to use the store logo
const logo = { logo: `${ASSETS}logo/logo.png`, logo_dark: `${ASSETS}logo/logo-dark.png` };
const sel = (value, label) => [opt(value, label)];
const product = (id, name) => [{ label: name, value: id, key: String(id) }];
const many = (...list) => list.flatMap(([id, name]) => product(id, name));
const rows = (prefix, list) => list.map((row) => Object.fromEntries(Object.entries(row).map(([k, v]) => [`${prefix}.${k}`, v])));

const MAIN = product(45289979, "فستان");

export const ORDER = ["page-header", "hero", "trust-strip", "warmth-guide", "size-guide", "set-details", "fabric-compare", "build-bed",
  "bed-quiz", "shop-room", "gift-bar", "reviews", "faq", "page-footer", "sticky-buy"];

const LEVELS = rows("levels", [
  { name: L("خفيف", "Light"), option_value: "", badge: L("", ""), ideal_for: L("للي يحس بالحر بالليل، وللمكيّف", "For warm sleepers and air-conditioned rooms"),
    spec_1: L("الحشوة: 200 جم/م²", "Fill: 200 g/m²"), spec_2: L("مناسب لجدة والدمام", "Suits Jeddah and Dammam"), warmth: 2, image: img("warm-light") },
  { name: L("متوسط", "Medium"), option_value: "", badge: L("الأكثر مبيعاً", "Bestseller"), ideal_for: L("لأغلب الناس، من أول الشتاء لآخره", "For most people, all winter long"),
    spec_1: L("الحشوة: 350 جم/م²", "Fill: 350 g/m²"), spec_2: L("مناسب للرياض والمدينة", "Suits Riyadh and Madinah"), warmth: 3, image: img("warm-medium") },
  { name: L("ثقيل", "Heavy"), option_value: "", badge: L("", ""), ideal_for: L("للي يبرد بسرعة، ولليالي الشمال", "For cold sleepers and northern nights"),
    spec_1: L("الحشوة: 500 جم/م²", "Fill: 500 g/m²"), spec_2: L("مناسب لتبوك وحائل وعرعر", "Suits Tabuk, Hail and Arar"), warmth: 5, image: img("warm-heavy") },
]);

const SIZES = rows("sizes", [
  { bed: L("مفرد", "Single"), bed_size: L("120×200 سم", "120×200 cm"), cover_size: L("160×220 سم", "160×220 cm"), option_value: "", note: L("لسرير الأطفال والمفرد", "For single and kids' beds") },
  { bed: L("نص", "Double"), bed_size: L("160×200 سم", "160×200 cm"), cover_size: L("220×240 سم", "220×240 cm"), option_value: "", note: L("", "") },
  { bed: L("كينج", "King"), bed_size: L("180×200 سم", "180×200 cm"), cover_size: L("240×260 سم", "240×260 cm"), option_value: "", note: L("الأكثر طلباً للغرف الرئيسية", "The usual choice for a master bedroom") },
  { bed: L("سوبر كينج", "Super king"), bed_size: L("200×200 سم", "200×200 cm"), cover_size: L("260×280 سم", "260×280 cm"), option_value: "", note: L("", "") },
]);

const PIECES = rows("pieces", [
  { type: sel("comforter", "لحاف"), name: L("", ""), count: 1, size: L("240×260 سم", "240×260 cm") },
  { type: sel("fitted-sheet", "شرشف بأستك"), name: L("", ""), count: 1, size: L("180×200 سم", "180×200 cm") },
  { type: sel("pillowcase", "كيس مخدة"), name: L("", ""), count: 4, size: L("50×75 سم", "50×75 cm") },
  { type: sel("cushion", "مخدة ديكور"), name: L("", ""), count: 2, size: L("45×45 سم", "45×45 cm") },
  { type: sel("bed-skirt", "تنورة سرير"), name: L("", ""), count: 1, size: L("", "") },
  { type: sel("throw", "بطانية"), name: L("بطانية طرف السرير", "Bed runner throw"), count: 1, size: L("", "") },
]);
const CARE = rows("care", [
  { symbol: sel("wash-30", "غسالة على 30°"), text: L("", "") },
  { symbol: sel("no-bleach", "بدون مبيض"), text: L("", "") },
  { symbol: sel("tumble-low", "مجفف على حرارة واطية"), text: L("", "") },
  { symbol: sel("no-iron", "بدون كي"), text: L("", "") },
]);

const FABRICS = rows("fabrics", [
  { name: L("مخمل", "Velvet"), tagline: L("ناعم وفخم", "Soft and rich"), image: img("fabric-satin"), feel: L("ملمس ناعم ولمعة خفيفة", "Smooth with a soft sheen"), warmth: 4,
    best_for: L("غرف الضيوف والمناسبات", "Guest rooms and occasions"), badge: L("", ""), link_text: L("شوف درجات الدفء", "See the warmth levels"), link: "warmth" },
  { name: L("فرو", "Faux fur"), tagline: L("أدفى خامة عندنا", "Our warmest fabric"), image: img("fabric-fur"), feel: L("كثيف ومنفوش", "Thick and fluffy"), warmth: 5,
    best_for: L("اللي يبرد بسرعة", "Cold sleepers"), badge: L("الأدفى", "Warmest"), link_text: L("", ""), link: "" },
  { name: L("قطن", "Cotton"), tagline: L("يتنفس ويدوم", "Breathes and lasts"), image: img("fabric-cotton"), feel: L("ناعم ومنعش، ويزيد نعومة مع الغسيل", "Soft and fresh, softer with every wash"), warmth: 2,
    best_for: L("أول الشتاء والغرف الدافية", "Early winter and warm rooms"), badge: L("", ""), link_text: L("", ""), link: "" },
  { name: L("مايكروفايبر", "Microfiber"), tagline: L("خفيف وسهل الغسيل", "Light and easy to wash"), image: img("fabric-quilt"), feel: L("خفيف وما يكرمش", "Light and wrinkle free"), warmth: 3,
    best_for: L("الاستخدام اليومي والأطفال", "Everyday use and kids"), badge: L("", ""), link_text: L("", ""), link: "" },
]);

const STEPS = rows("steps", [
  { title: L("اختر اللحاف", "Choose the comforter"), products: many([45289979, "فستان"], [530339837, "فستان"], [819393274, "فستان"]), optional: false },
  { title: L("اختر الشرشف", "Choose the sheets"), products: many([1769567998, "بلوزة"], [2052836592, "بلوزة"], [1303857404, "جاكيت"]), optional: false },
  { title: L("أضف مخدات", "Add pillows"), products: many([1411443697, "تنورة"], [679390711, "تنورة"]), optional: true },
]);

const QUESTIONS = rows("questions", [
  { q: L("تحس بالبرد ولا الحر وأنت نايم؟", "Do you sleep cold or warm?"), a1: L("أحس بالحر", "I sleep warm"), a1_to: sel("1", "النتيجة 1"),
    a2: L("بين وبين", "In between"), a2_to: sel("2", "النتيجة 2"), a3: L("أبرد بسرعة", "I get cold fast"), a3_to: sel("3", "النتيجة 3") },
  { q: L("الغرفة فيها مكيف شغال بالليل؟", "Is the AC on at night?"), a1: L("دايماً", "Always"), a1_to: sel("1", "النتيجة 1"),
    a2: L("أحياناً", "Sometimes"), a2_to: sel("2", "النتيجة 2"), a3: L("لا", "No"), a3_to: sel("3", "النتيجة 3") },
  { q: L("تحب الملمس كيف؟", "Which feel do you like?"), a1: L("قطني ومنعش", "Crisp cotton"), a1_to: sel("1", "النتيجة 1"),
    a2: L("ناعم وخفيف", "Soft and light"), a2_to: sel("2", "النتيجة 2"), a3: L("فرو ومنفوش", "Fluffy fur"), a3_to: sel("3", "النتيجة 3") },
]);
const RESULTS = {
  r1_title: L("لحاف قطن خفيف", "A light cotton comforter"), r1_text: L("يتنفس ويخليك مرتاح مع المكيف، ويكفي ليالي المدن الدافية", "Breathes with the AC on, and enough for warm-city nights"),
  r1_product: product(530339837, "فستان"), r1_image: img("warm-light"),
  r2_title: L("لحاف متوسط لكل الشتاء", "A medium comforter for all winter"), r2_text: L("الاختيار الأكثر مبيعاً: دافي من غير ما يثقل عليك", "Our bestseller: warm without the weight"),
  r2_product: MAIN, r2_image: img("warm-medium"),
  r3_title: L("مفرش فرو ثقيل", "A heavy faux fur set"), r3_text: L("أدفى ما عندنا، لليالي الباردة وللي يبرد بسرعة", "Our warmest, for cold nights and cold sleepers"),
  r3_product: product(819393274, "فستان"), r3_image: img("warm-heavy"),
};

const SPOTS = (a, b, c) => rows("spots", [
  { product: product(45289979, "فستان"), ...a },
  { product: product(1769567998, "بلوزة"), ...b },
  { product: product(1411443697, "تنورة"), ...c },
]);

const TIERS = rows("tiers", [
  { amount: 300, reward: L("كيسين مخدة هدية", "Two free pillowcases"), image: "" },
  { amount: 600, reward: L("بطانية صغيرة هدية", "A free throw blanket"), image: img("gift") },
]);

const BADGES = rows("badges", [
  { icon: "sicon-shipping-fast", text: L("توصيل لكل مدن المملكة", "Delivery across the Kingdom") },
  { icon: "sicon-rotate", text: L("استبدال خلال 7 أيام", "7-day exchange") },
  { icon: "sicon-wallet", text: L("قسّطها على 4 دفعات", "Split it into 4 payments") },
  { icon: "sicon-gift", text: L("تغليف هدية مجاني", "Free gift wrap") },
]);

const REVIEWS = rows("items", [
  { name: L("أم فيصل", "Umm Faisal"), city: L("الرياض", "Riyadh"), place: L("", ""), rate: 5, text: L("اللحاف المتوسط دافي مرة ومو ثقيل، وريحته حلوة من أول ما فتحته.", "The medium comforter is really warm and not heavy."),
    audio_url: "", image_1: img("warm-medium"), image_2: "", image_3: "", avatar: "", verified: true, bought: L("لحاف متوسط - كينج", "Medium comforter - King"), topics: L("الدفء، النعومة", "Warmth, Softness") },
  { name: L("عبدالله", "Abdullah"), city: L("تبوك", "Tabuk"), place: L("", ""), rate: 5, text: L("أخذت الثقيل لأن الشتاء عندنا قاسي، وفعلاً ما احتجت بطانية فوقه.", "I took the heavy one for our harsh winter, and needed nothing on top."),
    audio_url: "", image_1: "", image_2: "", image_3: "", avatar: "", verified: true, bought: L("لحاف ثقيل - سوبر كينج", "Heavy comforter - Super king"), topics: L("الدفء", "Warmth") },
  { name: L("نورة", "Noura"), city: L("جدة", "Jeddah"), place: L("", ""), rate: 4, text: L("المقاس مضبوط على السرير ونازل من الجنبين، والقطن ناعم.", "The size fits the bed and drops on both sides; the cotton is soft."),
    audio_url: "", image_1: img("room-loft"), image_2: "", image_3: "", avatar: "", verified: true, bought: L("طقم قطن - نص", "Cotton set - Double"), topics: L("المقاس، النعومة", "Size, Softness") },
  { name: L("ريم", "Reem"), city: L("الدمام", "Dammam"), place: L("", ""), rate: 5, text: L("الطقم وصل مغلف هدية ومعاه كيسين مخدة هدية، عجبني التغليف.", "The set came gift wrapped with two free pillowcases."),
    audio_url: "", image_1: "", image_2: "", image_3: "", avatar: "", verified: true, bought: L("طقم 10 قطع", "10-piece set"), topics: L("التغليف", "Packaging") },
]);

const FAQS = rows("faqs", [
  { q: L("كيف أعرف المقاس المناسب لسريري؟", "How do I find the right size?"), a: L("قيس عرض وطول المرتبة، واختر مقاسها في دليل المقاس فوق. المفرش أعرض من السرير عشان ينزل من الجنبين.", "Measure the mattress and pick it in the size guide above.") },
  { q: L("أقدر أغسل اللحاف في الغسالة؟", "Can I machine wash it?"), a: L("أيوه، على 30 درجة بدون مبيض، ونشّفه على حرارة واطية. التفاصيل في قسم العناية.", "Yes, at 30° without bleach; tumble dry low.") },
  { q: L("كم يأخذ التوصيل؟", "How long is delivery?"), a: L("من 2 إلى 5 أيام عمل حسب المدينة.", "2 to 5 working days depending on the city.") },
  { q: L("أقدر أستبدل المقاس؟", "Can I exchange the size?"), a: L("أيوه، خلال 7 أيام من الاستلام والمنتج في تغليفه.", "Yes, within 7 days of delivery in its packaging.") },
]);

const common = {
  "trust-strip": { badges: BADGES },
  "warmth-guide": { product: MAIN, levels: LEVELS },
  "size-guide": { product: MAIN, sizes: SIZES },
  "set-details": { pieces: PIECES, care: CARE, image: img("set"), care_note: L("عشان المفرش يفضل ناعم سنين، اغسله لوحده أول مرة.", "Wash it on its own the first time to keep it soft for years.") },
  "fabric-compare": { fabrics: FABRICS },
  "build-bed": { steps: STEPS, discount_percent: 15, offer_text: L("خصم 15% على السرير الكامل", "15% off the whole bed") },
  "bed-quiz": { questions: QUESTIONS, ...RESULTS, image: img("quiz") },
  "gift-bar": { tiers: TIERS, wrap_text: L("كل الطلبات تتغلف هدية مجاناً", "Every order comes gift wrapped") },
  reviews: { items: REVIEWS, summary_text: L("أكثر شيء مدحوه: الدفء من غير ثقل، والمقاس المضبوط.", "What they praise most: warmth without weight, and the right size.") },
  faq: { faqs: FAQS },
};
const footer = (about) => ({ ...logo, about, show_payments: true });
const hero = (image, extra = {}) => ({ image, image_mobile: image, product: MAIN, addons: many([1769567998, "بلوزة"], [2052836592, "بلوزة"]), ...extra });

export const templates = [
  {
    name: "winter-warm",
    id: "9b5bd8b6-ad54-484a-a254-73edbb2edf46",
    // مستلزمات المنزل
    category_id: "989286562",
    is_default: true,
    order: ORDER,
    values: {
      ...common,
      "page-header": { ...logo, brand_color: "#8a5a3b", default_mode: sel("light", "فاتح"), sticky: true,
        nav: rows("nav", [{ label: L("درجة الدفء", "Warmth"), target: "warmth" }, { label: L("المقاسات", "Sizes"), target: "size" }, { label: L("ابنِ سريرك", "Build your bed"), target: "bed" }]) },
      hero: hero(img("hero-blue"), { layout: sel("split", "النص بجانب الصورة") }),
      "shop-room": { image: img("room-loft"), spots: SPOTS({ x: 46, y: 62 }, { x: 33, y: 47 }, { x: 13, y: 52 }) },
      "page-footer": footer(L("مفارش ولحافات تدفّيك طول الشتاء", "Bedding that keeps you warm all winter")),
    },
  },
  {
    name: "night-luxe",
    id: "5b60f8c2-13e9-46a3-97e2-d4f174b0f5be",
    category_id: "989286562",
    is_default: false,
    order: ["page-header", "hero", "trust-strip", "fabric-compare", "warmth-guide", "shop-room", "set-details", "build-bed", "size-guide",
      "reviews", "gift-bar", "bed-quiz", "faq", "page-footer", "sticky-buy"],
    values: {
      ...common,
      "page-header": { ...logo, brand_color: "#b08d57", default_mode: sel("dark", "داكن"), sticky: true, transparent: true,
        nav: rows("nav", [{ label: L("الخامات", "Fabrics"), target: "fabrics" }, { label: L("الغرفة", "The room"), target: "room" }, { label: L("الأسئلة", "FAQ"), target: "faq" }]) },
      hero: hero(img("hero-dark"), { layout: sel("overlay", "النص فوق الصورة"), overlay: 45, badge: L("مجموعة الليل", "The night collection"),
        title: L("فخامة الفندق في غرفتك", "Hotel luxury in your own room"), subtitle: L("مخمل وفرو بألوان هادية، لنوم أعمق في ليالي الشتاء", "Velvet and faux fur in calm tones, for deeper winter sleep") }),
      "shop-room": { image: img("room-brown"), spots: SPOTS({ x: 55, y: 70 }, { x: 52, y: 42 }, { x: 72, y: 45 }) },
      "page-footer": footer(L("مفارش فاخرة لليالي الشتاء", "Luxury bedding for winter nights")),
    },
  },
  {
    name: "gift-season",
    id: "0629bf15-1bfd-426a-82b6-36283a7c01f8",
    category_id: "989286562",
    is_default: false,
    order: ["page-header", "hero", "gift-bar", "bed-quiz", "warmth-guide", "fabric-compare", "build-bed", "set-details", "size-guide",
      "shop-room", "reviews", "trust-strip", "faq", "page-footer", "sticky-buy"],
    values: {
      ...common,
      "page-header": { ...logo, brand_color: "#b5536f", default_mode: sel("light", "فاتح"), sticky: true,
        nav: rows("nav", [{ label: L("الهدايا", "Gifts"), target: "gifts" }, { label: L("الاختبار", "Quiz"), target: "quiz" }, { label: L("الأسئلة", "FAQ"), target: "faq" }]) },
      hero: hero(img("hero-pink"), { layout: sel("split", "النص بجانب الصورة"), badge: L("هدية الشتاء", "The winter gift"),
        title: L("أدفى هدية لمن تحب", "The warmest gift for someone you love"), subtitle: L("مفرش ناعم يوصل مغلف هدية، ومعه هدية منا فوق 300 ريال", "A soft set that arrives gift wrapped, with a gift from us over 300 SAR") }),
      "shop-room": { image: img("room-yellow"), spots: SPOTS({ x: 50, y: 75 }, { x: 38, y: 48 }, { x: 72, y: 60 }) },
      "page-footer": footer(L("هدايا الشتاء الدافية", "Warm winter gifts")),
    },
  },
];
