import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { requireAuth, handleError } from '@/lib/utils/api-helpers'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const user = await requireAuth()
    if (user instanceof NextResponse) return user

    const supabase = await createClient()
    const { data, error } = await supabase
      .from('orders')
      .select('*, order_items(*)')
      .eq('id', id)
      .eq('user_id', user.id)
      .single()

    if (error) throw error

    if (!data) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    return NextResponse.json(data)
  } catch (error) {
    return handleError(error)
  }
}
