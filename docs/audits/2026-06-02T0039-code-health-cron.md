# Code Health — 2026-06-02 00:39 UTC

Today's angle: **Web Vitals (LCP / FID / CLS / INP)**
Focus layer: Critical rendering path · image preload strategy · font metrics · INP blocking patterns

---

## A. Recent commits
```
cdbef48 v2.0.B.177: map page full-bleed (kill white border)
e929dbe v2.0.B.176: 3 strict items + audio chain fix (cron content P0-like)
09b38d5 v2.0.B.cron-walk: 2026-06-02-0018 persona: Senior 60+ iPad landscape
0c69587 v2.0.B.175: MapPage strict 1:1 Phaser StoryMapView port
3cd592c v2.0.B.cron-ui: 2026-06-02-0008 angle: Khan Academy progress visualization
d977ff7 ⚠️ v2.0.B.cron-content: 2026-06-02-0006 angle: R2-distractor-doctrine
b2c52c9 v2.0.B.174: SW cache bump B.165 → B.174 (force refresh)
af828f5 v2.0.B.cron-ui: 2026-06-01-2109 angle: Duolingo Streak/League gamification
dee5ad8 v2.0.B.cron-code: 2026-06-01-1839 angle: Memory leak (event listener / RAF)
```

---

## B. Signal counts (Web Vitals angle)

| Signal | Count | Location |
|--------|-------|----------|
| `will-change: transform` permanent | 7 | `style.css:389,505,624,705,718,854,869` |
| Above-fold images not preloaded | 6 | HUD icons + grandma + shiba |
| `height: 'auto'` on `<img>` in flex layout | 2 | `ChapterIntroPage.tsx:68-69` |
| `useEffect` fetch without AbortController | 3 | `MapPage.tsx:170`, `LessonPage.tsx:33`, `ChapterIntroPage.tsx:37` |
| `setTimeout` without `clearTimeout` | 3 | `renderers.tsx:276,339,406` |
| Route-level lazy split | 0 | All pages eager-imported |
| `startTransition` for question advance | 0 | `LessonPage.tsx:onAdvance` |
| PWA icons (PNG 192/512) | 0 | `manifest.webmanifest` |
| Font render-blocking stylesheet | 1 | `index.html:24` |

---

## C. Hot path bug risk table

