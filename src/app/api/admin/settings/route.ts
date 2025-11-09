import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { requireAdmin, handleError } from '@/lib/utils/api-helpers'

export async function PUT(request: Request) {
  try {
    const authResult = await requireAdmin()
    if (authResult instanceof NextResponse) return authResult

    const body = await request.json()
    const supabase = await createClient()

    const { data, error } = await (supabase as any)
      .from('tenants')
      .update({
        name: body.name,
        logo_url: body.logoUrl,
        primary_color: body.primaryColor,
        secondary_color: body.secondaryColor,
      })
      .eq('id', body.tenantId)
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
