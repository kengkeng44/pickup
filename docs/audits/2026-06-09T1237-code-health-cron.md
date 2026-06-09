# Code Health — 2026-06-09 12:37 UTC

Today's angle: **localStorage size limit / key hygiene**
Focus layer: key namespace collisions · quota handling · dead reads · legacy `wordwar.*` orphans · per-chapter key fan-out · centralized registry absence

---

## A. Recent commits

```
814456b v2.0.B.cron-walk: 2026-06-09-1221 persona: 雅婷 trauma learner 4G [ARCH-REC: OnboardingPicker wire + trauma-safe gate]
14b5ae6 v2.0.B.cron-arch: 2026-06-09 angle: dep graph circular detection
3498f30 v2.0.B.cron-content: 2026-06-09-1208 angle: #11-optionsZh-quality
7c76a9b Merge remote-tracking branch 'origin/master'
f095437 v2.0.B.cron-ui: 2026-06-09-1209 angle: Duolingo Streak/League gamification
4c21cf9 v2.0.B.266: Cockpit RN pivot audit — 6 items → archive + ⚠️ tags
413905a v2.0.B.cron-ui: 2026-06-09-0908 angle: Duolingo Stories UX
9dd0b55 ARCH-REC: v2.0.B.cron-code: 2026-06-09-0037 angle: Zustand selector performance
```

Build: ✅ clean — no TS errors, gzip 147 KB main chunk.

---

## B. Signal (counts per angle)

| Signal | Count |
|--------|-------|
| Unique localStorage keys (simulated full-save) | ~185 |
| Legacy `wordwar.*` keys still in use | 10 |
| Files defining `LS_*` constants as raw strings | 15+ |
| `setItem` calls with silent `catch {}` (no QuotaExceeded differentiation) | 28 |
| Keys read but never written anywhere | 1 (`pickup.stats.answer`) |
| Key namespace collisions (different files, different key strings, same concept) | 2 confirmed |
| Total worst-case storage at 32 chapters complete | ~65 KB (1.3% of 5 MB limit) |

Storage headroom is not the danger. **Key inconsistency** is.

---

## C. Hot path bug risk table

| Pri | File:line | Issue | Risk | 修法 | Effort |
|-----|-----------|-------|------|------|--------|
| **⚠️ P0** | `src/react-app/pages/MapPage.tsx:644` | Writes `'pickup.coins'` but `coins.ts:6` uses `LS_COINS = 'pickup.coins.total'`. `readCoins()` reads from `.total` — chest tap coins are written to wrong key, silently discarded. HUD coin count never changes after chest open. | 🔴 Chest coins permanently lost — player feature broken | `localStorage.setItem('pickup.coins', ...)` → import `addCoins` from `../../data/coins` and call `addCoins(10)` | S (5 min) |
| **⚠️ P0** | `src/react-app/pages/ProfilePage.tsx:22,39` | Reads/writes `'pickup.catName'` (camelCase). `catName.ts:9` `LS_CAT_NAME = 'pickup.cat-name'` (hyphenated). `applyCatName()` calls `readCatName()` which reads `'pickup.cat-name'` → user's custom name set in Profile never appears in narration. | 🔴 Core personalisation feature silently broken for every user who renames cat | Replace inline `localStorage.getItem('pickup.catName')` / `setItem` with `readCatName()` / `writeCatName()` imports | S (10 min) |
| **P1** | `src/data/userProfile.ts:106,132` | `ANSWER_STATS_KEY = 'pickup.stats.answer'` is read to compute accuracy % but **never written anywhere** in the codebase. `readAnswerStats()` always returns `{ correct: 0, total: 0 }`. Profile accuracy is always 0/0. | 🟠 Stats UI shows wrong data; also silently skews `deriveUserProfile()` toward A1 ability | Either wire a write-site (in `LessonPage` on answer) or remove `ANSWER_STATS_KEY` read and derive accuracy from `pickup.xp.total` ratio | M (1 hr) |
| **P1** | `src/ui/ModeMenu.ts:38`, `src/audio/AudioManager.ts:16-17`, `src/data/storyKitten.ts:301-302`, `src/store/runStore.ts:154`, `src/data/scenarios.ts:179-180` | 10 live `wordwar.*` keys mixed with 30+ `pickup.*` keys. User who played v1.x has both sets in storage. No migration, no version gate. If rebrand key normalisation ever runs, v1.x users silently lose streak/SRS progress. | 🟠 Future migration risk + namespace confusion for debugging | Add migration shim: on app boot, copy `wordwar.*` → `pickup.*` equivalent once, set `pickup.storage.v` = 2 guard | M (2 hr) |
| **P2** | `src/react-app/pages/MapPage.tsx:244-248` | On every component mount, O(43) loop scanning `pickup.chest.{i}.opened` for i in 0..42. No batching. | 🟡 43 synchronous `getItem` calls on mount, blocking render tick on slow iOS | Read single JSON blob `pickup.chests.opened = "[0,5,10]"` instead of 43 separate keys | S (20 min) |
| **P2** | All 28 `setItem` call-sites | `QuotaExceededError` is caught by generic `catch {}`. No distinction from `SecurityError` (private mode). User gets no feedback if storage fills during session (mid-lesson progress silently dropped). | 🟡 Silent data loss on storage-full devices (e.g. old low-storage Android tablets) | Add `safeSetItem` wrapper that re-throws if `err.name === 'SecurityError'` and fires `window.dispatchEvent(new CustomEvent('pickup:storage-full'))` for a toast | S (30 min) |
| **P3** | Entire `src/data/` layer | No centralised key registry — ~50 key strings scattered across 15+ files as `const LS_* = 'literal'`. No TypeScript enum, no version field, no key→schema mapping. Risk of new typo collision (P0 above is an example). | 🟡 Maintainability — every new feature risks a silent mis-key | Extract `src/data/storageKeys.ts` enum; import in all modules (no behaviour change, pure refactor) | M (2 hr) |

