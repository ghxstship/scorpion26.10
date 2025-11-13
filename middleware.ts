import { type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'
import { resolveTenant } from '@/lib/tenant/resolver'

export async function middleware(request: NextRequest) {
  // First, handle tenant resolution
  const hostname = request.headers.get('host') || ''
  
  // Resolve tenant from subdomain or custom domain
  const tenant = await resolveTenant(hostname)
  
  // Clone the request headers
  const requestHeaders = new Headers(request.headers)
  
  // Add tenant ID to headers for downstream use
  if (tenant) {
    requestHeaders.set('x-tenant-id', tenant.id)
    requestHeaders.set('x-tenant-slug', tenant.slug)
  }
  
  // Create response with updated headers
  const response = await updateSession(request)
  
  // If we have a tenant, add it to response headers as well
  if (tenant && response) {
    response.headers.set('x-tenant-id', tenant.id)
    response.headers.set('x-tenant-slug', tenant.slug)
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
