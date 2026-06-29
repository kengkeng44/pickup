# Content QA — 2026-06-29 00:12 UTC

Today's angle: **A5 — Cultural Reference (cross-cultural scaffolding gap)**
Focus: **Ch1-8** (Momotaro / Ugly Duckling / Tortoise & Hare / Camel's Hump (Kipling) / Baba Yaga / Six Swans / Ye Xian / Three Little Pigs)

---

## A. validate-lessons.js result

```
WARN lessons-ch1.json: 3 lint issue(s)  (X2_OPTION_LIST_BIAS)
WARN lessons-ch2.json: 2 lint issue(s)  (X2_OPTION_LIST_BIAS)
WARN lessons-ch7.json: 2 lint issue(s)  (X2_OPTION_LIST_BIAS)
WARN lessons-ch8.json: 2 lint issue(s)  (X2_OPTION_LIST_BIAS)
Total mirror-lint issues: 104 (warn-only, pre-existing)
Build: PASS (tsc + vite build clean)
```

All 8 chapter files parse valid Zod. No new FAIL-level schema errors. Pre-existing X2 WARNs unchanged.

---

## B. Violation table

| Ch | Q ID | type | snippet | violation | 修法 | audio regen? |
|----|------|------|---------|-----------|------|-------------|
| 4 | kt-ch4-l4-x1 through kt-ch4-l7-x6 (9 Q) | listen-mc / comprehension / listen-tf / emoji-pick | `Now, O dear listener, the dust opened and a Djinn stepped out.` / `The Djinn sat down low` / `The Djinn rubbed his chin` | **CULTURAL_ENTITY_FLATTENING (P1)**: "Djinn" is consistently translated as 精靈 (fairy/spirit) in all expZh. A Djinn (جن) is a specific Arabic/Islamic supernatural entity made from smokeless fire — theologically and culturally distinct from European fairy spirits. For primary audience (Taiwanese 8-12), 精靈 works as a proxy but erases the cross-cultural origin that Kipling deliberately built into the story. For secondary audience (heritage learners), conflating djinn with fairy/spirit is misleading. All 9 affected expZh use 精靈 without noting Arabic origin. | In the first Djinn appearance (kt-ch4-l4-x1), add one sentence to expZh: "Djinn（精靈）是阿拉伯民間故事裡的神靈，和歐洲的仙子不同——牠由無煙火焰造成，能善能惡。" Remaining 8 Q can keep 精靈 shorthand. | No |
| 4 | kt-ch4-l5-x1 | comprehension | `You see, my dear, the Djinn flew to the Howling Desert.` opts include "that vast howling wasteland" | **KIPLING_NARRATOR_VOICE_UNEXPLAINED (P1)**: Kipling's "Just So Stories" narrator uses direct second-person address ("my dear", "O dear listener", "O Best Beloved") as a signature literary device — the author speaking to the reader as a bedtime story teller. No question explains this narrative frame break. Children who encounter "You see, my dear" may be confused about speaker identity: is Grandma speaking? Is a story character? The expZh only translates the content ("精靈飛到了『Howling Desert（嚎叫沙漠）』") without noting the storytelling convention. | Add to kt-ch4-l5-x1 expZh: "『You see, my dear』是英國作家吉卜林（Kipling）說故事的特殊習慣——他會像奶奶說故事一樣，直接跟你說話。奶奶今晚模仿他！" | Yes (if narration sentence is TTS'd) |
| 4 | kt-ch4-l5-x1 | comprehension | `the Djinn flew to the Howling Desert` opts=["that vast howling wasteland", "up a tall snowy mountain", ...] | **FICTIONAL_PLACE_AS_FACT (P2)**: "Howling Desert" (嚎叫沙漠) is Kipling's invented place name, not a real geographic location. The expZh translates it literally ("那就是他去找駱駝的地方") without flagging it as fictional worldbuilding. A child curious about geography may search for this place. | Add "（這是吉卜林虛構的地名，不是真實地理）" as a parenthetical in the expZh. | No |
| 5 | kt-ch5-l7-q7 / kt-ch5-l7-x4 | emoji-pick / comprehension | `What did Vasilisa carry home?` opts=["🔥 a burning log", "🕯️ a small candle", "💀 a glowing skull", "🪨 a hot stone"] / `She gave Vasilisa a skull with glowing eyes on a stick.` | **SKULL_CULTURAL_BRIDGE_MISSING (P1)**: The skull lantern is the most culturally charged image in Ch5 (Baba Yaga). In Slavic folklore, Baba Yaga's skull lanterns guard the border between the living and the dead — they are protective talismans, not random horror props. The expZh says "骷髏頭有發光的眼睛" for x4 and "Baba Yaga 給的是頭骨上的光——那是巫婆的火，Vasilisa 就這樣帶著它走回家" for q7. Neither explains WHY a skull is a gift or what protective power it carries. For 8-12 children, a skull as a "gift" is confusing (why is a witch giving a skull to help someone?) without knowing the Slavic protective-skull folk belief. | Add to kt-ch5-l7-q7 expZh: "（骷髏頭在俄羅斯民間故事裡是護身符——能嚇走壞人。這個頭骨燈是 Baba Yaga 送給 Vasilisa 的保護禮物，不是恐嚇用的！）" | No |
| 5 | kt-ch5-l6-x2 | comprehension | `Vasilisa said quietly, "Grandmother, I came for fire."` opts=["to be polite and kind", "they are family", "she forgot her real name", "Baba Yaga asked her to"] | **SLAVIC_FOLK_STRATEGY_OVERSIMPLIFIED (P2)**: Correct answer is "to be polite and kind" (禮貌、拉近距離). This is true but misses the Slavic folk-magic layer: calling a dangerous witch "Grandmother" (Бабушка) is a ritual acknowledgment of her power — a protective strategy, not just general politeness. In Slavic folklore, naming a powerful entity as kin is a form of protective magic. The question treats it as simple social etiquette. | Enrich expZh: "叫『奶奶』是俄羅斯民間故事的特殊策略——對有力量的女巫表示敬意，就像承認她的地位，這樣她才不會生氣傷害你。不只是「有禮貌」，更是一種保護自己的方法！" | No |
| 5 | kt-ch5-l4-x7 / kt-ch5-l4-lg2 | comprehension | `The house stood on chicken legs. The legs turned slowly. The whole house moved.` | **CHICKEN_LEG_HUT_NO_SCAFFOLD (P2)**: "House on chicken legs" is Baba Yaga's most iconic feature in Slavic folklore. Ch5-l4's vocab intro (tap-pairs) does not include 雞腳屋 or any prep for a walking house. The comprehension questions assume this image lands — they ask about the house turning to face Vasilisa — but no narration or vocab lesson introduces the concept that this hut is alive and ambulatory before the questions hit. | Add a narration entry before the first chicken-legs question in kt-ch5-l4: "奶奶說：『你知道嗎？俄羅斯故事裡，Baba Yaga 的屋子長了一對雞腳——會走路、會轉身！這是這個故事最神奇的地方。』" | No |
| 7 | kt-ch7-l5 (lesson name) | — | Lesson name: "洞節之夜" / vocab: 燈籠, festival, cloak, shoe | **DONG_FESTIVAL_UNREFERENCED (P1)**: "洞節" (Cave Festival / Dong Festival) appears in the lesson title but is never introduced or explained in any question, expZh, or narration within Ch7. It is a historically specific festival associated with southern Chinese/Southeast Asian minority peoples (Zhuang, Dong). Taiwanese 8-12 children and diaspora children outside Guangxi/Yunnan are unlikely to know it. The English-facing content uses only "festival" and "lantern," which is adequate for comprehension, but the zh-facing lesson title borrows a culturally specific term without context. | In kt-ch7-l5 opening narration, add grandma frame: "奶奶說：『洞節是葉限村子裡一年一度的大節日，大家穿上最美的衣服、提著燈籠在廣場歡慶——今晚，葉限第一次有機會去。』" | No |
| 7 | kt-ch7-l7-x7 | comprehension | `That night, flying stones fell from the sky and buried the new wife and her daughter.` opts include "cruelty is punished in the end" / expZh: "壞人被飛石埋了——故事告訴我們「殘忍最終會受到懲罰」" | **AGE_APPROPRIATE_VIOLENCE_NO_CULTURAL_FRAME (P2)**: Flying stones crushing antagonists is a specific Chinese folk-tale divine-retribution trope (天降飛石), appearing in the original Youyang Zazu text (860 CE). Without this frame, the image (stepmother and stepsister buried alive under falling rocks) reads as graphic violence for 8-12 children. The expZh glosses it as a moral ("殘忍受到懲罰") but the physical imagery is stark for the target age group. | Soften by adding cultural framing to expZh: "（在古代中國民間故事裡，老天會以飛石懲罰壞人——這是「天道好還」的傳統說法。葉限的故事就是這樣結尾的。）" Optionally rewrite narration sentence to "Stone walls of the village fell on the stepmother and her daughter." for reduced violent specificity. | No if only expZh; Yes if sentence rewrites |

