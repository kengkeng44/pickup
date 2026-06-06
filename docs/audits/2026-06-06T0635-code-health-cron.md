# Code Health — 2026-06-06 06:35 UTC

Today's angle: **PWA install / manifest**
Focus layer: manifest.webmanifest · sw.js registration · _headers cache policy · iOS/Android install criteria

---

## A. Recent commits

```
0dbf218 ⚠️ v2.0.B.cron-content: 2026-06-06-0606 angle: A4-mirror-patterns
ba82281 v2.0.B.cron-ui: 2026-06-06-0605 angle: Duolingo Streak/League gamification
874ca0c v2.0.B.cron-ui: 2026-06-06-0305 angle: Brilliant interactive demo
6512c26 v2.0.B.cron-code: 2026-06-06-0037 angle: Zustand selector performance
2783c23 v2.0.B.cron-walk: ⚠️ P0 2026-06-06-0019 persona: 小玲 上班族 iOS Safari 18
```

---

## B. Signal (counts per angle)

| Signal | Count |
|--------|-------|
| Dead SW registration callsites | 1 critical (main.ts, never loaded) |
| Missing maskable icon | 1 (manifest has 0 maskable icons) |
| WebP apple-touch-icon (iOS ignores) | 1 (index.html) |
| Manifest without cache header | 1 (_headers has no /manifest.webmanifest rule) |
| sw.js without no-cache header | 1 (_headers has no /sw.js rule) |
| Stale sunset copy in manifest description | 1 ("after-work" — sunset in B.231) |
| lang mismatch (manifest en-US vs html zh-TW) | 1 |
| Missing screenshots field | 1 (Chrome rich install card not triggered) |

---

## C. Hot path bug risk table

| Pri | File:line | Issue | Risk | 修法 | Effort |
|-----|-----------|-------|------|------|--------|
| **P0** | `src/main.ts:75-79` | **SW registration is dead code** — `index.html` loads `main.tsx` since v2.0.B.164 cutover. `main.tsx` never imports `main.ts` and never calls `navigator.serviceWorker.register()`. SW is never installed. No offline shell. No "Add to Home Screen" prompt on Chrome Android. App falsely ships `sw.js` but users never get it. | PWA install silently broken for all users since B.164 shipped | Add SW registration block to `src/main.tsx` (after `createRoot` call) | 10 min |
| **P0** | `index.html:16` | **`apple-touch-icon` is WebP** — `<link rel="apple-touch-icon" href="/mascots/calico-anchor.webp" />`. iOS Safari completely ignores non-PNG/JPEG apple-touch-icon. Home screen icon when user taps "Add to Home Screen" on iPhone shows a blurry screenshot crop, not the branded calico cat. | Every iOS PWA add = broken icon, zero brand | Change href to a PNG. Use `public/mascots/preview/calico-anchor-v1.png` (already exists) or generate 180×180 PNG | 5 min |
| **P0** | `public/manifest.webmanifest:14-27` | **No `maskable` icon** — both icons declare `"purpose": "any"`. Android adaptive icon system requires at least one `"purpose": "maskable"` entry (with safe zone padding) to render in the rounded-square/circle shape used on modern launchers. Without it, the icon is letterboxed with a white ring on Android home screen. Chrome Lighthouse PWA audit fails this check. | Visual regression on Android home screen; Lighthouse PWA score drop | Add a maskable variant. Quickest: duplicate the `calico-anchor.webp` entry with `"purpose": "maskable"` — it's 1024×1024 so the safe zone (center 80%) is sufficient. Proper fix: generate padded PNG. | 5 min |
| **P1** | `public/_headers` (no `/sw.js` rule) | **`sw.js` has no `Cache-Control` header** — Cloudflare Pages applies its default TTL (typically 2h–4h via Edge Cache) to unmatched paths. The browser re-fetches SW on each navigation by spec, but if CF CDN returns a cached copy with `max-age > 0`, the update byte-diff check sees no change for hours. New deploy → users stuck on old SW for up to CF TTL window. | Deploy → cache bust gap; rollback of B.157 cache-poisoning fix takes hours to propagate | Add `/sw.js` entry to `_headers`: `Cache-Control: no-cache, no-store, must-revalidate` | 2 min |
| **P1** | `public/_headers` (no `/manifest.webmanifest` rule) | **`manifest.webmanifest` has no `Cache-Control` header** — same CF default TTL risk. Manifest change (icon swap, theme color, name update) takes hours to reach returning users. iOS Safari re-reads manifest on every add-to-home-screen initiation but Android caches aggressively. | Brand/name/icon changes in manifest don't reach users promptly | Add `/manifest.webmanifest` entry: `Cache-Control: public, max-age=0, must-revalidate` | 2 min |
| **P1** | `public/manifest.webmanifest:4` | **Stale sunset copy in `description`** — `"A cozy after-work English game."` uses "after-work" framing explicitly sunset in v2.0.B.231 pivot (target audience changed to 8-12 children / families). This description surfaces in Chrome install card, Play Store (if listed), and future App Store metadata. | User-facing brand inconsistency post-pivot | Update to `"Grandma's bedtime English stories — learn A2 English with Mochi the stray cat."` | 1 min |
| **P2** | `public/manifest.webmanifest:12` | **`lang: "en-US"` conflicts with `<html lang="zh-TW">`** — manifest `lang` declares the primary language of the app. Since the app is primarily Traditional Chinese UI + narration (奶奶說故事), `lang` should be `zh-TW`. Affects PWA indexing, Google Play PWA discovery, and accessibility tools that read manifest lang. | Discovery/accessibility gap | Change `"lang": "en-US"` → `"lang": "zh-TW"` | 1 min |
| **P2** | `public/manifest.webmanifest` | **No `screenshots` field** — Chrome Android 10+ shows a richer install bottom sheet (with app screenshots) when `screenshots` are declared in the manifest. Without them, users see the minimal 1-line install banner which has significantly lower tap-through rate. Critical for the iOS App Store / Capacitor roadmap where manifest quality is reviewed. | Lower PWA install conversion; App Store review risk | Add 2–3 `screenshots` entries pointing to existing `/mascots/preview/*.png` or QA HTML screenshots. Format: `[{ "src": "...", "sizes": "390x844", "type": "image/png", "form_factor": "narrow" }]` | 30 min (need to generate actual screenshots first) |

