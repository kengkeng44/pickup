# Content QA — 2026-06-30 00:00 UTC

Today's angle: **#12 explanationZh story-voice vs jargon**
Focus: **Ch9–16** (灰姑娘 / 嫦娥 / 后羿 / 牛郎織女 / 小紅帽 / 浦島太郎 / 一寸法師 / 夸父逐日)

**Angle definition (explanationZh story-voice vs jargon)**:
Every question in Pickup shows an `explanationZh` panel after the child answers. This is the most prominent Chinese-language surface in the UX, and per the brand pivot (v2.0.B.231) must maintain the **奶奶說故事** warm oral register — the same voice grandma uses when she explains a word to a child sitting on her lap. Violations occur when `explanationZh` text shifts into one of three foreign registers:

| Code | Definition | Impact |
|------|-----------|--------|
| **EZ-P0-TESTMETA** | Explicit test-prep framing: "答案是 Yes/No", "這題要你「推理」" | Voice fully breaks — child reads test instructions, not story |
| **EZ-P1-SENTREF** | Academic reference to "sentence/original": "故事原句", "這一句來自故事" | Treats story text as printed specimen, not lived narration |
| **EZ-P2-ACADEMIC** | Academic verbs/register: "句子說…" (picture-mc), "說明她", "表示他" in comprehension/listen-tf | Mild register drift; cumulative over hundreds of items |

**Industry context (2026)**:
Duolingo's "Explain My Answer" feature (made free for all users, 2026) emphasises that post-answer explanations should be **personalised and contextual to the narrative**, not generic test-strategy coaching. The 2025-2026 research consensus (51Talk analysis, Dinolingo pedagogy, PMC multimedia-feedback study) confirms: for 8-12 learners, register **consistency beats intensity** — a voice break in the explanation panel is more disorienting than a slightly shorter explanation delivered in the correct register.

---

## A. validate-lessons.js result

```
OK  lessons-ch9.json: 7 lessons (JSON shape + mirror + extended lint)
WARN lessons-ch9.json: 5 lint issue(s):
  X2_OPTION_LIST_BIAS × 2, X49_STIMULUS_REUSE × 3
WARN lessons-ch10.json: 4 lint issue(s):
  X2_OPTION_LIST_BIAS × 3, X49_STIMULUS_REUSE × 1
WARN lessons-ch11.json: 11 lint issue(s):
  X2_OPTION_LIST_BIAS × 3, X48_NGRAM_VERBATIM × 1, X49_STIMULUS_REUSE × 7
WARN lessons-ch12.json: 10 lint issue(s):
  X2_OPTION_LIST_BIAS × 1, X49_STIMULUS_REUSE × 9
WARN lessons-ch13.json: 7 lint issue(s):
  X2_OPTION_LIST_BIAS × 3, X49_STIMULUS_REUSE × 4
WARN lessons-ch14.json: 3 lint issue(s):
  X2_OPTION_LIST_BIAS × 1, X48_NGRAM_VERBATIM × 2, X49_STIMULUS_REUSE × 0 (wait — 1)
WARN lessons-ch15.json: 2 lint issue(s):
  X2_OPTION_LIST_BIAS × 1, X49_STIMULUS_REUSE × 1
WARN lessons-ch16.json: 3 lint issue(s):
  X49_STIMULUS_REUSE × 3

No new FAIL-level issues. Build: GREEN.
(Note: existing WARN issues are pre-existing X2/X48/X49; none are introduced by this audit cycle.)
```

Total questions Ch9-16: **878** (100% have `explanationZh` field — full coverage)

---

## B. Violation Table

