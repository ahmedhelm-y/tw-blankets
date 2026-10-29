import { nothing as m, html as t } from "lit";
import { g as n, r as i, i as f, t as l } from "./styles-CLr0WKdM.js";
import { M as o } from "./section-DQASqLF9.js";
const d = `
.mf-fq__list { display: grid; gap: .5rem; max-width: 52rem; margin-inline: auto; }
.mf-fq__list details { border-radius: 1rem; background: var(--mf-card); }
.mf-fq__list summary { display: flex; align-items: center; justify-content: space-between; gap: 1rem; min-height: 3.25rem; padding: .75rem 1.125rem;
  font-weight: 800; color: var(--mf-title); cursor: pointer; list-style: none; }
.mf-fq__list summary::-webkit-details-marker { display: none; }
.mf-fq__list summary::after { content: "+"; font-size: 1.375rem; line-height: 1; color: var(--mf-accent-ink); }
.mf-fq__list details[open] summary::after { content: "−"; }
.mf-fq__list summary:focus-visible { outline: 2px solid var(--mf-accent-ink); outline-offset: -2px; border-radius: 1rem; }
.mf-fq__list p { margin: 0; padding: 0 1.125rem 1rem; line-height: 1.8; white-space: pre-line; }
`;
class r extends o {
  constructor() {
    super(...arguments), this.styleId = "faq";
  }
  styles() {
    return d;
  }
  render() {
    const s = n(this.cfg().faqs, "faqs").map((e) => ({ q: i(e.q), a: i(e.a) })).filter((e) => e.q && e.a);
    return s.length ? this.frame(t`<div class="mf-fq__list">${s.map((e, a) => t`<details ?open=${a === 0}><summary>${e.q}</summary><p>${e.a}</p></details>`)}</div>`, { extraClass: "mf-fq" }) : f() ? m : this.frame(t`<p class="mf-empty">${l({ ar: "أضف الأسئلة من إعدادات هذا القسم", en: "Add the questions in this section's settings" })}</p>`);
  }
}
typeof r < "u" && r.registerSallaComponent("salla-faq");
export {
  r as default
};
