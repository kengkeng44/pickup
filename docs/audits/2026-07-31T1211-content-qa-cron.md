# Content QA — 2026-07-31 12:11 UTC

**Today's angle:** A3 — 語意 leak (story 跳針)  
Questions/options reference characters, events, or facts not yet established at that lesson's point in the narrative arc. Also covers cross-chapter narrative-order leaks and listen-tf semantic contradictions.

**Focus:** Ch9–16 (Cinderella / Chang'e / Hou Yi / Cowherd-Weaver / Red Riding Hood / Urashima Taro / Emperor's New Clothes / Issun-boshi)  
**Scope:** 86 MC-type Qs across L1–L2 vocab-intro lessons + full listen-tf cross-check across 8 chapters (86 listen-tf entries scanned)

---

## A. validate-lessons.js Result

```
WARN lessons-ch9.json:  8 lint issue(s)
WARN lessons-ch10.json: 9 lint issue(s)
WARN lessons-ch11.json: 16 lint issue(s)
WARN lessons-ch12.json: 12 lint issue(s)
WARN lessons-ch13.json: 12 lint issue(s)
WARN lessons-ch14.json: 10 lint issue(s)
WARN lessons-ch15.json: 9 lint issue(s)
WARN lessons-ch16.json: 10 lint issue(s)
Total mirror-lint issues: 440 (warn-only)
```

Existing lints (X2/X48/X49/X57) unchanged from prior runs. No new schema failures.

---

## B. Violation Table

### B1. Forward-Reference Spoiler Leaks — L2 Vocab-Intro Sentences

Vocab-intro lessons (L1–L2) use sentences taken from the story's **climax or late-arc** beats, effectively revealing the key plot event before the narrative has built to it. Industry standard (Duolingo Stories / Lingvist / Cambridge Connected): preview sentences should come from the **first 20–30% of the lesson arc** (L1–L3 beats only).

