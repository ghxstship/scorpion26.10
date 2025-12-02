import { AboutSection } from '@/components/sections/AboutSection'

/**
 * About Page - Spartan Warrior Design
 * Showcases brand story and founder info
 */
export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[var(--grey-950)]">
      <div className="container mx-auto px-6 py-24">
        <h1 className="mb-12 text-center font-[family-name:var(--font-bebas)] text-6xl font-black uppercase tracking-wider text-[var(--grey-100)] md:text-7xl lg:text-8xl">
          About <span className="text-[var(--gold-600)]">456AF</span>
        </h1>
        <AboutSection />

        <div className="mt-24 rounded-sm border-2 border-[var(--gold-600)] bg-[var(--grey-900)] p-12 md:p-16">
          <h2 className="mb-8 text-center font-[family-name:var(--font-bebas)] text-5xl font-black uppercase tracking-wider text-[var(--grey-100)] md:text-6xl">
            Meet Our <span className="text-[var(--gold-600)]">Founder</span>
          </h2>
          <div className="mx-auto max-w-3xl text-center">
            <h3 className="mb-2 font-[family-name:var(--font-bebas)] text-4xl font-bold uppercase tracking-wide text-[var(--grey-100)]">
              Matthew Alarcon
            </h3>
            <p className="mb-6 text-sm font-bold uppercase tracking-wider text-[var(--gold-600)]">
              Founder & Head Coach
            </p>
            <p className="text-lg leading-relaxed text-[var(--grey-300)]">
              Based in Orlando, FL, Matthew Alarcon founded 456AF in 2025 with a vision to
              revolutionize fitness training. With a comprehensive approach spanning three
              distinct verticals and four curated programs, Matthew has created a complete
              ecosystem for fitness transformation at every level.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
