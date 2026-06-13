# Content QA — 2026-06-13 06:13 UTC

Today's angle: **#10 — Audio Sync (WebSpeech TTS Hazard Scan) — Round 3**
Focus: **Ch6–14 · Post-CJK-strip parenthetical residue · EM_DASH in listen-* types · Systemic ellipsis rendering**

> Audio Sync rotation history: Round 1 (2026-06-04) Ch0+Ch1 file-presence. Round 2 (2026-06-08) Ch1 sentence-drift + Ch2-5 TTS hazards.
> **Round 3 scope**: Ch6–14, all WebSpeech-only (no pre-generated MP3 — `CHAPTERS_WITH_MP3 = new Set([1])`).
> Focus: text that `cleanText()` (tts.ts:274) does NOT currently normalize; residual parenthetical after CJK strip; EM_DASH in active listening question types.

---

## A. validate-lessons.js result

```
OK  lessons-ch6.json:  7 lessons
OK  lessons-ch7.json:  7 lessons  (1 lint issue: X2_OPTION_LIST_BIAS kt-ch7-l7-q5)
OK  lessons-ch8.json:  7 lessons
OK  lessons-ch9.json:  7 lessons
OK  lessons-ch10.json: 7 lessons  (1 lint issue: X2_OPTION_LIST_BIAS kt-ch10-l7-q7)
OK  lessons-ch11.json: 7 lessons
OK  lessons-ch12.json: 7 lessons
OK  lessons-ch13.json: 7 lessons
OK  lessons-ch14.json: 7 lessons

Total lint issues (this range): 2 (warn-only X2_OPTION_LIST_BIAS)
No schema errors. All 9 files parse cleanly.
```

**Angle #10 (audio sync / TTS hazard) is NOT currently linted by CI.** 0/693 questions auto-flagged for TTS issues.

---

## B. Violation table

| Ch | Q ID | Type | Snippet (raw sentence) | Post-strip TTS text | Violation | 修法 | audio regen? |
|----|------|------|------------------------|---------------------|-----------|------|-------------|
| 7 | kt-ch7-l5-q5 | **listen-mc** | `In a soft flash, a 青衣 (blue cloak) and two small gold shoes lay on the floor.` | `In a soft flash, a (blue cloak) and two small gold shoes lay on the floor.` | **P0 TTS_PARENS_RESIDUAL** — listen-mc sentence. After CJK strip, article `a` directly precedes orphaned `(blue cloak)`. iOS Safari may say "a open paren blue cloak close paren" breaking listening comprehension. | Remove CJK annotation from sentence: `"In a soft flash, a blue cloak and two small gold shoes lay on the floor."` | No (WebSpeech) |
| 6 | kt-ch6-l3-q10 | **listen-comprehension** | `Her hands grew cold. The empty beds said one thing — her brothers were gone.` | same (EM_DASH not stripped) | **P1 EM_DASH_LISTEN** — EM_DASH in active listening question. WebSpeech on iOS may read as "dash" or insert silence gap mid-sentence. | Replace `—` with `.` split: `"Her hands grew cold. The empty beds told her one thing: her brothers were gone."` | No |
| 7 | kt-ch7-l6-q5 | **listen-mc** | `She did not stop to pick it up — the voices behind her were too close.` | same | **P1 EM_DASH_LISTEN** — EM_DASH in active listening question; causal clause disrupted by prosodic gap. | Split into simpler A2 sentences: `"She did not stop to pick it up. The voices behind her were too close."` | No |
| 7 | kt-ch7-l7-q6 | narration | `鞋 (the shoe) slipped onto her foot like clear water.` | `(the shoe) slipped onto her foot like clear water.` | **P1 SENTENCE_STARTS_PAREN** — post-strip, sentence opens with orphaned `(the shoe)`. TTS may add awkward prosodic emphasis on "the shoe" as if reading a title/aside. | Rewrite: `"The shoe slipped onto her foot like clear water."` | No |
| 7 | kt-ch7-l3-q2 | narration | `One morning, 後母 (the new wife) put on Yexian's torn dress.` | `One morning, (the new wife) put on Yexian's torn dress.` | **P1 SUBJECT_IN_PARENS** — post-strip, sentence subject is `(the new wife)`. Grammar technically intact (paren content reads naturally) but prosodic aside inflection misframes the subject as parenthetical. | Rewrite: `"One morning, the new wife put on Yexian's torn dress."` | No |
| 7 | kt-ch7-l4-q2 | narration | `An 老人 (old man) in a sky-colored robe stepped down beside her.` | `An (old man) in a sky-colored robe stepped down beside her.` | **P1 SUBJECT_IN_PARENS** — `"An (old man)"` — article + paren subject creates prosodic aside after definite article. | Rewrite: `"An old man in a sky-colored robe stepped down beside her."` | No |
| 7 | kt-ch7-l4-q6 | narration | `"Hide the 魚骨 (fish-bone). Speak to them. They will give you anything."` | `"Hide the (fish-bone). Speak to them. They will give you anything."` | **P1 PARENS_AFTER_ARTICLE** — `"the (fish-bone)"` — article precedes paren. TTS may say "the fish bone" (fine) or "the open paren fish-bone close paren" (broken). | Rewrite: `"Hide the fish-bone. Speak to them. They will give you anything."` | No |
| 7 | kt-ch7-l1-q2 | narration | `Long ago in southern China, a girl named 葉限 (Yexian) lived in a cave village.` | `Long ago in southern China, a girl named (Yexian) lived in a cave village.` | **P2 PARENS_AFTER_VERB** — `"named (Yexian)"` — paren after `named` is most likely read correctly as "named Yexian" but prosody break still present. | Rewrite: `"Long ago in southern China, a girl named Yexian lived in a cave village."` | No |
| 7 | kt-ch7-l2-q4 | narration | `In the water lived a fish with bright 紅鰭 (red fins) and golden eyes.` | `In the water lived a fish with bright (red fins) and golden eyes.` | **P2 ADJ_PARENS** — `"bright (red fins)"` — adjective `bright` no longer has direct noun after CJK strip; parenthetical `(red fins)` is 2 words. TTS will likely read "bright red fins" correctly. Low risk. | Rewrite: `"In the water lived a fish with bright red fins and golden eyes."` | No |
| 7 | kt-ch7-l5-q2 | narration | `The 洞節 (cave festival) night came. Lanterns lit up every doorway.` | `The (cave festival) night came. Lanterns lit up every doorway.` | **P2 NOUN_PARENS** — `"The (cave festival) night"` — `festival` and `night` are both nouns; paren as noun modifier creates compound ambiguity. | Rewrite: `"The night of the cave festival came. Lanterns lit up every doorway."` | No |

