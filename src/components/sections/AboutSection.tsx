import { Card, CardContent } from '@/components/ui/card'
import { Dumbbell, Globe, GraduationCap, Package } from 'lucide-react'

export function AboutSection() {
  const stats = [
    {
      icon: Dumbbell,
      value: '456AF',
      label: 'Training Programs',
    },
    {
      icon: Globe,
      value: 'Club456',
      label: 'Global Community',
    },
    {
      icon: GraduationCap,
      value: 'ProAF University',
      label: 'Certification Academy',
    },
    {
      icon: Package,
      value: '456Customs',
      label: 'Premium Gear',
    },
  ]

  return (
    <section className="py-20 md:py-32">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              This is 456AF
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground">
              <p>
                <strong>Listen up.</strong>
              </p>
              <p>
                456AF was founded in 2025 by Head Coach Matthew Alarcon in Orlando, FL, with one mission: build athletes who perform, not posers who take mirror selfies between sets.
              </p>
              <p>
                This isn&apos;t a place to &ldquo;find yourself.&rdquo; You&apos;re not here for vibes. You&apos;re here because you&apos;re ready to put in work that actually moves the needle—and you want coaches who know the difference between training and just sweating.
              </p>
              <p>
                We run a full ecosystem: elite coaching programs, ProAFU certification academy for those ready to lead, and Club456—a community where accountability isn&apos;t optional and excuses get left at the door.
              </p>
              <p>
                Your comfort zone? Not our concern. Your results? That&apos;s the only thing that matters.
              </p>
              <p>
                So if you&apos;re ready to stop playing and start performing, welcome to the team.
              </p>
              <p>
                If not, there&apos;s a smoothie bar down the street. They&apos;d love to have you.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                  <stat.icon 
                    className="mb-4 h-12 w-12 transition-all duration-300" 
                    style={{ color: 'var(--gold-600)' }}
                  />
                  <div 
                    className="mb-2 text-4xl font-bold transition-all duration-300" 
                    style={{ color: 'var(--grey-200)' }}
                  >
                    {stat.value}
                  </div>
                  <div 
                    className="text-sm transition-all duration-300" 
                    style={{ color: 'var(--grey-400)' }}
                  >
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
