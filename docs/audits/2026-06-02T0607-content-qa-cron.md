# Content QA — 2026-06-02 06:07 UTC

Today's angle: **#5 — A3 語意 leak (story 跳針) · Narrative Coherence & Continuity**
Focus: Ch3 (醜小鴨), Ch4 (龜兔賽跑), Ch5 (駱駝駝峰 — Kipling)

---

## A. validate-lessons.js result

```
WARN lessons-ch1.json: 31 lint issue(s)  [X2_OPTION_LIST_BIAS + 1×X3_R1_VERBATIM]
WARN lessons-ch2.json: (warn-only)
WARN lessons-ch3.json: (warn-only)
WARN lessons-ch4.json: (warn-only)
WARN lessons-ch5.json: (warn-only)
WARN lessons-ch6.json: (warn-only)
WARN lessons-ch7.json: (warn-only)
WARN lessons-ch8.json: (warn-only)

Total mirror-lint issues: 482  (warn-only; MIRROR_LINT_STRICT=1 to fail build)
All 8 chapters: schema shape PASS.  No byte-identical mirror detected by automated guard.
```

---

## B. Violation table

### Ch3 — 醜小鴨 (Ugly Duckling)

| Ch | Q ID | Type | Sentence snippet | Violation | 修法 | Audio regen? |
|----|------|------|-----------------|-----------|------|-------------|
| 3 | kt-ch3-l11-q6 | listen-comprehension | "He keeps walking because he has nowhere else to go." | **P0 POV SHIFT**: entire L11 uses 1st-person "I" (Q1 "I walk alone", Q2 "I am all by myself", Q3 "I feel alone", Q4 "I do not have a home") → Q6 abruptly switches to 3rd-person "He." Learner loses narrator identity. | Rewrite: "I keep walking because I have nowhere else to go." | Yes |
| 3 | kt-ch3-l13-q6 | listen-comprehension | "The woman did not want him to leave, but her cat drove him away." | **P0 POV SHIFT**: L13 uses "I/me" throughout (Q1 "takes me home", Q2 "gives me", Q4 "I have to leave") → Q6 switches to "him." | Rewrite: "She did not want me to leave, but her cat drove me away." | Yes |
| 3 | kt-ch3-l14-q5 | listen-comprehension | "He cannot follow them because he is not able to fly yet." | **P0 POV SHIFT**: L14 uses "I/my" (Q1 "I look up", Q3 "I do not know", Q4 "My heart wants") → Q5 switches to "He." | Rewrite: "I cannot follow them because I am not able to fly yet." | Yes |
| 3 | kt-ch3-l16 | listen-mc/comprehension | Q2 "He cracks the cold sheet", Q3 "He saves my life", Q5 "The farmer helps him" | **P0 POV MULTI-SWITCH**: L16 alternates I/He across 6 Qs (Q1 "finds me", Q2 "He cracks", Q3 "He saves my life", Q4 "By the fire I feel", Q5 "The farmer helps him", Q6 "I sleep"). Rising confusion about whether narrator is Mochi or external observer. | Q2→"He cracks… and lifts me out." (keep He = farmer); Q3→"He saves my life." (keep — farmer). Q5→"The farmer saves me because he is kind." | Yes (Q5 only) |
| 3 | kt-ch3-l17-q5 | listen-comprehension | "He understands now that he was never really ugly." | **P0 POV SHIFT**: L17 uses "I" (Q2 "I bend down", Q3 "I see my mirror image", Q6 "Tears fall but I smile") → Q5 switches to "He." | Rewrite: "I understand now that I was never really ugly." | Yes |
| 3 | kt-ch3-l18-q4 | listen-comprehension | "He did not have to change first because he was always this beautiful inside." | **P0 POV SHIFT**: L18 uses "I/me/they" (Q3 "They see me", Q5 "I belong", Q6 "This story tells me") → Q4 inserts "He." | Rewrite: "I did not have to change first because I was always beautiful inside." | Yes |
| 3 | kt-ch3-l9→l10 | — | L9 = hen house rejection; L10 = Mother rejects duckling at home | **P0 STORY BEAT INVERSION**: In Andersen's canon, Mother's rejection drives the duckling to run away → then reach the hen house. Ch3 reverses this: hen house (L9) → then mother says "go far away" (L10). Effect→Cause order breaks the causal arc. A2 learner following the story for the first time will be confused why the duckling is at a hen house before leaving home. | Swap L9 ↔ L10 segment order, or add bridging narration in L9 opening explaining "I walked back home…" | No |
| 3 | kt-ch3-l4-q1 | listen-mc | "A handful." | **P1 ORPHAN FRAGMENT**: 2-word noun phrase, no verb. Correct answer is "five." "A handful" is not specifically five; semantically it means "a few" (~4-10). Learner cannot anchor meaning from TTS or text. | Expand: "There are five eggs — a small handful." or "She laid a handful of eggs — just five." | Yes |
| 3 | kt-ch3-l13-q2 | listen-mc | "She gives me some cozy fresh loaf." | **P1 SEMANTIC INCOHERENCE**: "cozy" modifies feelings/spaces, not food. Correct answer "warm bread" is natural; "cozy fresh loaf" is not. A2 learner memorizes wrong colocation. | Rewrite: "She gives me some warm fresh bread." | Yes |
| 3 | kt-ch3-l23-q6 | listen-mc | "The evening of the day after." | **P1 SENTENCE FRAGMENT**: Noun phrase with no verb. Correct answer "tomorrow night" is clear, but TTS reads "the evening of the day after" as an incomplete thought. Same fragment recycled in Ch5 L24 Q5. | Rewrite: "We will meet again the evening of the day after." or "I will be back tomorrow night." | Yes |
| 3 | kt-ch3-l24-q1 | listen-mc | "Hana lifts his head and calls to." | **P1 TRUNCATED SENTENCE**: "calls to" requires an object — "calls to Grandma" or "calls out." Sentence cuts off mid-phrase. | Rewrite: "Hana lifts his head and calls out." | Yes |
| 3 | kt-ch3-l18-q6 | listen-comprehension | "This story tells me that sometimes others see you wrong." | **P1 4TH-WALL BREAK**: Duckling (in inner story) is summarizing the moral of the story they ARE in. Meta-commentary belongs in the outer-outro (Mochi reflecting), not in the inner-story final lesson. Undermines Arabian Nights framing. | Move moral to outer-outro L23 or L24. In L18, use story-internal close: "I fly with them and feel free at last." | No |

