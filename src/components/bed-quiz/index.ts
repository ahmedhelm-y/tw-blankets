import { html, nothing } from "lit";
import { state } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { quizResult } from "../../utils/bedding";
import { getCollectionItems, resolveText, t, unwrapValue } from "../../utils/config";
import { DealSection } from "../../utils/deals";
import { fetchProduct, isLandingPage, money } from "../../utils/landing";

type QuestionItem = { q: unknown; a1: unknown; a1_to: unknown; a2: unknown; a2_to: unknown; a3: unknown; a3_to: unknown };
type Question = { q: string; answers: { text: string; to: number }[] };
type Result = { title: string; text: string; image: string; productId: string };

const css = `
.mf-qz__box { display: grid; overflow: hidden; border-radius: 1.5rem; background: var(--mf-card); }
@container (min-width: 820px) { .mf-qz__box.has-image { grid-template-columns: 5fr 6fr; } }
.mf-qz__image { width: 100%; height: 100%; min-height: 14rem; max-height: 30rem; object-fit: cover; }
.mf-qz__pane { display: flex; flex-direction: column; justify-content: center; gap: 1rem; padding: 1.75rem 1.5rem; }
@container (min-width: 820px) { .mf-qz__pane { padding: 2.5rem; } }
.mf-qz__lead { margin: 0; font-size: 1.5rem; font-weight: 900; line-height: 1.4; color: var(--mf-title); }
.mf-qz__bar { display: flex; gap: .375rem; }
.mf-qz__bar i { flex: 1 1 0; height: .375rem; border-radius: 999px; background: color-mix(in srgb, var(--mf-text) 18%, transparent); }
.mf-qz__bar i.on { background: var(--mf-accent); }
.mf-qz__step { font-size: .875rem; font-weight: 700; }
.mf-qz__answers { display: grid; gap: .625rem; margin: 0; padding: 0; list-style: none; }
.mf-qz__answer { width: 100%; min-height: 3.25rem; padding: .75rem 1.125rem; border: 1.5px solid color-mix(in srgb, var(--mf-text) 22%, transparent); border-radius: 1rem;
  background: var(--mf-bg); color: var(--mf-title); font: inherit; font-weight: 700; text-align: start; cursor: pointer; transition: border-color .2s ease; }
.mf-qz__answer:hover { border-color: var(--mf-accent-ink); }
.mf-qz__answer:focus-visible { outline: 3px solid var(--mf-accent-ink); outline-offset: 2px; }
.mf-qz__back, .mf-qz__again { align-self: flex-start; min-height: 2.75rem; padding: 0; border: 0; background: none; color: var(--mf-title); font: inherit; font-weight: 700;
  text-decoration: underline; text-underline-offset: .25rem; cursor: pointer; }
.mf-qz__result { display: grid; gap: .75rem; }
.mf-qz__label { font-size: .875rem; font-weight: 800; color: var(--mf-accent-ink); }
.mf-qz__product { display: flex; align-items: center; gap: .875rem; padding: .75rem; border-radius: 1rem; background: var(--mf-bg); }
.mf-qz__product img { width: 4.5rem; height: 4.5rem; flex: 0 0 auto; border-radius: .75rem; object-fit: cover; }
.mf-qz__product span { display: grid; gap: .125rem; }
.mf-qz__product b { color: var(--mf-title); }
.mf-qz__buy { display: flex; flex-wrap: wrap; align-items: center; gap: .625rem; }
.mf-qz__buy select { min-height: 2.75rem; padding: 0 .75rem; border: 1px solid color-mix(in srgb, var(--mf-text) 25%, transparent); border-radius: .625rem;
  background: var(--mf-bg); color: var(--mf-title); font: inherit; }
.mf-qz__buy select[aria-invalid="true"] { border-color: #d92d20; }
`;

const to = (value: unknown) => {
  const n = Number(unwrapValue(value));
  return n >= 1 && n <= 3 ? n - 1 : 0;
};

export default class BedQuiz extends DealSection {
  protected readonly styleId = "bed-quiz";
  @state() private step = -1;
  @state() private votes: number[] = [];
  @state() private product: any = null;

  protected styles() {
    return css;
  }

  private questions(): Question[] {
    return getCollectionItems<QuestionItem>(this.cfg().questions, "questions")
      .map((q) => ({
        q: resolveText(q.q),
        answers: [[q.a1, q.a1_to], [q.a2, q.a2_to], [q.a3, q.a3_to]].map(([a, d]) => ({ text: resolveText(a), to: to(d) })).filter((a) => a.text),
      }))
      .filter((q) => q.q && q.answers.length >= 2)
      .slice(0, 4);
  }

