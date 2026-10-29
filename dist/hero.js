import { nothing as o, html as a } from "lit";
import { state as p } from "lit/decorators.js";
import { unsafeHTML as u } from "lit/directives/unsafe-html.js";
import { f as y, r as f, t as x, m as b, u as v, i as w } from "./styles-CLr0WKdM.js";
import { D as $, l as k, p as M } from "./deals-C4JoRaDK.js";
import { p as P } from "./section-DQASqLF9.js";
var S = Object.defineProperty, _ = (g, e, r, n) => {
  for (var t = void 0, s = g.length - 1, i; s >= 0; s--)
    (i = g[s]) && (t = i(e, r, t) || t);
  return t && S(e, r, t), t;
};
const z = `
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
class c extends $ {
  constructor() {
    super(...arguments), this.styleId = "hero", this.product = null, this.addons = [], this.checked = /* @__PURE__ */ new Set(), this.mobile = !1, this.onMedia = (e) => {
      this.mobile = e.matches;
    };
  }
  styles() {
    return z;
  }
  async connectedCallback() {
    var t, s, i, m;
    super.connectedCallback(), this.media = (t = window.matchMedia) == null ? void 0 : t.call(window, "(max-width: 767px)"), this.mobile = !!((s = this.media) != null && s.matches), (m = (i = this.media) == null ? void 0 : i.addEventListener) == null || m.call(i, "change", this.onMedia);
    const e = this.cfg(), [r, n] = await Promise.all([y(P(e)), k(M(e.addons, 3))]);
    this.product = r, this.addons = n, this.checked = new Set(e.addons_checked === !1 ? [] : this.addons.map((h) => String(h.id)));
  }
  toggle(e) {
    const r = new Set(this.checked);
    r.has(e) ? r.delete(e) : r.add(e), this.checked = r;
  }
  renderAddons() {
    if (!this.addons.length) return o;
    const e = f(this.cfg().addons_label);
    return a`${e ? a`<span class="mf-hero__sub" style="font-weight:700">${e}</span>` : o}
      <ul class="mf-hero__addons">${this.addons.map((r) => {
      var s, i, m;
      const n = String(r.id), t = ((i = (s = r.images) == null ? void 0 : s[0]) == null ? void 0 : i.url) || ((m = r.image) == null ? void 0 : m.url);
      return a`<li><label class="mf-hero__addon">
          <input type="checkbox" .checked=${this.checked.has(n)} @change=${() => this.toggle(n)} />
          ${t ? a`<img src=${t} alt="" loading="lazy" />` : o}
          <span>${x({ ar: "أضف", en: "Add" })} ${r.name}</span>
          <b>${u(b(Number(r.sale_price || r.price) || 0))}</b>
        </label>
        ${this.checked.has(n) ? a`<div class="mf-hero__pickers mf-hero__addon-pick">${this.renderPickers(r)}</div>` : o}</li>`;
    })}</ul>`;
  }
  disconnectedCallback() {
    var e, r;
    super.disconnectedCallback(), (r = (e = this.media) == null ? void 0 : e.removeEventListener) == null || r.call(e, "change", this.onMedia);
  }
  renderMedia() {
    var i, m, h;
    const e = this.cfg(), r = (d, l) => String(this.mobile && e[l] || e[d] || "");
    if (v(e.media) === "video") {
      const d = r("video_url", "video_url_mobile");
      if (d) {
        const l = (i = window.matchMedia) == null ? void 0 : i.call(window, "(prefers-reduced-motion: reduce)").matches;
        return a`<video .src=${d} poster=${e.poster || o} ?autoplay=${!l} muted loop playsinline preload="metadata"
          aria-hidden="true"></video>`;
      }
    }
    const n = r("image", "image_mobile"), t = ((h = (m = this.product) == null ? void 0 : m.image) == null ? void 0 : h.url) || "", s = n || t;
    return s ? a`<img src=${s} alt="" fetchpriority="high" />` : o;
  }
  renderPrice() {
    const e = this.product;
    if (!e || this.cfg().show_price === !1) return o;
    const r = Number(e.is_on_sale ? e.sale_price : e.price) || 0, n = Number(e.regular_price) || 0;
    return a`<span class="mf-hero__price">${u(b(r))}
      ${e.is_on_sale && n > r ? a`<s>${u(b(n))}</s>` : o}</span>`;
  }
  render() {
    const e = this.cfg(), r = v(e.layout) === "split" ? "split" : "overlay", n = v(e.content_align) !== "start", t = Math.min(Math.max(Number(e.overlay ?? 35), 0), 80) / 100, s = Math.min(Math.max(Number(e.height) || 85, 50), 100), i = f(e.badge), m = f(e.title), h = f(e.subtitle), d = this.product;
    return this.frame(
      a`<div class="mf-hero__wrap" style=${`--mf-hero-veil:${t};--mf-hero-h:${s}vh`}>
        <div class="mf-hero__media">${this.renderMedia()}</div>
        <div class="mf-hero__body">
          ${i ? a`<span class="mf-hero__badge">${i}</span>` : o}
          ${m ? a`<h1 class="mf-hero__title">${m}</h1>` : o}
          ${h ? a`<p class="mf-hero__sub">${h}</p>` : o}
          ${d ? a`<div class="mf-hero__pickers" data-card=${String(d.id)}>${this.renderPickers(d)}</div>` : o}
          ${d ? this.renderAddons() : o}
          <div class="mf-hero__cta">
            ${d ? this.renderBuy(d, void 0, { extras: this.addons.filter((l) => this.checked.has(String(l.id))) }) : o}
            ${this.renderPrice()}
          </div>
          ${!d && !w() ? a`<p class="mf-hero__sub">${x({ ar: "اختر منتج القسم من الإعدادات ليظهر زر الإضافة للسلة", en: "Pick the section's product to show the add to cart button" })}</p>` : o}
        </div>
      </div>`,
      { hero: !0, title: !1, extraClass: `mf-hero mf-hero--${r}${n ? " mf-hero--center" : ""}` }
    );
  }
}
_([
  p()
], c.prototype, "product");
_([
  p()
], c.prototype, "addons");
_([
  p()
], c.prototype, "checked");
_([
  p()
], c.prototype, "mobile");
typeof c < "u" && c.registerSallaComponent("salla-hero");
export {
  c as default
};
