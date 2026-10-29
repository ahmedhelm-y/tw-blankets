// Line icons for the pieces of a bedding set and the laundry care symbols, drawn on a 48×48 grid.
import { svg, type SVGTemplateResult } from "lit";

const frame = (body: SVGTemplateResult) => svg`<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round"
  stroke-linejoin="round" aria-hidden="true">${body}</svg>`;

const tub = svg`<path d="M6 16h36l-4 22H10z" /><path d="M6 16c3 3 6 3 9 0s6-3 9 0 6 3 9 0 6-3 9 0" />`;
const cross = svg`<path d="M8 8l32 32M40 8L8 40" />`;
const iron = svg`<path d="M8 34h32l-3-12c-1-4-4-6-8-6H18l-3 6" /><path d="M8 34l4-12h24" />`;

export const PIECES = {
  comforter: { ar: "لحاف", en: "Comforter", icon: svg`<rect x="6" y="12" width="36" height="26" rx="4" /><path d="M6 21h36M6 30h36M18 12v26M30 12v26" />` },
  "duvet-cover": { ar: "غطاء لحاف", en: "Duvet cover", icon: svg`<rect x="6" y="10" width="36" height="28" rx="3" /><path d="M6 32h36M14 35h2M22 35h2M30 35h2" />` },
  "flat-sheet": { ar: "شرشف", en: "Flat sheet", icon: svg`<path d="M8 12h32v20l-6 6H8z" /><path d="M34 38v-6h6" />` },
  "fitted-sheet": { ar: "شرشف بأستك", en: "Fitted sheet", icon: svg`<rect x="8" y="14" width="32" height="20" rx="6" /><path d="M8 20c4 2 4 6 0 8M40 20c-4 2-4 6 0 8" />` },
  pillowcase: { ar: "كيس مخدة", en: "Pillowcase", icon: svg`<path d="M8 16c0-3 2-4 5-4h22c3 0 5 1 5 4v16c0 3-2 4-5 4H13c-3 0-5-1-5-4z" /><path d="M32 12v24" />` },
  pillow: { ar: "مخدة", en: "Pillow", icon: svg`<path d="M7 18c0-4 3-6 6-6h22c3 0 6 2 6 6v12c0 4-3 6-6 6H13c-3 0-6-2-6-6z" /><path d="M13 12c2 4 2 20 0 24M35 12c-2 4-2 20 0 24" />` },
  cushion: { ar: "مخدة ديكور", en: "Cushion", icon: svg`<path d="M10 10c5 3 23 3 28 0-3 5-3 23 0 28-5-3-23-3-28 0 3-5 3-23 0-28z" /><circle cx="24" cy="24" r="2.5" />` },
  throw: { ar: "بطانية", en: "Throw", icon: svg`<path d="M8 14h28a4 4 0 0 1 0 8H12a4 4 0 0 0 0 8h28" /><path d="M8 38h32" />` },
  "bed-skirt": { ar: "تنورة سرير", en: "Bed skirt", icon: svg`<rect x="8" y="12" width="32" height="12" rx="2" /><path d="M8 24l2 14M16 24v14M24 24v14M32 24v14M40 24l-2 14" />` },
  protector: { ar: "واقي مرتبة", en: "Mattress protector", icon: svg`<rect x="6" y="14" width="36" height="20" rx="4" /><path d="M12 20h24M12 28h24" stroke-dasharray="3 4" />` },
} as const;

export const CARE = {
  "wash-30": { ar: "غسالة على 30°", en: "Machine wash 30°", icon: svg`${tub}<text x="24" y="33" font-size="11" font-weight="700" text-anchor="middle" fill="currentColor" stroke="none">30</text>` },
  "wash-40": { ar: "غسالة على 40°", en: "Machine wash 40°", icon: svg`${tub}<text x="24" y="33" font-size="11" font-weight="700" text-anchor="middle" fill="currentColor" stroke="none">40</text>` },
  "hand-wash": { ar: "غسيل يدوي", en: "Hand wash", icon: svg`${tub}<path d="M19 34v-8c0-1 2-1 2 0v5M21 31v-7c0-1 2-1 2 0v7M23 31v-6c0-1 2-1 2 0v6M25 31v-4c0-1 2-1 2 0v5c0 3-2 5-5 5h-1c-2 0-3-1-4-3" />` },
  "no-bleach": { ar: "بدون مبيض", en: "Do not bleach", icon: svg`<path d="M24 8l18 32H6z" />${cross}` },
  "tumble-low": { ar: "مجفف على حرارة واطية", en: "Tumble dry low", icon: svg`<rect x="8" y="8" width="32" height="32" rx="3" /><circle cx="24" cy="24" r="11" /><circle cx="24" cy="24" r="1.5" fill="currentColor" />` },
  "no-tumble": { ar: "بدون مجفف", en: "Do not tumble dry", icon: svg`<rect x="8" y="8" width="32" height="32" rx="3" /><circle cx="24" cy="24" r="11" />${cross}` },
  "line-dry": { ar: "نشر على الحبل", en: "Line dry", icon: svg`<rect x="8" y="8" width="32" height="32" rx="3" /><path d="M8 14c8 8 24 8 32 0" />` },
  "dry-flat": { ar: "تجفيف مفرود", en: "Dry flat", icon: svg`<rect x="8" y="8" width="32" height="32" rx="3" /><path d="M14 24h20" />` },
  "iron-low": { ar: "كي على حرارة واطية", en: "Iron low", icon: svg`${iron}<circle cx="24" cy="28" r="1.5" fill="currentColor" />` },
  "no-iron": { ar: "بدون كي", en: "Do not iron", icon: svg`${iron}${cross}` },
  "dry-clean": { ar: "تنظيف جاف", en: "Dry clean", icon: svg`<circle cx="24" cy="24" r="15" />` },
  "no-dry-clean": { ar: "بدون تنظيف جاف", en: "Do not dry clean", icon: svg`<circle cx="24" cy="24" r="15" />${cross}` },
} as const;

export type PieceKey = keyof typeof PIECES;
export type CareKey = keyof typeof CARE;

export function pieceIcon(key: string) {
  return frame((PIECES[key as PieceKey] || PIECES.comforter).icon);
}

export function careIcon(key: string) {
  return CARE[key as CareKey] ? frame(CARE[key as CareKey].icon) : null;
}
