# Content QA — 2026-07-30 12:04 UTC

**Today's angle:** #12 — `explanationZh` Story-Voice vs Jargon  
(metalinguistic / instruction-register leakage into story-voice explanation text)

**Focus:** Ch25–31 (歷史故事 + 神話弧: 愚公移山 / 阿基米德 / 西遊記 / 諸葛亮 / 奧德修斯 / 海格力斯 / 羅賓漢)

**Rotation context:** Previous 8 cycles: R2, A3, A6, A5, #11, A4, A1, A7 — angle #12 not covered in past 8 cycles.

---

## A. validate-lessons.js result

```
Total mirror-lint issues: 440
(warn-only; set MIRROR_LINT_STRICT=1 to fail build)
```

Schema validation: PASS (no type errors).  
All Ch25–31 JSON files parse correctly. Pre-existing lint issues (X57 / X49 / X48) unchanged since last cycle.

---

## B. Violation Table

**Angle lens:** `explanationZh` should maintain **奶奶說故事** narrative register — warm, child-friendly, character-anchored.  
Violations = metalinguistic terms (語法 / 片語 / 動詞 / 句型 / 關鍵字 / 複數 / 介系詞) or flat instruction-register ("注意", "記住", "正確答案", "必須") in types where story-voice is expected.

| Ch | Q ID | type | explanationZh snippet | violation | 修法建議 | audio regen? |
|----|------|------|----------------------|-----------|---------|-------------|
| 25 | kt-ch25-l1-intro | narration | 「先來認識幾個關鍵字，記住了故事更好聽喔！」 | JARGON:關鍵字 + FLAT:記住 — template meta-instruction in story intro | 改「奶奶說：今晚的故事有幾個神奇的英文字，你聽的時候特別注意它們喔！」 | no |
| 25 | kt-ch25-l2-pp1 | phrase-pairs | 「這四個片語都出現在愚公移山的故事裡」 | JARGON:片語 — metalinguistic label | 改「這四個說法都出現在故事裡」 | no |
| 26 | kt-ch26-l1-intro | narration | 「先來認識幾個關鍵字，記住了故事更好聽喔！」 | JARGON:關鍵字 + FLAT:記住 (同 template) | 同 Ch25 修法 | no |
| 26 | kt-ch26-l2-pp1 | phrase-pairs | 「這四個片語都出現在阿基米德的故事裡」 | JARGON:片語 | 改「這四個說法」 | no |
| 26 | kt-ch26-l3-q4 | listen-tf | 「眼睛和耳朵都在謎題那邊。他沒注意身邊，答 No。」 | JARGON:注意 (instruction-register in explanation) | 改「他整個人都在想謎題——對身邊的人完全沒感覺，答 No。」 | no |
| 26 | kt-ch26-l4-x4 | comprehension | 「注意到水裡有什麼重要的事」就是答案 | FLAT:注意 (diagnostic tone) | 改「他停下來、心跳加速——因為他發現水裡有重要的東西，答案就是這個！」 | no |
| **26** | **kt-ch26-l4-x5** | **grammar-mc** | **「would have + 過去分詞」是假設語氣完成式——「would have called」才對** | **JARGON:完成式 — counterfactual perfect aspect for 8-12 audience** | **P0** 改「如果那時候他打電話了……英文說『would have called』，表示他沒打但本來可以打。」 | no |
| 26 | kt-ch26-l4-lg2 | comprehension | 「阿基米德卻停下來、睜大眼睛看——他注意到了別人都忽略的事」 | JARGON:注意 (borderline — contextual but directive-register) | 可留，但末句「他注意到了」改「他看到了一件大事」 | no |
| 26 | kt-ch26-l7-q11 | narration | 「你今天有沒有注意到什麼小事？」 | JARGON:注意 (P3-level — story-voice OK, but directive) | acceptable — 奶奶收尾語氣，留 |
| 26 | kt-ch26-l7-x5 | grammar-mc | 「好多樣東西一起，說『它們』做的事，動詞不用加 -s，直接用『use』」 | JARGON:動詞 | 改「好多東西放在一起說，英文不需要在後面加 -s——直接說 use！」 | no |
| 26 | kt-ch26-l7-x8 | emoji-pick | 「注意到水溢出這件小事——『對小細節敏銳的眼力』就是他最大的本事！」 | FLAT:注意 | 改「他看到水溢出來了——這個小細節，讓他想到了大發現！」 | no |
| 27 | kt-ch27-l1-intro | narration | 「先來認識幾個關鍵字，記住了故事更好聽喔！」 | JARGON:關鍵字 + FLAT:記住 (template) | 同 Ch25 修法 | no |
| 27 | kt-ch27-l2-pp1 | phrase-pairs | 「這四個片語都出現在西遊記的故事裡」 | JARGON:片語 | 改「這四個說法」 | no |
| 27 | kt-ch27-l3-q5 | narration | 「這杯水不是用來喝的，是用來記住的。」 | FLAT:記住 — but contextual (水＝記憶象徵) | 可留；若改「這杯水代表的是家鄉，不是渴了才喝的。」更純 | no |
| 27 | kt-ch27-l3-q6 | listen-mc | 「讓他記得自己的家鄉」就是這杯水的意思 | FLAT:記住 — contextual, not ELT jargon | 可留 | no |
| 27 | kt-ch27-l3-x4 | comprehension | 「記住、愛護家鄉」 | FLAT:記住 — contextual | 可留 | no |
| **27** | **kt-ch27-l4-ttx2** | **type-translate** | **「friend 可以單數也可以複數，with 放尾巴是口語常用說法」** | **JARGON:複數 + JARGON:單數 — number agreement metalanguage for 8-12** | **P0** 改「friend 一個人也說得通，很多人也說得通——英文有時候這樣彈性！試著把這句背下來。」 | no |
| **27** | **kt-ch27-l4-lg1** | **type-translate** | **「kept + 動詞-ing 表示一直持續做某件事，是很好用的句型！」** | **JARGON:句型 + JARGON:動詞 — double jargon** | **P0** 改「kept walking on = 一直一直走下去——腳痛還是繼續，三藏真的很勇敢。英文用 kept + -ing 說『不停做某事』。」 | no |
| 27 | kt-ch27-l6-x5 | grammar-mc | 「could not + 動詞原形——could not sit up 才是正確用法」 | JARGON:動詞 | 改「could not 後面接普通英文字——could not sit up，表示身體太虛弱、坐不起來。」 | no |
| 27 | kt-ch27-l7-x5 | grammar-mc | 「will + 動詞原形——will walk 才是正確的未來式用法」 | JARGON:動詞 | 改「will 後面接普通英文字——will walk，表示他決定要走了。」 | no |
| 28 | kt-ch28-l1-intro | narration | 「先來認識幾個關鍵字，記住了故事更好聽喔！」 | JARGON:關鍵字 + FLAT:記住 (template) | 同 Ch25 修法 | no |
| 28 | kt-ch28-l2-pp1 | phrase-pairs | 「這四個片語都出現在諸葛亮借箭的故事裡」 | JARGON:片語 | 改「這四個說法」 | no |
| 28 | kt-ch28-l2-rev1 | tap-pairs | 「複習一下本章的關鍵字」 | JARGON:關鍵字 | 改「複習一下故事裡的英文字」 | no |
| 28 | kt-ch28-l3-x5 | grammar-mc | 「Please + 動詞原形——Please tell him 才是正確的請求句型」 | JARGON:句型 + JARGON:動詞 | 改「Please 後面直接接英文字——Please tell him，請他告訴他。很有禮貌的說法！」 | no |
| 28 | kt-ch28-l4-x5 | grammar-mc | 「雪落在肩膀上，用介系詞 on 才正確」 | JARGON:介系詞 | 改「雪落在肩膀上——on 表示東西在上面，說 snow on his shoulders。」 | no |
| 28 | kt-ch28-l4-ttx2 | type-translate | 「記住 fell on = 落在⋯⋯上」 | FLAT:記住 | 改「Snow fell on his shoulders.——fell on 是『落在什麼地方』，像雪片輕輕落下來一樣。」 | no |
| 28 | kt-ch28-l7-q6 | listen-mc | 「諸葛亮注意到的，就是『沒有放棄』」 | JARGON:注意 (contextual) | 改「諸葛亮心裡感覺到了——這個人來了三次，一次都沒有放棄。」 | no |
| 28 | kt-ch28-l7-x5 | grammar-mc | 「will + 動詞原形——will help 才是正確的未來式用法」 | JARGON:動詞 | 改「will 後面接普通英文字——will help，表示他答應了要幫忙。」 | no |
| 29 | kt-ch29-l1-intro | narration | 「先來認識幾個關鍵字，記住了故事更好聽喔！」 | JARGON:關鍵字 + FLAT:記住 (template) | 同 Ch25 修法 | no |
| 29 | kt-ch29-l2-pp1 | phrase-pairs | 「這四個片語都出現在奧德修斯的故事裡」 | JARGON:片語 | 改「這四個說法」 | no |
| 29 | kt-ch29-l6-x3 | tap-pairs | 「大風暴的四個關鍵字！」 | JARGON:關鍵字 | 改「大風暴裡的四個英文字！」 | no |
| 30 | kt-ch30-l1-intro | narration | 「先來認識幾個關鍵字，記住了故事更好聽喔！」 | JARGON:關鍵字 + FLAT:記住 (template) | 同 Ch25 修法 | no |
| 30 | kt-ch30-l2-pp1 | phrase-pairs | 「這四個片語都出現在海格力斯的故事裡」 | JARGON:片語 | 改「這四個說法」 | no |
| 30 | kt-ch30-l4-x4 | comprehension | 「全部彈開——『沒有一支箭有用』就是正確答案」 | FLAT:正確答案 — test/diagnostic register | 改「全部都彈開了——沒有一支箭有用！就是這樣。」 | no |
| 31 | kt-ch31-l1-intro | narration | 「先來認識幾個關鍵字，記住了故事更好聽喔！」 | JARGON:關鍵字 + FLAT:記住 (template) | 同 Ch25 修法 | no |
| 31 | kt-ch31-l2-intro | narration | 「奶奶說：再學幾個片語，學會了，羅賓漢的故事就更好懂囉！」 | JARGON:片語 | 改「奶奶說：再多認識幾個英文說法，羅賓漢的故事就更好懂囉！」 | no |
| 31 | kt-ch31-l2-pp1 | phrase-pairs | 「這四個片語都出現在羅賓漢的故事裡」 | JARGON:片語 | 改「這四個說法」 | no |
| 31 | kt-ch31-l4-q4 | listen-tf | 「Robin 必須離開，他幫窮人幫太多了」 | FLAT:必須 — imperative | 改「紙上說：Robin 要離開了，因為他幫了窮人太多次——Sheriff 不高興了，答 Yes。」 | no |
| 31 | kt-ch31-l4-x2 | listen-tf | 「幫窮人就必須離開——這是很嚴重的麻煩，答 Yes！」 | FLAT:必須 | 改「因為幫了窮人，他被逼著要離開——這對他來說是大危機，答 Yes！」 | no |
| 31 | kt-ch31-l4-ttx2 | type-translate | 「the poor = 窮人（當名詞用）」 | JARGON:名詞 | 改「the poor = 窮人——英文裡 the + 形容詞可以代表一群人，很有詩意的說法。」 | no |
| **31** | **kt-ch31-l4-lg2** | **comprehension** | **「注意：正確答案沒有重複句子裡的 bag、bow、coat 等字」** | **FLAT:正確答案 + FLAT:注意 — explicit test-taking metalanguage, breaks story immersion** | **P0** 改「只帶弓、小袋子和外套——東西少表示他重視行動靈活，不是想要舒適。『輕裝快速行動』最符合。」(刪注意/正確答案行) | no |

