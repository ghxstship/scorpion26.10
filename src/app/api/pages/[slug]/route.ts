import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { handleError, getTenantFromRequest } from '@/lib/utils/api-helpers'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const tenantId = await getTenantFromRequest(request)
    if (!tenantId) {
      return NextResponse.json({ error: 'Tenant not found' }, { status: 404 })
    }

    const supabase = await createClient()
    const { data, error } = await (supabase as any)
      .from('pages')
      .select('*')
      .eq('tenant_id', tenantId)
      .eq('slug', slug)
      .eq('is_published', true)
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 404 })
    }

    return NextResponse.json(data)
  } catch (error) {
    return handleError(error)
  }
}
