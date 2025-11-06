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

    // Get dashboard stats
    const [orders, products, users, bookings, subscribers] = await Promise.all([
      supabase.from('orders').select('*').eq('tenant_id', tenantId),
      supabase.from('products').select('*').eq('tenant_id', tenantId),
      supabase.from('users').select('*').eq('tenant_id', tenantId),
      supabase.from('bookings').select('*').eq('tenant_id', tenantId),
      supabase.from('email_subscribers').select('*').eq('tenant_id', tenantId).eq('status', 'active'),
    ])

    const totalRevenue = orders.data?.reduce((sum: number, order: any) => {
      return order.status === 'completed' ? sum + parseFloat(order.total_amount) : sum
    }, 0) || 0

    return NextResponse.json({
      stats: {
        totalRevenue,
        totalOrders: orders.data?.length || 0,
        totalProducts: products.data?.length || 0,
        totalUsers: users.data?.length || 0,
        totalBookings: bookings.data?.length || 0,
        totalSubscribers: subscribers.data?.length || 0,
      },
      recentOrders: orders.data?.slice(0, 5) || [],
      recentBookings: bookings.data?.slice(0, 5) || [],
    })
  } catch (error) {
    return handleError(error)
  }
}
