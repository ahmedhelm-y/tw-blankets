import { html, nothing } from "lit";
import { state } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { toItems, type BundleLine } from "../../utils/bundle";
import { buyAction } from "../../utils/buy";
import { noteAdded } from "../../utils/cart";
import { getCollectionItems, getLocale, resolveText, t } from "../../utils/config";
import { DealSection } from "../../utils/deals";
import { ensureDrawer, openDrawer } from "../../utils/drawer";
import { fetchProduct, isLandingPage, money } from "../../utils/landing";
import { isAvailable } from "../../utils/bundle";

type SpotItem = { product: unknown; x: unknown; y: unknown };
type Spot = { product: any; x: number; y: number };

const css = `
.mf-sr__wrap { display: grid; gap: 1.25rem; }
@container (min-width: 900px) { .mf-sr__wrap { grid-template-columns: 7fr 5fr; align-items: start; gap: 2rem; } }
.mf-sr__photo { position: relative; border-radius: 1.5rem; overflow: hidden; background: var(--mf-card); }
.mf-sr__photo img { width: 100%; aspect-ratio: 4 / 3; object-fit: cover; }
.mf-sr__dot { position: absolute; width: 2.25rem; height: 2.25rem; display: grid; place-items: center; padding: 0; border: 3px solid #fff; border-radius: 999px;
  background: var(--mf-accent); color: var(--mf-accent-text); font: inherit; font-weight: 900; transform: translate(-50%, -50%); cursor: pointer;
  box-shadow: 0 0 0 0 rgb(255 255 255 / 70%); animation: mf-sr-pulse 2.4s ease-out infinite; }
.mf-sr__dot[aria-pressed="true"] { background: #fff; color: #1d1b19; }
.mf-sr__dot:focus-visible { outline: 3px solid #fff; outline-offset: 3px; }
@keyframes mf-sr-pulse { 0% { box-shadow: 0 0 0 0 rgb(255 255 255 / 70%); } 70%, 100% { box-shadow: 0 0 0 14px rgb(255 255 255 / 0%); } }
@media (prefers-reduced-motion: reduce) { .mf-sr__dot { animation: none; } }
.mf-sr__list { display: grid; gap: .625rem; margin: 0; padding: 0; list-style: none; }
.mf-sr__item { display: grid; grid-template-columns: auto 4rem minmax(0, 1fr); gap: .75rem; align-items: center; padding: .75rem; border: 2px solid transparent;
  border-radius: 1rem; background: var(--mf-card); transition: border-color .2s ease; }
.mf-sr__item.is-on { border-color: var(--mf-accent-ink); }
.mf-sr__num { width: 1.75rem; height: 1.75rem; display: grid; place-items: center; border-radius: 999px; background: var(--mf-accent); color: var(--mf-accent-text); font-weight: 900; font-size: .875rem; }
.mf-sr__item img { width: 4rem; height: 4rem; border-radius: .75rem; object-fit: cover; }
.mf-sr__info { display: grid; gap: .25rem; }
.mf-sr__name { overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; font-weight: 700; line-height: 1.5; color: var(--mf-title); }
.mf-sr__price { font-weight: 800; color: var(--mf-title); }
.mf-sr__act { grid-column: 1 / -1; display: flex; flex-wrap: wrap; gap: .5rem; }
.mf-sr__act select { flex: 1 1 8rem; min-height: 2.75rem; padding: 0 .5rem; border: 1px solid color-mix(in srgb, var(--mf-text) 25%, transparent); border-radius: .625rem;
  background: var(--mf-bg); color: var(--mf-title); font: inherit; font-size: .875rem; }
.mf-sr__act select[aria-invalid="true"] { border-color: #d92d20; }
.mf-sr__act .mf-btn { flex: 1 1 8rem; min-height: 2.75rem; padding-block: .5rem; font-size: .9375rem; }
.mf-sr__all { display: grid; gap: .375rem; margin-top: .75rem; }
.mf-sr__all .mf-btn { width: 100%; }
.mf-sr__total { text-align: center; font-weight: 700; }
`;

export default class ShopRoom extends DealSection {
  protected readonly styleId = "shop-room";
  @state() private spots: Spot[] = [];
  @state() private loaded = false;
  @state() private active = -1;

  protected styles() {
    return css;
  }

