import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { requireAdmin, handleError } from '@/lib/utils/api-helpers'
import { typedUpdate } from '@/lib/supabase/typed-client'
import type { Updates } from '@/types/database'

export async function PUT(request: Request) {
  try {
    const authResult = await requireAdmin()
    if (authResult instanceof NextResponse) return authResult

    const body = await request.json()
    const supabase = await createClient()

    const updateData: Updates<'tenants'> = {
      name: body.name,
      logo_url: body.logoUrl,
      primary_color: body.primaryColor,
      secondary_color: body.secondaryColor,
    }

    const { data, error} = await typedUpdate(supabase, 'tenants', updateData)
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
