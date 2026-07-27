# ⚠️ Content QA — 2026-07-27 18:05 UTC

**Today's angle:** A7 — Content-Word Repetition (correct option shares 2+ distinctive tokens with sentence stem; surface-matching shortcut without comprehension)
**Focus:** Ch25–34 (愚公移山, Archimedes, Journey to the West, Three Visits, Odyssey, Heracles, Robin Hood, Ch32-33 grammar, Nature & Seasons)
**Auditor:** cron-content-qa automated session
**Trigger:** 10 P0 violations found — ⚠️ prefix applied to commit

---

## A. validate-lessons.js result

```
Total mirror-lint issues: 440
(warn-only; set MIRROR_LINT_STRICT=1 to fail build)
```

All existing lint codes pass. No NEW schema errors introduced. A7 violations are not yet caught by existing lint — this is the gap this audit exposes.

---

## B. Violation Table

> A7 definition (per pickup-q-design-standard-v1.md §Anti-patterns):
> Correct option shares 2+ distinctive content tokens (non-stopword, 3+ chars, or cardinal number / proper noun) with the sentence stem AND has a 2+ token advantage over the best-overlapping distractor.
> **P0** = 3+ shared tokens, advantage ≥2. **P1** = 2 shared tokens, advantage ≥1.
> Ch33 grammar-drill questions (simple Q&A echo format) are noted but scored P1-exempt in isolation — see note below table.

