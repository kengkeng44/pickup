# Content QA — 2026-07-18 00:07 UTC

**Today's angle:** A3 — 語意 leak / Story 跳針 (Narrative Semantic Coherence & Metalinguistic Register)
**Focus:** Ch17–24 (Crane Gratitude / Swallow Brothers / Mouse Deer / Giant Turnip / Anansi / Mencius Mother / Kong Rong Pears / Young Archimedes)
**Chapters scanned:** Ch17–Ch24, 292 scored entries (listen-mc + comprehension + listen-comprehension, excl. narration / listen-tf)

> **Angle choice rationale:** Last 8 cron cycles used A2, A4, A1, R2, #12, A7, A5, #11. A3 absent from all 8 tracked cycles. This angle targets two failure modes not covered by existing lint: (a) **forward-reference** — question/option references outcome/resolution before that beat is delivered; (b) **metalinguistic register break** — question stem frames the narrative as an external object of analysis ("what lesson is this scene building up to?") requiring literary-analysis register, inappropriate for 8-12 ELT.

---

## A. validate-lessons.js result

```
WARN lessons-ch17.json: 13 lint issue(s)
  X2 ×1, X48 ×1, X49 ×2, X49B ×6, X57 ×2
WARN lessons-ch18.json: 13 lint issue(s)
  X2 ×2, X49 ×6, X49B ×1, X57 ×2
WARN lessons-ch19.json: 18 lint issue(s)
  X2 ×6, X49 ×1, X49B ×7, X57 ×1
WARN lessons-ch20.json: 12 lint issue(s)
  X2 ×1, X49 ×2, X49B ×5, X57 ×4
WARN lessons-ch21.json: 22 lint issue(s)
  X2 ×8, X49 ×2, X49B ×6, X57 ×2
WARN lessons-ch22.json:  8 lint issue(s)
  X2 ×2, X49 ×1, X49B ×3, X57 ×1
WARN lessons-ch23.json: 14 lint issue(s)
  X2 ×1, X49 ×4, X49B ×3, X57 ×4
WARN lessons-ch24.json: 15 lint issue(s)
  X2 ×2, X49 ×7, X49B ×1, X57 ×3

Total mirror-lint issues across all ch: 440 (warn-only; no build fail)
```

No new schema errors; all JSON parses clean. Pre-existing X49/X49B stimulus-reuse and X57 antonym-mirror are tracked concerns from prior cycles.

---

## B. Violation Table — A3 Angle

