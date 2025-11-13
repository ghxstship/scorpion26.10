import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { requireAuth, handleError } from '@/lib/utils/api-helpers'
import { typedFrom, typedInsert } from '@/lib/supabase/typed-client'

export async function GET() {
  try {
    const user = await requireAuth()
    if (user instanceof NextResponse) return user

    const supabase = await createClient()
    const { data, error } = await typedFrom(supabase, 'tenants')
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

    const insertData = {
      name: body.name,
      slug: body.slug,
      custom_domain: body.customDomain,
      logo_url: body.logoUrl,
      primary_color: body.primaryColor || '#000000',
      secondary_color: body.secondaryColor || '#ffffff',
    }
    
    const { data, error } = await typedInsert(supabase, 'tenants', insertData)
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