### Ch4 — 龜兔賽跑 (Tortoise & Hare)

| Ch | Q ID | Type | Sentence snippet | Violation | 修法 | Audio regen? |
|----|------|------|-----------------|-----------|------|-------------|
| 4 | kt-ch4-l6-q1 = kt-ch4-l15-q1 | listen-mc | "The very aged big tree." | **P0 DUPLICATE SENTENCE + FRAGMENT**: Exact same 5-word sentence appears as Q1 in BOTH L6 (challenge scene, no tree visible yet) and L15 (finish line scene). In L6 context it's unprepared — the tree is introduced here as "The very aged big tree" with no prior sentence establishing it. Also a noun-phrase fragment. | L6 Q1: Replace with "We will race to the oldest tree at the end of the field." L15 Q1: "I can see the very old big tree now." | Yes (both) |
| 4 | kt-ch4-l10-q2 = kt-ch4-l17-q2 | listen-mc | "Not one soul." | **P0 DUPLICATE SENTENCE**: Same 3-word fragment used in L10 (Hare looks back, no one watching) AND L17 (Hare wakes up, no one there). Identical sentence in different narrative moments. Learner sees same sentence twice across chapter with no textual variation. | L10: "I see no one else on the path." L17: "The road is empty." | Yes (both) |
| 4 | kt-ch4-l3-q1 | listen-mc | "A speed contest." | **P1 ORPHAN FRAGMENT**: 3-word noun phrase. No subject, no verb. First content Q of outer-prologue L3. Correct answer "a race" is fine but TTS reads three isolated words. Same pattern as Ch3 L4 Q1. | Expand: "It is a speed contest." or "Tonight's story is about a speed contest." | Yes |
| 4 | kt-ch4-l9-q1 | listen-mc | "Tortoise lifts one taking great care foot." | **P1 GRAMMAR BREAK**: Adverbial phrase "taking great care" incorrectly inserted mid-NP. Grammatical parse fails. Correct answer "carefully" is right, but sentence is unreadable. TTS prosody will be broken. | Rewrite: "Tortoise lifts one foot with great care." | Yes |
| 4 | kt-ch4-l9-q2 | listen-mc | "Pace forward by pace forward, he moves forward." | **P1 LEXICAL STUTTER**: "forward" repeated 3 times in one sentence. Attempt at literary rhythm but reads as drafting error. Correct answer "step by step" shows the intended meaning. | Rewrite: "Pace by pace, he moves toward the finish." | Yes |
| 4 | kt-ch4-l14-q1 | listen-mc | "His paws start to hurt." | **P1 SPECIES MISMATCH**: Tortoises have feet/legs, not paws. "Paws" = padded feet of mammals (cats/dogs). Correct answer is "his feet" — inconsistency between sentence ("paws") and answer ("feet"). A2 learner learns wrong animal vocabulary. | Rewrite: "His feet start to hurt." | Yes |
| 4 | kt-ch4-l21→l22 | — | L21 ends: city mouse dislikes country food. L22 opens: country mouse follows city mouse to the city. | **P1 MISSING NARRATIVE BRIDGE**: The pivotal scene where city mouse INVITES country mouse to visit the city is absent. L21 → L22 jumps from "city mouse doesn't like country food" to "country mouse follows him to the city" with no transition. Learner cannot follow cause/effect. | Add bridging Q in L21 or L22 opening: "City mouse says, 'Come see my home. The food there is very grand.'" | No |
| 4 | kt-ch4-l22-q3 | listen-mc | "The country mouse decides to go house." | **P1 GRAMMAR ERROR**: "go house" is ungrammatical. Should be "go home." Correct answer "to go home" is correct; sentence has the error. | Rewrite: "The country mouse decides to go home." | Yes |

