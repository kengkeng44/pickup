# Code Health — 2026-06-08 12:36 UTC

Today's angle: **Capacitor IAP wire risk**
Focus layer: iOS In-App Purchase readiness — paywall gate architecture, entitlement state management, currency key consistency, restore-purchases path, DEV bypass guard, analytics hook-up

---

## A. Recent commits

```
984a808 v2.0.B.cron-walk: 2026-06-08-1217 persona: 曉蓁 11yo dyslexic iPhone mini iOS Safari
419bc05 v2.0.B.cron-arch: 2026-06-08 angle: DRY violation
74ade21 v2.0.B.cron-ui: 2026-06-08-1210 angle: LingQ known-words counter
9a116e8 v2.0.B.270: 全畫幅 + cream bg + book-cover flat + 寶箱每 5 顆
3462a0b v2.0.B.cron-content: 2026-06-08-1206 angle: explanationZh-story-voice
80c306e v2.0.B.269: HUD 縮窄 + 改 warm taupe #e8dec8 (不顯眼)
c62076e v2.0.B.268: fix sticky bug → position: fixed Scroll Sandwich Layout
e18d5e0 v2.0.B.267: MapPage sticky HUD + book-cover header + virtual scrolling (windowing)
```

---

## B. Signal (counts per angle)

| Signal | Count | Note |
|--------|-------|------|
| `@capacitor/` deps in package.json | 0 | Not installed yet (Phase 2.5) |
| `DEV_UNLOCK_ALL` occurrences | 2 | storyKitten.ts:11 + :349 |
| `isChapterUnlocked` implementations | **2 separate** | storyKitten.ts + ChaptersPage.tsx — different logic |
| `PAYWALL_VIEW` event defined | 1 | posthog.ts:21 — never called anywhere |
| coin write via wrong key | 1 | MapPage:547 uses `'pickup.coins'` not `'pickup.coins.total'` |
| `navigator.vibrate` (iOS noop) | 1 | sfx.ts — documented TODO for Capacitor haptics |
| restore-purchases path | 0 | No StoreKit/receipt validation surface exists |
| localStorage as single entitlement source | All gates | `highestCompleted` in `wordwar.story.chapterProgress` is the sole unlock guard |

---

## C. Hot path bug risk table

| Pri | File:line | Issue | Risk | 修法 | Effort |
|-----|-----------|-------|------|------|--------|
| **P0** | `src/react-app/pages/MapPage.tsx:547` | Treasure chest writes to `'pickup.coins'` but `coins.ts` canonical key is `'pickup.coins.total'` — chest awards are invisible to all callers that use `readCoins()` | Functional bug: earned coins silently dropped; future IAP coin purchases could be bypassed via same raw write pattern | Replace `localStorage.setItem('pickup.coins', ...)` with `addCoins(10)` from `../../data/coins` | XS 5 min |
| **P1** | `src/data/storyKitten.ts:348` vs `src/react-app/pages/ChaptersPage.tsx:75` | Two separate `isChapterUnlocked()` implementations with different data sources — storyKitten reads `highestCompleted` from v1.x progress key; ChaptersPage reads `readCompletedLessons(chId-1).size >= 7` from v2.0 runStore key | Divergence: a user who completes Ch1 via v2.0 LessonPage will have the ChaptersPage gate open but the Phaser StoryMapView gate closed (different unlock signals). When IAP is added, a third unlock source will make this triplication impossible to audit. | Delete the local `isChapterUnlocked` in ChaptersPage; import + reuse the one from storyKitten (or create a single `src/data/chapterGate.ts` that both call) | S 30 min |
| **P1** | `src/analytics/posthog.ts:21` | `PAYWALL_VIEW: 'paywall_view'` event is defined but has **zero callsites** across the entire codebase | When a paywall screen is added pre-IAP-launch, analytics will silently miss all paywall exposure data — conversion funnel will be invisible on day 1 | Add a `track(EVENT.PAYWALL_VIEW, { chapterId })` call at every locked-chapter tap in ChaptersPage:218 and wherever a future paywall screen mounts | XS 10 min |
| **P1** | `src/data/storyKitten.ts:11` | `DEV_UNLOCK_ALL = false` is a hardcoded constant in production code with no build-time guard | A dev accidentally setting `true` before `npm run build` ships all chapters unlocked to production — no CI check prevents this | Add Vite build plugin or `validate-lessons.js`-style CI script that `grep`s for `DEV_UNLOCK_ALL = true` and fails the build | S 20 min |
| **P2** | `src/data/storyKitten.ts:309` + `src/data/mascotOutfits.ts:278` + `src/data/cards.ts:278` | All entitlement state (chapter progress, unlocked outfits, unlocked collectible cards) lives purely in localStorage — no server-side or receipt-backed source of truth | IAP receipts cannot be re-verified after install; if user clears app data or switches device, all earned/purchased content is lost with no restore path | Architect a thin `entitlement.ts` facade that wraps localStorage for now but is designed to accept a Capacitor receipt layer — `getEntitlement(key)` / `setEntitlement(key, val)` instead of raw localStorage calls in each data module | M 2 hr |
| **P2** | No file | No `restorePurchases()` path exists anywhere — not even a stub | App Store Review **requires** a "Restore Purchases" button for any app with IAP; shipping without it = App Store rejection | Add `src/data/iap.ts` stub with `restorePurchases(): Promise<void>` that resolves immediately (no-op) now; real Capacitor implementation slots in later; surface a button in ProfilePage | S 30 min |
| **P2** | `src/audio/sfx.ts:91` | `navigator.vibrate()` silently noops on iOS Safari (Apple has blocked it since 2015); comment says "Capacitor wrap 上之後可改 @capacitor/haptics" but no code path exists to detect Capacitor shell | Users on iOS Capacitor build get zero haptic feedback on correct/wrong answers — diminished feel vs Android | Add `typeof (window as any).Capacitor !== 'undefined'` guard + dynamic import of `@capacitor/haptics` when Capacitor shell is detected; keep `navigator.vibrate` as web fallback | S 30 min |

