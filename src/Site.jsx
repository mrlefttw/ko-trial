import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import About from './pages/About.jsx';
import Daily from './pages/Daily.jsx';
import Issues from './pages/Issues.jsx';
import Verdict from './pages/Verdict.jsx';
import App from './App.jsx';

const NAV_ITEMS = [
  { path: '/', label: '逐字稿' },
  { path: '/about', label: '關於' },
];

function Nav() {
  const location = useLocation();
  const current = location.pathname;
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: 'rgba(255, 255, 255, 0.65)',
      backdropFilter: 'saturate(180%) blur(20px)',
      WebkitBackdropFilter: 'saturate(180%) blur(20px)',
      borderBottom: '1px solid rgba(0,0,0,0.06)',
      padding: '0 24px',
      transition: 'all 0.3s',
    }}>
      <div style={{
        maxWidth: 960, margin: '0 auto',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: 52,
      }}>
        <Link to="/" style={{
          textDecoration: 'none', display: 'flex', alignItems: 'center',
        }}>
          <span style={{
            fontWeight: 700, fontSize: 15, color: '#1d1d1f', letterSpacing: '-0.01em',
          }}>
            陪你聽判決
          </span>
        </Link>

        <div style={{ display: 'flex', gap: 4 }}>
          {NAV_ITEMS.map(item => (
            <Link key={item.path} to={item.path} style={{
              textDecoration: 'none', padding: '6px 16px', borderRadius: 20,
              fontSize: 14, fontWeight: current === item.path ? 600 : 400,
              color: current === item.path ? '#1d1d1f' : '#6e6e73',
              background: current === item.path ? 'rgba(255, 230, 0, 0.2)' : 'transparent',
              transition: 'all 0.2s',
            }}>
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

function ViewCounter() {
  const [count, setCount] = useState(null);

  useEffect(() => {
    fetch('/api/views', { method: 'POST' })
      .then(r => r.json())
      .then(d => setCount(d.count))
      .catch(() => {});
  }, []);

  if (count === null) return null;

  return (
    <span style={{ fontSize: 12, color: '#aaa' }}>
      {count.toLocaleString()} 次瀏覽
    </span>
  );
}

export default function Site() {
  return (
    <>
      <Nav />
      <div style={{
        background: '#fdf6d8',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
      }}>
        <img
          src="/聽判決-03.jpg"
          alt="陪你聽判決 — 113年度金訴字第51號 貪污治罪條例等案件"
          style={{
            width: '100%', display: 'block',
            maxHeight: 280, objectFit: 'cover', objectPosition: 'center',
          }}
        />
      </div>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/daily" element={<Daily />} />
        <Route path="/issues" element={<Issues />} />
        <Route path="/verdict" element={<Verdict />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <footer style={{
        background: 'rgba(255, 255, 255, 0.6)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(0,0,0,0.06)',
        color: '#6e6e73', fontSize: 13,
        padding: '32px 20px', textAlign: 'center', lineHeight: 1.8,
      }}>
        <div style={{
          display: 'inline-block', padding: '4px 12px', borderRadius: 8,
          background: '#ffe600', color: '#1d1d1f', fontWeight: 700, fontSize: 13,
          marginBottom: 12,
        }}>
          陪你聽判決
        </div>
        <p style={{ margin: '0 0 4px' }}>資料來源：臺北地院刑事科 YouTube</p>
        <p style={{ margin: '0 0 8px' }}>逐字稿由 AI 自動轉錄並經人名校正，內容僅供參考</p>
        <ViewCounter />
      </footer>
    </>
  );
}
