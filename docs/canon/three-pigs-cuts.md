# Three Pigs — Lesson Cut Analysis

> Output of `narrative-cut-analyst` skill applied to `three-pigs.md`.
> Generated 2026-06-06 as Ch8 pipeline ship.
> Theme line: 「準備 + 努力勝過聰明取巧」(A2 ELT 鬼斧三段式 huff/puff/blow).

## Inputs

- **Story**: three-pigs.md (7-beat arc)
- **Target lesson count**: 7
- **Avg lesson time**: 5 min (300s budget)
- **Tolerance**: 25%

## Step 1-3: Emotional arc + peak detection

```
Beat 1 (leave home)             val = +0.1 → -0.1  (excited → unease wolf hinted)   ⚡ peak
Beat 2 (straw house, wind)      val = +0.2 → -0.2  (proud → wind sways straw)        ⚡ minor
Beat 3 (wood house, steps)      val = +0.3 → -0.3  (proud → distant heavy steps)     ⚡ peak
Beat 4 (wolf knocks straw)      val = -0.4 → -0.7  (working → wolf at door)          ⚡ peak
Beat 5 (huff + straw falls)     val = -0.7 → -0.9  (terror → house gone, run)        ⚡⚡ peak
Beat 6 (wood falls + run brick) val = -0.8 → -1.0  (hope → wood gone too)            ⚡⚡ peak
Beat 7 (brick wins, wolf gives) val = -1.0 → +0.9  (despair → safety + warm fire)    🌟 climax
```

## Step 4-6: Hook classification + cut selection

| L# | Cut location (sentence ends here) | Hook | Inquiry-terminating Question | McKee | Stein | Brewer |
|----|-----------------------------------|------|------------------------------|-------|-------|--------|
| L1 | Three brothers say goodbye and walk down the road. **Mother's warning hangs in the air: "Build a strong house."** | **B6 預言種子** | 狼真的會來?三個都安全? | ✓ peace+→? | ✓ open | ✓ inquiry |
| L2 | First pig builds straw house in one hour. He eats lunch. **The wind blows. The straw walls sway gently...** | **B1 物理懸念** | 草屋能撐多久?今晚就倒嗎? | ✓ proud→fragile | ✓ open | ✓ inquiry |
| L3 | Second pig builds wood house in one afternoon. He feels proud. **From far on the path, a soft sound. Heavy steps.** | **B4 期待加速** | 是誰來了?是狼嗎? | ✓ calm→tense | ✓ open | ✓ inquiry |
| L4 | Third pig still works with bricks and mud. That night, the wolf comes to the straw house. He knocks. **"Little pig, little pig, let me come in!" The first pig holds his breath.** | **B3 資訊缺口** | 第一隻會回答?狼接下來做什麼? | ✓ work→threat | ✓ open | ✓ inquiry |
| L5 | "Not by the hair on my chin!" The wolf smiles. He huffs. He puffs. He blows. **The straw house flies apart. The first pig runs to his brother's wood house, banging the door.** | **B2 情緒翻轉** | 木屋能擋住嗎?還是也會倒? | ✓ defy→flee | ✓ open | ✓ inquiry |
| L6 | The wolf huffs. He puffs. He blows. The sticks break. The roof falls. The two pigs run out the back. **They race to the brick house. The third pig opens the door just in time.** | **B6 預言種子** | 磚屋能撐?還是狼也吹得倒? | ✓ chase→hope | ✓ open | ✓ inquiry |
| L7 | Wolf huffs and puffs and blows. Brick walls do not move. He tries to climb the roof. Third pig builds a hot fire. **The wolf sees the smoke. He gives up. He runs back to the woods. But he is still out there...** | **B6 open 開放後鉤** | 安全了嗎?狼還在森林裡 — 還會回來? | ✓ siege→safe | ✓ open hook | ✓ resolved + open |

## Step 7: Validation

**3-question checklist** per cut:

| Cut | McKee turning? | Stein open-not-resolve? | Brewer inquiry? | Score |
|----|----|----|----|----|
| L1 | ✓ | ✓ | ✓ | 3/3 |
| L2 | ✓ | ✓ | ✓ | 3/3 |
| L3 | ✓ | ✓ | ✓ | 3/3 |
| L4 | ✓ | ✓ | ✓ | 3/3 |
| L5 | ✓ | ✓ | ✓ | 3/3 |
| L6 | ✓ | ✓ | ✓ | 3/3 |
| L7 | ✓ | resolves (siege ends) + opens (wolf still in woods) | resolved + open hook | 3/3 |

**All 7 cuts PASS** 3-question rule.

## Time budget per lesson (preliminary)

Assumed 11 Q × ~4 narration + 6 tests + vocab + hook ≈ 235-265s = 3.9-4.4 min ✓ all under 300s budget.

## Story-specific design notes

- **三段式重複 hook**: L4 / L5 / L6 都圍繞同一儀式 ("Little pig let me in" → "Not by hair on chin" → "huff/puff/blow"). 兒童 ELT 寶,每 lesson 換一個 house 重複學同 verb structure.
- **Wolf 不吃豬**: L7 wolf gives up + runs back (per CLAUDE.md feedback_pickup_no_chinese_pre_reveal + lint-cultural ban on violence). 比 Disney 1933 版「煮 wolf in pot」更溫柔, 比 Grimm「狼跌進鍋裡死」更 A2-safe.
- **A2 vocab key**: huff / puff / blow / brick / straw / sticks / knock — 全 NGSL ≤ 2000.

## Next step

Apply `pickup-item-writer` skill → write `tools/_write-ch8-three-pigs.cjs` with 7 lessons × 11 Q each, ending each on the hook narration above.

## Future hook map entries (sync to src/data/lessonHooks.ts + tools/_content-db.cjs)

```ts
'kt-ch8-l1': { type: 'B6',     inquiry: '狼真的會來?三個都安全?' },
'kt-ch8-l2': { type: 'B1',     inquiry: '草屋能撐多久?今晚就倒嗎?' },
'kt-ch8-l3': { type: 'B4',     inquiry: '是誰來了?是狼嗎?' },
'kt-ch8-l4': { type: 'B3',     inquiry: '第一隻會回答?狼接下來做什麼?' },
'kt-ch8-l5': { type: 'B2',     inquiry: '木屋能擋住嗎?還是也會倒?' },
'kt-ch8-l6': { type: 'B6',     inquiry: '磚屋能撐?還是狼也吹得倒?' },
'kt-ch8-l7': { type: 'B6 open', inquiry: '安全了嗎?狼還在森林裡 — 還會回來?' },
```

---

*Skill validation: narrative-cut-analyst pipeline 3rd full apply (1st = 桃太郎 B.220, 2nd = ugly-duckling B.222, 3rd = three-pigs 2026-06-06 Ch8 pipeline ship). Pattern: B6 opening (foreshadow wolf) → B1/B4/B3/B2 mid (escalating peril) → B6 open close (resolved + open hook). Consistent with universal 3-question rule.*
