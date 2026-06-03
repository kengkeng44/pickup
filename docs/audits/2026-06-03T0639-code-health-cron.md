# Code Health — 2026-06-03 06:39 UTC

Today's angle: **Accessibility WCAG 2.1 AA**
Focus layer: ARIA semantics, keyboard navigation, color contrast, focus management, screen-reader feedback

---

## A. Recent commits
```
fa9fa3d v2.0.B.cron-ui: 2026-06-03-0608 angle: Duolingo Streak/League gamification
62f22fa ⚠️ v2.0.B.cron-content: 2026-06-03-0606 angle: A4-mirror-patterns
fb31dda v2.0.B.205: ID 全面對齊 chapter 編號 + audio 跟進 rename
3830940 v2.0.B.204: Ch1 (rainy-night-cat) 刪除 + Ch2-8 renumber 成 Ch1-7
2836ec2 v2.0.B.203: Intro 章節分離 + lesson-head 22px amber 反身
b0905ef v2.0.B.cron-ui: 2026-06-03-0308 angle: Instagram Reels thumb-reach
5b5f8b3 v2.0.B.202: grammar v2 scan + 3 Chinglish phrasing fix
```

---

## B. Signal (counts per angle)

| Metric | Count | Note |
|--------|-------|------|
| `aria-label` usages | 80 | many icons properly hidden; several interactive callsites verified |
| `aria-live` regions | 3 | ClozeUI revealPanel / WordHint tooltip / ModeMenu dismiss |
| Buttons with text but NO `aria-label` | ~8 callsites | ModeMenu cards, main.ts consent — have textContent but no ARIA overrides |
| Progress bars missing `role=progressbar` | 1 | GameHUD progressTrack/progressFill |
| Dialogs missing `aria-labelledby` | 2 | KeySentencesSheet (React) + openKeySentences (DOM) |
| `aria-current` on active nav tab | 0 | BottomNav.tsx — active tab indicated only visually |
| Color-contrast failures | 3 | accent (#b88660) as text, white-on-accent, text-soft |
| Lesson feedback — color-only | 2 screens | LessonScene + ClozeUI both flip colors with no aria announcement |
| `*:focus{outline:none}` relying solely on `:focus-visible` | 1 | Safari < 15.4 falls back to no indicator |

---

## C. Hot path bug risk table

| Pri | File:line | Issue | Risk | 修法 | Effort |
|-----|-----------|-------|------|------|--------|
| **P0** | `src/scenes/LessonScene.ts:485-489` + `src/ui/ClozeUI.ts:470-475` | MC answer feedback is **color-only** — button bg/border/color flip to green/red but zero `aria-live` announcement. Screen-reader users hear nothing on tap. | WCAG 1.4.1 (Use of Color) + 1.3.3 failure; blind users literally can't play | Add 1 hidden `aria-live="assertive"` region per lesson view; push `"Correct!"` / `"Wrong, try again"` text into it on each answer tap | 30 min |
| **P0** | `src/react-app/components/BottomNav.tsx:29` | Active nav tab is indicated only by `borderTop` color + `translateY`. No `aria-current="page"` on active `<button>`. Screen readers can't tell which tab is selected. | WCAG 4.1.2 Name/Role/Value — essential for nav orientation | Add `aria-current={active ? 'page' : undefined}` to each tab button | 5 min |
| **P1** | `src/react-app/components/KeySentencesSheet.tsx:49-52` | `role="dialog"` present but: (a) no `aria-labelledby` pointing to the "Key Sentences" heading; (b) no focus auto-move into dialog on open; (c) no focus trap — Tab can escape dialog. | WCAG 4.1.2 + 2.1.2 (No Keyboard Trap / reverse: focus can leak *out* of modal) | Add `aria-labelledby="ks-title-id"`, `useEffect(() => closeRef.current?.focus(), [])`, and a Tab/Shift-Tab keydown trap | 45 min |
| **P1** | `src/ui/GameHUD.ts:310-331` | `progressTrack / progressFill` divs with no `role="progressbar"`, no `aria-valuenow`, `aria-valuemin`, `aria-valuemax`. Screen readers announce nothing when lesson advances. | WCAG 4.1.2 — lesson progress invisible to SR | Set `role=progressbar`, `aria-valuemin=0`, `aria-valuemax=100`, update `aria-valuenow` in `updateProgress()` at line ~597 | 10 min |
| **P1** | `src/react-app/pages/ProfilePage.tsx:28` | Cat-name `<input>` has no `<label>` and no `aria-label`. Placeholder `"貓咪名字"` is not a substitute per WCAG 1.3.1. | WCAG 1.3.1 Info and Relationships — SR users don't know what the field is | Add `aria-label="貓咪名字 Cat name"` to the input | 2 min |
| **P1** | `src/ui/TapInputUI.ts:303-305` | type-what-you-hear `<input type="text">` has only `placeholder="Type here…"` — no `aria-label` or associated `<label>`. | WCAG 1.3.1 | Add `input.setAttribute('aria-label', 'Type what you hear')` after line 305 | 2 min |
| **P2** | `src/style.css:196-197` | `*:focus { outline: none }` relies 100% on `:focus-visible` support. Safari < 15.4 (released Oct 2022) gets **zero** focus indicator for keyboard users. Target audience includes Taiwanese users on older iPhones. | WCAG 2.4.7 Focus Visible — SR+keyboard users on Safari 14/15.0-15.3 get no focus ring at all | Either add `:focus-visible` polyfill (1 KB) or change rule to `*:focus:not(:focus-visible) { outline: none }` which is equivalent and works on older browsers | 5 min |
| **P2** | `src/style.css` CSS vars (computed contrast) | `--pickup-accent (#b88660)` used as text color (e.g. StoryModeScene score count, ChapterEndScene title) on `--pickup-bg (#faf5ed)`: **2.92:1** — fails both AA normal (4.5:1) AND large-text (3:1) thresholds. `--pickup-text-soft (#8a7864)` on bg: **3.91:1** — fails AA normal text. | WCAG 1.4.3 Contrast (Minimum) | For accent-as-text swap to `--pickup-accent-dark (#7a4f1f)` on bg: estimated ~6.5:1. For text-soft bump to `--pickup-text-muted (#6b5848)` (6.21:1). | 20 min (token rename + scan) |
| **P2** | `src/ui/ModeMenu.ts:155-156` scenario cards | White text on `COLOR_AMBER (#e7a44a)` background for **secondary** scenario cards (18px weight-800 text): **3.17:1**. 18px = 13.5pt — just below WCAG "large text" threshold (14pt bold), so AA requires 4.5:1. Currently fails. Primary CTA card uses 22px (= 16.5pt, qualifies as large) — passes at 3.17:1. | WCAG 1.4.3 — secondary scenario pick buttons fail | Either darken card bg to `COLOR_AMBER_DARK (#b07a2a)` for secondary cards (white on #b07a2a ≈ 5.4:1) or use `COLOR_TEXT_DARK (#3d2817)` text instead of white | 15 min |

---

## D. Bundle / build health

```
dist/assets/react-9SDNQsEM.js     139.84 kB │ gzip: 45.34 kB
dist/assets/index-CNIPX8S7.js     47.57 kB │ gzip: 15.32 kB
dist/assets/zod-Cohpjn9R.js       56.50 kB │ gzip: 12.93 kB
dist/assets/react-router-BM6lXbF0.js  19.90 kB │ gzip:  7.51 kB
dist/assets/LessonPage-Da8suCV4.js    23.25 kB │ gzip:  6.69 kB
Total JS gzip: ~90.7 KB  │  CSS gzip: 5.51 KB  │  Grand total: ~98 KB gzip
```

Build: ✅ clean (23 tests pass, 0 warnings).

---

## E. Top 5 P0 / P1

### P0-1: MC feedback color-only — no screen-reader announcement
`src/scenes/LessonScene.ts:485` / `src/ui/ClozeUI.ts:470`

Both screens flip button colors green/red but push nothing to an `aria-live` region. Blind users tap, hear nothing, have no way to know if they were right. WCAG 1.4.1 + 1.3.3 failures.

Fix: one hidden `<div aria-live="assertive" class="sr-only">` per lesson mount; after each answer push `"正確 Correct!"` or `"答錯 Wrong — try again"` into it.

---

### P0-2: BottomNav no `aria-current`
`src/react-app/components/BottomNav.tsx:29`

Active tab conveys state only via colour + 2px border-top. Screen reader users navigating by tab/arrow have no way to know which page they're on.

Fix: `aria-current={active ? 'page' : undefined}` on each tab `<button>`. One line.

---

### P1-3: KeySentencesSheet dialog — no label, no focus trap
`src/react-app/components/KeySentencesSheet.tsx:49-52`

`role="dialog"` needs (a) `aria-labelledby` tied to the heading, (b) focus moved to the Close button on open via `useEffect`, (c) Tab/Shift-Tab loop contained inside. Current state: focus stays on whatever triggered the sheet; Escape/Tab can wander outside.

---

### P1-4: Progress bar missing `role="progressbar"`
`src/ui/GameHUD.ts:310-331`

The lesson progress track is a styled `<div>` with no ARIA semantics. SR users can't tell how far through a lesson they are.

Fix: `progressTrack.setAttribute('role', 'progressbar')` + `aria-valuemin/max/now` + update `aria-valuenow` inside `updateProgress()`.

---

### P1-5: `*:focus{outline:none}` with no polyfill
`src/style.css:196`

The global focus removal relies 100% on `:focus-visible`, which Safari shipped in 15.4 (Oct 2022). Users on iPhone 6s/7/SE 1st-gen (max iOS 15.8, Safari 15.3) get **zero keyboard focus ring** anywhere in the app. The fix is a 1-line CSS change with zero behaviour change on modern browsers:

```css
/* change: */
*:focus:not(:focus-visible) { outline: none; }
/* instead of: */
*:focus { outline: none; }
```