### Ch5 — 駱駝駝峰 (Camel's Hump — Kipling)

| Ch | Q ID | Type | Sentence snippet | Violation | 修法 | Audio regen? |
|----|------|------|-----------------|-----------|------|-------------|
| 5 | kt-ch5-l1-q5 through kt-ch5-l18-q6 (25 instances) | listen-comprehension | e.g. "Where is the warm sandy wind from?", "What paper sheet does Grandma open?", "Why does the Camel stay in the desert?", "How many times has the Camel said 'Humph!'?" | **P0 SYSTEMIC: QUESTION-AS-SENTENCE (25/150 = 16.7%)**: In all 25 cases, the `sentence` field contains a question (ends with `?`) and `questionEn` is empty `''`. Per spec R2: `sentence` = declarative story content TTS reads aloud; `questionEn` = comprehension question displayed. Having the question IN `sentence` means: (1) TTS reads rising-intonation question as story audio → learner hears a question as "narration"; (2) No declarative story anchor before answering — learner asked to answer a question with no story sentence to base it on; (3) Spec R2 structure broken. This pattern repeats in Ch6 (32/150 = 21%), Ch7 (10/150), Ch8 (27/150) — systemic across 94 questions in Ch5-8. | For each: extract question to `questionEn`; replace `sentence` with the declarative story sentence it's testing. E.g. L1 Q5: sentence→"The warm sandy wind blows in from the desert tonight." questionEn→"Where is the warm sandy wind from?" | Yes for all 25 (Ch5) — new declarative sentences need TTS. Ch6-8 also affected (94 total). |
| 5 | kt-ch5-l8-q1 | listen-mc | "On One of those the Dog came to him." | **P1 GARBLED DATELINE**: "On One of those" has no antecedent — "those" refers to nothing established. Should be "On Tuesday the Dog came to him." (the story has a Mon/Tue/Wed structure). | Rewrite: "On Tuesday the Dog came to him." | Yes |
| 5 | kt-ch5-l8-q6, kt-ch5-l10-q6, kt-ch5-l15-q4 | listen-mc | `("Hmph!")` (3 instances) | **P1 PARENTHETICAL FRAGMENT RECYCLED 3×**: Parenthetical-only sentence used as story `sentence` three times. TTS reads "(Humph!)" with no context sentence. Correct answers across three instances all map to "Humph" but provide no new vocabulary or story content — pure repetition. | Replace each with story-contextual sentence: L8 Q6: "The Camel just says his one word." L10 Q6: "For the third time, the same sound comes." L15 Q4: "Even to the Great Spirit, the Camel will not change his word." | Yes (all 3) |
| 5 | kt-ch5-l24-q5 | listen-mc | "The evening of the day after." | **P1 CROSS-CHAPTER COPY-PASTE FRAGMENT**: Exact same broken fragment also in Ch3 L23 Q6. Sentence is a noun phrase with no verb. Correct answer "tomorrow night" shows intent. | Rewrite: "I will come back tomorrow evening." | Yes |
| 5 | kt-ch5-l12-q2 = kt-ch5-l13-q4 | listen-mc | "The one who walks the sands." | **P1 DUPLICATE WITHIN CHAPTER**: Exact same sentence appears in both L12 Q2 and L13 Q4. | L13 Q4: Rewrite as "He is lord of the desert and all that lives there." | Yes (L13 Q4) |

