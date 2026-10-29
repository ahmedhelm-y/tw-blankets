import { html, nothing, svg } from "lit";
import { state } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { dims, pickByValue } from "../../utils/bedding";
import { getCollectionItems, resolveText, t } from "../../utils/config";
import { DealSection } from "../../utils/deals";
import { fetchProduct, isLandingPage, money } from "../../utils/landing";
import { productIdFrom } from "../../utils/section";

type SizeItem = { bed: unknown; bed_size: unknown; cover_size: unknown; option_value: unknown; note: unknown };
type Size = { bed: string; bedSize: string; coverSize: string; value: string; note: string };

const css = `
.mf-sg__beds { display: flex; flex-wrap: wrap; justify-content: center; gap: .5rem; margin-bottom: 1.5rem; }
.mf-sg__bed { min-height: 2.75rem; padding: .5rem 1.125rem; border: 1.5px solid color-mix(in srgb, var(--mf-text) 25%, transparent); border-radius: 999px;
  background: var(--mf-bg); color: var(--mf-title); font: inherit; font-weight: 700; cursor: pointer; }
.mf-sg__bed small { display: block; font-size: .75rem; font-weight: 500; opacity: .8; }
.mf-sg__bed[aria-pressed="true"] { border-color: var(--mf-accent-ink); background: var(--mf-accent); color: var(--mf-accent-text); }
.mf-sg__bed:focus-visible { outline: 3px solid var(--mf-accent-ink); outline-offset: 2px; }
.mf-sg__panel { display: grid; gap: 1.5rem; align-items: center; padding: 1.5rem; border-radius: 1.5rem; background: var(--mf-card); }
@container (min-width: 768px) { .mf-sg__panel { grid-template-columns: 1fr 1fr; padding: 2rem; } }
.mf-sg__draw { width: 100%; max-width: 26rem; margin-inline: auto; color: var(--mf-title); }
.mf-sg__draw .cover { fill: color-mix(in srgb, var(--mf-accent) 30%, transparent); stroke: var(--mf-accent-ink); }
.mf-sg__draw .bed { fill: var(--mf-bg); stroke: currentColor; }
.mf-sg__draw text { fill: currentColor; font-size: 13px; font-weight: 700; }
.mf-sg__facts { display: grid; gap: .75rem; }
.mf-sg__fact { display: flex; justify-content: space-between; gap: 1rem; padding-bottom: .625rem; border-bottom: 1px solid color-mix(in srgb, var(--mf-text) 14%, transparent); }
.mf-sg__fact b { color: var(--mf-title); }
.mf-sg__note { margin: 0; line-height: 1.7; }
.mf-sg__buy { display: flex; flex-wrap: wrap; align-items: center; gap: .75rem 1rem; margin-top: .5rem; }
.mf-sg__buy select { min-height: 2.75rem; padding: 0 .75rem; border: 1px solid color-mix(in srgb, var(--mf-text) 25%, transparent); border-radius: .625rem;
  background: var(--mf-bg); color: var(--mf-title); font: inherit; }
.mf-sg__buy select[aria-invalid="true"] { border-color: #d92d20; }
.mf-sg__price { font-size: 1.25rem; font-weight: 900; color: var(--mf-title); }
`;

/** A top view of the bed with the cover laid over it, both drawn to the same scale. */
function drawing(bed: { w: number; l: number } | null, cover: { w: number; l: number } | null) {
  if (!bed || !cover) return nothing;
  const W = 320, H = 300, pad = 24;
  const scale = Math.min((W - pad * 2) / Math.max(bed.w, cover.w), (H - pad * 2) / Math.max(bed.l, cover.l));
  const rect = (d: { w: number; l: number }) => ({ w: d.w * scale, h: d.l * scale, x: (W - d.w * scale) / 2, y: pad });
  const b = rect(bed), c = rect(cover);
  const side = Math.round((cover.w - bed.w) / 2);
  return html`<svg class="mf-sg__draw" viewBox=${`0 0 ${W} ${H}`} role="img" aria-label=${t({ ar: `المفرش أعرض من السرير بـ ${side} سم من كل جانب`, en: `The cover is ${side} cm wider than the bed on each side` })}>
    ${svg`<rect class="cover" x=${c.x} y=${c.y} width=${c.w} height=${c.h} rx="10" stroke-width="2" />
      <rect class="bed" x=${b.x} y=${b.y} width=${b.w} height=${b.h} rx="6" stroke-width="2" stroke-dasharray="6 5" />
      <rect class="bed" x=${b.x + b.w * 0.12} y=${b.y + 8} width=${b.w * 0.32} height="22" rx="6" stroke-width="1.5" />
      <rect class="bed" x=${b.x + b.w * 0.56} y=${b.y + 8} width=${b.w * 0.32} height="22" rx="6" stroke-width="1.5" />
      ${side > 0 ? svg`<text x=${c.x + c.w - 6} y=${b.y + b.h / 2} text-anchor="end">${side}+</text>` : nothing}`}
  </svg>`;
}

