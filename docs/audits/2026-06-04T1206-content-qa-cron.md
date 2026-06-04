# Content QA — 2026-06-04 12:06 UTC

Today's angle: **#1 — R1 Paraphrase 深探 (Buck 1991/2001 verbatim-echo ban)**
Focus: **Ch5 (Baba Yaga / Vasilisa)** + **Ch7 (葉限 / Ye Xian)** — first deep R1 phrase-level pass for both chapters

---

## A. validate-lessons.js result

```
WARN lessons-ch1.json: 2 lint issue(s):
  lessons-ch1.json kt-ch1-l1-q8: X2_OPTION_LIST_BIAS (all start with "to")
  lessons-ch1.json kt-ch1-l5-q3: X2_OPTION_LIST_BIAS (all start with "by")
OK lessons-ch2.json: 7 lessons
WARN lessons-ch3.json: 8 lint issue(s):
  (X2_OPTION_LIST_BIAS — 8 items, same as prior cycle)
OK lessons-ch4.json: 7 lessons
OK lessons-ch5.json: 7 lessons ← Ch5 passes validator but has phrase-echo P0s (see §B)
OK lessons-ch6.json: 7 lessons
OK lessons-ch7.json: 7 lessons ← Ch7 passes validator but has phrase-echo P0s (see §B)

Total mirror-lint issues: 14 (warn-only)
```

**CI gap identified**: `validate-lessons.js` only checks `correct_option.lower() not in sentence.lower()` (full-string). It does NOT detect verbatim bigram/trigram phrase echoes between correct option and sentence. This gap allowed 7 R1 violations to pass CI undetected. See §C for proposed lint rule.

---

## B. Violation table

| Ch | Q ID | Type | Sentence (excerpt) | Correct option | Violation | Severity | Fix | Audio regen? |
|----|------|------|-------------------|----------------|-----------|----------|-----|--------------|
| 5 | kt-ch5-l4-q10 | listen-comp | "...turns **by itself** so its door looks..." | "one house that moves **by itself**" | "by itself" verbatim bigram copy | P0 | "a magical hut that spins to face you" | No |
| 5 | kt-ch5-l5-q5 | listen-mc | "Baba Yaga sat **inside** a great stone **bowl**..." | "riding **inside** a **bowl**" | both content words echoed ("inside"+"bowl") | P0 | "seated in a stone mortar" | No |
| 5 | kt-ch5-l5-q9 | listen-mc | "...breathing in **the air**" | "smelling **the air**" | "the air" bigram echo (partial — "air" is unavoidable) | P1 | "sniffing around her" | No |
| 7 | kt-ch7-l1-q9 | listen-mc | "The new wife only smiled at **her own** child." | "**her own** daughter" | "her own" verbatim bigram; child→daughter trivially A2 | P0 | "the child she kept for herself" | No |
| 7 | kt-ch7-l2-q9 | listen-comp | "Yexian sat **by** the pond..." | "a secret friendship **by the water**" | "by the" echoed; pond→water thin paraphrase | P1 | "a quiet bond between a girl and a fish" | No |
| 7 | kt-ch7-l3-q7 | listen-mc | "No one said **where the fish had come from**." | "**where the fish came from**" | near-verbatim copy — only tense changed (had come→came) | P0 ★ | "the fish's true origin" | No |
| 7 | kt-ch7-l3-q10 | listen-comp | "**Her only friend** was gone..." | "Yexian loses **her only friend**" | "her only friend" 3-word verbatim copy | P0 ★ | "Yexian is left with no one" | No |
| 7 | kt-ch7-l4-q5 | listen-mc | "...under the heap **by the gate**." | "under a pile **by the gate**" | "by the gate" verbatim; heap→pile same-meaning swap | P0 | "buried near the entrance" | No |
| 7 | kt-ch7-l6-q7 | listen-mc | "...lay **on the road** until a passing man..." | "a stranger **on the road**" | "on the road" verbatim location echo | P1 | "a traveller who passed by" | No |
| 7 | kt-ch7-l7-q5 | listen-mc | "...with **one bare foot**, Yexian stepped out..." | "quietly with **one bare foot**" | "one bare foot" 3-word verbatim copy | P0 ★ | "barefoot and stepping into the light" | No |

★ = highest severity (phrase ≥ 3 words, or near-verbatim tense-only change)

---

## C. Stats

| Chapter | Total Q audited (cloze/listen-mc/listen-comp) | P0 | P1 | P2 |
|---------|----------------------------------------------|----|----|----|
| Ch5 | 53 | 2 | 1 | 0 |
| Ch7 | 54 | 5 | 2 | 0 |
| **Total** | **107** | **7** | **3** | **0** |

**Audio regen required**: $0 (violations are in option text only; TTS audio covers sentence text, not options)

**CI gap**: validator catches full-string echoes only. 7 P0s passed CI. Proposed new lint rule (additive, warn-only initially):

```js
// Bigram phrase echo detection
for each Q in lesson:
  correct = options[correctIndex].toLowerCase()
  sent = sentence.toLowerCase()
  words = correct.split(/\s+/)
  for i in range(len(words)-1):
    bigram = words[i] + ' ' + words[i+1]
    // skip if both tokens are stopwords
    if not both_stopwords(bigram):
      if bigram in sent:
        WARN `${qid}: R1_BIGRAM_ECHO ("${bigram}")`
```

