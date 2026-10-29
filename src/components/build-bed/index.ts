import { html, nothing } from "lit";
import { state } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { bundleTotal, toItems, validateLines, type BundleLine } from "../../utils/bundle";
import { buyAction } from "../../utils/buy";
import { noteAdded } from "../../utils/cart";
import { getCollectionItems, getLocale, resolveText, t } from "../../utils/config";
import { loadProducts, productIds } from "../../utils/deals";
import { ensureDrawer, openDrawer } from "../../utils/drawer";
import { optionLabel } from "../../utils/fit";
import { isLandingPage, money } from "../../utils/landing";
import { MfSection } from "../../utils/section";

type StepItem = { title: unknown; products: unknown; optional: unknown };
type Step = { title: string; optional: boolean; products: any[] };

const css = `
.mf-bd__steps { display: grid; grid-template-columns: minmax(0, 1fr); gap: 1.75rem; margin: 0; padding: 0; list-style: none; counter-reset: step; }
.mf-bd__step { min-width: 0; counter-increment: step; }
.mf-bd__head { display: flex; align-items: center; gap: .75rem; margin-bottom: .875rem; }
.mf-bd__head::before { content: counter(step); width: 2rem; height: 2rem; flex: 0 0 auto; display: grid; place-items: center; border-radius: 999px;
  background: var(--mf-accent); color: var(--mf-accent-text); font-weight: 900; }
.mf-bd__head h3 { margin: 0; font-size: 1.125rem; font-weight: 900; color: var(--mf-title); }
.mf-bd__head small { font-size: .8125rem; }
.mf-bd__row { display: grid; grid-auto-flow: column; grid-auto-columns: minmax(10rem, 1fr); gap: .75rem; overflow-x: auto; padding-bottom: .375rem;
  scroll-snap-type: x mandatory; }
@container (min-width: 900px) { .mf-bd__row { grid-auto-flow: row; grid-template-columns: repeat(4, minmax(0, 1fr)); overflow: visible; } }
.mf-bd__opt { scroll-snap-align: start; display: flex; flex-direction: column; border: 2px solid color-mix(in srgb, var(--mf-text) 12%, transparent); border-radius: 1rem;
  background: var(--mf-card); overflow: hidden; }
.mf-bd__opt.is-on { border-color: var(--mf-accent-ink); }
.mf-bd__pick { display: flex; flex-direction: column; width: 100%; padding: 0; border: 0; background: none; color: inherit; font: inherit; text-align: start; cursor: pointer; }
.mf-bd__pick:focus-visible { outline: 3px solid var(--mf-accent-ink); outline-offset: -3px; }
.mf-bd__pick img { width: 100%; aspect-ratio: 1 / 1; object-fit: cover; background: var(--mf-bg); }
.mf-bd__info { display: grid; gap: .125rem; padding: .625rem .75rem .75rem; }
.mf-bd__name { overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; font-weight: 700; font-size: .9375rem; line-height: 1.5; color: var(--mf-title); }
.mf-bd__price { font-weight: 800; color: var(--mf-title); }
.mf-bd__opts { display: grid; gap: .375rem; padding: 0 .75rem .75rem; }
.mf-bd__opts select { width: 100%; min-height: 2.75rem; padding: 0 .5rem; border: 1px solid color-mix(in srgb, var(--mf-text) 25%, transparent); border-radius: .625rem;
  background: var(--mf-bg); color: var(--mf-title); font: inherit; font-size: .875rem; }
.mf-bd__opts select[aria-invalid="true"] { border-color: #d92d20; }
.mf-bd__skip { min-height: 2.75rem; padding: 0 1rem; border: 1.5px dashed color-mix(in srgb, var(--mf-text) 35%, transparent); border-radius: 1rem;
  background: none; color: var(--mf-title); font: inherit; font-weight: 700; cursor: pointer; }
.mf-bd__skip[aria-pressed="true"] { border-style: solid; border-color: var(--mf-accent-ink); }
.mf-bd__bar { position: sticky; bottom: calc(.75rem + var(--mf-sb-h, 0px)); z-index: 2; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between;
  gap: 1rem; margin-top: 1.75rem; padding: 1rem 1.25rem; border-radius: 1.25rem; background: var(--mf-title); color: var(--mf-bg); box-shadow: 0 14px 34px -16px rgb(0 0 0 / 50%); }
.mf-bd__thumbs { display: flex; }
.mf-bd__thumbs img { width: 2.75rem; height: 2.75rem; border: 2px solid var(--mf-title); border-radius: 999px; object-fit: cover; margin-inline-start: -.625rem; background: var(--mf-bg); }
.mf-bd__thumbs img:first-child { margin-inline-start: 0; }
.mf-bd__sum { display: grid; gap: .125rem; flex: 1 1 12rem; }
.mf-bd__total { display: flex; align-items: baseline; gap: .5rem; font-size: 1.375rem; font-weight: 900; }
.mf-bd__total s { font-size: .9375rem; font-weight: 500; opacity: .7; }
.mf-bd__offer { font-size: .875rem; opacity: .9; }
.mf-bd__bar .mf-btn { flex: 1 1 13rem; }
.mf-bd__bar .mf-error { flex: 1 1 100%; margin: 0; color: #fda29b; }
`;

