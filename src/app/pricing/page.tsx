import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check, Flame, Dumbbell, Trophy, ArrowRight } from 'lucide-react'

/**
 * Pricing Page - 456AF Fitness Verticals & Programs
 * Vertical Launch Fees + Monthly Program Pricing
 */

const verticals = [
  {
    id: 'lifestyle',
    name: '456 Lifestyle',
    tier: 'Tier 1',
    intensity: 'Moderate',
    launchFee: 150,
    icon: Flame,
    description: 'Your foundation for sustainable fitness. Build habits that last.',
    features: [
      'Fitness assessment',
      'Goal setting session',
      'Custom vertical programming',
      'Movement library access',
    ],
    color: 'grey',
  },
  {
    id: 'strength',
    name: '456 Strength',
    tier: 'Tier 2',
    intensity: 'Advanced',
    launchFee: 250,
    icon: Dumbbell,
    description: 'Serious training for serious lifters. Build real strength and power.',
    features: [
      'Advanced fitness assessment',
      'Strength testing',
      'Periodized programming',
      'Technique video analysis',
      'Nutrition consultation',
    ],
    color: 'red',
  },
  {
    id: 'athlete',
    name: '456 Athlete',
    tier: 'Tier 3',
    intensity: 'Professional',
    launchFee: 500,
    icon: Trophy,
    description: 'Elite performance optimization. Sport-specific training for professionals.',
    features: [
      'Comprehensive performance assessment',
      'VO2 max testing',
      'Body composition analysis',
      'Sport-specific programming',
      'Nutrition + supplement protocol',
      'Recovery optimization plan',
    ],
    color: 'gold',
  },
]

