import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export function CTASection() {
  return (
    <section className="bg-[var(--grey-950)] py-24 md:py-32">
      <div className="container px-6">
        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-sm border-2 border-[var(--gold-600)] bg-[var(--grey-900)] px-8 py-16 text-center md:px-16 md:py-24">
          
          <div className="relative z-10 mx-auto max-w-3xl">
            <h2 className="mb-6 font-[family-name:var(--font-bebas)] text-4xl font-black uppercase tracking-wider text-[var(--grey-100)] sm:text-5xl md:text-6xl">
              Ready to Stop Making <span className="text-[var(--gold-600)]">Excuses?</span>
            </h2>
            <p className="mb-10 text-lg text-[var(--grey-300)] md:text-xl">
              Join the athletes who decided &ldquo;good enough&rdquo; wasn&apos;t good enough. Your first session is waiting.
            </p>
            <Button size="lg" asChild>
              <Link href="/pricing">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
          
          {/* Grid Pattern */}
          <div 
            className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#D4AF37_1px,transparent_1px),linear-gradient(to_bottom,#D4AF37_1px,transparent_1px)] bg-[size:40px_40px]"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  )
}
