# Content QA — 2026-07-23 06:08 UTC

**Today's angle:** A5 — Cultural Reference (cross-cultural origin, deity names, honorifics, provenance)
**Focus chapters:** Ch17-24 (8 stories: crane-gratitude / heungbu-nolbu / sang-kancil / enormous-turnip / anansi-spider / mencius-mother / sima-guang / kong-rong)
**Previous angles (last 8):** A7 (Ch1-8), A2 (Ch9-16), A3 (Ch25-32), #12 (Ch1-8), A4 (Ch9-16), A1 (Ch17-24), R2 (Ch25-32), A6 (Ch9-16)

---

## A. validate-lessons.js result

```
Total mirror-lint issues: 440
(warn-only; set MIRROR_LINT_STRICT=1 to fail build)
```

Build passes. No new P0 schema violations in Ch17-24. Existing Ch7-9 STIMULUS_REUSE + ANTONYM_PAIR issues tracked from prior cycles.

---

## B. A5 Cultural Reference Violation Table

### B1. P0 — Critical (cultural frame entirely absent / inconsistent gloss)

| Ch | Q ID | type | snippet | violation | 修法 | audio regen? |
|----|------|------|---------|-----------|------|-------------|
| 21 | kt-ch21-l6-x2 | listen-tf | "Nyame slowly stood up from his big chair…" | **X193_NYAME_UNGLOSSED**: explanationZh focuses on surprise-reaction, skips Nyame→天神 mapping; earlier L2 established "sky god=天神" but this question's local gloss gives no anchor | explanationZh 補: `奶奶說：天神 Nyame 緩緩站起來……天神 = 故事裡管著所有故事的大神。` | No |
| 21 | kt-ch21-l6-x4 | comprehension | "You are small, but your head is big," Nyame said with a smile." | **X193_NYAME_UNGLOSSED**: explanationZh covers only idiom ("head big = clever"), never maps Nyame | 補: `天神 Nyame 笑著說——Nyame 是阿南西故事裡管故事的天神。` | No |
| 21 | *全章* | — | — | **X194_ANANSI_ORIGIN_ABSENT**: Anansi (阿南西) is an Akan/Ashanti (West Africa 西非/加納) trickster spider. Chapter never mentions Africa, West Africa, Ghana, or Akan. Treated as generic "spider + sky god" story. Tokenistic diversity (KAHANI 2025 / Tandfonline 2025 pattern) | 在 Ch21-l1-intro narration 補: `奶奶說：今晚的故事來自遠遠的西非洲，那裡的阿坎族人最愛說蜘蛛阿南西的故事。` | Yes — re-record l1 intro MP3 |

### B2. P1 — High (cultural name / honorific / origin unexplained)

| Ch | Q ID | type | snippet | violation | 修法 | audio regen? |
|----|------|------|---------|-----------|------|-------------|
| 17 | *全章 intro* | narration | "Tonight a kind old man saves a bird in the snow." | **X195_ORIGIN_ABSENT_JP**: 日本民間故事「鶴の恩返し」origin never stated. 報恩 mentioned in ZH but Japan not identified. Heritage learners (海外台灣子女) miss cultural geography. | 在 l1-intro 補: `這是一個日本的古老故事——日文叫「鶴の恩返し」，鶴用報恩來回報救命之恩。` | Yes — l1 intro MP3 |
| 18 | *全章 intro* | narration | Heungbu/Nolbu 興夫/孬夫 names | **X195_ORIGIN_ABSENT_KR**: 韓國民間故事「흥부전」never identified as Korean. Heungbu & Nolbu are Korean names but chapter never says "Korean folk tale". | l1-intro 補: `奶奶說：今晚是一個韓國的古老故事，講兩兄弟——善良的興夫和自私的孬夫。` | Yes |
| 19 | *全章* | — | "Sang Kancil" used 12× | **X196_SANG_HONORIFIC_UNGLOSSED**: "Sang" is a Malay noble-title prefix (equivalent to 「爵士」/Sir). "Sang Kancil" = "the noble mousedeer", a SEA trickster figure equivalent to Aesop's fox. Never mentioned. Malayan cultural framing absent. | l1-intro 補: `今晚是馬來西亞的民間故事，主角「桑·甘吉爾」(Sang Kancil) 是隻聰明的小鼠鹿，馬來人最愛用他的故事教孩子：小不一定弱！` | Yes |

### B3. P2 — Medium (historical period / Chinese chengyu provenance)

