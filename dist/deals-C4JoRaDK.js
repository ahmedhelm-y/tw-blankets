import { html as f, nothing as m } from "lit";
import { state as p } from "lit/decorators.js";
import { unsafeHTML as b } from "lit/directives/unsafe-html.js";
import { e as S, d as k, o as C, f as P, i as w } from "./drawer-CKC4Ya7w.js";
import { b as A } from "./buy-ycNLmR2K.js";
import { a as y, j as N, t as v, m as _, f as j } from "./styles-CLr0WKdM.js";
import { o as q } from "./fit-DtvCUWqS.js";
import { M as x } from "./section-DQASqLF9.js";
var D = Object.defineProperty, g = (n, i, e, t) => {
  for (var r = void 0, c = n.length - 1, s; c >= 0; c--)
    (s = n[c]) && (r = s(i, e, r) || r);
  return r && D(i, e, r), r;
};
function F(n, i = 24) {
  const e = Array.isArray(n) ? n : typeof n == "string" ? n.split(",") : n ? [n] : [];
  return [...new Set(e.map((t) => String((t && typeof t == "object" ? t.value ?? t.id : t) ?? "").trim()).filter(Boolean))].slice(0, i);
}
async function G(n) {
  return (await Promise.all(n.map((i) => j(i)))).filter((i) => i && w(i));
}
class $ extends x {
  constructor() {
    super(...arguments), this.picks = {}, this.invalid = {}, this.pressing = "";
  }
  connectedCallback() {
    super.connectedCallback(), S();
  }
  pick(i, e, t) {
    const r = { ...this.picks[i] || {} };
    t ? r[String(e)] = Number(t) : delete r[String(e)], this.picks = { ...this.picks, [i]: r }, this.invalid[i] && (this.invalid = { ...this.invalid, [i]: this.invalid[i].filter((c) => c !== e) });
  }
  /**
   * Adds the card's product to the cart and opens the side cart. Options the section already chose (a warmth
   * level, a bed size) come in preset; the shopper's own picks win. Extras are simple products added after it.
   */
  async buyCard(i, e = {}) {
    var d, l, o;
    const t = String(i.id), r = { ...e.options || {}, ...this.picks[t] || {} }, c = [{ product: i, chosen: r }, ...(e.extras || []).map((a) => ({ product: a, chosen: this.picks[String(a.id)] || {} }))], s = {};
    for (const a of c) {
      const h = (a.product.options || []).filter((u) => (u == null ? void 0 : u.required) && (u.details || []).length && !a.chosen[String(u.id)]).map((u) => Number(u.id));
      h.length && (s[String(a.product.id)] = h);
    }
    if (Object.keys(s).length) {
      this.invalid = { ...this.invalid, ...s }, await this.updateComplete, (d = this.querySelector('select[aria-invalid="true"]')) == null || d.focus();
      return;
    }
    if (!this.pressing) {
      this.pressing = t, this.error = "";
      try {
        for (const a of c) await k(a.product, a.chosen, 1, y());
        C();
      } catch (a) {
        this.error = (a == null ? void 0 : a.message) || "", (o = (l = N()) == null ? void 0 : l.error) == null || o.call(l, this.error);
      } finally {
        this.pressing = "";
      }
    }
  }
  /** The required option pickers of a product, each tied to its card for focus on a missed choice. */
  renderPickers(i, e = {}) {
    const t = String(i.id), r = this.invalid[t] || [];
    return (i.options || []).filter((s) => (s == null ? void 0 : s.required) && (s.details || []).length && !(String(s.id) in e)).map((s) => {
      const d = `mf-${this.styleId}-${t}-${s.id}`, l = q(s, y());
      return f`<label class="mf-visually-hidden" for=${d}>${l}</label>
        <select id=${d} aria-invalid=${r.includes(Number(s.id)) ? "true" : "false"} @change=${(o) => this.pick(t, s.id, o.target.value)}>
          <option value="">${v({ ar: `اختر ${l}`, en: `Choose ${l}` })}</option>
          ${s.details.map((o) => f`<option value=${o.id} ?disabled=${o.is_out}>${o.name}</option>`)}
        </select>`;
    });
  }
  renderBuy(i, e, t = {}) {
    const r = String(i.id);
    return A({ items: [{ id: r, quantity: 1 }] }) !== "none" ? f`<button type="button" class="mf-btn" aria-busy=${this.pressing === r ? "true" : "false"} @click=${() => this.buyCard(i, t)}>${e || this.buyLabel()}</button>` : m;
  }
  renderCard(i, e = {}) {
    var l, o, a, h;
    const t = String(i.id), r = Number(i.sale_price || i.price) || 0, c = Number(i.regular_price) || 0, s = P(i), d = ((o = (l = i.images) == null ? void 0 : l[0]) == null ? void 0 : o.url) || ((a = i.image) == null ? void 0 : a.url);
    return f`<li class="mf-card" data-card=${t}>
      <div class="mf-card__img">
        ${d ? f`<img src=${d} alt=${((h = i.image) == null ? void 0 : h.alt) || ""} loading="lazy" />` : m}
        ${s ? f`<span class="mf-card__off">${v({ ar: `خصم ${s}%`, en: `${s}% off` })}</span>` : m}
        ${e.tag ? f`<span class="mf-card__tag">${e.tag}</span>` : m}
      </div>
      <div class="mf-card__body">
        <span class="mf-card__name">${i.name}</span>
        <span class="mf-card__price">${b(_(r))}${c > r ? f`<s>${b(_(c))}</s>` : m}</span>
        ${e.extra ?? m}
        ${this.renderPickers(i)}
        ${this.renderBuy(i, e.buyText)}
      </div>
    </li>`;
  }
}
g([
  p()
], $.prototype, "picks");
g([
  p()
], $.prototype, "invalid");
g([
  p()
], $.prototype, "pressing");
export {
  $ as D,
  G as l,
  F as p
};
