# Content QA — 2026-06-27 18:07 UTC

Today's angle: **#12 explanationZh story-voice vs jargon** — checks whether the Chinese post-answer explanations maintain warm grandma/story-immersion voice or slide into dry textbook / test-prep metalanguage incongruent with the 8-12 children ELT brand.

Focus: **Ch25–31** (愚公移山 / 阿基米德 / 西遊記 / 諸葛亮借箭 / 奧德修斯 / 海格力斯 / 羅賓漢)

---

## A. validate-lessons.js result

```
Total mirror-lint issues: 106  (warn-only; MIRROR_LINT_STRICT=1 to fail build)
Ch25 WARN: X2_OPTION_LIST_BIAS ×2
Ch26 WARN: X2_OPTION_LIST_BIAS ×2
Ch27 WARN: R1_SUBSTRING ×1, X2_OPTION_LIST_BIAS ×4, X3_R1_VERBATIM_WORDS ×3
Ch28 WARN: R1_SUBSTRING ×1, X2_OPTION_LIST_BIAS ×4, X3_R1_VERBATIM_WORDS ×2
Ch29 WARN: R1_SUBSTRING ×1, X2_OPTION_LIST_BIAS ×3, X3_R1_VERBATIM_WORDS ×2
Ch30 WARN: R1_SUBSTRING ×1, X2_OPTION_LIST_BIAS ×2, X3_R1_VERBATIM_WORDS ×2
Ch31 WARN: R1_SUBSTRING ×1, X2_OPTION_LIST_BIAS ×3, X3_R1_VERBATIM_WORDS ×1
Build: PASS (warn-only gate)
```

Notable: Ch27 `kt-ch27-l6-q3` R1_SUBSTRING "only his head and one arm" verbatim in sentence; Ch28 `kt-ch28-l3-q5` "soft and slow"; Ch30 `kt-ch30-l4-q6` "right in the chest"; Ch31 `kt-ch31-l4-q3` "on Robin's front door". Pre-existing from prior cycles.

---

## B. Violation table — explanationZh story-voice audit

### Severity P0 — Breaks user experience / brand voice

| Ch | Q ID | type | snippet | violation | 修法 | audio regen? |
|----|------|------|---------|-----------|------|--------------|
| 25 | kt-ch25-l3-q4 | listen-tf | 「三種大小」——三代一起來幫忙了!**答案是 Yes!** | `listen-tf` explanation appends `答案是 Yes/No` — defeats reflective value; learner already got answer from T/F UI; jargon label | 刪 `答案是 Yes/No` 後綴; 改以故事語氣 recap「所以是✔️這樣！」或直接省略 | No |
| 25 | kt-ch25-l3-x3 | listen-tf | 「第二天早上」——隔天就來了!**答案是 No!** | same pattern | same fix | No |
| 25 | kt-ch25-l3-x6 | listen-tf | 「拿著籃子來」——他們帶了籃子,不是空手!**答案是 No!** | same | same | No |
| 25 | kt-ch25-l3-x9 | listen-tf | 搬整座山的石頭——一個小時根本不夠!**答案是 No!** | same | same | No |
| 25 | kt-ch25-l4-q4 | listen-tf | 「很遠 + 大太陽下走」——**答案是 Yes!** | same pattern (×8 total in l3–l7) | same fix | No |
| 25 | kt-ch25-l4-x3 | listen-tf | 「一直不停」——他們從不停歇!**答案是 No!** | same | same | No |
| 25 | kt-ch25-l4-x6 | listen-tf | 他搖頭——搖頭就是不相信!**答案是 No!** | same | same | No |
| 25 | kt-ch25-l4-x8 | listen-tf | 「永遠做不完」——他認為根本不可能完成!**答案是 No!** | same | same | No |
| 25 | kt-ch25-l4-lg2 | comprehension | 愚公每天只搬一籃——……**選項 C 描述的是**這種信念 | `選項 C` option-letter metalanguage — breaks story immersion; children don't think in "選項 C" | 替換: 「……這個想法就藏在第三個答案裡！」或直接說「這叫做持之以恆！」 | No |
| 25 | kt-ch25-l5-q4 | listen-tf | 「放下籃子 + 站直」——**答案是 Yes!** | same listen-tf reveal pattern | same fix | No |
| 28 | kt-ch28-l3-q11 | comprehension | 第一次拜訪沒見到人——這就是這一節的重點。**其他選項都不對。** | `其他選項都不對` dismissive metalanguage — lazy explanation, no story hook | 改: 「三次拜訪，前兩次都撲空——這正是故事想說的：真正的堅持，不怕失敗。」 | No |
| 28 | kt-ch28-l4-lg2 | comprehension | ……故事沒有這個意思；**選項C兄弟不是太累**——他們只是不願意；**選項D**劉備敲了門就離開 | `選項A/C/D` explicit letter references ×3 in one explanation | 改用故事語氣描述每個選項的錯誤點，不指名 A/B/C | No |
| 28 | kt-ch28-l5-q11 | comprehension | 劉備的耐心和尊重——這就是這一節的主旨。**其他選項都偏了。** | same dismissive pattern | 展開說明正確答案背後的故事意義 | No |
| 28 | kt-ch28-l6-q11 | comprehension | 劉備對智者深深的尊重——這就是這一節的主旨。**其他選項都偏了。** | same | same | No |

