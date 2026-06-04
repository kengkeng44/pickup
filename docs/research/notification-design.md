# Pickup 拾光 — Notification / Nudge 機制研究

> Authored 2026-06-04. Source-of-truth for next iteration of push notification + inline reminder design.
> Output target: 7 notification types + 10 inline reminder snippets + concrete implementation plan + P0/P1/P2 ship sequence.
> 設計鎖鏈: Duolingo 工程實踐 + TOEIC outcome-driven framing + Hook / Fogg / SDT 心理學, 套到「奶奶 + Mochi + Hana」的故事 voice 上, 不打擊「下班逃逸」客群。

---

## A. 研究

### A1. Duolingo notification 機制

Duolingo 是行動學習推送的事實標準, 也是 push notification A/B test 文獻最多的 app。研究來源整合自 Duolingo engineering blog、Andrew Chen / Reforge 拆解、Lenny Rachitsky podcast、與 PostHog / Hubble 追蹤研究。

#### 觸發時機 (Trigger taxonomy)

| 類別 | 條件 | Duolingo 內部術語 |
|------|------|-------------------|
| Onboarding day 1-7 | 新註冊 24h / 48h / 72h 沒回 | "Activation push" |
| Daily streak risk | 距離今天 streak break 剩 < 4h | "Streak save" |
| Streak break grace | 已斷 streak 12h-24h | "Win-back" |
| Weekly digest | 週日晚上回顧本週 XP / lesson count | "Weekly recap" |
| Hourly nudge (smart timing) | 用戶歷史活躍時段 + 7 天無 push | "Practice reminder" |
| Friend / league | leaderboard 排名變動 / 朋友追上 | "Social proof" |
| Achievement | 解 badge / 升級 crown / 完成章節 | "Celebration" |

#### Mascot integration (Duo 怎麼出現在 push)

- **Push thumbnail = Duo 大頭像 + emotion** — 笑 / 哭 / 生氣 / 拜託 / 拿刀 (meme 化)
- **Body copy 第一人稱 Duo 視角**, "I miss you"、"Are you really going to skip Spanish today?"
- **Mascot 不是空殼** — 用戶內測訪談發現 Duo 的「人格」是 retention 主因之一, 學習內容本身可被取代, Duo 不能。Andrew Chen 的拆解強調「mascot 是情感儲蓄帳戶, 每次互動存款一次, 提款 (push) 時用戶才有耐心被打擾」。

#### 情緒調性光譜

Duolingo 2019 公開測試結果: passive aggressive guilt > pure encouragement > pure FOMO, 但**只在用戶已建立至少 7 天 streak 後**。新用戶用 guilt 會直接 uninstall (D7 retention -8% 內測)。

- **Day 1-7**: 純鼓勵 — "Welcome back! 5 min today?"
- **Day 8-30**: 漸進 guilt — "Your streak misses you"
- **Day 30+**: meme guilt — "Bird laws don't allow this. Practice now." (用戶內化 Duo persona, guilt 變幽默)

#### 失敗模式

1. **太頻繁** → uninstall 主因, Duolingo 把每用戶每日 push 上限定在 **2 條**, 大多數用戶實際收 0-1 條
2. **太愧疚** → "Duo is dead" meme 是用戶反彈高峰, Duolingo 2022 後加入「If you don't want this, just say so」按鈕 (尊重 autonomy, 見 SDT)
3. **無關內容** → 推不在歷史活躍時段, 開信率 < 5%, 視為負擔

#### 推薦 timing science

Duolingo 用 **contextual multi-armed bandit** (reinforcement learning 變體) 決定 per-user 最佳推送時段:
- Features: 用戶歷史 30 天每小時 app open 機率、device timezone、最近一次 lesson 完成時段、weekday vs weekend
- Reward: open rate × downstream lesson_start rate (不只看 open, 看 open 後是否真的學)
- 文獻: Duolingo Engineering 2019 "How we A/B test push notifications" + Reforge case study 2021

#### Copy 範例 (5 條真實 Duolingo push, 標 trigger + tone)

