/**
 * Rate Limiting Implementation
 * Protects API endpoints from abuse and DDoS attacks
 */

interface RateLimitConfig {
  interval: number // Time window in milliseconds
  uniqueTokenPerInterval: number // Max requests per interval
}

interface RateLimitResult {
  success: boolean
  limit: number
  remaining: number
  reset: number
}

/**
 * In-memory rate limiter (for development/single instance)
 * In production, use Redis or similar distributed cache
 */
class RateLimiter {
  private requests: Map<string, number[]> = new Map()
  private config: RateLimitConfig

  constructor(config: RateLimitConfig) {
    this.config = config
  }

  /**
   * Check if request is allowed
   */
  check(identifier: string): RateLimitResult {
    const now = Date.now()
    const windowStart = now - this.config.interval

    // Get existing requests for this identifier
    let timestamps = this.requests.get(identifier) || []

    // Filter out old requests outside the window
    timestamps = timestamps.filter(time => time > windowStart)

    // Check if limit exceeded
    const remaining = Math.max(0, this.config.uniqueTokenPerInterval - timestamps.length)
    const success = timestamps.length < this.config.uniqueTokenPerInterval

    if (success) {
      // Add current request
      timestamps.push(now)
      this.requests.set(identifier, timestamps)
    }

    // Calculate reset time
    const oldestTimestamp = timestamps[0] || now
    const reset = oldestTimestamp + this.config.interval

    return {
      success,
      limit: this.config.uniqueTokenPerInterval,
      remaining,
      reset,
    }
  }

  /**
   * Clear rate limit for identifier
   */
  clear(identifier: string): void {
    this.requests.delete(identifier)
  }

  /**
   * Clean up old entries (call periodically)
   */
  cleanup(): void {
    const now = Date.now()
    const windowStart = now - this.config.interval

    for (const [identifier, timestamps] of this.requests.entries()) {
      const validTimestamps = timestamps.filter(time => time > windowStart)
      
      if (validTimestamps.length === 0) {
        this.requests.delete(identifier)
      } else {
        this.requests.set(identifier, validTimestamps)
      }
    }
  }
}

/**
 * Rate limit configurations for different endpoint types
 */
export const RATE_LIMITS = {
  // Authentication endpoints - stricter limits
  auth: {
    interval: 15 * 60 * 1000, // 15 minutes
    uniqueTokenPerInterval: 5, // 5 attempts per 15 minutes
  },
  
  // API endpoints - moderate limits
  api: {
    interval: 60 * 1000, // 1 minute
    uniqueTokenPerInterval: 60, // 60 requests per minute
  },
  
  // Public endpoints - generous limits
  public: {
    interval: 60 * 1000, // 1 minute
    uniqueTokenPerInterval: 120, // 120 requests per minute
  },
  
  // File upload - strict limits
  upload: {
    interval: 60 * 60 * 1000, // 1 hour
    uniqueTokenPerInterval: 20, // 20 uploads per hour
  },
  
  // Email sending - very strict limits
  email: {
    interval: 60 * 60 * 1000, // 1 hour
    uniqueTokenPerInterval: 10, // 10 emails per hour
  },
} as const

// Create rate limiter instances
const rateLimiters = {
  auth: new RateLimiter(RATE_LIMITS.auth),
  api: new RateLimiter(RATE_LIMITS.api),
  public: new RateLimiter(RATE_LIMITS.public),
  upload: new RateLimiter(RATE_LIMITS.upload),
  email: new RateLimiter(RATE_LIMITS.email),
}

/**
 * Get client identifier from request
 */
export function getClientIdentifier(request: Request): string {
  // Try to get user ID from auth (if available)
  // const userId = getUserIdFromRequest(request)
  // if (userId) return `user:${userId}`

  // Fall back to IP address
  const forwarded = request.headers.get('x-forwarded-for')
  const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown'
  
  return `ip:${ip}`
}

/**
 * Check rate limit for request
 */
export function checkRateLimit(
  request: Request,
  type: keyof typeof RATE_LIMITS = 'api'
): RateLimitResult {
  const identifier = getClientIdentifier(request)
  const limiter = rateLimiters[type]
  
  return limiter.check(identifier)
}

/**
 * Rate limit middleware for API routes
 */
export async function rateLimit(
  request: Request,
  type: keyof typeof RATE_LIMITS = 'api'
): Promise<Response | null> {
  const result = checkRateLimit(request, type)

  if (!result.success) {
    const retryAfter = Math.ceil((result.reset - Date.now()) / 1000)
    
    return new Response(
      JSON.stringify({
        error: 'Too many requests',
        message: 'Rate limit exceeded. Please try again later.',
        retryAfter,
      }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'X-RateLimit-Limit': result.limit.toString(),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': result.reset.toString(),
          'Retry-After': retryAfter.toString(),
        },
      }
    )
  }

  return null
}

/**
 * Helper to wrap API route with rate limiting
 */
export function withRateLimit<T extends (request: Request, ...args: unknown[]) => Promise<Response>>(
  handler: T,
  type: keyof typeof RATE_LIMITS = 'api'
): T {
  return (async (request: Request, ...args: unknown[]) => {
    const rateLimitResponse = await rateLimit(request, type)
    if (rateLimitResponse) {
      return rateLimitResponse
    }

    return handler(request, ...args)
  }) as T
}

/**
 * Clear rate limit for identifier
 */
export function clearRateLimit(identifier: string, type: keyof typeof RATE_LIMITS = 'api'): void {
  rateLimiters[type].clear(identifier)
}

/**
 * Cleanup old rate limit entries
 * Call this periodically (e.g., every 5 minutes)
 */
export function cleanupRateLimits(): void {
  Object.values(rateLimiters).forEach(limiter => limiter.cleanup())
}

// Auto-cleanup every 5 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(cleanupRateLimits, 5 * 60 * 1000)
}