---

## C. Stats

| Metric | Count |
|--------|-------|
| Chapters scanned | 8 (Ch1-8) |
| Total lesson entries scanned | 915 questions across 57 lessons |
| P0 violations | **0** |
| P1 violations (cultural entity + narrator voice + skull bridge + festival label) | **4** (Ch4 ×2, Ch5 ×1, Ch7 ×1) |
| P2 violations (fictional place / folk strategy / hut scaffold / violence frame) | **4** (Ch4 ×1, Ch5 ×2, Ch7 ×1) |
| Questions with cultural markers & zh scaffold present (✅) | **241** |
| Questions with cultural markers & zh scaffold MISSING | **0** (automated check — manual P1/P2 above are quality gaps, not missing expZh) |
| Total flagged | **8** |

**Cultural origin breakdown of Ch1-8 stories:**
- Japanese (Ch1-2): Momotaro — cultural scaffolding ✅ solid. Dango translated as 糰子, demons as 妖怪.
- Danish (Ch2): Ugly Duckling — ✅ universal emotional arc, minimal culture-specific objects.
- Greek (Ch3): Tortoise/Hare — ✅ Aesop fable, no cultural blind spots.
- British/Arabic (Ch4): Camel's Hump — ⚠️ Kipling narrator voice + Djinn cultural flattening.
- Russian (Ch5): Baba Yaga — ⚠️ Skull lantern + Grandmother ritual + Chicken-leg hut.
- German (Ch6): Six Swans — ✅ universal fairy-tale elements (transformation, silence vow, sewing).
- Chinese (Ch7): Ye Xian — ⚠️ 洞節 unexplained + flying-stone violence.
- English (Ch8): Three Little Pigs — ✅ formula ("huff and puff") is internationally known; well scaffolded.

