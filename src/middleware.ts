import { NextResponse, type NextRequest } from 'next/server'
import { applySecurityHeaders } from './middleware/security-headers'
import { applyRateLimit } from './middleware/rate-limit'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Apply rate limiting to API routes
  if (pathname.startsWith('/api/')) {
    const rateLimitResult = await applyRateLimit(request)
    if (rateLimitResult) return rateLimitResult
  }

  // Create response
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // Apply security headers to all routes
  return applySecurityHeaders(response)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