| Ch | Q ID | type | sentence (truncated) | question | correct option | shared tokens | sev | 修法 | audio regen? |
|----|------|------|----------------------|---------|----------------|---------------|-----|-----|--------------|
| 26 | kt-ch26-l3-q6 | listen-mc | "They saw his face go thin and his eyes grow dark." | What did his friends notice? | "his face was thin and tired" | face, thin | P1 | → "they saw his cheeks had become hollow, eyes shadowed" | Yes |
| 26 | kt-ch26-l4-q6 | listen-mc | "Most people would have called for a cloth to wipe it up." | What did most people do when bath water spilled? | "ask for a cloth to wipe it" | cloth, wipe | P1 | → "reach for something to mop it dry" | Yes |
| 26 | kt-ch26-l5-q8 | listen-mc | "He felt the kind of happy you feel when a long question finally opens." | How did Archimedes feel? | "as happy as solving a long puzzle" | happy, long | P1 | → "full of joy, the way a hard problem melts away" | Yes |
| **26** | **kt-ch26-l6-q6** | listen-mc | "Beside the crown they placed a piece of **pure gold** of the same **weight**." | What did they put next to the crown? | "**pure gold** of equal **weight**" | **gold, pure, weight** | **P0** | → "a block of solid metal matching the crown exactly" | **Yes** |
| 26 | kt-ch26-l7-q6 | listen-mc | "The big idea came from a **small thing** he saw with care." | Where did the big idea come from? | "careful watching of a **small thing**" | small, thing | P1 | → "paying close attention to something tiny" | Yes |
| **27** | **kt-ch27-l5-q3** | listen-mc | "Five tall **stone** fingers rose into the sky like a **giant hand**." | What did the mountain look like? | "a **giant hand** of **stone**" | **giant, hand, stone** | **P0** | → "five reaching fingers of bare rock" | **Yes** |
| **27** | **kt-ch27-l6-q3** | listen-mc | "Only his **head** and **one arm** could move from the heavy **stone**." | How much of the monkey could move? | "**only** his **head** and **one arm**" | **arm, head, one, only** | **P0** | → "just two small parts of him" | **Yes** |
| 28 | kt-ch28-l4-q3 | listen-mc | "Liu Bei said, 'Today we will **visit** the small house **again**.'" | What did Liu Bei plan to do? | "**visit** that cottage **again**" | again, visit | P1 | → "go back to that same humble house" | Yes |
| 28 | kt-ch28-l4-q8 | listen-mc | "The **same** young **boy** opened the door and gave a small bow." | Who opened the door this time? | "the **same boy** as before" | boy, same | P1 | → "the young lad they had seen before" | Yes |
| 28 | kt-ch28-l5-q6 | listen-mc | "The brother said the wise man was not worth two **visits**, much less three." | What did the brother think? | "he was not worth so many **visits**" | visits, worth | P1 | → "not deserving another trip at all" | Yes |
| 29 | kt-ch29-l3-q6 | listen-mc | "He longed to walk on its warm sand and touch its **old stone** walls." | What did Odysseus want to do? | "feel the beach and the **old stone**" | old, stone | P1 | → "step on the sand and run his hand along the ancient walls" | Yes |
| **29** | **kt-ch29-l3-q8** | listen-mc | "Even **small** things on the island **felt** big in his memory." | What does this tell us about Odysseus? | "every **small** thing **about** home **felt** important" | **about, felt, small** | **P0** | → "he treasured every memory of home, even the tiniest detail" | **Yes** |
| **29** | **kt-ch29-l4-q3** | listen-mc | "The crew **tied** the **ropes** and lifted the white **sails** up high." | What did the crew do first? | "**tied ropes** and raised the **sails**" | **ropes, sails, tied** | **P0** | → "secured the lines and unfurled the canvas" | **Yes** |
| 29 | kt-ch29-l4-q6 | listen-mc | "Slowly the ships moved away from the land and **out into open** water." | Where did the ships go? | "**out into** the **open** sea" | open, out | P1 | → "away from shore toward the deep blue" | Yes |
| **29** | **kt-ch29-l5-q3** | listen-mc | "the stars came out like **soft lights**." | What lit the sky at night? | "**soft lights** from the **stars**" | **lights, soft, stars** | **P0** | → "tiny bright dots spread across the dark" | **Yes** |
| 29 | kt-ch29-l5-q8 | listen-mc | "Day after day the trip felt **easy** and **good**." | How were the first days at sea? | "**easy** and **good**" ← verbatim | easy, good | P1 _(R1 overlap too)_ | → "calm and pleasant, without trouble" | Yes |
| 29 | kt-ch29-l6-q6 | listen-mc | "Some of the men were **scared** and their **hands** shook on the wet wood." | How did some of the men feel? | "**scared**, with shaking **hands**" | hands, scared | P1 | → "gripped by fear, trembling as they gripped the wet wood" | Yes |
| 29 | kt-ch29-l7-q3 | listen-mc | "'We will be **brave**. We will go **home**,' he said." | What did Odysseus tell his men? | "to be **brave** and keep going **home**" | brave, home | P1 | → "to keep their courage and press on toward Ithaca" | Yes |
| 29 | kt-ch29-l7-q8 | listen-mc | "The storm passed, but **home** was **still** many **long** days away." | Were they home now? | "no, they **still** had a **long** way" | long, still | P1 | → "no, many more days of sailing remained" | Yes |
| 30 | kt-ch30-l3-q3 | listen-mc | "He also tied a **sharp sword** to his side with a thick leather belt." | What did Heracles bring? | "a bow and a **sharp sword**" | sharp, sword | P1 | → "a weapon on each side — a bow on his back and a blade at his hip" | Yes |
| 30 | kt-ch30-l4-q3 | listen-mc | "the giant lion lay on warm **rocks**." | Where was the lion? | "resting on **rocks** near a **cave**" | cave, rocks | P1 | → "stretched out on a ledge at the mouth of its den" | Yes |
| 30 | kt-ch30-l4-q6 | listen-mc | "It hit the lion **right** in the **chest**." | Where did the arrow hit? | "**right** in the **chest**" ← near verbatim | chest, right | P1 | → "straight into the centre of its body" | Yes |
| 30 | kt-ch30-l4-q8 | listen-mc | "Both of them **bounced** off too." | What happened to all the arrows? | "all of them **bounced** away" | all, bounced | P1 | → "every arrow sprang off its hide harmlessly" | Yes |
| 30 | kt-ch30-l5-q8 | listen-mc | "Then it jumped at Heracles with its big mouth wide **open**." | What did the lion do next? | "leaped at Heracles with **open** jaws" | heracles, open | P1 | → "charged at him with its mouth stretched wide" | Yes |
| 30 | kt-ch30-l7-q3 | listen-mc | "He wrapped his arms **around** the lion's thick, warm **neck**." | What part of the lion did Heracles grab? | "**around** the **neck**" | around, neck | P1 | → "the thickest part near its head" | Yes |
| 30 | kt-ch30-l7-q8 | listen-mc | "He took the lion's **thick** skin and made it into a warm **coat** for himself." | What did Heracles do with the lion's skin? | "wore it as a **thick coat**" | coat, thick | P1 | → "turned it into armour to wear over his shoulders" | Yes |
| **31** | **kt-ch31-l4-q3** | listen-mc | "They nailed a yellow paper on **Robin's front door**." | Where did they put the paper? | "on **Robin's front door**" ← verbatim | **door, front, robin** | **P0** | → "where anyone who came to his house would see it" | **Yes** |
| **31** | **kt-ch31-l5-q3** | listen-mc | "The trees were **tall**, much **taller than any** church in the **town**." | How tall were the trees? | "**taller than any town** building" | **any, taller, town** | **P0** | → "higher than even the tallest building around" | **Yes** |
| 31 | kt-ch31-l5-q6 | listen-mc | "The forest air smelled **sweet**, like **clean** rain." | What did the forest smell like? | "**sweet** and **clean**" | clean, sweet | P1 | → "fresh and fragrant, like rain on leaves" | Yes |
| **31** | **kt-ch31-l6-q3** | listen-mc | "a **thin** man with a **torn** brown coat." | Who was hiding behind the tree? | "a **thin** man in **torn** clothes" | **man, thin, torn** | **P0** | → "a gaunt figure in ragged clothing" | **Yes** |
| 31 | kt-ch31-l7-q3 | listen-mc | "'No one is alone here anymore.'" | What did Robin promise? | "they would help one another" | help, one | P1 | → "that nobody would face trouble by themselves" | Yes |
| **31** | **kt-ch31-l7-q6** | listen-mc | "every coin we **take**, we will **give** back to **poor** families." | What was Robin's new plan? | "**take** from rich bad men, **give** to the **poor**" | **give, poor, take** | **P0** | → "rob the wealthy and share the coins with those who had nothing" | **Yes** |
| 33 | kt-ch33-l1-q2 | listen-mc | "I have a **cat**. It is **black**." | Choose the best answer. | "The **cat** is **black**." | black, cat | P1-exempt¹ | _(grammar drill — by design; pronoun ref exercise)_ | No |
| 33 | kt-ch33-l7-q2 | listen-mc | "How many **apples** are on the table? There are **six**." | How many apples are there? | "**Six apples**." | apples, six | P1-exempt¹ | _(number-recall drill — by design)_ | No |

