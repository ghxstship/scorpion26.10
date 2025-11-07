import { createClient } from '@/lib/supabase/server'

export interface Tenant {
  id: string
  name: string
  slug: string
  subdomain: string | null
  custom_domain: string | null
  logo_url: string | null
  primary_color: string
  secondary_color: string
  stripe_account_id: string | null
}

/**
 * Resolve tenant from subdomain or custom domain
 * @param hostname - Full hostname from request (e.g., tenant1.platform.com)
 * @returns Tenant object or null if not found
 */
export async function resolveTenant(hostname: string): Promise<Tenant | null> {
  const supabase = await createClient()
  
  // Get root domain from environment
  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'localhost:3000'
  
  // Handle localhost development
  if (hostname.includes('localhost') || hostname.includes('127.0.0.1')) {
    // For local development, use a default tenant or extract from subdomain
    const parts = hostname.split('.')
    if (parts.length > 1 && parts[0] !== 'localhost') {
      // e.g., tenant1.localhost:3000
      const subdomain = parts[0]
      const { data: tenant } = await supabase
        .from('tenants')
        .select('*')
        .eq('subdomain', subdomain)
        .single()
      
      return tenant
    }
    
    // Return default tenant for localhost
    const { data: defaultTenant } = await supabase
      .from('tenants')
      .select('*')
      .limit(1)
      .single()
    
    return defaultTenant
  }
  
  // Check if it's a custom domain
  const { data: customDomainTenant } = await supabase
    .from('tenants')
    .select('*')
    .eq('custom_domain', hostname)
    .single()
  
  if (customDomainTenant) {
    return customDomainTenant
  }
  
  // Extract subdomain
  const subdomain = extractSubdomain(hostname, rootDomain)
  
  if (!subdomain) {
    // No subdomain, return default or null
    return null
  }
  
  // Look up tenant by subdomain
  const { data: tenant } = await supabase
    .from('tenants')
    .select('*')
    .eq('subdomain', subdomain)
    .single()
  
  return tenant
}

/**
 * Extract subdomain from hostname
 * @param hostname - Full hostname (e.g., tenant1.platform.com)
 * @param rootDomain - Root domain (e.g., platform.com)
 * @returns Subdomain or null
 */
function extractSubdomain(hostname: string, rootDomain: string): string | null {
  // Remove port if present
  const cleanHostname = hostname.split(':')[0]
  const cleanRootDomain = rootDomain.split(':')[0]
  
  // Check if hostname ends with root domain
  if (!cleanHostname.endsWith(cleanRootDomain)) {
    return null
  }
  
  // Extract subdomain
  const subdomain = cleanHostname.replace(`.${cleanRootDomain}`, '')
  
  // If subdomain is same as hostname, no subdomain exists
  if (subdomain === cleanHostname) {
    return null
  }
  
  // Ignore www
  if (subdomain === 'www') {
    return null
  }
  
  return subdomain
}

/**
 * Get tenant ID from request headers
 * This is set by middleware after tenant resolution
 */
export function getTenantIdFromHeaders(headers: Headers): string | null {
  return headers.get('x-tenant-id')
}

/**
 * Validate tenant access for current user
 */
export async function validateTenantAccess(
  tenantId: string,
  userId: string
): Promise<boolean> {
  const supabase = await createClient()
  
  const { data: userProfile } = await supabase
    .from('users')
    .select('tenant_id, role')
    .eq('id', userId)
    .single()
  
  if (!userProfile) {
    return false
  }
  
  // Super admins can access any tenant
  if (userProfile.role === 'super_admin') {
    return true
  }
  
  // Regular users can only access their own tenant
  return userProfile.tenant_id === tenantId
}
