# houyi — Lesson Cut Analysis

> Output of `narrative-cut-analyst` skill applied to `houyi.md`.
> Generated 2026-06-07 as Ch11 pipeline ship.
> Theme line: 「太多會燒壞世界 — 留下剛剛好的那一個」(中華神話 A2 ELT, 不血腥).

## Inputs

- **Story**: houyi.md (7-beat arc)
- **Target lesson count**: 7
- **Avg lesson time**: 5 min (300s budget)
- **Tolerance**: 25%
- **Pairing**: Ch10 嫦娥奔月 (Chang'e POV) ↔ Ch11 后羿射日 (Hou Yi POV)

## Step 1-3: Emotional arc + peak detection

```
Beat 1 (10 suns appear)         val = +0.2 → -0.7  (calm → world burns)             ⚡⚡ peak
Beat 2 (bow from Jade Emperor)  val = -0.5 → +0.0  (terror → hero summoned)         ⚡ peak
Beat 3 (first arrow flies)      val = -0.6 → -0.2  (dread → first action taken)     ⚡ peak
Beat 4 (nine suns down)         val = -0.2 → +0.3  (relief growing → only 1 left)   ⚡⚡ peak
Beat 5 (mercy, one sun stays)   val = +0.3 → +0.8  (decision → world heals)         ⚡ peak
Beat 6 (Jade Emperor angry)     val = +0.8 → -0.5  (saved world → demoted to human) ⚡⚡ peak
Beat 7 (mortal Hou Yi + Chang'e) val = -0.5 → +0.5 (loss → quiet peace, open hook)  🌟 climax + open
```

## Step 4-6: Hook classification + cut selection

| L# | Cut location (sentence ends here) | Hook | Inquiry-terminating Question | McKee | Stein | Brewer |
|----|-----------------------------------|------|------------------------------|-------|-------|--------|
| L1 | Ten suns rise. Land burns. Children cry. **The Jade Emperor in the sky watches the burning land...** | **B6 預言種子** | 10 個太陽出現 → 人們會怎樣? | ✓ peace→peril | ✓ open | ✓ inquiry |
| L2 | Jade Emperor gives Hou Yi a red bow + ten arrows. "Shoot down nine. Keep one." **Hou Yi holds the bow tight. He looks at the burning sky...** | **B3 資訊缺口** | 玉皇大帝給羿一張弓 → 他能擔下嗎? | ✓ summons→test | ✓ open | ✓ inquiry |
| L3 | Hou Yi walks the dry land. He lifts the bow. He pulls the string. **He takes a deep breath. He lets one arrow fly...** | **B4 期待加速** | 羿走遍大地找太陽 → 第一個怎麼射? | ✓ approach→strike | ✓ open | ✓ inquiry |
| L4 | He shoots second, third, more. One by one suns fall. Only one is left. **Hou Yi lifts his bow one more time. He looks at the last sun...** | **B5 道德兩難** | 9 個太陽射下 → 剩 1 個會留嗎? | ✓ momentum→pause | ✓ open | ✓ inquiry |
| L5 | He does not shoot. He puts the bow down. Rivers run. Grass green. Children laugh. **The Jade Emperor in the sky watches it all...** | **B6 預言種子** | 留下太陽照大地 → 王看見嗎? | ✓ mercy→noticed | ✓ open | ✓ inquiry |
| L6 | Jade Emperor says nine suns were his own children. "You cannot be a god any more." **Hou Yi gives up his place. He becomes a normal man...** | **B2 情緒翻轉** | 王不再讓羿做神 → 羿會怎麼回應? | ✓ hero→demoted | ✓ open | ✓ inquiry |
| L7 | Hou Yi + Chang'e walk the green earth as people. They grow old like people grow old. Bow on the wall. **What came next was Chang'e's story...** | **B6 open 開放後鉤** | 凡人羿與凡人嫦娥 → 命運如何 (銜接 Ch10) | ✓ loss→peace | ✓ resolved + open | ✓ resolved + open hook |

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
| L7 | ✓ | resolves (Hou Yi mortal) + opens (Chang'e story coming) | resolved + open hook | 3/3 |

**All 7 cuts PASS** 3-question rule.

## Time budget per lesson (preliminary)

Assumed 11 Q × ~4 narration + 6 tests + vocab + hook ≈ 235-265s = 3.9-4.4 min ✓ all under 300s budget.

## Story-specific design notes

- **太陽不是 living**: 嚴守 'shot down the suns' / 'the suns fell' — **never** 'killed' / 'died'. 中華神話 A2 教學重點不是流血, 是「太多會燒壞世界 → 剛剛好」概念.
- **Hou Yi 不是被罰**: L6 用 'gave up his place' (主動) 而不是 'was punished' (被動受罰). 給 8-12 兒童「英雄選擇放下身份」的成熟敘事.
- **Mortal pivot (L7)**: 結局 = 凡人羿 + 凡人嫦娥, 是 Ch10 嫦娥奔月的起點. 兩章可串連 cross-POV.
- **A2 vocab key**: shoot / bow / arrow / sun / sky / fell / kept / gave up — 全 NGSL ≤ 2000.

## Pairing with Ch10 嫦娥奔月 (cross-POV ELT design)

- **Ch11 L1-L5**: Hou Yi 視角 (主動射日, 慈悲留下 1 個)
- **Ch11 L6**: 兩人共同被貶 (overlap point with Ch10)
- **Ch11 L7**: 開放點向 Chang'e story (跳 Ch10 觀)
- **Ch10** (already in pipeline / parallel work): Chang'e 視角 — 同一段 mortal demotion 從她角度看 + 不死藥 + 奔月

## Next step

Apply `pickup-item-writer` skill → write `tools/_write-ch11-houyi.cjs` with 7 lessons × 11 Q each, ending each on the hook narration above.

## Future hook map entries (sync to src/data/lessonHooks.ts + tools/_content-db.cjs)

```ts
'kt-ch11-l1': { type: 'B6',      inquiry: '10 個太陽出現 → 人們會怎樣?' },
'kt-ch11-l2': { type: 'B3',      inquiry: '玉皇大帝給羿一張弓 → 他能擔下嗎?' },
'kt-ch11-l3': { type: 'B4',      inquiry: '羿走遍大地找太陽 → 第一個怎麼射?' },
'kt-ch11-l4': { type: 'B5',      inquiry: '9 個太陽射下 → 剩 1 個會留嗎?' },
'kt-ch11-l5': { type: 'B6',      inquiry: '留下太陽照大地 → 王看見嗎?' },
'kt-ch11-l6': { type: 'B2',      inquiry: '王不再讓羿做神 → 羿會怎麼回應?' },
'kt-ch11-l7': { type: 'B6 open', inquiry: '凡人羿與凡人嫦娥 → 命運如何 (銜接 Ch10)' },
```

---

*Skill validation: narrative-cut-analyst pipeline applied to Chinese folk myth (Ch11 后羿射日, public domain). Pattern: B6 opening (foreshadow burning land) → B3/B4/B5 mid (escalating mercy decision) → B2 turn (mortal demotion) → B6 open close (pointing to Ch10 嫦娥). Consistent with 3-question rule.*
