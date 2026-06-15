# 拾光 Pickup — 後端方案評估與執行設計

> 2026-06-15 · Opus 4.8 撰寫 · 決策文件
> 目的:選一個後端方案,**設計到可直接執行**。選定後照本文 §6 的 schema + API 契約落地。

---

## 1. 為什麼現在需要後端

目前全 app 是 client-side(React + Vite on Cloudflare Pages),所有狀態存 localStorage。
2026-06-14 安全掃描(B.306)結論:**localStorage 可被 devtools 任意竄改**,coins/XP/改名次數/付費都防不住。沒有後端就無法:

| 需求 | 沒後端的現況 | 要後端解 |
|------|------------|---------|
| 防作弊經濟 | coins/XP 開 devtools 就改 | server 權威結算 |
| 跨裝置同步 | 換手機 = 進度歸零 | 雲端帳號 |
| 真實付費 | 無金流 | IAP / Stripe + 收據驗證 |
| 家長付費 / 多孩 | 無帳號概念 | 帳號 + 關聯 |
| 防重複領獎 | client 自律(B.306 已堵) | server idempotent |

**但**:兒童 app 要 PII 最小化(台灣 PDPA / COPPA 精神)。設計原則 = **匿名裝置帳號優先,家長付費時才升級 email**。

---

## 2. 評估維度(對拾光的權重)

1. **與現有棧契合**(已在 CF Pages,deploy 用 wrangler + CI 已有 CF token)— 高
2. **單人開發可直接執行**(Windows,無 Mac,要省 ops)— 高
3. **免費額度**(portfolio / MVP 階段零成本)— 高
4. **server 權威經濟**(天生擋作弊)— 高
5. **付費路徑**(web Stripe / iOS IAP 收據驗證)— 中(之後才接)
6. **vendor lock-in** — 中

---

## 3. 五個方案總表

| # | 方案 | 一句話 | 免費額度 | Auth | 棧契合 | 直接執行度 | Verdict |
|---|------|--------|---------|------|--------|-----------|---------|
| ⭐1 | **Cloudflare Workers + D1** | 同一個 CF 帳號加 edge SQL | Workers 10萬 req/日 · D1 5GB + 500萬讀/日 | 自建 JWT(或 Better-Auth) | ★★★★★ | ★★★★★(同 token/CI) | **首選** |
| 2 | **Supabase** | Postgres + 內建 Auth 全家桶 | 500MB DB · 5萬 MAU · 閒置 7 天暫停 | 內建(email/OAuth/匿名) | ★★★☆ | ★★★★★(最少 code) | 強亞軍 |
| 3 | **Convex** | TS-native 反應式後端 | 100萬 函式呼叫/月 | 內建 / Clerk | ★★★★ | ★★★★ | DX 最好 |
| 4 | **Firebase** | Google BaaS,行動最熟 | Firestore 5萬讀/日 · Auth 免費 | 內建(匿名→升級強) | ★★★ | ★★★★ | 走 iOS 重時選 |
| 5 | **PocketBase** | 單一 Go 執行檔 + SQLite 自架 | 自架成本(Fly/VPS) | 內建 + admin UI | ★★ | ★★★ | 最省 + 最掌控 |

---

## 4. 逐方案分析

### ⭐ 1. Cloudflare Workers + D1 — 首選

- **是什麼**:CF 的 serverless(Workers)+ edge SQLite(D1)+ KV(session/cache)。
- **為什麼最適合拾光**:
  - 你**已經在 CF Pages**,CI 已有 `cloudflare/wrangler-action` + `CLOUDFLARE_API_TOKEN` secret → **同帳號、同 token、同 CI,加個 Worker + D1 即可,零新 vendor**。
  - Pages Functions 或獨立 Worker 都行;前後端同 origin → 免 CORS、免跨網域 cookie 麻煩。
  - edge 延遲低(對海外華人客群加分)。
  - server function = 經濟結算唯一入口 → 天生擋作弊。
- **免費額度**:Workers 10 萬 req/日、D1 5GB + 500 萬讀/2.5 萬寫/日 — MVP 階段綽綽有餘、零成本。
- **唯一成本**:**沒有 turnkey Auth UI**,要自建(但只需「匿名裝置帳號」很簡單;或用 Better-Auth / Lucia 跑在 Workers)。
- **付費**:web 接 Stripe;iOS(Capacitor)接 Apple IAP,Worker 驗收據。
- **Lock-in**:低-中(D1 是標準 SQLite,schema 可搬)。

### 2. Supabase — 最快出貨的亞軍

