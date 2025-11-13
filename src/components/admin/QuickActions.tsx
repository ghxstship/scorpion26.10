import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, Package, Calendar, Mail } from 'lucide-react'

const actions = [
  {
    title: 'New Product',
    description: 'Add a new product to your store',
    href: '/admin/products/new',
    icon: Package,
  },
  {
    title: 'New Blog Post',
    description: 'Write and publish a new article',
    href: '/admin/blog/new',
    icon: FileText,
  },
  {
    title: 'New Booking',
    description: 'Create a manual booking',
    href: '/admin/bookings/new',
    icon: Calendar,
  },
  {
    title: 'Send Email',
    description: 'Compose and send an email campaign',
    href: '/admin/emails/new',
    icon: Mail,
  },
]

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>
          Common tasks you can perform quickly
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-2">
        {actions.map((action) => (
          <Link key={action.title} href={action.href}>
            <Button
              variant="outline"
              className="w-full h-auto flex-col items-start p-4 gap-2"
            >
              <div className="flex items-center gap-2 w-full">
                <action.icon className="h-5 w-5" />
                <span className="font-semibold">{action.title}</span>
              </div>
              <span className="text-xs text-muted-foreground text-left">
                {action.description}
              </span>
            </Button>
          </Link>
        ))}
      </CardContent>
    </Card>
  )
}
