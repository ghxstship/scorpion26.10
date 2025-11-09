import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { requireAdmin, handleError, getTenantFromRequest } from '@/lib/utils/api-helpers'

export async function GET(request: Request) {
  try {
    const tenantId = await getTenantFromRequest(request)
    if (!tenantId) {
      return NextResponse.json({ error: 'Tenant not found' }, { status: 404 })
    }

    const supabase = await createClient()
    const { data, error } = await (supabase as any)
      .from('pages')
      .select('*')
      .eq('tenant_id', tenantId)
      .eq('is_published', true)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json(data)
  } catch (error) {
    return handleError(error)
  }
}

export async function POST(request: Request) {
  try {
    const authResult = await requireAdmin()
    if (authResult instanceof NextResponse) return authResult

    const body = await request.json()
    const supabase = await createClient()

    const { data, error } = await (supabase as any)
      .from('pages')
      .insert({
        tenant_id: body.tenantId,
        slug: body.slug,
        title: body.title,
        content: body.content,
        seo_title: body.seoTitle,
        seo_description: body.seoDescription,
        is_published: body.isPublished || false,
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json(data)
  } catch (error) {
    return handleError(error)
  }
}
