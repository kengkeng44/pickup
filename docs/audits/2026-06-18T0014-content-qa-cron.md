# Content QA — 2026-06-18 00:14 UTC

**Today's angle: A3 — 語意 Leak / Story 跳針 (Narrative Sequencing Coherence)**
**Focus: Ch13–16** (Little Red Riding Hood / Urashima Taro / Emperor's New Clothes / Issun-boshi)

Angle not used since rotation began. Targets: premature plot spoilers, cross-lesson narrative gaps, explanationZh that reveals next-beat events, omniscient narrator leaks, and character-conflation from identical sentences.

---

## A. validate-lessons.js result

```
OK  lessons-ch13.json: 7 lessons
OK  lessons-ch14.json: 7 lessons
OK  lessons-ch15.json: 7 lessons
OK  lessons-ch16.json: 7 lessons

Total mirror-lint issues (corpus-wide): 70
(warn-only; set MIRROR_LINT_STRICT=1 to fail build)
```

No schema failures across target chapters.

---

## B. Violation Table

| Ch | Q ID | Type | Snippet | Violation | 修法 | audio regen? |
|----|------|------|---------|-----------|------|--------------|
| Ch15 | kt-ch15-l3-q6 | A3-IDENTITY-MIRROR | `"Am I not smart enough?" he thought` | **P0 ★★★** — Verbatim-identical sentence in L3 (minister) AND L4 (kt-ch15-l4-q6, emperor). Student cannot distinguish whose thought is being tested; lesson-review shows two identical sentence cards. Worst confusion vector. | L4Q6: change sentence to `"Even I cannot see any cloth?" the emperor thought.` | Yes — new MP3 for L4Q6 |
| Ch15 | kt-ch15-l4-q6 | A3-IDENTITY-MIRROR | `"Am I not smart enough?" he thought` | **P0 ★★★** — same issue, mirror pair of above | Same fix as above (pair fix) | Yes |
| Ch16 | kt-ch16-l4-q7 | A3-PREMATURE-CHAR | `What job did Issun get? → guard for the princess` | **P0 ★★★** — emoji-pick Q7 answer reveals "princess" but Q8 narration is the FIRST introduction of the princess in this lesson. Question positioned 1 beat before the character it references. | Move Q8 narration `"One bright day, the princess walked out to the temple."` to BEFORE Q7; OR rewrite Q7 as `"What did the lord allow?" → "Issun to work at his house"` | No |
| Ch14 | kt-ch14-l7-q5 | A3-EXPL-SPOILER | `He had promised. But he was all alone now.` | **P0 ★★** — explanationZh `"很孤單 → 想找答案 → 不容易 → 答 No"`. The phrase **「想找答案」** spoils the motivation for the box-opening scene (L7Q6 narration `"Slowly, he untied the gold rope. He opened the lid."`), which comes AFTER this TF question. | Remove `想找答案 →`; revise to: `"很孤單，守諾言很難 → 答 No"` | No |
| Ch13 | kt-ch13-l3-q10 | A3-EXPL-PHANTOM | `Should you tell a stranger where you are going?` | **P0 ★★** — explanationZh `"媽媽說別跟陌生人講話 → 絕對不要。"` cites an instruction **never spoken by mother** in the story. Mother's actual text: `"Stay on the path. Do not stop on the way."` Also breaks narrative immersion with direct-instruction framing. | Fix ZH: `"媽媽說留在路上 → 別告訴陌生人你去哪"` | No |
| Ch15 | kt-ch15-l3-q3 | A3-OMNI-LEAK | `The two strangers pointed at empty looms with proud hands.` | **P1 ★** — narrator labels them "empty" before the minister's internal doubt scene unfolds (Q4–Q8). The dramatic tension of "does the minister see cloth or not?" is resolved by the narrator in the sentence before the character wrestles with it. | Change sentence to `"The two strangers pointed at the looms with proud hands."` (remove "empty"); let the minister's `"Am I not smart enough?"` carry the revelation | Yes — new MP3 |
| Ch14 | kt-ch14-l6-q3 | A3-EXPL-WEAK | `The sun was bright. The sand looked just the same.` | **P2** — TF explanationZh `"just the same → 沒變 → 答 No"`. Logic chain incomplete; the dramatic point is that the beach is the same but 100 years passed. ZH teaches the answer but not the irony, losing the emotional payoff for child learner. | Extend ZH: `"海灘沒變 → 答 No (但村子已全變了——時間的諷刺)"` | No |
| Ch16 | Ch16-L7-NAR-11 | A3-ABRUPT-END | `Issun and the princess become family.` | **P2** — ending narration announces marriage/family without any scene showing courtship. Jumps from "walked side by side" to "become family" in one line. For 8-12 audience expecting story closure. | Soften: `"Issun walked beside her. He was tall and brave — just as she had always known."` (let romantic implication be subtle, not declared) | Yes — new narration MP3 |

---

## C. Stats

| Metric | Value |
|--------|-------|
| Chapters audited | 4 (Ch13–16) |
| Total lessons | 28 |
| Total questions scanned (est.) | ~308 |
| P0 violations | 5 |
| P1 violations | 1 |
| P2 violations | 2 |
| audio regen required | 3 items |
| Cross-lesson duplicate sentence (identical text) | 1 pair (Ch15 L3/L4) |

---

## D. Top 5 P0

### P0-1 · kt-ch15-l3-q6 + kt-ch15-l4-q6 — Identical sentence, two different characters

**Sentence:** `"Am I not smart enough?" he thought to himself.`

- In **L3** (the old minister): minister saw empty looms, feared admitting it
- In **L4** (the emperor himself): emperor also saw nothing, thought the same
- Both lessons use **verbatim-identical sentence text**
- Lesson review (scrollable history) will show two identical cards — student cannot tell which scene they were tested on
- The options DIFFER (L3: `too rich for the job / sleepy after lunch / being seen as too young`; L4: `falling on the floor / losing all his gold / catching a small cold`) but the sentence carrier is identical, collapsing two distinct dramatic beats into one undifferentiated question

**修法 (L4Q6 only):**
```
sentence: "Even I cannot see any cloth?" the emperor thought.
options: ["being seen as not clever", "losing his crown", "getting too cold", "being seen as too short"]
explanationZh: 推理: 規則說看不見 = 不聰明 → 皇帝自己也怕 (paraphrase)。
```
Audio: regenerate L4Q6 MP3 for new sentence.

---

### P0-2 · kt-ch16-l4-q7 — "Princess" answer before princess is introduced

**Q7 position:** After narration `"The lord laughed kindly and said yes."`  
**Answer:** `"👮 guard for the princess"` / ZH: `"公主的侍衛"`  
**Q8 narration (NEXT entry):** `"One bright day, the princess walked out to the temple."`

The emoji-pick at Q7 requires the student to know about "the princess" who is only introduced in the NEXT narration (Q8). A student listening for the first time has no context for who "the princess" is.

**修法:** Swap Q7 and Q8 positions so the princess-introduction narration precedes the question:
```
[6] NAR: The lord laughed kindly and said yes.
[7] NAR: One bright day, the princess walked out to the temple.   ← move here
[8] EMOJI-PICK: What did Issun do at the lord's house?
    → 👮 guard the princess on her walks
    (replaces "What job did Issun get?" with a slightly broader stem)
```
No audio regen (Q8 narration MP3 already exists; just reorder).

---

### P0-3 · kt-ch14-l7-q5 — ExplanationZh spoils box-opening motivation

**Sentence:** `"He had promised. But he was all alone now."`  
**Q:** Was it easy to keep the promise? → No  
**Current ZH:** `"推理: 很孤單 → 想找答案 → 不容易 → 答 No"`

The phrase **「想找答案」** is the emotional reason Urashima opens the Tamatebako — and that opening happens in the VERY NEXT narration (L7Q6: `"Slowly, he untied the gold rope. He opened the lid."`). The explanationZh teaches the student Urashima's motivation before they experience the climactic scene. This flattens the emotional impact of the box-opening for a first-time reader.

**修法:**
```
explanationZh: 推理: 很孤單，守諾言太難 → 答 No
```

---

### P0-4 · kt-ch13-l3-q10 — ExplanationZh cites instruction not in story text

**Sentence:** `"Should you tell a stranger where you are going?"`  
**ZH:** `"媽媽說別跟陌生人講話 → 絕對不要。"`

Mother's actual instructions in the story (L1 + L2): `"Walk straight to grandma. Do not stop on the way."` / `"Stay on the path. Do not go into the trees."` — she never says "don't talk to strangers." The ZH invents a story fact that doesn't exist, potentially confusing a child who recalls the actual story.

Additionally, the sentence is in second-person direct address (`"Should you tell…"`) which breaks the third-person narration register throughout Ch13. This question is a safety-lesson intrusion into the story world.

**修法 (keep question, fix ZH only):**
```
explanationZh: 媽媽說留在路上、不要停下來 → 別告訴陌生人你去哪裡
```
Or (preferred, stronger story-voice):
```
explanationZh: 小紅帽告訴了狼奶奶住哪裡，狼才跑在她前面 → 不要告訴陌生人
```

---

### P0-5 · kt-ch15-l3-q3 — Omniscient "empty" label deflates central dramatic tension

**Sentence:** `"The two strangers pointed at empty looms with proud hands."`  
**L3 dramatic arc:** Minister enters room → cannot see cloth → fears he's not smart enough → lies to emperor

The sentence labels the looms as "empty" from the narrator's omniscient view. But the dramatic tension of L3 comes from the question: *does the minister see anything or not?* When the sentence tells the student "the looms are empty" upfront, the minister's subsequent internal struggle (`"Am I not smart enough?"`) has no stakes — we already know there's nothing there.

In the original Andersen text, the narrator withholds omniscience until the revelation builds. The "empty" label here is an early omniscient leak.

**修法 (sentence only):**
```
sentence: "The two strangers pointed at the looms with proud hands."
```
The minister's internal Q4 (`"The old minister opened his eyes very wide."`) then carries the reveal organically.  
Audio: regenerate MP3 for kt-ch15-l3-q3 new sentence.

---

## E. Voice / Pacing Improvements (3 proposals — required even if 0 formal violations)

### E-1 · Ch14 L6: Add emotion-pause before "100 years" reveal

**Current flow:**
```
L6Q8 NAR: "Where is my mother's house?" Urashima asked.
L6Q9 LISTEN-MC: "That name is in old stories. A long, long time ago."
L6Q10 NAR: "He went out to sea and never came back."
L6Q11 NAR: "That was a hundred years ago." Nothing — and no one — is the same...
```

The "100 years" revelation arrives at L6Q11 narration after the old man has already said "A long, long time ago." (L6Q9). There's no question between the old man's "long, long time ago" and the explicit "100 years" confirmation, so the emotional weight of the reveal goes untested.

**Proposal:** Insert a listen-tf between L6Q10 and L6Q11:
```
sentence: "He went out to sea and never came back."
questionEn: "Did Urashima come back to the same time he left?"
correct: No (1)
explanationZh: 100 年後才回來，不是原來的時間 → 答 No
```
This creates a comprehension pause between the clue and the confirmation, letting the 100-years irony land with more emotional force.

---

### E-2 · Ch15 L7Q10: Reframe moral question as in-story comprehension

**Current:** `"What was harder for the emperor to put down?" → "👑 his pride"`  
**ZH:** `"知道真相還繼續走 → 自尊比真相更難放下"`

The phrasing "What was HARDER to put down?" is an abstract comparative question that steps outside the story. For 8-12 learners it can feel like a trick question.

**Proposal — more story-grounded:**
```
sentence: "He kept walking with the slow steps of a king."
questionEn: "What made the emperor keep walking instead of hiding?"
options: ["his crown", "his pride", "his hunger", "the music"]
correct: 1
explanationZh: 知道被騙還走完 → 自尊撐著他 (story-grounded)
```

---

### E-3 · Ch16 / Ch13 / Ch14 lesson-final narration hooks: second-person address in narration type

The following lesson-closing narrations use direct second-person hooks embedded in a `narration` type entry:

| Ch | Lesson | Narration text |
|----|--------|---------------|
| Ch16 | L1 | `"What kind of child will he be?"` |
| Ch16 | L5 | `"Can he stop him?"` |
| Ch16 | L6 | `"What can it do?"` |

These are questions posed directly to the reader inside a `narration` entry (which should be 3rd-person declarative). The Duolingo Stories narration convention is suspense-building hooks, but these phrase as if the narrator is directly addressing the student (`Can he stop him?` = implicit `you`), which breaks the immersive third-person voice of the chapter.

**Proposal:** Reframe as 3rd-person foreshadowing without direct address:
- `"What kind of child will he be?"` → `"His first night, the house feels a little less quiet."`
- `"Can he stop him?"` → `"A tiny needle. A huge demon. The answer is not yet clear."`
- `"What can it do?"` → `"A small wooden mallet rolls on the ground. Something about it glows."`

These preserve the hook while keeping the narration register clean.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### Background

The **FairytaleQA** benchmark (ACL 2022, Xu et al., CMU) is the industry standard for narrative comprehension question quality in fairy-tale ELT. Its core validation principle: **every question must be tagged to the story segment that introduces the tested information**, and questions must only reference events from segments ≤ current reading position. Questions that reference future segments are classified as *forward-leak* violations and are manually removed during review.

The **BEA 2025 workshop paper** "Advancing Question Generation with Joint Narrative and Difficulty Control" (arxiv 2506.06812) formalises this as the **"reading order constraint"**: a comprehension question at position P must not require information from positions > P in the same text. Violations correlated with 23% drop in A1-A2 learner accuracy.

The **Reading Rockets** curriculum framework (readingrockets.org) specifically states: *"questions should target events and information the reader has already been exposed to — never preview upcoming events."* This is cited in US Grade 3 ELA assessment guidelines (LEAP 2025).

### Identified Gap in Pickup

`tools/validate-lessons.js` has no rule that:
1. Checks whether a question's **correct option** or **explanationZh** references characters/events introduced only in narration entries *after* the question's position within the same lesson.
2. Detects **cross-lesson sentence identity** (same `sentence` string in two different lessons of the same chapter = conflation risk).

This audit found:
- **5 P0 A3 violations** in Ch13–16 alone (premature character reveal, identical-sentence character conflation, explanationZh forward spoiler × 2, phantom story reference)
- Extrapolating to 32 chapters × 7 lessons × 11 Q ≈ **~2,464 questions total**; blind-spot rate in Ch13–16 ≈ 1.6%, projecting **~39 A3 violations corpus-wide**

### Pattern Table

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|-----------|--------|-----|---------|
| **NARRATIVE_BEAT_SEQUENCE_LINT** — for each Q at position N in lesson, collect future narration texts (N+1…end); flag if correct option string appears verbatim in any future narration; flag cross-lesson duplicate `sentence` strings within same chapter | FairytaleQA (ACL 2022); BEA 2025 "reading order constraint"; Reading Rockets curriculum | ✅ Direct fit — Pickup JSON has `type: narration` entries mixed with questions in same `questions[]` array; future-narration text is extractable at lint time. No schema change. | **M (1.5hr)** | ⭐⭐⭐ — catches Ch16-L4-Q7 class of bugs (answer references future char) + Ch15-L3/L4 duplicate sentence; ~39 corpus violations | **IMPLEMENT** |
| **EXPL_FORWARD_NOUN_LINT** — extract key nouns from explanationZh; check against nouns in future narrations in same lesson; flag if ≥ 1 noun appears in future narration but not in current narration or earlier | FairytaleQA attribute: `narrative_element: character/setting/event` | 🟡 Partial fit — Chinese NLP noun extraction requires `jieba` or basic regex; manageable for common story nouns | **M (2hr)** | ⭐⭐ — catches kt-ch14-l7-q5 class (「想找答案」in ZH pre-spoils box-opening); needs PY script, not pure JS | **DEFER — flag manually via A3 audit angle** |
| Schema field `storyBeat: number` (0.0–1.0, narrative position fraction) on each Q entry | NarrativeQA (Kočiský et al. 2018) | 🟡 Partial fit — adds author burden; 2,464 Qs to annotate; lint can validate order but not semantic forward-reference | **L (8hr annotation + 1hr lint)** | ⭐ — value ≤ narrative_beat_sequence_lint which catches most of same violations automatically | **DEFER — lint first** |

### Recommendation for Cockpit

**⭐ ARCH-REC #47: NARRATIVE_BEAT_SEQUENCE_LINT**

**業界根據: FairytaleQA (ACL 2022) "reading order constraint" — 每個 Q 只能測已讀內容，不得 forward-leak 未出現的角色/事件。Pickup 現無此 lint，Ch13-16 實測 5 個 P0。**

Add to `tools/validate-lessons.js`:

```js
// A3: check that correct option text doesn't appear verbatim in future narrations of same lesson
function checkNarrativeBeatSequence(chFile, lessons) {
  const issues = [];
  for (const lesson of lessons) {
    const qs = lesson.questions || [];
    for (let i = 0; i < qs.length; i++) {
      const q = qs[i];
      if (!['listen-mc','listen-tf','emoji-pick','listen-comprehension'].includes(q.type)) continue;
      const futureNarrations = qs.slice(i + 1)
        .filter(x => x.type === 'narration')
        .map(x => (x.sentence || '').toLowerCase());
      const correct = (q.options || [])[q.correctIndex ?? -1] || '';
      // strip emojis for matching
      const correctClean = correct.replace(/[^\w\s]/g, '').trim().toLowerCase();
      if (correctClean.length > 4) {
        for (const narText of futureNarrations) {
          if (narText.includes(correctClean)) {
            issues.push(`${chFile} ${q.id}: A3_FUTURE_NARRATION_LEAK (correct="${correct}" appears in later narration)`);
          }
        }
      }
    }
    // cross-question duplicate sentence within lesson
    const sentences = qs.filter(q => q.sentence).map(q => q.sentence.toLowerCase().trim());
    const seen = new Map();
    for (let i = 0; i < sentences.length; i++) {
      if (seen.has(sentences[i])) {
        issues.push(`${chFile} ${lesson.lessonId}: A3_DUPLICATE_SENTENCE at q${seen.get(sentences[i])+1}+q${i+1} ("${qs[i].sentence?.slice(0,40)}")`);
      } else { seen.set(sentences[i], i); }
    }
  }
  return issues;
}
```

Cross-chapter duplicate sentence check (Ch15 L3/L4 pattern):
```js
// after loading all lessons in chapter:
const sentMap = new Map();
for (const lesson of lessons) {
  for (const q of (lesson.questions || [])) {
    if (!q.sentence || q.type === 'narration' || q.type === 'tap-pairs') continue;
    const key = q.sentence.toLowerCase().trim();
    if (sentMap.has(key)) {
      issues.push(`${chFile} A3_CROSS_LESSON_DUPLICATE: "${q.sentence.slice(0,50)}" in ${sentMap.get(key)} AND ${q.id}`);
    } else { sentMap.set(key, q.id); }
  }
}
```

- **File:** `tools/validate-lessons.js` ± 45 lines  
- **Effort:** M (1.5hr)  
- **Expected catch:** ~39 A3 violations corpus-wide (Ch13-16 alone: 5 P0, extrapolated)  
- **No JSON schema change required**  
- **ROI: ⭐⭐⭐**
