import Link from 'next/link'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { GraduationCap, Award, Users, BookOpen, Rocket } from 'lucide-react'

export default function UniversityPage() {
  const certificationLevels = [
    {
      title: 'Level 1: Foundation',
      duration: '8 Weeks',
      subtitle: 'Foundation Certification',
      description: 'Master the fundamentals of 456AF training methodology. This is your proving ground—show us you understand the system before you coach it.',
    },
    {
      title: 'Level 2: Advanced',
      duration: '12 Weeks',
      subtitle: 'Advanced Certification',
      description: 'Programming, periodization, and advanced coaching techniques. You&apos;ll learn how to build programs that actually produce results—not just technically correct—but game-changing.',
    },
    {
      title: 'Level 3: Pro',
      duration: '16 Weeks',
      subtitle: 'Pro Certification',
      description: 'Elite-level coaching certification for those ready to lead. Graduate here and you&apos;re not just a trainer. You&apos;re a 456AF coach, and we expect you to act like it.',
    },
  ]

  return (
    <main className="min-h-screen bg-[var(--grey-950)]">
      <div className="container mx-auto px-6 py-24">
        {/* Hero Section */}
        <div className="text-center mb-24">
          <div className="flex justify-center mb-8">
            <div className="inline-flex h-24 w-24 items-center justify-center rounded-sm border-2 border-[var(--gold-600)] bg-[var(--grey-900)]">
              <GraduationCap className="h-12 w-12 text-[var(--gold-600)]" />
            </div>
          </div>
          <h1 className="mb-6 font-[family-name:var(--font-bebas)] text-5xl font-black uppercase tracking-wider text-[var(--grey-100)] md:text-6xl lg:text-7xl">
            Build Athletes. <span className="text-[var(--gold-600)]">Lead From The Front.</span>
          </h1>
          <p className="mx-auto max-w-4xl text-lg leading-relaxed text-[var(--grey-300)] md:text-xl">
            ProAF University isn&apos;t a weekend seminar with a PDF certificate. It&apos;s a rigorous coaching program that transforms dedicated trainers into elite-level coaches. Learn directly from Head Coach Matthew Alarcon and our team of master trainers—if you can keep up.
          </p>
        </div>

        {/* Why Choose ProAFU */}
        <div className="mb-24">
          <h2 className="mb-12 text-center font-[family-name:var(--font-bebas)] text-4xl font-black uppercase tracking-wider text-[var(--grey-100)] md:text-5xl">
            Why <span className="text-[var(--gold-600)]">ProAFU?</span>
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader>
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-sm border-2 border-[var(--gold-600)] bg-[var(--grey-900)]">
                  <Award className="h-8 w-8 text-[var(--gold-600)]" />
                </div>
                <CardTitle>Professional Certification</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[var(--grey-300)]">
                  Not a participation trophy. Not a PDF you printed at home. A credential the industry actually respects—because you actually earned it.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-sm border-2 border-[var(--gold-600)] bg-[var(--grey-900)]">
                  <Users className="h-8 w-8 text-[var(--gold-600)]" />
                </div>
                <CardTitle>Master Trainer Access</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[var(--grey-300)]">
                  Learn directly from Head Coach Matthew Alarcon and a team of coaches who practice what they preach. No theoretical fitness gurus. No influencers. Just people who&apos;ve put in the reps.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-sm border-2 border-[var(--gold-600)] bg-[var(--grey-900)]">
                  <BookOpen className="h-8 w-8 text-[var(--gold-600)]" />
                </div>
                <CardTitle>Proprietary 456AF Curriculum</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[var(--grey-300)]">
                  Every system. Every principle. No fluff, no filler, no &ldquo;bonus modules&rdquo; that waste your time. You&apos;ll learn the methodology inside and out—or you won&apos;t pass. Simple.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-sm border-2 border-[var(--gold-600)] bg-[var(--grey-900)]">
                  <Rocket className="h-8 w-8 text-[var(--gold-600)]" />
                </div>
                <CardTitle>Career Advancement Opportunities</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[var(--grey-300)]">
                  We don&apos;t hand you a certificate and disappear. You&apos;re part of the team now, with real placement support and mentorship. Your ceiling? That&apos;s on you. We just removed the floor.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Certification Levels */}
        <div className="mb-24">
          <h2 className="mb-12 text-center font-[family-name:var(--font-bebas)] text-4xl font-black uppercase tracking-wider text-[var(--grey-100)] md:text-5xl">
            Certification <span className="text-[var(--gold-600)]">Tiers</span>
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {certificationLevels.map((level, index) => (
              <Card key={index} className="flex flex-col">
                <CardHeader>
                  <p className="mb-2 text-sm font-bold uppercase tracking-wider text-[var(--gold-600)]">
                    {level.duration}
                  </p>
                  <CardTitle className="text-2xl">{level.title}</CardTitle>
                  <CardDescription className="text-base font-semibold text-[var(--grey-400)]">
                    {level.subtitle}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-[var(--grey-300)]">{level.description}</p>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href="/contact">Apply Now</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="rounded-sm border-2 border-[var(--gold-600)] bg-[var(--grey-900)] p-12 text-center md:p-16">
          <p className="mx-auto mb-8 max-w-3xl text-lg leading-relaxed text-[var(--grey-300)]">
            This isn&apos;t for people who want to &ldquo;get into fitness.&rdquo; It&apos;s for people ready to dedicate themselves to the craft of coaching and join an elite community of certified trainers who are actually transforming lives.
          </p>
          <h2 className="mb-8 font-[family-name:var(--font-bebas)] text-4xl font-black uppercase tracking-wider text-[var(--grey-100)] md:text-5xl">
            Ready to stop watching from the sidelines?
          </h2>
          <Button size="lg" asChild>
            <Link href="/contact">Apply to ProAFU</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
