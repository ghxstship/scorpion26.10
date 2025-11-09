import { Card, CardContent } from '@/components/ui/card'
import { Award, Users, BookOpen, Target } from 'lucide-react'

export function AboutSection() {
  const stats = [
    {
      icon: Award,
      value: '3',
      label: 'Fitness Verticals',
    },
    {
      icon: Users,
      value: '4',
      label: 'Training Programs',
    },
    {
      icon: BookOpen,
      value: '456ProU',
      label: 'Certification Academy',
    },
    {
      icon: Target,
      value: 'Club456',
      label: 'Community Brand',
    },
  ]

  return (
    <section className="py-20 md:py-32">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              The 456Pro Story
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground">
              <p>
                Founded in 2025 by Head Coach Matthew Alarcon in Orlando, FL, 456Pro represents
                a revolutionary approach to fitness training. Our umbrella brand encompasses three
                distinct verticals designed to meet you wherever you are on your fitness journey.
              </p>
              <p>
                <strong>456Pro Lifestyle</strong> (Tier 1) - Your foundation for sustainable fitness.<br />
                <strong>456Pro Strength</strong> (Tier 2) - Build power and performance.<br />
                <strong>456Pro Athlete</strong> (Tier 3) - Elite training for peak performance.
              </p>
              <p>
                From our community-focused BasicAF program to our exclusive EliteAF residential
                experiences, we provide comprehensive training solutions backed by our certification
                academy (456ProU) and supported by our vibrant Club456 community.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                  <stat.icon className="mb-4 h-12 w-12 text-primary" />
                  <div className="mb-2 text-4xl font-bold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