- Postgres + 內建 Auth(email / OAuth / 匿名)+ Row Level Security + Realtime + Storage。
- **優**:Auth + DB 全內建,**寫最少 code 就有帳號系統**;RLS 直接在 DB 層擋越權;對單人開發最省力。
- **劣**:多一個 vendor;免費專案**閒置 7 天會暫停**(低流量初期要注意,得手動喚醒或排程 ping);非 edge(但對台灣可選新加坡 region,可接受)。
- **適合**:你想「最快有完整帳號 + DB」、不介意多接一個服務。

### 3. Convex — DX 最好

- TypeScript-native 反應式資料庫 + server functions;**所有寫入只能透過 server function** → 反作弊是預設架構,不是補的。
- **優**:型別端到端、即時訂閱、心智負擔低。
- **劣**:較新、vendor lock 較深、生態小。

### 4. Firebase — 走 iOS 重時選

- Firestore(NoSQL)+ Auth(匿名→email 升級體驗最成熟)+ 最佳行動 SDK。
- **優**:之後 Capacitor 上 iOS 時,Firebase 行動整合最順;匿名帳號→家長 email 升級流程現成。
- **劣**:NoSQL 對「經濟交易」建模較彆扭;security rules 自成一套;用量大時**帳單會嚇人**;Google lock-in。

### 5. PocketBase — 最省 + 最掌控

- 單一 Go 執行檔 + SQLite + 內建 auth + admin UI + realtime,自架。
- **優**:全擁有、成本可壓到近零(Fly.io 免費層 / 便宜 VPS)、一個檔搞定。
- **劣**:**你要自己顧 host / 備份 / 擴展 / 上線**;Windows 單人開發的 ops 負擔最高;非 edge。

---

## 5. 排序建議

1. **⭐ Cloudflare Workers + D1** — 棧契合 + 同 token/CI + 免費 + 反作弊,「直接執行」分數最高。**預設推薦**。
2. **Supabase** — 若你重視「最快有完整 Auth + DB、少寫 code」。
3. **Convex** — 若你重視開發體驗與型別安全,接受較新 vendor。
4. **Firebase** — 若你打算很快上 iOS、要最順的行動 + 匿名升級。
5. **PocketBase** — 若你要最低成本 + 完全掌控,且願意自架。

> bull(積極):選 1,複用現有 CF,2 週內把經濟搬上 server。
> base(穩健):選 1 或 2,先做匿名帳號 + 狀態同步,經濟後補。
> bear(保守):先不做,維持 client-side + B.306 自律守門,等有付費需求再啟動。

---

## 6. 執行設計(以 ⭐ CF Workers + D1 為準;選別家時 schema/API 契約大多可搬)

### 6.1 架構

```
CF Pages (React 前端, 現有)
   │  fetch /api/*  (同 origin, 免 CORS)
   ▼
CF Pages Functions / Worker  ── D1 (SQLite: 帳號/進度/經濟/交易)
                              └─ KV (session token cache, 選用)
```

### 6.2 認證(PII 最小化)

- **Phase A 匿名裝置帳號**:首次開 app → `POST /api/auth/anon` → server 發 `userId`(UUID)+ 簽章 JWT(HS256, 存 localStorage 或 httpOnly cookie)。零 PII、零摩擦,適合小孩直接玩。
- **Phase B 家長升級**:要付費 / 跨裝置時 → `POST /api/auth/link {email}` magic-link,把匿名帳號綁到 email。只在此刻收 email(家長的,非小孩)。

### 6.3 D1 schema(可直接 migrate)

```sql
CREATE TABLE users (
  id TEXT PRIMARY KEY,            -- UUID
  email TEXT UNIQUE,              -- null = 匿名
  created_at INTEGER NOT NULL,
  cat_name TEXT DEFAULT 'Mochi',
  rename_count INTEGER DEFAULT 0
);
CREATE TABLE economy (
  user_id TEXT PRIMARY KEY REFERENCES users(id),
  coins INTEGER NOT NULL DEFAULT 0,
  xp INTEGER NOT NULL DEFAULT 0,
  streak INTEGER NOT NULL DEFAULT 0,
  last_active INTEGER
);
CREATE TABLE lesson_completions (   -- idempotent 領獎用
  user_id TEXT NOT NULL REFERENCES users(id),
  chapter INTEGER NOT NULL,
  lesson_id TEXT NOT NULL,
  first_completed_at INTEGER NOT NULL,
  best_accuracy INTEGER,
  PRIMARY KEY (user_id, lesson_id)
);
CREATE TABLE ledger (               -- 每筆經濟異動稽核
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT NOT NULL,
  delta_coins INTEGER, delta_xp INTEGER,
  reason TEXT,                      -- 'lesson:kt-ch1-l1' / 'chest:3' / 'rename'
  ts INTEGER NOT NULL
);
```

