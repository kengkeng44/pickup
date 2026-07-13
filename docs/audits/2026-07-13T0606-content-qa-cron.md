# Content QA — 2026-07-13 06:06 UTC

**Today's angle:** #8 — A6 option-in-question (correct answer appears verbatim in question stem)
**Focus:** Ch0-8 (core 8 chapters)
**Chapters scanned:** lessons-ch0 through lessons-ch8 (418 scored questions)

---

## A. validate-lessons.js result

```
node tools/validate-lessons.js
Total mirror-lint issues: 440 (warn-only)
A6_OPTION_IN_QUESTION: 0 (existing lint uses substring3 ≥3-token threshold — 2-word matches not caught)
```

**Observation:** The existing `A6_OPTION_IN_QUESTION` lint (lines ~505 in `validate-lessons.js`) uses `substring3()` which requires ≥3 contiguous tokens. It also only covers `listen-mc`, `listen-comprehension`, `comprehension` types. The custom audit script (2-gram + content-word) found 42 additional hits not caught by the current gate.

---

## B. Violation Table

> Classification legend:
> - **P0** = phrase ≥2 content words echoed from question into correct answer → test-wise give-away even without listening
> - **P1** = single key content word (≥4 chars, non-stop) in both question and answer
> - **EXEMPT** = by-design recognition task (emoji-pick single-word is intended identification, not recall)
> - **FP** = false positive (function-word "in the" match, no content value)
> - **CHN** = character-name reference (subject-NP unavoidable in comprehension questions)

