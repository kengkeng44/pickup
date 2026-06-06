# Enormous Turnip — Lesson Cut Analysis

> Output of `narrative-cut-analyst` skill applied to `enormous-turnip.md`.
> Generated 2026-06-07 for Pickup Ch20.
> Cumulative structure challenge: each beat repeats prior beats. Cuts
> must escalate (more pullers) AND withhold the climax.

## Inputs

- **Story**: enormous-turnip.md (7-beat cumulative arc, light folk voice)
- **Target lesson count**: 7
- **Avg lesson time**: 5 min (300s budget)
- **Tolerance**: 25%

## Step 1-3: Emotional arc + peak detection

```
Beat 1 (plants seed)         val = +0.4 → +0.7  (warm hope, growing)         ⚡ peak
Beat 2 (first pull fails)    val = +0.7 → +0.3  (oops, can't move it)        ⚡⚡ peak
Beat 3 (Grandma joins)       val = +0.3 → +0.4  (still stuck, frustrated)    ⚡ peak
Beat 4 (Granddaughter)       val = +0.4 → +0.4  (more help, still no)        ⚡ peak
Beat 5 (Dog joins)            val = +0.4 → +0.5  (closer, still no)           ⚡ peak
Beat 6 (Cat joins, moves)    val = +0.5 → +0.6  (it moved a little!)         ⚡ peak
Beat 7 (mouse, OUT)          val = +0.6 → +1.0  (release, shared dinner)     🌟 climax
```

## Step 4-6: Hook classification + cut selection

| L# | Cut location (sentence ends here) | Hook | Inquiry-terminating Question | McKee | Stein | Brewer |
|----|-----------------------------------|------|------------------------------|-------|-------|--------|
| L1 | Grandpa plants a seed. He gives it water every day. **It grows bigger and bigger.** | **B6 預言種子** | 蘿蔔會變多大?拔得起來嗎? | ✓ small→huge | ✓ open | ✓ inquiry |
| L2 | Grandpa pulls the turnip. He pulls and pulls. **The turnip will not move.** | **B3 資訊缺口** | 為什麼拔不動?要怎麼辦? | ✓ try→fail | ✓ open | ✓ inquiry |
| L3 | Grandpa calls Grandma. They both pull. **The turnip will not move.** | **B5 道德兩難** | 兩個還不夠 — 還要叫誰? | ✓ +1→still no | ✓ open | ✓ inquiry |
| L4 | Granddaughter runs out. Three of them pull. **The turnip will not move.** | **B4 期待加速** | 已經三個人了 — 還要幾個? | ✓ momentum | ✓ open | ✓ inquiry |
| L5 | The dog runs over. Four pulling now. **The turnip will not move.** | **B1 物理懸念** | 連狗都來了 — 還不夠? | ✓ scale→still | ✓ open | ✓ inquiry |
| L6 | The cat walks over. Five pulling now. **The turnip moves a little. But not enough.** | **B2 情緒翻轉** | 它動了 — 還差什麼? | ✓ no→yes-but | ✓ open | ✓ inquiry |
| L7 | The mouse holds the cat's tail. They pull one more time. **Out comes the turnip! The whole family shares a big dinner.** | **B6 open + 溫馨收** | 連最小的都重要 — 你家最小的是誰? | ✓ struggle→share | ✓ resolves | ✓ open hook |

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
| L7 | ✓ | resolves (intended) | resolved + open hook | 3/3 |

**All 7 cuts PASS** 3-question rule.

## Cumulative-structure challenge

Cumulative folktales (Repka / The House That Jack Built / This Is the Cow
That Kicked the Dog) all share one trap: **the middle beats feel
identical** ("X joins, still can't pull"). Cut analyst risk: L3-L5 read
as same hook (B5/B5/B5 = boring).

Mitigation applied here:
- L3 framed **B5 道德兩難** (who else can we ask? Grandma's the obvious one)
- L4 framed **B4 期待加速** (kid runs in mid-beat — energy lift)
- L5 framed **B1 物理懸念** (dog uses teeth — physical novelty)
- L6 framed **B2 情緒翻轉** ("it moved" subverts the 5-beat refrain)

Hook diversity matches Ch5/Ch8/Ch13 portfolio standard (≥4 distinct
B-types across 7 cuts).

## Time budget per lesson

Assumed 11 Q × 4 narration + 6 tests + vocab + hook ≈ 235-265s = 3.9-4.4 min ✓ all under 300s.

## A2 cumulative rhythm — teaching tool

Each lesson L3-L7 includes the refrain pattern:
"[Name1] pulled. [Name2] pulled. [Name3] pulled. The turnip would not move."

This is **the** A2 child-ELT memorization tool — repetition with one
new variable per beat. By L6 user has heard "pulled the turnip" 12+ times
and can produce it. By L7 user has heard "one more time" structure.

## Future hook map entries (sync to src/data/lessonHooks.ts)

```ts
'kt-ch20-l1': { type: 'B6',       inquiry: '蘿蔔會變多大?拔得起來嗎?' },
'kt-ch20-l2': { type: 'B3',       inquiry: '為什麼拔不動?要怎麼辦?' },
'kt-ch20-l3': { type: 'B5',       inquiry: '兩個還不夠 — 還要叫誰?' },
'kt-ch20-l4': { type: 'B4',       inquiry: '已經三個人了 — 還要幾個?' },
'kt-ch20-l5': { type: 'B1',       inquiry: '連狗都來了 — 還不夠?' },
'kt-ch20-l6': { type: 'B2',       inquiry: '它動了 — 還差什麼?' },
'kt-ch20-l7': { type: 'B6 open',  inquiry: '連最小的都重要 — 你家最小的是誰?' },
```

---

*Skill validation: cumulative voice yields heavy B5+B4+B1 mid-arc
(escalation hooks) + B6 bookends (planting → sharing). The chicken-leg
B1 from Baba Yaga has no parallel here — Repka is light folk, no terror.
Mouse-tail B6-open is deliberately warm-family resolution, not dark
justice. Pairs with Ch5 (dark Russian) as portfolio range demonstration.*
