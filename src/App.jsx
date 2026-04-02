import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { SESSIONS, SPEAKERS, youtubeUrl } from './config';

/* ============================================================
   工具函式
   ============================================================ */

function fmtTs(ts) {
  if (!ts) return '';
  const [h, m, s] = ts.split(':');
  return +h > 0 ? `${+h}:${m}:${s}` : `${+m}:${s}`;
}

function highlightText(text, terms) {
  if (!terms.length) return text;
  const escaped = terms.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const re = new RegExp(`(${escaped.join('|')})`, 'gi');
  const parts = text.split(re);
  return parts.map((part, i) =>
    terms.some(t => part.toLowerCase() === t.toLowerCase())
      ? <mark key={i} style={{ background: 'var(--color-highlight)', borderRadius: '2px', padding: '0 2px' }}>{part}</mark>
      : part
  );
}

/* ============================================================
   段落卡片
   ============================================================ */

function ParagraphCard({ para, paraKey, query, isExpanded, onToggle, sessionId, showSessionBadge }) {
  const [copied, setCopied] = useState(false);
  const config = SPEAKERS[para.speaker] || SPEAKERS['檢察官'];
  const terms = query.trim().split(/\s+/).filter(t => t.length >= 2);
  const tsLabel = para.start_ts === para.end_ts
    ? fmtTs(para.start_ts)
    : `${fmtTs(para.start_ts)}–${fmtTs(para.end_ts)}`;
  const ytLink = youtubeUrl(sessionId, para.start);
  const session = SESSIONS.find(s => s.id === sessionId);

  const handleCopyLink = async (e) => {
    e.stopPropagation();
    const url = `${location.origin}${location.pathname}?s=${sessionId}#${paraKey}`;
    try { await navigator.clipboard.writeText(url); } catch {}
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div
      id={paraKey}
      onClick={() => onToggle(paraKey)}
      style={{
        background: isExpanded ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.6)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderRadius: 16,
        padding: '18px 20px',
        marginBottom: '10px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        border: isExpanded ? '1px solid rgba(255,230,0,0.4)' : '1px solid rgba(0,0,0,0.04)',
        boxShadow: isExpanded
          ? '0 4px 24px rgba(0,0,0,0.06)'
          : '0 1px 4px rgba(0,0,0,0.03)',
      }}
      onMouseEnter={e => { if (!isExpanded) { e.currentTarget.style.background = 'rgba(255,255,255,0.8)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.06)'; }}}
      onMouseLeave={e => { if (!isExpanded) { e.currentTarget.style.background = 'rgba(255,255,255,0.6)'; e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.03)'; }}}
    >
      {/* Top: badges */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
        {showSessionBadge && (
          <span style={{
            fontSize: '11px', padding: '2px 10px',
            color: 'var(--color-text-on-dark)', background: 'var(--color-bg-header)',
            borderRadius: 'var(--radius-pill)', fontWeight: 600, fontFamily: 'var(--font-ui)',
          }}>
            {session?.label}
          </span>
        )}
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: '4px',
          fontWeight: 600, padding: '3px 12px', fontSize: '12px',
          color: config.accent, background: config.bg,
          border: `1px solid ${config.accent}33`,
          borderRadius: 'var(--radius-pill)', fontFamily: 'var(--font-ui)',
        }}>
          {config.icon} {para.speaker}
        </span>
        <span style={{ fontSize: '12px', color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
          {tsLabel}
        </span>
      </div>

      {/* Body */}
      <div style={{
        fontSize: '15px', lineHeight: '1.85', color: 'var(--color-text)',
        fontFamily: 'var(--font-body)',
        display: isExpanded ? 'block' : '-webkit-box',
        WebkitLineClamp: isExpanded ? 'unset' : 4,
        WebkitBoxOrient: 'vertical',
        overflow: isExpanded ? 'visible' : 'hidden',
      }}>
        {terms.length ? highlightText(para.text, terms) : para.text}
      </div>

      {!isExpanded && para.text.length > 150 && (
        <div style={{ fontSize: '11px', color: 'var(--color-text-dim)', marginTop: '6px' }}>⋯ 點擊展開全文</div>
      )}

      {/* Action bar */}
      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: '8px',
        marginTop: '14px', paddingTop: '12px',
        borderTop: '1px solid var(--color-border-light)',
      }}>
        {ytLink && (
          <a href={ytLink} target="_blank" rel="noopener" onClick={e => e.stopPropagation()}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              fontSize: '12px', padding: '6px 16px',
              borderRadius: 8,
              background: '#1d1d1f', color: '#fff',
              textDecoration: 'none', fontWeight: 500, fontFamily: 'var(--font-ui)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#333'}
            onMouseLeave={e => e.currentTarget.style.background = '#1d1d1f'}
          >
            觀看影片 {tsLabel}
          </a>
        )}
        <button onClick={handleCopyLink} style={{
          display: 'inline-flex', alignItems: 'center', gap: '4px',
          fontSize: '12px', padding: '6px 14px',
          borderRadius: 8,
          border: 'none',
          background: copied ? '#ffe600' : 'rgba(0,0,0,0.05)',
          color: copied ? '#1d1d1f' : 'var(--color-text-secondary)',
          cursor: 'pointer', fontFamily: 'var(--font-ui)', transition: 'all 0.2s',
          fontWeight: copied ? 600 : 400,
        }}>
          {copied ? '已複製' : '複製連結'}
        </button>
      </div>
    </div>
  );
}

