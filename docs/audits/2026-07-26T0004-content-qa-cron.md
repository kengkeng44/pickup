# Content QA — 2026-07-26 00:04 UTC

**Today's angle:** A5 — cultural reference (cultural origin anchoring, artifact accuracy, age-appropriate context for 8-12 Taiwanese children)
**Focus:** Ch1–8 (Momotarō, Ugly Duckling, Tortoise & Hare, Camel's Hump, Baba Yaga, Six Swans, Yexian, Three Little Pigs)
**Auditor:** cron-content-qa automated session
**Angle rotation:** A5 not used in prior 8 cycles (last 8: R2/A4/#12/R1/#10/A1/A7/#11)

---

## A. validate-lessons.js result

```
WARN lessons-ch1.json: 17 lint issue(s)
  X2_OPTION_LIST_BIAS × 3, X49_STIMULUS_REUSE × 5, X49B_STIMULUS_REUSE_COMP × 3, X57_ANTONYM_PAIR_MIRROR × 4

WARN lessons-ch2.json: 10 lint issue(s)
  X2_OPTION_LIST_BIAS × 2, X49_STIMULUS_REUSE × 3, X49B_STIMULUS_REUSE_COMP × 1, X57_ANTONYM_PAIR_MIRROR × 2

WARN lessons-ch3.json: 19 lint issue(s)
  X2_OPTION_LIST_BIAS × 6, X49_STIMULUS_REUSE × 2, X49B_STIMULUS_REUSE_COMP × 5, X57_ANTONYM_PAIR_MIRROR × 3

WARN lessons-ch4.json: 10 lint issue(s)
  X2_OPTION_LIST_BIAS × 1, X49_STIMULUS_REUSE × 4, X49B_STIMULUS_REUSE_COMP × 3

WARN lessons-ch5.json: 10 lint issue(s)
  X2_OPTION_LIST_BIAS × 2, X3_R1_VERBATIM_WORDS × 1, X49_STIMULUS_REUSE × 2, X49B_STIMULUS_REUSE_COMP × 2, X57_ANTONYM_PAIR_MIRROR × 2

WARN lessons-ch6.json: 13 lint issue(s)
  X2_OPTION_LIST_BIAS × 2, X48_NGRAM_VERBATIM_CORRECT × 1, X49_STIMULUS_REUSE × 4, X49B_STIMULUS_REUSE_COMP × 5, X57_ANTONYM_PAIR_MIRROR (not flagged)

WARN lessons-ch7.json: 13 lint issue(s)
  X2_OPTION_LIST_BIAS × 2, X48_NGRAM_VERBATIM_CORRECT × 1, X49_STIMULUS_REUSE × 5, X49B_STIMULUS_REUSE_COMP × 3, X57_ANTONYM_PAIR_MIRROR × 1

WARN lessons-ch8.json: 9 lint issue(s)
  X2_OPTION_LIST_BIAS × 2, X48_NGRAM_VERBATIM_CORRECT × 2, X49_STIMULUS_REUSE × 3, X49B_STIMULUS_REUSE_COMP × 2, X57_ANTONYM_PAIR_MIRROR × 1

Total mirror-lint issues: 440 (warn-only)
Build: PASS (no ERROR-level violations)
```

---

## B. Violation Table — A5 Cultural Reference Lens

| Ch | Q ID | type | snippet | A5 violation | 修法 | audio regen? |
|----|------|------|---------|-------------|------|-------------|
| 1 | kt-ch1-l1-intro | narration | "今晚要講桃太郎的故事，先來認識幾個關鍵字" | **MISSING ORIGIN ANCHOR** — Ch1 never identifies itself as a Japanese folktale in English flow. Ch5 correctly anchors Baba Yaga as Russian ("Baba Yaga 是俄羅斯民間故事裡最有名的老巫婆"). Ch1 lacks equivalent "桃太郎是日本最有名的民間故事" note in any early EZ. "Demon" → "妖怪" also erases Japanese-specific oni (鬼) concept. | Add EZ note to kt-ch1-l1-intro: "桃太郎是日本最有名的民間故事之一——日文叫 もも (momo = 桃子) + たろう (tarō = 太郎，男孩的名字)。故事裡的鬼 (oni) 是日本特有的妖怪，有角有棍子。" | No |
| 1 | kt-ch1-l4-q2 | narration | "His mother packed special millet dumplings for the long trip." EZ: "黍米糰子" | **CULTURAL FOOD GAP** — "millet" (黍米) is unknown to most Taiwanese children. EZ says 黍米糰子 but not what millet is or why this Japanese sweet is significant (kibi-dango = currency for loyalty in original tale). | Extend EZ: "黍米糰子 = 日文叫きびだんご (kibi-dango)，用黍米做的甜糰子，是日本傳統點心。故事裡他用糰子換到三個夥伴的幫忙，所以糰子才那麼重要！" | No |
| 5 | kt-ch5-l5-x5 | comprehension | EZ: "那個大又圓的東西是石碗——她坐在石碗裡移動" | **ARTIFACT MISTRANSLATION** — Baba Yaga rides a mortar (石臼, a grinding vessel) not a bowl (碗). A mortar ≠ bowl — different shape, cultural object, and function. Calling it 石碗 strips the witch's iconic visual identity. | Change EZ 石碗 → 石臼 throughout ch5: "石臼是磨穀物用的大石頭容器（形狀像碗但有厚壁和沉重底部）——Baba Yaga 坐在裡面像坐轎子一樣移動。" | No |
| 6 | kt-ch6-l4-q6 | narration | "To set them free, she had to sew six shirts from a sharp white flower." EZ: "用花縫衣服——用花做成衣服，這樣才能解開魔咒" | **PLANT NOT NAMED — CULTURAL SIGNIFICANCE LOST** — "Sharp white flower" is stinging nettle (蕁麻). The key dramatic irony is that sewing nettle fabric burns and blisters the girl's hands — her suffering makes the sacrifice meaningful. Unnamed generic "flower" strips this entirely. | EZ at this entry: "那種尖白花是蕁麻 (stinging nettle)——一碰就會刺手、起水泡的野草！妹妹縫的時候，手一定又痛又腫——這讓她的沉默和堅持更了不起。" | No |
| 6 | kt-ch6-l6-x7 | comprehension | EZ: "火刑柱就是「懲罰清白的新娘」——老王后設下的陷阱" | **EUROPEAN EXECUTION CONTEXT MISSING** — "火刑柱" (burning at the stake) is a specifically medieval European punishment associated with witch trials and heresy executions. For 8-12 Taiwanese children this cultural reference is opaque (they may not know this is a real historical practice). EZ just says "是陷阱" without any grounding. | Add EZ note: "火刑柱 (burning at the stake) 是中世紀歐洲的一種處罰方式，被誤解為巫婆或做壞事的人才會受到這種懲罰。故事裡，老王后用謊言讓大家誤以為新娘做了壞事。" | No |
| 7 | kt-ch7-l5-q2 | narration | "The 洞節 (cave festival) night came. Lanterns lit up every doorway." EZ: "奶奶說：洞節是葉限村子一年一度的大節日" | **HISTORIC/ETHNIC ORIGIN MISSING** — 洞節 appears cold with no grounding. Yexian is the world's oldest Cinderella variant (~860 AD, Tang dynasty, recorded in 段成式《酉陽雜俎》) from the Zhuang-related peoples of southern China. This is extraordinary cultural heritage that would resonate with Taiwanese children — missed entirely. | Add EZ note: "葉限的故事是世界上最古老的灰姑娘故事，比歐洲的灰姑娘早了大約 900 年！它記在唐朝（860年左右）的一本書《酉陽雜俎》裡，發生在中國南方的少數民族村子。" | No |
| 7 | kt-ch7-l3-q2 | narration | "One morning, 後母 (the new wife) put on Yexian's torn dress." | **INTRA-SENTENCE CODE-MIXING** — Embedding Chinese characters "後母" inside an English sentence creates code-mixing that may confuse young learners about the lesson's target language. No other chapter does this pattern. | Replace with consistent English-first strategy: change sentence to "One morning, the new wife put on Yexian's torn dress." with EZ: "後母 = 繼母 (new wife / stepmother)。" | No (sentence-level change only) |
| 8 | kt-ch8-l5-q2 | narration | "Not by the hair on my chin!" EZ: "這是英文故事裡一句很有名的拒絕台詞！" | **STRENGTH (note)** — EZ correctly identifies this as a famous idiom. No fix needed; model example for cultural phrase anchoring. | n/a | No |
| 4 | kt-ch4-l4-x1 | comprehension | EZ: "(Djinn 精靈是阿拉伯故事裡的神靈，和歐洲的仙子不同——由無煙的火焰造成，能善能惡。)" | **STRENGTH** — Ch4 is the model chapter for A5 cultural reference handling. Djinn gets explicit cultural origin, differentiation from European fairy, and nature note — exactly the right template for all supernatural beings across Ch1-8. | No fix needed. Use as template: when introducing culturally-specific supernatural entity, add parenthetical EZ note with (a) cultural origin, (b) contrast to familiar analog, (c) key trait. | No |

---

## C. Stats

| Metric | Value |
|--------|-------|
| Chapters audited | Ch1–8 (8 chapters, ~116 questions per chapter) |
| A5 violation instances identified | 7 |
| P0 (critical) | 5 |
| P1 (significant) | 2 |
| STRENGTH examples | 2 (Ch4 Djinn, Ch8 chin idiom) |
| Chapters with cultural origin anchor | Ch4 (Djinn), Ch5 (Russian girl note), Ch8 (chin idiom) = 3/8 |
| Chapters WITHOUT cultural origin anchor | Ch1 (Momotarō), Ch2 (Ugly Duckling), Ch3 (Tortoise & Hare), Ch6 (Six Swans), Ch7 (Yexian) = 5/8 |
| Artifact mistranslation | 1 (Ch5: 石碗 → 石臼) |
| Code-mixing in English sentence | 1 (Ch7: 後母 embedded in English) |

### Cross-chapter pattern: cultural origin coverage by chapter

| Ch | Story | Cultural origin in EZ? | Supernatural anchor? | Grade |
|----|-------|----------------------|---------------------|-------|
| 1 | 桃太郎 (Japanese) | ❌ | ❌ (oni = 妖怪, no origin) | D |
| 2 | 醜小鴨 (Danish/Andersen) | ❌ | n/a | D |
| 3 | 龜兔賽跑 (Aesop/Greek) | ❌ | n/a | D |
| 4 | Camel's Hump (Kipling/British) | ✅ Djinn note, "Howling Desert is fictional" note | ✅ Djinn vs fairy distinction | A |
| 5 | Baba Yaga (Slavic/Russian) | ✅ "Russian folk tale's most famous witch" | ✅ (partial — stone bowl error) | B |
| 6 | 六隻天鵝 (German/Grimm) | ❌ | n/a | D |
| 7 | 葉限 (Chinese/Tang dynasty) | ❌ | n/a | D |
| 8 | 三隻小豬 (British/Joseph Jacobs) | ✅ "famous English refusal phrase" | n/a | B |

---

## D. Top 5 P0

### P0-1 — Ch6: "Sharp white flower" = unidentified nettle (HIGHEST IMPACT)

**Why P0**: The dramatic core of Six Swans is the girl's sacrifice — sewing shirts while her hands blister from nettle. Without knowing the plant is nettle (蕁麻), the suffering is invisible and the sacrifice feels arbitrary. This is the structural emotional payload of the entire chapter.

**Sentence**: `To set them free, she had to sew six shirts from a sharp white flower.`

**EZ currently**: `用尖白花縫六件衣服——就是「用白花縫衣服」`

**Fix**: `那種尖白花叫蕁麻 (stinging nettle)——碰到皮膚會立刻刺痛起泡的野草！妹妹每縫一針，手都在痛——這才讓她的沉默和堅持這麼令人心疼。`

---

### P0-2 — Ch5: 石碗 vs 石臼 (Baba Yaga's mortar)

**Why P0**: Baba Yaga's mortar (石臼) is one of the most recognizable cultural symbols of Slavic folklore — she grinds as she rides it, using the pestle to steer. Calling it a "stone bowl" (石碗) is factually wrong and erases one of the top-5 visual signatures of this character type.

**All instances**: kt-ch5-l5-x5 EZ and any other uses of 石碗 in ch5.

**Fix**: Replace 石碗 → 石臼 and add: `石臼是古時候用來磨穀物的大石頭器具（像一個有厚壁的深碗，用石杵搗）——Baba Yaga 坐在裡面，用石杵當槳，這是她的神奇交通工具！`

---

### P0-3 — Ch1: Missing Japanese folklore origin anchor

**Why P0**: Ch1 is the first chapter children encounter. Setting the cultural frame correctly — "This is a Japanese folk tale" — unlocks: (a) why "demons" look different from Western demons, (b) why the companions (dog/monkey/pheasant) are Japan-specific, (c) why millet dumplings are currency. Without this anchor, Momotarō reads as generic "fantasy" instead of Japanese cultural heritage.

**Sentence**: `kt-ch1-l1-intro` narration

**EZ currently**: `奶奶說：今晚要講桃太郎的故事，先來認識幾個關鍵字`

**Fix**: Extend EZ: `桃太郎是日本最有名的民間故事，已經講了好幾百年了！日文「桃 (momo)」= 桃子，「太郎 (Tarō)」= 男孩名字。故事裡的 demons 在日文叫「鬼 (おに/oni)」——長角、帶棍子，是日本特有的怪獸喔。`

---

### P0-4 — Ch7: 洞節 unanchored (world's oldest Cinderella story)

**Why P0**: Yexian (葉限) is extraordinary cultural heritage — the oldest recorded Cinderella variant in world literature, predating Perrault by ~900 years. Taiwanese children learning Chinese culture should know this. The 洞節 festival introduced cold at kt-ch7-l5-q2 could be a proud cultural moment instead of an opaque reference.

**Sentence**: `The 洞節 (cave festival) night came.` EZ: `奶奶說：洞節是葉限村子一年一度的大節日`

**Fix**: `洞節是中國南方少數民族的傳統節日——每年大家穿上最美的衣服、提燈籠慶祝。而葉限的故事本身，是全世界最古老的灰姑娘故事，比歐洲版本早了將近 900 年，記在唐朝（約 860 年）一本叫《酉陽雜俎》的書裡。`

---

### P0-5 — Ch6: Fire pyre context missing

**Why P0**: "火刑柱" (burning at the stake) is culturally specific European medieval execution. Without context, 8-12 year old Taiwanese children have no framework for why fire is involved in punishment. The EZ says "是陷阱" but doesn't explain the cultural practice, making the story's climax opaque.

**Sentence**: `Wood was piled high in the castle yard. The fire was built for her.`

**Fix EZ at kt-ch6-l6-x7**: `火刑柱是中世紀歐洲的懲罰方式——人們有時會把認為做了壞事的人綁在柱子上用火懲罰。故事裡，老王后說了謊話讓大家誤以為新娘有罪——所以那堆火是冤枉的懲罰，不是真正的正義。`

---

## E. Narrative Voice / Pacing — 3 Improvement Proposals

(Mandatory even with 0 R-violations per cron spec)

### NV-1: Ch5 — Three riders need advance vocabulary entry

White/red/black riders (dawn/noon/night) appear at kt-ch5-l3-q11 without preparation. These are a distinctly Slavic folkloric motif (Day / Sun / Night as supernatural riders) and appear suddenly in narration. Industry best practice (Duolingo Stories vocab-before-story pattern) calls for a pre-story vocab entry.

**Proposal**: Add a vocab lesson entry in kt-ch5-l2 or kt-ch5-l3 (tap-pairs or emoji-pick):
```
"White for morning, red for midday, black for night — three riders on three roads."
EZ: 白色 = 早晨，紅色 = 正午，黑色 = 黑夜——這三個神奇的騎士，代表一天的三段時間。在俄羅斯故事裡，它們是 Baba Yaga 的僕人。
```

### NV-2: Ch1 vs Ch4 — Grandma narrator voice consistency

Ch4 uses vivid Kipling "O dear listener" / "You see, my dear" second-person narrator asides in both English sentences AND EZ: "親愛的，那就是他自己的大駝峰" / "你看，精靈飛啊飛". Ch1 EZ narrator voice is more detached and informational: "媽媽特地做了黍米糰子" vs Ch4's warmer "奶奶覺得一定都很委屈". 

**Proposal**: Align Ch1 EZ narrator voice to match Ch4's warmth. Example:
- Current: `媽媽擔心他路上餓，特地做了糰子讓他帶著路上吃。`
- Upgrade: `奶奶說——媽媽那雙做糰子的手，是用擔心和愛做的。她知道這一去，很遠，很久。`

### NV-3: Ch7 — 後母 code-mixing creates register confusion

"One morning, 後母 (the new wife)..." is the only instance across Ch1-8 where Chinese characters appear inside an English target sentence. This breaks the immersion contract (English narration → Chinese EZ) and could confuse young learners about what they're meant to read/listen to.

**Proposal**: Remove code-mixing. Change sentence to: `One morning, the new wife put on Yexian's torn dress.` and rely on EZ for 後母 vocabulary. Consistent with all other chapters.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### Research Context

- **ResearchGate (2022)**: "The Benefits of Using Fairy Tales in EFL Classrooms" — culturally anchored content improves comprehension + vocabulary retention for young L2 learners; unfamiliar cultural references without scaffolding create comprehension bottlenecks.
- **Teachers Institute of Philadelphia, "Culturally Responsive Approach to Literacy"** — anchoring folklore to specific cultural origins improves critical literacy and learner engagement; unnamed cultural specifics reduce engagement compared to named origins.
- **Dinolingo 2026 review / Duolingo for Kids 2026 review** — industry weakness noted: "Duolingo is weaker on cultural context." Competitors that add cultural micro-notes (Cake ELT) show higher engagement for heritage/bilingual learners.
- **Pickup client profile fit**: 8-12 Taiwanese children + overseas Chinese heritage learners — cultural micro-notes directly serve heritage identity motivation (Buck 2001 contextual anchoring → engagement → retention).

### Recommendation: X204_CULTURAL_ANCHOR_FIELD

| Pattern | Source URL | Pickup 適配 | Effort | ROI | Verdict |
|---------|-----------|-----------|--------|-----|---------|
| **Per-lesson `culturalOrigin` metadata field** — optional `{source: string, era?: string, note: string}` on any question entry; rendered as collapsible `🌍 文化背景` chip below `explanationZh` in LessonPage renderer | Teachers Institute "Culturally Responsive Literacy" (https://theteachersinstitute.org/curriculum_unit/fairytales-folktales-and-animal-tales-a-culturally-responsive-approach-to-literacy/) | ✅ 完全適合 — Pickup JSON-first lesson schema, additive field, pure JSON + renderer change, zero migration on existing content; allows opt-in cultural depth without cluttering A2 flow | **Medium (4-6 hr)**: (1) add `culturalOrigin?` to LessonSchema Zod union; (2) add render logic in `renderers.tsx` for collapsible chip below EZ; (3) backfill 7 cultural anchor entries across Ch1/Ch5/Ch6/Ch7 (no audio regen) | **High**: directly addresses 5/8 chapters' D-grade cultural origin coverage; differentiates Pickup from Duolingo on cultural depth for heritage learner market; no performance cost (JSON read-only, collapsible = hidden by default) | **SHIP — additive, zero regression risk. Start with Ch1 (Momotarō) + Ch7 (Yexian) as pilot entries.** |

### ARCH-REC #204: X204_CULTURAL_ANCHOR_FIELD

**Schema change** (additive, no breaking change to existing content):
```ts
// In lessons.ts — add to base entry schema
culturalOrigin?: {
  source: string;   // "Japanese folklore" / "Russian Slavic" / "Tang dynasty China"
  era?: string;     // "Edo period (1600s)" / "~860 AD"
  note: string;     // max 60 chars, displayed in chip
}
```

**Renderer addition** (in `renderers.tsx` post-reveal section):
```tsx
{entry.culturalOrigin && (
  <details className="pickup-cultural-chip">
    <summary>🌍 文化背景</summary>
    <p>{entry.culturalOrigin.source}{entry.culturalOrigin.era ? ` · ${entry.culturalOrigin.era}` : ''}</p>
    <p>{entry.culturalOrigin.note}</p>
  </details>
)}
```

**Pilot backfill** (7 entries, no audio regen):
1. `kt-ch1-l1-intro` — `{source: "Japanese folklore", era: "Muromachi period+", note: "桃太郎是日本最有名的民間故事，已有幾百年歷史"}`
2. `kt-ch5-l5-q7` — `{source: "Slavic / Russian folklore", note: "Baba Yaga 是俄羅斯故事裡最有名的巫婆，住在雞腳屋裡"}`
3. `kt-ch6-l4-q6` — `{source: "German folklore / Brothers Grimm", era: "1812", note: "蕁麻衣服出自格林兄弟童話，縫的時候手會痛"}`
4. `kt-ch7-l5-q2` — `{source: "Chinese / Tang dynasty Zhuang folklore", era: "~860 AD", note: "葉限是世界最古老的灰姑娘故事，比歐洲版早 900 年"}`
5. `kt-ch2-l1` vocab intro — `{source: "Danish / Hans Christian Andersen", era: "1843", note: "《醜小鴨》是安徒生 1843 年寫的自傳式故事"}`
6. `kt-ch4-l4-x1` (Djinn) — already has inline EZ note → good candidate for pilot chip styling
7. `kt-ch8-l1` vocab intro — `{source: "British / Joseph Jacobs", era: "1890", note: "三隻小豬最早記錄在 1890 年 Joseph Jacobs 的英國童話集"}`
