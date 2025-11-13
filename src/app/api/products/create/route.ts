import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { requireAdmin, handleError } from '@/lib/utils/api-helpers'
import { typedInsert } from '@/lib/supabase/typed-client'
import { createProductSchema } from '@/lib/utils/validation'

export async function POST(request: Request) {
  try {
    const authResult = await requireAdmin()
    if (authResult instanceof NextResponse) return authResult

    const body = await request.json()
    const validatedData = createProductSchema.parse(body)

    const supabase = await createClient()
    
    const insertData = {
      tenant_id: validatedData.tenantId,
      title: validatedData.title,
      description: validatedData.description,
      type: validatedData.type as 'digital' | 'physical' | 'service' | 'subscription',
      price: validatedData.price,
      image_url: validatedData.imageUrl,
      is_active: true,
    }
    
    const { data, error } = await typedInsert(supabase, 'products', insertData)
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
