# Code Health — 2026-06-05 06:35 UTC

Today's angle: **Android Chrome touch event**
Focus layer: Touch interaction reliability — passive listeners, `overscroll-behavior`, pointer capture, mixed touch/pointer model, deprecated scroll APIs.

---

## A. Recent commits

```
09e338a ⚠️ v2.0.B.cron-content: 2026-06-05-0609 angle: R2-distractor-doctrine
ae6d7c8 v2.0.B.cron-ui: 2026-06-05-0605 angle: Cake short-video onboarding
ecf66a2 v2.0.B.231: audience pivot 下班族 → 兒童/親子家庭
9105c13 v2.0.B.cron-ui: 2026-06-05-0306 angle: Duolingo Stories UX
17ab384 v2.0.B.cron-code: 2026-06-05-0039 angle: TS strict mode quirks
444243e v2.0.B.cron-walk: ⚠️ P0 persona: trauma 阿美 iOS Safari 18 private
1bb3197 v2.0.B.cron-ui: 2026-06-05-0008 angle: Khan Academy progress visualization
513b1bc ⚠️ v2.0.B.cron-content: 2026-06-05-0004 angle: explanationZh-story-voice
```

---

## B. Signal (counts per angle)

| Signal | Count |
|--------|-------|
| `touchstart` listeners | 5 |
| `touchend` listeners (non-passive) | 4 |
| `touchcancel` listeners | 3 |
| `pointerdown` listeners | 5 |
| `touch-action: manipulation` declarations | 38 |
| `-webkit-tap-highlight-color` declarations | 19 |
| `WebkitOverflowScrolling: 'touch'` (deprecated) | 3 |
| `overscroll-behavior` declarations | 1 (only LessonScene review scroll) |
| `setPointerCapture` calls | **0** |
| Files using mixed touch+pointer on same element | 2 (StoryMapView.ts, NodeActivitySheet.ts) |

---

## C. Hot path bug risk table

| Pri | File:line | Issue | Risk | 修法 | Effort |
|-----|-----------|-------|------|------|--------|
| **P0** | `src/style.css:118` | Missing `overscroll-behavior: none` on `html, body` — Android Chrome pull-to-refresh fires when scrolling to top of map/main content in browser mode, reloading the page mid-lesson and erasing in-progress state | Data loss: lesson progress destroyed on accidental pull-to-refresh for ~100% of non-PWA Android users | Add `overscroll-behavior: none` to `html, body` in `style.css` | 2 min |
| **P0** | `src/react-app/App.tsx:40` | `document.addEventListener('touchstart', unlockOnce, { once: true })` — missing `passive: true`. Chrome DevTools flags this as scroll-blocking and Lighthouse penalizes it under "Avoids non-passive event listeners" | Lighthouse score penalty; Chrome may throttle scroll responsiveness for the entire document lifecycle | Add `passive: true` to the options object: `{ once: true, passive: true }` | 1 min |
| **P1** | `src/ui/domUtil.ts:47` | `attachPressFeedback` `pointerdown` handler lacks `el.setPointerCapture(e.pointerId)` — used in 7 callsites (SpeakerButton, StoryMapView, EndOverlay, ModeMenu×2, ChapterEnd, ChapterIntro). On Android Chrome, when finger moves ≥1px during tap, `pointerleave` fires before `pointerup`, releasing the 3D-press visual prematurely and potentially routing `pointerup` to an adjacent element | Ghost-tap: button visually releases early; in crowded nodes adjacent buttons can receive unintended clicks | In the `pointerdown` callback, call `el.setPointerCapture((e as PointerEvent).pointerId)` | 5 min |
| **P1** | `src/ui/StoryMapView.ts:601` | Banner paw `touchend` missing `{ passive: true }` AND missing `touchcancel` — if gesture is interrupted (incoming call, swipe-away), paw stays at `translateY(2px)` permanently | Visual stuck-press state until page reload | Add `{ passive: true }` to touchend; add `touchcancel` listener that resets transform | 3 min |
| **P1** | `src/ui/StoryMapView.ts:597–601` `src/ui/NodeActivitySheet.ts:180–186` | Mixed mouse+touch model on same elements (mousedown/mouseup + touchstart/touchend). On Android Chrome in desktop-site mode and Samsung DeX, `mousedown` fires after `touchend` as a compatibility event — double-fires press visual | Cosmetic double-animation on non-standard Chrome modes; main phone usage is unaffected | Migrate both callsites to pointer events (`pointerdown/pointerup/pointerleave/pointercancel`) to match `domUtil.attachPressFeedback` pattern | 15 min |
| **P2** | `src/react-app/App.tsx:48` `src/ui/StoryMapView.ts:229` `src/react-app/components/KeySentencesSheet.tsx:62` | `WebkitOverflowScrolling: 'touch'` (3 occurrences) — deprecated since iOS 13.0 (2019). In iOS 15+ causes stacking context promotion; overscrolling inside these containers can clip `position: fixed` overlays (GameHUD, BottomNav) | KeySentencesSheet overlay clip on iPhone 15+ during rapid scroll momentum | Remove property; modern iOS handles momentum scrolling natively. Add `overscroll-behavior: contain` where needed instead | 5 min |
| **P2** | `src/audio/tts.ts:518` | `window.addEventListener('pointerdown', unlockOnce, { capture: true })` — missing `passive: true`. `pointerdown` is not a scroll-blocking event, but Chrome DevTools may warn under strict audits | Lighthouse audit noise | Add `passive: true` | 1 min |
| **P2** | `index.html:22–23` | `<meta name="description">` still reads "A cozy after-work English game. CEFR A2 cloze challenges paired with a stray cat's journey home." — sunset copy post B.231 pivot (target audience now 8-12 children / family). Also affects Android Chrome "Add to Home Screen" card and Play Store listing if submitted | Misaligned brand/description for new audience on every Android Chrome install prompt | Update to children-first tagline aligned with B.231: "奶奶的睡前英文小故事 · Grandma's bedtime English stories for kids 8-12" | 2 min |

