import { LitElement as g, nothing as l, html as n } from "lit";
import { property as x, state as c } from "lit/decorators.js";
import { unsafeHTML as p } from "lit/directives/unsafe-html.js";
import { a as w, b as k } from "./buy-ycNLmR2K.js";
import { e as $, c as q, f as S, o as I, j as H, m as h, d as B, u as C, r as P, q as E, t as u, s as j, h as z } from "./styles-CLr0WKdM.js";
var L = Object.defineProperty, a = (b, t, s, e) => {
  for (var i = void 0, r = b.length - 1, m; r >= 0; r--)
    (m = b[r]) && (i = m(t, s, i) || i);
  return i && L(t, s, i), i;
};
const O = `
.mf-sb { position: fixed; inset-inline: 0; bottom: 0; z-index: 40; padding-bottom: env(safe-area-inset-bottom);
  background: color-mix(in srgb, var(--mf-bg) 92%, transparent); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
  box-shadow: 0 -1px 0 color-mix(in srgb, var(--mf-text) 12%, transparent), 0 -12px 32px -24px rgb(0 0 0 / 45%);
  transform: translateY(110%); visibility: hidden; transition: transform .35s ease, visibility 0s linear .35s; }
.mf-sb.is-shown { transform: none; visibility: visible; transition: transform .35s ease; }
/* In the editor and previews the bar sits in the page, so the merchant can see and edit it */
.mf-sb--inline { position: static; transform: none; visibility: visible; transition: none; }
@media (prefers-reduced-motion: reduce) { .mf-sb, .mf-sb.is-shown { transition: none; } }
.mf-sb__inner { display: flex; align-items: center; gap: .75rem; max-width: 1200px; margin-inline: auto; padding: .625rem 1rem; }
.mf-sb__info { display: flex; align-items: center; gap: .75rem; flex: 1 1 auto; min-width: 0; }
.mf-sb__img { width: 2.75rem; height: 2.75rem; flex: 0 0 auto; border-radius: .5rem; object-fit: cover; background: var(--mf-card); }
.mf-sb__name { overflow: hidden; white-space: nowrap; text-overflow: ellipsis; font-weight: 700; font-size: .9375rem; color: var(--mf-title); }
.mf-sb__price { display: flex; align-items: baseline; gap: .375rem; font-size: .875rem; color: var(--mf-text); }
.mf-sb__price b { color: var(--mf-title); font-size: 1rem; }
.mf-sb__price s { opacity: .7; }
.mf-sb__qty { display: flex; align-items: center; height: 2.75rem; flex: 0 0 auto; border: 1px solid color-mix(in srgb, var(--mf-text) 25%, transparent); border-radius: .625rem; }
.mf-sb__qty button { width: 2.5rem; height: 100%; border: 0; background: none; color: var(--mf-title); font-size: 1.25rem; cursor: pointer; }
.mf-sb__qty button:disabled { opacity: .35; cursor: default; }
.mf-sb__qty output { min-width: 1.75rem; text-align: center; font-weight: 700; color: var(--mf-title); }
.mf-sb__buy { flex: 0 0 auto; }
@media (max-width: 767px) {
  .mf-sb--desktop { display: none; }
  .mf-sb__img { display: none; }
  .mf-sb__buy { flex: 1 1 auto; }
  .mf-sb__info { flex: 0 1 auto; max-width: 40%; flex-direction: column; align-items: flex-start; gap: 0; }
}
@media (min-width: 768px) { .mf-sb--mobile { display: none; } }
`;
class o extends g {
  constructor() {
    super(...arguments), this.product = null, this.pastHero = !1, this.checkoutInView = !1, this.quantity = 1, this.busy = !1, this.error = "", this.observers = [], this.noHero = !1, this.onScroll = () => {
      this.noHero && (this.pastHero = (window.scrollY || document.documentElement.scrollTop) > 600);
    };
  }
  createRenderRoot() {
    return this;
  }
  async connectedCallback() {
    super.connectedCallback(), this.classList.add("mf-host"), $(), q("mf-sticky-buy", O), window.setTimeout(() => this.watch(), 0), this.product = await S(I());
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.observers.forEach((t) => t.disconnect()), this.observers = [], window.removeEventListener("scroll", this.onScroll), document.documentElement.style.removeProperty("--mf-sb-h");
  }
  updated() {
    const t = this.querySelector(".mf-sb"), s = !!(t != null && t.classList.contains("is-shown"));
    document.documentElement.style.setProperty("--mf-sb-h", s ? `${t.offsetHeight}px` : "0px");
  }
  inline() {
    return !!this.closest(".component-card");
  }
  watch() {
    if (typeof IntersectionObserver > "u") {
      this.pastHero = !0;
      return;
    }
    const t = document.querySelector("[data-mf-hero]");
    if (t) {
      const e = new IntersectionObserver(([i]) => {
        this.pastHero = !i.isIntersecting && i.boundingClientRect.bottom < 0;
      });
      e.observe(t), this.observers.push(e);
    } else
      this.noHero = !0, window.addEventListener("scroll", this.onScroll, { passive: !0 }), this.onScroll();
    const s = document.querySelector(".s-block--fast-checkout");
    if (s) {
      const e = new IntersectionObserver(([i]) => {
        this.checkoutInView = i.isIntersecting;
      });
      e.observe(s), this.observers.push(e);
    }
  }
  async onBuy() {
    var s, e;
    if (this.busy) return;
    this.busy = !0, this.error = "";
    let t;
    try {
      t = await w({ quantity: this.quantity, product: this.product });
    } finally {
      this.busy = !1;
    }
    t.kind === "error" && (this.error = t.message || "", (e = (s = H()) == null ? void 0 : s.error) == null || e.call(s, t.message));
  }
  renderPrice() {
    const t = this.product, s = Number(t.is_on_sale ? t.sale_price : t.price) || 0, e = Number(t.regular_price) || 0;
    return n`<span class="mf-sb__price"><b>${p(h(s))}</b>
      ${t.is_on_sale && e > s ? n`<s>${p(h(e))}</s>` : l}</span>`;
  }
  render() {
    var f;
    const t = B(this.config), s = k();
    if (s === "none") return l;
    const e = this.product, i = this.inline(), r = i || this.pastHero && !this.checkoutInView, m = String(C(t.show_on) || "both"), y = P(t.buy_text) || (s === "link" ? E().text : "") || u({ ar: "اشتري الآن", en: "Buy now" }), d = Number(e == null ? void 0 : e.max_quantity) || 99, _ = t.show_quantity !== !1 && s !== "link", v = [
      "mf-block mf-sb",
      j(t),
      i ? "mf-sb--inline" : "",
      m === "mobile" ? "mf-sb--mobile" : m === "desktop" ? "mf-sb--desktop" : "",
      r ? "is-shown" : ""
    ].filter(Boolean).join(" ");
    return n`<div class=${v} style=${z(t)} role="region" aria-label=${u({ ar: "شراء سريع", en: "Quick buy" })} aria-hidden=${r ? "false" : "true"}>
      <div class="mf-sb__inner">
        ${e ? n`<div class="mf-sb__info">
              ${(f = e.image) != null && f.url ? n`<img class="mf-sb__img" src=${e.image.url} alt="" loading="lazy" />` : l}
              <div style="min-width:0">
                <div class="mf-sb__name">${e.name}</div>
                ${t.show_price !== !1 ? this.renderPrice() : l}
              </div>
            </div>` : n`<div class="mf-sb__info"></div>`}
        ${_ ? n`<div class="mf-sb__qty" role="group" aria-label=${u({ ar: "الكمية", en: "Quantity" })}>
              <button type="button" aria-label=${u({ ar: "زيادة الكمية", en: "Increase quantity" })} tabindex=${r ? 0 : -1} ?disabled=${this.quantity >= d} @click=${() => this.quantity = Math.min(d, this.quantity + 1)}>+</button>
              <output aria-live="polite">${this.quantity}</output>
              <button type="button" aria-label=${u({ ar: "تقليل الكمية", en: "Decrease quantity" })} tabindex=${r ? 0 : -1} ?disabled=${this.quantity <= 1} @click=${() => this.quantity = Math.max(1, this.quantity - 1)}>−</button>
            </div>` : l}
        <button type="button" class="mf-btn mf-sb__buy" tabindex=${r ? 0 : -1} aria-busy=${this.busy ? "true" : "false"} @click=${() => this.onBuy()}>${y}</button>
      </div>
      ${this.error ? n`<p class="mf-error mf-container" role="alert">${this.error}</p>` : l}
    </div>`;
  }
}
a([
  x({ type: Object })
], o.prototype, "config");
a([
  c()
], o.prototype, "product");
a([
  c()
], o.prototype, "pastHero");
a([
  c()
], o.prototype, "checkoutInView");
a([
  c()
], o.prototype, "quantity");
a([
  c()
], o.prototype, "busy");
a([
  c()
], o.prototype, "error");
typeof o < "u" && o.registerSallaComponent("salla-sticky-buy");
export {
  o as default
};
