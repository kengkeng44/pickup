# QA Audit Report — Ch5 / Ch6 / Ch7 First-6-Lessons Specs

> Auditor: Claude Opus 4.7 (QA agent)
> Date: 2026-05-31
> Scope: `docs/content-loop/ch5-spec.md`, `ch6-spec.md`, `ch7-spec.md` — only the "First 6 Lessons FULL Q data" + bonus blocks
> Checklist: 10 items per `docs/content-loop/design-conventions.md` §"QA agent checklist"
>
> **Legend**: `Ch{N}-L{M}-q{K}` = chapter, lesson, question index. `[BLOCKING]` = must fix before JSON gen. `[NIT]` = pattern issue, ship-friendly.

---

## Ch5 — How the Camel Got His Hump (Kipling)

### Issues per Q

- **Ch5-L2-q3 [BLOCKING]: duplicate option "page" appears twice in `options` array** — `["page", "page", "pace", "pad"]`. Either typo for `paid` / `page` (slot 0 vs 1), or the second `page` should be a distinct same-category trap (`pad`, `pace` already there → replace slot 1 with e.g. `page→pages` or `path`). Distractor doctrine impossible to satisfy with duplicate option. Also breaks `correctIndex` semantics (two correct indexes ambiguous).
- **Ch5-L6-q5 [NIT]: distractor doctrine — `Humph / Help / Hump / Harm`** all phonetic / spell-trap; missing 1 semantic (same-category sound word like `Hmm`) + 1 obvious-miss. Currently 1 correct + 3 phonetic = 1+3+0+0 pattern, deviates from 1+1+1+1.
- **Ch5-L4-q3 [NIT]: tap-tiles distractor tiles `dog / tail`** — `dog` is borderline same-category (animal noun), `tail` is body-part. Per doctrine should be 1 semantic + 1 obvious + 1 ? Spec only requires 2 distractor tiles per Ch1 baseline — passes Ch1 pattern but worth flagging as inconsistent with the 4-MC 1+1+1+1 rule applied loosely to tap-tiles.
- **Ch5-L1-q3 [NIT]: `jump / jog / drop / drip`** — all phonetic (initial consonant + short vowel). Missing semantic / obvious-miss slot. 1+3+0+0 pattern.
- **Ch5-L5-q5 [NIT]: `No / Yes / Sometimes / Only at night`** — fine binary contrast but no phonetic trap. Yes/No is intentional Y/N inference; acceptable but logs as deviating from 1+1+1+1 template.
- **Ch5-bonus-q9 [NIT]: difficulty `medium` in position bonus-9** — bonus mostly easy per template; spec says bonus is "easy-medium". OK.

### Clean Qs (no issues)

- Ch5-L1-q1, L1-q2, L1-q4, L1-q5
- Ch5-L2-q1, L2-q2, L2-q4, L2-q5
- Ch5-L3 all 5 (q3 tap-tiles tile count + correctOrder verified: 6 indices [0..5] of 8 tiles, no off-by-one)
- Ch5-L4-q1, q2, q4, q5, q6
- Ch5-L5-q1, q2, q3, q4, q6
- Ch5-L6-q1, q2, q3, q4, q6
- All bonus Qs except q9 (NIT only)

### Checklist roll-up