### B.2 Systemic findings (not P0-level but worth tracking)

| Pattern | Scope | Count | Severity | Notes |
|---------|-------|-------|----------|-------|
| `...` (ellipsis) in narration sentence endings | Ch6-14 all narrations q11 | 56 | P3 | Intentional cliffhanger design. WebSpeech handles `...` as period equivalent on modern Chrome/iOS; minor prosodic variation. Not fixing unless explicit decision. |
| Digit `"4"` in tap-pairs q1 ("Here are 4 words...") | Ch6-14 all tap-pairs q1 | 63 | INFO | TTS reads single digits correctly. Non-issue. |
| Ch7 `kt-ch7-l3-q11`: double hazard `—` + `...` in narration | Ch7 | 1 | P2 | `"Her tears fell into the still water. Then — a sky-colored shadow moved on the other side..."` — both EM_DASH and ellipsis. Narration only so P2. |
| Ch14 `kt-ch14-l6-q11`: EM_DASH in narration | Ch14 | 1 | P2 | `"Nothing — and no one — is the same..."` — double EM_DASH in narration q11. Not a listening Q so P2. |

---

## C. Stats

| Metric | Value |
|--------|-------|
| Chapters scanned | 9 (Ch6–Ch14) |
| Lessons scanned | 63 |
| Total questions | 693 |
| Total sentences scanned | 693 |
| **Chinese chars in sentence field** | **10** (all Ch7) |
| **EM_DASH in listen-* questions (P0-P1)** | **2** |
| EM_DASH total (all types) | 5 |
| Parenthetical residual after CJK strip | 10 |
| Narration `...` endings (systemic) | 56 |
| Digit `4` in tap-pairs q1 (INFO) | 63 |
| Chapters clean (no Chinese/EM_DASH in listen) | 8/9 (Ch6 has 1 EM_DASH in listen-comprehension) |
| CI auto-caught | 0 / 12 (0% — audio sync angle not in CI) |

---

## D. Top 5 P0

