import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Users, Heart, MessageCircle, Calendar, Trophy, Zap } from 'lucide-react'

export default function CommunityPage() {
  const benefits = [
    {
      icon: Users,
      title: 'Connect with Members',
      description: 'Join a vibrant community of fitness enthusiasts at every level',
    },
    {
      icon: MessageCircle,
      title: 'Share Your Journey',
      description: 'Post updates, celebrate wins, and get support from fellow members',
    },
    {
      icon: Calendar,
      title: 'Exclusive Events',
      description: 'Access to Club456 meetups, workshops, and special training sessions',
    },
    {
      icon: Trophy,
      title: 'Challenges & Competitions',
      description: 'Participate in community challenges and track your progress',
    },
    {
      icon: Heart,
      title: 'Accountability Partners',
      description: 'Find workout buddies and accountability partners to stay motivated',
    },
    {
      icon: Zap,
      title: 'Early Access',
      description: 'Get first access to new programs, products, and 456AF updates',
    },
  ]

  const membershipTiers = [
    {
      name: 'Basic_AF Member',
      price: 'Free',
      description: 'Start your fitness journey with our community',
      features: [
        'Access to Club456 community forum',
        'Monthly group workouts',
        'Basic training resources',
        'Community challenges',
      ],
      cta: 'Join Free',
      highlighted: false,
    },
    {
      name: 'Club456 Plus',
      price: '$29',
      period: '/month',
      description: 'Enhanced community experience with premium perks',
      features: [
        'Everything in Basic_AF',
        'Weekly exclusive content',
        'Priority event registration',
        'Member-only merchandise discounts',
        'Direct messaging with coaches',
      ],
      cta: 'Upgrade Now',
      highlighted: true,
    },
    {
      name: 'Club456 Elite',
      price: '$99',
      period: '/month',
      description: 'VIP access to the complete 456AF experience',
      features: [
        'Everything in Plus',
        'Monthly 1-on-1 coach check-ins',
        'Exclusive Elite member events',
        'Free 456Customs merchandise',
        'Priority program enrollment',
      ],
      cta: 'Go Elite',
      highlighted: false,
    },
  ]

  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <Users className="h-20 w-20" style={{ color: 'var(--gold-600)' }} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Club456</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            More than just a fitness community - Club456 is your tribe. Connect with like-minded
            individuals, share your journey, and achieve your goals together.
          </p>
        </div>

        {/* Community Benefits */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Why Join Club456?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index}>
                <CardHeader>
                  <benefit.icon className="h-10 w-10 mb-2" style={{ color: 'var(--gold-600)' }} />
                  <CardTitle className="text-lg">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Membership Tiers */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Choose Your Membership</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {membershipTiers.map((tier, index) => (
              <Card
                key={index}
                className={`flex flex-col ${
                  tier.highlighted ? 'border-primary border-2 shadow-lg' : ''
                }`}
              >
                {tier.highlighted && (
                  <div className="bg-primary text-primary-foreground text-center py-2 text-sm font-semibold rounded-t-lg">
                    Most Popular
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{tier.name}</CardTitle>
                  <CardDescription className="text-base">{tier.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{tier.price}</span>
                    {tier.period && (
                      <span className="text-muted-foreground">{tier.period}</span>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-3">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Heart className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--gold-600)' }} />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <div className="p-6 pt-0">
                  <Button
                    asChild
                    className="w-full"
                    variant={tier.highlighted ? 'default' : 'outline'}
                  >
                    <Link href="/contact">{tier.cta}</Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Community Stats */}
        <div className="mb-16 bg-muted/50 rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Growing Community</h2>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2" style={{ color: 'var(--gold-600)' }}>1,000+</div>
              <div className="text-foreground/80">Active Members</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2" style={{ color: 'var(--gold-600)' }}>50+</div>
              <div className="text-foreground/80">Weekly Workouts</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2" style={{ color: 'var(--gold-600)' }}>100+</div>
              <div className="text-foreground/80">Success Stories</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2" style={{ color: 'var(--gold-600)' }}>24/7</div>
              <div className="text-foreground/80">Community Support</div>
            </div>
          </div>
        </div>

        {/* What Members Say */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">What Our Members Say</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground mb-4">
                  &quot;Club456 has been a game-changer for my fitness journey. The support and
                  motivation from the community keeps me going every day.&quot;
                </p>
                <p className="font-semibold">- Sarah M.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground mb-4">
                  &quot;I&apos;ve tried many fitness programs, but the community aspect of Club456 is
                  what makes it special. I&apos;ve made lifelong friends here.&quot;
                </p>
                <p className="font-semibold">- Mike T.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground mb-4">
                  &quot;The accountability and encouragement from Club456 members helped me achieve
                  goals I never thought possible.&quot;
                </p>
                <p className="font-semibold">- Jessica R.</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Join the Club?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start with Basic_AF for free or upgrade to unlock premium community features.
            Your fitness family is waiting!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/contact">Join Club456 Free</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/products">View Training Programs</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
