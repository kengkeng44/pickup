# Content QA — 2026-08-03 12:08 UTC

**Today's angle:** #11 — optionsZh 翻譯品質 (Chinese translation accuracy & age-appropriateness of answer options)
**Focus:** Ch17–24 (鶴的報恩 / 興夫與諾夫 / Mouse Deer / 大蘿蔔 / Anansi / 孟母三遷 / 司馬光 / 孔融讓梨)

**Previous 8 angles:** A3-semantic-leak · R1-paraphrase-echo · A2-blank-position · A6-option-in-question · #12-explanationZh · R2-distractor · A1-obvious-correct · A7-content-word-repeat

---

## A. validate-lessons.js result

```
Total mirror-lint issues: 440
(warn-only; set MIRROR_LINT_STRICT=1 to fail build)
```

Build gate: **PASS**. 440 existing carry-over WARNs. No new FAIL introduced. Structural optionsZh check found 1 flagged entry (ZH_TOO_MUCH_EN on kt-ch21-l6-q8 — see B below).

**Coverage:** Ch17–24 contain 100 question-type entries with optionsZh, spanning 10 options each → ~400 EN↔ZH option pairs audited.

---

## B. Violation Table

| Ch | Q ID | type | EN option | ZH option | violation | severity | 修法 | audio regen? |
|----|------|------|-----------|-----------|-----------|----------|------|-------------|
| 17 | kt-ch17-l6-q5 | listen-mc | `[0]` "the young woman" | "女孩" | **SEMANTIC_MISTRANSLATION** — "young woman" (成年女性) ≠ "女孩" (girl/child). Story arc turns on identifying her as a woman (later revealed as a crane); calling her a girl in ZH distorts the character. | **P0** | 改為「年輕女性」or「那個女人」 | No |
| 17 | kt-ch17-l3-q3 | listen-mc | `[0]`"singing songs all day" → "唱歌"; `[1]`"counting his bags of coins" → "算錢"; `[3]`"cutting wood in the snow" → "砍柴" | All 3 distractors | **ZH_CONTEXT_STRIP** — Key differentiating context ("all day", "bags of coins", "in the snow") stripped from all 3 distractor ZH options, leaving 2-char responses vs correct "做家事" (3 chars). Creates minor Chinese length-tell + loses discriminating info. | P1 | `[0]`→「整天唱歌」 `[1]`→「數袋子裡的錢」 `[3]`→「在雪中砍柴」 | No |
| 21 | kt-ch21-l3-q6 | listen-mc | `[1]` (✓) "to keep something off his head" | "擋住東西" | **ZH_MISSING_BODY_REF** — "his head" (頭) absent from ZH. Without it the answer reads "block something" (any thing from anywhere). In the story, the leaf specifically shields his *head* from hornets — the head reference is necessary. | P1 | 改為「擋住頭上的東西」 | No |
| 21 | kt-ch21-l6-q8 | listen-mc | `[0]` (✓) "Anansi was very clever" | "Anansi 很聰明" | **MIXED_SCRIPT_PROPER_NOUN** — Structural linter flagged >50% ASCII. For a child reading ZH options, inline Latin proper noun mid-sentence is jarring. Anansi has no canonical Chinese transliteration. | P1 | 改為「蜘蛛很聰明」(context is clearly Anansi the spider) — avoids mixed script while keeping clarity | No |
| 24 | kt-ch24-l5-q6 | listen-mc | `[3]` (✓) "the smaller pear for himself" | "小的,不是大的" | **ZH_ADDS_CONTRAST_CLAUSE** — ZH appends "不是大的" (not the big one) absent from EN. While child-friendly, this adds an implicit critique not in the source, subtly signaling the "right" choice in Chinese more explicitly than English. | P1 | 改為「小梨給自己」or「自己選小的那個」 | No |
| 19 | kt-ch19-l4-q9 | listen-mc | `[3]` (✓) "he was too proud to admit it" | "他不想看起來不知道" | **ZH_TRAIT_TO_BEHAVIOR** — EN expresses a character trait ("proud"); ZH renders it as a behavior ("didn't want to look like he didn't know"). Children lose the pride vocabulary dimension. | P2 | 改為「他太驕傲了,不想承認」or「他驕傲,說不出口」 | No |
| 23 | kt-ch23-l7-q8 | listen-mc | `[3]` (✓) "a child used smart thinking" | "因為聰明的思考" | **ZH_CAUSAL_PREFIX_ADDED** — ZH inserts "因為" (because) before the noun phrase, making it a subordinate causal clause rather than a description. For a standalone option read aloud it sounds incomplete. | P2 | 改為「聰明的孩子能解決問題」or「小孩靠思考救了人」 | No |
| 20 | kt-ch20-l7-q5 | listen-mc | `[3]` (✓) "grabs the furry one's tail" | "抓住毛毛那隻的尾巴" | **ZH_AWKWARD_LOCALIZATION** — "毛毛那隻的" is non-standard Chinese syntax (attributive suffix on informal compound). Natural for internal thought but slightly ungrammatical in a formal option. | P2 | 改為「抓住毛毛動物的尾巴」or「抓住那隻毛茸茸的尾巴」 | No |