export default class BuildBed extends MfSection {
  protected readonly styleId = "build-bed";
  @state() private steps: Step[] = [];
  @state() private loaded = false;
  @state() private chosen: string[] = [];
  @state() private options: Record<string, Record<string, number>> = {};
  @state() private missing: Record<string, number[]> = {};

  protected styles() {
    return css;
  }

  async connectedCallback() {
    super.connectedCallback();
    ensureDrawer();
    const items = getCollectionItems<StepItem>(this.cfg().steps, "steps").slice(0, 4);
    const steps = await Promise.all(items.map(async (s) => ({
      title: resolveText(s.title),
      optional: s.optional === true,
      products: await loadProducts(productIds(s.products, 6)),
    })));
    this.steps = steps.filter((s) => s.title && s.products.length);
    // Every step starts on its first product, so the total shows a full bed; optional steps start empty
    this.chosen = this.steps.map((s) => (s.optional ? "" : String(s.products[0].id)));
    this.loaded = true;
  }

  private lines(): BundleLine[] {
    return this.steps.flatMap((s, i) => {
      const product = s.products.find((p) => String(p.id) === this.chosen[i]);
      return product ? [{ product, selected: true, quantity: 1, options: this.options[String(product.id)] || {} }] : [];
    });
  }

  private choose(step: number, id: string) {
    const next = [...this.chosen];
    next[step] = next[step] === id && this.steps[step].optional ? "" : id;
    this.chosen = next;
  }

  private setOption(productId: string, optionId: number, value: string) {
    const current = { ...(this.options[productId] || {}) };
    if (value) current[String(optionId)] = Number(value);
    else delete current[String(optionId)];
    this.options = { ...this.options, [productId]: current };
    if (this.missing[productId]) this.missing = { ...this.missing, [productId]: this.missing[productId].filter((o) => o !== optionId) };
  }

  private async onBuy() {
    const lines = this.lines();
    const check = validateLines(lines, 1);
    this.missing = check.missing;
    if (!check.ok) {
      this.error = Object.keys(check.missing).length
        ? t({ ar: "اختر المقاس أو اللون لكل قطعة", en: "Choose the size or color of every piece" })
        : t({ ar: "اختر قطعة واحدة على الأقل", en: "Pick at least one piece" });
      await this.updateComplete;
      this.querySelector<HTMLSelectElement>('select[aria-invalid="true"]')?.focus();
      return;
    }
    // The bed goes into the cart and the side cart opens with its pieces
    if (isLandingPage()) {
      await this.press({ items: toItems(lines), stay: true });
      if (this.error) return;
    }
    await noteAdded(lines.map((l) => ({ product: l.product, options: l.options, quantity: 1 })), getLocale());
    openDrawer();
  }

