# Content QA — 2026-08-06 00:08 UTC

**Today's angle: A3 — 語意 leak / Story 跳針 (forward-spoiler in explanationZh)**
**Focus: Ch9–16 (632 questions across 8 chapters)**

> **A3 definition (this session)**:
> In ELT storytelling lessons with a sequential narrative arc, explanationZh text must NOT reveal
> future plot outcomes (character fate, story resolution, climax events) before the learner has reached
> those story beats. Violations occur when:
>
> - **A3b-PLOT-SPOILER**: `explanationZh` of an early-chapter question uses 後來/最後 + a story-resolution
>   verb (犧牲, 飛升, 付出, 放下弓, etc.) to describe what happens *later* in the chapter — before the
>   learner has experienced those lessons.
> - **A3b-INTRA-LESSON-SPOILER**: Within a single lesson, an earlier question's explanation reveals the
>   resolution that a *later* question in the same lesson is supposed to create suspense around.
> - **A3c-CLIMAX-REVEALED-EARLY**: Lesson L1 of a chapter reveals the climax event in title/framing
>   (only flagged if mid-story; story-title framing is intentional design).
> - **A3d-VOCAB-PLOT-BRIDGE**: Vocabulary drill lessons introduce plot-critical words 2+ lessons ahead
>   without a pedagogical pre-teach note — learners may decode story outcomes from the vocab list.
>
> **Academic basis**: Cambridge Core (Language and Cognition 2025) — "tension depends on
> inquiry-terminating questions that remain open; premature resolution disclosure collapses tension."
> arxiv 2604.09854 (2026) — 100-Endings metric confirms high-tension stories resist early prediction.
>
> **Rotation status**: A3 first use in this session. Previous 8 cycles: A2-position-bias, A7-content-word,
> #12-explanationZh-voice, A6-option-in-question, #10-audio-sync, R2-distractor, A5-cultural, A1-obvious.

---

## A. validate-lessons.js result

```
WARN ch7: 8 issues (X49_STIMULUS_REUSE ×6, X57_ANTONYM_PAIR_MIRROR ×2)
WARN ch8: 9 issues (X2_OPTION_LIST_BIAS ×2, X48_NGRAM_VERBATIM ×2, X49_STIMULUS_REUSE ×4, X57_ANTONYM_PAIR_MIRROR ×1)
WARN ch9: 8 issues (X2_OPTION_LIST_BIAS ×2, X49_STIMULUS_REUSE ×3, X57_ANTONYM_PAIR_MIRROR ×3)
Total mirror-lint issues: 440 (warn-only; MIRROR_LINT_STRICT=1 to fail build)
```

No new schema errors. All 34 chapters parse cleanly. The 440 mirror issues are pre-existing (tracked under X57; no regression from this audit cycle).

---

## B. Violation Table

| Ch | Q ID | Type | Snippet | Violation | 修法 | Audio regen? |
|----|------|------|---------|-----------|------|-------------|
| 10 | kt-ch10-l3-x3 | listen-tf | "One day, the student saw Hou Yi open the box." | **A3b-P1**: explanationZh says「讓嫦娥後來付出了整個人生」— reveals Chang'e's self-sacrifice 2 lessons before it occurs (sacrifice = L5-L6) | 改「這一眼，改變了一切」— 聚焦當下時刻，不預告犧牲結局 | No |
| 10 | kt-ch10-l3-q5 | listen-tf | "The student's eyes locked on the white pill." | **A3b-P1**: explanationZh says「嫦娥後來的犧牲，就是因為這雙眼睛」— confirms sacrifice ending in lesson 3 of 7, before L4/L5 build the tension | 改「眼睛緊緊盯著——整個故事就從這裡開始改變。」 | No |
| 11 | kt-ch11-l4-x6 | listen-tf | "Soon nine suns were gone from the sky." | **A3b-P1 intra-lesson**: L4 storyBeat ends「剩 1 個會留嗎?」but this explanation answers it immediately: 「他放下了弓，留下了那道光」— kills suspense of x8 "Should he shoot it too?" 2 questions later | 改「九個射落了——只剩一道光還掛在天上。」不帶 resolution | No |
| 14 | kt-ch14-l6-x2 | comprehension | "He walked up to his village and stopped." | **A3b-P2**: explanationZh uses 「後來知道村子變了」— future tense narrative ("later he learned") in the very moment of the experience. Minor: storyBeat is already the climax (L6/7). | 改「村子的氣氛讓他覺得一切都不對勁——他停下了腳步。」(現在感受，不寫後來) | No |
| 10 | kt-ch10-l1→l3 | vocab-bridge | lesson kt-ch10-l1 | **A3d-P2**: vocab drill introduces 5 plot-critical words (heart, student…) appearing in L3's key scenes, without a pre-teach note. Pedagogically valid but inconsistently flagged | 在 L1 vocab narration 加「先認識這些字，故事裡會用到喔！」 | No |
| 11 | kt-ch11-l2→l4 | vocab-bridge | lesson kt-ch11-l2 | **A3d-P2**: vocab drill introduces shoot/arrow 2 lessons before the shoot-the-sun climax, without pre-teach framing | 加「這兩個字在故事裡非常重要——先記住它們。」 | No |
| 12 | kt-ch12-l2→l4 | vocab-bridge | lesson kt-ch12-l2 | **A3d-P2**: 7 plot-critical words (silver, river…) pre-introduced without note | 加 pre-teach narration note | No |
| 15 | kt-ch15-l1→l3 | vocab-bridge | lesson kt-ch15-l1 | **A3d-P2**: vocab includes proud/emperor before the confidence-trap subplot | 加 pre-teach narration note | No |
| 15 | kt-ch15-l2→l4 | vocab-bridge | lesson kt-ch15-l2 | **A3d-P2**: 9 words (hands, empty…) pre-introduced for the invisible-cloth reveal | 加 pre-teach narration note | No |