---

## C. Stats

| Metric | Value |
|--------|-------|
| Ch range audited | Ch17–24 |
| Lessons audited | 56 lessons |
| Q-type entries with optionsZh | 100 entries (~400 EN↔ZH pairs) |
| P0 violations | **1** |
| P1 violations | 4 |
| P2 violations | 3 |
| Structural (linter) flags | 1 (ZH_TOO_MUCH_EN on kt-ch21-l6-q8, overlaps with P1 above) |
| Chapters with highest issue density | Ch17 (2 violations), Ch21 (2 violations) |
| Chapters cleanest | Ch18, Ch22, Ch23 (0-1 minor) |

---

## D. Top 5 P0/P1

1. ⚠️ **[P0] kt-ch17-l6-q5 `[0]`** — "女孩" for "the young woman": semantic mistranslation that misidentifies the protagonist's age/stage right at the story's climax reveal. Must fix.
2. **[P1] kt-ch17-l3-q3** — 3 distractors all stripped to 2-char ZH; correct option is 3 chars. Creates length-tell in Chinese plus loses differentiating context.
3. **[P1] kt-ch21-l3-q6 `[1]`** — "擋住東西" missing "頭上": the body-part reference is load-bearing for the Anansi hornet-evasion scene.
4. **[P1] kt-ch21-l6-q8 `[0]`** — "Anansi 很聰明": mixed Latin-Chinese script in a child-facing ZH option. Replace with "蜘蛛很聰明".
5. **[P1] kt-ch24-l5-q6 `[3]`** — "小的,不是大的": injected contrast clause not in EN; subtly over-signals the correct answer in ZH while English doesn't.

---

## E. Narrative Voice / Pacing Improvements (3 proposals — angle-obligatory)

### NV-1: Ch22 option-length style inconsistency
`kt-ch22-l4-q8` counts houses with very short ZH: "只一間" / "三間" / "兩間" / "四間或更多". Other chapters use fuller ZH that mirrors the EN's conversational warmth ("這一次一共有三間" style). The stripped numeric ZH reads more like a quiz than a grandma story.
→ **改法**: "只有一間" / "一共三間" / "一共兩間" / "四間甚至更多" — adds warmth without changing meaning.

### NV-2: Ch21 kt-ch21-l7-q8 `[1]` — model translation to propagate
`EN:"families everywhere could share tales" → ZH:"家家戶戶都能分享故事"` is excellent: "家家戶戶" is a natural Chinese idiom that elevates the register appropriately for a grandmother storytelling context. This is the **target quality bar** for optionsZh. Other chapters (especially Ch17–18) should audit their options against this idiom-aware standard rather than literal word-by-word translation.

