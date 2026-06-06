# Crane Gratitude — Lesson Cut Analysis

> Output of `narrative-cut-analyst` skill applied to `crane-gratitude.md`.
> Generated 2026-06-07 as Ch17 URL pipeline ship.
> Theme line: 「不能偷看的房間 — 善意有回報, 但好奇會打破信任」(A2 ELT 報恩 + 禁忌 hook).

## Inputs

- **Story**: crane-gratitude.md (7-beat arc)
- **Target lesson count**: 7
- **Avg lesson time**: 5 min (300s budget)
- **Tolerance**: 25%

## Step 1-3: Emotional arc + peak detection

```
Beat 1 (old man frees crane)        val = +0.1 → +0.3  (calm → small joy of kindness)        ⚡ minor
Beat 2 (young woman knocks)         val = +0.3 → +0.5  (curiosity → warmth)                  ⚡ peak
Beat 3 (forbidden room rule)        val = +0.5 → +0.4  (warmth → unease at the rule)         ⚡ peak (pivot)
Beat 4 (merchant praises cloth)     val = +0.4 → +0.7  (success → joy, but curiosity grows)  ⚡ peak
Beat 5 (urge to peek grows)         val = +0.7 → +0.2  (joy → moral tension)                 ⚡ peak
Beat 6 (sees crane pulling feather) val = +0.2 → -0.6  (shock → guilt + sorrow)              ⚡⚡ peak
Beat 7 (crane flies away)           val = -0.6 → -0.2  (loss → quiet acceptance)             🌟 climax
```

## Step 4-6: Hook classification + cut selection

| L# | Cut location (sentence ends here) | Hook | Inquiry-terminating Question | McKee | Stein | Brewer |
|----|-----------------------------------|------|------------------------------|-------|-------|--------|
| L1 | The old man frees the crane and watches it fly. **It flies up into the grey sky — will it come back?** | **B6 預言種子** | 鶴會回來嗎? | ✓ kindness→? | ✓ open | ✓ inquiry |
| L2 | A young woman knocks at the door, snow on her hair. **She smiles with a quiet face... who is she?** | **B3 資訊缺口** | 她是誰? | ✓ welcome→? | ✓ open | ✓ inquiry |
| L3 | She asks to weave a cloth, but says never look. **Why must she hide while she weaves?** | **B5 道德兩難** | 為什麼她要躲起來織? | ✓ trust→? | ✓ open | ✓ inquiry |
| L4 | A merchant pays a big bag of gold for the cloth. **But the old man's heart wonders... who is she really?** | **B4 期待加速** | 老爺爺好奇了 | ✓ success→? | ✓ open | ✓ inquiry |
| L5 | Every night the urge to peek grows stronger. **"Just one small peek," he thinks. "She will never know..."** | **B1 物理懸念** | 他會偷看嗎? | ✓ moral→? | ✓ open | ✓ inquiry |
| L6 | He looks. There is a white crane pulling her own feathers. **Their eyes meet — will she still stay?** | **B2 情緒翻轉** | 她會留下嗎? | ✓ shock→sorrow | ✓ open | ✓ inquiry |
| L7 | The crane flies up, up, up into the morning sky. **The sky is empty — but what did we learn?** | **B6 open 開放後鉤** | 學到什麼? | ✓ loss→peace | ✓ open hook | ✓ resolved + open |

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
| L7 | ✓ | resolves (crane gone) + opens (lesson?) | resolved + open hook | 3/3 |

**All 7 cuts PASS** 3-question rule.

## Time budget per lesson (preliminary)

Assumed 11 Q × ~4 narration + 6 tests + vocab ≈ 230-260s = 3.8-4.3 min ✓ all under 300s budget.

## Story-specific design notes

- **No death**: Per user rule, 鶴 flies away (transformation back to crane form), NOT 'died'. The old man is left with a soft cloth + quiet sorrow.
- **No 'wife'**: per 兒童化規則 + A2 simplification, the young woman is a 'companion' / family-like figure. Old man calls 'Grandfather' framing (反向, she calls him 'Grandfather'). NEVER marry / wife / husband lexis.
- **'Pulled her own feathers'**: A2 + non-blood. Used user-given exact phrasing.
- **'Flew away to the sky'**: closing image, hopeful + bittersweet. NOT 'gave up' / 'never came back' (those are Ch1 桃太郎 / 浦島 patterns, this is gentler).
- **Cultural pair**: Japanese folk trio with Ch1 桃太郎 (energy + bravery) + Ch14 浦島太郎 (quiet + bittersweet wisdom). Ch17 = 信任 + 承諾 + 好奇心代價. Each Japanese folk hits a different moral fibre.
- **Taboo母題 parallel**: Ch14 浦島 (Tamatebako, never open) + Ch17 鶴 (forbidden room, never peek). Both punish curiosity, both end with quiet wisdom — but Ch14 punishes the man with time, Ch17 punishes him with loss of trust.

## Next step

Apply `pickup-item-writer` skill → write `tools/_write-ch17-crane-gratitude.cjs` with 7 lessons × 11 Q each, ending each on the hook narration above.

## Future hook map entries (sync to src/data/lessonHooks.ts + tools/_content-db.cjs)

```ts
'kt-ch17-l1': { type: 'B6',      inquiry: '鶴會回來嗎?' },
'kt-ch17-l2': { type: 'B3',      inquiry: '她是誰?' },
'kt-ch17-l3': { type: 'B5',      inquiry: '為什麼她要躲起來織?' },
'kt-ch17-l4': { type: 'B4',      inquiry: '老爺爺好奇了' },
'kt-ch17-l5': { type: 'B1',      inquiry: '他會偷看嗎?' },
'kt-ch17-l6': { type: 'B2',      inquiry: '她會留下嗎?' },
'kt-ch17-l7': { type: 'B6 open', inquiry: '學到什麼?' },
```

---

*Skill validation: narrative-cut-analyst pipeline 5th full apply (1st = 桃太郎, 2nd = ugly-duckling, 3rd = three-pigs, 4th = urashima, 5th = crane-gratitude Ch17 2026-06-07). Pattern: B6 opening (kindness seed) → B3 mid-curiosity (who is she?) → B5/B4 dilemma (hidden room + wealth) → B1 building (urge to peek) → B2 reveal (truth shock) → B6 open close (loss + wisdom). Consistent with universal 3-question rule.*
