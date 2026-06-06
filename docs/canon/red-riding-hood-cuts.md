# Little Red Riding Hood — Lesson Cut Analysis

> Output of `narrative-cut-analyst` skill applied to `red-riding-hood.md`.
> Generated 2026-06-07 for Pickup Ch13.
> Theme group with Ch1 桃太郎 / Ch6 Baba Yaga: child safety education through fairy tale.

## Inputs

- **Story**: red-riding-hood.md (Grimm KHM 26 1812 first edition, public domain)
- **Target lesson count**: 7
- **Avg lesson time**: 5 min (300s budget)
- **Tolerance**: 25%
- **Constraint**: Grimm 1812 ONLY (no Perrault, no Disney, no modern derivative, no Sondheim/Dahl/Hoodwinked)

## Step 1-3: Emotional arc + peak detection

```
Beat 1 (mother's warning)         val =  0.0 → -0.1  (gentle send-off, |Δv|=0.1)   ⚡ peak
Beat 2 (wolf appears in woods)    val = -0.1 → -0.5  (danger enters, |Δv|=0.4)     ⚡⚡ peak
Beat 3 (wolf asks the way)        val = -0.5 → -0.7  (info leaked, |Δv|=0.2)       ⚡⚡ peak
Beat 4 (wolf runs ahead)          val = -0.7 → -0.9  (race to victim, |Δv|=0.2)    ⚡⚡ peak
Beat 5 (wolf in grandma's bed)    val = -0.9 → -1.0  (peak danger)                  ⚡⚡⚡ peak
Beat 6 (huntsman comes)           val = -1.0 → +0.3  (rescue arrives, |Δv|=1.3)    ⚡⚡⚡ peak
Beat 7 (cut open + lesson)        val = +0.3 → +1.0  (resolution + moral)           🌟 climax
```

## Step 4-6: Hook classification + cut selection (7 cuts × 3-question rule)

| L# | Cut location (sentence ends here) | Hook | Inquiry-terminating Question | McKee | Stein | Brewer |
|----|-----------------------------------|------|------------------------------|-------|-------|--------|
| L1 | Long ago in a village near the woods, a sweet little girl lived with her mother. The girl had a red hood that her grandma had made for her. People called her Little Red Riding Hood. **One morning, her mother gave her a basket of cake and wine for sick grandma.** | **B6 預言種子** | 媽媽叮嚀去看奶奶 → 路上會發生什麼? | ✓ home→quest | ✓ open | ✓ inquiry |
| L2 | "Walk straight to grandma's house. Do not stop. Do not talk to anyone." "Stay on the path. The path is safe." Little Red Riding Hood went into the woods with the basket. **A big bad wolf came out from behind a tree.** | **B3 資訊缺口** | 森林裡見大野狼 → 他會做什麼? | ✓ safe→threat | ✓ open | ✓ inquiry |
| L3 | "Good morning, little girl," the wolf said in a soft voice. "Where are you going so early today?" The girl did not know wolves were bad. **"I am going to grandma's house, down the path, by the three big oaks."** | **B5 道德兩難** | 大野狼問路 → 她應該說嗎? | ✓ trust→leak | ✓ open | ✓ inquiry |
| L4 | The wolf had a quick plan. "Pick some flowers for grandma," he said. While the girl picked flowers, the wolf ran fast to grandma's house. He knocked on the door. **"Open up. It is me, Little Red Riding Hood."** | **B1 物理懸念** | 大野狼跑去奶奶家 → 奶奶怎麼樣了? | ✓ deception→arrival | ✓ open | ✓ inquiry |
| L5 | The wolf took grandma into his stomach in one big bite. He put on her cap. He climbed into her bed. He pulled the blanket up to his nose. **Little Red Riding Hood came in. The room was dark.** | **B3 資訊缺口** | 小紅帽到奶奶家 → 床上是奶奶嗎? | ✓ trap→entry | ✓ open | ✓ inquiry |
| L6 | "Grandma, what big ears you have!" the girl said. "All the better to hear you with, my dear." "Grandma, what big teeth you have!" "All the better to eat you with!" **The wolf jumped up and took the girl into his stomach too. Then he fell asleep.** | **B4 期待加速** | 獵人來救 → 來得及嗎? | ✓ recognition→danger | ✓ open | ✓ inquiry |
| L7 | A huntsman walked by the house. He heard loud snoring. He saw the big bad wolf in grandma's bed. **He opened up the wolf and pulled them out. Grandma and the girl were safe. "I will always stay on the path," the girl said. "I will always listen to mother."** | **B6 open** | 救出奶奶 → 媽媽的話現在懂了 | ✓ rescue→reflection | resolves + open hook (will the wolf come back?) | ✓ resolved |

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
| L7 | ✓ | resolves (intended) | open hook (huntsman teaches listen-to-mother takeaway) | 3/3 |

**All 7 cuts PASS** 3-question rule.

## Theme group with Ch1 桃太郎 + Ch6 Baba Yaga

| Story | Safety lesson |
|---|---|
| Ch1 桃太郎 | Promise to parents (我會回來) — kept word matters |
| Ch6 Baba Yaga | Don't walk into strange houses alone (Vasilisa survived only because of mother's doll) |
| **Ch13 小紅帽** | **Don't talk to strangers · stay on the path · listen to mother** |

3 stories together cover the core "兒童陌生人 + 路徑安全 + 對家長承諾" trio for 8-12 客群 ELT.

## Time budget per lesson

Assumed 11 Q × 4 narration (60s) + 6 tests (~180s) + vocab (30s) + hook (~20s) ≈ 230-260s = 3.8-4.3 min ✓ all under 300s.

## Next step

Write `tools/_write-ch13-red-riding-hood.cjs` with 7 lessons × 11 Q each. Follow Ch9 Cinderella template (Ch9-7 mirrors Perrault-style "kindness is real magic" reflective ending; Ch13-7 mirrors with "listen-to-mother" reflective ending — both fairy-tale-internal takeaways).

## Future hook map entries (sync to src/data/lessonHooks.ts + tools/_content-db.cjs)

```ts
'kt-ch13-l1': { type: 'B6',        inquiry: '媽媽叮嚀去看奶奶 → 路上會發生什麼?' },
'kt-ch13-l2': { type: 'B3',        inquiry: '森林裡見大野狼 → 他會做什麼?' },
'kt-ch13-l3': { type: 'B5',        inquiry: '大野狼問路 → 她應該說嗎?' },
'kt-ch13-l4': { type: 'B1',        inquiry: '大野狼跑去奶奶家 → 奶奶怎麼樣了?' },
'kt-ch13-l5': { type: 'B3',        inquiry: '小紅帽到奶奶家 → 床上是奶奶嗎?' },
'kt-ch13-l6': { type: 'B4',        inquiry: '獵人來救 → 來得及嗎?' },
'kt-ch13-l7': { type: 'B6 open',   inquiry: '救出奶奶 → 媽媽的話現在懂了' },
```

---

*Skill validation: Little Red Riding Hood (Ch13) 與 Ch1 桃太郎 + Ch6 Baba Yaga 三題並列「兒童安全教育」教學群. Grimm 1812 KHM 26 first edition, public domain. NO Perrault 1697 / Disney / Sondheim / Dahl 殘餘. A2 兒童化: "ate" → "took into stomach"; "cut open belly" → "opened up the wolf"; "killed" → 不出現.*
