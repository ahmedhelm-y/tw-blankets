import { render as X, nothing as b, html as m } from "lit";
import { unsafeHTML as A } from "lit/directives/unsafe-html.js";
import { e as k, c as H } from "./buy-ycNLmR2K.js";
import { i as z, j, f as K, t as d, e as U, c as F, v as G, m as S } from "./styles-CLr0WKdM.js";
import { o as J } from "./fit-DtvCUWqS.js";
function Q(e) {
  var n;
  return (((n = e.product) == null ? void 0 : n.options) || []).filter((i) => (i == null ? void 0 : i.required) && (i.details || []).length && !e.options[String(i.id)]).map((i) => Number(i.id));
}
function _e(e, t = 0) {
  var a;
  const n = {}, i = e.filter((r) => r.selected);
  for (const r of i) {
    const s = Q(r);
    s.length && (n[String((a = r.product) == null ? void 0 : a.id)] = s);
  }
  return { ok: i.length >= t && Object.keys(n).length === 0, missing: n };
}
const O = (e) => Number((e == null ? void 0 : e.sale_price) || (e == null ? void 0 : e.price)) || 0;
function q(e) {
  var n;
  let t = 0;
  for (const i of ((n = e.product) == null ? void 0 : n.options) || []) {
    const a = e.options[String(i.id)], r = (i.details || []).find((s) => Number(s.id) === Number(a));
    t += Number(r == null ? void 0 : r.additional_price) || 0;
  }
  return t;
}
function be(e) {
  return !((e == null ? void 0 : e.status) === "out" || (e == null ? void 0 : e.is_available) === !1 || (e == null ? void 0 : e.is_out_of_stock) === !0);
}
function he(e) {
  const t = e.filter((n) => n.selected);
  return {
    total: t.reduce((n, i) => n + (O(i.product) + q(i)) * i.quantity, 0),
    regular: t.reduce((n, i) => {
      var a;
      return n + (Math.max(Number((a = i.product) == null ? void 0 : a.regular_price) || 0, O(i.product)) + q(i)) * i.quantity;
    }, 0),
    count: t.length
  };
}
function ye(e) {
  return e.filter((t) => t.selected).map((t) => {
    var n, i;
    return {
      id: String((n = t.product) == null ? void 0 : n.id),
      quantity: t.quantity,
      options: Object.keys(t.options).length ? t.options : void 0,
      max: Number((i = t.product) == null ? void 0 : i.max_quantity) || void 0
    };
  });
}
const o = { lines: [], count: 0, total: 0, justAdded: "", demo: !1 }, v = /* @__PURE__ */ new Map();
let V = 0;
function T() {
  return o;
}
function x() {
  window.dispatchEvent(new CustomEvent("mf:cart-state", { detail: o })), window.dispatchEvent(new Event("mf:cart"));
}
function E() {
  o.count = o.lines.reduce((e, t) => e + t.quantity, 0);
}
function W(e, t = {}, n = "ar") {
  return ((e == null ? void 0 : e.options) || []).map((i) => {
    const a = (i.details || []).find((r) => Number(r.id) === Number(t[String(i.id)]));
    return a ? `${J(i, n)}: ${a.name}` : "";
  }).filter(Boolean).join(" · ");
}
function L(e) {
  var r;
  const t = ((r = e == null ? void 0 : e.data) == null ? void 0 : r.cart) || (e == null ? void 0 : e.data);
  if (!t || typeof t != "object") return null;
  const n = Array.isArray(t.items) ? t.items : null, i = t.sub_total ?? t.total, a = Number(typeof i == "object" ? i == null ? void 0 : i.amount : i);
  return !n && !Number.isFinite(a) ? null : { items: n, total: Number.isFinite(a) ? a : null };
}
function Z(e, t, n) {
  const i = [...e], a = [];
  for (const r of t) {
    const s = String(r.product_id);
    let l = i.findIndex(($) => $.itemId === r.id);
    l < 0 && (l = i.findIndex(($) => $.itemId === null && $.productId === s));
    const c = l >= 0 ? i.splice(l, 1)[0] : null, p = Math.max(1, Number(r.quantity) || 1), g = Number(r.total) > 0 ? Math.round(Number(r.total) / p * 100) / 100 : Number(r.price ?? r.product_price ?? (c == null ? void 0 : c.unit) ?? 0), f = n.get(s);
    a.push({
      key: (c == null ? void 0 : c.key) || `c${r.id}`,
      itemId: r.id,
      productId: s,
      name: (c == null ? void 0 : c.name) || (f == null ? void 0 : f.name) || "",
      image: (c == null ? void 0 : c.image) || (f == null ? void 0 : f.image) || "",
      detail: (c == null ? void 0 : c.detail) || (f == null ? void 0 : f.detail) || "",
      unit: g,
      quantity: p
    });
  }
  return a;
}
async function ee() {
  const e = [...new Set(o.lines.filter((t) => !t.name).map((t) => t.productId))];
  e.length && (await Promise.all(
    e.map(async (t) => {
      var i, a, r;
      const n = await K(t);
      n && v.set(t, { name: String(n.name || ""), image: String(((a = (i = n.images) == null ? void 0 : i[0]) == null ? void 0 : a.url) || ((r = n.image) == null ? void 0 : r.url) || "") });
    })
  ), o.lines = o.lines.map((t) => {
    var n, i;
    return t.name ? t : { ...t, name: ((n = v.get(t.productId)) == null ? void 0 : n.name) || d({ ar: "منتج", en: "Product" }), image: ((i = v.get(t.productId)) == null ? void 0 : i.image) || "" };
  }), x());
}
const te = (e) => Math.round(e * 100) / 100, C = () => te(o.lines.reduce((e, t) => e + t.unit * t.quantity, 0));
function M(e) {
  const t = L(e);
  return t != null && t.items && (o.lines = Z(o.lines, t.items, v)), E(), o.total = (t == null ? void 0 : t.total) ?? C(), x(), ee(), !!(t != null && t.items);
}
async function ne() {
  var t, n, i, a;
  if (!z()) {
    o.demo = !0;
    return;
  }
  const e = j();
  try {
    if (await ((t = e == null ? void 0 : e.onReady) == null ? void 0 : t.call(e)), typeof ((i = (n = e == null ? void 0 : e.cart) == null ? void 0 : n.api) == null ? void 0 : i.details) != "function") return;
    const r = await e.cart.api.details();
    (a = L(r)) != null && a.items && M(r);
  } catch {
  }
}
const ie = 15e3;
function Y(e, t) {
  const n = e.map(({ product: i, options: a = {}, quantity: r = 1 }) => {
    var p, g, f;
    const s = String(i.id), l = { name: String(i.name || ""), image: String(((g = (p = i.images) == null ? void 0 : p[0]) == null ? void 0 : g.url) || ((f = i.image) == null ? void 0 : f.url) || ""), detail: W(i, a, t) };
    v.set(s, l);
    const c = (Number(i.sale_price || i.price) || 0) + q({ product: i, options: a });
    return { key: `p${++V}`, itemId: null, productId: s, ...l, unit: c, quantity: Math.max(1, r) };
  });
  return o.justAdded = n.map((i) => i.name).filter(Boolean).join("، "), n;
}
function B(e) {
  o.demo = !0, o.lines = [...o.lines, ...e], E(), o.total = C(), x();
}
async function ve(e, t = {}, n = 1, i = "ar") {
  var l, c;
  const a = Y([{ product: e, options: t, quantity: n }], i);
  if (!z()) return B(a);
  const r = (c = (l = j()) == null ? void 0 : l.cart) == null ? void 0 : c.api;
  if (!(r != null && r.addItem)) throw new Error(k(null));
  o.lines = [...o.lines, ...a];
  let s;
  try {
    s = await Promise.race([
      r.addItem({ id: e.id, quantity: n, options: Object.keys(t).length ? t : void 0 }),
      new Promise((p, g) => window.setTimeout(() => g(new Error(k(null))), ie))
    ]);
  } catch (p) {
    throw o.lines = o.lines.filter((g) => !a.includes(g)), o.justAdded = "", new Error(k(p));
  }
  M(s) || await P();
}
async function we(e, t = "ar") {
  const n = Y(e, t);
  if (!z()) return B(n);
  o.lines = [...o.lines, ...n], await P();
}
async function P() {
  var e, t;
  try {
    const n = (t = (e = j()) == null ? void 0 : e.cart) == null ? void 0 : t.api;
    if (typeof (n == null ? void 0 : n.details) == "function" && M(await n.details())) return;
  } catch {
  }
  E(), x();
}
function D(e) {
  return o.demo || e.itemId !== null;
}
async function re(e) {
  var r, s, l;
  const t = o.lines.find((c) => c.key === e);
  if (!t || !D(t)) return;
  const n = () => {
    o.lines = o.lines.filter((c) => c.key !== e), E();
  };
  if (o.demo) {
    n(), o.total = C(), x();
    return;
  }
  const i = (s = (r = j()) == null ? void 0 : r.cart) == null ? void 0 : s.api;
  if (!(i != null && i.deleteItem)) throw new Error(k(null));
  const a = await i.deleteItem(t.itemId);
  if ((l = L(a)) != null && l.items) return void M(a);
  n(), await P();
}
function ae(e, t) {
  const n = t.filter((s) => s.amount > 0 && s.reward).sort((s, l) => s.amount - l.amount), i = n.filter((s) => e >= s.amount).length, a = n[i] || null, r = n.length ? n[n.length - 1].amount : 0;
  return {
    reached: i,
    next: a,
    left: a ? Math.max(0, Math.round((a.amount - e) * 100) / 100) : 0,
    percent: r ? Math.min(100, Math.round(e / r * 100)) : 0
  };
}
function xe(e) {
  const t = Number(e == null ? void 0 : e.regular_price) || 0, n = Number((e == null ? void 0 : e.sale_price) || (e == null ? void 0 : e.price)) || 0;
  return t > n && n > 0 ? Math.round((t - n) / t * 100) : 0;
}
const oe = `
.mf-cd { position: fixed; inset: 0; z-index: 60; pointer-events: none; background: transparent; }
.mf-cd__fab { position: fixed; inset-inline-start: max(1rem, env(safe-area-inset-left, 0px)); bottom: calc(1rem + var(--mf-sb-h, 0px) + env(safe-area-inset-bottom, 0px));
  display: inline-flex; align-items: center; gap: .5rem; min-height: 3.25rem; padding: 0 1.125rem; border: 0; border-radius: 999px; pointer-events: auto;
  background: var(--mf-title); color: var(--mf-bg); font: inherit; font-weight: 800; box-shadow: 0 12px 30px -10px rgb(0 0 0 / 45%); cursor: pointer; }
.mf-cd__fab b { min-width: 1.5rem; height: 1.5rem; display: grid; place-items: center; padding: 0 .375rem; border-radius: 999px; background: var(--mf-accent); color: var(--mf-accent-text); font-size: .8125rem; }
.mf-cd__fab:focus-visible { outline: 3px solid var(--mf-accent-ink); outline-offset: 3px; }
.mf-cd__shade { position: fixed; inset: 0; background: rgb(0 0 0 / 45%); opacity: 0; transition: opacity .25s ease; }
.mf-cd.is-open .mf-cd__shade { opacity: 1; pointer-events: auto; }
.mf-cd__panel { position: fixed; top: 0; bottom: 0; inset-inline-end: 0; width: min(26rem, 100vw); display: flex; flex-direction: column; background: var(--mf-bg); color: var(--mf-text);
  box-shadow: 0 0 40px rgb(0 0 0 / 25%); transform: translateX(105%); transition: transform .3s ease, visibility .3s; pointer-events: auto; visibility: hidden; outline: none; }
.mf-cd.is-rtl .mf-cd__panel { transform: translateX(-105%); }
.mf-cd.is-open .mf-cd__panel, .mf-cd.is-rtl.is-open .mf-cd__panel { transform: none; visibility: visible; transition: transform .3s ease, visibility 0s; }
.mf-cd__head { display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding: 1rem 1.125rem; border-bottom: 1px solid color-mix(in srgb, var(--mf-text) 12%, transparent); }
.mf-cd__head h2 { margin: 0; font-size: 1.125rem; font-weight: 900; color: var(--mf-title); }
.mf-cd__x { width: 2.75rem; height: 2.75rem; border: 0; border-radius: 999px; background: var(--mf-card); color: var(--mf-title); font-size: 1.5rem; cursor: pointer; }
.mf-cd .mf-cd__added { margin: .75rem 1.125rem 0; padding: .625rem .875rem; border-radius: .75rem; background: color-mix(in srgb, #12b76a 14%, var(--mf-bg)); color: #067647; font-weight: 700; font-size: .875rem; }
html.mf-mode-dark .mf-cd__added { color: #6ce9a6; }
.mf-cd .mf-cd__list { flex: 1 1 auto; overflow-y: auto; display: grid; align-content: start; gap: .75rem; margin: 0; padding: 1rem 1.125rem; list-style: none; }
.mf-cd__line { display: grid; grid-template-columns: 4rem minmax(0, 1fr) auto; gap: .75rem; align-items: center; }
.mf-cd__line img, .mf-cd__ph { width: 4rem; height: 4rem; border-radius: .75rem; object-fit: cover; background: var(--mf-card); }
.mf-cd__name { display: block; font-weight: 700; color: var(--mf-title); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.mf-cd__meta { display: block; font-size: .8125rem; }
.mf-cd__del { width: 2.75rem; height: 2.75rem; border: 0; border-radius: .625rem; background: none; color: var(--mf-text); cursor: pointer; font-size: 1.125rem; }
.mf-cd__del:hover { background: var(--mf-card); color: #d92d20; }
.mf-cd .mf-cd__empty { padding: 2rem 1rem; text-align: center; }
.mf-cd__foot { display: grid; gap: .75rem; padding: 1rem 1.125rem calc(1rem + env(safe-area-inset-bottom, 0px)); border-top: 1px solid color-mix(in srgb, var(--mf-text) 12%, transparent); }
.mf-cd__tier { display: grid; gap: .375rem; font-size: .875rem; font-weight: 700; color: var(--mf-title); }
.mf-cd__track { height: .5rem; border-radius: 999px; background: color-mix(in srgb, var(--mf-text) 15%, transparent); overflow: hidden; }
.mf-cd__track span { display: block; height: 100%; background: var(--mf-accent); }
.mf-cd__total { display: flex; justify-content: space-between; font-size: 1.125rem; font-weight: 900; color: var(--mf-title); }
.mf-cd .mf-cd__note { margin: 0; font-size: .8125rem; text-align: center; }
.mf-cd__ghost { background: transparent; color: var(--mf-title); border-color: color-mix(in srgb, var(--mf-text) 30%, transparent); }
@media (prefers-reduced-motion: reduce) { .mf-cd__panel, .mf-cd__shade { transition: none; } }
`;
let u = null, w = !1, N = !1, y = "", h = null;
function $e(e) {
  window.__mfTiers = e;
}
function R() {
  return window.__mfTiers || [];
}
function I() {
  var e;
  w = !1, T().justAdded = "", _(), (e = h == null ? void 0 : h.focus) == null || e.call(h);
}
function se() {
  var e;
  me(), h = document.activeElement, w = !0, _(), (e = u == null ? void 0 : u.querySelector(".mf-cd__panel")) == null || e.focus({ preventScroll: !0 });
}
async function ce() {
  if (N || T().demo) return;
  N = !0, y = "", _();
  const e = await H();
  N = !1, e || (y = d({ ar: "تعذر فتح صفحة الدفع، حاول مرة أخرى", en: "Could not open checkout, please try again" })), _();
}
async function de(e) {
  y = "";
  try {
    await re(e);
  } catch {
    y = d({ ar: "تعذر حذف المنتج، حاول مرة أخرى", en: "Could not remove the item, please try again" }), _();
  }
}
function _() {
  if (!u) return;
  const e = T(), t = R().length ? ae(e.total, R()) : null;
  X(m`
    <div class="mf-cd__shade" @click=${I}></div>
    ${e.count && !w ? m`<button type="button" class="mf-cd__fab" aria-label=${d({ ar: `السلة، ${e.count} قطع`, en: `Cart, ${e.count} items` })} @click=${se}>
          🛍️ ${d({ ar: "سلتك", en: "Your cart" })} <b>${e.count}</b></button>` : b}
    <aside class="mf-cd__panel" role="dialog" aria-modal="false" aria-label=${d({ ar: "سلتك", en: "Your cart" })} tabindex="-1">
      <div class="mf-cd__head"><h2>${d({ ar: "سلتك", en: "Your cart" })} (${e.count})</h2>
        <button type="button" class="mf-cd__x" aria-label=${d({ ar: "إغلاق", en: "Close" })} @click=${I}>×</button></div>
      ${e.justAdded ? m`<p class="mf-cd__added" role="status">✓ ${d({ ar: `أُضيف للسلة: ${e.justAdded}`, en: `Added: ${e.justAdded}` })}</p>` : b}
      ${e.lines.length ? m`<ul class="mf-cd__list">${e.lines.map((n) => m`<li class="mf-cd__line">
            ${n.image ? m`<img src=${n.image} alt="" loading="lazy" />` : m`<span class="mf-cd__ph"></span>`}
            <span><span class="mf-cd__name">${n.name}</span>${n.detail ? m`<span class="mf-cd__meta">${n.detail}</span>` : b}
              <span class="mf-cd__meta">${n.quantity} × ${A(S(n.unit))}</span></span>
            ${D(n) ? m`<button type="button" class="mf-cd__del" aria-label=${d({ ar: `احذف ${n.name}`, en: `Remove ${n.name}` })} @click=${() => de(n.key)}>🗑</button>` : m`<span></span>`}
          </li>`)}</ul>` : m`<p class="mf-cd__empty">${d({ ar: "سلتك فاضية، اختر من المنتجات", en: "Your cart is empty, pick a product" })}</p>`}
      <div class="mf-cd__foot">
        ${t && e.lines.length ? m`<div class="mf-cd__tier">${t.next ? m`<span>${d({ ar: "باقي", en: "Only" })} ${A(S(t.left))} ${d({ ar: `وتحصل على ${t.next.reward}`, en: `more for ${t.next.reward}` })}</span>` : m`<span>${d({ ar: "وصلت لأعلى مستوى 🎉", en: "You reached the top tier" })}</span>`}
              <div class="mf-cd__track"><span style=${`width:${t.percent}%`}></span></div></div>` : b}
        <div class="mf-cd__total"><span>${d({ ar: "الإجمالي", en: "Total" })}</span><span>${A(S(e.total))}</span></div>
        <button type="button" class="mf-btn" aria-busy=${N ? "true" : "false"} ?disabled=${!e.lines.length || e.demo} @click=${ce}>${d({ ar: "إتمام الطلب", en: "Complete the order" })}</button>
        ${e.demo ? m`<p class="mf-cd__note">${d({ ar: "دي معاينة: الدفع بيشتغل في صفحة الهبوط في متجرك", en: "Preview only: checkout works on your store's landing page" })}</p>` : b}
        <button type="button" class="mf-btn mf-cd__ghost" @click=${I}>${d({ ar: "كمّل التسوّق", en: "Keep shopping" })}</button>
        ${y ? m`<p class="mf-error" role="alert">${y}</p>` : b}
      </div>
    </aside>`, u), u.classList.toggle("is-open", w);
}
function me() {
  u || (U(), F("mf-cart-drawer", oe), u = document.createElement("div"), u.className = `mf-cd mf-block mf-auto${G() ? " is-rtl" : ""}`, document.body.appendChild(u), window.addEventListener("mf:cart-state", () => _()), document.addEventListener("keydown", (e) => {
    w && e.key === "Escape" && I();
  }), _(), ne());
}
export {
  ae as a,
  he as b,
  T as c,
  ve as d,
  me as e,
  xe as f,
  be as i,
  we as n,
  se as o,
  $e as p,
  ye as t,
  _e as v
};
