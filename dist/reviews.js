import { html as s, nothing as l } from "lit";
import { state as u } from "lit/decorators.js";
import { g as y, r as d, t as m } from "./styles-CLr0WKdM.js";
import { M as w } from "./section-DQASqLF9.js";
const g = 0.2;
function $(n) {
  const e = n.map(Number).filter((r) => Number.isInteger(r) && r >= 1 && r <= 5), t = [5, 4, 3, 2, 1].map((r) => e.filter((i) => i === r).length);
  return { average: e.length ? Math.round(e.reduce((r, i) => r + i, 0) / e.length * 10) / 10 : 0, count: e.length, dist: t };
}
function k(n) {
  if (!Number.isFinite(n) || n < 0) return "0:00";
  const e = Math.floor(n);
  return `${Math.floor(e / 60)}:${String(e % 60).padStart(2, "0")}`;
}
function x(n, e) {
  let t = 2166136261;
  for (let r = 0; r < n.length; r++) t = Math.imul(t ^ n.charCodeAt(r), 16777619);
  const a = [];
  for (let r = 0; r < e; r++) {
    t = Math.imul(t ^ t >>> 15, 2246822507) ^ Math.imul(t ^ t >>> 13, 3266489909);
    const i = (t >>> 0) % 1e3 / 1e3, c = 0.55 + 0.45 * Math.sin(r / e * Math.PI);
    a.push(Math.round((g + (1 - g) * i * c) * 100) / 100);
  }
  return a;
}
function M(n, e) {
  const t = Math.max(1, Math.floor(n.length / e)), a = [];
  for (let i = 0; i < e; i++) {
    let c = 0;
    for (let o = i * t; o < Math.min((i + 1) * t, n.length); o++) c = Math.max(c, Math.abs(n[o]));
    a.push(c);
  }
  const r = Math.max(...a);
  return r ? a.map((i) => Math.max(g, Math.round(i / r * 100) / 100)) : a.map(() => g);
}
function S(n) {
  return [...new Set(String(n ?? "").split(/[,،\n]/).map((e) => e.trim()).filter(Boolean))].slice(0, 4);
}
let h = null;
class q {
  constructor(e) {
    this.audio = e, this.state = { playing: !1, time: 0, duration: 0, rate: 1, error: !1 }, this.listeners = [];
    const t = () => this.set({ playing: !e.paused, time: e.currentTime || 0, duration: Number.isFinite(e.duration) ? e.duration : 0 });
    this.events = [
      ["play", t],
      ["pause", t],
      ["timeupdate", t],
      ["loadedmetadata", t],
      ["ended", () => this.set({ playing: !1, time: 0 })],
      ["error", () => this.set({ playing: !1, error: !0 })]
    ];
    for (const [a, r] of this.events) e.addEventListener(a, r);
  }
  onState(e) {
    this.listeners.push(e);
  }
  set(e) {
    this.state = { ...this.state, ...e }, this.listeners.forEach((t) => t(this.state));
  }
  async play() {
    h && h !== this && h.pause(), h = this;
    try {
      await this.audio.play(), this.set({ playing: !0, error: !1 });
    } catch {
      this.set({ playing: !1, error: !0 });
    }
  }
  pause() {
    this.audio.pause(), this.set({ playing: !1 }), h === this && (h = null);
  }
  toggle() {
    return this.state.playing ? this.pause() : this.play();
  }
  seek(e) {
    const t = Number.isFinite(this.audio.duration) ? this.audio.duration : 0;
    t && (this.audio.currentTime = Math.min(Math.max(e, 0), 1) * t, this.set({ time: this.audio.currentTime }));
  }
  setRate(e) {
    this.audio.playbackRate = e, this.set({ rate: e });
  }
  destroy() {
    h === this && this.pause();
    for (const [e, t] of this.events) this.audio.removeEventListener(e, t);
    this.listeners = [];
  }
}
async function C(n, e) {
  var t;
  try {
    const a = window.AudioContext || window.webkitAudioContext;
    if (!a) throw new Error("no audio context");
    const r = await fetch(n, { mode: "cors" });
    if (!r.ok) throw new Error(String(r.status));
    const i = await r.arrayBuffer(), c = new a();
    try {
      const o = await c.decodeAudioData(i);
      return M(o.getChannelData(0), e);
    } finally {
      (t = c.close) == null || t.call(c);
    }
  } catch {
    return x(n, e);
  }
}
var z = Object.defineProperty, v = (n, e, t, a) => {
  for (var r = void 0, i = n.length - 1, c; i >= 0; i--)
    (c = n[i]) && (r = c(e, t, r) || r);
  return r && z(e, t, r), r;
};
const _ = 40;
let A = 0;
const b = [1, 1.5, 2], P = `
.mf-rv__summary { display: grid; gap: 1.25rem; margin-bottom: 2rem; padding: 1.5rem; border-radius: 1.5rem; background: var(--mf-card); }
@container (min-width: 768px) { .mf-rv__summary { grid-template-columns: auto 1fr; gap: 2.5rem; align-items: center; } }
.mf-rv__score { display: flex; flex-direction: column; align-items: center; gap: .25rem; }
.mf-rv__avg { font-size: 3rem; font-weight: 800; line-height: 1; color: var(--mf-title); }
.mf-rv__count { font-size: .875rem; color: var(--mf-text); }
.mf-rv__dist { display: grid; gap: .375rem; min-width: 12rem; }
.mf-rv__distrow { display: grid; grid-template-columns: 1.25rem 1fr 2rem; align-items: center; gap: .5rem; font-size: .8125rem; color: var(--mf-text); }
.mf-rv__distbar { height: .375rem; border-radius: 999px; background: color-mix(in srgb, var(--mf-text) 15%, transparent); overflow: hidden; }
.mf-rv__distbar span { display: block; height: 100%; border-radius: inherit; background: var(--mf-accent); }
.mf-rv__said { margin: 0 0 .875rem; line-height: 1.8; color: var(--mf-title); }
.mf-rv__qs { display: flex; flex-wrap: wrap; gap: .5rem; }
.mf-rv__q { min-height: 2.5rem; padding: .375rem 1rem; border: 1px solid color-mix(in srgb, var(--mf-text) 25%, transparent); border-radius: 999px; background: var(--mf-bg);
  color: var(--mf-title); font: inherit; font-size: .875rem; font-weight: 600; cursor: pointer; }
.mf-rv__q[aria-expanded="true"] { border-color: var(--mf-accent-ink); background: var(--mf-accent); color: var(--mf-accent-text); }
.mf-rv__answer { margin: .875rem 0 0; padding: .875rem 1rem; border-radius: .875rem; background: var(--mf-bg); line-height: 1.8; color: var(--mf-title); }
  background: color-mix(in srgb, var(--mf-text) 15%, transparent); }
  transform: translate(50%, -50%); }
[dir="ltr"] .mf-rv__filters { display: flex; flex-wrap: wrap; gap: .5rem; margin-bottom: 1.25rem; }
.mf-rv__filter { min-height: 2.75rem; padding: 0 1rem; border: 1.5px solid color-mix(in srgb, var(--mf-text) 25%, transparent); border-radius: 999px;
  background: var(--mf-bg); color: var(--mf-title); font: inherit; font-weight: 700; font-size: .875rem; cursor: pointer; }
.mf-rv__filter[aria-pressed="true"] { border-color: var(--mf-accent-ink); background: var(--mf-accent); color: var(--mf-accent-text); }
.mf-rv__filter:focus-visible { outline: 2px solid var(--mf-accent-ink); outline-offset: 2px; }
.mf-rv__body { display: flex; flex-wrap: wrap; gap: .375rem .5rem; }
.mf-rv__chip { padding: .125rem .625rem; border-radius: 999px; background: var(--mf-bg); font-size: .8125rem; color: var(--mf-text); }
.mf-rv__chip b { color: var(--mf-title); }
.mf-rv__none { padding: 1.5rem; text-align: center; }
.mf-rv__grid { display: grid; gap: 1rem; align-items: start; }
@container (min-width: 640px) { .mf-rv__grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@container (min-width: 1000px) { .mf-rv__grid { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
.mf-rv__card { display: flex; flex-direction: column; gap: .875rem; padding: 1.125rem; border-radius: 1.25rem; background: var(--mf-card); }
.mf-rv__head { display: flex; align-items: center; gap: .75rem; }
.mf-rv__avatar { width: 2.75rem; height: 2.75rem; flex: 0 0 auto; display: grid; place-items: center; border-radius: 999px; overflow: hidden; background: var(--mf-accent);
  color: var(--mf-accent-text); font-weight: 800; }
.mf-rv__avatar img { width: 100%; height: 100%; object-fit: cover; }
.mf-rv__who { display: flex; flex-direction: column; min-width: 0; flex: 1 1 auto; }
.mf-rv__name { font-weight: 800; color: var(--mf-title); }
.mf-rv__meta { font-size: .8125rem; color: var(--mf-text); }
.mf-rv__verified { color: var(--mf-accent-ink); font-weight: 700; }
.mf-rv__stars { color: #f5a524; letter-spacing: .05em; white-space: nowrap; }
.mf-rv__stars .off { color: color-mix(in srgb, var(--mf-text) 30%, transparent); }
.mf-rv__place { align-self: flex-start; padding: .25rem .75rem; border-radius: 999px; background: var(--mf-bg); font-size: .8125rem; font-weight: 700; color: var(--mf-title); }
.mf-rv__voice { display: flex; align-items: center; gap: .625rem; padding: .5rem .625rem; border-radius: 999px; background: var(--mf-bg); }
.mf-rv__play { width: 2.75rem; height: 2.75rem; flex: 0 0 auto; display: grid; place-items: center; border: 0; border-radius: 999px; background: var(--mf-accent);
  color: var(--mf-accent-text); cursor: pointer; }
.mf-rv__play svg { width: 1.125rem; height: 1.125rem; }
.mf-rv__wave { display: flex; align-items: center; gap: 2px; height: 2rem; flex: 1 1 auto; min-width: 0; padding: 0; border: 0; background: none; cursor: pointer; direction: ltr; }
.mf-rv__wave span { flex: 1 1 0; min-width: 2px; border-radius: 2px; background: color-mix(in srgb, var(--mf-text) 35%, transparent); }
.mf-rv__wave span.is-done { background: var(--mf-accent); }
.mf-rv__time { font-size: .75rem; font-variant-numeric: tabular-nums; color: var(--mf-text); min-width: 2.25rem; text-align: center; }
.mf-rv__rate { min-width: 2.75rem; height: 2rem; padding: 0 .375rem; border: 1px solid color-mix(in srgb, var(--mf-text) 25%, transparent); border-radius: 999px;
  background: none; color: var(--mf-title); font: inherit; font-size: .75rem; font-weight: 800; cursor: pointer; }
.mf-rv__voice-error { font-size: .8125rem; color: #d92d20; }
.mf-rv__text { margin: 0; line-height: 1.8; color: var(--mf-title); white-space: pre-line; }
.mf-rv__text.is-clamped { display: -webkit-box; -webkit-line-clamp: 5; -webkit-box-orient: vertical; overflow: hidden; }
.mf-rv__more { align-self: flex-start; padding: 0; border: 0; background: none; color: var(--mf-accent-ink); font: inherit; font-size: .875rem; font-weight: 700; cursor: pointer; }
.mf-rv__photos { display: flex; gap: .5rem; }
.mf-rv__photos button { width: 4.5rem; height: 4.5rem; padding: 0; border: 0; border-radius: .75rem; overflow: hidden; cursor: zoom-in; }
.mf-rv__photos img { width: 100%; height: 100%; object-fit: cover; }
.mf-rv :is(button, a):focus-visible { outline: 2px solid var(--mf-accent-ink); outline-offset: 2px; }
.mf-rv__dialog { max-width: min(92vw, 56rem); max-height: 90vh; padding: 0; border: 0; border-radius: 1rem; background: transparent; }
.mf-rv__dialog::backdrop { background: rgb(0 0 0 / 80%); }
.mf-rv__dialog img { display: block; max-width: 100%; max-height: 90vh; border-radius: 1rem; }
.mf-rv__close { position: absolute; top: .5rem; inset-inline-end: .5rem; width: 2.75rem; height: 2.75rem; border: 0; border-radius: 999px; background: rgb(0 0 0 / 55%); color: #fff; font-size: 1.5rem; cursor: pointer; }
`, E = s`<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l11-6.5a1 1 0 0 0 0-1.72l-11-6.5A1 1 0 0 0 8 5.5Z" /></svg>`, R = s`<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>`;
function B(n) {
  return n.trim().split(/\s+/).slice(0, 2).map((e) => e[0]).join("").toUpperCase() || "؟";
}
function I(n) {
  const e = String(n || "").trim();
  return /^(https?:)?\/\//i.test(e) || e.startsWith("/") ? e : "";
}
class f extends w {
  constructor() {
    super(...arguments), this.styleId = "reviews", this.players = {}, this.peaks = {}, this.expanded = /* @__PURE__ */ new Set(), this.question = -1, this.photo = "", this.tried = /* @__PURE__ */ new Set(), this.topic = "", this.voice = /* @__PURE__ */ new Map(), this.answerId = `mf-rv-answer-${++A}`;
  }
  styles() {
    return P;
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), this.voice.forEach((t) => t.destroy()), this.voice.clear(), (e = this.observer) == null || e.disconnect(), this.observer = void 0, this.querySelectorAll("[data-watched]").forEach((t) => delete t.dataset.watched);
  }
  connectedCallback() {
    super.connectedCallback(), this.requestUpdate();
  }
  reviews() {
    return y(this.cfg().items, "items").map((e) => ({
      name: d(e.name),
      city: d(e.city),
      place: d(e.place),
      rate: Math.min(Math.max(Math.round(Number(e.rate) || 0), 0), 5),
      text: d(e.text),
      audio: I(e.audio_url),
      images: [e.image_1, e.image_2, e.image_3].map((t) => String(t || "")).filter(Boolean),
      avatar: String(e.avatar || ""),
      verified: e.verified !== !1,
      bought: d(e.bought),
      topics: S(d(e.topics))
    })).filter((e) => e.text || e.audio || e.images.length);
  }
  updated() {
    this.querySelectorAll("audio[data-i]").forEach((e) => {
      const t = Number(e.dataset.i);
      if (this.voice.has(t)) return;
      const a = new q(e);
      a.onState((r) => this.players = { ...this.players, [t]: r }), this.voice.set(t, a);
    }), !this.observer && typeof IntersectionObserver < "u" && (this.observer = new IntersectionObserver((e) => {
      for (const t of e) {
        if (!t.isIntersecting) continue;
        const a = t.target;
        this.observer.unobserve(a);
        const r = Number(a.dataset.i);
        C(a.dataset.src || "", _).then((i) => this.peaks = { ...this.peaks, [r]: i });
      }
    }, { rootMargin: "200px" })), this.querySelectorAll(".mf-rv__voice[data-src]:not([data-watched])").forEach((e) => {
      e.dataset.watched = "1", this.observer ? this.observer.observe(e) : this.peaks = { ...this.peaks, [Number(e.dataset.i)]: x(e.dataset.src || "", _) };
    });
  }
  seek(e, t) {
    var r;
    if (e.detail === 0) return;
    const a = e.currentTarget.getBoundingClientRect();
    (r = this.voice.get(t)) == null || r.seek((e.clientX - a.left) / a.width);
  }
  seekKey(e, t) {
    var i;
    const a = e.key === "ArrowRight" ? 0.1 : e.key === "ArrowLeft" ? -0.1 : 0;
    if (!a) return;
    e.preventDefault();
    const r = this.players[t];
    r != null && r.duration && ((i = this.voice.get(t)) == null || i.seek(r.time / r.duration + a));
  }
  play(e) {
    var t;
    this.tried = new Set(this.tried).add(e), (t = this.voice.get(e)) == null || t.toggle();
  }
  renderVoice(e, t) {
    const a = this.players[t] || { playing: !1, time: 0, duration: 0, rate: 1, error: !1 }, r = this.peaks[t] || x(e.audio, _), i = a.duration ? a.time / a.duration : 0, c = b[(b.indexOf(a.rate) + 1) % b.length];
    return s`<div class="mf-rv__voice" data-i=${t} data-src=${e.audio}>
        <audio data-i=${t} src=${e.audio} preload="metadata"></audio>
        <button type="button" class="mf-rv__play" aria-label=${a.playing ? m({ ar: "إيقاف", en: "Pause" }) : m({ ar: `تشغيل رأي ${e.name}`, en: `Play ${e.name}'s review` })}
          @click=${() => this.play(t)}>${a.playing ? R : E}</button>
        <button type="button" class="mf-rv__wave" aria-label=${m({ ar: "انتقل في التسجيل بالأسهم", en: "Seek in the recording with the arrow keys" })}
          @click=${(o) => this.seek(o, t)} @keydown=${(o) => this.seekKey(o, t)}>
          ${r.map((o, p) => s`<span class=${p / r.length < i ? "is-done" : ""} style=${`height:${Math.round(o * 100)}%`}></span>`)}
        </button>
        <span class="mf-rv__time">${k(a.playing || a.time ? a.time : a.duration)}</span>
        <button type="button" class="mf-rv__rate" aria-label=${m({ ar: "سرعة التشغيل", en: "Playback speed" })} @click=${() => {
      var o;
      return (o = this.voice.get(t)) == null ? void 0 : o.setRate(c);
    }}>${a.rate}x</button>
      </div>
      ${a.error && this.tried.has(t) ? s`<span class="mf-rv__voice-error" role="alert">${m({ ar: "تعذّر تشغيل التسجيل", en: "The recording could not be played" })}</span>` : l}`;
  }
  renderCard(e, t) {
    const a = e.text.length > 220, r = this.expanded.has(t);
    return s`<li class="mf-rv__card">
      <div class="mf-rv__head">
        <span class="mf-rv__avatar" aria-hidden="true">${e.avatar ? s`<img src=${e.avatar} alt="" loading="lazy" />` : B(e.name)}</span>
        <span class="mf-rv__who">
          <span class="mf-rv__name">${e.name}</span>
          <span class="mf-rv__meta">${e.city}${e.city && e.verified ? " · " : ""}${e.verified ? s`<span class="mf-rv__verified">${m({ ar: "عميل مؤكد", en: "Verified buyer" })}</span>` : l}</span>
        </span>
        ${e.rate ? s`<span class="mf-rv__stars" role="img" aria-label=${`${e.rate}/5`}>${[1, 2, 3, 4, 5].map((i) => s`<span class=${i <= e.rate ? "" : "off"}>★</span>`)}</span>` : l}
      </div>
      ${e.place ? s`<span class="mf-rv__place">${e.place}</span>` : l}
      ${e.bought || e.topics.length ? s`<div class="mf-rv__body">
            ${e.bought ? s`<span class="mf-rv__chip">${m({ ar: "اشترى", en: "Bought" })} <b>${e.bought}</b></span>` : l}
            ${e.topics.map((i) => s`<span class="mf-rv__chip">${i}</span>`)}
          </div>` : l}
      ${e.audio ? this.renderVoice(e, t) : l}
      ${e.text ? s`<p class=${`mf-rv__text${a && !r ? " is-clamped" : ""}`}>${e.text}</p>` : l}
      ${a ? s`<button type="button" class="mf-rv__more" aria-expanded=${r ? "true" : "false"} @click=${() => {
      const i = new Set(this.expanded);
      r ? i.delete(t) : i.add(t), this.expanded = i;
    }}>${r ? m({ ar: "عرض أقل", en: "Show less" }) : m({ ar: "اقرأ المزيد", en: "Read more" })}</button>` : l}
      ${e.images.length ? s`<div class="mf-rv__photos">${e.images.map((i) => s`<button type="button" aria-label=${m({ ar: "تكبير الصورة", en: "Enlarge photo" })}
            @click=${() => this.openPhoto(i)}><img src=${i} alt="" loading="lazy" /></button>`)}</div>` : l}
    </li>`;
  }
  async openPhoto(e) {
    var t, a;
    this.photo = e, await this.updateComplete, (a = (t = this.querySelector(".mf-rv__dialog")) == null ? void 0 : t.showModal) == null || a.call(t);
  }
  closePhoto() {
    var e, t;
    (t = (e = this.querySelector(".mf-rv__dialog")) == null ? void 0 : e.close) == null || t.call(e), this.photo = "";
  }
  renderSummary(e) {
    const t = this.cfg();
    if (t.show_summary === !1) return l;
    const a = $(e.map((o) => o.rate).filter(Boolean)), r = d(t.summary_text), i = y(t.questions, "questions").map((o) => ({ q: d(o.q), a: d(o.a) })).filter((o) => o.q && o.a);
    if (!a.count && !r && !i.length) return l;
    const c = Math.max(1, ...a.dist);
    return s`<div class="mf-rv__summary">
      ${a.count ? s`<div class="mf-rv__score">
            <span class="mf-rv__avg">${a.average.toFixed(1)}</span>
            <span class="mf-rv__stars" role="img" aria-label=${`${a.average}/5`}>${[1, 2, 3, 4, 5].map((o) => s`<span class=${o <= Math.round(a.average) ? "" : "off"}>★</span>`)}</span>
            <span class="mf-rv__count">${m({ ar: `${a.count} تقييم`, en: `${a.count} reviews` })}</span>
            <div class="mf-rv__dist">${a.dist.map((o, p) => s`<div class="mf-rv__distrow"><span>${5 - p}</span>
              <span class="mf-rv__distbar"><span style=${`width:${o / c * 100}%`}></span></span><span>${o}</span></div>`)}</div>
          </div>` : l}
      <div>
        ${r ? s`<p class="mf-rv__said">${r}</p>` : l}
        ${i.length ? s`<div class="mf-rv__qs">${i.map((o, p) => s`<button type="button" class="mf-rv__q" aria-expanded=${this.question === p ? "true" : "false"}
              aria-controls=${this.answerId} @click=${() => this.question = this.question === p ? -1 : p}>${o.q}</button>`)}</div>
            ${this.question >= 0 && i[this.question] ? s`<p class="mf-rv__answer" id=${this.answerId} aria-live="polite">${i[this.question].a}</p>` : l}` : l}
      </div>
    </div>`;
  }
  renderFilters(e) {
    const t = /* @__PURE__ */ new Map();
    for (const r of e) for (const i of r.topics) t.set(i, (t.get(i) || 0) + 1);
    if (t.size < 2) return l;
    const a = [...t.entries()].sort((r, i) => i[1] - r[1]).slice(0, 6);
    return s`<div class="mf-rv__filters" role="group" aria-label=${m({ ar: "التقييمات حسب الموضوع", en: "Reviews by topic" })}>
      <button type="button" class="mf-rv__filter" aria-pressed=${this.topic === "" ? "true" : "false"} @click=${() => this.topic = ""}>${m({ ar: "الكل", en: "All" })}</button>
      ${a.map(([r, i]) => s`<button type="button" class="mf-rv__filter" aria-pressed=${this.topic === r ? "true" : "false"} @click=${() => this.topic = r}>${r} (${i})</button>`)}
    </div>`;
  }
  render() {
    const e = this.reviews(), t = this.renderSummary(e);
    if (!e.length && t === l) return l;
    const a = e.map((r, i) => [r, i]).filter(([r]) => !this.topic || r.topics.includes(this.topic));
    return this.frame(s`${t}
      ${e.length ? this.renderFilters(e) : l}
      ${e.length ? a.length ? s`<ul class="mf-rv__grid">${a.map(([r, i]) => this.renderCard(r, i))}</ul>` : s`<p class="mf-rv__none">${m({ ar: "لا توجد تقييمات عن هذا الموضوع بعد", en: "No reviews on this topic yet" })}</p>` : l}
      ${this.photo ? s`<dialog class="mf-rv__dialog" @close=${() => this.photo = ""} @click=${(r) => {
      r.target === r.currentTarget && this.closePhoto();
    }}>
            <img src=${this.photo} alt="" /><button type="button" class="mf-rv__close" aria-label=${m({ ar: "إغلاق", en: "Close" })} @click=${() => this.closePhoto()}>×</button>
          </dialog>` : l}`, { extraClass: "mf-rv" });
  }
}
v([
  u()
], f.prototype, "players");
v([
  u()
], f.prototype, "peaks");
v([
  u()
], f.prototype, "expanded");
v([
  u()
], f.prototype, "question");
v([
  u()
], f.prototype, "photo");
v([
  u()
], f.prototype, "tried");
v([
  u()
], f.prototype, "topic");
typeof f < "u" && f.registerSallaComponent("salla-reviews");
export {
  f as default
};
