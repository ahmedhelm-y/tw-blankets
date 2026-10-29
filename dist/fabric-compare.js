import { nothing as a, html as r } from "lit";
import { b as c, w as f, g as l, r as s, i as d, t as n } from "./styles-CLr0WKdM.js";
import { M as g } from "./section-DQASqLF9.js";
const _ = `
.mf-fc__grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 15rem), 1fr)); gap: 1rem; margin: 0; padding: 0; list-style: none; }
.mf-fc__card { position: relative; display: flex; flex-direction: column; border-radius: 1.25rem; background: var(--mf-card); overflow: hidden; }
.mf-fc__card img { width: 100%; aspect-ratio: 4 / 3; object-fit: cover; }
.mf-fc__badge { position: absolute; top: .75rem; inset-inline-start: .75rem; padding: .25rem .75rem; border-radius: 999px; background: var(--mf-title); color: var(--mf-bg);
  font-size: .75rem; font-weight: 800; }
.mf-fc__body { display: flex; flex-direction: column; gap: .75rem; flex: 1 1 auto; padding: 1.125rem; }
.mf-fc__name { margin: 0; font-size: 1.25rem; font-weight: 900; color: var(--mf-title); }
.mf-fc__tag { margin: -.375rem 0 0; font-weight: 700; color: var(--mf-accent-ink); }
.mf-fc__rows { display: grid; gap: .5rem; margin: 0; }
.mf-fc__row { display: grid; gap: .125rem; }
.mf-fc__row dt { font-size: .8125rem; font-weight: 800; color: var(--mf-title); }
.mf-fc__row dd { margin: 0; line-height: 1.6; }
.mf-fc__dots { display: flex; gap: .25rem; }
.mf-fc__dots i { width: .75rem; height: .75rem; border-radius: 999px; background: color-mix(in srgb, var(--mf-text) 18%, transparent); }
.mf-fc__dots i.on { background: var(--mf-accent); }
.mf-fc__link { margin-top: auto; align-self: flex-start; font-weight: 800; color: var(--mf-title); text-underline-offset: .25rem; }
.mf-fc__link:focus-visible { outline: 2px solid var(--mf-accent-ink); outline-offset: 3px; border-radius: .25rem; }
`;
class o extends g {
  constructor() {
    super(...arguments), this.styleId = "fabric-compare";
  }
  styles() {
    return _;
  }
  /** "#notes" or "notes" scrolls to a section of the page; anything else is a web link. */
  href(i) {
    const e = String(i ?? "").trim();
    if (!e) return "";
    if (e.startsWith("#") || !/[./]/.test(e)) {
      const t = c(e.replace(/^#/, ""));
      return t ? `#${t}` : "";
    }
    return f(e);
  }
  go(i, e) {
    var m;
    if (!e.startsWith("#")) return;
    const t = document.querySelector(`[data-mf-section="${e.slice(1)}"]`);
    t && (i.preventDefault(), t.scrollIntoView({ behavior: (m = window.matchMedia) != null && m.call(window, "(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" }));
  }
  render() {
    const i = l(this.cfg().fabrics, "fabrics").map((e) => ({
      name: s(e.name),
      tagline: s(e.tagline),
      image: String(e.image || ""),
      feel: s(e.feel),
      warmth: Math.min(Math.max(Math.round(Number(e.warmth) || 0), 0), 5),
      bestFor: s(e.best_for),
      badge: s(e.badge),
      linkText: s(e.link_text),
      href: this.href(e.link)
    })).filter((e) => e.name).slice(0, 4);
    return i.length ? this.frame(r`<ul class="mf-fc__grid">${i.map((e) => r`<li class="mf-fc__card">
      ${e.image ? r`<img src=${e.image} alt="" loading="lazy" />` : a}
      ${e.badge ? r`<span class="mf-fc__badge">${e.badge}</span>` : a}
      <div class="mf-fc__body">
        <h3 class="mf-fc__name">${e.name}</h3>
        ${e.tagline ? r`<p class="mf-fc__tag">${e.tagline}</p>` : a}
        <dl class="mf-fc__rows">
          ${e.feel ? r`<div class="mf-fc__row"><dt>${n({ ar: "الإحساس", en: "The feel" })}</dt><dd>${e.feel}</dd></div>` : a}
          ${e.warmth ? r`<div class="mf-fc__row"><dt>${n({ ar: "الدفء", en: "Warmth" })}</dt><dd><span class="mf-fc__dots" role="img" aria-label=${n({ ar: `${e.warmth} من 5`, en: `${e.warmth} of 5` })}>
                ${[1, 2, 3, 4, 5].map((t) => r`<i class=${t <= e.warmth ? "on" : ""}></i>`)}</span></dd></div>` : a}
          ${e.bestFor ? r`<div class="mf-fc__row"><dt>${n({ ar: "مناسب لـ", en: "Best for" })}</dt><dd>${e.bestFor}</dd></div>` : a}
        </dl>
        ${e.href && e.linkText ? r`<a class="mf-fc__link" href=${e.href} @click=${(t) => this.go(t, e.href)}>${e.linkText} ${n({ ar: "←", en: "→" })}</a>` : a}
      </div>
    </li>`)}</ul>`, { extraClass: "mf-fc" }) : d() ? a : this.frame(r`<p class="mf-empty">${n({ ar: "أضف الخامات من إعدادات هذا القسم", en: "Add the fabrics in this section's settings" })}</p>`);
  }
}
typeof o < "u" && o.registerSallaComponent("salla-fabric-compare");
export {
  o as default
};