---

## D. Bundle / build health

```
Build: ✅ clean (0 warnings, 23/23 tests pass)

Chunk breakdown (gzip):
  react.js            45.34 KB  ← largest, expected
  index.js (main)     15.34 KB
  zod.js              12.93 KB
  LessonPage.js        8.39 KB
  react-router.js      7.51 KB
  CSS                  5.51 KB
  ChapterIntroPage.js  1.46 KB
  zustand.js           1.03 KB
  rolldown-runtime.js  0.42 KB
  index.html           1.39 KB
  ─────────────────────────────
  Total (no Phaser)   ~99 KB gz   ← within 400 KB budget
  Phaser (lazy)       not measured (lazy import, off critical path)
```

SW file size: 3.9 KB (public/sw.js — served as static, not bundled)

---

## E. Top 5 P0

### P0-1 — SW registration dead since v2.0.B.164 (`src/main.ts:75`)

`index.html` switched entry to `main.tsx` in B.164 but SW registration was never ported. `main.tsx` calls `createRoot()` and mounts the React app — no SW registration. The SW file (`/sw.js`) exists on the CDN but is never installed by any browser. Chrome Android will never prompt "Add to Home Screen". Offline fallback is unavailable.

**Fix**: Add to `src/main.tsx` after `createRoot().render(...)`:

```ts
if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  });
}
```

### P0-2 — WebP `apple-touch-icon` (iOS ignores) (`index.html:16`)

iOS Safari silently drops WebP apple-touch-icon. Home screen shows a screenshot crop. `public/mascots/preview/calico-anchor-v1.png` already exists (1024×1024 PNG).

**Fix**: `<link rel="apple-touch-icon" href="/mascots/preview/calico-anchor-v1.png" />`

### P0-3 — No maskable icon in manifest (`manifest.webmanifest:14-27`)

Chrome PWA Lighthouse check "Manifest has maskable icon" fails. Android home screen shows white ring. Both icons declare `"purpose": "any"` only.

**Fix** (minimal): Add a third icon entry with `"purpose": "maskable"`:

```json
{
  "src": "/mascots/calico-anchor.webp",
  "sizes": "any",
  "type": "image/webp",
  "purpose": "maskable"
}
```

(1024×1024 with subject centered in 80% safe zone — calico-anchor qualifies.)

### P0-4 — `sw.js` and `manifest.webmanifest` missing from `_headers` (`public/_headers`)

Two missing rules mean Cloudflare CDN applies default caching (potentially hours). SW updates and manifest changes are invisible to returning users during the CDN TTL window.

**Fix**: Add to `public/_headers`:

```
/sw.js
  Cache-Control: no-cache, no-store, must-revalidate
/manifest.webmanifest
  Cache-Control: public, max-age=0, must-revalidate
```

### P0-5 — Stale "after-work" copy in manifest description (`manifest.webmanifest:4`)

Directly contradicts v2.0.B.231 client pivot (8-12 children, not 下班族). This string appears in Chrome install card and App Store metadata if Capacitor packaging uses the manifest.

**Fix**: Update `"description"` to `"Grandma's bedtime English stories — learn A2 English with Mochi the stray cat."`.
