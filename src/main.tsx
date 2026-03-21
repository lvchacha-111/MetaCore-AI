import { useEffect } from 'react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { useThemeStore } from '@/store/themeStore'

function ThemeHandler() {
  const { theme } = useThemeStore()
  useEffect(() => {
    document.documentElement.className = theme
  }, [theme])
  return null
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeHandler />
    <App />
  </React.StrictMode>
)