| # | Item | Status |
|---|---|---|
| 1 | Exactly 4 options | ✅ all 4-MC have 4 options (but L2-q3 has duplicate value — count OK, semantics broken) |
| 2 | Distractor 1+1+1+1 | ⚠️ L1-q3 / L5-q5 / L6-q5 deviate (mostly phonetic-heavy); L2-q3 broken by duplicate |
| 3 | `question` pure English no emoji | ✅ |
| 4 | `options[]` no emoji | ✅ |
| 5 | POV match (outer Mochi I, inner Kipling "you") | ✅ outer L1-L3 first-person, main L4-L6 uses Kipling 3rd/"O Best Beloved" frame correctly |
| 6 | `explanationZh` Mochi reflection + bilingual | ✅ all 30 have ZH + inline EN key vocab |
| 7 | `correctIndex` valid | ⚠️ L2-q3 ambiguous due to duplicate (slot 0 picked but slot 1 = same string) |
| 8 | Q types match lesson position template | ✅ L1-L3 prologue mix matches; L4-L6 main early correct |
| 9 | Difficulty bias | ✅ ~28 easy / 2 medium across 30 sample Q (matches easy-dominant early bias) |
| 10 | tap-tiles correctOrder no off-by-one | ✅ L3-q3 (6 of 8), L4-q3 (5 of 7), L6-q2 (6 of 8), bonus-q6 (6 of 8) — all valid index ranges |

### Verdict

**Ship-blocking: 1 issue (L2-q3 duplicate option).** Fix `["page", "page", "pace", "pad"]` → `["page", "paid", "pace", "pad"]` or similar. Other deviations are pattern-NITs around distractor doctrine being phonetic-heavy (3 phonetics instead of 1 phonetic + 1 semantic + 1 obvious-miss). Kipling "O Best Beloved" 2nd-person voice carved out correctly. POV layer clean. Bilingual reflection consistent. Bonus 10 Q within easy/medium budget. **Fix L2-q3 + relax distractor pool on L1-q3 / L5-q5 / L6-q5 → ready for JSON.**

---

## Ch6 — Baba Yaga 雞腳屋 (Russian dark folk)

### Issues per Q

- **Ch6-L1-q1 [NIT]: `colder / older / softer / smaller`** — all sound-alike `-lder/-ller/-fter` suffix family. 1+3+0+0 pattern (correct + 3 phonetic). Missing semantic trap (e.g. `warmer` as antonym) + obvious-miss (`yellow`). Suggest: `colder / older / warmer / yellow` for 1+phonetic+antonym+obvious.
- **Ch6-L5-q1 [NIT]: `doll / dog / dot / door`** — all 3 distractors are `do_` phonetic onset traps. Spec §5 explicitly claims "1+1+1+1 ✓" but this Q is 1+3+0+0 (sound-only). Add semantic trap like `toy` or `bear`.
- **Ch6-L6-q2 [NIT]: `tiny / tidy / timer / tile`** — same 1+3+0+0 ti- onset cluster. Spec self-claims 1+1+1+1; reality is phonetic-heavy.
- **Ch6-L1-q3 [NIT]: `heavy / sweet / warm / fast`** — close to 1+1+1+1 but `sweet` is taste-domain (not air-domain), `warm` is temperature (semantic), `fast` is speed (semantic). 1 correct + 2 semantic + 1 cross-sense = acceptable, on the boundary.
- **Ch6-L4-q3 [NIT]: `hard / hardly / harm / hand`** — `hardly` is morphology trap (correct word + suffix), `harm` and `hand` are phonetic. 1+1+2+0 — closer to spec but still missing obvious-miss. Suggest `softly` for obvious antonym.
- **Ch6-L2-q4 [NIT]: tap-tiles tiles include `{dogName}` literal placeholder** — `["{dogName}", "sits", ...]`. At runtime `applyDogName()` injects but tile shuffle UI may render `{dogName}` token before substitution. Verify load-time injection covers tile arrays, not just `sentence` / `explanationZh`. **Action**: check `applyDogName()` scope in `src/data/dogName.ts`.
- **Ch6-bonus-q1 [NIT]: `was she real / rich / ready / red`** — all `r-` onset phonetic. Same 1+3+0+0 pattern.
- **Ch6-bonus-q9 [NIT]: `scared / stared / shared / scarred`** — same s-/sc- phonetic cluster. Pattern repeats throughout chapter.

### Clean Qs

