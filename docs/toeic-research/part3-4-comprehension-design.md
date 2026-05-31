# TOEIC Listening Parts 3 & 4 — Comprehension-Forcing Design Patterns

_Research brief for the WordWar TOEIC-style game. Focus: how ETS prevents phonetic-recognition-only answering and what design conventions you can copy._

---

## Executive Summary

TOEIC Listening Parts 3 (13 conversations × 3 Qs = 39 items) and Part 4 (10 talks × 3 Qs = 30 items) are deliberately engineered so a test-taker cannot answer by surface-level keyword spotting. Three structural design rules drive this:

1. **Mandatory paraphrase.** Correct options almost never reuse the exact noun/verb phrase from the audio. ETS substitutes synonyms ("purchase" → "buy"), category words ("a Toyota" → "a vehicle"), or full reformulations ("I'll send it tomorrow" → "She plans to mail the document").
2. **Three-question span.** Each audio segment carries one gist, one detail, and one inference/implied-meaning question — forcing the listener to hold the *whole* discourse in working memory, not just a single sentence.
3. **Distractors weaponise the audio itself.** Wrong options are seeded with words the listener *did* hear, but attached to the wrong actor, time, claim, or context.

The 2016 reformat (worldwide 2018) added two question types that doubled down on comprehension-forcing: **implied-meaning** ("What does the woman mean when she says X?") and **graphic-linked** questions, both of which are impossible to answer via keyword match.

---

## Question Type Taxonomy (with examples)

ETS does not publish an official frequency distribution, but consistent analysis across prep publishers (Examenglish, EnglishClub, MyToeicCoach, ETS Global handbook) yields the following ~breakdown per 3-question set:

