import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Users, MessageCircle, Calendar, Trophy, Heart, Zap } from 'lucide-react'

export default function CommunityPage() {
  const benefits = [
    {
      icon: Users,
      title: 'Connect with Members',
      description: 'Surround yourself with people who actually show up. No lurkers, no excuse-makers—just athletes at every level pushing each other to be better. Your network is about to get a serious upgrade.',
    },
    {
      icon: MessageCircle,
      title: 'Share Your Journey',
      description: 'Post your wins. Post your losses. Get real feedback from people who\'ve been there. This isn\'t about likes—it\'s about progress. We celebrate PRs, not selfies.',
    },
    {
      icon: Calendar,
      title: 'Exclusive Events',
      description: 'Members-only meetups, workshops, and training sessions you won\'t find anywhere else. Show up, learn something, and leave better than you came. Or just read about it later. Your call.',
    },
    {
      icon: Trophy,
      title: 'Challenges & Competitions',
      description: 'Friendly competition with actual stakes. Community challenges that push you, track your progress, and remind you that "good enough" isn\'t in the vocabulary around here.',
    },
    {
      icon: Heart,
      title: 'Accountability Partners',
      description: 'Find your people. Training partners who won\'t let you skip leg day and will call you out when you\'re slacking. Motivation is nice. Accountability is better.',
    },
    {
      icon: Zap,
      title: 'Early Access',
      description: 'Be first in line for new programs, product drops, and 456AF updates. Members hear it before anyone else. Because you earned it.',
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
          <h1 className="font-[family-name:var(--font-bebas)] text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-wider text-[var(--grey-100)] mb-4">Welcome to <span className="text-[var(--gold-600)]">Team456</span></h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            This isn&apos;t a Facebook group full of motivational quotes and people who disappeared after January 3rd. Team456 is where serious athletes connect, compete, and hold each other accountable. You want a support system? Earn your spot at the table.
          </p>
        </div>

        {/* Community Benefits */}
        <div className="mb-16">
          <h2 className="font-[family-name:var(--font-bebas)] text-4xl md:text-5xl font-black uppercase tracking-wider text-[var(--grey-100)] mb-8 text-center">Why Join <span className="text-[var(--gold-600)]">Team456?</span></h2>
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

        {/* Community Stats */}
        <div className="mb-16 bg-muted/50 rounded-sm p-8 md:p-12">
          <h2 className="font-[family-name:var(--font-bebas)] text-4xl md:text-5xl font-black uppercase tracking-wider text-[var(--grey-100)] mb-8 text-center">Our Growing <span className="text-[var(--gold-600)]">Community</span></h2>
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
          <h2 className="font-[family-name:var(--font-bebas)] text-4xl md:text-5xl font-black uppercase tracking-wider text-[var(--grey-100)] mb-8 text-center">What Our Members <span className="text-[var(--gold-600)]">Say</span></h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground mb-4">
                  &quot;Team456 has been a game-changer for my fitness journey. The support and
                  motivation from the community keeps me going every day.&quot;
                </p>
                <p className="font-semibold">- Sarah M.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground mb-4">
                  &quot;I&apos;ve tried many fitness programs, but the community aspect of Team456 is
                  what makes it special. I&apos;ve made lifelong friends here.&quot;
                </p>
                <p className="font-semibold">- Mike T.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground mb-4">
                  &quot;The accountability and encouragement from Team456 members helped me achieve
                  goals I never thought possible.&quot;
                </p>
                <p className="font-semibold">- Jessica R.</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="font-[family-name:var(--font-bebas)] text-4xl md:text-5xl font-black uppercase tracking-wider text-[var(--grey-100)] mb-4">Done Going It <span className="text-[var(--gold-600)]">Alone?</span></h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Accountability beats motivation every time. Join the crew that actually shows up.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/contact">Join Team456 Free</Link>
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
