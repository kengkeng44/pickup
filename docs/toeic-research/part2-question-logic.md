# TOEIC Listening Part 2 — Question-Response Design Logic

*Research compiled for the WordWar TOEIC-style English-learning game. Sources at bottom.*

---

## Executive Summary

- **Part 2 is a 25-item section** where the test-taker hears one short stem (question or statement) plus three spoken responses (A/B/C) and picks the best fit. There is no printed text — pure listening.
- **WH-questions dominate** (roughly 40–55% of items), followed by Yes/No (~25–30%), then a long tail of tag questions, statements, choice questions, suggestions/requests, and negative questions (~5–10% each).
- **Correct answers are increasingly INDIRECT, not literal.** Since the 2016 redesign, ETS deliberately rewards inference over keyword-matching — e.g. "Did you finish the report?" → "I'll have it ready by 3." (not "Yes, I finished it.")
- **Three canonical distractor families:** phonetic look-alikes (sound-similar trap), repeated-word trap (lexical echo with no semantic link), and related-topic trap (semantic field overlap but wrong proposition).
- **Calibration:** Part 2 spans roughly A2 → B2 on CEFR. A2 items use literal WH-answers, B1 items use indirect/contextual answers, B2 items pile on tag questions, negative questions, and idiomatic deflections ("It's up to Maria.").

---

## 1. Question Stem Patterns

### 1.1 Length

Stems are **typically 6–14 words / 1 spoken sentence / 2–4 seconds** of audio. They are short enough to fit in working memory in one pass — there is no re-listen. Responses are similarly short (usually 4–10 words).

### 1.2 Distribution of stem types (rough estimates, per 25-item set)

| Stem type | Approx. share | Example |
|---|---|---|
| **WH-questions** | 40–55% (≈10–14 items) | "When does the meeting start?" |
| **Yes/No questions** | 25–30% (≈6–8 items) | "Have you submitted the form?" |
| **Tag questions** | 5–10% (≈1–3 items) | "You've met Mr. Tanaka, haven't you?" |
| **Negative questions** | 5–10% (≈1–3 items) | "Isn't the office closed on Monday?" |
| **Choice (or-) questions** | ~5% (≈1–2 items) | "Would you like tea or coffee?" |
| **Statements** | 5–10% (≈1–3 items) | "The printer's broken again." |
| **Suggestions / requests** | ~5–10% | "Why don't we move the meeting?" / "Could you forward me the file?" |

### 1.3 WH-frequency, ranked (synthesized from school analyses)

1. **What** — most common (≈25–30% of WH items). Broad — "What time / What kind / What did you think of…"
2. **When** — ≈15–20%. Always time, often answered with a relative phrase ("Right after lunch", "Sometime next week").
3. **Where** — ≈15%. Location, often answered with a preposition phrase ("On the third floor").
4. **Who** — ≈10–15%. Person/role; answers often a name or job title.
5. **Why** — ≈10%. Reason; answers begin with "Because…" or a bare clause.
6. **How** — ≈10–15%. Manner or quantity ("How long", "How many", "How about…").
7. **Which** — rare (<5%); usually paired with a noun ("Which printer…").

---

## 2. Distractor Doctrine

ETS uses **three primary trap categories** that recur across every form:

### 2.1 Phonetic similarity trap ("sound-alike")

The distractor contains a word that sounds like a word in the stem but means something else. This is the single most reliable trap and the reason ETS explicitly avoids placing the *correct* answer's keyword in the stem.

- Q: "Have you met the new **staff**?"
- Wrong: "No, it's not the same **stuff**."

Other common pairs: *boss / bus, weighing / waiting, copy / coffee, walk / work, fine / find*.

### 2.2 Repeated-word trap (lexical echo)

The distractor literally reuses a word from the stem but the proposition is nonsense.

- Q: "Can you show me how this **printer** works?"
- Wrong: "Yes, the **printer** works well."

