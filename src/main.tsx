import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { LanguageProvider } from './i18n/LanguageContext'
import { PortfolioProvider } from './portfolio/PortfolioContext'
import './styles/globals.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PortfolioProvider>
      <LanguageProvider>
        <BrowserRouter basename="/personal_page">
          <App />
        </BrowserRouter>
      </LanguageProvider>
    </PortfolioProvider>
  </StrictMode>,
)
