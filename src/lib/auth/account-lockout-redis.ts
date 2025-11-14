/**
 * Redis-based Account Lockout for Production
 */

import { Redis } from '@upstash/redis'

const redis = process.env.UPSTASH_REDIS_REST_URL
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    })
  : null

const MAX_FAILED_ATTEMPTS = 5
const LOCKOUT_DURATION_MS = 15 * 60 * 1000
const ATTEMPT_WINDOW_MS = 15 * 60 * 1000

interface LoginAttempt {
  timestamp: number
  success: boolean
  ip?: string
}

export async function isAccountLockedRedis(email: string): Promise<{
  locked: boolean
  remainingTime?: number
  attempts?: number
}> {
  if (!redis) throw new Error('Redis not configured')

  const key = `lockout:${email.toLowerCase()}`
  const now = Date.now()
  const windowStart = now - ATTEMPT_WINDOW_MS

  // Get recent attempts
  const attempts = await redis.zrange(key, windowStart, now, { byScore: true })
  const failedAttempts = (attempts as string[]).filter((a: string) => {
    const attempt: LoginAttempt = JSON.parse(a)
    return !attempt.success
  })

  if (failedAttempts.length >= MAX_FAILED_ATTEMPTS) {
    const oldest: LoginAttempt = JSON.parse(failedAttempts[0] as string)
    const lockoutEnd = oldest.timestamp + LOCKOUT_DURATION_MS

    if (now < lockoutEnd) {
      return {
        locked: true,
        remainingTime: lockoutEnd - now,
        attempts: failedAttempts.length
      }
    }
  }

  return { locked: false, attempts: failedAttempts.length }
}

export async function recordLoginAttemptRedis(
  email: string,
  success: boolean,
  ip?: string
): Promise<void> {
  if (!redis) throw new Error('Redis not configured')

  const key = `lockout:${email.toLowerCase()}`
  const now = Date.now()
  const attempt: LoginAttempt = { timestamp: now, success, ip }

  await redis.zadd(key, { score: now, member: JSON.stringify(attempt) })
  await redis.expire(key, Math.ceil(ATTEMPT_WINDOW_MS / 1000))

  // Cleanup old attempts
  const windowStart = now - ATTEMPT_WINDOW_MS
  await redis.zremrangebyscore(key, 0, windowStart)
}

export async function clearLoginAttemptsRedis(email: string): Promise<void> {
  if (!redis) return
  await redis.del(`lockout:${email.toLowerCase()}`)
}

export async function getRemainingAttemptsRedis(email: string): Promise<number> {
  const lockStatus = await isAccountLockedRedis(email)
  if (lockStatus.locked) return 0
  return MAX_FAILED_ATTEMPTS - (lockStatus.attempts || 0)
}
