# 外文打字題「可接受答案」判斷規範 (Typing Answer Acceptance Guide) — v1

> 2026-06-27 · 作者:「我要怎麼知道一個答案有哪些答案…像縮寫可以被接受 (I have = I've)、或單字意思一樣 (他沒用片語)。上網查多鄰國怎麼做。」
> 本文教 **出題者** 怎麼為一題 `type-translate` 列出 `accept[]`(所有可接受講法)。
> 引擎細節見 `docs/standards/2026-06-26-freetype-nearmiss-standard.md`;本文是它的「出題操作手冊」。

---

## 0. 多鄰國怎麼做(查證)

Duolingo 的打字題**不是只比一個標準答案**,而是比對一個**人工策劃的「可接受答案集合」**,而且這些答案**依真實學習者輸入頻率加權排序**。
他們甚至辦了一個學術比賽 (STAPLE 2020),題目就是「給一句話,產生**學習者可能打出的所有正確翻譯**」——把人工譯者每天在做的事自動化。

**抄過來的三個原則:**
1. **覆蓋「學習者真的會打的」**,不是窮舉所有理論上正確的句子。常見講法要收,冷僻講法可略。
2. **寧鬆勿嚴(但不能收錯的)**:漏收一個對的講法 → 小孩打對卻被判錯 → 打擊動機。所以**不確定時就收進去**,前提是**文法正確且意思相同**。
3. **機械變體交給程式**,人只列「程式猜不到的」(同義字 / 換句型)。

來源:[Duolingo STAPLE shared task](https://sharedtask.duolingo.com/) · [STAPLE paper (Mayhew et al. 2020)](https://research.duolingo.com/papers/mayhew.staple20.pdf) · [Dear Duolingo: contractions](https://blog.duolingo.com/do-other-languages-have-contractions/)

---

## 1. 引擎「自動接受」的(出題者**不用**寫進 accept[])

`checkAnswer()`(`src/data/answerMatch.ts`)正規化後比對,以下一律當對:

| 類別 | 例子 | 說明 |
|------|------|------|
| **縮寫 ↔ 展開** | `I've` = `I have`、`don't` = `do not`、`it's` = `it is`、`can't` = `cannot`、`I'm` = `I am`、`you're` = `you are`、`he'll` = `he will`、`I'd` = `I would` | 兩邊都展開再比,所以**只要寫一種**,另一種自動通 |
| **大小寫** | `I'm Good` = `i'm good` | |
| **標點** | `I'm good.` = `I'm good` = `I'm good!` | 句尾句中標點都不計 |
| **彎/直引號** | `I'm` = `I'm` | |
| **多餘空白** | `the  dog` = `the dog` | |

→ 作者**範例**:答案寫 `I have a cat`,玩家打 `I've a cat` / `I HAVE A CAT.` 全自動算對,**不用列**。

---

## 2. 引擎「近似容忍」的(自動跳『差一點』提示,也不用寫)

只差一個小地方 → 'near'(溫柔提示、不罰、要玩家自己改對):

- **拼字小錯**(編輯距離 ≤ 1~3,依長度):`I am gud` → 差一點。
- **漏 / 多一個冠詞** `a / an / the`:`I have cat`(漏 a)→ 差一點。
- **字對、順序錯**:`good am I` → 差一點。
- **多打一個尾巴字**:`I am good now` → 差一點。

→ 這些**不必列進 accept[]**,引擎會擋下來給提示。

---

## 3. 作者**必須**寫進 accept[] 的(程式猜不到)

引擎不懂語意,所以「**換了字 / 換了句型但意思一樣**」要人列。逐題問自己這 5 個問題:

### Q1. 關鍵字有沒有常見同義字?
- 大 = `big` / `large`;高興 = `happy` / `glad`;漂亮 = `pretty` / `beautiful`;說 = `said` / `told`(看句構);看 = `looked` / `watched`。
- 例:答案 `He is big` → accept 加 `He is large`。

### Q2. 「片語 vs 單字」兩種都對嗎?(作者問的「他沒用片語」)
- 玩家可能不用片語動詞,改用單字同義:
  - `picked up` ↔ `lifted` / `took`
  - `put on` ↔ `wore`
  - `looked for` ↔ `sought`(太難,A2 可略)
  - `got up` ↔ `rose` / `stood up`
- 例:答案 `He picked up the stone` → accept 加 `He lifted the stone`。

### Q3. 時態在這個語境下有沒有兩種都合理?
- 來源句沒明確時間標記時,過去 / 現在可能都對:
  - `He is tall and strong` ↔ `He was tall and strong`(故事體常用過去)。
- 例:預設收**現在 + 過去**兩版,除非來源句有 `every day`(限現在)/ `yesterday`(限過去)。

### Q4. 有沒有可省略 / 可加的小詞?(冠詞除外,冠詞引擎已容忍)
- 受詞代名詞、`that`、`some` 等:
  - `She knew it was time` ↔ `She knew that it was time`。
- 例:答案 `I think he is kind` → accept 加 `I think that he is kind`。

### Q5. 同義的「整句換句型」?
- `There is a cat` ↔ `A cat is here`;`I like it` ↔ `I enjoy it`。
- 只在**自然、A2 範圍**內收;太繞的句型不必。

---

## 4. 鐵律

1. **每個 accept[] 條目都要文法正確**。寧可少收,不可收錯——收錯 = 教錯。
2. **意思必須相同**。`I am good` 不能收 `I am bad`(反義)、不能收 `I am here`(不同意思)。
3. **句子要短**(一般題 3–6 字、傳奇題 ≤8 字),accept[] 才列得完;長句講法爆炸、收不完 → 改短。
4. **縮寫 / 大小寫 / 標點 / 冠詞 / 拼字** 一律**不要**手動列(引擎包了),列了只是雜訊。
5. 寫完自我檢查:把 accept[] 每句念一遍,(a) 文法對嗎? (b) 跟答案同意思嗎? 兩個都 yes 才留。

---

## 5. 範例(完整一題)

```json
{
  "id": "kt-ch23-l4-ttx2",
  "type": "type-translate",
  "level": "A2", "difficulty": "hard",
  "sentenceZh": "他把石頭撿起來。",          // 來源句 (玩家看自己語言: ja/ko 走 overlay)
  "answer": "He picked up the stone.",        // 主答案
  "accept": [
    "He lifted the stone.",                   // Q2 片語→單字
    "He took the stone.",                     // Q1/Q2 同義
    "He picked the stone up."                 // 片語可分離語序 (引擎順序容忍也接, 但明列更穩)
  ],
  "explanationZh": "pick up = 撿起來;lift / take 意思也通。",
  "tags": ["production", "type-translate"]
}
```
玩家打 `he picked up the stone`(小寫無句點)→ 自動對(§1)。打 `He lift the stone`(拼字/時態小錯)→ 差一點(§2)。打 `He lifted the stone`→ accept 命中,對。打 `He ate the stone`→ 錯。

---

## 6. 落地

- 引擎 / near-miss 標準:`docs/standards/2026-06-26-freetype-nearmiss-standard.md`。
- 來源句多語(ja/ko/簡中):放 `sentenceZh`,ja/ko 走 `public/lessons-i18n/` overlay 的 `s` 欄,簡中走 opencc(B.457-458)。
- 出題後驗收:`npm run build`(schema:`answer` 非空)+ 手測幾個變體(縮寫 / 同義 / 拼錯 / 反義)。
