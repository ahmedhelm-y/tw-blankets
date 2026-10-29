import { html, nothing } from "lit";
import { state } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { resolveText, t, unwrapValue } from "../../utils/config";
import { DealSection, loadProducts, productIds } from "../../utils/deals";
import { fetchProduct, isLandingPage, money } from "../../utils/landing";
import { productIdFrom } from "../../utils/section";

const css = `
.mf-hero { position: relative; padding: 0; overflow: hidden; }
.mf-hero > .mf-container { max-width: none; padding: 0; }
.mf-hero__media { position: relative; overflow: hidden; background: var(--mf-card); }
.mf-hero__media img, .mf-hero__media video { width: 100%; height: 100%; object-fit: cover; }
.mf-hero__body { display: flex; flex-direction: column; gap: 1rem; max-width: 36rem; }
.mf-hero__badge { align-self: flex-start; padding: .375rem .875rem; border-radius: 999px; background: var(--mf-accent); color: var(--mf-accent-text);
  font-size: .8125rem; font-weight: 700; }
.mf-hero__title { margin: 0; font-size: 2.25rem; line-height: 1.2; font-weight: 800; color: var(--mf-title); }
.mf-hero__sub { margin: 0; font-size: 1.0625rem; line-height: 1.8; color: var(--mf-text); }
.mf-hero__cta { display: flex; flex-wrap: wrap; align-items: center; gap: 1rem; margin-top: .5rem; }
.mf-hero__price { display: flex; align-items: baseline; gap: .5rem; font-size: 1.375rem; font-weight: 800; color: var(--mf-title); }
.mf-hero__price s { font-size: 1rem; font-weight: 500; opacity: .7; }
@container (min-width: 768px) { .mf-hero__title { font-size: 3.25rem; } }
.mf-hero__pickers { display: grid; gap: .5rem; max-width: 22rem; }
.mf-hero__pickers select { width: 100%; min-height: 2.75rem; padding: 0 .75rem; border: 1px solid color-mix(in srgb, var(--mf-text) 25%, transparent); border-radius: .625rem;
  background: var(--mf-bg); color: var(--mf-title); font: inherit; }
.mf-hero__pickers select[aria-invalid="true"] { border-color: #d92d20; }
.mf-hero__addons { display: grid; gap: .5rem; max-width: 26rem; margin: 0; padding: 0; list-style: none; }
.mf-hero__addon { display: flex; align-items: center; gap: .75rem; padding: .625rem .875rem; border: 1px solid color-mix(in srgb, var(--mf-text) 18%, transparent);
  border-radius: .875rem; background: color-mix(in srgb, var(--mf-bg) 88%, transparent); color: var(--mf-title); cursor: pointer; }
.mf-hero__addon input { width: 1.25rem; height: 1.25rem; accent-color: var(--mf-accent); flex: 0 0 auto; }
.mf-hero__addon img { width: 2.75rem; height: 2.75rem; border-radius: .5rem; object-fit: cover; flex: 0 0 auto; }
.mf-hero__addon span { flex: 1 1 auto; font-size: .9375rem; font-weight: 600; line-height: 1.5; }
.mf-hero__addon b { white-space: nowrap; }
.mf-hero__addon-pick { margin: .375rem 0 0; }
.mf-hero--overlay .mf-hero__addon { background: rgb(255 255 255 / 92%); color: #1d1b19; border-color: transparent; }

/* Overlay: text over full-bleed media, on a dark veil; the body sits above the positioned media */
.mf-hero--overlay .mf-hero__body { position: relative; z-index: 1; }
.mf-hero--overlay .mf-hero__media { position: absolute; inset: 0; background: color-mix(in srgb, var(--mf-accent) 25%, #0d0b0a); }
.mf-hero--overlay .mf-hero__media::after { content: ""; position: absolute; inset: 0; background: rgb(0 0 0 / var(--mf-hero-veil, .35)); }
.mf-hero--overlay .mf-hero__wrap { display: flex; align-items: center; min-height: var(--mf-hero-h, 85vh);
  max-width: 1200px; margin-inline: auto; padding: 5rem 1rem 3rem; }
.mf-hero--overlay.mf-hero--center .mf-hero__wrap { justify-content: center; text-align: center; }
.mf-hero--overlay.mf-hero--center .mf-hero__body { align-items: center; }
.mf-hero--overlay.mf-hero--center .mf-hero__badge { align-self: center; }
.mf-hero--overlay .mf-hero__title, .mf-hero--overlay .mf-hero__sub, .mf-hero--overlay .mf-hero__price { color: #fff; }

/* Split: media beside the text */
.mf-hero--split .mf-hero__wrap { display: grid; gap: 2rem; max-width: 1200px; margin-inline: auto; padding: 2.5rem 1rem; align-items: center; }
.mf-hero--split .mf-hero__media { aspect-ratio: 4 / 5; border-radius: 1.25rem; }
@container (min-width: 768px) { .mf-hero--split .mf-hero__wrap { grid-template-columns: 1fr 1fr; gap: 3.5rem; padding-block: 4rem; } }
@container (max-width: 767px) { .mf-hero--split .mf-hero__media { order: -1; aspect-ratio: 1 / 1; } }
`;