| Sev | Ch | Q ID | type | Question snippet | Correct answer | Match | Violation | 修法 | audio regen? |
|-----|----|------|------|-----------------|----------------|-------|-----------|------|--------------|
| **P0** | 3 | kt-ch3-l2-ep1 | emoji-pick | "Which emoji shows taking a nap?" | "😴 taking a nap" | "taking a nap" (3-gram) | A6 exact echo — answer copies Q phrase | Q → "Which emoji shows a racer resting?" | No |
| **P0** | 5 | kt-ch5-l2-ep1 | emoji-pick | "Which one shows a skull?" | "💀 a skull" | "a skull" | A6 exact echo — answer copies Q noun phrase | A → "💀 bare bones, white and still" | No |
| **P0** | 5 | kt-ch5-l1-pm1 | picture-mc | "Which picture matches 'a fence made of bones'?" | "a fence built from white bones" | "a fence" | A6: "a fence" in both Q and A; child can match without reading A | A → "pale white bones lining a path" | No |
| **P0** | 5 | kt-ch5-l5-q10 | comprehension | "How did Baba Yaga know a person was inside?" | "she smelled a person" | "a person" | A6: "a person" in Q telegraphs answer entity | A → "she followed the human scent" | No |
| **P0** | 2 | kt-ch2-l2-pm1 | picture-mc | "Which picture matches 'a reflection in the water'?" | "a duckling looking at itself in the water" | "in the water" | A6: 3-gram "in the water" in both Q quote and A | A → "a duckling seeing its own face in a still pond" | No |
| **P0** | 1 | kt-ch1-l4-x8 | comprehension | "What do the dog's bright eyes tell us?" | "the dog was excited and wanted the dumpling" | "the dog" | CHN — character name reference, unavoidable | No fix needed | No |
| **P0** | 3 | kt-ch3-l4-x8 | comprehension | "What is the contrast between the tortoise and hare in this scene?" | "the tortoise stayed focused while the hare slept" | "the tortoise" | CHN — both characters are topic | No fix needed | No |
| **P0** | 3 | kt-ch3-l4-lg2 | comprehension | "Why did the tortoise not wake the hare up?" | "waking the hare would only slow himself down" | "the hare" | CHN — direct Q about hare | No fix needed | No |
| **P0** | 4 | kt-ch4-l5-x6 | comprehension | "Why did the Djinn come to tell the Camel this?" | "to give the Camel a chance to change" | "the Camel" | CHN — the Camel is the subject | No fix needed | No |
| **P0** | 5 | kt-ch5-l6-x8 | comprehension | "What happened when Vasilisa asked the doll for help?" | "the doll came alive" | "the doll" | CHN — Q is about the doll | No fix needed | No |
| **P0** | 7 | kt-ch7-l6-x5 | comprehension | "What does this journey of the shoe show?" | "the shoe was meant to reach someone important" | "the shoe" | CHN — Q is about the shoe | No fix needed | No |
| **FP** | 2 | kt-ch2-l5-x12 | picture-mc | "Where did the grey duckling stay in the cottage?" | "in the cold, without any hope" | "in the" | Function-word bigram — no content value | No fix needed | No |
| **FP** | 2 | kt-ch2-l6-x1 | comprehension | "What did the grey duckling see in the autumn sky?" | "tiny brown sparrows in the grass" | "in the" | Function-word bigram — no content value | No fix needed | No |
| **P1** | 3 | kt-ch3-l4-q9 | listen-mc | "Was the hare still asleep?" | "yes, deeply asleep" | "asleep" | A6: "asleep" in Q reveals answer direction for Y/N | A → "yes, still sleeping deeply" | No |
| **P1** | 4 | kt-ch4-l6-x6 | comprehension | "What does 'just to be rude' tell us about the Camel?" | "he was rude on purpose, not by accident" | "rude" | A6: "rude" in Q highlights the key word in correct A | A → "it was deliberate, not a mistake" | No |
| **P1** | 8 | kt-ch8-l4-q9 | listen-mc | "How did the wolf knock and speak?" | "loud knock, sweet voice" | "knock" | A6: "knock" in Q signals the correct A phrasing | A → "hard pounding, a gentle voice" | Yes — "loud knock" TTS changes |
| **P1** | 0 | kt-ch0-l1-ep1 | emoji-pick | "Which one is a door?" | "🚪 door" | "door" | EXEMPT — recognition task | No fix needed | No |
| **P1** | 0 | kt-ch0-l4-ep1 | emoji-pick | "Which one is the moon?" | "🌙 moon" | "moon" | EXEMPT — recognition task | No fix needed | No |
| **P1** | 0 | kt-ch0-l5-ep1 | emoji-pick | "Which one is a wall?" | "🧱 wall" | "wall" | EXEMPT — recognition task | No fix needed | No |
| **P1** | 0 | kt-ch0-l6-ep1 | emoji-pick | "Which one is a book?" | "📖 book" | "book" | EXEMPT — recognition task | No fix needed | No |
| **P1** | 1–8 | (22 emoji-pick) | emoji-pick | various "Which one is/shows X?" | "emoji X" | vocab word | EXEMPT — identification/recognition task | No fix needed | No |

---

## C. Stats

| Metric | Count |
|--------|-------|
| Total questions scanned | 418 |
| P0 genuine give-away | 5 (after filtering CHN + FP) |
| P0 character-name (CHN) | 6 |
| P0 false-positive (FP) | 2 |
| P1 genuine listen-mc/comprehension | 3 |
| P1 emoji-pick exempt | 22 |
| P1 picture-mc content word | 2 |
| Clean (no A6 issue) | 376 |

**Type breakdown of scanned questions:**
- `listen-mc`: 98
- `emoji-pick`: 76 (all P1 EXEMPT — by design recognition task)
- `comprehension`: 165
- `picture-mc`: 51
- `grammar-mc`: 19
- `listen-emoji`: 8
- `scroll-pick`: 1

**Key finding:** The existing A6 lint misses 2-gram content phrase matches (only guards ≥3 tokens). The 5 genuine P0 violations fall in this gap — 3-word exact echo (`kt-ch3-l2-ep1`) and 2-word noun phrase echo (`kt-ch5-l2-ep1`, `kt-ch5-l1-pm1`, `kt-ch5-l5-q10`, `kt-ch2-l2-pm1`).

---

## D. Top 5 P0 (Genuine — require fix)

