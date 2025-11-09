import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function AccountPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single()

  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">My Account</h1>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="bg-white border rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Profile</h2>
              <p className="text-gray-600 mb-2">
                <strong>Email:</strong> {user.email}
              </p>
              <p className="text-gray-600 mb-4">
                <strong>Name:</strong> {(profile && typeof profile === 'object' && 'full_name' in profile) ? String(profile.full_name) : 'Not set'}
              </p>
              <Button asChild className="w-full">
                <Link href="/account/settings">Edit Profile</Link>
              </Button>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="grid gap-6">
              <Link href="/account/purchases" className="border rounded-lg p-6 hover:border-black transition">
                <h3 className="text-xl font-bold mb-2">My Purchases</h3>
                <p className="text-gray-600">View your order history and downloads</p>
              </Link>

              <Link href="/account/bookings" className="border rounded-lg p-6 hover:border-black transition">
                <h3 className="text-xl font-bold mb-2">My Bookings</h3>
                <p className="text-gray-600">Manage your upcoming appointments</p>
              </Link>

              <Link href="/account/settings" className="border rounded-lg p-6 hover:border-black transition">
                <h3 className="text-xl font-bold mb-2">Settings</h3>
                <p className="text-gray-600">Update your account preferences</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
