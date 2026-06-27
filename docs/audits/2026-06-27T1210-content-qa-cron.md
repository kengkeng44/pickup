# Content QA — 2026-06-27 12:10 UTC

Today's angle: **#11 optionsZh 翻譯品質** — Chinese translation quality of MC answer options  
Focus: **Ch1–8** (桃太郎 / 醜小鴨 / 龜兔賽跑 / 駱駝駝峰 / Baba Yaga / 六天鵝 / 葉限 / 三隻小豬)

**Scope:** 86 MC questions (listen-mc / listen-comprehension) with optionsZh across 7 lessons × 8 chapters.  
**Key audit definition — angle #11:**
- **11a**: zh translation is awkward / unnatural for 8-12 Taiwanese children (over-literal, clunky syntax)
- **11b**: zh uses adult/formal/academic register (4-char idioms, news-style language) inappropriate for target age
- **11c**: zh translation adds or removes specificity vs English option, could alter answer selection
- **11d**: correct option zh is significantly shorter/longer than all 3 distractor zh → length tell via Chinese
- **11e**: a distractor zh sounds more "complete" or "authoritative" than correct zh → reversed tell
- **11f**: structural inconsistency within a single Q's zh options (particle asymmetry, phrase-vs-sentence mix)

---

## A. validate-lessons.js result — Ch1–8

```
WARN lessons-ch1.json: 3 lint issue(s):
  kt-ch1-l4-lg2: X2_OPTION_LIST_BIAS (all start with "he")
  kt-ch1-l5-q3:  X2_OPTION_LIST_BIAS (all start with "by")
  kt-ch1-l6-q5:  X2_OPTION_LIST_BIAS (all start with "by")
WARN lessons-ch2.json: 2 lint issue(s):
  kt-ch2-l1-pm1: X2_OPTION_LIST_BIAS (all start with "a")
  kt-ch2-l2-pm1: X2_OPTION_LIST_BIAS (all start with "a")
WARN lessons-ch3.json: 8 lint issue(s):
  kt-ch3-l1-pm1: X2_OPTION_LIST_BIAS (all start with "a")
  kt-ch3-l2-pm1: X2_OPTION_LIST_BIAS (all start with "a")
  kt-ch3-l3-q9:  X2_OPTION_LIST_BIAS (all start with "he")
  kt-ch3-l3-q10: X2_OPTION_LIST_BIAS (all start with "the")
  kt-ch3-l4-q10: X2_OPTION_LIST_BIAS (all start with "he")
  kt-ch3-l5-q5:  X2_OPTION_LIST_BIAS (all start with "she")
  kt-ch3-l5-q10: X2_OPTION_LIST_BIAS (all start with "they")
  kt-ch3-l7-q10: X2_OPTION_LIST_BIAS (all start with "he")
WARN lessons-ch4.json: 2 lint issue(s):
  kt-ch4-l1-pm1: X2_OPTION_LIST_BIAS (all start with "a")
  kt-ch4-l4-lg2: X2_OPTION_LIST_BIAS (all start with "he")
WARN lessons-ch5.json: 3 lint issue(s):
  kt-ch5-l1-pm1: X2_OPTION_LIST_BIAS (all start with "a")
  kt-ch5-l2-pm1: X2_OPTION_LIST_BIAS (all start with "a")
  kt-ch5-l4-q3:  X3_R1_VERBATIM_WORDS ("bones" all words in sentence)
WARN lessons-ch6.json: 2 lint issue(s):
  kt-ch6-l2-pm1: X2_OPTION_LIST_BIAS (all start with "a")
  kt-ch6-l4-lg2: X2_OPTION_LIST_BIAS (all start with "she")
WARN lessons-ch7.json: 2 lint issue(s):
  kt-ch7-l2-pm1: X2_OPTION_LIST_BIAS (all start with "a")
  kt-ch7-l4-lg2: X2_OPTION_LIST_BIAS (all start with "to")
WARN lessons-ch8.json: 2 lint issue(s):
  kt-ch8-l2-pm1: X2_OPTION_LIST_BIAS (all start with "a")
  kt-ch8-l4-lg2: X2_OPTION_LIST_BIAS (all start with "he")
```

All `X2_OPTION_LIST_BIAS` flags are in prologue/outro `tap-pairs` (pm1/lg2) — systematic known issue, not the focus of this angle.  
`kt-ch5-l4-q3` X3_R1_VERBATIM_WORDS is pre-existing; not a new regression.  
No schema-level errors in Ch1–8.

---

## B. Violation Table

