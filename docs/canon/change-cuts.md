# Change'e — Lesson Cut Analysis (嫦娥奔月)

> Output of `narrative-cut-analyst` skill applied to `change.md`.
> Generated 2026-06-07 as Ch10 pipeline ship.
> Theme line: 「為了保護心愛的人, 願意自己承受孤獨」(sacrifice + lonely moonlight = Mid-Autumn 文化資產).

## Inputs

- **Story**: change.md (7-beat arc — 后羿射日 → 西王母給藥 → 仙藥懸念 → 學生威脅 → 嫦娥吞藥 → 飛月 → 玉兔陪伴 + 中秋)
- **Target lesson count**: 7
- **Avg lesson time**: 5 min (300s budget)
- **Tolerance**: 25%

## Step 1-3: Emotional arc + peak detection

```
Beat 1 (10 suns → 1, 后羿娶嫦娥)  val = -0.5 → +0.7  (drought → hero saves land + marries)    ⚡ peak
Beat 2 (西王母給仙藥, 只夠一人)    val = +0.5 → +0.2  (gift → tension: only one can take)       ⚡ peak
Beat 3 (壞學生覬覦藥, 拿刀闖)      val = +0.0 → -0.6  (calm → threat at home)                   ⚡⚡ peak
Beat 4 (嫦娥兩難, 拿起藥丸)        val = -0.6 → -0.4  (cornered → makes a choice)               ⚡ minor
Beat 5 (吞藥, 身體變輕飛起)        val = -0.4 → -0.1  (irreversible physical lift-off)          ⚡⚡ peak
Beat 6 (飛到月亮, 后羿來不及)      val = -0.3 → -0.8  (literal cliffhanger reversed: too late)  ⚡⚡ peak
Beat 7 (玉兔陪伴 + 中秋)           val = -0.5 → +0.6  (loneliness → cultural anchor + memory)   🌟 climax-open
```

## Step 4-6: Hook classification + cut selection

| L# | Cut location (sentence ends here) | Hook | Inquiry-terminating Question | McKee | Stein | Brewer |
|----|-----------------------------------|------|------------------------------|-------|-------|--------|
| L1 | Hou Yi shot down nine suns. The land was saved. The Queen Mother said he could marry. He married Chang'e. **The people loved them both. Would the gods watch them, too?** | **B6 預言種子** | 為什麼她要嫁給英雄? 神會盯著他們嗎? | ✓ peace→? | ✓ open | ✓ inquiry |
| L2 | The Queen Mother came down from her hill. She gave Hou Yi a small white pill. "Only one of you can take it." **He put the pill in a small box and hid it. What was the pill?** | **B3 資訊缺口** | 仙藥是什麼? 為什麼只有一個? | ✓ gift→puzzle | ✓ open | ✓ inquiry |
| L3 | Hou Yi had a student. The student saw the pill. He wanted to live for ever, too. **One day Hou Yi went out to hunt. Chang'e was home alone with the pill...** | **B5 道德兩難** | 誰會吃? 嫦娥能保得住嗎? | ✓ safe→risk | ✓ open | ✓ inquiry |
| L4 | The bad student pulled out a long sharp knife. He came at Chang'e. "Give me the pill!" **Chang'e looked at the pill. She picked it up. She held it close to her mouth...** | **B4 期待加速** | 她會吞下去嗎? 還是給他? | ✓ corner→choice | ✓ open | ✓ inquiry |
| L5 | Chang'e put the pill in her mouth. She swallowed it down. Her feet left the floor. Her hair flew up. **She began to float to the window. To the open sky. What now?** | **B1 物理懸念** | 接下來會發生什麼? 她會飛多遠? | ✓ swallow→lift | ✓ open | ✓ inquiry |
| L6 | Chang'e flew past the trees. Past the hills. Past the clouds. She landed on the cold grey moon. She looked down. **Hou Yi was running back home. He looked up at the sky. He was too late.** | **B2 情緒翻轉** | 后羿會怎麼樣? 兩人還會再見嗎? | ✓ flight→loss | ✓ open | ✓ inquiry |
| L7 | A small white rabbit sat next to her. Down on earth, Hou Yi put out her favourite food every night. **Once each year, in autumn, the moon is full and round. People look up. They miss the ones they love...** | **B6 open 開放後鉤** | 為什麼每年中秋想念? 你想念的人是誰? | ✓ lonely→shared | ✓ resolves moon, opens cultural anchor | ✓ resolved + open |

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
| L7 | ✓ | resolves loneliness with rabbit + opens cultural anchor (中秋) | resolved + open hook | 3/3 |

