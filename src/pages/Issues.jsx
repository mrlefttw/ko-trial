import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Issues() {
  const [data, setData] = useState(null);
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    fetch('/data/issues.json').then(r => r.json()).then(setData);
  }, []);

  if (!data) return <Loading />;

  return (
    <div>
      {/* Hero */}
      <section style={{
        background: '#0f0f23', color: '#fff', padding: '64px 20px 56px', textAlign: 'center',
      }}>
        <div style={{ fontSize: 12, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.4)', marginBottom: 12, textTransform: 'uppercase' }}>
          Key Issues
        </div>
        <h1 style={{ fontSize: 'clamp(28px, 5vw, 40px)', fontWeight: 800, margin: 0, fontFamily: "'Noto Serif TC', serif" }}>
          法庭上在吵什麼？
        </h1>
        <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', marginTop: 12 }}>
          從 43 小時辯論中提煉的 {data.issues.length} 個核心爭點
        </p>
      </section>

      {/* Issues list */}
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '40px 20px 60px' }}>
        {data.issues.map((issue, idx) => {
          const isOpen = openId === issue.id;
          return (
            <div key={issue.id} style={{
              borderBottom: '1px solid #eee',
              padding: isOpen ? '28px 0 32px' : '28px 0',
              transition: 'padding 0.2s',
            }}>
              {/* Header */}
              <div
                onClick={() => setOpenId(isOpen ? null : issue.id)}
                style={{ cursor: 'pointer', display: 'flex', gap: 16, alignItems: 'flex-start' }}
              >
                <span style={{
                  fontSize: 12, color: '#bbb', fontWeight: 700, marginTop: 4,
                  fontFamily: "'Noto Serif TC', serif", flexShrink: 0, width: 24,
                }}>
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <div style={{ flex: 1 }}>
                  <h3 style={{
                    fontSize: 19, fontWeight: 700, color: '#111', margin: 0,
                    fontFamily: "'Noto Serif TC', serif",
                  }}>
                    {issue.title}
                  </h3>
                  <p style={{ fontSize: 14, color: '#888', margin: '6px 0 0', lineHeight: 1.5 }}>
                    {issue.question}
                  </p>
                </div>
                <span style={{
                  fontSize: 18, color: '#ccc', transition: 'transform 0.2s',
                  transform: isOpen ? 'rotate(180deg)' : '', marginTop: 2, flexShrink: 0,
                }}>
                  &#9662;
                </span>
              </div>

              {/* Expanded */}
              {isOpen && (
                <div style={{ marginTop: 24, marginLeft: 40 }}>
                  {/* 檢辯對照 */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
                    <PosCard label="檢方主張" color="#c40d23" text={issue.prosecution} />
                    <PosCard label="辯方主張" color="#1a6b3c" text={issue.defense} />
                  </div>

                  {/* 法院認定 */}
                  <div style={{
                    padding: '16px 20px', borderRadius: 6, background: '#fafafa',
                    borderLeft: '3px solid #111', marginBottom: 16,
                  }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#111', marginBottom: 6, letterSpacing: '0.05em' }}>
                      法院認定
                    </div>
                    <p style={{ fontSize: 14, color: '#444', lineHeight: 1.7, margin: 0 }}>
                      {issue.verdict}
                    </p>
                  </div>

                  {/* 相關場次 */}
                  {issue.sessions?.length > 0 && (
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                      <span style={{ fontSize: 12, color: '#bbb' }}>相關場次</span>
                      {issue.sessions.map(s => (
                        <Link key={s} to={`/daily#${s}`} style={{
                          fontSize: 12, padding: '2px 8px', borderRadius: 3,
                          background: '#f0f0f0', color: '#666', textDecoration: 'none',
                          border: '1px solid #e5e5e5',
                        }}>
                          {s}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PosCard({ label, color, text }) {
  return (
    <div style={{
      padding: '16px 20px', borderRadius: 6,
      borderTop: `2px solid ${color}`, background: '#fff',
      border: '1px solid #eee', borderTopColor: color, borderTopWidth: 2,
    }}>
      <div style={{ fontSize: 12, fontWeight: 700, color, marginBottom: 8, letterSpacing: '0.05em' }}>
        {label}
      </div>
      <p style={{ fontSize: 13, color: '#555', lineHeight: 1.7, margin: 0 }}>{text}</p>
    </div>
  );
}

function Loading() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh', color: '#aaa', fontSize: 14 }}>
      載入中...
    </div>
  );
}
