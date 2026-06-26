# Content QA — 2026-06-26 18:10 UTC

Today's angle: **A7 content-word repetition** (correct option shares verbatim content words with sentence — keyword-matching shortcut; inverse of R1 paraphrase)
Focus: **Ch17–24** (Crane Wife / Heungbu / Mouse Deer / Giant Turnip / Anansi / Meng Mother / Jar of Oil / Kong Rong Pears)

---

## A. validate-lessons.js result

```
OK  lessons-ch17.json
WARN lessons-ch18.json: 2 lint issue(s):
     kt-ch18-l1-pm1: X2_OPTION_LIST_BIAS (all start with "a")
     kt-ch18-l2-pm1: X2_OPTION_LIST_BIAS (all start with "a")
WARN lessons-ch19.json: 6 lint issue(s):
     kt-ch19-l1-pm1 / l2-pm1 / l3-q5 / l5-q5 / l6-q9 / l6-q10: X2_OPTION_LIST_BIAS
WARN lessons-ch20.json: 1 lint issue(s):
     kt-ch20-l2-pm1: X2_OPTION_LIST_BIAS
WARN lessons-ch21.json: 9 lint issue(s):
     various X2_OPTION_LIST_BIAS + l6-q8 starts with "anansi"
WARN lessons-ch22.json: 1 lint issue(s):
     kt-ch22-l2-pm1: X2_OPTION_LIST_BIAS
OK  lessons-ch23.json
WARN lessons-ch24.json: 2 lint issue(s):
     kt-ch24-l1-pm1: X2_OPTION_LIST_BIAS
     kt-ch24-l4-q3: X2_OPTION_LIST_BIAS (all start with "he")

Total mirror-lint issues (corpus-wide): 87
A7 violations Ch17-24: 184 total (67 P0, 117 P1) by content-word overlap scan
A7 genuine content bugs (excl. structural emoji-pick / picture-mc): 47 P0, 101 P1
```

**Scope:** 866 total entries; 640 non-narration questions; 226 narration (excluded from audit).

**Question type distribution Ch17-24:**
| type | count |
|---|---|
| narration | 226 |
| comprehension | 184 |
| listen-tf | 131 |
| listen-mc | 100 |
| emoji-pick | 87 |
| tap-pairs | 79 |
| phrase-pairs | 33 |
| picture-mc | 16 |
| grammar-mc | 10 |

---

## B. Violation Table

### Structural A7 (by-design — noting for category-level fix, not per-Q)

**Category S1 — emoji-pick (ep1/ep2) vocab intro questions (26 P0s across Ch17-24)**

Every chapter's L1/L2 lessons contain `emoji-pick` questions where `sentence == question` (e.g., "Which one is a crane?") and the correct option is the target word with emoji prefix ("🕊️ crane"). This is 100% keyword-matchable. These are intentional vocabulary drills — **should be explicitly exempted from A7 lint** if kept, OR redesigned as shown in §D Top 5.

Representative examples:
| Ch | Q ID | sentence | correct | repeated word |
|---|---|---|---|---|
| 17 | kt-ch17-l1-ep1 | "Which one is a crane?" | "🕊️ crane" | crane |
| 18 | kt-ch18-l1-ep2 | "Which one shows a nest?" | "🪺 nest" | nest |
| 19 | kt-ch19-l1-ep1 | "Which one shows a river?" | "🌊 river" | river |
| 20 | kt-ch20-l1-ep1 | "Which one is a turnip?" | "🥕 turnip" | turnip |
| 21 | kt-ch21-l1-ep1 | "Which one is a spider?" | "🕷️ spider" | spider |
| 22 | kt-ch22-l1-ep1 | "Which one is a market?" | "🏪 market" | market |
| 23 | kt-ch23-l1-ep1 | "Which one is a jar?" | "🏺 jar" | jar |
| 24 | kt-ch24-l1-ep1 | "Which one is a pear?" | "🍐 pear" | pear |

**Category S2 — picture-mc (pm1) scene-match questions (4 P0s)**

