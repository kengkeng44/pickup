# Content QA — 2026-07-09 12:07 UTC

**Today's angle:** #11 — `optionsZh` 翻譯品質 (Chinese option translation quality)
**Focus:** Ch9–16 (Cinderella / 嫦娥 Chang'e / 后羿 Hou Yi / 牛郎織女 / Red Riding Hood / Urashima Taro / Emperor's New Clothes / Issun Boshi)

**Rationale:** Last 8 cycles covered R2, A4, A5, A6, A3, #12-explanationZh, A7, A1 — none targeted optionsZh quality specifically. Ch9-16 was last seen under A6/explanationZh but never under optionsZh lens. `grammar-mc` type (unique to these mid-tier chapters) introduces three incompatible optionsZh formats with at least 5 P0 orphaned-label violations and a 52% length-tell rate on imbalanced questions.

---

## A. validate-lessons.js result

```
WARN lessons-ch9.json:  8 lint issue(s)   (X49/X57 dominant)
WARN lessons-ch10.json: 9 lint issue(s)
WARN lessons-ch11.json: 16 lint issue(s)
WARN lessons-ch12.json: 12 lint issue(s)
WARN lessons-ch13.json: 12 lint issue(s)
WARN lessons-ch14.json: 10 lint issue(s)
WARN lessons-ch15.json: 9 lint issue(s)
WARN lessons-ch16.json: 10 lint issue(s)
Total mirror-lint issues: 441 (warn-only; set MIRROR_LINT_STRICT=1 to fail build)
```

Schema shape: ✅ all Ch9-16 JSON parse cleanly against LessonSchema. Zero structural failures.

---

## B. Violation table

