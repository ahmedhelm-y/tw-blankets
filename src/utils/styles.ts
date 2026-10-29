import { DEFAULTS, storeAccentVars } from "./colors";
import { revealCss } from "./reveal";

/** Light DOM components share one <style> per component type in the document head. */
export function injectStyles(id: string, css: string): void {
  if (document.getElementById(id)) return;
  const style = document.createElement("style");
  style.id = id;
  style.textContent = css;
  document.head.appendChild(style);
}

const TOKENS = ["bg", "card", "title", "text", "accent", "accent-text", "accent-ink"] as const;
const defaultFor = (mode: "light" | "dark", token: (typeof TOKENS)[number]) =>
  DEFAULTS[mode][token === "accent-text" ? "accentText" : token === "accent-ink" ? "accentInk" : token];

// Each token resolves: the section's own color, then the page palette from the header, then the default.
// The accent default goes through the store's primary color first, and its text through the store's
// matching reverse color, so a very light store color still gets readable button text.
const STORE_VARS: Partial<Record<(typeof TOKENS)[number], string>> = {
  accent: "--color-primary",
  "accent-text": "--color-primary-reverse",
};
const chain = (prefix: "l" | "d") =>
  TOKENS.map((token) => {
    const mode = prefix === "l" ? "light" : "dark";
    const store = STORE_VARS[token];
    const fallback = store ? `var(${store}, ${defaultFor(mode, token)})` : defaultFor(mode, token);
    return `--mf-${token}: var(--mf-s-${prefix}-${token}, var(--mf-${prefix}-${token}, ${fallback}));`;
  }).join(" ");

/** Shared section frame: the host is the size container, and blocks never rely on the page's CSS reset. */
export const baseCss = `
.mf-host { display: block; width: 100%; min-width: 0; container-type: inline-size; }
[data-mf-section] { scroll-margin-top: var(--mf-hd-h, 0px); }
/* The last block keeps clear of the sticky buy bar while it shows */
.mf-ft { padding-bottom: calc(1.25rem + var(--mf-sb-h, 0px)) !important; }
.component-card:has(> .mf-host:not(:empty)) { min-height: 0; }
.mf-block { ${chain("l")}
  display: block; width: 100%; box-sizing: border-box; font-family: var(--font-main, inherit);
  color: var(--mf-text); background: var(--mf-bg); }
.mf-block.mf-dark, html.mf-mode-dark .mf-block.mf-auto { ${chain("d")} }
@media (prefers-color-scheme: dark) { html:not(.mf-mode-light) .mf-block.mf-auto { ${chain("d")} } }
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
${revealCss}
`;

let storeAccentChecked = false;

/** Injects the shared styles once and, without a brand color, keeps a dark store color visible on dark pages. */
export function ensureBase(): void {
  injectStyles("mf-base", baseCss);
  if (storeAccentChecked) return;
  storeAccentChecked = true;
  const root = document.documentElement;
  if (root.style.getPropertyValue("--mf-d-accent")) return;
  const primary = getComputedStyle(root).getPropertyValue("--color-primary").trim();
  for (const [name, value] of Object.entries(storeAccentVars(primary))) root.style.setProperty(name, value);
}
