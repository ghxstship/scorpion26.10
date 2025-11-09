import { describe, it, expect } from 'vitest'
import { NextRequest } from 'next/server'
import {
  generateCSRFToken,
  validateCSRFToken,
  requireCSRFToken,
} from '@/lib/auth/csrf'

describe('CSRF Protection', () => {
  describe('generateCSRFToken', () => {
    it('should generate a token', () => {
      const token = generateCSRFToken()
      expect(token).toBeDefined()
      expect(typeof token).toBe('string')
      expect(token.length).toBeGreaterThan(0)
    })

    it('should generate unique tokens', () => {
      const token1 = generateCSRFToken()
      const token2 = generateCSRFToken()
      expect(token1).not.toBe(token2)
    })
  })

  describe('validateCSRFToken', () => {
    it('should allow GET requests without token', () => {
      const request = new NextRequest('http://localhost:3000/api/test', {
        method: 'GET'
      })
      const result = validateCSRFToken(request)
      expect(result).toBe(true)
    })

    it('should allow HEAD requests without token', () => {
      const request = new NextRequest('http://localhost:3000/api/test', {
        method: 'HEAD'
      })
      const result = validateCSRFToken(request)
      expect(result).toBe(true)
    })

    it('should allow OPTIONS requests without token', () => {
      const request = new NextRequest('http://localhost:3000/api/test', {
        method: 'OPTIONS'
      })
      const result = validateCSRFToken(request)
      expect(result).toBe(true)
    })

    it('should reject POST without token', () => {
      const request = new NextRequest('http://localhost:3000/api/test', {
        method: 'POST'
      })
      const result = validateCSRFToken(request)
      expect(result).toBe(false)
    })

    it('should validate matching tokens', () => {
      const token = 'test-token-123'
      const request = new NextRequest('http://localhost:3000/api/test', {
        method: 'POST',
        headers: {
          'x-csrf-token': token,
          'Cookie': `csrf-token=${token}`
        }
      })
      const result = validateCSRFToken(request)
      expect(result).toBe(true)
    })

    it('should reject mismatched tokens', () => {
      const request = new NextRequest('http://localhost:3000/api/test', {
        method: 'POST',
        headers: {
          'x-csrf-token': 'token1',
          'Cookie': 'csrf-token=token2'
        }
      })
      const result = validateCSRFToken(request)
      expect(result).toBe(false)
    })
  })

  describe('requireCSRFToken', () => {
    it('should return valid for GET requests', () => {
      const request = new NextRequest('http://localhost:3000/api/test', {
        method: 'GET'
      })
      const result = requireCSRFToken(request)
      expect(result.valid).toBe(true)
      expect(result.error).toBeUndefined()
    })

    it('should return invalid for POST without token', () => {
      const request = new NextRequest('http://localhost:3000/api/test', {
        method: 'POST'
      })
      const result = requireCSRFToken(request)
      expect(result.valid).toBe(false)
      expect(result.error).toBeDefined()
    })
  })
})
