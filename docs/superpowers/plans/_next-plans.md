# Pickup v2.0 — Remaining Plans (post Plan 1)

> **Plan 1 status**: ✅ SHIPPED 2026-05-29 (Phase A+B complete, v2.0 live at https://pickupwords.pages.dev/).
>
> See `2026-05-29-pickup-v2-phase-A-B-ch1-prototype.md` for the executed plan and `../specs/2026-05-29-pickup-duolingo-nested-redesign.md` for the spec.

After Plan 1's Ch1 prototype ships and you validate the Duolingo-nested model 體感, run these:

## Plan 2 — Ch2 桃太郎 content
- 24 lessons (~120 Q), 累積連鎖體 (main story expanded 9-12 lessons)
- Aesop sides: 龜兔賽跑 (3-4 L) + 狼來了 (3-4 L)
- Pattern: copy Plan 1's content tasks (11-17) substituting Ch2 storyBeats + segmentType per chapter
- File: `public/lessons-ch2.json`

## Plan 3 — Ch3 醜小鴨 content
- 24 lessons, 第一人稱內心獨白 (Andersen)
- Aesop sides: 獅子與老鼠 + 牧羊人與狼
- File: `public/lessons-ch3.json`

## Plan 4 — Ch4 龜兔賽跑 (升 main)
- 24 lessons, 對話體
- Aesop sides: 烏鴉與狐狸 + 城市鼠與鄉村鼠
- File: `public/lessons-ch4.json`

## Plan 5 — Ch5 駱駝為什麼有駝峰
- 24 lessons, Kipling "O Best Beloved" 第二人稱
- Aesop sides: 蘆葦與橡樹 + 老鼠開會
- File: `public/lessons-ch5.json`

## Plan 6 — Ch6 Baba Yaga 雞腳屋
- 24 lessons, 黑暗民俗 sparse (Russian PD)
- Aesop sides: 漁夫與妻子 + 七張床
- File: `public/lessons-ch6.json`

## Plan 7 — Ch7 六隻天鵝
- 24 lessons, 無對話詩意 narration (Grimm cold-cut)
- Aesop sides: 三個願望 + 老鼠新娘
- File: `public/lessons-ch7.json`

## Plan 8 — Ch8 葉限
- 24 lessons, 雙語 code-switch 中英混雜 (中華 PD 灰姑娘原型)
- Aesop sides: 田螺姑娘 + 嫦娥奔月
- File: `public/lessons-ch8.json`

## Plan 9 — Phase D polish + ship v2.0
- Map UX polish (24 nodes visual density, cat sprite V2 positioning)
- ClozeUI refactor to consume discriminated `Question` types (collapse dual ClozeQuestion / Question type system; remove `as unknown as` casts at sentences.ts:156, storyKitten.ts:140)
- StoryQuestionSchema extend shared `PermissiveQuestionShape` (collapse 27-line duplication)
- Encapsulate `as unknown as ClozeQuestion` casts into named helper
- Add negative-path + tap-pairs + roundtrip tests for sentences.ts schema
- catName / dogName `import.meta.env.PROD` guard on `_clearLessonCacheForTests` (Plan 1 review Minor #2)
- DEV_UNLOCK_ALL = false verification + paywall stub (Ch1-2 free, Ch3+ locked, UI only — no IAP)
- Retire ChapterIntroScene / ChapterEndScene / StoryEndingScene (replaced by lesson-internal narration)
- Cross-chapter SRS pool wiring
- LessonScene init() async race UX (preload + loading state)
- Bundle code-split for catName / dogName (resolve INEFFECTIVE_DYNAMIC_IMPORT warnings)
- Final build budget verification (< 1.6 MB raw / 500 KB gzip)
- v2.0 official ship commit + CLAUDE.md final pass

## Plan 10 — iOS App Store (Phase 2.5)
- Capacitor + Codemagic cloud build
- IAP wiring (RevenueCat or native Apple IAP)
- App Store Connect submission
- See `project_pickup_ios_distribution` memory for path B locked decisions

---

Each of Plans 2-8 is a content-batching plan. Plan 9 is polish + ship. Plan 10 is iOS.
Each can be executed by autonomous loop (typically 1-2 overnight runs per chapter).

Plan 1 took ~6 hours of real wall time for ~22 commits (subagent-driven + occasional direct edits when budget tight). Plans 2-8 should be lighter — content patterns established, no schema/UI work.
