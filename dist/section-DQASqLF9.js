import { LitElement as m, nothing as i, html as n } from "lit";
import { property as p, state as d } from "lit/decorators.js";
import { a as y } from "./buy-ycNLmR2K.js";
import { e as b, c as g, x as v, d as $, r as l, t as j, j as x, b as C, s as S, h as _, o as k } from "./styles-CLr0WKdM.js";
var I = Object.defineProperty, f = (a, s, e, r) => {
  for (var t = void 0, o = a.length - 1, c; o >= 0; o--)
    (c = a[o]) && (t = c(s, e, t) || t);
  return t && I(s, e, t), t;
};
function w(a, s = "product") {
  const e = k();
  if (e) return e;
  const r = a[s], t = Array.isArray(r) ? r[0] : r, o = t && typeof t == "object" ? t.value ?? t.id : t;
  return o ? String(o) : null;
}
class u extends m {
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
    return l(this.cfg().buy_text) || j({ ar: "أضف للسلة", en: "Add to cart" });
  }
  async press(s = {}) {
    var r, t;
    if (this.busy) return;
    this.busy = !0, this.error = "";
    let e;
    try {
      e = await y(s);
    } finally {
      this.busy = !1;
    }
    e.kind === "error" && (this.error = e.message || "", (t = (r = x()) == null ? void 0 : r.error) == null || t.call(r, e.message));
  }
  frame(s, e = {}) {
    const r = this.cfg(), t = e.title === !1 ? "" : l(r.title), o = e.title === !1 ? "" : l(r.subtitle), c = C(r.section_id), h = ["mf-block mf-section", S(r), e.extraClass || ""].filter(Boolean).join(" ");
    return n`<section class=${h} style=${_(r)} data-mf-section=${c || i}
      ?data-mf-hero=${!!e.hero}>
      <div class="mf-container">
        ${t || o ? n`<div class="mf-title">${t ? n`<h2>${t}</h2>` : i}${o ? n`<p>${o}</p>` : i}</div>` : i}
        ${s}
        ${this.error && !e.noError ? n`<p class="mf-error" role="alert">${this.error}</p>` : i}
      </div>
    </section>`;
  }
}
f([
  p({ type: Object })
], u.prototype, "config");
f([
  d()
], u.prototype, "busy");
f([
  d()
], u.prototype, "error");
export {
  u as M,
  w as p
};
