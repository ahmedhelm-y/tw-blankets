import { nothing as r, html as e } from "lit";
import { g as o, r as n, i as l, t as d, u as p } from "./styles-1hlUxruQ.js";
import { M as g } from "./section-DJ0rAaDV.js";
const f = `
.mf-ts__badges { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 9.5rem), 1fr)); gap: .75rem; }
.mf-ts__badge { display: flex; align-items: center; gap: .75rem; padding: .875rem 1rem; border-radius: 1rem; background: var(--mf-card); }
.mf-ts__badge i { flex: 0 0 auto; width: 2.5rem; height: 2.5rem; display: grid; place-items: center; border-radius: 999px;
  background: color-mix(in srgb, var(--mf-accent) 14%, var(--mf-bg)); color: var(--mf-accent-ink); font-size: 1.25rem; font-style: normal; }
.mf-ts__badge span { font-weight: 700; font-size: .9375rem; line-height: 1.5; color: var(--mf-title); }
.mf-ts__steps { display: grid; gap: 1rem; margin-top: 2rem; padding: 0; list-style: none; counter-reset: step; }
@container (min-width: 768px) { .mf-ts__steps { grid-template-columns: repeat(var(--mf-ts-cols, 4), minmax(0, 1fr)); gap: 1.25rem; } }
.mf-ts__step { position: relative; display: grid; gap: .5rem; padding: 1.25rem; border-radius: 1.25rem; background: var(--mf-card); counter-increment: step; }
.mf-ts__step::before { content: counter(step); width: 2rem; height: 2rem; display: grid; place-items: center; border-radius: 999px;
  background: var(--mf-accent); color: var(--mf-accent-text); font-weight: 800; }
.mf-ts__step h3 { margin: 0; font-size: 1.0625rem; font-weight: 800; color: var(--mf-title); }
.mf-ts__step p { margin: 0; font-size: .9375rem; line-height: 1.7; }
.mf-ts__step img { width: 100%; aspect-ratio: 4 / 3; object-fit: cover; border-radius: .875rem; }
.mf-section.mf-ts--compact { padding-block: 1.5rem; }
.mf-ts__empty { padding: 2rem; border: 1px dashed color-mix(in srgb, var(--mf-text) 35%, transparent); border-radius: 1rem; text-align: center; }
`;
class c extends g {
  constructor() {
    super(...arguments), this.styleId = "trust-strip";
  }
  styles() {
    return f;
  }
  render() {
    const i = this.cfg(), a = o(i.badges, "badges").map((t) => ({ icon: String(t.icon || "sicon-check"), text: n(t.text) })).filter((t) => t.text), s = o(i.steps, "steps").map((t) => ({ title: n(t.title), text: n(t.text), image: String(t.image || "") })).filter((t) => t.title);
    if (!a.length && !s.length)
      return l() ? r : this.frame(e`<p class="mf-ts__empty">${d({ ar: "أضف المميزات أو خطوات الصناعة من إعدادات هذا القسم", en: "Add badges or steps in this section's settings" })}</p>`);
    const m = p(i.layout) === "compact" && !s.length;
    return this.frame(e`
      ${a.length ? e`<div class="mf-ts__badges">${a.map((t) => e`<div class="mf-ts__badge"><i class=${t.icon} aria-hidden="true"></i><span>${t.text}</span></div>`)}</div>` : r}
      ${s.length ? e`<ol class="mf-ts__steps" style=${`--mf-ts-cols:${Math.min(s.length, 4)}`}>${s.map((t) => e`<li class="mf-ts__step">
            ${t.image ? e`<img src=${t.image} alt="" loading="lazy" />` : r}
            <h3>${t.title}</h3>${t.text ? e`<p>${t.text}</p>` : r}</li>`)}</ol>` : r}
      ${m ? r : this.renderCta()}`, { extraClass: `mf-ts${m ? " mf-ts--compact" : ""}`, title: !m });
  }
}
typeof c < "u" && c.registerSallaComponent("salla-trust-strip");
export {
  c as default
};