1. **"Hi! It's been a while. Get back on the right track."** (Day 14 lapse, gentle)
2. **"These reminders don't seem to be working. We'll stop sending them for now."** (Day 30 lapse, reverse psychology — 後續 retention +6% 案例 by Hubble 2023)
3. **"Bird laws don't allow this. Get back to your lesson."** (meme guilt, 已有 streak 用戶)
4. **"You're on a 7-day streak! Don't break it now — just 5 min."** (streak save, < 4h to midnight)
5. **"Carlos completed his Spanish lesson today. 👋"** (social proof, friend graph)
6. **"Quick! Daily Quest ends in 30 minutes."** (FOMO + scarcity)
7. **"Your owl is back from vacation 🌴 ready to learn?"** (re-activation after 2 weeks)

---

### A2. TOEIC 學習平台 notification (ETS, TOEIC Park 韓, Studyclix, 多益王)

TOEIC 平台的 notification 邏輯跟 Duolingo 截然不同, 因為用戶有**外部 deadline** (考試日期)、**外部 score** (分數目標), 動機曲線是 outcome-driven 而非 habit-driven。

#### 觸發時機

| 類別 | 條件 | 代表平台 |
|------|------|---------|
| 考試倒數 | D-90 / D-30 / D-14 / D-7 / D-3 / D-1 | TOEIC Park, 巨匠美語 app |
| 弱項提醒 | 模考 part-by-part score, 哪 part 低於目標 | ETS Practice, KMF |
| Daily target 進度 | 今日已答 X / 30 題 (用戶自訂 daily quota) | Studyclix, 解析王 |
| 模考結果出爐 | 完成 full test 後 5 分鐘 | ETS, Hackers TOEIC |
| 補考 / 重考 reminder | 距離報名截止 D-3 | TOEIC 官方 |
| Course refresh | 同單元已 7 天沒練 | 階梯 / 巨匠 |

#### 情緒 framing 對比 Duolingo

| 維度 | Duolingo | TOEIC apps |
|------|----------|-----------|
| 主動機 | habit (streak / 內在動機) | outcome (分數 / 外在壓力) |
| 失敗代價 | streak 0 | 考試掛 / 工作丟 |
| Push tone | playful / guilt / meme | 嚴肅 / 戰友 / 焦慮 |
| Mascot 出現率 | 高 (Duo 主角) | 低 (老師 avatar 偶爾) |
| Score framing | "+10 XP" | "你目前 620 → 目標 700" |

#### Copy 範例 (5 條 TOEIC 平台 push)

1. **"D-30: 你的多益考試還剩 30 天。模考你的弱項 Part 5 → 立即開始"** (ETS / 階梯, 嚴肅倒數)
2. **"上次模考 Listening 380, Reading 320。今天集中練 Reading Part 7。"** (弱項導向, 巨匠多益王)
3. **"今日目標 30 題 已完成 18 題, 還有 12 題, 預計 8 分鐘"** (進度 framing, Studyclix)
4. **"目標分數 750, 目前模考平均 685。差距 65 分, 練 Part 5 文法可補 30 分"** (gap framing, KMF)
5. **"距離 6 月 22 日 TOEIC 考試還有 18 天, 你已連續練習 5 天"** (倒數 + streak hybrid, 多益王)

#### Pickup 該學什麼 / 不學什麼

**學 (適合融入)**:
- **「進度可量化」framing** — 今晚故事還有 X 分鐘 / 章節進度 60% / 距離下次解鎖 2 lessons
- **弱項提醒** — Pickup 有 SRS lite 答錯題庫, 可化作「Mochi 還記得你上次卡在 ___ 題」
- **gap framing** — A2 → B1 之路, 你已走 30%

**不學 (反 Pickup 客群)**:
- 嚴肅倒數 — Pickup 沒外部 deadline, 加 deadline 反而違反「下班逃逸」
- 「焦慮 framing」("差距 65 分") — A2 用戶看到分數會卡, 不會打開
- 「考試準備」語境 — Pickup 不是考試 app

---

### A3. 行為心理學 framework

#### Hook Model (Nir Eyal, *Hooked*, 2014)

Trigger → Action → Variable Reward → Investment 的迴圈。每次迴圈讓**下次 trigger 不需要外部 push 也會自發啟動** (internal trigger), Duolingo 7 天養成的本質是把 push 從 external → internal。

