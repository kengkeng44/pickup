# 拾光 Pickup — 聽⇄讀統一 + 關鍵字盲聽空格 (Spec)

> 2026-06-19 · Opus 4.8 · per user (鄭成功)
> 三個拍板:① 聽⇄讀=全域單一開關 ② 空格=關鍵字挖空+作者標記 ③ 比例=理解導向
> 本文件是 source of truth。實作分 3 phase,Phase 1 back-compat 先行,內容 pass 後補。
> ⚠️ 不動 Phase 3/4 roadmap 的東西。

---

## 0. 為什麼做 (現況真相)

- 32 章 / 224 節 / 2472 題。**narration 佔 48%**(全句變底線→點開全文),**聽力家族佔 34%**,但**閱讀替代版 ≈ 0%**(read-comprehension 全庫 1 題)。
- `renderers.tsx` 已有 `blanks()`:listen-mc / narration 現在就是「整句變 `____` → 答完/點一下顯示全文 → 可點詞看中文」。所以變動 #1 雛形已在,差「只空關鍵字 + 逐字點開」。
- **mute 現在半殘**:靜音後 listen-mc 仍把句子變底線 → 聽不到 + 看不到字 = 只能猜。變動 #2 的全域開關正好解這個。

---

## 1. 變動 #2 — 聽⇄讀全域單一開關

### 設定
- 新狀態 `pickup.lesson.mode`: `'listen'`(預設)| `'read'`。
- lesson 頂部把現在的「靜音鈕」換成 2 態切換鈕:**🔊 聽力 / 📖 閱讀**。全域持久化(localStorage)+ `window` event 廣播(沿用 muteSetting.ts 模式)。

### 兩模式行為
| | 聽力 listen (預設) | 閱讀 read |
|---|---|---|
| 句子顯示 | 關鍵字變 `____`(見 §2) | **全文直接顯示**,無空格 |
| auto-TTS | 開(全音量,B.330 鐵律) | **關**(靜音);手動 replay 鈕仍可 `force:true` 播 |
| 答題 | 聽完選 | 讀完選 |

### 與舊 mute 的關係 (重要,別踩 B.251 哄睡 fix)
- 閱讀模式 = 「全文可讀 + auto-TTS 靜音」**已涵蓋** B.251 媽媽哄睡需求(不出聲、但小孩仍可讀著做)。
- 落地:`isMuted()` 改為 derive = `mode === 'read'`;舊 `pickup.audio.muted` 做一次性 migration(muted=1 → mode='read')。手動 replay 一律 `force:true` 不受 mode 約束(重聽需求保留)。
- renderer auto-speak gate:`if (mode === 'read') 不 auto-speak`,但 onEnd/advance 邏輯仍 fire(不卡推進,沿用現有 mute silent-advance)。

---

## 2. 變動 #1 — 關鍵字盲聽空格 + 逐字點開

### Schema (back-compat,加在 QuestionBaseFields)
```jsonc
"blankWords": [2, 5]   // optional, 0-indexed against sentence.split(/\s+/)
```
- 標哪幾個字在**聽力模式**要變 `____`(關鍵字,1-3 個/句)。
- **缺 `blankWords` → fallback 現狀**(整句空)。所以 Phase 1 上線零內容風險,內容 pass 逐章補。

### Renderer 行為
- **聽力模式**:只把 `blankWords` 指到的字變 `____`,其餘字正常顯示(降盲聽負荷,聚焦關鍵字)。
- **閱讀模式**:全文顯示,忽略 `blankWords`。
- **逐字互動**(兩模式皆可,沿用 `wireSentenceHints` 虛線點詞):
  - 點空格 `____` → 顯示該英文字(跳原文)。
  - 已顯示的字再點 → 顯示中文。
  - 「跟題目沒重要關係的空格可以按了看」= 所有空格都可點開;**聽力的主通道仍是語音**,點開是輔助。

### 內容標準 (餵 Fable 寫 blankWords)
- 每句挖 1-3 字,優先挖:該章新單字(tap-pairs 來源)、與下方題目正解相關的關鍵名詞/動詞。
- 不挖功能字(the/a/is)、不挖整句、不挖到「不挖也能從上下文秒填」的字。

---

## 3. 變動 #3 — 理解導向題型比例 (每節 ~11 題)

統一後 listen-mc / read-comprehension / listen-comprehension **收斂成同一型「理解選擇」**,只是依 mode 換渲染。

| 題型 | 目標佔比 | 題數 | 備註 |
|------|------|------|------|
| narration 旁白(關鍵字盲聽) | 30% | ~3-4 | 從現況 48% 下修,削冗餘旁白 |
| 理解選擇(聽或讀) | 30% | ~3 | listen-mc + read-comp 合一 |
| 是非 listen-tf | 10% | ~1 | |
| tap-pairs 單字配對 | 10% | ~1 | 每章必有(餵獎勵統計) |
| phrase-pairs 片語配對 | 10% | ~1 | 現況 ≈0%,補齊 |
| emoji-pick / picture | 10% | ~1 | |

> 配比是跨章平均目標,非逐節死守。對照舊標準 `lesson-design-standard.md` §2:narration 36→30、補 phrase-pairs、聽/讀理解合一。

---

## 4. 分階段落地

| Phase | 內容 | 模型 | 規模 | 風險 | 產出 |
|-------|------|------|------|------|------|
| **P1 程式地基 (back-compat)** | schema 加 `blankWords?`;新 `mode` 設定 + header 開關;renderer mode-aware 空格 + 逐字點開;mute migration;validate + tests | Opus 定 / Sonnet 實作 | M | 低(全 fallback,零內容改) | 上線即修「靜音=看不到字」bug |
| **P2 內容 pass** | 逐章標 `blankWords` 關鍵字挖空;依理解導向比例 rebalance(削 narration、補 phrase-pairs) | Fable 並行(章為單位) | L (~1700 題) | 中(可逐章漸進) | |
| **P3 標準 + 護欄** | 更新 lesson-design-standard.md;validate-lessons 加 blankWords sanity + 比例 lint | Opus / Haiku | S | 低 | cron 可抓 |

**P1 先上**:back-compat、立即解痛點(哄睡+靜音可讀),不等內容。P2 用 Fable 並行逐章補,P3 收口。

---

## 5. 待落地核對表

- [ ] schema `blankWords?: number[]` + cross-field guard (indices < word count)
- [ ] `pickup.lesson.mode` 設定模組 + mute migration + `isMuted` derive
- [ ] header 🔊/📖 toggle 元件
- [ ] renderer:mode-aware blank(關鍵字 vs fallback 整句 vs 閱讀全文)
- [ ] renderer:空格點開→字、字再點→中文(wireSentenceHints 接)
- [ ] auto-speak gate by mode（B.330 題目語音全音量鐵律不破）
- [ ] tests + validate green
- [ ] P2 內容 pass(Fable)/ P3 標準 + lint