### P0-1 · kt-ch3-l2-ep1 (emoji-pick) ⚠️ Exact echo
- **Q:** "Which emoji shows taking a nap?"
- **A[1]:** "😴 taking a nap"
- **Problem:** The answer is the question phrase + emoji. Child reads Q → matches text to A without any visual reasoning.
- **Fix:** Q → "Which emoji shows a racer resting mid-race?" OR A → "😴 sleeping by the road"
- **Scope:** emoji-pick — no audio regen needed; update `optionsZh[1]` also: "在路邊熟睡"

### P0-2 · kt-ch5-l2-ep1 (emoji-pick) ⚠️ Exact echo
- **Q:** "Which one shows a skull?"
- **A[0]:** "💀 a skull"
- **Problem:** Answer text is Q's noun phrase. No inferential gap at all.
- **Fix:** A → "💀 bare bones, white and still"
- **Scope:** Update `optionsZh[0]` also: "白色骷髏,靜止不動"

### P0-3 · kt-ch2-l2-pm1 (picture-mc) ⚠️ 3-gram phrase echo
- **Q:** "Which picture matches 'a reflection in the water'?"
- **A[correct]:** "a duckling looking at itself in the water"
- **Problem:** "in the water" appears in both the Q quote and A. Child can string-match the phrase.
- **Fix:** A → "a duckling seeing its own face in a still pond"
- **Scope:** Update `optionsZh` correspondingly: "一隻小鴨看見自己的臉映在平靜的池中"

### P0-4 · kt-ch5-l5-q10 (comprehension)
- **Q:** "How did Baba Yaga know a person was inside?"
- **A[0]:** "she smelled a person"
- **Problem:** "a person" in Q telegraphs A. Child asks: "Baba Yaga knew a person was inside... she smelled... a person?" — the entity is given.
- **Fix:** A → "she followed the human scent"
- **Scope:** Update `optionsZh[0]`: "她聞到了人的氣味"

### P0-5 · kt-ch5-l1-pm1 (picture-mc)
- **Q:** "Which picture matches 'a fence made of bones'?"
- **A[2]:** "a fence built from white bones"
- **Problem:** "a fence" opens both Q and A. The string overlap allows text-matching without reading the picture caption.
- **Fix:** A → "pale white bones arranged in a line"
- **Scope:** Update `optionsZh[2]`: "排成一排的白色骨頭"

---

## E. Narrative Voice / Pacing Improvements (3 proposals, no R1-R8 violations required)

**NV-1 · kt-ch3-l2 (tortoise arc intro pacing)**
Current emoji-pick ep1 abruptly introduces "taking a nap" before establishing the mid-race context. Add a single narration Q before ep1 anchoring the scene: "The hare sat down under a big tree to wait. 'I have plenty of time,' he said." This primes the reader's schema before the emoji identification.

**NV-2 · kt-ch5-l5 (Baba Yaga suspense rhythm)**
Lesson l5 has 4 consecutive `comprehension` questions in a row (q7–q10) with no narration beats. The chapter involves a witch's approach — the absence of pauses flattens the tension. Insert 1 brief narration between q9 and q10: "Baba Yaga's footsteps grew louder. The small doll sat very still." Gives children a beat to absorb before the smelling question.

**NV-3 · kt-ch2-l5 (Ugly Duckling winter — warmth gap)**
The duckling's hardest chapter (freezing in the cottage) has several comprehension questions with no encouraging connective tissue. After the comprehension block, a single narration: "But the duckling was still breathing. And that was enough." restores the emotional arc before the final chapters.

---

## 🔬 Architecture Recommendation — ARCH-REC #149 (對齊業界 2026)

### Industry research finding

**Source 1: BenchMarker paper (arXiv 2602.06221, 2026)** — audited MCQ benchmarks at scale; found "word repetition between stem and options" and "convergence (correct answer includes words from question)" as the top 2 item-writing flaws, after "grammatical cues". Impact: compromises construct validity regardless of question type.

**Source 2: PMC best-practices item-writing (PMC6788158)** — faculty review checklist: "avoid including specific determiners or key words from the stem in the correct option." Explicitly applies to all question types including visual/matching formats.

