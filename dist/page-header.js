import { html as n, LitElement as k, nothing as c } from "lit";
import { property as $, state as f } from "lit/decorators.js";
import { a as M, b as C } from "./buy-ycNLmR2K.js";
import { d as l, e as B, c as P, p as j, k as E, l as S, u as y, n as K, j as b, g as z, b as L, r as _, t as g } from "./styles-CLr0WKdM.js";
var O = Object.defineProperty, h = (d, e, t, s) => {
  for (var o = void 0, r = d.length - 1, a; r >= 0; r--)
    (a = d[r]) && (o = a(e, t, o) || o);
  return o && O(e, t, o), o;
};
const v = (d) => `
${d} .mf-hd__logo--light.has-dark { display: none; }
${d} .mf-hd__logo--dark { display: block; }
${d} .mf-hd__logo--light:not(.has-dark) { filter: brightness(0) invert(1); }`, T = `
.mf-hd { position: relative; }
.mf-hd--shadow { box-shadow: 0 1px 0 color-mix(in srgb, var(--mf-text) 12%, transparent); }
.mf-hd--trans:not(.is-solid) { background: transparent; box-shadow: none; --mf-title: #fff; --mf-text: #fff; }
.mf-hd.is-solid { background: color-mix(in srgb, var(--mf-bg) 78%, transparent); backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
  box-shadow: 0 1px 0 color-mix(in srgb, var(--mf-text) 10%, transparent); }
/* Previews clip the section list with overflow: hidden, which blocks sticky; clip does not */
.components-grid:has(.mf-hd--sticky) { overflow: clip; }
.mf-hd__inner { display: flex; align-items: center; gap: .75rem 1.25rem; flex-wrap: wrap; max-width: 1200px; margin-inline: auto;
  padding: .625rem 1rem; min-height: calc(var(--mf-hd-logo, 56px) + 1.25rem); }
.mf-hd__brand { display: inline-flex; align-items: center; flex: 0 0 auto; text-decoration: none; }
.mf-hd__logo { display: block; height: var(--mf-hd-logo, 56px); width: auto; max-width: 45vw; object-fit: contain; }
.mf-hd .mf-hd__logo--dark { display: none; }
.mf-hd__name { font-size: 1.25rem; font-weight: 800; color: var(--mf-title); }
.mf-hd__nav { display: flex; gap: .25rem; flex: 1 1 auto; justify-content: center; min-width: 0; }
.mf-hd__nav a { display: inline-flex; align-items: center; min-height: 2.75rem; padding: 0 .75rem; border-radius: 999px; color: var(--mf-text);
  font-weight: 600; font-size: .9375rem; text-decoration: none; white-space: nowrap; }
.mf-hd__nav a:hover { background: color-mix(in srgb, var(--mf-text) 8%, transparent); }
.mf-hd__nav a:focus-visible, .mf-hd__toggle:focus-visible { outline: 2px solid var(--mf-accent-ink); outline-offset: 2px; }
.mf-hd__actions { display: flex; align-items: center; gap: .5rem; margin-inline-start: auto; }
.mf-hd__toggle { width: 2.75rem; height: 2.75rem; display: grid; place-items: center; padding: 0; border: 0; border-radius: 999px; background: none;
  color: var(--mf-title); cursor: pointer; }
.mf-hd__toggle svg { width: 22px; height: 22px; }
.mf-hd__buy { min-height: 2.75rem; padding: .5rem 1.25rem; font-size: .9375rem; }
/* Centered logo: links on one side, actions on the other */
@container (min-width: 768px) {
  .mf-hd--center .mf-hd__inner { display: grid; grid-template-columns: 1fr auto 1fr; }
  .mf-hd--center .mf-hd__brand { grid-column: 2; grid-row: 1; }
  .mf-hd--center .mf-hd__nav { grid-column: 1; grid-row: 1; justify-content: flex-start; }
  .mf-hd--center .mf-hd__actions { grid-column: 3; grid-row: 1; }
}
/* Phones: links move to their own scrolling row under the logo */
@container (max-width: 767px) {
  .mf-hd__nav { order: 3; flex-basis: 100%; justify-content: flex-start; overflow-x: auto; scrollbar-width: none; margin-inline: -1rem; padding-inline: 1rem; }
  .mf-hd__nav::-webkit-scrollbar { display: none; }
  .mf-hd--center .mf-hd__brand { order: 0; }
}
${["html.mf-mode-dark .mf-hd.mf-auto", ".mf-hd.mf-hd--trans:not(.is-solid)"].map(v).join("")}
@media (prefers-color-scheme: dark) { ${v("html:not(.mf-mode-light) .mf-hd.mf-auto")} }
`, V = n`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
  <circle cx="12" cy="12" r="4.5" /><path d="M12 1.5v2M12 20.5v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1.5 12h2M20.5 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" /></svg>`, R = n`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11Z" /></svg>`;
