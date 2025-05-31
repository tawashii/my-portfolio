import React from 'react'
import ReactDOM from 'react-dom/client'
import { measureWebVitals } from './utils/performance-metrics'
import './index.css'

// Register performance metrics
if ('performance' in window && 'measure' in window.performance) {
  window.performance.mark('app-start')
}

// Measure Web Vitals
measureWebVitals()

// Lazy load App component
const App = React.lazy(() => import('./App.jsx'))

// Preload critical components
const preloadComponents = () => {
  import('./components/About.jsx')
  import('./components/Header.jsx')
}

// Start preloading after initial render
window.requestIdleCallback?.(preloadComponents) ?? setTimeout(preloadComponents, 1000)

// Initialize axe-core in development
if (import.meta.env.DEV) {
  import('axe-core').then(async (axe) => {
    await import('@axe-core/react').then(({ default: axeReact }) => {
      axeReact(React, ReactDOM, 1000)
    })
  })
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <React.Suspense fallback={
      <div className="loading" aria-label="読み込み中">
        Loading...
      </div>
    }>
      <App />
    </React.Suspense>
  </React.StrictMode>,
)

// Report Core Web Vitals
if ('web-vitals' in window) {
  import('web-vitals').then(({ getCLS, getFID, getLCP }) => {
    getCLS(console.log)
    getFID(console.log)
    getLCP(console.log)
  })
}
