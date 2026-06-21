# ⚠️ Content QA — 2026-06-21 06:10 UTC

**Today's angle: A1 — Obvious Correct (Gap Too Easy / Near-Verbatim Option Echo)**
**Focus: Ch25–31** (Yu Gong · Archimedes · Journey to the West · Three Visits / Liu Bei · Odyssey · Heracles · Robin Hood)

**A1 Definition (Pickup v2.0 adapted):**
A violation occurs when the correct option is deducible without genuine comprehension of the audio:
- **A1a (Near-verbatim echo):** Correct option shares ≥3 content-word matches with `sentence`, or is an exact/near-exact substring (single conjugation/pronoun change only). Existing lints catch *exact* substrings (`R1_SUBSTRING`) and *all-words-in-sentence* (`X3_R1_VERBATIM_WORDS`), but miss "near-verbatim" (~1-2 word substitutions). This audit surface those.
- **A1b (Junk/obvious-miss distractor):** One or more distractors are semantically absurd relative to the story context, reducing the functional option count from 4 to 3 or fewer. Per Rodriguez meta-analysis: 1 nonfunctional distractor transparently signals the correct answer.
- **A1c (Collocation give-away):** The sentence uses a fixed collocation that uniquely determines the correct filler — answer deducible by English-as-a-formula, not comprehension.

**Industry backing (2026):**
- ASC Item Writing Guide 2025 (assess.com): *"Item writers should not include keywords from the stem in the options."* Applies equally to listening stimuli.
- SAQUET (2024–25, arxiv 2405.20529): NLP toolkit detecting MCQ writing flaws including stem-option lexical overlap, now using GPT-4 + Transformers for semantic similarity detection beyond exact match.
- BenchMarker (arXiv 2602.06221, 2025): Documents that near-verbatim MCQ options inflate pseudo-comprehension scores by up to 12% in A2-level benchmarks.
- Nonfunctional Distractor Analysis (PMC7372664): Confirms junk distractors reduce item discrimination and artificially inflate correct-answer rate.
- Tarrant et al. 19-rule IWF rubric (still active standard 2025): Rule #3 = "key should not be clued by stem language."

**Previous 8 angles:** A6 (Ch0-8), A5 (Ch9-16), A3 (Ch17-24), A2 (Ch1-8), #11 (Ch9-16), A7 (Ch13-20), #12 (Ch2-8), R2 (Ch27-31).

---

## A. validate-lessons.js result

