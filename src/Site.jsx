import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import About from './pages/About.jsx';
import App from './App.jsx';

const NAV_ITEMS = [
  { path: '/', label: '逐字稿' },
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
            陪你聽判決
          </span>
        </Link>

        <div style={{ display: 'flex', gap: 0 }}>
          {NAV_ITEMS.map(item => (
            <Link key={item.path} to={item.path} style={{
              textDecoration: 'none', padding: '6px 16px',
              fontSize: 14, fontWeight: current === item.path ? 600 : 400,
              color: current === item.path ? '#111' : '#888',
              borderBottom: current === item.path ? '2px solid #ffe600' : '2px solid transparent',
              transition: 'all 0.15s',
            }}>
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default function Site() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <footer style={{
        background: '#111', color: 'rgba(255,255,255,0.4)', fontSize: 13,
        padding: '40px 20px', textAlign: 'center', lineHeight: 1.8,
      }}>
        <div style={{ color: '#ffe600', fontWeight: 600, marginBottom: 8, fontFamily: "'Noto Serif TC', serif" }}>
          陪你聽判決
        </div>
        <p style={{ margin: '0 0 4px' }}>資料來源：臺北地院刑事科 YouTube</p>
        <p style={{ margin: 0 }}>逐字稿由 AI 自動轉錄並經人名校正，內容僅供參考</p>
      </footer>
    </>
  );
}
