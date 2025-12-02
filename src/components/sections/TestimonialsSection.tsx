'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Quote } from 'lucide-react'
import { useState, useEffect } from 'react'

const testimonials = [
  {
    content:
      'I\'ve tried every program out there. This is the first one that actually delivered. The coaching is legit, the community keeps you accountable, and the results? They speak for themselves.',
    author: '[Name]',
    title: '456AF Athlete',
  },
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="bg-[var(--grey-900)] py-24 md:py-32">
      <div className="container px-6">
        <div className="mx-auto max-w-4xl text-center">
          {/* Section Header */}
          <h2 className="mb-4 font-[family-name:var(--font-bebas)] text-5xl font-black uppercase tracking-wider text-[var(--grey-100)] md:text-6xl lg:text-7xl">
            Results Speak <span className="text-[var(--gold-600)]">Louder</span>
          </h2>
          <p className="mb-12 text-lg text-[var(--grey-300)] md:text-xl">
            We could tell you how good we are. Or you could hear it from the people who&apos;ve actually done the work.
          </p>
          
          <Card className="relative">
            <CardContent className="p-8 md:p-12">
              <div className="mb-6 flex justify-center">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-sm border-2 border-[var(--gold-600)] bg-[var(--grey-900)]">
                  <Quote className="h-7 w-7 text-[var(--gold-600)]" />
                </div>
              </div>
              <blockquote className="mb-8 text-xl leading-relaxed text-[var(--grey-200)] md:text-2xl">
                &ldquo;{testimonials[currentIndex].content}&rdquo;
              </blockquote>
              <div>
                <div className="font-bold text-[var(--grey-100)]">{testimonials[currentIndex].author}</div>
                <div className="text-sm text-[var(--gold-600)] uppercase tracking-wider">
                  {testimonials[currentIndex].title}
                </div>
              </div>
            </CardContent>
          </Card>
          
          {testimonials.length > 1 && (
            <div className="mt-6 flex justify-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 w-2 rounded-full transition-all ${
                    index === currentIndex ? 'w-8 bg-[var(--gold-600)]' : 'bg-[var(--grey-700)]'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
