import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { typedInsert, typedUpdate } from '@/lib/supabase/typed-client'
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
  
  if (!userProfile || typeof userProfile !== 'object' || !('role' in userProfile) || (userProfile as Record<string, unknown>).role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }
  
  if (tenantId && userProfile && typeof userProfile === 'object' && 'tenant_id' in userProfile && (userProfile as Record<string, unknown>).tenant_id !== tenantId) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }
  
  return { user, userProfile: userProfile as Record<string, unknown> }
}

export function handleError(error: unknown) {
  console.error('API Error:', error)
  
  // In production, don't expose internal error messages
  const isDevelopment = process.env.NODE_ENV === 'development'
  
  // Handle Supabase/PostgreSQL errors
  if (typeof error === 'object' && error !== null && 'code' in error) {
    const dbError = error as { code: string; message?: string; details?: string }
    
    // Handle specific PostgreSQL error codes
    switch (dbError.code) {
      case 'PGRST116': // No rows returned (not found)
      case '22P02': // Invalid text representation
        return NextResponse.json(
          { error: isDevelopment ? (dbError.message || 'Resource not found') : 'Resource not found' },
          { status: 404 }
        )
      case '23505': // Unique violation
        return NextResponse.json(
          { error: isDevelopment ? (dbError.message || 'Duplicate entry') : 'Duplicate entry' },
          { status: 409 }
        )
      case '23503': // Foreign key violation
        return NextResponse.json(
          { error: isDevelopment ? (dbError.message || 'Referenced resource not found') : 'Invalid reference' },
          { status: 400 }
        )
      case '42501': // Insufficient privilege
        return NextResponse.json(
          { error: 'Forbidden' },
          { status: 403 }
        )
      default:
        const message = isDevelopment ? (dbError.message || 'Database error occurred') : 'Internal server error'
        return NextResponse.json({ error: message }, { status: 500 })
    }
  }
  
  if (error instanceof Error) {
    const message = isDevelopment ? error.message : 'Internal server error'
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
    const { data: tenant } = await supabase
      .from('tenants')
      .select('id')
      .eq('slug', subdomain)
      .single()
    
    if (tenant) return (tenant as Record<string, unknown>).id as string
  }
  
  // Check if it's a custom domain
  const { data: tenant } = await supabase
    .from('tenants')
    .select('id')
    .eq('custom_domain', hostname)
    .single()
  
  return (tenant as Record<string, unknown> | null)?.id as string || null
}

// Type-safe insert helper
export async function insertRecord<T extends keyof Database['public']['Tables']>(
  table: T,
  data: Database['public']['Tables'][T]['Insert']
) {
  const supabase = await createClient()
  return await typedInsert(supabase, table, data).select().single()
}

// Type-safe update helper
export async function updateRecord<T extends keyof Database['public']['Tables']>(
  table: T,
  id: string,
  data: Database['public']['Tables'][T]['Update']
) {
  const supabase = await createClient()
  return await typedUpdate(supabase, table, data).eq('id', id).select().single()
}