  private results(): Result[] {
    const cfg = this.cfg();
    return [1, 2, 3].map((n) => {
      const value = cfg[`r${n}_product`];
      const first = Array.isArray(value) ? value[0] : value;
      return {
        title: resolveText(cfg[`r${n}_title`]),
        text: resolveText(cfg[`r${n}_text`]),
        image: String(cfg[`r${n}_image`] || ""),
        productId: String((first && typeof first === "object" ? first.value ?? first.id : first) ?? ""),
      };
    });
  }

  private async answer(to: number, total: number) {
    const votes = [...this.votes.slice(0, this.step), to];
    this.votes = votes;
    if (this.step + 1 < total) {
      this.step++;
      return;
    }
    this.step = total;
    const result = this.results()[quizResult(votes)];
    this.product = result.productId ? await fetchProduct(result.productId) : null;
    await this.updateComplete;
    this.querySelector<HTMLElement>(".mf-qz__result")?.focus();
  }

  private restart() {
    this.step = 0;
    this.votes = [];
    this.product = null;
  }

  private renderResult() {
    const result = this.results()[quizResult(this.votes)];
    const p = this.product;
    const image = p?.images?.[0]?.url || p?.image?.url;
    return html`<div class="mf-qz__result" tabindex="-1" aria-live="polite">
      <span class="mf-qz__label">${t({ ar: "الأنسب لك", en: "Your match" })}</span>
      <p class="mf-qz__lead">${result.title || p?.name || ""}</p>
      ${result.text ? html`<p>${result.text}</p>` : nothing}
      ${p
        ? html`<div class="mf-qz__product">${image ? html`<img src=${image} alt="" loading="lazy" />` : nothing}
            <span><b>${p.name}</b>${unsafeHTML(money(Number(p.sale_price || p.price) || 0))}</span></div>
          <div class="mf-qz__buy" data-card=${String(p.id)}>${this.renderPickers(p)}${this.renderBuy(p)}</div>`
        : nothing}
      <button type="button" class="mf-qz__again" @click=${() => this.restart()}>${t({ ar: "أعد الاختبار", en: "Take it again" })}</button>
    </div>`;
  }

  render() {
    const cfg = this.cfg();
    const questions = this.questions();
    if (!questions.length) {
      if (isLandingPage()) return nothing;
      return this.frame(html`<p class="mf-empty">${t({ ar: "أضف أسئلة الاختبار ونتائجه من إعدادات هذا القسم", en: "Add the quiz questions and results in this section's settings" })}</p>`);
    }
    const image = this.step >= questions.length ? this.results()[quizResult(this.votes)].image || String(cfg.image || "") : String(cfg.image || "");
    let pane;
    if (this.step < 0) {
      pane = html`<p class="mf-qz__lead">${resolveText(cfg.intro) || t({ ar: "محتار أي مفرش يناسبك؟ جاوب على 3 أسئلة ونقترح عليك", en: "Not sure which one suits you? Answer 3 questions" })}</p>
        <button type="button" class="mf-btn" style="align-self:flex-start" @click=${() => (this.step = 0)}>${resolveText(cfg.start_text) || t({ ar: "ابدأ الاختبار", en: "Start the quiz" })}</button>`;
    } else if (this.step < questions.length) {
      const q = questions[this.step];
      pane = html`<div class="mf-qz__bar" aria-hidden="true">${questions.map((_, i) => html`<i class=${i <= this.step ? "on" : ""}></i>`)}</div>
        <span class="mf-qz__step">${t({ ar: `سؤال ${this.step + 1} من ${questions.length}`, en: `Question ${this.step + 1} of ${questions.length}` })}</span>
        <p class="mf-qz__lead" id=${`mf-qz-q-${this.step}`}>${q.q}</p>
        <ul class="mf-qz__answers" role="group" aria-labelledby=${`mf-qz-q-${this.step}`}>
          ${q.answers.map((a) => html`<li><button type="button" class="mf-qz__answer" @click=${() => this.answer(a.to, questions.length)}>${a.text}</button></li>`)}
        </ul>
        ${this.step > 0 ? html`<button type="button" class="mf-qz__back" @click=${() => this.step--}>${t({ ar: "السؤال السابق", en: "Previous question" })}</button>` : nothing}`;
    } else {
      pane = this.renderResult();
    }
    return this.frame(html`<div class=${`mf-qz__box${image ? " has-image" : ""}`}>
      ${image ? html`<img class="mf-qz__image" src=${image} alt="" loading="lazy" />` : nothing}
      <div class="mf-qz__pane">${pane}</div>
    </div>`, { extraClass: "mf-qz" });
  }
}