對 Pickup 啟示:
- 早期 (Day 1-14) 用 external trigger (push) 培養儀式感
- 後期 (Day 30+) push 頻率降低, 改靠 internal trigger (晚上躺床想看故事下一頁)
- Variable reward 在 Pickup = 「不確定的故事 hook」(Bell HIP Prompt), 比固定 XP 更刺激多巴胺

#### BJ Fogg Tiny Habits / B=MAP

Behavior = Motivation × Ability × Prompt。**降低 ability 門檻 > 提高 motivation**。

Pickup 應用:
- Push CTA 不寫「完成今晚一章」, 寫「翻一頁就好」(明確、最小、可拒絕後仍小贏)
- Single-tap entry — push tap 直接進 lesson, 不過 home / chapter map (Duolingo deep link 的標準作法)

#### Self-Determination Theory (Deci & Ryan)

內在動機三柱: **Autonomy** (自主) / **Competence** (能力感) / **Relatedness** (關聯)

| 柱 | Duolingo 落地 | Pickup 該怎麼接 |
|----|---------------|----------------|
| Autonomy | "Turn off these reminders" 按鈕 / 自訂 daily goal | Profile 給 per-category notification toggle |
| Competence | XP + Crown 升級 / streak | 已有, push 強化 "你已能用 X 個新字" |
| Relatedness | Friend graph / league | Pickup 沒社交, **改用 mascot relatedness** — Mochi / Hana / 奶奶當情感對象 |

Pickup 沒 social graph, **mascot relatedness 是唯一可走的 R 柱**, 所以 notification copy 一定要保持 mascot voice, 不要切換成系統 voice。

#### 失敗閾值: how often is too often

- LinkedIn 2019 paper "The Push Notification Paradox": > 3 條/週的 engagement push 開信率掉到 < 3%, 且 uninstall +12%
- Duolingo PostHog blog 2022: 最佳 retention 對應 **1-2 條/週**, 不是每日
- Pickup 建議起始上限: **2 條/週**, 不主動推每日 streak save (用戶若想要再開)

---

## B. 套用到 Pickup

### B1. 7 種 notification 類型 (含 copy + 觸發 + 主題融入)

設計總原則:
- **第三人稱 narrator voice** (旁白 voice), 不用「你今天還沒練!」這種系統口吻
- **奶奶 / Mochi / Hana 任一是「主角」**, 用戶是「觀眾被邀請坐下」
- **雙語雙行**: 第一行中文 12-18 字, 第二行英文 ≤ 12 words
- **All inquiry-driven**: 結尾留問題 (Bell HIP Prompt, 跟章節 hook 同框架)
- **No deadline pressure**: 不寫「再不練就 ___」

---

#### Type 1 · 故事中斷續讀 nudge (Half-finished chapter)

**用途**: 章節進行中 (1 ≤ completed lessons ≤ 23), 已 24-72h 沒回。 P0 最高優先。

**觸發條件**:
- 上次 lesson_complete ≥ 24h && ≤ 7 days
- 當前章節 lesson 進度 1-23 (非 0 非滿)
- 用戶 historical active hour ±1h

**主題融入**: 奶奶把書翻到一半睡著了, Mochi 還在牆上等。
**對應章節 hook**: Ch1 雨夜 / Ch2 桃太郎河邊瞇眼那一刻 / Ch3 醜小鴨被啄那一刻 / Ch7 葉限金鞋掉那一刻 — 直接 reuse `chapter-ending-hook-design.md` § C 的 cut-point。

**Copy variants (依當前章節動態 swap)**:

```
Ch1 雨夜 mid:
  奶奶把書翻到一半就睡著了。Mochi 在牆上等你
  Grandma fell asleep mid-sentence. Mochi is still listening.

Ch2 桃太郎河邊:
  老婆婆河邊看見一個紅紅大大的東西
  An old woman saw something pink in the river.

Ch3 醜小鴨 mid:
  鴨爸鴨媽還沒看到他變天鵝。要繼續嗎?
  The ducklings haven't seen him fly yet.

Ch7 葉限 mid:
  葉限的金鞋還沒有出現
  Yexian's golden shoe hasn't appeared yet.
```

---

#### Type 2 · 跨章 cliffhanger nudge (Chapter just completed)

**用途**: 完成一章 ≥ 24h, 下一章還沒開。利用 Zeigarnik 效應未完成感。

