import { useState, useEffect } from 'react';

const SPEAKER_COLORS = {
  '檢察官': { bg: '#f0f4ff', accent: '#4c6ef5', icon: '&#9878;' },
  '辯護人': { bg: '#f0faf2', accent: '#37b24d', icon: '&#128203;' },
  '被告': { bg: '#fff0f0', accent: '#e03131', icon: '&#128483;' },
  '審判長': { bg: '#fff8f0', accent: '#c2955a', icon: '&#128296;' },
};

const YT_IDS = {
  '12-15-am': 'CXKiBIamLC4', '12-15-pm': '0KeURwJSR_Q',
  '12-16-am': '9JyOZ5CWGz4', '12-16-pm': 'IB49wmaJWtw',
  '12-17-am': 'NDpqyQ8TlV0', '12-17-pm': 'sO8SNz7mXis',
  '12-18-am': 'X9M3axULIU', '12-18-pm': 'Q2uHOiwtENo',
  '12-19-am': 'NfrdKX5NBQc', '12-19-pm': '7SD1Ue5QAiE',
  '12-22-am': 'DS56afN36A8', '12-22-pm': 'JaMUi1QUmbg',
  '12-23-pm': 'xV6hqj2Ybds',
  '12-24-am': 'koSUntQfpmY', '12-24-pm': 'HXqeVOdrDrs',
  '0326-pm': '1NXVGenL8J8',
};

export default function Daily() {
  const [data, setData] = useState(null);
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    fetch('/data/daily.json').then(r => r.json()).then(setData);
  }, []);

  useEffect(() => {
    if (data && window.location.hash) {
      const id = window.location.hash.slice(1);
      setOpenId(id);
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    }
  }, [data]);

  if (!data) return <div style={{ textAlign: 'center', padding: 80, color: '#aaa' }}>載入中...</div>;

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '40px 20px' }}>
      <h1 style={{ fontSize: 28, fontWeight: 800, color: '#1a1a2e', margin: '0 0 8px', textAlign: 'center' }}>
        每日法庭摘要
      </h1>
      <p style={{ textAlign: 'center', color: '#888', fontSize: 15, margin: '0 0 36px' }}>
        16 場辯論，每場重點幫你抓好了
      </p>

      <div style={{ position: 'relative', paddingLeft: 28 }}>
        {/* Timeline line */}
        <div style={{
          position: 'absolute', left: 10, top: 0, bottom: 0, width: 2,
          background: 'linear-gradient(to bottom, #4c6ef5, #e03131)', borderRadius: 1,
        }} />

        {data.sessions.map((s, i) => {
          const isOpen = openId === s.id;
          const sc = SPEAKER_COLORS[s.speaker] || SPEAKER_COLORS['檢察官'];
          const ytId = YT_IDS[s.id];

          return (
            <div key={s.id} id={s.id} style={{ marginBottom: 20, position: 'relative' }}>
              {/* Timeline dot */}
              <div style={{
                position: 'absolute', left: -22, top: 22, width: 12, height: 12,
                borderRadius: '50%', background: sc.accent, border: '2px solid #fff',
                boxShadow: '0 0 0 2px ' + sc.accent + '33',
              }} />

              <div
                onClick={() => setOpenId(isOpen ? null : s.id)}
                style={{
                  background: '#fff', borderRadius: 14, border: '1px solid #eee',
                  overflow: 'hidden', cursor: 'pointer',
                  boxShadow: isOpen ? '0 4px 20px rgba(0,0,0,0.08)' : '0 1px 3px rgba(0,0,0,0.04)',
                  transition: 'box-shadow 0.15s',
                }}
              >
                {/* Header */}
                <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    padding: '4px 10px', borderRadius: 8, fontSize: 12, fontWeight: 600,
                    background: sc.bg, color: sc.accent,
                  }}>
                    {s.date} {s.ampm}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 15, fontWeight: 600, color: '#1a1a2e' }}>{s.desc}</div>
                  </div>
                  <span style={{
                    fontSize: 14, padding: '2px 10px', borderRadius: 10,
                    background: sc.bg, color: sc.accent, fontSize: 12,
                  }}>
                    {s.speaker}
                  </span>
                  <span style={{ color: '#ccc', transition: 'transform 0.2s', transform: isOpen ? 'rotate(180deg)' : '' }}>
                    &#9662;
                  </span>
                </div>

                {/* Expanded */}
                {isOpen && (
                  <div style={{ padding: '0 20px 20px' }} onClick={e => e.stopPropagation()}>
                    {/* Summary */}
                    <p style={{ fontSize: 14, color: '#444', lineHeight: 1.8, margin: '0 0 20px' }}>
                      {s.summary}
                    </p>

                    {/* Highlights */}
                    {s.highlights && s.highlights.length > 0 && (
                      <div style={{ marginBottom: 20 }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: '#888', marginBottom: 10 }}>
                          &#128172; 亮點金句
                        </div>
                        {s.highlights.map((h, j) => (
                          <div key={j} style={{
                            padding: '12px 16px', marginBottom: 8, borderRadius: 12,
                            background: '#f8f9fa', borderLeft: '3px solid #ddd',
                          }}>
                            <p style={{ fontSize: 13, color: '#333', lineHeight: 1.6, margin: '0 0 6px', fontStyle: 'italic' }}>
                              &ldquo;{h.text}&rdquo;
                            </p>
                            <div style={{ fontSize: 11, color: '#aaa' }}>
                              {h.speaker} &middot; {h.ts}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Key moments */}
                    {s.key_moments && s.key_moments.length > 0 && (
                      <div style={{ marginBottom: 16 }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: '#888', marginBottom: 10 }}>
                          &#9200; 關鍵時刻
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                          {s.key_moments.map((m, j) => (
                            <div key={j} style={{ display: 'flex', gap: 10, alignItems: 'baseline' }}>
                              {ytId ? (
                                <a
                                  href={`https://www.youtube.com/watch?v=${ytId}&t=${tsToSec(m.ts)}s`}
                                  target="_blank" rel="noopener"
                                  style={{ fontSize: 12, color: '#4c6ef5', fontFamily: 'monospace', whiteSpace: 'nowrap' }}
                                >
                                  {m.ts}
                                </a>
                              ) : (
                                <span style={{ fontSize: 12, color: '#aaa', fontFamily: 'monospace' }}>{m.ts}</span>
                              )}
                              <span style={{ fontSize: 13, color: '#555' }}>{m.desc}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* YouTube link */}
                    {ytId && (
                      <a
                        href={`https://www.youtube.com/watch?v=${ytId}`}
                        target="_blank" rel="noopener"
                        style={{
                          display: 'inline-flex', alignItems: 'center', gap: 6,
                          padding: '8px 16px', borderRadius: 20,
                          background: '#ff0000', color: '#fff',
                          textDecoration: 'none', fontSize: 13, fontWeight: 600,
                        }}
                      >
                        &#9654; 看完整影片
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function tsToSec(ts) {
  if (!ts) return 0;
  const parts = ts.split(':').map(Number);
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  return 0;
}