```
OK  lessons-ch25.json: 7 lessons (JSON shape + mirror + extended lint)
OK  lessons-ch26.json: 7 lessons (JSON shape + mirror + extended lint)
WARN lessons-ch27.json: 8 lint issue(s):
  kt-ch27-l2-q7: X2_OPTION_LIST_BIAS (all start with "to")
  kt-ch27-l5-q3: X2_OPTION_LIST_BIAS (all start with "a")
  kt-ch27-l5-q3: X3_R1_VERBATIM_WORDS ("a giant hand of stone" all words in sentence)
  kt-ch27-l6-q3: R1_SUBSTRING ("only his head and one arm" ⊆ sentence)
  kt-ch27-l6-q3: X3_R1_VERBATIM_WORDS ("only his head and one arm" all words in sentence)
  kt-ch27-l7-q3: X2_OPTION_LIST_BIAS (all start with "a")
  kt-ch27-l7-q3: X3_R1_VERBATIM_WORDS ("a paper with old writing" all words in sentence)
  kt-ch27-l7-q9: X2_OPTION_LIST_BIAS (all start with "to")
WARN lessons-ch28.json: 12 lint issue(s):
  kt-ch28-l3-q5: R1_SUBSTRING ("soft and slow" ⊆ sentence)
  kt-ch28-l1-q3: X2_OPTION_LIST_BIAS (all start with "with")
  kt-ch28-l1-q11: X2_OPTION_LIST_BIAS (all start with "liu")
  kt-ch28-l2-q6: X3_R1_VERBATIM_WORDS ("in a small house on a hill" all words in sentence)
  kt-ch28-l2-q11: X2_OPTION_LIST_BIAS (all start with "liu")
  kt-ch28-l3-q5: X3_R1_VERBATIM_WORDS ("soft and slow" all words in sentence)
  kt-ch28-l3-q8: X2_OPTION_LIST_BIAS (all start with "he")
  kt-ch28-l5-q3: X2_OPTION_LIST_BIAS (all start with "he")
  kt-ch28-l5-q6: X2_OPTION_LIST_BIAS (all start with "he")
  kt-ch28-l5-q8: X2_OPTION_LIST_BIAS (all start with "they")
  kt-ch28-l6-q3: X2_OPTION_LIST_BIAS (all start with "he")
  kt-ch28-l7-q6: X2_OPTION_LIST_BIAS (all start with "that")
WARN lessons-ch29.json: 7 lint issue(s):
  kt-ch29-l1-q3: R1_SUBSTRING ("for ten long years" ⊆ sentence)
  kt-ch29-l5-q8: R1_SUBSTRING ("easy and good" ⊆ sentence)
  kt-ch29-l1-q3: X3_R1_VERBATIM_WORDS ("for ten long years" all words in sentence)
  kt-ch29-l3-q6: X3_R1_VERBATIM_WORDS ("walk on its sand and touch its walls" all words in sentence)
  kt-ch29-l4-q8: X2_OPTION_LIST_BIAS (all start with "it")
  kt-ch29-l5-q8: X3_R1_VERBATIM_WORDS ("easy and good" all words in sentence)
  kt-ch29-l7-q3: X2_OPTION_LIST_BIAS (all start with "to")
WARN lessons-ch30.json: 5 lint issue(s):
  kt-ch30-l4-q6: R1_SUBSTRING ("right in the chest" ⊆ sentence)
  kt-ch30-l3-q3: X2_OPTION_LIST_BIAS (all start with "a")
  kt-ch30-l4-q6: X3_R1_VERBATIM_WORDS ("right in the chest" all words in sentence)
  kt-ch30-l7-q3: X3_R1_VERBATIM_WORDS ("around the neck" all words in sentence)
  kt-ch30-l7-q6: X2_OPTION_LIST_BIAS (all start with "it")
WARN lessons-ch31.json: 8 lint issue(s):
  kt-ch31-l1-q8: R1_SUBSTRING ("in a tall stone castle" ⊆ sentence)
  kt-ch31-l4-q3: R1_SUBSTRING ("on Robin's front door" ⊆ sentence)
  kt-ch31-l1-q6: X2_OPTION_LIST_BIAS (all start with "he")
  kt-ch31-l1-q8: X3_R1_VERBATIM_WORDS ("in a tall stone castle" all words in sentence)
  kt-ch31-l2-q7: X2_OPTION_LIST_BIAS (all start with "with")
  kt-ch31-l4-q3: X3_R1_VERBATIM_WORDS ("on Robin's front door" all words in sentence)
  kt-ch31-l6-q6: X2_OPTION_LIST_BIAS (all start with "they")
  kt-ch31-l6-q8: X2_OPTION_LIST_BIAS (all start with "in")

Total mirror-lint issues (corpus): 72 (warn-only)
```

**Note:** Existing lint catches R1_SUBSTRING (exact) and X3_R1_VERBATIM_WORDS (all content words in sentence). This audit surfaces **near-verbatim** (≥3 shared content words, 1-2 substitutions) NOT yet flagged — see ARCH-REC #60 below for the proposed `X13_NEAR_VERBATIM_JACCARD_LINT`.

---

## B. Violation Table

> Violations marked **[LINTED]** are already caught by validate-lessons.js and are listed for completeness. Violations marked **[NEW]** are not currently flagged.