| Rank | Q ID | Type | Description | Fix |
|------|------|------|-------------|-----|
| **#1 ★** | `kt-ch7-l5-q5` | listen-mc | P0 TTS_PARENS_RESIDUAL: `"a (blue cloak)"` after CJK strip — active listening question broken on iOS Safari | Remove CJK from sentence: `"In a soft flash, a blue cloak and two small gold shoes lay on the floor."` |
| **#2** | `kt-ch6-l3-q10` | listen-comprehension | P1 EM_DASH_LISTEN: `"one thing — her brothers were gone"` — EM_DASH mid-clause in listening question | `"Her hands grew cold. The empty beds told her one thing: her brothers were gone."` |
| **#3** | `kt-ch7-l6-q5` | listen-mc | P1 EM_DASH_LISTEN: `"pick it up — the voices"` — causal clause split by EM_DASH | `"She did not stop to pick it up. The voices behind her were too close."` |
| **#4** | `kt-ch7-l7-q6` | narration | P1 SENTENCE_STARTS_PAREN: `"(the shoe) slipped"` — sentence starts with orphaned paren post-strip | `"The shoe slipped onto her foot like clear water."` |
| **#5** | `kt-ch7-l3-q2` | narration | P1 SUBJECT_IN_PARENS: `"(the new wife) put on"` — subject in orphaned paren after strip | `"One morning, the new wife put on Yexian's torn dress."` |

---

## E. Narrative voice / pacing improvements (3 minimum — required even with 0 R1-R8 violations)

### NV-1: Strip CJK annotation from sentence field entirely (Ch7 architectural fix)

**Current design**: Ch7 uses Chinese character annotation inline in English sentences:
`"Long ago in southern China, a girl named 葉限 (Yexian) lived in a cave village."`

This format was introduced to teach A2 learners the Chinese source material alongside English. However:
1. After `cleanText()` strips CJK, the sentence becomes `"...named (Yexian) lived..."` — orphaned paren
2. The pedagogical intent (showing the Chinese name) is better served in `explanationZh`

**Proposed rewrite**: Move Chinese annotations to `explanationZh`; sentence field = clean English.
```
Before: "Long ago in southern China, a girl named 葉限 (Yexian) lived in a cave village."
After:  "Long ago in southern China, a girl named Yexian lived in a cave village."
explanationZh: "葉限 = 這個故事主角的名字 (Yexian)。「限」有「界限」的意思——她的生命被後母限制了。"
```

This is pedagogically richer (explanationZh can now contextualize the name semantics) and removes TTS hazard.

### NV-2: EM_DASH → two sentences for A2 listener comprehension

**Current**: `kt-ch7-l6-q5`: `"She did not stop to pick it up — the voices behind her were too close."`

The EM_DASH signals an explanatory clause — a written literary device. For A2 listening comprehension tests, the causal relationship is better expressed as two short sentences:
- `"She did not stop to pick it up. The voices behind her were too close."`

Benefits: (a) cleaner TTS prosody, (b) simpler syntax for A2 learners, (c) each sentence is a complete thought — better for listening comprehension practice.

### NV-3: Ch7 narration `...` at cliffhanger vs. period pattern consistency

Ch7 ending narrations (q11) use `...` (e.g., `"Her eyes did not blink. Something cold and slow turned inside her chest..."`) while the sentence in `explanationZh` refers to specific story content that follows. Compare with Ch6 where some endings use `.`:
`"The fire went cold. The truth was told. But the youngest brother turned to her with one wing still on his back..."` (Ch6 L7)

**Inconsistency**: Ch7 L1-L6 q11 ALL end with `...` but the final chapter (L7) ends with `.` (`"On the boat, Yexian touched the small cloth in her pocket. The bones were warm again..."`). The `...` makes grammatical sense as cliffhanger for within-chapter transitions, but the FINAL lesson's cliffhanger should be `—` or `.` (completed arc). Proposal: Ch7 L7 q11 change `"The bones were warm again..."` → `"The bones were warm again."` (arc completed, not cliffhanger).

---

## 🔬 Architecture Recommendation (對齊業界 2026) — ARCH-REC #28

### Background

Industry research (SFMS-ALR: Script-First Multilingual Speech Synthesis, ArXiv Oct 2025; Microsoft Azure TTS guidance; Dev.to cross-browser speech synthesis 2025) confirms two findings:

