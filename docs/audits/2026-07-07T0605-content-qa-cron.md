# ⚠️ Content QA — 2026-07-07 06:05 UTC

**Today's angle:** #11 — optionsZh 翻譯品質 (Chinese translation quality of answer options)
**Focus:** Ch17–Ch24 (鶴妻 / 燕子 / 鹿兒 / 大蘿蔔 / Anansi / 搬家婆婆 / 司馬光 / 孔融讓梨 — 405 questions with optionsZh, 1620 option pairs audited)

---

## A. validate-lessons.js result

```
Total mirror-lint issues: 611  (warn-only)
  Ongoing: X59_EXPLAINZH_VOICE (Ch8/Ch9 「答案是」non-story voice)
  Ch9: X49_STIMULUS_REUSE, X57_ANTONYM_PAIR_MIRROR, X2_OPTION_LIST_BIAS
Schema: PASS (no Zod parse errors)
```

Lint is warn-only; no hard build failure.

---

## B. Violation Table

| Ch | Q ID | type | options (EN) | optionsZh | violation | 修法 | audio regen? |
|----|------|------|-------------|-----------|-----------|------|-------------|
| Ch20 | kt-ch20-l2-gm1 | fill-in-blank | pull / pulls / pulling / pulled | **pull / pulls / pulling / pulled** (identical to EN) | **P0 UNTRANSLATED**: optionsZh = raw English with zero Chinese — learner gets no L1 support. Sentence: "Grandpa ___ the turnip" | 修法: 拉 (用力拉) / 拉 (第三人稱) / 正在拉 / 拉了 — 或採用故事語氣「拉」/「拉著」/「拉過」不加語法標注 | No |
| Ch23 | kt-ch23-l4-x6 | fill-in | run / ran / runs / **running** | run / ran (過去式) / **runs** / **running** (2 of 4 untranslated) | **P0 UNTRANSLATED**: zh for "runs" = `runs`, zh for "running" = `running` — no Chinese. Sentence: "Their small feet ___ fast along the path." | 修法: 跑 / 跑了 / 跑著 / 正在跑 | No |
| Ch24 | kt-ch24-l4-x8 | fill-in | take / took / takes / taking | **take** / took (過去式) / **takes** / **taking** (3 of 4 untranslated) | **P0 UNTRANSLATED**: only "took" has partial zh label; "take/takes/taking" are raw English. Sentence: "Kong Rong reached out and ___ the smallest pear." | 修法: 拿 / 拿了 / 拿 (現在) / 正拿著 — 故事語氣不加括號術語 | No |
| Ch17 | kt-ch17-l2-gm1 | grammar-mc | is / are / was / were | 是（現在式）/ **是們（複數現在）** / 是（過去式單數）/ **是們（複數過去）** | **P1 AWKWARD**: "是們" 不是自然中文詞；中文 "是" 沒有複數形，「是們」讓8-12歲學生困惑。PLUS grammar jargon `（現在式）`/`（過去式單數）` 是成人語法課用語，違反極簡兒童設計 | 修法: 是 / 是 (多人) / 是 (過去) / 都是 (過去) — 或更佳: 直接省略語法標注，用範例句佐助理解放 explanationZh | No |
| Ch18 | kt-ch18-l2-gm1 | grammar-mc | come / came / coming / comes | 來（原形）/ 來了（過去式）/ 正在來（進行式）/ 來（第三人稱現在） | **P1 JARGON**: `（原形）`, `（過去式）`, `（進行式）`, `（第三人稱現在）` 全是文法術語。Sentence: "Every spring, a swallow ___ back to Heungbu's roof." — 兒童不認識「原形」「進行式」 | 修法: 來 / 來了 / 正來 / 來（牠） — 用自然中文描述動作，不貼語法標籤 | No |
| Ch19 | kt-ch19-l2-gm1 | grammar-mc | saw / see / sees / seen | 看到了（過去式）/ 看（原形）/ 看（第三人稱現在式）/ 看過（過去分詞） | **P1 JARGON**: `（第三人稱現在式）`/`（過去分詞）` 術語。Sentence: "Mouse deer ___ a fruit tree on the other side." | 修法: 看到了 / 看 / 看（牠）/ 看過 | No |
| Ch21 | kt-ch21-l2-gm1 | grammar-mc | spin / spinning / spun / spins | 織（原形）/ 正在織 / 織了（過去式）/ 織（第三人稱） | **P1 JARGON**: `（原形）`/`（過去式）`/`（第三人稱）` 術語。PLUS: `spin` ≠ `織` here — Anansi 的故事裡 spin 是「吐絲」不是「織布」 | 修法: 吐絲 / 正吐絲 / 吐了絲 / 吐絲（牠）— 修正語義，不貼語法標籤 | No |
| Ch22 | kt-ch22-l2-gm1 | grammar-mc | move / moved / moves / moving | 搬（原形）/ 搬了（過去式）/ 搬（第三人稱現在式）/ 搬（進行式） | **P1 JARGON**: `（原形）`/`（過去式）`/`（第三人稱現在式）`/`（進行式）` 四術語全中。Sentence: "Every year the mother ___ to a new house." | 修法: 搬 / 搬了 / 搬（她）/ 在搬 | No |
| Ch23 | kt-ch23-l2-gm1 | grammar-mc | throw / throws / threw / throwing | **throw（原形）**/ **throws（第三人稱現在式）**/ **threw（過去式）**/ **throwing（進行式）** | **P1 UNTRANSLATED+JARGON**: zh = raw English + 術語括號；無中文意思。Sentence: "Sima Guang ___ the stone at the jar." | 修法: 丟 / 丟（他）/ 丟了 / 正丟 | No |
| Ch24 | kt-ch24-l2-gm1 | grammar-mc | takes / take / took / taking | 拿(現在,第三人稱)/ 拿(原形)/ 拿(過去)/ 拿(進行) | **P1 JARGON+FORMAT**: 雖有中文「拿」但括號內仍是語法術語，且格式與其他章 `（xxx）` 不一致（用半形括號）。PLUS: 此格式與同章 kt-ch24-l4-x8 的 `took (過去式)` 格式又不同 — 三套不同標注風格在同一章 | 修法: 拿（他）/ 拿 / 拿了 / 拿著 | No |
| Ch21 | kt-ch21-l5-x7 | listen-mc | anger / joy / surprise / sadness | 憤怒 / 喜悅 / 驚訝 / 悲傷 | **P2 REGISTER**: `憤怒/喜悅/悲傷` 是書面文言情感詞，8-12兒童更熟悉 `生氣/開心/難過`。Ch23 同類詞用 `生氣` (q10) 但此處用 `憤怒` — 跨章不一致 | 修法: 生氣 / 開心 / 驚訝 / 難過 | No |
| Ch21 | kt-ch21-l3-x7 | listen-mc | sleepy | 想睡 (Ch21) vs 睏 (Ch24 ep2) | **P2 INCONSISTENCY**: `sleepy` → 想睡 vs 睏 across chapters. 睏 是更口語台灣閩南語影響用字，想睡更標準 | 統一為「想睡」 | No |
| Ch20 | kt-ch20-l3-x8 | listen-mc | every time they failed | 每次失敗後放棄 | **P2 REGISTER**: `失敗` 語氣偏成人正式；兒童選項建議「每次沒成功就放棄」 | 修法: 每次沒成功就放棄 | No |

