import { describe, it, expect } from 'vitest'
import {
  loginSchema,
  signupSchema,
  createProductSchema,
  createBlogPostSchema,
  createPageSchema,
  subscribeEmailSchema,
} from '@/lib/utils/validation'

describe('Validation Schemas', () => {
  describe('loginSchema', () => {
    it('should validate correct email and password', () => {
      const result = loginSchema.safeParse({
        email: 'test@example.com',
        password: 'password123'
      })
      expect(result.success).toBe(true)
    })

    it('should reject invalid email', () => {
      const result = loginSchema.safeParse({
        email: 'invalid-email',
        password: 'password123'
      })
      expect(result.success).toBe(false)
    })

    it('should reject empty password', () => {
      const result = loginSchema.safeParse({
        email: 'test@example.com',
        password: ''
      })
      expect(result.success).toBe(false)
    })
  })

  describe('signupSchema', () => {
    it('should validate correct signup data', () => {
      const result = signupSchema.safeParse({
        email: 'newuser@example.com',
        password: 'SecurePass123!',
        fullName: 'John Doe'
      })
      expect(result.success).toBe(true)
    })

    it('should reject password shorter than 8 characters', () => {
      const result = signupSchema.safeParse({
        email: 'test@example.com',
        password: 'short',
        fullName: 'John Doe'
      })
      expect(result.success).toBe(false)
    })

    it('should reject name shorter than 2 characters', () => {
      const result = signupSchema.safeParse({
        email: 'test@example.com',
        password: 'password123',
        fullName: 'J'
      })
      expect(result.success).toBe(false)
    })
  })

  describe('createProductSchema', () => {
    it('should validate correct product data', () => {
      const result = createProductSchema.safeParse({
        title: 'Test Product',
        description: 'A test product',
        type: 'digital',
        price: 99.99,
        tenantId: '123e4567-e89b-12d3-a456-426614174000'
      })
      expect(result.success).toBe(true)
    })

    it('should reject negative price', () => {
      const result = createProductSchema.safeParse({
        title: 'Test Product',
        type: 'digital',
        price: -10,
        tenantId: '123e4567-e89b-12d3-a456-426614174000'
      })
      expect(result.success).toBe(false)
    })

    it('should reject invalid product type', () => {
      const result = createProductSchema.safeParse({
        title: 'Test Product',
        type: 'invalid',
        price: 99.99,
        tenantId: '123e4567-e89b-12d3-a456-426614174000'
      })
      expect(result.success).toBe(false)
    })
  })

  describe('createBlogPostSchema', () => {
    it('should validate correct blog post data', () => {
      const result = createBlogPostSchema.safeParse({
        title: 'Test Post',
        slug: 'test-post',
        content: 'This is test content',
        isPublished: false,
        tenantId: '123e4567-e89b-12d3-a456-426614174000'
      })
      expect(result.success).toBe(true)
    })

    it('should reject empty title', () => {
      const result = createBlogPostSchema.safeParse({
        title: '',
        slug: 'test-post',
        content: 'Content',
        tenantId: '123e4567-e89b-12d3-a456-426614174000'
      })
      expect(result.success).toBe(false)
    })
  })

  describe('createPageSchema', () => {
    it('should validate correct page data', () => {
      const result = createPageSchema.safeParse({
        slug: 'about-us',
        title: 'About Us',
        content: { blocks: [] },
        isPublished: true,
        tenantId: '123e4567-e89b-12d3-a456-426614174000'
      })
      expect(result.success).toBe(true)
    })
  })

  describe('subscribeEmailSchema', () => {
    it('should validate correct email subscription', () => {
      const result = subscribeEmailSchema.safeParse({
        email: 'subscriber@example.com',
        firstName: 'Jane',
        tenantId: '123e4567-e89b-12d3-a456-426614174000'
      })
      expect(result.success).toBe(true)
    })

    it('should accept subscription without firstName', () => {
      const result = subscribeEmailSchema.safeParse({
        email: 'subscriber@example.com',
        tenantId: '123e4567-e89b-12d3-a456-426614174000'
      })
      expect(result.success).toBe(true)
    })
  })
})
