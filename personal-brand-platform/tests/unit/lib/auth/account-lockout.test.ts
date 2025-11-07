import { describe, it, expect, beforeEach } from 'vitest'
import {
  isAccountLocked,
  recordLoginAttempt,
  clearLoginAttempts,
  getRemainingAttempts,
} from '@/lib/auth/account-lockout'

describe('Account Lockout', () => {
  const testEmail = 'test@example.com'

  beforeEach(async () => {
    await clearLoginAttempts(testEmail)
  })

  it('should not lock account with fewer than 5 failed attempts', async () => {
    await recordLoginAttempt(testEmail, false)
    await recordLoginAttempt(testEmail, false)
    await recordLoginAttempt(testEmail, false)

    const result = await isAccountLocked(testEmail)
    expect(result.locked).toBe(false)
    expect(result.attempts).toBe(3)
  })

  it('should lock account after 5 failed attempts', async () => {
    for (let i = 0; i < 5; i++) {
      await recordLoginAttempt(testEmail, false)
    }

    const result = await isAccountLocked(testEmail)
    expect(result.locked).toBe(true)
    expect(result.attempts).toBe(5)
  })

  it('should reset attempts after successful login', async () => {
    await recordLoginAttempt(testEmail, false)
    await recordLoginAttempt(testEmail, false)
    await recordLoginAttempt(testEmail, true)

    const remaining = await getRemainingAttempts(testEmail)
    expect(remaining).toBeGreaterThan(0)
  })

  it('should return correct remaining attempts', async () => {
    await recordLoginAttempt(testEmail, false)
    await recordLoginAttempt(testEmail, false)

    const remaining = await getRemainingAttempts(testEmail)
    expect(remaining).toBe(3)
  })

  it('should clear login attempts', async () => {
    await recordLoginAttempt(testEmail, false)
    await recordLoginAttempt(testEmail, false)
    await clearLoginAttempts(testEmail)

    const result = await isAccountLocked(testEmail)
    expect(result.locked).toBe(false)
    expect(result.attempts).toBe(0)
  })
})