---

## D. Bundle / build health

Build: **✓ clean** — 23/23 tests pass, 0 warnings.

| Chunk | Raw | Gzip |
|-------|-----|------|
| react | 140 KB | 45 KB |
| zod | 56 KB | 13 KB |
| index (app core) | 48 KB | 15 KB |
| LessonPage | 27 KB | 8 KB |
| react-router | 20 KB | 8 KB |
| index.css | 24 KB | 6 KB |
| zustand | 2 KB | 1 KB |
| **Total gzip** | | **~96 KB** |

Well within 400 KB gzip budget. No new warnings from rolldown build pipeline.

---

## E. Top 5 P0

1. ⚠️ **`style.css` — Missing `overscroll-behavior: none` on `html, body`** (`src/style.css:118`)
   - Pull-to-refresh on Android Chrome silently reloads the page and destroys mid-lesson progress for every non-PWA browser user.
   - Fix: `html, body { overscroll-behavior: none; }` — 1 line.

2. ⚠️ **`App.tsx:40` — non-passive `touchstart` on document**
   - Blocks Chrome scroll thread until handler returns; Lighthouse flags it; `unlockOnce` never calls `preventDefault()` so passive is safe.
   - Fix: `{ once: true, passive: true }`.

3. **`domUtil.ts:47` — `attachPressFeedback` missing `setPointerCapture`** (7 callsites)
   - Android Chrome fires `pointerleave` after ~1px drag, releasing the 3D press visual and potentially mis-routing the `pointerup` click to an adjacent button. Core lesson flow relies on ClozeUI answer buttons (via direct pointer events) but 7 other surfaces are affected.

4. **`StoryMapView.ts:601` — paw `touchend` missing `touchcancel` + non-passive**
   - Interrupted gestures leave the banner paw permanently depressed.

5. **`index.html:23` — stale "after-work" description meta**
   - Android Chrome install banner and Lighthouse SEO audit both surface this copy. Post-B.231 pivot it actively contradicts the children's app positioning.
