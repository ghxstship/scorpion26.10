import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { OrderWithItems } from '@/types/database'

export default async function PurchasesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: orders } = await supabase
    .from('orders')
    .select('*, order_items(*, products(*))')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">My Purchases</h1>
        
        {!orders || orders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">You haven&apos;t made any purchases yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order: OrderWithItems) => (
              <div key={order.id} className="border rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="font-bold">Order #{order.id.slice(0, 8)}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">${order.total_amount}</p>
                    <p className="text-sm text-gray-600 capitalize">{order.status}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {order.order_items?.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>{item.products?.title}</span>
                      <span>x{item.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