  async connectedCallback() {
    super.connectedCallback();
    ensureDrawer();
    const items = getCollectionItems<SpotItem>(this.cfg().spots, "spots").slice(0, 6);
    const loaded = await Promise.all(items.map(async (s) => {
      const value = Array.isArray(s.product) ? s.product[0] : s.product;
      const id = value && typeof value === "object" ? (value as any).value ?? (value as any).id : value;
      const product = id ? await fetchProduct(String(id)) : null;
      const clamp = (n: unknown) => Math.min(Math.max(Number(n) || 50, 3), 97);
      return product && isAvailable(product) ? { product, x: clamp(s.x), y: clamp(s.y) } : null;
    }));
    this.spots = loaded.filter(Boolean) as Spot[];
    this.loaded = true;
  }

  private focusItem(i: number) {
    this.active = i;
    this.querySelector<HTMLElement>(`[data-spot="${i}"]`)?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }

  /** Every piece of the look in one go; a piece still missing a choice gets its picker marked instead. */
  private async addAll() {
    const lines: BundleLine[] = this.spots.map((s) => ({ product: s.product, selected: true, quantity: 1, options: this.picks[String(s.product.id)] || {} }));
    const missingAt = lines.findIndex((l) => (l.product.options || []).some((o: any) => o?.required && (o.details || []).length && !l.options[String(o.id)]));
    if (missingAt >= 0) {
      const p = lines[missingAt].product;
      const missing = (p.options || []).filter((o: any) => o?.required && (o.details || []).length && !lines[missingAt].options[String(o.id)]).map((o: any) => Number(o.id));
      this.invalid = { ...this.invalid, [String(p.id)]: missing };
      this.active = missingAt;
      await this.updateComplete;
      this.querySelector<HTMLSelectElement>(`[data-spot="${missingAt}"] select[aria-invalid="true"]`)?.focus();
      return;
    }
    if (isLandingPage()) {
      await this.press({ items: toItems(lines), stay: true });
      if (this.error) return;
    }
    await noteAdded(lines.map((l) => ({ product: l.product, options: l.options, quantity: 1 })), getLocale());
    openDrawer();
  }

  render() {
    const cfg = this.cfg();
    const image = String(cfg.image || "");
    if (!image || !this.spots.length) {
      if (!this.loaded || isLandingPage()) return nothing;
      return this.frame(html`<p class="mf-empty">${t({ ar: "أضف صورة الغرفة والنقط ومنتج كل نقطة من إعدادات هذا القسم", en: "Add the room photo and a product for each spot in this section's settings" })}</p>`);
    }
    const total = this.spots.reduce((n, s) => n + (Number(s.product.sale_price || s.product.price) || 0), 0);
    const canBuy = buyAction({ items: [{ id: "x", quantity: 1 }] }) !== "none";
    return this.frame(html`<div class="mf-sr__wrap">
      <div class="mf-sr__photo">
        <img src=${image} alt=${resolveText(cfg.image_alt)} loading="lazy" />
        ${this.spots.map((s, i) => html`<button type="button" class="mf-sr__dot" style=${`left:${s.x}%;top:${s.y}%`} aria-pressed=${this.active === i ? "true" : "false"}
          aria-label=${s.product.name} @click=${() => this.focusItem(i)}>${i + 1}</button>`)}
      </div>
      <div>
        <ol class="mf-sr__list">${this.spots.map((s, i) => {
          const p = s.product;
          const src = p.images?.[0]?.url || p.image?.url;
          return html`<li class=${`mf-sr__item${this.active === i ? " is-on" : ""}`} data-spot=${i} data-card=${String(p.id)}>
            <span class="mf-sr__num">${i + 1}</span>
            ${src ? html`<img src=${src} alt="" loading="lazy" />` : html`<span></span>`}
            <span class="mf-sr__info"><span class="mf-sr__name">${p.name}</span><span class="mf-sr__price">${unsafeHTML(money(Number(p.sale_price || p.price) || 0))}</span></span>
            <div class="mf-sr__act">${this.renderPickers(p)}${this.renderBuy(p, t({ ar: "أضف", en: "Add" }))}</div>
          </li>`;
        })}</ol>
        ${canBuy && this.spots.length > 1
          ? html`<div class="mf-sr__all">
              <button type="button" class="mf-btn" aria-busy=${this.busy ? "true" : "false"} @click=${() => this.addAll()}>${resolveText(cfg.buy_text) || t({ ar: "أضف اللوك كامل للسلة", en: "Add the whole look" })}</button>
              <span class="mf-sr__total">${t({ ar: `${this.spots.length} قطع بـ`, en: `${this.spots.length} pieces for` })} ${unsafeHTML(money(Math.round(total * 100) / 100))}</span>
            </div>`
          : nothing}
      </div>
    </div>`, { extraClass: "mf-sr" });
  }
}
