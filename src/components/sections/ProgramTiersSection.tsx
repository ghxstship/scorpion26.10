import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

/**
 * Program Tiers Section
 * Showcases Rookie, Starter, and MVP tiers
 */
export function ProgramTiersSection() {
  const tiers = [
    {
      name: 'Rookie',
      description: 'Everyone starts somewhere. This is where you build the habits, learn the fundamentals, and prove you belong on the court. No ego, no shortcuts—just the foundation that everything else gets built on.',
      highlight: false,
    },
    {
      name: 'Starter',
      description: 'You\'ve earned your spot. Now it\'s time to push. Focused strength and performance training for athletes ready to stop riding the bench and start making an impact. This is where good becomes dangerous.',
      highlight: true,
    },
    {
      name: 'MVP',
      description: 'You don\'t get here by accident. Elite-level training for those chasing championship results. If you\'re not ready to be coached hard, held accountable, and outwork everyone in the room—stay on the bench a little longer.',
      highlight: false,
    },
  ]

  return (
    <section className="bg-[var(--grey-900)] py-24 md:py-32">
      <div className="container px-6">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-[family-name:var(--font-bebas)] text-5xl font-black uppercase tracking-wider text-[var(--grey-100)] md:text-6xl lg:text-7xl">
            Program <span className="text-[var(--gold-600)]">Tiers</span>
          </h2>
        </div>

        {/* Tiers Grid */}
        <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
          {tiers.map((tier) => (
            <Card 
              key={tier.name} 
              className={tier.highlight ? 'border-2 border-[var(--gold-600)] relative' : ''}
            >
              <CardHeader className="text-center">
                <CardTitle className="text-3xl">{tier.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[var(--grey-300)] leading-relaxed text-center">
                  {tier.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Button size="lg" asChild>
            <Link href="/pricing">View All Pricing</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