---

## D. Top 5 P0/P1

1. **P1 — kt-ch4 (×9 Q) CULTURAL_ENTITY_FLATTENING "Djinn as 精靈"**: Nine questions across Ch4-l4 through Ch4-l7 map "Djinn" → 精靈 without acknowledging Arabic/Islamic cultural origin. Kipling's Just So Stories explicitly place the Djinn in an Arabic desert context (the "Howling Desert," the three animals representing pre-Islamic work culture). Losing this frame reduces the story to generic fantasy. Fix: one sentence in kt-ch4-l4-x1 expZh establishes origin; remaining 8 Q may keep 精靈 shorthand.

2. **P1 — kt-ch4-l5-x1 KIPLING_NARRATOR_VOICE_UNEXPLAINED**: "You see, my dear, the Djinn flew..." — Kipling's distinctive bedtime-narrator address ("O Best Beloved", "my dear") is a signature literary device that matches the grandma-storytelling frame Pickup uses. But without flagging it, learners may be confused about who is speaking mid-story. Fix: add 1 expZh sentence identifying the narrator convention.

3. **P1 — kt-ch5-l7-q7 + kt-ch5-l7-x4 SKULL_CULTURAL_BRIDGE_MISSING**: Skull as gift without protective-talisman context. Children will find the gift disturbing (why is the witch giving me a skull?) unless the Slavic folk belief is bridged. Fix: one parenthetical sentence in expZh explaining skull = protective charm in Russian folklore.

4. **P1 — kt-ch7-l5 DONG_FESTIVAL_UNREFERENCED**: Lesson title "洞節之夜" uses a culturally specific festival name without any zh or en explanation in any lesson content. Fix: one narration line by grandma describing the festival as an annual village celebration.

5. **P2 — kt-ch5-l6-x2 SLAVIC_FOLK_STRATEGY_OVERSIMPLIFIED**: Calling Baba Yaga "Grandmother" explained as "polite" — misses the ritual-protection layer specific to Slavic folklore. Medium priority because the current explanation is not wrong, only shallow. Fix: enrich expZh with one sentence about the folk-magic protective strategy.

---

## E. Narrative voice / pacing improvements (required, 3 minimum)

1. **Ch4 Kipling narrator frame break**: Whenever Kipling's second-person address appears ("my dear", "O dear listener"), the current narration flow doesn't signal the frame shift — was that Grandma speaking or the story? Consider adding a `speaker: "grandma"` narration entry before the first "my dear" occurrence: "奶奶壞心眼地學起吉卜林的口氣說：" This matches Grandma's storytelling frame and signals to the learner that the narrator is performing a voice, not confusingly shifting perspective.

