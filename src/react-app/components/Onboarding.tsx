/**
 * v2.0.B.394 — 首次啟動 onboarding 流程 (local-first, 無後端).
 *
 * 步驟: welcome → auth(註冊/訪客) | login → lang(語言) → level(程度) → 完成.
 * 全存 localStorage (src/data/onboarding.ts); 真雲端帳號之後接。
 * 語言步驟用 useT() 即時切換 — 選完語言後續步驟立刻變該語言。
 * ja/ko 字典未齊 → 語言卡標「即將推出」disabled (避免半翻譯 UI)。
 */
import { useState } from 'react';
import { useT } from '../i18n';
import { setLang, type UiLang } from '../../data/lang';
import {
  setOnboarded,
  setAccount,
  setLevel,
  getAccount,
  type OnboardLevel,
} from '../../data/onboarding';

type Step = 'welcome' | 'auth' | 'login' | 'lang' | 'level';

interface LangOption { id: UiLang; native: string; ready: boolean; }
const LANGS: LangOption[] = [
  { id: 'zh', native: '中文（繁）', ready: true },
  { id: 'zh-Hans', native: '简体中文', ready: true },
  { id: 'en', native: 'English', ready: true },
  { id: 'ja', native: '日本語', ready: true },
  { id: 'ko', native: '한국어', ready: true },
];

const LEVELS: Array<{ id: OnboardLevel; emoji: string; key: string; subKey: string }> = [
  { id: 'A0', emoji: '🌱', key: 'ob.level.a0', subKey: 'ob.level.a0sub' },
  { id: 'A1', emoji: '🌤️', key: 'ob.level.a1', subKey: 'ob.level.a1sub' },
  { id: 'A2', emoji: '⭐', key: 'ob.level.a2', subKey: 'ob.level.a2sub' },
  { id: 'A2+', emoji: '🚀', key: 'ob.level.a2p', subKey: 'ob.level.a2psub' },
];

