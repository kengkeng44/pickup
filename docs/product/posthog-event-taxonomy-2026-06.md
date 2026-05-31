# Pickup PostHog Event Taxonomy — 2026-06-01

> 接 PostHog (or Plausible / GA) 前的 event spec. 1 份 doc 設好整個 funnel + retention 指標 source.
>
> Status: ready to implement. user 動作 = sign up PostHog free tier (1M event/mo) + 提供 project key 進 `.env`.

## A. 為什麼接

- 目前 0 telemetry, 所有 retention / 功能優先級決策瞎猜
- B.161 → B.200 預估 50+ commit, 沒數據驗證 ROI 就是燒 token
- PM agent / Market agent 推薦 PostHog 為 P0 (master matrix § E #5)

## B. 接線 cost

- PostHog free tier: 1M event/mo (Pickup ~~ 100 user × 100 event/day = 10K/day = 300K/mo, 安全)
- Implement: 3 hr (sdk install + provider + 8 core event)
- User 動作: sign up + add `VITE_POSTHOG_KEY` 到 Cloudflare Pages env

## C. 8 core event spec

```ts
// 1. app_open — session start
posthog.capture('app_open', {
  is_pwa: boolean,           // standalone display mode
  is_capacitor: boolean,     // native shell
  ua_mobile: boolean,
  source: 'cold_start' | 'background_resume',
});

// 2. lesson_start — paw tap → lesson 開始
posthog.capture('lesson_start', {
  chapter: number,           // 1-8
  lesson_in_chapter: number, // 1-25
  lesson_id: string,         // kt-ch{N}-l{M}
  segment_type: 'outer-prologue' | 'main-story' | 'aesop-side' | 'outer-outro' | 'review',
  question_count: number,
});

// 3. answer_submit — 每次 commit 答案
posthog.capture('answer_submit', {
  lesson_id: string,
  question_id: string,
  question_type: 'narration' | 'listen-tf' | 'listen-mc' | ...,
  question_idx: number,       // 0-based
  user_answer_idx: number,    // -1 if typed
  correct_idx: number,
  is_correct: boolean,
  attempt_number: number,     // 1 = first try, 2 = blindRetry
  time_to_answer_ms: number,
  audio_played: boolean,
});

// 4. lesson_complete — finish lesson
posthog.capture('lesson_complete', {
  lesson_id: string,
  question_count: number,
  correct_count: number,
  accuracy: number,           // 0-100
  xp_earned: number,
  elapsed_ms: number,
  review_opened: boolean,     // 是否打開過 Lesson Review
});

// 5. lesson_review_open — Lesson Review button click
posthog.capture('lesson_review_open', {
  lesson_id: string,
  trigger: 'stat_screen_button',
});

// 6. streak_update — daily streak 變動 (gain / break / freeze)
posthog.capture('streak_update', {
  streak_days: number,
  prev_streak: number,
  event: 'gained' | 'broken' | 'frozen',
});

// 7. paywall_view — paywall surface 觸發 (post-implementation)
posthog.capture('paywall_view', {
  trigger: 'ch2_complete' | 'profile_tab' | 'review_srs_upsell',
  current_xp: number,
  highest_chapter_completed: number,
});

// 8. error_caught — JS / audio / lesson load error
posthog.capture('error_caught', {
  error_type: 'audio_decode' | 'lesson_load' | 'js_runtime' | 'sw_failure',
  context: string,           // first 100 char of stack/url
  ua: string,
});
```

## D. User properties (set once / update on change)

```ts
posthog.identify(deviceId, {
  cat_name: 'Mochi',         // custom from Profile
  dog_name: 'Hana',
  language: 'zh-TW',
  install_date: ISO,
  difficulty_pref: 'easy' | 'medium' | 'hard',
  is_pwa_installed: boolean,
  highest_chapter_unlocked: number,
  total_lessons_completed: number,
  current_streak: number,
});
```

## E. Funnel definitions

### Funnel 1 — Onboarding (D0 → D1)

```
app_open (first ever) →
  lesson_start (chapter=1, lesson_in_chapter=1) →
    lesson_complete (any) →
      app_open (24h later, day 2)
```

Target: D1 retention > 40% (industry edu D1 平均 25-35%)

### Funnel 2 — Lesson completion rate

```
lesson_start →
  lesson_complete
  (drop-off measured per question_count threshold)
```

Target: completion > 75% (Duolingo 60-70%)

### Funnel 3 — Free → Premium conversion (post-paywall)

```
lesson_complete (chapter=2, lesson_in_chapter=25) →
  paywall_view (trigger=ch2_complete) →
    [purchase event]
```

Target: conversion 5-8% (industry edu app 3-5%)

### Funnel 4 — Streak retention (D7 / D30)

```
streak_update (event=gained, streak_days=1) →
  ... →
    streak_update (event=gained, streak_days=7)  // D7
    streak_update (event=gained, streak_days=30) // D30
```

Target: D7 streak > 15% / D30 > 5%

## F. Critical events for first-cut dashboard

1. **Daily Active Users (DAU)** — distinct user × app_open per day
2. **Lesson completion rate by question_type** — answer_submit → correct/incorrect 分布 → 看哪個題型過難
3. **First-question abandonment** — lesson_start 後沒任一 answer_submit (early exit)
4. **Review screen usage** — lesson_review_open / lesson_complete = adoption %
5. **Streak distribution** — current_streak histogram
6. **Audio play coverage** — answer_submit audio_played=true % (檢 MP3 fallback rate)
7. **Error rate** — error_caught / app_open

## G. Implementation snippet

```ts
// src/analytics/posthog.ts (NEW)
import posthog from 'posthog-js';

const PUBLIC_KEY = import.meta.env.VITE_POSTHOG_KEY;
const HOST = 'https://us.i.posthog.com';

export function initAnalytics(): void {
  if (!PUBLIC_KEY || import.meta.env.DEV) return; // skip in dev
  posthog.init(PUBLIC_KEY, {
    api_host: HOST,
    person_profiles: 'identified_only',
    capture_pageview: false,    // SPA manually
    capture_pageleave: true,
    autocapture: false,         // we hand-fire only
  });
}

export function track(event: string, props?: Record<string, unknown>): void {
  if (!PUBLIC_KEY) return;
  posthog.capture(event, props);
}

export function identifyUser(deviceId: string, props: Record<string, unknown>): void {
  if (!PUBLIC_KEY) return;
  posthog.identify(deviceId, props);
}
```

整合點:
- `src/main.ts` → import + call `initAnalytics()` 在 bootPhaserLazy 後
- `src/scenes/LessonScene.ts` → `track('lesson_start', ...)` in `_mountLessonUI`, `track('lesson_complete', ...)` in `finish()`
- 各 commit/onAnswer → `track('answer_submit', ...)`
- `src/store/runStore.ts` → streak hook → `track('streak_update', ...)`
- `src/main.ts` → `track('app_open', ...)` on load

## H. Privacy + consent

- Cloudflare Pages 不在 GDPR strict zone (Taiwan ip), 但仍應加 consent banner
- localStorage flag `pickup.analytics-consent` = 'granted' / 'denied' / null
- 首次 load 顯示 banner: 「我們用匿名數據改善 app, 點下面同意 / 拒絕」
- 拒絕 = `posthog.opt_out_capturing()`

## I. Cross-refs

- Master matrix `docs/product/pickup-master-matrix-2026-06.md` § E #5
- PM roadmap `docs/product/pickup-pm-roadmap-2026-06.md` (Analytics RICE 81)
- Paywall design `docs/product/paywall-gate-design-2026-06.md` (event spec 對齊)
