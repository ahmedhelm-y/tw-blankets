import { svg as e, nothing as n, html as r } from "lit";
import { p as C } from "./bedding-BSPlFaov.js";
import { a as D, g as v, u as w, r as o, i as H, t as m } from "./styles-CLr0WKdM.js";
import { M as S } from "./section-DQASqLF9.js";
const z = (a) => e`<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round"
  stroke-linejoin="round" aria-hidden="true">${a}</svg>`, p = e`<path d="M6 16h36l-4 22H10z" /><path d="M6 16c3 3 6 3 9 0s6-3 9 0 6 3 9 0 6-3 9 0" />`, d = e`<path d="M8 8l32 32M40 8L8 40" />`, M = e`<path d="M8 34h32l-3-12c-1-4-4-6-8-6H18l-3 6" /><path d="M8 34l4-12h24" />`, g = {
  comforter: { ar: "لحاف", en: "Comforter", icon: e`<rect x="6" y="12" width="36" height="26" rx="4" /><path d="M6 21h36M6 30h36M18 12v26M30 12v26" />` },
  "duvet-cover": { ar: "غطاء لحاف", en: "Duvet cover", icon: e`<rect x="6" y="10" width="36" height="28" rx="3" /><path d="M6 32h36M14 35h2M22 35h2M30 35h2" />` },
  "flat-sheet": { ar: "شرشف", en: "Flat sheet", icon: e`<path d="M8 12h32v20l-6 6H8z" /><path d="M34 38v-6h6" />` },
  "fitted-sheet": { ar: "شرشف بأستك", en: "Fitted sheet", icon: e`<rect x="8" y="14" width="32" height="20" rx="6" /><path d="M8 20c4 2 4 6 0 8M40 20c-4 2-4 6 0 8" />` },
  pillowcase: { ar: "كيس مخدة", en: "Pillowcase", icon: e`<path d="M8 16c0-3 2-4 5-4h22c3 0 5 1 5 4v16c0 3-2 4-5 4H13c-3 0-5-1-5-4z" /><path d="M32 12v24" />` },
  pillow: { ar: "مخدة", en: "Pillow", icon: e`<path d="M7 18c0-4 3-6 6-6h22c3 0 6 2 6 6v12c0 4-3 6-6 6H13c-3 0-6-2-6-6z" /><path d="M13 12c2 4 2 20 0 24M35 12c-2 4-2 20 0 24" />` },
  cushion: { ar: "مخدة ديكور", en: "Cushion", icon: e`<path d="M10 10c5 3 23 3 28 0-3 5-3 23 0 28-5-3-23-3-28 0 3-5 3-23 0-28z" /><circle cx="24" cy="24" r="2.5" />` },
  throw: { ar: "بطانية", en: "Throw", icon: e`<path d="M8 14h28a4 4 0 0 1 0 8H12a4 4 0 0 0 0 8h28" /><path d="M8 38h32" />` },
  "bed-skirt": { ar: "تنورة سرير", en: "Bed skirt", icon: e`<rect x="8" y="12" width="32" height="12" rx="2" /><path d="M8 24l2 14M16 24v14M24 24v14M32 24v14M40 24l-2 14" />` },
  protector: { ar: "واقي مرتبة", en: "Mattress protector", icon: e`<rect x="6" y="14" width="36" height="20" rx="4" /><path d="M12 20h24M12 28h24" stroke-dasharray="3 4" />` }
}, _ = {
  "wash-30": { ar: "غسالة على 30°", en: "Machine wash 30°", icon: e`${p}<text x="24" y="33" font-size="11" font-weight="700" text-anchor="middle" fill="currentColor" stroke="none">30</text>` },
  "wash-40": { ar: "غسالة على 40°", en: "Machine wash 40°", icon: e`${p}<text x="24" y="33" font-size="11" font-weight="700" text-anchor="middle" fill="currentColor" stroke="none">40</text>` },
  "hand-wash": { ar: "غسيل يدوي", en: "Hand wash", icon: e`${p}<path d="M19 34v-8c0-1 2-1 2 0v5M21 31v-7c0-1 2-1 2 0v7M23 31v-6c0-1 2-1 2 0v6M25 31v-4c0-1 2-1 2 0v5c0 3-2 5-5 5h-1c-2 0-3-1-4-3" />` },
  "no-bleach": { ar: "بدون مبيض", en: "Do not bleach", icon: e`<path d="M24 8l18 32H6z" />${d}` },
  "tumble-low": { ar: "مجفف على حرارة واطية", en: "Tumble dry low", icon: e`<rect x="8" y="8" width="32" height="32" rx="3" /><circle cx="24" cy="24" r="11" /><circle cx="24" cy="24" r="1.5" fill="currentColor" />` },
  "no-tumble": { ar: "بدون مجفف", en: "Do not tumble dry", icon: e`<rect x="8" y="8" width="32" height="32" rx="3" /><circle cx="24" cy="24" r="11" />${d}` },
  "line-dry": { ar: "نشر على الحبل", en: "Line dry", icon: e`<rect x="8" y="8" width="32" height="32" rx="3" /><path d="M8 14c8 8 24 8 32 0" />` },
  "dry-flat": { ar: "تجفيف مفرود", en: "Dry flat", icon: e`<rect x="8" y="8" width="32" height="32" rx="3" /><path d="M14 24h20" />` },
  "iron-low": { ar: "كي على حرارة واطية", en: "Iron low", icon: e`${M}<circle cx="24" cy="28" r="1.5" fill="currentColor" />` },
  "no-iron": { ar: "بدون كي", en: "Do not iron", icon: e`${M}${d}` },
  "dry-clean": { ar: "تنظيف جاف", en: "Dry clean", icon: e`<circle cx="24" cy="24" r="15" />` },
  "no-dry-clean": { ar: "بدون تنظيف جاف", en: "Do not dry clean", icon: e`<circle cx="24" cy="24" r="15" />${d}` }
};
function I(a) {
  return z((g[a] || g.comforter).icon);
}
function b(a) {
  return _[a] ? z(_[a].icon) : null;
}
const T = `
.mf-sd__wrap { display: grid; gap: 1.5rem; }
@container (min-width: 900px) { .mf-sd__wrap.has-image { grid-template-columns: 5fr 7fr; align-items: center; gap: 2.5rem; } }
.mf-sd__image { width: 100%; aspect-ratio: 4 / 3; object-fit: cover; border-radius: 1.5rem; }
.mf-sd__total { display: flex; align-items: baseline; gap: .625rem; margin-bottom: 1rem; color: var(--mf-title); }
.mf-sd__total b { font-size: 3rem; font-weight: 900; line-height: 1; color: var(--mf-accent-ink); }
.mf-sd__total span { font-size: 1.125rem; font-weight: 800; }
.mf-sd__pieces { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 9.5rem), 1fr)); gap: .75rem; margin: 0; padding: 0; list-style: none; }
.mf-sd__piece { position: relative; display: grid; justify-items: center; gap: .375rem; padding: 1rem .75rem; border-radius: 1.125rem; background: var(--mf-card); text-align: center; }
.mf-sd__piece svg { width: 2.75rem; height: 2.75rem; color: var(--mf-accent-ink); }
.mf-sd__count { position: absolute; top: .5rem; inset-inline-end: .5rem; min-width: 1.75rem; height: 1.75rem; display: grid; place-items: center; padding: 0 .375rem;
  border-radius: 999px; background: var(--mf-accent); color: var(--mf-accent-text); font-size: .8125rem; font-weight: 800; }
.mf-sd__name { font-weight: 800; color: var(--mf-title); line-height: 1.4; }
.mf-sd__size { font-size: .8125rem; }
.mf-sd__care { margin-top: 2rem; padding: 1.25rem; border-radius: 1.25rem; border: 1px solid color-mix(in srgb, var(--mf-text) 15%, transparent); }
.mf-sd__care h3 { margin: 0 0 1rem; font-size: 1.125rem; font-weight: 900; color: var(--mf-title); }
.mf-sd__symbols { display: flex; flex-wrap: wrap; gap: 1rem 1.5rem; margin: 0; padding: 0; list-style: none; }
.mf-sd__symbol { display: flex; align-items: center; gap: .625rem; font-size: .9375rem; font-weight: 600; color: var(--mf-title); }
.mf-sd__symbol svg { width: 2.25rem; height: 2.25rem; flex: 0 0 auto; color: var(--mf-title); }
.mf-sd__carenote { margin: 1rem 0 0; line-height: 1.7; }
`;
class $ extends S {
  constructor() {
    super(...arguments), this.styleId = "set-details";
  }
  styles() {
    return T;
  }
  render() {
    const i = this.cfg(), u = D() === "en", l = v(i.pieces, "pieces").map((t) => {
      const c = String(w(t.type) || "comforter"), s = g[c];
      return { type: c, name: o(t.name) || (s ? u ? s.en : s.ar : ""), count: Math.max(1, Math.round(Number(t.count) || 1)), size: o(t.size) };
    }).filter((t) => t.name).slice(0, 12), h = v(i.care, "care").map((t) => {
      const c = String(w(t.symbol) || ""), s = _[c];
      return { symbol: c, text: o(t.text) || (s ? u ? s.en : s.ar : "") };
    }).filter((t) => t.text && b(t.symbol)).slice(0, 8);
    if (!l.length && !h.length)
      return H() ? n : this.frame(r`<p class="mf-empty">${m({ ar: "أضف قطع الطقم ورموز الغسيل من إعدادات هذا القسم", en: "Add the set's pieces and care symbols in this section's settings" })}</p>`);
    const f = String(i.image || ""), x = C(l), k = o(i.care_title) || m({ ar: "العناية والغسيل", en: "Care" }), y = o(i.care_note);
    return this.frame(r`<div class=${`mf-sd__wrap${f ? " has-image" : ""}`}>
      ${f ? r`<img class="mf-sd__image" src=${f} alt="" loading="lazy" />` : n}
      <div>
        ${l.length ? r`${i.show_total !== !1 && x > 1 ? r`<div class="mf-sd__total"><b>${x}</b><span>${o(i.total_label) || m({ ar: "قطع في الطقم", en: "pieces in the set" })}</span></div>` : n}
            <ul class="mf-sd__pieces">${l.map((t) => r`<li class="mf-sd__piece">
              ${t.count > 1 ? r`<span class="mf-sd__count" aria-label=${m({ ar: `${t.count} قطع`, en: `${t.count} pieces` })}>×${t.count}</span>` : n}
              ${I(t.type)}<span class="mf-sd__name">${t.name}</span>${t.size ? r`<span class="mf-sd__size">${t.size}</span>` : n}</li>`)}</ul>` : n}
        ${h.length ? r`<div class="mf-sd__care"><h3>${k}</h3>
              <ul class="mf-sd__symbols">${h.map((t) => r`<li class="mf-sd__symbol">${b(t.symbol)}<span>${t.text}</span></li>`)}</ul>
              ${y ? r`<p class="mf-sd__carenote">${y}</p>` : n}</div>` : n}
      </div>
    </div>`, { extraClass: "mf-sd" });
  }
}
typeof $ < "u" && $.registerSallaComponent("salla-set-details");
export {
  $ as default
};