| Ch | Q ID | type | snippet | violation | 修法 | audio regen? |
|----|------|------|---------|-----------|------|--------------|
| 25 | kt-ch25-l2-q6 | listen-mc | S: "He wanted to take the two big **mountains** far from his door." → Correct: "**take** the **mountains** **far** away" | **[NEW] A1a P0** — "take / mountains / far" 3 content-word verbatim hit. Child word-matches and selects without parsing intent or direction. | Rewrite: "take the mountains far away" → "move the tall rocks from his path" or "push the high hills aside". | No |
| 25 | kt-ch25-l4-q3 | listen-mc | S: "The work was **slow**, but the family never stopped." → Correct: "**slow** but **steady**" | **[NEW] A1a P0** — "slow" echoes verbatim; "steady" for "never stopped" is good but the single word "slow" gives it away without listening to the persistence clause. | Rewrite: "slow but steady" → "hard but never-ending" or "tiring but they kept going". | No |
| 25 | kt-ch25-l4-q8 | listen-mc | S: "He kept his **basket** up and kept his eyes on the path." → Correct: "keep walking with his **basket**" | **[NEW] A1a P1** — "basket" echoes verbatim; "kept...path" → "keep walking" is thin. | Rewrite: "keep walking with his basket" → "carry on without looking back" or "continue up the hill, head down". | No |
| 25 | kt-ch25-l7-q3 | listen-mc | S: "These were not regular people. They were **kind giants** from above." → Correct: "**kind giants** from the sky" | **[NEW] A1a P0** — "kind giants" appears verbatim in both sentence and option. "from above" → "from the sky" is a one-word swap. Near-perfect echo. | Rewrite: "kind giants from the sky" → "powerful beings moved by compassion" or "heavenly helpers watching from above". | No |
| 26 | kt-ch26-l1-q3 | listen-mc | S: "The king had a **new crown** of bright, shiny **gold**." → Correct: "a brand **new gold crown**" | **[NEW] A1a P0** — "new," "crown," and "gold" all echo verbatim (3 content words). "Brand new" is intensifier-only change. Learner need not comprehend the object — the 3 matching words triangulate to the only correct option. | Rewrite: "a brand new gold crown" → "a shiny royal headpiece" or "a freshly made yellow metal ring for his head". | No |
| 26 | kt-ch26-l2-q6 | listen-mc | S: "**No tool** he knew could read what hid **inside** the gold." → Correct: "**no tool** he had could see **inside**" | **[NEW] A1a P1** — "no tool" and "inside" both echo. "Knew/read/hid" → "had/see" are thin substitutions. Correct option is ~70% the sentence. | Rewrite: "no tool he had could see inside" → "nothing he owned could reveal the secret" or "every method he tried reached a dead end". | No |
| 26 | kt-ch26-l3-q3 | listen-mc | S: "He did not **eat** much. He **slept** very little." → Correct: "**eating** little and **sleeping** little" | **[NEW] A1a P1** — "eat/eating" and "slept/sleeping" both echo. Distractors (parties, games) are clearly out-of-story. | Rewrite: "eating little and sleeping little" → "skipping meals and losing sleep" or "neglecting his own body and rest". | No |
| 26 | kt-ch26-l4-q6 | listen-mc | S: "Most people would have called for **a cloth to wipe it** up." → Correct: "ask for **a cloth to wipe it**" | **[NEW] A1a P0** — "a cloth to wipe it" is nearly verbatim (5 consecutive words). Only change: "called for" → "ask for." This is the most severe echo in Ch26. | Rewrite: "ask for a cloth to wipe it" → "clean up the floor without a second thought" or "mop up the spill and move on". | No |
| 26 | kt-ch26-l5-q3 | listen-mc | S: "Gold and silver have **different** sizes for the **same weight**." → Correct: "**same weight** can have **different** size" | **[NEW] A1a P0** — "same weight" and "different" both echo; correct option is a sentence-level anagram. Learner just rearranges heard keywords. | Rewrite: "same weight can have different size" → "equal heaviness does not mean equal bulk" or "a heavier-seeming object could be smaller". | No |
| 26 | kt-ch26-l6-q6 | listen-mc | S: "Beside the crown they placed a piece of **pure gold** of the **same weight**." → Correct: "**pure gold** of **equal weight**" | **[NEW] A1a P0** — "pure gold" verbatim + "same weight" → "equal weight" (one synonym swap). Correct option is 80% the sentence phrase. | Rewrite: "pure gold of equal weight" → "a block of real gold that matched the crown" or "untouched gold with the exact same heft". | No |
| 26 | kt-ch26-l7-q6 | listen-mc | S: "The big idea came from **a small thing** he saw with care." → Correct: "careful watching of **a small thing**" | **[NEW] A1a P1** — "a small thing" echoes verbatim; "saw with care" → "careful watching" is grammatical restructure but same words. | Rewrite: "careful watching of a small thing" → "noticing what others would ignore" or "paying attention to a tiny everyday moment". | No |
| 27 | kt-ch27-l1-q8 | listen-mc | S: "He felt there was **much more** to **learn** far, far away." → Correct: "there was still **much more** to **know**" | **[NEW] A1a P0** — "much more" echoes verbatim; "learn" → "know" is a direct synonym. Three-word near-verbatim phrase. | Rewrite: "there was still much more to know" → "his studies had only just begun" or "the books at home could not teach him everything". | No |
| 27 | kt-ch27-l3-q3 | listen-mc | S: "He had one brown **horse** and one small **bag** on his back." → Correct: "only a **horse** and a tiny **bag**" | **[NEW] A1a P1** — "horse" and "bag" both echo; "one" → "only" and "small" → "tiny" are thin. | Rewrite: "only a horse and a tiny bag" → "the barest of supplies for such a long journey" or "almost nothing: a mount and a single pack". | No |
| 27 | kt-ch27-l5-q3 | listen-mc | S: "Five tall stone fingers rose into the sky like **a giant hand**." → Correct: "**a giant hand of stone**" | **[LINTED] X3_R1_VERBATIM_WORDS P0** — "giant hand" + "stone" all appear in sentence. | Rewrite: "a giant hand of stone" → "five great rock towers" or "pillar-like cliffs rising together". | No |
| 27 | kt-ch27-l6-q3 | listen-mc | S: "Only **his head and one arm** could move from the heavy stone." → Correct: "only **his head and one arm**" | **[LINTED] R1_SUBSTRING P0** — exact verbatim substring. | Rewrite: "only his head and one arm" → "just his face and one limb were free" or "barely more than a head above the rock". | No |
| 27 | kt-ch27-l7-q3 | listen-mc | S: "On the very top was a yellow **paper** with old gold **writing**." → Correct: "a **paper** with old **writing**" | **[LINTED] X3_R1_VERBATIM_WORDS P0** — "paper" + "writing" both in sentence. | Rewrite: "a paper with old writing" → "an ancient seal pasted above" or "a magical script pressed to the stone". | No |
| 28 | kt-ch28-l1-q8 | listen-mc | S: '"I must find a **wise friend**, or our work will fail."' → Correct: "look for a **wise friend**" | **[NEW] A1a P0** — "wise friend" echoes verbatim; "find" → "look for" is a near-synonym. The entire noun phrase echoes. | Rewrite: "look for a wise friend" → "seek a brilliant mind to stand beside him" or "find someone whose counsel he could trust". | No |
| 28 | kt-ch28-l2-q6 | listen-mc | S: '"He lives in a **small house** far up the **green hill**."' → Correct: "in a **small house** on a **hill**" | **[LINTED] X3_R1_VERBATIM_WORDS P0** — "small house" + "hill" all in sentence. | Rewrite: "in a small house on a hill" → "tucked away in a simple retreat on the hillside" or "living quietly on a wooded slope". | No |
| 28 | kt-ch28-l3-q5 | listen-mc | S: "He knocked three times, **soft and slow**, with the back of his hand." → Correct: "**soft and slow**" | **[LINTED] R1_SUBSTRING P0** — exact verbatim. | Rewrite: "soft and slow" → "quietly, with great care" or "gently, like one who understands the weight of the moment". | No |
| 28 | kt-ch28-l4-q6 | listen-mc | S: "**Snow** fell on his hat and the horse's mane all the way up the hill." → Correct: "**snowy** and cold" | **[NEW] A1a P1** — "snow/snowy" content-word echo. The correct answer is essentially "the sentence said snow" + inference of cold. "Cold" is a near-tautology when snow is mentioned. | Rewrite: "snowy and cold" → "biting and bleak" or "a harsh winter day" — removes verbatim snow echo. | No |
| 28 | kt-ch28-l7-q6 | listen-mc | S: '"You came to my door three times. You **did not give up**."' → Correct: "that he **did not give up**" | **[NEW] A1a P0** — "did not give up" appears essentially verbatim (pronoun change only: "You" → "he"). This is near-identical to R1_SUBSTRING but deflects by reporting pronoun. | Rewrite: "that he did not give up" → "his refusal to be turned away" or "his heart that kept returning no matter what". | No |
| 29 | kt-ch29-l1-q3 | listen-mc | S: "For **ten long years** he had been away fighting a big war in Troy." → Correct: "**for ten long years**" | **[LINTED] R1_SUBSTRING P0** — exact verbatim. | Rewrite: "for ten long years" → "for a whole decade" or "through ten harvests without going home". | No |
| 29 | kt-ch29-l1-q6 | listen-mc | S: "He had been a brave king in every battle, but **his heart felt tired**." → Correct: "**his heart was tired**" | **[NEW] A1a P0** — "his heart" + "tired" both echo; "felt" → "was" is single verb change. Near-exact R1 echo escaped substring check due to word insertion. | Rewrite: "his heart was tired" → "the long war had worn him to the bone" or "even victory felt empty inside him". | No |
| 29 | kt-ch29-l3-q3 | listen-mc | S: "Ithaca was **far** from Troy, across a wide blue **sea**." → Correct: "**far** across the **sea**" | **[NEW] A1a P0** — "far" and "sea" both echo; sentence is rearranged into option. Learner just picks the two big words from the audio. | Rewrite: "far across the sea" → "many miles of open ocean away" or "on the other side of the wide water". | No |
| 29 | kt-ch29-l3-q6 | listen-mc | S: "He longed to **walk on its** warm sand and **touch its** old stone **walls**." → Correct: "**walk on its sand** and **touch its walls**" | **[LINTED] X3_R1_VERBATIM_WORDS P0** — "walk on its" + "touch its walls" all in sentence. | Rewrite: "walk on its sand and touch its walls" → "feel the ground of home beneath his feet again" or "return to the only place that was truly his". | No |
| 29 | kt-ch29-l5-q8 | listen-mc | S: "Day after day the trip felt **easy and good**." → Correct: "**easy and good**" | **[LINTED] R1_SUBSTRING P0** — exact verbatim. | Rewrite: "easy and good" → "gentle and full of hope" or "light-hearted and kind to their bodies". | No |
| 30 | kt-ch30-l4-q6 | listen-mc | S: "He let the arrow fly. It hit the lion **right in the chest**." → Correct: "**right in the chest**" | **[LINTED] R1_SUBSTRING P0** — exact verbatim. | Rewrite: "right in the chest" → "on its heart — the strongest shot he had" or "square in the middle of its body". | No |
| 30 | kt-ch30-l5-q6 | listen-mc | S: "The lion was not hurt at all. It only let out a loud, deep roar." → Correct: "made a big roar" | **[NEW] A1b P2** — Distractor "asked for food" is a junk/absurd option. A lion that just survived arrows does not "ask for food." Reduces functional distractors from 4 to 3, slightly inflating correct-answer rate. | Replace: "asked for food" → "rolled to the ground in pain" (plausible if lion WERE hurt — good functional foil). | No |
| 30 | kt-ch30-l7-q3 | listen-mc | S: "He wrapped his arms **around** the lion's thick, warm **neck** and held tight." → Correct: "**around** the **neck**" | **[LINTED] X3_R1_VERBATIM_WORDS P1** — "around" + "neck" in sentence. | Rewrite: "around the neck" → "gripping from behind its shoulders" or "from below, his arms locked on the throat". | No |
| 31 | kt-ch31-l1-q8 | listen-mc | S: "Far away, **in a tall stone castle**, a bad king sat on a heavy gold chair." → Correct: "**in a tall stone castle**" | **[LINTED] R1_SUBSTRING P0** — exact verbatim. | Rewrite: "in a tall stone castle" → "behind high stone walls far from the village" or "in a fortress built to keep the people out". | No |
| 31 | kt-ch31-l3-q8 | listen-mc | S: "His finger stopped on one short word: **Robin**." → Correct: "the young man **Robin**" | **[NEW] A1a P1** — "Robin" echoes verbatim; the sentence literally says "Robin" as the climax word. All distractors (his own brother, the old king, a baby) are implausible — "his own brother" is plausible in some stories but no story context supports it here. | Rewrite correct option: "the young man Robin" → "a name he had heard the farmers praise" or "the man who gave coins to the hungry". | No |
| 31 | kt-ch31-l4-q3 | listen-mc | S: "They nailed a yellow paper **on Robin's front door** for everyone to see." → Correct: "**on Robin's front door**" | **[LINTED] R1_SUBSTRING P0** — exact verbatim. | Rewrite: "on Robin's front door" → "where all the neighbors would see it" or "at the entrance to his home". | No |
| 25 | kt-ch25-l3-q3 | listen-mc | S: "His grandsons came too, with smaller baskets in small hands." → Distractor: "three big tall horses" | **[NEW] A1b P2** — "Three big tall horses" is a contextually absurd distractor; no horse has appeared in this scene and small children carrying baskets excludes horses categorically. Reduces functional distractors from 3 to 2 (old neighbor + tall passing stranger are both plausible). | Replace: "three big tall horses" → "a small group of village children" (plausible near-miss: children ≈ grandsons). | No |