export default class SizeGuide extends DealSection {
  protected readonly styleId = "size-guide";
  @state() private product: any = null;
  @state() private chosen = 0;

  protected styles() {
    return css;
  }

  async connectedCallback() {
    super.connectedCallback();
    this.product = await fetchProduct(productIdFrom(this.cfg()));
  }

  private sizes(): Size[] {
    return getCollectionItems<SizeItem>(this.cfg().sizes, "sizes")
      .map((s) => ({
        bed: resolveText(s.bed),
        bedSize: resolveText(s.bed_size),
        coverSize: resolveText(s.cover_size),
        value: String(s.option_value ?? "").trim() || resolveText(s.bed),
        note: resolveText(s.note),
      }))
      .filter((s) => s.bed && s.coverSize)
      .slice(0, 6);
  }

  render() {
    const sizes = this.sizes();
    if (!sizes.length) {
      if (isLandingPage()) return nothing;
      return this.frame(html`<p class="mf-empty">${t({ ar: "أضف مقاسات الأسرّة والمفارش من إعدادات هذا القسم", en: "Add the bed and cover sizes in this section's settings" })}</p>`);
    }
    const s = sizes[Math.min(this.chosen, sizes.length - 1)];
    const bed = dims(s.bedSize), cover = dims(s.coverSize);
    const side = bed && cover ? Math.round((cover.w - bed.w) / 2) : 0;
    const p = this.product;
    const preset = p ? pickByValue(p, s.value) : {};
    const price = p ? Number(p.sale_price || p.price) || 0 : 0;
    return this.frame(html`
      <div class="mf-sg__beds" role="group" aria-label=${t({ ar: "مقاس السرير", en: "Bed size" })}>
        ${sizes.map((x, i) => html`<button type="button" class="mf-sg__bed" aria-pressed=${x === s ? "true" : "false"} @click=${() => (this.chosen = i)}>
          ${x.bed}${x.bedSize ? html`<small>${x.bedSize}</small>` : nothing}</button>`)}
      </div>
      <div class="mf-sg__panel">
        ${drawing(bed, cover)}
        <div class="mf-sg__facts">
          ${s.bedSize ? html`<div class="mf-sg__fact"><span>${t({ ar: "مقاس السرير", en: "Bed size" })}</span><b>${s.bedSize}</b></div>` : nothing}
          <div class="mf-sg__fact"><span>${t({ ar: "مقاس المفرش المناسب", en: "Cover size" })}</span><b>${s.coverSize}</b></div>
          ${side > 0 ? html`<div class="mf-sg__fact"><span>${t({ ar: "ينزل من كل جانب", en: "Drop on each side" })}</span><b>${side} ${t({ ar: "سم", en: "cm" })}</b></div>` : nothing}
          ${s.note ? html`<p class="mf-sg__note">${s.note}</p>` : nothing}
          ${p
            ? html`<div class="mf-sg__buy" data-card=${String(p.id)}>
                ${this.renderPickers(p, preset)}
                ${price ? html`<span class="mf-sg__price">${unsafeHTML(money(price))}</span>` : nothing}
                ${this.renderBuy(p, resolveText(this.cfg().buy_text) || t({ ar: `أضف مقاس ${s.bed} للسلة`, en: `Add the ${s.bed} size` }), { options: preset })}
              </div>`
            : nothing}
        </div>
      </div>`, { extraClass: "mf-sg" });
  }
}
