import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

/**
 * 456AF Hero Section
 * Bold, direct messaging with 456AF brand voice
 */
export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[var(--grey-950)] py-24 md:py-32 lg:py-40">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#D4AF37_1px,transparent_1px),linear-gradient(to_bottom,#D4AF37_1px,transparent_1px)] bg-[size:40px_40px]"
        aria-hidden="true"
      />
      

      <div className="container relative z-10 px-6">
        <div className="mx-auto max-w-5xl text-center">
          {/* Main Heading */}
          <h1 className="mb-8 text-6xl font-black uppercase leading-[0.9] tracking-wider text-[var(--grey-100)] sm:text-7xl md:text-8xl lg:text-9xl">
            Caution:
            <span className="block bg-gradient-to-r from-[var(--red-600)] via-[var(--red-700)] to-[var(--red-800)] bg-clip-text text-transparent">
              Mediocrity-Free Zone
            </span>
          </h1>

          {/* Subheading */}
          <p className="mb-12 text-lg leading-relaxed text-[var(--grey-300)] sm:text-xl md:text-2xl lg:text-3xl">
            Pro training. Real results. No excuses.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-6">
            <Button size="lg" asChild>
              <Link href="/programs">
                View Programs
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/pricing">See Pricing</Link>
            </Button>
          </div>

          {/* Stats Bar */}
          <div className="mt-16 grid grid-cols-2 gap-6 border-t border-[var(--grey-800)] pt-12 sm:grid-cols-5">
            <div className="space-y-2 text-center">
              <div className="font-[family-name:var(--font-anton)] text-5xl font-black text-[var(--gold-600)]">
                4
              </div>
              <div className="text-sm uppercase tracking-wide text-[var(--grey-400)]">
                Training Programs
              </div>
            </div>
            <div className="space-y-2 text-center">
              <div className="font-[family-name:var(--font-anton)] text-5xl font-black text-[var(--gold-600)]">
                3
              </div>
              <div className="text-sm uppercase tracking-wide text-[var(--grey-400)]">
                Intensity Levels
              </div>
            </div>
            <div className="space-y-2 text-center">
              <div className="font-[family-name:var(--font-anton)] text-5xl font-black text-[var(--gold-600)]">
                2
              </div>
              <div className="text-sm uppercase tracking-wide text-[var(--grey-400)]">
                Choices
              </div>
            </div>
            <div className="space-y-2 text-center">
              <div className="font-[family-name:var(--font-anton)] text-5xl font-black text-[var(--gold-600)]">
                1
              </div>
              <div className="text-sm uppercase tracking-wide text-[var(--grey-400)]">
                Life
              </div>
            </div>
            <div className="space-y-2 text-center col-span-2 sm:col-span-1">
              <div className="font-[family-name:var(--font-anton)] text-5xl font-black text-[var(--gold-600)]">
                0
              </div>
              <div className="text-sm uppercase tracking-wide text-[var(--grey-400)]">
                Excuses
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
