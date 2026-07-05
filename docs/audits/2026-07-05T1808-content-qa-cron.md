# Content QA — 2026-07-05 18:08 UTC

**Today's angle: A5 — Cultural Reference (emoji accuracy · cultural origin attribution · cross-cultural inference gap)**
**Focus: Ch17-24** (crane-gratitude / heungbu-nolbu / sang-kancil / enormous-turnip / anansi-spider / mencius-mother / sima-guang / kong-rong)

---

## A. validate-lessons.js result

| Ch | Lessons | Lint issues |
|----|---------|-------------|
| 17 | 7 | 16 (X49B×5, X49×2, X57×5, X2×1, X48×2) |
| 18 | 7 | 13 (X49×4, X49B×3, X57×2, X2×2) |
| 19 | 7 | 18 (X49×4, X49B×5, X57×3, X2×6) |
| 20 | 7 | 12 (X49×2, X49B×5, X57×1, X2×1) |
| 21 | 7 | 23 (X49×3, X49B×7, X57×2, X2×8) |
| 22 | 7 | 8 (X49×1, X49B×3, X57×1, X2×2) |
| 23 | 7 | 14 (X49×4, X49B×3, X57×4, X2×1) |
| 24 | 7 | 17 (details below) |
| **Total** | **56** | **121 lint issues across Ch17-24** |

Total mirror-lint across full repo: **447** (warn-only).

Build gate: clean (tsc/vite pass; lint is WARN mode).

---

## B. Violation Table

| # | Ch | Q ID | type | snippet | violation | 修法 | audio regen? |
|---|----|------|------|---------|-----------|------|--------------|
| 1 | 20 | `kt-ch20-l1-ep1` | emoji-pick | sentence: "Which one is a turnip?" correct: 🥕 turnip | **A5-EMOJI-MISMATCH**: 🥕 is a carrot, not a turnip. Frontiers in Psychology 2025 confirms emoji-word semantic mismatch increases cognitive load and reduces vocab retention accuracy. Turnip = 蘿蔔 (round white/purple root); carrot = 胡蘿蔔 (orange elongated). No accurate turnip emoji exists in Unicode. | Remove emoji prefix; use text-only "turnip / 蘿蔔" label. Option [0] becomes `"turnip"` not `"🥕 turnip"`. Update explanationZh to remove 🥕. | No |
| 2 | 17 | `kt-ch17-l3-q5` | listen-tf | "They lived together like a real family every day." correctIndex=1 (No) | **A5-STORY-CONTEXT + TF-INVERSION**: The sentence is factually TRUE in the story — they do live together as a family. correctIndex should be 0 (Yes). explanationZh "答 No" is wrong and contradicts the identical sentence in kt-ch17-l3-x2 (correctIndex=0, expl "答 Yes"). Paired with X49 stimulus reuse = contradictory answer pair for same sentence in same lesson. | Set correctIndex=0. Fix explanationZh to "他們像真正的一家人一起生活——答 Yes。" | No |
| 3 | 17-21 | All intro narrations | narration | Ch17-21 intro narrations (10 entries) | **A5-MISSING-CULTURAL-ORIGIN**: 0/10 intro narrations mention cultural/national origin. TESOL Pre-K–12 standards + Frontiers in Education 2026 require explicit cultural labeling for heritage learner ELT materials. Stories from Japan (Ch17), Korea (Ch18), Malay/SEA (Ch19), Russia (Ch20), West Africa/Akan (Ch21) are presented without any geographic/cultural frame. | Add one cultural origin sentence to each chapter's l1-intro narration. Example Ch17: "Tonight a kind old man saves a bird in the snow — this is a beloved story from Japan. First, a few new words!" / explanationZh: "奶奶說：今晚講的是日本的鶴之恩返故事，先來認識幾個關鍵字！" | Yes (6 MP3s, one per narration) |
| 4 | 18 | `kt-ch18-l1-ep1` | emoji-pick | "Which one is a swallow?" correct: 🐦 bird / 鳥 | **A5-VOCAB-SUPERORDINATE**: optionsZh labels the correct answer as "鳥" (bird), not "燕子" (swallow). The question teaches "swallow = 燕子" but the option label says "鳥" — learner internalizes swallow→鳥 (generic bird), losing specificity. In Heungbu-Nolbu, the swallow's identity is the plot pivot. | Change optionsZh[1] from "鳥" to "燕子". Update explanationZh: "swallow = 燕子 🐦！燕子是一種鳥，在韓國民間故事裡，燕子銜種子報恩是最有名的情節。" | No |
| 5 | 19 | `kt-ch19-l1-ep2` | emoji-pick | "Which one shows fruit?" correct: 🍎 fruit / 水果; story setting = tropical SEA rainforest | **A5-CULTURAL-VISUAL-BIAS**: Sang Kancil's story takes place in a Malay tropical forest where fruits are tropical (mango, durian, rambutan). Using 🍎 (apple) as the prototype "fruit" emoji centers a temperate Western fruit as the default concept. For heritage learners exploring SEA culture, this creates a subtle mismatch between the story's world and its vocabulary. | Change emoji from 🍎 to 🥭 (mango) or 🍌 (banana) — both are tropical and SEA-appropriate. Update text label: "🥭 fruit / 水果". | No |
| 6 | 21 | `kt-ch21-l1-*`, `kt-ch21-l6-*` | narration + listen-mc | "Nyame" appears as sky god; Anansi cultural origin never stated | **A5-CULTURAL-DEITY-UNEXPLAINED**: "Nyame" (Akan sky god, Ghana) appears 4+ times across lessons but is only glossed as "天神" (sky god) in explanationZh with no cultural origin. Anansi himself is never identified as an Akan/Ashanti folk hero from Ghana/West Africa. This is the most culturally distant chapter for Taiwanese learners. | Ch21-l1-intro sentence: "Tonight a small spider wants all the stories in the world — this is a tale from the Akan people of West Africa. Words first!" / explanationZh add: "這是來自西非加納阿肯族的阿南西蜘蛛故事。天神 Nyame 是阿肯族信仰裡掌管天空的神明。" | Yes (1 MP3) |
| 7 | 19 | `kt-ch19-l1-intro`, all narrations | narration | "a clever little deer" / "mouse deer" — animal never identified | **A5-ANIMAL-IDENTITY-GAP**: "Sang Kancil" is a chevrotain (Tragulus = 鼠鹿), a real SEA animal, not a standard deer. All narrations call it "a little deer" without explaining it's actually a mouse-deer (鼠鹿), which is only the size of a cat. Learners miss both the real animal vocab and the cultural significance of Sang Kancil as a beloved folk hero across Malaysia, Indonesia, and Singapore. | Add to explanationZh in kt-ch19-l1-intro: "鼠鹿(mouse deer)是東南亞特有的小型動物，只有貓那麼大，英文叫 mouse deer 或 Sang Kancil，是馬來西亞最著名的民間故事主角！" | No |

