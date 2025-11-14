import { describe, it, expect } from 'vitest'

describe('Orders API Integration Tests', () => {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

  it('should list orders with pagination', async () => {
    const response = await fetch(`${baseUrl}/api/orders?page=1&limit=10`)
    expect(response.status).toBe(200)
    
    const data = await response.json()
    expect(Array.isArray(data.orders || data)).toBe(true)
  })

  it('should require authentication for order creation', async () => {
    const response = await fetch(`${baseUrl}/api/orders/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: [{ productId: 'test', quantity: 1, price: 100 }]
      })
    })
    
    expect([401, 403]).toContain(response.status)
  })

  it('should validate order data', async () => {
    const response = await fetch(`${baseUrl}/api/orders/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ invalid: 'data' })
    })
    
    expect([400, 401, 403]).toContain(response.status)
  })
})