export default function Onboarding({ onDone }: { onDone: () => void }) {
  const { t } = useT();
  // v2.0.B.414 (per user): 語言選第一步 → 之後歡迎/登入/註冊全是該語言。
  const [step, setStep] = useState<Step>('lang');
  const [name, setName] = useState(() => getAccount()?.name ?? '');
  const [email, setEmail] = useState('');

  const finish = (level: OnboardLevel) => {
    setLevel(level);
    setOnboarded();
    onDone();
  };

  return (
    <div style={S.scrim}>
      <div style={S.card}>
        {step === 'welcome' && (
          <div style={S.center}>
            <div style={{ fontSize: 72, lineHeight: 1 }}>👵🐱</div>
            <div style={S.brand}>故事燈</div>
            <div style={S.tag}>{t('ob.welcome.tag')}</div>
            {/* v2.0.B.538 (walkthrough ARCH-REC, 兒童/家長版 framing per user): 開場先安心 —
                「不是考試」降低焦慮 (原 audit 是成人-trauma, pivot 後改溫柔陪伴語氣)。 */}
            <div style={{ ...S.tag, fontSize: 'var(--t-text-label)', opacity: 0.85, marginTop: -4 }}>🐾 {t('ob.welcome.reassure')}</div>
            <button style={S.primary} onClick={() => setStep('auth')}>{t('ob.welcome.start')}</button>
            <button style={S.link} onClick={() => setStep('login')}>{t('ob.welcome.haveAccount')}</button>
          </div>
        )}

        {step === 'auth' && (
          <div>
            <div style={S.h}>{t('ob.auth.title')}</div>
            <label style={S.label}>{t('ob.auth.nameLabel')}</label>
            <input style={S.input} value={name} onChange={(e) => setName(e.target.value)}
              placeholder={t('ob.auth.namePlaceholder')} maxLength={20} autoFocus />
            <label style={S.label}>{t('ob.auth.emailOptional')}</label>
            <input style={S.input} value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com" type="email" inputMode="email" />
            <button style={{ ...S.primary, opacity: name.trim() ? 1 : 0.5 }} disabled={!name.trim()}
              onClick={() => { setAccount({ name: name.trim(), mode: 'local', email: email.trim() || undefined }); setStep('level'); }}>
              {t('ob.auth.register')}
            </button>
            <button style={S.link} onClick={() => { setAccount({ name: name.trim() || 'Guest', mode: 'guest' }); setStep('level'); }}>
              {t('ob.auth.guest')}
            </button>
          </div>
        )}

        {step === 'login' && (
          <div>
            <div style={S.h}>{t('ob.login.title')}</div>
            <div style={S.sub}>{t('ob.login.sub')}</div>
            <input style={S.input} value={name} onChange={(e) => setName(e.target.value)}
              placeholder={t('ob.auth.namePlaceholder')} maxLength={20} autoFocus />
            <button style={{ ...S.primary, opacity: name.trim() ? 1 : 0.5 }} disabled={!name.trim()}
              onClick={() => { setAccount({ name: name.trim(), mode: 'local' }); setStep('level'); }}>
              {t('ob.login.enter')}
            </button>
            <button style={S.link} onClick={() => setStep('welcome')}>{t('ob.back')}</button>
          </div>
        )}

        {step === 'lang' && (
          <div>
            <div style={S.h}>{t('ob.lang.title')}</div>
            <div style={S.sub}>{t('ob.lang.sub')}</div>
            <div style={S.grid}>
              {LANGS.map((l, i) => (
                <button key={i} disabled={!l.ready}
                  onClick={() => { if (l.ready) { setLang(l.id); setStep('welcome'); } }}
                  style={{ ...S.langCard, opacity: l.ready ? 1 : 0.45, cursor: l.ready ? 'pointer' : 'default' }}>
                  <span style={{ fontSize: 'var(--t-text-option)', fontWeight: 800 }}>{l.native}</span>
                  {!l.ready && <span style={S.soon}>{t('ob.lang.soon')}</span>}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 'level' && (
          <div>
            <div style={S.h}>{t('ob.level.title')}</div>
            <div style={S.sub}>{t('ob.level.sub')}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, margin: '16px 0' }}>
              {LEVELS.map((lv) => (
                <button key={lv.id} style={S.levelCard} onClick={() => finish(lv.id)}>
                  <span style={{ fontSize: 28 }}>{lv.emoji}</span>
                  <span style={{ flex: 1, textAlign: 'left' }}>
                    <span style={{ display: 'block', fontSize: 'var(--t-text-option)', fontWeight: 800, color: 'var(--t-text)' }}>{t(lv.key)}</span>
                    <span style={{ display: 'block', fontSize: 'var(--t-text-label)', color: 'var(--t-text-muted)' }}>{t(lv.subKey)}</span>
                  </span>
                  <span style={{ fontSize: 18, color: 'var(--t-brand-dark)' }}>→</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const S: Record<string, React.CSSProperties> = {
  scrim: {
    position: 'fixed', inset: 0, zIndex: 9999, background: 'var(--t-bg)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: 'max(20px, env(safe-area-inset-top)) 20px max(20px, env(safe-area-inset-bottom))',
  },
  card: { width: '100%', maxWidth: 380 },
  center: { textAlign: 'center' },
  brand: { fontSize: 40, fontWeight: 900, color: 'var(--t-brand-dark)', marginTop: 12, letterSpacing: 2, fontFamily: 'var(--font-display, inherit)' },
  tag: { fontSize: 'var(--t-text-body)', color: 'var(--t-text-muted)', marginTop: 8, marginBottom: 32, fontWeight: 600 },
  h: { fontSize: 'var(--t-text-title)', fontWeight: 900, color: 'var(--t-text)', marginBottom: 6 },
  sub: { fontSize: 'var(--t-text-label)', color: 'var(--t-text-muted)', marginBottom: 18, fontWeight: 600 },
  label: { display: 'block', fontSize: 'var(--t-text-label)', color: 'var(--t-text-muted)', fontWeight: 700, margin: '14px 0 6px' },
  input: {
    width: '100%', boxSizing: 'border-box', padding: '13px 14px', fontSize: 'var(--t-text-body)',
    border: '2px solid var(--t-border-card)', borderRadius: 'var(--t-radius-md)', background: 'var(--t-surface)',
    color: 'var(--t-text)', fontFamily: 'inherit', outline: 'none',
  },
  primary: {
    width: '100%', minHeight: 52, marginTop: 22, border: 'none', borderRadius: 'var(--t-radius-card)',
    background: 'var(--t-brand-dark)', color: '#fff', fontSize: 'var(--t-text-button)', fontWeight: 900,
    fontFamily: 'inherit', cursor: 'pointer', WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation',
  },
  link: {
    width: '100%', marginTop: 12, border: 'none', background: 'transparent',
    color: 'var(--t-text-muted)', fontSize: 'var(--t-text-label)', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
  },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, margin: '16px 0' },
  langCard: {
    minHeight: 64, border: '2px solid var(--t-border-card)', borderRadius: 'var(--t-radius-card)', background: 'var(--t-surface)',
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3,
    fontFamily: 'inherit', color: 'var(--t-text)',
  },
  soon: { fontSize: 'var(--t-text-micro)', color: 'var(--t-text-muted)', fontWeight: 700 },
  levelCard: {
    display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px',
    border: '2px solid var(--t-border-card)', borderBottom: '4px solid var(--t-brand-dark)',
    borderRadius: 'var(--t-radius-card)', background: 'var(--t-surface)', cursor: 'pointer', fontFamily: 'inherit',
    WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation',
  },
};
