// 極簡題庫載入 (Phase 0): 直接讀拾光現成英檢題庫 lessons-ch32.json,
// 攤平成題陣列, 只留 MC-like 題 (有 options + correctIndex) 給 POC 答題器。
// 正式版改沿用拾光 lessons.ts (Zod schema + i18n overlay + 全題型 renderer)。
export interface MCQuestion {
  id: string;
  type: string;
  question: string;
  sentence?: string;       // listen-mc 的「音檔文字」(POC 用 TTS 唸)
  options: string[];
  correctIndex: number;
  explanationZh?: string;
}

export async function loadQuestions(chapter = 32): Promise<MCQuestion[]> {
  const res = await fetch(`/lessons-ch${chapter}.json`);
  if (!res.ok) throw new Error(`load ch${chapter} failed: ${res.status}`);
  const lessons = await res.json() as Array<{ questions?: unknown[] }>;
  const out: MCQuestion[] = [];
  for (const l of lessons) {
    for (const q of (l.questions ?? []) as Record<string, unknown>[]) {
      if (Array.isArray(q.options) && typeof q.correctIndex === 'number') {
        out.push({
          id: String(q.id),
          type: String(q.type),
          question: String(q.question ?? ''),
          sentence: q.sentence ? String(q.sentence) : undefined,
          options: (q.options as unknown[]).map(String),
          correctIndex: q.correctIndex as number,
          explanationZh: q.explanationZh ? String(q.explanationZh) : undefined,
        });
      }
    }
  }
  return out;
}

export function speak(text: string): void {
  try {
    if (!text || typeof window.speechSynthesis === 'undefined') return;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US';
    u.rate = 0.9;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  } catch { /* ignore */ }
}
