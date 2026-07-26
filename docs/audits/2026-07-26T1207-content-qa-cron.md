# Content QA — 2026-07-26 12:07 UTC

**Today's angle:** A3 — 語意 Leak (story 跳針 / cross-lesson forward reference / narrative discontinuity)
**Focus:** Ch9–16 (Cinderella, Chang'e, Hou Yi x2, Zhinu-Niulang, Red Riding Hood, Urashima Taro, Emperor's New Clothes, Issun-boshi)

---

## A. validate-lessons.js result

```
WARN lessons-ch9.json:  8 lint issue(s)   (X2, X49, X57)
WARN lessons-ch10.json: 9 lint issue(s)   (X2, X49, X57)
WARN lessons-ch11.json: 16 lint issue(s)  (X2, X49, X57)
WARN lessons-ch12.json: 12 lint issue(s)  (X49, X57)
WARN lessons-ch13.json: 12 lint issue(s)  (X2, X49, X57)
WARN lessons-ch14.json: 10 lint issue(s)  (X2, X49, X57)
WARN lessons-ch15.json: 9 lint issue(s)   (X2, X49, X57)
WARN lessons-ch16.json: 10 lint issue(s)  (X2, X49, X57)
Total mirror-lint issues: 440  (warn-only; MIRROR_LINT_STRICT=1 to fail build)
```

All chapters pass JSON schema shape validation. Lint issues are pre-existing carry-overs (X2/X49/X57); no new regressions.

---

## B. Violation Table

| Ch | Q ID | type | snippet | violation | 修法 | audio regen? |
|----|------|------|---------|-----------|------|-------------|
| 15 | kt-ch15-l3-q6 + kt-ch15-l4-q6 | listen-mc | `"Am I not smart enough?" he thought to himself.` | **CROSS_LESSON_SKIP 跳針**: exact same Q sentence used for minister (l3) and emperor (l4) inner monologue — identical audio, different character, learner attribution confusion | l4 版: replace sentence with `"He looked again. Nothing. Am I truly unfit to be emperor?" he thought.` so audio is distinct | ✅ l4 only |
| 14 | kt-ch14-l3-q5 | listen-tf | `She said, "I was that little turtle on the beach."` | **FORWARD_REFERENCE**: princess reveals she IS the turtle — but this reveal appears in l3, before the turtle-to-princess transformation is narratively established in l3 narrations | Move this Q to l5 or l6 where the Tamatebako gift scene confirms the princess–turtle identity | No |
| 11 | kt-ch11-l4-q5 | listen-tf | `A small green shoot pushed up through the dry earth.` | **FORWARD_REFERENCE**: this image of earth recovery appears in l4 Qs but the earth-healing narration is first explicitly described in l5 narrations ("The rivers ran again. The grass turned green") | Move Q to l5, or add bridging narration in l4: "Below the archers, the land waited for the rain to come back." | No |
| 15 | kt-ch15-l3-q8 | listen-mc | `"Lovely! Truly lovely!" he said with a tight smile.` | **MINOR FORWARD ECHO**: the word "lovely" echoes l4 narration (`All his men nodded fast. They all said it was lovely`) — minor spillover but Q appears 1 lesson early | Replace with `"Fine work! Most beautiful!" he said with stiff praise.` to distinguish minister's scene from all-men scene | No |
| 14 | various l3/l5 | narration | `She says` / `She takes` / `she says` | **TENSE DRIFT**: Ch14 narrations mix present tense ("She says", "Take this", "she says") with past tense ("She gave him", "The turtle brought") within the same chapter — register inconsistency mid-story | Standardise all narrations to simple past: "She said", "She took", "gave him". Affects ~4 narration entries in l3 and l5 | No |
| 16 | kt-ch16-l7 | narration (close) | `Issun and the princess become family. He is big enough now to start a home...` | **TENSE DRIFT in 複習 close**: final 複習 narration uses present tense ("become", "is") breaking past-tense register of entire chapter | Fix: `Issun and the princess became family. He was big enough now to begin a home...` | No |

### Confirmed True P0

