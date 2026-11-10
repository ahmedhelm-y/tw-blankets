import { nothing as s, html as n } from "lit";
import { state as u } from "lit/decorators.js";
import { unsafeHTML as v } from "lit/directives/unsafe-html.js";
import { p as k, u as g, d as $, f as P, r as p, t as w, m as y, i as M } from "./styles-1hlUxruQ.js";
import { D as S, l as z, p as C } from "./deals-CuqjvncO.js";
import { p as L } from "./section-DJ0rAaDV.js";
let x = "", _ = [];
function j(l) {
  const e = k(l), r = String(g(l.default_mode) || "light"), a = `${JSON.stringify(e)}|${r}`, t = document.documentElement, i = $(r);
  if (a === x) return i;
  x = a;
  for (const o of _) t.style.removeProperty(o);
  for (const [o, d] of Object.entries(e)) t.style.setProperty(o, d);
  return _ = Object.keys(e), t.classList.toggle("mf-mode-dark", i === "dark"), t.classList.toggle("mf-mode-light", i === "light"), i;
}
function N() {
  const l = document.documentElement;
  for (const e of _) l.style.removeProperty(e);
  _ = [], x = "", l.classList.remove("mf-mode-dark", "mf-mode-light");
}
var O = Object.defineProperty, b = (l, e, r, a) => {
  for (var t = void 0, i = l.length - 1, o; i >= 0; i--)
    (o = l[i]) && (t = o(e, r, t) || t);
  return t && O(e, r, t), t;
};
const E = `
.mf-hero { position: relative; padding: 0; overflow: hidden; }
.mf-hero > .mf-container { max-width: none; padding: 0; }
.mf-hero__media { position: relative; overflow: hidden; background: var(--mf-card); }
.mf-hero__media img, .mf-hero__media video { width: 100%; height: 100%; object-fit: cover; }
.mf-hero__body { display: flex; flex-direction: column; gap: 1rem; max-width: 36rem; }
.mf-hero__badge { align-self: flex-start; padding: .375rem .875rem; border-radius: 999px; background: var(--mf-accent); color: var(--mf-accent-text);
  font-size: .8125rem; font-weight: 700; }
.mf-hero__title { margin: 0; font-size: 2.25rem; line-height: 1.2; font-weight: 800; color: var(--mf-title); }
.mf-hero__sub { margin: 0; font-size: 1.0625rem; line-height: 1.8; color: var(--mf-text); }
.mf-hero__cta { display: flex; flex-wrap: wrap; align-items: center; gap: 1rem; margin-top: .5rem; }
.mf-hero__price { display: flex; align-items: baseline; gap: .5rem; font-size: 1.375rem; font-weight: 800; color: var(--mf-title); }
.mf-hero__price s { font-size: 1rem; font-weight: 500; opacity: .7; }
@container (min-width: 768px) { .mf-hero__title { font-size: 3.25rem; } }
.mf-hero__pickers { display: grid; gap: .5rem; max-width: 22rem; }
.mf-hero__pickers select { width: 100%; min-height: 2.75rem; padding: 0 .75rem; border: 1px solid color-mix(in srgb, var(--mf-text) 25%, transparent); border-radius: .625rem;
  background: var(--mf-bg); color: var(--mf-title); font: inherit; }
.mf-hero__pickers select[aria-invalid="true"] { border-color: #d92d20; }
.mf-hero__addons { display: grid; gap: .5rem; max-width: 26rem; margin: 0; padding: 0; list-style: none; }
.mf-hero__addon { display: flex; align-items: center; gap: .75rem; padding: .625rem .875rem; border: 1px solid color-mix(in srgb, var(--mf-text) 18%, transparent);
  border-radius: .875rem; background: color-mix(in srgb, var(--mf-bg) 88%, transparent); color: var(--mf-title); cursor: pointer; }
.mf-hero__addon input { width: 1.25rem; height: 1.25rem; accent-color: var(--mf-accent); flex: 0 0 auto; }
.mf-hero__addon img { width: 2.75rem; height: 2.75rem; border-radius: .5rem; object-fit: cover; flex: 0 0 auto; }
.mf-hero__addon span { flex: 1 1 auto; font-size: .9375rem; font-weight: 600; line-height: 1.5; }
.mf-hero__addon b { white-space: nowrap; }
.mf-hero__addon-pick { margin: .375rem 0 0; }
.mf-hero--overlay .mf-hero__addon { background: rgb(255 255 255 / 92%); color: #1d1b19; border-color: transparent; }

/* Overlay: text over full-bleed media, on a dark veil; the body sits above the positioned media */
.mf-hero--overlay .mf-hero__body { position: relative; z-index: 1; }
.mf-hero--overlay .mf-hero__media { position: absolute; inset: 0; background: color-mix(in srgb, var(--mf-accent) 25%, #0d0b0a); }
.mf-hero--overlay .mf-hero__media::after { content: ""; position: absolute; inset: 0; background: rgb(0 0 0 / var(--mf-hero-veil, .35)); }
.mf-hero--overlay .mf-hero__wrap { display: flex; align-items: center; min-height: var(--mf-hero-h, 85vh);
  max-width: 1200px; margin-inline: auto; padding: 5rem 1rem 3rem; }
.mf-hero--overlay.mf-hero--center .mf-hero__wrap { justify-content: center; text-align: center; }
.mf-hero--overlay.mf-hero--center .mf-hero__body { align-items: center; }
.mf-hero--overlay.mf-hero--center .mf-hero__badge { align-self: center; }
.mf-hero--overlay .mf-hero__title, .mf-hero--overlay .mf-hero__sub, .mf-hero--overlay .mf-hero__price { color: #fff; }

/* Split: media beside the text */
.mf-hero--split .mf-hero__wrap { display: grid; gap: 2rem; max-width: 1200px; margin-inline: auto; padding: 2.5rem 1rem; align-items: center; }
.mf-hero--split .mf-hero__media { aspect-ratio: 4 / 5; border-radius: 1.25rem; }
@container (min-width: 768px) { .mf-hero--split .mf-hero__wrap { grid-template-columns: 1fr 1fr; gap: 3.5rem; padding-block: 4rem; } }
@container (max-width: 767px) { .mf-hero--split .mf-hero__media { order: -1; aspect-ratio: 1 / 1; } }
`;
class h extends S {
  constructor() {
    super(...arguments), this.styleId = "hero", this.product = null, this.addons = [], this.checked = /* @__PURE__ */ new Set(), this.mobile = !1, this.onMedia = (e) => {
      this.mobile = e.matches;
    };
  }
  styles() {
    return E;
  }
  async connectedCallback() {
    var t, i, o, d;
    super.connectedCallback(), this.media = (t = window.matchMedia) == null ? void 0 : t.call(window, "(max-width: 767px)"), this.mobile = !!((i = this.media) != null && i.matches), (d = (o = this.media) == null ? void 0 : o.addEventListener) == null || d.call(o, "change", this.onMedia);
    const e = this.cfg(), [r, a] = await Promise.all([P(L(e)), z(C(e.addons, 3))]);
    this.product = r, this.addons = a, this.checked = new Set(e.addons_checked === !1 ? [] : this.addons.map((c) => String(c.id)));
  }
  toggle(e) {
    const r = new Set(this.checked);
    r.has(e) ? r.delete(e) : r.add(e), this.checked = r;
  }
  renderAddons() {
    if (!this.addons.length) return s;
    const e = p(this.cfg().addons_label);
    return n`${e ? n`<span class="mf-hero__sub" style="font-weight:700">${e}</span>` : s}
      <ul class="mf-hero__addons">${this.addons.map((r) => {
      var i, o, d;
      const a = String(r.id), t = ((o = (i = r.images) == null ? void 0 : i[0]) == null ? void 0 : o.url) || ((d = r.image) == null ? void 0 : d.url);
      return n`<li><label class="mf-hero__addon">
          <input type="checkbox" .checked=${this.checked.has(a)} @change=${() => this.toggle(a)} />
          ${t ? n`<img src=${t} alt="" loading="lazy" />` : s}
          <span>${w({ ar: "أضف", en: "Add" })} ${r.name}</span>
          <b>${v(y(Number(r.sale_price || r.price) || 0))}</b>
        </label>
        ${this.checked.has(a) ? n`<div class="mf-hero__pickers mf-hero__addon-pick">${this.renderPickers(r)}</div>` : s}</li>`;
    })}</ul>`;
  }
  disconnectedCallback() {
    var e, r;
    super.disconnectedCallback(), (r = (e = this.media) == null ? void 0 : e.removeEventListener) == null || r.call(e, "change", this.onMedia), N();
  }
  // The brand color and page mode are page-wide; the hero's own colors stay on the hero
  willUpdate() {
    const e = this.cfg();
    j({ brand_color: e.brand_color, default_mode: e.default_mode });
  }
  renderMedia() {
    var o, d, c;
    const e = this.cfg(), r = (m, f) => String(this.mobile && e[f] || e[m] || "");
    if (g(e.media) === "video") {
      const m = r("video_url", "video_url_mobile");
      if (m) {
        const f = (o = window.matchMedia) == null ? void 0 : o.call(window, "(prefers-reduced-motion: reduce)").matches;
        return n`<video .src=${m} poster=${e.poster || s} ?autoplay=${!f} muted loop playsinline preload="metadata"
          aria-hidden="true"></video>`;
      }
    }
    const a = r("image", "image_mobile"), t = ((c = (d = this.product) == null ? void 0 : d.image) == null ? void 0 : c.url) || "", i = a || t;
    return i ? n`<img src=${i} alt="" fetchpriority="high" />` : s;
  }
  renderPrice() {
    const e = this.product;
    if (!e || this.cfg().show_price === !1) return s;
    const r = Number(e.is_on_sale ? e.sale_price : e.price) || 0, a = Number(e.regular_price) || 0;
    return n`<span class="mf-hero__price">${v(y(r))}
      ${e.is_on_sale && a > r ? n`<s>${v(y(a))}</s>` : s}</span>`;
  }
  render() {
    const e = this.cfg(), r = g(e.layout) === "split" ? "split" : "overlay", a = g(e.content_align) !== "start", t = Math.min(Math.max(Number(e.overlay ?? 35), 0), 80) / 100, i = Math.min(Math.max(Number(e.height) || 85, 50), 100), o = p(e.badge), d = p(e.title), c = p(e.subtitle), m = this.product;
    return this.frame(
      n`<div class="mf-hero__wrap" style=${`--mf-hero-veil:${t};--mf-hero-h:${i}vh`}>
        <div class="mf-hero__media">${this.renderMedia()}</div>
        <div class="mf-hero__body">
          ${o ? n`<span class="mf-hero__badge">${o}</span>` : s}
          ${d ? n`<h1 class="mf-hero__title">${d}</h1>` : s}
          ${c ? n`<p class="mf-hero__sub">${c}</p>` : s}
          ${m ? n`<div class="mf-hero__pickers" data-card=${String(m.id)}>${this.renderPickers(m)}</div>` : s}
          ${m ? this.renderAddons() : s}
          <div class="mf-hero__cta">
            ${m ? this.renderBuy(m, void 0, { extras: this.addons.filter((f) => this.checked.has(String(f.id))) }) : s}
            ${this.renderPrice()}
          </div>
          ${!m && !M() ? n`<p class="mf-hero__sub">${w({ ar: "اختر منتج القسم من الإعدادات ليظهر زر الإضافة للسلة", en: "Pick the section's product to show the add to cart button" })}</p>` : s}
        </div>
      </div>`,
      { hero: !0, title: !1, extraClass: `mf-hero mf-hero--${r}${a ? " mf-hero--center" : ""}` }
    );
  }
}
b([
  u()
], h.prototype, "product");
b([
  u()
], h.prototype, "addons");
b([
  u()
], h.prototype, "checked");
b([
  u()
], h.prototype, "mobile");
typeof h < "u" && h.registerSallaComponent("salla-hero");
export {
  h as default
};
