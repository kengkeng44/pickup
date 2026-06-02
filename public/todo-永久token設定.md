# 永久 Token 設定 — 跨專案 SOP

> 為什麼建這份: `infisical login` 24h-7d 過期一次煩死了。設一次 Machine Identity 從此 deploy 不用再登入。
> 預估時間: 一次性 **~5 分鐘 in dashboard + ~5 分鐘 Windows 設定** = 10 分鐘永解。

---

## 一、你各專案狀態

| 專案 | Repo | Secret 怎麼存 | 需要永久 token? |
|------|------|--------------|---------------|
| **wordwar (Pickup)** | kengkeng44/pickup | CLI 跑 `infisical run --env=dev --` 拿 CF API token | ✅ 需要 (deploy 頻繁) |
| **cheng.robot (ReportRobot)** | kengkeng44/ReportRobot | 有 `.infisical.json` config,Railway secrets 走 infisical | ✅ 需要 (deploy 頻繁) |
| github-upload (Threads bot) | Telegram-Bot-Workflow-Suite | 本機 `.env` + Telegram bot token | ⏸ 不急 (沒用 infisical) |
| job_radar | resume_workflow | 本機 env | ⏸ 不急 (沒用 infisical) |
| kengkeng (dashboard) | kengkeng/kengkeng | GitHub Token (gh CLI 內) | ⏸ 不急 (gh 自管) |
| tw-job-scraper | tw-job-scraper | 本機 env | ⏸ 不急 (沒用 infisical) |

**只有上面 2 個專案** (wordwar + cheng.robot) 會從這次設定受益。其他 4 個不用動。

---

## 二、為什麼設這個

| 現況 | 改後 |
|------|------|
| 每次 deploy 前要 `infisical login` (互動式 OAuth) | env var 自動帶過,deploy 一條指令搞定 |
| Token 24h-7d 過期,過期要重登 | Machine Identity **預設永不過期** |
| 手機操作不來 (要桌機開瀏覽器) | 設一次後從手機 SSH / Claude session 都能 deploy |
| 假設帳號被偷,session token 可登入整個 infisical | Machine Identity 綁定 specific environment + path |

---

## 三、一次性 dashboard 設定 (~5 分鐘)

### Step 1 — 建 Machine Identity

1. 開 https://app.infisical.com/login (登入你的帳號)
2. 進 **wordwar** project (或任一 project,Machine Identity 是 org 層級)
3. 左上角點頭像 → **Organization Settings**
4. 左欄找 **Access Control** → **Machine Identities**
5. 點 **Create Identity**
   - **Name**: `desktop-deploy`
   - **Role**: `Member` (預設)
   - 按 **Create**

### Step 2 — 配 Universal Auth method

1. 創完進入這個 identity 詳情頁
2. 右上 **Authentication Methods** 點 **Add Method**
3. 選 **Universal Auth**
4. 設定:
   - **Access Token TTL**: `0` (永久) 或 `2592000` (30 天,看你要 trade-off)
   - **Access Token Max TTL**: `0` (永久)
   - **Access Token Max Usage**: `0` (無上限)
   - **Allowed IPs**: 留空 (任何 IP) 或填你家 IP 限制
5. 按 **Save**

### Step 3 — 拿到 Client ID + Client Secret

1. 同 identity 頁,點 **Client Secrets** tab
2. 點 **Create Client Secret**
   - **Description**: `desktop`
   - **TTL**: `0` (永久)
   - 按 **Create**