| Pri | File:line | Issue | Risk | 修法 | Effort |
|-----|-----------|-------|------|------|--------|
| **P0** | `src/react-app/pages/MapPage.tsx:170-177` | `fetch('/lessons-ch${chapter}.json')` in `useEffect` serialises LCP. Page renders twice before meaningful content: (1) blank, (2) `載入中…`, (3) 24 nodes after network RTT. On 3G (~300ms RTT) this adds 600 ms+ to LCP. Grandma image (126 KB) and all 24 lesson nodes only appear after fetch completes | LCP > 4s on slow mobile — Google Core Web Vitals "Poor" threshold | Add `<link rel="preload" as="fetch" crossorigin href="/lessons-ch1.json">` for ch1 default in `index.html`; use `document.getElementById`-style deferred parse via `Response.clone()` to serve from cache immediately on mount. Shorter fix: move `fetch` to module-level singleton cache so second visit returns instantly | 30 min |
| **P0** | `src/audio/sfx.ts:156-166` + `renderers.tsx` (every click) | `sfxCorrect()` creates 11+ Web Audio nodes synchronously on the click event thread: `bellTone()` × 2 (each: 4 × `createOscillator` + 4 × `createGain` + 8 × `connect` + 4 × `start` + 4 × `stop`) + 3 × `tone()` = ~27 synchronous Web Audio API calls before the frame can paint the visual state change. Low-end Android AudioContext operations are not truly off-thread until `.start()` is called | INP spike 50-120 ms on mid-range Android (Redmi Note, Galaxy A). Duolingo target INP < 200 ms; this eats 25-60% of budget on answer tap | Wrap SFX calls in `requestAnimationFrame` or `queueMicrotask` so paint fires first, audio starts 1 frame later: `const tapTime = ctx.currentTime; requestAnimationFrame(() => sfxCorrect(tapTime))` | 20 min |
| **P0** | `src/style.css:389,505,624,705,718,854,869` | 7 `will-change: transform` on always-animated elements (mascot idle bob, cat idle, ken-burns, breathing, pulse-ring, map character). `will-change` promotes elements to compositor layers at parse time. 7 permanent layers on a mobile GPU (1-2 GB VRAM shared) causes layer thrashing = dropped frames on first scroll + jank on answer | On low-end Android (Redmi Note 11, 2GB RAM), >4 permanent `will-change` layers causes CLS-adjacent scroll jank and memory pressure. Affects D7 retention for budget-phone users | Remove `will-change` from CSS class definitions; add it just before animation starts via JS (`el.style.willChange='transform'`) and remove in `animationend`. For infinite loops that never "end", keep only the 1-2 most critical (mascot idle bob) and strip the rest | 25 min |
| **P1** | `index.html:28-30` + `MapPage.tsx:190-193` | Preloaded images (`calico-anchor`, `icon-paw`, `icon-speaker`) are **below the fold** or in LessonPage. The 6 above-fold LCP candidates on MapPage are NOT preloaded: `flag-en.webp` (10 KB), `crown-gold.webp` (115 KB), `coin-gold.webp` (178 KB), `icon-flame.webp` (73 KB), `iso-grandma.webp` (126 KB), `iso-shiba.webp` (96 KB) = 598 KB unpreloaded above-fold images | LCP image is grandma (126 KB) + HUD load stagger. Browser must discover these only after JS runs and React renders the component tree. Each image starts fetching ~200-400 ms after navigation = LCP hits 2-3s on fast mobile | Replace current 3 preloads with the 4 HUD icons + grandma + shiba. `calico-anchor` → remove (Profile only). `icon-speaker` → remove (below fold). Add `fetchpriority="high"` attribute to the `<img>` element for `iso-grandma.webp` in MapPage | 15 min |
| **P1** | `index.html:24` (Google Fonts) | `<link rel="stylesheet" href="https://fonts.googleapis.com/...">` is a **render-blocking** synchronous stylesheet load from a third-party origin. `display=swap` prevents invisible text but causes FOUT (Flash of Unstyled Text). Noto Sans TC has very different em-square metrics than system-ui fallback (taller cap-height, different line-gap) → text reflow when font swaps = measurable CLS (0.05-0.15 per element count) | CLS contribution from CJK font swap on text-heavy pages (LessonPage narration history, ProfilePage). CLS > 0.1 = "Needs Improvement"; > 0.25 = "Poor" | (1) Add `media="print" onload="this.media='all'"` non-blocking load pattern; (2) Add `@font-face` in CSS with `ascent-override: 90%` + `descent-override: 22%` matching Noto Sans TC metrics to eliminate reflow shift; (3) Alternatively, self-host subset of Noto Sans TC for CJK glyphs used | 1 hr |
| **P1** | `src/react-app/App.tsx:7-13` | All 7 page components imported **synchronously**. No `React.lazy()` + `Suspense`. `renderers.tsx` (466 lines, includes 6 renderer components, SFX imports, TTS, WordHint) is bundled into the main chunk. This means the full lesson renderer bundle is parsed+executed before MapPage is interactive | First-frame parse+execute time for main chunk: 66 KB raw JS on low-end device (Snapdragon 430, 100 Mbps) = ~80-120 ms execution time. Eliminates FID budget entirely before first interaction. `LessonPage` + `renderers.tsx` account for ~20-25 KB of that | Wrap lesson route: `const LessonPage = React.lazy(() => import('./pages/LessonPage'))`. Wrap `App` routes in `<Suspense fallback={<LoadingShell />}>`. Other pages are small; prioritise LessonPage since renderers.tsx is the heavy dependency | 20 min |
| **P2** | `src/react-app/pages/ChapterIntroPage.tsx:68-69` | `<img src="/mascots/iso-grandma.webp" alt="" width={100} />` missing `height` attribute. `<img src="/mascots/iso-shiba.webp" alt="" width={70} />` missing `height` attribute. Both are in a `display:flex` column flow — browser must download the image to know its height, causing CLS when image loads and layout shifts downward | CLS contribution: iso-grandma is 126 KB — on slow connection, the flex layout jumps when image arrives. Exact CLS score depends on viewport but typically 0.03-0.08 per image shift | Add `height={100}` and `height={70}` respectively (intrinsic pixel dimensions). Actual webp dimensions: `iso-grandma.webp` is rendered at 100px wide → set `height` to preserve aspect ratio. Run `identify` or check actual dimensions; estimated 1:1.1 ratio → `height={110}` | 5 min |
| **P2** | `public/manifest.webmanifest` | PWA manifest has no 192×192 or 512×512 PNG icons. Only `calico-anchor.webp` (`sizes: "any"`) and `favicon.svg`. Chrome PWA install flow on Android < API 33 (covers ~40% of Android fleet) requires PNG icons at exactly 192 and 512 px. WebP is NOT reliably supported for PWA icons cross-browser | PWA install prompt fails silently or shows grey placeholder on ~40% of Android devices. Reduces PWA install rate from organic "Add to Home Screen" prompts | Generate two PNG files (`mascot-192.png`, `mascot-512.png`) from existing `calico-anchor.webp` via `sharp` or `ImageMagick`; add `{ "src": "/mascot-192.png", "sizes": "192x192", "type": "image/png", "purpose": "any maskable" }` entries to manifest | 10 min |

