const a = "٠١٢٣٤٥٦٧٨٩";
function t(n) {
  return String(n ?? "").replace(/[٠-٩]/g, (r) => String(a.indexOf(r))).replace(/\s+/g, "").toLowerCase();
}
const c = /اسود|أسود|ابيض|أبيض|بيج|بني|رمادي|كحلي|ازرق|أزرق|اخضر|أخضر|زيتي|عنابي|نبيتي|احمر|أحمر|وردي|زهري|فوشي|موف|بنفسجي|ليلكي|ذهبي|فضي|نود|كريمي|black|white|beige|brown|grey|gray|navy|blue|green|olive|maroon|burgundy|red|pink|fuchsia|purple|lilac|gold|silver|nude|cream/i, u = /^(\d{2}\s*-\s*)?(xxs|xs|s|m|l|xl|xxl|xxxl|\dxl)(\s*-\s*\d{2})?$|free\s*size|فري\s*سايز|مقاس\s*واحد/i;
function i(n) {
  const r = ((n == null ? void 0 : n.details) || []).map((e) => t(e == null ? void 0 : e.name));
  if (!r.length) return null;
  const s = (e) => r.filter(e).length / r.length;
  if ((n == null ? void 0 : n.type) === "color" || s((e) => c.test(e)) >= 0.5) return "color";
  if (s((e) => u.test(e)) >= 0.5) return "size";
  const l = r.map((e) => /^\d{2}(\.\d)?(in|inch|انش|إنش|بوصة|")?$/.test(e) ? parseFloat(e) : NaN);
  return l.every((e) => e >= 48 && e <= 66) ? "length" : l.every((e) => e >= 30 && e <= 47) ? "size" : null;
}
function g(n, r) {
  const s = t(r);
  if (!n || !s) return null;
  const l = /^\d+$/.test(s);
  return n.details.find(
    (e) => l ? (t(e.name).match(/\d+/g) ?? []).includes(s) : t(e.name).includes(s)
  ) || null;
}
const d = {
  size: { ar: "المقاس", en: "Size" },
  length: { ar: "الطول", en: "Length" },
  color: { ar: "اللون", en: "Color" }
};
function f(n, r) {
  const s = i(n);
  return s ? d[s][r === "en" ? "en" : "ar"] : String((n == null ? void 0 : n.name) || "");
}
export {
  g as m,
  t as n,
  f as o
};
