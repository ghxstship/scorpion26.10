import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Shirt, Dumbbell, ShoppingBag, Droplets, Users, Award, Lock, Package } from 'lucide-react'

export default function CustomsPage() {
  const valueProps = [
    {
      icon: Award,
      title: 'Built to Our Standards',
      description: 'Every product is crafted with premium materials and stress-tested by our coaching staff. If it can\'t survive a real session, it doesn\'t ship.',
    },
    {
      icon: Dumbbell,
      title: 'Designed for 456AF Training',
      description: 'This isn\'t generic gear with a logo slapped on it. Each product is purpose-built to support our methodology across all tiers.',
    },
    {
      icon: Lock,
      title: 'Exclusive to the 456AF Community',
      description: 'You won\'t find this anywhere else. Wear it like you earned it—because you did.',
    },
  ]

  const products = [
    {
      id: 'mobile-fitness-kit',
      name: 'Mobile Fitness Kit',
      description: "Everything you need to train anywhere. We don't waste work—this kit keeps you moving whether you're traveling, at home, or stuck without a gym. Compact, complete, no excuses.",
      icon: Package,
    },
    {
      id: 'gym-bag',
      name: 'Gym Bag',
      description: 'Spacious, durable, and organized for athletes who actually bring their gear. Multiple compartments, reinforced straps, and enough room for everything except excuses.',
      icon: ShoppingBag,
    },
    {
      id: 'foam-roller',
      name: 'Foam Roller',
      description: 'Recovery isn\'t optional. High-density foam that gets into the spots you\'ve been ignoring. Your muscles will thank you. Eventually.',
      icon: Package,
    },
    {
      id: 'resistance-bands',
      name: 'Resistance Bands',
      description: 'Full set for every fitness level and movement pattern. Warm-ups, accessory work, mobility—no gym required. Small enough to travel, tough enough to last.',
      icon: Dumbbell,
    },
    {
      id: 'tank-top',
      name: 'Tank Top',
      description: 'Moisture-wicking, breathable, built for sessions where "light sweat" isn\'t an option. Designed to move with you, not against you. Looks good too—but that\'s secondary.',
      icon: Shirt,
    },
    {
      id: 'water-bottle',
      name: 'Water Bottle',
      description: 'Stay hydrated or go home. Insulated, leak-proof, and sized for people who actually drink water during training. Not a suggestion.',
      icon: Droplets,
    },
  ]

  return (
    <main className="min-h-screen bg-[var(--grey-950)]">
      <div className="container mx-auto px-6 py-24">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="font-[family-name:var(--font-bebas)] text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-wider text-[var(--grey-100)] mb-6">
            Custom Gear for<br /><span className="text-[var(--gold-600)]">Weak Excuses</span>
          </h1>
          <p className="text-lg md:text-xl text-[var(--grey-300)] max-w-4xl mx-auto leading-relaxed">
            456Customs isn&apos;t merch. It&apos;s equipment. Every piece is designed for the way we train—tested by our coaches, built to last, and engineered to perform. Leave the pretty gym fits for the people taking selfies at Planet Fitness.
          </p>
        </div>

        {/* Value Props */}
        <div className="mb-20">
          <div className="grid md:grid-cols-3 gap-8">
            {valueProps.map((prop, index) => (
              <div key={index} className="text-center p-6">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-sm border-2 border-[var(--gold-600)] bg-[var(--grey-900)] mb-6">
                  <prop.icon className="h-8 w-8 text-[var(--gold-600)]" />
                </div>
                <h3 className="font-[family-name:var(--font-bebas)] text-2xl font-bold uppercase tracking-wide text-[var(--grey-100)] mb-3">
                  {prop.title}
                </h3>
                <p className="text-[var(--grey-300)] leading-relaxed">
                  {prop.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Products */}
        <div className="mb-20">
          <h2 className="font-[family-name:var(--font-bebas)] text-4xl md:text-5xl font-black uppercase tracking-wider text-center text-[var(--grey-100)] mb-12">
            The <span className="text-[var(--gold-600)]">Gear</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => {
              const Icon = product.icon
              return (
                <Card key={product.id}>
                  <CardHeader>
                    <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-sm border-2 border-[var(--gold-600)] bg-[var(--grey-900)]">
                      <Icon className="h-7 w-7 text-[var(--gold-600)]" />
                    </div>
                    <CardTitle className="text-xl">{product.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[var(--grey-300)] leading-relaxed">
                      {product.description}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Team456 Member Benefits */}
        <div className="mb-20 rounded-sm border-2 border-[var(--gold-600)] bg-[var(--grey-900)] p-8 md:p-12">
          <div className="text-center">
            <h2 className="font-[family-name:var(--font-bebas)] text-4xl md:text-5xl font-black uppercase tracking-wider text-[var(--grey-100)] mb-6">
              Team456 <span className="text-[var(--gold-600)]">Perks</span>
            </h2>
            <p className="text-lg text-[var(--grey-300)] mb-8 max-w-2xl mx-auto leading-relaxed">
              Being part of the team has its benefits. Plus members get 15% off. Elite members get 25% off. Not a member yet? Fix that.
            </p>
            <Button size="lg" asChild>
              <Link href="/community">Join Team456</Link>
            </Button>
          </div>
        </div>

        {/* Bulk Orders */}
        <div className="mb-20">
          <div className="rounded-sm border border-[var(--grey-700)] bg-[var(--grey-850)] p-8 md:p-12 max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-sm border-2 border-[var(--gold-600)] bg-[var(--grey-900)]">
                <Users className="h-8 w-8 text-[var(--gold-600)]" />
              </div>
            </div>
            <h2 className="font-[family-name:var(--font-bebas)] text-4xl md:text-5xl font-black uppercase tracking-wider text-center text-[var(--grey-100)] mb-6">
              Outfit Your <span className="text-[var(--gold-600)]">Team</span>
            </h2>
            <p className="text-center text-[var(--grey-300)] mb-8 max-w-2xl mx-auto leading-relaxed">
              Gyms, teams, organizations—if you need custom 456AF gear in bulk, we&apos;ve got you. Custom branding options available. Reach out and let&apos;s talk.
            </p>
            <div className="text-center">
              <Button asChild variant="outline">
                <Link href="/contact">Request Custom Quote</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mx-auto max-w-4xl rounded-sm border-2 border-[var(--gold-600)] bg-[var(--grey-900)] p-12 text-center md:p-16">
          <h2 className="font-[family-name:var(--font-bebas)] text-4xl md:text-5xl font-black uppercase tracking-wider text-[var(--grey-100)] mb-8">
            Stop training in gear that quits <span className="text-[var(--gold-600)]">before you do.</span>
          </h2>
          <Button size="lg" asChild>
            <Link href="/contact">Shop 456Customs</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
