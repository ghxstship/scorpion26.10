import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { GraduationCap, Users, Package } from 'lucide-react'

/**
 * The 456AF Ecosystem Section
 * Showcases ProAFU, Club456, and 456Customs
 */
export function AboutSection() {
  const ecosystem = [
    {
      icon: GraduationCap,
      name: 'ProAFU',
      description: 'Our Trainer Certification Academy. We\'re not just building athletes—we\'re building the coaches who build athletes. Rigorous, proven methodology. Graduate ready to lead, or don\'t graduate at all.',
      href: '/456prou',
    },
    {
      icon: Users,
      name: 'Club456',
      description: 'The inner circle. Connect with people who actually show up, share what\'s working, and keep each other honest. This isn\'t a Facebook group for inspiration quotes. It\'s accountability with teeth.',
      href: '/community',
    },
    {
      icon: Package,
      name: '456Customs',
      description: 'Gear that works as hard as you do. Premium equipment and apparel designed specifically for 456AF training. No fluff, no branding for branding\'s sake—just tools built for results.',
      href: '/customs',
    },
  ]

  return (
    <section className="bg-[var(--grey-950)] py-24 md:py-32">
      <div className="container px-6">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-[family-name:var(--font-bebas)] text-5xl font-black uppercase tracking-wider text-[var(--grey-100)] md:text-6xl lg:text-7xl">
            The 456AF <span className="text-[var(--gold-600)]">Ecosystem</span>
          </h2>
        </div>

        {/* Ecosystem Grid */}
        <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
          {ecosystem.map((item) => {
            const Icon = item.icon
            return (
              <Card key={item.name} className="group flex flex-col">
                <CardHeader>
                  <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-sm border-2 border-[var(--gold-600)] bg-[var(--grey-900)] transition-all duration-300 group-hover:bg-[var(--gold-600)] group-hover:shadow-[var(--glow-gold)]">
                    <Icon className="h-8 w-8 text-[var(--gold-600)] transition-colors group-hover:text-[var(--grey-950)]" />
                  </div>
                  <CardTitle className="text-2xl">{item.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <p className="text-[var(--grey-300)] leading-relaxed flex-1">
                    {item.description}
                  </p>
                  <div className="mt-6">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={item.href}>Learn More</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