function I() {
  return window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
}
class m extends k {
  constructor() {
    super(...arguments), this.store = { logo: "", name: "" }, this.mode = "light", this.solid = !1, this.busy = !1, this.modeKey = "", this.paletteKey = "", this.paletteVars = [], this.onScroll = () => {
      const e = !!l(this.config).sticky && this.getBoundingClientRect().top <= 1 && I() > 1;
      e !== this.solid && (this.solid = e);
    };
  }
  createRenderRoot() {
    return this;
  }
  async connectedCallback() {
    var t, s, o;
    super.connectedCallback(), this.classList.add("mf-host"), B(), P("mf-page-header", T), document.addEventListener("scroll", this.onScroll, { capture: !0, passive: !0 }), this.resizer = new ResizeObserver(() => this.frame()), this.resizer.observe(this);
    for (const r of [300, 1500]) window.setTimeout(() => this.requestUpdate(), r);
    const e = b();
    await ((t = e == null ? void 0 : e.onReady) == null ? void 0 : t.call(e)), this.store = { logo: ((s = e == null ? void 0 : e.config) == null ? void 0 : s.get("store.logo")) || "", name: ((o = e == null ? void 0 : e.config) == null ? void 0 : o.get("store.name")) || "" };
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), document.removeEventListener("scroll", this.onScroll, { capture: !0 }), (e = this.resizer) == null || e.disconnect(), this.unframe(), this.clearPalette(), this.modeKey = this.paletteKey = "", document.documentElement.classList.remove("mf-mode-dark", "mf-mode-light", "mf-mode-ready");
  }
  // Palette and mode are applied before the first paint, so the page never flashes the wrong colors
  willUpdate() {
    const e = l(this.config), t = j(e), s = JSON.stringify(t);
    if (s !== this.paletteKey) {
      this.paletteKey = s, this.clearPalette();
      for (const [r, a] of Object.entries(t)) document.documentElement.style.setProperty(r, a);
      this.paletteVars = Object.keys(t);
    }
    const o = `${this.baseMode()}|${this.toggleShown()}`;
    o !== this.modeKey && (this.modeKey = o, this.applyMode(E(this.baseMode(), this.toggleShown(), S(this.baseMode()))));
  }
  updated() {
    this.frame(), this.onScroll();
  }
  clearPalette() {
    for (const e of this.paletteVars) document.documentElement.style.removeProperty(e);
    this.paletteVars = [];
  }
  baseMode() {
    return String(y(l(this.config).default_mode) || "light");
  }
  toggleShown() {
    return l(this.config).show_mode_toggle !== !1;
  }
  applyMode(e) {
    this.mode = e, document.documentElement.classList.toggle("mf-mode-dark", e === "dark"), document.documentElement.classList.toggle("mf-mode-light", e === "light");
  }
  toggleMode() {
    const e = this.mode === "dark" ? "light" : "dark";
    document.documentElement.classList.add("mf-mode-ready"), this.applyMode(e), K(e, this.baseMode());
  }
  /**
   * White-on-image only works over the hero: without one, the header would put white text on the page
   * background, so it stays solid.
   */
  transparent() {
    if (!l(this.config).transparent) return !1;
    const e = document.querySelector(".mf-section");
    return !!(e != null && e.matches("[data-mf-hero].mf-hero--overlay"));
  }
  /** Sticky and the transparent overlap go on the outermost box of the section, the editor's card included. */
  frame() {
    const e = l(this.config), t = this.closest(".component-card") || this;
    this.framed && this.framed !== t && this.unframe();
    const s = !!e.sticky, o = this.transparent();
    t.style.position = s ? "sticky" : o ? "relative" : "", t.style.top = s ? "0" : "", t.style.zIndex = s || o ? "30" : "", t.style.marginBottom = o ? `-${this.offsetHeight}px` : "", document.documentElement.style.setProperty("--mf-hd-h", s ? `${this.offsetHeight}px` : "0px"), this.framed = t;
  }
  unframe() {
    this.framed && (this.framed.style.position = this.framed.style.top = this.framed.style.zIndex = this.framed.style.marginBottom = "", document.documentElement.style.removeProperty("--mf-hd-h"), this.framed = void 0);
  }
  goTo(e, t) {
    var o;
    const s = document.querySelector(`[data-mf-section="${CSS.escape(t)}"]`);
    s && (e.preventDefault(), s.scrollIntoView({ behavior: (o = window.matchMedia) != null && o.call(window, "(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" }));
  }
  async onBuy() {
    var t, s;
    if (this.busy) return;
    this.busy = !0;
    let e;
    try {
      e = await M();
    } finally {
      this.busy = !1;
    }
    e.kind === "error" && ((s = (t = b()) == null ? void 0 : t.error) == null || s.call(t, e.message));
  }
  render() {
    const e = l(this.config), t = Math.min(Math.max(Number(e.logo_height) || 56, 24), 140), s = [
      "mf-block mf-hd mf-auto",
      y(e.align) === "start" ? "" : "mf-hd--center",
      e.show_shadow !== !1 ? "mf-hd--shadow" : "",
      this.transparent() ? "mf-hd--trans" : "",
      e.sticky ? "mf-hd--sticky" : "",
      this.solid ? "is-solid" : ""
    ].filter(Boolean).join(" "), o = e.logo || this.store.logo, r = e.logo_dark || "", a = this.store.name, p = z(e.nav, "nav").map((i) => ({ label: _(i.label), target: L(i.target) })).filter((i) => i.label && i.target), w = e.show_buy !== !1 && C() !== "none", u = this.mode === "dark";
    return n`<header class=${s} style=${`--mf-hd-logo:${t}px`}>
      <div class="mf-hd__inner">
        <span class="mf-hd__brand">
          ${o ? n`<img class="mf-hd__logo mf-hd__logo--light${r ? " has-dark" : ""}" src=${o} alt=${a} />
                ${r ? n`<img class="mf-hd__logo mf-hd__logo--dark" src=${r} alt=${a} />` : c}` : n`<span class="mf-hd__name">${a}</span>`}
        </span>
        ${p.length ? n`<nav class="mf-hd__nav" aria-label=${g({ ar: "أقسام الصفحة", en: "Page sections" })}>
              ${p.map((i) => n`<a href=${`#${i.target}`} @click=${(x) => this.goTo(x, i.target)}>${i.label}</a>`)}
            </nav>` : c}
        <div class="mf-hd__actions">
          ${this.toggleShown() ? n`<button type="button" class="mf-hd__toggle" @click=${() => this.toggleMode()} aria-pressed=${u ? "true" : "false"}
                aria-label=${g({ ar: "الوضع الداكن", en: "Dark mode" })}>${u ? V : R}</button>` : c}
          ${w ? n`<button type="button" class="mf-btn mf-hd__buy" aria-busy=${this.busy ? "true" : "false"} @click=${() => this.onBuy()}>
                ${_(e.buy_text) || g({ ar: "اشتري الآن", en: "Buy now" })}</button>` : c}
        </div>
      </div>
    </header>`;
  }
}
h([
  $({ type: Object })
], m.prototype, "config");
h([
  f()
], m.prototype, "store");
h([
  f()
], m.prototype, "mode");
h([
  f()
], m.prototype, "solid");
h([
  f()
], m.prototype, "busy");
typeof m < "u" && m.registerSallaComponent("salla-page-header");
export {
  m as default
};
