import { AboutSection } from '@/components/sections/AboutSection'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dumbbell, Users, GraduationCap, Package } from 'lucide-react'

/**
 * About Page - Spartan Warrior Design
 * Showcases brand verticals, ecosystem, and founder story
 */
export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[var(--grey-950)]">
      <div className="container mx-auto px-6 py-24">
        <h1 className="mb-12 text-center font-[family-name:var(--font-bebas)] text-6xl font-black uppercase tracking-wider text-[var(--grey-100)] md:text-7xl lg:text-8xl">
          About <span className="text-[var(--gold-600)]">456AF</span>
        </h1>
        <AboutSection />
        
        <div className="mt-24">
          <h2 className="mb-12 text-center font-[family-name:var(--font-bebas)] text-5xl font-black uppercase tracking-wider text-[var(--grey-100)] md:text-6xl">
            The 456AF <span className="text-[var(--gold-600)]">Ecosystem</span>
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader>
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-sm border-2 border-[var(--gold-600)] bg-[var(--grey-900)]">
                  <Dumbbell className="h-8 w-8 text-[var(--gold-600)]" />
                </div>
                <CardTitle>456AF</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[var(--grey-300)]">
                  The core training brand. Four programs designed to meet you where you are and push you where you need to go. No fluff, no filler—just results.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-sm border-2 border-[var(--gold-600)] bg-[var(--grey-900)]">
                  <GraduationCap className="h-8 w-8 text-[var(--gold-600)]" />
                </div>
                <CardTitle>ProAFU</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[var(--grey-300)]">
                  Our Trainer Certification Academy. We&apos;re not just building athletes—we&apos;re building the coaches who build athletes. Rigorous, proven methodology. Graduate ready to lead, or don&apos;t graduate at all.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-sm border-2 border-[var(--gold-600)] bg-[var(--grey-900)]">
                  <Users className="h-8 w-8 text-[var(--gold-600)]" />
                </div>
                <CardTitle>Club456</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[var(--grey-300)]">
                  The inner circle. Connect with people who actually show up, share what&apos;s working, and keep each other honest. This isn&apos;t a Facebook group for inspiration quotes. It&apos;s accountability with teeth.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-sm border-2 border-[var(--gold-600)] bg-[var(--grey-900)]">
                  <Package className="h-8 w-8 text-[var(--gold-600)]" />
                </div>
                <CardTitle>456Customs</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[var(--grey-300)]">
                  Gear that works as hard as you do. Premium equipment and apparel designed specifically for 456AF training. No fluff, no branding for branding&apos;s sake—just tools built for results.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

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
