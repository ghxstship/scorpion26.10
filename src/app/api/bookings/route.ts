import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { requireAuth, handleError } from '@/lib/utils/api-helpers'
import { typedInsert } from '@/lib/supabase/typed-client'
import { createBookingSchema } from '@/lib/utils/validation'

export async function GET() {
  try {
    const user = await requireAuth()
    if (user instanceof NextResponse) return user

    const supabase = await createClient()
    const { data, error } = await supabase
      .from('bookings')
      .select('*, services(name, duration_minutes, price)')
      .eq('user_id', user.id)
      .order('booking_date', { ascending: true })

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    return handleError(error)
  }
}

export async function POST(request: Request) {
  try {
    const user = await requireAuth()
    if (user instanceof NextResponse) return user

    const body = await request.json()
    const { serviceId, bookingDate, durationMinutes, tenantId } = createBookingSchema.parse(body)

    const supabase = await createClient()

    const { data: booking, error } = await typedInsert(supabase, 'bookings', {
        tenant_id: tenantId,
        user_id: user.id,
        service_id: serviceId,
        booking_date: bookingDate,
        duration_minutes: durationMinutes,
        status: 'pending',
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json(booking)
  } catch (error) {
    return handleError(error)
  }
}
