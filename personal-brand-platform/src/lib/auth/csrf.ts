import crypto from 'crypto'
import { NextRequest } from 'next/server'

const CSRF_TOKEN_LENGTH = 32
const CSRF_COOKIE_NAME = 'csrf-token'
const CSRF_HEADER_NAME = 'x-csrf-token'

export function generateCSRFToken(): string {
  return crypto.randomBytes(CSRF_TOKEN_LENGTH).toString('hex')
}

export function validateCSRFToken(request: NextRequest): boolean {
  // Skip CSRF validation for GET, HEAD, OPTIONS
  const method = request.method.toUpperCase()
  if (['GET', 'HEAD', 'OPTIONS'].includes(method)) {
    return true
  }
  
  const headerToken = request.headers.get(CSRF_HEADER_NAME)
  const cookieToken = request.cookies.get(CSRF_COOKIE_NAME)?.value
  
  if (!headerToken || !cookieToken) {
    return false
  }
  
  // Use constant-time comparison to prevent timing attacks
  return crypto.timingSafeEqual(
    Buffer.from(headerToken),
    Buffer.from(cookieToken)
  )
}

export function setCSRFCookie(response: Response, token: string): void {
  // Set cookie with security flags
  const cookieValue = `${CSRF_COOKIE_NAME}=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=86400`
  response.headers.append('Set-Cookie', cookieValue)
}

export function getCSRFTokenFromRequest(request: NextRequest): string | null {
  return request.cookies.get(CSRF_COOKIE_NAME)?.value || null
}

export function requireCSRFToken(request: NextRequest): {
  valid: boolean
  error?: string
} {
  if (!validateCSRFToken(request)) {
    return {
      valid: false,
      error: 'Invalid or missing CSRF token'
    }
  }
  
  return { valid: true }
}