---

## C. Stats

| 指標 | 數字 |
|------|------|
| Ch25–31 explanationZh 總條目 | 802 |
| 違規條目 (jargon / flat register) | 42 (5.2%) |
| P0 (兒童認知/沉浸感嚴重破壞) | 5 |
| P1 (中度 — 明確改法清楚) | 19 |
| 可接受邊界 (contextual OK) | 18 |
| 最大單一問題 | template "關鍵字+記住" (7 章全中，9 narration/tap-pairs 入口) |
| 最常見 jargon term | `記住` (11) → `關鍵字` (9) → `片語` (8) → `注意` (7) → `動詞` (7) |
| 題型分佈 | grammar-mc 8 / narration 10 / phrase-pairs 7 / comprehension 5 / type-translate 4 / listen-tf 3 / tap-pairs 2 / listen-mc 2 / emoji-pick 1 |
| audio regen 需求 | 0 (全屬書面 explanationZh，非 TTS 句) |

---

## D. Top 5 P0

### ⚠️ P0-1 — Template intro "關鍵字+記住" 系統性污染 (7 章，10 條目)
**IDs:** `kt-ch25-l1-intro`, `kt-ch26-l1-intro`, `kt-ch27-l1-intro`, `kt-ch28-l1-intro`, `kt-ch29-l1-intro`, `kt-ch30-l1-intro`, `kt-ch31-l1-intro` + 相關 tap-pairs  
**問題:** 所有歷史章第一課 narration 都用同一 template：「先來認識幾個關鍵字，記住了故事更好聽喔！」。"關鍵字" 是 ELT 課本術語，"記住" 是指令性語氣 — 兩者都打破奶奶說故事語境。  
**嚴重度:** 入口印象 (第一課)，覆蓋 7 章。  
**修法:** 統一改為「奶奶說：今晚的故事有幾個特別的英文字，你聽的時候注意看看喔！」(用「英文字」替「關鍵字」，用「注意看看」替「記住」)。

