# Tortoise and Hare — Lesson Cut Analysis

> Output of `narrative-cut-analyst` skill applied to `tortoise-hare.md`.
> Generated 2026-06-04 for Pickup Ch3.

## Inputs

- **Story**: tortoise-hare.md (7-beat arc, dialogue-heavy)
- **Target lesson count**: 7
- **Avg lesson time**: 5 min (300s budget)
- **Tolerance**: 25%

## Step 1-3: Emotional arc + peak detection

```
Beat 1 (hare boasts)         val = +0.4 → -0.2  (pride → mocking, |Δv|=0.6)  ⚡ peak
Beat 2 (challenge set)       val = -0.2 → +0.5  (mock → bold turn, |Δv|=0.7) ⚡ peak
Beat 3 (race starts)         val = +0.5 → -0.4  (excite → hopeless gap)      ⚡ peak
Beat 4 (hare naps)           val = -0.4 → +0.1  (hopeless → opening, |Δv|=0.5) ⚡ peak
Beat 5 (tortoise plods past) val = +0.1 → +0.5  (quiet build, suspense rises) ⚡ peak
Beat 6 (hare wakes)          val = +0.5 → -0.6  (calm → panic, |Δv|=1.1)     ⚡⚡ peak
Beat 7 (tortoise wins)       val = -0.6 → +0.9  (panic → triumph, |Δv|=1.5)  🌟 climax
```

## Step 4-6: Hook classification + cut selection

| L# | Cut location (sentence ends here) | Hook | Inquiry-terminating Question | McKee | Stein | Brewer |
|----|-----------------------------------|------|------------------------------|-------|-------|--------|
| L1 | The hare laughs at the tortoise. "Can you even walk?" The tortoise looks up, slow and quiet. **"I will race you," he says.** | **B2 情緒翻轉** | 烏龜怎敢挑戰?他想做什麼? | ✓ mock→bold | ✓ open | ✓ inquiry |
| L2 | The fox agrees to be the judge. The animals all come to watch. "Ready, set, go!" calls the fox. **The hare runs off. The tortoise takes one step.** | **B3 資訊缺口** | 差距這麼大,烏龜能追嗎? | ✓ even→gap | ✓ open | ✓ inquiry |
| L3 | The hare looks back. The tortoise is a tiny dot. "I have time. I will rest under this tree." **He sits down. His eyes close.** | **B5 道德兩難** | 兔子真的要睡?會醒嗎? | ✓ run→rest | ✓ open | ✓ inquiry |
| L4 | The tortoise walks past the sleeping hare. He does not stop. He does not look. **His feet move one after the other, slow and sure.** | **B6 預言種子** | 兔子要醒了嗎?烏龜還剩多遠? | ✓ static→momentum | ✓ open | ✓ inquiry |
| L5 | The other animals start to whisper. **"Is the hare still sleeping?"** | **B5 道德兩難** | 沒人叫醒兔子嗎?該不該叫? | ✓ silence→doubt | ✓ open | ✓ inquiry |
| L6 | The hare opens his eyes. The sun is low. He looks down the road. **The tortoise is at the big tree.** | **B2 情緒翻轉** | 兔子來得及嗎?還是輸定了? | ✓ calm→panic | ✓ open | ✓ inquiry |
| L7 | The tortoise touches the tree. The fox lifts a paw. "The tortoise wins!" The hare cannot speak. **The tortoise smiles. "Slow and steady wins the race."** | **B2 大翻轉** | (climax + 開放後鉤) | ✓ panic→triumph | ✓ ends | ✓ resolved |

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

## Time budget per lesson

Assumed 11 Q × 4 narration + 6 tests + vocab + hook ≈ 235-265s = 3.9-4.4 min ✓ all under 300s.

## Next step

Write `tools/_write-ch3-tortoise-hare.cjs` with 7 lessons × 11 Q each, dialogue-heavy stems, hook narration ending per row above.

## Future hook map entries (sync to src/data/lessonHooks.ts)

```ts
'kt-ch3-l1': { type: 'B2', inquiry: '烏龜怎敢挑戰?他想做什麼?' },
'kt-ch3-l2': { type: 'B3', inquiry: '差距這麼大,烏龜能追嗎?' },
'kt-ch3-l3': { type: 'B5', inquiry: '兔子真的要睡?會醒嗎?' },
'kt-ch3-l4': { type: 'B6', inquiry: '兔子要醒了嗎?烏龜還剩多遠?' },
'kt-ch3-l5': { type: 'B5', inquiry: '沒人叫醒兔子嗎?該不該叫?' },
'kt-ch3-l6': { type: 'B2', inquiry: '兔子來得及嗎?還是輸定了?' },
'kt-ch3-l7': { type: 'B2 big', inquiry: '(慢而穩之外 — 兔子學到了嗎?)' },
```

---

*Skill validation: dialogue-heavy story yields heavy B2/B5 mix (moral pivots inside speech acts). Hare's nap = 2 cuts (L3 sleep + L5 whisper) — the suspense lives in the ambiguity of whether anyone wakes him. Pattern matches Stein "cycles of suspense" — multiple overlapping threads.*