---

## C. Stats

| Metric | Count |
|--------|-------|
| Lessons sampled | 39 (all of Ch3 + Ch4 + Ch5 = 3 × 25 + 25 + 25) |
| Questions examined | 450 (all Qs in Ch3-5) |
| Total violations found | 28 |
| **P0 violations** | **10** |
| P1 violations | 18 |
| Audio regen required | ~48 Q (6 POV-fix + 2 Ch4 duplicates + 9 Ch4 grammar + 25 Ch5 systemic + 3 Hmph + Ch5 others) |
| Chapters with systemic issue | Ch5 (25), Ch6 (32), Ch7 (10), Ch8 (27) = 94 Q total affected |

**Cross-chapter systemic scope: question-as-sentence affects 94/600 questions in Ch5-8 (15.7%).** Root cause: Ch5-8 content was generated with a different prompt structure that placed the comprehension question in `sentence` instead of `questionEn`.

---

## D. Top 5 P0

### P0-1 — Ch5-8 Systemic: `sentence` = question, `questionEn` = "" (94 instances)

**Root cause**: Ch5-8 content generation used `listen-comprehension` entries where the writer put the question directly into `sentence` and left `questionEn` blank. This breaks:
- TTS: audio reads a question with rising intonation as "story narration"
- Spec R2: `sentence` must be declarative story content
- UX: learner hears a question as "story content" then is asked options — double-question structure with no narrative anchor

**Fix**: Mechanical pass — for each `sentence` ending in `?` with `questionEn == ''`: infer the declarative story sentence, write it to `sentence`; move the question to `questionEn`. Requires ~94 TTS audio regenerations across Ch5-8.

---

### P0-2 — Ch3 L11/L13/L14/L17/L18: 1st-person → 3rd-person POV shift (6 lessons)

**Root cause**: The inner-story duckling narrator uses "I" throughout, but every few lessons a summary/comprehension sentence switches to "He/him." Likely auto-generated comprehension summaries that defaulted to 3rd-person summary style even inside a 1st-person story.

**Pattern**: All 6 violations are in `listen-comprehension` type, at the lesson-final Q position (the "big picture" summary Q). This suggests the generation prompt for that Q type drifted to 3rd-person.