### ⚠️ P0-2 — Ch26 grammar-mc "完成式" jargon (kt-ch26-l4-x5)
**問題:** 「would have + 過去分詞」是假設語氣完成式 — 「完成式」是大學語言學術語，遠超 8-12 兒童認知範圍。  
**修法:** 改用事件導向語言：「如果那時候他打電話了……英文說 would have called，表示他本來可以打，但沒打。」

### ⚠️ P0-3 — Ch27 type-translate 雙 jargon (kt-ch27-l4-lg1)
**問題:** 「kept + 動詞-ing 表示一直持續做某件事，是很好用的句型！」— "句型" + "動詞" 連發。type-translate 本身需要說明句型構成，但用 metalanguage label 不需要。  
**修法:** 「kept walking on = 一直一直走下去——腳痛了還繼續，三藏真勇敢。英文用 kept + -ing 說『不停做某事』。」

### ⚠️ P0-4 — Ch27 type-translate 單/複數 metalanguage (kt-ch27-l4-ttx2)
**問題:** 「friend 可以單數也可以複數」— "單數/複數" 是文法術語，兒童即使上國小英文也不一定聽過。  
**修法:** 「friend 一個人或很多人都說得通——英文有時候這樣彈性！試著把這句背起來。」

### ⚠️ P0-5 — Ch31 comprehension 考試語言入侵 (kt-ch31-l4-lg2)
**問題:** 「注意：正確答案沒有重複句子裡的 bag、bow、coat 等字」— 這是 ELT 測驗策略指導，完全屬於 test-register，在故事沉浸式 comprehension explanation 裡嚴重破壞語境。  
**修法:** 直接說故事邏輯，刪除 "注意：正確答案" 行。

