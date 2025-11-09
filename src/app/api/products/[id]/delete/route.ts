import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { requireAdmin, handleError } from '@/lib/utils/api-helpers'

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createClient()

    // Get existing product
    const { data: existingProduct, error: fetchError } = await (supabase as any)
      .from('products')
      .select('tenant_id')
      .eq('id', id)
      .single()

    if (fetchError || !existingProduct) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    const authResult = await requireAdmin(existingProduct.tenant_id as string)
    if (authResult instanceof NextResponse) return authResult

    // Delete product
    const { error } = await (supabase as any)
      .from('products')
      .delete()
      .eq('id', id)

    if (error) throw error

    return NextResponse.json({ message: 'Product deleted successfully' }, { status: 200 })
  } catch (error) {
    return handleError(error)
  }
}
