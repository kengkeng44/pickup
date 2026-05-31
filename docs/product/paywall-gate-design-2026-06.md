# Pickup Paywall Gate Design — 2026-06-01

> 目標: 設計 free / premium 切分 + DEV_UNLOCK_ALL flip 路徑, 不傷 brand「下班逃逸」氛圍.
>
> Status: design draft. Implement 排在 Streak Freeze + PostHog 後 (per master matrix § E).

## A. 現狀 (B.161.1)

- `DEV_UNLOCK_ALL = true` (`src/data/storyKitten.ts`)
- B.109 額外 "open first 10 lessons per chapter" 邏輯
- 所有 198 lessons 全部解鎖 — production 沒 gate
- 無 account / login / 付費 / IAP 接線
- Profile tab 顯示 streak / XP / cat name 但**無付費 surface**

## B. Tier 切分 model 評估

### Model A — chapter gate (Ch1-2 free, Ch3-8 premium)

| 維度 | 評估 |
|---|---|
| Conversion trigger | 玩完 Ch1+Ch2 (48 lessons / ~280 Q / ~3-5 hr playtime) 觸發 paywall |
| Free 體驗充分? | ✅ 兩章故事完整 + Mochi/Hana 角色建立 + grandma 框架體驗 |
| Friction | 玩家 invested 時被擋, conversion ~5-8% (industry 標準) |
| Brand fit | 中等. 「下班逃逸」=低焦慮, 章節 gate 可接受 |
| Implement cost | M (3-5 人天, chapter map 加 lock state + paywall scene) |
| **推薦** | ⭐ **預設方案** |

### Model B — daily lesson cap (free 每天 3 lesson)

| 維度 | 評估 |
|---|---|
| Conversion trigger | 玩第 3 lesson 後當天 lock 第 4 onwards |
| Free 體驗 | 每天能玩, 但 cap 製造「想多玩但不能」焦慮 |
| Brand fit | ❌ 違反「下班逃逸」氛圍 (Hearts/Energy 同類問題) |
| Implement cost | S (1 人天, timer + localStorage cap) |
| **推薦** | ✕ 跳過 |

### Model C — cosmetic-only premium (角色服裝 / 場景包)

| 維度 | 評估 |
|---|---|
| Conversion trigger | Profile tab 「換貓咪服裝」/「換場景包」 |
| Free 體驗 | 全 chapter 不擋, 學習功能 0 friction |
| Brand fit | ✅ 完美 (跟 Studio Ghibli 暖色商品邏輯一致) |
| Implement cost | L (10+ 人天, art + 切換邏輯 + IAP wire) |
| Revenue scale | 低 (cosmetic conversion ~1-2%) |
| **推薦** | ✓ post-D90 補強, 不是主收入 |

### Model D — SRS / Vocab Review tab 付費 (學習工具升級)

| 維度 | 評估 |
|---|---|
| Conversion trigger | Profile 加「我的單字本」premium feature |
| Free 體驗 | 完整 chapter 學習, 但無錯題回顧 / SRS 排程 |
| Brand fit | ✅ (學習工具邏輯, 跟「下班逃逸」治癒 angle 相容) |
| Implement cost | L (7-10 人天, SRS 本身 + tab UI + premium wire) |
| Revenue scale | 中 (學習 power user conversion 高) |
| **推薦** | ✓ post-Ch8 ship, 配 SRS 一起 |

## C. 推薦組合 (3-tier)

```
Free:
  ✅ Ch1 + Ch2 全 chapter
  ✅ Profile customization (cat/dog name)
  ✅ Streak / XP / 8 achievements
  ✅ BGM + grandma TTS
  ✅ Lesson Review (B.161 ship)
  ❌ Ch3-8 chapter locked (Model A)
  ❌ 高階 SRS 排程 (basic 仍有, 全功能 lock, Model D)
  ❌ Cosmetic 服裝 / 場景 (Model C)

Premium NT$129/month or NT$988/year:
  ✅ 全 chapter unlock
  ✅ 高階 SRS (forgetting curve)
  ❌ Cosmetic (額外 IAP 一次性)

Cosmetic IAP (post-D90):
  - 貓咪服裝包 NT$60
  - 場景包 NT$90
  - Premium 折扣
```

## D. Paywall trigger 點 (touchpoint)

1. **Ch2 完成 outro** → 「下一章 (桃太郎) 需要 Premium」全屏 cinematic + CTA. 主轉換點.
2. **Profile tab** → 「升級 Premium」icon button (常駐, 非干擾).
3. **Lesson Review** → 「啟用完整 SRS 自動排程」soft prompt (P2).
4. ❌ **不要** lesson 內 / map 上 / lesson-end 出現 paywall (打斷 flow + 違反 brand).

## E. Implementation 步驟 (high-level)

1. **week 1**: Capacitor IAP plugin + RevenueCat wire (或 Stripe web fallback)
2. **week 1**: Account system (Supabase auth, email + Apple / Google sign-in)
3. **week 2**: Chapter lock state in runStore + StoryMapView 加 lock icon Ch3-8
4. **week 2**: Paywall scene (cinematic + plan compare + IAP trigger)
5. **week 3**: Server-side entitlement validation (RevenueCat webhook → Supabase)
6. **week 3**: A/B test free chapter cap (Ch2 vs Ch3 boundary)
7. **week 4**: DEV_UNLOCK_ALL flip + B.109 "open first 10" 邏輯刪除

## F. Migration plan (DEV_UNLOCK_ALL flip)

```
phase 0 (current):
  DEV_UNLOCK_ALL = true
  B.109 "open first 10" = active
  → 所有 198 lessons 開

phase 1 (paywall infra ship):
  DEV_UNLOCK_ALL = true (still, 直到 paywall 100% ready)
  Account system live (但 anon mode 仍 work)
  PostHog event tracking 進場 (per Top 5 spec)

phase 2 (paywall soft launch):
  DEV_UNLOCK_ALL = false (Ch3-8 真 lock)
  Paywall scene 進場
  早期使用者 (pre-cutoff date) 自動 grandfather Premium
  A/B test conversion

phase 3 (full ship):
  Server-side entitlement enforced
  Cosmetic IAP 上 (week 5+)
```

## G. Risk + Mitigation

| Risk | Mitigation |
|---|---|
| User 抱怨「以前免費現在收費」 | grandfather 機制 + email 通知 + 給 1 個月 free trial |
| Apple 30% 拆帳 | Capacitor IAP 強制走 IAP / 不能引導 Web checkout |
| RevenueCat $5/mo MTR fee 超 | 早期免費 tier 內可運作 |
| Brand 衝擊 | Ch1-2 完整 free + 雙語 + brand 不變 = 軟著陸 |

## H. Cross-refs

- `src/data/storyKitten.ts` (DEV_UNLOCK_ALL flag)
- Master matrix `docs/product/pickup-master-matrix-2026-06.md` § C #4
- PM roadmap `docs/product/pickup-pm-roadmap-2026-06.md`
- iOS 上架計畫 (memory `project-pickup-ios-distribution`)
