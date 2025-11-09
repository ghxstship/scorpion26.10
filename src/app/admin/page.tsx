import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DollarSign, Users, ShoppingCart, Calendar } from 'lucide-react'

export default function AdminDashboard() {
  const stats = [
    {
      title: 'Total Revenue',
      value: '$45,231',
      change: '+20.1% from last month',
      icon: DollarSign,
    },
    {
      title: 'Customers',
      value: '2,350',
      change: '+180 new this month',
      icon: Users,
    },
    {
      title: 'Orders',
      value: '348',
      change: '+12% from last month',
      icon: ShoppingCart,
    },
    {
      title: 'Bookings',
      value: '89',
      change: '+8 this week',
      icon: Calendar,
    },
  ]

  const recentOrders = [
    { id: 1001, customer: 'John Smith', amount: 299.99, status: 'Completed' },
    { id: 1002, customer: 'Sarah Johnson', amount: 149.50, status: 'Completed' },
    { id: 1003, customer: 'Mike Chen', amount: 499.00, status: 'Completed' },
    { id: 1004, customer: 'Emily Davis', amount: 199.99, status: 'Completed' },
    { id: 1005, customer: 'Alex Brown', amount: 349.00, status: 'Completed' },
  ]

  const upcomingBookings = [
    { id: 1, client: 'Robert Wilson', date: '2024-01-15', time: '2:00 PM' },
    { id: 2, client: 'Lisa Anderson', date: '2024-01-16', time: '10:00 AM' },
    { id: 3, client: 'David Martinez', date: '2024-01-17', time: '3:00 PM' },
    { id: 4, client: 'Jennifer Taylor', date: '2024-01-18', time: '1:00 PM' },
    { id: 5, client: 'Michael Lee', date: '2024-01-19', time: '11:00 AM' },
  ]

  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here&apos;s an overview of your business.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>
              You have 12 new orders this week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                  <div>
                    <p className="font-medium">Order #{order.id}</p>
                    <p className="text-sm text-muted-foreground">
                      {order.customer}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${order.amount.toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground">{order.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Bookings</CardTitle>
            <CardDescription>
              You have 8 bookings scheduled this week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                  <div>
                    <p className="font-medium">Coaching Session</p>
                    <p className="text-sm text-muted-foreground">
                      {booking.client}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      {booking.date}
                    </p>
                    <p className="text-sm text-muted-foreground">{booking.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
