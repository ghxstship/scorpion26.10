import { describe, it, expect, beforeEach, vi } from 'vitest'
import { NextRequest } from 'next/server'

describe('Rate Limiting Middleware', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('rateLimit', () => {
    it('should allow requests within limit', async () => {
      const { rateLimit } = await import('@/middleware/rate-limit')
      const limiter = rateLimit({ windowMs: 60000, maxRequests: 5 })
      
      const request = new NextRequest('http://localhost:3000/api/test', {
        headers: { 'x-forwarded-for': '127.0.0.1' }
      })
      
      const result = await limiter(request)
      expect(result).toBeNull()
    })

    it('should block requests exceeding limit', async () => {
      const { rateLimit } = await import('@/middleware/rate-limit')
      const limiter = rateLimit({ windowMs: 60000, maxRequests: 2 })
      
      const request = new NextRequest('http://localhost:3000/api/test', {
        headers: { 'x-forwarded-for': '127.0.0.1' }
      })
      
      // Make requests up to limit
      await limiter(request)
      await limiter(request)
      
      // This should be blocked
      const result = await limiter(request)
      expect(result).not.toBeNull()
      expect(result?.status).toBe(429)
    })

    it('should reset after time window', async () => {
      const { rateLimit } = await import('@/middleware/rate-limit')
      const limiter = rateLimit({ windowMs: 100, maxRequests: 2 })
      
      const request = new NextRequest('http://localhost:3000/api/test', {
        headers: { 'x-forwarded-for': '127.0.0.2' }
      })
      
      // Use up limit
      await limiter(request)
      await limiter(request)
      
      // Wait for window to expire
      await new Promise(resolve => setTimeout(resolve, 150))
      
      // Should be allowed again
      const result = await limiter(request)
      expect(result).toBeNull()
    })

    it('should track different IPs separately', async () => {
      const { rateLimit } = await import('@/middleware/rate-limit')
      const limiter = rateLimit({ windowMs: 60000, maxRequests: 1 })
      
      const request1 = new NextRequest('http://localhost:3000/api/test', {
        headers: { 'x-forwarded-for': '10.0.0.1' }
      })
      const request2 = new NextRequest('http://localhost:3000/api/test', {
        headers: { 'x-forwarded-for': '10.0.0.2' }
      })
      
      // Both should be allowed (different IPs)
      const result1 = await limiter(request1)
      const result2 = await limiter(request2)
      
      expect(result1).toBeNull()
      expect(result2).toBeNull()
    })
  })
})