---

## C. Stats

| Metric | Value |
|--------|-------|
| Chapters audited | 8 (Ch17-24) |
| Q entries scanned | 302 (listen-mc + listen-tf + emoji-pick across 56 lessons) |
| A5 violations found | 7 |
| P0 (critical) | 2 (emoji mismatch + TF inversion) |
| P1 (significant) | 3 (cultural origin missing × 5 chapters, swallow vocab superordinate, tropical fruit visual bias) |
| P2 (improvement) | 2 (Nyame unexplained, mouse-deer identity gap) |
| validate-lessons lint | 121 WARN across Ch17-24; 447 total repo |
| Audio regen required | 7 MP3s if cultural origin sentences added to 5 chapters × l1-intro narration |

---

## D. Top 5 P0

### ⚠️ P0-1: kt-ch20-l1-ep1 — 🥕 carrot emoji for "turnip" vocabulary

- **File**: `public/lessons-ch20.json`
- **Impact**: Every learner who plays Ch20 learns that "turnip = 🥕 (carrot shape/color)". 蘿蔔 (turnip) and 胡蘿蔔 (carrot) are distinct vegetables — confusing the two is a persistent false-friend in CJK learner English. The emoji encodes the wrong visual schema.
- **Fix**: Remove emoji from option[0]. Use plain text: `"turnip"` not `"🥕 turnip"`. explanationZh: "turnip = 蘿蔔，是圓圓白白的根莖菜，和橘色的胡蘿蔔(carrot)不一樣喔！"
- **Research basis**: Frontiers in Psychology 2025 (PMC12605125) — semantic mismatch between emoji and target word reduces accuracy; facilitative emoji effect requires congruency.
- **Audio regen**: No