3. 跳出視窗顯示:
   - **Client ID**: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`
   - **Client Secret**: `xxxxxxxxxxxxxxxxxxxxxxxxxxxx`
   - **⚠️ Client Secret 只顯示一次! 立刻 copy 存下來**

### Step 4 — 把這個 identity 加進專案

對 **wordwar** 和 **cheng.robot** 各做一次:

1. 進 project (例如 wordwar)
2. 左欄 **Access Control** → **Identities** → **Add Identity**
3. 選剛建的 `desktop-deploy`
4. **Role**: `Developer` (能 read secrets,不能改 project settings)
5. 按 **Save**

---

## 四、Windows 環境變數設定 (~3 分鐘)

開 **PowerShell 以系統管理員身分** (Win+X → Terminal (Admin)),貼這 2 行,把 `XXX` 換成剛拿到的值:

```powershell
[Environment]::SetEnvironmentVariable("INFISICAL_UNIVERSAL_AUTH_CLIENT_ID", "貼-client-id", "User")
[Environment]::SetEnvironmentVariable("INFISICAL_UNIVERSAL_AUTH_CLIENT_SECRET", "貼-client-secret", "User")
```

**驗證 (新開一個 PowerShell 視窗測試)**:

```powershell
echo $env:INFISICAL_UNIVERSAL_AUTH_CLIENT_ID
```

應該顯示你貼的 client ID。

---

## 五、Per-project deploy 指令更新

### wordwar (Pickup) 新 deploy 指令

舊:
```
infisical run --env=dev -- npx wrangler pages deploy dist --project-name=pickupwords --branch=master --commit-message="..."
```

新 (不用先 login):
```
infisical run --machine-identity-id=$env:INFISICAL_UNIVERSAL_AUTH_CLIENT_ID --machine-identity-secret=$env:INFISICAL_UNIVERSAL_AUTH_CLIENT_SECRET --env=dev -- npx wrangler pages deploy dist --project-name=pickupwords --branch=master --commit-message="..."
```

### cheng.robot (ReportRobot) 新指令

同 pattern,把 `infisical run --env=dev --` 前面加 `--machine-identity-id=$env:... --machine-identity-secret=$env:... ` 即可。

---

## 六、Todo Checklist

### 一次性設定 (在你手邊有電腦 + 5-10 分鐘空閒時做)

- [ ] **Step 1**: 開 https://app.infisical.com 登入
- [ ] **Step 2**: Organization Settings → Access Control → Machine Identities → 建 `desktop-deploy`
- [ ] **Step 3**: 加 Universal Auth method,TTL 設 0
- [ ] **Step 4**: 創 Client Secret,**copy Client ID + Secret 到密碼管理工具** (1Password / Bitwarden)
- [ ] **Step 5**: wordwar project + cheng.robot project 各 Add Identity 把 `desktop-deploy` 加進去
- [ ] **Step 6**: Windows PowerShell admin 跑 `[Environment]::SetEnvironmentVariable` × 2 條
- [ ] **Step 7**: 新開 PowerShell 視窗,測 `echo $env:INFISICAL_UNIVERSAL_AUTH_CLIENT_ID` 有東西
- [ ] **Step 8**: 跑 deploy 測試 (wordwar deploy 1 個小改動驗證 work)

### 設完後告訴 Claude

下次 session 跟 Claude 說 "**永久 token 已設好,deploy 指令請用 machine-identity flag**",Claude 之後幫你產 deploy 指令會自動帶上對的參數。

也可以把這條加到 `~/.claude/projects/C--Users-acer/memory/` 變成 auto-memory,Claude 下次自動知道。

---

## 七、Q&A

**Q: 永久不過期會不會有風險?**
A: 有。如果 client secret 外洩,攻擊者可以 deploy 任何東西到你的 Cloudflare account。建議:
- 設 30 天 TTL (`Access Token TTL: 2592000`) 而非永久 → 換 token 簡單
- Allowed IPs 限制只允許家 IP
- 用 1Password / Bitwarden 存 client secret,別貼 chat / Notion / GitHub

**Q: 為什麼不直接把 CF API token 設 Windows env var,跳過 infisical?**
A: 可以但失去 infisical 的好處 (audit log / centralised rotation / 多 secret 同步管理)。如果你只 deploy 1 個 project 確實可以跳過 infisical,但 cheng.robot 有 ~10 個 secrets 走 infisical,還是值得 keep。

**Q: Token 萬一被偷怎麼撤銷?**
A: 同 infisical dashboard → Machine Identity → Client Secrets → Revoke。立刻 invalidate,deploy 也立刻 fail (force rotate)。

---

*Last updated: 2026-06-02 by Claude (Opus 4.7) — 本 doc 在 Desktop\todo-永久token設定.md*