const programs = [
  {
    name: 'Basic_AF',
    price: 30,
    annualPrice: 300,
    description: 'Community access only',
    capacity: 'Unlimited',
  },
  {
    name: 'Strong_AF',
    price: 350,
    annualPrice: 3500,
    description: 'Virtual group training',
    capacity: '60 spots',
    sessionPrice: 200,
  },
  {
    name: 'Rare_AF',
    price: 800,
    annualPrice: 8000,
    description: 'Private 1-on-1 coaching',
    capacity: 'Only 6 slots',
    sessionPrice: 300,
  },
  {
    name: 'Far_AF',
    price: 50000,
    annualPrice: null,
    description: 'Residential program',
    capacity: '3 per year',
  },
]

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[var(--grey-950)]">
      <div className="container px-6 py-24">
        {/* Header */}
        <div className="mx-auto max-w-4xl text-center mb-20">
          <h1 className="mb-6 font-[family-name:var(--font-bebas)] text-6xl font-black uppercase tracking-wider text-[var(--grey-100)] md:text-7xl lg:text-8xl">
            456AF <span className="text-[var(--gold-600)]">Pricing</span>
          </h1>
          <p className="mb-4 text-lg text-[var(--grey-300)] md:text-xl">
            Step 1: Choose Your Vertical (One-time launch fee)
          </p>
          <p className="text-base text-[var(--grey-400)]">
            Step 2: Choose Your Program (Monthly subscription)
          </p>
        </div>

        {/* Fitness Verticals */}
        <section className="mb-32">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-[family-name:var(--font-bebas)] text-4xl font-black uppercase tracking-wider text-[var(--grey-100)] md:text-5xl">
              Step 1: <span className="text-[var(--gold-600)]">Choose Your Vertical</span>
            </h2>
            <p className="text-lg text-[var(--grey-400)]">
              One-time launch fee. Pick your intensity level.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {verticals.map((vertical) => {
              const Icon = vertical.icon
              
              return (
                <Card key={vertical.id} className="group flex flex-col">
                  <CardHeader>
                    {/* Tier Badge */}
                    <div className="mb-4 flex items-center justify-between">
                      <Badge variant="outline" className="border-[var(--gold-600)] text-[var(--gold-600)]">
                        {vertical.tier}
                      </Badge>
                      <span className="text-xs uppercase tracking-wider text-[var(--grey-500)]">
                        {vertical.intensity}
                      </span>
                    </div>

                    {/* Icon */}
                    <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-sm border-2 border-[var(--red-700)] bg-[var(--grey-900)] transition-all duration-300 group-hover:border-[var(--gold-600)] group-hover:bg-[var(--gold-600)] group-hover:shadow-[var(--glow-gold)]">
                      <Icon className="h-8 w-8 text-[var(--red-700)] transition-colors group-hover:text-[var(--grey-950)]" />
                    </div>

                    {/* Title */}
                    <CardTitle className="mb-3">{vertical.name}</CardTitle>
                    
                    {/* Description */}
                    <CardDescription className="text-base leading-relaxed">
                      {vertical.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="flex-1">
                    {/* Price */}
                    <div className="mb-6 border-b border-[var(--grey-800)] pb-6">
                      <div className="flex items-baseline gap-2">
                        <span className="font-[family-name:var(--font-bebas)] text-5xl font-black text-[var(--gold-600)]">
                          ${vertical.launchFee}
                        </span>
                        <span className="text-sm uppercase tracking-wide text-[var(--grey-500)]">
                          one-time
                        </span>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-3">
                      {vertical.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-[var(--gold-600)]" />
                          <span className="text-sm text-[var(--grey-300)]">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Training Programs */}
        <section className="mb-32">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-[family-name:var(--font-bebas)] text-4xl font-black uppercase tracking-wider text-[var(--grey-100)] md:text-5xl">
              Step 2: <span className="text-[var(--gold-600)]">Choose Your Program</span>
            </h2>
            <p className="text-lg text-[var(--grey-400)]">
              Monthly subscription. All programs available across all verticals.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-[var(--gold-600)]">
                  <th className="p-4 text-left font-[family-name:var(--font-bebas)] text-2xl uppercase tracking-wider text-[var(--grey-100)]">
                    Program
                  </th>
                  <th className="p-4 text-left font-[family-name:var(--font-bebas)] text-2xl uppercase tracking-wider text-[var(--grey-100)]">
                    Monthly
                  </th>
                  <th className="p-4 text-left font-[family-name:var(--font-bebas)] text-2xl uppercase tracking-wider text-[var(--grey-100)]">
                    Annual
                  </th>
                  <th className="p-4 text-left font-[family-name:var(--font-bebas)] text-2xl uppercase tracking-wider text-[var(--grey-100)]">
                    Capacity
                  </th>
                  <th className="p-4"></th>
                </tr>
              </thead>
              <tbody>
                {programs.map((program, idx) => (
                  <tr 
                    key={program.name}
                    className={`border-b border-[var(--grey-800)] ${idx === 2 ? 'bg-[var(--grey-900)]' : ''}`}
                  >
                    <td className="p-4">
                      <div>
                        <p className="font-bold text-[var(--grey-100)]">{program.name}</p>
                        <p className="text-sm text-[var(--grey-400)]">{program.description}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        <p className="font-[family-name:var(--font-bebas)] text-3xl font-black text-[var(--gold-600)]">
                          ${program.price.toLocaleString()}
                        </p>
                        {program.sessionPrice && (
                          <p className="text-xs text-[var(--grey-500)]">
                            + ${program.sessionPrice}/session
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      {program.annualPrice ? (
                        <div>
                          <p className="font-bold text-[var(--grey-100)]">
                            ${program.annualPrice.toLocaleString()}
                          </p>
                          <p className="text-xs text-[var(--green-600)]">
                            Save ${(program.price * 2).toLocaleString()}
                          </p>
                        </div>
                      ) : (
                        <p className="text-sm text-[var(--grey-500)]">N/A</p>
                      )}
                    </td>
                    <td className="p-4">
                      <Badge variant="outline" className="border-[var(--grey-600)] text-[var(--grey-300)]">
                        {program.capacity}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <Button asChild size="sm" variant="outline">
                        <Link href="/programs">
                          View Details
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Annual Discount Explainer */}
        <section className="mb-32">
          <div className="rounded-sm border-2 border-[var(--green-600)] bg-[var(--grey-900)] p-12 text-center md:p-16">
            <h2 className="mb-6 font-[family-name:var(--font-bebas)] text-4xl font-black uppercase tracking-wider text-[var(--grey-100)] md:text-5xl">
              Annual Commitment = <span className="text-[var(--green-600)]">2 Months Free</span>
            </h2>
            <p className="mb-8 text-lg text-[var(--grey-300)]">
              Pay for 10 months, get 12. That is a 16.67% discount for committing to your transformation.
            </p>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-sm border border-[var(--grey-700)] bg-[var(--grey-950)] p-6">
                <p className="mb-2 text-sm uppercase tracking-wider text-[var(--grey-500)]">Basic_AF</p>
                <p className="font-[family-name:var(--font-bebas)] text-3xl font-black text-[var(--green-600)]">
                  Save $60
                </p>
              </div>
              <div className="rounded-sm border border-[var(--grey-700)] bg-[var(--grey-950)] p-6">
                <p className="mb-2 text-sm uppercase tracking-wider text-[var(--grey-500)]">Strong_AF</p>
                <p className="font-[family-name:var(--font-bebas)] text-3xl font-black text-[var(--green-600)]">
                  Save $700
                </p>
              </div>
              <div className="rounded-sm border border-[var(--grey-700)] bg-[var(--grey-950)] p-6">
                <p className="mb-2 text-sm uppercase tracking-wider text-[var(--grey-500)]">Rare_AF</p>
                <p className="font-[family-name:var(--font-bebas)] text-3xl font-black text-[var(--green-600)]">
                  Save $1,600
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="rounded-sm border-2 border-[var(--gold-600)] bg-gradient-to-br from-[var(--grey-900)] to-[var(--grey-950)] p-12 text-center md:p-16">
          <h2 className="mb-6 font-[family-name:var(--font-bebas)] text-4xl font-black uppercase tracking-wider text-[var(--grey-100)] md:text-5xl">
            Ready to <span className="text-[var(--gold-600)]">Get Started?</span>
          </h2>
          <p className="mb-8 text-lg text-[var(--grey-300)]">
            Not sure which vertical or program is right for you? Get a free assessment.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" asChild>
              <Link href="/contact">Get Free Assessment</Link>
            </Button>
            <Button size="lg" asChild variant="outline">
              <Link href="/programs">View All Programs</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