**Source 3: Vocabulary pedagogy 3-period model (Montessori/DLI)** — Naming → Recognition ("Show me X") → Recall ("What is this?"). `emoji-pick` is explicitly a **Recognition stage** task: the question names the concept and the child selects the visual symbol. For Recognition tasks, concept-word match between Q and A is pedagogically expected and NOT a flaw. Only **Recall-stage** or **comprehension** tasks should block this.

### Current architecture gap

`validate-lessons.js` A6 lint (line ~505):
- Uses `substring3()` — requires ≥3 tokens; misses 2-word content bigrams
- Only checks `listen-mc | listen-comprehension | comprehension` — misses `picture-mc` and `emoji-pick`-with-echo

### Proposed enhancement

**ARCH-REC #149 — A6_OPTION_IN_QUESTION: extend to 2-gram content bigrams + emoji-pick echo detection**

```js
// New helper: content bigram check (2+ tokens, both non-function-words)
function contentBigram2(haystack, needle) {
  const h = tokenize(haystack).join(' ');
  const n = tokenize(needle).filter(t => !STOP_WORDS.has(t)); // stop-word filtered
  if (n.length < 2) return null;
  for (let i = 0; i <= n.length - 2; i++) {
    const phrase = n.slice(i, i+2).join(' ');
    if (h.includes(phrase)) return phrase;
  }
  return null;
}

// Emoji-pick echo check: strip leading emoji from answer, compare to Q
function emojiPickEcho(answer, question) {
  const stripped = answer.replace(/^\p{Emoji}\s*/u, '').trim().toLowerCase();
  if (stripped.length < 4) return false;
  return tokenize(question).join(' ').includes(tokenize(stripped).join(' '));
}
```

**Rules:**
1. For `listen-mc | comprehension | picture-mc`: fire if `contentBigram2(question, correct)` hits (both tokens non-function-words)
2. For `emoji-pick` ONLY: fire if `emojiPickEcho(correct, question)` — answer text (minus emoji) is substring of question (exact echo). Single-word match → EXEMPT (recognition-task by design).
3. Continue exempt: character-name context (where Q directly names the subject and A is about that same subject — needs heuristic or `subSkill: 'character-focus'` tag)
4. `warn-only` — do not block build

**False-positive guard:** Filter out function-word bigrams ("in the", "on the", "of a") by requiring both tokens in the bigram to be non-stop-words.

**Expected new coverage:** ~5 genuine P0 per 418 Qs (1.2%) without CHN noise. Emoji-pick echo catches the "taking a nap" / "a skull" class (answer = Q text + emoji). Picture-mc catches "a fence" / "in the water" echo class.

**Pickup 適配:** ✅ Fits static JSON lesson architecture — lint runs at build time on JSON, no runtime changes. Effort: ~30 LOC in `validate-lessons.js`. ROI: high — catches test-wise shortcuts in the Recognition→Comprehension transition questions.

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|------------|--------|-----|---------|
| 2-gram content-bigram A6 check (extend from 3-gram) | PMC6788158 item-writing review | ✅ 直接加到 validate-lessons.js substring3 分支 | XS (20 LOC) | High — closes gap current lint misses | ✅ 建議實作 |
| emoji-pick echo detection (strip emoji, compare text) | BenchMarker arXiv 2602.06221 | ✅ emoji-pick 的 echo 型違規非 EXEMPT | XS (15 LOC) | High — catches P0-1/P0-2 class | ✅ 建議實作 |
| Recognition-stage exemption tag (`subSkill: "recognition"`) | Montessori 3-period model | 🟡 可選: 加 tag 到 emoji-pick questions 明確宣告 recognition intent | S (tag authoring) | Med — 讓 lint 更精準降 FP | 🟡 可選 |

**Cockpit entry:** See row added to 🔬 Architecture Recommendations section (ARCH-REC #149: A6_OPTION_IN_QUESTION 2-gram extend + emoji-pick echo).
