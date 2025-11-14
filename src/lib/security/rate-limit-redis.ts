/**
 * Redis-based Rate Limiting for Production
 * Use this instead of in-memory rate limiting for multi-instance deployments
 */

import { Redis } from '@upstash/redis'

const redis = process.env.UPSTASH_REDIS_REST_URL
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    })
  : null

interface RateLimitConfig {
  interval: number
  uniqueTokenPerInterval: number
}

interface RateLimitResult {
  success: boolean
  limit: number
  remaining: number
  reset: number
}

export class RedisRateLimiter {
  private config: RateLimitConfig
  private prefix: string

  constructor(config: RateLimitConfig, prefix = 'ratelimit') {
    this.config = config
    this.prefix = prefix
  }

  async check(identifier: string): Promise<RateLimitResult> {
    if (!redis) {
      throw new Error('Redis not configured')
    }

    const key = `${this.prefix}:${identifier}`
    const now = Date.now()
    const windowStart = now - this.config.interval

    // Remove old entries and count current
    await redis.zremrangebyscore(key, 0, windowStart)
    const count = await redis.zcard(key)

    const remaining = Math.max(0, this.config.uniqueTokenPerInterval - count)
    const success = count < this.config.uniqueTokenPerInterval

    if (success) {
      await redis.zadd(key, { score: now, member: `${now}:${Math.random()}` })
      await redis.expire(key, Math.ceil(this.config.interval / 1000))
    }

    // Get oldest timestamp for reset calculation
    const oldest = await redis.zrange(key, 0, 0, { withScores: true })
    const oldestTimestamp = oldest.length > 0 ? (oldest[0] as { score: number }).score : now
    const reset = oldestTimestamp + this.config.interval

    return {
      success,
      limit: this.config.uniqueTokenPerInterval,
      remaining,
      reset,
    }
  }

  async clear(identifier: string): Promise<void> {
    if (!redis) return
    await redis.del(`${this.prefix}:${identifier}`)
  }
}

// Export configured limiters
export const redisRateLimiters = {
  auth: new RedisRateLimiter({ interval: 15 * 60 * 1000, uniqueTokenPerInterval: 5 }, 'rl:auth'),
  api: new RedisRateLimiter({ interval: 60 * 1000, uniqueTokenPerInterval: 60 }, 'rl:api'),
  upload: new RedisRateLimiter({ interval: 60 * 60 * 1000, uniqueTokenPerInterval: 20 }, 'rl:upload'),
}
