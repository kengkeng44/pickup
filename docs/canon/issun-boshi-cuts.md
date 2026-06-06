# Issun-bōshi — Lesson Cut Analysis

> Output of `narrative-cut-analyst` skill applied to `issun-boshi.md`.
> Generated 2026-06-07 as Ch16 URL pipeline ship.
> Theme line: 「一寸法師 — 拇指大的小英雄打敗紅鬼, 大小不是力量」(A2 ELT 拇指英雄 + demon defeat hook).

## Inputs

- **Story**: issun-boshi.md (7-beat arc)
- **Target lesson count**: 7
- **Avg lesson time**: 5 min (300s budget)
- **Tolerance**: 25%

## Step 1-3: Emotional arc + peak detection

```
Beat 1 (old couple pray)         val =  0.0 → +0.4  (lonely → joyful arrival)            ⚡ minor
Beat 2 (thumb boy, want Kyoto)   val = +0.4 → +0.5  (settled → curious aspiration)       ⚡ minor
Beat 3 (rice bowl boat off)      val = +0.5 → +0.7  (excitement → adventure begins)      ⚡ peak
Beat 4 (guard, princess walks)   val = +0.7 → +0.5  (pride → quiet calm before storm)    ⚡ peak (pivot)
Beat 5 (demon appears)           val = +0.5 → -0.6  (calm → sudden danger)               ⚡⚡ peak
Beat 6 (poke demon, demon runs)  val = -0.6 → +0.4  (terror → tiny triumph)              ⚡⚡ peak
Beat 7 (mallet grows him)        val = +0.4 → +0.9  (relief → quiet wonder)              🌟 climax
```

## Step 4-6: Hook classification + cut selection

| L# | Cut location (sentence ends here) | Hook | Inquiry-terminating Question | McKee | Stein | Brewer |
|----|-----------------------------------|------|------------------------------|-------|-------|--------|
| L1 | The old couple pray every night. **What kind of child will they get?** | **B6 預言種子** | 會生出什麼? | ✓ longing→? | ✓ open | ✓ inquiry |
| L2 | Issun is thumb-sized but clever. **What can a tiny boy do?** | **B3 資訊缺口** | 他能做什麼? | ✓ wonder→? | ✓ open | ✓ inquiry |
| L3 | He sails off in a rice bowl. **Who will he meet on the way?** | **B4 期待加速** | 路上會遇誰? | ✓ launch→? | ✓ open | ✓ inquiry |
| L4 | The princess walks out to the temple. **What is in the quiet wood ahead?** | **B6 預言種子** | 公主出去散步 → 前面有什麼? | ✓ pride→? | ✓ open | ✓ inquiry |
| L5 | The demon jumps out to take the princess. **Can a thumb-sized boy stop him?** | **B1 物理懸念** | 他能擋住嗎? | ✓ calm→panic | ✓ open | ✓ inquiry |
| L6 | Issun pokes inside the demon. **How will the demon answer this?** | **B2 情緒翻轉** | 鬼會怎樣? | ✓ fear→triumph | ✓ open | ✓ inquiry |
| L7 | Tap, tap — Issun grows taller. **What does a tiny boy look like, big at last?** | **B6 open 開放後鉤** | 變大那刻 → 成家 | ✓ small→big | ✓ open hook | ✓ resolved + open |

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
| L7 | ✓ | resolves (transformation completes) + opens (new family life) | resolved + open hook | 3/3 |

**All 7 cuts PASS** 3-question rule.

## Time budget per lesson (preliminary)

Assumed 11 Q × ~4 narration + 6 tests + vocab ≈ 230-260s = 3.8-4.3 min ✓ all under 300s budget.

## Story-specific design notes

- **No death**: demon does NOT die. He 'gave up and ran away'. Poke = ouch, not violent.
- **No marriage word**: '成家' rendered as 'they became family' / 'started a home' / 'big enough now'. NOT 'married' / 'wedding' / 'wed'.
- **'tiny boy' not 'dwarf'**: A2 + child-friendly. Per user explicit rule.
- **'demon' not 'oni'**: A2 vocab whitelist + no romanized JP words for the antagonist.
- **Cultural triple with Ch1 桃太郎 + Ch14 浦島**: three Japanese folk PD stories. Ch1 = peach hero energy + bravery / Ch14 = sea palace + bittersweet time-warp / Ch16 = thumb-sized hero + size doesn't matter. Heritage signal complete.

## Next step

Apply `pickup-item-writer` skill → write `tools/_write-ch16-issun-boshi.cjs` with 7 lessons × 11 Q each, ending each on the hook narration above.

## Future hook map entries (sync to src/data/lessonHooks.ts + tools/_content-db.cjs)

```ts
'kt-ch16-l1': { type: 'B6',      inquiry: '老夫婦求子 → 會生出什麼?' },
'kt-ch16-l2': { type: 'B3',      inquiry: '拇指大小的男孩 → 他能做什麼?' },
'kt-ch16-l3': { type: 'B4',      inquiry: '一寸帶碗船出發 → 路上會遇誰?' },
'kt-ch16-l4': { type: 'B6',      inquiry: '京都當侍衛 → 公主出去散步' },
'kt-ch16-l5': { type: 'B1',      inquiry: '鬼來抓公主 → 他能擋住嗎?' },
'kt-ch16-l6': { type: 'B2',      inquiry: '一寸跳進鬼嘴用針刺 → 鬼會怎樣?' },
'kt-ch16-l7': { type: 'B6 open', inquiry: '打鼓變大人 → 成家那刻' },
```

---

*Skill validation: narrative-cut-analyst pipeline 5th full apply (1st = 桃太郎 B.220, 2nd = ugly-duckling B.222, 3rd = three-pigs Ch8 B.234, 4th = urashima Ch14 B.260, 5th = issun-boshi Ch16 2026-06-07). Pattern: B6 opening (longing + prediction) → B3/B4/B6 mid (introduction + journey + foreshadow) → B1 reveal (sudden threat) → B2 triumph (inside the demon) → B6 open close (transformation + new life). Consistent with universal 3-question rule. Japanese folk trilogy (Ch1 桃太郎 / Ch14 浦島 / Ch16 一寸法師) now complete.*