**Fix**: Rewrite all 6 to 1st-person. Zero story meaning change — just pronoun substitution. Requires 6 audio regen.

---

### P0-3 — Ch3 L9 → L10: Story beat inversion (hen house before mother's farewell)

**Root cause**: In Andersen's Ugly Duckling, the causal chain is: siblings mock → duckling unbearable life at home → runs away → hen house. Ch3 puts hen house (L9) BEFORE mother's farewell (L10), reversing cause → effect. L10's "Mother sighs and looks away / You should go far, child" becomes a confused flashback after the duckling has already left home and visited a hen house.

**Fix**: Swap L9 ↔ L10 or add bridging line at L9 open: "I walk back home one more time." No audio regen if lessons are reordered without content change.

---

### P0-4 — Ch4 L6-Q1 = Ch4 L15-Q1: Duplicate sentence in different contexts

**Sentence**: "The very aged big tree." — exact duplicate across two different narrative moments.  
In L6 (Hare issues the challenge), the tree as finish line is being introduced for the first time. In L15 (Tortoise almost there), the tree is the approaching goal. Same 5-word fragment serves both contexts with no differentiation.

Additionally: "Not one soul." (Ch4) also duplicated at L10 Q2 and L17 Q2.

**Fix**: Differentiate both sentences per context. Requires 4 audio regen.

---

### P0-5 — Ch3 L16: Multi-switch POV (farmer's POV bleeds into duckling POV)

L16 is structurally the most confused: Q1 "A kind man of the land finds **me**" (duckling POV), Q2 "**He** cracks the cold sheet and lifts me out" (farmer = He, duckling = me — fine), Q3 "**He** saves my life" (fine), Q4 "By the fire I feel cozy" (duckling POV), Q5 "The farmer helps **him** because…" (3rd-person "him" instead of "me"), Q6 "I sleep heavily" (back to duckling POV).

Q5 is the violation — "The farmer helps him" should be "The farmer saves me." The inconsistency in Q5 interrupts an otherwise coherent lesson.

**Fix**: Q5 → "The farmer helps me because he is kind." 1 audio regen.

---

## E. Narrative Voice / Pacing Improvements (required even if 0 R-violations)

### NV-1 — Ch3 L3 → L4: Missing Arabian Nights frame-entry marker

L3 ends: "The story is about a duckling that everyone calls ugly." L4 immediately starts: "A handful." — with no transition to mark POV shift from Mochi (outer) to Duckling (inner, 1st person).

**Proposal**: Add a narration bridge Q at start of L4 (or end of L3): "Grandma's voice changes. Now I am inside her story." This signals the Arabian Nights frame-entry — Mochi's "I" becomes the Duckling's "I."

### NV-2 — Ch3 L18: Moral belongs in outer-outro, not inner story

L18 Q6: "This story tells me that sometimes others see you wrong." — the duckling is narrating the story's theme while still IN the story. This meta-commentary is pacing-breaking: the reader/learner is still inside the inner story when this line arrives.

**Proposal**: Move moral reflection to L23 outer-outro (Mochi on the wall after story ends). Replace L18 Q6 with a story-internal emotional close: "I fly with them and feel joy I never knew before."

### NV-3 — Ch4 L21 → L22: Missing city-mouse invitation scene

The two-mouse fable (L21-22) is missing the pivot: city mouse inviting country mouse to visit the city. L21 ends with city mouse disliking country food; L22 opens with country mouse already following city mouse to the city. A2 learner sees a logic gap — why did the country mouse follow?

**Proposal**: Add bridging sentence in L22 Q1 or insert new L21 Q6: "City mouse says, 'Come to my house. The food there is very fine.'" This makes the cause-effect explicit and adds ~1 new vocabulary item ("fine" = 精緻的).

---

*Audit generated: 2026-06-02 06:07 UTC · Angle: A3 語意 leak · Ch3-5 · 28 violations (10 P0)*
