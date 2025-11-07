import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { requireAdmin, handleError } from '@/lib/utils/api-helpers'
import { createProductVariantSchema } from '@/lib/utils/validation-extended'
import { z } from 'zod'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('product_variants')
      .select('*')
      .eq('product_id', id)
      .eq('is_active', true)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json(data)
  } catch (error) {
    return handleError(error)
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const authResult = await requireAdmin()
    if (authResult instanceof NextResponse) return authResult

    const body = await request.json()
    const validatedData = createProductVariantSchema.parse({
      ...body,
      productId: id
    })

    const supabase = await createClient()
    
    const insertData: Record<string, unknown> = {
      product_id: validatedData.productId,
      name: validatedData.name,
      sku: validatedData.sku,
      price: validatedData.price,
      stripe_price_id: validatedData.stripePriceId,
      inventory_count: validatedData.inventoryCount,
    }
    
    const { data, error } = await supabase
      .from('product_variants')
      .insert(insertData)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json(data)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 }
      )
    }
    return handleError(error)
  }
}
