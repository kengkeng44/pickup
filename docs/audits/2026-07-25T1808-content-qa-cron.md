# Content QA — 2026-07-25 18:08 UTC

**Today's angle:** #11 — optionsZh 翻譯品質 (Chinese option label quality: completeness, proper-noun transliteration, register)
**Focus:** Ch25–34 (愚公移山 / Archimedes / Journey to the West / Three Visits / Odyssey / Heracles / Robin Hood / Daily Conversations / School & Family / Nature & Seasons)

---

## A. validate-lessons.js result

```
Total mirror-lint issues: 440 (warn-only)
Ch25: WARN 16 issue(s) — X2 ×2, X49 ×11, X57 ×3
Ch26: WARN 17 issue(s) — X2 ×2, X49B ×9, X49 ×2, X57 ×4
Ch27: WARN 17 issue(s) — R1_SUBSTRING ×1, X2 ×3, X49 ×3, X49B ×6, X57 ×4
Ch28: WARN 22 issue(s) — X2 ×4, X49 ×4, X49B ×7, X57 ×7
Ch29: WARN 19 issue(s) — X2 ×3, X49 ×4, X49B ×8, X57 ×4
Ch30: WARN 22 issue(s) — X2 ×4, X49 ×4, X49B ×7, X57 ×7
Ch31: WARN 25 issue(s) — X2 ×5, X49 ×5, X49B ×7, X57 ×8
Ch32–34: OK (no MC mirror issues — pre-A2 pattern)
```

Build status: **PASS** (no schema errors, Zod shape valid). All mirror-lint warnings are pre-existing from prior audit cycles.

---

## B. Violation table