¹ **Ch33 grammar drill exemptions**: Ch32–33 are explicit grammar/conversation chapters where the question-answer pair IS the exercise — pronoun reference ("I have a cat. It is black." → "The cat is black.") and number retrieval ("There are six." → "Six apples.") are the TARGET SKILL, not a surface tell. Classifying as exempt.

---

## C. Stats

| Metric | Count |
|--------|-------|
| Questions scanned (listen-mc / comprehension-mc / mc, Ch25–34) | ~320 |
| A7 violations total | 34 |
| — P0 (3+ shared tokens, advantage ≥2) | 10 |
| — P1 (2 shared tokens, advantage ≥1) | 22 |
| — P1-exempt (grammar drill by design) | 2 |
| Chapters most affected | Ch29 Odyssey (9), Ch31 Robin Hood (8), Ch30 Heracles (8) |
| Also P0-flagged by R1 (verbatim substring) | 1 (kt-ch29-l5-q8 "easy and good") |
| Audio regen needed for P0 fixes | 10 questions |
| Audio regen needed for P1 fixes | 22 questions |

---

## D. Top 5 P0 (Highest Priority)

### P0-1: kt-ch29-l5-q3 — Stars as soft lights (Ch29 Odyssey)
- **Sentence**: "By day the sun was warm. By night the stars came out like soft lights."
- **Question**: What lit the sky at night?
- **Correct[0]**: "soft lights from the stars" ← "soft lights" + "stars" lifted verbatim
- **Fix**: "tiny bright dots spread across the dark"
- **Why P0**: 3 shared tokens (lights, soft, stars), advantage 3 over best distractor (0 overlap). Learner can find answer by visual scan with zero listening comprehension.

