import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { handleError } from '@/lib/utils/api-helpers'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const serviceId = searchParams.get('serviceId')
    const date = searchParams.get('date')

    if (!serviceId) {
      return NextResponse.json({ error: 'Service ID required' }, { status: 400 })
    }

    const supabase = await createClient()
    const { data, error } = await supabase
      .from('booking_availability')
      .select('*')
      .eq('service_id', serviceId)
      .eq('is_active', true)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    // Get existing bookings for the date
    if (date) {
      const { data: bookings } = await supabase
        .from('bookings')
        .select('booking_date, duration_minutes')
        .eq('service_id', serviceId)
        .gte('booking_date', `${date}T00:00:00`)
        .lte('booking_date', `${date}T23:59:59`)
        .neq('status', 'cancelled')

      return NextResponse.json({ availability: data, bookings })
    }

    return NextResponse.json(data)
  } catch (error) {
    return handleError(error)
  }
}