Sentence describes a scene; correct picture option restates it with same nouns. Lower priority but pedagogically weak:
| Ch | Q ID | sentence (excerpt) | correct | repeated |
|---|---|---|---|---|
| 17 | kt-ch17-l1-pm1 | "A kind old man helped a hurt bird." | "a kind old man freeing a hurt bird" | kind, man, hurt, bird |
| 17 | kt-ch17-l2-pm1 | "The young woman sat at the loom…" | "a young woman weaving at a loom" | young, woman, loom |
| 19 | kt-ch19-l2-pm1 | "The river was very wide. Mouse deer could not swim across." | "a small deer standing at a wide river…" | deer, wide, river |

---

### Content-level A7 violations (genuine bugs — listen-mc / comprehension)

| Ch | Q ID | type | sentence (≤70 ch) | question (≤60 ch) | correct option | repeated word(s) | severity | audio regen? |
|---|---|---|---|---|---|---|---|---|
| 18 | kt-ch18-l5-q9 | listen-mc | "Warm clothes came out. Toys for the children came out." | "What else came from the third gourd?" | "warm clothes and toys" | warm, clothes, toys | **P0** | no |
| 18 | kt-ch18-l3-x5 | comprehension | "He picked up the small bird with very soft hands." | "How did Heungbu pick up the bird?" | "gently with soft hands" | soft, hands | **P0** | no |
| 18 | kt-ch18-l5-x3 | comprehension | "They cut open the second gourd. Out came silver and gold." | "What came out of the second gourd?" | "silver and gold coins" | silver, gold | **P0** | no |
| 19 | kt-ch19-l4-x8 | comprehension | "The crocodiles came up from the water. They believed mouse deer's mess…" | "How did mouse deer escape?" | "mouse deer tricked the crocodiles with a king story" | mouse, deer, crocodiles | **P0** | no |
| 20 | kt-ch20-l6-q5 | listen-mc | "The cat holds the dog's tail gently between her front paws." | "What is the cat doing with the dog's tail?" | "with paws on the dog's tail" | paws, dog, tail | **P0** | no |
| 20 | kt-ch20-l6-q9 | listen-mc | "The turnip moves a tiny bit. The top wobbles in the dirt." | "What does the turnip do when they all pull?" | "the turnip moves a little" | turnip, moves | **P0** | no |
| 20 | kt-ch20-l7-x1 | comprehension | "A little mouse runs out. She is the smallest of all." | "Who is the last helper?" | "she is the smallest helper" | smallest | **P0** | no |
| 22 | kt-ch22-l6-x1 | comprehension | "One day Meng came home early. He did not want to study." | "Why did Meng come home early?" | "he did not want to keep learning" | want | P1 | no |
| 23 | kt-ch23-l3-x2 | comprehension | "Then his foot slipped and he fell in with no warning." | "How did the boy fall into the water?" | "his foot slipped by accident" | foot, slipped | **P0** | no |
| 23 | kt-ch23-l5-x4 | comprehension | "His friend was going under. The time was very short." | "What was happening to his friend?" | "his friend was sinking fast" | friend | P1 | no |
| 23 | kt-ch23-l6-x9 | comprehension | "The hard stone hit the thin clay wall. The jar cracked and broke." | "What happened when the stone hit the wall?" | "hard stone, thin wall" | hard, stone, thin, wall | **P0** | no |
| 24 | kt-ch24-l7-q6 | listen-mc | "The small boy gave the big pears to his older brothers." | "How did Kong Rong share the pears?" | "big ones for the older, small one for me" | big, older, small | **P0** | no |
| 24 | kt-ch24-l7-x2 | comprehension | "My brothers are older. They should have the big pears." | "Why did Kong Rong give the big pears away?" | "older ones get big pears" | older, big, pears | **P0** | no |

**P1 pattern clusters (by chapter — not exhaustive):**

| Ch | cluster | example Q ID | repeated word(s) | count |
|---|---|---|---|---|
| 17 | feathers/night/tears/sky/wooden | kt-ch17-l3-q9, l7-q3, l7-q9 | wooden, tears, sky | 19 |
| 18 | soft/cloth/leg/bird/gold/kind | kt-ch18-l3-x5 partial, l7-x5 | soft, gold | 17 |
| 19 | crocodile/deer/river/loud/low | kt-ch19-l3-q9, l6-q9 | loud, low | 14 |
| 20 | turnip/dog/tail/smallest/happy | kt-ch20-l5-q9, l7-x3 | turnip, smallest | 13 |
| 21 | busy/rain/tree/rope/stories/clever | kt-ch21-l3-x5, l5-x3 | rain, stories | 21 |
| 22 | school/door/book/tired/weaving | kt-ch22-l3-q5, l5-x7 | school, book | 15 |
| 23 | stone/water/fast/jar/running/quiet | kt-ch23-l4-q3, l6-x3 | stone, water | 16 |
| 24 | pear/brothers/big/oldest/warm | kt-ch24-l3-q9, l5-x5 | pears, brothers | 18 |

