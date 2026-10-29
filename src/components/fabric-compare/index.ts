import { html, nothing } from "lit";
import { anchorId, getCollectionItems, resolveText, t, webUrl } from "../../utils/config";
import { isLandingPage } from "../../utils/landing";
import { MfSection } from "../../utils/section";

type FabricItem = { name: unknown; tagline: unknown; image: unknown; feel: unknown; warmth: unknown; best_for: unknown; badge: unknown; link_text: unknown; link: unknown };

const css = `
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

export default class FabricCompare extends MfSection {
  protected readonly styleId = "fabric-compare";

  protected styles() {
    return css;
  }

  /** "#notes" or "notes" scrolls to a section of the page; anything else is a web link. */
  private href(value: unknown): string {
    const raw = String(value ?? "").trim();
    if (!raw) return "";
    if (raw.startsWith("#") || !/[./]/.test(raw)) {
      const id = anchorId(raw.replace(/^#/, ""));
      return id ? `#${id}` : "";
    }
    return webUrl(raw);
  }

  private go(e: Event, href: string) {
    if (!href.startsWith("#")) return;
    const target = document.querySelector(`[data-mf-section="${href.slice(1)}"]`);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }

  render() {
    const fabrics = getCollectionItems<FabricItem>(this.cfg().fabrics, "fabrics")
      .map((f) => ({
        name: resolveText(f.name),
        tagline: resolveText(f.tagline),
        image: String(f.image || ""),
        feel: resolveText(f.feel),
        warmth: Math.min(Math.max(Math.round(Number(f.warmth) || 0), 0), 5),
        bestFor: resolveText(f.best_for),
        badge: resolveText(f.badge),
        linkText: resolveText(f.link_text),
        href: this.href(f.link),
      }))
      .filter((f) => f.name)
      .slice(0, 4);
    if (!fabrics.length) {
      if (isLandingPage()) return nothing;
      return this.frame(html`<p class="mf-empty">${t({ ar: "أضف الخامات من إعدادات هذا القسم", en: "Add the fabrics in this section's settings" })}</p>`);
    }
    return this.frame(html`<ul class="mf-fc__grid">${fabrics.map((f) => html`<li class="mf-fc__card">
      ${f.image ? html`<img src=${f.image} alt="" loading="lazy" />` : nothing}
      ${f.badge ? html`<span class="mf-fc__badge">${f.badge}</span>` : nothing}
      <div class="mf-fc__body">
        <h3 class="mf-fc__name">${f.name}</h3>
        ${f.tagline ? html`<p class="mf-fc__tag">${f.tagline}</p>` : nothing}
        <dl class="mf-fc__rows">
          ${f.feel ? html`<div class="mf-fc__row"><dt>${t({ ar: "الإحساس", en: "The feel" })}</dt><dd>${f.feel}</dd></div>` : nothing}
          ${f.warmth
            ? html`<div class="mf-fc__row"><dt>${t({ ar: "الدفء", en: "Warmth" })}</dt><dd><span class="mf-fc__dots" role="img" aria-label=${t({ ar: `${f.warmth} من 5`, en: `${f.warmth} of 5` })}>
                ${[1, 2, 3, 4, 5].map((n) => html`<i class=${n <= f.warmth ? "on" : ""}></i>`)}</span></dd></div>`
            : nothing}
          ${f.bestFor ? html`<div class="mf-fc__row"><dt>${t({ ar: "مناسب لـ", en: "Best for" })}</dt><dd>${f.bestFor}</dd></div>` : nothing}
        </dl>
        ${f.href && f.linkText ? html`<a class="mf-fc__link" href=${f.href} @click=${(e: Event) => this.go(e, f.href)}>${f.linkText} ${t({ ar: "←", en: "→" })}</a>` : nothing}
      </div>
    </li>`)}</ul>`, { extraClass: "mf-fc" });
  }
}