| Ch | Q ID | type | snippet | violation | 修法 | audio regen? |
|----|------|------|---------|-----------|------|-------------|
| 14 | kt-ch14-l3-x4 | grammar-mc | optionsZh=['原形','過去式','**錯誤形**','進行式'] | **P0** Bare grammar labels only — no Chinese meaning, no English word. 8-12 child cannot understand "原形". Also: '錯誤形' applied to 'leads' is factually wrong — 'leads' IS valid English. | Replace with "帶（原形）/帶了（過去式）/帶著（進行式）/帶（第三人稱）" pattern, remove 錯誤形 | No |
| 14 | kt-ch14-l7-x4 | grammar-mc | optionsZh=['原形','過去式','第三人稱現在式','進行式'] | **P0** Bare grammar labels only — no meaning conveyed | Replace with "解開（原形）/解開了（過去式）/解著（進行式）/解開（第三人稱）" | No |
| 15 | kt-ch15-l5-x3 | grammar-mc | optionsZh=['原形','過去式','第三人稱現在式','進行式'] | **P0** Bare grammar labels only | Replace with "踏出（原形）/踏出了（過去式）/踏出著（進行式）/踏出（第三人稱）" | No |
| 16 | kt-ch16-l2-gm1 | grammar-mc | optionsZh=['第三人稱過去式','第三人稱現在式','第一人稱現在式','原形'] | **P0** Bare grammar labels only + LONGER-CORRECT: '第三人稱過去式'(7chars) is correct and longest → double-leak | Replace with "是（以前的事）/是（現在）/我是/be" or child-story format | No |
| 16 | kt-ch16-l5-x4 | grammar-mc | optionsZh=['原形','過去式','第三人稱現在式','進行式'] | **P0** Bare grammar labels only | Replace with "喊（原形）/喊了（過去式）/正在喊/喊（第三人稱）" | No |
| 13 | kt-ch13-l5-x8 | grammar-mc | optionEn[0]='to put' → optionZh='puted（不存在）' | **P1** Factually wrong: English option is 'to put' (infinitive), not 'puted'. Label 不存在 refers to 'puted' but student sees 'to put'. Conflates the distractor concept with the option text. | Fix label to "put（原形）" or remove if distractor is "to put" | No |
| 11 | kt-ch11-l4-q3 | listen-mc | optionsZh=['只射一次','邊跑邊射','**閉眼**','**一個接一個地射**'] | **P1** ZH length ratio=3.5, CORRECT=longest ('一個接一個地射'=7 vs '閉眼'=2). Length-tell leaks correct. | Compress: '一個個射' (4chars) | No |
| 15 | kt-ch15-l6-q3 | listen-mc | optionsZh=['透過彩色玻璃','**就是他真正的樣子**','閉眼','小鏡子裡'] | **P1** ZH length ratio=4.0, CORRECT=longest ('就是他真正的樣子'=8 vs '閉眼'=2). Worst-case tell. | Compress correct to '本來的樣子'(5) or expand '閉眼'→'緊閉著眼' | No |
| 13 | kt-ch13-l3-q7 | listen-mc | optionsZh=['只有她自己的名字','時間','她最愛的顏色','奶奶住哪'] | **P1** ZH length ratio=4.0, '只有她自己的名字'=8 vs '時間'=2. Correct is mid-length but extreme spread creates visual imbalance. | Rebalance: '她的名字'(4) and '奶奶家在哪'(6) | No |
| 10 | kt-ch10-l4-q7 | listen-mc | optionsZh=['太小','**別人會不安全**','手累','盒子鎖了'] | **P1** ZH length ratio=3.0, CORRECT=longest ('別人會不安全'=6 vs '太小'=2) | Compress: '不安全'(3) | No |
| 12 | kt-ch12-l7-q3 | listen-mc | optionsZh=['她太累','河水很暖','老牛叫她','**她想念自己的家人**'] | **P1** ZH length ratio=2.7, CORRECT=longest ('她想念自己的家人'=8 vs 3-4). | Compress: '想念家人'(4) | No |
| 11 | kt-ch11-l6-x2 | comprehension | optionsZh=['**被射的太陽是他的兒子**','后羿射太慢','人們沒有歡呼','弓壞了'] | **P1** ZH ratio=3.3, CORRECT=longest (10 vs 3). | Compress: '那太陽是兒子'(6) | No |
| 9 | kt-ch9-l2-gm1 | grammar-mc | optionsZh=['dances（第三人稱現在）','dance（現在原形）','dancing（現在分詞）','danced（過去式）'] | **P2** EN leak in optionsZh — English forms appear verbatim in ZH column. Acceptable if consistent (shows student what form they're choosing) but child-unfriendly jargon ('第三人稱現在'). | Consider uniform Chinese-first format: '跳了（過去式）' vs current '跳（第三人稱現在）' | No |
| 14/15/16 | multiple grammar-mc | grammar-mc | grammar labels use '第三人稱現在式', '現在分詞', '過去分詞' | **P2** Grammar metalanguage inappropriate for 8-12 children (ELT best practice: Cameron 2001 — avoid morphosyntactic terminology at primary level). Duolingo Jr avoids these terms entirely. | Replace with story-cues: '發生過的' instead of '過去式'; '一直在做的' instead of '進行式' | No |

**ZH length-tell summary:** 23 questions with ratio >2.5. **12/23 (52%) have correct option as longest** — significantly above random 25%. Worst offenders: Ch15-l6-q3 ratio=4.0, Ch13-l3-q7 ratio=4.0, Ch11-l4-q3 ratio=3.5.

---

## C. Stats

| Category | Count | Notes |
|----------|-------|-------|
| P0 — Orphaned grammar labels | 5 | Ch14×2, Ch15×1, Ch16×2 |
| P1 — Factually wrong label | 1 | Ch13-l5-x8 'puted（不存在）' |
| P1 — Length-tell (correct=longest) | 12 | 52% hit rate on imbalanced Qs |
| P2 — Grammar jargon 8-12 children | ~18 | All grammar-mc using 第三人稱/現在分詞/過去分詞 |
| P2 — EN leak in optionsZh | 62 (grammar-mc type by design) | Acceptable if consistent; flagged for uniformity |
| Total questions with optionsZh | 371 | Ch9–16 |
| Clean (no issues) | ~274 (74%) | Especially listen-mc shows good ZH quality |

---

## D. Top 5 P0

1. **[P0] Ch14 kt-ch14-l3-x4** — optionsZh=['原形','過去式','**錯誤形**','進行式']: bare labels + '錯誤形' applied to 'leads' which IS grammatically valid (present-tense 3rd person). Double violation: UX-breaking + factually incorrect.

2. **[P0] Ch16 kt-ch16-l2-gm1** — optionsZh=['第三人稱過去式','第三人稱現在式','第一人稱現在式','原形']: bare grammar metalanguage throughout. Also a length-tell: correct='第三人稱過去式'(7chars) is the longest option.

3. **[P0] Ch14 kt-ch14-l7-x4** — optionsZh=['原形','過去式','第三人稱現在式','進行式']: 8-12 child sees four abstract grammar terms with no context. Cannot make a meaningful choice.

4. **[P0] Ch15 kt-ch15-l5-x3** — Same pattern: optionsZh=['原形','過去式','第三人稱現在式','進行式']. The corresponding lesson (Emperor's New Clothes) otherwise has good optionsZh quality; this one late-lesson grammar check reverts to bare labels.

5. **[P0] Ch16 kt-ch16-l5-x4** — Same bare-label pattern for Issun Boshi story. Consistent failure mode across l5-x3/l7-x4 type questions in Ch14-16 suggests these were generated with a stripped template.

---

## E. Narrative Voice / Pacing Improvements (even without P0 violations)

1. **Ch11 listen-mc optionsZh register** — Questions about Hou Yi (后羿) use precise academic language like '熱造成的傷害' (damage from heat). For 8-12 children: '天氣太熱了' is warmer/simpler. The English options already use story voice ("damage from the heat") but the ZH translation is stiffer.

2. **Ch12 emotion optionsZh** — kt-ch12-l3-q3 correct='一點都不滿意' (not pleased at all). A child-friendly alternative: '不高興' is 5x more common in children's texts. Reserve '不滿意' for adult business contexts.

3. **Ch14 Urashima optionsZh** — kt-ch14-l7-q9 options include '變成很老的人' — more vivid child rendering: '變成老爺爺' (became a grandpa). The warm/concrete image fits the Ghibli aesthetic better.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### ARCH-REC #134: X71_OPTSzh_LENGTH_PARITY_LINT

**業界根據 (2026 Web研究結果):**
A 2025 arXiv study on option length bias (arxiv 2502.12459) found correct answers are the uniquely longest option in >55% of items vs 25% chance expectation, producing +8–20 pp accuracy gaps. K-State MCQ design guide documents the flag threshold at **>1.3× mean distractor length** — making our observed 4.0× cases "clearly indefensible". ETS 2023 item-writer revision explicitly bans correct-answer length cues. British Council TeachingEnglish and HK TESOL research confirm grammar metalanguage (過去式/進行式) is discouraged for 8-12yo — should use meaning-based descriptions. Duolingo/Babbel/Drops do NOT embed grammar labels as option text — labels are optional guidebook tips only (Duolingo Blog 2024: "Does Duolingo teach grammar?"; Portsmouth dissertation 2023).

**Pickup 現狀:**
The existing validate-lessons.js R2 lint checks English option length parity (max/min ≤ 1.25×). It does NOT check optionsZh separately. This audit found 23 questions with ZH ratio >2.5 and — critically — 12/23 (52%) have the correct option as the longest ZH string. This is a confirmed tell exploitable by test-wise 8-12 learners.

**Pickup 適配:** ✅ 完全適合
- JSON field `optionsZh` exists on every MC question (371 questions Ch9-16, ~900+ total)
- validate-lessons.js already has the R2 English lint as template
- Threshold: ZH ≤ 2.0× (looser than English 1.25× because Chinese expresses more meaning per character, but 4.0× observed in Ch13/15 is clearly excessive)

**實作方案 (additive lint, no content change):**

```js
// In validate-lessons.js, add to per-question lint block:
if (Array.isArray(q.optionsZh) && q.optionsZh.length >= 2) {
  const zhLens = q.optionsZh.map(o => (o || '').trim().length).filter(l => l > 0);
  const zhRatio = Math.max(...zhLens) / Math.min(...zhLens);
  if (zhRatio > 2.0) {
    warn(lessonId, q.id,
      `X71_OPTSzh_LENGTH_PARITY (ZH ratio=${zhRatio.toFixed(1)}×, target≤2.0): optionsZh=${JSON.stringify(q.optionsZh)}`);
  }
}
```

**Estimated violations at 2.0× threshold:** ~23 questions (Ch9-16 alone). Cross-corpus probably ~60-80. All fixable by rewriting long Chinese options to be more compact — no audio regeneration needed.

**ROI:** High — automated lint catches future regressions; current violations require content fix (no code changes to app itself).

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|------------|--------|-----|---------|
| optionsZh length parity lint (ZH ≤ 2.0×) | Duolingo Engineering Blog 2024; ETS Item Writer Guidelines 2023 | ✅ 完全適合 — additive lint, no schema change | Low (add ~8 lines to validate-lessons.js + fix ~60-80 optionsZh strings) | High — blocks 52%-correct-is-longest leak | **✅ 實作建議** |
| Child-friendly grammar cue labels (story-context vs metalanguage) | Cameron 2001 "Teaching Languages to Young Learners"; Derewianka & Jones 2016 | ✅ 適合 — replace "過去式" with "發生過的事" in grammar-mc optionsZh | Medium (content rewrite ~30 grammar-mc Qs Ch9-16) | High — aligns with 8-12 pivot audience spec | **✅ 內容建議 (P2)** |
| Bare grammar-label ban (P0 check) | ETS, universal ELT standard — options must convey meaning | ✅ 必要 — add X72_OPTSzh_BARE_LABEL lint | Low (lint) + Medium (fix 5 P0 questions) | Critical — 5 questions currently UX-breaking | **✅ P0 必做** |
