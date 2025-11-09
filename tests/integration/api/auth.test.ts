import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { createClient } from '@/lib/supabase/server'

describe('Auth API Integration Tests', () => {
  let testEmail: string
  let testPassword: string
  let userId: string

  beforeAll(() => {
    testEmail = `test-${Date.now()}@example.com`
    testPassword = 'TestPassword123!'
  })

  afterAll(async () => {
    // Cleanup: Delete test user
    if (userId) {
      const supabase = await createClient()
      await supabase.from('users').delete().eq('id', userId)
    }
  })

  describe('POST /api/auth/signup', () => {
    it('should create a new user account', async () => {
      const response = await fetch('http://localhost:3000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: testEmail,
          password: testPassword,
          fullName: 'Test User',
        }),
      })

      expect(response.status).toBe(200)
      const data = await response.json()
      expect(data.user).toBeDefined()
      expect(data.user.email).toBe(testEmail)
      userId = data.user.id
    })

    it('should reject duplicate email', async () => {
      const response = await fetch('http://localhost:3000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: testEmail,
          password: testPassword,
          fullName: 'Test User',
        }),
      })

      expect(response.status).toBe(400)
    })

    it('should reject weak password', async () => {
      const response = await fetch('http://localhost:3000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'new@example.com',
          password: 'weak',
          fullName: 'Test User',
        }),
      })

      expect(response.status).toBe(400)
    })
  })

  describe('POST /api/auth/login', () => {
    it('should login with valid credentials', async () => {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: testEmail,
          password: testPassword,
        }),
      })

      expect(response.status).toBe(200)
      const data = await response.json()
      expect(data.session).toBeDefined()
      expect(data.user).toBeDefined()
    })

    it('should reject invalid credentials', async () => {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: testEmail,
          password: 'wrongpassword',
        }),
      })

      expect(response.status).toBe(400)
    })
  })

  describe('POST /api/auth/logout', () => {
    it('should logout successfully', async () => {
      const response = await fetch('http://localhost:3000/api/auth/logout', {
        method: 'POST',
      })

      expect(response.status).toBe(200)
      const data = await response.json()
      expect(data.success).toBe(true)
    })
  })
})
