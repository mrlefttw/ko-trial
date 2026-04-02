import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Landing from './pages/Landing.jsx';
import Issues from './pages/Issues.jsx';
import Daily from './pages/Daily.jsx';
import Verdict from './pages/Verdict.jsx';
import About from './pages/About.jsx';
import App from './App.jsx';

const NAV_ITEMS = [
  { path: '/', label: '首頁' },
  { path: '/issues', label: '爭點' },
  { path: '/daily', label: '每日摘要' },
  { path: '/verdict', label: '判決' },
  { path: '/transcript', label: '逐字稿' },
  { path: '/about', label: '關於' },
];

function Nav() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 720);
  const [scrolled, setScrolled] = useState(false);
  const current = location.pathname;

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 720);
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('resize', onResize);
    window.addEventListener('scroll', onScroll);
    return () => { window.removeEventListener('resize', onResize); window.removeEventListener('scroll', onScroll); };
  }, []);

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: scrolled ? 'rgba(255,255,255,0.96)' : 'rgba(255,255,255,0.88)',
      backdropFilter: 'blur(16px)',
      borderBottom: scrolled ? '1px solid #e5e5e5' : '1px solid transparent',
      padding: '0 24px',
      transition: 'all 0.2s',
    }}>
      <div style={{
        maxWidth: 960, margin: '0 auto',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: 52,
      }}>
        <Link to="/" style={{
          textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <span style={{
            fontWeight: 800, fontSize: 15, color: '#111', letterSpacing: '-0.02em',
            fontFamily: "'Noto Serif TC', serif",
          }}>
            陪你讀判決
          </span>
        </Link>

        {/* Desktop nav */}
        {!isMobile && (
          <div style={{ display: 'flex', gap: 0 }}>
            {NAV_ITEMS.map(item => (
              <Link key={item.path} to={item.path} style={{
                textDecoration: 'none', padding: '6px 16px',
                fontSize: 14, fontWeight: current === item.path ? 600 : 400,
                color: current === item.path ? '#111' : '#888',
                borderBottom: current === item.path ? '2px solid #111' : '2px solid transparent',
                transition: 'all 0.15s',
              }}>
                {item.label}
              </Link>
            ))}
          </div>
        )}

        {/* Mobile hamburger */}
        {isMobile && (
          <button onClick={() => setOpen(!open)} style={{
            background: 'none', border: 'none', fontSize: 22, cursor: 'pointer',
            color: '#333', padding: 4,
          }}>
            {open ? '\u2715' : '\u2630'}
          </button>
        )}
      </div>

      {/* Mobile dropdown */}
      {isMobile && open && (
        <div style={{
          display: 'flex', flexDirection: 'column', gap: 2, padding: '4px 0 16px',
        }}>
          {NAV_ITEMS.map(item => (
            <Link key={item.path} to={item.path} onClick={() => setOpen(false)} style={{
              textDecoration: 'none', padding: '10px 12px', borderRadius: 6,
              fontSize: 15, fontWeight: current === item.path ? 600 : 400,
              color: current === item.path ? '#111' : '#666',
              background: current === item.path ? '#f5f5f5' : 'transparent',
            }}>
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

export default function Site() {
  const location = useLocation();
  const isTranscript = location.pathname === '/transcript';

  return (
    <>
      {!isTranscript && <Nav />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/issues" element={<Issues />} />
        <Route path="/daily" element={<Daily />} />
        <Route path="/verdict" element={<Verdict />} />
        <Route path="/about" element={<About />} />
        <Route path="/transcript" element={<App />} />
      </Routes>
      {!isTranscript && (
        <footer style={{
          background: '#111', color: 'rgba(255,255,255,0.4)', fontSize: 13,
          padding: '40px 20px', textAlign: 'center', lineHeight: 1.8,
        }}>
          <div style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 600, marginBottom: 8, fontFamily: "'Noto Serif TC', serif" }}>
            陪你讀判決
          </div>
          <p style={{ margin: '0 0 4px' }}>時代力量黨工下班後企劃</p>
          <p style={{ margin: '0 0 4px' }}>資料來源：臺北地院刑事科 YouTube</p>
          <p style={{ margin: 0 }}>逐字稿由 AI 自動轉錄並經人名校正，內容僅供參考</p>
        </footer>
      )}
    </>
  );
}
