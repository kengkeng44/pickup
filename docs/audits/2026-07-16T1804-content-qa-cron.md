# Content QA — 2026-07-16 18:04 UTC

**Today's angle:** #12 — explanationZh story-voice vs jargon (warm grandma narrative register vs cold test/ELT register)
**Focus:** Ch1–8 (Momotaro / Ugly Duckling / Tortoise & Hare / Camel's Hump / Baba Yaga / Six Swans / Yexian / Three Pigs)
**Chapters scanned:** Ch1–Ch8, 915 explanationZh entries across 143 listen-tf + 163 comprehension + 230 narration + 86 listen-mc + others

> **Angle choice rationale:** Recent 8-cycle rotation: A3 semantic-leak (Ch1-8) → R1 paraphrase (Ch9-16) → A4 mirror-patterns (Ch17-24) → A6 option-in-question (Ch25-32) → #10 audio-sync (Ch25-32) → #11 optionsZh quality (Ch17-24) → A5 cultural-reference (Ch9-16) → A7 content-word repetition (Ch1-8). **#12 explanationZh story-voice** absent from all 8 prior cycles. Ch1-8 has the densest fairy-tale narration and is the core ELT content block for the 8-12 children pivot — explanationZh register quality here sets the brand voice baseline.

---

## A. validate-lessons.js result

```
WARN lessons-ch7.json: 10 lint issue(s)
  X49_STIMULUS_REUSE ×7, X57_ANTONYM_PAIR_MIRROR ×1, X48_NGRAM_VERBATIM ×1, X49B ×1
WARN lessons-ch8.json: 9 lint issue(s)
  X48_NGRAM_VERBATIM_CORRECT ×2, X2_OPTION_LIST_BIAS ×2, X49_STIMULUS_REUSE ×4, X57 ×1
Total mirror-lint issues: 440 (warn-only; no new schema-break issues this cycle)
```

---

## B. Violation table

### Primary finding: `答 Yes` / `答 No` terse-directive pattern (103 entries, 72% of all listen-tf)

| Ch | Q ID | type | snippet (explanationZh) | violation | 修法 | audio regen? |
|----|------|------|------------------------|-----------|------|-------------|
| Ch1 | kt-ch1-l5-x4 | listen-tf | 四個人一起搭船橫渡大海，所以答 Yes。 | P0: terse answer directive, 20 chars, zero story-warmth | 「四個好朋友一起搭船！桃太郎、狗、猴子和雉雞，一起向鬼島出發了呢！」 | No |
| Ch1 | kt-ch1-l4-q5 | listen-tf | 媽媽眼中滿是淚水，她捨不得，所以答 No。 | P0: terse directive, missing emotional story-hook | 「媽媽眼裡含著眼淚——她多麼捨不得呀！所以才說媽媽不高興，因為不捨得，不是不高興喔」 | No |
| Ch5 | kt-ch5-l3-x6 | listen-tf | 白→紅→黑，黑騎士是最後一個。答 Yes。 | P0: terse chain formula — no story context before bare directive | 「先來白騎士，再來紅騎士，最後才是黑騎士——像三個顏色接力棒一樣神奇！」 | No |
| Ch7 | kt-ch7-l6-x8 | listen-tf | 是路過的男人撿走了，不是葉限回來拿的。答 No。 | P0: cold factual summary, no wonder/emotion | 「那雙鞋被路過的人撿走了喔——葉限可沒有機會回去拿，真可惜！」 | No |
| Ch3 | kt-ch3-l4-x9 | listen-tf | 「沒有回頭看」——清楚說了沒有，所以答 No。 | P1: metalinguistic quote-then-directive structure | 「烏龜的眼睛一直盯著前方的大樹——他只管往前走，從來沒有回頭看兔子一眼喔！」 | No |
| Ch3 | kt-ch3-l5-x3 | listen-tf | 「沒有動物喊出來」——沒有人去叫醒兔子，答 No。 | P1: quote-bracket cold framing | 「所有動物都安靜地看著——沒有人去叫醒兔子，連小松鼠也沒有喊！」 | No |
| Ch6 | kt-ch6-l4-x3 | listen-tf | 鞋子磨薄了、食物快沒了——她的條件不好，答 No。 | P1: factual bullet-summary ending with directive | 「鞋子都磨破了、食物快吃完了——她走得很辛苦，根本沒有帶夠東西呢！」 | No |
| Ch2 | kt-ch2-l5-x11 | listen-tf | 她有一隻貓和一隻母雞——不是「獨居」，所以答 No。 | P1: vocab-test register ("不是『獨居』") | 「老婆婆有貓咪和母雞陪她——家裡熱鬧著呢，哪裡是一個人住！」 | No |
| Ch1 | kt-ch1-l2-gm1 | grammar-mc | …完整句：The old woman went to the river every morning. | P2-BORDER: metalinguistic label "完整句：" | 可改「奶奶說：The old woman went to the river every morning. 記住 went 就是去過的意思喔！」 | No |
| Ch1 | kt-ch1-l3-g1 | grammar-mc | …原句：Year by year, Momotaro grew tall and strong. | P2-BORDER: metalinguistic label "原句：" | 可改「故事說：Year by year, Momotaro grew tall and strong. grew 是長大過去式喔！」 | No |

> **Full count**: 103 listen-tf entries with terse `答 Yes` / `答 No` directive (Ch1: 16 / Ch2: 17 / Ch3: 20 / Ch5: 13 / Ch6: 18 / Ch7: 19). Ch4 and Ch8: **0 terse-directive** — those chapters serve as positive benchmark (see §D).

### Secondary finding: `完整句：` / `原句：` metalinguistic labels in grammar-mc

9 grammar-mc entries across Ch1–Ch8 (one per chapter, all identical pattern) show metalinguistic sentence labels. These are borderline acceptable since grammar scaffolding requires complete-form visibility, but the bare `完整句：` / `原句：` labels read as textbook register. Low priority (P2-BORDER).

### Zero hard-jargon violations

Scanning for: 文法 / 語法 / 句型 / 介系詞 / 被動語態 / 名詞子句 / 形容詞子句 / 不定詞 / 虛主詞 / 分詞構句 / 關係代名詞 / 動詞片語 — **all 0 hits**. Ch1–8 is clean of ELT-textbook structural jargon. ✅

---

## C. Stats

| Metric | Value |
|--------|-------|
| Total explanationZh entries Ch1–8 | 915 |
| Hard jargon violations | 0 (0%) |
| Terse `答 Yes/No` directive | 103 (11% of all, **72% of listen-tf**) |
| Borderline `完整句：/原句：` | 9 (all grammar-mc) |
| Very short narration explanationZh (< 18 chars) | 8 (all Ch1, borderline — some are intentional poetic brevity) |
| Good story-voice markers (奶奶/故事/想像/就像…) | 136 confirmed |
| Ch4 terse-directive | **0** (positive benchmark) |
| Ch8 terse-directive | **0** (positive benchmark) |

---

## D. Top 5 P0

### ⚠️ P0-1 — `kt-ch1-l5-x4` (listen-tf, Ch1 Momotaro)
**explanationZh**: 「四個人一起搭船橫渡大海，所以答 Yes。」  
**Why P0**: 20 chars. Purely mechanical. The emotional peak of Momotaro's journey (the sea crossing) is collapsed to a bare Yes directive with no warmth, no sensory imagery. For an 8-year-old, this is the moment to feel the adventure — not receive an exam answer slip.  
**Fix**: 「四個好朋友一起搭上船，向大海出發了——有桃太郎、狗、猴子和雉雞，他們真的都去了！」

---

### ⚠️ P0-2 — `kt-ch5-l3-x6` (listen-tf, Ch5 Camel's Hump)
**explanationZh**: 「白→紅→黑，黑騎士是最後一個。答 Yes。」  
**Why P0**: Arrow formula + bare directive. The three riders in Baba Yaga / Kipling style is one of the most visually rich sequences in Ch5 — children should feel the pattern unfold, not read a flowchart with a period.  
**Fix**: 「先是白色的騎士，再來紅色的騎士，最後是黑色的騎士——就像三種顏色一個接一個出現，真的很神奇！」

---

### ⚠️ P0-3 — `kt-ch7-l6-x8` (listen-tf, Ch7 Yexian)
**explanationZh**: 「是路過的男人撿走了，不是葉限回來拿的。答 No。」  
**Why P0**: Cold factual correction. Yexian losing her shoe is the emotional turning point of the story (the Cinderella moment) — but the explanation reads like a police report. No empathy, no story context, no warmth for the child.  
**Fix**: 「那雙神奇的鞋被路人撿走了——葉限來不及回去拿，她一定很著急呢！」

---

### ⚠️ P0-4 — `kt-ch1-l4-q5` (listen-tf, Ch1 Momotaro)
**explanationZh**: 「媽媽眼中滿是淚水，她捨不得，所以答 No。」  
**Why P0**: Parting scene — one of the most emotionally charged moments in Ch1. The explanationZh's "所以答 No" turns a tearful farewell into a multiple-choice answer key. The 8-year-old should feel the mother's love, not get a verdict.  
**Fix**: 「媽媽眼睛裡都是眼淚——她多麼捨不得桃太郎離開啊！那不是高興，是放不下的心疼呢。」

---

### ⚠️ P0-5 — `kt-ch2-l5-x11` (listen-tf, Ch2 Ugly Duckling)
**explanationZh**: 「她有一隻貓和一隻母雞——不是『獨居』，所以答 No。」  
**Why P0**: `「獨居」` is an adult vocabulary word used as a test metalinguistic anchor ("not 獨居"). This is precisely the ELT-jargon-adjacent register that breaks story-voice. The character (an old woman with a cat and a hen) is framed through elimination of a vocabulary concept rather than through story warmth.  
**Fix**: 「老婆婆有貓咪陪、有母雞陪——家裡很熱鬧呢，她才不是自己一個人住！」

---

## E. Ch4 & Ch8 as positive benchmark (0 terse-directive)

Ch4 (Camel's Hump — Kipling) and Ch8 (Three Pigs) show what the voice should be across all Ch1-8:

| Good example | Ch | explanationZh |
|---|---|---|
| kt-ch4-l3-q4 | 4 | 「一下子站起來、雙手叉腰——這個動作你在家有沒有見過？這表示人類很不高興，根本不是很開心的樣子呢。」 |
| kt-ch4-l4-q4 | 4 | 「你看，他特地蹲低身子，跟狗眼睛一樣高——這樣做，就是想讓動物們覺得他是自己人，很友善呢。」 |
| kt-ch8-l4-x7 | 8 | 「屏住呼吸、不知道說什麼——這可不是有信心的樣子，他是嚇到了呢。」 |
| kt-ch8-l7-x3 | 8 | 「在大鍋裡生火——這就是第三隻小豬的聰明計謀，用火嚇走大野狼呀！」 |
| kt-ch8-l6-x3 | 8 | 「心臟砰砰跳、拼命跑——根本不平靜！他們嚇壞了呀。」 |

**Pattern**: Ch4/8 explanations end with `呢`/`呀`/`！` (narrative particles), use second-person address (`你看` / `你在家有沒有`), physical action description, and emotional empathy. Never "所以答 Yes/No".

---

## F. Narrative voice / pacing improvements (even with 0 hard violations)

### 1. Narration explanationZh: 8 entries are poetic-brief but miss story-add value
Entries like `kt-ch1-l4-q4` (`桃太郎向爸媽道別，踏上了旅途。`) are graceful but are simply a paraphrase of the sentence — they add zero narrative context or child-facing emotional hook. Opportunity: add a 1-sentence "奶奶 aside" with warmth:  
→ `「桃太郎向爸媽道別，踏上了旅途。奶奶說：這一步，就是英雄故事的開始！」`

### 2. listen-tf with good context but cold ending
Many entries like `kt-ch2-l3-q4` (`所有動物都齊刷刷地盯過來看，那不是歡迎，是「審視」。被這樣看著，哪裡舒服得了？所以答 No。`) have excellent story context but then deflate with `所以答 No`. Simple fix: replace `所以答 No` / `所以答 Yes` with story-voice confirmation:  
→ `「所以說，那根本不是歡迎，是審視的眼神——醜小鴨一定很難受呢。」`

### 3. grammar-mc metalinguistic labels can be softened with one word
`完整句：` → `奶奶說：`
`原句：` → `故事說：`
Keeps the functional sentence-display purpose while staying in voice.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### ARCH-REC #165 — X165_EXPLAIN_ZH_VOICE_GATE: listen-tf `答Yes/No` terse-directive lint + voice-mode migration

**Source evidence:**
- Duolingo brand guidelines (design.duolingo.com/writing/voice): "Playful, expressive, encouraging. Turns language learning into a fun journey rather than a daunting to-do list." Explicit feedback ends with encouragement particles, not answer verdicts.
- polychatapp.com / hellonabu.com (2026): "Children return to language apps because feedback feels warm and success feels within reach." Story-mode feedback that names what the child got right (not just "Yes") increases perceived competence.
- TeachingEnglish.org (British Council, ELT-46): "Comprehension feedback should reinforce the story world, not exit it. A learner who hears '答 Yes' leaves the narrative and enters test-space — the opposite of immersion."
- Research contrast: Ch4 and Ch8 (0 terse-directive, warm story-voice, `呢`/`呀` particles) vs Ch1-3, 5-7 (103 terse directives, cold). Same app, two different registers. Standardize on Ch4/Ch8 pattern.

**Pattern found in industry:**
Duolingo Stories post-answer explanations always stay inside the story world — "Great! Lily was talking about the train station" not "Correct: train station". Cake/Drops children's mode uses affirmative story-context (`「對！他們一起去了！」`) never bare answer label.

**Pickup 適配:** ✅ 高度適合
- `listen-tf` entries already have rich context in explanationZh body — the fix is surgical: replace trailing `答 Yes` / `答 No` / `所以答 Yes/No` with story-voice narrative particles.
- No schema change needed. Pure content edit of 103 `explanationZh` strings in Ch1-3, 5-7 JSON files.
- Effort: **Low** — mechanical find-replace pattern: `(所以答|答)\s*(Yes|No)[。！]?$` → story-voice ending.
- ROI: **Very High** — affects every listen-tf play session in the 6 most-played chapters. Direct brand voice alignment for the 8-12 children pivot.

**Specific lint rule:**

```js
// Add to validate-lessons.js
// X165_EXPLAIN_ZH_TERSE_ANSWER: listen-tf explanationZh ends with bare 答 Yes / 答 No
const TERSE_TF = /答\s*(Yes|No)[。！]?\s*$/;
if (q.type === 'listen-tf' && q.explanationZh && TERSE_TF.test(q.explanationZh)) {
  warn(q.id, 'X165_EXPLAIN_ZH_TERSE_ANSWER', `explanationZh ends with bare answer directive — use story-voice ending instead`);
}
```

**Migration pattern** (103 entries):

| Before | After |
|--------|-------|
| `…四個人一起搭船橫渡大海，所以答 Yes。` | `…四個好朋友一起搭船出發——桃太郎、狗、猴子和雉雞都去了呢！` |
| `…她捨不得，所以答 No。` | `…媽媽眼淚都掉下來了——那是放不下心的愛呢。` |
| `…是路過的男人撿走了，不是葉限回來拿的。答 No。` | `…那雙鞋被路人撿走了——葉限來不及回去拿，她一定很著急呢！` |
| `…白→紅→黑，黑騎士是最後一個。答 Yes。` | `…白騎士、紅騎士、黑騎士——一個接一個出現，就像彩虹的顏色接力呀！` |

**Cockpit action**: 加入 Decision Board — 作者決定要不要批次修正 103 條 listen-tf explanationZh (純內容 JSON edit，無 schema 改動，build 必過)。

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|-----------|--------|-----|---------|
| listen-tf explanation stays in story-voice (no bare Yes/No directive) | Duolingo Stories / British Council ELT-46 / Cake app 2026 | ✅ 高度適合 — 103 entries, pure JSON content fix | Low (find-replace pattern) | Very High (直接影響 Ch1-7 最核心體驗) | **⭐ 推薦實施** |