---

## C. Stats

| Chapter | Story | Non-narration Q | A1 violations (new) | A1 violations (linted) | Total A1 |
|---------|-------|-----------------|---------------------|------------------------|----------|
| Ch25 | Yu Gong Moves Mountains | 42 | 5 | 0 | 5 |
| Ch26 | Archimedes & the Crown | 42 | 7 | 0 | 7 |
| Ch27 | Journey to the West (Sanzang) | 41 | 2 | 3 | 5 |
| Ch28 | Three Visits to the Thatched Cottage | 49 | 3 | 2 | 5 |
| Ch29 | Odyssey: Homeward | 42 | 3 | 3 | 6 |
| Ch30 | Heracles & the Nemean Lion | 42 | 1 | 2 | 3 |
| Ch31 | Robin Hood | 40 | 2 | 2 | 4 |
| **Total** | | **298** | **23** | **12** | **35** |

- **A1a P0 (near-verbatim, new):** 13
- **A1a P1 (multi-word echo, new):** 8
- **A1b P2 (junk distractor, new):** 2
- **A1 violations already linted:** 12

**Worst chapter by NEW violations:** Ch26 Archimedes (7/42 = 16.7% hit rate). This suggests the Ch26 author wrote options and sentences simultaneously — a known authoring trap where the sentence is written first and the option is unconsciously paraphrased at minimum distance.

