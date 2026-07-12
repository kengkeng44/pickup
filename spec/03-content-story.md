# 03 — 內容 / 故事規格

> 讀法見 `spec/README.md`:Baseline 只寫實測過、可重跑指令驗證的事實;Delta 寫下一步 + 可判斷完成的驗收條件。

實測日期:2026-07-12。實測方式:`node -e` 直接讀 `public/lessons-ch*.json` 逐檔算 lessons/questions 數,並讀 `src/data/storyRegistry.ts` 對照章節與故事 ID;`CLAUDE.md` 186-227 行(Story Framework 段)當設計來源比對,不採信其未經驗證的敘述,有出入處在對應小節註記。

---

## Baseline(現狀,可驗)

### 1. 原始設計框架(CLAUDE.md 186-227,設計來源,非實測)

- **「奶奶的 8 個說故事夜晚」(v2.0)**:Slice-of-life、Arabian Nights 結構,每章 = 一個 storytelling evening。
  - **Outer frame**(8 章 recurring):Mochi(三花貓/流浪)每晚跳上奶奶矮牆、Hana(柴犬/奶奶養)趴腳邊、奶奶翻書講故事;Mochi 與 Hana 是「聽眾」,不是 inner story 主角。
  - **8 章 inner story map**:Ch1 雨夜小貓(meta-anchor)/ Ch2 桃太郎 / Ch3 醜小鴨 / Ch4 龜兔賽跑 / Ch5 駱駝為什麼有駝峰 / Ch6 Baba Yaga 雞腳屋 / Ch7 六隻天鵝 / Ch8 三隻小豬,每章搭配 2 篇 Aesop side story。
  - **章內結構設計值**:每章 24 lessons(3 outer-prologue + 12 main-story + 6 aesop-side + 2 outer-outro + 1 review),每 lesson 5-15 Q。
  - 難度:A2(CEFR)。
  - Source of truth:`docs/superpowers/specs/2026-05-29-pickup-duolingo-nested-redesign.md`(v2.0 誕生於此份 brainstorm spec)。
- **內容模型 v2.0**:Duolingo-nested — `LessonSchema` discriminated union,每章拆多個 lesson,每 lesson 內多題,取代 v1.x「單章一路到底」結構。

### 2. 實測現狀(章檔 / lessons / questions)

實測指令(見附錄)逐一讀取 `public/lessons-ch0.json` ~ `lessons-ch31.json`,結果:

```
章檔數 = 32(ch0 ~ ch31)
總 lessons = 224
總 questions = 2472
```

逐章分布(實測,`node` 逐檔輸出):

| 章節 | lessons | questions |
|---|---|---|
| ch0 | 7 | 78 |
| ch1 ~ ch27, ch29 ~ ch31(共 30 章) | 7 | 77 |
| ch28 | 7 | 84 |

- **32 章全數是「7 lessons / ~77 questions」的均勻模板**,唯 ch0(78,+1)與 ch28(84,+7)略多。224 = 32 × 7 剛好整除,證實這是統一模板而非零散擴充。

### 3. 如實對帳:CLAUDE.md「8 章框架」vs 實測 32 章

CLAUDE.md 描述的是 **v2.0 最初設計願景**(2026-05-29 起筆,8 章 outer frame + 每章 24 lessons),但**實際 ship 的內容用了不同的執行模板**:

- **每章 lessons 數不符**:設計值「24 lessons/章」,實測全數章節是「7 lessons/章」。無任何章節達到 24。判定:v2.0.0 初版(Ch1)可能曾實作過 24-lesson 結構(CLAUDE.md v2.0.0 條目寫「Ch1 v2.0 24 lessons / ~110 Q」),但**現行 `public/lessons-ch1.json` 實測是 7 lessons / 77 Q**,與該歷史條目不符 —— 代表 Ch1 後續被重寫/精簡成統一的 7-lesson 模板,CLAUDE.md 版本史未同步更新此點。
- **章節數量遠超 8 章**:實測 32 章(ch0-ch31),不是設計的 8 章。對照 `src/data/storyRegistry.ts`(v2.0.B.242 起的 110-entry story metadata DB,見檔案開頭註解):
  - **ch0** = "ground floor"(zero-base ABC/numbers/colors 教學),獨立於故事章節之外,作為 onboarding 用。
  - **ch1-ch26** = 已 ship 的故事章節(`storyRegistry.ts` 註解:"27 shipped (Ch0 ground floor + Ch1-Ch26)"),對應 CLAUDE.md 版本史 v2.0.B.221-249 條目「Ch2-7 lessons-ch{N}.json full rewrite」「Ch8-9 灰姑娘 ship」「Ch22-26 歷史故事 ship」等多輪擴充,已遠超原始 8 章 inner story map。實測 `lessons-ch8.json` 內 `storyId: "three-pigs"` 印證 Ch8 = CLAUDE.md 設定的「三隻小豬」。
  - **ch27-ch31**(共 5 章)= 版本史未逐一列出章節號的後續擴充,存在於 `public/` 但未在 storyRegistry 27-shipped 註解範圍內明確覆蓋,實際內容/故事對照未逐章核實,留待後續盤點。
