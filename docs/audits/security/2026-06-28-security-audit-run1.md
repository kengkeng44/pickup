# Security Audit — Pickup (拾光) · run-1

**Target:** /home/user/pickup (React + TS + Vite PWA, offline-first, localStorage)
**Date:** 2026-06-28
**Scope (per request):** XSS (dangerouslySetInnerHTML), backend sync/auth, localStorage + multi-account, share, dependencies.

## Verdict

**No exploitable HIGH/MEDIUM vulnerabilities found.** For its threat model — a single-player, offline-first children's learning app with no shared/user-generated content and no active server-authoritative state — the codebase is well-defended. Findings below are LOW / hardening / latent-when-backend-activates.

## What the code does well (verified)

1. **XSS sinks are safe.** All 3 `dangerouslySetInnerHTML` (renderers.tsx:370,392,587) are fed by `wrapWords()` — which HTML-escapes `& < > " '` before building `<span>`s — or by `blanks()`, which emits only `____` placeholders with no interpolated content. `WordHint.ts` builds its tooltip with `createElement` + `textContent` (not `innerHTML` injection). No path renders unescaped user or server content as HTML.
2. **Content is author-controlled, same-origin.** Lesson/word-hint JSON are static build assets, not attacker-reachable input. Free-type answers, cat names and player names are rendered through React (auto-escaped), never a raw sink.
3. **Analytics is privacy-safe.** PostHog only loads if `VITE_POSTHOG_KEY` is set; `capture_pageview:false`, `autocapture:false`, and `track()` is gated on explicit consent — so URLs (incl. any `?login=` token) and PII are not auto-captured.
4. **Backend client is defensive.** `apiFetch` fails closed (503/network error → marks off → silent localStorage fallback). Server-state reconciliation type-checks every field (`writeNum` rejects non-finite/negative; strings validated) before writing to localStorage. Magic-link token is stripped from the URL via `history.replaceState`.

## Findings

### LOW-1 — Vulnerable transitive deps via posthog-js (dependency hygiene)
`npm audit` reports 11 moderate advisories, all transitive under **`posthog-js`**: `dompurify@3.4.7` (Trusted-Types / SAFE_FOR_TEMPLATES / ALLOWED_ATTR config bypasses) and `protobufjs@7.6.2` (schema name shadowing, OTLP export path).
- **Impact on Pickup: minimal.** Pickup does not import or use DOMPurify/protobufjs in its own code (`grep` clean), they are not present in the `dist/` browser bundle, and posthog-js itself only loads when an analytics key is configured + consent granted. The DOMPurify advisories require the *app* to misuse DOMPurify config on attacker HTML — which Pickup never does.
- **Fix:** `npm audit fix` (bumps posthog-js's transitive deps) and keep posthog-js current. Re-run periodically.

## Informational / by-design (not vulnerabilities)

- **Client-side economy (XP/coins/streak/progress in localStorage, no server enforcement).** By design — the server-authoritative helpers exist but are intentionally not wired ("後端沒接好前 app 照常"). In a single-player learning app the only thing a user can "cheat" is their own progress; there is no leaderboard, payment, or other user's data at stake. No security impact. (If a paid/competitive feature is added later, move economy + unlock validation server-side.)
- **JWT stored in localStorage** (`pickup.backend.token`). Standard tradeoff for this app class; exploiting it requires XSS, which is mitigated. Backend is currently inactive.

## Latent — re-check before enabling the backend / magic-link
When `/api/*` is provisioned and the `?login=token` magic-link goes live, re-verify: (a) the login token is single-use + short-TTL server-side; (b) it is never logged/captured (current PostHog config already prevents auto-capture — keep it that way); (c) `/api/migrate` and the server-authoritative endpoints enforce per-account authorization so one anon token cannot read/write another account's state.

## Coverage note
This is the first run; a single audit pass typically finds ~half of all issues. Recommend re-running to dig into paths not covered here (e.g. service-worker/PWA cache behavior, deeper backend-function review once provisioned).