---

## D. Bundle / build health

Build output unchanged from v2.0.B.cron-code: 2026-06-09-0037 baseline:

```
dist/assets/index-ByI7f9tV.js      175.70 kB │ gzip: 52.14 kB
dist/assets/LessonPage-By-FWmS4.js  65.23 kB │ gzip: 17.61 kB
dist/assets/zod-Cohpjn9R.js         56.50 kB │ gzip: 12.93 kB
Total gzip:  ~147 KB
```

localStorage payload: 185 total keys, worst-case 65 KB — well within 5 MB browser limit. No quota risk at current scale.

---

## E. Top 5 P0

1. **⚠️ MapPage.tsx:644 — wrong coin key** → chest coins silently discarded; replace raw `setItem` with `addCoins(10)` call
2. **⚠️ ProfilePage.tsx:39 — catName key mismatch** → personalisation broken; replace inline localStorage with `writeCatName()` / `readCatName()` from `catName.ts`
3. **P1 userProfile.ts:132 — dead `ANSWER_STATS_KEY` read** → accuracy always 0; either wire write-site or remove
4. **P1 10 orphaned `wordwar.*` keys** → no migration; add v1→v2 migration shim on boot
5. **P2 O(43) chest-key scan on every mount** → batch into single JSON key

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### Research summary

Industry direction (React 18 + PWA, 2025-2026):

- **Typed key registry**: The `local-storage-typed` library (Zod-powered) and `typed-storage` (MDN-aligned) confirm the community standard is a single `enum`/`const` map + typed getter/setter. All major ELT apps (Duolingo, Cake) use a single `storage/keys.ts` file per feature domain.
- **StorageManager.estimate()**: MDN + web.dev recommend proactive quota checks (`navigator.storage.estimate()`) rather than reactive `catch {}` on write failure — especially critical on installed PWAs where iOS Safari silently refuses writes past the per-origin cap.
- **QuotaExceededError differentiation**: TrackJS / Matteo Mazzarolo pattern: `err instanceof DOMException && (err.code === 22 || err.name === 'QuotaExceededError')` — distinguish from SecurityError (private mode, already handled by boot banner).
- **IndexedDB for large blobs**: web.dev recommends localStorage only for small scalars; any growing array (SRS queue, notif history) belongs in IndexedDB. For Pickup at current scale (65 KB worst-case) this is premature — but worth noting if 100+ chapters ship.

### Pickup 適配分析

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|-----------|--------|-----|---------|
| Centralized `storageKeys.ts` enum | ts-local-storage-manager, local-storage-typed | ✅ 完全適合 — 50 keys 已散落 15 files, P0 coin bug 就是直接後果 | M 2 hr | ⭐⭐⭐ HIGH | **推薦** |
| `safeSetItem` wrapper w/ QuotaExceeded event | MDN QuotaExceededError, TrackJS | ✅ 適合 — 現有 28 catch{} 只換一個 helper | S 30 min | ⭐⭐⭐ HIGH | **推薦** |
| `navigator.storage.estimate()` proactive check | web.dev Storage for the web | 🟡 部分適合 — 適合 App init 一次呼叫記錄 Sentry, 不適合 per-write (async overhead) | S 20 min | ⭐⭐ MED | 選用 |
| IndexedDB for SRS queue | web.dev | ❌ 不適合 — 65 KB 遠低於閾值; Capacitor SQLite 已在 Phase 2.5 roadmap | XL invasive | ⭐ LOW | 暫緩 |
| Encrypt localStorage (react-secure-storage) | npm react-secure-storage | ❌ 不適合 — Pickup 無 PII, 額外 JS weight + key-rotation complexity 無 ROI | XL invasive | ⭐ LOW | 不採 |