---

## D. Top 5 P0

### 1. ⛔ kt-ch7-l3-q7 — Near-verbatim tense-copy (highest severity)
- **Sentence**: `No one at the table said where the fish had come from.`
- **Q**: What did the family hide from Yexian?
- **Current correct [1]**: `where the fish came from`
- **Problem**: Answer differs from sentence only by tense (`had come` → `came`). Any A2 learner reads the sentence and picks this option without any comprehension.
- **Fix**: `the fish's true origin`
- **Alt fix**: `how they got that fish`

### 2. ⛔ kt-ch7-l3-q10 — "her only friend" 3-word verbatim copy
- **Sentence**: `Yexian sat by the empty pond. Her only friend was gone, and she did not know why.`
- **Q**: What is this scene mainly showing?
- **Current correct [0]**: `Yexian loses her only friend`
- **Problem**: "her only friend" lifted verbatim from sentence. Learner scans for the option containing those words.
- **Fix**: `Yexian is left with no one`
- **Alt fix**: `the one thing Yexian loved is taken`

### 3. ⛔ kt-ch7-l7-q5 — "one bare foot" 3-word verbatim copy
- **Sentence**: `Quiet, with one bare foot, Yexian stepped out from behind the new wife.`
- **Q**: How did Yexian come out?
- **Current correct [1]**: `quietly with one bare foot`
- **Problem**: "one bare foot" (3 content words) copied verbatim; "quietly" = paraphrase of "Quiet" only adds one easy synonym swap.
- **Fix**: `barefoot and stepping into the light`
- **Alt fix**: `softly, missing one sandal`

### 4. ⛔ kt-ch7-l4-q5 — location phrase verbatim + synonym swap
- **Sentence**: `"The bones of your fish lie under the heap by the gate."`
- **Q**: Where were the fish bones?
- **Current correct [1]**: `under a pile by the gate`
- **Problem**: "by the gate" verbatim; "pile" = direct synonym of "heap" — learner needs no comprehension beyond word-matching.
- **Fix**: `buried near the entrance`
- **Alt fix**: `hidden at the foot of the doorway`

### 5. ⛔ kt-ch5-l4-q10 — "by itself" double-echo + "house"
- **Sentence**: `A house with legs turns by itself so its door looks at the girl.`
- **Q**: What is this scene mainly showing?
- **Current correct [1]**: `one house that moves by itself`
- **Problem**: "by itself" verbatim bigram; "house" also echoed. Learner scans for the option mentioning a house moving by itself — exactly what the sentence says.
- **Fix**: `a magical hut that spins to face you`
- **Alt fix**: `a living house that turns on command`

---

## E. Narrative voice improvements (mandatory 3, even at 0 R1-R8 violations)

### NV-1: Replace "推理:" prefix with story-inference voice

**Current pattern** (e.g., `kt-ch5-l1-q10` explanationZh):
> 推理:冷眼笑 → 不安好心 → 要派女孩去做危險事。

**Problem**: "推理:" + arrow chains is test-strategy notation that breaks story immersion. Learner reads it as a textbook, not a story.

**Recommended revision**:
> 她笑著,但眼睛是冷的。那種笑讓你知道她打的主意不會是好事。

**Scope**: 12 instances across Ch5 using "推理:" prefix (primarily l1-q10, l2-q3, l3-q3, l4-q5, l5-q3).

### NV-2: Replace "主旨 = " formula with narrative-reformulation

**Current pattern** (e.g., `kt-ch5-l4-q10` explanationZh):
> 主旨 = 屋子自己動。

**Problem**: "主旨 =" is a Chinese literary-analysis textbook formula. For an A2 learner it signals "exam answer" not "story moment."

**Recommended revision**:
> 整間屋子轉過身來迎接她，好像它一直在等她一樣。

**Better versions** use what the sentence evoked emotionally — surprise, dread, wonder — rather than labelling the theme.

**Scope**: approximately 7 instances in Ch5 (l2-q10, l3-q10, l4-q10, l5-q10) and 7 in Ch7 (l1-q10, l2-q9, l3-q10, l4-q10, l5-q10, l6-q10, l7-q10) using "主旨 =" or "主旨 = " pattern.

### NV-3: Animate "Q → Q" arrow-chain explainers into scene moments

**Current pattern** (e.g., `kt-ch5-l4-q3` explanationZh):
> 不是木頭 → 骨頭(see Q4)。

**Problem**: Single-word→single-word arrow chains are exam-shorthand; they interrupt narrative flow and cross-reference other Q IDs which learners cannot see.

**Recommended revision**:
> 圍籬看起來白白亮亮的，但那不是木頭的顏色。往後你會知道那是什麼。

**Principle**: Each explanationZh should stand alone as a micro story-beat comment — max 2 sentences, no Q-ID references, no raw arrow notation.

**Scope**: ~18 instances across Ch5 containing "→" in explanationZh; ~14 in Ch7.

---

*Audit complete. Next rotation candidates: #4 A2 cloze blank position / #7 A5 cultural reference.*
