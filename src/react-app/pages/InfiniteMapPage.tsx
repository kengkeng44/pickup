/**
 * v2.0.B.265 — InfiniteMapPage 首頁無限蜿蜒地圖
 *
 * User: 「我要原版的地圖(7顆的那個)拓展成無限顆, 不用顯示第幾章, 只要按鈕即可,
 *        裡面的故事照每個人選擇會不一致, 圖鑑沒有走錯方向只是他不應該在首頁」
 *
 * 設計:
 *   - 1 條長蜿蜒路徑 (sine-wave dx ±80px), 31 章 × 7 lesson = 217 顆節點
 *   - 每節點 = 圓形 button (64x64), 無 #N badge / 無「Ch N · Lesson N」label
 *   - 三態圖標:
 *     done   ⭐ (olive 圓)
 *     current 🐾 (amber 圓 + pulse 動畫)
 *     locked  · (cream 圓, 仍可點 — free-select)
 *   - 首節 (Ch1-l1) 永遠 unlocked, 其他全 free-select (B.261)
 *   - 故事順序 → 後續接 recommendNextStories (B.245 collaborative filter)
 *     現階段: 章節 ID 順序 (Ch1-l1 → Ch1-l2 → ... → Ch31-l7)
 *
 * 拋棄的元素:
 *   - 章節 title header (「Ch7 葉限」)
 *   - storyBeat label
 *   - 7-lesson chapter view (已移到 /map?ch=N)
 *
 * 沿用元素:
 *   - 頂部 hero stats (完成 N / 217)
 *   - readCompletedLessons (per chapter) 算 done state
 */
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { readCompletedLessons } from '../../store/runStore';

// Shipped chapters Ch1-31 (Ch0 ground-floor 跳過, 不在主 path)
const SHIPPED_CHAPTERS = Array.from({ length: 31 }, (_, i) => i + 1);
const LESSONS_PER_CHAPTER = 7;

// Sine-wave dx offset for winding path (±80px amplitude)
function nodeDx(i: number): number {
  return Math.round(Math.sin(i * 0.45) * 80);
}

interface NodeRef {
  ch: number;
  lid: string;
  idx: number;
  done: boolean;
}

export default function InfiniteMapPage() {
  const navigate = useNavigate();
  const currentRef = useRef<HTMLDivElement>(null);

  // Build stream of all lessons across all shipped chapters
  const nodes: NodeRef[] = [];
  let idx = 0;
  for (const ch of SHIPPED_CHAPTERS) {
    const completed = readCompletedLessons(ch);
    for (let l = 1; l <= LESSONS_PER_CHAPTER; l++) {
      const lid = `kt-ch${ch}-l${l}`;
      nodes.push({ ch, lid, idx, done: completed.has(lid) });
      idx++;
    }
  }

  const totalDone = nodes.filter(n => n.done).length;
  const totalPct = Math.round((totalDone / nodes.length) * 100);
  const currentIdx = nodes.findIndex(n => !n.done);

  // Scroll-into-view current node on mount (smooth ~80% from top)
  useEffect(() => {
    if (currentRef.current) {
      currentRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, []);

  return (
    <div style={{ padding: '14px 14px 80px', maxWidth: 480, margin: '0 auto' }}>
      {/* Hero header */}
      <div style={{ textAlign: 'center', marginBottom: 14 }}>
        <h1 style={{ margin: 0, fontSize: 26, fontWeight: 900, color: 'var(--t-text)' }}>🗺️ 故事地圖</h1>
        <div style={{ fontSize: 12, color: 'var(--t-text-muted)', marginTop: 4, letterSpacing: 1 }}>
          Story Map · {nodes.length} 課
        </div>
      </div>

      {/* Stats card */}
      <div style={{
        background: 'linear-gradient(135deg, var(--t-bg) 0%, var(--t-surface-alt) 100%)',
        border: '2px solid var(--t-brand)',
        borderBottom: '4px solid var(--t-brand-dark)',
        borderRadius: 14,
        padding: 14,
        marginBottom: 18,
        textAlign: 'center',
      }}>
        <div style={{ fontSize: 13, color: 'var(--t-text-muted)', fontWeight: 700, marginBottom: 4 }}>已完成</div>
        <div style={{ fontSize: 32, fontWeight: 900, color: 'var(--t-text)', lineHeight: 1 }}>
          {totalDone}<span style={{ fontSize: 16, color: 'var(--t-text-muted)', fontWeight: 700 }}> / {nodes.length}</span>
        </div>
        <div style={{ fontSize: 12, color: '#7a5e25', marginTop: 6, fontWeight: 700 }}>{totalPct}%</div>
        <div style={{ marginTop: 8, height: 7, background: '#fef3c7', borderRadius: 4, overflow: 'hidden' }}>
          <div style={{
            height: '100%',
            width: `${totalPct}%`,
            background: 'linear-gradient(90deg, var(--t-brand) 0%, var(--t-success) 100%)',
            transition: 'width 0.6s ease',
          }} />
        </div>
        <div style={{ marginTop: 10, fontSize: 11, color: 'var(--t-text-muted)' }}>
          <a href="/chapters" style={{ color: 'var(--t-brand-dark)', textDecoration: 'none', fontWeight: 800 }}>📖 開啟圖鑑 →</a>
        </div>
      </div>

      {/* Infinite winding path */}
      <div style={{ position: 'relative' }}>
        {nodes.map((n, i) => {
          const dx = nodeDx(i);
          const isCurrent = i === currentIdx;
          const isFuture = !n.done && !isCurrent;
          return (
            <div
              key={n.lid}
              ref={isCurrent ? currentRef : null}
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: 22,
                transform: `translateX(${dx}px)`,
                transition: 'transform 0.3s ease',
              }}
            >
              <button
                onClick={() => navigate(`/lesson/${n.ch}/${n.lid}`)}
                aria-label={n.done ? 'Completed lesson' : isCurrent ? 'Current lesson' : 'Future lesson'}
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  background: n.done ? 'var(--t-success-tint)' : isCurrent ? 'var(--t-surface-alt)' : '#fefaee',
                  border: `3px solid ${n.done ? 'var(--t-success)' : isCurrent ? 'var(--t-brand)' : '#d4c4a0'}`,
                  borderBottom: `5px solid ${n.done ? 'var(--t-success)' : isCurrent ? 'var(--t-brand-dark)' : '#a89878'}`,
                  cursor: 'pointer',
                  fontSize: 26,
                  color: n.done ? 'var(--t-success)' : 'var(--t-brand-dark)',
                  fontFamily: 'inherit',
                  padding: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  animation: isCurrent ? 'pickup-pulse 2s ease-in-out infinite' : 'none',
                  opacity: isFuture ? 0.7 : 1,
                  WebkitTapHighlightColor: 'transparent',
                  touchAction: 'manipulation',
                }}
              >
                {n.done ? '⭐' : isCurrent ? '🐾' : '·'}
              </button>
            </div>
          );
        })}
      </div>

      {/* Footer hint */}
      <div style={{ textAlign: 'center', fontSize: 11, color: 'var(--t-text-muted)', marginTop: 20, opacity: 0.7 }}>
        {nodes.length} 課 · 蜿蜒 ~{Math.round((nodes.length * 86) / 1000)}k 像素
      </div>
    </div>
  );
}