export default class Hero extends DealSection {
  protected readonly styleId = "hero";
  @state() private product: any = null;
  @state() private addons: any[] = [];
  @state() private checked = new Set<string>();
  @state() private mobile = false;
  private media?: MediaQueryList;

  protected styles() {
    return css;
  }

  async connectedCallback() {
    super.connectedCallback();
    this.media = window.matchMedia?.("(max-width: 767px)");
    this.mobile = Boolean(this.media?.matches);
    this.media?.addEventListener?.("change", this.onMedia);
    const cfg = this.cfg();
    const [product, addons] = await Promise.all([fetchProduct(productIdFrom(cfg)), loadProducts(productIds(cfg.addons, 3))]);
    this.product = product;
    this.addons = addons;
    this.checked = new Set(cfg.addons_checked === false ? [] : this.addons.map((a) => String(a.id)));
  }

  private toggle(id: string) {
    const next = new Set(this.checked);
    next.has(id) ? next.delete(id) : next.add(id);
    this.checked = next;
  }

  private renderAddons() {
    if (!this.addons.length) return nothing;
    const label = resolveText(this.cfg().addons_label);
    return html`${label ? html`<span class="mf-hero__sub" style="font-weight:700">${label}</span>` : nothing}
      <ul class="mf-hero__addons">${this.addons.map((a) => {
        const id = String(a.id);
        const image = a.images?.[0]?.url || a.image?.url;
        return html`<li><label class="mf-hero__addon">
          <input type="checkbox" .checked=${this.checked.has(id)} @change=${() => this.toggle(id)} />
          ${image ? html`<img src=${image} alt="" loading="lazy" />` : nothing}
          <span>${t({ ar: "أضف", en: "Add" })} ${a.name}</span>
          <b>${unsafeHTML(money(Number(a.sale_price || a.price) || 0))}</b>
        </label>
        ${this.checked.has(id) ? html`<div class="mf-hero__pickers mf-hero__addon-pick">${this.renderPickers(a)}</div>` : nothing}</li>`;
      })}</ul>`;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.media?.removeEventListener?.("change", this.onMedia);
  }

  private onMedia = (e: MediaQueryListEvent) => {
    this.mobile = e.matches;
  };

  private renderMedia() {
    const cfg = this.cfg();
    const pick = (desktop: string, phone: string) => String((this.mobile && cfg[phone]) || cfg[desktop] || "");
    if (unwrapValue(cfg.media) === "video") {
      const src = pick("video_url", "video_url_mobile");
      if (src) {
        const still = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
        // The key forces a fresh element when the source changes between phone and desktop
        return html`<video .src=${src} poster=${cfg.poster || nothing} ?autoplay=${!still} muted loop playsinline preload="metadata"
          aria-hidden="true"></video>`;
      }
    }
    const image = pick("image", "image_mobile");
    const fallback = this.product?.image?.url || "";
    const src = image || fallback;
    return src ? html`<img src=${src} alt="" fetchpriority="high" />` : nothing;
  }

  private renderPrice() {
    const p = this.product;
    if (!p || this.cfg().show_price === false) return nothing;
    const price = Number(p.is_on_sale ? p.sale_price : p.price) || 0;
    const regular = Number(p.regular_price) || 0;
    return html`<span class="mf-hero__price">${unsafeHTML(money(price))}
      ${p.is_on_sale && regular > price ? html`<s>${unsafeHTML(money(regular))}</s>` : nothing}</span>`;
  }

  render() {
    const cfg = this.cfg();
    const layout = unwrapValue(cfg.layout) === "split" ? "split" : "overlay";
    const center = unwrapValue(cfg.content_align) !== "start";
    const veil = Math.min(Math.max(Number(cfg.overlay ?? 35), 0), 80) / 100;
    const height = Math.min(Math.max(Number(cfg.height) || 85, 50), 100);
    const badge = resolveText(cfg.badge);
    const title = resolveText(cfg.title);
    const subtitle = resolveText(cfg.subtitle);
    const p = this.product;

    return this.frame(
      html`<div class="mf-hero__wrap" style=${`--mf-hero-veil:${veil};--mf-hero-h:${height}vh`}>
        <div class="mf-hero__media">${this.renderMedia()}</div>
        <div class="mf-hero__body">
          ${badge ? html`<span class="mf-hero__badge">${badge}</span>` : nothing}
          ${title ? html`<h1 class="mf-hero__title">${title}</h1>` : nothing}
          ${subtitle ? html`<p class="mf-hero__sub">${subtitle}</p>` : nothing}
          ${p ? html`<div class="mf-hero__pickers" data-card=${String(p.id)}>${this.renderPickers(p)}</div>` : nothing}
          ${p ? this.renderAddons() : nothing}
          <div class="mf-hero__cta">
            ${p ? this.renderBuy(p, undefined, { extras: this.addons.filter((a) => this.checked.has(String(a.id))) }) : nothing}
            ${this.renderPrice()}
          </div>
          ${!p && !isLandingPage() ? html`<p class="mf-hero__sub">${t({ ar: "اختر منتج القسم من الإعدادات ليظهر زر الإضافة للسلة", en: "Pick the section's product to show the add to cart button" })}</p>` : nothing}
        </div>
      </div>`,
      { hero: true, title: false, extraClass: `mf-hero mf-hero--${layout}${center ? " mf-hero--center" : ""}` }
    );
  }
}
