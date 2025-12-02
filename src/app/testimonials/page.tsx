'use client'

import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Star } from 'lucide-react'

/**
 * Testimonials Page
 * Showcases athlete success stories and reviews
 */

const testimonials = [
  {
    content:
      'This man is literally the G.O.A.T. I have never felt better. Down 40 pounds. I apply everything he teaches in my day to day routine.',
    author: 'Elizabeth Roell',
    title: 'The Transformation',
    rating: 5,
  },
  {
    content:
      'My hips were fixed. I was able to perform aerials again with more strength and confidence! In addition, I lost weight and got my dream body!',
    author: 'Elena B.',
    title: 'The Results',
    rating: 5,
  },
  {
    content:
      'I gained over 30 lbs in muscle. I grew a super nice butt while maintaining a slim waist.',
    author: 'Bailey Vick',
    title: 'The Gains',
    rating: 5,
  },
  {
    content:
      'I\'m back to running and my hip doesn\'t hurt anymore!',
    author: 'Vicky O.',
    title: 'The Comeback',
    rating: 5,
  },
  {
    content:
      'For the past eight years, Matt has trained our entire family. My son was in peak condition to play three years of varsity basketball and eventually earned a university volleyball scholarship. My daughter is already thriving, playing for the top volleyball club in Florida.',
    author: 'Anja D.',
    title: 'The Family Legacy',
    rating: 5,
  },
  {
    content:
      'He\'s so in tune with his clients… saved my best friend\'s life when he recognized signs of a major health issue—he immediately took action. Very impressive. No one else had a clue what was happening.',
    author: 'Vicky O.',
    title: 'The Lifesaver',
    rating: 5,
  },
  {
    content:
      'Every session was like a therapy session in dark times. He would listen to me rant while pushing my body to a limit I didn\'t know possible.',
    author: 'Bailey Vick',
    title: 'The Whole Package',
    rating: 5,
  },
  {
    content:
      'I love his old school approach and he is not afraid to call you out. I never wanted to disappoint and he always made you \'finish your breakfast\'!',
    author: 'M. Buell',
    title: 'The Approach',
    rating: 5,
  },
  {
    content:
      'Matthew\'s ability to explain anything, adapt to skill and fitness levels, and pivot with individualized complications give me the confidence to approach new challenges with courage instead of fear.',
    author: 'Shannon M.',
    title: 'The Mindset Shift',
    rating: 5,
  },
  {
    content:
      'My back was in pain and yet Matt did not focus on my back. We did other exercises, unexpectedly to me, and it helped my back. He knows what he is doing. I have total confidence in him.',
    author: 'Tom Klusman',
    title: 'The Unexpected Win',
    rating: 5,
  },
  {
    content:
      'Matt can act gruff and demanding but he is caring and understanding. His demeanor works! He pushes you as far as you want to be pushed.',
    author: 'Tom Klusman',
    title: 'The Real Talk',
    rating: 5,
  },
  {
    content:
      'Do it. It will be the best experience of your life. Not only will you want to workout but you will learn the meaning behind every workout and learn way more about your body than you ever thought.',
    author: 'Elena B.',
    title: 'The Endorsement',
    rating: 5,
  },
  {
    content:
      'Be ready to work. Don\'t waste his time or more importantly, your own! If you want change, he\'s your guy.',
    author: 'M. Buell',
    title: 'The No-Nonsense Call',
    rating: 5,
  },
  {
    content:
      'Matt is the real deal and promotes all aspects of fitness and not just strength or endurance. Balance and flexibility are critically important to everyday life.',
    author: 'Neal Mumbert',
    title: 'The Real Deal',
    rating: 5,
  },
  {
    content:
      'In a personal fitness journey, nobody else can do the work for you, but an expert can make that work much more effective. Motivational heckling is a feature, not a bug.',
    author: 'Shannon M.',
    title: 'The Mic Drop',
    rating: 5,
  },
]

const stats = [
  { value: '500+', label: 'Athletes Trained' },
  { value: '97.5%', label: 'Goal Achievement Rate' },
  { value: '4.98', label: 'Average Rating' },
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
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="group relative overflow-hidden">
              <CardContent className="p-6 flex flex-col h-full">
                {/* Stars at top */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-[var(--gold-600)] text-[var(--gold-600)]" />
                  ))}
                </div>

                {/* Content */}
                <blockquote className="flex-1 text-[var(--grey-200)] leading-relaxed mb-6">
                  &ldquo;{testimonial.content}&rdquo;
                </blockquote>

                {/* Author - Bottom aligned */}
                <div className="flex items-center gap-3 pt-4 border-t border-[var(--grey-800)]">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--gold-600)] text-[var(--grey-950)] font-bold text-sm">
                    {testimonial.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-bold text-[var(--grey-100)] text-sm">{testimonial.author}</div>
                    <div className="text-xs text-[var(--gold-600)] uppercase tracking-wider">
                      {testimonial.title}
                    </div>
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
              Stop reading about results. Start earning them.
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
