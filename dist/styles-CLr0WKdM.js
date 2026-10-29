function U(t) {
  return t ? t.component && typeof t.component == "object" ? t.component : t : {};
}
function v() {
  var t, e, n;
  return ((n = (e = (t = window.Salla) == null ? void 0 : t.lang) == null ? void 0 : e.getLocale) == null ? void 0 : n.call(e)) || document.documentElement.lang || "ar";
}
function G() {
  return (document.documentElement.dir || (v() === "ar" ? "rtl" : "ltr")) === "rtl";
}
function Q(t) {
  if (t == null || t === "") return "";
  if (typeof t == "string") return t;
  if (typeof t == "object") {
    const e = t, n = v() === "en" ? "en" : "ar";
    return e[n] || e[n === "en" ? "ar" : "en"] || "";
  }
  return String(t);
}
function X(t) {
  return v() === "ar" ? t.ar : t.en;
}
function V(t) {
  var e;
  return Array.isArray(t) ? ((e = t[0]) == null ? void 0 : e.value) ?? t[0] ?? "" : t && typeof t == "object" && "value" in t ? t.value : t ?? "";
}
function Z(t, e) {
  return Array.isArray(t) ? t.map((n) => {
    if (!n || typeof n != "object") return {};
    const o = {};
    for (const [r, c] of Object.entries(n))
      o[r.startsWith(`${e}.`) ? r.slice(e.length + 1) : r] = c;
    return o;
  }) : [];
}
function tt(t) {
  return String(t ?? "").trim().replace(/^#+/, "").trim();
}
function et(t) {
  const e = String(t ?? "").trim();
  return e ? /^(https?:|mailto:|tel:)/i.test(e) ? e : /^[a-z][a-z0-9+.-]*:/i.test(e) ? "" : /^[\w-]+(\.[\w-]+)+/.test(e) ? `https://${e}` : "" : "";
}
function h() {
  return window.Salla;
}
function $() {
  var t, e;
  return ((e = (t = h()) == null ? void 0 : t.config) == null ? void 0 : e.get("theme.settings")) || {};
}
function E() {
  var t, e;
  return ((e = (t = h()) == null ? void 0 : t.config) == null ? void 0 : e.get("page.is_landing_page")) === !0;
}
function M() {
  var e;
  const t = $().page_for_product;
  return typeof t == "boolean" || t === void 0 || t === null ? t === !1 ? "promotion" : "product" : typeof t == "string" ? t === "promotion" ? "promotion" : "product" : Array.isArray(t) && ((e = t[0]) == null ? void 0 : e.value) === "promotion" ? "promotion" : "product";
}
function R() {
  var e, n;
  if (!E() || M() !== "product") return null;
  const t = (n = (e = $().product) == null ? void 0 : e.value) == null ? void 0 : n[0];
  return t ? String(t) : null;
}
function nt() {
  const t = $();
  return { text: String(t.main_btn_text || ""), url: String(t.main_btn_url || "") };
}
const P = "1616473", _ = ["images", "rating", "sold_quantity", "options"];
async function k(t, e) {
  var n;
  try {
    const o = _.map((i) => `with[]=${i}`).join("&"), c = await (await fetch(`https://api.salla.dev/store/v1/products/${t}/details?${o}`, {
      headers: { "store-identifier": e, "accept-language": document.documentElement.lang === "en" ? "en" : "ar" }
    })).json();
    return (n = c == null ? void 0 : c.data) != null && n.id ? c.data : null;
  } catch {
    return null;
  }
}
async function rt(t) {
  var o, r, c, i;
  const e = h();
  if (!t) return null;
  await ((o = e == null ? void 0 : e.onReady) == null ? void 0 : o.call(e));
  const n = String(((r = e == null ? void 0 : e.config) == null ? void 0 : r.get("store.id")) || "");
  if (E()) {
    if (String(t) !== R()) return n ? k(t, n) : null;
    try {
      const f = await ((c = e == null ? void 0 : e.product) == null ? void 0 : c.api.getDetails(t, _));
      return (i = f == null ? void 0 : f.data) != null && i.id ? f.data : null;
    } catch {
      return null;
    }
  }
  return n && await k(t, n) || k(t, P);
}
function ot() {
  const t = document.querySelector(".s-block--fast-checkout"), e = t == null ? void 0 : t.getAttribute("data-layout");
  if (window.innerWidth < 1024 || e === "side-drawer" || !t) {
    window.dispatchEvent(new CustomEvent("open-checkout-drawer"));
    return;
  }
  t.scrollIntoView({ behavior: "smooth", block: "center" });
}
function L(t, e = 20) {
  if (t <= 1) return;
  const n = document.querySelector(
    ".s-block--fast-checkout salla-quantity-input, .s-block--fast-checkout-main salla-quantity-input"
  );
  if (n != null && n.setValue) {
    n.setValue(t);
    return;
  }
  e > 0 && window.setTimeout(() => L(t, e - 1), 100);
}
function ct(t) {
  const e = h();
  return e != null && e.money ? e.money(t) : String(t);
}
const N = ["bg", "card", "title", "text", "accent"], S = "#111111", a = "#ffffff", A = 4.5;
function p(t) {
  if (typeof t != "string") return null;
  const e = t.trim().replace(/^#/, "");
  if (!/^([0-9a-f]{3}|[0-9a-f]{6})$/i.test(e)) return null;
  const n = e.length === 3 ? e.replace(/./g, (o) => o + o) : e;
  return [0, 2, 4].map((o) => parseInt(n.slice(o, o + 2), 16));
}
function j([t, e, n]) {
  return "#" + [t, e, n].map((o) => Math.round(o).toString(16).padStart(2, "0")).join("");
}
function y(t) {
  const e = p(t);
  return e ? j(e) : null;
}
function T(t) {
  const [e, n, o] = t.map((r) => {
    const c = r / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * e + 0.7152 * n + 0.0722 * o;
}
function u(t, e) {
  const n = p(t), o = p(e);
  if (!n || !o) return 1;
  const [r, c] = [T(n), T(o)].sort((i, f) => f - i);
  return (r + 0.05) / (c + 0.05);
}
function d(t) {
  const e = u(S, t) >= u(a, t) ? S : a;
  return u(e, t) >= A ? e : "#000000";
}
function l(t, e, n) {
  const o = p(t), r = p(e);
  return j(o.map((c, i) => c + (r[i] - c) * n));
}
function s(t, e, n, o = A) {
  let r = t;
  for (let c = 0; c < 20 && e.some((i) => u(r, i) < o); c++)
    r = l(r, n, 0.05 * (c + 1));
  return e.every((c) => u(r, c) >= o) ? r : n;
}
const g = "#000000", B = (t) => t === "light" ? g : a;
function b(t, e) {
  return {
    ...t,
    accentText: d(t.accent),
    accentInk: s(t.accent, [t.bg, t.card], B(e))
  };
}
const m = {
  light: b({ bg: "#ffffff", card: "#f7f4f0", title: "#1a1714", text: "#4a4440", accent: "#8a5a2b" }, "light"),
  dark: b({ bg: "#141210", card: "#1f1b18", title: "#f5efe8", text: "#c9bfb4", accent: "#d9a46a" }, "dark")
};
function q(t) {
  const e = y(t);
  if (!e) return structuredClone(m);
  const n = l(e, a, 0.94), o = l(e, a, 0.88), r = l(e, "#000000", 0.88), c = l(e, "#000000", 0.8);
  return {
    light: b({
      bg: n,
      card: o,
      title: s(l(e, "#000000", 0.8), [n, o], "#000000"),
      text: s(l(e, "#000000", 0.65), [n, o], "#000000"),
      accent: e
    }, "light"),
    dark: b({
      bg: r,
      card: c,
      title: s(l(e, a, 0.92), [r, c], a),
      text: s(l(e, a, 0.75), [r, c], a),
      // An accent that disappears into the dark background is lifted until it stands out
      accent: s(e, [r], a, 3)
    }, "dark")
  };
}
const D = (t) => t === "accentText" ? "accent-text" : t === "accentInk" ? "accent-ink" : t;
function O(t, e) {
  const n = {};
  for (const o of ["l", "d"]) {
    const r = {};
    for (const i of N) {
      const f = y(t[`${o}_${i}`]);
      f && (r[i] = f);
    }
    const c = o === "l" ? "light" : "dark";
    if (r.bg) {
      const i = d(r.bg);
      r.card ?? (r.card = l(r.bg, i, 0.08)), r.title ?? (r.title = s(i, [r.bg, r.card], i === a ? a : g)), r.text ?? (r.text = s(i, [r.bg, r.card], i === a ? a : g));
    }
    if (r.accent) {
      r["accent-text"] = d(r.accent);
      const i = [r.bg || m[c].bg, r.card || m[c].card];
      r["accent-ink"] = s(r.accent, i, d(i[0]) === a ? a : g);
    }
    for (const [i, f] of Object.entries(r)) n[`${e}${o}-${i}`] = f;
  }
  return n;
}
function it(t) {
  const e = {};
  if (y(t.brand_color)) {
    const n = q(t.brand_color);
    for (const [o, r] of [["light", "l"], ["dark", "d"]])
      for (const [c, i] of Object.entries(n[o])) e[`--mf-${r}-${D(c)}`] = i;
  }
  return { ...e, ...O(t, "--mf-") };
}
function K(t) {
  const e = y(t);
  if (!e) return {};
  const n = {};
  let o = e;
  return u(e, m.dark.bg) < 3 && (o = s(e, [m.dark.bg], a, 3), n["--mf-d-accent"] = o, n["--mf-d-accent-text"] = d(o)), n["--mf-l-accent-ink"] = s(e, [m.light.bg, m.light.card], g), n["--mf-d-accent-ink"] = s(o, [m.dark.bg, m.dark.card], a), n;
}
function at(t) {
  return Object.entries(O(t, "--mf-s-")).map(([e, n]) => `${e}:${n}`).join(";");
}
function st(t) {
  const e = String(V(t.color_scheme) || "auto");
  return e === "dark" ? "mf-dark" : e === "light" ? "" : "mf-auto";
}
const z = "mf-mode";
let w = null;
function ft(t) {
  if (w) return w;
  try {
    const e = JSON.parse(localStorage.getItem(z) || "null");
    if (((e == null ? void 0 : e.mode) === "light" || (e == null ? void 0 : e.mode) === "dark") && e.base === t) return e.mode;
  } catch {
  }
  return null;
}
function lt(t, e, n) {
  var o;
  return e && n ? n : t === "system" ? (o = window.matchMedia) != null && o.call(window, "(prefers-color-scheme: dark)").matches ? "dark" : "light" : t === "dark" ? "dark" : "light";
}
function mt(t, e) {
  w = t;
  try {
    localStorage.setItem(z, JSON.stringify({ mode: t, base: e }));
  } catch {
  }
}
function ut(t) {
  var r;
  if (typeof IntersectionObserver > "u" || (r = window.matchMedia) != null && r.call(window, "(prefers-reduced-motion: reduce)").matches) return;
  t.classList.add("mf-reveal");
  const e = () => {
    t.classList.add("is-in"), n.disconnect(), window.clearTimeout(o);
  }, n = new IntersectionObserver(
    (c) => {
      c.some((i) => i.isIntersecting) && e();
    },
    { rootMargin: "0px 0px -10% 0px" }
  ), o = window.setTimeout(e, 2500);
  n.observe(t);
}
const W = `
.mf-reveal { transition: opacity .6s ease, transform .6s ease; }
.mf-reveal:not(.is-in) { opacity: 0; transform: translateY(16px); }
@media (prefers-reduced-motion: reduce) { .mf-reveal, .mf-reveal:not(.is-in) { opacity: 1; transform: none; transition: none; } }
`;
function F(t, e) {
  if (document.getElementById(t)) return;
  const n = document.createElement("style");
  n.id = t, n.textContent = e, document.head.appendChild(n);
}
const H = ["bg", "card", "title", "text", "accent", "accent-text", "accent-ink"], C = (t, e) => m[t][e === "accent-text" ? "accentText" : e === "accent-ink" ? "accentInk" : e], Y = {
  accent: "--color-primary",
  "accent-text": "--color-primary-reverse"
}, x = (t) => H.map((e) => {
  const n = t === "l" ? "light" : "dark", o = Y[e], r = o ? `var(${o}, ${C(n, e)})` : C(n, e);
  return `--mf-${e}: var(--mf-s-${t}-${e}, var(--mf-${t}-${e}, ${r}));`;
}).join(" "), J = `
.mf-host { display: block; width: 100%; min-width: 0; container-type: inline-size; }
[data-mf-section] { scroll-margin-top: var(--mf-hd-h, 0px); }
/* The last block keeps clear of the sticky buy bar while it shows */
.mf-ft { padding-bottom: calc(1.25rem + var(--mf-sb-h, 0px)) !important; }
.component-card:has(> .mf-host:not(:empty)) { min-height: 0; }
.mf-block { ${x("l")}
  display: block; width: 100%; box-sizing: border-box; font-family: var(--font-main, inherit);
  color: var(--mf-text); background: var(--mf-bg); }
.mf-block.mf-dark, html.mf-mode-dark .mf-block.mf-auto { ${x("d")} }
@media (prefers-color-scheme: dark) { html:not(.mf-mode-light) .mf-block.mf-auto { ${x("d")} } }
html.mf-mode-ready .mf-block { transition: background-color .3s ease, color .3s ease; }
.mf-block *, .mf-block *::before, .mf-block *::after { box-sizing: border-box; }
.mf-block img, .mf-block video { display: block; max-width: 100%; }
.mf-block h2, .mf-block h3, .mf-block p, .mf-block ul { margin: 0; padding: 0; }
.mf-block ul { list-style: none; }
.mf-container { width: 100%; max-width: 1200px; margin-inline: auto; padding-inline: 1rem; }
.mf-section { padding-block: 2.5rem; }
@container (min-width: 768px) { .mf-section { padding-block: 4rem; } }
.mf-title { text-align: center; margin-bottom: 1.75rem; }
.mf-title h2 { font-size: 1.75rem; line-height: 1.3; font-weight: 700; color: var(--mf-title); }
.mf-title p { margin-top: .5rem; font-size: 1rem; line-height: 1.7; color: var(--mf-text); }
@container (min-width: 768px) { .mf-title h2 { font-size: 2.25rem; } }
.mf-btn { display: inline-flex; align-items: center; justify-content: center; gap: .5rem; min-height: 2.75rem;
  padding: .75rem 1.75rem; border: 1px solid transparent; border-radius: var(--mf-radius, .625rem);
  background: var(--mf-accent); color: var(--mf-accent-text); font: inherit; font-weight: 700; font-size: 1rem;
  line-height: 1.2; text-decoration: none; cursor: pointer; transition: transform .2s ease, opacity .2s ease; }
.mf-btn:hover { transform: translateY(-1px); opacity: .92; }
.mf-btn:focus-visible { outline: 2px solid var(--mf-accent-ink); outline-offset: 3px; }
.mf-btn[disabled], .mf-btn[aria-busy="true"] { opacity: .6; cursor: progress; transform: none; }
.mf-empty { padding: 2rem; border: 1px dashed color-mix(in srgb, var(--mf-text) 35%, transparent); border-radius: 1rem; text-align: center; }
.mf-visually-hidden { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
.mf-error { margin-top: .5rem; color: #b42318; font-size: .875rem; }
.mf-block.mf-dark .mf-error, html.mf-mode-dark .mf-auto .mf-error { color: #fda29b; }
@media (prefers-color-scheme: dark) { html:not(.mf-mode-light) .mf-auto .mf-error { color: #fda29b; } }
@media (prefers-reduced-motion: reduce) { .mf-btn, html.mf-mode-ready .mf-block { transition: none; } .mf-btn:hover { transform: none; } }
${W}
`;
let I = !1;
function dt() {
  if (F("mf-base", J), I) return;
  I = !0;
  const t = document.documentElement;
  if (t.style.getPropertyValue("--mf-d-accent")) return;
  const e = getComputedStyle(t).getPropertyValue("--color-primary").trim();
  for (const [n, o] of Object.entries(K(e))) t.style.setProperty(n, o);
}
export {
  L as A,
  v as a,
  tt as b,
  F as c,
  U as d,
  dt as e,
  rt as f,
  Z as g,
  at as h,
  E as i,
  h as j,
  lt as k,
  ft as l,
  ct as m,
  mt as n,
  R as o,
  it as p,
  nt as q,
  Q as r,
  st as s,
  X as t,
  V as u,
  G as v,
  et as w,
  ut as x,
  M as y,
  ot as z
};