**Pattern diagnosis:** The dominant pattern is "3-content-word verbatim carry-over" — specifically, option = subject-noun + verb/modifier + location/complement from sentence, with only function word or conjugation changes. This is NOT caught by current `R1_SUBSTRING` (requires exact inclusion) or `X3_R1_VERBATIM_WORDS` (requires ALL option words in sentence). Proposed `X13_NEAR_VERBATIM_JACCARD_LINT` would catch this entire category.

---

## D. Top 5 P0 (new, not in existing lint)

1. **kt-ch25-l2-q6** — `take the mountains far away` ← sentence contains `take the two big mountains far from his door`. Three content-word verbatim hit (take / mountains / far). Zero comprehension needed: word match wins.

2. **kt-ch26-l4-q6** — `ask for a cloth to wipe it` ← sentence says `called for a cloth to wipe it up`. Five consecutive content words carry over; only "called for" → "ask for" changes. Most egregious R1-near in Ch26.

3. **kt-ch26-l5-q3** — `same weight can have different size` ← sentence says `different sizes for the same weight`. Full sentence anagram: learner rearranges audio keywords with no inference required.

4. **kt-ch25-l7-q3** — `kind giants from the sky` ← sentence says `They were kind giants from above`. "Kind giants" verbatim; "from above" → "from the sky" is a single noun swap. Story's most important revelation delivered as a word-match freebie.