| Ch | Q ID | type | snippet | violation | 修法 | audio regen? |
|----|------|------|---------|-----------|------|-------------|
| 20 | *全章 intro* | narration | "Grandpa plants a seed in his garden." | **X197_ORIGIN_ABSENT_RU**: 俄羅斯民間故事「The Enormous Turnip」origin never stated. | l1-intro 補: `奶奶說：今晚這個故事是俄羅斯的老民間故事，叫做「大蘿蔔」……` | Yes |
| 22 | kt-ch22-l7-x4 | comprehension | "People still tell of his mother who moved three times." | **X198_CHENGYU_MISSING**: 孟母三遷 IS mentioned in ch22-l1-intro (intro 有說), but comprehension explanation "為了孩子孟母三次搬家…" never tells learners this is 成語/famous 4-char proverb in Chinese culture. | explanationZh 補: `「孟母三遷」是著名成語，意思是好媽媽為了孩子的教育，不惜三次搬家。孟子後來成為中國最重要的哲學家之一。` | No |
| 23 | *全章 intro* | narration | Sima Guang (司馬光) story | **X199_HIST_PERIOD_ABSENT**: 司馬光砸缸 is a Song Dynasty (960–1279 CE) story. Period never stated, which is fine for A2 but weakens cultural coherence for heritage learners. | l1-intro 可補: `這是北宋時代(約 1000 年前)的真實小故事……` (P2 — optional) | Optional |
| 24 | *全章 intro* | narration | Kong Rong (孔融) pear story | **X200_HIST_PERIOD_ABSENT**: 孔融讓梨 is a Han Dynasty story (approx. 2nd c. CE). Same issue as Ch23. | 同上 optional add | Optional |

---

## C. Stats

| Metric | Value |
|--------|-------|
| Chapters scanned | 8 (Ch17-24) |
| Total entries scanned | ~888 (avg 111/ch) |
| P0 violations | 2 (X193 ×2 questions; X194 chapter-level) |
| P1 violations | 3 (X195 ×2 chapters + X196) |
| P2 violations | 4 (X197, X198, X199, X200) |
| Audio regen needed | 4 narration MP3 (l1-intro per Ch17, 18, 19, 21) |
| Lessons 0 false positives | Sang Kancil gloss flags (20) — auto-script over-flagged; "小鼠鹿" gloss established L1 vocab |
| Nyame gloss coverage | Inconsistent: L2 pm1 + L6 q4 glossed; L6 x2/x4 NOT glossed |
| Anansi Africa mention | 0 times in entire Ch21 (confirmed) |

---

## D. Top 5 P0 Issues

1. ⚠️ **[P0] X194 — Ch21 Anansi origin absent** (全章): West Africa / Akan never mentioned. 111-entry chapter treats Anansi as a cultureless universal spider story. Industry standard (KAHANI 2025; ELT cultural authenticity research): non-Western folklore should identify its cultural origin for both heritage learners and general learners. 修法: l1-intro narration sentence + explanationZh on "sky god" early questions.

2. ⚠️ **[P0] X193 — Ch21-l6-x2/x4 Nyame unglossed**: Same lesson as Nyame q4/q5 (which DO say 天神), but x2 and x4 explanations never map the name. Inconsistency creates confusion if learner hits x2 first in review mode. 修法: prepend "天神 Nyame——" in both explanationZh.

3. **[P1] X196 — Ch19 "Sang" honorific absent**: "Sang Kancil" appears 12× but Malay honorific and trickster-figure tradition never explained. SEA cultural frame missing for heritage-learner audience. 修法: l1-intro 1 sentence.

4. **[P1] X195 — Ch17/18 origin absent**: Japanese (鶴の恩返し) and Korean (흥부전) origins never stated. For 8-12 children + parents, identifying "this is a Japanese story / Korean story" is exactly the kind of cultural geography learning the grandma-story format should deliver.

5. **[P2] X198 — Ch22-l7 孟母三遷 not flagged as 成語**: The famous chengyu is introduced at lesson start but never called a "成語" or given its cultural prestige. Missed teaching moment for Chinese heritage learners.

---

## E. Narrative Voice / Pacing Improvements (A5 Zero-violation proposals)

Even where no strict A5 rule fires, these 3 improvements align with grandma-storytelling voice:

1. **Ch20 (Enormous Turnip)**: Every lesson in Ch20 opens with pure action ("Grandpa pulls…"). Add one grandma framing line in l1-intro: "這個故事啊，要告訴小朋友：一個人力量小，大家一起卻能做到！" — the *moral* framing is missing from the lesson intro, unlike Ch21 (which says "今晚要講蜘蛛阿南西").

2. **Ch23 (Sima Guang)**: The climax question kt-ch23-l5 (the jar-smashing moment) has lean explanationZh. Add grandmother comment: "聰明的小司馬光，比其他孩子都鎮定——奶奶說：遇到緊急情況，不要慌，動腦筋！" — reinforces the story moral in grandma voice.

3. **Ch24 (Kong Rong)**: kt-ch24-l5 covers the pear selection but the comprehension explanation for the final question (why small pear?) focuses only on logic, not Confucian virtue. Add: "「敬老愛幼」是中國傳統美德——尊重大的、謙讓小的，孔融從小就懂這個道理！" — grounds the story in Chinese virtue tradition.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

