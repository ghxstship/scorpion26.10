import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Target, TrendingUp, Brain, Users, Dumbbell, BarChart3 } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

/**
 * Why 456AF Feature Grid Component
 * Dark cards with gold icons and hover effects
 */

interface Feature {
  icon: LucideIcon
  title: string
  description: string
}

const features: Feature[] = [
  {
    icon: Target,
    title: 'Precision Programming',
    description: 'Science-backed, goal-specific training built for results—not for Instagram. We don\'t do random, and we don\'t do "just winging it."',
  },
  {
    icon: TrendingUp,
    title: 'Measurable Results',
    description: 'Our methodologies are built on data, not whatever\'s trending this week. You\'ll see the progress in your numbers. Your gym crush will notice too.',
  },
  {
    icon: Brain,
    title: 'Mental Discipline',
    description: 'Talent gets you in the door. Discipline keeps you there. We build the focus and resilience that separate people who talk from people who perform.',
  },
  {
    icon: Users,
    title: 'Committed Community',
    description: 'Athletes who show up, put in work, and don\'t need a pep talk every five minutes. Support? Yes. Coddling? Find another program.',
  },
  {
    icon: Dumbbell,
    title: 'World-Class Coaching',
    description: 'Head Coach Matthew Alarcon brings 10+ years of elite experience. This isn\'t advice from someone who "did research." It\'s coaching from someone who\'s done the reps.',
  },
  {
    icon: BarChart3,
    title: 'Data-Driven Progress',
    description: 'Track everything. Know your baselines, hit your benchmarks, own your trajectory. If you\'re guessing, you\'re already behind.',
  },
]

export function FeatureGrid() {
  return (
    <section className="bg-[var(--grey-900)] py-24 md:py-32">
      <div className="container px-6">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-[family-name:var(--font-bebas)] text-4xl font-black uppercase tracking-wider text-[var(--grey-100)] md:text-5xl">
            Why <span className="text-[var(--gold-600)]">456AF?</span>
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-[var(--grey-300)] md:text-xl">
            Elite training. Measurable results. Zero hand-holding.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Card key={feature.title} className="group">
                <CardHeader>
                  <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-sm border-2 border-[var(--gold-600)] bg-[var(--grey-900)] transition-all duration-300 group-hover:bg-[var(--gold-600)] ">
                    <Icon className="h-8 w-8 text-[var(--gold-600)] transition-colors group-hover:text-[var(--grey-950)]" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
