import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { GraduationCap, Briefcase, Building2, Check, Calendar } from 'lucide-react'

/**
 * 456AFU - Trainer Certification Academy
 * Turn trainers into business owners
 */

const tiers = [
  {
    id: 'certification',
    name: 'Certification',
    tier: 'Tier 1',
    price: 8000,
    icon: GraduationCap,
    description: 'Get certified in the 456AF methodology. 30-day intensive course.',
    features: [
      '30-day intensive training',
      '456AF methodology certification',
      'Programming fundamentals',
      'Client assessment protocols',
      'Certificate upon completion',
      '3 cohorts per year',
    ],
    capacity: '10 students per cohort',
    cta: 'Apply for Certification',
  },
  {
    id: 'business',
    name: 'Business',
    tier: 'Tier 2',
    price: 15000,
    icon: Briefcase,
    description: 'Certification + business mentorship. Learn to train AND build a profitable business.',
    features: [
      'Everything in Certification tier',
      'Business mentorship program',
      'Marketing & sales training',
      'Client acquisition systems',
      'Pricing & packaging strategies',
      '6 months post-course support',
    ],
    capacity: '10 students per cohort',
    cta: 'Apply for Business Tier',
    highlight: true,
  },
  {
    id: 'elite',
    name: 'Elite',
    tier: 'Tier 3',
    price: 25000,
    icon: Building2,
    description: 'The full package. Certification, business training, and franchise opportunity.',
    features: [
      'Everything in Business tier',
      '456AF franchise license',
      'Branding & marketing materials',
      'Ongoing business support',
      'Revenue share opportunity',
      'Only 3 spots per year',
    ],
    capacity: 'Only 3 students per year',
    cta: 'Apply for Elite Tier',
  },
]

const cohortSchedule = [
  { quarter: 'Q1 2026', dates: 'January 15 - February 14', status: 'Applications Open' },
  { quarter: 'Q2 2026', dates: 'May 1 - May 31', status: 'Applications Open Soon' },
  { quarter: 'Q3 2026', dates: 'September 1 - September 30', status: 'Applications Open Soon' },
]

