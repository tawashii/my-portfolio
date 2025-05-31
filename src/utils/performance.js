import { getCLS, getFID, getLCP } from 'web-vitals'

export function reportWebVitals(onPerfEntry) {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    getCLS(onPerfEntry)
    getFID(onPerfEntry)
    getLCP(onPerfEntry)
  }
}

export function logPerformanceMetrics() {
  performance.mark('app-start')

  window.addEventListener('load', () => {
    performance.mark('app-load')
    performance.measure('app-startup', 'app-start', 'app-load')

    const startupTime = performance.getEntriesByName('app-startup')[0].duration
    console.log(`App startup time: ${Math.round(startupTime)}ms`)
  })

  reportWebVitals(({ name, value }) => {
    console.log(`${name}: ${Math.round(value)}ms`)
  })
}
