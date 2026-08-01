# Content QA — 2026-08-01 06:12 UTC

**Today's angle:** A5 — Cultural Reference (questions/distractors requiring external cultural knowledge not established in story narration)

**Focus:** Ch9–16 (Cinderella / Chang'e & Hou Yi / Niulang & Zhinu / Little Red Riding Hood / Urashima Taro / Emperor's New Clothes / Issun-boshi)

**Rotation context:** Previous 8 cycles: A4 / #11 / A3 / A6 / R1 / R2 / #12 / A7 — A5 not covered in recent 8 cycles.

**Definition for this cycle:**
A5 = question where (a) the CORRECT answer is only selectable via cultural background knowledge not established in the chapter's narration, OR (b) a DISTRACTOR is culturally plausible for the target audience (Taiwanese 8-12 / heritage learners), causing schema-interference that systematically disadvantages culturally-informed learners.

**Auditor:** Claude (claude-sonnet-4-6) | 2026-08-01 06:12 UTC

---

## A. validate-lessons.js Result

```
OK  lessons-ch0.json
WARN lessons-ch9.json:  8 lint issue(s)   [X2/X49/X57 pre-existing]
WARN lessons-ch10.json: 9 lint issue(s)   [X2/X49/X57 pre-existing]
WARN lessons-ch11.json: 16 lint issue(s)  [X2/X48/X49/X57 pre-existing]
WARN lessons-ch12.json: 12 lint issue(s)  [X2/X49/X57 pre-existing]
WARN lessons-ch13.json: 12 lint issue(s)  [X2/X49/X57 pre-existing]
WARN lessons-ch14.json: 10 lint issue(s)  [X2/X49/X57 pre-existing]
WARN lessons-ch15.json: 9 lint issue(s)   [X2/X49/X57 pre-existing]
WARN lessons-ch16.json: 10 lint issue(s)  [X2/X49/X57 pre-existing]
Total mirror-lint issues: 440 (warn-only; pre-existing)
```

Build gate: PASS (all WARN, no ERROR).

---

## B. Violation Table

| Ch | Q ID | type | snippet | violation | 修法 | audio regen? |
|----|------|------|---------|-----------|------|--------------|
| 11 | kt-ch11-l4-x6 | listen-tf | "Had Hou Yi shot down all ten suns by this point?" | **P0-CORRECTINDEX-BUG**: correctIndex=0 (Yes) but answer is No — only 9/10 suns shot; explanation correctly says "答 No" | Fix: `"correctIndex": 1` | No |
| 11 | kt-ch11-l6-x9 | listen-tf | "Did Hou Yi and Chang'e face this new life alone?" | **P0-CORRECTINDEX-BUG**: correctIndex=0 (Yes) but answer is No — sentence: "They went to live on the earth TOGETHER"; explanation says "答 No" | Fix: `"correctIndex": 1` | No |
| 11 | kt-ch11-l7-x6 | listen-tf | "Was Chang'e with Hou Yi only in the summer?" | **P0-CORRECTINDEX-BUG**: correctIndex=0 (Yes) but answer is No — "through every season" = not only summer; explanation says "答 No" | Fix: `"correctIndex": 1` | No |
| 11 | kt-ch11-l7-x9 | listen-tf | "Did Hou Yi and Chang'e stay young forever as gods might?" | **P0-CORRECTINDEX-BUG**: correctIndex=0 (Yes) but answer is No — aged normally as mortals; explanation says "答 No" | Fix: `"correctIndex": 1` | No |
| 10 | kt-ch10-l7-q7 | listen-mc | "Why did Hou Yi put food in the yard?" | **P0-A5-CULTURAL-TRAP**: distractor "sending food up to the moon" = Mid-Autumn Festival offering custom (中秋節供月). Taiwanese 8-12 children who have placed mooncakes in the yard for Chang'e will select this as correct; story never explains Hou Yi's motivation explicitly | Replace distractor with "leaving gifts by the door for guests" | No |
| 11 | kt-ch11-l6-x7 | comprehension | "What happened to Chang'e because of the Emperor's decision?" | **P1-A5-SCHEMA-TRAP**: distractor "went to the moon alone" = canonical 嫦娥奔月 ending from Ch10. Learners who completed Ch10 or know Chinese Moon Goddess legend will find this MORE resonant than the story-correct answer "lost her divine life too" | Replace with "moved to a different palace" or "left to find Hou Yi" | No |
| 13 | kt-ch13-l7-x7 | comprehension | "What was the main lesson of this story?" | **P1-A5-SCHEMA-TRAP**: distractor "never go into a forest alone" is the Western cultural schema moral for LRRH. Children who know the tale from Western media/books select this over the story-verbatim correct answer "listen and obey your parents" | Replace with "always bring a map when travelling" | No |

