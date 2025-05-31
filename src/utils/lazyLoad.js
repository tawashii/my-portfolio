/**
 * @typedef {Object} IntersectionObserverOptions
 * @property {string} [rootMargin='50px 0px']
 * @property {number} [threshold=0.1]
 */

/**
 * 要素の遅延読み込みを実行するカスタムフック
 * @param {React.RefObject} elementRef - 監視対象の要素への参照
 * @param {IntersectionObserverOptions} [options] - Intersection Observerのオプション
 * @returns {boolean} - 要素が表示領域に入ったかどうか
 */
export function useLazyLoad(elementRef, options = {}) {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      {
        rootMargin: options.rootMargin || '50px 0px',
        threshold: options.threshold || 0.1
      }
    );

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [elementRef, options.rootMargin, options.threshold]);

  return isVisible;
}

/**
 * パフォーマンスメトリクスを収集する関数
 * @param {Object} metrics - 収集するメトリクス
 */
export function collectMetrics(metrics) {
  if (window.performance && window.performance.mark) {
    window.performance.mark('app-rendered');
    window.performance.measure('app-render-time', 'app-start', 'app-rendered');
    
    const renderTime = window.performance.getEntriesByName('app-render-time')[0].duration;
    metrics.renderTime = Math.round(renderTime);
  }

  // First Contentful Paint
  const paint = window.performance.getEntriesByType('paint');
  const fcp = paint.find(entry => entry.name === 'first-contentful-paint');
  if (fcp) {
    metrics.fcp = Math.round(fcp.startTime);
  }

  // Layout Shifts
  let cumulativeLayoutShiftScore = 0;
  new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
      if (!entry.hadRecentInput) {
        cumulativeLayoutShiftScore += entry.value;
      }
    }
    metrics.cls = cumulativeLayoutShiftScore;
  }).observe({ entryTypes: ['layout-shift'] });

  // Long Tasks
  new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
      metrics.longTasks = (metrics.longTasks || 0) + 1;
    }
  }).observe({ entryTypes: ['longtask'] });
}