/* ============================================================
   章節標題
   ============================================================ */

function SectionHeader({ time, title, id }) {
  const timeLabel = time === '0:00:00' ? '00:00' : time.replace(/^0:/, '');
  return (
    <div id={id} style={{
      display: 'flex', alignItems: 'center', gap: '10px',
      padding: '24px 0 10px', fontFamily: 'var(--font-ui)',
    }}>
      <span style={{
        background: '#ffe600', color: '#1d1d1f',
        padding: '4px 12px', borderRadius: 8,
        fontSize: '11px', fontFamily: 'var(--font-mono)', flexShrink: 0, fontWeight: 600,
      }}>
        {timeLabel}
      </span>
      {title && (
        <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text)', fontFamily: 'var(--font-body)' }}>
          {title}
        </span>
      )}
      <div style={{ flex: 1, height: '1px', background: 'var(--color-border)', marginLeft: '4px' }} />
    </div>
  );
}

/* ============================================================
   跨場次搜尋結果的場次分隔標題
   ============================================================ */

function SessionDivider({ session, resultCount }) {
  const conf = SPEAKERS[session.speaker];
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '10px',
      padding: '28px 0 12px', fontFamily: 'var(--font-ui)',
    }}>
      <span style={{
        fontSize: '15px', fontWeight: 700, color: 'var(--color-text)',
        fontFamily: 'var(--font-body)',
      }}>
        {session.label}
      </span>
      <span style={{
        fontSize: '11px', padding: '2px 10px',
        color: conf.accent, background: conf.bg,
        borderRadius: 'var(--radius-pill)', fontWeight: 500,
      }}>
        {session.desc}
      </span>
      <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}>
        {resultCount} 筆
      </span>
      <div style={{ flex: 1, height: '1px', background: 'var(--color-border)' }} />
    </div>
  );
}

/* ============================================================
   章節跳轉下拉
   ============================================================ */