**Notes on apparent A5 issues cleared as non-violations:**
- Ch10/11 explanationZh using "后羿" / "嫦娥" — Chinese character names for story characters introduced in narration as "Hou Yi" / "Chang'e". FALSE POSITIVE: same character, different romanization.
- Ch12 "Qixi" in questions — narration establishes "Qixi" explicitly at kt-ch12-l7-q8 ("And so every Qixi…") BEFORE the questions referencing it. NOT a violation.
- Ch9 "fairy godmother" / "Cinderella" in questions — character and her aid are established in narration before being referenced in MC questions. NOT a violation.
- Ch14 "Tamatebako" box — named and warned about in narration (l5-q8). NOT a violation.
- Ch15 "Emperor" as a distractor — "Emperor" is introduced in narration and all references are story-grounded. NOT a violation.

---

## C. Stats

| Scope | Count |
|-------|-------|
| Chapters audited | Ch9–16 (8 chapters) |
| MC questions scanned (listen-mc / comprehension / picture-mc) | ~244 |
| listen-tf scanned | ~104 |
| Total questions in scope | ~348 |
| P0 correctIndex bugs | **4** (all Ch11) |
| P0 A5 cultural trap | **1** (Ch10-l7-q7) |
| P1 A5 schema trap | **2** (Ch11-l6-x7, Ch13-l7-x7) |
| Pre-existing lint issues (validate-lessons.js) | 440 total (unchanged) |

---

## D. Top 5 P0

1. **kt-ch11-l4-x6** — correctIndex=0 but correct answer is No: "Had Hou Yi shot all ten suns?" → No (9 were shot). Learners selecting No (correct) are marked wrong. **Fix: `"correctIndex": 1`**

2. **kt-ch11-l6-x9** — correctIndex=0 but correct answer is No: "Did they face life alone?" → No (they went TOGETHER). Learners selecting No (correct) are marked wrong. **Fix: `"correctIndex": 1`**

3. **kt-ch11-l7-x6** — correctIndex=0 but correct answer is No: "Was Chang'e with Hou Yi only in summer?" → No (every season). Learners selecting No (correct) are marked wrong. **Fix: `"correctIndex": 1`**

4. **kt-ch11-l7-x9** — correctIndex=0 but correct answer is No: "Did they stay young forever?" → No (aged normally). Learners selecting No (correct) are marked wrong. **Fix: `"correctIndex": 1`**

5. **kt-ch10-l7-q7** — A5 P0 cultural trap: distractor "sending food up to the moon" is the Mid-Autumn Festival practice (中秋節供月) familiar to every Taiwanese child. This makes a WRONG answer feel culturally correct, systematically penalizing learners with stronger Chinese cultural background.

---

## E. Narrative Voice / Pacing Improvements (3 proposals)

Even with no R1-R8 violations, the following narrative voice improvements apply:

**E1 — Ch10-l7 telegraphic compression (kt-ch10-l7-q10)**
Current: "People look up. They see the moon. They miss the ones they love."
Three 5-word sentences in a row create a staccato, telegram-style rhythm that breaks the grandma storytelling warmth. 
→ Suggestion: "Every year when the moon is round and full, people look up at the sky and think of the ones they love far away." (single flowing sentence, Ghibli-warm pacing)

**E2 — Ch11 missing bridge to Ch10 contradiction**
Ch11 ends with Chang'e living on earth beside Hou Yi ("Chang'e walked beside him through every season"). Ch10 shows Chang'e flying to the moon (swallowing the immortality pill). These are two tellings of the same legend with contradictory endings. No bridge narration explains "there is another story about what happened next." The current narration ends Ch11-l7 with "What came next was Chang'e's story. The moon was waiting..." — this is too subtle for A2 learners.
→ Suggestion: Add a grandma frame narration at Ch11-l7 end: "But Grandma smiled and said — 'Some stories have more than one ending. On another night I'll tell you the other one.'" This primes Ch10, preserves both tellings, and maintains the Arabian Nights frame.

