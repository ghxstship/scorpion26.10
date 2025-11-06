import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { requireAdmin, handleError } from '@/lib/utils/api-helpers'
import { createProductSchema } from '@/lib/utils/validation'

export async function POST(request: Request) {
  try {
    const authResult = await requireAdmin()
    if (authResult instanceof NextResponse) return authResult

    const body = await request.json()
    const validatedData = createProductSchema.parse(body)

    const supabase = await createClient()
    const { data, error } = await supabase
      .from('products')
      .insert({
        tenant_id: validatedData.tenantId,
        title: validatedData.title,
        description: validatedData.description,
        type: validatedData.type,
        price: validatedData.price,
        image_url: validatedData.imageUrl,
        is_active: true,
      } as any)
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
