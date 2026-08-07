# Content QA — 2026-08-07 12:07 UTC

Today's angle: **#12 — explanationZh story-voice vs jargon**
Focus: **Ch20–27** (Turnip / Anansi / Mencius / Sima Guang / Kong Rong / Yugong / Archimedes / Journey to the West)

---

## A. validate-lessons.js result

```
✓ lessons-ch0.json … lessons-ch25.json — PASS
WARN lessons-ch8.json: 9 issues (X2_OPTION_LIST_BIAS, X48_NGRAM_VERBATIM_CORRECT ×2, X49_STIMULUS_REUSE ×4, X57_ANTONYM_PAIR_MIRROR)
WARN lessons-ch9.json: 8 issues (X2_OPTION_LIST_BIAS ×2, X49_STIMULUS_REUSE ×3, X57_ANTONYM_PAIR_MIRROR ×3)
Total mirror-lint issues: 440 (warn-only)
```

Build gate: **PASS** — no blocking schema errors. Pre-existing Ch8/Ch9 mirror warnings unchanged.

---

## B. Violation Table

### B1. Jargon / Metalanguage Violations

| Ch | Q ID | type | Snippet | Violation | 修法 | audio regen? |
|----|------|------|---------|-----------|------|--------------|
| 24 | kt-ch24-l4-lg2 | comprehension | "選項A說大梨太重、選項C說梨沒熟、選項D說要換點心" | **TEST-PREP LABEL** — 選項A/C/D 是考卷式標籤，完全脫離奶奶語境 | 改為故事角色語氣：「有人說梨太重、有人說梨沒熟、有人說要換點心——這些故事裡都沒提到喔！」 | No |
| 26 | kt-ch26-l4-x5 | grammar-mc | "「would have + 過去分詞」是假設語氣完成式" | **B2+ METALANGUAGE** — 假設語氣完成式、過去分詞，超出 A2 兒童認知，品牌語境完全不符 | 改為隱式 recast："大多數人都會『叫人拿布來』——would have called 就是這個意思，跟 called 一樣動作，只是想像中發生的！" | No |
| 26 | kt-ch26-l5-x5 | grammar-mc | "這是描述一種「習慣性感覺」的子句——用現在式「opens」表達一般規律" | **TEXTBOOK JARGON** — 子句、一般規律，乾燥教科書語氣 | 改為故事錨："每次難題解開的時候，你有沒有那種『心裡亮起來』的感覺？故事裡用 opens（現在式）來說這種永遠都有的感覺！" | No |
| 27 | kt-ch27-l6-x5 | grammar-mc | "「could not + 動詞原形」——「could not sit up」才是正確用法" | **PRESCRIPTIVE + GRAMMAR TERM** — 動詞原形 + 才是正確用法，教科書糾錯語氣 | 改為："受傷的人連『坐起來』都做不到——could not sit，動詞跟在 could not 後面原樣不動喔" | No |
| 27 | kt-ch27-l7-x5 | grammar-mc | "「will + 動詞原形」——「will walk」才是正確的未來式用法" | **PRESCRIPTIVE + FUTURE TENSE TERM** — 未來式用法，教科書式，無故事語境 | 改為："孫悟空說『從今天起，我要陪你走』——will walk，說未來要做的事，will 後面動詞原樣不動！故事裡這句很感動呢。" | No |
| 27 | kt-ch27-l4-ttx2 | type-translate | "friend 可以單數也可以複數" | **GRAMMAR NUMBER TERM** — 單數/複數，教科書用語（可接受但偏冷） | 微修：改為 "no friend（沒有半個朋友）——friend 一個兩個都可以這樣說，with 放最後是說話的自然方式！" | No |
| 27 | kt-ch27-l4-lg1 | type-translate | "是很好用的句型！" | **SENTENCE PATTERN TERM** — 句型 是教科書詞，偏學術 | 微修：改為 "腳痛還是繼續走，三藏真的很勇敢——kept + walking 這樣說『一直在做某件事』，記起來了嗎？" | No |

### B2. phrase-pairs 「片語」標籤（批量 / 可接受等級）

| Ch | Q ID | type | 說明 | 修法建議 |
|----|------|------|------|---------|
| 22 | kt-ch22-l2-pp1 | phrase-pairs | "這四個片語都出現在孟母三遷的故事裡" | 片語 可改為「詞組」或「組合字」。低優先 — 因為 phrase-pairs 本身就是配對練習，說明性比重高 |
| 23 | kt-ch23-l2-pp1 | phrase-pairs | 同上 | 同建議 |
| 24 | kt-ch24-l2-pp1 | phrase-pairs | 同上 | 同建議 |
| 25 | kt-ch25-l2-pp1 | phrase-pairs | 同上 | 同建議 |
| 26 | kt-ch26-l2-pp1 | phrase-pairs | 同上 | 同建議 |
| 27 | kt-ch27-l2-pp1 | phrase-pairs | 同上 | 同建議 |

