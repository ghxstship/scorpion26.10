import { createClient } from '@/lib/supabase/server'

const MAX_FAILED_ATTEMPTS = 5
const LOCKOUT_DURATION_MS = 15 * 60 * 1000 // 15 minutes
const ATTEMPT_WINDOW_MS = 15 * 60 * 1000 // 15 minutes

interface LoginAttempt {
  email: string
  timestamp: number
  success: boolean
  ip?: string
}

// In production, use Redis for distributed locking
const attemptStore = new Map<string, LoginAttempt[]>()

export async function isAccountLocked(email: string): Promise<{
  locked: boolean
  remainingTime?: number
  attempts?: number
}> {
  const attempts = attemptStore.get(email.toLowerCase()) || []
  const now = Date.now()
  
  // Filter recent attempts within the window
  const recentAttempts = attempts.filter(
    attempt => now - attempt.timestamp < ATTEMPT_WINDOW_MS
  )
  
  // Count failed attempts
  const failedAttempts = recentAttempts.filter(a => !a.success)
  
  if (failedAttempts.length >= MAX_FAILED_ATTEMPTS) {
    const oldestFailedAttempt = failedAttempts[0]
    const lockoutEnd = oldestFailedAttempt.timestamp + LOCKOUT_DURATION_MS
    
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

export async function recordLoginAttempt(
  email: string,
  success: boolean,
  ip?: string
): Promise<void> {
  const normalizedEmail = email.toLowerCase()
  const attempts = attemptStore.get(normalizedEmail) || []
  
  attempts.push({
    email: normalizedEmail,
    timestamp: Date.now(),
    success,
    ip
  })
  
  // Keep only recent attempts
  const now = Date.now()
  const recentAttempts = attempts.filter(
    attempt => now - attempt.timestamp < ATTEMPT_WINDOW_MS
  )
  
  attemptStore.set(normalizedEmail, recentAttempts)
  
  // Log to audit trail asynchronously (don't await to avoid blocking)
  logLoginAttempt(normalizedEmail, success, ip).catch(console.error)
}

async function logLoginAttempt(email: string, success: boolean, ip?: string): Promise<void> {
  try {
    const supabase = await createClient()
    await supabase.from('audit_logs').insert({
      action: success ? 'LOGIN_SUCCESS' : 'LOGIN_FAILED',
      entity_type: 'auth',
      description: success ? 'Successful login' : 'Failed login attempt',
      ip_address: ip,
      metadata: { email, success }
    })
  } catch (error) {
    // Silently fail audit logging to not block login flow
    console.error('Failed to log login attempt:', error)
  }
}

export async function clearLoginAttempts(email: string): Promise<void> {
  attemptStore.delete(email.toLowerCase())
}

export async function getRemainingAttempts(email: string): Promise<number> {
  const lockStatus = await isAccountLocked(email)
  if (lockStatus.locked) return 0
  
  return MAX_FAILED_ATTEMPTS - (lockStatus.attempts || 0)
}

// Cleanup old attempts periodically
setInterval(() => {
  const now = Date.now()
  for (const [email, attempts] of attemptStore.entries()) {
    const recentAttempts = attempts.filter(
      attempt => now - attempt.timestamp < ATTEMPT_WINDOW_MS
    )
    
    if (recentAttempts.length === 0) {
      attemptStore.delete(email)
    } else {
      attemptStore.set(email, recentAttempts)
    }
  }
}, 5 * 60 * 1000) // Every 5 minutes
