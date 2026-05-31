# Mobile Language-Learning App Architecture — Comparative Research for Pickup (拾光)

> **Scope:** Architectural patterns Pickup can borrow when its TypeScript + Vite + Phaser 3.90 web bundle is wrapped for iOS/Android via Capacitor + Codemagic. Focus is on lesson UI rendering, audio orchestration, per-question state, and WebView-specific gotchas — *not* native rewrites.
>
> **Date:** 2026-05-31 · **Author:** Researcher agent

---

## Executive Summary

1. **Pickup's "Phaser as state graph + DOM for UI" decision is well-supported by the industry.** Phaser itself ships a finite-state-machine scene model that maps cleanly onto Pickup's `lesson -> Q -> reveal -> next` cycle, and the Phaser docs explicitly endorse HTML/CSS overlays for UI ([Phaser FSM tutorial, 2020][phaser-fsm]; [Phaser Why Phaser][why-phaser]). Pickup's B.6 reversal (canvas → DOM, never undone) is the same path that Phaser community games and accessibility-driven projects converge on.
2. **Howler.js is the wrong audio layer for a Capacitor app — Pickup was right to drop it at B.79.** Howler's iOS WKWebView issues (cold-start stutter, rate/fade broken, random stops on background return) are documented in three separate goldfire/howler.js issues going back to 2019 and still active ([Howler #862][howler-862]; [Howler #1120][howler-1120]; [Howler #1220][howler-1220]). The correct Capacitor pattern is **Web Audio API + AudioBufferSourceNode** for short lesson clips, and a **`@capacitor-community/native-audio`** fallback only if the WebView's cold-AVAudioSession latency becomes user-visible ([Capacitor native-audio issue #22][native-audio-22]).
3. **State management: Zustand is fine for *store*, but a lesson is a *machine*.** Per-Q phases (Loading → IntroVisible → AwaitingAnswer → RevealShown → Advancing) are the canonical XState use case — the same shape as Stately's "trivia" and "wizard" examples ([XState wizards][xstate-wizards]; [Stately docs][stately-docs]). Recommend XState **only for the LessonScene's per-Q reducer**, keeping Zustand as the global store. Don't replace Zustand wholesale.
4. **Duolingo's real lessons here aren't framework choices — they're frontend prediction and server-driven UI.** Duolingo's mobile lesson engine optimistically updates progress and queues the network write for later, hiding network latency and enabling true offline play ([Duolingo frontend prediction blog][duo-fep]; [Duolingo SDUI blog][duo-sdui]). Pickup should adopt the optimistic-progress pattern long before it ever considers SDUI.
5. **Codec + WebView audio session = the two Capacitor-specific risks Pickup hasn't yet de-risked.** Ship MP3 (universal) or AAC, not Ogg/Opus — iOS only added Ogg Opus in Safari 18.4 (April 2025) and Pickup will have iOS 16/17 users for years ([Opus browser support 2026][opus-support]). And pre-warm the `AudioContext` on first user gesture *before* the lesson scene mounts — WKWebView starts AVAudioSession cold and the first clip will stutter unless pre-activated ([Capacitor native-audio issue #22][native-audio-22]; [WebKit bug 180522][webkit-180522]).

---

## Per-App Architectural Comparison

| App | State management | Audio path | Scene rendering | Unique idea worth stealing |
|---|---|---|---|---|
| **Duolingo (web + mobile)** | React + Zustand on web; server-driven UI for shop/social; **frontend prediction** for lesson progress ([Duo FEP][duo-fep]; [Duo SDUI][duo-sdui]; [Duolingo Guides][duo-guides]) | Pre-bundled MP3 / native audio per platform; session JSON pre-rendered server-side off AWS S3 ([Duo Scala rewrite][duo-scala]) | DOM/React (web); native (iOS/Android). Server returns an exercise *list*, client renders. | **Optimistic progress + offline queue.** Increment lesson counter immediately, sync later. 98% latency reduction in their Session Generator. |
| **Memrise** | Per-session settings (words/session, audio tests on/off) configurable per user ([Memrise Audio FAQ][memrise-audio]) | User-recorded MP3 + native-speaker video clips; multiple audio takes per item | Native mobile-first; web is secondary | **Multiple voices per term** (accent variety). Same Q, different audio asset shuffled at session-build time. |
| **Anki / AnkiWeb** | Rust core (`rslib`) + Python `pylib` + Svelte/TS frontend; FSRS scheduler is pure state-on-disk ([Anki GitHub][anki-gh]; [Anki forum source-reading][anki-forum]) | HTML `<audio>` element with auto-inserted replay buttons (SVG/CSS overlay); audio is just `[sound:file.mp3]` macros in card templates ([Anki replay buttons addon][anki-replay]; [Anki styling docs][anki-styling]) | **HTML card templates** (Mustache-style `{{Field}}`) rendered into WebView on every platform — desktop Qt, mobile, web all share the renderer | **Templates-as-data.** Card content is pure data, the template is the renderer. Same pattern as Duolingo SDUI but radically simpler. Pickup's question JSON → handlebars-style renderer would map directly. |
| **Quizlet** | React/Next.js web; React Native mobile | **Hybrid:** SpeechSynthesis API as fallback when no pre-recorded clip exists (Quizlet sets default voice per term language) | DOM (web); native (mobile) | **TTS-as-fallback.** When a term has no recorded audio, dynamically synthesize it. Cheap coverage for long-tail vocabulary. Use `@capacitor-community/text-to-speech` for the Pickup equivalent. |
| **Drops** | React Native mobile + Node.js backend ([Drops dev review][drops-stack]) | Premium-only offline pack: pre-recorded MP3s downloaded once, played from filesystem; sub-2-sec session start time | Native (RN) — not directly applicable to Pickup's Capacitor route | **<2 s session start budget.** Aggressive preload of next session's assets while the current session is in progress. |
| **Duolingo clone (bryanjenningz/react-duolingo)** | **Zustand** (confirmed in repo description) ([react-duolingo][react-duolingo]) | HTML5 `<audio>` element per exercise | Next.js / DOM, Tailwind | **Reference implementation** for what a Zustand-only Duolingo-like architecture looks like in TS. Closest public mirror of Pickup's stack. |
| **XState Wizards (form/quiz library)** | XState v5; each question = its own state node ([xstate-wizards][xstate-wizards]) | n/a (content library) | Content JSON → component map | **JSON-driven question schemas + state machine per Q.** Almost exactly Pickup's `pickup-q-design-standard-v1.md` shape. |

---

## Mobile-Web Architecture Patterns Ranked for Pickup

**Ranking criterion:** fit with Pickup's existing stack (TS, Vite, Phaser-as-scene-graph, Zustand, DOM UI, Capacitor wrap), assuming "1 web codebase, 2 native shells."

### Tier 1 — Adopt now

1. **XState for the per-Q reducer only, Zustand for the global store.** XState's value isn't "replace your state library" — it's "make illegal transitions impossible in *one* hot-path." Pickup's per-Q phase chain (Loading → IntroVisible → AwaitingAnswer → 1st-strike → 2nd-strike-reveal → Advancing, per the `feedback_pickup_retry_reveal.md` memory) is exactly the shape XState models best ([XState GitHub][xstate-gh]; [Medium: Redux vs Zustand vs XState][medium-xstate]). Cost: ~6 kB gzip, and one new mental model in one file (LessonScene only).
2. **Web Audio API + a single shared `AudioContext`, pre-warmed on first tap.** Use `AudioBufferSourceNode` for short lesson clips (<5 s); load via `fetch()` + `decodeAudioData()` at lesson-init time. Pre-warm with a silent 1-sample buffer on the user's first interaction so WKWebView's cold-AVAudioSession penalty is paid *before* the listening exercise ([MDN Web Audio best practices][mdn-webaudio]; [Web Audio perf notes][webaudio-perf]).
3. **MP3 (or AAC) only — drop any Ogg/Opus dreams.** iOS gained Ogg Opus in Safari 18.4 (April 2025). Users on iOS 16/17 — still a non-trivial share through 2027 — get nothing. Ship MP3 at 96 kbps mono for speech ([Opus browser support 2026][opus-support]).
4. **DOM-first lesson UI, Phaser as the scene graph only.** Keep Phaser doing what it's good at (scene lifecycle, transitions, the Mascot canvas chrome). Render every word, button, blank, and option in DOM/HTML so iOS VoiceOver, font scaling, and `inputmode="text"` keyboards Just Work ([Phaser Why Phaser — UI flexibility][why-phaser]).

### Tier 2 — Adopt if scaling pain hits

5. **Optimistic frontend prediction for lesson progress.** Mirror Duolingo's pattern: increment streak / XP / lesson-complete immediately on the client, queue the network write, reconcile on reconnect ([Duo FEP][duo-fep]). Pairs naturally with Capacitor's offline-first WebView model.
6. **Asset preload to the device filesystem, not IndexedDB.** Use `@capacitor/filesystem` (or the Capawesome Asset Manager plugin) to copy MP3s into `Directory.Cache` at first launch, then `fetch()` them as `capacitor://` URLs. IndexedDB on iOS gets evicted under storage pressure; the filesystem doesn't ([Capacitor Storage guide][cap-storage]; [Capawesome Asset Manager][asset-manager]; [RxDB Capacitor guide][rxdb-cap]).
7. **Template-driven question rendering (Anki pattern).** Long-term, define each question type as `{schemaVersion, templateName, fields}` JSON and have a single TS renderer map template → DOM. Lets you ship new question types via OTA/CodePush-style update without an app store roundtrip.

### Tier 3 — Probably not worth it for Pickup

8. **Server-driven UI (Duolingo-style).** Massive infra cost for a single-developer app. Skip until you have >3 platforms and an experimentation team.
9. **React Native rewrite.** Pickup's CLAUDE.md memory explicitly rules this out, and the Howler/audio/codec issues that justified that ruling are still real.
10. **Solid/Preact Signals as a reactivity layer.** Vite + Phaser + DOM doesn't need fine-grained reactivity; Zustand subscriptions are sufficient.

---

## Capacitor-Specific Gotchas + Recommended Plugins

### Gotchas

| # | Issue | Source |
|---|---|---|
| 1 | **WKWebView starts AVAudioSession cold.** First clip stutters/restarts unless you pre-activate the session inside a user gesture. Safari doesn't have this because it stays warm across the browser process. | [Capacitor native-audio #22][native-audio-22] |
| 2 | **`AudioContext.resume()` must be called inside a user gesture.** Async boundaries (await fetch, await decode) break the gesture chain — iOS 16.3+ regressed here ([WebKit 180522][webkit-180522]). | [WebKit 180522][webkit-180522]; [MDN best practices][mdn-webaudio] |
| 3 | **IndexedDB is not persistent on iOS** — the system can evict it. SQLite (via `@capacitor-community/sqlite`) or the Filesystem plugin's `Directory.Data` are the persistence-safe choices. | [RxDB Capacitor guide][rxdb-cap]; [Ionic storage choice][ionic-storage] |
| 4 | **Howler on WKWebView:** rate, fade, and post-background resume are broken. Documented since 2019, still open. | [Howler #862][howler-862]; [Howler #1120][howler-1120] |
| 5 | **Android WebView ≠ Chrome.** Capacitor requires WebView Chromium ≥50, but features like Web Audio worklets lag the actual Chrome version. Test on a real low-end Android. | [Capacitor games guide][cap-games]; [Capacitor WebView docs][cap-webview] |
| 6 | **Media Session API:** required for lock-screen audio controls on Android (WebView doesn't ship it natively). Use `capacitor-media-session` (jofr) plugin to polyfill ([capacitor-media-session][cap-media-session]). |

### Recommended Capacitor plugin shortlist

- **`@capacitor/filesystem`** — for caching MP3 lesson packs to `Directory.Cache` / `Directory.Data`.
- **`@capacitor-community/native-audio`** — *optional* low-latency fallback for sound effects (button taps, correct/wrong dings). Don't use it for lesson speech — Web Audio API is enough and easier to debug.
- **`@capacitor-community/text-to-speech`** — for the Quizlet-style "synthesize when no recording exists" fallback.
- **`@capacitor/preferences`** — for tiny KV state (last lesson, settings). Don't use for >100 KB.
- **`@capacitor-community/sqlite`** — for the lesson progress DB and SR/spaced-rep state once it outgrows `localStorage`.

---

## Three Concrete Refactor Recommendations Beyond LessonScene Extraction

The internal architect agent already proposed extracting `LessonScene` into smaller modules. Below are three orthogonal refactors that the architect agent did *not* cover, ordered by ROI per developer-day.

### R1 — `AudioOrchestrator` singleton with a pre-warm step (HIGH ROI, ~1 day)

**Why:** Currently each scene constructs / discards audio on its own (carried over from Howler era). On Capacitor iOS, this means a cold AVAudioSession on every scene transition, which produces the audible "first tap stutters" issue users will blame on Pickup.

**What to build:**
```
class AudioOrchestrator {
  private ctx: AudioContext
  private buffers: Map<string, AudioBuffer>
  async warmUp(): Promise<void>           // called inside FIRST user tap
  async preload(urls: string[]): Promise  // called at lesson start
  play(id: string): { stop(): void }      // returns a handle
}
```
Pre-warm by playing a 1-sample silent buffer inside the first `pointerdown` of the session. Subsequent plays are instant. Pickup-specific bonus: solves the small-speaker listening-exercise reliability complaint.

### R2 — Per-Q state machine extracted as an XState chart (MEDIUM ROI, ~2 days)

**Why:** The `blindRetry → 2-strike reveal` rule (per `feedback_pickup_retry_reveal.md`) currently lives as scattered booleans (`hasAnswered`, `strikeCount`, `revealShown`, `canAdvance`). Every new question type re-implements the phase transitions and silently drifts. A state chart **makes the rule visible and reusable across every Q type**.

**What to build:** A single `questionMachine` in XState v5 with states `loading | introVisible | awaitingAnswer | strikeOne | revealed | advancing`. Phaser's scene continues to own *which Q* is active; XState owns *what phase within the Q*. Stately's visualizer becomes a debugging tool ([Stately docs][stately-docs]). Aligns with Pickup's existing `pickup-q-design-standard-v1.md` because each Q schema can declare its own valid transitions.

### R3 — Question-template registry decoupled from Phaser scene (MEDIUM-HIGH ROI, ~3 days)

**Why:** New question types (gist/detail/inference per `pickup-q-design-standard-v1.md`) currently need a code change to LessonScene. Following Anki's `[sound:x.mp3]` + card-template model, every Q type becomes a registered renderer.

**What to build:**
```
type QRenderer = {
  type: 'fill-blank' | 'listening' | 'inference' | ...
  schemaVersion: number
  render(q: QuestionJSON, host: HTMLElement, machine: QuestionMachine): void
  teardown(): void
}
QuestionRegistry.register(listeningRenderer)
```
Pickup ships *data* (question JSON) per lesson; the *renderer* set updates only with app releases. This is what enables future OTA-style lesson packs without going through TestFlight/Play review.

---

## Sources

- [Phaser Tutorial Series — Finite State Machine (Phaser blog, 2020)][phaser-fsm]
- [Phaser — Why Phaser (UI flexibility & DOM overlays)][why-phaser]
- [bryanjenningz/react-duolingo — Duolingo clone in React + Zustand + Next.js][react-duolingo]
- [Duolingo Engineering — Frontend Prediction in Mobile Apps][duo-fep]
- [Duolingo Engineering — Server-Driven UI Keeps Our Shop Fresh][duo-sdui]
- [Duolingo Engineering — Rewriting Duolingo's Engine in Scala][duo-scala]
- [Duolingo Guides — Does Duolingo Use React?][duo-guides]
- [Anki — ankitects/anki GitHub source][anki-gh]
- [Anki Forums — Reading Anki Source Code thread][anki-forum]
- [Ospalh — Replay Buttons on Card add-on (Anki HTML/audio renderer detail)][anki-replay]
- [Anki Manual — Styling & HTML for card templates][anki-styling]
- [Memrise — Audio FAQ (multi-take per item)][memrise-audio]
- [Drops — Tech stack review (React Native + Node + AWS)][drops-stack]
- [XState — statelyai/xstate GitHub][xstate-gh]
- [XState Wizards — JSON-driven question flow library][xstate-wizards]
- [Stately — Machines docs][stately-docs]
- [Medium — Redux vs Zustand vs XState for React][medium-xstate]
- [MDN — Web Audio API Best Practices][mdn-webaudio]
- [Web Audio API performance & debugging notes — Paul Adenot][webaudio-perf]
- [Howler.js — issue #862 (iOS audio stops on background return)][howler-862]
- [Howler.js — issue #1120 (Cordova WKWebView rate/fade broken)][howler-1120]
- [Howler.js — issue #1220 (iOS Web Audio + HTML5 playback)][howler-1220]
- [capacitor-community/native-audio — issue #22 (AVAudioSession.Category configurable)][native-audio-22]
- [Capacitor — Phaser tutorial: bring your game to iOS/Android][cap-games]
- [Capacitor — WebView core concepts][cap-webview]
- [Capacitor — Storage guide][cap-storage]
- [Capawesome — Asset Manager plugin][asset-manager]
- [jofr/capacitor-media-session — lock-screen audio + Media Session polyfill for Android WebView][cap-media-session]
- [Ionic blog — Choosing a Storage Solution (Preferences vs SQLite vs Secure Storage)][ionic-storage]
- [RxDB — Capacitor Database Guide (SQLite vs IndexedDB)][rxdb-cap]
- [WebKit Bug 180522 — Web audio without output should not require user gesture][webkit-180522]
- [TestMu / LambdaTest — Opus Audio Codec Browser Support 2026][opus-support]

[phaser-fsm]: https://phaser.io/news/2020/06/phaser-tutorial-series-finite-state-machine
[why-phaser]: https://phaser.io/why-phaser
[react-duolingo]: https://github.com/bryanjenningz/react-duolingo
[duo-fep]: https://blog.duolingo.com/frontend-prediction/
[duo-sdui]: https://blog.duolingo.com/server-driven-ui/
[duo-scala]: https://blog.duolingo.com/rewriting-duolingos-engine-in-scala/
[duo-guides]: https://duolingoguides.com/does-duolingo-use-react/
[anki-gh]: https://github.com/ankitects/anki
[anki-forum]: https://forums.ankiweb.net/t/reading-anki-source-code/8552
[anki-replay]: https://ospalh.github.io/anki-addons/Play_button.html
[anki-styling]: https://docs.ankiweb.net/templates/styling.html
[memrise-audio]: https://memrise-users.fandom.com/wiki/Audio_FAQ
[drops-stack]: https://lingomee.com/drops-app-review/
[xstate-gh]: https://github.com/statelyai/xstate
[xstate-wizards]: https://github.com/xstate-wizards/xstate-wizards
[stately-docs]: https://stately.ai/docs/machines
[medium-xstate]: https://medium.com/design-bootcamp/cracking-the-react-state-puzzle-redux-vs-zustand-vs-xstate-663ca95fa092
[mdn-webaudio]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Best_practices
[webaudio-perf]: https://padenot.github.io/web-audio-perf/
[howler-862]: https://github.com/goldfire/howler.js/issues/862
[howler-1120]: https://github.com/goldfire/howler.js/issues/1120
[howler-1220]: https://github.com/goldfire/howler.js/issues/1220
[native-audio-22]: https://github.com/capacitor-community/native-audio/issues/22
[cap-games]: https://capacitorjs.com/docs/guides/games
[cap-webview]: https://ionicframework.com/docs/core-concepts/webview
[cap-storage]: https://capacitorjs.com/docs/guides/storage
[asset-manager]: https://capawesome.io/plugins/asset-manager/
[cap-media-session]: https://github.com/jofr/capacitor-media-session
[ionic-storage]: https://ionic.io/blog/choosing-a-data-storage-solution-ionic-storage-capacitor-storage-sqlite-or-ionic-secure-storage
[rxdb-cap]: https://rxdb.info/capacitor-database.html
[webkit-180522]: https://bugs.webkit.org/show_bug.cgi?id=180522
[opus-support]: https://www.testmuai.com/learning-hub/opus-audio-codec-browser-support/

---

## Limitations & Confidence

- **Strong evidence (multiple primary sources):** Capacitor WKWebView audio cold-start; iOS user-gesture chain; Opus codec timeline; Howler.js WKWebView issues; Duolingo's frontend prediction + SDUI; XState/Zustand tradeoff.
- **Medium evidence (single primary or community source):** Memrise multi-take audio detail; Drops React Native stack (Lingomee review only); Quizlet TTS-fallback pattern (inferred from product behavior, no engineering blog).
- **Gaps acknowledged:** Duolingo does not publish the exact internals of their audio orchestrator. Anki's card-template renderer is open-source but I did not fetch the Svelte/TS sources directly — the architectural pattern is documented from the manual + the replay-button add-on README. Babbel, LingQ, Mango, and Khan Academy returned no useful frontend-architecture detail in public search; intentionally omitted from the comparison table rather than guessed at.
- **Alternative research directions if Pickup wants more depth:** (a) read the Anki `ts/` directory directly to map their template engine to Pickup's R3 proposal; (b) build a tiny Capacitor + Phaser proof-of-concept to measure first-tap latency with and without `AudioContext` pre-warm; (c) survey Codemagic's docs for any audio-asset-bundle-size limits that would affect R3.
