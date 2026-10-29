import { nothing as o, html as n } from "lit";
import { state as p } from "lit/decorators.js";
import { unsafeHTML as w } from "lit/directives/unsafe-html.js";
import { C as b, l as y, a as v } from "./bedding-BSPlFaov.js";
import { f as $, g as _, r as m, a as x, t as l, i as k, m as C } from "./styles-CLr0WKdM.js";
import { D as I } from "./deals-C4JoRaDK.js";
import { p as N } from "./section-DQASqLF9.js";
var z = Object.defineProperty, h = (f, e, t, r) => {
  for (var i = void 0, s = f.length - 1, a; s >= 0; s--)
    (a = f[s]) && (i = a(e, t, i) || i);
  return i && z(e, t, i), i;
};
const F = `
.mf-wg__city { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: .75rem 1rem; margin: 0 auto 1.5rem; padding: 1rem 1.25rem;
  max-width: 46rem; border-radius: 1.25rem; background: var(--mf-card); }
.mf-wg__city label { font-weight: 800; color: var(--mf-title); }
.mf-wg__city select { min-height: 2.75rem; min-width: 12rem; padding: 0 .75rem; border: 1px solid color-mix(in srgb, var(--mf-text) 25%, transparent); border-radius: .625rem;
  background: var(--mf-bg); color: var(--mf-title); font: inherit; }
.mf-wg__advice { flex: 1 1 100%; margin: 0; text-align: center; line-height: 1.8; color: var(--mf-title); }
.mf-wg__advice b { color: var(--mf-accent-ink); }
.mf-wg__grid { display: grid; gap: .875rem; grid-template-columns: repeat(var(--mf-wg-n, 3), minmax(0, 1fr)); margin: 0; padding: 0; list-style: none; }
@container (max-width: 640px) { .mf-wg__grid { grid-template-columns: minmax(0, 1fr); } }
.mf-wg__card { position: relative; display: flex; flex-direction: column; width: 100%; height: 100%; padding: 0; border: 2px solid transparent; border-radius: 1.25rem;
  background: var(--mf-card); color: inherit; font: inherit; text-align: start; overflow: hidden; cursor: pointer; transition: border-color .2s ease, transform .2s ease; }
.mf-wg__card[aria-pressed="true"] { border-color: var(--mf-accent-ink); }
.mf-wg__card:focus-visible { outline: 3px solid var(--mf-accent-ink); outline-offset: 2px; }
.mf-wg__card img { width: 100%; aspect-ratio: 16 / 10; object-fit: cover; }
.mf-wg__badge { position: absolute; top: .75rem; inset-inline-start: .75rem; padding: .25rem .75rem; border-radius: 999px; background: var(--mf-accent);
  color: var(--mf-accent-text); font-size: .75rem; font-weight: 800; }
.mf-wg__body { display: grid; gap: .5rem; padding: 1rem 1.125rem 1.25rem; }
.mf-wg__name { font-size: 1.25rem; font-weight: 900; color: var(--mf-title); }
.mf-wg__dots { display: flex; gap: .25rem; }
.mf-wg__dots i { width: .875rem; height: .875rem; border-radius: 999px; background: color-mix(in srgb, var(--mf-text) 18%, transparent); }
.mf-wg__dots i.on { background: var(--mf-accent); }
.mf-wg__ideal { line-height: 1.7; }
.mf-wg__specs { display: grid; gap: .25rem; margin: 0; padding: 0; list-style: none; font-size: .875rem; }
.mf-wg__specs li::before { content: "•"; margin-inline-end: .375rem; color: var(--mf-accent-ink); }
.mf-wg__buy { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: .75rem 1rem; margin-top: 1.5rem; }
.mf-wg__buy select { min-height: 2.75rem; padding: 0 .75rem; border: 1px solid color-mix(in srgb, var(--mf-text) 25%, transparent); border-radius: .625rem;
  background: var(--mf-bg); color: var(--mf-title); font: inherit; }
.mf-wg__buy select[aria-invalid="true"] { border-color: #d92d20; }
.mf-wg__price { font-size: 1.25rem; font-weight: 900; color: var(--mf-title); }
.mf-wg__note { flex: 1 1 100%; margin: 0; text-align: center; font-size: .875rem; }
@media (prefers-reduced-motion: no-preference) { .mf-wg__card:hover { transform: translateY(-2px); } }
`;
class d extends I {
  constructor() {
    super(...arguments), this.styleId = "warmth-guide", this.product = null, this.chosen = -1, this.city = -1;
  }
  styles() {
    return F;
  }
  async connectedCallback() {
    super.connectedCallback(), this.product = await $(N(this.cfg()));
  }
  levels() {
    return _(this.cfg().levels, "levels").map((e) => ({
      name: m(e.name),
      value: String(e.option_value ?? "").trim() || m(e.name),
      badge: m(e.badge),
      idealFor: m(e.ideal_for),
      specs: [m(e.spec_1), m(e.spec_2)].filter(Boolean),
      warmth: Math.min(Math.max(Math.round(Number(e.warmth) || 0), 0), 5),
      image: String(e.image || "")
    })).filter((e) => e.name).slice(0, 3);
  }
  cities() {
    const e = _(this.cfg().cities, "cities").map((t) => ({ name: { ar: m(t.name), en: m(t.name) }, night: Number(t.night) })).filter((t) => t.name.ar && Number.isFinite(t.night));
    return e.length ? e : b;
  }
  /** The card that shows first: the one the merchant marked, else the middle one. */
  current(e) {
    if (this.chosen >= 0 && this.chosen < e.length) return this.chosen;
    const t = e.findIndex((r) => r.badge);
    return t >= 0 ? t : Math.floor((e.length - 1) / 2);
  }
  pickCity(e, t) {
    this.city = e;
    const r = this.cities()[e];
    if (!r) return;
    const i = this.cfg(), s = y(r.night, Number(i.heavy_at ?? 6), Number(i.light_at ?? 14));
    this.chosen = Math.min(s - 1, t.length - 1);
  }
  renderCity(e) {
    var g;
    const t = this.cfg();
    if (t.show_city === !1 || e.length < 2) return o;
    const r = this.cities(), i = r[this.city], s = `mf-wg-city-${this.styleId}`, a = x() === "en";
    return n`<div class="mf-wg__city">
      <label for=${s}>${m(t.city_label) || l({ ar: "في أي مدينة أنت؟", en: "Which city are you in?" })}</label>
      <select id=${s} @change=${(c) => this.pickCity(Number(c.target.value), e)}>
        <option value="-1">${l({ ar: "اختر مدينتك", en: "Choose your city" })}</option>
        ${r.map((c, u) => n`<option value=${u} ?selected=${u === this.city}>${a ? c.name.en : c.name.ar}</option>`)}
      </select>
      ${i ? n`<p class="mf-wg__advice" aria-live="polite">${l({ ar: `ليالي الشتاء في ${i.name.ar} تصل إلى حوالي ${i.night}°، وننصحك بـ`, en: `Winter nights in ${i.name.en} reach about ${i.night}°C, so we suggest ` })}<b>${(g = e[this.current(e)]) == null ? void 0 : g.name}</b></p>` : o}
    </div>`;
  }
  render() {
    const e = this.levels();
    if (!e.length)
      return k() ? o : this.frame(n`<p class="mf-empty">${l({ ar: "أضف درجات الدفء من إعدادات هذا القسم", en: "Add the warmth levels in this section's settings" })}</p>`);
    const t = this.current(e), r = this.product, i = r ? v(r, e[t].value) : {}, s = r && Number(r.sale_price || r.price) || 0;
    return this.frame(n`
      ${this.renderCity(e)}
      <ul class="mf-wg__grid" style=${`--mf-wg-n:${e.length}`}>
        ${e.map((a, g) => n`<li><button type="button" class="mf-wg__card" aria-pressed=${g === t ? "true" : "false"} @click=${() => this.chosen = g}>
          ${a.image ? n`<img src=${a.image} alt="" loading="lazy" />` : o}
          ${a.badge ? n`<span class="mf-wg__badge">${a.badge}</span>` : o}
          <span class="mf-wg__body">
            <span class="mf-wg__name">${a.name}</span>
            ${a.warmth ? n`<span class="mf-wg__dots" role="img" aria-label=${l({ ar: `الدفا ${a.warmth} من 5`, en: `Warmth ${a.warmth} of 5` })}>${[1, 2, 3, 4, 5].map((c) => n`<i class=${c <= a.warmth ? "on" : ""}></i>`)}</span>` : o}
            ${a.idealFor ? n`<span class="mf-wg__ideal">${a.idealFor}</span>` : o}
            ${a.specs.length ? n`<ul class="mf-wg__specs">${a.specs.map((c) => n`<li>${c}</li>`)}</ul>` : o}
          </span>
        </button></li>`)}
      </ul>
      ${r ? n`<div class="mf-wg__buy" data-card=${String(r.id)}>
            ${this.renderPickers(r, i)}
            ${s ? n`<span class="mf-wg__price">${w(C(s))}</span>` : o}
            ${this.renderBuy(r, m(this.cfg().buy_text) || l({ ar: `أضف ${e[t].name} للسلة`, en: `Add ${e[t].name} to cart` }), { options: i })}
          </div>` : o}`, { extraClass: "mf-wg" });
  }
}
h([
  p()
], d.prototype, "product");
h([
  p()
], d.prototype, "chosen");
h([
  p()
], d.prototype, "city");
typeof d < "u" && d.registerSallaComponent("salla-warmth-guide");
export {
  d as default
};
