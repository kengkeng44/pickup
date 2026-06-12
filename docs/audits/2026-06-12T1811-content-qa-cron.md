# Content QA — 2026-06-12 18:11 UTC

Today's angle: **#5 — A3 語意 leak (story 跳針) · Narrative Coherence & Continuity**
Focus: **Ch15–21 deep pass · Ch0/1/2 spot-check · Corpus-wide tense-register scan**

> A3 定義: 問題設計跳過故事語境 (story 跳針) 類型:
> - **TENSE**: 章節使用時態與語料庫不一致 (corpus tense mismatch)
> - **HOOK-REPEAT**: ending hook 句與同 lesson 先前句子逐字相同 (verbatim within-lesson repeat)
> - **ORPHAN-HOOK**: hook teaser question 在下一 lesson 未被解答 (unanswered expectation)
> - **Q-MOTIVATION**: 問題正確答案誤導學習者理解角色動機 (misleading character motivation)
> - **LOCAL-TENSE**: 同章節 hook 句時態切換未與敘事主體一致
> - **TEMPORAL-GAP**: lesson 之間時間跳躍未明確標示

---

## A. validate-lessons.js result

```
WARN ch1.json: 3 issues  
WARN ch16.json: 1 issue  
WARN ch19.json: 4 issues  
WARN ch21.json: 10 issues  
(+ ch27/28/29/30/31 for ongoing R1_SUBSTRING from prev cycles)

Total mirror-lint issues: 69 (warn-only)
CI gap: A3 narrative-coherence checks not covered by current lint at all.
```

**Tense-register scan result (new A3 dimension):**

| Ch | narrations | past_hits | pres_hits | dominant | flag |
|----|-----------|----------|----------|----------|------|
| 0  | 18 | 2 | 2 | PRES | ✅ expected (ABC intro) |
| 1  | 41 | 29 | 2 | PAST | ✅ |
| 2  | 42 | 38 | 2 | PAST | ✅ |
| 15 | 35 | 31 | 3 | PAST | ✅ |
| 16 | 42 | 24 | 4 | PAST | ✅ |
| 17 | 42 | 29 | 6 | PAST | ✅ |
| 18 | 42 | 31 | 6 | PAST | ✅ |
| 19 | 35 | 27 | 6 | PAST | ✅ |
| **20** | **35** | **1** | **30** | **PRES** | **⚠️ P0 — only chapter with present dominant** |
| 21 | 35 | 29 | 5 | PAST | ✅ |

> Method: regex-based past/present auxiliary + regular verb check on all `type:"narration"` sentences.
> Ch20 is the **sole outlier** in the entire corpus: 30/35 present-tense narrations vs 1 past-tense.
> Every neighbouring chapter (Ch19, Ch21) + full corpus uses past tense as dominant register.

---

## B. Violation table