**All 7 cuts PASS** 3-question rule.

## Time budget per lesson (preliminary)

Assumed 11 Q × ~4 narration + 6 tests + vocab + hook ≈ 235-265s = 3.9-4.4 min ✓ all under 300s budget.

## Story-specific design notes

- **無暴力 anti-grim**: 后羿射日 → 'the suns went away / went down' (絕不 'killed'). 壞學生威脅 → 拿刀但**不出手**, 嫦娥**吞藥飛走逃離**, 不是死. 全章 0 血腥, A2 兒童客群友善.
- **無背叛 framing**: 嫦娥**不是貪吃**也**不是背叛后羿**, 是**為了不讓壞人得到仙藥** 主動犧牲自己 → 中華神話正派詮釋 (符合台灣教科書熟悉版本).
- **Cross-cultural pair**:
  - Ch9 灰姑娘 (Perrault 1697, 西方) ↔ Ch10 嫦娥 (中華神話, 東方)
  - 西方公主**等仙女**幫她**主動找王子** ↔ 東方公主**自己吞藥**讓**愛人留在地上** = 主動 vs 被動鏡像
- **A2 vocab key**: sun / pill / box / hide / knife / swallow / float / moon / rabbit / autumn — 全 NGSL ≤ 2000.
- **中秋節文化錨**: L7 收尾連到「每年中秋月圓 → 想念遠方的人」, 兒童在台灣家家戶戶中秋烤肉時都聽過, 文化共鳴 + 情緒落點.

## Next step

Apply `pickup-item-writer` skill → write `tools/_write-ch10-change.cjs` with 7 lessons × 11 Q each, ending each on the hook narration above.

## Future hook map entries (sync to src/data/lessonHooks.ts + tools/_content-db.cjs)

```ts
'kt-ch10-l1': { type: 'B6',      inquiry: '為什麼她要嫁給英雄? 神會盯著他們嗎?' },
'kt-ch10-l2': { type: 'B3',      inquiry: '仙藥是什麼? 為什麼只有一個?' },
'kt-ch10-l3': { type: 'B5',      inquiry: '誰會吃? 嫦娥能保得住嗎?' },
'kt-ch10-l4': { type: 'B4',      inquiry: '她會吞下去嗎? 還是給他?' },
'kt-ch10-l5': { type: 'B1',      inquiry: '接下來會發生什麼? 她會飛多遠?' },
'kt-ch10-l6': { type: 'B2',      inquiry: '后羿會怎麼樣? 兩人還會再見嗎?' },
'kt-ch10-l7': { type: 'B6 open', inquiry: '為什麼每年中秋想念? 你想念的人是誰?' },
```

---

*Skill validation: narrative-cut-analyst pipeline 5th full apply (1st = 桃太郎 B.220, 2nd = ugly-duckling B.222, 3rd = three-pigs B.234, 4th = cinderella B.236, 5th = change'e 2026-06-07 Ch10 pipeline ship). Pattern: B6 opening (foreshadow gods/sacrifice) → B3/B5/B4/B1/B2 mid (escalating moral dilemma → irreversible flight) → B6 open close (cultural anchor 中秋 + memory). Consistent with universal 3-question rule.*
