import { type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'
import { resolveTenantInMiddleware } from '@/lib/tenant/resolver'

export async function middleware(request: NextRequest) {
  // First, update session and get Supabase response
  const response = await updateSession(request)
  
  // Then handle tenant resolution using the middleware-safe method
  const hostname = request.headers.get('host') || ''
  
  try {
    // Resolve tenant from subdomain or custom domain
    const tenant = await resolveTenantInMiddleware(hostname, request)
    
    // Add tenant ID to response headers for downstream use
    if (tenant && response) {
      response.headers.set('x-tenant-id', tenant.id)
      response.headers.set('x-tenant-slug', tenant.slug)
    }
  } catch (error) {
    // Log error but don't fail the request
    console.error('Tenant resolution failed:', error)
  }
  
  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