---

## D. Bundle / build health

```
dist/assets/index-0FPl3ZQ3.js      174.56 kB │ gzip: 51.52 kB
dist/assets/react-CvBZlOBd.js      139.88 kB │ gzip: 45.36 kB
dist/assets/LessonPage-DDC1AkGY.js  63.85 kB │ gzip: 17.20 kB
dist/assets/zod-Cohpjn9R.js         56.50 kB │ gzip: 12.93 kB
Total gzip: ~137 kB (no change from B.268)
```

Build: ✅ clean (0 errors, 0 warnings). No Capacitor plugin increases bundle — clean baseline for Phase 2.5.

---

## E. Top 5 P0 / Action Items (ROI ranked)

### ⭐ #1 — P0: Treasure chest coins silently dropped (MapPage:547)
**File**: `src/react-app/pages/MapPage.tsx:547`
**Bug**: writes `'pickup.coins'` instead of calling `addCoins(10)` from `coins.ts` (canonical key is `'pickup.coins.total'`)
**Symptom**: every chest click visually refreshes the page but coin total in HUD/ProfilePage never increases
**Fix**:
```ts
// MapPage.tsx:545-548 — replace raw localStorage write with addCoins()
import { readCoins, addCoins } from '../../data/coins';
// ...
addCoins(10);  // was: const curCoins = readCoins(); localStorage.setItem('pickup.coins', ...)
```
**Effort**: XS 5 min

### ⭐ #2 — P1: Dual `isChapterUnlocked` implementations diverge (storyKitten.ts vs ChaptersPage.tsx)
**File**: `src/data/storyKitten.ts:348` + `src/react-app/pages/ChaptersPage.tsx:75`
**Bug**: storyKitten uses v1.x `highestCompleted` (per-chapter integer); ChaptersPage uses v2.0 `readCompletedLessons().size >= 7` (per-lesson set). A user who completes lessons in v2.0 flow may see ChaptersPage unlock Ch2 while the Phaser StoryMapView (which calls storyKitten's version) keeps it locked.
**Fix**: Delete local `isChapterUnlocked` in ChaptersPage; create `src/data/chapterGate.ts` that uses the v2.0 `readCompletedLessons` source exclusively; update both callsites.
**Effort**: S 30 min

### ⭐ #3 — P1: `PAYWALL_VIEW` analytics event defined but never fired (posthog.ts:21)
**File**: `src/analytics/posthog.ts:21`, `src/react-app/pages/ChaptersPage.tsx:217-218`
**Bug**: `EVENT.PAYWALL_VIEW` exists but zero callsites — paywall funnel will be dark on launch day.
**Fix**: In ChaptersPage `onClick` guard:
```ts
if (!unlocked) {
  track(EVENT.PAYWALL_VIEW, { chapterId: ch.id });
  return;
}
```
**Effort**: XS 10 min

### ⭐ #4 — P1: `DEV_UNLOCK_ALL` has no CI guard (storyKitten.ts:11)
**File**: `src/data/storyKitten.ts:11`, `tools/validate-lessons.js`
**Risk**: accidental `true` ships to production with zero warning
**Fix**: Add 3-line check to `tools/validate-lessons.js`:
```js
const kt = fs.readFileSync('src/data/storyKitten.ts', 'utf8');
if (/DEV_UNLOCK_ALL\s*=\s*true/.test(kt))
  throw new Error('DEV_UNLOCK_ALL is true — flip to false before ship');
```
**Effort**: XS 5 min

### ⭐ #5 — P2: No `restorePurchases()` stub (App Store requirement)
**File**: none — needs new `src/data/iap.ts`
**Risk**: App Store Review will reject any IAP-enabled app without a visible Restore button
**Fix**: Create stub + surface in ProfilePage now, before Capacitor wiring starts.
**Effort**: S 30 min

---

*Audit produced by code-health-cron agent. 5-agent post-ship review pending.*
