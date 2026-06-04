# Ugly Duckling — Lesson Cut Analysis

> Output of `narrative-cut-analyst` skill applied to `ugly-duckling.md`.
> Generated 2026-06-04, validates skill pipeline (1st non-桃太郎 story).

## Inputs

- **Story**: ugly-duckling.md (7-beat arc)
- **Target lesson count**: 7
- **Avg lesson time**: 5 min (300s budget)
- **Tolerance**: 25%

## Step 1-3: Emotional arc + peak detection

```
Beat 1 (eggs waiting)        val = -0.1  (mild loneliness)
Beat 2 (big egg cracks)      val = +0.3 → -0.4  (joy → confusion, |Δv|=0.7)  ⚡ peak
Beat 3 (farmyard rejection)  val = -0.6 → -0.9  (sad → abandonment, |Δv|=0.3) ⚡ peak
Beat 4 (gunshot + flee)      val = -0.5 → -0.8  (hope → terror, |Δv|=0.3)    ⚡ peak
Beat 5 (cottage bully)       val = -0.6 → -0.7  (cold → cold-bullied)        ⚡ minor
Beat 6 (winter ice → rescue) val = -1.0 → -0.5 → -0.9  (despair → relief → fear) ⚡⚡ peak
Beat 7 (drown → swan reveal) val = -1.0 → +1.0  (suicide attempt → reveal, |Δv|=2.0) 🌟 climax
```

## Step 4-6: Hook classification + cut selection

| L# | Cut location (sentence ends here) | Hook | Inquiry-terminating Question | McKee | Stein | Brewer |
|----|-----------------------------------|------|------------------------------|-------|-------|--------|
| L1 | Mother sits longer. The other ducklings play. The big egg has **not cracked yet** — she feels a small thump from inside... | **B3 資訊缺口** | 那大蛋裡是什麼? | ✓ value+→? | ✓ open | ✓ inquiry |
| L2 | The big egg cracks. Out tumbles a large, grey duckling. **The other ducklings stop playing. Nobody makes a sound.** | **B2 情緒翻轉** | 他是醜?還是只是不一樣? | ✓ joy→sad | ✓ open | ✓ inquiry |
| L3 | At the farmyard, hens peck and ducks chase. His mother first defends him. **Then she turns her head, and does not say a word.** | **B2 情緒翻轉** | 媽媽會回來保護他嗎? | ✓ trust→betrayal | ✓ open | ✓ inquiry |
| L4 | He runs alone. A wild duck friend joins him. Then **gunshots crack. The friend falls. He runs with his heart pounding...** | **B1 物理懸念** | 他會被打中?還能逃多遠? | ✓ peace→terror | ✓ open | ✓ inquiry |
| L5 | The cottage cat and hen mock him: 'You don't lay, you don't purr — what good are you?' **He pushes open the door and walks into the cold night.** | **B5 道德兩難** | 他要去哪?外面更冷 | ✓ shelter→exile | ✓ open | ✓ inquiry |
| L6 | He sees white birds fly south. Winter comes. Ice traps him. A farmer pulls him out. **But the children's hands frighten him most. He flees again into the snow.** | **B6 預言種子** | 春天會更好?還是又一次? | ✓ rescue→fear | ✓ open | ✓ inquiry |
| L7 | Spring. The white birds return. He bends to drown himself in shame — **but the water shows... not an ugly duckling at all.** Children call him the most beautiful. | **B2 大翻轉** | (reveal climax + 開放後鉤) | ✓ shame→glory | ✓ ends | ✓ resolved |

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
| L7 | ✓ | resolves (intended ending) | resolved + open hook | 3/3 |

**All 7 cuts PASS** 3-question rule.

## Time budget per lesson (preliminary)

Assumed 11 Q × 4 narration + 6 tests + vocab + hook = ~235-265s = 3.9-4.4 min ✓ all under 300s budget.

## Next step

Apply `pickup-item-writer` skill → write `tools/_write-ch2-ugly-duckling.cjs` with 7 lessons × 11 Q each, ending each on the hook narration above.

## Future hook map entries (sync to src/data/lessonHooks.ts + tools/_content-db.cjs)

```ts
'kt-ch2-l1': { type: 'B3',     inquiry: '那大蛋裡是什麼?' },
'kt-ch2-l2': { type: 'B2',     inquiry: '他是醜?還是只是不一樣?' },
'kt-ch2-l3': { type: 'B2',     inquiry: '媽媽會回來保護他嗎?' },
'kt-ch2-l4': { type: 'B1',     inquiry: '他會被打中?還能逃多遠?' },
'kt-ch2-l5': { type: 'B5',     inquiry: '他要去哪?外面更冷' },
'kt-ch2-l6': { type: 'B6',     inquiry: '春天會更好?還是又一次?' },
'kt-ch2-l7': { type: 'B2 big', inquiry: '(reveal 後 — 還會有什麼?)' },
```

---

*Skill validation: narrative-cut-analyst pipeline WORKS on 2nd story (1st = 桃太郎 inferred manually B.220). Pattern: B3 開頭 → B2/B1/B5/B6 中段 → B2 大翻轉 climax. Each story arc will yield different B-mix, but the 3-question validation is universal.*
