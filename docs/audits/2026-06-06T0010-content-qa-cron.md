# Content QA — 2026-06-06 00:10 UTC

Today's angle: **#11 — optionsZh 翻譯品質 (Chinese option translation quality)**
Focus: **Ch4 (駱駝為什麼有駝峰) + Ch5 (Baba Yaga 雞腳屋)**

---

## A. validate-lessons.js result

```
OK lessons-ch4.json: 7 lessons (JSON shape + mirror + extended lint)
OK lessons-ch5.json: 7 lessons (JSON shape + mirror + extended lint)
Total mirror-lint issues: 0 for these chapters
```

Validator clean. All issues below are optionsZh-specific (translation quality, register, accuracy).

---

## B. Violation table

| Ch | Q ID | type | snippet | violation | 修法 | audio regen? |
|----|------|------|---------|-----------|------|-------------|
| 4 | kt-ch4-l1-q10 | emoji-pick | `'😴 ready for a long sleep' zh: '準備長眠'` | **P0 — 「長眠」= 死亡委婉語**。「長眠」在中文是「永久長眠/死亡」的婉稱（長眠地下）。英文 "ready for a long sleep" 意思是「很累想睡」，譯成「長眠」讓兒童讀者接觸到死亡暗示，不適合 8-12 受眾 + 親子家庭 | 改 `'準備睡個大覺'` | No |
| 4 | kt-ch4-l4-q8 | listen-mc | `'singing him a new song' zh: '教他唱新歌'` | **P1 — 增字誤譯**。英文 "singing him a new song" = 唱歌給他聽（表演），無「教」字。中文「教他唱新歌」多加「教」（teach），改變語意：從被動接收歌曲 → 主動教學行為。兩個選項語意完全不同 | 改 `'唱首新歌給他聽'` | No |
| 4 | kt-ch4-l2-q6 | listen-mc | `'sleep with him' zh: '跟他睡'` | **P1 — 兒童不友善用詞**。「跟他睡」在中文有性/親密含義的歧義風險，在親子環境下不適宜。英文 "sleep with him" 在動物故事脈絡指「一起睡覺/窩在一起」 | 改 `'跟他一起睡覺'` | No |
| 5 | kt-ch5-l1-q10 | listen-comprehension | `'cruel under a smile' zh: '笑裡藏刀'` | **P1 — 成語超出 8-12 兒童識字水準**。「笑裡藏刀」是 B2 成語，8-12 受眾與海外華人孩童很可能不懂，反而讓「正確答案的中文」比錯誤選項難讀，干擾學習 | 改 `'笑著但心裡很壞'` 或 `'表面笑，其實壞'` | No |
| 5 | kt-ch5-l7-q9 | listen-mc | `'the village priest' zh: '村裡牧師'` | **P1 — 宗教詞彙文化誤植**。Baba Yaga 是俄羅斯民間故事，文化背景為東正教。「牧師」特指基督新教教會領袖（Protestant pastor），用在俄羅斯鄉村背景不準確。對海外華人 heritage learner 尤其誤導 | 改 `'村裡的神父'`（天主/東正教）或更兒童化 `'村裡的老人'` | No |
| 4 | kt-ch4-l3-q8 | listen-mc | `'sore and upset' zh: '痠痛又難過'` | **P2 — 語意窄化**。「Upset」在此脈絡（體力透支、踢沙）是「身心難受、沮喪」，比「難過」（sad/sorrowful）更接近「難受」。「難過」偏向情緒低落，「難受」更包含身體不舒服 | 改 `'痠痛又難受'` | No |
| 5 | kt-ch5-l4-q3 | listen-mc | `'cold metal' zh: '冷冰冰的金屬'` | **P2 — 強度不對稱**。其他選項 zh 用平舖直敘（「石頭」/「舊繩子」/「骨頭」），唯此選項加疊字強調詞「冷冰冰」。若疊字形式是有意讓錯誤選項更生動，可保留；但若追求視覺長度公平，改 `'冷金屬'` 或 `'鐵片'` | 改 `'冷冰冰的鐵'`（縮短 + 更具體）或全部統一風格 | No |

---

## C. Stats

| 指標 | 數值 |
|------|------|
| 章節掃描 | Ch4 (7 lessons) + Ch5 (7 lessons) |
| 總 Q 數 | ~140 (narration + MC + emoji + tf + tap-pairs) |
| 有 optionsZh 的 Q | ~42 Q × 4 options = **168 option 對** |
| P0 | **1** |
| P1 | **4** |
| P2 | **2** |
| Audio regen needed | **0** |
| 修法涉及 src/ | **0**（lessons JSON only，不在 src/） |

---

## D. Top 5 P0/P1

### ⚠️ P0-1 — `kt-ch4-l1-q10` 「準備長眠」= 死亡語

