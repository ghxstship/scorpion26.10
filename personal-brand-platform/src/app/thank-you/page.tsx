import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { CheckCircle } from 'lucide-react'

export default function ThankYouPage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 text-center">
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
        <h1 className="text-4xl font-bold mb-4">Thank You!</h1>
        <p className="text-xl text-gray-600 mb-8">
          Your order has been successfully processed.
        </p>
        <p className="text-gray-600 mb-8">
          You will receive a confirmation email shortly with your order details.
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild>
            <Link href="/account">View My Account</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