  private renderProduct(p: any, step: number) {
    const id = String(p.id);
    const on = this.chosen[step] === id;
    const image = p.images?.[0]?.url || p.image?.url;
    const required: any[] = (p.options || []).filter((o: any) => o?.required && (o.details || []).length);
    const missing = this.missing[id] || [];
    return html`<li class=${`mf-bd__opt${on ? " is-on" : ""}`}>
      <button type="button" class="mf-bd__pick" role="radio" aria-checked=${on ? "true" : "false"} @click=${() => this.choose(step, id)}>
        ${image ? html`<img src=${image} alt="" loading="lazy" />` : nothing}
        <span class="mf-bd__info"><span class="mf-bd__name">${p.name}</span><span class="mf-bd__price">${unsafeHTML(money(Number(p.sale_price || p.price) || 0))}</span></span>
      </button>
      ${on && required.length
        ? html`<div class="mf-bd__opts">${required.map((o) => {
            const sid = `mf-bd-${id}-${o.id}`;
            const label = optionLabel(o, getLocale());
            return html`<label class="mf-visually-hidden" for=${sid}>${label}</label>
              <select id=${sid} aria-invalid=${missing.includes(Number(o.id)) ? "true" : "false"} @change=${(e: Event) => this.setOption(id, o.id, (e.target as HTMLSelectElement).value)}>
                <option value="">${t({ ar: `اختر ${label}`, en: `Choose ${label}` })}</option>
                ${(o.details as any[]).map((v) => html`<option value=${v.id} ?disabled=${v.is_out} ?selected=${this.options[id]?.[String(o.id)] === Number(v.id)}>${v.name}</option>`)}
              </select>`;
          })}</div>`
        : nothing}
    </li>`;
  }

  render() {
    if (!this.steps.length) {
      if (!this.loaded || isLandingPage()) return nothing;
      return this.frame(html`<p class="mf-empty">${t({ ar: "أضف خطوات السرير ومنتجات كل خطوة من إعدادات هذا القسم", en: "Add the bed's steps and their products in this section's settings" })}</p>`);
    }
    const cfg = this.cfg();
    const lines = this.lines();
    const sum = bundleTotal(lines);
    const percent = Math.min(Math.max(Number(cfg.discount_percent) || 0, 0), 90);
    // The discount itself is the merchant's special offer in Salla; the page only shows what it comes to
    const after = percent && sum.count >= 2 ? Math.round(sum.total * (100 - percent)) / 100 : 0;
    const offer = resolveText(cfg.offer_text);
    const canBuy = buyAction({ items: [{ id: "x", quantity: 1 }] }) !== "none";
    return this.frame(html`
      <ol class="mf-bd__steps">${this.steps.map((s, i) => html`<li class="mf-bd__step">
        <div class="mf-bd__head"><h3>${s.title}</h3>${s.optional ? html`<small>${t({ ar: "(اختياري)", en: "(optional)" })}</small>` : nothing}</div>
        <ul class="mf-bd__row" role="radiogroup" aria-label=${s.title}>${s.products.map((p) => this.renderProduct(p, i))}</ul>
      </li>`)}</ol>
      <div class="mf-bd__bar">
        <span class="mf-bd__thumbs" aria-hidden="true">${lines.map((l) => {
          const src = l.product.images?.[0]?.url || l.product.image?.url;
          return src ? html`<img src=${src} alt="" />` : nothing;
        })}</span>
        <div class="mf-bd__sum" aria-live="polite">
          <span>${t({ ar: `سريرك: ${sum.count === 1 ? "قطعة واحدة" : sum.count === 2 ? "قطعتان" : `${sum.count} قطع`}`, en: `Your bed: ${sum.count} pieces` })}</span>
          <span class="mf-bd__total">${unsafeHTML(money(after || sum.total))}
            ${after ? html`<s>${unsafeHTML(money(sum.total))}</s>` : sum.regular > sum.total ? html`<s>${unsafeHTML(money(sum.regular))}</s>` : nothing}</span>
          ${offer ? html`<span class="mf-bd__offer">${offer}</span>` : nothing}
        </div>
        ${canBuy
          ? html`<button type="button" class="mf-btn" aria-busy=${this.busy ? "true" : "false"} ?disabled=${!sum.count} @click=${() => this.onBuy()}>
              ${resolveText(cfg.buy_text) || t({ ar: "أضف السرير كامل للسلة", en: "Add the whole bed" })}</button>`
          : nothing}
        ${this.error ? html`<p class="mf-error" role="alert">${this.error}</p>` : nothing}
      </div>`, { extraClass: "mf-bd", noError: true });
  }
}