| Type | Approx. share | Typical stem | Example |
|---|---|---|---|
| **Gist / topic / setting** | ~25% (usually Q1) | "What is the conversation about?" / "Where most likely are the speakers?" / "Who most likely is the woman?" | Audio: a customer describing a broken laptop screen → "Where does the conversation take place?" → **A computer repair shop** |
| **Detail** | ~40% | "What does the man say he will do?" / "When will the meeting begin?" / "How much does X cost?" | Audio: "Let's push the launch to next Friday." → "When will the product launch?" → **Next Friday** |
| **Purpose / reason** | ~10% | "Why is the speaker calling?" / "Why does the woman apologize?" | Audio voicemail listing a delayed shipment → "Why is the speaker calling?" → **To report a problem with an order** |
| **Inference** | ~10% | "What can be inferred about X?" / "What will the man probably do next?" | "I can't believe we are really brothers — you can paint far better than him." → Inference: **The man is not a good cook** (he contrasts himself with his brother's cooking) |
| **Implied meaning (2016+)** | ~10% | "What does the woman mean when she says, '____'?" | A worker says "That's the third time this week" about a printer jam → **She is frustrated with the equipment** |
| **Graphic-linked (2016+)** | ~5% | "Look at the graphic. Which session will the speaker attend?" | Schedule chart + audio "I have a conflict at 2 pm" → answer requires cross-referencing |

Source convergence: ETS Global format page, Examenglish Part 3/4 pages, MyToeicCoach guide.

---

## Comprehension-Forcing Techniques

### 1. Paraphrase substitution (the dominant mechanism)

| Audio (heard) | Question stem | Correct option |
|---|---|---|
| "I'll meet you at 3 pm at the lobby." | When will they meet? | At three o'clock |
| "We're running low on toner." | What problem does the woman mention? | Office supplies need to be restocked |
| "Can you e-mail me the report by Friday?" | What does the man ask the woman to do? | Send a document |
| "I take the train every morning." | How does the speaker commute? | By public transportation |

Notice the pattern: lexical item → category/synonym; concrete verb → generic verb ("send", "do"); time phrase → re-expressed numeral. Pomaka English and 3D Academy guides confirm this is the **default** convention: a correct option that copies an audio phrase verbatim is itself a red-flag for being a distractor.

### 2. Multi-turn integration

In three-speaker conversations (introduced 2016), the answer often requires combining information from two speakers — e.g., Speaker A states a constraint, Speaker B proposes a solution, and the correct answer is the *resulting* action. Single-turn keyword scanning fails.

### 3. Discourse-function recognition

Implied-meaning questions test pragmatic competence: sarcasm, hedging, polite refusal. Example: "Well, that's *one* way to do it" → implies disapproval. The literal words contain no negation.

### 4. Forward inference ("What will X probably do next?")

The audio ends before the action; the listener must project. Example: "I'll grab my coat" → **Leave the office**.

---

## Distractor Trap Patterns

ETS and licensed prep authors (Lougheed's *Tactics for TOEIC*, Mork Sensei, EnglishClub) describe 5 recurring trap categories:

### Trap 1 — Same-word, wrong context (the "word echo")
The audio mentions "the bank closes at five". The question asks where they'll meet. Distractor: *At the river bank.* — Same word, different sense.

### Trap 2 — Right word, wrong speaker / wrong actor
Audio: woman says she'll book the flight; man says he'll book the hotel. Question: "What will the man do?" Distractor: *Book a flight.* — Information was in the audio but attached to the other speaker. (Especially common in 3-speaker conversations.)

### Trap 3 — Right topic, wrong claim (the "near miss")
Audio: "The conference is on the 14th, not the 4th as originally planned." Distractor: *The conference is on the 4th.* — Tests whether the listener tracked the correction.

### Trap 4 — Phonetic decoy (sound-alike)
"Massage" vs. "message"; "weighting" vs. "waiting"; "copy" vs. "coffee". Heavier on Part 2, but persists in Parts 3-4 detail questions.

### Trap 5 — Over-inference (plausible but unsupported)
A real-world reasonable conclusion that the audio doesn't actually license. Audio: "I'll have to check with my manager." Distractor: *The manager will reject the request.* — Plausible, never stated.

ETS guidance — inferred from the published Examinee Handbook and from item-writing literature (Haladyna, Assessment Systems) — forbids "implausible" distractors. Every wrong option must be defensible to a reasonable test-taker who half-listened; the trap is doing the listener's *bad* reasoning for them.

---

## Paraphrase Convention — How Often, What Kinds

Across published sample sets (ETS sample test PDF, Examenglish samples) the rate of verbatim correct answers is **low single digits** — typically ≤ 1 per 30-question Part 4. The expected baseline:

- **Detail questions:** ~90% paraphrased. Numbers/dates may stay numerically identical but the framing changes ("3 pm" → "in the afternoon" / "at three").
- **Gist questions:** 100% paraphrased — gist by definition is a category label not stated in the audio.
- **Inference / implied:** 100% paraphrased and reformulated.
- **Graphic-linked:** Answer often *is* a verbatim label from the graphic, but the cross-reference word (e.g., "2 pm") is paraphrased in the audio ("right after lunch").

Paraphrase kinds observed:
- Synonym (purchase → buy)
- Hypernym / category (Toyota → vehicle; Excel → software)
- Nominalisation (decided to leave → her departure)
- Voice change (the package was sent → they sent the package)
- Pragmatic re-expression (sigh + "again?" → frustrated)

---

## Three Anti-Patterns ETS Avoids

Drawn from ETS-aligned item-writing principles (Haladyna's guidelines, BYU Testing Center, Assessment Systems) and visible in TOEIC's published samples:

1. **Verbatim give-aways.** A correct option that copies an exact 3+ word phrase from the audio. ETS treats this as a flawed item — it lets phonetic recognition substitute for comprehension. Game-design implication: avoid options where the correct string is a substring of the audio script.

2. **Length / grammar tells.** The longest option being correct, or the only option that is grammatically consistent with the stem. TOEIC keeps option lengths roughly equal and stems grammatically agnostic ("What does the man …" with verb-phrase options of similar shape).

3. **Absolute-word distractors.** Wrong options containing "always", "never", "only", "all" — these are test-savvy filters and reduce item discrimination. TOEIC distractors stay scoped ("She will probably …", "He suggests …") so absoluteness is not the tell.

A useful corollary anti-pattern: **mutually-exclusive option pairs** (only two of four can possibly both be true) — these collapse the effective choice from 4 to 2 and are explicitly flagged in item-writing literature.

---

## Sources

- [ETS — TOEIC Listening & Reading Sample Test (PDF)](https://www.ets.org/pdfs/toeic/toeic-listening-reading-sample-test.pdf)
- [ETS — TOEIC Listening & Reading Examinee Handbook (PDF)](https://www.ets.org/pdfs/toeic/toeic-listening-reading-test-examinee-handbook.pdf)
- [ETS Global — Format and questions of the TOEIC L&R test](https://www.etsglobal.org/dz/en/help-center/test-content/format-questions-toeic-listening-reading)
- [Examenglish — TOEIC Listening Part 3 practice](https://www.examenglish.com/TOEIC/TOEIC_listening_part3.htm)
- [Examenglish — TOEIC Listening Part 4 practice](https://www.examenglish.com/TOEIC/TOEIC_listening_part4.htm)
- [MyToeicCoach — Part 4 Master Short Talks & Common Traps](https://www.mytoeiccoach.com/toeic-part4-guide)
- [Mork Sensei — Strategies for TOEIC Part 3: Conversations](https://morksensei.com/strategies-for-the-toeic-listening-reading-test-part-3-conversations)
- [Pomaka English — TOEIC tip: Understand distractors](https://pomaka.com/2025/04/17/toeic-tip-understand-distractors/)
- [EnglishClub — TOEIC Part 3 practice notes](https://www.englishclub.com/esl-exams/ets-toeic-practice-3.php)
- [EnglishClub — TOEIC Part 4 practice notes](https://www.englishclub.com/esl-exams/ets-toeic-practice-4.php)
- [Assessment Systems — Item Writing: Tips for Better Test Questions](https://assess.com/item-writing-good-test-questions/)
- [BYU Testing Center — How to Prepare Better Multiple-Choice Test Items (PDF)](https://testing.byu.edu/handbooks/betteritems.pdf)
- [Tarrant & Ware — Impact of item-writing flaws on item difficulty (PMC)](https://pmc.ncbi.nlm.nih.gov/articles/PMC5041405/)
- [Global-Exam — New TOEIC: what has changed?](https://global-exam.com/blog/en/what-is-the-new-toeic-exam/)
- [3D Academy — TOEIC Listening Practice Guide](https://3d-universal.com/en/listening-study-guide/toeic-listening)
- [ETS Research — TOEIC L&R Speaking & Writing: Unique Contribution to English Proficiency Assessment](https://www.ets.org/research/policy_research_reports/publications/chapter/2013/jroc.html)
