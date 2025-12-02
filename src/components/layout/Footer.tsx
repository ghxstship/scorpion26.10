import Link from 'next/link'
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/ui/Logo'

/**
 * Spartan Warrior Footer Component
 * Black background with gold accents and organized link sections
 */
export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t-2 border-[var(--gold-600)] bg-[var(--grey-950)]">
      <div className="container py-16 md:py-20 px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Brand Section */}
          <div className="space-y-6">
            <Logo size="lg" />
            <p className="text-sm text-[var(--grey-300)] leading-relaxed">
              We don&apos;t do average. Neither should you.
            </p>
            <p className="text-sm text-[var(--grey-400)] font-bold">
              📍 Orlando, FL | Est. 2025
            </p>
            <div className="flex gap-4 pt-2">
              <Link 
                href="#" 
                className="text-[var(--grey-400)] hover:text-[var(--gold-600)] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-6 w-6" />
              </Link>
              <Link 
                href="#" 
                className="text-[var(--grey-400)] hover:text-[var(--gold-600)] transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-6 w-6" />
              </Link>
              <Link 
                href="#" 
                className="text-[var(--grey-400)] hover:text-[var(--gold-600)] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </Link>
              <Link 
                href="#" 
                className="text-[var(--grey-400)] hover:text-[var(--gold-600)] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </Link>
              <Link 
                href="#" 
                className="text-[var(--grey-400)] hover:text-[var(--gold-600)] transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-6 w-6" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-6 font-[family-name:var(--font-bebas)] text-lg font-bold uppercase tracking-wide text-[var(--grey-100)]">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about" className="text-[var(--grey-300)] hover:text-[var(--gold-600)] transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-[var(--grey-300)] hover:text-[var(--gold-600)] transition-colors">
                  Training Programs
                </Link>
              </li>
              <li>
                <Link href="/university" className="text-[var(--grey-300)] hover:text-[var(--gold-600)] transition-colors">
                  ProAF University
                </Link>
              </li>
              <li>
                <Link href="/community" className="text-[var(--grey-300)] hover:text-[var(--gold-600)] transition-colors">
                  Club456
                </Link>
              </li>
              <li>
                <Link href="/customs" className="text-[var(--grey-300)] hover:text-[var(--gold-600)] transition-colors">
                  456Customs
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-[var(--grey-300)] hover:text-[var(--gold-600)] transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="mb-6 font-[family-name:var(--font-bebas)] text-lg font-bold uppercase tracking-wide text-[var(--grey-100)]">
              Resources
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/contact" className="text-[var(--grey-300)] hover:text-[var(--gold-600)] transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-[var(--grey-300)] hover:text-[var(--gold-600)] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-[var(--grey-300)] hover:text-[var(--gold-600)] transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="mb-6 font-[family-name:var(--font-bebas)] text-lg font-bold uppercase tracking-wide text-[var(--grey-100)]">
              Newsletter
            </h4>
            <p className="mb-6 text-sm text-[var(--grey-300)] leading-relaxed">
              Subscribe to get the latest updates and insights.
            </p>
            <form className="space-y-3">
              <Input
                type="email"
                placeholder="YOUR EMAIL"
                className="w-full"
              />
              <Button
                type="submit"
                size="sm"
                className="w-full"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-[var(--grey-800)] pt-8 text-center">
          <p className="text-sm text-[var(--grey-400)]">
            &copy; {currentYear} <span className="text-[var(--gold-600)] font-bold">456AF</span>. All rights reserved. | Founded by <span className="text-[var(--grey-200)]">Matthew Alarcon</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
