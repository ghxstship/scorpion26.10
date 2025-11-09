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
          About <span className="text-[var(--gold-600)]">456Pro</span>
        </h1>
        <AboutSection />
        
        <div className="mt-24">
          <h2 className="mb-12 text-center font-[family-name:var(--font-bebas)] text-5xl font-black uppercase tracking-wider text-[var(--grey-100)] md:text-6xl">
            Our Fitness Brand <span className="text-[var(--gold-600)]">Verticals</span>
          </h2>
          <div className="grid gap-8 md:grid-cols-3 mb-16">
            <Card>
              <CardHeader>
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-sm border-2 border-[var(--red-700)] bg-[var(--grey-900)]">
                  <Dumbbell className="h-8 w-8 text-[var(--red-700)]" />
                </div>
                <CardTitle>456Pro Lifestyle</CardTitle>
                <p className="text-sm font-bold uppercase tracking-wide text-[var(--gold-600)]">Tier 1</p>
              </CardHeader>
              <CardContent>
                <p className="text-[var(--grey-300)]">
                  Your foundation for sustainable fitness. Perfect for beginners and those
                  looking to establish healthy habits and build a fitness lifestyle.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-sm border-2 border-[var(--red-700)] bg-[var(--grey-900)]">
                  <Dumbbell className="h-8 w-8 text-[var(--red-700)]" />
                </div>
                <CardTitle>456Pro Strength</CardTitle>
                <p className="text-sm font-bold uppercase tracking-wide text-[var(--gold-600)]">Tier 2</p>
              </CardHeader>
              <CardContent>
                <p className="text-[var(--grey-300)]">
                  Build power and performance. Designed for intermediate athletes ready to
                  take their training to the next level with focused strength development.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-sm border-2 border-[var(--red-700)] bg-[var(--grey-900)]">
                  <Dumbbell className="h-8 w-8 text-[var(--red-700)]" />
                </div>
                <CardTitle>456Pro Athlete</CardTitle>
                <p className="text-sm font-bold uppercase tracking-wide text-[var(--gold-600)]">Tier 3</p>
              </CardHeader>
              <CardContent>
                <p className="text-[var(--grey-300)]">
                  Elite training for peak performance. Our highest tier for serious athletes
                  committed to achieving championship-level results.
                </p>
              </CardContent>
            </Card>
          </div>

          <h2 className="mb-12 text-center font-[family-name:var(--font-bebas)] text-5xl font-black uppercase tracking-wider text-[var(--grey-100)] md:text-6xl">
            The 456Pro <span className="text-[var(--gold-600)]">Ecosystem</span>
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <Card>
              <CardHeader>
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-sm border-2 border-[var(--gold-600)] bg-[var(--grey-900)]">
                  <GraduationCap className="h-8 w-8 text-[var(--gold-600)]" />
                </div>
                <CardTitle>456ProU</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[var(--grey-300)]">
                  Our Trainer Certification Academy. 456Pro University (456ProU) trains the
                  next generation of elite fitness coaches with our proven methodologies.
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
                  Our vibrant community brand. Join Club456 to connect with like-minded
                  fitness enthusiasts, share your journey, and stay motivated.
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
                  Our signature customized fitness product line. Premium gear and equipment
                  designed specifically for the 456Pro training methodology.
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
              Based in Orlando, FL, Matthew Alarcon founded 456Pro in 2025 with a vision to
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