### P0-2: kt-ch27-l6-q3 — Head and arm (Ch27 Journey to the West)
- **Sentence**: "Only his head and one arm could move from the heavy stone."
- **Question**: How much of the monkey could move?
- **Correct[2]**: "only his head and one arm" ← 4 tokens verbatim (only, head, one, arm)
- **Fix**: "just two small parts of him"
- **Why P0**: Near-exact copy of sentence; effectively R1 violation as well. Zero inference required.

### P0-3: kt-ch31-l4-q3 — Robin's front door (Ch31 Robin Hood)
- **Sentence**: "They nailed a yellow paper on Robin's front door for everyone to see."
- **Question**: Where did they put the paper?
- **Correct[2]**: "on Robin's front door" ← verbatim phrase
- **Fix**: "where anyone who came to his house would see it"
- **Why P0**: Exact three-word proper-noun phrase lifted from sentence. Worst-case A7.

### P0-4: kt-ch31-l6-q3 — Thin man torn coat (Ch31 Robin Hood)
- **Sentence**: "Behind the oak tree was a thin man with a torn brown coat."
- **Question**: Who was hiding behind the tree?
- **Correct[0]**: "a thin man in torn clothes"
- **Fix**: "a gaunt figure in ragged clothing"
- **Why P0**: "thin" + "torn" + "man" = 3 tokens, advantage 3. Distractors use "fat lord", "king's young son", "strong young soldier" — zero overlap with stem.

### P0-5: kt-ch26-l6-q6 — Pure gold of equal weight (Ch26 Archimedes)
- **Sentence**: "Beside the crown they placed a piece of pure gold of the same weight."
- **Question**: What did they put next to the crown?
- **Correct[2]**: "pure gold of equal weight"
- **Fix**: "a block of solid metal matched to the crown"
- **Why P0**: "pure gold" + "weight" = 3 tokens, advantage 3. "equal weight" paraphrases "same weight" but "pure gold" is verbatim lift.

---

## E. Narrative Voice / Pacing Improvements (3 required, zero-violation bonus)

Even without A7 violations, the following pacing issues were observed during manual scan:

1. **Ch29 Odyssey repetitive question openers**: 5 of 8 lessons use "What did Odysseus/the crew/the men [do/feel/say]?" opener back-to-back in consecutive questions. Rotate with "How did… react when", "What caused…", "Which word best describes…" to reduce monotony and increase sub-skill variety (per R6).

2. **Ch30 Heracles — 8 consecutive detail questions, zero inference**: All Ch30 listen-mc questions are literal detail retrieval (subSkill: "detail"). Per R6 spec (≥2 inference per 12-Q lesson), at least 2 should be upgraded: e.g. "What does Heracles's choice to fight with bare hands tell us about him?" → inference level.

3. **Ch31 Robin Hood — explanationZh register slips into adult jargon**: kt-ch31-l7-q6 explanationZh: "這句話表達了羅賓漢的俠盜精神" — "俠盜精神" is adult literary vocabulary. For 8-12 target: "羅賓漢要把從壞人那裡拿到的錢，還給窮人家——這就是他的計劃".

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### Background research

