# Code Health — 2026-06-04 06:39 UTC

Today's angle: **localStorage size limit / private mode**

Focus layer: persistence layer — key naming consistency, error-guard coverage,
quota risk, private-mode UX, analytics identity coherence.

---

## A. Recent commits

```
d4e6179 v2.0.B.221: hook inquiry microcopy + PostHog hook_type tag + Ch2 canon
43138b4 v2.0.B.220: Ch1 全 7 lesson hook ending v6 + narrative-cut-analyst skill
fbd078b v2.0.B.cron-ui: 2026-06-04-0609 angle: Anki SRS card design
63f662e ⚠️ v2.0.B.cron-content: 2026-06-04-0607 angle: audio-sync
5d16b97 v2.0.B.219: Ch1-1 PoC 情緒峰值切章 + B3 資訊缺口 hook ending
adde32d v2.0.B.218: Ch1-1 PoC interleaved 11 Q 4.5min (5 min budget compliant)
3b9879b v2.0.B.217: DB v2 — Ch0 排除 + 5min/lesson budget compliance
4d7e0de v2.0.B.216: content DB 抽取 + 跨章 variance audit
```

---

## B. Signal (localStorage angle — counts)

| Signal | Count |
|--------|-------|
| Total distinct LS key strings in codebase | 22 |
| Keys using `pickup.*` namespace | 13 |
| Keys using legacy `wordwar.*` namespace | 9 |
| Files touching localStorage | 19 |
| `try/catch`-guarded write callsites | 28 / 28 ✅ |
| `typeof localStorage === 'undefined'` guards | 11 |
| Bare read calls without guard (inline IIFEs counted) | 0 ✅ |
| **KEY MISMATCH: ProfilePage writes 'pickup.catName', catName.ts reads 'pickup.cat-name'** | 1 🔴 |
| Bare string literal LS key (not via constant) | 1 ⚠️ |

---

## C. Hot path bug risk table

| Pri | File:line | Issue | Risk | 修法 | Effort |
|-----|-----------|-------|------|------|--------|
| **P0** | `src/react-app/pages/ProfilePage.tsx:13,18` | `ProfilePage` reads/writes `'pickup.catName'` (camelCase); `catName.ts:9` defines key as `'pickup.cat-name'` (kebab). **Name change in Profile never propagates to lesson text** — user edits name, refreshes, lessons still say Mochi. Silent data split in production. | High — feature broken since ProfilePage was added | Replace raw string with `import { readCatName, writeCatName } from '../../data/catName'` in ProfilePage; remove hardcoded key strings | 15 min |
| **P1** | `src/scenes/StoryModeScene.ts:711` | Reads `localStorage.getItem('wordwar.srs.kitten')` as raw string literal instead of importing `LS_SRS_QUEUE` constant from `storyKitten.ts`. One has `const LS_SRS_QUEUE = 'wordwar.srs.kitten'` — if key ever migrates, this callsite won't follow. | Medium — currently consistent, but any future key migration misses this callsite silently | Import and use `LS_SRS_QUEUE` (or export-rename it) from `storyKitten.ts` | 10 min |
| **P1** | `src/analytics/posthog.ts:100-110` | `getOrCreateDeviceId()` returns `'pkpd-fallback-' + Date.now()` on every call when storage is blocked (private mode). PostHog receives a fresh anonymous ID per event — user appears as hundreds of distinct users in D7/retention funnel. Corrupts acquisition and retention metrics. | Medium — analytics data in private mode is structurally wrong | Cache fallback ID in module-level var so same ID is reused within session: `let _sessionFallback: string` | 10 min |
| **P1** | `src/data/storyKitten.ts:301-302` | 9 keys across 5 files still use `wordwar.*` namespace (`wordwar.level`, `wordwar.audioMuted`, `wordwar.hapticsMuted`, `wordwar.introDismissed`, `wordwar.srs.kitten`, `wordwar.story.chapterProgress`, `wordwar.scenarioBest.*`, `wordwar.scenarioCompleted.*`). Brand renamed to `pickup` in v0.9 — these are 15-month-old stranded keys. Any future namespace migration must read old key first or user progress data is lost. | Medium — no immediate breakage but silent migration risk | Add migration comment block in each file: `const LEGACY_KEY = 'wordwar.X'; const LS_KEY = 'pickup.X';` + one-time migration on readback | 30 min per file |
| **P2** | `src/main.ts:19-38` | `detectStorageBlocked()` runs once at boot. If quota fills mid-session (PostHog injects ~8 KB of its own keys after lazy-load), subsequent writes silently fail with no user feedback. Private-mode banner is correct at boot but won't catch late quota errors. | Low — PostHog is lazy and quota cap is ~5 MB in most browsers; payload total is ~2 KB | Add QuotaExceededError detection in the most critical write (markLessonCompleted) that re-shows the banner | 20 min |
| **P2** | `src/react-app/pages/ProfilePage.tsx:12-18` | ProfilePage does inline `localStorage.getItem('pickup.catName')` / `setItem(...)` instead of importing the data module. Data layer is bypassed — no length validation (catName.ts caps at 12 chars), no cleanup of leading whitespace. User could save a 100-char name that overflows the input. | Low — cosmetic; broken feature anyway due to P0 key mismatch | After fixing P0: delete inline LS code, call `readCatName()` / `writeCatName(v)` | bundled with P0 |
| **P2** | `src/store/runStore.ts:543-567` | `readCompletedLessons(chapter)` + `markLessonCompleted()` each call `localStorage.getItem` / `JSON.parse` + `setItem` / `JSON.stringify` independently. On lesson map mount with 8 chapters, this could be 8 separate getItem + parse calls. No in-memory cache. | Low — each parse is <400 bytes; 8× is imperceptible; no measured perf issue | Memoize per session with a `Map<number, Set<string>>` module-level cache invalidated on write | 30 min |