| Sev | Q ID | type | sentence (excerpt) | violation | 修法 | audio regen? |
|-----|------|------|--------------------|-----------|------|-------------|
| **P0** | kt-ch20-all | TENSE | "Grandpa plants a small turnip seed in his garden." + 34 more | Entire Ch20 (35 narrations) uses present tense; corpus standard = past. Child moving Ch19→Ch20→Ch21 loses temporal grounding. | Rewrite all 35 narrations to past tense ("planted", "walked", "called"). Cumulative change: ~35 sentences. | Yes — all Ch20 narration MP3s |
| **P0** | kt-ch21-l5 last | Q-MOTIVATION | "Anansi looked down at him and held out a long, strong rope." | Correct option: **"to lift the leopard up safely"** — wrong. Anansi's TRUE goal is capture/trick. explanationZh reinforces wrong framing: "要把豹安全拉上來". Child misses the trickster-hero core theme. | Change correct option to **"to trick the leopard out of the hole"**; update explanationZh: "推理:Anansi 目標是抓豹 — 繩子是陷阱,不是幫忙。故事主題是智勝強者。" | No |
| P1 | kt-ch19-l1 | HOOK-REPEAT | "Across the water he saw a tall tree full of sweet ripe fruit..." (hook narration) | Verbatim repeat of listen-mc sentence earlier in same lesson: "Across the water he saw a tall tree full of sweet ripe fruit." Hook differs only by trailing "..." — learner hears identical sentence twice in same lesson. | Replace hook with fresh bridging sentence: "Sang Kancil stood very still. He needed a clever plan." | No |
| P1 | kt-ch16-l3 | ORPHAN-HOOK | "A tiny boy in a rice bowl, going to the big city. Who will he meet on the way?" | Hook explicitly asks "Who will he meet?" but L4 opens "After many days, Issun reached the great city." — journey entirely skipped, question never answered. Creates unmet expectation in child reader. | Either (A) add brief bridging narration in L4: "On the river he passed fishermen and herons. But he did not stop." OR (B) change hook to: "A tiny boy in a rice bowl, going to the big city. What waits for him there?" (replaces unanswerable tease with open curiosity). | No |
| P1 | kt-ch16-l1 | LOCAL-TENSE | "The old couple smile and cry with joy. What kind of child will he be?" (final hook narration) | Rest of Ch16 = past tense. Hook switches abruptly to present tense commentary. While hook-present is used across chapters, this sentence has a mid-sentence present-tense pronoun reference ("will he be") that may confuse A2 learners. | Standardise to: "The old couple smiled and cried with joy. What kind of child would he grow to be?" | No |
| P1 | kt-ch17-l5 | TEMPORAL-GAP | Hook: "His hand moved slowly toward the door of the room." → L6 opens: "One cold midnight, the old man could not wait." | L5 ends with the old man's hand reaching the door (implying imminent action), but L6 opens at "One cold midnight" — suggesting a separate night. Ambiguous whether the reaching-gesture in L5 was aborted and re-tried later. | Clarify L6 opening: "That same cold midnight, the old man could not wait any longer." (removes ambiguity: same night, continuous action). | No |
| P2 | kt-ch16-l4 | PRONOUN | "Issun stood up on the princess and watched the road." | "Stood up on" without "shoulder" is ambiguous for non-native readers. Could be parsed as standing ON her in adversarial sense. | Rewrite: "Issun stood on the princess's shoulder and watched the road." | No |
| P2 | kt-ch18-l7 | CTX-ASSUME | "All his old treasures turned to dust too." | "Old treasures" refers to Nolbu's pre-story wealth (the house, rice, cows from L1), but this is not recently established. A2 learners 6 lessons later may not recall the connection. | Add small anchor: "All his old things — the big house, the rice, the cows — turned to dust too." | No |

---

## C. Stats

- Lessons audited: 49 lessons (Ch15–21 × 7 + Ch0/1/2 × 3 + corpus tense scan)
- A3 violations found: **8 total** (2 P0 · 3 P1 · 3 P2)
- New lint coverage gap: **A3_TENSE_DRIFT** not in CI at all (Ch20 would have been caught day-1)
- Narrative voice / pacing improvements (3 required): covered by P0/P1 fix proposals above + additional pacing notes in §E.

---

## D. Top 5 P0 (ranked by child-learner impact)

### #1 ⚠️ kt-ch20-all — Tense Register Mismatch (P0)
**Chapter 20 (The Enormous Turnip) uses present tense throughout while the entire corpus uses past tense.**

Child learner flow: Ch19 (Sang Kancil, past) → Ch20 ("Grandpa plants a seed...") → Ch21 (Anansi, past). The sudden tense shift breaks narrative immersion and removes the "once upon a time" felt sense that A2 children rely on for story framing. Affects **35 narration sentences** and all corresponding MP3 audio cues.

**Fix**: Batch-rewrite Ch20 narrations to simple past:
```
"Grandpa plants a small turnip seed" → "Grandpa planted a small turnip seed"
"Every morning, he gives the seed water" → "Every morning, he gave the seed water"
(etc., 35 sentences)
```
Audio regen required for all affected Ch20 narration entries.

---

### #2 ⚠️ kt-ch21-l5 — Anansi Rope Motivation (P0)
**Correct answer "to lift the leopard up safely" is factually wrong as story motivation. Anansi intends to CAPTURE the leopard.**

This is not a subtle nuance error. The story's educational theme is "small + clever > big + strong" (trickster archetype). If the comprehension question frames the rope as genuine rescue, the learner misses the entire moral pivot. The L6 opening confirms this: the leopard arrives as a CAPTURED animal before the Sky God — not as Anansi's grateful friend.

