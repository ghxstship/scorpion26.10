/**
 * Sentry Error Tracking and Monitoring Configuration
 * Provides centralized error tracking, performance monitoring, and alerting
 */

interface SentryConfig {
  dsn: string
  environment: string
  tracesSampleRate: number
  enabled: boolean
}

interface ErrorContext {
  user?: {
    id: string
    email?: string
    role?: string
  }
  tags?: Record<string, string>
  extra?: Record<string, unknown>
}

class ErrorTracker {
  private config: SentryConfig
  private initialized = false

  constructor() {
    this.config = {
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN || '',
      environment: process.env.NODE_ENV || 'development',
      tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
      enabled: !!process.env.NEXT_PUBLIC_SENTRY_DSN && process.env.NODE_ENV !== 'test',
    }
  }

  /**
   * Initialize error tracking
   * Call this once at app startup
   */
  init(): void {
    if (this.initialized || !this.config.enabled) {
      return
    }

    // Note: In production, you would initialize Sentry here:
    // import * as Sentry from '@sentry/nextjs'
    // Sentry.init({
    //   dsn: this.config.dsn,
    //   environment: this.config.environment,
    //   tracesSampleRate: this.config.tracesSampleRate,
    //   beforeSend(event) {
    //     // Filter sensitive data
    //     return event
    //   },
    // })

    this.initialized = true
    console.log('[ErrorTracker] Initialized in', this.config.environment)
  }

  /**
   * Capture an error with context
   */
  captureError(error: Error, context?: ErrorContext): void {
    if (!this.config.enabled) {
      console.error('[ErrorTracker]', error, context)
      return
    }

    // In production with Sentry:
    // Sentry.captureException(error, {
    //   user: context?.user,
    //   tags: context?.tags,
    //   extra: context?.extra,
    // })

    // Fallback logging
    console.error('[ErrorTracker] Error:', error.message, context)
  }

  /**
   * Capture a message (non-error event)
   */
  captureMessage(message: string, level: 'info' | 'warning' | 'error' = 'info', context?: ErrorContext): void {
    if (!this.config.enabled) {
      console.log(`[ErrorTracker] ${level.toUpperCase()}:`, message, context)
      return
    }

    // In production with Sentry:
    // Sentry.captureMessage(message, {
    //   level,
    //   user: context?.user,
    //   tags: context?.tags,
    //   extra: context?.extra,
    // })

    console.log(`[ErrorTracker] ${level.toUpperCase()}:`, message, context)
  }

  /**
   * Set user context for error tracking
   */
  setUser(user: { id: string; email?: string; role?: string } | null): void {
    if (!this.config.enabled) return

    // In production with Sentry:
    // Sentry.setUser(user)

    console.log('[ErrorTracker] User context set:', user?.id)
  }

  /**
   * Add breadcrumb for debugging
   */
  addBreadcrumb(message: string, category: string, data?: Record<string, unknown>): void {
    if (!this.config.enabled) return

    // In production with Sentry:
    // Sentry.addBreadcrumb({
    //   message,
    //   category,
    //   data,
    //   timestamp: Date.now() / 1000,
    // })

    console.log('[ErrorTracker] Breadcrumb:', category, message, data)
  }

  /**
   * Start a performance transaction
   */
  startTransaction(name: string, op: string): PerformanceTransaction {
    return new PerformanceTransaction(name, op, this.config.enabled)
  }
}

/**
 * Performance transaction for monitoring
 */
class PerformanceTransaction {
  private startTime: number
  private name: string
  private op: string
  private enabled: boolean

  constructor(name: string, op: string, enabled: boolean) {
    this.name = name
    this.op = op
    this.enabled = enabled
    this.startTime = Date.now()
  }

  /**
   * Finish the transaction
   */
  finish(): void {
    if (!this.enabled) return

    const duration = Date.now() - this.startTime
    
    // In production with Sentry:
    // transaction.finish()

    console.log(`[Performance] ${this.op} - ${this.name}: ${duration}ms`)
  }

  /**
   * Set transaction status
   */
  setStatus(status: 'ok' | 'error' | 'cancelled'): void {
    if (!this.enabled) return

    // In production with Sentry:
    // transaction.setStatus(status)

    console.log(`[Performance] ${this.name} status: ${status}`)
  }
}

// Export singleton instance
export const errorTracker = new ErrorTracker()

/**
 * Helper to wrap async functions with error tracking
 */
export function withErrorTracking<T extends (...args: unknown[]) => Promise<unknown>>(
  fn: T,
  context?: ErrorContext
): T {
  return (async (...args: unknown[]) => {
    try {
      return await fn(...args)
    } catch (error) {
      if (error instanceof Error) {
        errorTracker.captureError(error, context)
      }
      throw error
    }
  }) as T
}

/**
 * Helper to track API route errors
 */
export function trackAPIError(error: unknown, route: string, userId?: string): void {
  const errorObj = error instanceof Error ? error : new Error(String(error))
  
  errorTracker.captureError(errorObj, {
    tags: {
      route,
      type: 'api_error',
    },
    user: userId ? { id: userId } : undefined,
    extra: {
      timestamp: new Date().toISOString(),
    },
  })
}

/**
 * Helper to track authentication errors
 */
export function trackAuthError(error: Error, action: string): void {
  errorTracker.captureError(error, {
    tags: {
      type: 'auth_error',
      action,
    },
  })
}

/**
 * Helper to track payment errors
 */
export function trackPaymentError(error: Error, orderId?: string, userId?: string): void {
  errorTracker.captureError(error, {
    tags: {
      type: 'payment_error',
    },
    user: userId ? { id: userId } : undefined,
    extra: {
      orderId,
    },
  })
}

/**
 * Helper to track file upload errors
 */
export function trackFileUploadError(error: Error, fileName: string, fileSize: number): void {
  errorTracker.captureError(error, {
    tags: {
      type: 'file_upload_error',
    },
    extra: {
      fileName,
      fileSize,
    },
  })
}
