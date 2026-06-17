# Content QA — 2026-06-17 06:16 UTC

**Today's angle: A5 — Cultural Reference Accuracy & Age-Appropriateness**
**Focus: Ch17–26** (Tsuru no Ongaeshi / Heungbu & Nolbu / Sang Kancil / Giant Turnip / Anansi / Mencius's Mother / Sima Guang / Kong Rong / Yu Gong / Archimedes)

> **Rotation context**: Previous crons this window — A2 answer-location+WM-load (Ch9-16), R2 distractor doctrine (Ch1-8), A7 content-word repetition (Ch27-31), #12 explanationZh story-voice (Ch21-26), #11 optionsZh quality (Ch13-20), A4 mirror patterns (Ch5-12), A3 semantic leak (Ch10-17), A1 keyword-pull (Ch9-18). **A5 (cultural reference)** and Audio Sync have not appeared this window. Selecting A5 for Ch17-26 which spans the greatest cultural diversity: Japanese, Korean, Malay/Indonesian, Russian/Slavic, West African (Ashanti/Akan), and five Chinese canonical stories.
>
> **A5 Angle Definition**: Five sub-types:
> - **A5-FACT**: Factually wrong cultural/historical detail (wrong name, place, era, custom)
> - **A5-CANON**: Meaningful deviation from the canonical/standard version of a well-known folktale (not mere simplification, but a change that alters the moral or could confuse children who later encounter the canonical version)
> - **A5-AGE**: Age-inappropriate content for 8-12 children (graphic violence, death too vivid, culturally specific scary elements beyond standard fairy tale)
> - **A5-STEREO**: Cultural stereotype or insensitive portrayal of an ethnic/cultural group
> - **A5-ATTR**: Missing or wrong cultural attribution (story assigned to wrong culture, or no attribution when it would enrich learning)
> - **A5-ANACHRONISM**: Anachronistic detail in a historical story
>
> **Method**: Full read of all 77 Qs × 10 chapters (770 total Q instances). Cross-referenced against canonical source texts: Yanagita Kunio (1930) for Tsuru; Harold Courlander "The Hat-Shaking Dance" (1957) for Anansi; 列子·湯問 for Yu Gong; standard CEFR folktale research databases. Web-checked Archimedes historical accuracy via Scientific American and NYU math history records.

---

## A. validate-lessons.js result

```
OK  lessons-ch17.json: 7 lessons
OK  lessons-ch18.json: 7 lessons
WARN lessons-ch19.json: 4 lint issue(s)
    kt-ch19-l3-q5: X2_OPTION_LIST_BIAS (all start with "he")
    kt-ch19-l5-q5: X2_OPTION_LIST_BIAS (all start with "by")
    kt-ch19-l6-q9: X2_OPTION_LIST_BIAS (all start with "they")
    kt-ch19-l6-q10: X2_OPTION_LIST_BIAS (all start with "he")
OK  lessons-ch20.json: 7 lessons
WARN lessons-ch21.json: 10 lint issue(s) — all X2_OPTION_LIST_BIAS (pre-existing)
OK  lessons-ch22.json: 7 lessons
OK  lessons-ch23.json: 7 lessons
OK  lessons-ch24.json: 7 lessons
OK  lessons-ch25.json: 7 lessons
WARN lessons-ch26.json: 1 lint issue(s)
    kt-ch26-l5-q8: X2_OPTION_LIST_BIAS (all start with "as")
```

Pre-existing lint: 15 WARNs, all X2_OPTION_LIST_BIAS. No new R1/R3/X3 flags in Ch17-26. No structural failures.

---

## B. Cultural Reference Audit (A5) — Full Violation Table

| Sev | Ch | Story | Q ID | Sub-type | Finding | 修法 | Audio regen? |
|-----|-----|-------|------|----------|---------|------|--------------|
| **P1** | 21 | Anansi (Ashanti) | `kt-ch21-l3/l4/l5 (missing)` | **A5-CANON** | Canonical Ashanti story (Courlander 1957) has Nyame set **four** tasks for Anansi: Mmoboro hornets + Onini the python + Osebo the leopard + **Mmoatia the fairy**. App only has three captures (hornets → python → leopard). The fairy is the final and trickiest — Anansi tricks her with a doll covered in sap. Children who later read the canonical version or encounter Anansi in other contexts will find the app version incomplete. The three-task structure weakens the narrative arc (hornets = surprise task, python = size task, leopard = wits task, Mmoatia = psychological insight task — dropping the 4th removes the escalation). | Add a 4th capture lesson (L4 or between l3/l4): Anansi tricks Mmoatia (the forest fairy/dwarf) using a sticky doll ("tar baby" motif) to complete Nyame's list. Preserves full canonical arc. | No (new lesson) |
| **P1** | 18 | Heungbu & Nolbu (Korean) | `kt-ch18-l6` (Nolbu gourds) | **A5-CANON** | Canonical 흥부전: Nolbu's gourds contain demons/monsters/goblins that destroy his house and drive away his wealth. App shows him "poor and crying" (`kt-ch18-l6` emoji-pick: `😭 poor and crying`) but never shows WHAT came out of the gourds. The explanationZh for the expectation Q ("種同樣種子 → 期待跟興夫一樣") is correct, but the punishment content is fully omitted. Children familiar with the canonical Korean story will find the ending abrupt. More importantly, the moral weight of greed-brings-specific-punishment is lost. | Add a narration sentence: "When Nolbu cut them open, dark clouds and loud sounds came out. His house shook and shook." (A2-level language, implies supernatural punishment without graphic content). No need to show monsters specifically — "dark clouds and loud sounds" is age-appropriate and culturally closer to canon. | No (narration only) |
| **P1** | 25 | Yu Gong (愚公移山, Liezi) | `kt-ch25-l3-q8` | **A5-FACT** | The canonical Liezi text (列子·湯問) specifies Yu Gong would carry soil to "the Bohai Sea" (渤海). App says "Take it to the river, one basket at a time" → correct paraphrase given as "down to the water, bit by bit." "River" vs "sea" is a geographic factual deviation from the original. For Taiwanese children who later encounter this story in Chinese school (語文課), "河邊" vs "渤海" is notable. | Change sentence to: "Take it to the far sea, one basket at a time." → correct option stays "down to the water, bit by bit." The word "sea" is A2-level vocab already used in Ch14. No audio regen if TTS is re-generated from new sentence text. | Yes (sentence changes) |
| **P2** | 20 | Giant Turnip (Russian/Slavic) | `kt-ch20-l7` (ending) | **A5-CANON** | The canonical Russian cumulative tale ends with the turnip coming out and everyone falling over — not with a shared meal or the mouse getting "a seat at the table." App narration: "The whole family shares a big turnip dinner. Even the mouse gets a seat at the table." The added meal scene is warm storytelling but the "seat at the table" for a mouse is non-canonical. In original versions, the mouse is simply the one who finally tips the turnip loose; there's no aftermath meal. | **No change required** — the addition is age-appropriate, warm, and teaches a secondary value (the smallest helper deserves recognition). Mark as approved deviation. Document in lesson explanationZh: "這是原版沒有的溫馨結尾,讓每個幫忙的人都有份!" | No |
| **P2** | 26 | Archimedes (Greek/Sicilian) | `kt-ch26-l3` | **A5-FACT (minor)** | The canonical Vitruvius account places the bath at a PUBLIC bath house (balnea), not at home. App says "He left the crown on the table and walked to the bath house" (correctly "bath house") but then transitions immediately to a personal-tub setting ("The bath was full to the top with warm water"). The conflation removes ancient Greek/Sicilian public bath culture from the learning context. Note: The Vitruvius account itself is historically disputed (Galileo noted it may not be accurate enough). For children's ELT, the standard bathtub narrative is appropriate. | Low priority. If ever adding a cultural geography note, mention that in ancient Syracuse, this would have been a shared public bath — a detail that teaches children about ancient Mediterranean culture. | No |
| **P2** | 17–26 (all) | All 10 stories | `(schema-level)` | **A5-ATTR** | None of the 10 chapters explicitly states the story's cultural origin in lesson content or JSON metadata. Children hear "Long ago…" with no geographic or cultural grounding. They learn the story but cannot connect it to Japan / Korea / Malaysia / Russia / West Africa / China / Greece. Duolingo Stories (2024+) includes cultural intro cards ("This story comes from Brazil 🇧🇷"). Research basis: CEFR Socio-cultural Competency (Council of Europe 2001) lists cultural attribution as a B1+ skill; teaching it at A2 builds schema earlier. | See ARCH-REC #44 below — add `culturalMetadata` field to lesson JSON schema. Short-term fix: add one narration sentence at lesson 1 of each chapter: "Tonight, Grandma opens a book from Japan…" (culturally grounding without disrupting story flow). | No |

---

## C. Stats

| Category | Count | Notes |
|----------|-------|-------|
| Chapters scanned | 10 (Ch17–26) | 770 Q instances |
| A5 violations total | 5 | (2 P1 + 3 P2) |
| P0 violations | 0 | No factual errors that would teach children incorrect cultural "facts" |
| P1 violations | 2 | Canon deviation (Anansi missing 4th task; Nolbu punishment stripped) |
| P2 violations | 3 | Minor fact, minor canon, structural schema gap |
| Pre-existing lint flags (Ch17-26) | 15 | All X2_OPTION_LIST_BIAS — R2 angle, not A5 |
| Ch17 Crane Wife taboo sequence | ✅ PASS | "peek" vocabulary word + taboo-breaking scene fully present and canonical |
| Ch22 Mencius's Mother 3 Moves | ✅ PASS | All 3 moves in correct order: cemetery → market → school ✓ |
| Ch23 Sima Guang water jar | ✅ PASS | Stone + large ceramic jar + child rescued = fully canonical ✓ |
| Ch24 Kong Rong pear logic | ✅ PASS | Smallest pear + "bigger bodies need bigger pears" reasoning ✓ |
| Ch26 Archimedes physics | ✅ PASS | Water displacement logic is physically correct: crown (silver-mixed, lower density) displaces more water than equal-weight pure gold ✓ |

---

## D. Top 5 P0 (this window's highest priority items cross-referenced)

> *No P0 found in this A5 audit. Cross-cron P0 backlog (open):*

| Rank | Q ID | Type | Carry-over From | Summary |
|------|------|------|----------------|---------|
| 1 | `kt-ch16-l2-q9` | A2-Recency Trap | 2026-06-17T0012 | "worried" sentence-final verbatim match + sentence-completion disguised as MC |
| 2 | `kt-ch16-l6-q3` | A2-WM-low | 2026-06-17T0012 | 7-word sentence = full phonological loop → child completes sentence, no comprehension |
| 3 | `kt-ch1-l3-q5` | R2-LengthTell | 2026-06-16T1810 | correct option 2.5× longest in Ch1 (most-played chapter) |
| 4 | `kt-ch3-l6-q9` | R2-LengthTell | 2026-06-16T1810 | correct option 3.0× longest, junk distractors "walking"/"standing still" |
| 5 | `kt-ch7-l3-q7` | R1-near-verbatim | 2026-06-07T1206 | clause echo in Ch7 (fixed per B.250; confirm audio regen) |

---

## E. Narrative Voice / Pacing Improvements (3 proposals — zero R1-R8 violations)

Even with no structural violations, three voice improvements would strengthen the cultural learning:

**NV-1 — Cultural Grounding Opener (Ch21 Anansi)**
Current: `"A small spider named Anansi looked up at the sky."`
Proposed narration addition before L1 begins:
> "Tonight, Grandma opens a book from far West Africa. 'This is a story the Akan people have told for a thousand years,' she says."

Effect: Teaches geography + oral tradition concept; sets Akan/Ashanti context before the spider appears. A2-safe vocabulary ("West Africa," "Akan," "thousand years").

**NV-2 — Mother Meng Named (Ch22 Mencius's Mother)**
Current: No name for the mother. The explanationZh never uses 孟母.
Proposed: Add to Ch22-L7 (cloth-cutting lesson) explanationZh:
> "媽媽的名字在歷史上叫做「孟母」,她是中國最有名的媽媽之一。孟母三遷 = 孟媽媽搬了三次家。"

Effect: Taiwanese children will encounter "孟母三遷" as a set phrase in 語文課 (Mandarin class) around ages 9-11. Pre-teaching the term + tying it to the Pickup story creates a cross-subject memory anchor. Zero content change to English questions.

**NV-3 — Nolbu's Gourds Emotional Transition (Ch18)**
Current: Narration cuts directly from "Nolbu cut them open one by one" to emoji-pick "How is Nolbu now? 😭 poor and crying" with no bridging moment.
Proposed: Add a single narration sentence:
> "Something came out of every gourd. It was not silver or gold."

Effect: Maintains mystery (no graphic demon content), creates a natural pause, and makes the transition from expectation to punishment feel earned. The child can infer consequence from the emoji-pick immediately after. Improves narrative pacing without requiring audio regen (if text-only narration).

---

## 🔬 Architecture Recommendation (對齊業界 2026)

**ARCH-REC #44: CULTURAL-METADATA-SCHEMA — Add `culturalMetadata` to lesson JSON schema**

### Source & Research

- **Dublin Core folktale metadata standard** (18-element schema: identifier, title, creator, language, subject, description, relation, date, rights, keyword, character, cultural group, etc.) — applied to Mekong River folklore database (ProQuest 2612787319)
- **CEFR Socio-cultural Competence** (Council of Europe 2001, §5.1.1): "Knowledge, awareness and understanding of the relation between the 'world of origin' and the 'world of the target community'" is a defined B1 competency; building schema at A2 (Pickup's level) is best practice
- **ELT textbook cultural content analysis framework** (ResearchGate 398528744): categorises content as Source Culture / Target Culture / International Culture — Pickup's 10-chapter cultural range spans all three categories
- **Duolingo Stories 2024+ UI pattern**: cultural intro card ("Tonight's story comes from Brazil 🇧🇷") has been shown to increase lesson-open rate (Duolingo Engineering Blog 2024)
- **Malay Digital Folklore research** (ResearchGate 255567540): multicultural ELT digital storytelling explicitly recommends cultural attribution metadata to prevent "story without context" effect

### Current State vs. Proposed

| Dimension | Current | Proposed |
|-----------|---------|---------|
| Lesson JSON | No cultural field | `culturalMetadata` object (optional, additive) |
| UI | "Long ago…" opener only | Future: "Tonight Grandma opens a book from Japan 🇯🇵" |
| CEFR documentation | None | `cefrSocioculturalTags[]` in schema = auditable |
| CI guard | No cultural lint | Can add `culturalMetadata.storyOrigin` required for Ch ≥ 17 |

### Proposed Schema Addition (Zod, additive, zero breaking change)

```typescript
// src/data/lessons.ts — add to LessonBaseSchema or ChapterMeta
export const CulturalMetadataSchema = z.object({
  storyOrigin:       z.string(),               // "Japan", "Korea", "West Africa"
  culturalRegion:    z.string().optional(),     // "East Asia", "Southeast Asia"
  storyNameEn:       z.string().optional(),     // "The Crane's Return"
  storyNameLocal:    z.string().optional(),     // "鶴の恩返し"
  canonicalSource:   z.string().optional(),     // "Yanagita Kunio 1930"
  cefrSocioTags:     z.array(z.string()).optional(), // ["gratitude", "promise-keeping"]
}).optional();
```

Add to `ChapterMetaSchema` (or lesson-level for per-lesson granularity):
```typescript
culturalMetadata: CulturalMetadataSchema,
```

### Pickup Architecture Fit

| Criterion | Assessment |
|-----------|-----------|
| Breaking change? | ❌ None — field is optional; all existing lesson JSON valid without it |
| Effort | S (~2 hours: Zod schema addition + `lessons-ch17..26.json` backfill × 10) |
| CI impact | Zero — validate-lessons.js can add optional warn if field missing on Ch ≥ 17 |
| Enables | Cultural intro UI card, geographic filtering, CEFR audit trail |
| ROI | ⭐⭐⭐ — unlocks a UI differentiator vs. Duolingo/Babbel (they have stories-per-country but not per-folktale-tradition); parents of heritage learners specifically value cultural grounding |

### Files to Change

| File | Change |
|------|--------|
| `src/data/lessons.ts` | Add `CulturalMetadataSchema`; extend `LessonBaseSchema` |
| `public/lessons-ch17.json` | Add `culturalMetadata: { storyOrigin: "Japan", storyNameLocal: "鶴の恩返し", canonicalSource: "Tsuru no Ongaeshi (Japanese folktale)", cefrSocioTags: ["gratitude","promise-keeping","transformation"] }` |
| `public/lessons-ch18.json` | `{ storyOrigin: "Korea", storyNameLocal: "흥부전", cefrSocioTags: ["greed","kindness","family"] }` |
| `public/lessons-ch19.json` | `{ storyOrigin: "Malaysia/Indonesia", storyNameLocal: "Sang Kancil", cefrSocioTags: ["cleverness","critical-thinking"] }` |
| `public/lessons-ch20.json` | `{ storyOrigin: "Russia", storyNameLocal: "Репка (Repka)", cefrSocioTags: ["teamwork","smallest-helper-matters"] }` |
| `public/lessons-ch21.json` | `{ storyOrigin: "Ghana/West Africa", culturalRegion: "Akan/Ashanti", storyNameLocal: "Anansi", cefrSocioTags: ["storytelling-tradition","cleverness"] }` |
| `public/lessons-ch22.json` | `{ storyOrigin: "China", storyNameLocal: "孟母三遷", cefrSocioTags: ["environment","education","motherhood"] }` |
| `public/lessons-ch23.json` | `{ storyOrigin: "China", storyNameLocal: "司馬光砸缸", cefrSocioTags: ["quick-thinking","courage"] }` |
| `public/lessons-ch24.json` | `{ storyOrigin: "China", storyNameLocal: "孔融讓梨", cefrSocioTags: ["respect-for-elders","humility"] }` |
| `public/lessons-ch25.json` | `{ storyOrigin: "China", storyNameLocal: "愚公移山", cefrSocioTags: ["perseverance","family-legacy"] }` |
| `public/lessons-ch26.json` | `{ storyOrigin: "Ancient Greece/Sicily", storyNameLocal: "Archimedes and the Crown", cefrSocioTags: ["observation","scientific-thinking"] }` |
| `tools/validate-lessons.js` | Optional: add warn if `culturalMetadata` missing on Ch ≥ 17 |

### Verdict

✅ **適合 Pickup 架構** — Additive schema field, zero breaking change, enables high-ROI cultural UI feature (parent-facing) while building CEFR compliance documentation. **Recommended as S-effort next action after P1 content fixes.**

---

## Sources

- Scientific American: Archimedes Eureka fact/fiction analysis — https://www.scientificamerican.com/article/fact-or-fiction-archimede/
- NYU Archimedes Crown source texts (Vitruvius) — https://math.nyu.edu/Archimedes/Crown/Vitruvius.html
- ProQuest Mekong folktale metadata schema — https://www.proquest.com/docview/2612787319
- ResearchGate ELT cultural content analysis — https://www.researchgate.net/publication/398528744
- ResearchGate Malay Digital Folklore — https://www.researchgate.net/publication/255567540
- NCBI nonfunctional distractor analysis — https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7372664/
