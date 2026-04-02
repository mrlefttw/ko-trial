/**
 * 設計設定檔 — 改這裡調整配色、發言者標記、場次資訊
 */

// 發言者設定
export const SPEAKERS = {
  審判長: { icon: '', accent: 'var(--color-judge)',    bg: 'var(--color-judge-bg)' },
  檢察官: { icon: '', accent: 'var(--color-prosecutor)', bg: 'var(--color-prosecutor-bg)' },
  辯護人: { icon: '', accent: 'var(--color-defense)',  bg: 'var(--color-defense-bg)' },
  被告:   { icon: '', accent: 'var(--color-defendant)', bg: 'var(--color-defendant-bg)' },
};

// YouTube 影片 ID 對照（點時間戳可跳到影片）
const YT = {
  '12-15-am': 'CXKiBIamLC4',
  '12-15-pm': '0KeURwJSR_Q',
  '12-16-am': '9JyOZ5CWGz4',
  '12-16-pm': 'IB49wmaJWtw',
  '12-17-am': 'NDpqyQ8TlV0',
  '12-17-pm': 'sO8SNz7mXis',
  '12-18-am': 'X9M3axM1LIU',
  '12-18-pm': 'Q2uHOiwtENo',
  '12-19-am': 'NfrdKX5NBQc',
  '12-19-pm': '7SD1Ue5QAiE',
  '12-22-am': 'DS56afN36A8',
  '12-22-pm': 'JaMUi1QUmbg',
  '12-23-pm': 'xV6hqj2Ybds',
  '12-24-am': 'koSUntQfpmY',
  '12-24-pm': 'HXqeVOdrDrs',
  '0326-pm':  '1NXVGenL8J8',
};

// 場次清單
export const SESSIONS = [
  { id: '12-15-am', date: '12/15', ampm: '上午', label: '12/15 上午', desc: '檢察官論告（圖利罪）', speaker: '檢察官' },
  { id: '12-15-pm', date: '12/15', ampm: '下午', label: '12/15 下午', desc: '檢察官論告（收賄罪）', speaker: '檢察官' },
  { id: '12-16-am', date: '12/16', ampm: '上午', label: '12/16 上午', desc: '檢察官論告（應曉薇）', speaker: '檢察官' },
  { id: '12-16-pm', date: '12/16', ampm: '下午', label: '12/16 下午', desc: '檢察官論告續行', speaker: '檢察官' },
  { id: '12-17-am', date: '12/17', ampm: '上午', label: '12/17 上午', desc: '柯文哲辯護人辯論', speaker: '辯護人' },
  { id: '12-17-pm', date: '12/17', ampm: '下午', label: '12/17 下午', desc: '沈慶京辯護人辯論', speaker: '辯護人' },
  { id: '12-18-am', date: '12/18', ampm: '上午', label: '12/18 上午', desc: '辯護人辯論續行', speaker: '辯護人' },
  { id: '12-18-pm', date: '12/18', ampm: '下午', label: '12/18 下午', desc: '辯護人辯論續行', speaker: '辯護人' },
  { id: '12-19-am', date: '12/19', ampm: '上午', label: '12/19 上午', desc: '檢察官論告（彭振聲等）', speaker: '檢察官' },
  { id: '12-19-pm', date: '12/19', ampm: '下午', label: '12/19 下午', desc: '辯護人辯論', speaker: '辯護人' },
  { id: '12-22-am', date: '12/22', ampm: '上午', label: '12/22 上午', desc: '檢察官論告（李文宗等）', speaker: '檢察官' },
  { id: '12-22-pm', date: '12/22', ampm: '下午', label: '12/22 下午', desc: '檢察官答辯', speaker: '檢察官' },
  { id: '12-23-pm', date: '12/23', ampm: '下午', label: '12/23 下午', desc: '柯文哲最後陳述', speaker: '被告' },
  { id: '12-24-am', date: '12/24', ampm: '上午', label: '12/24 上午', desc: '應曉薇陳述 + 辯護', speaker: '被告' },
  { id: '12-24-pm', date: '12/24', ampm: '下午', label: '12/24 下午', desc: '檢察官最後答辯', speaker: '檢察官' },
  { id: '0326-pm',  date: '03/26', ampm: '下午', label: '03/26 宣判', desc: '一審宣判', speaker: '審判長' },
];

// 取得 YouTube 連結（帶時間戳）
export function youtubeUrl(sessionId, startSec) {
  const vid = YT[sessionId];
  if (!vid) return null;
  return `https://www.youtube.com/watch?v=${vid}&t=${startSec}s`;
}
