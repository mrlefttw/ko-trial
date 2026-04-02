import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import './index.css'
import Site from './Site.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <Site />
    </HashRouter>
    <Analytics />
  </StrictMode>,
)
