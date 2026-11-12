// POST /api/lesson/complete — server 權威領獎 (反作弊核心).
// body: { chapter, lessonId, correct, total }
// 只在「首次完成」發 XP/coins; 重玩回 awarded:false. client 只報「完成幾題對」.
// lessonId 必須真的存在於 /lessons-ch{chapter}.json, 答對數上限 = 該課實際題數 (不信 client 的 total).
import type { Ctx, Env } from '../../_lib/types';
import { json, ensureProvisioned, auth, readBody, now } from '../../_lib/http';
import { applyDelta, getEconomy, insertedOnce } from '../../_lib/db';

interface Body { chapter?: number; lessonId?: string; correct?: number; total?: number }

// 回該課題數 (narration 旁白不算題), 找不到 → null
async function lessonQuestionCount(env: Env, origin: string, chapter: number, lessonId: string): Promise<number | null> {
  if (!env.ASSETS || chapter < 0 || chapter > 99) return null;
  const res = await env.ASSETS.fetch(new Request(`${origin}/lessons-ch${chapter}.json`));
  if (!res.ok) return null;
  const lessons = await res.json() as Array<{ id: string; questions?: Array<{ type?: string }> }>;
  const lesson = lessons.find((l) => l.id === lessonId);
  if (!lesson) return null;
  return (lesson.questions ?? []).filter((q) => q.type !== 'narration').length;
}

export async function onRequestPost(ctx: Ctx): Promise<Response> {
  const blocked = ensureProvisioned(ctx.env);
  if (blocked) return blocked;
  const claims = await auth(ctx);
  if (!claims) return json({ error: 'unauthorized' }, 401);

  const userId = claims.sub;
  const b = await readBody<Body>(ctx.request);
  const lessonId = typeof b.lessonId === 'string' ? b.lessonId.slice(0, 64) : '';
  const chapter = Number.isFinite(b.chapter) ? Math.floor(b.chapter as number) : -1;
  if (!lessonId) return json({ error: 'bad_request' }, 400);

  const qCount = await lessonQuestionCount(ctx.env, new URL(ctx.request.url).origin, chapter, lessonId);
  if (qCount === null) return json({ error: 'unknown_lesson' }, 400);

  const db = ctx.env.DB!;
  const ts = now();
  const correct = Math.max(0, Math.min(qCount, Math.floor(Number(b.correct) || 0)));
  const accuracy = qCount > 0 ? Math.round((correct / qCount) * 100) : 100;

  // INSERT OR IGNORE + changes: 同時送兩次只有一個會領到獎
  const first = await insertedOnce(
    db.prepare('INSERT OR IGNORE INTO lesson_completions (user_id, chapter, lesson_id, first_completed_at, best_accuracy) VALUES (?, ?, ?, ?, ?)')
      .bind(userId, chapter, lessonId, ts, accuracy),
  );
  if (!first) {
    // replay → mark progress only, no award
    const econ = await getEconomy(ctx.env, userId);
    return json({ awarded: false, economy: { coins: econ?.coins ?? 0, xp: econ?.xp ?? 0, streak: econ?.streak ?? 0 } });
  }

  const xpGain = correct * 10;
  const coinGain = correct * 3;
  const econ = await applyDelta(ctx.env, userId, coinGain, xpGain, `lesson:${lessonId}`, ts);
  return json({ awarded: true, xpGain, coinGain, economy: { coins: econ.coins, xp: econ.xp, streak: econ.streak } });
}