> 共 6 筆。嚴格說是 P2；phrase-pairs explanation 受眾也包含家長，故「片語」可接受，但如全面改為「故事裡的詞」則更一致。

### B3. Grammar-MC 語氣對照（良好 vs. 問題）

| Ch | Q ID | 評估 | 例句 |
|----|------|------|------|
| 20 | kt-ch20-l2-gm1 | ✅ 良好 | "「拉了」要說 pulled 喔。奶奶說故事，說的都是發生過的事呢！" |
| 21 | kt-ch21-l2-gm1 | ✅ 良好 | "Anansi 已經把網織上天空了——「織了」要說 spun，不是 spin 喔！" |
| 22 | kt-ch22-l2-gm1 | ✅ 良好 | "孟母已經「搬了」家——說做過的事，move 要變成 moved 喔。" |
| 25 | kt-ch25-l2-gm1 | ✅ 良好 | "「every day」= 老爺爺天天都做的事——說一個人天天做的事，字尾要多個 s，所以用「carries」喔。" |
| 26 | kt-ch26-l4-x5 | ❌ 問題 | "「would have + 過去分詞」是假設語氣完成式" (B2+ metalanguage) |
| 26 | kt-ch26-l5-x5 | ❌ 問題 | "描述一種「習慣性感覺」的子句——用現在式「opens」表達一般規律" |
| 27 | kt-ch27-l6-x5 | ❌ 問題 | "「could not + 動詞原形」——才是正確用法" |
| 27 | kt-ch27-l7-x5 | ❌ 問題 | "「will + 動詞原形」——才是正確的未來式用法" |

Pattern: **Ch20-25 grammar-mc 語氣一致良好**；**Ch26-27 grammar-mc 出現明顯語氣斷層**，尤其在更複雜語法結構（would have / when-clauses / modal cannot）時退回教科書式解釋。

---

## C. Stats

| 指標 | 數值 |
|------|------|
| Ch20-27 explanationZh 總數 | 904 |
| grammar-mc 題數 | 21 |
| grammar-mc 良好語氣 | 17 (81%) |
| grammar-mc 問題語氣 | 4 (19%) |
| 嚴重 jargon 違規 (P0/P1) | 7 |
| 片語標籤違規 (P2) | 6 |
| 選項A/C/D 測驗標籤 | 1 (P0) |
| 語氣斷層章節 | Ch26, Ch27 |

---

## D. Top 5 P0

| # | Q ID | 違規類型 | 修法優先 |
|---|------|---------|---------|
| ⚠️ P0-1 | kt-ch24-l4-lg2 | 選項A/C/D 測驗標籤 — 完全脫離故事語境，對 8-12 兒童傳遞「這是考試」信號，破壞治癒感 | 高 |
| ⚠️ P0-2 | kt-ch26-l4-x5 | 假設語氣完成式 + 過去分詞 — B2+ 文法術語出現在 A2 兒童 ELT 內容中，認知負擔過高 | 高 |
| ⚠️ P0-3 | kt-ch26-l5-x5 | 子句 + 一般規律 — 乾燥教科書語言，無故事連接 | 中 |
| ⚠️ P0-4 | kt-ch27-l6-x5 | 動詞原形 + 才是正確用法 — 訓導式糾錯，與奶奶「溫柔陪伴」品牌完全衝突 | 高 |
| ⚠️ P0-5 | kt-ch27-l7-x5 | 動詞原形 + 未來式用法 — 同上，且說「才是正確的未來式用法」複合兩個術語 | 高 |

---

## E. Narrative Voice / Pacing Improvement (即使 0 violation 仍必提 3 條)

1. **Ch26 grammar-mc 整體 voice anchor 缺失**：Ch20-25 的 grammar-mc explanationZh 大多有「奶奶說故事」或角色行動的情境連接（"Anansi 已經把網織上天空了"），但 Ch26 的 l4-x5、l5-x5 直接跳到文法規則，沒有把阿基米德這個角色帶進解釋。建議所有 Ch26 grammar-mc 的 explanationZh 開頭加一句阿基米德情境（例："阿基米德想到大部分人會怎麼做..."）再接文法說明。

