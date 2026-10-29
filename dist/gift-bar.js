import { nothing as m, html as r } from "lit";
import { unsafeHTML as l } from "lit/directives/unsafe-html.js";
import { e as b, p as u, a as _, c as h } from "./drawer-CKC4Ya7w.js";
import { g as v, r as d, i as w, t as n, m as f } from "./styles-CLr0WKdM.js";
import { M as $ } from "./section-DQASqLF9.js";
const x = `
.mf-gb__steps { display: grid; grid-template-columns: repeat(var(--mf-gb-n, 3), minmax(0, 1fr)); gap: .75rem; padding: 0; margin: 0; list-style: none; }
@container (max-width: 560px) { .mf-gb__steps { grid-template-columns: minmax(0, 1fr); } }
.mf-gb__step { display: grid; grid-template-columns: auto minmax(0, 1fr); gap: .875rem; align-items: center; padding: .875rem 1rem; border-radius: 1.125rem; background: var(--mf-card); }
.mf-gb__step img, .mf-gb__icon { width: 3.5rem; height: 3.5rem; border-radius: .875rem; object-fit: cover; }
.mf-gb__icon { display: grid; place-items: center; background: color-mix(in srgb, var(--mf-accent) 16%, var(--mf-bg)); font-size: 1.5rem; }
.mf-gb__step b { display: block; font-size: 1.0625rem; font-weight: 900; color: var(--mf-title); line-height: 1.4; }
.mf-gb__step span { font-size: .875rem; }
.mf-gb__step.is-on { background: var(--mf-accent); }
.mf-gb__step.is-on b, .mf-gb__step.is-on span { color: var(--mf-accent-text); }
.mf-gb__track { height: .625rem; margin-top: 1.25rem; border-radius: 999px; background: color-mix(in srgb, var(--mf-text) 15%, transparent); overflow: hidden; }
.mf-gb__fill { height: 100%; border-radius: 999px; background: var(--mf-accent); transition: width .5s ease; }
.mf-gb__msg { margin: .75rem 0 0; text-align: center; font-weight: 800; color: var(--mf-title); }
.mf-gb__wrap { display: flex; align-items: center; justify-content: center; gap: .5rem; margin: 1rem 0 0; text-align: center; font-weight: 700; }
@media (prefers-reduced-motion: reduce) { .mf-gb__fill { transition: none; } }
`;
class p extends $ {
  constructor() {
    super(...arguments), this.styleId = "gift-bar", this.onCart = () => this.requestUpdate();
  }
  styles() {
    return x;
  }
  connectedCallback() {
    super.connectedCallback(), b(), window.addEventListener("mf:cart-state", this.onCart);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), window.removeEventListener("mf:cart-state", this.onCart);
  }
  render() {
    const o = this.cfg(), s = v(o.tiers, "tiers").map((e) => ({ amount: Number(e.amount) || 0, reward: d(e.reward), image: String(e.image || "") })).filter((e) => e.amount > 0 && e.reward).sort((e, a) => e.amount - a.amount).slice(0, 3), i = s.map(({ amount: e, reward: a }) => ({ amount: e, reward: a }));
    if (u(i), !i.length)
      return w() ? m : this.frame(r`<p class="mf-empty">${n({ ar: "أضف المبالغ والهدايا من إعدادات هذا القسم", en: "Add the amounts and gifts in this section's settings" })}</p>`);
    const c = h(), t = c.count ? _(c.total, i) : null, g = d(o.wrap_text);
    return this.frame(r`
      <ol class="mf-gb__steps" style=${`--mf-gb-n:${s.length}`}>
        ${s.map((e, a) => r`<li class=${`mf-gb__step${t && a < t.reached ? " is-on" : ""}`}>
          ${e.image ? r`<img src=${e.image} alt="" loading="lazy" />` : r`<span class="mf-gb__icon" aria-hidden="true">🎁</span>`}
          <div><b>${e.reward}</b><span>${n({ ar: "عند الشراء بـ", en: "When you spend" })} ${l(f(e.amount))}</span></div></li>`)}
      </ol>
      ${t ? r`<div class="mf-gb__track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow=${t.percent}>
            <div class="mf-gb__fill" style=${`width:${t.percent}%`}></div></div>
          <p class="mf-gb__msg" aria-live="polite">${t.next ? r`${n({ ar: "باقي", en: "Only" })} ${l(f(t.left))} ${n({ ar: `وتحصل على ${t.next.reward}`, en: `more for ${t.next.reward}` })}` : n({ ar: "مبروك، طلبك وصل لأعلى هدية 🎉", en: "Your order reached the top gift" })}</p>` : m}
      ${g ? r`<p class="mf-gb__wrap"><span aria-hidden="true">🎀</span>${g}</p>` : m}`, { extraClass: "mf-gb" });
  }
}
typeof p < "u" && p.registerSallaComponent("salla-gift-bar");
export {
  p as default
};