Rule of thumb taught in Korean/Japanese cram schools: **if a response repeats a content word from the stem verbatim, it is more likely wrong than right.**

### 2.3 Related-topic / associative trap

The distractor lives in the same semantic field but answers a different question. Brain hears "How many" → wants a number → ETS supplies a number in a wrong-context sentence.

- Q: "How much does the flight to Osaka cost?"
- Wrong: "I'll meet you at the airport." (travel-related but doesn't answer cost)

### 2.4 Secondary traps

- **Wrong tense / pronoun mismatch:** Q in present perfect, distractor in future about another person.
- **Same-word-different-meaning (polysemy):** "How do I *book* the room?" / "Which *book* are you reading?"
- **Mirror-grammar trap:** Distractor copies the stem's syntax to feel "right" but is semantically empty. Q: "Do you have time for a meeting?" / Wrong: "Yes, I have three of them."

### 2.5 Distractor pair structure (best-practice heuristic)

A well-designed 3-option set usually contains: **1 correct (often indirect), 1 phonetic/lexical trap, 1 topical-but-wrong trap.** Avoid two distractors of the same family — it makes elimination too easy.

---

## 3. Sentence-to-Question Contract: Explicit vs Inferred

**The headline finding: post-2016 ETS deliberately weights toward INFERRED answers.** Pre-2016 Part 2 was heavily literal; current forms reward pragmatic comprehension.

### 3.1 Explicit (literal) — A2 territory, ≈30–40% of items
The answer maps cleanly to the WH-word:
- "Where is your office?" → "On the third floor." (Where → location phrase)
- "Who's giving the presentation?" → "I will."

### 3.2 Inferred (indirect speech act) — B1/B2 territory, ≈60–70% of items
The answer doesn't echo the stem grammar. It requires recognizing pragmatic intent.

| Stem | Indirect correct answer | What's required |
|---|---|---|
| "Did you eat sushi in Japan?" | "Actually, I'm not a fan of raw fish." | Infer = No |
| "Do you think the boss will buy us lunch?" | "He's probably too busy today." | Infer = No |
| "When does the report need to be done?" | "Didn't Maria tell you?" | Infer = I don't know, ask elsewhere |
| "Has the shipment arrived?" | "Let me check the system." | Infer = I'm not sure |
| "Should we hire another designer?" | "That's up to the director." | Infer = not my call |

**Diagnostic test:** if an option uses the *same* tense, same nouns, and same question-word as the stem, it's *probably a distractor*. Correct answers tend to switch tense, person, or framing.

---

## 4. Top 5 Anti-Patterns to Avoid

When authoring questions for a TOEIC-style game, avoid these — ETS does:

1. **The phonetic give-away.** Never make the correct answer share a stressed syllable with the stem (e.g. stem says "*walk*", correct answer says "*walk*"). Auditory matching is trained as a *wrong-answer signal*.
2. **The grammar mirror.** Don't write a correct answer that uses the same verb tense, pronoun, and word order as the stem. ETS reserves that pattern for distractors.
3. **The literal Yes/No to a Yes/No stem.** A bare "Yes, I did" or "No, I haven't" as the correct answer is increasingly rare. Correct answers deflect, hedge, or redirect.
4. **Two distractors that are obvious junk.** If two of three options are wildly off-topic, the item collapses to a 50/50 guess. Each distractor must be *plausible at first hearing*.
5. **Domain-specific or culturally narrow vocabulary.** TOEIC tests *workplace* English, not industry jargon or regional idiom. Stems and answers stay in the airport / office / restaurant / hotel / shopping / scheduling / hiring lanes.

Bonus anti-pattern: **doubled-up traps** (a distractor that is BOTH a phonetic look-alike AND a topical match) — these read as "too obviously the trap" and inflate item difficulty without measuring anything useful.

---

## 5. A2 Calibration Heuristic

For an A2-level item bank, lock to these constraints:

- **Stem length ≤ 10 words**, one clause, no subordinate clauses.
- **WH-questions only**, with What/When/Where/Who dominant (skip Why/How nuance).
- **Correct answer is EXPLICIT** — direct mapping (Where → "in/at/on + place"; When → "at + time" or "yesterday/tomorrow/next week"; Who → name or role).
- **Vocabulary inside the top 2,000 General Service List** + a thin shell of high-frequency workplace nouns (meeting, office, email, schedule, manager, report).
- **Verb tenses limited to:** simple present, simple past, "going to" future, present continuous. No present perfect, no conditionals, no modals beyond *can / will*.
- **One distractor of each type only** — one phonetic trap, one topical trap, one off-topic. Never stack two traps of the same family.
- **No tag questions, no negative questions, no statements-as-prompts** — those belong to B1+.
- **Audio pace ≤ 130 wpm** with clear North-American or neutral British accent; A2 learners drop accuracy fast above 150 wpm.

B1 step-up: introduce indirect answers, present perfect, tag questions, mixed accents. B2 step-up: negative questions, idiomatic deflections ("It's not up to me"), faster pace, embedded questions ("Do you know when…").

---

## Sources

- [ETS — TOEIC Listening & Reading Sample Test (official PDF)](https://www.ets.org/pdfs/toeic/toeic-listening-reading-sample-test.pdf)
- [ETS — TOEIC Listening & Reading Examinee Handbook](https://www.ets.org/content/dam/ets-india/pdfs/toeic/toeic-listening-reading-test-examinee-handbook.pdf)
- [ETS — Mapping the TOEIC Tests on the CEFR](https://www.ets.org/pdfs/toeic/toeic-mapping-cefr-reference.pdf)
- [ETS Global — Format and questions of the TOEIC Listening and Reading test](https://www.etsglobal.org/dz/en/help-center/test-content/format-questions-toeic-listening-reading)
- [ExamEnglish — TOEIC Listening Part 2 practice and notes](https://www.examenglish.com/TOEIC/TOEIC_listening_part2.htm)
- [EnglishClub — TOEIC Part 2 Question-Response practice and distractor notes](https://www.englishclub.com/esl-exams/ets-toeic-practice-2.php)
- [Morksensei — Strategies for TOEIC Listening Part 2 (distractor taxonomy + indirect-answer examples)](https://morksensei.com/strategies-for-the-toeic-listening-reading-test-part-2-question-response)
- [Pomaka English — TOEIC Tip: Understand Distractors](https://pomaka.com/2025/04/17/toeic-tip-understand-distractors/)
- [Santa by Riiid — TOEIC Listening Part 2 Useful Tips (Korean prep platform analysis)](https://www.aitutorsanta.com/blog/toeic-listening-part-2-useful-tips/)
- [Oreate AI — TOEIC Part 2 Listening Analysis: Negative and Tag Questions](https://www.oreateai.com/blog/toeic-exam-part-2-listening-analysis-response-strategies-for-negative-and-tag-questions/2d3724ebc204f7fdd315459fdde1b91f)
- [eStudyMe — TOEIC Listening Part 2 Overview, Tips and Tricks](https://estudyme.com/en/toeic-listening-part-2/)
- [JALT Publications — Using TOEIC Part 2 for the instruction of indirect speech acts (academic)](https://jalt-publications.org/tlt/departments/myshare/articles/127-using-toeic-part-2-instruction-indirect-speech-acts)
- [ResearchGate — Automated Vocabulary Profiling of TOEIC Listening Materials: A CEFR-Aligned Approach](https://www.researchgate.net/publication/397283059_Automated_Vocabulary_Profiling_of_TOEIC_Listening_Materials_A_CEFR-Aligned_Approach_for_EFL_Learners)
- [Pass-the-TOEIC-Test — TOEIC Question Types reference](https://www.pass-the-toeic-test.com/free-activities/toeic-question-types.php)
- [Famous James Adventures — Essential Tips for TOEIC Listening Part 2](https://www.famousjamesadventures.com/blog/toeic-listening-part-2-question-and-response-tips)
