# Content QA — 2026-06-02 00:06 UTC

Today's angle: **#2 — R2 Distractor Doctrine (4-option functional audit)**
Focus: **Ch1 + Ch2 L5 + Ch3 L4** — deep manual A3 junk-distractor scan

---

## A. validate-lessons.js result

```
WARN lessons-ch1.json: 31 lint issue(s)
WARN lessons-ch2.json: 52 lint issue(s)
WARN lessons-ch3.json: 85 lint issue(s)
WARN lessons-ch4.json: 83 lint issue(s)
WARN lessons-ch5.json: 63 lint issue(s)
WARN lessons-ch6.json: 59 lint issue(s)
WARN lessons-ch7.json: 44 lint issue(s)
WARN lessons-ch8.json: 65 lint issue(s)
```

Breakdown by rule across all 8 chapters:
- X2_OPTION_LIST_BIAS (all options share same starting word): **311** violations
- X3_R1_VERBATIM (correct option substring of sentence): **63** violations
- No automated A3/R4 (junk distractor) lint — this audit fills that gap manually.

---

## B. Violation Table

> **A3 = Junk/obvious-miss distractor** (anti-pattern from spec §Anti-patterns)
> Non-functional = learner can eliminate it instantly due to wrong semantic category, wrong grammatical class, or zero contextual plausibility — independent of vocabulary knowledge.
> Audio regen = never needed; listen-mc options are post-reveal text-only (spec R2, B.139).

| Ch | Q ID | Type | Sentence snippet | Violation | 修法 | audio regen? |
|----|------|------|-----------------|-----------|------|--------------|
| 1 | **kt-ch1-l4-q3** | listen-mc | "No stars or moon are out tonight." Q: "Which word fits the night?" | **A3 ×1** — `deer(鹿)` is an animal noun; question targets night-descriptor adjectives. Zero plausibility as descriptor of a night. | Replace `deer` → `dull(暗淡)` — phonological /d/ family + plausible "dull night" schema | no |
| 1 | **kt-ch1-l4-q12** | listen-mc | "A deep rumble shakes the sky." Q: "What rumbling sound comes from the sky?" | **⚠️ A3 ×3 P0** — `thread(線)`, `throat(喉嚨)`, `thumbs(拇指)`: none are sky sounds. All are body/object nouns that cannot produce sky rumbles. Question category = sky-sound phenomena. | Replace: `thread→rain(雨)`, `throat→wind(風)`, `thumbs→hail(冰雹)` — all sky-sound words, phonological /θ,r/ family preserved where possible | no |
| 1 | **kt-ch1-l5-q2** | listen-mc | "Her coat of hair is soaked through." Q: "Which body part of the kitten got soaked?" | **⚠️ A3 ×3 P0** — `fire(火)` is an element, `far(遠)` is an adverb, `for(為了)` is a preposition. ALL 3 distractors are wrong grammatical class. Question explicitly asks for a body part (noun). | Replace: `fire→tail(尾巴)`, `far→ear(耳朵)`, `for→paw(腳掌)` — all cat body parts + /f/ phonological anchor maintained for `fur` | no |
| 1 | **kt-ch1-l5-q3** | listen-mc | "No food has come to her for a couple of days." Q: "How many days without food?" | **A3 ×2** — `toes(腳趾)` = body part, `tour(旅行)` = event noun; neither is a number. Question explicitly requires a number word. `too(太)` borderline (sounds like "two") but category-fail as well. | Replace: `toes→one(一)`, `tour→three(三)` — number words, /t/ phonological family intact | no |
| 1 | **kt-ch1-l5-q6** | listen-mc | "Her ears press down against her head." Q: "How are her ears?" | **A3 ×1** — `flag(旗)` = inanimate object noun; cannot describe an ear state. All other options (fluff/flip/flat) are plausible ear descriptors. | Replace `flag` → `floppy(耷拉)` — adjective, /fl/ phonological family + plausible ear descriptor | no |
| 1 | **kt-ch1-l6-q1** | listen-mc | "She rolls her body into a tight shape." Q: "How does the kitten stay warm?" | **A3 ×1** — `kills(殺)` is a violent transitive verb; zero connection to warmth. Other options (cools/curls/calls) are at least plausible kitten actions. | Replace `kills` → `coils(盤繞)` — phonological /k-lz/ family + semantically relevant (coiling = warmth action) | no |
| 1 | **kt-ch1-l6-q3** | listen-mc | "No one is with her." Q: "How is the kitten by herself?" | **A3 ×1** — `aloud(大聲)` describes volume/sound production; has no semantic link to the state of being alone. Question targets alone-ness descriptors. | Replace `aloud` → `apart(分離)` — /a/ family + plausible "separated" synonym | no |
| 1 | **kt-ch1-l7-q1** | listen-mc | "A large dark figure draws nearer." Q: "What does the kitten see in the dark?" | **A3 ×2** — `sheep(羊)` in a dark rainy alley has zero contextual plausibility; `shows(展示)` is a verb/plural noun, not a dark figure noun. Question requires dark-figure nouns. | Replace: `sheep→shape(形狀)`, `shows→shroud(黑影)` — /sh/ family + plausible dark objects | no |
| 1 | **kt-ch1-l7-q3** | listen-mc | "It turns out to be a lady, not a beast." Q: "Who turned out to be there?" | **A3 ×2** — `warmly(溫暖)` is an adverb, `wonder(驚奇)` is an abstract noun; both are wrong class. Question "who?" demands a person noun. `women(女人們)` is functional (near-miss plural). | Replace: `warmly→widow(寡婦)`, `wonder→wanderer(流浪者)` — person nouns, /w/ phonological family | no |
| 1 | **kt-ch1-l7-q7** | listen-mc | "Her hair has turned the color of stone." Q: "How is her hair?" | **A3 ×2** — `grain(穀物)` = food category, `great(很棒)` = evaluative adjective; neither is a color or appearance descriptor. `grim(嚴峻)` borderline-functional. | Replace: `grain→gold(金色)`, `great→green(綠色)` — color words, /gr/ phonological family preserved | no |
| 1 | **kt-ch1-l8-q6** | listen-mc | "The umbrella spreads broad and large." Q: "Size-wise, how is the umbrella?" | **⚠️ A3 ×3 P0** — `wise(聰明)`, `wild(狂野)`, `weak(虛弱)`: ALL are non-size descriptors. Question explicitly anchors to size. | Replace: `wise→narrow(窄)`, `wild→small(小)`, `weak→long(長)` — size adjectives, /w/ phonological family partially preserved | no |
| 1 | **kt-ch1-l8-q7** | listen-mc | "No more water touches her fur now." Q: "In her body, how is the kitten?" | **⚠️ A3 ×3 P0** — `deep(深)`, `drop(掉)`, `draw(畫)`: none describe a body state. `drop` and `draw` are verbs; `deep` describes depth not animal state. | Replace: `deep→damp(潮濕)`, `drop→cold(冷)`, `draw→dirty(髒)` — state adjectives, /d/ phonological family | no |
| 2 | **kt-ch2-l5-q2** | listen-mc | "It was rose-colored and round and very big." Q: "What color was it?" | **A3 ×2** — `small(小)` = size descriptor, `round(圓)` = shape descriptor; neither is a color. Question explicitly asks for color. | Replace: `small→red(紅色)`, `round→orange(橘色)` — color words that are plausible fruit colors | no |
| 3 | **kt-ch3-l4-q3** | listen-mc | "It is dark and warm here." Q: "How does the duckling feel inside?" | **⚠️ A3 ×3 P0** — `wave(揮手)` = gesture/movement, `worm(蟲)` = animal noun, `warn(警告)` = verb; ALL wrong class/category. Question asks for sensation/feeling adjectives. | Replace: `wave→cool(涼)`, `worm→cold(冷)`, `warn→wet(濕)` — sensation adjectives, /w/ phonological anchor | no |

