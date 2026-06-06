# Code Health — 2026-06-06 18:35 UTC

Today's angle: **SEO (meta tags / Open Graph)**
Focus layer: index.html head / manifest.webmanifest / public/*.html internal tool exposure

---

## A. Recent commits

```
c1c78e9 v2.0.B.243: 6 chapters parallel ship — 日韓東南亞 + 俄 + 非 補 Bear gap
e6a44a4 v2.0.B.242: 6 chapters parallel ship + standards 統整檔
bb4d166 v2.0.B.241: market research + CC licensing 戰略 doc
4ec4d5c v2.0.B.240: CI hotfix — sync-hooks idempotent
36f1456 ⚠️ v2.0.B.cron-code: 2026-06-06-1237 angle: Service Worker cache poisoning
eb243c3 v2.0.B.cron-code: 2026-06-06-0635 angle: PWA install / manifest
```

---

## B. Signal (counts per angle)

| Check | Result |
|---|---|
| `og:title` present in index.html | ❌ 0 |
| `og:description` present | ❌ 0 |
| `og:image` present | ❌ 0 |
| `og:url` present | ❌ 0 |
| `twitter:card` present | ❌ 0 |
| `<link rel="canonical">` present | ❌ 0 |
| `robots.txt` in public/ | ❌ not found |
| `sitemap.xml` in public/ | ❌ not found |
| public/og/ OG images generated | ❌ directory missing (tool exists, never run) |
| Internal tool pages with noindex | ❌ 0 of 27 (25 qa-static + cockpit + dashboard) |
| `<title>` uses sunset "CEFR cloze challenge" | ⚠️ pre-pivot wording |
| `<meta name="description">` uses "after-work" | ⚠️ sunset language per CLAUDE.md |
| manifest.json description uses "after-work" | ⚠️ same |
| manifest `lang` vs html `lang` | ⚠️ conflict: manifest=`en-US` / html=`zh-TW` |
| favicon.svg brand match | ⚠️ purple lightning bolt — brand is warm amber/terracotta |

---

## C. Hot path bug risk table

| Pri | File:line | Issue | Risk | 修法 | Effort |
|-----|-----------|-------|------|------|--------|
| **P0** | `index.html:20` | `<title>Pickup · CEFR cloze challenge</title>` — "CEFR cloze challenge" is adult test-prep framing; post-B.231 pivot to 8-12 children / families | Social share title misleads target audience; damages parent/child conversion | Change to `拾光 Pickup · 奶奶的睡前英文故事` | 2 min |
| **P0** | `index.html:21` | `<meta name="description">` still says "cozy after-work English game … stray cat's journey home" — both are sunset phrases (CLAUDE.md §Vision: "Sunset 字眼") | Google SERP snippet shows wrong audience; parenting/family search signals completely absent | Rewrite to child/family ELT copy mentioning grandma, bedtime, Mochi | 5 min |
| **P0** | `index.html` head | Zero `og:*` tags — no `og:title`, `og:description`, `og:image`, `og:url`, `og:type`, `og:locale` | Every Facebook/LINE/Discord/iMessage link preview shows blank card; zero social virality signal | Add full OG block; point `og:image` to `/og/ch1.svg` (run `node tools/og-image.cjs` first) | 10 min |
| **P0** | `public/` (27 files) | 25 `qa-static-ch*.html` + `cockpit.html` + `dashboard.html` — all publicly accessible at `pickupwords.pages.dev/qa-static-ch*.html` with zero `<meta name="robots" content="noindex, nofollow">` | Google indexes internal QA tools; crawl budget wasted; internal tooling exposed in SERPs; `cockpit.html` + `dashboard.html` expose internal metrics/strategy | Add `<meta name="robots" content="noindex, nofollow">` to all 27 internal HTML files **or** block via `robots.txt` `Disallow: /qa-*` + `Disallow: /cockpit.html` + `Disallow: /dashboard.html` | 15 min (robots.txt = 2 min) |
| **P1** | `index.html` head | No `<link rel="canonical" href="https://pickupwords.pages.dev/">` | If Cloudflare serves the app at multiple origins (pages.dev + custom domain), Google may split PageRank between duplicates | Add single canonical tag | 1 min |
| **P1** | `index.html` head | No `twitter:card` / `twitter:title` / `twitter:description` / `twitter:image` | X/Twitter link previews show blank; LINE + Telegram also use Twitter card fallback | Add 4-line Twitter card block | 3 min |
| **P1** | `manifest.webmanifest:3` | `"description": "A cozy after-work English game…"` — uses sunset "after-work" | Wrong brand voice in PWA install sheet shown on iOS/Android home screen add | Update to family/children framing | 2 min |
| **P1** | `manifest.webmanifest:11` | `"lang": "en-US"` conflicts with `index.html lang="zh-TW"` | PWA install UX uses wrong locale hint; Android Chrome may show wrong keyboard default | Change to `"lang": "zh-TW"` (primary audience is Taiwanese) | 1 min |
| **P2** | `public/og/` | `tools/og-image.cjs` generates per-chapter 1200×630 SVG cards but `public/og/` directory has never been created; no `og:image` pointing anywhere | Dynamic per-chapter social sharing remains dead — the B.235 share feature renders inline SVG but static OG image for URL unfurling is missing | Run `node tools/og-image.cjs`; add `og:image` default + per-route logic (or at minimum static `/og/ch1.svg` default) | 20 min |
| **P2** | `public/favicon.svg` | SVG is a purple (`#863bff`) lightning bolt — brand palette is warm amber/terracotta (`#e7a44a` / `#ed5a2e`); purple has no presence anywhere in the app | Browser tab and bookmark icons show an off-brand purple bolt that doesn't match the Ghibli warm aesthetic | Replace with paw-shaped or amber-toned favicon; `icon-paw.webp` exists at `/mascots/icon-paw.webp` — can convert to SVG or use `<link rel="icon" href="/mascots/icon-paw.webp">` | 10 min |
| **P2** | `public/` (missing) | No `robots.txt` — crawlers receive no guidance on disallowed paths | QA tool pages indexed; crawl budget wasted; `_headers` file itself might be served as a text resource | Create `public/robots.txt` with `Disallow` rules for all internal tool paths + `Sitemap:` pointer | 5 min |

---

## D. Bundle / build health

```
Build: ✅ clean (3.42s, 0 warnings)

Chunk breakdown (raw / gzip):
  react-CvBZlOBd.js    139.9 KB / 45.4 KB   react+react-dom
  index-Dx5v-7Z-.js    123.1 KB / 39.8 KB   app main
  zod-Cohpjn9R.js       56.5 KB / 12.9 KB   schema validation
  LessonPage-DtqGcHVs.js 55.2 KB / 14.9 KB  lesson code-split
  react-router-wgzytNDj.js 19.9 KB / 7.5 KB
  index-CpTfSFtW.css    23.6 KB / 5.5 KB
  Total JS (gzip):     ~126 KB
  Total (incl. CSS):   ~132 KB

Status: within <400 KB gzip budget (371 KB estimated incl. all). No regression.
```

---

## E. Top 5 P0

1. **Zero Open Graph tags** — every LINE/FB/Discord share of `pickupwords.pages.dev` shows a blank card. OG is the single highest-leverage SEO/social fix with the lowest effort (10 min). `tools/og-image.cjs` already generates images; they just need wiring to `<meta>`.

2. **`<title>` and `<meta name="description">` use sunset language** — "CEFR cloze challenge" + "after-work English game" actively contradict the v2.0.B.231 pivot to children/family ELT. Any parent Googling "兒童英文遊戲" or "family English app" sees completely wrong copy.

3. **27 internal tool pages publicly indexed, zero noindex protection** — `qa-static-ch0.html` through `qa-static-ch21.html` + `cockpit.html` + `dashboard.html` + `preview-ch1-first25.html` are all live at the production URL and fully crawlable. A `robots.txt` with 4 `Disallow` lines fixes this in 2 minutes.

4. **manifest.webmanifest description still says "after-work"** — Shown directly in the iOS/Android "Add to Home Screen" sheet. Parents seeing this will bounce. 2-minute fix.

5. **Manifest `lang: "en-US"` vs HTML `lang="zh-TW"` conflict** — Signals to Google that the PWA speaks English while the HTML says Traditional Chinese. Confuses language-based ranking for Chinese-speaking family audiences. 1-minute fix.