- **結論**:8 章 outer frame + 24 lessons/章是「設計藍圖」,32 章 + 7 lessons/章均勻模板是「實際執行結果」。兩者是同一產品不同階段的紀錄,不是互相矛盾的兩份 spec —— 但 CLAUDE.md 正文（186-227 行）仍原封保留最初設計敘述，未隨 v2.0.B.221+ 的執行模板變更同步改寫，讀者需以本節「實測現狀」為準。

### 4. 內容品質已知缺口

- Mirror-lint warning 現況 **65 筆**（`X2_OPTION_LIST_BIAS` 46 / `X3_R1_VERBATIM_WORDS` 系列 12 / `R1_SUBSTRING` 7），詳細分類與修正優先序見 `spec/01-game-mechanics.md` D2 節,不在本文件重複列出。

---

## Delta(目標,含驗收條件)

### D1. Ch 內容品質對齊 standard(mirror-lint 清零)

- **目標**:65 → 0(與 `spec/01-game-mechanics.md` D2 同一驗收條件,此處僅從內容/故事角度重申優先序)。
- **驗收條件**:
  - 逐章跑 `node tools/validate-lessons.js`,尾行 `Total mirror-lint issues:` 為 0。
  - 優先處理量體最大的 `X2_OPTION_LIST_BIAS`(佔 46/65 ≈ 71%,多為選項共用相同起始詞的格式線索問題,直接影響故事理解類題目的鑑別度)。
  - 修正不可破壞 `LessonsSchema` 驗證,亦不可改變已核實的 storyId/storyBeat 對應（例如 Ch8 three-pigs）。

### D2. ch27-ch31 章節內容盤點

- **現況**:5 章存在於 `public/`,均為 7 lessons/77 Q 標準模板,但未逐章核實 storyId/故事對應(不同於 ch1-ch26 已有 storyRegistry 27-shipped 註解佐證)。
- **驗收條件**:
  - 逐章讀取 `lessonInChapter=1` 的 `storyId` 欄位(同本文件驗證 ch8 的方法),列出 ch27-ch31 對應的故事名稱。
  - 與 `src/data/storyRegistry.ts` 110-entry 表比對,確認是否已收錄為 shipped entry;若未收錄,標記為文件缺口待補。

### D3. 完成全部章節後解鎖什麼

- **狀態**:待決(CLAUDE.md Open Questions 未見明確答案,本次實測未在代碼中找到「全章完成」判定邏輯或對應解鎖分支 — 需另行搜尋確認是否已有實作,或純屬未決的產品問題)。
- **選項**(供決策參考,非代碼實測):
  - **B1 題庫解鎖**:完成 A2 全部章節後開放 B1 難度內容(對齊 CEFR 進階)。
  - **續集章節**:從 `storyRegistry.ts` 110-entry 表中的「73 短篇候選 + 10 中長篇候選」挑選下一批 ship。
  - **Cosmetic 獎勵**:角色裝飾 / 徽章 / 稱號等非內容型獎勵,不需新題庫產出成本。
  - **不設解鎖(現狀延伸)**:章節完成僅計入 XP/streak/achievement,不额外開放新內容層。
- **驗收條件(待此項決定後補上)**:選定選項後,需在對應章節完成判定處（`runStore.ts` 或 `MapView`/`StoryEndingScene` 相關邏輯)實作觸發點,並更新本節從「待決」改為「已定案 + 驗收條件」。

---

## 附錄:實測指令記錄

```bash
cd /c/Users/acer/Desktop/pickup

# 章檔數 / 總 lessons / 總 questions(頂層 array 或 {lessons:[]} 兩種格式都處理)
node -e "const fs=require('fs');let C=0,L=0,Q=0;fs.readdirSync('public').filter(f=>/lessons-ch\d+\.json/.test(f)).forEach(f=>{const d=JSON.parse(fs.readFileSync('public/'+f));const ls=Array.isArray(d)?d:(d.lessons||[]);C++;L+=ls.length;ls.forEach(l=>Q+=((l.questions||l.items||[])).length)});console.log('章檔='+C,'lessons='+L,'questions='+Q)"

# 章編號範圍
ls public/lessons-ch*.json | sed 's/.*lessons-//;s/.json//' | sort -V | tr '\n' ' '

# 逐章 lessons/questions 分布
node -e "
const fs=require('fs');
fs.readdirSync('public').filter(f=>/lessons-ch\d+\.json/.test(f)).sort((a,b)=>{
  const na=+a.match(/ch(\d+)/)[1], nb=+b.match(/ch(\d+)/)[1]; return na-nb;
}).forEach(f=>{
  const d=JSON.parse(fs.readFileSync('public/'+f));
  const ls=Array.isArray(d)?d:(d.lessons||[]);
  let q=0; ls.forEach(l=>q+=((l.questions||l.items||[])).length);
  console.log(f.padEnd(20), 'lessons='+ls.length, 'questions='+q);
});
"

# Ch8 storyId 對照確認(驗證 storyRegistry 註解對應到實際章檔)
node -e "const fs=require('fs');const d=JSON.parse(fs.readFileSync('public/lessons-ch8.json'));console.log(JSON.stringify(d).slice(0,600));"
```
