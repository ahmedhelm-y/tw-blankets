import { n as m, m as h } from "./fit-DtvCUWqS.js";
function o(a, e) {
  if (!String(e ?? "").trim()) return {};
  for (const n of (a == null ? void 0 : a.options) || []) {
    if (!((n == null ? void 0 : n.details) || []).length) continue;
    const r = h(n, e);
    if (r && !r.is_out) return { [String(n.id)]: Number(r.id) };
  }
  return {};
}
const s = [
  { name: { ar: "الرياض", en: "Riyadh" }, night: 9 },
  { name: { ar: "جدة", en: "Jeddah" }, night: 19 },
  { name: { ar: "مكة المكرمة", en: "Makkah" }, night: 18 },
  { name: { ar: "المدينة المنورة", en: "Madinah" }, night: 11 },
  { name: { ar: "الدمام والخبر", en: "Dammam and Khobar" }, night: 12 },
  { name: { ar: "الأحساء", en: "Al-Ahsa" }, night: 10 },
  { name: { ar: "القصيم", en: "Qassim" }, night: 6 },
  { name: { ar: "حائل", en: "Hail" }, night: 4 },
  { name: { ar: "تبوك", en: "Tabuk" }, night: 5 },
  { name: { ar: "الجوف وسكاكا", en: "Al-Jouf" }, night: 4 },
  { name: { ar: "عرعر", en: "Arar" }, night: 3 },
  { name: { ar: "القريات", en: "Qurayyat" }, night: 3 },
  { name: { ar: "الطائف", en: "Taif" }, night: 9 },
  { name: { ar: "أبها وخميس مشيط", en: "Abha" }, night: 7 },
  { name: { ar: "الباحة", en: "Al-Baha" }, night: 9 },
  { name: { ar: "نجران", en: "Najran" }, night: 8 },
  { name: { ar: "جازان", en: "Jazan" }, night: 22 }
];
function f(a, e = 6, n = 14) {
  return a <= e ? 3 : a >= n ? 1 : 2;
}
function g(a, e = 3) {
  const n = Array.from({ length: e }, () => 0);
  for (const t of a) t >= 0 && t < e && n[t]++;
  let r = 0;
  return n.forEach((t, i) => {
    t >= n[r] && (r = i);
  }), r;
}
function l(a) {
  return a.reduce((e, n) => e + Math.max(0, Math.round(Number(n.count) || 0)), 0);
}
function c(a) {
  const e = (m(a).match(/\d+(\.\d+)?/g) || []).map(Number).filter((t) => t > 0);
  if (e.length < 2) return null;
  const [n, r] = e;
  return { w: Math.min(n, r), l: Math.max(n, r) };
}
export {
  s as C,
  o as a,
  c as d,
  f as l,
  l as p,
  g as q
};