---

## D. Bundle / build health

```
Tests: 23 / 23 pass ✅
Build: clean ✅

dist/assets/react-*.js         139.84 kB raw /  45.34 kB gz
dist/assets/index-*.js          47.57 kB raw /  15.32 kB gz
dist/assets/zod-*.js            56.50 kB raw /  12.93 kB gz
dist/assets/LessonPage-*.js     23.25 kB raw /   6.69 kB gz
dist/assets/react-router-*.js   19.90 kB raw /   7.51 kB gz
dist/assets/index-*.css         23.60 kB raw /   5.51 kB gz
TOTAL JS gz:                                    ~95 kB gz  ✅ (well under 400 kB budget)

LS total payload estimate (all keys, worst-case all ch completed):
  - lesson progress (8 ch × 24 lessons): ~728 bytes
  - XP / coins / streak / names / difficulty / misc: ~500 bytes
  - PostHog device-id + consent: ~50 bytes
  - SRS queue (180 wrong answers): ~2.5 KB worst case
  TOTAL: ~4 KB — well under 5 MB quota even in Firefox private mode (which allows writes up to session end)
```

localStorage size is **not** a quota risk for this app at current scale.

---

## E. Top 5 P0/P1

1. **⚠️ P0 `ProfilePage.tsx:13,18`** — `'pickup.catName'` key split from `catName.ts` `'pickup.cat-name'`. Cat name change in Profile never takes effect in lesson text. Fix: import `readCatName`/`writeCatName` and delete inline LS strings.

2. **P1 `posthog.ts:105-109`** — Private-mode analytics identity: `'pkpd-fallback-' + Date.now()` is generated fresh each call. Cache in module-level var. Retention metrics are corrupted for private-mode users.

3. **P1 `StoryModeScene.ts:711`** — Raw string `'wordwar.srs.kitten'` instead of imported constant. Future key rename silently misses this callsite.

4. **P1 9 files** — `wordwar.*` namespace stranded from pre-rebrand era. Document migration strategy or rename with one-time legacy-key read fallback.

5. **P2 `ProfilePage.tsx:12-18`** — Inline LS code bypasses `catName.ts` length validation. Bundled fix with P0.