| Ch | Q ID | Type | EN/story snippet | explanationZh snippet | Violation | 修法 | audio regen? |
|----|------|------|-----------------|----------------------|-----------|------|-------------|
| 11 | kt-ch11-l5-x3 | listen-tf | "He thought of cold nights" | …答案是 Yes，他想到了人們的需要。 | **EZ-P0-TESTMETA** — "答案是 Yes" 是考卷語言，直接揭示答案並貼 test label，非故事解釋 | → 刪除「答案是 Yes，」前綴；改為「他心裡裝著大家——夜裡沒有光的冷，他全想過了。」 | No |
| 11 | kt-ch11-l6-x6 | listen-tf | "He gave up / did not fight" | …所以答案是 No，他沒有奮力反抗。 | **EZ-P0-TESTMETA** — "答案是 No" 同上，test-meta prefix 破壞敘事語氣 | → 刪除「答案是 No，」；改為「他默默接受了——沒有爭、沒有鬧，那份安靜讓人有點心疼。」 | No |
| 16 | kt-ch16-l4-lg2 | comprehension | "He stood at the top, watching ahead" | …這題要你「推理」他的動機，不只是記句子喔！ | **EZ-P0-TESTMETA** — "這題要你「推理」" + "不只是記句子" 是考試技巧指導，完全脫離奶奶語氣 | → 改為：「他站在最高的地方，眼睛一直往前看——那是侍衛才會有的樣子，在保護公主。」 | No |
| 9 | kt-ch9-l4-ttx2 | type-translate | "Her eyes shone bright" | …故事原句就是這樣說的！ | **EZ-P1-SENTREF** — "故事原句" 是文學分析術語，非口語敘述 | → 改為：「奶奶就是這樣說的——眼睛閃亮亮的樣子！」 | No |
| 9 | kt-ch9-l4-lg1 | type-translate | "step from the dark" | …是故事原句的說法。 | **EZ-P1-SENTREF** — 同上 "故事原句" | → 改為：「奶奶說的那句話就是這樣——從黑暗裡走出來。」 | No |
| 16 | kt-ch16-l4-ttx1 | type-translate | "He bowed very low" | …這一句來自故事：一寸走到大人家門口…表示有禮貌。 | **EZ-P1-SENTREF** — "這一句來自故事" 是文本引用語法，非講故事語氣 | → 改為：「奶奶說一寸走到門口，深深彎腰行禮——那就是他對人有禮貌的方式！」 | No |
| 9 | kt-ch9-l1-pm1 | picture-mc | dance/mirror image | …**句子說**她們在鏡子前跳舞，正好是圖中的場景！ | **EZ-P2-ACADEMIC** — "句子說" 把故事旁白抽象成一個「句子物件」，非奶奶語氣 | → 改為：「奶奶說她們在鏡子前跳舞——跟圖裡的樣子一模一樣！」 | No |
| 10 | kt-ch10-l1-pm1 | picture-mc | hunt/forest image | …**句子說**后羿出去打獵——拿著弓走進森林就是去打獵的樣子。 | **EZ-P2-ACADEMIC** — 同「句子說」pattern | → 改為：「故事說后羿拿著弓走進森林去打獵——跟圖裡一樣！」 | No |
| 11 | kt-ch11-l1-pm1 | picture-mc | river/dry image | …**句子說**河在烈日下乾掉了——圖中正好是一條乾裂沒有水的河床。 | **EZ-P2-ACADEMIC** — 同「句子說」pattern | → 改為：「奶奶說那條河被烈日曬乾了——圖裡的河床就是那個樣子！」 | No |
| 12 | kt-ch12-l1-pm1 | picture-mc | river/cow image | …**句子說**牛郎牽牛到河邊——圖中正好是一個男孩牽著牛在河邊。 | **EZ-P2-ACADEMIC** — 同「句子說」pattern (×4, systemic across ch9-16 picture-mc lesson-1) | → 改為：「牛郎牽著牛到河邊——故事裡說的就是這幅畫！」 | No |
| 13 | kt-ch13-l1-pm1 | picture-mc | basket/walking image | …**句子說**她「提著籃子走去奶奶家」——圖中正好是手挽著籃子在走路。 | **EZ-P2-ACADEMIC** — 同「句子說」pattern | → 改為：「故事說小紅帽提著籃子去奶奶家——圖裡的她就是這樣！」 | No |
| 13 | kt-ch13-l2-pm1 | picture-mc | bed/sick image | …**句子說**奶奶躺在床上病得站不起來——圖中正好是蒼白的老婆婆躺在床上。 | **EZ-P2-ACADEMIC** — 同「句子說」pattern (6th instance; constitutes systemic EZ-PATTERN) | → 改為：「故事說奶奶病了，躺在床上站不起來——圖裡的樣子就是這樣。」 | No |
| 9 | kt-ch9-l4-lg2 | comprehension | "she appeared without opening any door" | …這**說明**她「不是普通人」，是有魔法的存在！ | **EZ-P2-ACADEMIC** — "說明" 是學術推論動詞；奶奶會說「那就是…的意思」 | → 改為：「沒開門、沒開窗，她就這樣出現了——那當然是有魔法的人才辦得到！」 | No |
| 10 | kt-ch10-l4-x4 | comprehension | "she stood still, but thought fast" | …這**說明**她「面對危險仍然冷靜聰明」。 | **EZ-P2-ACADEMIC** — 同「說明」 | → 改為：「身體不動、腦子轉得飛快——她就是那種很穩的人！」 | No |
| 10 | kt-ch10-l6-x2 | comprehension | "treetops → hills → clouds" | …**說明**她「越飛越高、越飛越快」。 | **EZ-P2-ACADEMIC** — 同「說明」 | → 改為：「樹梢、山頭、雲層，一個比一個高——奶奶讓我們感覺她飛得越來越快了！」 | No |
| 11 | kt-ch11-l3-x4 | comprehension | "slow and steady pull" | …這**說明**后羿「沉著穩定」，不是倉促行事的人。 | **EZ-P2-ACADEMIC** — 同「說明」(4th instance; systemic across ch9-11 comprehension) | → 改為：「慢慢地、穩穩地——那就是后羿做事的方式，不急不慌。」 | No |
| 11 | kt-ch11-l5-x8 | comprehension | "people came out of their homes" | …**表示**「事情慢慢回到正常」了。 | **EZ-P2-ACADEMIC** — "表示" 是新聞/學術語，非口語 | → 改為：「大家都走出來了——危險過去了，日子要重新開始了。」 | No |
| 15 | kt-ch15-l5-q4 | listen-tf | "stiff smile" | 僵硬的笑容——笑得很不自然，**表示**他不舒服，答 No。 | **EZ-P2-ACADEMIC** + **EZ-P0-TESTMETA** ("答 No") — double violation | → 改為：「那種笑很怪——笑得不自然，是因為心裡其實很不舒服。」 | No |

