# Content QA — 2026-06-02 12:08 UTC

Today's angle: **#11 — optionsZh 翻譯退品質 (Chinese Translation Quality of Answer Options)**
Focus: **Ch6 (Baba Yaga / Vasilisa), Ch7 (六隻天鵝 / Six Swans), Ch8 (葉限 / Ye Xian)**

Rationale: Ch6–8 contain culturally complex folklore (Russian, Grimm, Tang Chinese) with rich vocabulary. AI-generated optionsZh is most likely to exhibit semantic drift, wrong measure words, and grammar register errors in these chapters. First audit to cover Ch6–8 optionsZh specifically.

---

## A. validate-lessons.js result

```
WARN lessons-ch1.json: 31 lint issue(s)
WARN lessons-ch2.json: 52 lint issue(s)
WARN lessons-ch3.json: 85 lint issue(s)
WARN lessons-ch4.json: 83 lint issue(s)
WARN lessons-ch5.json: 63 lint issue(s)
WARN lessons-ch6.json: 59 lint issue(s)
WARN lessons-ch7.json: 44 lint issue(s)
WARN lessons-ch8.json: 65 lint issue(s)

Total mirror-lint issues: 482
(warn-only; set MIRROR_LINT_STRICT=1 to fail build)
```

All 8 chapters pass schema. Lint issues are X2_OPTION_LIST_BIAS / X1_SENTENCE_IS_QUESTION / X3_R1_VERBATIM_WORDS — carryover from previous batches, not new regressions.

---

## B. Violation Table

**Scope:** 228 MC/cloze questions across Ch6 (76), Ch7 (65), Ch8 (87). All optionsZh arrays present (100% coverage). Deep manual review of L3–L8 per chapter + targeted scans.

| Ch | Q ID | Type | Sentence (snippet) | Violation | 修法 | Audio regen? |
|----|------|------|-------------------|-----------|------|--------------|
| 8 | kt-ch8-l8-q2 | listen-mc | "Under the 月光 its scales **shine enjoy shiny yellow**." | **P0 BROKEN_GRAMMAR** — "shine enjoy shiny yellow" is not English; optionsZh all meaningless in context | Rewrite sentence: "Under the 月光 its scales shine like gold." | yes |
| 8 | kt-ch8-l9-q5 | listen-mc | "The fish swims up because **it sureness in someone** the gown." | **P0 BROKEN_GRAMMAR** — "it sureness in" is not English; options/optionsZh correctly pair "it trusts the dress → 它相信那件洋裝" but sentence breaks A2 readability | Rewrite: "The fish swims up because it trusts the gown." | yes |
| 8 | kt-ch8-l10-q2 | listen-mc | "She kills the fish and **fixes up food it** for evening meal." | **P0 BROKEN_GRAMMAR** — "fixes up food it" is syntactically broken | Rewrite: "She kills the fish and cooks it for the evening meal." | yes |
| 8 | kt-ch8-l10-q5 | listen-mc | "Ye Xian's bowl tonight is empty **as expected style**." | **P0 BROKEN_GRAMMAR** — "as expected style" is non-standard | Rewrite: "Ye Xian's bowl tonight is empty, as always." | yes |
| 8 | kt-ch8-l11-q1 | listen-mc | "Ye Xian weeps at the **with nothing 池** in the dark." | **P0 BROKEN_GRAMMAR** — "at the with nothing 池" breaks syntax; 池 should anchor the code-switch, not be buried | Rewrite: "Ye Xian weeps at the empty 池 in the dark." | yes |
| 7 | kt-ch7-l5-q2 | listen-mc | "The king hid the boys in a **forest matter**." | **P0 BROKEN_GRAMMAR** — "forest matter" is not English (likely corruption of "forest" or "the woods") | Rewrite: "The king hid the boys in the wood." | yes |
| 7 | kt-ch7-l9-q1 | listen-mc | "She walked deep into the **forest matter**." | **P0 BROKEN_GRAMMAR** — same corruption as above | Rewrite: "She walked deep into the forest." | yes |
| 8 | kt-ch8-l1-q3 | listen-mc | "I jump on the low wall **single more time**." | **P0 BROKEN_GRAMMAR** — "single more time" should be "one more time" | Rewrite: "I jump on the low wall one more time." | yes |
| 6 | kt-ch6-l4-q2 | listen-mc | "Her stepmother is very chilly to her." | **P1 optionsZh SEMANTIC CONTRADICTION** — correct option is `cold → 冷` but explanationZh explicitly says "cold 在這裡是「冷淡的」,不是溫度冷". The zh translation `冷` means physical cold, contradicting the lesson's own teach point. | Change optionsZh[correct] from `冷` → `冷淡` to match explanationZh | no |
| 6 | kt-ch6-l5-q4 | listen-mc | "Her mother said, 'Give food it and it will help.'" | **P1 optionsZh WRONG MEANING** — distractor `hide it → 躲它`; `躲它` means "dodge/avoid it" (intransitive), not "conceal something" (transitive). Different semantic class. | Change `躲它` → `把它藏起來` | no |
| 8 | kt-ch8-l9-q1 | listen-mc | "The stepmother sees the pond friend from a window." | **P1 optionsZh WRONG MEASURE WORD** — all 4 options use `那個` as universal classifier: `那個牆`/`那個路`/`那個月亮`/`那個魚`. Correct Chinese: 那**道**牆 / 那**條**路 / 那**條**魚 (月亮 is fine). Teaching wrong Chinese grammar to learners. | Fix: `那個牆→那道牆`, `那個路→那條路`, `那個魚→那條魚` | no |
| 7 | kt-ch7-l5-q2 | listen-mc | "The king hid the boys in a forest matter." | **P1 FACTUAL ERROR in explanationZh** — expl says "wood = 森林(古英文同 forest)". "Wood" meaning forest is **modern British English**, not Old English (古英文). Misinformation. | Fix expl: "wood = 森林，英式英文常這樣說，古英文不太一樣" | no |
| 7 | kt-ch7-l7-q1 | listen-mc | "Six swans flew high into the sky." | **P2 optionsZh WRONG ASPECT MARKER** — all 4 options use `-過` suffix: `騎過/跑過/升起過/滾過`. `過` in Chinese marks "experiential past" (有過這個經歷), wrong for simple narrative past tense. This is the story's climactic moment, not a reflection. | Remove `過` suffix: `騎/跑/升起/滾` | no |
| 6 | kt-ch6-l7-q6 | listen-mc | "Why does she still go?" | **P2 optionsZh MISALIGNED** — correct option is `the family needs fire → 那個家人需要火`. (a) "那個" before 家人 is unnatural for one's own family. (b) explanationZh says "she has no choice" — different motivation than the option. | Fix: `那個家人需要火 → 家裡需要火`; align expl with option | no |
| 7 | kt-ch7-l6-q2 + kt-ch7-l7-q2 | listen-mc | L6: "Feathers grew on their arms." / L7: "Their feathers shone in the light." | **P2 DISTRACTOR RECYCLING** — both questions share identical distractor set `fingers/flowers/fences` (ozh: `手指/花/圍籬`). Player who answered L6 can pattern-match without reading L7. | Replace ≥2 distractors in L7-q2: e.g. `wings → 翅膀`, `frost → 霜` | no |
| 7 | kt-ch7-l8-q2 | listen-mc | "She would not stay there." | **P2 MIXED OPTION FORMAT** — correct `no → 不` and distractor `yes → 是` are bare yes/no; other distractors `she sang → 她唱了` / `she slept → 她睡了` are full narrative phrases. Inconsistent grammatical register within same option set. | Either make all options bare (no/yes/maybe/later) OR all full phrases. | no |

