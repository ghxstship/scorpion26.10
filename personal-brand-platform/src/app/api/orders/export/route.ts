import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { requireAdmin, handleError } from '@/lib/utils/api-helpers'

export async function GET() {
  try {
    const authResult = await requireAdmin()
    if (authResult instanceof NextResponse) return authResult

    const supabase = await createClient()
    const { data, error } = await supabase
      .from('orders')
      .select('*, order_items(*, products(*)), users(email, full_name)')
      .order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    // Convert to CSV format
    const csv = data?.map((order: any) => ({
      id: order.id,
      customer: order.users?.email || 'N/A',
      total: order.total_amount,
      status: order.status,
      items: order.order_items?.length || 0,
      created: new Date(order.created_at).toLocaleDateString(),
    }))

    return NextResponse.json(csv)
  } catch (error) {
    return handleError(error)
  }
}