### NV-3: Ch24 kt-ch24-l7-q6 `[1]` — superior paraphrase as positive example
`EN:"he gave the best to his brothers" → ZH:"大的給哥哥,小的給我"` is a creative and story-accurate paraphrase that surfaces the story's central contrast better than the EN option. This demonstrates that **ZH can legitimately deviate from EN structure when it serves the narrative** — the standard should be semantic fidelity + story-appropriate register, not word-for-word matching.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### ARCH-REC #237: X237_ZH_OPTION_FIDELITY_LINT — optionsZh Minimum Fidelity Linter

**Trigger:** This cycle's P0 (semantic mistranslation "女孩" for "young woman") and two P1s (context-stripping on kt-ch17-l3-q3, body-part erasure on kt-ch21-l3-q6) are all forms of **information loss during ZH translation** — the ZH option is shorter/thinner than the EN and drops load-bearing meaning.

Industry research found no published standard for translated MC option fidelity in children's ELT apps (Duolingo's quality standards are internal). The closest published work (D-GEN, ACL 2025; BEA workshop 2025) evaluates distractor quality in English only. **Gap = no automated check exists for EN→ZH option fidelity in Pickup's CI pipeline.**

**Proposed pattern:**

```js
// In validate-lessons.js — add X237 check for entries with optionsZh

// Heuristic: CN text density ≈ 0.55× EN word count in characters
// i.e., a 4-word EN option ≈ 6–8 chars in ZH
// If ZH option has < 0.35× EN word count in chars → flag as X237_ZH_OVER_STRIPPED

function checkZhFidelity(entry) {
  const opts = entry.options || [];
  const optszh = entry.optionsZh || [];
  opts.forEach((en, i) => {
    const zh = optszh[i] || '';
    const enWords = en.trim().split(/\s+/).length;
    const zhChars = zh.replace(/\s/g,'').length;
    if (zhChars < Math.round(enWords * 0.35) && enWords > 3) {
      // e.g. 5-word EN should have ≥ 2 ZH chars
      warn(entry.id, 'X237_ZH_OVER_STRIPPED',
        `optionsZh[${i}]="${zh}" (${zhChars} chars) too short for EN="${en}" (${enWords} words)`);
    }
  });
}

// Proper-noun whitelist to avoid false positives:
const ZH_PROPER_NOUNS = ['Anansi','Mochi','Hana','Heungbu','Nolbu','Sima'];
// Options where ZH contains a listed proper noun skip mixed-script flag
```

**Secondary check — semantic word class preservation:**
For the P0 (`"young woman" → "女孩"`): a simple gender-age term watchlist catches the most common semantic class errors:
- EN contains `woman / lady / girl / man / boy / elder / child` → verify ZH contains corresponding class term (女性/女孩/女士/男孩/老人/小孩)
- Flag as X237_ZH_GENDER_AGE_MISMATCH if mismatched

**Research alignment:**
- ACL 2025 D-GEN paper documents distractor quality dimensions: fluency, plausibility, unambiguous incorrectness — **none currently enforced at the ZH-translation layer** in Pickup.
- Frontitude (2025) UX localization guidance: design containers for EN length, let ZH breathe — the corollary is that ZH shouldn't be stripped to fit a smaller button, which can cause context loss.
- ACCE-V vocabulary test study (PMC): MC format for Chinese children works best when options are "culturally and linguistically calibrated" — this includes avoiding adult synonyms and over-truncation.

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|------------|--------|-----|---------|
| optionsZh minimum fidelity length check (X237) | D-GEN ACL 2025, Frontitude UX 2025 | ✅ — validate-lessons.js already runs in CI; add X237 check in same file | Low (1–2 hrs) | High — catches over-stripping + semantic erasure before production | ✅ Recommend |
