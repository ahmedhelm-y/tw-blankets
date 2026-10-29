import { nothing as _, html as n } from "lit";
import { state as p } from "lit/decorators.js";
import { unsafeHTML as b } from "lit/directives/unsafe-html.js";
import { e as w, i as $, t as k, n as S, o as A } from "./drawer-CKC4Ya7w.js";
import { b as q } from "./buy-ycNLmR2K.js";
import { g as C, f as I, i as v, a as P, t as l, r as y, m as x } from "./styles-CLr0WKdM.js";
import { D as z } from "./deals-C4JoRaDK.js";
var j = Object.defineProperty, f = (c, s, i, a) => {
  for (var t = void 0, e = c.length - 1, r; e >= 0; e--)
    (r = c[e]) && (t = r(s, i, t) || t);
  return t && j(s, i, t), t;
};
const D = `
.mf-sr__wrap { display: grid; gap: 1.25rem; }
@container (min-width: 900px) { .mf-sr__wrap { grid-template-columns: 7fr 5fr; align-items: start; gap: 2rem; } }
.mf-sr__photo { position: relative; border-radius: 1.5rem; overflow: hidden; background: var(--mf-card); }
.mf-sr__photo img { width: 100%; aspect-ratio: 4 / 3; object-fit: cover; }
.mf-sr__dot { position: absolute; width: 2.25rem; height: 2.25rem; display: grid; place-items: center; padding: 0; border: 3px solid #fff; border-radius: 999px;
  background: var(--mf-accent); color: var(--mf-accent-text); font: inherit; font-weight: 900; transform: translate(-50%, -50%); cursor: pointer;
  box-shadow: 0 0 0 0 rgb(255 255 255 / 70%); animation: mf-sr-pulse 2.4s ease-out infinite; }
.mf-sr__dot[aria-pressed="true"] { background: #fff; color: #1d1b19; }
.mf-sr__dot:focus-visible { outline: 3px solid #fff; outline-offset: 3px; }
@keyframes mf-sr-pulse { 0% { box-shadow: 0 0 0 0 rgb(255 255 255 / 70%); } 70%, 100% { box-shadow: 0 0 0 14px rgb(255 255 255 / 0%); } }
@media (prefers-reduced-motion: reduce) { .mf-sr__dot { animation: none; } }
.mf-sr__list { display: grid; gap: .625rem; margin: 0; padding: 0; list-style: none; }
.mf-sr__item { display: grid; grid-template-columns: auto 4rem minmax(0, 1fr); gap: .75rem; align-items: center; padding: .75rem; border: 2px solid transparent;
  border-radius: 1rem; background: var(--mf-card); transition: border-color .2s ease; }
.mf-sr__item.is-on { border-color: var(--mf-accent-ink); }
.mf-sr__num { width: 1.75rem; height: 1.75rem; display: grid; place-items: center; border-radius: 999px; background: var(--mf-accent); color: var(--mf-accent-text); font-weight: 900; font-size: .875rem; }
.mf-sr__item img { width: 4rem; height: 4rem; border-radius: .75rem; object-fit: cover; }
.mf-sr__info { display: grid; gap: .25rem; }
.mf-sr__name { overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; font-weight: 700; line-height: 1.5; color: var(--mf-title); }
.mf-sr__price { font-weight: 800; color: var(--mf-title); }
.mf-sr__act { grid-column: 1 / -1; display: flex; flex-wrap: wrap; gap: .5rem; }
.mf-sr__act select { flex: 1 1 8rem; min-height: 2.75rem; padding: 0 .5rem; border: 1px solid color-mix(in srgb, var(--mf-text) 25%, transparent); border-radius: .625rem;
  background: var(--mf-bg); color: var(--mf-title); font: inherit; font-size: .875rem; }
.mf-sr__act select[aria-invalid="true"] { border-color: #d92d20; }
.mf-sr__act .mf-btn { flex: 1 1 8rem; min-height: 2.75rem; padding-block: .5rem; font-size: .9375rem; }
.mf-sr__all { display: grid; gap: .375rem; margin-top: .75rem; }
.mf-sr__all .mf-btn { width: 100%; }
.mf-sr__total { text-align: center; font-weight: 700; }
`;
class d extends z {
  constructor() {
    super(...arguments), this.styleId = "shop-room", this.spots = [], this.loaded = !1, this.active = -1;
  }
  styles() {
    return D;
  }
  async connectedCallback() {
    super.connectedCallback(), w();
    const s = C(this.cfg().spots, "spots").slice(0, 6), i = await Promise.all(s.map(async (a) => {
      const t = Array.isArray(a.product) ? a.product[0] : a.product, e = t && typeof t == "object" ? t.value ?? t.id : t, r = e ? await I(String(e)) : null, o = (m) => Math.min(Math.max(Number(m) || 50, 3), 97);
      return r && $(r) ? { product: r, x: o(a.x), y: o(a.y) } : null;
    }));
    this.spots = i.filter(Boolean), this.loaded = !0;
  }
  focusItem(s) {
    var i;
    this.active = s, (i = this.querySelector(`[data-spot="${s}"]`)) == null || i.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }
  /** Every piece of the look in one go; a piece still missing a choice gets its picker marked instead. */
  async addAll() {
    var a;
    const s = this.spots.map((t) => ({ product: t.product, selected: !0, quantity: 1, options: this.picks[String(t.product.id)] || {} })), i = s.findIndex((t) => (t.product.options || []).some((e) => (e == null ? void 0 : e.required) && (e.details || []).length && !t.options[String(e.id)]));
    if (i >= 0) {
      const t = s[i].product, e = (t.options || []).filter((r) => (r == null ? void 0 : r.required) && (r.details || []).length && !s[i].options[String(r.id)]).map((r) => Number(r.id));
      this.invalid = { ...this.invalid, [String(t.id)]: e }, this.active = i, await this.updateComplete, (a = this.querySelector(`[data-spot="${i}"] select[aria-invalid="true"]`)) == null || a.focus();
      return;
    }
    v() && (await this.press({ items: k(s), stay: !0 }), this.error) || (await S(s.map((t) => ({ product: t.product, options: t.options, quantity: 1 })), P()), A());
  }
  render() {
    const s = this.cfg(), i = String(s.image || "");
    if (!i || !this.spots.length)
      return !this.loaded || v() ? _ : this.frame(n`<p class="mf-empty">${l({ ar: "أضف صورة الغرفة والنقط ومنتج كل نقطة من إعدادات هذا القسم", en: "Add the room photo and a product for each spot in this section's settings" })}</p>`);
    const a = this.spots.reduce((e, r) => e + (Number(r.product.sale_price || r.product.price) || 0), 0), t = q({ items: [{ id: "x", quantity: 1 }] }) !== "none";
    return this.frame(n`<div class="mf-sr__wrap">
      <div class="mf-sr__photo">
        <img src=${i} alt=${y(s.image_alt)} loading="lazy" />
        ${this.spots.map((e, r) => n`<button type="button" class="mf-sr__dot" style=${`left:${e.x}%;top:${e.y}%`} aria-pressed=${this.active === r ? "true" : "false"}
          aria-label=${e.product.name} @click=${() => this.focusItem(r)}>${r + 1}</button>`)}
      </div>
      <div>
        <ol class="mf-sr__list">${this.spots.map((e, r) => {
      var u, h, g;
      const o = e.product, m = ((h = (u = o.images) == null ? void 0 : u[0]) == null ? void 0 : h.url) || ((g = o.image) == null ? void 0 : g.url);
      return n`<li class=${`mf-sr__item${this.active === r ? " is-on" : ""}`} data-spot=${r} data-card=${String(o.id)}>
            <span class="mf-sr__num">${r + 1}</span>
            ${m ? n`<img src=${m} alt="" loading="lazy" />` : n`<span></span>`}
            <span class="mf-sr__info"><span class="mf-sr__name">${o.name}</span><span class="mf-sr__price">${b(x(Number(o.sale_price || o.price) || 0))}</span></span>
            <div class="mf-sr__act">${this.renderPickers(o)}${this.renderBuy(o, l({ ar: "أضف", en: "Add" }))}</div>
          </li>`;
    })}</ol>
        ${t && this.spots.length > 1 ? n`<div class="mf-sr__all">
              <button type="button" class="mf-btn" aria-busy=${this.busy ? "true" : "false"} @click=${() => this.addAll()}>${y(s.buy_text) || l({ ar: "أضف اللوك كامل للسلة", en: "Add the whole look" })}</button>
              <span class="mf-sr__total">${l({ ar: `${this.spots.length} قطع بـ`, en: `${this.spots.length} pieces for` })} ${b(x(Math.round(a * 100) / 100))}</span>
            </div>` : _}
      </div>
    </div>`, { extraClass: "mf-sr" });
  }
}
f([
  p()
], d.prototype, "spots");
f([
  p()
], d.prototype, "loaded");
f([
  p()
], d.prototype, "active");
typeof d < "u" && d.registerSallaComponent("salla-shop-room");
export {
  d as default
};
