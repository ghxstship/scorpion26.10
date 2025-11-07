// Performance monitoring utilities
import type { WebVitalsMetric } from '@/types/database'

export function measurePerformance(metricName: string, callback: () => void) {
  if (typeof window === 'undefined') return

  const startTime = performance.now()
  callback()
  const endTime = performance.now()
  const duration = endTime - startTime

  console.log(`[Performance] ${metricName}: ${duration.toFixed(2)}ms`)

  // Send to analytics
  if (window.gtag) {
    window.gtag('event', 'timing_complete', {
      name: metricName,
      value: Math.round(duration),
      event_category: 'Performance',
    } as Record<string, unknown>)
  }
}

export async function measureAsync<T>(
  metricName: string,
  callback: () => Promise<T>
): Promise<T> {
  if (typeof window === 'undefined') return callback()

  const startTime = performance.now()
  const result = await callback()
  const endTime = performance.now()
  const duration = endTime - startTime

  console.log(`[Performance] ${metricName}: ${duration.toFixed(2)}ms`)

  if (window.gtag) {
    window.gtag('event', 'timing_complete', {
      name: metricName,
      value: Math.round(duration),
      event_category: 'Performance',
    })
  }

  return result
}

// Web Vitals
export function reportWebVitals(metric: WebVitalsMetric) {
  console.log(metric)

  // Send to analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metric.name, {
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      event_label: metric.id,
      non_interaction: true,
    })
  }
}

// Image loading optimization
export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve()
    img.onerror = reject
    img.src = src
  })
}

export function preloadImages(srcs: string[]): Promise<void[]> {
  return Promise.all(srcs.map(preloadImage))
}

// Lazy loading helper
export function lazyLoad<T extends React.ComponentType<unknown>>(
  importFn: () => Promise<{ default: T }>
): React.LazyExoticComponent<T> {
  if (typeof window === 'undefined') {
    // Server-side: return a component that renders nothing
    const EmptyComponent = (() => null) as unknown as T
    return EmptyComponent as React.LazyExoticComponent<T>
  }

  // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports
  const React = require('react')
  return React.lazy(importFn)
}

// Resource hints
export function addPreconnect(url: string) {
  if (typeof document === 'undefined') return

  const link = document.createElement('link')
  link.rel = 'preconnect'
  link.href = url
  document.head.appendChild(link)
}

export function addPrefetch(url: string) {
  if (typeof document === 'undefined') return

  const link = document.createElement('link')
  link.rel = 'prefetch'
  link.href = url
  document.head.appendChild(link)
}

// Bundle size tracking
export function trackBundleSize(bundleName: string, size: number) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'bundle_size', {
      bundle_name: bundleName,
      size_kb: Math.round(size / 1024),
      event_category: 'Performance',
    })
  }
}