---

## C. Stats

| Metric | Count | Notes |
|--------|-------|-------|
| Option pairs audited | 1,620 | Ch17–Ch24, 405 Qs × 4 |
| **P0 UNTRANSLATED** (no Chinese at all) | 9 pairs / 3 Qs | kt-ch20-l2-gm1 (4), kt-ch23-l4-x6 (2), kt-ch23-l2-gm1 (4 EN+jargon), kt-ch24-l4-x8 (3) |
| **P1 GRAMMAR JARGON in optionsZh** | 8 gm1 Qs (32 pairs) | Systematic: every ch17–ch24 l2-gm1 lesson |
| **P1 AWKWARD CHINESE** ("是們") | 2 pairs | kt-ch17-l2-gm1 |
| **P1 SEMANTIC ERROR** (spin≠織) | 1 Q | kt-ch21-l2-gm1 |
| **P2 REGISTER** (文言情感詞) | 1 Q | kt-ch21-l5-x7 |
| **P2 CROSS-CHAPTER INCONSISTENCY** | 2 terms | anger: 憤怒 vs 生氣; sleepy: 想睡 vs 睏 |
| **P2 FORMAT INCONSISTENCY** (annotation styles) | 1 Ch | Ch24: 3 different styles in same chapter |
| Chapters with gm1 jargon (systematic) | 8/8 | ALL Ch17–Ch24 affected |

