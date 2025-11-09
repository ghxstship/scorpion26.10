import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { requireAdmin, handleError } from '@/lib/utils/api-helpers'
import { updateProductSchema } from '@/lib/utils/validation'
import { z } from 'zod'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const validatedData = updateProductSchema.parse({ ...body, id })

    const supabase = await createClient()

    // Get existing product
    const { data: existingProduct, error: fetchError } = await supabase
      .from('products')
      .select('tenant_id')
      .eq('id', id)
      .single()

    if (fetchError || !existingProduct) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    const authResult = await requireAdmin(existingProduct.tenant_id as string)
    if (authResult instanceof NextResponse) return authResult

    // Update product
    const updateData: Record<string, unknown> = {}
    if (validatedData.title) updateData.title = validatedData.title
    if (validatedData.description !== undefined) updateData.description = validatedData.description
    if (validatedData.type) updateData.type = validatedData.type
    if (validatedData.price) updateData.price = validatedData.price
    if (validatedData.imageUrl !== undefined) updateData.image_url = validatedData.imageUrl

    const { data: updatedProduct, error } = await supabase
      .from('products')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ data: updatedProduct })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.issues }, { status: 400 })
    }
    return handleError(error)
  }
}
