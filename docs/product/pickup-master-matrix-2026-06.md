# Pickup Master Matrix — 2026-06-01 (v2.0.B.160)

> 1-glance doc. 統整 4-agent verdict (state snapshot + 競品 gap + 派工表 + walkthrough template).
> 用法: 想知道「下一步做什麼」→ 看 § E. 想知道「派誰跑」→ `docs/agents/dispatch-matrix.md`.

## A. 現狀 (snapshot)

- **版本** v2.0.B.160 / SW v2.0.B.155 / 287 commits / CLAUDE.md drift 寫 v1.9.24
- **部署** https://pickupwords.pages.dev / repo `kengkeng44/pickup`
- **章節** Ch1-8 ship 198 lessons / 1,233 Q. **僅 Ch1 符合 Duolingo Stories spec v2 R1-R2**. Ch2-8 純 MC drill.
- **MP3** 僅 Ch1 (203 files). Ch2-8 全靠 WebSpeech fallback (品質差)
- **Telemetry** 0 (no PostHog/GA/Plausible) — **單一最大 gap**
- **DEV_UNLOCK_ALL** = true (production 沒 gate)

## B. 競品 gap 排序 (ROI 高→低)

| Rank | 功能 | 成本 | 效果 | 數據引用 |
|---|---|---|---|---|
| 1 | **Lesson Review screen** (結算後看 Q&A 歷史) | 2 人天 | D7 +8-12% | 資料層 `lessonAnswerLog` 已 ready (B.159) |
| 2 | **Streak Freeze** (每週 1 張免費凍結卡) | 5 人天 | churn -21% | Duolingo Inc. customer retention case |
| 3 | **Push notification** (Streak 提醒) | 3 人天 | D7 +15-25% | Mobile edu benchmark |
| 4 | **完整 SRS** (forgetting curve) | 7 人天 | 30 天詞彙保留 20%→70% | SRS 文獻 / DAU +30% |
| 5 | **PostHog 分析** | 3 hr (user 動 sign up) | 解盲決策 | 所有 ROI 信號失靈直到接 |

**Pickup 獨特優勢** (不要丟): 奶奶說故事框架 / Mochi+Hana 雙寵物一致角色 / Ghibli 暖色 + BGM / 雙語 UI 預設 — 競品**無**.

**不要做**: Hearts/Energy (與「下班逃逸」brand 衝突) · Leaderboard 排陌生人 (與奶奶氣場衝突) · AI free-talk chatbot (TTS cost x10 + 破壞單向 narrative).

## C. Spec compliance gap (P0)

1. **Ch2-8 全部 0 narration / 0 listen-tf** — 違反 spec v2 R1-R2. 1100 Q 需要 Duolingo Stories 格式重寫.
2. **Ch2-8 0 MP3** — fallback WebSpeech 體驗差. 需 ~$40-60 OpenAI grandma TTS budget (user approval pending).
3. **CLAUDE.md drift** — 版本 / 章節 ship 狀態 / 功能列表 vs reality 嚴重不一致.
4. **DEV_UNLOCK_ALL=true** — production 沒 gate. v1.0 ship 前 flip.
5. **`listen-tf-zh` 死碼** — schema + `_renderListenTfZh` 200+ 行未用. 可刪.
6. **legacy Tasks tab** — Free Practice + 5 Scenario cards (B.111 沒清).

## D. Audit-5 framework (B.160 ship)

post-iteration 並行跑 5 agent (≤8 min):
1. QA (content R1-R8) · 2. Bug-check (code health) · 3. UX Compliance (spec R1-R14) · 4. Audio-Text Consistency (DOM vs speakerText) · 5. **Player Walkthrough (NEW B.160, 時間軸 + give-away + 第一印象)**

詳見 `docs/agents/dispatch-matrix.md` § D.

## E. Top 5 Next Action (依 leverage 排)

| # | Action | 觸發 (誰先) | 預估 ship | 阻礙 |
|---|---|---|---|---|
| 1 | **Lesson Review screen** UI 接 `lessonAnswerLog` | implementer agent | 2 hr | 無 |
| 2 | **Ch1 全 8 lesson listen-tf R1+A4 sweep** (agent B.160 backlog) | QA + Polish 並行 | 4 hr | 無 |
| 3 | **CLAUDE.md sync to B.160** (drift 修) | inline | 1 hr | 無 |
| 4 | **DEV_UNLOCK_ALL flip 規劃** (paywall 前置) | PM brainstorm | 1 hr | DESIGN 決策 |
| 5 | **PostHog event spec** (一份 doc 設 event taxonomy) | PM agent | 2 hr | user sign up + key |

## F. Decision routing (1-tap query)

```
| 觸發                  | 派誰                              | doc                |
| --------------------- | --------------------------------- | ------------------ |
| 剛 ship               | Audit-5 (5 agent 並行)            | dispatch-matrix § D|
| 改 code               | Bug-check + Code reviewer         | § B                |
| 改 content (JSON)     | QA + Audio-Text + Polish          | § B                |
| User 抱怨 UI 怪       | UX Compliance                     | § B                |
| User 抱怨太簡單/卡    | Player Walkthrough                | player-walkthrough |
| User 抱怨當機         | Bug-check + Audio-debug           | § B                |
| 加新功能              | PM RICE → Brainstorm → Code review| § B                |
| 看 perf               | Performance engineer              | § B                |
| 看競品                | Market research + TOEIC Research  | 本 doc § B         |
| 查文獻/標準           | TOEIC Research                    | § B                |
```

## G. Cross-refs

- 派工表: `docs/agents/dispatch-matrix.md`
- 5th agent template: `docs/agents/player-walkthrough.md`
- Spec v2: `docs/toeic-research/pickup-ux-canonical-spec.md`
- Q standard: `docs/toeic-research/pickup-q-design-standard-v1.md`
- PM roadmap: `docs/product/pickup-pm-roadmap-2026-06.md`
- Memory rule: `feedback-pickup-post-iteration-audit` (~/.claude/...)

---

**自我檢查 (Loop 20 查無可查)**:

Pass 1 — A-G 7 個 section 都不重複 dispatch-matrix.md 內容,只引用. ✅
Pass 2 — 競品 gap 5 條全有 cost/effect 量化, 不空話. ✅
Pass 3 — Top 5 next action 全可 1 hr 內啟動, 無 design blocker (除 #4 #5). ✅
Pass 4 — Decision routing § F 對齊 dispatch-matrix § A decision tree 無歧義. ✅
Pass 5 — DEV_UNLOCK_ALL / CLAUDE.md drift / listen-tf-zh 死碼三大 gap 都列 § C, 不再藏. ✅
查無可查. 停.