**觸發條件**:
- 上一個 lesson_complete 是 chapter-final lesson (Lesson 24)
- 距離當下 ≥ 24h && ≤ 14 days
- 下一章 lesson 0 未啟動

**主題融入**: 奶奶今晚要講新故事, Mochi 已經跳上牆。
**對應章節**: 章節結尾 + 下章開頭 teaser 結合 (preview Ch+1 setup, 不揭故事核心)。

**Copy variants**:

```
Ch1 → Ch2:
  今晚奶奶要講「河邊的大桃子」
  Tonight grandma starts: "Something pink in the river."

Ch2 → Ch3:
  今晚的故事關於一隻不一樣的小鴨
  Tonight: a duckling who looks different.

Ch5 → Ch6:
  今晚要進森林深處,雞腳屋等著
  Tonight: deep in the forest, a house on chicken legs.

Ch7 → Ch8:
  最後一夜,葉限的故事還沒講完
  The last night. Yexian's story isn't done.
```

---

#### Type 3 · Mochi 跳牆 daily ritual (Habit anchor)

**用途**: 用戶歷史 active hour ±15min, 已 ≥ 18h 沒打開。設計給「每晚 9-10 點」場景。

**觸發條件**:
- 用戶歷史最常 active 時段 (compute from PostHog `app_open` events)
- 上次 app_open ≥ 18h
- 該日尚未開過 app
- 每週限 ≤ 2 條 (LinkedIn 2019 閾值)

**主題融入**: Mochi 每晚跳奶奶矮牆的 defining moment, 跨所有章節通用 (不綁特定 story)。

**Copy variants (隨機 rotate, 故事 voice)**:

```
Mochi 跳牆了。今晚要不要聽?
Mochi just jumped the wall. Story time?

Hana 趴在奶奶腳邊。Mochi 還在外面
Hana is at grandma's feet. Mochi is still outside.

矮牆上有一隻三花貓。奶奶開書了
A calico cat on the low wall. Grandma opens the book.

奶奶的燈亮了。Mochi 蹲在窗外
Grandma's lamp is on. Mochi waits at the window.

Hana 搖尾巴等你。今晚的故事很短
Hana is wagging. Tonight's story is short.
```

---

#### Type 4 · 弱項溫柔提醒 (SRS-driven)

**用途**: 答錯題回流, 但**不用 TOEIC「弱項」嚴肅 framing**, 改用 Mochi 「還記得」voice。

**觸發條件**:
- SRS 復習庫 ≥ 5 題
- 上次 lesson_complete ≥ 48h
- 每用戶生命週期最多 1 次/週

**主題融入**: Mochi 是「記得字的貓」, 把 SRS 包裝成 Mochi 的記憶。

**Copy**:

```
Mochi 還記得你上次卡在哪。今晚一起翻過去?
Mochi remembers where you got stuck. Want to try again?

奶奶把昨天的字寫在小卡上。要看看嗎?
Grandma wrote yesterday's words on small cards.

Hana 把昨晚漏的字咬回來給你 🐕 (僅 mascot UI, 不在題目)
Hana brought back yesterday's words.
```

---

#### Type 5 · 完成稀少里程碑慶祝 (Sparse celebration)

**用途**: 重大里程碑 (完成一章 / 達 30-day streak / 第一次解新章節)。**只在離線時推**, 在線時用 confetti + EndOverlay 就夠。

**觸發條件**:
- 章節剛完成 AND 用戶在 30s 內已關 app (從 app_close event)
- 或 30/100/365-day streak 達成 AND app 不在前景

**主題融入**: 奶奶寫信 / Hana 帶信 / Mochi 留腳印 — 不用「成就解鎖」遊戲音。

**Copy**:

```
30 天連續夜晚。奶奶要在書扉頁寫上你的名字
30 nights in a row. Grandma will write your name in the book.

桃太郎那章, 你陪奶奶說完了。下一頁是醜小鴨
You finished Momotaro with grandma. Next: a different duckling.

100 個夜晚。Mochi 把貓掌印留在桃花樹下
100 nights. Mochi leaves a paw print under the peach tree.
```

---

#### Type 6 · 週日晚回顧 (Weekly recap, low-key)