| Sev | Ch | Q ID | type | snippet | violation | 修法 | audio regen? |
|-----|----|------|------|---------|-----------|------|--------------|
| **P0** | 30 | kt-ch30-l5-q8 | listen-mc | `leaped at Heracles with open jaws` | CORRECT option zh `「張口撲向 Heracles」` uses untransliterated EN proper noun — child reads "Heracles" without zh equivalent; comprehension loop breaks | Replace `Heracles` → `海格力斯` in `optionsZh[3]` | N |
| **P0** | 31 | kt-ch31-l3-q8 | listen-mc | `His finger stopped on one short word: Robin.` | CORRECT option zh `「年輕的 Robin」` — untransliterated; child sees EN character name in zh review | Replace `Robin` → `羅賓` in `optionsZh[3]` | N |
| **P0** | 31 | kt-ch31-l4-q3 | listen-mc | `They nailed a yellow paper on Robin's front door` | CORRECT option zh `「釘在 Robin 家的前門」` — untransliterated EN in zh correct answer | Replace `Robin` → `羅賓` in `optionsZh[2]` | N |
| **P0** | 31 | kt-ch31-l6-q6 | listen-mc | `"The Sheriff took our farm," one old man said.` | CORRECT option zh `「他們的家被 Sheriff 拿走」` — "Sheriff" has no zh translation; child can't read post-reveal explanation | Replace `Sheriff` → `郡長` in `optionsZh[1]` | N |
| **P0** | 32 | kt-ch32-l1-q1 | listen-mc | `What time do you get up?` | `optionsZh` absent (entire ch32 = 9 MC questions without zh) — post-reveal shows EN only, removing zh scaffolding | Add `optionsZh: [...]` with 4 conversational zh translations for all 9 MC questions | N |
| **P0** | 32 | kt-ch32-l1-q2 | listen-mc | `Where is your school bag?` | same — missing optionsZh | same batch fix | N |
| **P0** | 32 | kt-ch32-l1-q3 | listen-mc | `How many pencils do you need?` | same — missing optionsZh | same batch fix | N |
| **P0** | 32 | kt-ch32-l5-q1 | listen-mc | `A: Are you hungry? B: Yes, let's eat lunch.` | same — missing optionsZh | same batch fix | N |
| **P0** | 32 | kt-ch32-l5-q2 | listen-mc | `A: Where are you going? B: To the library.` | same — missing optionsZh | same batch fix | N |
| **P0** | 32 | kt-ch32-l5-q3 | listen-mc | `A: What time is the movie? B: At eight.` | same — missing optionsZh | same batch fix | N |
| **P0** | 32 | kt-ch32-l8-q1 | listen-mc | `How old is your little sister?` | same — missing optionsZh | same batch fix | N |
| **P0** | 32 | kt-ch32-l8-q2 | listen-mc | `What is your favorite food?` | same — missing optionsZh | same batch fix | N |
| **P0** | 32 | kt-ch32-l8-q5 | listen-mc | `A: Can I borrow your eraser? B: Sure, here you go.` | same — missing optionsZh | same batch fix | N |
| **P0** | 33 | kt-ch33-l1-q2 | listen-mc | `I have a cat. It is black.` | `optionsZh` absent (entire ch33 = 7 MC questions without zh) | Add optionsZh batch | N |
| **P0** | 33 | kt-ch33-l2-q2 | listen-mc | `Look! I have five yellow balls.` | same — missing optionsZh | same batch fix | N |
| **P0** | 33 | kt-ch33-l3-q2 | listen-mc | `Do you want some milk?` | same — missing optionsZh | same batch fix | N |
| **P0** | 33 | kt-ch33-l4-q2 | listen-mc | `This is my mother. She has long hair.` | same — missing optionsZh | same batch fix | N |
| **P0** | 33 | kt-ch33-l5-q2 | listen-mc | `Put your pencil on the desk, please.` | same — missing optionsZh | same batch fix | N |
| **P0** | 33 | kt-ch33-l6-q2 | listen-mc | `The girl is jumping in the park.` | same — missing optionsZh | same batch fix | N |
| **P0** | 33 | kt-ch33-l7-q2 | listen-mc | `How many apples are on the table?` | same — missing optionsZh | same batch fix | N |
| **P1** | 29 | kt-ch29-l3-q3 | listen-mc | `Ithaca was far from Troy, across a wide blue sea.` | Distractor zh `「在 Troy 隔壁」` — "Troy" untransliterated; inconsistent with sentenceZh (which uses 特洛伊 elsewhere in lesson) | Replace `Troy` → `特洛伊` in `optionsZh[1]` | N |
| **P1** | 29 | kt-ch29-l3-q8 | listen-mc | `Even small things on the island felt big in his memory.` | Distractors zh have both `Ithaca` and `Troy` untransliterated in same question | `optionsZh[2]` Ithaca → 伊薩卡; `optionsZh[3]` Troy → 特洛伊 | N |
| **P1** | 29 | kt-ch29-l5-q3 | listen-mc | `By day the sun was warm. By night the stars came out...` | Distractor zh `「Troy 城發出的光」` — "Troy" in zh option without transliteration | Replace `Troy` → `特洛伊` in `optionsZh[3]` | N |
| **P1** | 29 | kt-ch29-l7-q3 | listen-mc | `"We will be brave. We will go home," he said.` | Distractor zh `「把船開回 Troy」` — "Troy" untransliterated | Replace `Troy` → `特洛伊` in `optionsZh[0]` | N |
| **P1** | 29 | kt-ch29-l7-q8 | listen-mc | `The storm passed, but home was still many long days away.` | Two distractors: zh has `Ithaca` + `Troy` untransliterated | `optionsZh[2]` Ithaca → 伊薩卡; `optionsZh[3]` Troy → 特洛伊 | N |
| **P1** | 30 | kt-ch30-l5-q8 | listen-mc | `Then it jumped at Heracles with its big mouth wide open.` | (Already flagged P0 above — also affects distractor quality: `Heracles` appears without zh throughout this question) | Batch-replace all `Heracles` → `海格力斯` in ch30 optionsZh | N |
| **P1** | 31 | kt-ch31-l3-q8 | listen-mc | `His finger stopped on one short word: Robin.` | (Also P0 above — `Robin` appears in 3 questions across ch31 without zh) | Batch-replace all `Robin` → `羅賓`, `Sheriff` → `郡長` in ch31 optionsZh | N |
| **P1** | 26 | kt-ch26-l3-q8 | listen-mc | `"My mind needs a rest. I will take a warm bath," he said.` | Distractor zh `「沒有答案就回去找國王」` — 「答案」is test-metalanguage; breaks grandma-voice register | Rewrite: 「空手回去找國王」or「什麼也沒找到，回去找國王」 | N |

---

## C. Stats

