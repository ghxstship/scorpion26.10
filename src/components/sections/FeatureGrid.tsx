import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Target, Zap, Trophy, Users, Dumbbell, TrendingUp } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

/**
 * Spartan Warrior Feature Grid Component
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
    title: 'Precision Training',
    description: 'Scientifically-designed programs tailored to your specific goals and fitness level.',
  },
  {
    icon: Zap,
    title: 'Maximum Results',
    description: 'Proven methodologies that deliver measurable improvements in strength and performance.',
  },
  {
    icon: Trophy,
    title: 'Champion Mindset',
    description: 'Develop the mental fortitude and discipline of elite athletes through our coaching.',
  },
  {
    icon: Users,
    title: 'Elite Community',
    description: 'Join a brotherhood of warriors committed to excellence and mutual growth.',
  },
  {
    icon: Dumbbell,
    title: 'Expert Guidance',
    description: 'Learn from Head Coach Matthew Alarcon with 10+ years of elite training experience.',
  },
  {
    icon: TrendingUp,
    title: 'Continuous Progress',
    description: 'Track your evolution with data-driven insights and progressive overload principles.',
  },
]

export function FeatureGrid() {
  return (
    <section className="bg-[var(--grey-900)] py-24 md:py-32">
      <div className="container px-6">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-[family-name:var(--font-bebas)] text-5xl font-black uppercase tracking-wider text-[var(--grey-100)] md:text-6xl lg:text-7xl">
            Why Choose <span className="text-[var(--gold-600)]">456AF</span>
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-[var(--grey-300)] md:text-xl">
            Experience the difference that elite-level training and unwavering commitment can make in your fitness journey.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Card key={feature.title} className="group">
                <CardHeader>
                  <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-sm border-2 border-[var(--gold-600)] bg-[var(--grey-900)] transition-all duration-300 group-hover:bg-[var(--gold-600)] group-hover:shadow-[var(--glow-gold)]">
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