| Ch | Q ID | Type | Story Beat | Snippet | Violation | 修法 | audio regen? |
|----|------|------|-----------|---------|-----------|------|-------------|
| 18 | `kt-ch18-l4-lg2` | comprehension | 燕子春天回來給種子 | Q: "What does the swallow's return tell us about Heungbu?" ✓ "a kind act can earn a **reward**" | **P0 FORWARD-SPOILER**: option reveals "reward" concept before gourds/treasure arrives (Lesson 5-6). Child at Lesson 4 hasn't seen the reward yet — option spoils the plot outcome. | Change ✓ option to "a kind act is remembered" (removes reward spoiler, same inference level) | No (option only) |
| 20 | `kt-ch20-l5-x8` | comprehension | 叫小狗 — 四個人還不夠 | Q: "What lesson is **this scene building up to**?" ✓ "every single helper counts" | **P0 METALINGUISTIC STEM**: "this scene building up to" exits diegetic frame; requires secondary-school literary-analysis register. Inappropriate for 8-12 ELT (Tandfonline 2025; Duolingo ABC diegetic-frame rule) | Rewrite Q: "Why does the story add more helpers one by one?" — stays inside story world | No (Q + options unchanged meaning) |
| 22 | `kt-ch22-l5-q6` | listen-mc | 搬到學校旁 — 孟子開始讀書 | S: "The teacher's words were calm and full of care." Q: "What was the teacher **teaching**?" ✓ "good ways to live and act" | **P1 STIMULUS MISMATCH**: sentence describes HOW teacher speaks (calm, care), not WHAT was taught. Answer requires prior chapter knowledge, not inferable from this sentence alone — violates retrospective coherence principle (NarCo 2024; IELTS item design). | Replace sentence with "The teacher spoke of kindness, hard work, and respect." — makes answer inferable from stimulus | Yes (sentence changed) |
| 22 | `kt-ch22-l4-x4` | comprehension | 孟子叫賣 — 媽媽再搬 | S: "She understood that the place was teaching him." Q: "What does the mother now **fully** understand?" ✓ "where you live shapes what you learn" | **P1 NEAR-DUPLICATE** of `kt-ch22-l4-q6` (same sentence, same gist, both in same lesson). Two questions testing identical comprehension point from identical stimulus → X49B pattern (semantic, not just stimulus). | Pivot x4 to inference angle: "What will the mother probably do next?" ✓ "look for a better place to live" | No |
| 17 | `kt-ch17-l6-x8` | comprehension | 看到鶴拔羽毛織布 | Q: "What was the **big secret** the old man **discovered**?" ✓ "the young woman was the crane" | **P1 TELEGRAPH STEM**: "big secret" + "discovered" signal identity-reveal Q type before child processes stimulus. Reduces to pattern-matching rather than comprehension; any child who heard "big secret" will scan for the one concrete option. | Rewrite Q: "What did the old man see when he opened the door?" — grounds question in observable action | No |
| 19 | `kt-ch19-l5-q10` | comprehension | 鱷魚排隊讓他點 | Q: "What was **really** happening?" ✓ "mouse deer was crossing the river" | **P2**: "was really happening" is vague gist framing; works but abstract for A2 children. Idiom "really" adds register complexity. | Rephrase: "What was mouse deer actually doing as he jumped?" | No |
| 18 | `kt-ch18-l7-x8` | comprehension | 興夫分財給哥哥 | ✗ option: "only family deserves to be **forgiven**" | **P2 THEME CONTRADICTION DISTRACTOR**: "only family deserves forgiveness" implies selective forgiveness — contradicts Heungbu's universal-kindness characterization (established across Ch18). Distractor introduces toxic framing that could anchor in child's memory. | Replace with thematically neutral foil: "kind people always become rich in the end" (tests whether child mistakes outcome for character) | No |
| 22 | `kt-ch22-l7-x5` | comprehension | 孟子成大思想家 | Q: "What does **this sentence** tell parents?" | **P2 METALINGUISTIC STEM**: "this sentence tell parents" — addresses an external audience (parents), not story characters. Double register break: metalinguistic (sentence as object) + audience-shift (from child-player to parent-reader). | Rewrite Q: "Why did Meng's mother keep moving to new places?" — returns to story-world agency | No |

**Total A3 violations: 8** (2 P0, 3 P1, 3 P2 narrative improvements)

---

## C. Stats

| Metric | Value |
|--------|-------|
| Chapters scanned | Ch17–Ch24 (8 chapters) |
| Scored Q inspected | 292 (listen-mc + comprehension) |
| A3 violations found | 8 |
| P0 (critical — fix next sprint) | 2 |
| P1 (significant) | 3 |
| P2 (narrative quality improvement) | 3 |
| False positives filtered | 12 (regex caught regex-only signals; manually cleared) |
| Forward-spoiler (P0 subtype) | 1 (CH18-l4-lg2) |
| Metalinguistic stem (P0/P2 subtype) | 2 (CH20-l5-x8, CH22-l7-x5) |
| Stimulus-question mismatch (P1) | 1 (CH22-l5-q6) |
| Telegraph stem (P1) | 1 (CH17-l6-x8) |
| Near-duplicate gist (P1) | 1 (CH22-l4-x4) |
| Theme-contradicting distractor (P2) | 1 (CH18-l7-x8) |
| Audio regen required | 1 (CH22-l5-q6 sentence change) |

---

## D. Top 5 P0

1. **⚠️ CH18 `kt-ch18-l4-lg2`** — Spoiler option "a kind act can earn a reward" in Lesson 4 reveals the gourds/treasure reward before Lesson 5-6 delivers it. Player at Lesson 4 beat hasn't experienced the consequence — option pre-spoils the plot payoff. Fix: → "a kind act is remembered".

2. **⚠️ CH20 `kt-ch20-l5-x8`** — Q stem "What lesson is this scene building up to?" is a secondary-school literary-analysis register question. Ages 8-12 are not yet equipped for metalinguistic abstraction (Tandfonline 2025 — metalinguistic ability still developing 8-11). Duolingo ABC design doc confirms all comprehension Q must stay diegetic (inside story frame). Fix: → "Why does the story add more helpers one by one?"