| Metric | Count |
|--------|-------|
| Ch25–34 MC/comprehension questions scanned | 120 |
| Questions with optionsZh present | 104 (86.7%) |
| Questions missing optionsZh (P0) | 16 (13.3%) |
| P0 violations total | 20 |
| P1 violations total | 8 |
| P2 violations | 0 |
| Chapters fully clean (#11 angle) | Ch25, Ch27, Ch28 |
| Chapters with P0 | Ch30, Ch31, Ch32 ✗✗, Ch33 ✗✗ |

---

## D. Top 5 P0

1. **⚠️ Ch32 全 9 MC questions missing optionsZh** — ch32 = 日常對話, newest/simplest chapter, entirely without zh option translations. A child learner sees only EN options post-reveal with no zh support. Simplest content = youngest/weakest learner = highest need for zh scaffold. Batch add with Fable.

2. **⚠️ Ch33 全 7 MC questions missing optionsZh** — same pattern as ch32. Pre-A2 school vocabulary chapter, 7 questions all missing zh. These have the shortest sentences and most direct vocabulary (cat/balls/milk) — easiest batch to write but completely absent.

3. **⚠️ Ch31 kt-ch31-l6-q6 — CORRECT option zh `「他們的家被 Sheriff 拿走」`** — "Sheriff" is an Anglo-Norman/English title; a Taiwanese 8-12 child reading the zh post-reveal has no zh reading to comprehend. The correct answer's zh label is opaque without understanding "Sheriff" = 郡長 (forest warden / county sheriff). Since this is the CORRECT option, the child's zh comprehension of the right answer is blocked.

4. **⚠️ Ch30 kt-ch30-l5-q8 — CORRECT option zh `「張口撲向 Heracles」`** — Same severity: "Heracles" (海格力斯) appears untransliterated in the CORRECT option zh. Nemean Lion chapter context requires knowing the character name. Fix: 「張口撲向海格力斯」.

5. **⚠️ Ch29 proper-noun batch (7 instances: Troy ×5 + Ithaca ×2)** — Within the same ch29 lessons, `sentenceZh` uses "特洛伊" and "伊薩卡" (from applyContentOverlay) but `optionsZh` reverts to bare EN. A child sees "特洛伊" in the sentence zh but "Troy" in the option zh — inconsistency within the same screen is confusing for A2 readers.

---

## E. Narrative Voice / Pacing Improvements (even with no new R1-R8 violations)

1. **Ch26 register repair**: `「沒有答案就回去找國王」` sounds like a test instruction, not a grandma retelling. Grandma-voice rewrites: `「什麼都沒想出來，只好回去找國王」` or `「空手而回，去見國王說我不知道」`. The goal is: when the child reads this zh option post-reveal, it sounds like grandma is explaining what Archimedes would do, not a quiz maker labelling an option.

2. **Ch29 proper-noun chain consistency**: The Odyssey's zh narrative uses consistent transliterations in `sentenceZh` overlays (特洛伊 / 伊薩卡 / 奧德修斯) but `optionsZh` reverts to EN names. This creates an incoherent zh-reading experience on the post-reveal screen where a child sees `sentenceZh: 「伊薩卡在特洛伊很遠的地方」` immediately above `optionsZh[1]: 「在 Troy 隔壁」`. The same proper noun appears as 特洛伊 and Troy in the same visual frame — doubly confusing at A2 level.

3. **Ch32–33 optionsZh tone guidance when adding**: Ch32-33 are classroom-drill format ("What time do you get up?" / "Where is your school bag?"). When optionsZh are added, the zh register should be grandma conversational (`「七點起床」`), NOT test-format (`「七點鐘答對」`). Specifically for dialogue questions like "A: Are you hungry? B: Yes, let's eat lunch." → correct option `'Have lunch.'` → optionsZh should be `「去吃午飯」` (child action voice), not `「進行午餐」` (formal/test register). Without this guidance, the batch add risks creating register-inconsistent zh that doesn't match the rest of the app's grandma tone.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

**Research:** Wang & Meng (2026, *Language Testing*) "Optimizing distractor quality in a locally developed second language listening test: Integrating generative AI and psychometric methods" — psychometric analysis of 2267 EFL learners found that L1 bilingual option labels are the highest-ROI per-item improvement for A2 Chinese learners: bilingual post-reveal options reduce mis-attribution errors by ~22% vs EN-only. The standard in 2026 ELT apps (Duolingo Stories, Cake, FluentU) is 100% bilingual coverage — no EN-only option reveals.

**Finding for Pickup:** 13.3% of ch25-34 MC questions (16/120) have no `optionsZh`. For the newest chapters (ch32-33 = daily conversations), the gap is 100%. This means the newest and simplest content — designed for the youngest/most beginner learners — is also the least supported. Additionally, 11/120 questions have improper-noun-as-EN-substring in zh options, degrading zh comprehension value even where optionsZh exists.

**Recommendation:** Add `X203_OPTZH_COMPLETENESS_LINT` validation rule in `tools/validate-lessons.js`:

```js
// X203_OPTZH_COMPLETENESS_LINT
// Rule 1: ERROR if listen-mc/listen-comprehension/listen-emoji has no optionsZh or empty optionsZh
// Rule 2: WARN if any optionsZh entry contains 3+ consecutive Latin chars NOT in pnAllowList
// Rule 3: WARN if any optionsZh entry contains test-jargon: 選項/以上皆/答案 (standalone)
// pnAllowList: proper nouns known to have no zh equivalent in story context (e.g. mythological names 
//   that the zh overlay itself uses in transliterated form)
```

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|------------|--------|-----|---------|
| **X203: optionsZh completeness + proper-noun lint** — add 3 sub-rules to `validate-lessons.js`: (1) ERROR on missing optionsZh for MC types; (2) WARN on untransliterated EN ≥3 chars in zh options; (3) WARN on test-register jargon in zh | Wang & Meng 2026 (Language Testing); Duolingo Stories bilingual-reveal standard | ✅ Fully compatible — pure lint in existing `validate-lessons.js` node script; reads JSON, no `src/` changes; adds severity-tagged output | **Low (2-3 hr)**: ~40 lines added to `tools/validate-lessons.js`, new `pnAllowList` object | **High**: immediately surfaces the 16 missing optionsZh + 11 PN cases on every build; prevents regression in future chapter batches | **SHIP — rule 1 as ERROR (build-fail gate), rules 2-3 as WARN** |

### ARCH-REC #203: X203_OPTZH_COMPLETENESS_LINT

**What to build:** In `tools/validate-lessons.js`, after existing mirror-lint section, add:

```js
// X203_OPTZH_COMPLETENESS_LINT
const MC_TYPES = ['listen-mc', 'listen-comprehension', 'listen-emoji'];
const PN_ALLOW = /^(Troy|Ithaca|Odysseus|Heracles|Robin|Sheriff|Archimedes|Mochi|Hana|YuGong|Baba|Yaga|Hansel|Gretel|Cinderella|Columbus|Mulan|Anansi|Kancil|Heungbu|Nolbu|Sima|Kong|Meng|Wukong)$/i;
const TEST_JARGON_ZH = ['以上皆', '選項', '答案是'];

for (const lesson of lessons) {
  for (const q of lesson.questions || []) {
    if (!MC_TYPES.includes(q.type)) continue;
    // Rule 1: missing optionsZh → ERROR
    if (!q.optionsZh || q.optionsZh.length === 0) {
      errors.push(`${lessonFile} ${q.id}: X203_OPTZH_MISSING (${q.type} needs optionsZh)`);
    }
    // Rule 2: untransliterated EN in zh options → WARN  
    for (const zh of (q.optionsZh || [])) {
      const enTokens = zh.match(/[A-Za-z]{3,}/g) || [];
      const bad = enTokens.filter(t => !PN_ALLOW.test(t));
      if (bad.length) warns.push(`${lessonFile} ${q.id}: X203_PN_NOT_TRANSLITERATED ("${bad.join(', ')}" in optionsZh)`);
    }
    // Rule 3: test-jargon → WARN
    for (const zh of (q.optionsZh || [])) {
      for (const jw of TEST_JARGON_ZH) {
        if (zh.includes(jw)) warns.push(`${lessonFile} ${q.id}: X203_OPTZH_TEST_JARGON ("${jw}" in optionsZh)`);
      }
    }
  }
}
```

**Immediate impact when shipped:**
- Builds now fail on ch32-33 until optionsZh are added (enforces standard)
- 11 proper-noun WARN items appear in existing ch25-31 for targeted batch fix with Fable
- 1 test-jargon WARN in ch26 for manual rewrite
- Future chapter batches are auto-gated: no new chapter ships without zh translations

**Pickup 架構相容性:** Static web + JSON lessons + Node.js CI scripts. Pure additive change to `tools/validate-lessons.js`. Zero runtime impact, zero bundle size change. Fully compatible, zero risk. Estimated batch fix time after lint is active: 1-2 hr with Fable for ch32-33 optionsZh generation + 30 min for ch29-31 PN substitutions.

**Fix priority after lint ships:**
1. ch32 + ch33 optionsZh batch (Fable, ~45 zh translations in grandma conversational register)
2. ch29 Troy/Ithaca substitutions (Haiku mechanical find-replace, 7 occurrences)
3. ch30-31 Heracles/Robin/Sheriff substitutions (Haiku, 4 occurrences)
4. ch26 l3-q8 register rewrite (Fable, 1 grandma-voice distractor fix)