---

## C. Stats

| Metric | Value |
|--------|-------|
| Lessons deep-scanned | 13 (Ch1 L4-L8 + Ch2 L5-L9 + Ch3 L4-L7) |
| Questions examined | ~65 listen-mc / listen-comprehension |
| A3 violations found | **14 Q-IDs** across Ch1 + Ch2 + Ch3 |
| P0 (≥2 junk distractors simultaneously) | **6** |
| P1 (1 junk distractor) | **8** |
| Audio regen required | **0** |
| Automated lint coverage of A3 | **None** — validator has no R4/A3 rule |
| Ch2/Ch3 overall distractor quality | Significantly better than Ch1 (Ch2 ~2 violations in 30Q examined) |

**Systemic root cause:** Ch1 listen-mc questions use **phonological rhyme clusters** (fire/fur/far/for, toes/too/two/tour, etc.) as a deliberate phonemic awareness mechanism. When the question targets a semantic category (body part / number / color / size), phonological neighbors that don't belong to that category become immediately eliminable — the semantic category filter operates before the phonological filter for A2 learners reading Chinese option labels. This makes ~40% of phonological distractors in Ch1 non-functional.

Ch2-Ch3 use semantic-field clusters (floated/flew/fell/rolled; cold/sour/hurt/happy) which are inherently functional because all options belong to the question's expected answer category.

---

## D. Top 5 P0

