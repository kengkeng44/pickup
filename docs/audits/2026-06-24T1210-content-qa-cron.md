# Content QA — 2026-06-24 12:10 UTC

Today's angle: **A7 — Content-word repetition** (correct answer echoes verbatim content word from sentence)
Focus: **Ch17-24** (325 MC Qs across 8 chapters)

---

## A. validate-lessons.js result

```
WARN ch19: 4 issues (X2_OPTION_LIST_BIAS — "he"×2, "by"×1, "they"×1)
WARN ch21: 11 issues (X2_OPTION_LIST_BIAS — "a"×3, "to"×3, "three"/"that"/"they"/"he"/"anansi" ×1 each)
WARN ch24: 1 issue (X2_OPTION_LIST_BIAS — "he"×1)
ch17, ch18, ch20, ch22, ch23: OK
Total mirror-lint issues (all chapters): 70 (warn-only)
```

---

## B. Violation table — A7 Content-word Repetition

> **A7 definition**: Correct answer option re-uses a verbatim content word that is also the keyword of the question AND present in the sentence. Correct answers should use paraphrase (synonym/hypernym/nominalisation) per Buck (2001) R1 rule and Cambridge A2 Key item-writer standards.

| Sev | Ch | Q ID | type | Sentence (abr.) | Question | Correct option | Repeated word(s) | Fix | audio regen? |
|-----|----|----|------|-----------------|----------|----------------|-----------------|-----|------|
| **P0** | 19 | kt-ch19-l1-q9 | listen-mc | "But the river was wide. He could not see the bottom…" | How wide was the river? | "very wide" | `wide` | → "too broad to cross alone" | no |
| **P0** | 21 | kt-ch21-l3-q6 | listen-mc | "Now he had a small green roof on top of his head." | Why was the leaf over his head? | "to keep something off his head" | `head` | → "to shield himself from above" | no |
| **P0** | 23 | kt-ch23-l3-q6 | listen-mc | "The water closed over his head. He could not breathe." | What was happening to the boy in the water? | "going under water" | `water` | → "he was sinking and could not breathe" | no |
| **P0** | 24 | kt-ch24-l1-q3 | listen-mc | "…youngest of seven brothers." | How many brothers did Kong Rong have? | "six older brothers" | `brothers` | → "six older boys in the family" | no |
| **P0** | 24 | kt-ch24-l4-q3 | listen-mc | "He did not take the biggest pear." | Which pear did Kong Rong choose? | "he chose a smaller pear instead" | `pear` | → "the littlest one on the plate" | no |
| P1 | 18 | kt-ch18-l5-q9 | listen-mc | "Warm clothes came out. Toys for the children came out." | What else came from the third gourd? | "warm clothes and toys" | `clothes`, `toys`, `warm` | → "gifts for cold days and play" | no |
| P1 | 20 | kt-ch20-l6-q5 | listen-mc | "The cat holds the dog's tail gently between her front paws." | How does the cat hold on? | "with paws on the dog's tail" | `paws`, `tail`, `dog's` | → "grips tightly from behind" | no |
| P1 | 22 | kt-ch22-l3-q8 | listen-mc | "He held up sticks and called out, just like the sellers." | What was Meng copying from the market? | "the way sellers called out prices" | `sellers`, `called`, `out` | → "the way merchants cried their wares" | no |
| P1 | 23 | kt-ch23-l1-q3 | listen-mc | "The sun was warm. The trees were tall." | What was the day like in the garden? | "warm with tall trees" | `warm`, `tall`, `trees` | → "bright and peaceful outdoors" | no |
| P1 | 24 | kt-ch24-l5-q6 | listen-mc | ""I should take the small one, not the big one."" | What did Kong Rong say he should take? | "the small pear, not the big one" | `small`, `big`, `one` | → "the lesser of the two" | no |
| P1 | 24 | kt-ch24-l7-q6 | listen-mc | "The small boy gave the big pears to his older brothers." | What was Kong Rong saying in two lines together? | "big ones for the older, small one for me" | `big`, `older`, `small` | → "put others before yourself" | no |

**P2 count**: 59 additional borderline overlaps (single common adjective e.g. "quiet", "soft", "bright" — lower risk, review in future cycle)

---

## C. Stats

| Metric | Value |
|--------|-------|
| MC Qs scanned (Ch17-24) | 325 |
| A7 violations (any content-word overlap) | 70 (21.5%) |
| P0 (key word in Q + sentence + answer) | 5 |
| P1 (3+ content words shared) | 6 |
| P2 (1-2 low-risk adjectives) | 59 |
| Chapters with P0 issues | Ch19, Ch21, Ch23, Ch24 |
| Chapters clean (P0/P1 = 0) | Ch17, Ch20 |
| validate-lessons.js FAIL | 0 |
| validate-lessons.js WARN (Ch17-24 only) | 16 |

**A7 rate by chapter**:
- Ch17: 8 P2 / 0 P0-P1
- Ch18: 4 P2 / 1 P1
- Ch19: 7 P2 / 1 P0
- Ch20: 5 P2 / 1 P1
- Ch21: 7 P2 / 1 P0
- Ch22: 7 P2 / 1 P1
- Ch23: 8 P2 / 1 P0
- Ch24: 8 P2 / 2 P0 + 2 P1 ← **worst chapter**

---

## D. Top 5 P0

1. **⚠️ kt-ch19-l1-q9** — Q "How wide was the river?" with answer "very wide" is a pure verbatim echo of the sentence adjective "wide". No comprehension tested — pure word recall. Fix: "too broad to cross alone"

2. **⚠️ kt-ch21-l3-q6** — Q "Why was the leaf over his head?" with answer "to keep something off his head" re-uses "head" literally. The cleverness of the hornets trick is lost. Fix: "to shield himself from above"

