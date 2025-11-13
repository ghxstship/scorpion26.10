import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, Calendar, Dumbbell, MessageSquare, Trophy, Heart } from 'lucide-react'

/**
 * Club456 - Community Health & Wellness Initiative
 * The foundation of 456AF - community-driven fitness
 */

const benefits = [
  {
    icon: Users,
    title: 'Community Access',
    description: 'Join a community that actually shows up. No flakes. No excuses.',
  },
  {
    icon: Calendar,
    title: 'Group Workouts',
    description: 'Regular group training sessions. Accountability built in.',
  },
  {
    icon: Dumbbell,
    title: 'Basic Programming',
    description: 'Structured workouts that progress. Not random exercises.',
  },
  {
    icon: MessageSquare,
    title: 'Community Support',
    description: 'Private Slack channel. Ask questions. Share wins. Stay motivated.',
  },
  {
    icon: Trophy,
    title: 'Monthly Challenges',
    description: 'Compete with the community. Push your limits. Win prizes.',
  },
  {
    icon: Heart,
    title: 'Wellness Resources',
    description: 'Nutrition guides, recovery tips, mindset coaching. The whole package.',
  },
]

export default function Club456Page() {
  return (
    <main className="min-h-screen bg-[var(--grey-950)]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[var(--grey-900)] to-[var(--grey-950)] py-24 md:py-32">
        <div className="container px-6">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 font-[family-name:var(--font-bebas)] text-6xl font-black uppercase tracking-wider text-[var(--grey-100)] md:text-7xl lg:text-8xl">
              Club<span className="text-[var(--gold-600)]">456</span>
            </h1>
            <p className="mb-8 text-xl text-[var(--grey-300)] md:text-2xl">
              Community health & wellness. $30/month. Zero excuses.
            </p>
            <p className="mb-12 text-lg text-[var(--grey-400)]">
              The foundation of 456AF. Where everyone starts. Where community happens.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">Join Club456</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/programs">View All Programs</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-24">
        <div className="container px-6">
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-[family-name:var(--font-bebas)] text-4xl font-black uppercase tracking-wider text-[var(--grey-100)] md:text-5xl">
              What You <span className="text-[var(--gold-600)]">Actually Get</span>
            </h2>
            <p className="text-lg text-[var(--grey-400)]">
              For the price of a couple coffees. Seriously.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => {
              const Icon = benefit.icon
              return (
                <Card key={benefit.title} className="group">
                  <CardHeader>
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-sm border-2 border-[var(--red-700)] bg-[var(--grey-900)] transition-all duration-300 group-hover:border-[var(--gold-600)] group-hover:bg-[var(--gold-600)] group-hover:shadow-[var(--glow-gold)]">
                      <Icon className="h-6 w-6 text-[var(--red-700)] transition-colors group-hover:text-[var(--grey-950)]" />
                    </div>
                    <CardTitle className="text-xl">{benefit.title}</CardTitle>
                    <CardDescription className="text-base">
                      {benefit.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 bg-[var(--grey-900)]">
        <div className="container px-6">
          <div className="mx-auto max-w-3xl">
            <Card className="border-2 border-[var(--gold-600)]">
              <CardHeader className="text-center">
                <CardTitle className="mb-4 font-[family-name:var(--font-bebas)] text-5xl font-black uppercase tracking-wider">
                  BasicAF Pricing
                </CardTitle>
                <div className="mb-6">
                  <span className="font-[family-name:var(--font-bebas)] text-6xl font-black text-[var(--gold-600)]">
                    $30
                  </span>
                  <span className="ml-2 text-xl text-[var(--grey-500)]">/month</span>
                </div>
                <CardDescription className="text-lg">
                  Or $300/year (save $60 — 2 months free)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-sm border border-[var(--grey-700)] bg-[var(--grey-950)] p-6 text-center">
                  <p className="mb-4 text-lg font-bold text-[var(--grey-100)]">
                    Stop lurking. What are you waiting for?
                  </p>
                  <p className="mb-6 text-base text-[var(--grey-400)]">
                    It is literally $30. That is less than your streaming subscriptions you do not even watch.
                  </p>
                  <Button size="lg" className="w-full" asChild>
                    <Link href="/contact">Join Now</Link>
                  </Button>
                </div>

                <div className="text-center text-sm text-[var(--grey-500)]">
                  Cancel anytime. No contracts. No BS.
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Upgrade Path */}
      <section className="py-24">
        <div className="container px-6">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-6 font-[family-name:var(--font-bebas)] text-4xl font-black uppercase tracking-wider text-[var(--grey-100)] md:text-5xl">
              Ready for <span className="text-[var(--gold-600)]">More?</span>
            </h2>
            <p className="mb-12 text-lg text-[var(--grey-300)]">
              Club456 is just the beginning. When you are ready to level up, we have programs for that.
            </p>
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>StrongAF</CardTitle>
                  <CardDescription>Virtual group training</CardDescription>
                  <div className="mt-4">
                    <span className="font-[family-name:var(--font-bebas)] text-3xl font-black text-[var(--gold-600)]">
                      $350
                    </span>
                    <span className="text-sm text-[var(--grey-500)]">/mo</span>
                  </div>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>RareAF</CardTitle>
                  <CardDescription>Private 1-on-1 coaching</CardDescription>
                  <div className="mt-4">
                    <span className="font-[family-name:var(--font-bebas)] text-3xl font-black text-[var(--gold-600)]">
                      $800
                    </span>
                    <span className="text-sm text-[var(--grey-500)]">/mo</span>
                  </div>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>FarAF</CardTitle>
                  <CardDescription>Residential program</CardDescription>
                  <div className="mt-4">
                    <span className="font-[family-name:var(--font-bebas)] text-3xl font-black text-[var(--gold-600)]">
                      $50k
                    </span>
                    <span className="text-sm text-[var(--grey-500)]">/mo</span>
                  </div>
                </CardHeader>
              </Card>
            </div>
            <div className="mt-12">
              <Button size="lg" variant="outline" asChild>
                <Link href="/programs">View All Programs</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
