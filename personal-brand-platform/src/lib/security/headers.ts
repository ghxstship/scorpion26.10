/**
 * Security Headers Configuration
 * Implements comprehensive security headers for production deployment
 */

import { NextResponse } from 'next/server'

/**
 * Content Security Policy configuration
 * Prevents XSS, clickjacking, and other code injection attacks
 */
export function getCSPHeader(nonce?: string): string {
  const cspDirectives = [
    "default-src 'self'",
    `script-src 'self' 'unsafe-eval' 'unsafe-inline' ${nonce ? `'nonce-${nonce}'` : ''} https://js.stripe.com https://www.googletagmanager.com`,
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    "img-src 'self' data: https: blob:",
    "media-src 'self' https:",
    "connect-src 'self' https://api.stripe.com https://*.supabase.co wss://*.supabase.co https://www.google-analytics.com",
    "frame-src 'self' https://js.stripe.com https://hooks.stripe.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
  ]

  return cspDirectives.join('; ')
}

/**
 * Apply security headers to response
 */
export function applySecurityHeaders(response: NextResponse): NextResponse {
  const headers = response.headers

  // Content Security Policy
  headers.set('Content-Security-Policy', getCSPHeader())

  // Strict Transport Security (HSTS)
  // Force HTTPS for 1 year, include subdomains
  headers.set(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains; preload'
  )

  // X-Frame-Options - Prevent clickjacking
  headers.set('X-Frame-Options', 'DENY')

  // X-Content-Type-Options - Prevent MIME sniffing
  headers.set('X-Content-Type-Options', 'nosniff')

  // X-XSS-Protection - Enable XSS filter
  headers.set('X-XSS-Protection', '1; mode=block')

  // Referrer-Policy - Control referrer information
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

  // Permissions-Policy - Control browser features
  const permissionsPolicy = [
    'camera=()',
    'microphone=()',
    'geolocation=()',
    'interest-cohort=()', // Disable FLoC
    'payment=(self)',
  ].join(', ')
  headers.set('Permissions-Policy', permissionsPolicy)

  // X-DNS-Prefetch-Control - Control DNS prefetching
  headers.set('X-DNS-Prefetch-Control', 'on')

  return response
}

/**
 * CORS configuration
 */
export interface CORSOptions {
  origin?: string | string[]
  methods?: string[]
  allowedHeaders?: string[]
  exposedHeaders?: string[]
  credentials?: boolean
  maxAge?: number
}

export function applyCORSHeaders(
  response: NextResponse,
  options: CORSOptions = {}
): NextResponse {
  const {
    origin = process.env.NEXT_PUBLIC_APP_URL || '*',
    methods = ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders = ['Content-Type', 'Authorization'],
    exposedHeaders = [],
    credentials = true,
    maxAge = 86400, // 24 hours
  } = options

  const headers = response.headers

  // Set origin
  if (Array.isArray(origin)) {
    // In production, validate against allowed origins
    headers.set('Access-Control-Allow-Origin', origin[0])
    headers.set('Vary', 'Origin')
  } else {
    headers.set('Access-Control-Allow-Origin', origin)
  }

  // Set methods
  headers.set('Access-Control-Allow-Methods', methods.join(', '))

  // Set allowed headers
  headers.set('Access-Control-Allow-Headers', allowedHeaders.join(', '))

  // Set exposed headers
  if (exposedHeaders.length > 0) {
    headers.set('Access-Control-Expose-Headers', exposedHeaders.join(', '))
  }

  // Set credentials
  if (credentials) {
    headers.set('Access-Control-Allow-Credentials', 'true')
  }

  // Set max age
  headers.set('Access-Control-Max-Age', maxAge.toString())

  return response
}

/**
 * Rate limiting headers
 */
export function applyRateLimitHeaders(
  response: NextResponse,
  limit: number,
  remaining: number,
  reset: number
): NextResponse {
  const headers = response.headers

  headers.set('X-RateLimit-Limit', limit.toString())
  headers.set('X-RateLimit-Remaining', remaining.toString())
  headers.set('X-RateLimit-Reset', reset.toString())

  if (remaining === 0) {
    headers.set('Retry-After', Math.ceil((reset - Date.now()) / 1000).toString())
  }

  return response
}

/**
 * Security headers for API routes
 */
export function getAPISecurityHeaders(): Record<string, string> {
  return {
    'Content-Type': 'application/json',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
  }
}

/**
 * Check if request origin is allowed
 */
export function isOriginAllowed(origin: string | null): boolean {
  if (!origin) return false

  const allowedOrigins = [
    process.env.NEXT_PUBLIC_APP_URL,
    'http://localhost:3000',
    'http://localhost:3001',
  ].filter(Boolean) as string[]

  return allowedOrigins.some(allowed => origin.startsWith(allowed))
}
