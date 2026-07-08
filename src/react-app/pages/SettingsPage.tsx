// v2.0.B.329 (per user): 設定頁 — 取代舊「給家長」入口。集中必要設定, 各項即時連動。
// v2.0.B.cron (per user): 全頁接 i18n (useT) + 加「語言 中/英」切換 + 難度命名對齊
// 其他 app (初級/中級/高級, 中級標預設)。介面語言開關見 src/data/lang.ts。
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTheme, toggleTheme } from '../../data/theme';
import { isBgmEnabled, setBgmEnabled, isSfxEnabled, setSfxEnabled } from '../../data/audioSettings';
import { startBgm, stopBgm } from '../../audio/bgm';
import { getComprehensionMode, setComprehensionMode, type ComprehensionMode } from '../../data/comprehensionMode';
import { getLang, setLang, type UiLang } from '../../data/lang';
import { readDifficulty, writeDifficulty, type Difficulty } from '../../data/difficulty';
import { useT } from '../i18n';

type Diff = Difficulty;

function Toggle({ on, onChange, ariaLabel }: { on: boolean; onChange: () => void; ariaLabel: string }) {
  return (
    <button type="button" role="switch" aria-checked={on} aria-label={ariaLabel} onClick={onChange}
      style={{
        width: 52, height: 30, borderRadius: 'var(--t-radius-pill)', border: 'none', padding: 3, flex: '0 0 auto',
        background: on ? 'var(--t-success)' : '#d8c9b3', cursor: 'pointer',
        position: 'relative', transition: 'background 160ms ease-out',
        WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation',
      }}>
      <span style={{
        display: 'block', width: 24, height: 24, borderRadius: '50%', background: 'var(--t-surface)',
        boxShadow: '0 1px 2px rgba(60,42,28,0.25)',
        transform: on ? 'translateX(22px)' : 'translateX(0)', transition: 'transform 160ms ease-out',
      }} />
    </button>
  );
}

const cardStyle: React.CSSProperties = {
  background: 'var(--t-surface)', border: '2px solid var(--t-border-card)', borderRadius: 'var(--t-radius-card)',
  padding: 16, marginBottom: 14,
};
const rowStyle: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: 12 };

function Row({ title, sub, children }: { title: string; sub?: string; children: React.ReactNode }) {
  return (
    <div style={{ ...rowStyle, marginTop: 0 }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 'var(--t-text-body)', fontWeight: 800, color: 'var(--t-text)' }}>{title}</div>
        {sub && <div style={{ fontSize: 'var(--t-text-label)', color: 'var(--t-text-muted)', marginTop: 2 }}>{sub}</div>}
      </div>
      {children}
    </div>
  );
}

// 共用「分段選擇」按鈕列 (難度 / 理解題 / 語言 共用)
function SegRow<T extends string>({ value, options, onPick }: {
  value: T; options: [T, string][]; onPick: (v: T) => void;
}) {
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {options.map(([v, label]) => (
        <button key={v} type="button" onClick={() => onPick(v)}
          style={{
            flex: '1 1 28%', padding: '10px 0', borderRadius: 10, fontFamily: 'inherit', fontWeight: 800, fontSize: 'var(--t-text-label)',
            cursor: 'pointer', minHeight: 44,
            border: value === v ? '2px solid var(--t-brand-dark)' : '2px solid var(--t-border-card)',
            background: value === v ? 'var(--t-brand-dark)' : 'var(--t-bg)',
            color: value === v ? '#fff' : 'var(--t-text)',
          }}>{label}</button>
      ))}
    </div>
  );
}