### 6.4 API 契約(server 權威)

| Method · Path | 用途 | server 驗證(反作弊核心) |
|---|---|---|
| `POST /api/auth/anon` | 發匿名帳號 | — |
| `POST /api/auth/link` | 綁 email | magic-link |
| `GET /api/state` | 拉全狀態 | JWT |
| `POST /api/lesson/complete` | 完成領獎 | lesson_id 存在 + **未領過**(查 lesson_completions)→ 才發 XP/coins,寫 ledger。重玩回 0 |
| `POST /api/chest/open` | 開寶箱 | chest 未開過 → +10,寫 ledger |
| `POST /api/rename` | 改名 | `rename_count<3` 免費,否則 `coins>=100` 才扣;原子交易 |
| `POST /api/iap/verify` | 收據驗證 | Apple/Stripe webhook 驗證後才加幣 |

關鍵:**client 只送「我完成了 lesson X」,XP/coins 一律 server 算**。devtools 改 localStorage 不再有用(localStorage 降級為 cache)。

### 6.5 localStorage → server 遷移

- 首次登入:把本機 coins/xp/streak/completed 上推 `POST /api/migrate`,server 取 **max(本機, 雲端)** 合併(不懲罰老玩家)。
- 之後:server 為唯一真相,localStorage 當離線 cache,上線時 reconcile。

### 6.6 付費路徑(之後)

- **web**:Stripe Checkout → webhook → `iap/verify` 加幣 / 解鎖。
- **iOS(Capacitor)**:必須走 Apple IAP(否則被拒審),Worker 驗 Apple receipt。改名 100 coins 可保持「金幣」設計,真錢只賣「金幣包」。

### 6.7 分階段上線(每階段可獨立 ship)

- **P1**(~3-4 天):匿名帳號 + `GET /state` + `migrate` + 唯讀同步(進度跨裝置)。
- **P2**(~3-4 天):`lesson/complete` + `chest/open` + `rename` 改 server 權威 → **作弊堵死**。
- **P3**(~2-3 天):家長 email 綁定 + 多孩(選)。
- **P4**(視上架):Stripe / Apple IAP。

---

## 7. 實作狀態(2026-06-15 更新)

**已選定 ⭐1 CF Workers + D1。程式碼 P1-P4 全 ship(B.308)**,剩外部 provision(見 cockpit todo `backend-provision`)。

已 ship 的檔案:
- `migrations/0001_init.sql` — 全 schema(users/economy/lesson_completions/chests_opened/ledger/login_tokens/purchases)
- `functions/_lib/*` — jwt(HS256 Web Crypto)/ http(auth guard + 503 gate)/ db helpers / types
- `functions/api/*` — auth/anon · auth/link · auth/consume · state · migrate · lesson/complete · chest/open · rename · iap/verify
- `src/data/backend.ts` — 前端 client:匿名 token + migrate + reconcile;P2 鏡像 helper;P3 magic-link consume
- `src/main.tsx` — boot 呼叫 `initBackend()`(fire-and-forget)
- 鏡像接點:LessonPage 領獎 / MapPage 寶箱 / ProfilePage 改名(`isBackendLive()` 守門)

**安全設計**:所有端點未 provision 一律回 503 → 前端標記 off → 全程 no-op,**app 照常用 localStorage**。provision(建 D1 + JWT_SECRET + apply migrations + redeploy)後自動啟用。

⚠️ **D1 binding 用 CF dashboard 綁(Pages → Settings → Functions → D1 bindings, name=`DB`),不要寫 wrangler.toml 的假 database_id** — B.308 曾因 placeholder UUID 讓 deploy 失敗(B.310 移除 wrangler.toml 修復)。

**剩餘(需外部帳號 / 金鑰,在 cockpit todo)**:
- P1+P2 啟用:`wrangler d1 create` + `wrangler d1 execute --file` 套 migrations + dashboard 綁 D1(name=DB)+ 設 JWT_SECRET + redeploy(~20 min)
- P2 硬化:從「鏡像 + 開機 pull 覆寫」升級成 hard server-authoritative(client 不再本機加幣,等 server 回傳)— 需 live DB 才能測
- P3:`RESEND_API_KEY` + 寄信網域
- P4:Stripe / Apple Developer 帳號 + 金鑰
