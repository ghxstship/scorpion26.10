import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { createClient } from '@/lib/supabase/server'

describe('Products API Integration Tests', () => {
  let authToken: string
  let tenantId: string
  let productId: string

  beforeAll(async () => {
    // Setup: Create test tenant and authenticate
    tenantId = 'test-tenant-id' // Replace with actual tenant creation
    
    // Login to get auth token
    const loginResponse = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@test.com',
        password: 'testpassword',
      }),
    })
    const loginData = await loginResponse.json()
    authToken = loginData.session.access_token
  })

  afterAll(async () => {
    // Cleanup: Delete test product
    if (productId) {
      const supabase = await createClient()
      await supabase.from('products').delete().eq('id', productId)
    }
  })

  describe('POST /api/products', () => {
    it('should create a new product', async () => {
      const response = await fetch('http://localhost:3000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          tenantId,
          title: 'Test Product',
          description: 'Test Description',
          type: 'digital',
          price: 99.99,
        }),
      })

      expect(response.status).toBe(201)
      const data = await response.json()
      expect(data.title).toBe('Test Product')
      productId = data.id
    })

    it('should reject invalid product type', async () => {
      const response = await fetch('http://localhost:3000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          tenantId,
          title: 'Test Product',
          type: 'invalid',
          price: 99.99,
        }),
      })

      expect(response.status).toBe(400)
    })

    it('should reject negative price', async () => {
      const response = await fetch('http://localhost:3000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          tenantId,
          title: 'Test Product',
          type: 'digital',
          price: -10,
        }),
      })

      expect(response.status).toBe(400)
    })
  })

  describe('GET /api/products', () => {
    it('should list all products for tenant', async () => {
      const response = await fetch(`http://localhost:3000/api/products?tenantId=${tenantId}`)

      expect(response.status).toBe(200)
      const data = await response.json()
      expect(Array.isArray(data)).toBe(true)
    })
  })

  describe('PUT /api/products/[id]', () => {
    it('should update product', async () => {
      const response = await fetch(`http://localhost:3000/api/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          title: 'Updated Product',
          price: 149.99,
        }),
      })

      expect(response.status).toBe(200)
      const data = await response.json()
      expect(data.title).toBe('Updated Product')
    })
  })

  describe('DELETE /api/products/[id]', () => {
    it('should soft delete product', async () => {
      const response = await fetch(`http://localhost:3000/api/products/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      })

      expect(response.status).toBe(200)
    })
  })
})