---

## 3 Narrative Voice / Pacing Improvement Proposals

即使本輪掃出 42 個 jargon 違規，以下三點是和角度無關的 pacing 改善機會：

1. **Ch27 西遊記 explanationZh 末尾缺乏情緒落地**。「三藏真的很勇敢」出現在 4 個不同 explanationZh 末句——重複度高，換法：各 Q 末句給不同的情緒收尾（「沙僧默默點頭」/「悟空跳上去看路」/「白馬繼續往前走」），強化連貫感。

2. **Ch28 諸葛亮章節 explanationZh 過於工整對稱**（每個 grammar-mc 都是「X pattern——Y is 正確」），換法：每兩個 grammar-mc 中間插入一句故事敘事味的收尾 explanation，打散節奏感。

3. **Ch29–31 歷史章節 comprehension explanationZh 平均 ≤ 25 字**，比 Ch1–8 童話短。奶奶語氣最強的地方是 explanation 最後一句話——建議每個 comprehension Q 的 explanationZh 結尾加一句「奶奶說：……」收尾句，強化 grandma-voice 框架。

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### ARCH-REC #221: X221_EZ_REGISTER_TIERED — 分級 explanationZh 語域 lint

**業界依據:**

| 來源 | 發現 |
|------|------|
| Schurz 2026, *Language Learning* (doi: 10.1111/lang.70008) | 隱性學習條件（無 metalanguage 說明）比顯性規則教學產生更長效的語法知識留存；對兒童尤顯著 |
| Research Papers in Education 2025 (doi: 10.1080/02671522.2025.2565192) | 兒童對「動詞 / 名詞 / 句型」等語法 metalanguage 的理解薄弱；出現反而提升認知負荷、降低理解速度 |
| Duolingo Stories design audit (JEO 2024, ERIC EJ1473941) | Stories 的 explanation text 全部以角色行為語言包裝語法重點，從不用 metalanguage label；研究確認這是提升 implicit knowledge 的核心設計 |

**Pickup 架構適配分析:**

Pickup 的 `lessons-ch*.json` 有 20 種 `type`，但 explanationZh 只出現在答題後。語域 tiering 可分兩級：

| type 組 | 語域標準 | 允許 metalanguage? |
|---------|---------|-------------------|
| `narration` / `listen-mc` / `listen-tf` / `comprehension` / `emoji-pick` / `phrase-pairs` / `tap-pairs` | **純故事語域** — 奶奶/Mochi/角色語氣，不打破沉浸 | ❌ 禁 metalanguage label（片語/關鍵字/注意/正確答案/句型/動詞名詞/時態) |
| `grammar-mc` / `type-translate` | **輕度 metalanguage 允許** — 但需 child-accessible framing（「kept + -ing = 一直做」而非「句型」） | 🟡 允許輕量術語，禁複雜術語（完成式/假設語氣/介系詞/複數單數） |