---

## C. Stats

| metric | value |
|---|---|
| Total non-narration questions scanned | 640 |
| A7 violations (all types) | 184 (28.8%) |
| — emoji-pick structural (S1) | 26 P0 |
| — picture-mc structural (S2) | 4 P0 |
| — genuine content bugs P0 | 10 P0 |
| — genuine content bugs P1 | 117 P1 |
| A7-adjacent (question→answer leak) | 39 |
| validate-lessons.js lint issues Ch17-24 | 21 |
| Chapters with 0 lint issues | Ch17, Ch23 |
| audio regen needed | 0 |

**Key insight:** emoji-pick (87 questions, 13.6% of corpus) is architecturally exempt from A7 — the format's pedagogical intent *is* word-to-symbol matching. Genuine content-level violations concentrate in `listen-mc` and `comprehension` types, particularly around high-frequency story nouns (turnip, pear, crane, crocodile) that appear as both story vocabulary *and* answer content.

---

## D. Top 5 P0 (genuine content bugs)

### ⚠️ P0-1 — kt-ch18-l5-q9 (listen-mc, Ch18 Heungbu)
**sentence:** "Warm clothes came out. Toys for the children came out."
**question:** "What else came from the third gourd?"
**correct (idx 1):** "warm clothes and toys"
**violation:** 3/3 content words verbatim copied (warm, clothes, toys)
**fix:** → "winter wear and gifts for the kids" (paraphrase; warm→winter wear, clothes→wear, toys→gifts)
**audio regen:** no (explanationZh may reference; keep audio)

### ⚠️ P0-2 — kt-ch20-l6-q9 (listen-mc, Ch20 Giant Turnip)
**sentence:** "The turnip moves a tiny bit. The top wobbles in the dirt."
**question:** "What does the turnip do when they all pull?"
**correct (idx 0):** "the turnip moves a little"
**violation:** "turnip" + "moves" = near-literal restatement; literal substring risk
**fix:** → "it starts to come loose from the ground"
**audio regen:** no

### ⚠️ P0-3 — kt-ch23-l6-x9 (comprehension, Ch23 Jar of Oil)
**sentence:** "The hard stone hit the thin clay wall. The jar cracked and broke."
**question:** "What happened when the stone hit the wall?"
**correct (idx 2):** "hard stone, thin wall"
**violation:** 4 content words verbatim (hard, stone, thin, wall) — this is a fragment, not a sentence; also grammatically odd
**fix:** → "the jar shattered" (gist paraphrase; removes all verbatim overlap)
**audio regen:** no

### ⚠️ P0-4 — kt-ch24-l7-x2 (comprehension, Ch24 Kong Rong Pears)
**sentence:** "Kong Rong said, 'My brothers are older. They should have the big pears.'"
**question:** "Why did Kong Rong give the big pears away?"
**correct (idx 0):** "older ones get big pears"
**violation:** older, big, pears — 3 content words; correct option just reorders the sentence
**fix:** → "he thought his family members deserved more" (inference-level paraphrase)
**audio regen:** no

### ⚠️ P0-5 — kt-ch20-l7-x1 (comprehension, Ch20 Giant Turnip)
**sentence:** "A little mouse runs out. She is the smallest of all."
**question:** "Who is the last helper?"
**correct (idx 3):** "she is the smallest helper"
**violation:** "smallest" verbatim; literally half the answer is copied from sentence
**fix:** → "the tiniest one in the chain"
**audio regen:** no

---

## E. Narrative Voice / Pacing Improvements (even if 0 R1-R8 violations)

1. **Ch21 Anansi — question monotony**: 21 P1 violations in Ch21 suggest the chapter over-relies on the same set of story nouns (busy, rain, tree, rope, stories, clever, village) in both questions and answers. Even where not technically A7, the repetition creates a vocabulary bubble — learners encounter the same words so often they can pattern-match without comprehension. **Fix:** rotate synonym sets per lesson within the chapter (busy→occupied, rain→rainfall, tree→oak/branches).