3. **⚠️ kt-ch23-l3-q6** — Q "What was happening to the boy in the water?" with answer "going under water" repeats "water" — the Q already mentions water, the answer should describe the **danger**: "he was sinking and could not breathe"

4. **⚠️ kt-ch24-l1-q3** — Q "How many brothers?" with answer "six older brothers" re-uses "brothers". Fix: "six older boys in the family"

5. **⚠️ kt-ch24-l4-q3** — Q "Which pear did Kong Rong choose?" with answer "he chose a smaller pear instead" re-uses "pear". The Q already has "pear", the answer should be concept-level: "the littlest one on the plate"

---

## E. Narrative voice / pacing improvements (even with 0 P0/P1)

These apply regardless of A7 findings:

### E1 — Ch21 (Anansi) inference gap
The hornets-trap episode (l3) is the story's cleverest beat, but current Qs ask only *what happened* (fact recall). No inference Q asks *why* Anansi needed the leaf trick at all. Recommend replacing P2 Q `kt-ch21-l3-q6` (which also has a P0 A7 violation) with:
> Q: "Why did Anansi put the leaf on his head before he spoke?" options: a) because he was cold / b) to make himself look like a tree / c) to trick the hornets into flying out / d) because the sun was too bright
This turns a bare fact into a 3-step inference (leaf → pretend rain → hornets leave).

### E2 — Ch22 (Mencius mother) climax explanationZh is clinical
`kt-ch22-l6-q8` explanationZh reads "每月辛苦工作因為中途放棄而白費" — bureaucratic. The cutting-cloth scene is the story's emotional peak. Recommend:
> "媽媽一刀剪斷幾個月的心血，就是要告訴孟子：半途而廢，一切白費。孩子，學習也是一樣。" — matches Ghibli-warm grandma voice.

### E3 — Ch19 (Mouse Deer) question-stem monotony in l4-l6
Three consecutive Qs in lessons l4/l5/l6 open with "Why could the crocodiles…" or "Why did the big crocodile…" — identical stem pattern. Vary: "What did mouse deer do next?", "How did the plan work?", "What surprised the big crocodile?" — consistent with R7 WH-distribution guideline.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

ARCH-REC #73: X26_A7_CONTENT_WORD_JACCARD_LINT

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|-----------|--------|-----|---------|
| Content-word Jaccard lint: flag correct answer when it shares ≥30% content words with sentence | Buck (2001) R1 paraphrase rule; Cambridge A2 Key "sentences will almost always be paraphrase"; Duolingo 2026 "you can paraphrase — some questions require it" | Add X4_A7_CONTENT_WORD_REPEAT rule to `tools/validate-lessons.js`. For each MC Q: `jaccard(stopwords_filter(sentence), stopwords_filter(correct_option)) >= 0.30` → WARN; >= 0.50 → FAIL. Covers all Ch0-31 on every build. | Low (2hr lint code + 1hr fix P0 items) | Critical — 21.5% of Ch17-24 MC Qs trigger A7; 5 P0 instances tested word-recall not comprehension, violating the core ELT principle for 8-12 children | ✅ IMPLEMENT |
| Auto-paraphrase suggestion via LLM at item-generation time | Duolingo engineering blog 2026; arXiv 2508.20217 LLM-based item generation | When generating new lessons (Python/Node script), post-process each MC Q: if Jaccard ≥ 0.30, auto-call Fable-5 to suggest synonym/paraphrase for correct_option. Prevents A7 at source rather than fixing after. | Medium (3-4hr generator script wrapper) | High — eliminates A7 in Ch25+ content going forward | ✅ IMPLEMENT (Phase 2) |

### Specific lint implementation for `tools/validate-lessons.js`

```js
// X4_A7_CONTENT_WORD_REPEAT: correct answer must not share ≥30% content words with sentence
const STOPWORDS = new Set(['a','an','the','is','are','was','were','be','been','have','has',
  'do','does','did','to','of','in','on','at','by','for','with','from','and','or','but',
  'not','this','that','it','he','she','they','we','you','his','her','their','what','who',
  'where','how','why','all','very','just','so','if','then','when','there','said','got']);
function contentWords(str) {
  return (str || '').toLowerCase().match(/[a-z']+/g)?.filter(w => !STOPWORDS.has(w) && w.length > 2) || [];
}
function jaccard(a, b) {
  const sa = new Set(a), sb = new Set(b);
  const inter = [...sa].filter(w => sb.has(w)).length;
  const union = new Set([...sa, ...sb]).size;
  return union === 0 ? 0 : inter / union;
}
// In Q loop:
if (q.options && q.correctIndex != null) {
  const correct = q.options[q.correctIndex];
  const j = jaccard(contentWords(q.sentence), contentWords(correct));
  if (j >= 0.50) issues.push(`${q.id}: X4_A7_CONTENT_WORD_REPEAT FAIL (Jaccard=${j.toFixed(2)} ≥0.50)`);
  else if (j >= 0.30) issues.push(`${q.id}: X4_A7_CONTENT_WORD_REPEAT WARN (Jaccard=${j.toFixed(2)} ≥0.30)`);
}
```

**Scope of JSON fix needed**:
- Ch24: 2 P0 + 2 P1 — CRITICAL (Kong Rong story, 4 items)
- Ch19: 1 P0 — fix "very wide" → "too broad to cross alone"
- Ch21: 1 P0 — fix "to keep something off his head" → "to shield himself from above"
- Ch23: 1 P0 — fix "going under water" → "he was sinking and could not breathe"
- Ch18/20/22: 1 P1 each — lower urgency

**Effort**: P0 JSON fixes only (no src/ changes) ≈ 1hr. Lint rule ≈ 2hr.
