# 拾光 Pickup — IP / 抄襲法律風險審查

> 2026-06-16 · Opus 4.8 撰寫
> ⚠️ **免責**:我不是律師,以下是基於程式碼證據的務實風險評估,**不是法律意見**。商業上架 / 收費前請找智財律師正式 review。

---

## 0. 一句話結論

**目前沒有「大概率違法」的項目** —— 抄的多半是「功能性 UI 慣例」(進度路徑、HUD、題型)+「公有領域故事」,這些法律上很難被獨佔。
真正要處理的是 **2 個「小概率但嚴重」** 風險:
1. 🔴 **公開頁面寫著「copy Duolingo / Duolingo parity」** → 萬一被告,這是「故意抄襲」鐵證,把「無辜的相似」變成「惡意侵權」。**最該先清,成本最低。**
2. 🟠 **整體 look-and-feel 太像 Duolingo**(trade dress)→ 規模做大 + 商業化後,可能收到 Duolingo 的 C&D(下架/重設計信)。

---

## 1. 風險分類 (依「機率 × 嚴重度」排序)

| # | 風險 | 違法機率 | 嚴重度 | 證據 |
|---|------|---------|--------|------|
| R1 | 公開 ops 頁面「copy Duolingo」字眼 (故意抄襲證據) | 中 (是事實存在) | 🔴 高 (放大 R2) | cockpit.html / ui-ux-standard.html / qa-stats.html |
| R2 | 整體 trade dress 似 Duolingo (路徑地圖 + HUD + lesson flow) | 低 | 🟠 高 (要重設計) | MapPage 蜿蜒路徑 / GameHUD crown+streak+coin+XP / lesson ✕+progress |
| R3 | 直接複製 Duolingo 專屬素材 (owl / 特定 icon 美術) | 低 (待人工確認) | 🔴 高 (明確著作權) | 需人眼比對 mascots/*.webp |
| R4 | BGM Pixabay 授權合規 | 低-中 | 🟡 中 | bgm.ts: "Peace! by ryoish (Pixabay)" |
| R5 | 故事內容抄特定版權譯本 (非公有領域) | 低 | 🟠 高 | lessons-ch*.json 是自寫改編? |
| R6 | 商標「Pickup / 拾光」已被他人註冊 | 中 (未查) | 🟡 中 (要改名) | — |
| R7 | 字型授權 | 極低 | 🟢 低 | Nunito / Noto = OFL ✓ |
| R8 | Duolingo 專利 (方法專利) | 極低 | 🟢 低 | SRS / MC 皆 prior art |

---

## 2. 逐項分析 + 改善方案

### 🔴 R1 — 公開頁面「copy Duolingo」字眼 (最優先)

**現況**:`app bundle (dist) 本身乾淨` —— 所有「Duolingo」都在 src 程式碼註解,esbuild build 時剝除,玩家永遠看不到。✅
**但**:公開網址有可見文字提到 Duolingo:
- `cockpit.html` / `public/cockpit.html`:「僅 Ch1 符合 Duolingo Stories spec」「Duolingo case」「需 Duolingo Stories 格式重寫」
- `ui-ux-standard.html`:「Duolingo design system」「Duolingo style」「Duolingo Q prompt 22pt」「Duolingo / Memrise / Kahoot 結構比例」
- `qa-stats.html`:「兒童 Duolingo」

**為什麼嚴重**:著作權 / trade dress 訴訟裡,「被告自己留下『我要抄 X』的文件」會把「獨立開發碰巧相似」變成「willful infringement (故意侵權)」,賠償可三倍、也更難和解。這是把 R2 從「低風險」推高的放大器。

**改善方案 (低成本, 建議立刻做)**:
- 公開頁面所有「Duolingo」→ 改中性詞:「**業界 ELT 標準 / language-app 通用慣例 / 我們的設計系統**」。
- 「Duolingo Stories spec」→「我們的 narration 規格 (R1-R2)」。
- benchmark 數字 (如「Duolingo 60-70%」) 可留,但改成「業界語言 app 約 60-70%」不點名。
- 程式碼**註解**不影響法律 (不公開),但建議順手也淡化,養成習慣。

### 🟠 R2 — Trade dress 似 Duolingo

**現況**:Pickup 明確模仿 Duolingo 的:蜿蜒學習路徑地圖、關卡泡泡節點、頂部 HUD(🔥streak / 👑crown level / 金幣 / XP)、lesson 的 ✕ 關閉 + 進度條 + 答題流程、streak freeze。

**法律現實**:
- 「功能性 UI pattern」(進度路徑、gamification HUD) 法律上**很難被獨佔** —— 已是整個品類慣例 (Memrise / Busuu / Babbel 都類似)。trade dress 要成立需「識別性 + 非功能性 + 消費者混淆」。
- Pickup **差異化夠強**:暖色 Ghibli (非 Duo 亮綠)、貓+奶奶 (非貓頭鷹)、爪印節點、中文童話。消費者不會把 Pickup 當成 Duolingo → **實際侵權風險低**。

**改善方案**:
- 繼續強化差異化 (已做)。**不要**為了「更像 Duo」回頭加亮綠 / 貓頭鷹 / 寶石。
- 對外行銷文案**不要**自稱「Duolingo for X / 像 Duolingo」—— 改「奶奶的睡前英文童話」這種獨立定位 (已是現行 tagline ✓)。
- 規模化前找律師對 trade dress 做一次正式 clearance。

### 🔴 R3 — 直接複製專屬素材 (待人工確認)

**現況**:mascot / icon 多為 user 用 ChatGPT/Gemini 生成 (DALL-E/Imagen) + rembg。AI 生成圖**本身**多半不構成侵權,**除非**生成結果重現了他人受保護角色 (如貓頭鷹 Duo、特定 icon 美術)。

**改善方案 (需你/人眼確認, 我無法可靠判圖)**:
- 逐一檢視 `public/mascots/*.webp`:crown / coin / flame / 各 icon 是否「概念通用」(✅ 王冠/火焰/金幣是通用符號) 還是「像素級神似 Duolingo 的特定美術」(❌)。
- 貓 mascot 確認不像任何已知商業角色。
- 通用符號 (火焰=streak、王冠=等級) **概念不受保護**,只要不是描摹對方的具體畫法即可。

### 🟡 R4 — BGM Pixabay 授權

**現況**:`Peace! by ryoish (Pixabay)`。Pixabay Content License 一般允許商用、免署名,但**禁止把音檔本身當商品轉售/單獨散布**,且個別曲目條款可能不同。

**改善方案**:
- 存證:把該曲的 Pixabay 頁面 URL + 下載日 + License 版本截圖,放 `docs/licenses/`。
- 確認 ryoish 該曲是 Pixabay License (非另要署名的 CC-BY)。
- 上架 App Store 時,音樂授權通常要在 metadata 聲明來源。

### 🟠 R5 — 故事內容

**現況**:章節用公有領域童話 (桃太郎 / Grimm / 伊索 / Kipling Just So Stories 1902 / 三隻小豬 Jacobs 1890 / 中華神話)。原著**全公有領域** ✅。CLAUDE.md 也有「No Disney 1950 elements」意識 ✅。

**風險點**:若某段改編是**抄特定現代版權譯本/改寫** (例如某出版社的英文重述、迪士尼特定情節),才有風險。

**改善方案**:
- 確認 lessons 的英文重述是**原創改寫** (自寫 / AI 生成原創),非貼某本受版權書。
- 維持「避開迪士尼專屬元素」(灰姑娘的南瓜車細節、特定角色名等若來自迪士尼版要避)。
- 各章標一行 source 註記 (公有領域出處 + 改編為原創) 存 `docs/content-provenance.md`。

### 🟡 R6 — 商標「Pickup / 拾光」

**現況**:未查是否已被他人在「教育 app」類別註冊。這跟「抄 Duolingo」無關,是另一條 IP 線。

**改善方案**:
- 上架/收費前,在 TIPO (台灣智慧財產局) + USPTO + App Store 搜尋「Pickup」「拾光」於教育/軟體類。
- 「Pickup」是常見字,很可能已有人註冊 → 可能要想差異化品牌或副標。

### 🟢 R7 / R8 — 字型 / 專利

- 字型 Nunito / Noto Sans TC = SIL OFL,商用免費 ✅。
- Duolingo 持有部分方法專利,但對小 app 執行不切實際,且 SRS/MC/gamification 多為 prior art。**實務上可忽略**,規模化再評估。

---

## 3. 行動清單 (依 ROI)

| 優先 | 動作 | 成本 | 誰做 |
|------|------|------|------|
| ⭐1 | 公開頁面 (cockpit/qa/ui-ux-standard) 清「copy Duolingo」字眼 → 中性詞 | 低 (1 session) | Claude 可做 |
| 2 | 人眼比對 mascots/icon 是否像素級神似 Duolingo 專屬美術 | 低 | **你** (我判圖不可靠) |
| 3 | BGM 授權存證 → `docs/licenses/` | 低 | 你 (需截圖 Pixabay 頁) |
| 4 | 故事改編原創性確認 + `docs/content-provenance.md` | 中 | 你 + Claude |
| 5 | 商標搜尋「Pickup/拾光」(TIPO/USPTO/App Store) | 低 | 你 |
| 6 | 商業上架前找智財律師做 trade dress + TM clearance | $$ | 你 (專業) |

**最重要 + 最簡單先做 = ⭐1**(清掉公開的「抄 Duolingo」文字,移除故意侵權的把柄)。其餘多為「上架前」的人工/法律步驟。
