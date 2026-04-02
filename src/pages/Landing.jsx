import { Link } from 'react-router-dom';

/* ─── 人物資料 ─── */
const PEOPLE = [
  { name: '柯文哲', role: '前台北市長', relation: '被控主導容積獎勵決策', sentence: '17 年', color: '#e03131' },
  { name: '沈慶京', role: '威京集團主席', relation: '京華城案開發商', sentence: '10 年', color: '#4c6ef5' },
  { name: '應曉薇', role: '台北市議員', relation: '被控居中施壓', sentence: '15 年 6 月', color: '#ae3ec9' },
  { name: '彭振聲', role: '前副市長', relation: '都委會主席，通過容積案', sentence: '2 年（緩刑）', color: '#37b24d' },
  { name: '黃景茂', role: '前都發局長', relation: '經手容積獎勵審查', sentence: '6 年 6 月', color: '#f59f00' },
  { name: '張志誠', role: '威京集團人員', relation: '被控協助行賄', sentence: '無罪', color: '#868e96' },
];

const STATS = [
  { num: '16', unit: '場', label: '法庭辯論' },
  { num: '43', unit: 'hr', label: '錄影時數' },
  { num: '57', unit: '萬字', label: '逐字稿' },
  { num: '9', unit: '人', label: '被告' },
];

export default function Landing() {
  return (
    <div>
      {/* ═══ Hero ═══ */}
      <section style={{
        position: 'relative', overflow: 'hidden',
        background: '#fdf6d8',
      }}>
        <img
          src="/聽判決-03.jpg"
          alt="陪你聽判決 — 113年度金訴字第51號 貪污治罪條例等案件"
          style={{
            width: '100%', display: 'block',
            maxHeight: 420, objectFit: 'cover', objectPosition: 'center',
          }}
        />
        <div style={{
          maxWidth: 680, margin: '0 auto',
          padding: '32px 20px 48px', textAlign: 'center',
        }}>
          <p style={{
            fontSize: 'clamp(16px, 2.5vw, 20px)', color: '#444',
            margin: '0 0 12px', lineHeight: 1.6,
          }}>
            柯文哲京華城案 ── 一審全紀錄
          </p>
          <p style={{
            fontSize: 14, color: '#999', margin: '0 0 36px',
          }}>
            43 小時法庭辯論 &middot; 57 萬字逐字稿 &middot; 濃縮成你看得懂的版本
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/issues" style={heroBtn('#1d1d1f', '#fff')}>核心爭點</Link>
            <Link to="/daily" style={heroBtn('transparent', '#1d1d1f', true)}>每日摘要</Link>
            <Link to="/verdict" style={heroBtn('transparent', '#1d1d1f', true)}>判決結果</Link>
          </div>
        </div>
      </section>

      {/* ═══ Stats bar ═══ */}
      <section style={{
        background: '#111', padding: '32px 20px',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}>
        <div style={{
          maxWidth: 700, margin: '0 auto',
          display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: 20,
        }}>
          {STATS.map((s, i) => (
            <div key={i} style={{ textAlign: 'center', minWidth: 80 }}>
              <div style={{ color: '#fff', fontFamily: "'Noto Serif TC', serif" }}>
                <span style={{ fontSize: 32, fontWeight: 800 }}>{s.num}</span>
                <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', marginLeft: 2 }}>{s.unit}</span>
              </div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ 3 分鐘搞懂 ═══ */}
      <section style={{ maxWidth: 760, margin: '0 auto', padding: '72px 20px' }}>
        <SectionLabel>Overview</SectionLabel>
        <h2 style={h2Style}>3 分鐘搞懂這個案子</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginTop: 32 }}>
          <StoryCard num="01" title="發生什麼事？">
            京華城位於台北市松山區，威京集團主席沈慶京想把它改建，
            向台北市政府爭取到 840% 的超高容積率。這個數字遠超過法定上限，
            檢方認為背後有官商勾結，市府高層涉嫌違法圖利開發商。
          </StoryCard>
          <StoryCard num="02" title="誰被起訴？">
            前台北市長柯文哲、威京集團主席沈慶京、台北市議員應曉薇、
            前副市長彭振聲等共 9 人，被控涉犯貪污治罪條例中的圖利罪與收賄罪。
            檢方主張柯文哲收受 1500 萬至 2000 萬元不法利益。
          </StoryCard>
          <StoryCard num="03" title="法院怎麼判？">
            2026 年 3 月 26 日一審宣判。柯文哲數罪併罰合併執行 17 年、
            應曉薇 15 年 6 月、沈慶京 10 年。張志誠獲判無罪。
            彭振聲 2 年但獲得緩刑。全案可上訴。
          </StoryCard>
        </div>
      </section>

      {/* ═══ 人物 ═══ */}
      <section style={{ background: '#fafafa', padding: '72px 20px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <SectionLabel>Key Figures</SectionLabel>
          <h2 style={h2Style}>主要人物</h2>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: 16, marginTop: 32,
          }}>
            {PEOPLE.map((p, i) => (
              <div key={i} style={{
                background: '#fff', borderRadius: 8, padding: '24px 20px',
                borderTop: `3px solid ${p.color}`,
                boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
              }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: '#111', fontFamily: "'Noto Serif TC', serif" }}>{p.name}</div>
                <div style={{ fontSize: 13, color: '#888', margin: '4px 0 10px' }}>{p.role}</div>
                <div style={{ fontSize: 13, color: '#555', lineHeight: 1.5, marginBottom: 12 }}>{p.relation}</div>
                <div style={{
                  display: 'inline-block', fontSize: 12, fontWeight: 600,
                  padding: '3px 10px', borderRadius: 4,
                  background: p.sentence === '無罪' ? '#f0f0f0' : p.color + '12',
                  color: p.sentence === '無罪' ? '#888' : p.color,
                }}>
                  {p.sentence}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 導覽 ═══ */}
      <section style={{ maxWidth: 760, margin: '0 auto', padding: '72px 20px' }}>
        <SectionLabel>Explore</SectionLabel>
        <h2 style={h2Style}>深入了解</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, marginTop: 32 }}>
          <NavCard to="/issues" label="核心爭點" desc="從 43 小時辯論中提煉的 8 個關鍵問題，檢辯雙方立場並排對照" tag="8 個爭點" />
          <NavCard to="/daily" label="每日摘要" desc="16 場法庭辯論的重點整理，每場 500 字幫你抓完重點" tag="16 場" />
          <NavCard to="/verdict" label="判決結果" desc="9 名被告的判決一覽，白話解讀罪名與刑度" tag="9 名被告" />
          <NavCard to="/transcript" label="完整逐字稿" desc="57 萬字全文，可搜尋、可跳到 YouTube 對應段落" tag="57 萬字" />
        </div>
      </section>
    </div>
  );
}

