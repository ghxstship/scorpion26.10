import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { requireAdmin, handleError } from '@/lib/utils/api-helpers'

export async function GET(request: Request) {
  try {
    const authResult = await requireAdmin()
    if (authResult instanceof NextResponse) return authResult

    const { searchParams } = new URL(request.url)
    const tenantId = searchParams.get('tenantId')

    if (!tenantId) {
      return NextResponse.json({ error: 'Tenant ID required' }, { status: 400 })
    }

    const supabase = await createClient()

    // Get various analytics
    const [orders, products, subscribers, bookings] = await Promise.all([
      supabase.from('orders').select('total_amount, status, created_at').eq('tenant_id', tenantId),
      supabase.from('products').select('id').eq('tenant_id', tenantId).eq('is_active', true),
      supabase.from('email_subscribers').select('id').eq('tenant_id', tenantId).eq('status', 'active'),
      supabase.from('bookings').select('id, status').eq('tenant_id', tenantId),
    ])

    const totalRevenue = orders.data?.reduce((sum: number, order: any) => {
      return order.status === 'completed' ? sum + parseFloat(order.total_amount) : sum
    }, 0) || 0

    return NextResponse.json({
      totalRevenue,
      totalOrders: orders.data?.length || 0,
      totalProducts: products.data?.length || 0,
      totalSubscribers: subscribers.data?.length || 0,
      totalBookings: bookings.data?.length || 0,
      recentOrders: orders.data?.slice(0, 10) || [],
    })
  } catch (error) {
    return handleError(error)
  }
}