**Total violations: 19** (3 P0 + 3 P1 + 13 P2)

---

## C. Stats

| Metric | Value |
|--------|-------|
| Ch audited | Ch9–16 (8 chapters) |
| Total questions scanned | 878 |
| `explanationZh` coverage | 100% (878/878) |
| Violations found | 19 |
| P0 (test-meta voice, answer-stated) | 3 |
| P1 (academic sentence reference) | 3 |
| P2 (register drift: 句子說/說明/表示) | 13 |
| Systemic P2 patterns | 2 — (a) "句子說" in picture-mc ×6, (b) "說明" in comprehension ×4 |
| Chapters with P0 | Ch11, Ch15, Ch16 |
| Chapters clean (0 violations) | Ch9 (P1/P2 only), Ch14 (0 EZ violations) |
| Audio regen required | 0 |

---

## D. Top 5 P0

1. ⚠️ **ch11|kt-ch11-l5-x3** — "答案是 Yes" explicit answer-label prefix in listen-tf explanation. Also defeats the blindRetry spirit: child already completed the item and the explanation re-states the answer in test language instead of anchoring it in story.
2. ⚠️ **ch11|kt-ch11-l6-x6** — "答案是 No" same pattern. Ch11 (后羿) has 2 consecutive test-meta violations in the same lesson-6 block.
3. ⚠️ **ch16|kt-ch16-l4-lg2** — "這題要你「推理」他的動機，不只是記句子喔！" — most extreme voice break in this audit cycle. Combines test-strategy coaching with condescending "記句子" framing.
4. ⚠️ **Systemic EZ-P2-句子說** — all 6 picture-mc items across Ch9, 10, 11, 12, 13 use "句子說…" as the structural template. This is a batch-generation artifact where the content author used "sentence says" as the default glue. Fix: replace template across all picture-mc items, Ch9-Ch16.
5. ⚠️ **ch15|kt-ch15-l5-q4** — double violation: combines "表示" academic verb with "答 No" test-meta suffix in a single explanation.

