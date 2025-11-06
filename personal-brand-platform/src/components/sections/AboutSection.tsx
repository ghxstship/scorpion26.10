import { Card, CardContent } from '@/components/ui/card'
import { Award, Users, BookOpen, Target } from 'lucide-react'

export function AboutSection() {
  const stats = [
    {
      icon: Award,
      value: '25+',
      label: 'Years of Experience',
    },
    {
      icon: Users,
      value: '10K+',
      label: 'Lives Transformed',
    },
    {
      icon: BookOpen,
      value: '5',
      label: 'Bestselling Books',
    },
    {
      icon: Target,
      value: '100+',
      label: 'Corporate Clients',
    },
  ]

  return (
    <section className="py-20 md:py-32">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              About the Journey
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground">
              <p>
                For over two decades, I&apos;ve dedicated my life to understanding what separates
                the good from the great. Through working with elite performers, championship
                teams, and industry leaders, I&apos;ve developed a proven methodology for achieving
                excellence.
              </p>
              <p>
                My approach combines cutting-edge psychology, performance science, and real-world
                experience to help individuals and organizations unlock their full potential.
              </p>
              <p>
                Whether you&apos;re an athlete, executive, entrepreneur, or someone committed to
                personal growth, my programs provide the tools and mindset shifts needed to
                achieve breakthrough results.
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
