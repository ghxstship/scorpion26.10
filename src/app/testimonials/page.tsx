'use client'

import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Quote, Star } from 'lucide-react'

/**
 * Testimonials Page
 * Showcases athlete success stories and reviews
 */

const testimonials = [
  {
    content:
      'I\'ve tried every program out there. This is the first one that actually delivered. The coaching is legit, the community keeps you accountable, and the results? They speak for themselves.',
    author: 'Marcus T.',
    title: '456AF Athlete',
    program: 'Strong_AF',
    rating: 5,
  },
  {
    content:
      'Coach Alarcon doesn\'t sugarcoat anything. That\'s exactly what I needed. In 6 months I\'ve made more progress than in 3 years of "figuring it out" on my own.',
    author: 'Sarah K.',
    title: '456AF Athlete',
    program: 'Hard_AF',
    rating: 5,
  },
  {
    content:
      'The Team456 community is different. No toxic positivity, no excuses—just people who show up and put in work. Found my people.',
    author: 'David R.',
    title: 'Team456 Member',
    program: 'Basic_AF',
    rating: 5,
  },
  {
    content:
      'ProAFU changed how I coach. The methodology is rigorous, the feedback is brutal (in a good way), and I graduated actually ready to lead. Worth every penny.',
    author: 'Jennifer M.',
    title: 'ProAFU Graduate',
    program: 'ProAF University',
    rating: 5,
  },
  {
    content:
      'I was skeptical about virtual training. Then I joined Strong_AF. The programming is personalized, the check-ins keep me honest, and I\'m stronger than I\'ve ever been.',
    author: 'Chris L.',
    title: '456AF Athlete',
    program: 'Strong_AF',
    rating: 5,
  },
  {
    content:
      'Hard_AF is no joke. 1-on-1 coaching with direct access to your coach? That level of attention to detail is why I finally hit my goals.',
    author: 'Amanda P.',
    title: '456AF Athlete',
    program: 'Hard_AF',
    rating: 5,
  },
]

const stats = [
  { value: '500+', label: 'Athletes Trained' },
  { value: '95%', label: 'Goal Achievement Rate' },
  { value: '4.9', label: 'Average Rating' },
  { value: '10+', label: 'Years Experience' },
]

export default function TestimonialsPage() {
  return (
    <main className="min-h-screen bg-[var(--grey-950)]">
      <div className="container px-6 py-24">
        {/* Header */}
        <div className="mx-auto max-w-4xl text-center mb-16">
          <h1 className="mb-6 font-[family-name:var(--font-bebas)] text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-wider text-[var(--grey-100)]">
            Results Speak <span className="text-[var(--gold-600)]">Louder</span>
          </h1>
          <p className="text-lg text-[var(--grey-300)] md:text-xl max-w-2xl mx-auto">
            We could tell you how good we are. Or you could hear it from the people who&apos;ve actually done the work.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="font-[family-name:var(--font-bebas)] text-5xl md:text-6xl font-black text-[var(--gold-600)] mb-2">
                {stat.value}
              </div>
              <div className="text-sm uppercase tracking-wider text-[var(--grey-400)]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="group">
              <CardContent className="p-8">
                {/* Quote Icon */}
                <div className="mb-6">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-sm border-2 border-[var(--gold-600)] bg-[var(--grey-900)] transition-all duration-300 group-hover:bg-[var(--gold-600)]">
                    <Quote className="h-6 w-6 text-[var(--gold-600)] transition-colors group-hover:text-[var(--grey-950)]" />
                  </div>
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-[var(--gold-600)] text-[var(--gold-600)]" />
                  ))}
                </div>

                {/* Content */}
                <blockquote className="mb-6 text-[var(--grey-200)] leading-relaxed">
                  &ldquo;{testimonial.content}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="border-t border-[var(--grey-800)] pt-4">
                  <div className="font-bold text-[var(--grey-100)]">{testimonial.author}</div>
                  <div className="text-sm text-[var(--gold-600)] uppercase tracking-wider">
                    {testimonial.title}
                  </div>
                  <div className="text-xs text-[var(--grey-500)] mt-1">
                    {testimonial.program}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Submit Testimonial CTA */}
        <div className="mt-20">
          <div className="rounded-sm border border-[var(--grey-700)] bg-[var(--grey-850)] p-12 max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-[family-name:var(--font-bebas)] text-4xl md:text-5xl font-black uppercase tracking-wider text-[var(--grey-100)] mb-4">
                Share Your <span className="text-[var(--gold-600)]">Story</span>
              </h2>
              <p className="text-lg text-[var(--grey-300)] max-w-2xl mx-auto">
                Got results? We want to hear about it. Submit your testimonial and inspire the next generation of 456AF athletes.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <a
                href="https://form.typeform.com/to/JIBsiox8"
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-sm border-2 border-[var(--gold-600)] bg-[var(--grey-900)] p-8 text-center transition-all hover:bg-[var(--gold-600)] "
              >
                <h3 className="font-[family-name:var(--font-bebas)] text-2xl font-bold uppercase tracking-wide text-[var(--gold-600)] mb-2 group-hover:text-[var(--grey-950)]">
                  Client Testimonial
                </h3>
                <p className="text-[var(--grey-300)] group-hover:text-[var(--grey-800)]">
                  For 456AF athletes and program members
                </p>
              </a>
              <a
                href="https://form.typeform.com/to/hRwHoWuM"
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-sm border-2 border-[var(--grey-600)] bg-[var(--grey-900)] p-8 text-center transition-all hover:border-[var(--gold-600)] hover:bg-[var(--gold-600)] "
              >
                <h3 className="font-[family-name:var(--font-bebas)] text-2xl font-bold uppercase tracking-wide text-[var(--grey-100)] mb-2 group-hover:text-[var(--grey-950)]">
                  Peer Testimonial
                </h3>
                <p className="text-[var(--grey-300)] group-hover:text-[var(--grey-800)]">
                  For coaches, trainers, and industry peers
                </p>
              </a>
            </div>
          </div>
        </div>

        {/* Join CTA */}
        <div className="mt-16 text-center">
          <div className="mx-auto max-w-4xl rounded-sm border-2 border-[var(--gold-600)] bg-[var(--grey-900)] p-12 text-center md:p-16">
            <h2 className="font-[family-name:var(--font-bebas)] text-4xl md:text-5xl font-black uppercase tracking-wider text-[var(--grey-100)] mb-4">
              Ready to Write Your <span className="text-[var(--gold-600)]">Story?</span>
            </h2>
            <p className="text-lg text-[var(--grey-300)] mb-8">
              Join the athletes who stopped making excuses and started making progress.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center justify-center rounded-sm bg-[var(--gold-600)] px-8 py-4 font-bold uppercase tracking-wider text-[var(--grey-950)] transition-all hover:bg-[var(--gold-500)] "
            >
              View Programs
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
