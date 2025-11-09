import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Zap } from 'lucide-react'

/**
 * Spartan Warrior Hero Section
 * Massive bold typography with dramatic red CTAs and gold accents
 */
export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[var(--grey-950)] py-24 md:py-32 lg:py-40">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#D4AF37_1px,transparent_1px),linear-gradient(to_bottom,#D4AF37_1px,transparent_1px)] bg-[size:40px_40px]"
        aria-hidden="true"
      />
      
      {/* Red Glow Effect */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[var(--red-700)] opacity-10 blur-[120px] rounded-full"
        aria-hidden="true"
      />

      <div className="container relative z-10 px-6">
        <div className="mx-auto max-w-5xl text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-sm border-2 border-[var(--gold-600)] bg-[var(--grey-900)] px-4 py-2 text-sm font-bold uppercase tracking-wide text-[var(--gold-600)]">
            <Zap className="h-4 w-4" />
            Elite Performance Training
          </div>

          {/* Main Heading */}
          <h1 className="mb-8 font-[family-name:var(--font-bebas)] text-6xl font-black uppercase leading-[0.9] tracking-wider text-[var(--grey-100)] sm:text-7xl md:text-8xl lg:text-9xl">
            Forge Your
            <span className="block bg-gradient-to-r from-[var(--red-600)] via-[var(--red-700)] to-[var(--red-800)] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(181,0,0,0.5)]">
              Warrior Spirit
            </span>
          </h1>

          {/* Subheading */}
          <p className="mb-12 text-lg leading-relaxed text-[var(--grey-300)] sm:text-xl md:text-2xl lg:text-3xl">
            Join <span className="font-bold text-[var(--gold-600)]">456Pro</span> and experience elite fitness training designed by{' '}
            <span className="font-bold text-[var(--grey-100)]">Head Coach Matthew Alarcon</span>.
            <br className="hidden md:block" />
            From lifestyle to athlete-level programs, we have the path to your peak performance.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-6">
            <Button size="lg" asChild>
              <Link href="/products">
                Explore Programs
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/about">Learn More</Link>
            </Button>
          </div>

          {/* Stats Bar */}
          <div className="mt-16 grid grid-cols-1 gap-8 border-t border-[var(--grey-800)] pt-12 sm:grid-cols-3">
            <div className="space-y-2">
              <div className="font-[family-name:var(--font-bebas)] text-5xl font-black text-[var(--gold-600)]">
                10+
              </div>
              <div className="text-sm uppercase tracking-wide text-[var(--grey-400)]">
                Years Experience
              </div>
            </div>
            <div className="space-y-2">
              <div className="font-[family-name:var(--font-bebas)] text-5xl font-black text-[var(--gold-600)]">
                1000+
              </div>
              <div className="text-sm uppercase tracking-wide text-[var(--grey-400)]">
                Lives Transformed
              </div>
            </div>
            <div className="space-y-2">
              <div className="font-[family-name:var(--font-bebas)] text-5xl font-black text-[var(--gold-600)]">
                100%
              </div>
              <div className="text-sm uppercase tracking-wide text-[var(--grey-400)]">
                Commitment to Excellence
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
