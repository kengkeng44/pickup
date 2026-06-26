# 外文打字題 + 近似判斷 標準 (Free-type Translation & Near-miss) — v1

> 2026-06-26 · 作者:「一般跟困難題型裡面要塞入:看原本的語言, 用外文打出一樣的意思 (我很好 → I'm good)。
> …你要設立判斷他有可能會用別句話說, 所以要先設立好所有可能性 (但要文法正確), 這是個大工程但不得不做。
> 還有要做差一點點的判斷:只少了一個簡單的小地方 → 跳提示;明顯大錯誤 → 直接跳錯誤。」
> 引擎:`src/data/answerMatch.ts`(`canonical` / `checkAnswer`),renderer:`renderers.tsx` `TypeTranslateRenderer`,
> 題型 schema:`lessons.ts` `TypeTranslateSchema`。測試:`tests/data/answerMatch.test.ts`(17 case)。

---

## 0. 題型定義 (`type-translate`)

- **玩家看**:來源語言句子(`sentence`,例 中文「我很好」)。
- **玩家做**:用外文(英文)打出同樣意思 → 底部「檢查」鈕(沒打字灰、有字綠)。
- **欄位**:
  | 欄位 | 用途 |
  |------|------|
  | `sentence` | 來源句(玩家語言,目前中文;ja/ko 走 overlay 翻) |
  | `answer` | 主要正解(例 `"I'm good"`) |
  | `accept[]` | 其他**文法正確**的可接受講法(例 `["I am fine","I'm doing well"]`) |
  | `explanationZh` | 答對後的溫度說明 |

- **取材**:「可以直接用文章的句子」— 優先用該章故事原文出現過的句子當 answer。
- **放在哪**:一般 (medium) 與困難 (hard) 難度的故事課(production 題,排在 recognition 之後)。
  低齡 prologue / 入門 ch0 先不放(打字門檻高)。

---

## 1. 「設立所有可能性」怎麼分工(降 content 負擔)

一個意思講法很多,但**不必窮舉**——引擎自動吃下機械變體,作者只列「語意/句構不同」的講法:

**引擎自動接受(作者不用列)**:
- 大小寫:`I'm Good` = `i'm good`
- 標點:`I'm good.` = `I'm good`
- 縮寫 ↔ 展開:`I'm good` = `I am good`;`don't` = `do not`;`it's` = `it is`;`can't` = `cannot`
- 彎引號 `’` = 直引號 `'`
- 多餘空白

**作者要放進 `accept[]`(語意/用詞不同的講法,且文法正確)**:
- 同義替換:`I'm good` → `I'm fine` / `I'm well` / `I'm doing well` / `I'm okay`
- 句構不同:`I have a cat` → `There is a cat` (僅當題意允許)
- ⚠️ 鐵律:放進 accept[] 的每一句**都要文法正確**。寧可少列,不可列錯(列錯 = 教錯)。

> 「大工程」指的就是逐題補 `accept[]`。建議:常用招呼/情緒/敘事句先建一份**通用同義表**
> (good/fine/well/okay…),出題時套用,再針對句子微調。

---

## 2. 近似判斷標準 (correct / near / wrong)

`checkAnswer(input, answer, accept)` → `{ status, reason? }`。先把雙方 `canonical()` 正規化再比。

| 結果 | 條件 | UI 行為 |
|------|------|--------|
| **correct** | 正規化後 = 任一可接受答案 | 慶祝 ✅ + 顯示正解 + 推進(2.5s) |
| **near (差一點)** | 只差一個小地方(見下) | 跳溫柔提示、**不罰體力**、不揭答案、留輸入讓玩家改 |
| **wrong** | 明顯不同 | 跳「再試一次」、**首錯記一次**(扣 1 體力)、不揭答案、重試 |

**near 的四種「小地方」**(`reason`):
1. `typo` — 拼字編輯距離 ≤ 容忍度(≤6 字容 1、≤20 容 2、更長容 3)。
2. `article` — 只多/少一個冠詞 `a / an / the`。
3. `order` — 同一組字、只是順序不同。
4. `extra` — 整句對、只多打了頭或尾一個多餘字。

**near vs wrong 的界線**(設計理由):near = 玩家「會了、只是手滑/漏小字」,給提示比給紅叉更不打擊
(對齊 CLAUDE.md 不打擊式 + blindRetry:不揭答案,讓他自己改對)。wrong = 用錯字/字數差很多/語意不同,
才算真的錯,記一次 miss 進 SRS。

**force-correct**:故事模式要打到對才推進。near 與 wrong 都停在原題;只有 correct 推進。

---

## 3. 驗收

- `npx vitest run tests/data/answerMatch.test.ts` 17 case 綠(correct / near / wrong 各情境)。
- `validate-lessons` 吃 `type-translate`(schema 已入 union);`answer` 非空。
- 手測:打 `i am good` / `I'm good.` / `I'M GOOD` 對「我很好」皆 correct;
  `I am gud`(typo)→ near;`I have cat`(漏 a)→ near;`the weather is sunny`→ wrong。
- 內容批次(逐題補 accept[])走 Ship 4 content dispatch。
