# مفارش (Mafarish): بيانات النشر في متجر الثيمات

## الاسم
- AR: مفارش
- EN: Mafarish

## الوصف

الاسم والوصف القصير متكتبين في `twilight-bundle.json`. لو حفظت أي إعداد من البوابة، اعمل `git pull` واتأكد إن الوصف والاسم والتصنيف لسه سليمين.

**AR (قصير):** صفحة هبوط للمفارش والبطانيات بدليل الدفء والمقاس وبناء السرير

**AR (طويل):**
صفحة هبوط لمتاجر المفارش واللحافات بهدف واحد واضح: العميل يختار المفرش الصح ويشتريه.
13 قسماً، وكل قسم بيشتغل لوحده:
- القسم الافتتاحي مع "كمّل الطقم"، ومنه لون البراند ووضع الصفحة.
- درجة الدفء (خفيف ومتوسط وثقيل) مع "دفا مدينتك" اللي يقترح الدرجة حسب برودة مدينة العميل.
- دليل المقاس برسمة للسرير والمفرش، وتفاصيل الطقم بالقطع ورموز الغسيل.
- قارن الخامات، وابنِ سريرك بخصم الباقة، واختبار "أي مفرش يناسبك؟".
- اشترِ اللوك كله من صورة غرفة، وهدية مع طلبك.
- شريط الثقة، وآراء العملاء بفلاتر وصور وتسجيلات صوتية، والأسئلة، وشريط الشراء الثابت.

سلة جانبية: العميل يضيف كذا منتج وهو في الصفحة، ويشوف الإجمالي، وبعدين يكمّل الطلب.
ثلاثة قوالب جاهزة، كل واحد بهدف: دفا الشتاء (اختيار الدفء والمقاس)، وليالي فاخرة (الطقم الفاخر)، وموسم الهدايا (المفرش هدية).
كل النصوص بالعربي والإنجليزي، والتصميم متوافق مع الجوال، وفيه وضع داكن.

**EN (short):** A bedding landing page with a warmth guide, a size guide and a build-your-bed set

**EN (long):**
A landing page for bedding stores with one clear goal: shoppers pick the right set and buy it.
13 sections, each one works on its own:
- A hero with "complete the set" add-ons, which also sets the brand color and page mode.
- A warmth guide (light, medium, heavy) with a city picker that suggests a level from how cold the shopper's city gets.
- A size guide with a bed drawing, and set details with pieces and care symbols.
- A fabric comparison, build your bed with a set discount, and a "which one suits you?" quiz.
- Shop the room from a photo, and a gift with your order.
- A trust bar, reviews with filters, photos and voice notes, FAQs and a sticky buy bar.

A side cart: shoppers add several products without leaving the page, see the total, then check out.
Three ready templates, each with one goal: winter warm (warmth and size), night luxe (the luxe set) and gift season (bedding as a gift).
Every text is in Arabic and English, every section works on phones, and there is a dark mode.

## السعر المقترح
299 ريال (مرة واحدة). البوابة بتقبل من 250 لـ 5000.

## التصنيف
القوالب التلاتة على "مستلزمات المنزل" (`989286562`).

## الصور (بالترتيب ده، 1600×1200، أقل من 200KB)

كل صورة بتعرض ميزة على لابتوب وجوال، من غير كتابة أو شعار فوق الصورة (قاعدة سلة 4.9).
الصور والأيقونة في branch `store-assets` جوه `marketplace/`، عشان حجم المجموعة يفضل أقل من 1 MB:
https://github.com/ahmedhelm-y/tw-blankets/tree/store-assets/marketplace

| الملف | العنوان AR | Title EN | الوصف AR | Description EN |
|---|---|---|---|---|
| `01-winter-page.jpg` | صفحة منتج تبيع | A product page that sells | المنتج بخياراته، و"كمّل الطقم" بإضافات تدخل السلة معاه | The product with its options, and add-ons that go in the cart with it |
| `02-warmth-guide.jpg` | درجة الدفء ودفا مدينتك | Warmth by city | العميل يختار مدينته فتتقترح له الدرجة المناسبة | Shoppers pick their city and get the right warmth |
| `03-size-guide.jpg` | دليل المقاس برسمة | A drawn size guide | مقاس المفرش لكل سرير، وكام سم ينزل من كل جنب | The cover size for each bed, and how far it drops |
| `04-set-details.jpg` | إيه اللي في الطقم | What's in the set | كل قطعة بعددها ومقاسها، ورموز الغسيل | Every piece with its count and size, and care symbols |
| `05-fabrics.jpg` | قارن الخامات | Compare fabrics | الإحساس والدفء ومناسبة لمين، لكل خامة | Feel, warmth and who it suits, for each fabric |
| `06-build-your-bed.jpg` | ابنِ سريرك ووفّر | Build your bed and save | لحاف وشرشف ومخدات خطوة بخطوة، بخصم الباقة | Comforter, sheets and pillows step by step, with a set discount |
| `07-bed-quiz.jpg` | أي مفرش يناسبك؟ | Which set suits you? | 3 أسئلة بتقترح المفرش المناسب للعميل | Three questions that suggest the right set |
| `08-shop-the-room.jpg` | اشترِ الغرفة كما هي | Shop the room | نقط على صورة الغرفة، وكل القطع للسلة مرة واحدة | Dots on a room photo, and every piece to the cart at once |
| `09-side-cart.jpg` | سلة جانبية | A side cart | يضيف كذا منتج ويكمّل الطلب من غير ما يسيب الصفحة | Add several products and check out without leaving the page |
| `10-trust-and-reviews.jpg` | ثقة وآراء العملاء | Trust and reviews | مميزات الشراء، وآراء بفلاتر حسب الموضوع | Store benefits, and reviews filtered by topic |
| `11-gifts-and-faq.jpg` | هدية مع طلبك والأسئلة | A gift with your order, and FAQs | هدية حسب قيمة السلة، وأسئلة بتفتح وتقفل | A gift by order total, and expandable FAQs |

**الأيقونة:** `icon.png` (1024×1024) في نفس الفولدر.

## بيانات الدعم

سلة رفضت موقع الشركة لأن الحساب فردي، فموقع الدعم بقى حساب X الشخصي، ومعاه رقم الجوال ولينك الواتساب.

| الخانة | القيمة |
|---|---|
| Support email | ahmedhelmy2722@gmail.com |
| Support website | https://x.com/ah_helmy22 |
| Support phone | +966545178179 |
| Live chat | https://wa.me/966545178179 |
| Documentation link | https://ahmedhelm-y.github.io/tw-blankets/marketplace/help.html (بعد تفعيل GitHub Pages) |
| Support service | Email Support |

## سجل التحديثات
`CHANGELOG.md` في الريبو: https://github.com/ahmedhelm-y/tw-blankets/blob/main/CHANGELOG.md
