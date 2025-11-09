import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import type { Database } from '@/types/database'

export async function getAuthenticatedUser() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error || !user) {
    return null
  }
  
  return user
}

export async function requireAuth() {
  const user = await getAuthenticatedUser()
  
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  return user
}

export async function requireAdmin(tenantId?: string) {
  const supabase = await createClient()
  const user = await getAuthenticatedUser()
  
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  const { data: userProfile } = await supabase
    .from('users')
    .select('role, tenant_id')
    .eq('id', user.id)
    .single()
  
  if (!userProfile || typeof userProfile !== 'object' || !('role' in userProfile) || (userProfile as any).role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }
  
  if (tenantId && userProfile && typeof userProfile === 'object' && 'tenant_id' in userProfile && (userProfile as any).tenant_id !== tenantId) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }
  
  return { user, userProfile: userProfile as any }
}

export function handleError(error: unknown) {
  console.error('API Error:', error)
  
  // In production, don't expose internal error messages
  const isDevelopment = process.env.NODE_ENV === 'development'
  
  if (error instanceof Error) {
    const message = isDevelopment ? error.message : 'Internal server error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
  
  // Handle database errors
  if (typeof error === 'object' && error !== null && 'code' in error) {
    const message = isDevelopment ? 'Database error occurred' : 'Internal server error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
  
  return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
}

export async function getTenantFromRequest(request: Request): Promise<string | null> {
  const url = new URL(request.url)
  const hostname = url.hostname
  
  // Extract subdomain or use custom domain lookup
  const supabase = await createClient()
  
  // Check if it's a subdomain
  const subdomain = hostname.split('.')[0]
  if (subdomain && subdomain !== 'www') {
    const { data: tenant } = await (supabase as any)
      .from('tenants')
      .select('id')
      .eq('slug', subdomain)
      .single()
    
    if (tenant) return (tenant as any).id
  }
  
  // Check if it's a custom domain
  const { data: tenant } = await (supabase as any)
    .from('tenants')
    .select('id')
    .eq('custom_domain', hostname)
    .single()
  
  return (tenant as any)?.id || null
}

// Type-safe insert helper
export async function insertRecord<T extends keyof Database['public']['Tables']>(
  table: T,
  data: Database['public']['Tables'][T]['Insert']
) {
  const supabase = await createClient()
  return await (supabase as any).from(table).insert(data as Database['public']['Tables'][T]['Insert']).select().single()
}

// Type-safe update helper
export async function updateRecord<T extends keyof Database['public']['Tables']>(
  table: T,
  id: string,
  data: Database['public']['Tables'][T]['Update']
) {
  const supabase = await createClient()
  return await (supabase as any).from(table).update(data as Database['public']['Tables'][T]['Update']).eq('id', id).select().single()
}