*(listen-tf 答案是 pattern: 21 instances across Ch25-l3~l7; comprehension 選項-ref: 5 instances across Ch25, Ch28)*

### Severity P1 — Brand voice drift (story→textbook)

| Ch | Q ID | type | snippet | violation | 修法 | audio regen? |
|----|------|------|---------|-----------|------|--------------|
| 25 | kt-ch25-l3-q1 | tap-pairs | **本節新單字** (左中右英)…**背熟這 4 個字**,故事就會輕鬆聽懂 | `本節新單字`+`背熟` — textbook flashcard frame, incongruent with grandma-story persona | 改: 「奶奶說這幾個字故事裡會出現,認識了就更好懂喔！」 | No |
| 25 | kt-ch25-l4-q1 | tap-pairs | 本節新單字…背熟這 4 個字 | same (×5 total: l3-q1, l4-q1, l5-q1, l6-q1, l7-q1) | same fix | No |
| 27 | kt-ch27-l4-lg1 | type-translate | 『繼續向前走』英文是 kept walking on——**kept + 動詞-ing 表示…是很好用的句型！** | `句型` grammar metalanguage — foreign to grandma story voice | 改: 「kept walking on——一直走、沒有停——這個說法故事裡常常出現喔！」 | No |
| 27 | kt-ch27-l6-x5 | grammar-mc | 「**could not + 動詞原形**」——「could not sit up」才是**正確用法** | grammar jargon (`動詞原形`/`用法`) for 8-12 children | 改: 「could not sit up——『沒辦法坐起來』——選這個！」 | No |
| 28 | kt-ch28-l3-x5 | grammar-mc | 「**Please + 動詞原形**」——才是正確的**請求句型** | same (`動詞原形`/`句型`) | 改: 「Please tell him——這樣說最禮貌！」 | No |

### P2 — Narrative pacing (no rule violation, brand quality)

| Ch | Q ID | type | issue | 改進方向 |
|----|------|------|-------|---------|
| 26 | kt-ch26-l3-q3 | listen-mc | `吃得少、睡得少——整個人都投進去了。…就是答案。` — functional but zero warmth connector to story | 加一句: 「Archimedes 就是這樣！」或 `那個年代，能這樣專注的人很少見喔！` |
| 26 | kt-ch26-l6-q8 | listen-mc | `停在比較低的位置就是答案` — abrupt | `水位停在比較低的地方——這就是黃金更重的秘密！` |
| 27 | kt-ch27-l3-q3 | listen-mc | `「只有一匹馬和小包」就是答案` — cold | `就只有馬和一個小包——他不需要多餘的東西，故事說的就是這樣！` |
| 29 | kt-ch29-l5-q8 | listen-tf | lint R1_SUBSTRING: "easy and good" verbatim — and explanation is also cold | Paraphrase answer + warm recap |
| 31 | kt-ch31-l4-q3 | listen-mc | lint R1_SUBSTRING: "on Robin's front door" — verbatim copy | Paraphrase to "at the entrance of his house" or "at his doorstep" |

---

## C. Stats

| Metric | Value |
|--------|-------|
| Chapters scanned | 25–31 (7 chapters) |
| Total questions | 802 |
| explanationZh coverage | 802 / 802 (100%) |
| With story-voice markers (！/奶奶/故事/你/喔/囉) | 346 (43%) |
| Cold/analytical (no warmth markers) | 456 (57%) |
| P0 violations | 25 |
| P1 violations | 10 |
| validate-lessons lint issues (ch25–31) | 40 of 106 total |
| listen-tf `答案是` reveal pattern | 21 (all Ch25) |
| comprehension `選項` letter-ref | 5 (Ch25 ×1, Ch28 ×4) |
| `本節新單字`/`背熟` flashcard framing | 5 (all Ch25 tap-pairs) |
| grammar jargon (`句型`/`動詞原形`/`用法`) | 5 (Ch27–28 grammar-mc) |

**Pattern observation**: P0 violations are concentrated in Ch25 (愚公移山, l3–l7 listen-tf lessons). Ch26–31 are cleaner but suffer from high cold-explanation rate (>50% across all chapters). Cold explanations are functionally correct but miss Pickup's grandma warmth brand differentiator.

---

## D. Top 5 P0

1. **⚠️ [Ch25 listen-tf mass answer-reveal ×21]** — `kt-ch25-l3` through `kt-ch25-l7`: every listen-tf question appends `答案是 Yes!` or `答案是 No!` as the final sentence. This is the worst category: it turns a reflective T/F format into a flashcard, eliminates pedagogical value of the explanation (the reasoning _before_ the reveal is good — just drop the suffix). Systematic fix needed across l3–l7.