---

## D. Top 5 P0

1. **kt-ch20-l2-gm1** `pull/pulls/pulling/pulled` — 4 optionsZh are literal English repetitions; no Chinese provided. 8歲學生點選 pull 看到 "pull" → zero learning value.
2. **kt-ch23-l2-gm1** `throw/throws/threw/throwing` — optionsZh = raw English + grammar jargon; child sees "throw（原形）" and learns neither the Chinese word nor the story context.
3. **kt-ch24-l4-x8** `take/takes/taking` — 3 of 4 untranslated. Story sentence is about 孔融 taking a pear; optionsZh doesn't help child understand the verb choices.
4. **kt-ch21-l2-gm1** `spin` → `織（原形）` — semantic error: in Anansi story, spin = 吐絲 (spider web), not 織 (weave cloth). Child associates 織 with textile weaving, breaking the story world.
5. **kt-ch17-l2-gm1** `are/were` → `是們` — "是們" is not a Chinese word; Chinese 是 has no plural conjugation. Invented pseudo-Chinese harms L1 literacy.

---

## E. Narrative Voice / Pacing Improvements (non-violation)

Even with 0 hard R1-R8 violations in narrative options, the following story-voice improvements apply:

1. **gm1 option register**: All 8 grammar questions across Ch17–24 currently teach tense/form by labelling options with `（xxx式）`. Industry best practice (Duolingo, Cake, Babbel) for A2 children: drop grammar labels entirely — learner infers the form from the sentence context. The distractor function of grammar options is the cloze gap itself. Removing labels makes the question feel like *reading a story* not *filling a grammar worksheet*.

2. **Emotion word register consistency**: Standardise to child-register emotional vocabulary across all chapters:
   - `angry` → `生氣` (not `憤怒`)
   - `sad/sadness` → `難過` (not `悲傷`)
   - `joy/happy` → `開心` (not `喜悅`)
   - `surprise` → `嚇一跳` or `驚訝` (both ok; standardise to one)
   These child-register words also match Mochi's voice in answer feedback microcopy.

3. **Verb option 故事動作化**: For fill-in grammar Qs, optionsZh can reinforce story imagery instead of grammar labels. E.g., for `Sima Guang ___ the stone`:
   - ❌ `丟（原形）`/ `丟（過去式）`
   - ✅ `丟` / `丟了` / `丟（他）` / `在丟`
   This keeps the action vivid and maintains the grandmother storytelling register.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

