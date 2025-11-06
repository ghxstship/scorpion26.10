import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default async function SettingsPage() {
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
      <div className="container mx-auto px-4 py-16 max-w-2xl">
        <h1 className="text-4xl font-bold mb-8">Account Settings</h1>
        
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <Input type="email" defaultValue={user.email} disabled />
            <p className="text-sm text-gray-500 mt-1">Email cannot be changed</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <Input 
              type="text" 
              defaultValue={(profile as any)?.full_name || ''} 
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Change Password</label>
            <Input type="password" placeholder="New password" />
          </div>

          <div className="flex gap-4">
            <Button type="submit">Save Changes</Button>
            <Button type="button" variant="outline">Cancel</Button>
          </div>
        </form>
      </div>
    </main>
  )
}