**⚠️ P0 — Ch15 kt-ch15-l3-q6 / kt-ch15-l4-q6 — CROSS_LESSON_SKIP 跳針**

Both the minister (l3) and the emperor (l4) think *identical inner monologue*: `"Am I not smart enough?" he thought to himself.`

In the original Hans Christian Andersen story this is intentional narrative irony — both characters have the same fear. But in an audio-first ELT app, the identical TTS sentence creates a recall-confusion risk: learners who already heard the sentence in l3 may tag it as "minister's thought" and answer incorrectly in l4's `"What did the emperor secretly fear?"` question (they may recognise the audio but recall the wrong character).

**Severity**: High — audio identity across lessons with different character attribution collapses the comprehension test into a recall test of "which lesson am I in?"

---

## C. Stats

| Category | Count |
|----------|-------|
| True P0 violations | 1 |
| True P1 violations | 3 |
| Narrative voice/pacing improvements | 3 |
| Chapters audited | 8 (Ch9–16) |
| Q items scanned | ~560 |
| Cross-lesson sentence duplicates found | 1 pair |
| Tense drift instances | ~6 narration entries across Ch14/16 |

---

## D. Top 5 P0

1. **⚠️ P0 — Ch15 跳針** `kt-ch15-l3-q6` + `kt-ch15-l4-q6`: Same Q sentence for minister + emperor inner monologue. Fix: rewrite l4 sentence to distinguish emperor's voice from minister's voice. Audio regen required for l4 only.

2. **P1 — Ch14 Forward Reference** `kt-ch14-l3-q5`: Princess-is-turtle reveal in l3 before the narrative context establishes it. Move Q to l5/l6.

3. **P1 — Ch11 Forward Reference** `kt-ch11-l4-q5`: Earth-healing imagery used in l4 Q before l5 establishes it in narration. Move or add bridging narration.

4. **P1 — Ch14 Tense Drift**: Multiple narration entries in l3 and l5 use present tense ("She says", "Take this") inconsistently with chapter's past-tense narration register.

5. **P1 — Ch16 複習 Tense Drift** `kt-ch16-l7` close narration: "Issun and the princess become family" — present-tense ending breaks past-tense chapter register.

---

## E. Narrative Voice / Pacing Improvements (required 3, even with 0 hard violations)

### E1 — Ch9 l7 複習 closing narration: adult-register moral tag

> Current: `"And the fairy godmother? Gone with the wind. The real magic was inside her all along..."`

"The real magic was inside her all along" is a worn cliché in English children's media (cf. *Shrek*, *Brave*, *Moana* — all use this or variants). For 8–12 children it reads as lecture, not story. It also breaks the warm-grandma narrator voice.

**Suggested rewrite**: `"And the fairy godmother? She stepped back into the dark with a small smile. The kind of smile only cats and grandmothers know."`

This: (a) keeps Ghibli/奶奶 register, (b) connects to Mochi brand, (c) avoids the moral-telling problem Buck 2001 identifies (the passage should invite inference, not state it).

### E2 — Ch14 narration tense drift creates story-register confusion

Ch14 mixes past-tense narration ("She gave him", "The turtle brought", "He walked up") with present-tense narration ("She says", "He thinks of his old mother") across l3–l5. This is inconsistent.

The present-tense entries appear to be cliffhanger/suspense hooks at lesson ends: `"'Stay one day,' she says."` — these are intended as story-dramatic present, not simple-past narration. If the author wants this effect (故事現在式, storytelling-present as in Arabian Nights frame), it should be **consistent and intentional**: either ALL lesson-closing narrations use present tense for dramatic effect, or ALL use past.

**Recommendation**: standardise ALL narrations to simple past, and use present tense ONLY for Grandma's frame narration in the outer prologue. This avoids ELT learner confusion (A2 learners frequently struggle with tense switching in listened input — Buck 2001 §4.3).

### E3 — Ch16 l3/l4 lesson-ending cliffhangers: great, but l5's lacks payoff rhythm

Ch16 has excellent cliffhanger lesson-ending narrations:
- l3: `"A tiny boy in a rice bowl, going to the big city. Who will he meet on the way?"`
- l4: `"The wood is too quiet. Something is hiding in the trees..."`
- l5: `"A tiny boy stands between the demon and the princess. Can he stop him?"`
- l6: `"The demon drops a small wooden mallet behind him. What can it do?"`