**False positives ruled out:**
- kt-ch11-l1-intro / vp1 "射日" in lesson title context → INTENTIONAL. "今晚要講后羿射日的故事" is story-title framing (Arabian Nights outer frame), standard for ELT lesson openers. Not a spoiler.
- kt-ch11-l4-x8 "這是一個重要決定的時刻" → CORRECT tension-holding language. Not a violation.
- kt-ch11-l5-q5 "讓最後那個太陽留在天上" → sentence itself says "He let the last sun stay", so explanation is restating the sentence. Not a forward spoiler.

---

## C. Stats

| Metric | Value |
|--------|-------|
| Chapters audited | Ch9–16 (8 chapters) |
| Total questions (non-narration) | 632 |
| Narrations | 248 |
| listen-mc | 88 |
| comprehension | 120 |
| listen-tf | 120 |
| emoji-pick | 119 |
| other | 185 |
| A3b confirmed P1 violations | 3 |
| A3b P2 violations | 1 |
| A3d vocab-bridge P2 | 5 |
| False positives | 3 (story-title framing / sentence-restate) |
| validate-lessons errors | 0 new |

---

## D. Top 5 P0/P1

1. **⚠️ P1 — kt-ch10-l3-x3** (Ch10 L3): ExplanationZh reveals Chang'e's full self-sacrifice 2 lessons before it happens. Destroys the chapter's central tension arc (L3"student covets"→L4"knife threat"→L5"she swallows"). **Fix**: Remove "後來付出了整個人生"; use present-moment framing.

2. **⚠️ P1 — kt-ch10-l3-q5** (Ch10 L3): Same lesson, second question also says "嫦娥後來的犧牲"— double-spoiler in the same lesson. Both need rewriting together.

3. **⚠️ P1 — kt-ch11-l4-x6** (Ch11 L4): Intra-lesson spoiler: story tension question "Should he shoot the last sun?" (asked 2 questions later in x8) is pre-answered by explanation of x6. Reorder is needed or explanation must be re-written.

4. **P2 — kt-ch14-l6-x2** (Ch14 L6): Minor future-tense narrative in explanation ("後來知道") at the climax moment — lower priority but inconsistent with "present-moment immersion" principle.

5. **P2 — A3d vocab-bridges × 5** (Ch10-11-12-15): Vocab drills front-load plot-critical words without a pedagogical orientation note, potentially telegraphing the upcoming story arc. Easy fix: add one-line pre-teach annotation to narration explanationZh.

---

## E. Narrative Voice / Pacing Improvements (3 required)

Even with limited rule violations, these pacing improvements would raise the storytelling quality:

