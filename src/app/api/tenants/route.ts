import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { requireAuth, handleError } from '@/lib/utils/api-helpers'

export async function GET() {
  try {
    const user = await requireAuth()
    if (user instanceof NextResponse) return user

    const supabase = await createClient()
    const { data, error } = await (supabase as any)
      .from('tenants')
      .select('*')
      .order('created_at', { ascending: false })

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
    const user = await requireAuth()
    if (user instanceof NextResponse) return user

    const body = await request.json()
    const supabase = await createClient()

    const insertData: Record<string, unknown> = {
      name: body.name,
      slug: body.slug,
      custom_domain: body.customDomain,
      logo_url: body.logoUrl,
      primary_color: body.primaryColor || '#000000',
      secondary_color: body.secondaryColor || '#ffffff',
    }
    
    const { data, error } = await (supabase as any)
      .from('tenants')
      .insert(insertData)
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
