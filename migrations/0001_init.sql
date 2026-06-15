-- 拾光 Pickup 後端 P1-P4 schema (Cloudflare D1 / SQLite)
-- 對齊 docs/strategy/2026-06-15-backend-options.md §6.3
-- apply: wrangler d1 migrations apply pickup-db

CREATE TABLE IF NOT EXISTS users (
  id            TEXT PRIMARY KEY,          -- UUID (匿名裝置帳號)
  email         TEXT UNIQUE,               -- null = 匿名; 家長付費時綁定 (P3)
  created_at    INTEGER NOT NULL,
  cat_name      TEXT NOT NULL DEFAULT 'Mochi',
  rename_count  INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS economy (
  user_id     TEXT PRIMARY KEY REFERENCES users(id),
  coins       INTEGER NOT NULL DEFAULT 0,
  xp          INTEGER NOT NULL DEFAULT 0,
  streak      INTEGER NOT NULL DEFAULT 0,
  last_active INTEGER
);

-- idempotent 領獎: 同一 lesson 只首次完成發 XP/coins
CREATE TABLE IF NOT EXISTS lesson_completions (
  user_id            TEXT NOT NULL REFERENCES users(id),
  chapter            INTEGER NOT NULL,
  lesson_id          TEXT NOT NULL,
  first_completed_at INTEGER NOT NULL,
  best_accuracy      INTEGER,
  PRIMARY KEY (user_id, lesson_id)
);

-- idempotent 寶箱: 每個 chest index 只開一次
CREATE TABLE IF NOT EXISTS chests_opened (
  user_id  TEXT NOT NULL REFERENCES users(id),
  chest_id TEXT NOT NULL,
  opened_at INTEGER NOT NULL,
  PRIMARY KEY (user_id, chest_id)
);

-- 每筆經濟異動稽核 (反作弊 + 對帳)
CREATE TABLE IF NOT EXISTS ledger (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id     TEXT NOT NULL,
  delta_coins INTEGER NOT NULL DEFAULT 0,
  delta_xp    INTEGER NOT NULL DEFAULT 0,
  reason      TEXT NOT NULL,               -- 'lesson:kt-ch1-l1' / 'chest:3' / 'rename' / 'iap:coins_pack_1'
  ts          INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_ledger_user ON ledger(user_id, ts);

-- P3 magic-link 登入 token (家長 email 綁定)
CREATE TABLE IF NOT EXISTS login_tokens (
  token      TEXT PRIMARY KEY,
  email      TEXT NOT NULL,
  user_id    TEXT,                          -- 要綁定的匿名帳號
  expires_at INTEGER NOT NULL,
  used       INTEGER NOT NULL DEFAULT 0
);

-- P4 付費紀錄 (Stripe / Apple IAP 收據驗證後寫入, 防重放)
CREATE TABLE IF NOT EXISTS purchases (
  id          TEXT PRIMARY KEY,            -- provider txn id (idempotency key)
  user_id     TEXT NOT NULL REFERENCES users(id),
  provider    TEXT NOT NULL,               -- 'stripe' | 'apple'
  product_id  TEXT NOT NULL,
  coins_granted INTEGER NOT NULL DEFAULT 0,
  amount_cents  INTEGER,
  currency      TEXT,
  ts          INTEGER NOT NULL
);
