import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { requireAuth, handleError } from '@/lib/utils/api-helpers'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const user = await requireAuth()
    if (user instanceof NextResponse) return user

    const supabase = await createClient()

    // Get booking
    const { data: booking, error: fetchError } = await supabase
      .from('bookings')
      .select('*')
      .eq('id', id)
      .single()

    if (fetchError || !booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
    }

    // Verify ownership or admin access
    const { data: userProfile } = await supabase
      .from('users')
      .select('role, tenant_id')
      .eq('id', user.id)
      .single()

    const isOwner = booking.user_id === user.id
    const isAdmin = userProfile?.role === 'admin' && userProfile?.tenant_id === booking.tenant_id

    if (!isOwner && !isAdmin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Check if booking can be cancelled (not already completed or cancelled)
    if (booking.status === 'completed' || booking.status === 'cancelled') {
      return NextResponse.json({ 
        error: `Cannot cancel a booking that is already ${booking.status}` 
      }, { status: 400 })
    }

    // Update booking status
    const { data: updatedBooking, error } = await supabase
      .from('bookings')
      .update({ status: 'cancelled' })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({
      data: updatedBooking,
      message: 'Booking cancelled successfully'
    })
  } catch (error) {
    return handleError(error)
  }
}
