import Link from 'next/link'
import { Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'

/**
 * 404 Not Found Page - Spartan Warrior Design
 * Custom error page with brand styling
 */
export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--grey-950)] p-8 text-center">
      <Shield className="mb-8 h-24 w-24 text-[var(--gold-600)]" aria-hidden="true" />
      <h1 className="mb-4 font-[family-name:var(--font-bebas)] text-7xl font-black uppercase tracking-wider text-[var(--grey-100)] md:text-8xl lg:text-9xl">
        404
      </h1>
      <h2 className="mb-6 font-[family-name:var(--font-bebas)] text-3xl font-bold uppercase tracking-wide text-[var(--gold-600)] md:text-4xl">
        Page Not Found
      </h2>
      <p className="mb-12 max-w-md text-lg text-[var(--grey-300)]">
        This page has gone AWOL. Return to base or contact command for assistance.
      </p>
      <div className="flex flex-col gap-4 sm:flex-row">
        <Button asChild size="lg">
          <Link href="/">Return to Base</Link>
        </Button>
        <Button variant="secondary" asChild size="lg">
          <Link href="/contact">Contact Command</Link>
        </Button>
      </div>
    </div>
  )
}