1. **CJK stripping alone is insufficient**: When Chinese chars are stripped from bilingual annotations like `漢字 (translation)`, the residual `(translation)` creates:
   - Orphaned parentheticals that confuse TTS prosody
   - Article+paren compounds (`"a (blue cloak)"`) that iOS Safari may read literally as "open paren"
   - Subjects opening in parens (`"(the shoe) slipped"`) with wrong prosodic framing

2. **Special-character normalization is standard practice**: ELT apps with production WebSpeech (per industry survey) normalize EM_DASH → space/comma and `...` → `.` to prevent:
   - iOS choppy playback at prosodic boundary characters
   - Cross-engine variation (Chrome handles `—` as pause; Firefox/old-iOS may vocalize "dash")

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|------------|--------|-----|---------|
| CJK+paren co-strip: `[一-鿿]+\s*\(([^)]+)\)` → `$1` | SFMS-ALR 2025 + Pickup Ch7 P0 | ✅ Direct fix — preserves English translation, removes paren | S 15min | ⭐⭐⭐⭐ | **Implement** |
| EM_DASH normalization: `—` → ` ` | MS Azure TTS guidance; Dev.to 2025 | ✅ Safe — iOS Safari prosodic gap eliminated | S 5min | ⭐⭐⭐ | **Implement** |
| Ellipsis normalization: `...` → `.` | Dev.to 2025 cross-browser TTS | 🟡 Partial — loses intentional visual `...` in DOM. Recommend: normalize for TTS only, keep `...` in DOM text nodes | S 5min | ⭐⭐ | Implement (TTS path only) |
| Per-segment script TTS (Chinese + English separately) | SFMS-ALR arXiv 2025 | ❌ Overkill — Pickup targets A2 8-12 children; maintaining separate Chinese TTS path for annotations adds complexity with low pedagogical ROI given `explanationZh` covers this | L 4hr | ⭐ | Skip |

### Specific fix: `src/audio/tts.ts` line 274 `cleanText()` — ARCH-REC #28

```typescript
// CURRENT (v2.0.B.227):
function cleanText(text: string): string {
  return text
    .replace(/_{2,}/g, ' ')
    .replace(/[一-鿿]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// PROPOSED (ARCH-REC #28):
function cleanText(text: string): string {
  return text
    // CJK+paren co-strip: "葉限 (Yexian)" → "Yexian", "a 青衣 (blue cloak)" → "a blue cloak"
    .replace(/[一-鿿]+\s*\(([^)]+)\)/g, '$1')
    // Remaining standalone CJK (no paren partner)
    .replace(/[一-鿿]+/g, '')
    // EM_DASH → space (iOS Safari choppy playback fix)
    .replace(/—/g, ' ')
    // Ellipsis → period (WebSpeech prosody normalization)
    .replace(/\.\.\./g, '.')
    // Cleanup
    .replace(/_{2,}/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}
```

**Test cases** (before → after):
- `"a girl named 葉限 (Yexian) lived"` → `"a girl named Yexian lived"` ✅
- `"In a soft flash, a 青衣 (blue cloak) and"` → `"In a soft flash, a blue cloak and"` ✅
- `"(the shoe) slipped"` → `"(the shoe) slipped"` ⚠️ standalone paren without CJK prefix — requires separate `(...)` strip OR content fix (Option B: just fix the 10 Ch7 sentences directly)
- `"one thing — her brothers"` → `"one thing  her brothers"` ✅ (double space collapses to single)
- `"Something cold and slow turned..."` → `"Something cold and slow turned."` ✅

**Note on standalone parens**: The regex `[一-鿿]+\s*\(...)` only strips CJK+paren pairs. Remaining standalone `(...)` (like the `kt-ch7-l7-q6` `"(the shoe) slipped"` case) needs either: (a) Option A: add a broader `\([^)]+\)` → `$1` strip in `cleanText()` (risks stripping intentional English parentheticals in other chapters), or (b) Option B: fix the 10 Ch7 sentences directly by removing CJK annotations. **Recommend Option B** — cleaner content, less regex risk.

**Effort**: S · 30min (code change 5min + Ch7 sentence fixes 25min)
**Risk**: Low — `cleanText()` is only called in `speak()` which already has unit tests in the walkthrough audit framework. Regression test: Ch1 narration (no CJK, should be unchanged).

---

*Audit generated: 2026-06-13 06:13 UTC | Angle: #10 Audio Sync Round 3 | Focus: Ch6-14 WebSpeech TTS hazards | ARCH-REC #28: cleanText() CJK+paren co-strip + EM_DASH/ellipsis normalization*
