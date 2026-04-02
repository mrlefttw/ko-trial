import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div style={{ maxWidth: 640, margin: '0 auto', padding: '40px 20px' }}>
      <h1 style={{ fontSize: 28, fontWeight: 800, color: '#1a1a2e', margin: '0 0 32px', textAlign: 'center' }}>
        關於這個專案
      </h1>

      <Section title="為什麼做這個？">
        <p>
          2024 年底，柯文哲京華城案在台北地院進行了長達 16 場的言詞辯論。
          這些法庭辯論的影片都公開在臺北地院刑事科的 YouTube 頻道上，但加起來超過 43 小時。
        </p>
        <p>
          我們認為，司法透明不應該只是「資料公開」，而是要讓一般人真的看得懂。
          所以幾個時代力量的黨工在下班後，決定用 AI 技術把這 43 小時的法庭錄影，
          轉成逐字稿、整理成摘要、提煉出爭點，做成這個懶人包網站。
        </p>
      </Section>

      <Section title="我們的立場">
        <p>
          我們不是要定誰的罪，也不是要替誰辯護。
        </p>
        <p>
          這個網站的目的是讓你能用最短的時間，客觀了解法庭上雙方到底在說什麼。
          每個爭點都同時呈現檢方和辯方的立場，判決結果也忠實呈現法院的認定。
        </p>
        <p>
          相信閱讀完這些內容後，你會有自己的判斷。
        </p>
      </Section>

      <Section title="資料來源與技術">
        <ul style={{ paddingLeft: 20 }}>
          <li>影片來源：<a href="https://www.youtube.com/@%E8%87%BA%E5%8C%97%E5%9C%B0%E9%99%A2%E5%88%91%E4%BA%8B%E7%A7%91" target="_blank" rel="noopener" style={linkStyle}>臺北地院刑事科 YouTube 頻道</a></li>
          <li>語音轉錄：Groq Whisper large-v3-turbo</li>
          <li>逐字稿校正：AI 人名校正 + 人工抽驗</li>
          <li>摘要與爭點：AI 整理，編輯審閱</li>
          <li>網站框架：React + Vite + Tailwind CSS</li>
        </ul>
      </Section>

      <Section title="免責聲明">
        <p>
          逐字稿由 AI 自動轉錄並經人名校正，可能仍有錯誤。
          摘要和爭點整理由 AI 協助產出，經人工審閱但不保證完全準確。
          如需引用，請以法院公告之判決書全文為準。
        </p>
        <p>
          本案為一審判決，全案可上訴。
        </p>
      </Section>

      <div style={{ textAlign: 'center', marginTop: 40 }}>
        <Link to="/" style={{
          display: 'inline-block', padding: '12px 28px', borderRadius: 24,
          background: '#1a1a2e', color: '#fff', textDecoration: 'none',
          fontSize: 15, fontWeight: 600,
        }}>
          回首頁
        </Link>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section style={{ marginBottom: 32 }}>
      <h2 style={{ fontSize: 20, fontWeight: 700, color: '#1a1a2e', margin: '0 0 12px' }}>
        {title}
      </h2>
      <div style={{ fontSize: 15, color: '#444', lineHeight: 1.8 }}>
        {children}
      </div>
    </section>
  );
}

const linkStyle = { color: '#4c6ef5', textDecoration: 'none' };