export default function ProUPage() {
  return (
    <main className="min-h-screen bg-[var(--grey-950)]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[var(--grey-900)] to-[var(--grey-950)] py-24 md:py-32">
        <div className="container px-6">
          <div className="mx-auto max-w-4xl text-center">
            <Badge className="mb-6 border-[var(--gold-600)] bg-[var(--grey-900)] text-[var(--gold-600)]" variant="outline">
              Trainer Certification Academy
            </Badge>
            <h1 className="mb-6 font-[family-name:var(--font-bebas)] text-6xl font-black uppercase tracking-wider text-[var(--grey-100)] md:text-7xl lg:text-8xl">
              456AF<span className="text-[var(--gold-600)]">U</span>
            </h1>
            <p className="mb-8 text-xl text-[var(--grey-300)] md:text-2xl">
              Stop working for someone else. Build your own fitness empire.
            </p>
            <p className="mb-12 text-lg text-[var(--grey-400)]">
              3 cohorts per year. Limited spots. Learn the 456AF methodology and how to actually make money as a trainer.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">Apply Now</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-24 bg-[var(--grey-900)]">
        <div className="container px-6">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-8 text-center font-[family-name:var(--font-bebas)] text-4xl font-black uppercase tracking-wider text-[var(--grey-100)] md:text-5xl">
              Most Trainers Are <span className="text-[var(--red-600)]">Broke</span>
            </h2>
            <div className="space-y-6 text-lg text-[var(--grey-300)]">
              <p>
                You got certified. Maybe even got a degree. You know how to train people. You are good at it.
              </p>
              <p>
                But you are still working at a big box gym making $20/hour. Or hustling for clients on Instagram with no system.
              </p>
              <p className="font-bold text-[var(--grey-100)]">
                The problem is not your training skills. It is your business skills.
              </p>
              <p>
                456AFU fixes that. We teach you the 456AF methodology AND how to build a profitable fitness business.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section id="pricing" className="py-24">
        <div className="container px-6">
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-[family-name:var(--font-bebas)] text-4xl font-black uppercase tracking-wider text-[var(--grey-100)] md:text-5xl">
              Choose Your <span className="text-[var(--gold-600)]">Path</span>
            </h2>
            <p className="text-lg text-[var(--grey-400)]">
              3 tiers. 3 cohorts per year. Limited spots.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {tiers.map((tier) => {
              const Icon = tier.icon
              return (
                <Card 
                  key={tier.id}
                  className={`flex flex-col ${tier.highlight ? 'border-2 border-[var(--gold-600)] shadow-[var(--glow-gold)]' : ''}`}
                >
                  <CardHeader>
                    <div className="mb-4 flex items-center justify-between">
                      <Badge variant="outline" className="border-[var(--gold-600)] text-[var(--gold-600)]">
                        {tier.tier}
                      </Badge>
                      <span className="text-xs uppercase tracking-wider text-[var(--grey-500)]">
                        {tier.capacity}
                      </span>
                    </div>

                    <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-sm border-2 border-[var(--red-700)] bg-[var(--grey-900)]">
                      <Icon className="h-8 w-8 text-[var(--red-700)]" />
                    </div>

                    <CardTitle className="mb-2 text-2xl">{tier.name}</CardTitle>
                    <CardDescription className="text-base">
                      {tier.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="flex-1">
                    <div className="mb-6 border-b border-[var(--grey-800)] pb-6">
                      <div className="flex items-baseline gap-2">
                        <span className="font-[family-name:var(--font-bebas)] text-5xl font-black text-[var(--gold-600)]">
                          ${tier.price.toLocaleString()}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-[var(--grey-500)]">
                        30-day intensive course
                      </p>
                    </div>

                    <div className="space-y-3">
                      {tier.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-[var(--gold-600)]" />
                          <span className="text-sm text-[var(--grey-300)]">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>

                  <CardFooter>
                    <Button 
                      asChild 
                      className="w-full" 
                      variant={tier.highlight ? 'default' : 'secondary'}
                    >
                      <Link href="/contact">{tier.cta}</Link>
                    </Button>
                  </CardFooter>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Cohort Schedule */}
      <section className="py-24 bg-[var(--grey-900)]">
        <div className="container px-6">
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 font-[family-name:var(--font-bebas)] text-4xl font-black uppercase tracking-wider text-[var(--grey-100)] md:text-5xl">
                2026 <span className="text-[var(--gold-600)]">Cohort Schedule</span>
              </h2>
              <p className="text-lg text-[var(--grey-400)]">
                3 cohorts per year. Applications reviewed on a rolling basis.
              </p>
            </div>

            <div className="space-y-6">
              {cohortSchedule.map((cohort) => (
                <Card key={cohort.quarter}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="mb-2">{cohort.quarter}</CardTitle>
                        <CardDescription className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {cohort.dates}
                        </CardDescription>
                      </div>
                      <Badge 
                        variant={cohort.status === 'Applications Open' ? 'default' : 'outline'}
                        className={cohort.status === 'Applications Open' ? 'bg-[var(--green-600)]' : ''}
                      >
                        {cohort.status}
                      </Badge>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Button size="lg" asChild>
                <Link href="/contact">Submit Application</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24">
        <div className="container px-6">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-12 text-center font-[family-name:var(--font-bebas)] text-4xl font-black uppercase tracking-wider text-[var(--grey-100)] md:text-5xl">
              Common <span className="text-[var(--gold-600)]">Questions</span>
            </h2>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Do I need to be certified already?</CardTitle>
                  <CardDescription className="text-base">
                    No. We will certify you in the 456AF methodology. If you have other certs, great. If not, no problem.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Is this online or in-person?</CardTitle>
                  <CardDescription className="text-base">
                    Hybrid. Online coursework + 1 week in-person intensive in Orlando.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>What if I am already a trainer?</CardTitle>
                  <CardDescription className="text-base">
                    Perfect. You will learn the 456AF system and how to scale your business. Most of our students are already training.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Can I get financing?</CardTitle>
                  <CardDescription className="text-base">
                    Yes. We offer payment plans. Contact us for details.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-[var(--grey-900)] to-[var(--grey-950)]">
        <div className="container px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 font-[family-name:var(--font-bebas)] text-4xl font-black uppercase tracking-wider text-[var(--grey-100)] md:text-5xl">
              Stop Working for <span className="text-[var(--gold-600)]">Someone Else</span>
            </h2>
            <p className="mb-12 text-lg text-[var(--grey-300)]">
              Applications are reviewed on a rolling basis. Limited spots available. Apply now.
            </p>
            <Button size="lg" asChild>
              <Link href="/contact">Submit Your Application</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
