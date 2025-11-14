import { describe, it, expect, vi, beforeEach } from 'vitest'
import { NextResponse } from 'next/server'

// Mock Supabase
const mockGetUser = vi.fn()
const mockFrom = vi.fn()

vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn(async () => ({
    auth: {
      getUser: mockGetUser,
    },
    from: mockFrom,
  })),
}))

// Export mocks for test access
export { mockGetUser, mockFrom }

describe('API Helpers', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockGetUser.mockReset()
    mockFrom.mockReset()
  })

  describe('handleError', () => {
    it('should handle generic errors', async () => {
      const { handleError } = await import('@/lib/utils/api-helpers')
      const error = new Error('Test error')
      const response = handleError(error)
      
      expect(response).toBeInstanceOf(NextResponse)
      const json = await response.json()
      // In test environment, error messages are shown
      expect(json.error).toBeTruthy()
      expect(response.status).toBe(500)
    })

    it('should handle database errors', async () => {
      const { handleError } = await import('@/lib/utils/api-helpers')
      const error = { message: 'Database connection failed', code: 'PGRST116' }
      const response = handleError(error)
      
      const json = await response.json()
      expect(json.error).toBeTruthy()
      expect(response.status).toBe(404)
    })
  })

  describe('requireAuth', () => {
    it('should return user when authenticated', async () => {
      const mockUser = { id: '123', email: 'test@example.com' }
      mockGetUser.mockResolvedValue({
        data: { user: mockUser },
        error: null,
      })

      const { requireAuth } = await import('@/lib/utils/api-helpers')
      const result = await requireAuth()
      
      expect(result).toEqual(mockUser)
    })

    it('should return 401 response when not authenticated', async () => {
      mockGetUser.mockResolvedValue({
        data: { user: null },
        error: { message: 'Not authenticated' },
      })

      const { requireAuth } = await import('@/lib/utils/api-helpers')
      const result = await requireAuth()
      
      expect(result).toBeInstanceOf(NextResponse)
      if (result instanceof NextResponse) {
        expect(result.status).toBe(401)
      }
    })
  })

  describe('requireAdmin', () => {
    it('should return user when admin', async () => {
      const mockAuthUser = { id: '123', email: 'admin@example.com' }
      const mockUserProfile = { 
        id: '123', 
        email: 'admin@example.com',
        role: 'admin',
        tenant_id: 'tenant-123'
      }
      mockGetUser.mockResolvedValue({
        data: { user: mockAuthUser },
        error: null,
      })
      mockFrom.mockReturnValue({
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        single: vi.fn().mockResolvedValue({ data: mockUserProfile, error: null }),
      })

      const { requireAdmin } = await import('@/lib/utils/api-helpers')
      const result = await requireAdmin()
      
      expect(result).toHaveProperty('user')
      expect(result).toHaveProperty('userProfile')
    })

    it('should return 403 when not admin', async () => {
      const mockAuthUser = { id: '123', email: 'user@example.com' }
      const mockUserProfile = { 
        id: '123', 
        email: 'user@example.com',
        role: 'customer',
        tenant_id: 'tenant-123'
      }
      mockGetUser.mockResolvedValue({
        data: { user: mockAuthUser },
        error: null,
      })
      mockFrom.mockReturnValue({
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        single: vi.fn().mockResolvedValue({ data: mockUserProfile, error: null }),
      })

      const { requireAdmin } = await import('@/lib/utils/api-helpers')
      const result = await requireAdmin()
      
      expect(result).toBeInstanceOf(NextResponse)
      if (result instanceof NextResponse) {
        expect(result.status).toBe(403)
      }
    })
  })
})