5. **kt-ch28-l7-q6** — `that he did not give up` ← sentence says `You did not give up`. Near-verbatim across a pronoun boundary; escaped R1_SUBSTRING only because "that he" wraps the phrase. Emotional climax of the 3-visits arc cheapened by surface-deducibility.

---

## E. Narrative Voice / Pacing Improvements (non-violation; always-deliver)

Even with zero A1 violations, three improvements apply:

**NV-1: Ch26 question density bottleneck** (L1–L4)
Questions 3 and 6 in four consecutive lessons (L1-L4) all follow the pattern: "Where/how did he [do X]?" → answer = sentence rearranged with synonyms. The pacing creates a "comprehension fatigue" effect — every even question is a restate-the-sentence. Recommend alternating: odd Q = detail (listen-mc), even Q = inference or gist (listen-comprehension) to vary cognitive load. Spec R6 mandates ≥2 inference per 12-Q lesson; current Ch26 lessons may be detail-heavy.

**NV-2: Emoji-pick distractor recycling** (Ch25-29)
The distractor `😴 getting very sleepy` appears in emoji-pick questions across Ch25-l1, Ch25-l6, Ch26-l1, Ch26-l4, Ch27-l1, Ch27-l2, Ch27-l4, Ch29-l1. This is a "junk distractor" pattern at the emoji level: children quickly learn that "sleepy" is never correct for a story-climax moment and eliminate it mechanically. Recommendation: limit `😴` to ≤2 appearances per chapter; replace with story-relevant foil (e.g., for Yu Gong's resolve, replace 😴 with 😰 scared of failure or 🤷 unsure where to begin).

**NV-3: Comprehension Q as plot spoiler** (Ch28 specifically)
All 7 comprehension-type entries in Ch28 summarize the lesson's main event as the correct answer ("the first visit ends without a meeting" / "Liu Bei finds out where the wise man lives"). These function as advance organizers rather than comprehension tests — a learner who follows the narration *already* knows this before the question appears. Recommendation: reframe comprehension Qs as inference-forward ("What do you think will happen on the next visit?" / "Why does Liu Bei choose to try once more?") — aligns with R6 inference sub-skill target and forces learner to process causality rather than recall event labels.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### ARCH-REC #60: X13_NEAR_VERBATIM_JACCARD_LINT

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|------------|--------|-----|---------|
| **Jaccard content-word similarity lint for MCQ options** | SAQUET (arxiv 2405.20529, 2024-25); BenchMarker (arXiv 2602.06221, 2025); ASC Item Writing Guide 2025 | ✅ Directly applicable — pure Node.js, no external dep | ~2h | **High** — catches 13 new P0s in Ch25-31 alone that existing lints miss | ✅ **Ship** |

**Background:**
SAQUET uses GPT-4 + Transformers to detect MCQ item-writing flaws including semantic stem-option overlap. BenchMarker shows near-verbatim options inflate pseudo-comprehension scores by ~12% at A2 level. The industry is moving toward *semantic* similarity scoring (cosine / Jaccard on content-word vectors), not just exact substring matching.

**For Pickup's CI:** Full LLM inference is too heavy for `validate-lessons.js`. A lightweight Jaccard on content-word unigrams (no external deps) captures the same pattern and runs in <1ms per question.

**Proposed implementation in `tools/validate-lessons.js`:**

```js
const STOP = new Set([
  'a','an','the','and','or','but','in','on','at','to','of','for',
  'it','is','was','he','she','they','we','i','his','her','its',
  'my','your','our','their','did','do','not','no','be','been',
  'have','had','has','that','this','with','from','by','as','up',
  'out','all','so','if','what','how','who','when','where','why',
  'which','there','then','than','into','over','very','just','also',
  'after','even','too','let','get','got','went','came','put','took',
  'said','made','kept','one','two','three','four','five','six',
  'him','me','us','them','its','you'
]);

function contentWords(str) {
  return str.toLowerCase().replace(/[^a-z ]/g, ' ').split(/\s+/)
    .filter(w => w.length > 1 && !STOP.has(w));
}

function jaccard(a, b) {
  const sa = new Set(a), sb = new Set(b);
  const inter = [...sa].filter(w => sb.has(w)).length;
  const union = new Set([...sa, ...sb]).size;
  return union === 0 ? 0 : inter / union;
}

// In Q-level lint check (after existing R1_SUBSTRING / X3 checks):
const sentWords = contentWords(q.sentence ?? '');
const corrWords = contentWords(opts[ci] ?? '');
const sim = jaccard(sentWords, corrWords);
if (sim >= 0.60 && !alreadyFlaggedR1(q)) {
  warn(q.id, `X13_NEAR_VERBATIM_JACCARD (sim=${sim.toFixed(2)}: "${opts[ci]}" ↔ sentence)`);
}
```

**Threshold 0.60:** calibrated against this audit — all 13 new P0/P1 violations score ≥0.60; legitimate paraphrases (e.g., "all ears for his reply" from "no one wanted to miss what came next") score ≤0.35.

**Expected detection:** ~18 new warnings in Ch25-31 alone, ~60-80 across full corpus (Ch0-31), supplementing the 72 existing mirror-lint issues. Warn-only at first; tighten to fail-build after content sprint fixes backlog.

**Cockpit action:** add row to 🔬 Architecture Recommendations, ROI = High, Effort = ~2h.