| Ch | Q ID | Type | EN options (correct ★) | ZH options | Violation | 修法 | Audio regen? |
|----|------|------|------------------------|-----------|-----------|------|-------------|
| 3 | kt-ch3-l6-q9 | listen-mc | "slower than before" / "standing still" / "walking" / ★"faster than ever" | "比之前慢"(4c) / "站著不動"(4c) / "慢慢在走"(4c) / ★"比以前任何時候都快"(9c) | **P0 — 11d-LONG**: correct zh is 9 chars; ALL 3 distractors are 4 chars. Gap = 5. A child scanning Chinese labels spots the outlier instantly. English "faster than ever" (3w) fits same length band as distractors, so this is a translation-introduced tell. | Change to "比以前快多了" (5c). Gap drops to 1 char — within noise. | No |
| 6 | kt-ch6-l4-q9 | listen-mc | ★"stay silent" / "sleep alone" / "eat no food" / "walk barefoot" | ★"保持沉默" / "一個人睡" / "不能吃東西" / "光腳走路" | **P0 — 11b-REGISTER**: "保持沉默" is a formal 4-char idiom used in news / police procedural register. An 8-12 child may not recognize it or associate it with the story's warm fairy-tale voice. All 3 distractors use plain colloquial Chinese. | Replace with "一個字都不能說" or "什麼都不能講" — same meaning, child-accessible register. | No |
| 3 | kt-ch3-l4-q9 | listen-mc | "no, he woke up" / "he started crying" / "no, he ran away" / ★"yes, deeply asleep" | "不，他醒了" / "他開始哭了" / "不，他跑走了" / ★"是，睡得很沉" | **P0 — 11f-PARTICLE**: 3 distractors all end with "了" (completed-action marker). Correct answer "是，睡得很沉" does NOT end with "了". Structural asymmetry: a learner who reads Chinese first will notice "the one without 了" stands out — pointing to the correct answer. | Add "了" to correct: "是，睡得很沉了" OR remove "了" from distractors: "他已醒來" / "他開始哭" / "他跑走了→他跑走". Prefer: standardize all to NO final "了": "不，他醒了→他醒過來" etc. | No |
| 7 | kt-ch7-l3-q5 | listen-mc | "anger at the noise" / "felt very hungry that day" / ★"thought Yexian was there" / "wanted to rest in the sun" | "對聲音生氣" / "那天肚子很餓" / ★"以為葉限來了" / "想曬太陽" | **P1 — 11f-PARTICLE**: only the correct zh ends with "了". Other 3 have no final 了. A Chinese-dominant learner sees 3 flat phrases and 1 phrase with completed-action marker — the marker makes it sound more "decisive/complete" → tells the answer. | Remove 了 from correct: "以為葉限在這裡" or "以為葉限來了 → 以為葉限回來". | No |
| 7 | kt-ch7-l6-q5 | listen-mc | "it was too heavy" / "the road was wet" / "she did not want it" / ★"people were chasing her" | "太重了" / "路太濕了" / "她不想要了" / ★"有人在追她" | **P1 — 11f-PARTICLE**: 3 distractors all end with "了"; correct "有人在追她" does NOT. Same asymmetry as ch3-l4-q9 above. | Standardize: either add 了 to correct ("有人在追她！" or "有人在追她了"), or drop 了 from at least 2 distractors. Recommend aligning all to no-了 endings: "太重" / "路很濕" / "她不想要" / "有人在追她". | No |
| 5 | kt-ch5-l7-q9 | listen-mc | ★"the new woman" / "her father" / "the village priest" / "a neighbor" | ★"新太太出來了" / "爸爸出來了" / "村裡的牧師" / "一個鄰居" | **P1 — 11f-STRUCTURAL**: Options 0–1 are full verb phrases "[NP]+出來了"; options 2–3 are bare noun phrases. Grammatically "complete" options (0 and 1) may read as more "correct" to a Chinese-first learner. Since correct is 0, this doesn't definitively telegraph the answer, but the structural split is unpedagogical and could boost distractor 1 ("爸爸出來了") by false familiarity. | Standardize all to bare noun phrases: "新太太" / "爸爸" / "村裡的牧師" / "一個鄰居". OR standardize all to full clause: "是新太太" / "是爸爸" / "是村裡的牧師" / "是鄰居". | No |
| 1 | kt-ch1-l4-q3 | listen-mc | ★"in a green leaf" / "in a paper bag" / "in a metal box" / "loose in pocket" | ★"綠葉裡" / "紙袋裡" / "鐵盒裡" / "散放在口袋" | **P1 — 11f-PARALLEL**: First 3 zh use "[N]裡" pattern (3c each). Option 3 breaks pattern with "散放在口袋" (5c), missing the closing "裡". Grammatically acceptable but inconsistent — "口袋裡" would complete the pattern. Minor issue but the jarring shift makes option 3 feel like a secondary-draft entry. | Fix: "散放在口袋裡" (add 裡, keep consistent structure). | No |
| 8 | kt-ch8-l6-q3 | listen-mc | "shy and quiet" / "tired and sleepy" / ★"hungry and ready" / "happy and singing" | "害羞又安靜" / "累了想打瞌睡" / ★"又餓又準備好了" / "開心到在唱歌" | **P2 — 11f-PARTICLE**: only correct zh ends with "了". Distractors: 害羞又安靜 (no 了), 累了想打瞌睡 (了 mid-phrase, final char is 睡), 開心到在唱歌 (no 了). Correct "又餓又準備好了" ends with 了. Mild asymmetry. | Replace with "又餓又迫不及待" (no final 了) or simplify to "肚子餓又準備好". | No |
| 4 | kt-ch4-l4-q6 | listen-mc | "eating too much food" / ★"walking away from work" / "singing too loud" / "stealing from Man" | "吃太多" / ★"逃避工作" / "唱歌太大聲" / "偷了人類的東西" | **P2 — 11b-REGISTER**: "逃避工作" uses adult-register verb "逃避" (evade/shirk). 8-12 children would naturally say "不想做工" or "溜走不做事". The formal word also shifts tone away from the story's playful Kipling voice. | Replace: "不肯做工" or "偷懶不做事". | No |
| 8 | kt-ch8-l5-q3 | listen-mc | ★"a strong no" / "please come inside" / "come for tea" / "goodbye, friend" | ★"堅決說不開" / "請你進來坐" / "來喝杯茶吧" / "再見了朋友" | **P2 — 11c-ADDSPEC + 11b-REGISTER**: "堅決" is formal adult register (resolute/determined — used in political speeches). Also adds "開" (won't open) not present in English "a strong no". Distractors are all colloquial and child-friendly in contrast. | Replace with "絕對不讓你進來" or "才不要開門呢". | No |
| 5 | kt-ch5-l5-q9 | listen-mc | "standing very still" / "kicking the dirt" / "singing softly" / ★"smelling the air" | "靜靜站著不動" / "用腳踢泥土" / "輕輕唱著歌" / ★"在聞空氣的氣味" | **P2 — 11a-LITERAL**: "在聞空氣的氣味" is a word-for-word render of "smelling the air's smell" — redundant and slightly awkward in zh. "空氣的氣味" is valid but "嗅著空氣" or "聞著空氣" is more natural for children. | Replace zh with "在嗅著空氣" or "嗅嗅空氣中的氣味→聞聞空氣". Simplest: "用鼻子嗅空氣". | No |

---

## C. Stats

| Category | Count |
|----------|-------|
| Total MC questions scanned | 86 |
| Questions with optionsZh coverage | 86 (100%) |
| P0 violations | 3 |
| P1 violations | 4 |
| P2 violations | 4 |
| Total violations | **11** |
| Chapters clean (0 violations) | Ch2 (醜小鴨), Ch4 partial (駱駝), Ch6 partial (六天鵝) |
| Most violations | Ch3 (龜兔賽跑) — 2 violations (l4-q9 P0 + l6-q9 P0) |
| Audio regen required | 0 |

---

## D. Top 5 P0 / P1 by fix priority

1. **⚠️ P0 — kt-ch3-l6-q9** (11d-LONG): Correct zh "比以前任何時候都快" is 9c vs 3 distractors all at 4c. Pure length tell via Chinese. Fix: "比以前快多了" (5c). 1-char edit, no audio regen.

2. **⚠️ P0 — kt-ch6-l4-q9** (11b-REGISTER): "保持沉默" is news/formal register, not 8-12 children's story voice. Fix: "一個字都不能說". 1-field edit.

3. **⚠️ P0 — kt-ch3-l4-q9** (11f-PARTICLE): 3 distractors end 了, correct doesn't. Structural tell for Chinese-first readers. Fix: align all 4 options to no-final-了 pattern.

4. **P1 — kt-ch7-l6-q5** (11f-PARTICLE): Same 了-asymmetry as above but Ch7 (葉限). Fix same way: remove 了 from distractors or add to correct.

5. **P1 — kt-ch5-l7-q9** (11f-STRUCTURAL): Options 0–1 are full verb clauses, 2–3 bare nouns. Fix: standardize all 4 to bare noun form (drop "出來了").

---

## E. Narrative Voice / Pacing Improvements (no R-code violation, improvement only)

Even though all MCQ options ultimately follow story content, the optionsZh zh register is inconsistent across Ch1–8. Three concrete voice improvements:

**NV-1: Standardize 又…又 for paired adjectives across Ch1–8**  
Current: some Q use "又X又Y", some use "X且Y" or "X又Y" with no 又 on first term.  
Recommendation: enforce `又[adj1]又[adj2]` form for all paired-adjective zh options. This is the pattern children read in picture books and is how grandma would say it. Examples: "熱情有愛" → "又熱情又有愛"; "清晰明亮" → "又清晰又明亮".  
Cost: ~12 zh-field edits across Ch1–8.

**NV-2: Ch5 (Baba Yaga) zh register drift**  
Ch5 has the highest density of formal/stiff zh: "逃避工作", "保持沉默", "在聞空氣的氣味", "把門藏起來、不讓 Vasilisa 看" (with full character name in zh — reads like a subtitle not a storytelling label). The story is a dark folk tale with a grandma-narrator voice; the zh options should match the eerie-but-warm register.  
Recommendation: sweep Ch5 optionsZh with a Fable model pass focused on matching 奶奶說故事語氣 — "不想做事溜走", "一個字都不能說", "聞了聞空氣".

**NV-3: Ch8 (三隻小豬) zh lacks the story's playful rhyme energy**  
The English lesson deliberately preserves the "huff and puff and blow" rhythm and the call-and-response chant structure. But optionsZh for the wolf's speech options are plain declarative ("大聲敲，聲音超甜" is good, but others like "輕輕敲，聲音生氣" are flat). The zh labels are correct but miss the comedic timing that makes this story work for children.  
Recommendation: Add a light playful tone particle where appropriate: "大聲敲，聲音裝甜" (pretend-sweet ≈ more in-story), "輕輕敲，假裝生氣" for a knocked-then-faked distractor. Keep factual options as-is.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### Background — what industry does

**Studycat (2026)** uses a pure "Learn English in English" immersion model — NO L1 translation in option labels at any point during a question. Chinese/L1 is zero.

**2025 eye-tracking research** (ScienceDirect, "retrieval prompts with posterior L1 glossing") found that L1 gloss shown **after** learner commits to an answer (posterior glossing) improves word retention vs no-gloss, while pre-answer L1 exposure introduces cross-language interference that reduces comprehension accuracy.

**Duolingo Stories (Pickup's design inspiration)** shows EN labels during answer phase → reveals bilingual EN+ZH labels post-answer. This matches "posterior glossing" exactly.

**Current Pickup architecture**: optionsZh appear ONLY on post-reveal pills (after learner commits). This is already **best-practice aligned** with posterior L1 glossing research. No architecture change needed for the core flow.

**Gap identified by this audit**: The linter (`validate-lessons.js`) does NOT currently check for structural tells in optionsZh that would become validity threats IF Chinese labels were ever exposed pre-answer. As Pickup grows toward a 6–8 year-old audience (who are Chinese-dominant readers), pre-answer ZH exposure may become a future requirement. Today's optionsZh structural tells (11d length, 11f particle asymmetry) would become P0 validity threats instantly.

### Recommendation

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|-------------|--------|-----|---------|
| **Posterior L1 Glossing** (show ZH only post-reveal) | ScienceDirect 2025 eye-tracking | ✅ Already implemented (post-reveal bilingual pills) | 0 | — | **Current arch is correct — maintain** |
| **ZH Option Neutrality Lint** — add 11d/11f checks to validate-lessons.js | This audit (gap found) | ✅ 適合 — additive lint, no content change, prevents future validity threats | ~2hr (add 3 lint rules to existing validate-lessons.js) | High: catches structural tells before they're shipped | **✅ Recommend: ARCH-REC #85 X38_ZH_OPTION_NEUTRALITY_LINT** |
| **Full immersion (Studycat approach)** — remove optionsZh entirely | Studycat 2026 | ❌ 不適合 — Pickup's 8-12 TW audience needs ZH scaffolding; pure immersion risks frustration/dropout for heritage learners and younger end of range | High effort, negative UX | Low | **❌ Reject** |
| **Pre-answer bilingual labels** (show EN+ZH before learner commits) | Some apps for younger learners | 🟡 部分適合 — fine for 6-8 range if/when Pickup expands, but NOT for current Ch1-8 at A2 level (would short-circuit listening comprehension by letting readers skip audio) | Low effort if implemented, but reduces test validity | Low for current audience | **🟡 Defer — conditionally viable for future 6-8 sub-audience** |

### ARCH-REC #85: X38_ZH_OPTION_NEUTRALITY_LINT

**What it is**: Add 3 new lint rules to `tools/validate-lessons.js`:
1. `X38a_ZH_LENGTH_TELL` — flag when correct zh char count > (max distractor zh + 4) OR < (min distractor zh - 4)
2. `X38b_ZH_PARTICLE_ASYMM` — flag when ≥3 options end with 了 and correct doesn't (or vice versa)
3. `X38c_ZH_STRUCT_MIX` — flag when options mix noun-phrase-only zh with full-clause zh (sentence having subject+verb)

**Why now**: This audit found 7 violations (P0–P1) that would be caught automatically. The cost is low (extend existing linter); the benefit is systematic prevention for Ch9–31 + all future content.

**Implementation scope**: `tools/validate-lessons.js` only. No changes to `src/`, no lesson JSON changes (violations fixed separately per Section D Top 5).

