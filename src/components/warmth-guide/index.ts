import { html, nothing } from "lit";
import { state } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { CITIES, levelFor, pickByValue, type City } from "../../utils/bedding";
import { getCollectionItems, getLocale, resolveText, t } from "../../utils/config";
import { DealSection } from "../../utils/deals";
import { fetchProduct, isLandingPage, money } from "../../utils/landing";
import { productIdFrom } from "../../utils/section";

type LevelItem = { name: unknown; option_value: unknown; badge: unknown; ideal_for: unknown; spec_1: unknown; spec_2: unknown; warmth: unknown; image: unknown };
type Level = { name: string; value: string; badge: string; idealFor: string; specs: string[]; warmth: number; image: string };

const css = `
.mf-wg__city { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: .75rem 1rem; margin: 0 auto 1.5rem; padding: 1rem 1.25rem;
  max-width: 46rem; border-radius: 1.25rem; background: var(--mf-card); }
.mf-wg__city label { font-weight: 800; color: var(--mf-title); }
.mf-wg__city select { min-height: 2.75rem; min-width: 12rem; padding: 0 .75rem; border: 1px solid color-mix(in srgb, var(--mf-text) 25%, transparent); border-radius: .625rem;
  background: var(--mf-bg); color: var(--mf-title); font: inherit; }
.mf-wg__advice { flex: 1 1 100%; margin: 0; text-align: center; line-height: 1.8; color: var(--mf-title); }
.mf-wg__advice b { color: var(--mf-accent-ink); }
.mf-wg__grid { display: grid; gap: .875rem; grid-template-columns: repeat(var(--mf-wg-n, 3), minmax(0, 1fr)); margin: 0; padding: 0; list-style: none; }
@container (max-width: 640px) { .mf-wg__grid { grid-template-columns: minmax(0, 1fr); } }
.mf-wg__card { position: relative; display: flex; flex-direction: column; width: 100%; height: 100%; padding: 0; border: 2px solid transparent; border-radius: 1.25rem;
  background: var(--mf-card); color: inherit; font: inherit; text-align: start; overflow: hidden; cursor: pointer; transition: border-color .2s ease, transform .2s ease; }
.mf-wg__card[aria-pressed="true"] { border-color: var(--mf-accent-ink); }
.mf-wg__card:focus-visible { outline: 3px solid var(--mf-accent-ink); outline-offset: 2px; }
.mf-wg__card img { width: 100%; aspect-ratio: 16 / 10; object-fit: cover; }
.mf-wg__badge { position: absolute; top: .75rem; inset-inline-start: .75rem; padding: .25rem .75rem; border-radius: 999px; background: var(--mf-accent);
  color: var(--mf-accent-text); font-size: .75rem; font-weight: 800; }
.mf-wg__body { display: grid; gap: .5rem; padding: 1rem 1.125rem 1.25rem; }
.mf-wg__name { font-size: 1.25rem; font-weight: 900; color: var(--mf-title); }
.mf-wg__dots { display: flex; gap: .25rem; }
.mf-wg__dots i { width: .875rem; height: .875rem; border-radius: 999px; background: color-mix(in srgb, var(--mf-text) 18%, transparent); }
.mf-wg__dots i.on { background: var(--mf-accent); }
.mf-wg__ideal { line-height: 1.7; }
.mf-wg__specs { display: grid; gap: .25rem; margin: 0; padding: 0; list-style: none; font-size: .875rem; }
.mf-wg__specs li::before { content: "•"; margin-inline-end: .375rem; color: var(--mf-accent-ink); }
.mf-wg__buy { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: .75rem 1rem; margin-top: 1.5rem; }
.mf-wg__buy select { min-height: 2.75rem; padding: 0 .75rem; border: 1px solid color-mix(in srgb, var(--mf-text) 25%, transparent); border-radius: .625rem;
  background: var(--mf-bg); color: var(--mf-title); font: inherit; }
.mf-wg__buy select[aria-invalid="true"] { border-color: #d92d20; }
.mf-wg__price { font-size: 1.25rem; font-weight: 900; color: var(--mf-title); }
.mf-wg__note { flex: 1 1 100%; margin: 0; text-align: center; font-size: .875rem; }
@media (prefers-reduced-motion: no-preference) { .mf-wg__card:hover { transform: translateY(-2px); } }
`;

export default class WarmthGuide extends DealSection {
  protected readonly styleId = "warmth-guide";
  @state() private product: any = null;
  @state() private chosen = -1;
  @state() private city = -1;

  protected styles() {
    return css;
  }

  async connectedCallback() {
    super.connectedCallback();
    this.product = await fetchProduct(productIdFrom(this.cfg()));
  }

  private levels(): Level[] {
    return getCollectionItems<LevelItem>(this.cfg().levels, "levels")
      .map((l) => ({
        name: resolveText(l.name),
        value: String(l.option_value ?? "").trim() || resolveText(l.name),
        badge: resolveText(l.badge),
        idealFor: resolveText(l.ideal_for),
        specs: [resolveText(l.spec_1), resolveText(l.spec_2)].filter(Boolean),
        warmth: Math.min(Math.max(Math.round(Number(l.warmth) || 0), 0), 5),
        image: String(l.image || ""),
      }))
      .filter((l) => l.name)
      .slice(0, 3);
  }