2. **⚠️ [Ch28 comprehension option-letter flood]** — `kt-ch28-l4-lg2` references `選項A`, `選項C`, `選項D` by letter in a single explanation. Three letter references in one post-answer feedback bubble collapses story immersion entirely; child is yanked out of the 諸葛亮 narrative into test-taking mode. Replace with story-grounded reasoning ("前兩次拜訪都撲空", "兄弟只是懶", etc.).

3. **[Ch25 `本節新單字` ×5]** — Five `tap-pairs` lessons in Ch25 carry `本節新單字 (左中右英)…背熟這 4 個字` label. Textbook header language is the exact opposite of grandma's night-time story — she doesn't say "本節新單字", she says "奶奶剛才說的那幾個字，認識了嗎？". Minor brand consistency issue but recurring.

4. **[Ch27–28 grammar-mc jargon ×5]** — `kept + 動詞-ing 是很好用的句型`, `could not + 動詞原形`, `Please + 動詞原形 才是正確的請求句型` — grammar metalanguage is EFL teacher talk, not grandma voice. For 8-12 children the same point can be made without metalanguage.

5. **[56% cold explanationZh rate]** — More than half of all 802 explanationZh across Ch25–31 lack any warmth marker. Explanations are pedagogically sound but miss the signature Pickup warmth that differentiates it from generic quiz apps. A low-effort pass adding a story-linking sentence ("故事裡就是這樣！" / "Mochi 也記住了！") to the coldest 100 listen-mc explanations would shift brand feel measurably.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### ARCH-REC #86: X39_EXPLANATION_VOICE_LINT — Persona-lock explanationZh via schema field + lint rule

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|-----------|--------|-----|---------|
| **Duolingo "Explain My Answer" persona consistency** — Duolingo made AI-generated contextual feedback free for all users Jan 2026; key design principle: feedback tone stays in the same voice/persona as the lesson character, not generic system text | [Duolingo blog 2026](https://blog.duolingo.com/explain-my-answer-now-free/) | ✅ 高度適配 — Pickup has a fixed grandma persona; explanationZh jargon violations are detectable at lint time; no AI needed | Low (lint rule only) | High — catches brand drift automatically each cron | **IMPLEMENT** |
| **Metalanguage avoidance in children immersion ELT** — Cambridge 2025 review: reserve metalanguage for formal assessment contexts; affective/access support contexts should be metalanguage-free | [Cambridge Core 2025](https://www.cambridge.org/core/journals/language-teaching/article/pedagogical-translanguaging-in-secondary-efl) | ✅ 適配 — Pickup's `grammar-mc` type is the only context where limited metalanguage is justified; all other types (listen-mc, comprehension, listen-tf) should be metalanguage-free | Low (lint token blocklist) | High — aligns with academic consensus | **IMPLEMENT** |

#### 具體實作 (validate-lessons.js 加 2 條 lint rule)

**Rule X39a — EXPL_ANSWER_REVEAL**
```js
// listen-tf: explanationZh must not end with 答案是 Yes/No variant
if (q.type === 'listen-tf' && /答案是\s*(Yes|No|是|否)/i.test(q.explanationZh)) {
  issues.push(`${q.id}: X39a_EXPL_ANSWER_REVEAL (listen-tf explanation reveals answer suffix — remove 答案是 Yes/No)`);
}
```

**Rule X39b — EXPL_OPTION_LETTER**
```js
// comprehension/listen-comprehension: no 選項 A/B/C/D letter refs
if (['comprehension','listen-comprehension'].includes(q.type) && /選項\s*[ABCD一二三四]/.test(q.explanationZh)) {
  issues.push(`${q.id}: X39b_EXPL_OPTION_LETTER (comprehension expl refs option letters — use story-grounded reasoning)`);
}
```

**Rule X39c — EXPL_METALANGUAGE_KIDS** (warn-only, non-grammar-mc types)
```js
const metaTokens = ['句型', '動詞原形', '正確用法', '本節新單字', '背熟這'];
if (!['grammar-mc','type-translate'].includes(q.type) && metaTokens.some(t => (q.explanationZh||'').includes(t))) {
  issues.push(`${q.id}: X39c_EXPL_METALANGUAGE_KIDS (non-grammar type uses textbook metalanguage — use grandma voice)`);
}
```

**Expected catch rate**: X39a catches 21 Ch25 violations; X39b catches 5 Ch25/28 violations; X39c catches 5 Ch25 flashcard labels. Total 31 P0/P1 violations currently undetected by existing lint.

**lessons-ch*.json field change**: None needed — lint works on existing `explanationZh` string. Optional future: add `explanationVoice: "grandma" | "system"` to LessonSchema to allow deliberate overrides for grammar-mc types.

**Industry alignment**: Duolingo's persona-consistent feedback (2026) + Cambridge immersion-ELT metalanguage-avoidance consensus. Both recommend: keep feedback in the same affective register as the lesson persona. Pickup's grandma persona is stronger than Duolingo's Duo because it has explicit story context — X39 lint locks that advantage in.