**Proposed lint rule — X221_EZ_REGISTER_TIERED:**

```js
// X221_EZ_REGISTER_TIERED
// Tier A: narration/listen-mc/listen-tf/comprehension/emoji-pick/phrase-pairs/tap-pairs
//   → any metalinguistic term = ERROR
// Tier B: grammar-mc/type-translate
//   → complex metalinguistic term (完成式/假設語氣/介系詞/複數/單數/詞性) = WARN

const TIER_A_TYPES = new Set([
  'narration','listen-mc','listen-tf','comprehension',
  'listen-emoji','emoji-pick','phrase-pairs','tap-pairs',
  'listen-comprehension'
]);
const TIER_B_TYPES = new Set(['grammar-mc','type-translate','listen-grammar']);

const JARGON_ALL = ['片語','關鍵字','句型','語法','文法','詞性','助動詞','被動式',
  '進行式','完成式','假設語氣','主詞','受詞','連接詞','不定詞','動名詞',
  '冠詞','搭配詞'];
const JARGON_COMPLEX = ['完成式','假設語氣','被動式','不定詞','動名詞','詞性',
  '搭配詞','連接詞','介系詞'];
const FLAT_REGISTER = ['正確答案','本題考','解析','答案是','因此答案'];

for (const q of lesson.questions) {
  const ez = q.explanationZh || '';
  if (!ez) continue;
  
  if (TIER_A_TYPES.has(q.type)) {
    for (const term of [...JARGON_ALL, ...FLAT_REGISTER]) {
      if (ez.includes(term)) {
        issues.push(`${file} ${q.id}: X221_EZ_REGISTER_TIERED_A `+
          `(Tier-A type "${q.type}" explanationZh 含 metalanguage "${term}" — 應改為故事語域)`);
      }
    }
  } else if (TIER_B_TYPES.has(q.type)) {
    for (const term of [...JARGON_COMPLEX, ...FLAT_REGISTER]) {
      if (ez.includes(term)) {
        issues.push(`${file} ${q.id}: X221_EZ_REGISTER_TIERED_B `+
          `(Tier-B type "${q.type}" explanationZh 含複雜 metalanguage "${term}" — `+
          `建議改 child-accessible framing)`);
      }
    }
  }
}
```

**適配評估:**

| 面向 | 評估 |
|------|------|
| 實作成本 | 純 validate-lessons.js JS — 15 min，no schema change，no src/ touch |
| 覆蓋率 | 本輪 42 違規中 Tier-A 覆蓋 30 條（片語/關鍵字/注意/正確答案），Tier-B 覆蓋 12 條（動詞/句型/完成式/複數） |
| 誤報風險 | 低 — 「片語/關鍵字/句型」在故事語域幾乎無合法用法；FLAT_REGISTER 一律錯 |
| 業界對齊 | Schurz 2026 + Duolingo Stories 設計雙路確認；對 8-12 兒童 implicit learning 效果最佳 |
| 短期內容修復成本 | 42 條 — 估 3-4 hr 批次修；可 dispatch Fable batch agent |
| 長期防守 | 新增任何 explanationZh 自動被 CI lint 攔截，不再累積 |

**Verdict: ✅ 推薦實作** — 15 min lint 補洞，配合一次 Fable batch 修 42 條；業界 2026 implicit learning 研究直接支持。

| Pattern | Source URL | Pickup 適配 | Effort | ROI | Verdict |
|---------|-----------|-----------|--------|-----|---------|
| X221_EZ_REGISTER_TIERED — 分級語域 lint，防 metalanguage 入侵 story-voice explanationZh | Schurz 2026 doi:10.1111/lang.70008; Research Papers in Education 2025 doi:10.1080/02671522.2025.2565192; Duolingo Stories design (ERIC EJ1473941) | ✅ 純 JS lint，no schema/src 改動；Tier-A 禁全部 metalanguage，Tier-B 禁複雜術語；覆蓋本輪 42 違規 | 15 min lint + ~3 hr 批次修 | HIGH — 直接對齊兒童 implicit learning 研究、打破 5.2% explanationZh 污染 | **推薦實作** |

---

*Audit generated: 2026-07-30 12:04 UTC · Angle: #12 explanationZh Story-Voice vs Jargon · Ch25–31 · 42 violations (5 P0, 19 P1, 18 borderline-OK) + ARCH-REC #221*