- Ch6-L1-q2 (jump/jog/join/joke — 4 phonetic but doctrine-acceptable as `type-what-you-hear` minimal-pair drill), q4, q5
- Ch6-L2-q1, q2, q3, q5
- Ch6-L3-q1, q2, q3, q4 (tap-tiles 7-tile correctOrder [0..6] valid), q5
- Ch6-L4-q1, q2, q4, q5 (tap-tiles soft/easy = antonym trap, doctrine-clean), q6
- Ch6-L5-q2, q3, q4, q5, q6
- Ch6-L6-q1, q3, q4, q5, q6

### Checklist roll-up

| # | Item | Status |
|---|---|---|
| 1 | Exactly 4 options | ✅ |
| 2 | Distractor 1+1+1+1 | ⚠️ spec §5 claims yes but L1-q1 / L5-q1 / L6-q2 / bonus-q1 / bonus-q9 are 1+3+0+0 phonetic clusters. Audit table is over-claiming. |
| 3 | `question` pure English no emoji | ✅ |
| 4 | `options[]` no emoji | ✅ |
| 5 | POV (outer Mochi I, inner dark 3rd-person sparse) | ✅ Vasilisa narration is terse 3rd-person; no dialogue softening per spec rule |
| 6 | `explanationZh` Mochi reflection + bilingual | ✅ several include `{catName}:` reflection lines (L1-q1, L4-q6, L6-q6, bonus-q1) |
| 7 | `correctIndex` valid | ✅ all `correctIndex: 0` matches first option |
| 8 | Q types match lesson position template | ✅ prologue listen-mc heavy, main listen-mc + comprehension + tap-tiles |
| 9 | Difficulty bias | ✅ mostly easy with medium on tap-tiles + L4-q5 / L5-q5 / L6-q5 — matches main-early "easy-medium" target |
| 10 | tap-tiles correctOrder no off-by-one | ✅ L2-q4 [0..4] of 7 tiles, L3-q4 [0..6] of 8, L4-q5 [0..5] of 8, L5-q5 [0..5] of 8, L6-q5 [0..5] of 8, bonus-q7 [0..6] of 8 — all valid |

### Verdict

**No blockers, but distractor doctrine systemic deviation.** Ch6 distractor pool over-relies on **phonetic onset clusters** (do-, ti-, r-, sc-, -lder); §5 self-audit claims 1+1+1+1 but actual pattern is 1 correct + 3 phonetic in ~5/30 sample Qs. Listen-mc + listen-comprehension may need 1 semantic + 1 obvious-miss injected per Q to hit TOEIC parity (Part 3 inference vs. Part 1 dictation balance). POV split clean. Dark theme A2-softening (iron teeth → old sharp teeth, eat you → very angry) consistent. **Tap-tiles placeholder `{dogName}` in tiles array needs runtime injection sanity check.** Ship after distractor pool diversification on the 5 flagged Qs.

---

## Ch7 — 六隻天鵝 (Grimm, poetic silent 3rd-person)

### Issues per Q

