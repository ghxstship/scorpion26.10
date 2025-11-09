import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { requireAdmin, handleError } from '@/lib/utils/api-helpers'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { searchParams } = new URL(request.url)
    const tenantId = request.headers.get('x-tenant-id')

    if (!tenantId) {
      return NextResponse.json(
        { error: 'Tenant not found' },
        { status: 404 }
      )
    }

    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')

    const { data: videos, error } = await (supabase as any)
      .from('videos')
      .select('*')
      .eq('tenant_id', tenantId)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) throw error

    return NextResponse.json({ videos })
  } catch (error) {
    return handleError(error)
  }
}

export async function POST(request: NextRequest) {
  const authResult = await requireAdmin()
  if (authResult instanceof NextResponse) {
    return authResult
  }

  try {
    const supabase = await createClient()
    const body = await request.json()
    const { userProfile } = authResult

    const { data: video, error } = await (supabase as any)
      .from('videos')
      .insert({
        tenant_id: userProfile.tenant_id,
        title: body.title,
        description: body.description,
        url: body.url,
        provider: body.provider,
        is_premium: body.is_premium || false,
        thumbnail_url: body.thumbnail_url,
        duration_seconds: body.duration_seconds,
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ video }, { status: 201 })
  } catch (error) {
    return handleError(error)
  }
}
