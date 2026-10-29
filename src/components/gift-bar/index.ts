import { html, nothing } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { cartState } from "../../utils/cart";
import { getCollectionItems, resolveText, t } from "../../utils/config";
import { ensureDrawer, publishTiers } from "../../utils/drawer";
import { isLandingPage, money } from "../../utils/landing";
import { tierProgress, type Tier } from "../../utils/price";
import { MfSection } from "../../utils/section";

type TierItem = { amount: unknown; reward: unknown; image: unknown };

const css = `
.mf-gb__steps { display: grid; grid-template-columns: repeat(var(--mf-gb-n, 3), minmax(0, 1fr)); gap: .75rem; padding: 0; margin: 0; list-style: none; }
@container (max-width: 560px) { .mf-gb__steps { grid-template-columns: minmax(0, 1fr); } }
.mf-gb__step { display: grid; grid-template-columns: auto minmax(0, 1fr); gap: .875rem; align-items: center; padding: .875rem 1rem; border-radius: 1.125rem; background: var(--mf-card); }
.mf-gb__step img, .mf-gb__icon { width: 3.5rem; height: 3.5rem; border-radius: .875rem; object-fit: cover; }
.mf-gb__icon { display: grid; place-items: center; background: color-mix(in srgb, var(--mf-accent) 16%, var(--mf-bg)); font-size: 1.5rem; }
.mf-gb__step b { display: block; font-size: 1.0625rem; font-weight: 900; color: var(--mf-title); line-height: 1.4; }
.mf-gb__step span { font-size: .875rem; }
.mf-gb__step.is-on { background: var(--mf-accent); }
.mf-gb__step.is-on b, .mf-gb__step.is-on span { color: var(--mf-accent-text); }
.mf-gb__track { height: .625rem; margin-top: 1.25rem; border-radius: 999px; background: color-mix(in srgb, var(--mf-text) 15%, transparent); overflow: hidden; }
.mf-gb__fill { height: 100%; border-radius: 999px; background: var(--mf-accent); transition: width .5s ease; }
.mf-gb__msg { margin: .75rem 0 0; text-align: center; font-weight: 800; color: var(--mf-title); }
.mf-gb__wrap { display: flex; align-items: center; justify-content: center; gap: .5rem; margin: 1rem 0 0; text-align: center; font-weight: 700; }
@media (prefers-reduced-motion: reduce) { .mf-gb__fill { transition: none; } }
`;

export default class GiftBar extends MfSection {
  protected readonly styleId = "gift-bar";
  private onCart = () => this.requestUpdate();

  protected styles() {
    return css;
  }

  connectedCallback() {
    super.connectedCallback();
    // The side cart reads the cart once for the page; this bar follows its total
    ensureDrawer();
    window.addEventListener("mf:cart-state", this.onCart);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("mf:cart-state", this.onCart);
  }

  render() {
    const cfg = this.cfg();
    const items = getCollectionItems<TierItem>(cfg.tiers, "tiers")
      .map((x) => ({ amount: Number(x.amount) || 0, reward: resolveText(x.reward), image: String(x.image || "") }))
      .filter((x) => x.amount > 0 && x.reward)
      .sort((a, b) => a.amount - b.amount)
      .slice(0, 3);
    const tiers: Tier[] = items.map(({ amount, reward }) => ({ amount, reward }));
    publishTiers(tiers);
    if (!tiers.length) {
      if (isLandingPage()) return nothing;
      return this.frame(html`<p class="mf-empty">${t({ ar: "أضف المبالغ والهدايا من إعدادات هذا القسم", en: "Add the amounts and gifts in this section's settings" })}</p>`);
    }
    const cart = cartState();
    const progress = cart.count ? tierProgress(cart.total, tiers) : null;
    const wrap = resolveText(cfg.wrap_text);
    return this.frame(html`
      <ol class="mf-gb__steps" style=${`--mf-gb-n:${items.length}`}>
        ${items.map((x, i) => html`<li class=${`mf-gb__step${progress && i < progress.reached ? " is-on" : ""}`}>
          ${x.image ? html`<img src=${x.image} alt="" loading="lazy" />` : html`<span class="mf-gb__icon" aria-hidden="true">🎁</span>`}
          <div><b>${x.reward}</b><span>${t({ ar: "عند الشراء بـ", en: "When you spend" })} ${unsafeHTML(money(x.amount))}</span></div></li>`)}
      </ol>
      ${progress
        ? html`<div class="mf-gb__track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow=${progress.percent}>
            <div class="mf-gb__fill" style=${`width:${progress.percent}%`}></div></div>
          <p class="mf-gb__msg" aria-live="polite">${progress.next
            ? html`${t({ ar: "باقي", en: "Only" })} ${unsafeHTML(money(progress.left))} ${t({ ar: `وتحصل على ${progress.next.reward}`, en: `more for ${progress.next.reward}` })}`
            : t({ ar: "مبروك، طلبك وصل لأعلى هدية 🎉", en: "Your order reached the top gift" })}</p>`
        : nothing}
      ${wrap ? html`<p class="mf-gb__wrap"><span aria-hidden="true">🎀</span>${wrap}</p>` : nothing}`, { extraClass: "mf-gb" });
  }
}
