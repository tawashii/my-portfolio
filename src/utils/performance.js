// import { getCLS, getFID, getLCP } from 'web-vitals'

// Web Vitalsメトリクスの測定（自前実装）
export function measureCLS() {
  let cumulativeLayoutShift = 0;
  new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
      if (!entry.hadRecentInput) {
        cumulativeLayoutShift += entry.value;
      }
    }
  }).observe({ type: 'layout-shift', buffered: true });
  return cumulativeLayoutShift;
}

export function measureFID() {
  new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries();
    entries.forEach(entry => {
      const delay = entry.processingStart - entry.startTime;
      console.log('FID:', delay);
    });
  }).observe({ type: 'first-input', buffered: true });
}

export function measureLCP() {
  new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries();
    const lastEntry = entries[entries.length - 1];
    console.log('LCP:', lastEntry.startTime);
  }).observe({ type: 'largest-contentful-paint', buffered: true });
}

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