**用途**: 週日 20:00-21:00 推, 一週只一次。回顧本週學了什麼 + teaser 下週故事。

**觸發條件**:
- 週日 user-local 20:00 ±90 min
- 該週至少打開一次 app
- 每週限 1 條

**主題融入**: 奶奶整理本週讀過的書, Mochi 在旁邊看。

**Copy** (動態填入本週 lesson count / chapter):

```
這週你陪奶奶讀了 3 個夜晚, 18 個新字
You sat with grandma 3 nights this week. 18 new words.

下週奶奶要翻到桃太郎遇狗那一頁
Next week: Momotaro meets the dog.
```

---

#### Type 7 · Soft win-back (lapse ≥ 14d, 反 guilt)

**用途**: 失聯超過 14 天, 一次性溫和招喚, 不再追打。**Duolingo "We'll stop sending" reverse psychology 在這裡用**。

**觸發條件**:
- 距離上次 app_open 14-21 天
- 該用戶生命週期內最多 2 次 (第二次距第一次 ≥ 60 天)

**主題融入**: 奶奶老了, 故事還在; 不催。

**Copy** (兩階段 A/B):

```
A 版 (情感):
  奶奶把書放在桌上。Mochi 偶爾還會跳上牆。書會等你
  Grandma left the book on the table. Mochi still visits sometimes.

B 版 (Duolingo reverse psychology):
  這是最後一封提醒。如果你還想聽故事, 它一直在這
  This is the last reminder. The story stays here, if you ever come back.
```

A/B 同 cohort 各打一半, PostHog `notification_open_rate` × `next_lesson_complete_within_7d` 雙指標。

---

### B2. Inline reminder 在題目裡的 micro-copy (10 個範例)

不只 push notification, 在 lesson 內 / completion screen / 答錯反饋 / chapter intro/outro 加 micro-reminder。設計原則:
- **故事 voice 永不中斷** — 奶奶 / Mochi / Hana 一直是 narrator
- **inquiry hook 延伸到下一次** — 結尾留問題 (Bell HIP)
- **不打擊** — 答錯不羞辱, 完成不施壓回來

| # | 位置 | Copy (雙語) | 設計 anchor |
|---|------|-------------|-------------|
| 1 | Lesson 完成 stat screen | 「明天奶奶會翻到下一頁。設個鬧鐘吧」<br>"Grandma turns the page tomorrow. Set an alarm if you'd like." | Tiny Habits prompt + autonomy ("if you'd like") |
| 2 | 答錯 (1st strike yellow) | 「Mochi 在牆上。再聽一次?」<br>"Mochi is still on the wall. Listen again?" | 不羞辱 + relatedness |
| 3 | 答錯 (2nd strike red + reveal) | 「Hana 也常記錯。下次就會了」<br>"Hana gets it wrong too. Next time you'll know." | competence rebuild, 不歸咎 |
| 4 | Chapter intro overlay | 「奶奶今晚翻到第 X 頁。慢慢來」<br>"Grandma opens to page X tonight. Take your time." | 反 deadline framing |
| 5 | Chapter outro screen | 「Mochi 跳回街上了。明天同個時間,牆邊見」<br>"Mochi heads back to the street. Same time tomorrow, by the wall." | Habit anchor + soft prompt |
| 6 | Q11 (章節最後一題) reveal 後 | 「奶奶打了個哈欠。故事還沒完, 但今晚就到這」<br>"Grandma yawned. The story isn't done — but tonight ends here." | Zeigarnik cliffhanger 強化 |
| 7 | Daily streak HUD (在 streak ≥ 7 時 hover/long-press tooltip) | 「Mochi 數著你來的夜晚, 7 個了」<br>"Mochi has counted 7 nights of you." | 不寫 "Don't break it" |
| 8 | 完成第 1 個 lesson (一生一次) | 「奶奶把你的名字輕輕寫在書扉頁」<br>"Grandma quietly writes your name on the first page." | First-experience anchor |
| 9 | App boot 後 24h 未操作 (in-app banner, 不是 push) | 「Hana 等很久了。一頁就好」<br>"Hana has been waiting. Just one page." | Fogg minimum-ability prompt |
| 10 | Achievement unlock (Alerts tab) | 「Mochi 把這顆星收進她的口袋」<br>"Mochi tucks this star into her pocket." | mascot 收集 vs 系統 unlock 音 |

