# 咕嚕 Gulu — Phase 0 POC 起始包

英檢養成系 app(拾光 Pickup sibling)。這是**可跑的 Phase 0 骨架**,暫放在 pickup repo 的 `gulu-starter/`,等新 repo 開好直接搬過去。

設計 source of truth(在 pickup repo):
- `docs/superpowers/specs/2026-07-02-wordlings-exam-pet-app.md`
- `docs/superpowers/specs/2026-07-02-wordlings-creature-prompts.md`

## 這個 POC 有什麼

- 🥚 **寵物房主畫面**(`PetRoom.tsx`):蛋 / 咕嚕 + 等級 + 成長條 + 練習入口
- 📖 **答題**(`Practice.tsx`):讀拾光現成英檢題庫 `public/lessons-ch32.json`,沿用 blindRetry(答錯只標紅、不揭正解、原地重試),listen-mc 用瀏覽器 TTS 唸題
- 🌱 **成長/孵化**(`petState.ts`):答對 +10、first-try 對 +30% 加成;累積 20 成長值蛋孵化成隨機 5 隻怪之一;每 100 成長值升 1 級
- 😴 **免費閘**(`gate.ts`):一天 first-try 答錯 10 題 → 咕嚕睡著、明天再來(`DAILY_WRONG_CAP = 10`)
- 🎨 5 隻怪先用 emoji 佔位(`creatures.ts`),之後換 `creature-prompts.md` 生的 PNG

## 本機跑

```bash
npm install
npm run dev
```

## 搬去新 repo(你開好 kengkeng44/gulu 後)

```bash
# 在新 repo 目錄裡:
# 把 gulu-starter/ 的內容(不含 node_modules)複製進去,例如:
cp -r gulu-starter/. /path/to/gulu/
cd /path/to/gulu
npm install && npm run dev   # 確認能跑
git add . && git commit -m "Gulu Phase 0 POC scaffold"
git push
```

之後搬完可把 pickup 的 `gulu-starter/` 刪掉(內容已在新 repo)。

## Phase 0 之後(見 spec §11)

- Phase 1:離家冒險(旅行青蛙式,真實時間 + 明信片/紀念品/日記/單字)+ 推播
- Phase 2:換裝 + 房間佈置 + 圖鑑 + 外觀 IAP
- Phase 3:故事章節 + 更多怪/進化 + Capacitor 上架

## 待接(從 pickup 搬更完整版時)

POC 為求自足只做了 MC-like 題型。正式版建議直接沿用 pickup 的:
- `src/data/lessons.ts`(Zod schema + `applyContentOverlay` ja/ko)
- `src/react-app/renderers.tsx`(全題型 + tap-pairs/type-translate…)
- `src/data/energy.ts`(改成 wrong-cap)、語意色 tokens、i18n
- 題庫 `public/lessons-ch32/33/34.json` + `public/lessons-i18n/ch32-34-{ja,ko}.json`