**Sources consulted:**
- Redalyc (2022/2023): *Differential Length and Overlap with the Stem in Multiple-Choice Item Options: A Pilot Experiment* — confirms items where the key overlaps lexically with the stem are consistently **easier and less discriminating** (lower item-total correlation). [redalyc.org/journal/6137/613765677005](https://www.redalyc.org/journal/6137/613765677005/html/)
- *Good Multiple-Choice Item Writing Rules* (archived HubSpot CDN): Rule 7: "Do not use a cue word in both the stem and the keyed answer." [cdn2.hubspot.net MC Rules PDF](https://cdn2.hubspot.net/hub/166710/file-22031963-pdf/docs/good_multiple_choice_item_writing_rules.pdf)
- *Distractor Plausibility in Synonym-Based Vocabulary Tests* (Ludewig et al. 2023): plausible distractors must be falsifiable **only through construct-relevant reasoning**, not through surface-word elimination. [journals.sagepub.com](https://journals.sagepub.com/doi/10.1177/07342829231167892)
- *Frontiers in Psychology — MC Distractor Development via Topic Modeling* (2019): automated distractor generation should ensure distractors share similar surface features with the correct answer to prevent surface-scanning. [frontiersin.org](https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2019.00825/full)

### ARCH-REC #211: X59_A7_STEM_OVERLAP_LINT — Correct-Option Stem-Token Overlap Formal Lint

**Gap identified this run**: The existing lint suite catches:
- X3/X48: verbatim consecutive n-gram copy (3-gram or longer)
- X57: antonym pair collapse

But **no existing code** catches the A7 pattern: correct option shares 2+ **non-consecutive** distinctive tokens with the sentence. This run found **34 violations (10 P0)** invisible to existing lint.

**Proposed lint rule X59** (`tools/validate-lessons.js`):

```js
// X59: A7 — Correct-option stem-token overlap
// Fires when correct option shares ≥2 distinctive content tokens with sentence+question
// AND has ≥1 token advantage over best-overlapping distractor

const STOPWORDS_X59 = new Set([
  'the','a','an','is','are','was','were','be','been','have','has','had',
  'did','do','does','will','would','shall','should','may','might','must',
  'can','could','this','that','these','those','and','or','but','for',
  'not','no','with','from','into','onto','upon','just','very','what',
  'how','who','where','when','which','why','him','her','his','its',
  'our','your','they','them','all'
]);

function contentTokensX59(text) {
  return [...text.toLowerCase().matchAll(/\b[a-z]{3,}\b/g)]
    .map(m => m[0])
    .filter(t => !STOPWORDS_X59.has(t));
}
// Cardinal numbers always count as distinctive
function cardinalTokens(text) {
  return [...text.toLowerCase().matchAll(/\b(one|two|three|four|five|six|seven|eight|nine|ten|\d+)\b/g)]
    .map(m => m[0]);
}
function allDistinctive(text) {
  return new Set([...contentTokensX59(text), ...cardinalTokens(text)]);
}

for (const q of lesson.questions) {
  if (!['listen-mc','comprehension-mc','mc'].includes(q.type)) continue;
  const stemSet = allDistinctive((q.sentence||'') + ' ' + (q.question||''));
  const correctText = q.options[q.correctIndex ?? q.correct ?? 0] || '';
  const correctSet = allDistinctive(correctText);
  const shared = [...correctSet].filter(t => stemSet.has(t));

  const maxDistractorOverlap = q.options
    .filter((_,i) => i !== (q.correctIndex ?? q.correct ?? 0))
    .map(opt => [...allDistinctive(String(opt))].filter(t => stemSet.has(t)).length);
  const best = Math.max(0, ...maxDistractorOverlap);
  const advantage = shared.length - best;

  if (shared.length >= 2 && advantage >= 1) {
    warn(qid, 'X59_A7_STEM_OVERLAP',
      `正解與 stem 共享 ${shared.length} 個內容詞「${shared.join('/')}」`
      + ` — 比最佳 distractor 多 ${advantage} 個，可免理解直接選`);
  }
}
```

**Effort**: ~45 min (add function + integrate into existing loop in `validate-lessons.js`)
**ROI**: HIGH — would have flagged all 10 P0 and 24 P1 found this run; prevents recurrence across all future chapters
**Backward compatibility**: warn-only by default; `X59_STRICT=1` to fail build
**Grammar-drill exemption**: add `if (lesson.id?.includes('-ch32-') || lesson.id?.includes('-ch33-')) continue;` for form-focus chapters

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|-----------|--------|-----|---------|
| X59 A7 stem-token overlap lint | Redalyc 2022 / ETS MC guidelines / Ludewig 2023 | ✅ Pure token math, zero infra change, 45 min | 45 min | HIGH | ✅ Implement |

---

*Rotation log: R1(skip), R2(Ch17-24), A1(Ch9-16), **A2→next**, A3(Ch9-16), A4(Ch1-8), A5(Ch1-8), A6(Ch25-34), **A7→this run(Ch25-34)**, #10(skip), #11(Ch25-34), #12(Ch17-24)*