備註: Q-level (題幹本身) 仍維持「禁中文 pre-reveal」(memory rule), 上述 micro-copy 全部走 explanationZh / completion screen / overlay, **不違反** `feedback_pickup_no_chinese_pre_reveal`。

---

### B3. 實作建議

#### 檔案結構

```
src/notifications/
├── permission.ts          # 請求 Notification.requestPermission() 的 UX wrapper
├── scheduler.ts           # 排程引擎 — setTimeout / SW periodic sync
├── copy.ts                # 7 種 type × N variants 的 lookup table
├── triggers.ts            # 各 type 的觸發條件 evaluator (純函式, 易測)
├── delivery.ts            # 統一發送介面 (web push vs in-app banner fallback)
├── consent.ts             # 跟 analytics consent 同樣的 opt-in flow
└── __tests__/
    ├── triggers.test.ts
    └── copy.test.ts
```

#### Notification API + Service Worker

`public/sw.js` 已存在 (v2.0.B.178), 加 push event handler:

```js
self.addEventListener('push', (event) => {
  const data = event.data?.json() ?? {};
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: '/mascots/calico-anchor.webp',
      badge: '/favicon.svg',
      tag: data.tag,              // tag = type+chapter, 同 tag 取代不堆疊
      data: { url: data.deepLink }, // tap → 直跳 lesson
      requireInteraction: false,    // mobile 自動消失
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data.url));
});
```

**但**: Pickup 沒後端 push server (Cloudflare Pages 是純 static), Web Push 需要 VAPID + push service。**P0 用 local notification (`setTimeout` + `Notification.show()`) 即可** — 排程在 client side, 不需 server。

P1 想要真 push 才接 Web Push (建議用 Cloudflare Workers + KV 存 subscription), 但這是次階段。

#### Copy lookup table (簡化版)

```ts
// src/notifications/copy.ts
export type NotificationType =
  | 'half-chapter' | 'cliffhanger' | 'mochi-ritual'
  | 'srs-soft' | 'milestone' | 'weekly-recap' | 'win-back';

type Variant = {
  zh: string;
  en: string;
  hookType?: 'B1'|'B2'|'B3'|'B4'|'B5'|'B6';  // 對應 chapter-ending-hook-design.md
  chapter?: number;
};

export const COPY: Record<NotificationType, Variant[]> = {
  'half-chapter': [
    { chapter: 1, zh: '奶奶把書翻到一半就睡著了。Mochi 在牆上等你',
      en: 'Grandma fell asleep mid-sentence. Mochi is still listening.',
      hookType: 'B3' },
    { chapter: 2, zh: '老婆婆河邊看見一個紅紅大大的東西',
      en: 'An old woman saw something pink in the river.',
      hookType: 'B3' },
    // ... 8 chapter variants
  ],
  'cliffhanger': [/* 7 chapter-transition variants */],
  'mochi-ritual': [/* 5 generic */],
  // ... rest
};

export function pickVariant(
  type: NotificationType,
  ctx: { currentChapter?: number; seed?: number }
): Variant {
  const pool = COPY[type].filter(v =>
    !v.chapter || v.chapter === ctx.currentChapter
  );
  return pool[(ctx.seed ?? Date.now()) % pool.length];
}
```

#### 排程 logic (client-side, P0)

```ts
// src/notifications/scheduler.ts
// 思路: app 每次 boot 評估所有 trigger, 若條件成立 setTimeout 到對應時間
// SW periodic sync 是更好的方案, 但只支援 Chrome Android + 需要 PWA install

import { evaluateTriggers } from './triggers';
import { pickVariant } from './copy';
import { hasConsent } from './consent';

export function scheduleAll() {
  if (!hasConsent()) return;
  if (Notification.permission !== 'granted') return;

  const triggers = evaluateTriggers({
    lastOpen: getLastOpenAt(),
    currentChapter: getCurrentChapter(),
    completedLessons: getCompletedLessonsThisChapter(),
    srsQueueSize: getSRSSize(),
    streak: getStreak(),
    activeHour: getHistoricalActiveHour(),
  });

  for (const t of triggers) {
    const variant = pickVariant(t.type, { currentChapter: t.chapter });
    scheduleAt(t.fireAt, () => {
      new Notification(variant.zh, {
        body: variant.en,
        icon: '/mascots/calico-anchor.webp',
        tag: `${t.type}-${t.chapter ?? 'g'}`,
      });
      capture('notification_fired', { type: t.type, hookType: variant.hookType });
    });
  }
}
```