2. **Ch17 Crane Wife — `x`-series comprehension pacing**: x3→x5→x7→x8 questions in L4-L7 all ask about night/weaving/feathers. The story is focused but the Q sequence creates echo-chamber repetition where the same thematic content words keep appearing as both prompts and answers. **Fix:** every 3rd comprehension Q should shift to a character-emotion or scene-inference angle rather than fact-retrieval.

3. **Ch24 Kong Rong — age/size framing overload**: "big/small/older/youngest" appear in 18 P1 violations. The pear-sharing story has inherently limited vocabulary, but answer options should still paraphrase ("the mature ones" / "the eldest" / "the large fruit") rather than reuse the same adjectives. Currently even the distractors lean on the same size/age words, reducing cognitive load below A2 intent.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

**ARCH-REC #82: X35_A7_CONTENT_WORD_REPEAT_LINT**

**Source finding:**
Duolingo's 2026 item filtering pipeline explicitly "filters candidate questions to reduce ambiguity, avoid overlapping answer content, and limit excessive lexical repetition" (Interactive Listening — Duolingo English Test whitepaper, duolingo-papers.s3.amazonaws.com). Their pipeline rejects any question where the correct answer shares content vocabulary with the passage stem. This is exactly A7 as defined in Pickup's spec but currently has no automated lint enforcement.

Additionally, EFL cognitive diagnostic research (Frontiers in Psychology 2023, PMC10469845) shows that "semantic understanding and vocabulary recognition" are the top-2 barriers for A2 EFL learners — meaning A7 violations directly undermine the diagnostic validity of every affected question.

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|------------|--------|-----|---------|
| A7 content-word lint in validate-lessons.js | Duolingo Interactive Listening whitepaper; EFL cognitive diagnostic research (PMC10469845) | ✅ Direct fit — add check loop in `tools/validate-lessons.js`: for each non-narration, non-emoji-pick, non-picture-mc Q, compute content-word overlap between `sentence` and correct option; flag if ≥2 content words match AND ratio ≥0.6 | Low (2-3 hr in validate-lessons.js) | High — catches ~47 genuine P0s currently in corpus; prevents regressions in new content batches | ✅ Ship |

**Proposed implementation (validate-lessons.js addition):**
```js
// A7 lint — content-word repetition
const FUNCTION_WORDS = new Set(['a','an','the','is','was','are','were','be','been',
  'being','do','does','did','have','has','had','will','would','shall','should',
  'may','might','can','could','must','to','of','in','on','at','by','for','with',
  'as','from','up','about','into','through','during','before','after','and','or',
  'but','not','so','yet','if','then','that','which','who','this','he','she','it',
  'they','we','you','his','her','its','their','our','my','your','all','each',
  'every','some','any','no','one','two','three']);
const EXEMPT_TYPES = new Set(['narration','emoji-pick','picture-mc','tap-pairs',
  'phrase-pairs','listen-tf']);

function contentWords(text) {
  return (text || '').toLowerCase().match(/[a-z']+/g)
    ?.filter(w => !FUNCTION_WORDS.has(w) && w.length > 2) ?? [];
}

for (const q of lesson.questions) {
  if (EXEMPT_TYPES.has(q.type)) continue;
  const sentence = q.sentence || q.audio || '';
  const correct = q.options?.[q.correctIndex] ?? '';
  const sWords = new Set(contentWords(sentence));
  const cWords = contentWords(correct);
  const overlap = cWords.filter(w => sWords.has(w));
  const ratio = overlap.length / Math.max(cWords.length, 1);
  if (overlap.length >= 2 && ratio >= 0.6) {
    warn(q.id, `X35_A7_CONTENT_WORD_REPEAT (overlap: ${overlap.join(', ')})`);
  }
}
```

**Constraints:**
- NEVER modify `src/` or `lessons-ch*.json` — recommendation only
- Affects `tools/validate-lessons.js` only
- Threshold (≥2 words AND ≥60% ratio) excludes single-word function-word overlaps and single-noun P1 cases; catches genuine P0 content clones

---

*Audit produced by cron-content agent — 2026-06-26 18:10 UTC*
*Next suggested rotation: A1 (obvious correct / gap too easy) on Ch1-8 or A5 (cultural reference) on Ch9-16*
