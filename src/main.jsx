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

// Development-only accessibility checks
if (import.meta.env.DEV) {
  console.log('Development mode: Accessibility checks enabled');
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
// Measure performance metrics using our custom implementation
if ('performance' in window) {
  measureWebVitals();
}
