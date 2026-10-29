import { html, nothing } from "lit";
import { piecesTotal } from "../../utils/bedding";
import { getCollectionItems, getLocale, resolveText, t, unwrapValue } from "../../utils/config";
import { CARE, careIcon, pieceIcon, PIECES } from "../../utils/icons";
import { isLandingPage } from "../../utils/landing";
import { MfSection } from "../../utils/section";

type PieceItem = { type: unknown; name: unknown; count: unknown; size: unknown };
type CareItem = { symbol: unknown; text: unknown };

const css = `
.mf-sd__wrap { display: grid; gap: 1.5rem; }
@container (min-width: 900px) { .mf-sd__wrap.has-image { grid-template-columns: 5fr 7fr; align-items: center; gap: 2.5rem; } }
.mf-sd__image { width: 100%; aspect-ratio: 4 / 3; object-fit: cover; border-radius: 1.5rem; }
.mf-sd__total { display: flex; align-items: baseline; gap: .625rem; margin-bottom: 1rem; color: var(--mf-title); }
.mf-sd__total b { font-size: 3rem; font-weight: 900; line-height: 1; color: var(--mf-accent-ink); }
.mf-sd__total span { font-size: 1.125rem; font-weight: 800; }
.mf-sd__pieces { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 9.5rem), 1fr)); gap: .75rem; margin: 0; padding: 0; list-style: none; }
.mf-sd__piece { position: relative; display: grid; justify-items: center; gap: .375rem; padding: 1rem .75rem; border-radius: 1.125rem; background: var(--mf-card); text-align: center; }
.mf-sd__piece svg { width: 2.75rem; height: 2.75rem; color: var(--mf-accent-ink); }
.mf-sd__count { position: absolute; top: .5rem; inset-inline-end: .5rem; min-width: 1.75rem; height: 1.75rem; display: grid; place-items: center; padding: 0 .375rem;
  border-radius: 999px; background: var(--mf-accent); color: var(--mf-accent-text); font-size: .8125rem; font-weight: 800; }
.mf-sd__name { font-weight: 800; color: var(--mf-title); line-height: 1.4; }
.mf-sd__size { font-size: .8125rem; }
.mf-sd__care { margin-top: 2rem; padding: 1.25rem; border-radius: 1.25rem; border: 1px solid color-mix(in srgb, var(--mf-text) 15%, transparent); }
.mf-sd__care h3 { margin: 0 0 1rem; font-size: 1.125rem; font-weight: 900; color: var(--mf-title); }
.mf-sd__symbols { display: flex; flex-wrap: wrap; gap: 1rem 1.5rem; margin: 0; padding: 0; list-style: none; }
.mf-sd__symbol { display: flex; align-items: center; gap: .625rem; font-size: .9375rem; font-weight: 600; color: var(--mf-title); }
.mf-sd__symbol svg { width: 2.25rem; height: 2.25rem; flex: 0 0 auto; color: var(--mf-title); }
.mf-sd__carenote { margin: 1rem 0 0; line-height: 1.7; }
`;

export default class SetDetails extends MfSection {
  protected readonly styleId = "set-details";

  protected styles() {
    return css;
  }

  render() {
    const cfg = this.cfg();
    const en = getLocale() === "en";
    const pieces = getCollectionItems<PieceItem>(cfg.pieces, "pieces")
      .map((p) => {
        const type = String(unwrapValue(p.type) || "comforter");
        const known = PIECES[type as keyof typeof PIECES];
        return { type, name: resolveText(p.name) || (known ? (en ? known.en : known.ar) : ""), count: Math.max(1, Math.round(Number(p.count) || 1)), size: resolveText(p.size) };
      })
      .filter((p) => p.name)
      .slice(0, 12);
    const care = getCollectionItems<CareItem>(cfg.care, "care")
      .map((c) => {
        const symbol = String(unwrapValue(c.symbol) || "");
        const known = CARE[symbol as keyof typeof CARE];
        return { symbol, text: resolveText(c.text) || (known ? (en ? known.en : known.ar) : "") };
      })
      .filter((c) => c.text && careIcon(c.symbol))
      .slice(0, 8);
    if (!pieces.length && !care.length) {
      if (isLandingPage()) return nothing;
      return this.frame(html`<p class="mf-empty">${t({ ar: "أضف قطع الطقم ورموز الغسيل من إعدادات هذا القسم", en: "Add the set's pieces and care symbols in this section's settings" })}</p>`);
    }
    const image = String(cfg.image || "");
    const total = piecesTotal(pieces);
    const careTitle = resolveText(cfg.care_title) || t({ ar: "العناية والغسيل", en: "Care" });
    const careNote = resolveText(cfg.care_note);
    return this.frame(html`<div class=${`mf-sd__wrap${image ? " has-image" : ""}`}>
      ${image ? html`<img class="mf-sd__image" src=${image} alt="" loading="lazy" />` : nothing}
      <div>
        ${pieces.length
          ? html`${cfg.show_total !== false && total > 1
              ? html`<div class="mf-sd__total"><b>${total}</b><span>${resolveText(cfg.total_label) || t({ ar: "قطع في الطقم", en: "pieces in the set" })}</span></div>`
              : nothing}
            <ul class="mf-sd__pieces">${pieces.map((p) => html`<li class="mf-sd__piece">
              ${p.count > 1 ? html`<span class="mf-sd__count" aria-label=${t({ ar: `${p.count} قطع`, en: `${p.count} pieces` })}>×${p.count}</span>` : nothing}
              ${pieceIcon(p.type)}<span class="mf-sd__name">${p.name}</span>${p.size ? html`<span class="mf-sd__size">${p.size}</span>` : nothing}</li>`)}</ul>`
          : nothing}
        ${care.length
          ? html`<div class="mf-sd__care"><h3>${careTitle}</h3>
              <ul class="mf-sd__symbols">${care.map((c) => html`<li class="mf-sd__symbol">${careIcon(c.symbol)}<span>${c.text}</span></li>`)}</ul>
              ${careNote ? html`<p class="mf-sd__carenote">${careNote}</p>` : nothing}</div>`
          : nothing}
      </div>
    </div>`, { extraClass: "mf-sd" });
  }
}
