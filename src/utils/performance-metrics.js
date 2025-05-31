// Web Vitalsの測定と報告
export function measureWebVitals() {
  // Largest Contentful Paint
  new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries();
    const lastEntry = entries[entries.length - 1];
    console.log('LCP:', lastEntry.startTime);
  }).observe({ type: 'largest-contentful-paint', buffered: true });

  // First Input Delay
  new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries();
    entries.forEach(entry => {
      const delay = entry.processingStart - entry.startTime;
      console.log('FID:', delay);
    });
  }).observe({ type: 'first-input', buffered: true });

  // Cumulative Layout Shift
  let cumulativeLayoutShift = 0;
  new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
      if (!entry.hadRecentInput) {
        cumulativeLayoutShift += entry.value;
        console.log('Current CLS:', cumulativeLayoutShift);
      }
    }
  }).observe({ type: 'layout-shift', buffered: true });
}

// リソースのプリフェッチ
export function prefetchResources(resources) {
  resources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = resource;
    document.head.appendChild(link);
  });
}

// パフォーマンスマーク
export function markPerformance(markName) {
  if (performance.mark) {
    performance.mark(markName);
  }
}

// パフォーマンス計測
export function measurePerformance(measureName, startMark, endMark) {
  if (performance.measure) {
    performance.measure(measureName, startMark, endMark);
    const measurements = performance.getEntriesByName(measureName);
    return measurements[measurements.length - 1].duration;
  }
  return null;
}

// レイアウトスラッシング防止
let scheduledAnimationFrame = false;

export function scheduleUpdate(callback) {
  if (!scheduledAnimationFrame) {
    scheduledAnimationFrame = true;
    requestAnimationFrame(() => {
      callback();
      scheduledAnimationFrame = false;
    });
  }
}
