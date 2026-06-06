# Cinderella — Lesson Cut Analysis

> Output of `narrative-cut-analyst` skill applied to `cinderella.md`.
> Generated 2026-06-06 for Pickup Ch9.
> Paired with Ch7 葉限 — same theme (orphan + magical aid + lost shoe) different cultural shell (Tang 唐代 vs French 1697).

## Inputs

- **Story**: cinderella.md (Perrault 1697 7-beat, public domain)
- **Target lesson count**: 7
- **Avg lesson time**: 5 min (300s budget)
- **Tolerance**: 25%
- **Constraint**: NO Disney 1950 elements (no glass slipper, no Bibbidi-Bobbidi-Boo, no Disney character names)

## Step 1-3: Emotional arc + peak detection

```
Beat 1 (father remarries)        val =  0.0 → -0.3  (warning, |Δv|=0.3)        ⚡ peak
Beat 2 (cinder corner / abuse)   val = -0.3 → -0.6  (rejection)                 ⚡ peak
Beat 3 (ball, she can't go)      val = -0.6 → -0.8  (excluded, |Δv|=0.2)        ⚡ peak
Beat 4 (fairy godmother arrives) val = -0.8 → +0.4  (light enters, |Δv|=1.2)    ⚡⚡⚡ peak
Beat 5 (magic + warning)         val = +0.4 → +0.7  (transformation)             ⚡⚡ peak
Beat 6 (clock strikes, shoe lost)val = +0.7 → -0.2  (close call, |Δv|=0.9)      ⚡⚡ peak
Beat 7 (slipper fits, reveal)    val = -0.2 → +1.0  (rescue + reveal)            🌟 climax
```

## Step 4-6: Hook classification + cut selection (7 cuts × 3-question rule)

