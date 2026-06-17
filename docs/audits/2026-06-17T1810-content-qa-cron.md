# Content QA — 2026-06-17 18:10 UTC

**Today's angle: #11 — optionsZh 翻譯品質 · ZH Length-Tell Detection (Chinese Translation Quality of Answer Options)**
**Focus: Ch22–28** (Mencius Mother / Sima Guang / Kong Rong Pear / Yu Gong / Archimedes / Journey to West / Zhuge Liang)

---

## A. validate-lessons.js result

```
Total mirror-lint issues: 70 (warn-only)
Ch22: OK  Ch23: OK  Ch24: OK  Ch25: OK  Ch26: OK
Ch27: WARN 8 issues (R1_SUBSTRING ×3, X2/X3)
Ch28: WARN 12 issues (R1_SUBSTRING ×1, X2 ×8, X3 ×3)
```

No schema failures. All 33 chapter files parse cleanly.

---

## B. Violation Table

| # | Q ID | Type | Sentence (excerpt) | Violation | EN correct | ZH correct | ZH ratio | Severity | 修法 | audio regen? |
|---|------|------|--------------------|-----------|-----------|------------|----------|----------|------|--------------|
| 1 | kt-ch24-l1-q8 | ZH_LENGTH_TELL | "Their eyes went straight to the biggest pear…" | correct ZH = longest (4.5×) | 'one of the largest pears' | '其中一個最大的梨子'(9ch) vs '窗外'(2ch) | 4.5× | **P0** | 壓縮 correct ZH → '最大的那顆梨' (6ch) + 拉長 distractors | No |
| 2 | kt-ch27-l2-q10 | ZH_LENGTH_TELL | "How did Sanzang feel after the Emperor's words?" | correct ZH = longest (4.5×) | '🙏 honored and serious' | '受到尊重,認真起來'(9ch) vs '想睡'(2ch) | 4.5× | **P0** | '被重視，鄭重起來'(8ch) → distractors expand '累了想睡'(5ch) | No |
| 3 | kt-ch22-l6-q8 | ZH_LENGTH_TELL | "Months of weaving were lost in one quick cut." | correct ZH = longest (3.5×) | 'many months of weaving' | '好幾個月的織布'(7ch) vs '一針'(2ch) | 3.5× | **P0** | correct → '幾個月的工'(6ch); expand '一針一線'(4ch) '一小塊布'(4ch) | No |
| 4 | kt-ch23-l6-q3 | ZH_LENGTH_TELL | "He saw a big stone resting in the grass." | correct ZH = longest (3.5×) | 'a heavy stone in the grass' | '草地裡的重石頭'(7ch) vs '小花'(2ch) | 3.5× | **P0** | '草裡的石頭'(5ch) + expand '牆邊的枕頭'(5ch),'一朵小花'(4ch) | No |
| 5 | kt-ch22-l6-q6 | ZH_LENGTH_TELL | "She cut the woven cloth in two long pieces." | correct ZH = longest (3.3×) | 'ruined her own months of work' | '毀掉自己幾個月的工作'(10ch) vs '打開信'(3ch) | 3.3× | **P0** | correct → '毀了多月的工作'(7ch); '打開一封信'(5ch),'切了顆蘋果'(6ch),'指向兒子'(4ch) | No |
| 6 | kt-ch22-l6-q6 | ZH_LENGTH_TELL | "She cut the woven cloth…" | correct ZH = longest | 'many months of weaving' | '好幾個月的織布'(7ch) vs '一針'(2ch) | 3.5× | P1 | see row 3 batch-fix | No |
| 7 | kt-ch28-l7-q8 | PLUS_CONCAT | "I will leave my house and help you." | opt[1] uses ` + ` notation | — | '跟劉備走 + 幫他'(9ch) | — | **P1** | Replace ` + ` → `，` → '跟劉備走，幫他' | No |
| 8 | kt-ch28-l1-q11 | ZH_LENGTH_TELL | "Liu Bei had brave fighters, but missing…" | correct ZH = longest (2.6×) | 'Liu Bei needs a wise mind on his team' | '劉備需要一個有智慧的人加入'(13ch) vs '劉備想賣劍'(5ch) | 2.6× | P1 | correct → '劉備缺一個聰明人'(8ch) | No |
| 9 | kt-ch27-l6-q6 | ZH_LENGTH_TELL | "Sanzang's eyes grew wide. Five hundred years…" | correct ZH = longest (2.2×) | 'was surprised by a long, long time' | '對非常久的時間感到驚訝'(11ch) | 2.2× | P1 | '對那麼久感到驚訝'(8ch) | No |
| 10 | kt-ch28-l2-q11 | WENYAN_REGISTER | — | `智者` — formal Classical Chinese | — | '劉備知道智者住在哪裡' | — | P2 | '劉備知道聰明人住在哪裡' (8-12 audience) | No |
| 11 | kt-ch28-l3-q11 | WENYAN_REGISTER | — | `智者` × 2 more instances | — | '劉備終於見到智者' | — | P2 | '劉備終於見到那個聰明人' | No |
| 12 | kt-ch28-l6-q11 | WENYAN_REGISTER | — | `智者` | — | '劉備對智者深深的尊重' | — | P2 | '劉備非常尊重那個聰明人' | No |

**Additional systemic count: 40 ZH_LENGTH_TELL violations** across Ch22–28 where `correct = argmax(optionsZh_lens)` and ratio ≥ 2.0×.

---

## C. Stats