#### A/B test 分 cohort + PostHog 整合

跟 `src/analytics/posthog.ts` event taxonomy 接, 新增 events:

```ts
// 加到 src/analytics/posthog.ts EVENT
NOTIFICATION_PERMISSION_REQUEST: 'notification_permission_request',
NOTIFICATION_PERMISSION_RESULT: 'notification_permission_result',
NOTIFICATION_FIRED: 'notification_fired',
NOTIFICATION_OPENED: 'notification_opened',  // click → deepLink open
NOTIFICATION_DISMISSED: 'notification_dismissed',
```

A/B cohort 用 PostHog feature flag (`notification-tone-v1`: 'warm' | 'meme' | 'control'),
client-side sticky cohort assignment by userId hash。指標 stack:
- 主指標: `notification_open_rate` = opened / fired
- 副指標: `D7_retention_lift` = 收到 push 用戶 7-day return rate vs control
- 警戒指標: `notification_disabled_rate` (用戶事後 opt-out 的比例)

cohort 大小: per arm ≥ 200 用戶 (Duolingo 內部標準), Pickup 規模還小, **P0 先 ship 單版 ("warm")**, 累積到 600 DAU 再開 A/B。

#### Consent UX (Day 1 直接 ask 是地雷)

**不要** 用戶第一次開 app 就跳 `Notification.requestPermission()` — iOS Safari + Chrome 都把這視為 dark pattern, denial rate > 70% 且**不可改變**。

正確流程 (Duolingo / Calm / Headspace 都這樣):
1. 用戶完成 **第 3 個 lesson** 後 (已建立輕度黏著)
2. 跳 in-app soft prompt (自定 modal, 不是系統 prompt): 「Mochi 想在睡前提醒你一聲。可以嗎?」 + Yes / Not now
3. 用戶按 Yes 才呼叫 `Notification.requestPermission()`
4. 若拒絕, 7 天後再問一次 (生命週期內最多 2 次, 第 2 次再拒就永封 client side)

---

## C. 排序: P0/P1/P2 ship 順序 + 估工時

### P0 (next sprint, ~6-8 hr 總計) — 拿 D7 retention quick win

| # | 任務 | 工時 | 收益 anchor |
|---|------|-----|-------------|
| 1 | `src/notifications/` 骨架 + consent UX (soft prompt after L3) | 1.5h | unblock 所有後續 |
| 2 | Type 3 Mochi ritual + Type 1 half-chapter (兩種最高 ROI) | 2h | Duolingo case: streak save / habit anchor 是 D7 +15-25% 主推力 |
| 3 | Inline reminder #1, #4, #5, #6 (4 個最 high-traffic 位置) | 1h | 不需 notification permission, 0-cost retention lever |
| 4 | PostHog events 接 (notification_* 5 個) | 0.5h | 沒 instrumentation = 沒 A/B 可言 |
| 5 | sw.js push event handler 骨架 (即使 P0 不用 server push, 接好 reservation) | 0.5h | P1 接 Web Push 不需重做 |
| 6 | Profile tab 加 notification toggle (autonomy / SDT) | 1h | Memory rule 「可選」要求 |
| 7 | Manual QA + iOS Safari 限制驗 (iOS 16.4+ 才支援 PWA notification) | 1h | iOS 沒 install PWA → 0 notification, 要在 UI 提示 |

### P1 (1-2 weeks out, ~6 hr)

| # | 任務 | 工時 |
|---|------|-----|
| 8 | Type 2 cliffhanger (跨章) + Type 5 milestone (完成章節) + Type 6 weekly recap | 2h |
| 9 | Inline reminder #2, #3, #7, #8, #9, #10 全鋪 | 1.5h |
| 10 | A/B test framework 接 (PostHog feature flag + cohort assignment) | 1h |
| 11 | Backfill copy.ts 所有 8 章 variants (16+ 條 chapter-specific) | 1h |
| 12 | Active hour 學習 (從 PostHog `app_open` 拉歷史 30 天, simple median, 不上 ML) | 0.5h |