| L# | Cut location (sentence ends here) | Hook | Inquiry-terminating Question | McKee | Stein | Brewer |
|----|-----------------------------------|------|------------------------------|-------|-------|--------|
| L1 | Long ago in France, a kind girl lived with her father. Her own mother had died. Her father took a new wife. **The new wife had two grown daughters of her own.** | **B6 預言種子** | 後母會偏心嗎? (paired with Ch7-L1: 同 hook 同 beat — 雙文化 mirror) | ✓ home→risk | ✓ open | ✓ inquiry |
| L2 | She made the girl sweep, cook, and carry water all day. At night, the girl slept by the fire to stay warm. **Her clothes got grey with ash. They called her Cinderella.** | **B3 資訊缺口** | 她哭給誰聽? 有人會看見嗎? | ✓ named→trapped | ✓ open | ✓ inquiry |
| L3 | The king's son was going to have a big ball. He wanted to find a wife. Every girl in town was asked. **Cinderella helped them dress. But she could not go.** | **B5 道德兩難** | 她也可以去嗎? 她該求嗎? | ✓ hope→denied | ✓ open | ✓ inquiry |
| L4 | After the sisters left, Cinderella cried by the fire. **A kind old woman in a soft blue cloak stepped from the dark. "I am your fairy godmother. Do not cry, child."** | **B4 期待加速** | 仙女教母要做什麼? 接下來呢? | ✓ alone→ally | ✓ open | ✓ inquiry |
| L5 | The fairy godmother tapped the pumpkin. It became a gold coach. The mice became six white horses. The rat became the driver. Cinderella's grey rags turned into a long silver gown. **"Come home by twelve," the fairy said. "The magic ends then."** | **B6 預言種子** | 12 點限制是什麼意思? 過了會怎樣? | ✓ magic→constraint | ✓ open | ✓ inquiry |
| L6 | At the ball, the prince could not look away from her. They danced every dance. She forgot the time. The clock began to strike twelve. She ran for the door. **One small fur slipper fell off on the stair.** | **B2 情緒翻轉** | 鞋掉了 — 王子會找她嗎? | ✓ glory→exposed | ✓ open | ✓ inquiry |
| L7 | The prince held the slipper. He looked all over the country. He came to her house. The two sisters tried the slipper. It was too small. Cinderella came in. She set her foot in the slipper. **It slid on like water.** | **B2 大翻轉 + B6 open** | 仙女教母在哪? — 善良才是真正的魔法 | ✓ search→found | resolves + open hook (kindness vs sisters' fate) | ✓ resolved |

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
| L7 | ✓ | resolves (intended) | open hook (仙女教母在哪 + 兩個姊姊的命運) | 3/3 |

**All 7 cuts PASS** 3-question rule.

## Pairing with Ch7 葉限 (cross-cultural mirror)

| L | Ch7 葉限 (Tang Chinese) | Ch9 Cinderella (Perrault French) | Mirror beat |
|---|---|---|---|
| L1 | 後母 + 苦工 (cave village) | 後母 + 兩個姊姊 (French manor) | 父再婚 → 新家結構威脅 |
| L2 | 紅鰭金眼魚 (媽媽魂魄) | 灰塵堆 + 取名 Cinderella (被否認名字) | 主角被看見 vs 被否認 |
| L3 | 後母穿葉限破衣殺魚 (背叛) | 球會公告 + 她不能去 (排除) | 公開時刻 → 主角被剝奪 |
| L4 | 老人從天降 + 骨頭 | 仙女教母 + 南瓜變車 | 神秘外力介入 |
| L5 | 節慶夜 + 青衣金履 | 12 點限制 + 銀禮服 | 變身 + 時間/隱藏限制 |
| L6 | 金履掉了 (跑步) | 12 點鐘響 + 鞋掉了 (跑步) | 鞋遺落 — 完全 mirror |
| L7 | 鞋滑上腳 + 後母被飛石 | 鞋滑上腳 + 原諒姊姊 | 鞋 reveal + 結局差異 — 葉限 (天罰) vs Perrault (善良) |

## Time budget per lesson

Assumed 11 Q × 4 narration (60s) + 6 tests (~180s) + vocab (30s) + hook (~20s) ≈ 230-260s = 3.8-4.3 min ✓ all under 300s.

## Next step

Write `tools/_write-ch9-cinderella.cjs` with 7 lessons × 11 Q each. Mirror Ch7 葉限 hook pattern where culturally parallel (L1 / L5 / L7), divergent where culturally distinct (Ch7-L2 紅鰭魚 → Ch9-L2 灰塵取名).

## Future hook map entries (sync to src/data/lessonHooks.ts + tools/_content-db.cjs)

```ts
'kt-ch9-l1': { type: 'B6',        inquiry: '後母會偏心嗎? 兩個姊姊怎麼對她?' },
'kt-ch9-l2': { type: 'B3',        inquiry: '她哭給誰聽? 有人會看見嗎?' },
'kt-ch9-l3': { type: 'B5',        inquiry: '她也可以去嗎? 她該求嗎?' },
'kt-ch9-l4': { type: 'B4',        inquiry: '仙女教母要做什麼? 接下來呢?' },
'kt-ch9-l5': { type: 'B6',        inquiry: '12 點限制是什麼? 過了會怎樣?' },
'kt-ch9-l6': { type: 'B2',        inquiry: '鞋掉了 — 王子會找她嗎?' },
'kt-ch9-l7': { type: 'B6 open',   inquiry: '仙女教母在哪? 善良才是真正的魔法?' },
```

---

*Skill validation: Cinderella (Ch9) 跟 葉限 (Ch7) cut pattern 70% mirror (L1/L4/L5/L6/L7 同 hook 同 beat), 30% 分歧 (Ch7-L2 是 B3 魚靈, Ch9-L2 是 B3 取名被否認; Ch7-L3 是 B1 物理懸念 [背叛動作], Ch9-L3 是 B5 道德兩難 [她該不該求])。Perrault 結尾的核心不是「鞋讓世界看見她」而是「她善良到原諒姊姊」— L7 hook 落在「仙女教母為何消失? 因為善良已內化」。對兒童客群 (Pickup 主客群 8-12) 這是「跨文化童話 awareness」的最佳教學配對。*
