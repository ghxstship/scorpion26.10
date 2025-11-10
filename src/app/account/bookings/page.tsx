import { redirect } from 'next/navigation'
export const dynamic = 'force-dynamic'

import { createClient } from '@/lib/supabase/server'
import type { BookingWithDetails } from '@/types/database'

export default async function BookingsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: bookings } = await supabase
    .from('bookings')
    .select('*, products(*)')
    .eq('user_id', user.id)
    .order('booking_date', { ascending: true })

  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">My Bookings</h1>
        
        {!bookings || bookings.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">You don&apos;t have any bookings yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking: BookingWithDetails) => (
              <div key={booking.id} className="border rounded-lg p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold">{booking.products?.title}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(booking.booking_date).toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600">
                      Duration: {booking.duration_minutes} minutes
                    </p>
                  </div>
                  <div>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                      booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
