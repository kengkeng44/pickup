# Content QA — 2026-07-18 18:10 UTC

**Today's angle:** A5 — Cultural Reference (presupposition / annotation leakage / story-arch mismatch)
**Focus:** Ch25–32 (Yu Gong / Archimedes / Journey to West / Three Kingdoms / Odyssey / Heracles / Robin Hood / Merlin)
**Chapters scanned:** Ch25–Ch32, 664 scored questions, 59 lessons

---

## A. validate-lessons.js result

```
Build: PASS (no fatal errors)
Total mirror-lint issues: 440 (warn-only)

Ch25: 16 issues (X2_OPTION_LIST_BIAS ×2, X49_STIMULUS_REUSE ×4, X49B ×3, X57_ANTONYM_PAIR_MIRROR ×3)
Ch26: 17 issues (X2 ×2, X49 ×1, X49B ×7, X57 ×4)
Ch27: 17 issues (R1_SUBSTRING ×2, X2 ×4, X3 ×2, X48 ×1, X49 ×3, X49B ×3)
Ch28: 22 issues (X2 ×7, X48 ×1, X49 ×1, X49B ×8, X57 ×4)   ← 2nd highest
Ch29: 19 issues (R1_SUBSTRING ×1, X2 ×3, X3 ×1, X48 ×1, X49 ×4, X49B ×5, X57 ×4)
Ch30: 22 issues (R1_SUBSTRING ×1, X2 ×2, X3 ×2, X46_TF_POLARITY ×1, X49 ×2, X49B ×9, X57 ×1)
Ch31: 25 issues (R1_SUBSTRING ×1, X2 ×4, X3 ×1, X48 ×2, X49 ×4, X49B ×10, X57 ×3) ← highest
Ch32: 0 issues (PASS — test-practice chapter)
```

Notable:
- Ch32 is uniquely clean (grammar-drill style, no narrative presuppositions)
- Ch31 has the most lint issues of any chapter scanned; X49B stimulus-reuse dominates
- Ch30-l4 has X46_LISTEN_TF_POLARITY: 75% Yes answers (acquiescence bias)

---

## B. A5 Violation Table

