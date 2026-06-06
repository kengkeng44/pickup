# Urashima — Lesson Cut Analysis

> Output of `narrative-cut-analyst` skill applied to `urashima.md`.
> Generated 2026-06-07 as Ch14 URL pipeline ship.
> Theme line: 「龍宮 1 天 = 人間 100 年 — 善意會回報, 但時間不等人」(A2 ELT 海洋奇遇 + 時間錯位 hook).

## Inputs

- **Story**: urashima.md (7-beat arc)
- **Target lesson count**: 7
- **Avg lesson time**: 5 min (300s budget)
- **Tolerance**: 25%

## Step 1-3: Emotional arc + peak detection

```
Beat 1 (saves turtle)            val = +0.1 → +0.3  (calm → small joy of kindness)        ⚡ minor
Beat 2 (turtle returns, dive)    val = +0.3 → +0.5  (surprise → curiosity, descent)        ⚡ peak
Beat 3 (sea palace welcome)      val = +0.5 → +0.8  (awe → embraced by princess)           ⚡ peak
Beat 4 (happy in palace)         val = +0.8 → +0.6  (joy → quiet homesick pang)            ⚡ peak (pivot)
Beat 5 (asking home, gift)       val = +0.6 → +0.3  (longing → ominous warning)            ⚡ peak
Beat 6 (back on land, no one)    val = +0.3 → -0.7  (relief → cold realisation)            ⚡⚡ peak
Beat 7 (opens box, ages)         val = -0.7 → -0.4  (despair → quiet acceptance)           🌟 climax
```

## Step 4-6: Hook classification + cut selection

| L# | Cut location (sentence ends here) | Hook | Inquiry-terminating Question | McKee | Stein | Brewer |
|----|-----------------------------------|------|------------------------------|-------|-------|--------|
| L1 | Urashima sets the turtle gently on the wet sand. **The turtle looks up at him with quiet, dark eyes...** | **B6 預言種子** | 烏龜會謝謝他嗎? | ✓ peace+→? | ✓ open | ✓ inquiry |
| L2 | The big turtle dives down, deep into the blue water. **Down and down they go. The light above grows dim...** | **B3 資訊缺口** | 海底是什麼? | ✓ wonder→? | ✓ open | ✓ inquiry |
| L3 | The princess takes his hand and leads him into the dining hall. **"Stay one day," she says. "Or stay forever..."** | **B4 期待加速** | 他能留下嗎? | ✓ welcome→? | ✓ open | ✓ inquiry |
| L4 | He laughs in the coral garden with the princess. **But late at night, he thinks of his old mother by the sea...** | **B5 道德兩難** | 真的開心嗎? | ✓ joy→pang | ✓ open | ✓ inquiry |
| L5 | The princess gives him the small red box. **"Take this Tamatebako," she says. "But never, never open it..."** | **B6 預言種子** | 寶盒裡是什麼? | ✓ farewell→? | ✓ open | ✓ inquiry |
| L6 | "That was a hundred years ago," says the old man. **Urashima looks around. Nothing — and no one — is the same...** | **B2 情緒翻轉** | 沒人認得他了 — 怎麼辦? | ✓ home→lost | ✓ open | ✓ inquiry |
| L7 | The hundred years come back to him at last. **A very old man with a long beard sits quietly on the sand...** | **B6 open 開放後鉤** | 變老了 — 時間紅利的代價是什麼? | ✓ shock→peace | ✓ open hook | ✓ resolved + open |

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
| L7 | ✓ | resolves (transformation completes) + opens (what does it mean?) | resolved + open hook | 3/3 |

**All 7 cuts PASS** 3-question rule.

## Time budget per lesson (preliminary)

Assumed 11 Q × ~4 narration + 6 tests + vocab ≈ 230-260s = 3.8-4.3 min ✓ all under 300s budget.

## Story-specific design notes

- **No death**: Per user rule, 浦島 transformation = 'a very old man with a long beard', NOT 'died'. Mother is 'gone' / 'in old stories'. Time is the agent of loss, not violence.
- **Sea palace vocab**: 龍宮 = 'sea palace', 龍王 = 'sea king'. A2 friendly compound nouns.
- **Otohime name**: only spelled out in L3 first intro. After that = 'the princess' for A2 cognitive load.
- **Time-gap reveal**: L6 hook = the cold revelation (B2 情緒翻轉). L7 = the consequence (B6 open).
- **Cultural pair with Ch1 桃太郎**: both Japanese folk, both PD, both A2 oral cadence. Ch1 = energy + bravery; Ch14 = quiet + bittersweet wisdom. Complementary moods, same heritage.

## Next step

Apply `pickup-item-writer` skill → write `tools/_write-ch14-urashima.cjs` with 7 lessons × 11 Q each, ending each on the hook narration above.

## Future hook map entries (sync to src/data/lessonHooks.ts + tools/_content-db.cjs)

```ts
'kt-ch14-l1': { type: 'B6',      inquiry: '烏龜會謝謝他嗎?' },
'kt-ch14-l2': { type: 'B3',      inquiry: '海底是什麼?' },
'kt-ch14-l3': { type: 'B4',      inquiry: '他能留下嗎?' },
'kt-ch14-l4': { type: 'B5',      inquiry: '真的開心嗎?' },
'kt-ch14-l5': { type: 'B6',      inquiry: '寶盒裡是什麼?' },
'kt-ch14-l6': { type: 'B2',      inquiry: '沒人認得他了 — 怎麼辦?' },
'kt-ch14-l7': { type: 'B6 open', inquiry: '變老了 — 時間紅利的代價是什麼?' },
```

---

*Skill validation: narrative-cut-analyst pipeline 4th full apply (1st = 桃太郎 B.220, 2nd = ugly-duckling B.222, 3rd = three-pigs Ch8 B.234, 4th = urashima Ch14 2026-06-07). Pattern: B6 opening (foreshadow + obligation) → B3/B4/B5/B6 mid (descent + dilemma + warning) → B2 reveal (homecoming devastation) → B6 open close (transformation + philosophical question). Consistent with universal 3-question rule.*