/* ─── 子元件 ─── */

function SectionLabel({ children }) {
  return (
    <div style={{
      fontSize: 12, letterSpacing: '0.15em', color: '#aaa',
      textTransform: 'uppercase', fontWeight: 600, marginBottom: 8, textAlign: 'center',
    }}>
      {children}
    </div>
  );
}

function StoryCard({ num, title, children }) {
  return (
    <div style={{
      display: 'flex', gap: 24, padding: '28px 0',
      borderBottom: '1px solid #eee', alignItems: 'flex-start',
    }}>
      <div style={{
        fontSize: 32, fontWeight: 800, color: '#e8e8e8',
        fontFamily: "'Noto Serif TC', serif", lineHeight: 1, flexShrink: 0, width: 48,
      }}>
        {num}
      </div>
      <div>
        <h3 style={{ fontSize: 18, fontWeight: 700, color: '#111', margin: '0 0 8px', fontFamily: "'Noto Serif TC', serif" }}>
          {title}
        </h3>
        <p style={{ fontSize: 15, color: '#555', lineHeight: 1.8, margin: 0 }}>{children}</p>
      </div>
    </div>
  );
}

function NavCard({ to, label, desc, tag }) {
  return (
    <Link to={to} style={{
      display: 'block', padding: '28px 24px', borderRadius: 8,
      border: '1px solid #e5e5e5', textDecoration: 'none',
      transition: 'border-color 0.2s, box-shadow 0.2s',
      background: '#fff',
    }}
    onMouseEnter={e => { e.currentTarget.style.borderColor = '#111'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.06)'; }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = '#e5e5e5'; e.currentTarget.style.boxShadow = 'none'; }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <h3 style={{ fontSize: 17, fontWeight: 700, color: '#111', margin: 0, fontFamily: "'Noto Serif TC', serif" }}>
          {label}
        </h3>
        <span style={{ fontSize: 12, color: '#999', padding: '2px 8px', background: '#f5f5f5', borderRadius: 4 }}>{tag}</span>
      </div>
      <p style={{ fontSize: 14, color: '#777', lineHeight: 1.6, margin: 0 }}>{desc}</p>
      <div style={{ fontSize: 13, color: '#111', fontWeight: 600, marginTop: 14 }}>
        閱讀 &rarr;
      </div>
    </Link>
  );
}

/* ─── 樣式 ─── */

const h2Style = {
  fontSize: 'clamp(24px, 4vw, 32px)', fontWeight: 800, color: '#111',
  margin: 0, textAlign: 'center', fontFamily: "'Noto Serif TC', serif",
};

function heroBtn(bg, color, outline = false) {
  return {
    display: 'inline-block', padding: '12px 28px', borderRadius: 6,
    background: bg, color: color, textDecoration: 'none',
    fontSize: 15, fontWeight: 600,
    border: outline ? '1px solid rgba(0,0,0,0.15)' : 'none',
    transition: 'all 0.2s',
  };
}
