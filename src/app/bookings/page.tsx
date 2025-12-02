import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { Dumbbell, Brain, Activity, Trophy, Mic, Video } from 'lucide-react'

export default function BookingsPage() {
  const offerings = [
    {
      icon: Dumbbell,
      title: 'Group Fitness Classes',
      description: 'High-intensity group sessions led by 456AF coaches. Not your average Zumba class. Show up ready to work or don\'t show up at all.',
    },
    {
      icon: Brain,
      title: 'Pain Management Seminars',
      description: 'Learn to work with your body, not against it. Evidence-based strategies for athletes dealing with chronic pain who refuse to quit.',
    },
    {
      icon: Activity,
      title: 'Mobility Masterclasses',
      description: 'Flexibility isn\'t optional—it\'s the difference between longevity and early retirement. Fix your movement patterns before they fix you.',
    },
    {
      icon: Trophy,
      title: 'Basketball Bootcamps',
      description: 'Elite basketball training from someone who\'s worked with NBA players. Skill development, conditioning, and the mental edge that separates good from great.',
    },
    {
      icon: Mic,
      title: 'Anti-Motivational Keynotes',
      description: 'Tired of "you can do it" speeches? Book a talk that actually says something. Real strategies, uncomfortable truths, zero fluff.',
    },
    {
      icon: Video,
      title: 'Media Appearances',
      description: 'Podcasts, interviews, panels—if you need someone who won\'t give you rehearsed corporate answers, let\'s talk.',
    },
  ]

  return (
    <main className="min-h-screen bg-[var(--grey-950)]">
      <div className="container mx-auto px-6 py-24">
        {/* Hero Section */}
        <div className="text-center mb-24">
          <h1 className="font-[family-name:var(--font-bebas)] text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-wider text-[var(--grey-100)] mb-6">
            Book <span className="text-[var(--gold-600)]">Coach Alarcon</span>
          </h1>
          <p className="text-lg md:text-xl text-[var(--grey-300)] max-w-4xl mx-auto leading-relaxed">
            Whether it&apos;s a group session, corporate event, or media appearance—you&apos;re getting the same energy. No watered-down versions. No corporate-friendly edits. Just real coaching from someone who&apos;s been in the trenches.
          </p>
        </div>

        {/* Offerings Grid */}
        <div className="mb-24">
          <h2 className="font-[family-name:var(--font-bebas)] text-4xl md:text-5xl font-black uppercase tracking-wider text-[var(--grey-100)] mb-12 text-center">
            What I <span className="text-[var(--gold-600)]">Offer</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {offerings.map((offering) => {
              const Icon = offering.icon
              return (
                <Card key={offering.title} className="group">
                  <CardHeader>
                    <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-sm border-2 border-[var(--gold-600)] bg-[var(--grey-900)] transition-all duration-300 group-hover:border-[var(--gold-500)] group-hover:bg-[var(--gold-600)]">
                      <Icon className="h-8 w-8 text-[var(--gold-600)] transition-colors group-hover:text-[var(--grey-950)]" />
                    </div>
                    <CardTitle className="text-xl">{offering.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[var(--grey-300)]">{offering.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="mx-auto max-w-4xl rounded-sm border-2 border-[var(--gold-600)] bg-[var(--grey-900)] p-12 text-center md:p-16">
          <h2 className="font-[family-name:var(--font-bebas)] text-4xl md:text-5xl font-black uppercase tracking-wider text-[var(--grey-100)] mb-4">
            Ready to <span className="text-[var(--gold-600)]">Book?</span>
          </h2>
          <p className="text-[var(--grey-300)] mb-8 text-lg max-w-2xl mx-auto">
            Tell me what you need. I&apos;ll tell you if I can help. No sales pitch, no runaround.
          </p>
          <Button asChild size="lg">
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