**Fix**:
```json
"options": [
  "to play tug-of-war with him",
  "to trick the leopard out of the hole",
  "to tie his own shoes tightly",
  "to draw a line on the ground"
],
"correctIndex": 1,
"explanationZh": "推理: Anansi 目標是「捉豹」交給天神 — 繩子是陷阱，『幫你上來』是謊言。這就是智者勝強者的故事核心。"
```

---

### #3 kt-ch19-l1 — Hook Verbatim Repeat (P1)
**The lesson-ending hook narration is character-for-character identical to a listen-mc sentence in the same lesson.**

listen-mc entry: `"Across the water he saw a tall tree full of sweet ripe fruit."`
Hook narration: `"Across the water he saw a tall tree full of sweet ripe fruit..."`

The only difference is a trailing `...`. In the Duolingo Stories audio-driven UX, the learner **hears the sentence spoken twice** with no narrative progress. This flattens the lesson's forward momentum.

**Fix**: Replace hook narration with: `"Sang Kancil stood very still. He needed a clever plan."`
This preserves mystery, introduces the problem-solving theme, and doesn't repeat audio already heard.

---

### #4 kt-ch16-l3 — Orphaned Hook Question (P1)
**Hook asks "Who will he meet on the way?" but the journey is entirely elided in L4.**

The hook creates a specific anticipation (meeting someone on the river) that the story never fulfils. For 8-12 children who remember the hook cliffhanger, this creates a small but real sense of being misled.

