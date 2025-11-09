import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { requireAuth, handleError } from '@/lib/utils/api-helpers'
import { createOrderSchema } from '@/lib/utils/validation'

export async function GET(request: Request) {
  try {
    const user = await requireAuth()
    if (user instanceof NextResponse) return user

    const supabase = await createClient()
    const { data: orders, error } = await (supabase as any)
      .from('orders')
      .select('*, order_items(*, products(*))')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json(orders)
  } catch (error) {
    return handleError(error)
  }
}

export async function POST(request: Request) {
  try {
    const user = await requireAuth()
    if (user instanceof NextResponse) return user

    const body = await request.json()
    const { items, tenantId } = createOrderSchema.parse(body)

    const supabase = await createClient()

    // Calculate total
    const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)

    // Create order
    const orderData: Record<string, unknown> = {
      tenant_id: tenantId,
      user_id: user.id,
      total_amount: totalAmount,
      status: 'pending',
    }
    
    const { data: order, error: orderError } = await (supabase as any)
      .from('orders')
      .insert(orderData)
      .select()
      .single()

    if (orderError) {
      return NextResponse.json({ error: orderError.message }, { status: 400 })
    }

    // Create order items
    const orderItems = items.map(item => ({
      order_id: order && typeof order === 'object' && 'id' in order ? String(order.id) : '',
      product_id: item.productId,
      quantity: item.quantity,
      price: item.price,
    }))

    const { error: itemsError } = await (supabase as any)
      .from('order_items')
      .insert(orderItems)

    if (itemsError) {
      return NextResponse.json({ error: itemsError.message }, { status: 400 })
    }

    return NextResponse.json(order)
  } catch (error) {
    return handleError(error)
  }
}
