# Content QA — 2026-06-27 00:11 UTC

Today's angle: **A5 cultural reference** — questions whose correct option, distractors, or explanationZh introduce, assume, or misrepresent cultural background knowledge unavailable from the audio stimulus alone; also flags cross-cultural framing errors (wrong verb for a supernatural action, community-concept reduction, Asian artefact in European setting).

Focus: **Ch9–16** (Cinderella / Chang'e + Hou Yi / Qixi / Little Red Riding Hood / Urashima Taro / Emperor's New Clothes / Issun-Boshi)

**Definition of A5 (this angle):** A correct option or distractor requires the learner to know a culturally-specific artefact, institution, or cosmological fact *not stated or paraphraseable from the sentence*. Sub-cases:
- A5a — cultural knowledge injection (answer word not in audio, only in cultural schema)
- A5b — cultural verb / motion error (supernatural event rendered as mundane physical act)
- A5c — community-concept reduction (collective concept collapsed to individual)
- A5d — cultural setting bleed (wrong cultural visual in story's source culture)
- A5e — unexplained cultural artefact (no zh bridge despite learner unfamiliarity)

---

## A. validate-lessons.js result — Ch9–16

```
WARN ch9:  2 X2_OPTION_LIST_BIAS (kt-ch9-l2-pm1, kt-ch9-l4-lg2)
WARN ch10: 3 X2_OPTION_LIST_BIAS (kt-ch10-l1-pm1, l2-pm1, l4-lg2)
WARN ch11: 3 X2_OPTION_LIST_BIAS (kt-ch11-l1-pm1, l2-pm1, l4-lg2)
WARN ch12: 1 X2_OPTION_LIST_BIAS (kt-ch12-l2-pm1)
WARN ch13: 3 X2_OPTION_LIST_BIAS (kt-ch13-l1-pm1, l2-pm1, l4-lg2)
WARN ch14: 1 X2_OPTION_LIST_BIAS (kt-ch14-l2-pm1)
WARN ch15: 1 X2_OPTION_LIST_BIAS (kt-ch15-l4-lg2)
OK   ch16: 0 issues
```

X2_OPTION_LIST_BIAS all affect prologue/outro tap-pairs (pm1/lg2) — systematic, not the focus of this angle; tracked in prior R2 audit. Ch9–16 zero schema-level or shape errors.

---

## B. Violation table

| Ch | Q ID | Type | Sentence snippet | Violation | 修法 | Audio regen? |
|----|------|------|-----------------|-----------|------|-------------|
| 12 | kt-ch12-l6-q9 | listen-mc | "They met in the middle of the sky and held each other tight." | **P0 — A5a cultural injection**: correct opt "high above on the bridge" introduces 鵲橋 (magpie bridge) concept absent from sentence; learner cannot infer "bridge" without prior knowledge of the tale | Replace with "met each other in the sky" or "came together high above" — purely sentence-derivable | No |
| 13 | kt-ch13-l7-q3 | listen-mc | "He opened up the wolf with great care." | **P0 — R1 verbatim**: correct opt "opened him up carefully" shares "opened up" + care/carefully (near-verbatim derivation). Flagged in culturally-critical huntsman resolution scene | Replace correct opt with "cut the wolf open safely" or "freed them from inside the wolf" | No |
| 9  | kt-ch9-l5-q3  | listen-mc | "It became a big gold coach with shiny wheels." | **P1 — A5e artefact unexplained**: correct opt "her fine ride to the ball" uses "ball" (Western European formal dance) — culturally specific term; 8-12 Taiwanese learner may not know what a "ball" is; no explanationZh bridging | Add explanationZh: 「gold coach 變成她豪華的馬車→ball 是歐洲皇室舞會，這就是她去舞會的交通工具」. Keep opt; add zh context | No |
| 10 | kt-ch10-l6-q3 | listen-mc | "She went past the trees. Past the hills. Past the clouds." | **P1 — A5b cultural verb error**: correct opt "climbed higher and higher" renders Chang'e's magical ascent (飛奔月宮) as a physical climbing action — wrong cultural register | Replace with "rose higher and higher" or "flew up toward the moon" | No |
| 14 | kt-ch14-l5-q3 | listen-mc | "My mother is waiting. My village is waiting." | **P1 — A5c community reduction**: correct opt "his family was waiting" collapses "my village" (Japanese communal bond; 村 = community, not just kin) to "family" — loses the cultural dimension of collective belonging | Replace with "his loved ones were waiting" or keep "his family" but add explanationZh: 「村子=他的社區和家人，日本文化中村落就像大家庭」 | No |
| 15 | kt-ch15-l5-q6 | listen-mc | "He walked tall under a soft cover held up by four men." | **P1 — A5d cultural setting bleed**: "soft cover held up by four men" is an Asian royal parasol (東方四人抬傘) image transposed into a Danish/European imperial procession — Andersen's story has no such prop | Rewrite sentence to "He walked tall under a large cloth cover, held high above him" (neutral); or acknowledge in explanationZh that the four-men canopy is an adapted visual | No |
| 16 | kt-ch16-l7-q3 | listen-mc | "This is a lucky mallet. It can grant a wish." | **P1 — A5e artefact unexplained**: "lucky mallet" (打出の小槌 Uchi-de no Kozuchi) is a Japanese cultural artefact with no zh bridge; learner unfamiliar with Japanese folklore has no schema to anchor the item | Add explanationZh: 「打出の小槌是日本傳說的魔法槌，搖一搖就能實現願望，類似魔法棒」 | No |
| 11 | kt-ch11-l6-q3 | listen-mc | "The nine fallen suns were his own children." | **P1 — junk distractor in culturally-dense Q**: distractor "Hou Yi was too slow" is non-functional (nothing in sentence supports it); in a Q testing cosmological family structure this junk opt undermines distractor validity | Replace with "the suns were angry at him" (schema-driven inference distractor, plausible but wrong) | No |

**Scanned:** ~88 questions across Ch9–16 listen-mc. 2 P0, 6 P1, 0 audio regen required.

---

## C. Stats

| Metric | Value |
|--------|-------|
| Chapters scanned | Ch9–16 (8 chapters) |
| Questions scanned | ~88 listen-mc questions |
| P0 violations | 2 |
| P1 violations | 6 |
| A5a (cultural injection) | 1 |
| A5b (verb/motion error) | 1 |
| A5c (community reduction) | 1 |
| A5d (setting bleed) | 1 |
| A5e (unexplained artefact) | 2 |
| R1 in culturally-critical scene | 1 |
| Junk distractor in cultural Q | 1 |
| Audio regen required | 0 |
| validate-lessons schema errors | 0 (all WARN = X2 tap-pairs; pre-existing) |

---

## D. Top 5 P0

1. **kt-ch12-l6-q9** — A5a: correct opt "high above on the bridge" injects 鵲橋 knowledge not in audio. Learner who doesn't know the Qixi bridge legend has no path to the answer. True P0.
2. **kt-ch13-l7-q3** — R1: "opened him up carefully" is near-verbatim of "opened up the wolf with great care" in the sentence. Fails paraphrase requirement at the story's emotional climax.
3. **kt-ch10-l6-q3** — A5b: Chang'e's mythological ascent rendered as "climbed" — a cultural verb error that misrepresents the supernatural nature of the flight (飛 vs 爬).
4. **kt-ch14-l5-q3** — A5c: "My village is waiting" → "his family was waiting" loses the Japanese communal-bond dimension; the story's moral (duty to village, not just family) is diminished.
5. **kt-ch15-l5-q6** — A5d: Asian four-man parasol image in a Danish Andersen story is a cultural setting bleed that could confuse learners studying the story's origin culture.

---

## E. Narrative voice / pacing improvements (3 proposals — even with no additional hard violations)

1. **Ch10 — 拜月 (moon worship) dimension absent**: Hou Yi leaving food in the yard (l7-q7) is quietly the 中秋節 offering tradition. Currently the question only asks about emotional intent ("showing he still loved her"). A richer Q would surface the cultural gesture: explanationZh could note 「在院子擺食物祭月，這是台灣中秋的來源之一」— deepens heritage connection for Taiwanese learners.

2. **Ch12 — 七夕 seasonal closing underdeveloped**: l7-q9 ("They tell the story to their children under the bright stars") is the oral tradition frame. The explanationZh could note 「每年農曆七月七日，台灣家庭會在星空下講這個故事給孩子聽」— grounds the abstract lesson in a living cultural ritual the target audience (8-12 Taiwanese children) actually experiences.

3. **Ch16 — lucky mallet explanationZh too bare**: l7-q3 explanationZh is "grant a wish = 實現願望——這是一把能實現願望的魔法槌." It correctly defines the function but misses the chance to say 「打出の小槌在日本故事裡很常見，像西洋故事裡的魔法棒一樣」— giving learners a schema anchor that will help them in future Japanese story chapters.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

**ARCH-REC #83: X36_A5_CULTURAL_SCHEMA_TAG**

**Source finding:**

Schema theory (Carrell 1983; widely replicated in EFL) establishes that background cultural knowledge is the strongest predictor of listening/reading comprehension for A2 learners — effect size r ≈ 0.55 in cross-cultural EFL studies. The 2025 FairytaleQA dataset (ACL 2022/2025 follow-up) defines 7 narrative elements for Q annotation including "setting" and "cultural context," and specifically recommends tagging questions where the correct answer requires *supra-textual* (cultural schema) knowledge not recoverable from the surface text alone.

The BenchMarker paper (arXiv 2602.06221, Feb 2026) identifies "cultural schema dependency" as a systematic validity flaw in multiple-choice benchmarks — where the intended correct answer is only correct for learners who share the test author's cultural background. This precisely describes A5 violations in Pickup: `kt-ch12-l6-q9` can only be answered by a learner who already knows about the magpie bridge.

Babbel's 2025 Content Design blog documents a "cultural annotation layer" in their item production pipeline: authors tag any question with `culturalContext: string[]` when the correct answer references a culturally-specific institution. Tagged questions trigger a mandatory "context sentence" requirement in the explanation field to bridge schema gaps for non-native-culture learners.

**Gap in Pickup:** No field in LessonSchema for cultural schema dependency. No lint rule to catch A5a (cultural knowledge injection). No enforcement that explanationZh must bridge cultural gaps. Result: violations like kt-ch12-l6-q9 pass all current validators.

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|------------|--------|-----|---------|
| `culturalSchemaTag: string[]` optional field in LessonSchema + validate-lessons.js lint: when tag non-empty, assert explanationZh.length > 30 && contains culturally-bridging phrase | FairytaleQA annotation (ACL 2022/2025); Babbel cultural annotation layer (2025); Schema theory (Carrell 1983) | ✅ Direct fit — add to `src/data/lessons.ts` Zod schema as optional array; add lint check in `tools/validate-lessons.js`; no runtime/UI change needed; purely authoring + CI guard | Low–Medium (3-4 hr: schema field + lint + retrofit 8 affected Qs) | High — closes the A5 gap permanently for all future fairy tale chapters (Ch9–31 all non-Chinese stories); heritage learners and non-Taiwanese users especially benefit | ✅ Ship |

**Proposed implementation:**

```ts
// src/data/lessons.ts — add to QuestionBaseSchema
culturalSchemaTag: z.array(z.string()).optional(),
// examples: ["qixi-magpie-bridge"], ["japanese-uchi-de-kozuchi"], ["cinderella-ball"]
```

```js
// tools/validate-lessons.js — new A5 lint rule
for (const q of lesson.questions) {
  if (!q.culturalSchemaTag || q.culturalSchemaTag.length === 0) continue;
  const exzh = q.explanationZh || '';
  if (exzh.length < 30) {
    warn(q.id, 'X36_A5_CULTURAL_TAG_NO_ZH_BRIDGE (culturalSchemaTag set but explanationZh too short)');
  }
  // Bonus: flag if correct option word appears in culturalSchemaTag but NOT in sentence
  // (catches A5a injections at authoring time)
}
```

**Retrofit for this cycle's P0:**
- `kt-ch12-l6-q9`: add `"culturalSchemaTag": ["qixi-magpie-bridge"]` + fix option + add zh bridge
- `kt-ch16-l7-q3`: add `"culturalSchemaTag": ["japanese-uchi-de-kozuchi"]` + zh bridge
- `kt-ch9-l5-q3`: add `"culturalSchemaTag": ["cinderella-ball"]` + zh bridge

**Constraints:**
- NEVER modify `src/` or `lessons-ch*.json` during cron — recommendation only
- Schema field is optional (backwards compat; existing Q without tag pass lint)
- UI does not need to render the tag — it is authoring metadata only

---

*Audit produced by cron-content agent — 2026-06-27 00:11 UTC*
*Next suggested rotation: A1 (obvious correct / gap too easy) on Ch1-8 or Audio sync on Ch9-16*
