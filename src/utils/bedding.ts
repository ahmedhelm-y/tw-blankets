// Bedding advice: matching a warmth level or a bed size to the product's option value, the city warmth table,
// the quiz score and the pieces of a set.
import { matchValue, normalize } from "./fit";

/** The first option value of the product whose name holds the text, as { optionId: valueId }. */
export function pickByValue(product: any, text: unknown): Record<string, number> {
  if (!String(text ?? "").trim()) return {};
  for (const option of product?.options || []) {
    if (!(option?.details || []).length) continue;
    const value = matchValue(option, text);
    if (value && !value.is_out) return { [String(option.id)]: Number(value.id) };
  }
  return {};
}

export type Level = 1 | 2 | 3;
export type City = { name: { ar: string; en: string }; night: number };

/**
 * Typical January night lows (°C), rounded, from long-term climate averages. The merchant can replace the list;
 * these only decide which warmth level the page suggests.
 */
export const CITIES: City[] = [
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
  { name: { ar: "جازان", en: "Jazan" }, night: 22 },
];

/** Light for warm nights, medium for cool ones, heavy at 6°C and below. */
export function levelFor(night: number, heavyAt = 6, lightAt = 14): Level {
  if (night <= heavyAt) return 3;
  if (night >= lightAt) return 1;
  return 2;
}

/** The result most answers point to. A tie goes to the later result: the templates list them from light to warm, and a cold night is the worse mistake. */
export function quizResult(votes: number[], results = 3): number {
  const counts = Array.from({ length: results }, () => 0);
  for (const v of votes) if (v >= 0 && v < results) counts[v]++;
  let best = 0;
  counts.forEach((n, i) => {
    if (n >= counts[best]) best = i;
  });
  return best;
}

/** How many pieces the set holds in all. */
export function piecesTotal(items: { count: number }[]): number {
  return items.reduce((n, i) => n + Math.max(0, Math.round(Number(i.count) || 0)), 0);
}

/** Width and length from "240×260 سم", "240 x 260" or "٢٤٠*٢٦٠"; the smaller number is the width. */
export function dims(text: unknown): { w: number; l: number } | null {
  const nums = (normalize(text).match(/\d+(\.\d+)?/g) || []).map(Number).filter((n) => n > 0);
  if (nums.length < 2) return null;
  const [a, b] = nums;
  return { w: Math.min(a, b), l: Math.max(a, b) };
}
