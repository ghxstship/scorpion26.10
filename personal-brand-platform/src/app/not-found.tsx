import Link from 'next/link'
import { FileQuestion } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex min-h-[600px] flex-col items-center justify-center p-8 text-center">
      <FileQuestion className="mb-4 h-16 w-16 text-muted-foreground" aria-hidden="true" />
      <h1 className="mb-2 text-3xl font-bold">404 - Page Not Found</h1>
      <p className="mb-6 max-w-md text-muted-foreground">
        Sorry, we couldn&apos;t find the page you&apos;re looking for. It may have been moved or deleted.
      </p>
      <div className="flex gap-4">
        <Button asChild>
          <Link href="/">Go home</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/contact">Contact support</Link>
        </Button>
      </div>
    </div>
  )
}
