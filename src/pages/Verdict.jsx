import { useState, useEffect } from 'react';

export default function Verdict() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/data/verdict.json').then(r => r.json()).then(setData);
  }, []);

  if (!data) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh', color: '#aaa' }}>載入中...</div>;

  return (
    <div>
      {/* Hero */}
      <section style={{
        background: '#0f0f23', color: '#fff', padding: '64px 20px 56px', textAlign: 'center',
      }}>
        <div style={{ fontSize: 12, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.4)', marginBottom: 12, textTransform: 'uppercase' }}>
          Verdict
        </div>
        <h1 style={{ fontSize: 'clamp(28px, 5vw, 40px)', fontWeight: 800, margin: '0 0 12px', fontFamily: "'Noto Serif TC', serif" }}>
          一審判決結果
        </h1>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', margin: 0 }}>
          {data.court} &middot; {data.case_number}
        </p>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', marginTop: 8 }}>
          宣判日期 {data.date} &middot; 全案可上訴
        </p>
      </section>

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '40px 20px 60px' }}>
        {/* Summary */}
        <div style={{
          padding: '24px 28px', borderRadius: 6, background: '#fafafa',
          borderLeft: '3px solid #111', marginBottom: 40,
        }}>
          <p style={{ fontSize: 15, color: '#333', lineHeight: 1.8, margin: 0 }}>
            {data.summary}
          </p>
        </div>

        {/* Defendants */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {data.defendants.map((d, i) => {
            const color = getColor(d);
            return (
              <div key={i} style={{
                padding: '24px 0', borderBottom: '1px solid #eee',
                display: 'flex', gap: 20, alignItems: 'flex-start',
              }}>
                {/* Left: color bar + name */}
                <div style={{ width: 120, flexShrink: 0 }}>
                  <div style={{
                    display: 'inline-block', width: 4, height: 4, borderRadius: '50%',
                    background: color, marginRight: 8, verticalAlign: 'middle',
                  }} />
                  <span style={{
                    fontSize: 18, fontWeight: 700, color: '#111',
                    fontFamily: "'Noto Serif TC', serif",
                  }}>
                    {d.name}
                  </span>
                  <div style={{ fontSize: 13, color: '#999', marginTop: 4, paddingLeft: 12 }}>{d.role}</div>
                </div>

                {/* Right: details */}
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, flexWrap: 'wrap' }}>
                    <span style={{
                      fontSize: 12, fontWeight: 700, padding: '3px 10px', borderRadius: 3,
                      background: color + '15', color: color,
                    }}>
                      {d.result}
                    </span>
                    {d.charges.map((c, j) => (
                      <span key={j} style={{
                        fontSize: 11, padding: '2px 8px', borderRadius: 3,
                        border: '1px solid #e5e5e5', color: '#888',
                      }}>
                        {c}
                      </span>
                    ))}
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 600, color, marginBottom: 8 }}>
                    {d.sentence}
                  </div>
                  <p style={{ fontSize: 13, color: '#666', lineHeight: 1.7, margin: 0 }}>
                    {d.explanation}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Disclaimer */}
        <div style={{
          textAlign: 'center', padding: '32px 0', marginTop: 20,
          color: '#bbb', fontSize: 12, lineHeight: 1.8,
        }}>
          以上為一審判決結果，全案可上訴。<br />
          判決書全文請至司法院裁判書查詢系統查閱。
        </div>
      </div>
    </div>
  );
}

function getColor(d) {
  if (!d.sentence || d.sentence.includes('無罪')) return '#868e96';
  if (d.sentence.includes('緩刑')) return '#37b24d';
  const m = d.sentence.match(/(\d+)\s*年/);
  if (m && parseInt(m[1]) >= 10) return '#c40d23';
  return '#e67700';
}