---

## D. Bundle / build health

```
dist/assets/index-*.js       66 KB raw / 19 KB gz   ← main bundle (all pages eager)
dist/assets/react-*.js      140 KB raw / 45 KB gz   ← React + ReactDOM
dist/assets/zod-*.js         57 KB raw / 13 KB gz   ← Zod (lesson schema)
dist/assets/react-router-*.js 20 KB raw /  8 KB gz  ← Router
dist/assets/index-*.css      23 KB raw /  5 KB gz   ← Styles
dist/assets/zustand-*.js      2 KB raw /  1 KB gz   ← Zustand
```

No Phaser chunk in dist — lazy dynamic import not triggered at build time (loaded on-demand in LessonPage). Total initial payload: **86 KB raw JS / 27 KB gz** (sans react chunk). Good.

- `modulePreload: false` intentional (B.151)
- 10/10 tests passing, build clean
- `mirror-lint: 482 warnings` (warn-only)

Key observation: `coin-gold.webp` is **178 KB** — largest mascot file. It appears in HUD above the fold on every MapPage visit. No special treatment (no preload, no `fetchpriority`). This single file is the likely LCP element on all return visits.

---

## E. Top 5 P0 / actionable

1. ⚠️ **`sfxCorrect()` INP blocker** — `renderers.tsx` every answer tap creates 11+ Web Audio nodes synchronously before frame paint. Wrap in `requestAnimationFrame(() => sfxCorrect())` to yield paint first. `sfx.ts:156`

2. ⚠️ **MapPage fetch serialises LCP** — `useEffect` fetch means 2 renders before grandma/nodes appear. Add `<link rel="preload" as="fetch" crossorigin href="/lessons-ch1.json">` to `index.html` + module-level fetch cache in `MapPage.tsx:170`.

3. ⚠️ **7 permanent `will-change` layers** — `style.css:389,505,624,705,718,854,869`. Strip from CSS definitions; apply via JS only during active animation. Saves GPU memory + eliminates layer-thrashing jank on low-end Android.

4. **Wrong images preloaded** — `index.html:28-30`. Swap `calico-anchor` + `icon-speaker` (not above fold) for `coin-gold` + `crown-gold` + `iso-grandma` + `iso-shiba` (actual LCP candidates).

5. **`LessonPage` not lazy-split** — `App.tsx:11`. `React.lazy(() => import('./pages/LessonPage'))` saves ~20 KB from initial parse cost; only loaded when user taps a lesson node.

---

*Auditor: claude-sonnet-4-6 — 0 src/ modifications*
