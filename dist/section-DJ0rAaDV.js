import { LitElement as p, nothing as n, html as c } from "lit";
import { property as y, state as h } from "lit/decorators.js";
import { e as b, h as g, z as v, n as $, r as l, t as S, j as _, k as C, c as d, s as k, q as j, l as w } from "./styles-1hlUxruQ.js";
var x = Object.defineProperty, f = (a, s, t, e) => {
  for (var r = void 0, o = a.length - 1, i; o >= 0; o--)
    (i = a[o]) && (r = i(s, t, r) || r);
  return r && x(s, t, r), r;
};
function I(a) {
  var e;
  const s = document.querySelector(`[data-mf-section="${CSS.escape(a)}"]`), t = (e = window.matchMedia) == null ? void 0 : e.call(window, "(prefers-reduced-motion: reduce)").matches;
  s == null || s.scrollIntoView({ behavior: t ? "auto" : "smooth", block: "start" });
}
function L(a, s = "product") {
  const t = w();
  if (t) return t;
  const e = a[s], r = Array.isArray(e) ? e[0] : e, o = r && typeof r == "object" ? r.value ?? r.id : r;
  return o ? String(o) : null;
}
class u extends p {
  constructor() {
    super(...arguments), this.busy = !1, this.error = "";
  }
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), this.classList.add("mf-host"), b(), g(`mf-${this.styleId}`, this.styles());
  }
  firstUpdated() {
    const s = this.querySelector(".mf-section:not([data-mf-hero]) > .mf-container");
    s && v(s);
  }
  cfg() {
    return $(this.config);
  }
  styles() {
    return "";
  }
  buyLabel() {
    return l(this.cfg().buy_text) || S({ ar: "أضف للسلة", en: "Add to cart" });
  }
  async press(s = {}) {
    var e, r;
    if (this.busy) return;
    this.busy = !0, this.error = "";
    let t;
    try {
      t = await _(s);
    } finally {
      this.busy = !1;
    }
    t.kind === "error" && (this.error = t.message || "", (r = (e = C()) == null ? void 0 : e.error) == null || r.call(e, t.message));
  }
  /**
   * The page's one primary action, repeated at the end of a section: the same button that takes the
   * shopper back up to the product and its buy button. Hidden when the merchant clears its text.
   */
  renderCta() {
    const s = this.cfg(), t = l(s.cta_text), e = d(s.cta_target) || "top";
    return !t || s.show_cta === !1 ? n : c`<div class="mf-cta"><button type="button" class="mf-btn" @click=${() => I(e)}>${t}</button></div>`;
  }
  frame(s, t = {}) {
    const e = this.cfg(), r = t.title === !1 ? "" : l(e.title), o = t.title === !1 ? "" : l(e.subtitle), i = d(e.section_id), m = ["mf-block mf-section", k(e), t.extraClass || ""].filter(Boolean).join(" ");
    return c`<section class=${m} style=${j(e)} data-mf-section=${i || n}
      ?data-mf-hero=${!!t.hero}>
      <div class="mf-container">
        ${r || o ? c`<div class="mf-title">${r ? c`<h2>${r}</h2>` : n}${o ? c`<p>${o}</p>` : n}</div>` : n}
        ${s}
        ${this.error && !t.noError ? c`<p class="mf-error" role="alert">${this.error}</p>` : n}
      </div>
    </section>`;
  }
}
f([
  y({ type: Object })
], u.prototype, "config");
f([
  h()
], u.prototype, "busy");
f([
  h()
], u.prototype, "error");
export {
  u as M,
  L as p
};