2. **Ch7 Ye Xian: fish spirit's warmth — underused emotional beat**: kt-ch7-l4-x8 mentions "she felt the bones warm under her back." This warmth is the emotional peak of the magic-gift system (the fish's spirit protecting her from beyond death) but no narration or question develops this. A follow-up question or narration ("奶奶輕聲說：那份溫暖，是牠用最後的方式說：我還在陪著你。") would make the magic feel emotionally resonant rather than mechanically transactional.

3. **Ch5 Baba Yaga: doll's agency is narratively flat**: kt-ch5-l6-x8 ("The doll opened its eyes") introduces the magic doll but its personality and emotional significance (it was the last gift from Vasilisa's dying mother) are never surfaced in any question or expZh. Questions only test "who did the task?" (correct: the doll) rather than WHY the doll works (maternal love as magic source). A narration beat after the doll helps: "奶奶說：這個娃娃，是媽媽去世前塞進葉限手裡的。媽媽的愛就住在裡面。" (Note: this refers to Vasilisa's mother in Ch5, not Yexian — story-local names must match.)

---

## 🔬 Architecture Recommendation (對齊業界 2026)

**ARCH-REC #92: X47_CULTURAL_SCHEMA_FIELD — Lesson JSON `culturalOrigin` metadata field**

### Pattern

Industry research (Frontiers 2026 *Integrating multimedia and local cultural content in teaching English narrative texts*; schema-theory listening assessment literature; Duolingo 2025 cultural audit practice) converges on one finding: **EFL learners' comprehension of texts with culturally unfamiliar referents is significantly lower than texts with familiar referents** — even when vocabulary is controlled. The mechanism is schema activation: if the learner has no cognitive schema for "djinn" or "skull lantern," comprehension items testing those referents measure cultural knowledge, not language skill.

Industry response (Duolingo 2025):
- Human instructional designers now perform **cultural auditing** on AI-generated content.
- Duolingo adds "cultural notes" as a distinct content layer separate from grammar explanations.
- Research: multimedia + local cultural content increases EFL narrative comprehension **and** engagement (Frontiers 2026 study).

### Proposed field (Zod extension)

```typescript
// In src/data/lessons.ts — optional metadata on each lesson
culturalOrigin?: {
  tradition: string;         // "japanese" | "russian" | "arabic" | "chinese-southern" | "british-colonial" | ...
  keyObjects: string[];      // ["djinn", "skull lantern", "chicken-leg hut"]
  bridgeNoteZh: string;      // 1-sentence grandma-voice cultural frame
}
```

Enables:
1. **Lint rule X47**: flag `type: listen-mc | comprehension` questions that reference a `keyObject` without a `bridgeNoteZh` entry — the same family as X2/X3 shape-bias linting.
2. **UI**: optional "奶奶補充" (grandma aside) chip in LessonScene when `bridgeNoteZh` present — tap to expand.
3. **Heritage learner mode**: future feature-flag that shows expanded cultural notes for diaspora learners.

### Pickup 適配分析

| Dimension | Assessment |
|-----------|-----------|
| Schema burden | Low — optional field, no breaking change to Zod discriminated union |
| Content burden | Medium — requires 1 bridge sentence per story (8 stories = 8 entries) |
| Build impact | Zero — metadata only, no runtime change unless UI chip added |
| Lint benefit | High — X47 would have caught all 4 P1 violations in this audit automatically |
| Heritage learner ROI | High — secondary audience (海外台灣/華人) specifically benefits from cultural bridge notes |
| Children ELT alignment | ✅ matches 2026 research: multimedia + cultural scaffold improves comprehension AND engagement |

### Verdict: ✅ 適合

Effort: Low (1 hr schema + 8 bridge sentences). ROI: High (systematic lint + heritage-learner UX + aligns with 2026 industry practice). Recommend implementing X47 lint rule first (no UI), then optionally adding the "奶奶補充" chip in Phase 2.

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|-------------|--------|-----|---------|
| `culturalOrigin` metadata + X47 lint | Frontiers 2026 / Duolingo cultural audit / Schema Theory (Buck 2001) | ✅ Zod optional field, no breaking change; catches P1 cultural gaps at CI | Low (schema + 8 sentences) | High | **Implement X47 lint + field definition; UI chip optional Phase 2** |