- **現況**：`'😴 ready for a long sleep' zh: '準備長眠'`
- **問題**：「長眠」是中文對死亡的婉稱（常見於墓誌銘「永遠長眠」）。此 Q 在問「孤立的駱駝處於什麼狀態」，「很累想睡」是 wrong-answer distractor，翻成「準備長眠」會讓 8 歲小孩讀到死亡意象。
- **Spec ref**：CLAUDE.md — 「核心情緒：溫暖陪伴，不焦慮、不打擊」；DONT-DO #3「不要做真實成人壓力劇本」（延伸：不要暗示死亡）
- **修法**：`zh: '準備睡個大覺'`

---

### ⭐ P1-1 — `kt-ch4-l4-q8` "singing him" ≠ "教他唱"

- **現況**：`'singing him a new song' zh: '教他唱新歌'`
- **問題**：英文 performing FOR him → 中文 teaching HIM to sing。語意漂移將被動接收娛樂（distractor 情境：精靈用歌聲安撫駱駝）改成主動教學，語境完全錯誤。
- **修法**：`zh: '唱首新歌給他聽'`

---

### ⭐ P1-2 — `kt-ch4-l2-q6` "跟他睡" 歧義

- **現況**：`'sleep with him' zh: '跟他睡'`
- **問題**：「跟他睡」在中文通俗語境易引起親密/性的聯想，對 8-12 受眾不合適。原文是動物故事，dog 請求 camel 一起工作/窩著，毫無此歧義。
- **修法**：`zh: '跟他一起睡覺'`（加「一起」消歧義）

---

### ⭐ P1-3 — `kt-ch5-l1-q10` "笑裡藏刀" chengyu 超齡

- **現況**：`'cruel under a smile' zh: '笑裡藏刀'`
- **問題**：此 chengyu 要求讀者先認識成語才能理解「正確答案的中文意思」，對海外華人 heritage learner 尤其是 barrier。若學生讀不懂正確選項的中文，他們無法從 optionsZh 獲得學習加值。
- **Spec ref**：v2.0.B.231 pivot — 客群 8-12 兒童 + 海外華人 heritage learner，強調「不焦慮、不打擊」
- **修法**：`zh: '笑著但心裡很壞'`

---

### ⭐ P1-4 — `kt-ch5-l7-q9` "牧師" 文化誤植

- **現況**：`'the village priest' zh: '村裡牧師'`
- **問題**：Baba Yaga 出自俄羅斯民間故事（Russian Orthodox 背景），「牧師」是 Protestant 稱謂。對海外台灣 / 華人學童，這可能導致地理文化錯誤建模（把俄羅斯鄉村等同於台灣基督長老教會環境）。
- **修法**：`zh: '村裡的神父'`（若保持宗教詞）或 `zh: '村裡的大人'`（兒童化，迴避宗教詞）

---

## E. 3 Narrative Voice / Pacing 改善建議（非 R1-R8 違規）

即便以上 P0-P2 全修完，以下 3 點仍可提升整體故事聲音品質：

### E1 — Ch4 道德收尾問句的中文節奏
`kt-ch4-l7-q11` 結尾旁白：
> EN: "And you, my dear — what hump might you be carrying tonight?"
> 現況 exZh: "而你,親愛的 — 今晚你背上又是什麼樣的駝峰呢?"

「又是什麼樣的」語氣拗口，小孩唸起來不順。建議改：
> `"你呢,親愛的——今晚你背上背著什麼?"`

更短、更直接、更適合 8 歲讀完後靜靜思考。

### E2 — Ch5 Vasilisa 叫 Baba Yaga「奶奶」的 pedagogical gap
`kt-ch5-l6-q2` sentence: `"Grandmother, I came for fire."`  
exZh 只翻字面「奶奶,我來拿火」，但沒說明為什麼 Vasilisa 叫危險巫婆「奶奶」。

俄羅斯民俗規則：對 Baba Yaga 稱「奶奶」是禮貌求饒策略。若 explanationZh 補充：
> `「說奶奶是禮貌求生策略——就算害怕,也要謙遜說話。」`

對 8-12 受眾既有趣又有文化學習價值。

### E3 — 疊字視覺一致性（Ch4 emoji-pick 系列）
`kt-ch4-l3-q10` 包含 `'🚂 a train' zh: '火車'`，在一個駱駝 + 精靈 + 沙漠的前工業時代童話裡，「火車」雖然是刻意荒謬 distractor，但對 8 歲孩子反而可能引發「咦這個世界有火車嗎?」的誤解。建議換成同樣荒謬但更時代一致的選項：
> `'🦅 a big eagle' zh: '一隻大老鷹'`（已有此選項在 kt-ch4-l3-q10 中，結構正確）

實際上 kt-ch4-l3-q10 已有 `'🦅 a big eagle'`，只有 `'🚂 a train'` 是跨時代干擾。可將 train 替換為 `'🌪️ a wind' zh: '一陣強風'`，維持自然環境干擾源而不引入工業文明混亂。

---

*Audit by Claude (claude-sonnet-4-6) — 2026-06-06 00:10 UTC*
*Next rotation: A1-obvious-correct / A3-semantic-leak / A5-cultural-reference (3 unused angles remaining)*