**E3 — Ch14-l7 tense inconsistency in final narration**
kt-ch14-l7-q11: "A very old man with a long beard sits quietly on the sand..." uses present tense ("sits") in a chapter told in past tense ("Urashima went", "he opened", "he was an old man"). The switch to historic-present here is atmospheric but risks confusing A2 learners who are tracking tense as a grammatical focus.
→ Suggestion: Either (a) keep present tense throughout Ch14's final narration consistently as an atmospheric device (tell grandma's frame in present), or (b) change to "A very old man with a long beard sat quietly on the sand..." to match surrounding past tense.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### ARCH-REC #228: Cultural DIF (Differential Item Functioning) Distractor Audit Protocol

**Pattern:** Pre-screen MC distractors for Cultural Differential Item Functioning (DIF) before publishing lessons targeting bilingual / heritage learner audiences.

**Source:** 
- Hayati (2011) "The Impact of Cultural Knowledge on Listening Comprehension of EFL Learners" — confirms cultural schema significantly influences MC answer selection
- Chen, Aryadoust & Zhang (2025) systematic review of DIF in second language assessment — identifies distractor-level cultural bias as underreported source of item invalidity
- "Cultural Linguistic Bias In Language Assessments for Children" (Madison Wester / Longwood University) — shows distractors referencing culturally familiar practices are selected at higher rates by culturally-informed learners even when wrong

**The Pickup-specific problem found this cycle:**
`kt-ch10-l7-q7` distractor "sending food up to the moon" = Mid-Autumn Festival (中秋節) offering custom. Every Taiwanese 8-12 child has placed mooncakes/fruit in the yard to "send food to Chang'e on the moon." The distractor is culturally correct (from life experience) but story-wrong. This is a textbook DIF false-negative: the WRONG answer is more plausible to the MORE culturally-informed learner.

**Pickup 架構適配 (Verdict: ✅ 適合)**
Pickup: React 18 + JSON lessons + localStorage. No server-side analytics yet. Two-phase approach:

**Phase 1 (editorial heuristic, zero infra cost):**
When writing distractors for Chinese/Japanese/Korean cultural legend chapters (Ch9-16, Ch22-26), apply the "Cultural Plausibility Audit" question: "Would a Taiwanese 8-12 child who celebrates this festival consider this distractor correct from life experience?" If yes → replace distractor with one that's implausible from ALL cultural backgrounds.

Specifically for Mid-Autumn Festival (中秋節) associated chapters (Ch10/11 — Chang'e & Hou Yi):
- BANNED distractor phrases: "sending food up to the moon", "offering to the moon", "mooncake", "lighting lanterns for Chang'e", "looking at the moon together"
- These describe the festival practice, not the story action

**Phase 2 (analytics, future):**
Add distractor-selection analytics to `runStore.ts`: log which distractor was selected for each wrong answer. When "culturally plausible" distractors are selected at >60% of wrong-answer rate (vs expected ~33%), flag the Q for DIF review. This requires backend/KV storage (Cloudflare Workers KV or D1).

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|------------|--------|-----|---------|
| Cultural DIF distractor audit (Phase 1 editorial) | Chen et al. 2025 DIF review; Hayati 2011 | ✅ Perfect fit — target audience (Taiwanese 8-12) has strong Mid-Autumn/Chinese legend cultural schema | Low (editorial checklist, no code) | High — prevents systematic bias against culturally-knowing learners | **✅ Implement Phase 1 now** |
| Distractor-selection analytics (Phase 2) | Industry DIF testing standard | 🟡 Partial fit — needs backend (currently localStorage only) | High (requires Cloudflare Workers KV or D1) | Medium-High (data-driven DIF audit once user base grows) | **🟡 Plan for Phase 3** |

**Editorial Checklist (implement in lesson review SOP):**
For any chapter covering Chinese/Japanese folklore, before publishing:
1. List each festival/custom associated with the legend
2. For each MC distractor: does it describe a custom the audience has personally practised?
3. If yes → replace distractor with a story-implausible but culturally-neutral option

---

*Sources consulted: [Hayati 2011](https://www.ccsenet.org/journal/index.php/elt/article/view/3704) · [Chen, Aryadoust & Zhang 2025 DIF review](https://journals.sagepub.com/doi/10.1177/02655322241290188) · [Cultural Linguistic Bias in Children's Assessments](https://digitalcommons.longwood.edu/rci_spring/220/) · [Frontiers 2026 AI ELT materials](https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2026.1861868/full)*