---

## C. Stats

| Category | Count |
|----------|-------|
| Total MC/cloze Qs scanned | 228 |
| P0 broken-grammar sentences | **8** |
| P1 optionsZh semantic/factual errors | **4** |
| P2 optionsZh register/format issues | **4** |
| **Total violations** | **16** |
| optionsZh coverage (has zh / has opts) | 100% (228/228) |
| Duplicate zh translations | 0 |
| Near-duplicate zh (sim > 0.85) | 0 |
| Translation inconsistency (same EN → different ZH) | 0 |
| Audio regen required | **8 sentences** |

---

## D. Top 5 P0

1. ⚠️ **kt-ch8-l8-q2** — "shine enjoy shiny yellow" is unintelligible. Learner cannot parse sentence to guess correct answer. Breaks lesson trust. Fix + regen.

2. ⚠️ **kt-ch8-l9-q5** — "it sureness in someone the gown" is word salad. Correct answer `it trusts the dress` is answerable only by elimination. Fix + regen.

3. ⚠️ **kt-ch7-l5-q2 + kt-ch7-l9-q1** — "forest matter" appears in both Ch7 lessons, suggesting systematic AI corruption of a phrase. Likely source: "forest" + hallucinated "matter" from a different context. Fix both + regen.

4. ⚠️ **kt-ch8-l9-q1 (measure word)** — `那個牆/那個路/那個魚` teaches incorrect Chinese classifiers to A2 learners. Chinese measure words are a known acquisition pain point; wrong examples are worse than no translation. Fix optionsZh (no regen needed).

5. ⚠️ **kt-ch6-l4-q2 (semantic contradiction)** — The correct option zh `冷` directly contradicts the explanationZh which says "不是溫度冷". Learner reads both, gets confused. Fix optionsZh to `冷淡` (no regen needed).

---

## E. Narrative Voice Improvements (required even with P-level violations)

**NV-1: kt-ch8-l10-q5 — `一切如常` register too formal**
- Current zh: `nothing as usual → 一切如常`
- `一切如常` is a literary/news-register phrase ("everything as usual" formal). A2 learner app should use spoken register.
- Better: `nothing as usual → 跟往常一樣什麼都沒有` or simply `還是什麼都沒有`
- The emotional core (Ye Xian's empty bowl, every night) is better served by the spoken form.

**NV-2: kt-ch7-l8-q2 — narrative question breaks immersion**
- "She would not stay there" — sentence is a statement of fact. Asking "would she stay? no/yes" forces the learner to answer a question whose answer is given in the sentence itself.
- Better question type: change to cloze or change sentence to "She ___ leave the empty house." with options `had to / wanted to / refused to / forgot to`
- Preserves the emotional beat (loneliness driving the decision) while testing comprehension.

**NV-3: Ch8 code-switch design — CJK anchor pattern**
- Ch8 intentionally embeds 19 CJK code-switch words (月光, 金魚, 唐朝, etc.) — design intent confirmed from CLAUDE.md.
- Current pattern is inconsistent: sometimes CJK is bolted mid-sentence with broken English around it (`at the with nothing 池`), sometimes it's clean (`Under the 月光 its scales shine...`).
- Recommendation: establish a canonical code-switch syntax rule for Ch8: `[English clause], the [CJK] [English continuation]`. E.g. "She looks at the pond — the 池 — but it is empty now." This preserves the bilingual spirit while keeping each English clause grammatically complete.

---

*Auditor: Claude (claude-sonnet-4-6) | Angle #11 optionsZh 翻譯退品質 | 2026-06-02 12:08 UTC*