The pattern is consistent. But l7 複習 closing (`"Issun and the princess become family. He is big enough now to start a home..."`) breaks the pattern with a flat statement. It should also end with a hook that brings learners back to the grandma frame:

**Suggested**: `"And the little needle-sword? It stayed on the shelf. Issun never needed it again. The end."`

This lands the story with satisfying closure (needle-sword callback) and a clear oral-story `The end` marker consistent with grandma-storytelling register.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### ARCH-REC #206: X206_DUAL_CHARACTER_INNER_MONOLOGUE_TAG

**Finding**: Ch15 reveals a structural gap — when two characters share the same inner monologue sentence (as in the original Andersen text), the audio-first architecture has no way to signal whose thought is being heard. The Q sentence is identical across lessons; only the question stem and correct-option differ.

**Industry pattern**: Duolingo Stories (2026 review in [IJIOE](https://onlineinnovationsjournal.com/streams/adaptive-and-personalized-learning-online/253642564ed3ef9d.html)) annotates each story segment with a `speaker` field so the TTS pipeline voices each segment with the appropriate character voice (or narrator voice). This also serves as a visual context cue ("The minister thinks..." label).

**Research backing**: Inner monologue attribution is identified in narrative writing craft as the primary POV confusion vector (Jami Gold, 2020; The Editor's Blog, 2012) — identical first-person thought-text assigned to two characters in close proximity creates reader/listener confusion unless a voice, tense, or formatting marker distinguishes them. In ELT assessment, this degrades the comprehension test to a "which lesson am I in?" memory test (Buck 2001).

**Pickup fit analysis**:

| Criterion | Assessment |
|-----------|-----------|
| Tech stack | React 18 + Zod JSON schema — adding `speakerTag?: string` to `listen-mc`/`listen-tf` schema is a 1-line Zod change + ~10 line renderers.tsx change. No backend needed. |
| Content impact | Only affects lessons where inner monologue is shared across characters (currently 1 confirmed case in Ch15; likely 1-2 more in Ch11 Hou Yi/Chang'e parallel narrations). Low volume. |
| Audio impact | speakerTag would not change TTS audio (grandma TTS is per-sentence, not per-character). It would add a small visual label above the sentence card: `💭 The minister thinks:` |
| Learner benefit | Resolves A2 learner POV confusion for dual-character inner-monologue sentences. Directly addresses the P0 violation found this cycle. |
| Effort | S (~1 hr: Zod schema + renderers.tsx label + 2 JSON entries) |
| ROI | High — prevents recurring P0 跳針 issues in chapters using parallel character scenes (common in folklore/fairy tale structures) |

**Verdict**: ✅ Implement. Small effort, directly resolves P0, prevents future structural confusion as new chapters with parallel character arcs are added.

**Concrete change**:
- `src/data/lessons.ts` Zod schema: add `speakerTag: z.string().optional()` to `ListenMcEntry` and `ListenTfEntry`
- `src/react-app/renderers.tsx`: if `speakerTag` present, render `<div class="pickup-speaker-tag">💭 {speakerTag}</div>` above sentence card
- `public/lessons-ch15.json` kt-ch15-l3-q6: add `"speakerTag": "The minister thinks:"`
- `public/lessons-ch15.json` kt-ch15-l4-q6: add `"speakerTag": "The emperor thinks:"` + rewrite sentence (see P0 fix above)

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|------------|--------|-----|---------|
| `speakerTag` field for inner monologue disambiguation | [Duolingo Stories segment speaker annotation](https://onlineinnovationsjournal.com/streams/adaptive-and-personalized-learning-online/253642564ed3ef9d.html) | ✅ 完全適合 — Zod + renderers.tsx + JSON only | S (1 hr) | High | ✅ Implement |

---

*Audit by cron agent — 2026-07-26 12:07 UTC. Next angle: R1 (paraphrase depth, Ch9-16) or A4 (mirror patterns, Ch9-16).*
