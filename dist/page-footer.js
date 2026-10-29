import { LitElement as u, nothing as f, html as e } from "lit";
import { property as b, state as x } from "lit/decorators.js";
import { e as k, c as w, d as j, r as d, g as z, w as C, s as L, h as P, t as _, j as R } from "./styles-CLr0WKdM.js";
var F = Object.defineProperty, $ = (m, t, c, n) => {
  for (var o = void 0, a = m.length - 1, s; a >= 0; a--)
    (s = m[a]) && (o = s(t, c, o) || o);
  return o && F(t, c, o), o;
};
const h = (m) => `
${m} .mf-ft__logo--light.has-dark { display: none; }
${m} .mf-ft__logo--dark { display: block; }
${m} .mf-ft__logo--light:not(.has-dark) { filter: brightness(0) invert(1); }`, O = `
.mf-ft { padding-block: 2.5rem 1.25rem; border-top: 1px solid color-mix(in srgb, var(--mf-text) 12%, transparent); }
.mf-ft__top { display: grid; gap: 1.75rem; }
@container (min-width: 768px) { .mf-ft__top { grid-template-columns: 2fr 1fr; align-items: start; } }
.mf-ft__logo { display: block; height: 48px; width: auto; max-width: 60%; object-fit: contain; }
.mf-ft .mf-ft__logo--dark { display: none; }
.mf-ft__name { font-size: 1.25rem; font-weight: 800; color: var(--mf-title); }
.mf-ft__about { margin-top: .75rem; max-width: 36rem; font-size: .9375rem; line-height: 1.8; color: var(--mf-text); }
.mf-ft__contact { display: grid; gap: .25rem; }
.mf-ft__contact a { display: inline-flex; align-items: center; gap: .5rem; min-height: 2.75rem; color: var(--mf-text); text-decoration: none; font-weight: 600; }
.mf-ft__contact a:hover { color: var(--mf-accent-ink); }
.mf-ft__contact i { font-size: 1.125rem; color: var(--mf-accent-ink); }
.mf-ft__social { display: flex; flex-wrap: wrap; gap: .5rem; margin-top: .75rem; }
.mf-ft__social a { width: 2.75rem; height: 2.75rem; display: grid; place-items: center; border-radius: 999px; background: var(--mf-card);
  color: var(--mf-title); font-size: 1.125rem; text-decoration: none; }
.mf-ft__social a:hover { background: var(--mf-accent); color: var(--mf-accent-text); }
.mf-ft a:focus-visible { outline: 2px solid var(--mf-accent-ink); outline-offset: 2px; }
.mf-ft__bottom { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1rem; margin-top: 2rem; padding-top: 1.25rem;
  border-top: 1px solid color-mix(in srgb, var(--mf-text) 10%, transparent); }
.mf-ft__payments { display: flex; flex-wrap: wrap; gap: .5rem; }
.mf-ft__payments img { width: 3rem; height: 2rem; object-fit: contain; padding: .25rem; border-radius: .375rem; background: #fff; }
.mf-ft__copy { font-size: .8125rem; color: var(--mf-text); }
${[".mf-ft.mf-dark", "html.mf-mode-dark .mf-ft.mf-auto"].map(h).join("")}
@media (prefers-color-scheme: dark) { ${h("html:not(.mf-mode-light) .mf-ft.mf-auto")} }
`;
class g extends u {
  constructor() {
    super(...arguments), this.store = { logo: "", name: "", payments: [] };
  }
  createRenderRoot() {
    return this;
  }
  async connectedCallback() {
    var n, o, a, s;
    super.connectedCallback(), this.classList.add("mf-host"), k(), w("mf-page-footer", O);
    const t = R();
    await ((n = t == null ? void 0 : t.onReady) == null ? void 0 : n.call(t));
    const c = ((o = t == null ? void 0 : t.config) == null ? void 0 : o.get("store.settings.payments")) || [];
    this.store = {
      logo: ((a = t == null ? void 0 : t.config) == null ? void 0 : a.get("store.logo")) || "",
      name: ((s = t == null ? void 0 : t.config) == null ? void 0 : s.get("store.name")) || "",
      payments: c.map((i) => {
        var l, p;
        return { src: ((p = (l = t == null ? void 0 : t.url) == null ? void 0 : l.cdn) == null ? void 0 : p.call(l, `images/payment/${i}_mini.png`, 116, 116)) || "", name: i };
      }).filter((i) => i.src)
    };
  }
  render() {
    const t = j(this.config), c = t.logo || this.store.logo, n = this.store.name, o = d(t.about), a = String(t.phone || "").trim(), s = String(t.whatsapp || "").replace(/[^\d]/g, ""), i = String(t.email || "").trim(), l = z(t.social, "social").map((r) => ({ icon: String(r.icon || "sicon-link"), url: C(r.url) })).filter((r) => r.url), p = (/* @__PURE__ */ new Date()).getFullYear(), y = (d(t.copyright) || "© {year} {store}").replace("{year}", String(p)).replace("{store}", n), v = a || s || i;
    return e`<footer class=${`mf-block mf-ft ${L(t)}`} style=${P(t)}>
      <div class="mf-container">
        <div class="mf-ft__top">
          <div>
            ${c ? e`<img class="mf-ft__logo mf-ft__logo--light${t.logo_dark ? " has-dark" : ""}" src=${c} alt=${n} loading="lazy" />
                  ${t.logo_dark ? e`<img class="mf-ft__logo mf-ft__logo--dark" src=${t.logo_dark} alt=${n} loading="lazy" />` : f}` : e`<span class="mf-ft__name">${n}</span>`}
            ${o ? e`<p class="mf-ft__about">${o}</p>` : f}
            ${l.length ? e`<div class="mf-ft__social">${l.map((r) => e`<a href=${r.url} target="_blank" rel="noopener" aria-label=${r.icon.replace(/^sicon-/, "")}><i class=${r.icon}></i></a>`)}</div>` : f}
          </div>
          ${v ? e`<div class="mf-ft__contact" aria-label=${_({ ar: "تواصل معنا", en: "Contact us" })}>
                ${a ? e`<a href=${`tel:${a.replace(/[^\d+]/g, "")}`}><i class="sicon-phone"></i><span dir="ltr">${a}</span></a>` : f}
                ${s ? e`<a href=${`https://wa.me/${s}`} target="_blank" rel="noopener"><i class="sicon-whatsapp"></i>${_({ ar: "واتساب", en: "WhatsApp" })}</a>` : f}
                ${i ? e`<a href=${`mailto:${i}`}><i class="sicon-mail"></i><span dir="ltr">${i}</span></a>` : f}
              </div>` : f}
        </div>
        <div class="mf-ft__bottom">
          ${t.show_payments !== !1 && this.store.payments.length ? e`<div class="mf-ft__payments">${this.store.payments.map((r) => e`<img src=${r.src} alt=${r.name} loading="lazy" />`)}</div>` : f}
          <p class="mf-ft__copy">${y}</p>
        </div>
      </div>
    </footer>`;
  }
}
$([
  b({ type: Object })
], g.prototype, "config");
$([
  x()
], g.prototype, "store");
typeof g < "u" && g.registerSallaComponent("salla-page-footer");
export {
  g as default
};