export default function SettingsPage() {
  const navigate = useNavigate();
  const { t } = useT();
  const [dark, setDark] = useState(() => getTheme() === 'dark');
  const [bgm, setBgm] = useState(() => isBgmEnabled());
  const [sfx, setSfx] = useState(() => isSfxEnabled());
  const [diff, setDiff] = useState<Diff>(() => readDifficulty());
  const [compMode, setCompMode] = useState<ComprehensionMode>(() => getComprehensionMode());
  const [lang, setLangState] = useState<UiLang>(() => getLang());

  const applyDiff = (d: Diff) => {
    setDiff(d);
    writeDifficulty(d);
  };
  const applyCompMode = (m: ComprehensionMode) => { setCompMode(m); setComprehensionMode(m); };
  const applyLang = (l: UiLang) => { setLangState(l); setLang(l); /* useT subscribe → 整頁即時換語言 */ };

  const onBgm = () => {
    const next = !bgm; setBgm(next); setBgmEnabled(next);
    if (next) { try { startBgm(); } catch { /* ignore */ } } else { stopBgm(); }
  };

  return (
    <div style={{ padding: '16px 14px 24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
        <button type="button" onClick={() => navigate('/profile')} aria-label={t('settings.back')}
          style={{ background: 'transparent', border: 'none', fontSize: 26, color: 'var(--t-text-muted)', cursor: 'pointer', lineHeight: 1 }}>‹</button>
        <h1 style={{ fontSize: 'var(--t-text-title)', fontWeight: 900, color: 'var(--t-text)', margin: 0 }}>{t('settings.title')}</h1>
      </div>

      {/* 語言 — 中 / 英 (v2.0.B.cron)。B.575 去描述化: 選項本身就是語言名, sub 砍。 */}
      <div style={cardStyle}>
        <div style={{ fontSize: 'var(--t-text-body)', fontWeight: 800, color: 'var(--t-text)', marginBottom: 10 }}>{t('settings.lang')}</div>
        <SegRow<UiLang> value={lang} onPick={applyLang} options={[['zh', '中文'], ['zh-Hans', '简体'], ['en', 'English'], ['ja', '日本語'], ['ko', '한국어']]} />
      </div>

      {/* 顯示 */}
      <div style={cardStyle}>
        <Row title={t('settings.night')}>
          <Toggle on={dark} onChange={() => setDark(toggleTheme() === 'dark')} ariaLabel={t('settings.night')} />
        </Row>
      </div>

      {/* 音訊 */}
      <div style={cardStyle}>
        <Row title={t('settings.bgm')}>
          <Toggle on={bgm} onChange={onBgm} ariaLabel={t('settings.bgm')} />
        </Row>
        <div style={{ height: 1, background: 'var(--t-border-soft)', margin: '12px 0' }} />
        <Row title={t('settings.sfx')}>
          <Toggle on={sfx} onChange={() => { const n = !sfx; setSfx(n); setSfxEnabled(n); }} ariaLabel={t('settings.sfx')} />
        </Row>
      </div>

      {/* 難度 — 初級 / 中級(預設) / 高級。B.575 去描述化: 選項自解釋, sub 砍。 */}
      <div style={cardStyle}>
        <div style={{ fontSize: 'var(--t-text-body)', fontWeight: 800, color: 'var(--t-text)', marginBottom: 10 }}>{t('settings.difficulty')}</div>
        <SegRow<Diff> value={diff} onPick={applyDiff} options={[
          ['easy', t('diff.easy')],
          ['medium', `${t('diff.medium')} · ${t('diff.default')}`],
          ['hard', t('diff.hard')],
        ]} />
      </div>

      {/* 理解題模式 — 跟著難度 / 聽 / 讀。B.575 去描述化: sub 砍, autoHint 縮成符號式短句。 */}
      <div style={cardStyle}>
        <div style={{ fontSize: 'var(--t-text-body)', fontWeight: 800, color: 'var(--t-text)', marginBottom: 4 }}>{t('settings.comp')}</div>
        <div style={{ fontSize: 'var(--t-text-label)', color: 'var(--t-text-muted)', marginBottom: 10 }}>{t('settings.comp.autoHint')}</div>
        <SegRow<ComprehensionMode> value={compMode} onPick={applyCompMode} options={[
          ['auto', t('comp.auto')],
          ['listen', t('comp.listen')],
          ['read', t('comp.read')],
        ]} />
      </div>

      {/* 家長 */}
      <button type="button" onClick={() => navigate('/parent')}
        style={{ ...cardStyle, width: '100%', display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left', borderBottom: '4px solid var(--t-border-card)' }}>
        <span style={{ fontSize: 28, lineHeight: 1 }} aria-hidden="true">👨‍👩‍👧</span>
        <div style={{ flex: 1, fontSize: 'var(--t-text-body)', fontWeight: 900, color: 'var(--t-text)' }}>{t('settings.parent')}</div>
        <span style={{ fontSize: 20, color: 'var(--t-brand-dark)', fontWeight: 900 }} aria-hidden="true">›</span>
      </button>
    </div>
  );
}
