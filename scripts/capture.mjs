// Renders template thumbnails (768×1195) and marketplace screenshots (1600×1200, under 200 KB) from the harness
// with Playwright's Chromium. Run `pnpm build` and serve the repo (e.g. `npx vite --port 5192`) first, then:
// HARNESS=http://127.0.0.1:5192/harness/landing.html node scripts/capture.mjs [thumbs|market]
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import sharp from "sharp";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const BASE = process.env.HARNESS || "http://127.0.0.1:5192/harness/landing.html";

async function shoot(browser, query, width, height, act) {
  const page = await browser.newPage({ viewport: { width, height } });
  await page.goto(`${BASE}?clean=1&filler=0&layout=none&landing=0&${query}`, { waitUntil: "load", timeout: 60000 });
  await page.waitForTimeout(9000);
  if (act) await act(page);
  const png = await page.screenshot();
  await page.close();
  return png;
}

/** JPEG at the highest quality that stays under the byte limit. */
async function toJpeg(png, out, width, height, limit) {
  for (let quality = 86; quality >= 40; quality -= 6) {
    const buffer = await sharp(png).resize(width, height, { fit: "cover", position: "top" }).jpeg({ quality, mozjpeg: true }).toBuffer();
    if (!limit || buffer.length <= limit || quality <= 40) {
      fs.mkdirSync(path.dirname(out), { recursive: true });
      fs.writeFileSync(out, buffer);
      console.log(`${out}  ${Math.round(buffer.length / 1024)} KB  q${quality}`);
      return;
    }
  }
}

const tabuk = async (page) => {
  await page.locator(".mf-wg__city select").selectOption({ label: "تبوك" });
  await page.waitForTimeout(500);
};
const kingSize = async (page) => {
  await page.locator(".mf-sg__bed").nth(2).click();
  await page.waitForTimeout(500);
};

const THUMBS = ["winter-warm", "night-luxe", "gift-season"];
const MARKET = [
  ["01-winter-warm", "template=winter-warm&only=page-header,hero,trust-strip"],
  ["02-night-luxe", "template=night-luxe&only=page-header,hero,trust-strip,fabric-compare"],
  ["03-warmth-city", "template=winter-warm&only=page-header,warmth-guide", tabuk],
  ["04-size-guide", "template=winter-warm&only=page-header,size-guide", kingSize],
  ["05-set-and-fabrics", "template=winter-warm&only=page-header,set-details,fabric-compare"],
  ["06-gifts-and-quiz", "template=gift-season&only=page-header,gift-bar,bed-quiz"],
];

const only = process.argv[2];
const browser = await chromium.launch();
if (!only || only === "thumbs") {
  for (const name of THUMBS) await toJpeg(await shoot(browser, `template=${name}`, 768, 1195), `templates-thumbs/${name}.jpg`, 768, 1195, 0);
}
if (!only || only === "market") {
  for (const [file, query, act] of MARKET) await toJpeg(await shoot(browser, query, 1600, 1200, act), `marketplace/${file}.jpg`, 1600, 1200, 200 * 1024);
}
await browser.close();