**ARCH-REC #193: X193_CULTURAL_PROVENANCE_TAG**

### Background (業界掃描)

- **KAHANI (Microsoft Research, 2025 ACM SIGCAS/SIGCHI)**: Pipeline for non-Western culturally-nuanced storytelling shows LLMs default to "Global North sensibilities." Solution: inject culturally-specific annotations (region, tradition, deity names) at story generation time. [Source](https://dl.acm.org/doi/full/10.1145/3715335.3735478)
- **Duolingo Stories (ResearchGate review)**: "cultural aspects are usually not specific to the target language or the people of the countries speaking that language." Pickup already out-performs Duolingo here with 8-culture coverage in Ch17-24 — but **origin framing is still missing**.
- **ELT Folklore research (ERIC/Tandfonline 2025)**: Children's apps achieve authentic multicultural learning only when folklore is contextualized with origin, not just story content. Surface-level diversity (diverse names, no cultural frame) = tokenism.

### Pattern: `storyOrigin` Field in Lesson Schema

**Add optional `storyOrigin` to each chapter's JSON (chapter-level, not per-question):**

```json
// In lessons-ch21.json each lesson object:
{
  "id": "kt-ch21-l1",
  "storyOrigin": {
    "region": "West Africa",
    "culture": "Akan / Ashanti (Ghana)",
    "tradition": "Spider trickster oral stories (griots)",
    "deityGloss": { "Nyame": "天神 Nyame — 阿坎族管故事的天空之神" }
  }
}
```

**Schema change (additive, zero breaking):**
```ts
// src/data/lessons.ts — add to LessonMetaSchema
storyOrigin: z.object({
  region: z.string(),
  culture: z.string(),
  tradition: z.string().optional(),
  deityGloss: z.record(z.string(), z.string()).optional(),
}).optional(),
```

**Render in `ChapterIntroScene` (narration entry):**
- On lesson 1 of each chapter: if `storyOrigin` present, prepend 1-sentence cultural frame to first narration bubble: "今晚的故事來自 {region}…"
- `deityGloss` keys auto-injected into WordHint lookup table → tapping "Nyame" shows 天神 tooltip without per-question explanationZh edits

### Pickup 架構適配

| 維度 | 評估 |
|------|------|
| Schema (Zod) | ✅ additive optional field, zero breaking |
| JSON data | ✅ add to 8 chapters (Ch17-24) → 8 JSON edits |
| Render (React) | ✅ 1 component change (`ChapterIntroScene` or `LessonPage` first-entry logic) |
| WordHint | ✅ `deityGloss` → extend `wireSentenceHints` to check local gloss table first |
| Audio regen | 🟡 optional: add 1-sentence cultural frame TTS to l1-intro MP3 per chapter |
| Effort | ~4h (schema + JSON × 8 + render + WordHint extend) |
| ROI | High: fixes X193/X194/X195/X196/X197 in one mechanism + future-proofs all new chapters |

### Cockpit Recommendation Table

| Pattern | Source URL | Pickup 適配 | Effort | ROI | Verdict |
|---------|-----------|-----------|--------|-----|---------|
| `storyOrigin` provenance field + deityGloss WordHint injection | [KAHANI 2025](https://dl.acm.org/doi/full/10.1145/3715335.3735478) + [ELT Folklore research](https://files.eric.ed.gov/fulltext/EJ1381020.pdf) | ✅ Zod optional + JSON additive + 1 component | ~4h | ⭐⭐⭐⭐ | **建議實作** — fixes 5 P1+ violations in one mechanism |

### Implementation Prompt (for cockpit 1-tap copy)

```
請拉最新 master。
實作 ARCH-REC #193 (X193_CULTURAL_PROVENANCE_TAG):

1. src/data/lessons.ts: LessonMetaSchema 加 storyOrigin optional 欄位 (region/culture/tradition/deityGloss)
2. public/lessons-ch17-21.json: 在每個 lesson object 加 storyOrigin (Ch17=日本, Ch18=韓國, Ch19=馬來西亞, Ch20=俄羅斯, Ch21=西非/阿坎族+deityGloss:{Nyame})
3. ChapterIntroScene (或 LessonPage): 第 1 節第 1 個 narration entry 若有 storyOrigin → 在說話泡泡上方顯示 1 行「📍 故事來自 {region}」badge
4. wireSentenceHints: 若 deityGloss 存在 → span[data-word=Nyame] 優先顯示 deityGloss 翻譯
5. npm run build 過 + validate-lessons.js 通過
6. commit: v2.0.B.NEXT: storyOrigin provenance tag + deityGloss WordHint (ARCH-REC #193)
```