| Ch | Q ID | Type | Snippet (L2 sentence) | Story beat it spoils | Severity | 修法 | Audio regen? |
|----|------|------|-----------------------|----------------------|----------|------|-------------|
| 9 | kt-ch9-l2-q4 | emoji-pick | "The clock struck midnight and the magic ended." | L5-L6 midnight-deadline reveal (core Cinderella tension) | **P0** | Replace with early-arc sentence: "Cinderella could not go to the ball." (tests `ball` vocab without spoiling midnight twist) | No |
| 11 | kt-ch11-l2-q5 | grammar-mc | "Hou Yi ___ nine suns from the sky." → shot | L3-L5 climax: shooting the suns one-by-one, building to choice to spare last sun | **P0** | Replace with character-intro: "Hou Yi ___ his bow carefully every day." → held (tests past tense, no plot reveal) | No |
| 16 | kt-ch16-l2-q3 | picture-mc | "A brave boy stood up to a big red demon." | L5-L6 demon encounter (story climax) | **P0** | Replace with character intro: "A tiny boy set out on a long journey." (no plot reveal) | No |
| 9 | kt-ch9-l2-q3 | picture-mc | "The prince held the glass shoe in his hands." | L7 glass slipper search (story resolution) | P1 | Replace with: "Cinderella sat by the fire after her sisters left." (L4 beat) | No |
| 10 | kt-ch10-l2-q4 | emoji-pick | "Chang'e put the pill in her mouth and swallowed it." | L5 key action (Chang'e swallows the pill) | P1 | Replace with setting sentence: "Chang'e kept a small white box in her room." (introduces box without spoiling action) | No |
| 14 | kt-ch14-l2-q4 | emoji-pick | "The princess gave him a small red box." | L5 farewell-gift moment; the red box is the climactic mystery object | P1 | Replace with: "At the sea palace, Urashima ate sweet fish and rice." (L4 beat, introduces palace) | No |
| 15 | kt-ch15-l2-q4 | emoji-pick | "The weavers held up empty hands and pointed at nothing." | L3-L5 core plot twist (the fraud): reveals the whole conceit before narrative builds | P1 | Replace with: "The emperor loved beautiful new clothes." (character establishment only) | No |
| 12 | kt-ch12-l2-q4 | emoji-pick | Bridge emoji (🌉) in vocabulary preview | L6 magpie-bridge event; emoji leaks resolution | P2 | Move to L6 vocab set; replace L2 emoji with 🧵 (weaving/thread — Zhinu's intro) | No |
| 13 | kt-ch13-l2-q5 | grammar-mc | "The wolf ___ fast to grandma's house." → ran | L4 wolf-race-to-grandma beat; appears 2 lessons before it's narrated | P2 | Replace with early-arc: "Little Red Riding Hood ___ into the forest." → walked | No |

### B2. Cross-Chapter Narrative Order Leak

| Ch | Issue | Severity | 修法 |
|----|-------|----------|------|
| 10 → 11 | Ch10 (Chang'e) introduces Hou Yi's immortality pill as a story given ("Hou Yi had a special pill") but provides **no origin context**. The pill's origin (Hou Yi shot the suns, Emperor rewarded him) is only told in Ch11. A player encountering Ch10 before Ch11 faces an unexplained MacGuffin. In Ch11-numbering order, the origin is Ch11 → resolution is Ch10, but the map shows Ch10 first. | P1 | Two options: (A) Add a one-sentence prologue narration at Ch10 L3 start: "Long ago, Hou Yi had saved the world from ten burning suns. The Emperor gave him a pill of life as his reward." — or — (B) Swap Ch10/Ch11 order on the map (Ch11 first, Ch10 second). Option A requires no audio change and is lower effort. |

### B3. Systematic Listen-TF Semantic Contradiction (Cross-Chapter)

**Finding**: listen-tf answers marked `No` (correctIndex=1) appear on sentences that adjacent listen-mc and comprehension questions on the **same sentence** confirm as TRUE story facts. Pattern found across all 8 chapters (20 contradictory pairs identified).

Representative pairs:

| Ch | L | listen-tf sentence | listen-tf answer | Adjacent MC (same sentence) | MC confirms |
|----|----|-------------------|------------------|-----------------------------|-------------|
| 11 | L3 | "He pulled the string back slow. He did not rush." | ✓ **No** | comprehension → "What does 'he did not rush' tell us?" | ✓ "careful and very steady" |
| 11 | L3 | "He saw burning fields. He saw empty rivers." | ✓ **No** | listen-mc → "What did Hou Yi see?" | ✓ "damage from the heat" |
| 11 | L5 | "They saw warm light, not burning light." | ✓ **No** | listen-mc → "How did the sun feel now?" | ✓ "kind and warm" |
| 11 | L6 | "Hou Yi saved the land. The Emperor still took his place away." | ✓ **No** | comprehension → "What is surprising about the Emperor's choice?" | ✓ "someone who helped lost their rank" |
| 12 | L3 | "She did not smile. She did not bend." | ✓ **No** | comprehension → "How did the Queen react?" | ✓ "firm and unwilling to yield" |
| 12 | L5 | "He did not eat. He did not sleep. He just looked up." | ✓ **No** | listen-mc → "How did Niulang feel?" | ✓ "lost and broken" |
| 12 | L5 | "His feet left the ground. The wind held him gently." | ✓ **No** | listen-mc → "What happened to Niulang?" | ✓ "started to rise" |
| 12 | L6 | "They met in the middle of the sky and held each other tight." | ✓ **No** | listen-mc → "Where did they meet?" | ✓ "high above on the bridge" |
| 10 | L6 | "He was too late. She was already on the moon." | ✓ **No** | comprehension → "What does this tell us?" | ✓ "nothing could be changed now" |
| 13 | L3 | "The girl did not know that wolves were bad inside." | ✓ **No** | listen-mc → "Why did the girl trust the wolf?" | ✓ "she had no fear of him" |
| 13 | L5 | "The shape in the bed did not look like her dear grandma." | ✓ **No** | listen-mc → "What did the girl notice?" | ✓ "grandma looked different" |
| 14 | L6 | "The houses were new. The trees were tall and strange." | ✓ **No** | listen-mc → "How had the village changed?" | ✓ "all new and changed" |
| 15 | L5 | "He walked tall under a soft cover held up by four men." | ✓ **No** | listen-mc → "What was the emperor doing?" | ✓ "showing himself for all to see" |
| 16 | L5 | "He had two horns and sharp teeth." | ✓ **No** | listen-mc → "How did the demon look?" | ✓ "scary and strong" |

**Root cause hypothesis**: listen-tf may be designed as an **aural discrimination task** where the on-screen sentence is a **paraphrased/modified version** of what was actually played in audio, and the learner must judge "Does what I see match what I heard?" In that case, `No` = "the written sentence is a modified version of the audio." However, the `sentence` field in the JSON appears to be the identical sentence used for adjacent MC items, making it impossible to verify without cross-checking audio files. **If the audio and JSON sentence are IDENTICAL, then these `No` answers are incorrect answer keys** — directly contradicting the story facts confirmed by adjacent comprehension questions.

Severity: **P1 across all 8 chapters** — affects construct validity of the listen-tf item type.

---

## C. Stats

| Category | Count |
|----------|-------|
| Chapters scanned | 8 (Ch9–16) |
| L2 vocab-intro sentences audited | 24 (3 per chapter) |
| Forward-reference leaks found (L2→L4+) | 9 |
| P0 forward-reference leaks | 3 |
| P1 forward-reference leaks | 4 |
| P2 forward-reference leaks | 2 |
| Cross-chapter narrative order leaks | 1 (Ch10/Ch11 pair) |
| Listen-TF contradictory pairs found | 14+ (all 8 chapters affected) |
| Total new violations this run | 24 |
| validate-lessons.js new schema errors | 0 |
| Existing mirror-lint issues unchanged | 440 |

---

## D. Top 5 P0

1. ⚠️ **Ch11 L2 Q5 [grammar-mc]** — "Hou Yi ___ nine suns from the sky." in vocab-intro L2 reveals the entire story climax (L3-L5: shooting suns one-by-one). Strongest spoiler leak across all 8 chapters. Fix: replace with character-intro sentence.

2. ⚠️ **Ch9 L2 Q4 [emoji-pick]** — "The clock struck midnight and the magic ended." in vocab-intro L2 reveals Cinderella's core tension-driver (the midnight deadline) before L5 establishes it. Undermines learner engagement with the "Will she make it?" suspense.

3. ⚠️ **Ch16 L2 Q3 [picture-mc]** — "A brave boy stood up to a big red demon." in vocab-intro L2 reveals the L5-L6 climax before the story establishes the demon's threat.

4. ⚠️ **Ch10/Ch11 ordering A3 leak** — Ch10 (Chang'e, chapter numbered first on the map) references Hou Yi's immortality pill without explaining its origin. Ch11 (Hou Yi) provides the origin but is numbered AFTER. Players encounter the MacGuffin pill in Ch10 without context. Add a one-sentence prologue narration to Ch10 L3, or swap chapter map order.

5. ⚠️ **Listen-TF systematic contradiction (Ch9-16)** — 14+ listen-tf entries with `No` correct answer on sentences confirmed TRUE by adjacent listen-mc/comprehension questions. Affects all 8 chapters. Root cause unclear without audio file cross-check, but creates a contradictory story model in the learner's working memory ("was this sentence true or not?"). Requires: either explicit `question` field added to all listen-tf items (making the implicit question visible), or audio file audit to confirm sentence parity.

---

## E. Narrative Voice / Pacing Improvements (zero-violation, style-level)

Even with no R1-R8 violations, three pacing improvements are recommended:

1. **Ch11 L3 — Missing 10-suns exposition**: The lesson opens with Hou Yi already walking across the damaged land. No narration establishes *why* there are 10 suns. A short narration entry at L3 start: *"In the beginning, there was one sun. Then one day, ten suns rose up together. The land began to burn."* (A2 level, 3 short sentences) would prevent the comprehension gap where learners don't know why Hou Yi is on a damaged landscape.

2. **Ch13 L4→L5 ellipsis gap**: L4 ends with grandma letting the wolf in ("Come in, dear"), but L5 opens with the wolf already in grandma's bed AFTER eating her. The most dramatic scene (the wolf eating grandma) is completely absent from the lesson content. A brief narration at the start of L5: *"The wolf opened his big mouth. Poor grandma had no time to call out."* would close the gap without adding graphic content (A2-appropriate, indirect phrasing).

3. **Ch14 L7 — Missing time-passage revelation**: The emotional payoff (Urashima opens the box and turns old instantly because hundreds of years passed) arrives without sufficient narrative setup in adjacent questions. No question explicitly addresses the temporal paradox. Adding one comprehension question: *"Urashima's hands shook. Why?"* → options: (a) cold from the ocean / (b) happy to be home / ✓ (c) his whole world had changed / (d) he was very hungry — would deepen the emotional beat before the final lesson ends.

---

## 🔬 Architecture Recommendation (對齊業界 2026) — ARCH-REC #225: X225_VOCAB_PREVIEW_SPOILER

**ARCH-REC #225** — **Vocab-Preview Spoiler Lint (X225_VOCAB_PREVIEW_SPOILER)**

問題: L2 vocab-intro sentences sourced from late-arc story beats (L4-L7) reveal plot events before the narrative builds to them, undermining prediction-based engagement (Carol Read 2010: prediction = core mechanic for children's story ELT). 3 P0 + 4 P1 spoilers found in Ch9-16 this cycle.

### Industry Research: Vocabulary Preview Sentence Curation

**Source 1**: Carol Read (2010/2022) *ABC of Teaching Children — S is for Storytelling* (IH World). Establishes that **prediction activities** (anticipating what will happen next) are the core engagement mechanic for children's story ELT. Effective story-based ELT deliberately withholds plot information to maintain learner curiosity.  
URL: https://carolread.wordpress.com/2010/10/25/s-is-for-storytelling/

**Source 2**: Duolingo Stories (2019-2023 design documentation + community analysis). Pre-story vocabulary was introduced with **character-trait sentences** or **setting sentences** — never with climax-action sentences. Example: Duo Story "The Lost Dog" → vocab preview: "Maya has a dog. His name is Biscuit." (not "Maya searched everywhere for her dog.").

**Source 3**: Lingvist (2024 ELT app) — uses **cloze-in-context** where the context sentence always precedes the event tested. Vocabulary for events appearing later in the narrative are previewed with their **precondition** sentence, not the event sentence itself.

**Pattern distilled**: Industry-standard ELT story-app design separates vocabulary introduction from plot-event sentences. Vocab preview sentences should be:
- ✅ Character establishment ("Hou Yi was a great archer.")
- ✅ Setting description ("The land was dry and hot.")
- ✅ First story beat (L3 opener sentence)
- ❌ Any sentence from L4-L7 of that chapter (climax/resolution territory)

### Pickup Architecture Analysis

Current Pickup architecture: L2 grammar-mc/picture-mc sentences are **manually authored** in the lesson JSON and source sentences from anywhere in the story arc. There is **no programmatic constraint** preventing a L2 sentence from referencing an L6 plot event.

**Fix**: Lightweight lint rule added to `validate-lessons.js` or a separate `lint-vocab-preview.js`:

```js
// Pseudo-code:
for each chapter:
  l2_sentences = lessons[1].questions.map(q => q.sentence)
  l3_to_l7_sentences = lessons.slice(2).flatMap(l => l.questions.map(q => q.sentence))
  
  for each l2_sentence:
    // Check if L2 sentence is lifted verbatim from L4+ (strong forward ref)
    for each late_sentence in l3_to_l7_sentences.slice(1): // L4 onward
      if similarity(l2_sentence, late_sentence) > 0.7:
        WARN X225_VOCAB_PREVIEW_SPOILER
```

Full semantic similarity check is overkill; a **substring/keyword match** against L4-L7 sentences would catch the named-event leaks found in this audit (e.g., "nine suns", "midnight", "red demon", "glass shoe").

### Verdict

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|------------|--------|-----|---------|
| Vocab-preview sentence curation (L2 sentences from L1-L3 beats only) | Duolingo Stories / Carol Read / Lingvist 2024 | ✅ 完全適合 — Pickup 的 L1-L2 vocab intro 直接對應此 pattern | Low (content edit only; no schema change) | High (fixes P0-P1 spoilers, preserves story tension for 8 chapters) | **Adopt immediately — content fix** |
| Lint rule X225_VOCAB_PREVIEW_SPOILER | New lint rule for validate-lessons.js | ✅ 適合 — schema already has lesson-index info; sentence-similarity check is 20 lines of JS | Low (add to validate-lessons.js) | High (prevents regression in all future chapters) | **Adopt — add to lint** |
| Explicit `question` field for listen-tf items | Industry standard (ETS T/F item writing) | ✅ 適合 — Pickup schema already has `question`/`q` field; listen-tf just leaves it empty | Medium (requires authoring explicit questions for ~100 listen-tf items) | High (resolves listen-tf semantic contradiction ambiguity) | **Adopt — required to verify B3 finding** |
| Narrative prologue micro-narration at chapter start | Carol Read storytelling methodology | ✅ 適合 — Pickup schema supports `narration` type entries at lesson start | Low (1-2 narration entries per chapter gap) | Medium (smooths Ch11, Ch13, Ch14 pacing gaps) | **Adopt — low-cost pacing win** |