**Fix (option B, lower-impact)**: Change hook from "Who will he meet on the way?" to "What waits for him in the great city?"
This replaces the unfulfilled promise with an open-ended curiosity that IS answered (the lord's house, the princess, the demon).

---

### #5 kt-ch17-l5 — Temporal Ambiguity Hook→Open (P1)
**L5 ends with old man's hand reaching for the door; L6 opens with "One cold midnight" as if on a different night.**

For A2 learners, "One cold midnight" could suggest a completely different scene from the reaching-gesture cliffhanger. The story is more powerful if the continuity is clear (same night, same moment, he finally gave in).

**Fix**: Change L6 opening narration from "One cold midnight, the old man could not wait." to "That same cold midnight, the old man could not wait any longer."

---

## E. Narrative Voice / Pacing — 3 Improvements (no-violation category)

1. **Ch20 "calling chain" pacing** (L2–L7): Each lesson follows an identical structural beat: character calls → helper arrives → all pull → still stuck. By L5 (dog), the pattern is fully predictable. Suggest varying sentence structure for the call moments — e.g., L6 dog's call: "The little dog barked three times at the wall. 'Cat! We need one more!'" — adds energy without changing story content.

2. **Ch21 L2 Nyame's laugh** (narrative voice): "Nyame looked down and laughed at the small spider." — "laughed at" is a somewhat harsh English verb for 8-year-old learners (implies mockery). Consider "Nyame looked down and smiled slowly, like he had heard this before." — preserves the power dynamic while modelling a richer nuance word.

3. **Ch19 L7 closing hook** (lesson ending): The final hook "We must not believe every voice from the side of the river." is spoken by the big crocodile. But this is L7 (the closing lesson). The story ends on the antagonist's internal lesson, not the protagonist's triumph. Suggest adding one more sentence after this: "Sang Kancil patted his full belly. A smart head is better than a big body." — closes on Kancil's POV and echoes his L7 own statement for narrative symmetry.

---

## 🔬 Architecture Recommendation (對齊業界 2026) — ARCH-REC #27

### Background: Industry tense-consistency in ELT story apps (2026 scan)

**Research signals found:**
- **AutoCrit / writing-craft consensus (Butte College, A Research Guide 2026)**: "Unexpected or inconsistent shifts in tense can be confusing for readers and disrupt the flow of a story." Consistent-tense narration is treated as a hard constraint in levelled-reader design.
- **Duolingo Stories design (from Duolingo Design blog)**: Stories use consistent past-tense narration for immersive flow; present tense is reserved for direct speech or UI chrome only.
- **Children's story comprehension research (ScienceDirect 2024–2025)**: Characters' goal-motivation alignment in narrative Q design is critical for children's causal inference. Misleading motivation framing (correct answer names the false cover story rather than true motivation) degrades comprehension outcomes.
- **PMC / digital storytelling EFL (2026)**: Online digital storytelling significantly enhances authentic listening engagement when narrative continuity is maintained.

### Gap identified

Current `tools/validate-lessons.js` checks R1/R2/mirror/option-list-bias but has **zero A3 narrative-coherence checks**. The Ch20 tense mismatch (P0) existed since content generation with no automated detection path. Manual audit found it only via corpus-wide regex scan in this cycle.

### Proposed: A3_TENSE_DRIFT lint rule

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|------------|--------|-----|---------|
| Per-chapter tense-register fingerprinting for narration sentences | AutoCrit / Butte College verb-tense consistency | ✅ Direct fit — corpus has clear PAST dominant register; Ch0 exemption for foundational | S · 30min | ⭐⭐⭐ catches Ch20 P0 immediately | **SHIP** |
| Motivation-framing cross-check (Q answer vs story arc) | Children's narrative comprehension research (ScienceDirect 2024) | 🟡 Partial — needs human seed list of "trick/deception" story beats to flag for review | M · 1hr | ⭐⭐ | **SEED as manual checklist first** |
| Orphan-hook detection (hook contains "?" → check next lesson opens with resolution) | Duolingo Stories cliffhanger convention | 🟡 Partial — regex-detectable for "?" hooks; resolution check needs semantic match | M · 2hr | ⭐⭐ | **BACKLOG** |

### Concrete implementation (A3_TENSE_DRIFT — S)

In `tools/validate-lessons.js`, after existing R1/R2 checks per lesson, add a per-chapter post-pass:

```js
// A3_TENSE_DRIFT: narration tense register per chapter
const pastPattern = /\b(was|were|had|said|came|went|saw|heard|felt|thought|looked|walked|ran|did|began|grew|knew|found|took|made|gave|stood|put|sat|lay|fell|told|asked|called|turned|held|lived|built|caught|reached|tried|got|cut|jumped|flew|cried|picked)\b/i;
const presPattern = /\b(is|are|has|says|comes|goes|sees|hears|feels|thinks|looks|walks|runs|does|begins|grows|knows|finds|takes|makes|gives|stands|puts|sits|lies|falls|tells|asks|calls|turns|holds|lives|builds|catches|reaches|tries|gets|cuts|jumps|flies|cries|picks|plants)\b/i;
const TENSE_EXEMPT_CHAPTERS = ['ch0']; // foundational ABC/numbers — present OK

function checkTenseDrift(chapterId, lessons) {
  if (TENSE_EXEMPT_CHAPTERS.some(x => chapterId.includes(x))) return;
  const narrs = lessons.flatMap(l => l.questions.filter(q => q.type === 'narration').map(q => q.sentence));
  const past = narrs.filter(s => pastPattern.test(s)).length;
  const pres = narrs.filter(s => presPattern.test(s) && !pastPattern.test(s)).length;
  const total = narrs.length;
  if (total > 0 && pres / total > 0.6) {
    issues.push(`${chapterId}: A3_TENSE_DRIFT (present-dominant ${pres}/${total} narrations — expected PAST)`);
  }
}
```

**Files to change**: `tools/validate-lessons.js` only (1 file, ~20 lines). No `src/` changes, no `lessons-ch*.json` changes.
**Lint target**: `A3_TENSE_DRIFT` warn-only (same level as existing `X2_OPTION_LIST_BIAS`).
**Immediate catch**: Ch20 would flag on next CI run.

### Cockpit entry

ARCH-REC #27 · S · 30min · ROI ⭐⭐⭐ — `A3_TENSE_DRIFT` lint in `validate-lessons.js`

---

*Audit complete. 2 P0 · 3 P1 · 3 P2 · 3 pacing improvements · 1 ARCH-REC.*
*Sources consulted: Butte College verb-tense consistency guide · AutoCrit tense consistency docs · Duolingo Design blog (brand-narrative) · ScienceDirect children's narrative comprehension (2024–2025) · PMC digital storytelling EFL (2026).*