- **Ch7-L1-q1 [NIT]: `quiet / quick / quit / quite`** — all `qu-` onset phonetic. 1+3+0+0 cluster. Doctrine asks 1 semantic (e.g. `loud` antonym) + 1 obvious (`green`). Spec §5 even admits "1 correct, 3 phonetic" — explicitly off-doctrine.
- **Ch7-L1-q2 [NIT]: `jump / bump / dump / pump`** — `-ump` rhyme cluster, 1+3+0+0. Same issue.
- **Ch7-L1-q3 [NIT]: `here / hear / her / hair`** — 4 homophone/h- cluster, fine for `type-what-you-hear` minimal-pair drill but doctrine-loose.
- **Ch7-L3-q1 [NIT]: `tale / tail / tall / tell`** — 4 t- phonetic cluster.
- **Ch7-L4-q4 [BLOCKING-ish / NIT]: type `read-mc-with-audio` at lesson 4 position** — design-conventions §"Question type pacing" L4-6 main-early spec says `listen-mc + listen-comprehension`. `read-mc-with-audio` is reserved for L19-23 (aesop + outro). Ch7 lesson outline (§2) lists `read-mc-with-audio` in L4 / L6 / L8 / L10 / L14 / L16 / L18 — **systemic deviation from lesson-position template** across the whole chapter. Either update design-conventions to allow `read-mc-with-audio` in main, or strip from main lessons.
- **Ch7-L4-q6 [NIT]: difficulty `easy`** position 6 of main-early; design says L4-6 = "easy-medium", so easy OK but mix has zero medium at q6 — pacing slightly off.
- **Ch7-L5-q5 [NIT]: tap-tiles distractor tiles `fast / tree`** — `tree` is topical (story setting woods) so partial-truth trap, `fast` is obvious-miss. Doctrine-clean for tap-tiles.
- **Ch7-L6-q4 [NIT]: `swans / sheep / snakes / swords`** — all `s-` onset; `sheep` and `snakes` are same-category animal (good), `swords` is topical false (white shirts thrown). Mix is 1 correct + 2 same-category + 1 partial-truth = closer to doctrine but missing obvious-miss.
- **Ch7-bonus-q4 [NIT]: difficulty `hard` and bonus-q9 `hard`** — Ch7 budget is hard ≤5%. Bonus has 2 hard Q out of 10 = 20% locally. Across chapter still OK if rest is light, but bonus-heavy hard concentration may spike late-session difficulty.
- **Ch7-bonus-q10 [CHECK]: `tap-pairs` in bonus segmentType `review`** — `segmentType: "review"` for bonus is unusual (Ch5 + Ch6 use `bonus`). Conventions §"File output" doesn't strictly require `bonus`, but cross-chapter inconsistency. Spec note (§2 footer) acknowledges schema cap workaround — flag as known TBD.

### Clean Qs

- Ch7-L1-q4, q5
- Ch7-L2 all 5 (q4 tap-tiles [0..4] of 7 valid, includes fast/loud distractors = obvious-miss)
- Ch7-L3-q2, q3, q4 (tap-tiles [0..4] of 7, quickly/down = antonym/obvious), q5
- Ch7-L4-q1, q2, q3, q5
- Ch7-L5 all 6 (q5 tap-tiles [0..4] of 7 valid)
- Ch7-L6-q1, q2, q3, q5, q6
- Ch7-bonus-q1, q2, q3, q5, q6, q7, q8 (tap-tiles [0..5] of 8 valid), q10 (tap-pairs 4 pairs)

### Checklist roll-up

| # | Item | Status |
|---|---|---|
| 1 | Exactly 4 options | ✅ all 4-MC have 4; tap-pairs q10 has 4 pairs |
| 2 | Distractor 1+1+1+1 | ⚠️ L1-q1/q2/q3, L3-q1 are 4-phonetic clusters (spec §5 admits this). L4-q1, L5-q1, L6-q4 closer to doctrine. ~30% of sample Q deviate. |
| 3 | `question` pure English no emoji | ✅ |
| 4 | `options[]` no emoji | ✅ |
| 5 | POV (outer Mochi I, inner poetic silent 3rd-person no dialogue) | ✅ main lessons L4-L6 use "A king had", "She walked", "Feathers grew" — no quoted dialogue; sister is named only as "she / the sister / the little sister" matching poetic narration |
| 6 | `explanationZh` Mochi reflection + bilingual | ✅ all 35 sample Q have ZH + EN gloss for key vocab |
| 7 | `correctIndex` valid | ✅ all `correctIndex: 0` matches first option |
| 8 | Q types match lesson position template | ❌ **`read-mc-with-audio` appears in L4 / L6 main-early**, design conventions reserve it for L19-23 aesop + outro. Systemic — fix design conventions OR remove from main. |
| 9 | Difficulty bias | ⚠️ L1-q5, L2-q5, L3-q5 medium at q5 OK; L4-q3/q4 medium; bonus has 2 hard (q4 + q9) = 20% locally vs 5% chapter budget. Monitor full-chapter hard count when JSON shipped. |
| 10 | tap-tiles correctOrder no off-by-one | ✅ L2-q4 [0..4] of 7, L3-q4 [0..4] of 7, L5-q5 [0..4] of 7, bonus-q8 [0..5] of 8 — all valid index ranges |

