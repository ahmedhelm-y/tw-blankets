import { nothing as l, html as a } from "lit";
import { state as u } from "lit/decorators.js";
import { unsafeHTML as h } from "lit/directives/unsafe-html.js";
import { q as f } from "./bedding-BSPlFaov.js";
import { g as _, r as m, f as b, t as o, m as q, i as z, u as v } from "./styles-CLr0WKdM.js";
import { D as $ } from "./deals-C4JoRaDK.js";
var x = Object.defineProperty, p = (d, e, t, s) => {
  for (var r = void 0, i = d.length - 1, n; i >= 0; i--)
    (n = d[i]) && (r = n(e, t, r) || r);
  return r && x(e, t, r), r;
};
const y = `
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
`, w = (d) => {
  const e = Number(v(d));
  return e >= 1 && e <= 3 ? e - 1 : 0;
};
class c extends $ {
  constructor() {
    super(...arguments), this.styleId = "bed-quiz", this.step = -1, this.votes = [], this.product = null;
  }
  styles() {
    return y;
  }
  questions() {
    return _(this.cfg().questions, "questions").map((e) => ({
      q: m(e.q),
      answers: [[e.a1, e.a1_to], [e.a2, e.a2_to], [e.a3, e.a3_to]].map(([t, s]) => ({ text: m(t), to: w(s) })).filter((t) => t.text)
    })).filter((e) => e.q && e.answers.length >= 2).slice(0, 4);
  }
  results() {
    const e = this.cfg();
    return [1, 2, 3].map((t) => {
      const s = e[`r${t}_product`], r = Array.isArray(s) ? s[0] : s;
      return {
        title: m(e[`r${t}_title`]),
        text: m(e[`r${t}_text`]),
        image: String(e[`r${t}_image`] || ""),
        productId: String((r && typeof r == "object" ? r.value ?? r.id : r) ?? "")
      };
    });
  }
  async answer(e, t) {
    var i;
    const s = [...this.votes.slice(0, this.step), e];
    if (this.votes = s, this.step + 1 < t) {
      this.step++;
      return;
    }
    this.step = t;
    const r = this.results()[f(s)];
    this.product = r.productId ? await b(r.productId) : null, await this.updateComplete, (i = this.querySelector(".mf-qz__result")) == null || i.focus();
  }
  restart() {
    this.step = 0, this.votes = [], this.product = null;
  }
  renderResult() {
    var r, i, n;
    const e = this.results()[f(this.votes)], t = this.product, s = ((i = (r = t == null ? void 0 : t.images) == null ? void 0 : r[0]) == null ? void 0 : i.url) || ((n = t == null ? void 0 : t.image) == null ? void 0 : n.url);
    return a`<div class="mf-qz__result" tabindex="-1" aria-live="polite">
      <span class="mf-qz__label">${o({ ar: "الأنسب لك", en: "Your match" })}</span>
      <p class="mf-qz__lead">${e.title || (t == null ? void 0 : t.name) || ""}</p>
      ${e.text ? a`<p>${e.text}</p>` : l}
      ${t ? a`<div class="mf-qz__product">${s ? a`<img src=${s} alt="" loading="lazy" />` : l}
            <span><b>${t.name}</b>${h(q(Number(t.sale_price || t.price) || 0))}</span></div>
          <div class="mf-qz__buy" data-card=${String(t.id)}>${this.renderPickers(t)}${this.renderBuy(t)}</div>` : l}
      <button type="button" class="mf-qz__again" @click=${() => this.restart()}>${o({ ar: "أعد الاختبار", en: "Take it again" })}</button>
    </div>`;
  }
  render() {
    const e = this.cfg(), t = this.questions();
    if (!t.length)
      return z() ? l : this.frame(a`<p class="mf-empty">${o({ ar: "أضف أسئلة الاختبار ونتائجه من إعدادات هذا القسم", en: "Add the quiz questions and results in this section's settings" })}</p>`);
    const s = this.step >= t.length && this.results()[f(this.votes)].image || String(e.image || "");
    let r;
    if (this.step < 0)
      r = a`<p class="mf-qz__lead">${m(e.intro) || o({ ar: "محتار أي مفرش يناسبك؟ جاوب على 3 أسئلة ونقترح عليك", en: "Not sure which one suits you? Answer 3 questions" })}</p>
        <button type="button" class="mf-btn" style="align-self:flex-start" @click=${() => this.step = 0}>${m(e.start_text) || o({ ar: "ابدأ الاختبار", en: "Start the quiz" })}</button>`;
    else if (this.step < t.length) {
      const i = t[this.step];
      r = a`<div class="mf-qz__bar" aria-hidden="true">${t.map((n, g) => a`<i class=${g <= this.step ? "on" : ""}></i>`)}</div>
        <span class="mf-qz__step">${o({ ar: `سؤال ${this.step + 1} من ${t.length}`, en: `Question ${this.step + 1} of ${t.length}` })}</span>
        <p class="mf-qz__lead" id=${`mf-qz-q-${this.step}`}>${i.q}</p>
        <ul class="mf-qz__answers" role="group" aria-labelledby=${`mf-qz-q-${this.step}`}>
          ${i.answers.map((n) => a`<li><button type="button" class="mf-qz__answer" @click=${() => this.answer(n.to, t.length)}>${n.text}</button></li>`)}
        </ul>
        ${this.step > 0 ? a`<button type="button" class="mf-qz__back" @click=${() => this.step--}>${o({ ar: "السؤال السابق", en: "Previous question" })}</button>` : l}`;
    } else
      r = this.renderResult();
    return this.frame(a`<div class=${`mf-qz__box${s ? " has-image" : ""}`}>
      ${s ? a`<img class="mf-qz__image" src=${s} alt="" loading="lazy" />` : l}
      <div class="mf-qz__pane">${r}</div>
    </div>`, { extraClass: "mf-qz" });
  }
}
p([
  u()
], c.prototype, "step");
p([
  u()
], c.prototype, "votes");
p([
  u()
], c.prototype, "product");
typeof c < "u" && c.registerSallaComponent("salla-bed-quiz");
export {
  c as default
};