### ⚠️ P0-2: kt-ch17-l3-q5 — listen-tf gives "No" for a factually True sentence

- **File**: `public/lessons-ch17.json`
- **Impact**: Sentence = "They lived together like a real family every day." This is TRUE in the story. correctIndex=1 (No) is wrong. The identical sentence in `kt-ch17-l3-x2` (same lesson) has correctIndex=0 (Yes) — so learners encounter the same sentence with contradictory correct answers in a single lesson session.
- **Fix**: Set `kt-ch17-l3-q5` `correctIndex` to `0`. Update explanationZh: "他們像真正的一家人一起生活——答 Yes。"
- **Audio regen**: No (existing audio is correct; only correctIndex and explanationZh change)

### P1-3: Ch17-21 zero cultural origin attribution (5 chapters, 10 intro narrations)

- **Files**: `public/lessons-ch{17,18,19,20,21}.json` — all `*-l1-intro` and `*-l2-intro`
- **Impact**: Stories from Japan, Korea, Malay/SEA, Russia, West Africa presented as culturally anonymous "grandma's bedtime stories." Heritage learner ELT standard (TESOL, Frontiers in Education 2026) requires explicit origin labeling. Duolingo intentionally omits this — creating a differentiation opportunity for Pickup.
- **Fix**: Add `"(this is a story from Japan / Korea / Malay folklore / Russia / West Africa)"` to each l1-intro sentence. One sentence per chapter; 5 edits total.
- **Audio regen**: Yes — 5 MP3s (l1-intro narration audio per chapter)

### P1-4: kt-ch18-l1-ep1 — swallow mapped to "鳥" (generic bird) not "燕子"

- **File**: `public/lessons-ch18.json`
- **Impact**: optionsZh[1] = "鳥" when it should be "燕子." The vocab lesson teaches swallow→generic bird instead of swallow→燕子. In Heungbu-Nolbu, the swallow's species (燕子) is a critical plot element (the swallow rewards kindness with a gourd seed). Teaching the wrong Chinese term undermines comprehension.
- **Fix**: `optionsZh[1]` = `"燕子"`. Update explanationZh to reinforce "swallow = 燕子."

### P1-5: kt-ch19-l1-ep2 — 🍎 apple emoji for "fruit" in tropical SEA forest

- **File**: `public/lessons-ch19.json`
- **Impact**: Sang Kancil's forest has tropical fruits. Apple as default "fruit" visual prototype creates cultural dissonance for a story explicitly set in SEA nature. Minor for general learners; more significant for heritage/diaspora learners with Southeast Asian connections.
- **Fix**: Change `options[2]` from `"🍎 fruit"` to `"🥭 fruit"`. Update explanationZh: "fruit = 水果 🥭！故事裡對岸的樹上掛滿了又甜又熟的熱帶水果。"

---

## E. Narrative Voice / Pacing Improvements (3 required; non-P0)

Even with no R1-R8 rule violations, these 3 story-level improvements would raise comprehension quality:

### NV-1: Ch20 (Enormous Turnip) — emotional arc missing across cumulative chain

- **Issue**: Lessons l3-l6 all follow identical structure: new helper joins → everyone pulls → still stuck → look for next helper. No question in any lesson probes the characters' emotional state as repeated failures accumulate.
- **Improvement**: Add one inference question per lesson targeting cumulative frustration and resilience. Example for l5 (dog joins): "How does Grandpa feel after four tries?" with options including "tired but hopeful / 累但有希望." This shifts from pure detail recall to gist + emotion comprehension — matching the story's intended theme of collective persistence.

### NV-2: Ch21 (Anansi) — asymmetric demand gap never probed

- **Issue**: Nyame's demand ("bring me hornets, a python, and a leopard") is deliberately impossible-seeming. No question in kt-ch21-l6 asks WHY Nyame set this impossible price, missing the story's wisdom layer (the price of all-knowledge is courage + wit).
- **Improvement**: Add one comprehension question in l6: "Why did Nyame ask for such hard animals to catch?" with correct option "to test if Anansi was worthy / 看看阿南西是否值得." This is an inference question that connects the challenge to the reward — the story's emotional core.