### Verdict

**One semi-blocking convention conflict (item 8): `read-mc-with-audio` used in main-story lessons L4 / L6, which design-conventions reserves for L19-23.** Either update the conventions table to permit `read-mc-with-audio` in main (Ch7 spec author clearly intends it as TOEIC Part 5 mirror for paraphrase/idiom inference — "took a new wife → married someone new" is well-designed) or strip it from main and substitute `listen-comprehension`. Recommend **updating conventions** since the read-mc-with-audio Qs in Ch7-L4-q4 and L6-q3 are pedagogically strong inference questions. Distractor doctrine deviation similar to Ch6 — phonetic-cluster-heavy. POV (poetic silent 3rd-person) executed faithfully, no dialogue leaks. Bonus difficulty mix has 2 hard Q (20% locally) — keep an eye on full-chapter hard count. **Resolve convention conflict + diversify distractor pool on L1 + L3 → ready for JSON.**

---

## Cross-Chapter Summary

| Chapter | Blockers | NITs | Verdict |
|---|---|---|---|
| **Ch5** | 1 (L2-q3 duplicate option) | 5 (distractor pool phonetic-heavy) | Fix L2-q3 → ship |
| **Ch6** | 0 | 7 (systemic 1+3+0+0 distractor clusters; §5 self-audit over-claims) | Diversify distractor pool → ship |
| **Ch7** | 0 (1 convention conflict, semi-blocking) | 6 (distractor pool + bonus hard concentration) | Resolve `read-mc-with-audio` in main + diversify pool → ship |

### Cross-chapter pattern (systemic, all 3 specs)

**The 1+1+1+1 distractor doctrine is being interpreted as "4 phonetic cousins" in `listen-mc` Qs.** Doctrine intent is **1 correct + 1 same-category + 1 partial-truth + 1 obvious-miss**, not "1 correct + 3 minimal-pair sound-alikes". `type-what-you-hear` legitimately uses 4 phonetic cousins (it's a dictation drill), but `listen-mc` should mix categories.

**Recommendation to designer agent**: when generating future chapter Qs, enforce per-Q distractor matrix:

```
slot 0: correct
slot 1: same-category (color → color, emotion → emotion, animal → animal)
slot 2: partial-truth (mentioned/implied in audio but not the answer)
slot 3: obvious-miss (clearly off-topic, A2 vocab)
```

Apply random-shuffle of slots at JSON-gen time so `correctIndex` isn't always 0 (currently every sample Q has `correctIndex: 0` across all 3 chapters — predictable, gameable by tap-first-option).

### Action items for designer agent (priority order)

1. **[BLOCKING] Ch5-L2-q3**: replace duplicate `page` with distinct same-category option
2. **[BLOCKING-ish] Ch7 main lessons**: resolve `read-mc-with-audio` convention conflict (recommend updating conventions to permit in main, since Ch7 usage is pedagogically sound)
3. **[HIGH] All 3 chapters**: diversify distractor pool — replace 4-phonetic-cluster Qs with 1+1+1+1 category mix on flagged Qs
4. **[HIGH] All 3 chapters**: randomize `correctIndex` at JSON-gen, currently 100% slot-0
5. **[MEDIUM] Ch6-L2-q4**: verify `{dogName}` placeholder injection covers tap-tiles `tiles[]` array, not just `sentence` / `explanationZh`
6. **[LOW] Ch7-bonus**: 2 hard Q in 10-Q bonus = 20% local; verify full-chapter hard stays ≤5%

---

*End of QA report. Designer agent fixes → re-submit for round-2 audit before JSON generation.*