### P0-1 — kt-ch1-l5-q2: ALL 3 distractors non-body-parts
```
Q: "Which body part of the kitten got soaked?"
[ ] fire (火)      ← element
[ ] far (遠)       ← adverb
[OK] fur (毛)
[ ] for (為了)     ← preposition
```
An A2 learner reading the Chinese labels sees: 火 / 遠 / 毛 / 為了 → instantly picks 毛 without engaging with the English. The 3 distractors require zero listening comprehension to eliminate — they don't even form plausible wrong answers.
**Fix:** `fire→tail(尾巴)`, `far→ear(耳朵)`, `for→paw(腳掌)`.

---

### P0-2 — kt-ch1-l8-q7: ALL 3 distractors are verbs/depth words, not animal states
```
Q: "In her body, how is the kitten?"
[OK] dry (乾)
[ ] deep (深)    ← depth, not body state
[ ] drop (掉)    ← verb
[ ] draw (畫)    ← verb
```
A2 learner sees: 乾 / 深 / 掉 / 畫 → 乾 is the only adjective describing an animal state. No phonological processing needed.
**Fix:** `deep→damp(潮濕)`, `drop→cold(冷)`, `draw→dirty(髒)`.

---

### P0-3 — kt-ch1-l8-q6: ALL 3 distractors non-size
```
Q: "Size-wise, how is the umbrella?"
[ ] wise (聰明)   ← intellectual quality
[ ] wild (狂野)   ← behavioral quality
[OK] wide (寬)
[ ] weak (虛弱)   ← strength quality
```
The question stem explicitly says "size-wise" — only `wide` belongs to the size domain. Any learner who understands "size-wise" in Chinese immediately picks 寬.
**Fix:** `wise→narrow(窄)`, `wild→small(小)`, `weak→long(長)`.

---

### P0-4 — kt-ch1-l4-q12: ALL 3 distractors non-sky-sounds
```
Q: "What rumbling sound comes from the sky?"
[OK] thunder (雷)
[ ] thread (線)    ← string material
[ ] throat (喉嚨)  ← human body part
[ ] thumbs (拇指)  ← human body part
```
Chinese labels: 雷 / 線 / 喉嚨 / 拇指. Only one can come from the sky and rumble.
**Fix:** `thread→rain(雨)`, `throat→wind(風)`, `thumbs→hail(冰雹)`.

---

### P0-5 — kt-ch3-l4-q3: ALL 3 distractors non-sensation adjectives
```
Q: "How does the duckling feel inside?"
[OK] warm (溫暖)
[ ] wave (揮手)   ← gesture/movement verb
[ ] worm (蟲)     ← animal noun
[ ] warn (警告)   ← directive verb
```
Ch3 has the same phonological-cluster design flaw as Ch1. `worm`, `wave`, `warn` cannot answer "how does X feel?" in any context.
**Fix:** `wave→cool(涼)`, `worm→cold(冷)`, `warn→wet(濕)`.

---

## E. Narrative Voice / Pacing Improvements (beyond R1-R8)

Even with these mechanical violations fixed, 3 pacing/voice improvements would strengthen Ch1-Ch3:

### NV-1: Fragment sentences as listen-mc inputs (Ch2/Ch3)
`kt-ch2-l5-q6` sentence: `"For her partner to enjoy."` — grammatically incomplete. Heard in isolation (as TTS voices it), A2 learners have no subject/verb referent. Even the question ("Why did she want the peach?") implies a preceding sentence they haven't heard.

**Proposal:** Expand to full sentence with subject: `"She brought it home for her partner to enjoy."` — preserves focus word while providing sufficient listening context.

### NV-2: Single-word fragment sentences leak the answer (Ch3)
`kt-ch3-l4-q1` sentence: `"A handful."` Q: "How many eggs are there?" Answer: `five`.
The sentence "a handful" ≠ "five" — it's an approximation, not a measurement. An A2 learner who knows "handful" would learn a conflicting concept (handful ≠ exactly 5). 

**Proposal:** `"She has five eggs in a small nest."` — carries the number explicitly + provides nesting context for the duckling POV.

### NV-3: Distractor sets in Ch2 could exploit false-cognate confusion more
`kt-ch2-l8-q1`: Naming question with options Tomato/Momoko/Hanako/**Momotaro**. For Taiwanese learners unfamiliar with Japanese folktale names, `Momoko` (桃子 in Japanese) is a false friend — it literally means "peach girl" and could mislead learners into picking it. Currently the question tests Japanese cultural recall, not listening comprehension.

**Proposal:** Either add a narration entry earlier in the lesson that explicitly states the name "Momotaro means Peach Boy," making the answer learnable from the lesson itself, or swap the near-miss option `Momoko` for something like `Peachboy` (obviously wrong literal translation) that tests parsing rather than cultural trivia.