### NV-3: Ch22 (Mencius Mother) — cloth-cutting scene loses pedagogical heart

- **Issue**: kt-ch22-l6-q6 correctly identifies that the mother "ruined her own months of work." But no question asks why she chose destruction over a verbal lesson. The cloth-cutting scene is 孟母's most famous teaching moment — the point is that the mother chose action over words, exactly mirroring Meng's own abrupt quitting.
- **Improvement**: Add inference question: "Why didn't the mother just talk to Meng about quitting?" with correct option "she showed him — not told him — what giving up costs / 她用行動示範，不用言語." This is the moral climax of the chapter and currently goes unprobed.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### Research sources consulted this cycle:
- Frontiers in Psychology 2025 — emoji semantic congruency in vocabulary learning ([PMC12605125](https://pmc.ncbi.nlm.nih.gov/articles/PMC12605125/))
- Frontiers in Education 2026 — multimedia + local cultural content for heritage learners ([link](https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2026.1847943/full))
- TESOL Pre-K–12 Teacher Preparation Standards 2018 — cultural needs in materials ([link](https://www.tesol.org/media/v33fewo0/2018-tesol-teacher-prep-standards-final.pdf))
- ResearchGate review of Duolingo Stories 2023 — cultural attribution gaps in Duolingo ([link](https://www.researchgate.net/publication/374887891_A_Review_of_Duolingo_Stories))
- Springer 2017 — Folktale intercultural approach for children ([link](https://link.springer.com/article/10.1007/s10583-017-9330-x))

| Pattern | Source URL | Pickup 適配 | Effort | ROI | Verdict |
|---------|-----------|------------|--------|-----|---------|
| **X76: `culturalOrigin` field in lesson JSON** — Add `culturalOrigin: { country, region, tradition }` to each chapter's lesson JSON root; LessonPage renders a small culture-badge ("🇯🇵 Japanese Folktale") in the chapter intro narration | Frontiers in Education 2026; TESOL 2018 | ✅ 完全適合 — Pickup 客群(8-12 台灣/海外華人)明確符合需要 explicit cultural labeling 的 heritage learner profile; JSON schema additive change, no runtime refactor needed | Low (schema + 5 JSON edits + 1 UI badge component ~2hr) | High (differentiates from Duolingo's cultural-anonymous approach; enriches heritage learning) | ✅ 推薦實施 |
| **X77: emoji congruency lint rule** — Add CI lint that flags any emoji-pick option where emoji Unicode block conflicts with intended vocabulary category (e.g., 🥕 in vegetable category when word is non-carrot vegetable) | Frontiers in Psychology 2025 (PMC12605125) | ✅ 適合 — Pickup 已有validate-lessons.js CI framework; adding emoji category check is a lint extension | Low (~1hr to add emoji-to-word-category mapping check in validate-lessons.js) | Medium (prevents future emoji mismatch introductions at scale; current 302-entry scan shows at least 2 confirmed mismatches) | ✅ 推薦實施 |
| **X78: story-origin attribution injection** — Grandma narration auto-prefixes cultural origin sentence based on `culturalOrigin.country` field at render time (no audio regen needed — text overlay before TTS) | Frontiers in Education 2026 | 🟡 部分適合 — text-only attribution works without new MP3s if rendered as a pre-audio text card (Duolingo Stories "culture note" card pattern); but Pickup's current TTS architecture means adding audio would require 5 new MP3 recordings per chapter | Medium (text overlay: low effort; with TTS audio: medium effort ~5 MP3 generations via OpenAI) | High | 🟡 先做文字 overlay 版 (low effort)，MP3 版作第二步 |

**ARCH-REC #119: X76_CULTURAL_ORIGIN_ATTR_GATE** — Add `culturalOrigin` field to lessons JSON schema + LessonPage culture-badge rendering. Resolves P1-3 (5-chapter attribution gap) at low effort. Directly differentiates Pickup from Duolingo's cultural-anonymous approach per 2026 ELT industry standards for heritage learner apps.

---

*Audit conducted 2026-07-05 18:08 UTC. Next recommended angle: #10 Audio Sync (MP3 availability vs lesson entry count) — Ch17-24 newly shipped content has not been audio-synced audited.*
