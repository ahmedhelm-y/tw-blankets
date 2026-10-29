import { nothing as m, html as n, svg as b } from "lit";
import { state as u } from "lit/decorators.js";
import { unsafeHTML as $ } from "lit/directives/unsafe-html.js";
import { d as _, a as x } from "./bedding-BSPlFaov.js";
import { f as w, g as y, r as g, i as z, t as l, m as k } from "./styles-CLr0WKdM.js";
import { D as S } from "./deals-C4JoRaDK.js";
import { p as C } from "./section-DQASqLF9.js";
var M = Object.defineProperty, v = (o, e, r, f) => {
  for (var i = void 0, a = o.length - 1, s; a >= 0; a--)
    (s = o[a]) && (i = s(e, r, i) || i);
  return i && M(e, r, i), i;
};
const B = `
.mf-sg__beds { display: flex; flex-wrap: wrap; justify-content: center; gap: .5rem; margin-bottom: 1.5rem; }
.mf-sg__bed { min-height: 2.75rem; padding: .5rem 1.125rem; border: 1.5px solid color-mix(in srgb, var(--mf-text) 25%, transparent); border-radius: 999px;
  background: var(--mf-bg); color: var(--mf-title); font: inherit; font-weight: 700; cursor: pointer; }
.mf-sg__bed small { display: block; font-size: .75rem; font-weight: 500; opacity: .8; }
.mf-sg__bed[aria-pressed="true"] { border-color: var(--mf-accent-ink); background: var(--mf-accent); color: var(--mf-accent-text); }
.mf-sg__bed:focus-visible { outline: 3px solid var(--mf-accent-ink); outline-offset: 2px; }
.mf-sg__panel { display: grid; gap: 1.5rem; align-items: center; padding: 1.5rem; border-radius: 1.5rem; background: var(--mf-card); }
@container (min-width: 768px) { .mf-sg__panel { grid-template-columns: 1fr 1fr; padding: 2rem; } }
.mf-sg__draw { width: 100%; max-width: 26rem; margin-inline: auto; color: var(--mf-title); }
.mf-sg__draw .cover { fill: color-mix(in srgb, var(--mf-accent) 30%, transparent); stroke: var(--mf-accent-ink); }
.mf-sg__draw .bed { fill: var(--mf-bg); stroke: currentColor; }
.mf-sg__draw text { fill: currentColor; font-size: 13px; font-weight: 700; }
.mf-sg__facts { display: grid; gap: .75rem; }
.mf-sg__fact { display: flex; justify-content: space-between; gap: 1rem; padding-bottom: .625rem; border-bottom: 1px solid color-mix(in srgb, var(--mf-text) 14%, transparent); }
.mf-sg__fact b { color: var(--mf-title); }
.mf-sg__note { margin: 0; line-height: 1.7; }
.mf-sg__buy { display: flex; flex-wrap: wrap; align-items: center; gap: .75rem 1rem; margin-top: .5rem; }
.mf-sg__buy select { min-height: 2.75rem; padding: 0 .75rem; border: 1px solid color-mix(in srgb, var(--mf-text) 25%, transparent); border-radius: .625rem;
  background: var(--mf-bg); color: var(--mf-title); font: inherit; }
.mf-sg__buy select[aria-invalid="true"] { border-color: #d92d20; }
.mf-sg__price { font-size: 1.25rem; font-weight: 900; color: var(--mf-title); }
`;
function P(o, e) {
  if (!o || !e) return m;
  const r = 320, f = 300, i = 24, a = Math.min((r - i * 2) / Math.max(o.w, e.w), (f - i * 2) / Math.max(o.l, e.l)), s = (p) => ({ w: p.w * a, h: p.l * a, x: (r - p.w * a) / 2, y: i }), t = s(o), d = s(e), c = Math.round((e.w - o.w) / 2);
  return n`<svg class="mf-sg__draw" viewBox=${`0 0 ${r} ${f}`} role="img" aria-label=${l({ ar: `المفرش أعرض من السرير بـ ${c} سم من كل جانب`, en: `The cover is ${c} cm wider than the bed on each side` })}>
    ${b`<rect class="cover" x=${d.x} y=${d.y} width=${d.w} height=${d.h} rx="10" stroke-width="2" />
      <rect class="bed" x=${t.x} y=${t.y} width=${t.w} height=${t.h} rx="6" stroke-width="2" stroke-dasharray="6 5" />
      <rect class="bed" x=${t.x + t.w * 0.12} y=${t.y + 8} width=${t.w * 0.32} height="22" rx="6" stroke-width="1.5" />
      <rect class="bed" x=${t.x + t.w * 0.56} y=${t.y + 8} width=${t.w * 0.32} height="22" rx="6" stroke-width="1.5" />
      ${c > 0 ? b`<text x=${d.x + d.w - 6} y=${t.y + t.h / 2} text-anchor="end">${c}+</text>` : m}`}
  </svg>`;
}
class h extends S {
  constructor() {
    super(...arguments), this.styleId = "size-guide", this.product = null, this.chosen = 0;
  }
  styles() {
    return B;
  }
  async connectedCallback() {
    super.connectedCallback(), this.product = await w(C(this.cfg()));
  }
  sizes() {
    return y(this.cfg().sizes, "sizes").map((e) => ({
      bed: g(e.bed),
      bedSize: g(e.bed_size),
      coverSize: g(e.cover_size),
      value: String(e.option_value ?? "").trim() || g(e.bed),
      note: g(e.note)
    })).filter((e) => e.bed && e.coverSize).slice(0, 6);
  }
  render() {
    const e = this.sizes();
    if (!e.length)
      return z() ? m : this.frame(n`<p class="mf-empty">${l({ ar: "أضف مقاسات الأسرّة والمفارش من إعدادات هذا القسم", en: "Add the bed and cover sizes in this section's settings" })}</p>`);
    const r = e[Math.min(this.chosen, e.length - 1)], f = _(r.bedSize), i = _(r.coverSize), a = f && i ? Math.round((i.w - f.w) / 2) : 0, s = this.product, t = s ? x(s, r.value) : {}, d = s && Number(s.sale_price || s.price) || 0;
    return this.frame(n`
      <div class="mf-sg__beds" role="group" aria-label=${l({ ar: "مقاس السرير", en: "Bed size" })}>
        ${e.map((c, p) => n`<button type="button" class="mf-sg__bed" aria-pressed=${c === r ? "true" : "false"} @click=${() => this.chosen = p}>
          ${c.bed}${c.bedSize ? n`<small>${c.bedSize}</small>` : m}</button>`)}
      </div>
      <div class="mf-sg__panel">
        ${P(f, i)}
        <div class="mf-sg__facts">
          ${r.bedSize ? n`<div class="mf-sg__fact"><span>${l({ ar: "مقاس السرير", en: "Bed size" })}</span><b>${r.bedSize}</b></div>` : m}
          <div class="mf-sg__fact"><span>${l({ ar: "مقاس المفرش المناسب", en: "Cover size" })}</span><b>${r.coverSize}</b></div>
          ${a > 0 ? n`<div class="mf-sg__fact"><span>${l({ ar: "ينزل من كل جانب", en: "Drop on each side" })}</span><b>${a} ${l({ ar: "سم", en: "cm" })}</b></div>` : m}
          ${r.note ? n`<p class="mf-sg__note">${r.note}</p>` : m}
          ${s ? n`<div class="mf-sg__buy" data-card=${String(s.id)}>
                ${this.renderPickers(s, t)}
                ${d ? n`<span class="mf-sg__price">${$(k(d))}</span>` : m}
                ${this.renderBuy(s, g(this.cfg().buy_text) || l({ ar: `أضف مقاس ${r.bed} للسلة`, en: `Add the ${r.bed} size` }), { options: t })}
              </div>` : m}
        </div>
      </div>`, { extraClass: "mf-sg" });
  }
}
v([
  u()
], h.prototype, "product");
v([
  u()
], h.prototype, "chosen");
typeof h < "u" && h.registerSallaComponent("salla-size-guide");
export {
  h as default
};