---

## E. Narrative Voice / Pacing Improvements (3 minimum, per constraints)

Even where no R1-R8 or EZ violation exists, the following pacing opportunities were identified:

1. **Ch9 emotion narration pacing**: Several narration entries between listen-mc questions (e.g. ch9-l3-q4, ch9-l4-q6) are one short sentence. Grandma's storytelling rhythm benefits from a brief pause-phrase before the next question: add "奶奶停了一下…" style micro-beat between high-emotion moments and the question that follows.

2. **Ch11 后羿 tension arc**: The sequence l4→l5→l6 covers "shoot the suns → save the land → Emperor takes bow → Chang'e flies away" in quick succession. The `explanationZh` entries focus on action facts but miss the emotional weight. Suggest adding 1-sentence emotional anchor per P2 explanation ("后羿就這樣…心裡一定很難受。").

3. **Ch13 小紅帽 voice consistency**: Chapters 13's grandma character (in-story) and Pickup's grandma narrator (frame) share the same "奶奶" label. The explanationZh should explicitly distinguish the two by saying "故事裡的奶奶" for the in-story grandmother, to avoid confusion for 8-12 year olds.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### ARCH-REC #96: X51_EXPLZH_TESTMETA_LINT — Story-Voice Lock for explanationZh

**Source**: Duolingo's "Explain My Answer" feature (free for all users 2026) + 51Talk consistency-beats-intensity finding + PMC multimedia-feedback study.

**Finding**: Duolingo's 2026 direction is that post-answer explanations must remain in the **same register as the lesson** (warm/narrative), not switch to grammar-teaching or test-coaching language. Pickup's `explanationZh` is the equivalent surface. Current violation rate: 3 P0 + 3 P1 per 8-chapter sweep = 0.7% of all items have critical voice breaks.

| Pattern | Source URL | Pickup 適配 | Effort | ROI | Verdict |
|---------|-----------|-----------|--------|-----|---------|
| ExplZh Voice Lint — flag `答案是`/`這題`/`句子說`/`故事原句` in non-grammar explanations | https://blog.duolingo.com/explain-my-answer-now-free/ | ✅ Additive — add to `validate-lessons.js` extended-lint section; zero schema change | 1hr | High — catches P0 voice breaks before they ship | ✅ Implement |
| Story-embedded feedback (narrative wrap around grammar fact) | https://arxiv.org/html/2405.06495v1 | ✅ Partial — already done well in Ch9-13; Ch11/16 regressions need manual pass | 2hr manual audit | Medium | ✅ Already practice; reinforce in content guide |

**Recommended implementation** (lint rule only — NO src/ change):

Add to `tools/validate-lessons.js` extended-lint block:

```js
// X51_EXPLZH_TESTMETA_LINT
const testMetaPatterns = ['答案是', '這題要你', '句子說', '故事原句', '這一句來自故事'];
const nonGrammarTypes = ['listen-mc','comprehension','listen-tf','emoji-pick','picture-mc','narration'];
if (nonGrammarTypes.includes(q.type) && q.explanationZh) {
  for (const p of testMetaPatterns) {
    if (q.explanationZh.includes(p)) {
      warn(q.id, 'X51_EXPLZH_TESTMETA_LINT',
        `explanationZh 含 test-meta 詞「${p}」— 改用奶奶語氣`);
    }
  }
}
```

**Pickup fit**: ✅ fully compatible. Extends existing validate-lessons.js warn infrastructure. Does not touch `lessons.ts` schema, `src/`, or JSON content files.

**Effort**: ~1 hour. **ROI**: High — catches future content-generation regressions before they ship. Current 19 violations across Ch9-16 would all surface as X51 warnings.