function SectionNav({ sections }) {
  const [open, setOpen] = useState(false);
  const jump = (id) => { setOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); };
  return (
    <div style={{ position: 'relative' }}>
      <button onClick={() => setOpen(!open)} style={{
        fontSize: '10px', padding: '3px 8px', borderRadius: '4px',
        border: `1px solid ${open ? 'var(--color-bg-header)' : 'var(--color-border)'}`,
        background: open ? 'var(--color-bg-header)' : 'var(--color-bg-card)',
        color: open ? 'var(--color-text-on-dark)' : 'var(--color-text-secondary)',
        cursor: 'pointer', fontFamily: 'var(--font-ui)',
      }}>
        📑 章節 ({sections.length})
      </button>
      {open && (
        <>
          <div onClick={() => setOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 59 }} />
          <div style={{
            position: 'absolute', top: '100%', right: 0, marginTop: '4px', zIndex: 60,
            background: '#fff', border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-card)', boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
            maxHeight: '50vh', overflowY: 'auto', minWidth: '200px',
          }}>
            {sections.map((sec, i) => (
              <button key={i} onClick={() => jump(sec.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  width: '100%', textAlign: 'left', padding: '10px 14px',
                  border: 'none', cursor: 'pointer', fontSize: '13px',
                  borderBottom: '1px solid var(--color-border-light)',
                  background: 'transparent', fontFamily: 'var(--font-ui)', transition: 'background 0.1s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--color-bg-hover)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--color-text-muted)', minWidth: '44px' }}>
                  {sec.time === '0:00:00' ? '00:00' : sec.time.replace(/^0:/, '')}
                </span>
                <span style={{ color: 'var(--color-text)', fontSize: '12px', fontWeight: 500, flex: 1 }}>
                  {sec.title || `${sec.count} 段`}
                </span>
                <span style={{ color: 'var(--color-text-dim)', fontSize: '10px', fontFamily: 'var(--font-mono)' }}>
                  {sec.count}
                </span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* ============================================================
   場次選擇器
   ============================================================ */

function SessionPicker({ current, onChange, isMobile, isGlobalSearch }) {
  const [open, setOpen] = useState(false);
  const session = SESSIONS.find(s => s.id === current);

  if (isGlobalSearch) {
    return (
      <div style={{
        padding: '8px 14px', borderRadius: 'var(--radius-card)',
        background: 'var(--color-highlight)', fontSize: '13px',
        fontFamily: 'var(--font-ui)', color: 'var(--color-text)',
      }}>
        跨場次搜尋中 — 顯示全部 16 場結果
      </div>
    );
  }

  if (isMobile) {
    return (
      <div style={{ position: 'relative' }}>
        <button onClick={() => setOpen(!open)}
          style={{
            width: '100%', textAlign: 'left', padding: '10px 16px', fontSize: '14px',
            background: 'var(--color-bg-card)', border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-input)', fontFamily: 'var(--font-ui)', cursor: 'pointer',
          }}
        >
          <div style={{ fontWeight: 600 }}>{session?.label} <span style={{ fontWeight: 400, color: 'var(--color-text-muted)' }}>▾</span></div>
          <div style={{ color: 'var(--color-text-muted)', fontSize: '12px' }}>{session?.desc}</div>
        </button>
        {open && (
          <>
            <div onClick={() => setOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 49 }} />
            <div style={{
              position: 'absolute', zIndex: 50, top: '100%', left: 0, right: 0, marginTop: '4px',
              background: '#fff', border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-card)', boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
              maxHeight: '60vh', overflowY: 'auto',
            }}>
              {SESSIONS.map(s => {
                const conf = SPEAKERS[s.speaker];
                return (
                  <button key={s.id} onClick={() => { onChange(s.id); setOpen(false); }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '8px',
                      width: '100%', textAlign: 'left', padding: '10px 16px', fontSize: '13px',
                      borderBottom: '1px solid var(--color-border-light)', border: 'none', cursor: 'pointer',
                      background: s.id === current ? conf.bg : 'transparent', fontFamily: 'var(--font-ui)',
                    }}
                  >
                    <span style={{ fontWeight: 600, minWidth: '70px' }}>{s.label}</span>
                    <span style={{ color: 'var(--color-text-muted)', fontSize: '12px' }}>{s.desc}</span>
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>
    );
  }

  // 桌面版也用下拉選單，完整名稱太長不適合按鈕列
  return (
    <div style={{ position: 'relative' }}>
      <button onClick={() => setOpen(!open)}
        style={{
          width: '100%', textAlign: 'left', padding: '10px 16px', fontSize: '14px',
          background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(0,0,0,0.08)',
          backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
          borderRadius: 12, fontFamily: 'var(--font-ui)', cursor: 'pointer',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}
      >
        <span><strong>{session?.label}</strong> — {session?.desc}</span>
        <span style={{ color: 'var(--color-text-muted)' }}>▾</span>
      </button>
      {open && (
        <>
          <div onClick={() => setOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 49 }} />
          <div style={{
            position: 'absolute', zIndex: 50, top: '100%', left: 0, right: 0, marginTop: '6px',
            background: '#fff', border: '1px solid rgba(0,0,0,0.08)',
            borderRadius: 16, boxShadow: '0 12px 40px rgba(0,0,0,0.12)',
            maxHeight: '60vh', overflowY: 'auto',
          }}>
            {SESSIONS.map(s => {
              const conf = SPEAKERS[s.speaker];
              return (
                <button key={s.id} onClick={() => { onChange(s.id); setOpen(false); }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    width: '100%', textAlign: 'left', padding: '10px 16px', fontSize: '13px',
                    borderBottom: '1px solid var(--color-border-light)', border: 'none', cursor: 'pointer',
                    background: s.id === current ? conf.bg : 'transparent', fontFamily: 'var(--font-ui)',
                  }}
                >
                  <span style={{ fontWeight: 600, minWidth: '70px' }}>{s.label}</span>
                  <span style={{ color: 'var(--color-text-secondary)' }}>—</span>
                  <span style={{ color: 'var(--color-text-muted)', fontSize: '12px' }}>{s.desc}</span>
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

/* ============================================================
   主應用
   ============================================================ */

export default function App() {
  const [sessionId, setSessionId] = useState(SESSIONS[0].id);
  const [currentData, setCurrentData] = useState(null);
  const [allData, setAllData] = useState({});       // { sessionId: data }
  const [allLoaded, setAllLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [speakerFilter, setSpeakerFilter] = useState(new Set());
  const [expandedItems, setExpandedItems] = useState(new Set()); // Set of paraKey strings
  const [showStats, setShowStats] = useState(false);
  const searchRef = useRef(null);

  const isGlobalSearch = query.trim().length >= 2;

  // Parse URL on mount
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const s = params.get('s');
    if (s && SESSIONS.some(x => x.id === s)) setSessionId(s);
  }, []);

  // Load current session
  useEffect(() => {
    if (allData[sessionId]) {
      setCurrentData(allData[sessionId]);
      setLoading(false);
      return;
    }
    setLoading(true);
    fetch(`/data/${sessionId}.json`)
      .then(r => r.json())
      .then(d => {
        setCurrentData(d);
        setAllData(prev => ({ ...prev, [sessionId]: d }));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [sessionId]);

  // Preload all sessions in background
  useEffect(() => {
    Promise.all(
      SESSIONS.map(s =>
        fetch(`/data/${s.id}.json`).then(r => r.json()).then(d => [s.id, d])
      )
    ).then(results => {
      const map = {};
      results.forEach(([id, d]) => { map[id] = d; });
      setAllData(map);
      setAllLoaded(true);
    });
  }, []);

  // Scroll to anchor
  useEffect(() => {
    if (!currentData) return;
    const hash = location.hash?.replace('#', '');
    if (hash) {
      setExpandedItems(new Set([hash]));
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 150);
    }
  }, [currentData]);

  // Reset expanded when switching session
  useEffect(() => {
    setExpandedItems(new Set());
  }, [sessionId]);

  // === Single session view ===
  const currentItems = useMemo(() => {
    if (!currentData) return [];
    const items = [];
    let idx = 0;
    currentData.sections.forEach((section, secIdx) => {
      items.push({ type: 'section', time: section.time, title: section.title || '', id: `sec-${secIdx}` });
      section.paragraphs.forEach(para => {
        items.push({ type: 'para', para, paraKey: `p${idx}`, sessionId, secIdx });
        idx++;
      });
    });
    return items;
  }, [currentData, sessionId]);

  const currentParas = useMemo(() => currentItems.filter(i => i.type === 'para'), [currentItems]);
  const currentSpeakers = useMemo(() => Array.from(new Set(currentParas.map(i => i.para.speaker))), [currentParas]);

  // Filter current session (no query, or speaker filter only)
  const filteredCurrentItems = useMemo(() => {
    if (speakerFilter.size === 0) return currentItems;
    const filteredParas = [];
    for (const item of currentItems) {
      if (item.type !== 'para') continue;
      if (speakerFilter.has(item.para.speaker)) filteredParas.push(item);
    }
    const result = [];
    let lastSec = -1;
    for (const item of filteredParas) {
      if (item.secIdx !== lastSec) {
        const secItem = currentItems.find(i => i.type === 'section' && i.id === `sec-${item.secIdx}`);
        if (secItem) result.push(secItem);
        lastSec = item.secIdx;
      }
      result.push(item);
    }
    return result;
  }, [currentItems, speakerFilter]);

  // === Global search ===
  const globalResults = useMemo(() => {
    if (!isGlobalSearch || !allLoaded) return [];
    const terms = query.trim().split(/\s+/).filter(t => t.length >= 2);
    const results = []; // { type: 'session-divider' | 'para', ... }

    for (const s of SESSIONS) {
      const data = allData[s.id];
      if (!data) continue;
      const matched = [];
      let idx = 0;
      for (const section of data.sections) {
        for (const para of section.paragraphs) {
          const matchQuery = terms.every(t => para.text.toLowerCase().includes(t.toLowerCase()));
          const matchSpeaker = speakerFilter.size === 0 || speakerFilter.has(para.speaker);
          if (matchQuery && matchSpeaker) {
            matched.push({ type: 'para', para, paraKey: `${s.id}-p${idx}`, sessionId: s.id });
          }
          idx++;
        }
      }
      if (matched.length > 0) {
        results.push({ type: 'session-divider', session: s, count: matched.length });
        results.push(...matched);
      }
    }
    return results;
  }, [isGlobalSearch, query, speakerFilter, allData, allLoaded]);

  const globalParaCount = useMemo(() => globalResults.filter(i => i.type === 'para').length, [globalResults]);

  // All speakers across all data
  const allSpeakers = useMemo(() => {
    if (!allLoaded) return currentSpeakers;
    const s = new Set();
    Object.values(allData).forEach(d => {
      d.sections.forEach(sec => sec.paragraphs.forEach(p => s.add(p.speaker)));
    });
    return Array.from(s);
  }, [allLoaded, allData, currentSpeakers]);

  // Section nav (single session only)
  const sectionNav = useMemo(() => {
    if (!currentData) return [];
    return currentData.sections.map((s, i) => ({
      time: s.time, title: s.title || '', count: s.paragraphs.length, id: `sec-${i}`,
    }));
  }, [currentData]);

  // Stats
  const displayParas = isGlobalSearch ? globalResults.filter(i => i.type === 'para') : currentParas;
  const stats = useMemo(() => {
    const count = {}, chars = {};
    displayParas.forEach(({ para: p }) => {
      count[p.speaker] = (count[p.speaker] || 0) + 1;
      chars[p.speaker] = (chars[p.speaker] || 0) + p.text.length;
    });
    return { count, chars, total: displayParas.length };
  }, [displayParas]);
  const totalChars = useMemo(() => Object.values(stats.chars).reduce((a, b) => a + b, 0), [stats]);

  const speakers = isGlobalSearch ? allSpeakers : currentSpeakers;
  const filteredParaCount = isGlobalSearch ? globalParaCount : filteredCurrentItems.filter(i => i.type === 'para').length;
  const totalParaCount = isGlobalSearch ? Object.values(allData).reduce((sum, d) => sum + d.sections.reduce((s2, sec) => s2 + sec.paragraphs.length, 0), 0) : currentParas.length;

  const toggleSpeaker = useCallback(speaker => {
    setSpeakerFilter(prev => {
      const next = new Set(prev);
      next.has(speaker) ? next.delete(speaker) : next.add(speaker);
      return next;
    });
  }, []);

  const toggleExpand = useCallback(key => {
    setExpandedItems(prev => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  }, []);

  // ⌘K
  useEffect(() => {
    const handler = e => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); searchRef.current?.focus(); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const session = SESSIONS.find(s => s.id === sessionId);

  // Decide what to render
  const renderItems = isGlobalSearch ? globalResults : filteredCurrentItems;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)', fontFamily: 'var(--font-ui)' }}>
      <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500;600;700&family=Noto+Serif+TC:wght@400;600;700&display=swap" rel="stylesheet" />

      {/* Sticky toolbar */}
      <div style={{
        position: 'sticky', top: 52, zIndex: 99,
        background: 'rgba(245, 245, 247, 0.75)',
        backdropFilter: 'saturate(180%) blur(20px)',
        WebkitBackdropFilter: 'saturate(180%) blur(20px)',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
        padding: '10px 24px',
      }}>
        <div style={{ maxWidth: 'var(--width-content)', margin: '0 auto' }}>
          {/* Session picker / global search indicator */}
          <div style={{ marginBottom: '8px' }}>
            {isGlobalSearch ? (
              <SessionPicker current={sessionId} onChange={setSessionId} isGlobalSearch />
            ) : (
              <>
                <div className="hidden md:block">
                  <SessionPicker current={sessionId} onChange={setSessionId} />
                </div>
                <div className="md:hidden">
                  <SessionPicker current={sessionId} onChange={setSessionId} isMobile />
                </div>
              </>
            )}
          </div>

          {/* Search */}
          <div style={{ position: 'relative', marginBottom: '6px' }}>
            <input ref={searchRef} type="text" value={query} onChange={e => setQuery(e.target.value)}
              placeholder="搜尋全部 16 場逐字稿⋯（⌘K）"
              style={{
                width: '100%', padding: '10px 16px', fontSize: '14px',
                border: '1px solid rgba(0,0,0,0.08)', borderRadius: 12,
                outline: 'none', background: 'rgba(255,255,255,0.7)',
                backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
                fontFamily: 'var(--font-ui)', boxSizing: 'border-box',
              }}
            />
            {query && (
              <button onClick={() => setQuery('')} style={{
                position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', fontSize: '16px', cursor: 'pointer', color: 'var(--color-text-muted)',
              }}>✕</button>
            )}
          </div>

          {/* Filters */}
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
            {speakers.map(speaker => {
              const conf = SPEAKERS[speaker] || SPEAKERS['檢察官'];
              const active = speakerFilter.size === 0 || speakerFilter.has(speaker);
              return (
                <button key={speaker} onClick={() => toggleSpeaker(speaker)} style={{
                  fontSize: '12px', padding: '5px 14px', borderRadius: 20,
                  border: 'none',
                  background: active ? conf.bg : 'rgba(0,0,0,0.03)',
                  color: active ? conf.accent : 'var(--color-text-muted)',
                  cursor: 'pointer', fontWeight: active ? 600 : 400,
                  transition: 'all 0.2s', fontFamily: 'var(--font-ui)',
                  boxShadow: active ? `inset 0 0 0 1.5px ${conf.accent}40` : 'none',
                }}>
                  {speaker}
                </button>
              );
            })}

          </div>
        </div>
      </div>

      {/* Content */}
      <main style={{ maxWidth: 'var(--width-content)', margin: '0 auto', padding: '8px 24px 80px' }}>
        {loading && !isGlobalSearch ? (
          <div style={{ textAlign: 'center', padding: '80px 20px', color: 'var(--color-text-muted)' }}>載入中⋯</div>
        ) : filteredParaCount === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{ fontSize: '14px', marginBottom: '12px', color: 'var(--color-text-muted)' }}>找不到結果</div>
            <div style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>
              {isGlobalSearch ? `在 16 場辯論中找不到「${query}」` : `找不到符合條件的內容`}
            </div>
            <div style={{ fontSize: '12px', marginTop: '6px', color: 'var(--color-text-dim)' }}>
              試試其他關鍵字，例如：容積率、沈慶京、都委會、120284
            </div>
          </div>
        ) : (
          renderItems.map((item, i) => {
            if (item.type === 'section') {
              return <SectionHeader key={item.id} time={item.time} title={item.title} id={item.id} />;
            }
            if (item.type === 'session-divider') {
              return <SessionDivider key={`div-${item.session.id}`} session={item.session} resultCount={item.count} />;
            }
            return (
              <ParagraphCard
                key={item.paraKey}
                para={item.para}
                paraKey={item.paraKey}
                query={query}
                isExpanded={expandedItems.has(item.paraKey)}
                onToggle={toggleExpand}
                sessionId={item.sessionId || sessionId}
                showSessionBadge={isGlobalSearch}
              />
            );
          })
        )}
      </main>

      {/* Footer */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        background: 'linear-gradient(0deg, var(--color-bg) 0%, transparent 100%)',
        padding: '40px 24px 16px', pointerEvents: 'none',
      }}>
        <div style={{
          maxWidth: 'var(--width-content)', margin: '0 auto',
          textAlign: 'center', fontSize: '10px', color: 'var(--color-text-dim)', pointerEvents: 'auto',
        }}>
          以 Whisper 語音辨識自動產生，內容僅供參考，不代表正式法庭紀錄
        </div>
      </div>
    </div>
  );
}
