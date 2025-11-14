import { createClient } from '@/lib/supabase/server'

// Session timeout configuration
export const SESSION_CONFIG = {
  IDLE_TIMEOUT_MS: 30 * 60 * 1000, // 30 minutes
  ABSOLUTE_TIMEOUT_MS: 24 * 60 * 60 * 1000, // 24 hours
} as const

const SESSION_TIMEOUT_MS = SESSION_CONFIG.IDLE_TIMEOUT_MS
const ABSOLUTE_TIMEOUT_MS = SESSION_CONFIG.ABSOLUTE_TIMEOUT_MS

interface SessionMetadata {
  lastActivity: number
  createdAt: number
  userId: string
}

// In production, use Redis or similar for session storage
const sessionStore = new Map<string, SessionMetadata>()

export async function validateSession(sessionId: string): Promise<{
  valid: boolean
  reason?: string
}> {
  const session = sessionStore.get(sessionId)
  
  if (!session) {
    return { valid: false, reason: 'Session not found' }
  }
  
  const now = Date.now()
  
  // Check idle timeout
  if (now - session.lastActivity > SESSION_TIMEOUT_MS) {
    sessionStore.delete(sessionId)
    return { valid: false, reason: 'Session expired due to inactivity' }
  }
  
  // Check absolute timeout
  if (now - session.createdAt > ABSOLUTE_TIMEOUT_MS) {
    sessionStore.delete(sessionId)
    return { valid: false, reason: 'Session expired (maximum duration reached)' }
  }
  
  return { valid: true }
}

export async function updateSessionActivity(sessionId: string): Promise<void> {
  const session = sessionStore.get(sessionId)
  if (session) {
    session.lastActivity = Date.now()
  }
}

export async function createSession(userId: string, sessionId: string): Promise<void> {
  const now = Date.now()
  sessionStore.set(sessionId, {
    userId,
    lastActivity: now,
    createdAt: now,
  })
}

export async function destroySession(sessionId: string): Promise<void> {
  sessionStore.delete(sessionId)
}

export async function cleanupExpiredSessions(): Promise<number> {
  const now = Date.now()
  let cleaned = 0
  
  for (const [sessionId, session] of sessionStore.entries()) {
    if (
      now - session.lastActivity > SESSION_TIMEOUT_MS ||
      now - session.createdAt > ABSOLUTE_TIMEOUT_MS
    ) {
      sessionStore.delete(sessionId)
      cleaned++
    }
  }
  
  return cleaned
}

// Run cleanup every 5 minutes
setInterval(() => {
  cleanupExpiredSessions()
}, 5 * 60 * 1000)

export async function getSessionUser(sessionId: string) {
  const validation = await validateSession(sessionId)
  
  if (!validation.valid) {
    return null
  }
  
  const session = sessionStore.get(sessionId)
  if (!session) return null
  
  await updateSessionActivity(sessionId)
  
  const supabase = await createClient()
  const { data: user } = await supabase
    .from('users')
    .select('*')
    .eq('id', session.userId)
    .single()
  
  return user
}
