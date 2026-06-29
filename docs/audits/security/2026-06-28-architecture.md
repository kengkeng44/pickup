# Pickup (拾光) — Architecture & Trust Boundaries (Audit run-1)

## What it is
A pure front-end **children's English-learning PWA**. React 18 + TypeScript + Vite, deployed to Cloudflare Pages. No app server in active use — all state in `localStorage`. Single-player, offline-first. Comparable: Duolingo-style solo learning app (no multiplayer, no shared/UGC content, no stakes/leaderboard).

## Trust boundaries
- **Content (lessons-ch*.json, word-hints.json, story-kitten.json)**: same-origin, author-authored, shipped as static assets. Not user/attacker controlled.
- **User input**: free-type answers (type-translate/type-what-you-hear), cat-name rename, player names. Stored in localStorage, rendered by React (auto-escaped) — never via raw HTML sink.
- **Backend (`src/data/backend.ts`)**: optional Cloudflare Pages Functions + D1. **Currently unprovisioned** → returns 503 → client marks `off` → 100% localStorage. Server-authoritative anti-cheat helpers (serverCompleteLesson/OpenChest/Rename) exist but are NOT wired to call sites. Anonymous-token + magic-link (`?login=`) flow present but inactive.
- **Analytics (PostHog)**: lazy-loaded ONLY if `VITE_POSTHOG_KEY` set AND consent granted; `capture_pageview:false`, `autocapture:false`, `track()` gated on `consentGranted`.

## Input surfaces examined
- 3× `dangerouslySetInnerHTML` (renderers.tsx 370/392/587) — fed by `wrapWords()` / `blanks()`.
- `WordHint.ts` DOM building (innerHTML clear + textContent).
- `fetch()` — all same-origin static JSON except optional `/api/*` (backend) and posthog host.
- `navigator.share` + canvas share-card.
- Multi-account snapshot/restore (`players.ts`) — pure localStorage key shuffling.
- Magic-link `?login=token` URL consumption.

## Prior runs
None. Coverage improves with additional runs — recommend re-running to catch paths this run did not dig into.