2. **Ch27 情感高點錯失**：kt-ch27-l7-x5 的句子 "From today, I will walk with you" 是孫悟空答應保護三藏的動人時刻，但 explanationZh 只有乾燥的「will + 動詞原形才是正確的未來式用法」。應該先呼應情感（「孫悟空做了承諾！」），再用 recast 自然帶出 will walk 的用法，讓孩子感受到語言和故事情感的連結。

3. **phrase-pairs explanationZh 公式化**：Ch22-27 的六個 phrase-pairs explanation 都是完全相同結構（"這四個片語都出現在 X 故事裡：🔑 A = B..."），沒有故事觸發的語境。建議至少加一句角色行動（"司馬光把石頭 pick up（撿起來）了！"）讓配對練習也有故事感，而非純詞彙清單。

---

## 🔬 Architecture Recommendation (對齊業界 2026)

**ARCH-REC #254: X64_IMPLICIT_RECAST_EXPLANATION — 以隱式 recast 取代 grammar-mc metalanguage**

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|------------|--------|-----|---------|
| Implicit recast explanation for A2 children grammar-mc (replace grammar labels with story-character contextual restatement) | Lira-Gonzalez et al. 2024 (Sage Journals): implicit WCF via recast vs. explicit metalinguistic — recast 對 10-11 歲兒童 L2 past tense 效果相當或更佳 | ✅ 適合：Pickup Ch20-27 grammar-mc 的複雜句型（would have / when-clause / modal cannot）explanationZh 目前使用 metalinguistic labels（假設語氣、動詞原形、子句、未來式）；依研究改為 recast-style（以角色行動示範正確形式 + 中文直觀說明，不用術語）對 8-12 兒童更有效且符合品牌語氣 | 低（純 JSON patch，不動 src/） | 高（品牌語氣一致性 + 學習效果） | ✅ 實作 |

### 具體實作路徑

**Phase 1: lint gate（validate-lessons.js 加規則 X64）**
```js
// X64_GRAMMAR_METALANGUAGE — grammar-mc 的 explanationZh 不允許使用文法術語
const GRAMMAR_JARGON = /假設語氣|動詞原形|過去分詞|子句|未來式|完成式|主詞|述語|時態|被動式|單數|複數|第三人稱|比較級|最高級|不定詞|分詞/;
if (q.type === 'grammar-mc' && GRAMMAR_JARGON.test(q.explanationZh)) {
  warn(`${qid}: X64_GRAMMAR_METALANGUAGE (grammar jargon in grammar-mc explanation)`);
}
```

**Phase 2: 4 個 P0 explanationZh 的 JSON patch**（直接修 lessons-ch26.json / lessons-ch27.json）

| Q ID | 修改後 explanationZh |
|------|---------------------|
| kt-ch26-l4-x5 | "阿基米德想，大多數人遇到這種事都會『叫人拿布來』——would have called，就是想像中『那時候大家會做的事』！" |
| kt-ch26-l5-x5 | "難題終於解開！你心裡有沒有那種突然亮起來的感覺？故事用 opens（現在式）——因為這種感覺每次都會有，不是只有一次喔！" |
| kt-ch27-l6-x5 | "受傷的人連坐起來都做不到——could not sit up，could not 後面直接接動作，不用改形狀喔！" |
| kt-ch27-l7-x5 | "孫悟空答應保護三藏了！『我要陪你走』——will walk，說未來要做的事，will 後面動作原樣不動。真的好感動！" |

**Phase 3: kt-ch24-l4-lg2 comprehension explanation 修改**
```
選項A/C/D → 改為故事語言：
"孔融主動拿最小的，把較好的留給哥哥們——這說明他希望『別人得到比自己更多』。有人說梨太重、有人說梨沒熟、有人說要換點心——這些故事裡都沒提到喔！"
```

**測試指令**
```bash
MIRROR_LINT_STRICT=0 node tools/validate-lessons.js 2>&1 | grep X64
```

### 研究依據

- **Lira-Gonzalez et al. 2024** (RELC Journal, Sage): "Implicit WCF (recasts) may exert influence on learners' explicit knowledge while being less cognitively taxing for young L2 learners in story-retelling contexts" — 直接支持以 recast 取代 metalinguistic feedback for ages 10-11 Chinese EFL learners
- **ELT feedback hierarchy 2026** (PolyChat/Lingopie UX research): "motivation → usability → feedback → safety" — feedback 設計應優先服務動機，metalanguage 標籤會在 A2 兒童中觸發「考試感」焦慮，破壞 motivation tier
- **Duolingo design 2026**: children's grammar feedback uses contextual demonstration ("Duo 說：...") + visual reinforcement，不使用 grammar terminology（見 Duolingo Design Blog 2025 "Tips for Young Learners"）
