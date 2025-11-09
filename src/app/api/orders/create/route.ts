import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { requireAuth, handleError } from '@/lib/utils/api-helpers'
import { createOrderSchema } from '@/lib/utils/validation'
import { z } from 'zod'

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth()
    if (user instanceof NextResponse) return user

    const body = await request.json()
    const validatedData = createOrderSchema.parse(body)

    const supabase = await createClient()

    // Calculate total amount
    const totalAmount = validatedData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)

    // Create order
    const { data: order, error: orderError } = await (supabase as any)
      .from('orders')
      .insert({
        tenant_id: validatedData.tenantId,
        user_id: user.id,
        total_amount: totalAmount,
        status: 'pending',
      })
      .select()
      .single()

    if (orderError) throw orderError

    // Create order items
    const orderItems = validatedData.items.map(item => ({
      order_id: order.id,
      product_id: item.productId,
      quantity: item.quantity,
      price: item.price,
    }))

    const { error: itemsError } = await (supabase as any)
      .from('order_items')
      .insert(orderItems)

    if (itemsError) throw itemsError

    return NextResponse.json({ data: order }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.issues }, { status: 400 })
    }
    return handleError(error)
  }
}