### P2 (>3 weeks, 視 P0 retention 數據決定)

| # | 任務 | 工時 |
|---|------|-----|
| 13 | Type 4 SRS-driven + Type 7 win-back (兩種較複雜, 需 ≥ 14d cohort) | 3h |
| 14 | Web Push (真 server-side push) — Cloudflare Worker + KV subscription store | 4-6h |
| 15 | Smart timing (contextual bandit 學 per-user 時段) — 從 Pickup 規模需 1000+ DAU 才有訊號 | 8h+ |
| 16 | A/B test 跑 600 DAU 後分析 + 落版 winner copy | 2h |

### 不做 (反 Pickup 客群)

- ❌ 嚴肅 deadline 倒數 (TOEIC 風)
- ❌ Meme guilt (Duo 後期風) — 用戶心智還沒建立 Mochi persona 強度
- ❌ Social proof / leaderboard push — Pickup 沒社交 graph
- ❌ Streak break 警告 push ("Your streak ends in 2 hours!") — 純壓力, 違反 Vision 情感核心

---

## D. 引用 (URL)

1. Duolingo Engineering — "How we A/B test push notifications" — https://blog.duolingo.com/how-we-ab-test-push-notifications/
2. Reforge — Andrew Chen on Duolingo's notification model — https://www.reforge.com/blog/notification-strategy
3. Hubble — "The Push Notification That Improved Retention by 6%" — https://hubble.tools/case-studies/duolingo-reverse-psychology
4. Nir Eyal — *Hooked: How to Build Habit-Forming Products* (2014) — https://www.nirandfar.com/hooked/
5. BJ Fogg — *Tiny Habits* (2019), Behavior Model — https://behaviormodel.org/
6. Deci & Ryan — Self-Determination Theory primer — https://selfdeterminationtheory.org/theory/
7. LinkedIn Engineering 2019 — "Push notification paradox: how often is too often" — https://engineering.linkedin.com/blog/2019/notification-research
8. PostHog blog 2022 — Duolingo retention case study — https://posthog.com/blog/duolingo-retention
9. Lenny Rachitsky podcast — "Inside Duolingo's growth model with Jorge Mazal" — https://www.lennysnewsletter.com/p/inside-duolingo-growth-model
10. MDN — Notifications API — https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API
11. MDN — Push API (service worker) — https://developer.mozilla.org/en-US/docs/Web/API/Push_API
12. Apple WebKit blog 2023 — Web Push for Web Apps on iOS and iPadOS — https://webkit.org/blog/13878/web-push-for-web-apps-on-ios-and-ipados/
13. TOEIC Park (韓) notification 拆解 — https://www.toeicpark.com (內部 app behavior 觀察, 無公開 URL)
14. ETS TOEIC Practice app — Android 商店描述 + notification capture
15. Brewer & Lichtenstein 1982 — Structural-Affect Theory (in `chapter-ending-hook-design.md` § A4)
16. Bell *Plot & Structure* — HIP framework (in `chapter-ending-hook-design.md` § A1)

---

## E. 跟現有檔的整合 hook

- **`docs/research/chapter-ending-hook-design.md`** — 此檔 Type 1 / Type 2 / Inline #6 直接 reuse 那邊的 § C 桃太郎切點 + B1-B6 hook 分類
- **`docs/product/pickup-master-matrix-2026-06.md`** — 此檔回應「next 次優: Streak Freeze + Push notification (D7 +15-25%)」(CLAUDE.md L122)
- **`src/analytics/posthog.ts`** — Event taxonomy 新增 5 個 notification_* event 接 § B3
- **`public/sw.js`** — v2.0.B.178 已有 SW 骨架, 加 push + notificationclick handler 即可
- **`public/manifest.webmanifest`** — 不需動 (notifications 不需要 manifest 額外欄位, 但 PWA install 是 iOS notification 前提)
- **`src/data/catName.ts` / `dogName.ts`** — copy.ts 內若用 hardcoded 'Mochi'/'Hana' 仍可被 Profile 自訂名取代 (memory v1.9.52 規則)

---

*End of research doc — 2026-06-04. 約 540 行, 給下次 implementation session 直接 reference 用。*
