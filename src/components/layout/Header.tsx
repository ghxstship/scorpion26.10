'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

/**
 * Spartan Warrior Header Component
 * Black background with gold logo and red hover states
 */
export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Programs', href: '/products' },
    { name: '456AFU', href: '/university' },
    { name: 'Club456', href: '/community' },
    { name: '456Customs', href: '/customs' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--grey-800)] bg-black/95 backdrop-blur-lg">
      <nav className="container flex h-20 items-center justify-between px-6" aria-label="Main navigation" role="navigation">
        <div className="flex items-center gap-8 md:gap-12">
          <Link href="/" className="flex items-center space-x-2 group">
            <span className="font-[family-name:var(--font-bebas)] text-3xl font-black tracking-wider text-[var(--gold-600)] transition-colors hover:text-[var(--gold-500)]">
              456AF
            </span>
          </Link>
          <div className="hidden md:flex md:gap-8" role="menubar">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="font-[family-name:var(--font-bebas)] text-sm font-bold uppercase tracking-[0.05em] text-[var(--grey-200)] transition-all duration-200 hover:text-[var(--red-600)] border-b-3 border-transparent hover:border-[var(--red-600)] pb-1 aria-[current=page]:text-[var(--gold-600)] aria-[current=page]:border-[var(--gold-600)]"
                aria-current={item.href === '/' ? 'page' : undefined}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="tertiary" size="sm" asChild className="hidden md:inline-flex">
            <Link href="/login">Login</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/contact">Get Started</Link>
          </Button>
          <button
            type="button"
            className="md:hidden text-[var(--grey-200)] hover:text-[var(--gold-600)] transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? (
              <X className="h-7 w-7" aria-hidden="true" />
            ) : (
              <Menu className="h-7 w-7" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>
      {mobileMenuOpen && (
        <div className="md:hidden bg-[var(--grey-950)] border-t border-[var(--grey-800)]" id="mobile-menu" role="menu">
          <div className="space-y-1 px-6 py-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block rounded-sm px-4 py-3 font-[family-name:var(--font-bebas)] text-base font-bold uppercase tracking-wide text-[var(--grey-200)] transition-colors hover:bg-[var(--grey-800)] hover:text-[var(--red-600)] aria-[current=page]:text-[var(--gold-600)] aria-[current=page]:bg-[var(--grey-850)]"
                onClick={() => setMobileMenuOpen(false)}
                aria-current={item.href === '/' ? 'page' : undefined}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/login"
              className="block rounded-sm px-4 py-3 font-[family-name:var(--font-bebas)] text-base font-bold uppercase tracking-wide text-[var(--grey-200)] transition-colors hover:bg-[var(--grey-800)] hover:text-[var(--red-600)]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
