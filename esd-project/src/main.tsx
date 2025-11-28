import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ThemeModeProvider from './theme/ThemeModeProvider'
import ToastProvider from './components/common/ToastProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeModeProvider singleTheme={true}>
      <ToastProvider>
        <App />
      </ToastProvider>
    </ThemeModeProvider>
  </StrictMode>,
)
