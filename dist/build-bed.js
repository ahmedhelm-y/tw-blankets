import { nothing as l, html as s } from "lit";
import { state as h } from "lit/decorators.js";
import { unsafeHTML as _ } from "lit/directives/unsafe-html.js";
import { e as C, v as P, t as M, n as q, o as j, b as B } from "./drawer-CKC4Ya7w.js";
import { b as L } from "./buy-ycNLmR2K.js";
import { g as N, r as w, t as p, i as z, a as S, m as x } from "./styles-CLr0WKdM.js";
import { l as A, p as O } from "./deals-C4JoRaDK.js";
import { o as T } from "./fit-DtvCUWqS.js";
import { M as D } from "./section-DQASqLF9.js";
var E = Object.defineProperty, g = (y, e, i, t) => {
  for (var r = void 0, a = y.length - 1, d; a >= 0; a--)
    (d = y[a]) && (r = d(e, i, r) || r);
  return r && E(e, i, r), r;
};
const H = `
.mf-bd__steps { display: grid; grid-template-columns: minmax(0, 1fr); gap: 1.75rem; margin: 0; padding: 0; list-style: none; counter-reset: step; }
.mf-bd__step { min-width: 0; counter-increment: step; }
.mf-bd__head { display: flex; align-items: center; gap: .75rem; margin-bottom: .875rem; }
.mf-bd__head::before { content: counter(step); width: 2rem; height: 2rem; flex: 0 0 auto; display: grid; place-items: center; border-radius: 999px;
  background: var(--mf-accent); color: var(--mf-accent-text); font-weight: 900; }
.mf-bd__head h3 { margin: 0; font-size: 1.125rem; font-weight: 900; color: var(--mf-title); }
.mf-bd__head small { font-size: .8125rem; }
.mf-bd__row { display: grid; grid-auto-flow: column; grid-auto-columns: minmax(10rem, 1fr); gap: .75rem; overflow-x: auto; padding-bottom: .375rem;
  scroll-snap-type: x mandatory; }
@container (min-width: 900px) { .mf-bd__row { grid-auto-flow: row; grid-template-columns: repeat(4, minmax(0, 1fr)); overflow: visible; } }
.mf-bd__opt { scroll-snap-align: start; display: flex; flex-direction: column; border: 2px solid color-mix(in srgb, var(--mf-text) 12%, transparent); border-radius: 1rem;
  background: var(--mf-card); overflow: hidden; }
.mf-bd__opt.is-on { border-color: var(--mf-accent-ink); }
.mf-bd__pick { display: flex; flex-direction: column; width: 100%; padding: 0; border: 0; background: none; color: inherit; font: inherit; text-align: start; cursor: pointer; }
.mf-bd__pick:focus-visible { outline: 3px solid var(--mf-accent-ink); outline-offset: -3px; }
.mf-bd__pick img { width: 100%; aspect-ratio: 1 / 1; object-fit: cover; background: var(--mf-bg); }
.mf-bd__info { display: grid; gap: .125rem; padding: .625rem .75rem .75rem; }
.mf-bd__name { overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; font-weight: 700; font-size: .9375rem; line-height: 1.5; color: var(--mf-title); }
.mf-bd__price { font-weight: 800; color: var(--mf-title); }
.mf-bd__opts { display: grid; gap: .375rem; padding: 0 .75rem .75rem; }
.mf-bd__opts select { width: 100%; min-height: 2.75rem; padding: 0 .5rem; border: 1px solid color-mix(in srgb, var(--mf-text) 25%, transparent); border-radius: .625rem;
  background: var(--mf-bg); color: var(--mf-title); font: inherit; font-size: .875rem; }
.mf-bd__opts select[aria-invalid="true"] { border-color: #d92d20; }
.mf-bd__skip { min-height: 2.75rem; padding: 0 1rem; border: 1.5px dashed color-mix(in srgb, var(--mf-text) 35%, transparent); border-radius: 1rem;
  background: none; color: var(--mf-title); font: inherit; font-weight: 700; cursor: pointer; }
.mf-bd__skip[aria-pressed="true"] { border-style: solid; border-color: var(--mf-accent-ink); }
.mf-bd__bar { position: sticky; bottom: calc(.75rem + var(--mf-sb-h, 0px)); z-index: 2; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between;
  gap: 1rem; margin-top: 1.75rem; padding: 1rem 1.25rem; border-radius: 1.25rem; background: var(--mf-title); color: var(--mf-bg); box-shadow: 0 14px 34px -16px rgb(0 0 0 / 50%); }
.mf-bd__thumbs { display: flex; }
.mf-bd__thumbs img { width: 2.75rem; height: 2.75rem; border: 2px solid var(--mf-title); border-radius: 999px; object-fit: cover; margin-inline-start: -.625rem; background: var(--mf-bg); }
.mf-bd__thumbs img:first-child { margin-inline-start: 0; }
.mf-bd__sum { display: grid; gap: .125rem; flex: 1 1 12rem; }
.mf-bd__total { display: flex; align-items: baseline; gap: .5rem; font-size: 1.375rem; font-weight: 900; }
.mf-bd__total s { font-size: .9375rem; font-weight: 500; opacity: .7; }
.mf-bd__offer { font-size: .875rem; opacity: .9; }
.mf-bd__bar .mf-btn { flex: 1 1 13rem; }
.mf-bd__bar .mf-error { flex: 1 1 100%; margin: 0; color: #fda29b; }
`;
class f extends D {
  constructor() {
    super(...arguments), this.styleId = "build-bed", this.steps = [], this.loaded = !1, this.chosen = [], this.options = {}, this.missing = {};
  }
  styles() {
    return H;
  }
  async connectedCallback() {
    super.connectedCallback(), C();
    const e = N(this.cfg().steps, "steps").slice(0, 4), i = await Promise.all(e.map(async (t) => ({
      title: w(t.title),
      optional: t.optional === !0,
      products: await A(O(t.products, 6))
    })));
    this.steps = i.filter((t) => t.title && t.products.length), this.chosen = this.steps.map((t) => t.optional ? "" : String(t.products[0].id)), this.loaded = !0;
  }
  lines() {
    return this.steps.flatMap((e, i) => {
      const t = e.products.find((r) => String(r.id) === this.chosen[i]);
      return t ? [{ product: t, selected: !0, quantity: 1, options: this.options[String(t.id)] || {} }] : [];
    });
  }
  choose(e, i) {
    const t = [...this.chosen];
    t[e] = t[e] === i && this.steps[e].optional ? "" : i, this.chosen = t;
  }
  setOption(e, i, t) {
    const r = { ...this.options[e] || {} };
    t ? r[String(i)] = Number(t) : delete r[String(i)], this.options = { ...this.options, [e]: r }, this.missing[e] && (this.missing = { ...this.missing, [e]: this.missing[e].filter((a) => a !== i) });
  }
  async onBuy() {
    var t;
    const e = this.lines(), i = P(e, 1);
    if (this.missing = i.missing, !i.ok) {
      this.error = Object.keys(i.missing).length ? p({ ar: "اختر المقاس أو اللون لكل قطعة", en: "Choose the size or color of every piece" }) : p({ ar: "اختر قطعة واحدة على الأقل", en: "Pick at least one piece" }), await this.updateComplete, (t = this.querySelector('select[aria-invalid="true"]')) == null || t.focus();
      return;
    }
    z() && (await this.press({ items: M(e), stay: !0 }), this.error) || (await q(e.map((r) => ({ product: r.product, options: r.options, quantity: 1 })), S()), j());
  }
  renderProduct(e, i) {
    var n, m, c;
    const t = String(e.id), r = this.chosen[i] === t, a = ((m = (n = e.images) == null ? void 0 : n[0]) == null ? void 0 : m.url) || ((c = e.image) == null ? void 0 : c.url), d = (e.options || []).filter((o) => (o == null ? void 0 : o.required) && (o.details || []).length), v = this.missing[t] || [];
    return s`<li class=${`mf-bd__opt${r ? " is-on" : ""}`}>
      <button type="button" class="mf-bd__pick" role="radio" aria-checked=${r ? "true" : "false"} @click=${() => this.choose(i, t)}>
        ${a ? s`<img src=${a} alt="" loading="lazy" />` : l}
        <span class="mf-bd__info"><span class="mf-bd__name">${e.name}</span><span class="mf-bd__price">${_(x(Number(e.sale_price || e.price) || 0))}</span></span>
      </button>
      ${r && d.length ? s`<div class="mf-bd__opts">${d.map((o) => {
      const u = `mf-bd-${t}-${o.id}`, $ = T(o, S());
      return s`<label class="mf-visually-hidden" for=${u}>${$}</label>
              <select id=${u} aria-invalid=${v.includes(Number(o.id)) ? "true" : "false"} @change=${(b) => this.setOption(t, o.id, b.target.value)}>
                <option value="">${p({ ar: `اختر ${$}`, en: `Choose ${$}` })}</option>
                ${o.details.map((b) => {
        var k;
        return s`<option value=${b.id} ?disabled=${b.is_out} ?selected=${((k = this.options[t]) == null ? void 0 : k[String(o.id)]) === Number(b.id)}>${b.name}</option>`;
      })}
              </select>`;
    })}</div>` : l}
    </li>`;
  }
  render() {
    if (!this.steps.length)
      return !this.loaded || z() ? l : this.frame(s`<p class="mf-empty">${p({ ar: "أضف خطوات السرير ومنتجات كل خطوة من إعدادات هذا القسم", en: "Add the bed's steps and their products in this section's settings" })}</p>`);
    const e = this.cfg(), i = this.lines(), t = B(i), r = Math.min(Math.max(Number(e.discount_percent) || 0, 0), 90), a = r && t.count >= 2 ? Math.round(t.total * (100 - r)) / 100 : 0, d = w(e.offer_text), v = L({ items: [{ id: "x", quantity: 1 }] }) !== "none";
    return this.frame(s`
      <ol class="mf-bd__steps">${this.steps.map((n, m) => s`<li class="mf-bd__step">
        <div class="mf-bd__head"><h3>${n.title}</h3>${n.optional ? s`<small>${p({ ar: "(اختياري)", en: "(optional)" })}</small>` : l}</div>
        <ul class="mf-bd__row" role="radiogroup" aria-label=${n.title}>${n.products.map((c) => this.renderProduct(c, m))}</ul>
      </li>`)}</ol>
      <div class="mf-bd__bar">
        <span class="mf-bd__thumbs" aria-hidden="true">${i.map((n) => {
      var c, o, u;
      const m = ((o = (c = n.product.images) == null ? void 0 : c[0]) == null ? void 0 : o.url) || ((u = n.product.image) == null ? void 0 : u.url);
      return m ? s`<img src=${m} alt="" />` : l;
    })}</span>
        <div class="mf-bd__sum" aria-live="polite">
          <span>${p({ ar: `سريرك: ${t.count === 1 ? "قطعة واحدة" : t.count === 2 ? "قطعتان" : `${t.count} قطع`}`, en: `Your bed: ${t.count} pieces` })}</span>
          <span class="mf-bd__total">${_(x(a || t.total))}
            ${a ? s`<s>${_(x(t.total))}</s>` : t.regular > t.total ? s`<s>${_(x(t.regular))}</s>` : l}</span>
          ${d ? s`<span class="mf-bd__offer">${d}</span>` : l}
        </div>
        ${v ? s`<button type="button" class="mf-btn" aria-busy=${this.busy ? "true" : "false"} ?disabled=${!t.count} @click=${() => this.onBuy()}>
              ${w(e.buy_text) || p({ ar: "أضف السرير كامل للسلة", en: "Add the whole bed" })}</button>` : l}
        ${this.error ? s`<p class="mf-error" role="alert">${this.error}</p>` : l}
      </div>`, { extraClass: "mf-bd", noError: !0 });
  }
}
g([
  h()
], f.prototype, "steps");
g([
  h()
], f.prototype, "loaded");
g([
  h()
], f.prototype, "chosen");
g([
  h()
], f.prototype, "options");
g([
  h()
], f.prototype, "missing");
typeof f < "u" && f.registerSallaComponent("salla-build-bed");
export {
  f as default
};