  private cities(): City[] {
    const own = getCollectionItems<{ name: unknown; night: unknown }>(this.cfg().cities, "cities")
      .map((c) => ({ name: { ar: resolveText(c.name), en: resolveText(c.name) }, night: Number(c.night) }))
      .filter((c) => c.name.ar && Number.isFinite(c.night));
    return own.length ? own : CITIES;
  }

  /** The card that shows first: the one the merchant marked, else the middle one. */
  private current(levels: Level[]): number {
    if (this.chosen >= 0 && this.chosen < levels.length) return this.chosen;
    const marked = levels.findIndex((l) => l.badge);
    return marked >= 0 ? marked : Math.floor((levels.length - 1) / 2);
  }

  private pickCity(index: number, levels: Level[]) {
    this.city = index;
    const city = this.cities()[index];
    if (!city) return;
    const cfg = this.cfg();
    const level = levelFor(city.night, Number(cfg.heavy_at ?? 6), Number(cfg.light_at ?? 14));
    // With fewer than three cards, the warmest card stands for heavy and the first for light
    this.chosen = Math.min(level - 1, levels.length - 1);
  }

  private renderCity(levels: Level[]) {
    const cfg = this.cfg();
    if (cfg.show_city === false || levels.length < 2) return nothing;
    const cities = this.cities();
    const city = cities[this.city];
    const id = `mf-wg-city-${this.styleId}`;
    const en = getLocale() === "en";
    return html`<div class="mf-wg__city">
      <label for=${id}>${resolveText(cfg.city_label) || t({ ar: "في أي مدينة أنت؟", en: "Which city are you in?" })}</label>
      <select id=${id} @change=${(e: Event) => this.pickCity(Number((e.target as HTMLSelectElement).value), levels)}>
        <option value="-1">${t({ ar: "اختر مدينتك", en: "Choose your city" })}</option>
        ${cities.map((c, i) => html`<option value=${i} ?selected=${i === this.city}>${en ? c.name.en : c.name.ar}</option>`)}
      </select>
      ${city
        ? html`<p class="mf-wg__advice" aria-live="polite">${t({ ar: `ليالي الشتاء في ${city.name.ar} تصل إلى حوالي ${city.night}°، وننصحك بـ`, en: `Winter nights in ${city.name.en} reach about ${city.night}°C, so we suggest ` })}<b>${levels[this.current(levels)]?.name}</b></p>`
        : nothing}
    </div>`;
  }

  render() {
    const levels = this.levels();
    if (!levels.length) {
      if (isLandingPage()) return nothing;
      return this.frame(html`<p class="mf-empty">${t({ ar: "أضف درجات الدفء من إعدادات هذا القسم", en: "Add the warmth levels in this section's settings" })}</p>`);
    }
    const current = this.current(levels);
    const p = this.product;
    const preset = p ? pickByValue(p, levels[current].value) : {};
    const price = p ? Number(p.sale_price || p.price) || 0 : 0;
    return this.frame(html`
      ${this.renderCity(levels)}
      <ul class="mf-wg__grid" style=${`--mf-wg-n:${levels.length}`}>
        ${levels.map((l, i) => html`<li><button type="button" class="mf-wg__card" aria-pressed=${i === current ? "true" : "false"} @click=${() => (this.chosen = i)}>
          ${l.image ? html`<img src=${l.image} alt="" loading="lazy" />` : nothing}
          ${l.badge ? html`<span class="mf-wg__badge">${l.badge}</span>` : nothing}
          <span class="mf-wg__body">
            <span class="mf-wg__name">${l.name}</span>
            ${l.warmth
              ? html`<span class="mf-wg__dots" role="img" aria-label=${t({ ar: `الدفا ${l.warmth} من 5`, en: `Warmth ${l.warmth} of 5` })}>${[1, 2, 3, 4, 5].map((n) => html`<i class=${n <= l.warmth ? "on" : ""}></i>`)}</span>`
              : nothing}
            ${l.idealFor ? html`<span class="mf-wg__ideal">${l.idealFor}</span>` : nothing}
            ${l.specs.length ? html`<ul class="mf-wg__specs">${l.specs.map((s) => html`<li>${s}</li>`)}</ul>` : nothing}
          </span>
        </button></li>`)}
      </ul>
      ${p
        ? html`<div class="mf-wg__buy" data-card=${String(p.id)}>
            ${this.renderPickers(p, preset)}
            ${price ? html`<span class="mf-wg__price">${unsafeHTML(money(price))}</span>` : nothing}
            ${this.renderBuy(p, resolveText(this.cfg().buy_text) || t({ ar: `أضف ${levels[current].name} للسلة`, en: `Add ${levels[current].name} to cart` }), { options: preset })}
          </div>`
        : nothing}`, { extraClass: "mf-wg" });
  }
}
