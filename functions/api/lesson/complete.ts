// POST /api/lesson/complete — server 權威領獎 (反作弊核心).
// body: { chapter, lessonId, correct, total }
// 只在「首次完成」發 XP/coins; 重玩回 awarded:false. client 只報「完成幾題對」.
import type { Ctx } from '../../_lib/types';
import { json, ensureProvisioned, auth, readBody, now } from '../../_lib/http';
import { applyDelta, getEconomy } from '../../_lib/db';

interface Body { chapter?: number; lessonId?: string; correct?: number; total?: number }

export async function onRequestPost(ctx: Ctx): Promise<Response> {
  const blocked = ensureProvisioned(ctx.env);
  if (blocked) return blocked;
  const claims = await auth(ctx);
  if (!claims) return json({ error: 'unauthorized' }, 401);

  const userId = claims.sub;
  const b = await readBody<Body>(ctx.request);
  const lessonId = typeof b.lessonId === 'string' ? b.lessonId : '';
  const chapter = Number.isFinite(b.chapter) ? Math.floor(b.chapter as number) : 0;
  if (!lessonId) return json({ error: 'bad_request' }, 400);

  const db = ctx.env.DB!;
  const ts = now();
  // clamp correct to [0, total] to stop inflated payloads
  const total = Math.max(0, Math.min(50, Math.floor(b.total ?? 0)));
  const correct = Math.max(0, Math.min(total || 50, Math.floor(b.correct ?? 0)));

  const existing = await db.prepare('SELECT 1 AS x FROM lesson_completions WHERE user_id = ? AND lesson_id = ?')
    .bind(userId, lessonId).first<{ x: number }>();

  const accuracy = total > 0 ? Math.round((correct / total) * 100) : 100;

  if (existing) {
    // replay → mark progress only, no award
    const econ = await getEconomy(ctx.env, userId);
    return json({ awarded: false, economy: { coins: econ?.coins ?? 0, xp: econ?.xp ?? 0, streak: econ?.streak ?? 0 } });
  }

  await db.prepare('INSERT INTO lesson_completions (user_id, chapter, lesson_id, first_completed_at, best_accuracy) VALUES (?, ?, ?, ?, ?)')
    .bind(userId, chapter, lessonId, ts, accuracy).run();

  const xpGain = correct * 10;
  const coinGain = correct * 3;
  const econ = await applyDelta(ctx.env, userId, coinGain, xpGain, `lesson:${lessonId}`, ts);
  return json({ awarded: true, xpGain, coinGain, economy: { coins: econ.coins, xp: econ.xp, streak: econ.streak } });
}
