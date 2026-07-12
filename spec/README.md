# spec/ — 拾光 (Pickup) 主規格索引

> 這份文件是 `spec/` 目錄的入口。要找工程代碼地圖去 `AGENT.md`(repo 根),要找產品故事 / 版本史 / 視覺語言去 `CLAUDE.md`(repo 根)。這裡收斂「現在做到哪 + 接下來要做到哪」的規格文件。

---

## 產品定位

拾光 (Pickup) = **奶奶睡前說英文童話的家庭 ELT 遊戲**。核心情緒是溫暖陪伴(奶奶 + Mochi 貓 + Hana 狗),不焦慮、不打擊、不催促;學習機制以 cloze(填空)為核心,搭配科學間隔複習(SRS lite)與難度分級。美學定位是 Studio Ghibli 暖色手繪風。

## 目標客群

- **Primary**:台灣 8-12 兒童(家長付費、小孩使用)+ 親子家庭(爸媽陪讀、雙語可解釋)
- **Secondary**:海外台灣 / 華人家庭子女(heritage learners,中英雙語需求)、退休 / 銀髮 60+(重新學英文,不要 gamification 壓力)

## 交付總覽

**Baseline**(已做到,v2.0.B.267):32 章節題庫(`public/lessons-ch0.json` ~ `lessons-ch31.json`)+ 純 React app(`src/react-app/**`,Phaser 已死碼)。
**Delta**(目標):內容品質 lint 清零、視覺補齊、v2.0 正式 ship、iOS 上架。

## 子規格索引

| 文件 | 說明 |
|---|---|
| `AGENT.md`(repo 根) | 工程代碼地圖 — 進入點 / 資料流 / 目錄結構 / 建置與部署約束 |
| `01-game-mechanics.md` | 遊戲機制規格 — cloze 答題、blindRetry、SRS lite、難度系統、題型 |
| `02-visual-style.md` | 視覺規格 — 色彩 token、角色美術、排版、動畫規則 |
| `03-content-story.md` | 內容 / 故事規格 — 8 章故事框架、角色設定、章節內容標準 |
| `04-deliverables.md` | 交付清單 — v2.0 ship 範圍、iOS 上架任務、驗收前置條件 |
| `acceptance/acceptance-criteria.md` | 驗收標準 — 各交付項目的可驗證通過條件 |

> 上表除 `AGENT.md` 外皆為後續任務將建立的檔案,此份 README 先固定路徑與命名,現在點進去會是空的屬預期。

## spec 使用約定

每份 spec 文件內部分兩段:

- **Baseline(現狀,可驗)**:目前已經做到、可以實際跑指令 / 開 app 驗證的狀態。禁止寫「應該是」「理論上」,只寫實測過的事實。
- **Delta(目標,含驗收條件)**:要做到的下一步,附上可判斷「完成了沒」的具體驗收條件(不是模糊的「做好視覺」,而是「X 畫面在 iPhone SE 尺寸下無 overflow」這種可檢查的敘述)。