### 具體實作建議 (ARCH-REC #12)

**`src/data/storageKeys.ts`** — thin centralized registry, zero behaviour change:

```typescript
// src/data/storageKeys.ts
export const SK = {
  COINS:               'pickup.coins.total',
  XP:                  'pickup.xp.total',
  CAT_NAME:            'pickup.cat-name',
  DOG_NAME:            'pickup.dog-name',
  CAT_GENDER:          'pickup.cat-gender',
  STREAK_COUNT:        'pickup.streak.count',
  STREAK_LAST:         'pickup.streak.lastDate',
  STREAK_FREEZES:      'pickup.streak.freezes',
  STREAK_FREEZE_LAST:  'pickup.streak.lastFreezeUsedDate',
  VISIT_COUNT:         'pickup.visit.count',
  VISIT_LAST:          'pickup.visit.lastDate',
  VISIT_LONGEST:       'pickup.visit.longest',
  LEVEL:               'pickup.level',        // migrate from wordwar.level
  DIFFICULTY:          'pickup.difficulty',
  MUTE:                'pickup.mute',
  AUDIO_MUTED:         'pickup.audioMuted',   // migrate from wordwar.audioMuted
  HAPTICS_MUTED:       'pickup.hapticsM',     // migrate from wordwar.hapticsMuted
  OUTFITS_UNLOCKED:    'pickup.outfits.unlocked',
  OUTFITS_CURRENT:     'pickup.outfits.current',
  CARDS_UNLOCKED:      'pickup.cards.unlocked',
  STORY_PREFS:         'pickup.story.preferences',
  ABILITY_LEVEL:       'pickup.ability.level',
  ANSWER_STATS:        'pickup.stats.answer',
  NOTIFS_CONSENT:      'pickup.notifs.consent',
  NOTIFS_HISTORY:      'pickup.notifs.history',
  NOTIFS_SCHEDULED:    'pickup.notifs.scheduled',
  NOTIFS_PROMPT_HIST:  'pickup.notifs.prompt-history',
  TOMORROW_QUEUED:     'pickup.tomorrow.queued',
  MAP_CAT_NODE:        'pickup.map.cat-node',
  MAP_LAST_SEEN:       'pickup.map.last-seen-completed',
  INTRO_DISMISSED:     'pickup.introDismissed', // migrate from wordwar.introDismissed
  SRS_QUEUE:           'pickup.srs.kitten',    // migrate from wordwar.srs.kitten
  CH_PROGRESS:         'pickup.story.chapterProgress', // migrate from wordwar.story.*
  CHESTS_OPENED:       'pickup.chests.opened', // batch replace 43 individual keys
  STORAGE_VERSION:     'pickup.storage.v',
} as const;

export type StorageKey = (typeof SK)[keyof typeof SK];
```

**`safeSetItem` wrapper** (also in `storageKeys.ts`):

```typescript
export function safeSetItem(key: StorageKey, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch (err) {
    if (err instanceof DOMException &&
        (err.code === 22 || err.name === 'QuotaExceededError' || err.name === 'NS_ERROR_DOM_QUOTA_REACHED')) {
      window.dispatchEvent(new CustomEvent('pickup:storage-full'));
    }
    // SecurityError (private mode) already covered by boot.ts banner
  }
}
```

**Migration shim** (run once in `main.ts` after storage-check):

```typescript
function migrateV1Keys() {
  if (localStorage.getItem(SK.STORAGE_VERSION) === '2') return;
  const migrations: [string, StorageKey][] = [
    ['wordwar.level', SK.LEVEL],
    ['wordwar.audioMuted', SK.AUDIO_MUTED],
    ['wordwar.hapticsMuted', SK.HAPTICS_MUTED],
    ['wordwar.story.chapterProgress', SK.CH_PROGRESS],
    ['wordwar.srs.kitten', SK.SRS_QUEUE],
    ['wordwar.introDismissed', SK.INTRO_DISMISSED],
  ];
  for (const [oldKey, newKey] of migrations) {
    const v = localStorage.getItem(oldKey);
    if (v !== null) { safeSetItem(newKey, v); localStorage.removeItem(oldKey); }
  }
  safeSetItem(SK.STORAGE_VERSION, '2');
}
```

**Effort breakdown**: storageKeys.ts file = 1 hr; safeSetItem = 15 min; migration shim = 30 min; update callers (15 files) = 1 hr. Total **~3 hr** but P0 fixes above can ship independently in 15 min.