3. **CH22 `kt-ch22-l5-q6`** — Stimulus "The teacher's words were calm and full of care" describes manner, but Q asks "What was the teacher teaching?" → requires prior-chapter knowledge. Violates IELTS retrospective coherence principle + NarCo 2024 "retrospective question" standard. Fix: change sentence to reference content, not manner.

4. **CH22 `kt-ch22-l4-x4`** — Near-duplicate of kt-ch22-l4-q6: same sentence, same gist-level answer ("where you live shapes/teaches"). Two questions testing identical comprehension at same lesson waste one Q slot that could test a different sub-skill (vocab or inference). Fix: pivot to prediction question.

5. **CH17 `kt-ch17-l6-x8`** — "What was the big secret the old man discovered?" telegraph stem collapses 4-option MC to pattern-match ("there's a secret → find the unusual option"). Fix: → "What did the old man see when he opened the door?"

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### ARCH-REC #171: X171_A3_METALINGUISTIC_STEM_GATE

| Field | Detail |
|-------|--------|
| **Pattern** | X171_A3_METALINGUISTIC_STEM_GATE — lint gate for metalinguistic / audience-shift question stems in comprehension/listen-mc |
| **Source** | Tandfonline 2025 (metalinguistic ability still emerging ages 8-11) · NarCo 2024 retrospective coherence · Duolingo ABC Scope & Sequence (diegetic-frame rule) · IELTS item design (questions follow recording order) |
| **Pickup 適配** | ✅ Direct fit — 8-12 children ELT, Chinese-English bilingual, story-embedded MC; metalinguistic stems are the exact mismatch this research warns against |
| **Effort** | Low (~1 hr: add lint regex in `validate-lessons.js` + fix 2-3 stems in ch-json files) |
| **ROI** | High — prevents child from being pulled out of story world mid-question; supports sustained engagement (ELT pillar for this age group) |
| **Verdict** | ✅ Implement |

**Lint implementation** — add to `validate-lessons.js` under existing X-rules:

```js
// X171 — metalinguistic / audience-shift stem
const METALINGUISTIC_PATTERNS = [
  /this scene (is|shows|tells|building)/i,
  /this sentence (is|shows|tells|teach)/i,
  /building up to/i,
  /what (lesson|moral) (is|was) this/i,
  /tell (parents|adults|us all|children all)/i,
  /what does this (story|scene|sentence|paragraph) (show|tell|teach|say)/i,
];
for (const q of questions) {
  if (!['listen-mc','comprehension','listen-comprehension'].includes(q.type)) continue;
  for (const pat of METALINGUISTIC_PATTERNS) {
    if (pat.test(q.question || '')) {
      issues.push(`X171_METALINGUISTIC_STEM — "${q.id}": stem "${q.question?.slice(0,60)}"`);
    }
  }
}
```

**Estimated scope across ch1–32:** grep suggests ~4-6 questions contain metalinguistic stems. All fixable with Q text rewrites only (no correctIndex or option changes needed; no audio regen needed).

**Industry alignment table:**

| Pattern | Source URL | Pickup 適配 | Effort | ROI | Verdict |
|---------|-----------|------------|--------|-----|---------|
| Diegetic-frame Q stems (no metalanguage for ages 8-12) | https://lit-lessons-cdn.duolingo.com/resources/duolingo_abc_scope_and_sequence_english.pdf | ✅ Direct — same age bracket, same story-embedded MC format | Low | High | **Implement X171 lint** |
| Retrospective coherence (Q only references already-delivered content) | https://arxiv.org/html/2402.13551v1 (NarCo 2024) | ✅ Direct — lesson-sequential story beats map exactly to "retrospective anchor" concept | Low | High | **Add forward-reference check to X172 (future ARCH-REC)** |
| Metalinguistic awareness not fully operational until ~age 11+ | https://www.tandfonline.com/doi/full/10.1080/09658416.2025.2600984 (Tandfonline 2025) | ✅ Direct — core finding validates avoiding "what lesson does this scene teach?" frames | None (existing content fix) | High | **Applied to CH20/CH22 fixes above** |
| IELTS item sequencing (Qs follow content order) | https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-listening | ✅ Applicable — Pickup lesson = sequential story beats; Q ordering must mirror beat order | Low | Medium | **Note for future lesson authoring guide** |

> Current architecture (React + Zod lesson schema + sequential JSON beats) is already well-aligned with industry best practice — the gap is at the **content-authoring level** (Q stems), not architecture level. ARCH-REC #171 closes this gap with a lint gate. No src/ changes needed.
