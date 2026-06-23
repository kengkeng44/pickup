# ⚠️ Content QA — 2026-06-23 12:12 UTC

**Today's angle:** #7 — A5 cultural reference (origin identification, accuracy, and age-appropriate scaffolding for 8-12 Taiwanese / heritage learners)
**Focus:** Ch17–24 (Crane Wife/Japan, Heungbu-Nolbu/Korea, Sang Kancil/Malay, Enormous Turnip/Russia, Anansi Spider/West Africa, Mencius' Mother/China, Sima Guang/China, Kong Rong/China)

---

## A. validate-lessons.js result

```
OK  lessons-ch17.json: 7 lessons
OK  lessons-ch18.json: 7 lessons
WARN lessons-ch19.json: 4 lint issue(s):
  kt-ch19-l3-q5:  X2_OPTION_LIST_BIAS (all start with "he")
  kt-ch19-l5-q5:  X2_OPTION_LIST_BIAS (all start with "by")
  kt-ch19-l6-q9:  X2_OPTION_LIST_BIAS (all start with "they")
  kt-ch19-l6-q10: X2_OPTION_LIST_BIAS (all start with "he")
OK  lessons-ch20.json: 7 lessons
WARN lessons-ch21.json: 11 lint issue(s) [prior cycle, not re-enumerated]
OK  lessons-ch22.json: 7 lessons
OK  lessons-ch23.json: 7 lessons
OK  lessons-ch24.json: 7 lessons

Total mirror-lint issues: 70 (warn-only; set MIRROR_LINT_STRICT=1 to fail build)
```

---

## B. Violation Table

> **Angle A5 definition:** Content references a cultural concept (deity name, sacred animal, mourning color, cultural origin of story, historical person's identity) without adequate scaffolding for 8-12 Taiwanese / Chinese-heritage children, creating a comprehension gap or cultural mismatch. Sources: Byram 1997 (cultural competence model); Bennett 2004 (intercultural sensitivity scale); ResearchGate "Multimodality of Cultural Content in ELT Materials for Young Learners" (2017); British Council "Language and Culture in the EFL Classroom" (teachingenglish.org.uk); Frontiers in Education "Folk tradition, transition, and transformation for early childhood education" (2025).

| Ch | Q ID / Location | type | snippet / issue surface | violation | 修法 | audio regen? |
|----|----------------|------|------------------------|-----------|------|-------------|
| 21 | `kt-ch21-l1-q4` + all L2 narration | listen-tf | `"All the stories belonged to Nyame, the Sky God."` EX: 「天神」 | **A5-7 P0**: Nyame is the Supreme Being / Sky God of the Akan people (Ghana / Ivory Coast). Calling it only 「天神」 leaves Taiwan 8-12 children to equate it with Jade Emperor (玉皇大帝) or the Christian God — a cultural misidentification. The story never mentions Africa. | Add to EX: 「Nyame 是這個非洲阿坎族故事裡天神的名字 (Nyame = name of the Sky God in this African story from Ghana)」. Add narration before L1: 「This is a story from West Africa, the home of Anansi.」 | no (EX text only) |
| 22 | All lessons, esp. `kt-ch22-l7-q4` | listen-tf | `"He grew up and became a great thinker for all of China."` EX: 全中國都知道他了 | **A5-10 P0**: The lesson NEVER names Meng as 孟子 (Mencius, 372–289 BC), one of the most important Confucian philosophers. Taiwan 8-12 students learn 孟子 in elementary school curriculum. Missing this connection erodes the story's cultural value for its primary audience and heritage learners. | Add to `kt-ch22-l7-q4` EX: 「Meng 長大後就是孟子 — 中國儒家最重要的思想家之一 (Meng grew up to be Mencius — one of the most important Confucian thinkers in Chinese history)」 | no |
| 22 | `kt-ch22-l1-q6` narration bridge | listen-mc | `"Every day Meng watched people walk past in long white lines."` EX: 一排排慢慢走過去 | **A5-11 P0**: White (白色) is the Chinese mourning color (for funerals, death). This is WHY the mother was worried — the neighborhood was teaching Meng to associate with death rituals. The EX explains people "walked slowly" but NEVER explains that white = death/mourning in Chinese culture, which is the entire cultural logic behind the mother's concern. Without this, the scene is opaque to children raised outside Chinese mourning customs. | Add to EX or adjacent narration: 「在中國傳統裡,白色是喪葬的顏色 — 媽媽看到兒子在學辦喪禮,所以很擔心 (In Chinese tradition, white is the color for funerals — that's why the mother was worried to see her son copying these rituals)」 | no |
| 21 | Entire Ch21 | narration | `"Long ago, there were no stories in the world."` — no cultural origin | **A5-8 P1**: The Anansi story (Anansi Trickster Spider) is the most iconic folklore hero of the Akan people (Ghana, Ivory Coast) and spread throughout the Caribbean. The entire chapter never mentions Africa, Ghana, or West Africa. For Taiwan 8-12 children, this is a rare opportunity to learn about African oral tradition — which aligns with Taiwan's 2019+ curriculum goal of global cultural awareness. Missed entirely. | Add first narration before L1 Q1: 「Long ago in West Africa, in the land of Ghana, storytellers passed tales from heart to heart.」 | yes (1 narration sentence) |
| 17 | Entire Ch17 | narration | `"Long ago, a kind old man lived in the snowy mountains."` — no cultural origin | **A5-2 P1**: This is the Japanese folk tale 鶴の恩返し (Tsuru no Ongaeshi / Crane's Gratitude), one of the most beloved Japanese folk stories. The chapter never identifies it as Japanese. Snow, mountains, loom, sake cup, crane — all Japanese cultural markers, but they float without a cultural anchor for 8-12 Taiwanese children who may be familiar with Japanese anime/pop culture and would recognise the context if named. | Add first narration: 「This is an old story from Japan, where cranes are said to be birds of great grace and kindness.」 | yes (1 narration sentence) |
| 19 | Entire Ch19 | narration | `"Sang Kancil was a small mouse deer in the green forest."` — no cultural origin | **A5-5 P1**: Sang Kancil (鼠鹿 / Kantchil) is the most beloved folk hero of Malay-speaking Southeast Asia (Malaysia, Indonesia, Brunei, Singapore). The chapter never identifies this as Southeast Asian / Malay folklore. For Taiwanese children in the context of Taiwan's southbound policy (南向政策), knowledge of ASEAN cultures is explicitly in elementary curriculum. Mouse deer are also animals unknown to most Taiwan children — no geographic or biological note is provided. | Add narration before L1: 「In the green rainforests of Southeast Asia, there lived a tiny deer no bigger than a rabbit.」 Add to L1 tap-pairs EX: 「mouse deer = 鼠鹿,東南亞森林裡真實存在的小動物,腦袋瓜比身體更大!」 | yes (1 narration sentence) |
| 24 | Ch24 overall, esp. `kt-ch24-l1-q3` | listen-mc | `"Long ago in China, there lived a boy named Kong Rong."` | **A5-13 P1**: Kong Rong (孔融, 153–208 AD) was a direct 20th-generation descendant of Confucius (孔子). This fact is WHY the 讓梨 story carries special cultural weight — it shows that even a descendant of the great teacher was raised to embody Confucian virtue. Without this, the story is just "a polite boy." For Taiwan 8-12 children who learn 孔子 in school, this connection would make the story resonate far more deeply. | Add to `kt-ch24-l1-q3` EX or opening narration: 「Kong Rong 是孔融——他是孔子 (Confucius) 的後代子孫 (Kong Rong was a descendant of Confucius, the most important teacher in Chinese history)」 | no |
| 17 | `kt-ch17-l1-q6` | listen-mc | `"A white crane was caught in a hunter's trap."` EX: 鶴是一種鳥 | **A5-1 P2**: The crane (鶴) is a sacred bird in Japanese culture — symbol of longevity (長壽), good fortune (吉祥), and gratitude (恩返し). Explaining it as simply "a bird" misses the cultural significance that makes the crane's transformation believable and emotionally meaningful. The reason the old man is kind to it — and the reason it returns as a woman — hinges on the crane's sacred status. | Expand EX to: 「鶴是日本故事裡的神聖鳥 — 代表感恩和長壽 (In Japanese stories, cranes are sacred birds — symbols of gratitude and long life)」 | no |
| 18 | `kt-ch18-l1-q6` EX | listen-mc | EX: 「孬夫把房子、米、牛都拿走」 | **A5-4 P2**: EX uses "孬夫" (孬 = bad/cowardly, 夫 = person) which makes the Korean phonetic name "Nolbu" appear to have a Chinese-character meaning. Nolbu (놀부) is a Korean name, not a Chinese compound. Children may misconstrue that Korean names have Chinese moral-meaning components. The character 孬 is not standard Mandarin and may be unfamiliar to many children. | Change EX to: 「哥哥 Nolbu 把房子、米、牛都拿走 (Nolbu is the Korean name for the older brother — it's just his name, not a Chinese word)」. Alternatively use 「大哥 (older brother)」 uniformly in EXs. | no |
| 19 | `kt-ch19-l1-q6` EX + narration | listen-mc | No explanation of what a mouse deer is or where it lives | **A5-6 P2**: "Mouse deer" is a chevrotain (蹄兔鹿) — a Southeast Asian animal with the size of a rabbit but deer-like hooves. 8-12 Taiwanese children have likely never seen one. Without any biological/geographic note, children might imagine a large Disney-style deer, which breaks immersion and undermines the story's whole conceit (small vs. large, clever vs. strong). | Add to tap-pairs vocabulary EX at L1: 「mouse deer = 鼠鹿,是東南亞雨林裡的小動物,比一隻兔子還小,但腳有小蹄子!」 | no |
| 21 | `kt-ch21-l1-q4` EX | listen-tf | EX: 故事全都是天神的 | **A5-9 P2**: The EX uses generic "天神" (Sky God) without noting that "Nyame" is a specific named deity from Ghanaian/Akan tradition. This prevents children from distinguishing between different mythological systems (Chinese 天神 vs. Akan Nyame). | Expand EX: 「故事全都是 Nyame 的 — 他是非洲加納阿坎族故事裡的天神,地上的人一個都拿不到」 | no |
| 23 | Ch23 overall | narration | No identification of Sima Guang as historical figure | **A5-12 P2**: Sima Guang (司馬光, 1019–1086 AD) was a real Song Dynasty historian who later compiled 資治通鑑 (Comprehensive Mirror), one of China's greatest historical works. The chapter treats him purely as a clever child, missing an opportunity to connect to real Chinese history. For Taiwan 8-12 students who begin learning about Chinese dynasties, knowing "this clever boy grew up to write one of China's most famous books" would add meaning. | Add to final narration: 「Sima Guang grew up to be one of China's greatest historians. His stories are still told today.」 | yes (1 narration sentence) |
| 24 | `kt-ch24-l7-q6` + Ch24 overall | listen-mc | No link to Confucian virtue framework | **A5-14 P2**: 孔融讓梨 is explicitly cited in 三字經 (Three Character Classic) as a model of 禮讓 (礼让 — yielding/courtesy as Confucian virtue). The story teaches the behavior correctly but never links it to the broader Chinese cultural value system (仁義禮讓). Heritage learners and Taiwan children who encounter this in 三字經 or Chinese class will recognise the concept but the connection is never made. | Add to closing narration: 「People remember Kong Rong because in Chinese tradition, giving the better share to elders is one of the greatest acts of kindness.」 | yes (1 narration sentence) |

---

## C. Stats

| Metric | Value |
|--------|-------|
| Chapters scanned | Ch17–24 (8 chapters) |
| Total lessons | 56 |
| Total Qs (non-narration) | ~248 |
| A5-auditable Qs / narrations | 248 + ~112 narration lines |
| **P0 cultural accuracy gaps** | **3** |
| **P1 missing cultural origin ID** | **4** |
| **P2 scaffolding gaps** | **6** |
| Chapters with no cultural origin identified | 5 of 8 (Ch17, Ch19, Ch20, Ch21; Ch20 omitted from violations as Russian turnip has minimal cultural-specificity risk) |
| EXs using correct cultural provenance | 2 of 8 (Ch18 names Korea; Ch22/23/24 say "China") |
| Pre-existing X2 lint violations | 4 in Ch19, 11 in Ch21 (unrelated to A5, pre-existing) |

---

## D. Top 5 P0

1. ⚠️ **A5-7** `kt-ch21-l1-q4` — Nyame introduced as generic 「天神」 with no Ghana/Akan/Africa identification. Taiwan children will conflate with 玉皇大帝 or Biblical God. Age-sensitive: introduces children to a real indigenous African deity without cultural context. Compound risk: the story's moral depends on a spider outmatching a god — without understanding the cultural relationship between Nyame and Anansi in Akan cosmology, the story reads as simply whimsical rather than culturally revolutionary.

2. ⚠️ **A5-10** Ch22 L7 — Meng is NEVER identified as 孟子 (Mencius). This is arguably the most educationally costly gap in Ch17–24: Taiwan 8-12 children learn 孟子 in school, and connecting this story to their curriculum would double its value for both comprehension and recall.

3. ⚠️ **A5-11** `kt-ch22-l1-q6` / `kt-ch22-l2-q3` — White clothing processions (喪禮行列) never explained as Chinese mourning culture. The EX at L2-q3 does say 「模仿他外面看到的喪禮隊伍」 (imitating funeral procession) — but this is the ONLY mention and it appears in an EX (post-reveal only). No narration ever frames WHY funerals = problematic environment in 孟母's cultural worldview (Chinese belief that children absorb their environment's character). The core cultural logic of 孟母三遷 — 近朱者赤近墨者黑 — is never surfaced.

4. ⚠️ **A5-8** Ch21 entire — Anansi story (West Africa / Ghana / Akan) never identified by geographic/cultural origin. This is a systemic pattern: Ch19, Ch20, Ch21 all omit cultural provenance. In an ELT context for global cultural awareness, omitting Africa from the cultural map while including Japan, Korea, Russia, and China sends an implicit message.

5. ⚠️ **A5-2** Ch17 entire — Crane Wife (鶴の恩返し) never identified as Japanese. Snow mountains + loom + crane + promise-taboo are all distinctively Japanese cultural markers but float free of any Japan context. A one-sentence narration opener would fix this without content changes.

---

## E. Narrative Voice / Pacing Improvements (3 required, even with structural violations found)

### E1. Opening cultural frame narrations missing across non-Chinese chapters

Ch17, Ch19, Ch20, Ch21 all begin with "Long ago, …" as if the cultural setting is self-evident. Compare to Ch22–24 which say "Long ago in China." The asymmetry treats non-Chinese folk traditions as cultureless, placeless stories. **Proposed pattern**: Each chapter's first narration line should identify origin: 「This is a story from [Japan / Southeast Asia / Russia / West Africa]…」 This one-sentence change per chapter costs minimal audio budget (1 re-record per chapter) and maximizes cross-cultural literacy.

### E2. Transition narration between "trickster reveals lie" and moral in Ch19

Ch19 L6: After Sang Kancil reveals "there is no message from the king!", the chapter jumps immediately to the crocodiles' anger and Kancil eating fruit. The moral narration comes only at L7: `"A small body is fine. A smart head is better."` For 8-12 year olds, a **one-beat pause narration** between the river-crossing triumph and the lesson narration would improve pacing: e.g., `"Sang Kancil sat under the tree and laughed a small, quiet laugh."` — this gives a moment for the emotional payoff to land before the explicit lesson statement.

### E3. Ch22 resolution narration misses the "three moves" cultural callback

The closing narration of Ch22 is: `"Many parents today still think about where they live for their children."` This is good but skips the cultural callback to the famous Chinese idiom 「孟母三遷」(Mencius's Mother's Three Moves). A story this deeply embedded in Chinese cultural literacy should close with acknowledgment: `"People remember this mother not by her name, but by her three moves — and what she knew: the place shapes the child."` This would reinforce the cultural idiom that Taiwan children may hear in school or from grandparents, creating a cross-context recognition moment.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### Research basis
- British Council "Language and culture in the EFL classroom" (teachingenglish.org.uk) — recommends explicit cultural origin labels in materials
- Frontiers in Education "Folk tradition, transition, and transformation for early childhood education" (2025) — folk tale pedagogy for young learners benefits from heritage context bridging
- ResearchGate "Multimodality of Cultural Content in ELT Materials for Young Learners" (2017) — cultural content without geographic/cultural context reduces comprehension depth
- Global Sprouts "How Folk Tales Teach Kids About the World" (globalsprouts.com) — best practice: folk tale lessons should identify the cultural community of origin as part of first exposure

### Pattern: `storyOrigin` metadata field + Cultural Provenance Badge

**What it is:** A structured metadata field in the lesson JSON (and optionally a visual badge in LessonScene) that encodes:
1. Geographic origin region (e.g., `"Japan"`, `"West Africa"`, `"Korea"`, `"Southeast Asia"`)
2. Cultural community (e.g., `"Akan people (Ghana)"`, `"Malay tradition"`)
3. Approx. historical period (e.g., `"Edo period"`, `"Warring States era"`)

**Industry parallels:**
- Duolingo Stories has "Duolingo World" labels but does NOT label cultural origin — Pickup can differentiate here
- Rosetta Stone (2025): Adds "cultural context cards" before new units for heritage learners
- Lingopie (2026): Tags all content by country of origin; learners can filter by region

**Pickup architecture fit analysis:**

| Concern | Assessment |
|---------|-----------|
| JSON schema change | Additive: new optional field `storyOrigin: { region, people, period }` in lessons-ch*.json — backward-compatible, Zod schema just adds `.optional()` |
| Render location | LessonScene intro narration OR `ChapterIntroScene` overlay — no Phaser needed, pure DOM |
| Content cost | 1 narration line per chapter (32 chapters = 32 audio records) — low cost |
| 8-12 audience fit | ✅ Age-appropriate: "This story comes from Japan / Ghana / Malaysia" is A1-level vocabulary, high cultural value |
| Heritage learner fit | ✅ Strong: overseas Chinese children benefit from knowing Chinese classical stories (孟子/Sima Guang/Kong Rong) are "real history" not just fiction |
| Taiwan curriculum alignment | ✅ Taiwan 2019 elementary curriculum includes global cultural awareness and ASEAN awareness goals |
| Risk | Low: purely additive metadata + 1 narration line per chapter |

**Verdict: ✅ 適合 Pickup — 推薦實作**

Minimal effort, high ROI for heritage learner differentiation and Taiwan curriculum alignment.

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|-----------|--------|-----|---------|
| `storyOrigin` JSON field + 1st narration cultural label per chapter | British Council / Frontiers Edu 2025 / Rosetta Stone 2025 | ✅ Additive field, no schema break, fixes 5 P1+ violations in 1 pass | Low (JSON edit × 32 + 32 audio lines) | High — differentiates from Duolingo, aligns Taiwan curriculum, fixes A5-2/5/8 pattern | **X22 — ARCH-REC #69: A5_CULTURAL_PROVENANCE_FIELD** |

---

### Cockpit row (appended below — auto-parsed by cockpit JS):

```
ARCH-REC #69: X22_A5_CULTURAL_PROVENANCE_FIELD
Pattern: storyOrigin metadata field + opening narration cultural label
Source: British Council EFL / Frontiers Edu 2025 / Rosetta Stone cultural context cards
Pickup fit: ✅ additive JSON field + 1 narration sentence per chapter (32 total)
Effort: Low | ROI: High
Fixes: A5-2 (Ch17 Japan), A5-5 (Ch19 SE Asia), A5-8 (Ch21 Africa), A5-2-pattern (Ch20 Russia)
Audit file: docs/audits/2026-06-23T1212-content-qa-cron.md
```