**Research basis:**
- [Language Preferences in Multilingual EdTech, arXiv 2604.07843](https://arxiv.org/pdf/2604.07843): "flexible primary language use with secondary language support" — L1 annotations should be *natural language*, never metalinguistic labels, especially for younger learners (ages 8–12).
- [Duolingo "Explain My Answer" 2026](https://gamesbeat.com/duolingo-makes-its-ai-powered-explain-my-answer-feature-free-for-all-users-in-2026/): Duolingo's AI feedback generates answers in natural story-register text; never exposes grammar term labels in option choices themselves.
- [EAL Diaries 2025 — Supporting multilingual learners](https://ealdiaries.com/2025/04/supporting-young-multilingual-learners-in-content-based-instruction/): "Grammar teaching through implicit exposure is most effective for 8–12 learners; explicit metalanguage labels in options create cognitive overload."

| Pattern | Source URL | Pickup 適配 | Effort | ROI | Verdict |
|---------|-----------|-----------|--------|-----|---------|
| **X62_OPTIONSZH_GRAMMAR_JARGON_LINT**: CI lint that flags (a) optionsZh entries with `（[^）]*式[^）]*）` / `（[^）]*數[^）]*）` / `（[^）]*形[^）]*）` as P1 WARN, and (b) optionsZh entries that contain NO Chinese characters (`[^一-鿿]+`) but ARE >2 chars long (raw English left untranslated) as P0 ERROR | [arXiv 2604.07843](https://arxiv.org/pdf/2604.07843) + Duolingo design (implicit learning, no metalanguage in options) | ✅ 完全適合 — Pickup is JSON-driven, `tools/validate-lessons.js` already has lint infrastructure. Add 2 regex patterns: `JARGON_PAREN` and `BARE_ENGLISH`. No schema change needed. | ~1.5 hr (lint patterns + test against Ch17-24) | **High** — catches 9 P0 untranslated pairs + 32 P1 jargon pairs now; guards all future content | ✅ 推薦實作 |
| **optionsZh cross-chapter glossary** (`docs/standards/optionsZh-glossary.md`): canonical zh for ~30 recurring English emotion/state/action words. Single source of truth enforced by lint `X63_OPTIONSZH_INCONSISTENCY`. | Duolingo brand style guide approach (single canonical translation per recurring term) | ✅ 適合 — Pickup已有 catName.ts / dogName.ts 正名機制；同樣邏輯延伸到 option vocabulary | ~2 hr (compile glossary from existing Ch0–24 corpus + write lint check) | Medium — eliminates 憤怒/生氣, 想睡/睏 class of inconsistency permanently | ✅ 推薦 |
| **Haiku batch-rewrite for gm1 optionsZh**: One subagent batch rewrites all 8 gm1 optionsZh fields (Ch17–24) + 3 non-gm1 untranslated Qs, dropping grammar labels, correcting spin→吐絲, removing 是們 | Internal — same pattern as B.276 Fable distractor rewrite | ✅ 適合 — changes only optionsZh fields in lesson JSONs, no audio/schema change; Haiku 夠用 (機械替換) | ~1 hr Haiku subagent | **High** — fixes all P0+P1 violations in this audit cycle | ✅ 推薦 (after lint gate) |

**ARCH-REC #125:** `X62_OPTIONSZH_GRAMMAR_JARGON_LINT` — Add two lint patterns to `tools/validate-lessons.js`: (1) P0 ERROR: optionsZh entry has NO Chinese characters (`[^一-鿿]+`) and length > 2 chars → raw English left untranslated; (2) P1 WARN: optionsZh entry contains grammar-jargon parenthetical `（[^）]*(式|數|形|原形|分詞)[^）]*）` or `([^)]*(過去|現在|進行|原形)[^)]*)`. Then batch-fix the 9 P0 untranslated pairs (kt-ch20-l2-gm1, kt-ch23-l4-x6, kt-ch23-l2-gm1, kt-ch24-l4-x8) and 8 gm1 jargon Qs (Ch17–Ch24) with Haiku subagent using story-register rewrite prompt. Secondary: fix spin→吐絲 semantic error in kt-ch21-l2-gm1, delete 是們 in kt-ch17-l2-gm1. Effort: ~1.5 hr lint + ~1 hr batch. ROI: High — 3 P0 questions now expose raw English to Chinese-reading children with zero translation value.