| Severity | Ch | Q ID | Type | Snippet | Violation | 修法 | Audio regen? |
|----------|-----|------|------|---------|-----------|------|-------------|
| **P0** | 28 | l1–l2 (all) | narration/tap-pairs/emoji-pick | "今晚要講諸葛亮借箭的故事" | **STORY-ARCH-MISMATCH**: L1-L2 vocab intro promises 草船借箭 (arrow/boat/fog/straw vocab) but L3-L7 story is 三顧茅廬 (bamboo house / Liu Bei visits / snow / patience). Zero content overlap between vocab intro and actual story. Child learns "arrow, straw, fog, night" then hears about "Liu Bei rode up the spring hill." | Replace L1-L2 vocab with 三顧茅廬 set: visit/bamboo/hill/snow/wait/wise/respect + re-narrate intro to 三顧茅廬 frame. | Yes — narration MP3 for l1 intro |
| **P1** | 25 | kt-ch25-l7-q4 | listen-tf | "They watched the small family for many quiet days." | `A5-EXPL-CULTURAL-ANNOT`: expl uses "天神慢慢看" — "天神" (divine beings) not in sentence; story deliberately uses neutral "they / kind giants" | Change "天神慢慢看" → "那些天上的巨人慢慢觀察" | No |
| **P1** | 25 | kt-ch25-l7-x2 | comprehension | "Then, kind giants from the sky came down…" | `A5-EXPL-CULTURAL-ANNOT`: expl says "是天神來幫忙了!" — re-frames story's neutral "kind giants" as 天神 (divine myth frame). Child may think cultural myth knowledge is required. | Change "是天神來幫忙了" → "這些天上的善良巨人來了！" | No |
| **P1** | 25 | kt-ch25-l7-x3 | listen-tf | "They were moved by the family's hard work…" | `A5-EXPL-CULTURAL-ANNOT`: expl says "是天神被感動了才來幫" — "天神" annotation not from story text | Change to "是那些善良的巨人被感動了" | No |
| **P1** | 25 | kt-ch25-l7-x7 | comprehension | "They were moved by the family's hard work and strong heart." | `A5-EXPL-CULTURAL-ANNOT`: expl "讓天神感動的是那份努力和堅強" — same 天神 drift | Change "天神" → "天上的巨人" | No |
| **P2** | 28 | kt-ch28-l1-ep1 | emoji-pick | "Which one is an arrow?" | `A5-EXPL-FORWARD-REF`: expl says "諸葛亮用稻草人借了十萬支箭" — forward reference to 草船借箭 episode (entirely different story not in this chapter's narrative arc) | Remove 草船借箭 content from vocab explanation; if 三顧茅廬 arch is kept, rewrite to "箭的英文是 arrow 🏹！" only | No |
| **P2** | 28 | kt-ch28-l1-ep2 | emoji-pick | "Which one shows fog?" | `A5-EXPL-FORWARD-REF`: expl "諸葛亮選了一個大霧的夜晚行動" — fog is a 草船借箭 concept, not in 三顧茅廬 story | Same as above — remove or replace with neutral gloss | No |
| **P2** | 27 | kt-ch27-l6-q3 | listen-mc | "Only his head and one arm could move from the heavy stone." | `R1_SUBSTRING` (linter confirmed): correct option "only his head and one arm" is verbatim substring of sentence. Additionally: options all begin with the same pattern (X2_OPTION_LIST_BIAS "only") | Paraphrase correct option: "just his head and one hand were free" | Yes — no audio needed (comprehension) |
| **P2** | 31 | kt-ch31-l4-q3 | listen-mc | "They nailed a yellow paper on Robin's front door…" | `R1_SUBSTRING` (linter confirmed) + X3: correct option = "on Robin's front door" verbatim | Paraphrase: "pinned to his home entrance" | No |
| **P2** | 31 | kt-ch31-l5-q3 | listen-mc | "The trees were tall, much taller than any church in the town." | `X48_NGRAM_VERBATIM_CORRECT`: 3-gram "taller than any" overlaps sentence | Paraphrase: "higher than the tallest town building" | No |

---

## C. Stats

| Metric | Value |
|--------|-------|
| Chapters scanned | Ch25–Ch32 (8 chapters) |
| Scored questions | 664 |
| Lessons | 59 |
| True A5-P0 violations | 1 (story-arch mismatch Ch28) |
| True A5-P1 violations | 4 (天神 annotation pattern Ch25-l7) |
| True A5-P2 violations (new) | 5 |
| Pre-existing lint violations (Ch25-32) | 138 (across 7 chapters; Ch32=0) |
| Chapters with R1_SUBSTRING | Ch27, Ch29, Ch30, Ch31 |
| Chapters clean | Ch32 only |
| Ch28 l1–l2 story/vocab mismatch | 100% wrong episode |

---

## D. Top 5 P0 / P1

1. ⚠️ **P0 — Ch28 STORY-ARCH-MISMATCH**: Lessons l1–l2 vocab intro says "今晚要講諸葛亮借箭的故事" and teaches arrow/boat/fog/straw vocabulary (草船借箭 episode). Actual story l3–l7 is entirely different: 三顧茅廬 (Liu Bei's three winter visits to Zhuge Liang's cottage). Zero vocabulary overlap. Every child who completes vocab intro will be confused by story start. **Severity: Critical continuity break — vocab intro and story are from two different Three Kingdoms episodes.**

2. **P1 — Ch25-l7 天神 annotation (×4)**: Story text deliberately uses "kind giants from the sky" (culturally neutral, A2-appropriate). Four explanationZh entries reframe this as "天神" (divine beings / sky god frame). Risk: child learns that "kind giants" = "天神" as a cultural fact rather than the story's simpler framing. Affects: kt-ch25-l7-q4, -x2, -x3, -x7.

3. **P1 — Ch27-l6-q3 R1_SUBSTRING**: Correct option = verbatim copy of sentence content. Combined with X2_OPTION_LIST_BIAS (all options start "only..."). Dual linter hit confirms real R1 + selection-bias risk.

4. **P1 — Ch31-l4-q3 R1_SUBSTRING**: Correct option "on Robin's front door" copies directly from sentence. Easiest question in the chapter — trivially detectable by string match, not comprehension.

5. **P1 — Ch30-l4 listen-tf polarity**: 75% Yes answers (4/4 in lesson l4 — linter X46). Children learn to guess "Yes" on listen-tf in this lesson, defeating comprehension purpose.

---

## E. Narrative Voice / Pacing Improvements (3 required)

1. **Ch28 l7 ending resolution**: When Zhuge Liang finally opens the door ("The door opened, and a tall man in a grey robe stepped out"), the explanation opportunity is underused. "諸葛亮終於和劉備面對面" is factual but flat. Suggest: "三次寒冷的旅途——換來的就是這個時刻。門打開了！" (Three cold journeys — for this one moment. The door opens!) to honor the emotional payoff.

2. **Ch27 l7 Wukong reveal pacing**: The chapter ends "Master, my name is 孫悟空 (Sun Wukong)." This is a massive narrative reveal for children who may know Sun Wukong from popular culture. Current explanations are neutral. Suggest adding a brief forward-teaser to the final explanation: "孫悟空出場了！他有 72 種變身術——在接下來的故事裡，你還會看到更多奇蹟！" to build excitement for future chapters.

3. **Ch25 l6 "mountains vs family" contrast pacing**: The climactic argument (mountains don't grow, but family does forever) is well-written but explanations for q6 and x4 both cover the same contrast twice without escalating emotional register. The second pass (x4) should heighten grandma's emotional appreciation — e.g., "愚公說完這句話，那個路人走開了，因為他無話可說。這個道理，深到沒有反駁。" instead of restating the contrast.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### Research

**Source 1**: *Cultural and Topic Bias in Generating Children's Stories* (EMNLP 2025, ACL Anthology) — Found that LLM-generated children's stories frequently introduce cultural frames (divine beings, mythology labels) that are inconsistent with the neutral vocabulary used in the story text itself. The paper recommends a "cultural frame consistency gate": the glossary/explanation layer must stay within the vocabulary register of the primary narrative layer, not introduce higher-order cultural labels.

**Source 2**: Schema theory (Carrell 1987; Keshavarz 1988; *Impact of Cultural Schemata on EFL Reading Comprehension*, IJLLS 2022) — When a question's explanation introduces a cultural schema that isn't activated in the story text, A2 learners experience "schema interference": they try to activate prior cultural knowledge that isn't available, failing to locate the answer in the text itself. This is the exact pattern seen in Ch25-l7 (天神 vs "kind giants").

**Source 3**: *Multiple-Choice Item Distractor Development Using Topic Modeling* (PMC 6524712) — Best-practice: distractors and explanations should source vocabulary from the same domain as the passage, not from external domain knowledge. Cross-domain vocabulary in explanations (e.g., 草船借箭 facts in a 三顧茅廬 vocab intro) functions as a misleading schema prime.

### Applicability to Pickup Architecture

Pickup: React 18 + Zod schema + JSON lesson files + Web Audio API. Lesson structure: `l1–l2` vocab intro → `l3–l7` story + Q&A. Each lesson JSON has `type: narration` sentences establishing the cultural frame, and `explanationZh` attached to each scored question.

**The gap**: No lint gate ensures that `explanationZh` stays within the cultural vocabulary established by the chapter's `narration` sentences. The two failures discovered today (天神 drift in Ch25-l7; 草船借箭 mismatch in Ch28-l1) are both undetectable by current linters.

### Recommendation

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|-------------|--------|-----|---------|
| **X174: Cultural Frame Consistency Gate** — lint rule: for each `listen-mc` / `comprehension` Q, collect the chapter's `narration` sentences as a "frame vocabulary set"; if `explanationZh` contains a proper noun or cultural term NOT in that frame set (or its established i18n glossary), emit WARN. | EMNLP 2025 + Schema Theory | ✅ 高適合 — Pickup narration 已建立故事 frame；explanationZh 是 additive 層。實作：`tools/validate-lessons.js` 加 phase 2 scan，用 narration 文字建 character/concept set，掃 explanationZh 的 OOV proper nouns。 | Medium (3–4 hr) | High — catches 天神 drift + 草船借箭 前向參照，系統性防止新 content 同類錯誤 | ✅ 推薦實作 |
| **X175: Story-Arch Schema Map** — l1 narration explicitly declares `storyName: "三顧茅廬"` or similar; validator asserts that vocab intro words appear in at least one `sentence` of l3+ lessons. | Schema pre-activation literature | ✅ 適合 — 現有 JSON 結構支援加欄位；可在 LessonSchema Zod 加 optional `storyName` field，validator 做 cross-lesson vocab coherence check。 | Low (1–2 hr) | High — directly prevents Ch28 class of story-arch mismatch | ✅ 強烈推薦 |

**ARCH-REC ID for cockpit**: X174 + X175

---

*Audit by Claude Code automated cron — 2026-07-18 18:10 UTC*
*Angle A5 (Cultural Reference) × Ch25–32*