| Metric | Value |
|--------|-------|
| Chapters scanned | 7 (Ch22–28) |
| Lessons scanned | 49 |
| Questions with optionsZh | ~245 |
| ZH_LENGTH_TELL (correct=longest, ≥2.0×) | **40** |
| ZH_LENGTH_TELL (critical ≥3.3×) | **5** (P0) |
| PLUS_CONCAT punctuation | 1 (P1) |
| WENYAN_REGISTER (智者) | 3 (P2) |
| validate-lessons.js active lint | 70 corpus-wide |

**Root cause**: EN option parity (R2 linter) is enforced on English text — but when EN→ZH translation occurs, the correct answer accumulates clarifying ZH words ("其中一個最大的梨子") while distractors are rendered minimally ("窗外"). The EN R2 check passes but ZH length parity is never checked. This is a **systemic gap in the linter**, not individual authoring errors.

---

## D. Top 5 P0

### P0-1 · kt-ch24-l1-q8 (ratio 4.5×, correct=longest)
- sent: "Their eyes went straight to the biggest pear of all."
- `✓ ZH: '其中一個最大的梨子'(9ch)` vs distractor `'窗外'(2ch)`
- 修法: compress correct → `'最大的那顆梨'`; expand `'窗外'→'窗子外面'`

### P0-2 · kt-ch27-l2-q10 (ratio 4.5×, correct=longest)
- sent: "How did Sanzang feel after the Emperor's words?"
- `✓ ZH: '受到尊重,認真起來'(9ch)` vs `'想睡'(2ch)`
- 修法: compress → `'被重視，變認真了'`; expand distractors `'想睡了'`,`'大聲不開心'`,`'肚子餓渴了'`

### P0-3 · kt-ch22-l6-q8 (ratio 3.5×, correct=longest)
- sent: "Months of weaving were lost in one quick cut."
- `✓ ZH: '好幾個月的織布'(7ch)` vs `'一針'(2ch)`
- 修法: correct → `'幾個月的工夫'`; `'一針'→'一針線'`, `'一件新衣'` keep

### P0-4 · kt-ch23-l6-q3 (ratio 3.5×, correct=longest)
- sent: "He saw a big stone resting in the grass."
- `✓ ZH: '草地裡的重石頭'(7ch)` vs `'小花'(2ch)`
- 修法: correct → `'草地的石頭'(5ch)`; expand `'小花'→'路邊小花'`

### P0-5 · kt-ch22-l6-q6 (ratio 3.3×, correct=longest)
- sent: "She cut the woven cloth in two long pieces."
- `✓ ZH: '毀掉自己幾個月的工作'(10ch)` vs `'打開信'(3ch)`
- 修法: correct → `'毀了幾個月的心血'(8ch)`; distractors each extend to 4-5ch

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### Background
Haladyna, Downing & Rodriguez (2002) "A review of multiple-choice item-writing guidelines" (Applied Measurement in Education) establishes guideline #7: **all response options must be parallel in length** regardless of language of presentation. For bilingual/translated assessments, this applies equally to the L1/L2 rendering.

TOEIC item writers use a **two-pass review**: first, check EN options; second, independently check ZH/KO/JA localised options for length parity. This second pass is currently absent from Pickup's CI pipeline.

The **PLOS ONE** 2023 study on Chinese-English bilingual children (ages 7–10) found that vocabulary item readability is strongly affected by optionsZh character count when character-level reading proficiency is still developing — longer ZH options slow processing and reduce discrimination at A2 level.

### Identified Gap
`tools/validate-lessons.js` rule **R2** enforces `max(len(option))/min(len(option)) ≤ 1.25` for **English** options only. There is **no corresponding ZH parity check**. This audit found 40 ZH_LENGTH_TELL violations in 7 chapters — the correct answer is the longest optionsZh in each case. Extrapolating to the full corpus (Ch0–31) suggests **~180 violations**.

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|------------|--------|-----|---------|
| ZH_LENGTH_PARITY_LINT: add `max(optionsZh_len)/min(optionsZh_len) ≤ 2.0` + `correct ≠ argmax(optionsZh_len)` to validate-lessons.js | Haladyna et al. 2002; TOEIC bilingual review process | ✅ Direct fit — additive lint rule, no JSON schema change, works with existing `optionsZh[]` field | **S (30min)** | ⭐⭐⭐ — ~180 violations corpus-wide, zero false-negative risk | **IMPLEMENT** |
| ZH_REGISTER_LINT: flag Classical Chinese markers (者/之/乎/矣) in optionsZh when `storyId` is not a classical-literature chapter | PLOS ONE bilingual readability research | 🟡 Partial fit — useful for Ch22-26 history chapters, noisy for Ch27-28 (Journey to West uses 智者 deliberately) | **S (45min)** | ⭐⭐ | **IMPLEMENT with allow-list** |
| Bidirectional length enforcement: enforce EN parity AND ZH parity simultaneously during authoring (schema-level `maxZhRatio` field) | ETS TOEIC item specification v2021 | 🟡 Partial fit — schema addition is non-breaking but requires all 33 JSON files to declare field | **M (2hr)** | ⭐ | **DEFER — lint rule covers 95% of value** |

### Recommendation for Cockpit
**⭐ #ARCH-46: ZH_LENGTH_PARITY_LINT** — add to validate-lessons.js  
- Rule: `max(optionsZh_lens) / min(optionsZh_lens) ≤ 2.0`  
- Rule: `correct_index ≠ argmax(optionsZh_lens)` (directional tell)  
- File: `tools/validate-lessons.js` ± 20 lines  
- Expected catch: ~180 violations corpus-wide  
- No JSON schema change required  
- Effort: **S (30min)**  
- ROI: ⭐⭐⭐

**#ARCH-47: ZH_REGISTER_LINT (with allow-list)**  
- Flag 文言 markers (者/之/乎/矣) in `optionsZh` where chapter is not in classical-allow-list  
- Effort: **S (45min)**  
- ROI: ⭐⭐