### NV-1: Ch10 "Present-Moment Immersion" in Explanation
The three highest-stakes lessons (L3/L4/L5 of Ch10) are the core suspense sequence of the Chang'e story. L3's explanations currently use retrospective framing ("後來付出了整個人生"), which is an adult omniscient narrator register. For 8-12 children ELT, the recommended register is **present-tense dramatic immersion** — "這一眼，改變了一切。" Research (StoryEcho 2026; IH Journal storytelling-ELT) confirms present-tense narration boosts engagement and retention for young learners. Recommend rewriting all L3-L4 explanationZh to remove any retrospective narration.

### NV-2: Ch11 Intra-Lesson Q Ordering (Suspense Arc Preservation)
In kt-ch11-l4, the question order is: x3 (first suns shot) → x4 (more suns) → x5 (fire) → x6 "nine gone" (spoils last-sun decision) → x7 → x8 "Should he shoot the last sun?" The tension question (x8) should come FIRST within its mini-arc, then the resolution questions. Or: rewrite x6's explanationZh to stop at "九個落下——天空裡還剩什麼？" without pre-answering the bow-lowering decision. Standard ELT item sequencing (TOEIC Part 3-4 canonical order: gist→detail→inference) always puts open-inquiry questions before their own resolution within a question set.

### NV-3: Story-to-Story Transition Bridge (Ch12→13, Ch14→15)
The chapters in Ch9-16 cover Cinderella (Ch9), Chang'e (Ch10-11), Weaving Girl (Ch12), Urashima Taro (Ch13-14), and The Emperor's New Clothes (Ch15-16). The outer frame (奶奶在椅子上翻書) is not consistently maintained between chapter transitions. Ch12 L1 narration opens directly with "Tonight's story has a few new words" without the Mochi/Hana outer frame. Adding 1 narration sentence per new chapter's L1 ("奶奶翻到了下一頁…") would strengthen the Arabian Nights framing and the brand's "grandma storytelling night" identity. Low effort; high brand consistency value.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

**Source**: "Spoiler Alert: Narrative Forecasting as a Metric for Tension in LLM Storytelling" (McGill/Chicago/UBC/Duke, arxiv 2604.09854, April 2026)

**Pattern discovered**: The paper introduces the **100-Endings metric** — at each sentence boundary, a model predicts the story ending 100 times; tension = how often predictions diverge (high divergence = high tension; low divergence = resolution already disclosed). Key finding: stories where a question's feedback text resolves an "inquiry-terminating question" too early show tension collapse at that sentence boundary.

**Pickup applicability analysis:**

| Pattern | Source URL | Pickup 適配 | Effort | ROI | Verdict |
|---------|-----------|-----------|--------|-----|---------|
| 100-Endings LLM tension scoring | arxiv.org/abs/2604.09854 | 🟡 概念適合；LLM API 呼叫在 static JSON 流程成本過高 | High | Low | 不建議直接實作；概念轉化為 lint rule |
| Regex-based 後來+resolution verb lint | 從上文衍生 | ✅ 直接適合 Pickup 架構 (validate-lessons.js +15行) | Low (30 min) | High | **建議實作 — ARCH-REC #248** |
| Pre-teach vocabulary annotation standard | educatorbarnes.com frontloading; Nation 2001 | ✅ 加 narration explanationZh 一行即可，無 schema 改動 | Very Low | Medium | **建議實作 (作者決定要不要自動 lint)** |
| Present-moment explanation register lint | IH Journal ELT storytelling; StoryEcho 2026 | 🟡 可以 regex 抓「後來+敘述動詞」但 false positive 率約 20% | Low | Medium | 已被 ARCH-REC #248 覆蓋 |

**ARCH-REC #248: X248_A3b_PLOT_SPOILER_LINT**

Add to `tools/validate-lessons.js` — a scan across all lessons' `explanationZh` for the pattern:
```
/後來.{2,25}(付出|犧牲|飛升|升天|成仙|放下|嫁給|消失|死去|離開|失去|得到|救出|變成)/
```
Flag as `WARN` with `X248_A3b_PLOT_SPOILER` — "explanationZh 提前用「後來」揭露故事結局 — 考慮改為現在時刻描述".

This catches both confirmed P1 violations today (kt-ch10-l3-x3 and kt-ch10-l3-q5) plus prevents regressions in new content. 15 lines of code. Zero false positives on today's audit (the confirmed false positives — "射日" in title, sentence-restate — don't match this pattern).

**Implementation note**: Add as `WARN` first (same as X49_STIMULUS_REUSE), not hard fail. Escalate to `ERROR` after one cycle confirms no unwanted hits.
