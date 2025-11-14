import Link from 'next/link'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Users, Video, Zap, Crown, Check } from 'lucide-react'

/**
 * Programs Page - 456AF Training Programs
 * Choose Your Vertical → Choose Your Program → Checkout
 */

// 456AF Training Programs
const programs = [
  {
    id: 'basicaf',
    title: 'Basic_AF',
    tagline: 'Community Access Only',
    description: 'Stop lurking. Community access is literally $30. What\'s your excuse? Join Club456 and get access to group workouts, basic programming, and a community that actually shows up.',
    tier: 'Foundation',
    price: 30,
    priceLabel: '/month',
    capacity: null,
    capacityLabel: 'Unlimited',
    icon: Users,
    features: [
      'Club456 community access',
      'Group workouts',
      'Basic programming',
      'Community support',
      'Monthly challenges',
      'Workout library',
    ],
    cta: 'Join Basic_AF',
    highlight: false,
  },
  {
    id: 'strongaf',
    title: 'Strong_AF',
    tagline: 'Virtual Group Training',
    description: 'Virtual training that doesn\'t suck. 3 live group sessions per week, actual programming (not random workouts), and monthly check-ins. Plus in-person sessions when you need that extra push.',
    tier: 'Virtual',
    price: 350,
    priceLabel: '/month',
    sessionPrice: 200,
    capacity: 60,
    capacityLabel: '60 spots available',
    icon: Video,
    features: [
      '3 live virtual sessions/week',
      'Personalized programming',
      'Monthly video check-ins',
      'Progress tracking',
      'Private Slack community',
      'Optional in-person sessions ($200/session)',
    ],
    cta: 'Join Strong_AF',
    highlight: false,
  },
  {
    id: 'rareaf',
    title: 'Rare_AF',
    tagline: 'Private Personal Training',
    description: 'Elite 1-on-1 coaching. Only 6 slots available. Custom programming, weekly video analysis, and direct access to your coach. This isn\'t for everyone. That\'s the point.',
    tier: 'Elite',
    price: 800,
    priceLabel: '/month',
    sessionPrice: 300,
    capacity: 6,
    capacityLabel: 'Only 6 slots',
    icon: Zap,
    features: [
      '2 private sessions/week',
      '100% custom programming',
      'Weekly video analysis',
      'Direct coach access (text/call)',
      'Nutrition guidance',
      'In-person sessions available ($300/session)',
    ],
    cta: 'Apply for Rare_AF',
    highlight: true,
  },
  {
    id: 'faraf',
    title: 'Far_AF',
    tagline: 'Residential Program',
    description: 'The ultimate immersive experience. 3 clients per year. That\'s it. Live-in training at our Orlando facility or exclusive destination locations. Full lifestyle transformation. VIP everything.',
    tier: 'Ultimate',
    price: 50000,
    priceLabel: '/month',
    capacity: 3,
    capacityLabel: '3 clients per year',
    icon: Crown,
    features: [
      'Exclusive residency (Orlando or destination)',
      '24/7 trainer access',
      'Private chef & nutrition',
      'Luxury accommodations',
      'Full lifestyle management',
      'Recovery & wellness suite',
    ],
    cta: 'Inquire About Far_AF',
    highlight: false,
  },
]

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-[var(--grey-950)]">
      <div className="container px-6 py-24">
        {/* Header */}
        <div className="mx-auto max-w-4xl text-center mb-16">
          <h1 className="mb-6 font-[family-name:var(--font-bebas)] text-6xl font-black uppercase tracking-wider text-[var(--grey-100)] md:text-7xl lg:text-8xl">
            456AF Training <span className="text-[var(--gold-600)]">Programs</span>
          </h1>
          <p className="mb-4 text-lg text-[var(--grey-300)] md:text-xl">
            Choose Your Vertical → Choose Your Program → Checkout
          </p>
          <p className="text-base text-[var(--grey-400)]">
            From $30/month community access to $50k/month residential training. Pick your level.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid gap-8 md:grid-cols-2 mb-24">
          {programs.map((program) => {
            const Icon = program.icon
            const isHighlight = program.highlight
            
            return (
              <Card 
                key={program.id} 
                className={`group flex flex-col ${isHighlight ? 'border-2 border-[var(--gold-600)] shadow-[var(--glow-gold)]' : ''}`}
              >
                <CardHeader>
                  {/* Tier Badge & Capacity */}
                  <div className="mb-4 flex items-center justify-between gap-2">
                    <Badge variant="outline" className="border-[var(--gold-600)] text-[var(--gold-600)]">
                      {program.tier}
                    </Badge>
                    {program.capacity && (
                      <span className="text-xs uppercase tracking-wider text-[var(--grey-500)]">
                        {program.capacityLabel}
                      </span>
                    )}
                  </div>

                  {/* Icon */}
                  <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-sm border-2 border-[var(--red-700)] bg-[var(--grey-900)] transition-all duration-300 group-hover:border-[var(--gold-600)] group-hover:bg-[var(--gold-600)] group-hover:shadow-[var(--glow-gold)]">
                    <Icon className="h-8 w-8 text-[var(--red-700)] transition-colors group-hover:text-[var(--grey-950)]" />
                  </div>

                  {/* Title & Tagline */}
                  <CardTitle className="mb-2">{program.title}</CardTitle>
                  <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-[var(--grey-500)]">
                    {program.tagline}
                  </p>
                  
                  {/* Description */}
                  <CardDescription className="text-base leading-relaxed">
                    {program.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-1">
                  {/* Price */}
                  <div className="mb-6 border-b border-[var(--grey-800)] pb-6">
                    <div className="flex items-baseline gap-2">
                      <span className="font-[family-name:var(--font-bebas)] text-5xl font-black text-[var(--gold-600)]">
                        ${program.price.toLocaleString()}
                      </span>
                      <span className="text-sm uppercase tracking-wide text-[var(--grey-500)]">
                        {program.priceLabel}
                      </span>
                    </div>
                    {program.sessionPrice && (
                      <p className="mt-2 text-sm text-[var(--grey-400)]">
                        In-person sessions: ${program.sessionPrice}/session
                      </p>
                    )}
                  </div>

                  {/* Features */}
                  <div className="space-y-3">
                    {program.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-[var(--gold-600)]" />
                        <span className="text-sm text-[var(--grey-300)]">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>

                <CardFooter>
                  <Button asChild className="w-full" variant={isHighlight ? 'default' : 'secondary'}>
                    <Link href="/contact">{program.cta}</Link>
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>

        {/* Vertical Selection CTA */}
        <div className="mb-24 rounded-sm border-2 border-[var(--red-700)] bg-[var(--grey-900)] p-12 text-center md:p-16">
          <h2 className="mb-6 font-[family-name:var(--font-bebas)] text-4xl font-black uppercase tracking-wider text-[var(--grey-100)] md:text-5xl">
            First Time? <span className="text-[var(--gold-600)]">Choose Your Vertical</span>
          </h2>
          <p className="mb-8 text-lg text-[var(--grey-300)]">
            456 Lifestyle (Tier 1) → 456 Strength (Tier 2) → 456 Athlete (Tier 3)
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" asChild variant="outline">
              <Link href="/pricing">View Vertical Pricing</Link>
            </Button>
            <Button size="lg" asChild>
              <Link href="/contact">Get Assessment</Link>
            </Button>
          </div>
        </div>

        {/* 456AFU CTA */}
        <div className="rounded-sm border-2 border-[var(--gold-600)] bg-gradient-to-br from-[var(--grey-900)] to-[var(--grey-950)] p-12 text-center md:p-16">
          <h2 className="mb-6 font-[family-name:var(--font-bebas)] text-4xl font-black uppercase tracking-wider text-[var(--grey-100)] md:text-5xl">
            Want to <span className="text-[var(--gold-600)]">Become a Trainer?</span>
          </h2>
          <p className="mb-8 text-lg text-[var(--grey-300)]">
            456AFU certification academy. 3 cohorts per year. Limited spots.
          </p>
          <Button size="lg" asChild>
            <Link href="/456prou">Learn About 456AFU</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
