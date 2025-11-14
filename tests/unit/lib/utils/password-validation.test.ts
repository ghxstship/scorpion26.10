import { describe, it, expect } from 'vitest'
import { passwordSchema } from '@/lib/utils/validation'

describe('Password Validation', () => {
  it('should reject passwords shorter than 12 characters', () => {
    const result = passwordSchema.safeParse('Short1!')
    expect(result.success).toBe(false)
  })

  it('should reject passwords without uppercase', () => {
    const result = passwordSchema.safeParse('lowercase123!')
    expect(result.success).toBe(false)
  })

  it('should reject passwords without lowercase', () => {
    const result = passwordSchema.safeParse('UPPERCASE123!')
    expect(result.success).toBe(false)
  })

  it('should reject passwords without numbers', () => {
    const result = passwordSchema.safeParse('NoNumbers!')
    expect(result.success).toBe(false)
  })

  it('should reject passwords without special characters', () => {
    const result = passwordSchema.safeParse('NoSpecial123')
    expect(result.success).toBe(false)
  })

  it('should accept valid strong passwords', () => {
    const result = passwordSchema.safeParse('MyP@ssw0rd2024!')
    expect(result.success).toBe(true)
  })

  it('should accept passwords with all requirements', () => {
    const validPasswords = [
      'Str0ng!Password',
      'C0mpl3x@Pass',
      'S3cur3#MyPass',
      'V@lid8Password'
    ]

    validPasswords.forEach(password => {
      const result = passwordSchema.safeParse(password)
      expect(result.success).toBe(true)
    })
  })
})
