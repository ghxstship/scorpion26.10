import Link from 'next/link'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BookOpen, Video, Users, Zap, Check } from 'lucide-react'

/**
 * Products Page - Spartan Warrior Design
 * Showcases 456Pro's 4 curated training programs
 */

// 456Pro Curated Training Programs
const products = [
  {
    id: '1',
    title: 'BasicAF',
    description: 'Community Access Only - Your foundation for fitness excellence. Join Club456 and start your transformation journey.',
    type: 'community',
    tier: 'Foundation',
    price: 0,
    image: null,
    icon: Users,
    features: [
      'Club456 community access',
      'Group workouts',
      'Basic programming',
      'Community support',
    ],
  },
  {
    id: '2',
    title: 'StrongAF',
    description: 'Virtual Program - Build strength and power with our comprehensive online training platform. Perfect for intermediate athletes.',
    type: 'virtual',
    tier: 'Virtual',
    price: 9999,
    image: null,
    icon: Video,
    features: [
      'Online training platform',
      'Video coaching library',
      'Progress tracking',
      'Monthly check-ins',
    ],
  },
  {
    id: '3',
    title: 'RareAF',
    description: 'Private Program - Elite one-on-one coaching with personalized programming and direct access to Coach Matthew Alarcon.',
    type: 'private',
    tier: 'Elite',
    price: 29999,
    image: null,
    icon: Zap,
    features: [
      '1-on-1 coaching sessions',
      'Custom programming',
      'Direct coach access',
      'Weekly video analysis',
    ],
  },
  {
    id: '4',
    title: 'EliteAF',
    description: 'Residential/Destination Program - The ultimate immersive fitness experience. Train at our Orlando facility or exclusive destination locations.',
    type: 'residential',
    tier: 'Ultimate',
    price: 99999,
    image: null,
    icon: BookOpen,
    features: [
      'Immersive training experience',
      'Orlando facility access',
      'Destination programs',
      'VIP treatment',
    ],
  },
]

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-[var(--grey-950)]">
      <div className="container px-6 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-6 font-[family-name:var(--font-bebas)] text-6xl font-black uppercase tracking-wider text-[var(--grey-100)] md:text-7xl lg:text-8xl">
            456Pro Training <span className="text-[var(--gold-600)]">Programs</span>
          </h1>
          <p className="mb-16 text-lg text-[var(--grey-300)] md:text-xl">
            From community access to elite residential training - find your perfect fit
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {products.map((product, index) => {
            const Icon = product.icon
            const isElite = index === 3 // EliteAF is the ultimate program
            
            return (
              <Card 
                key={product.id} 
                className={`group flex flex-col ${isElite ? 'border-2 border-[var(--gold-600)] shadow-[var(--glow-gold)]' : ''}`}
              >
                <CardHeader>
                  {/* Tier Badge */}
                  <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-sm border border-[var(--gold-600)] bg-[var(--grey-900)] px-3 py-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-[var(--gold-600)]">
                      {product.tier}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-sm border-2 border-[var(--red-700)] bg-[var(--grey-900)] transition-all duration-300 group-hover:border-[var(--gold-600)] group-hover:bg-[var(--gold-600)] group-hover:shadow-[var(--glow-gold)]">
                    <Icon className="h-8 w-8 text-[var(--red-700)] transition-colors group-hover:text-[var(--grey-950)]" />
                  </div>

                  {/* Title */}
                  <CardTitle className="mb-3">{product.title}</CardTitle>
                  
                  {/* Description */}
                  <CardDescription className="text-base leading-relaxed">
                    {product.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-1">
                  {/* Price */}
                  <div className="mb-6 border-b border-[var(--grey-800)] pb-6">
                    <span className="font-[family-name:var(--font-bebas)] text-5xl font-black text-[var(--gold-600)]">
                      {product.price === 0 ? 'FREE' : `$${(product.price / 100).toFixed(0)}`}
                    </span>
                    {product.type !== 'community' && product.type !== 'residential' && (
                      <span className="ml-2 text-sm uppercase tracking-wide text-[var(--grey-500)]">/month</span>
                    )}
                  </div>

                  {/* Features */}
                  <div className="space-y-3">
                    {product.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-[var(--gold-600)]" />
                        <span className="text-sm text-[var(--grey-300)]">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>

                <CardFooter>
                  <Button asChild className="w-full" variant={isElite ? 'default' : 'secondary'}>
                    <Link href="/contact">Get Started</Link>
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-24 rounded-sm border-2 border-[var(--gold-600)] bg-[var(--grey-900)] p-12 text-center md:p-16">
          <h2 className="mb-6 font-[family-name:var(--font-bebas)] text-4xl font-black uppercase tracking-wider text-[var(--grey-100)] md:text-5xl">
            Not Sure Which Program is <span className="text-[var(--gold-600)]">Right For You?</span>
          </h2>
          <p className="mb-8 text-lg text-[var(--grey-300)]">
            Schedule a free consultation to discuss your goals and find the perfect fit.
          </p>
          <Button size="lg" asChild>
            <Link href="/contact">Schedule Free Consultation</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
