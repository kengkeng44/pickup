import { useState } from 'react';
import { useRunStore } from '../../store/runStore';

export default function ProfilePage() {
  const streak = useRunStore(s => s.streak);
  const [catName, setCatName] = useState(() => {
    try { return localStorage.getItem('pickup.catName') ?? 'Mochi'; } catch { return 'Mochi'; }
  });

  const saveCat = (v: string) => {
    setCatName(v);
    try { localStorage.setItem('pickup.catName', v); } catch {}
  };

  return (
    <div style={{ padding: '16px 14px 24px' }}>
      <h1 style={{ fontSize: 22, fontWeight: 900, color: '#3c2a1c', margin: '0 0 16px' }}>我的</h1>

      <div style={{ background: '#fff', border: '2px solid #c8a878', borderRadius: 14, padding: 16, marginBottom: 14, display: 'flex', gap: 14, alignItems: 'center' }}>
        <img src="/mascots/calico-anchor.webp" width={64} height={64} alt="Mochi" />
        <div style={{ flex: 1 }}>
          <input
            value={catName}
            onChange={(e) => saveCat(e.target.value)}
            placeholder="貓咪名字"
            style={{
              width: '100%', padding: 8, fontSize: 16, fontWeight: 700,
              border: '2px solid #c8a878', borderRadius: 8, color: '#3c2a1c',
              fontFamily: 'inherit', background: '#fef8ed',
            }}
          />
          <div style={{ fontSize: 11, color: '#8b6f4a', marginTop: 4 }}>更改後重新整理生效</div>
        </div>
      </div>

      <div style={{ background: '#fff', border: '2px solid #c8a878', borderRadius: 14, padding: 16, marginBottom: 14 }}>
        <h2 style={{ margin: '0 0 12px', fontSize: 15, fontWeight: 800, color: '#3c2a1c' }}>統計</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <Stat label="連勝 Streak" value={`${streak} 🔥`} />
          <Stat label="XP" value="—" />
          <Stat label="Coins" value="—" />
          <Stat label="Level" value="A2" />
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ padding: 10, background: '#fef8ed', borderRadius: 10, textAlign: 'center', border: '1px solid #e0d0b8' }}>
      <div style={{ fontSize: 11, color: '#8b6f4a', marginBottom: 4, fontWeight: 700 }}>{label}</div>
      <div style={{ fontSize: 17, fontWeight: 900, color: '#b07a2a' }}>{value}</div>
    </div>
  );
}
