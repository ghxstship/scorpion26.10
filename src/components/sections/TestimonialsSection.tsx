'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Star } from 'lucide-react'
import { useState, useEffect } from 'react'

const testimonials = [
  {
    content:
      'This program completely transformed my approach to leadership. The insights are practical, powerful, and immediately applicable.',
    author: 'Sarah Johnson',
    title: 'CEO, Tech Innovations Inc.',
    rating: 5,
  },
  {
    content:
      'Working with this methodology helped me break through mental barriers I didn\'t even know existed. Game-changing experience.',
    author: 'Michael Chen',
    title: 'Professional Athlete',
    rating: 5,
  },
  {
    content:
      'The strategies taught here are unlike anything else. Clear, actionable, and backed by real results. Highly recommended.',
    author: 'Emily Rodriguez',
    title: 'Entrepreneur',
    rating: 5,
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
    <section className="bg-muted/30 py-20 md:py-32">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            What People Are Saying
          </h2>
          <p className="mb-12 text-lg text-foreground/80">
            Join thousands who have transformed their lives through proven strategies
          </p>
          <Card className="relative">
            <CardContent className="p-8 md:p-12">
              <div className="mb-6 flex justify-center gap-1">
                {Array.from({ length: testimonials[currentIndex].rating }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                ))}
              </div>
              <blockquote className="mb-6 text-xl italic leading-relaxed md:text-2xl">
                &ldquo;{testimonials[currentIndex].content}&rdquo;
              </blockquote>
              <div>
                <div className="font-semibold">{testimonials[currentIndex].author}</div>
                <div className="text-sm text-muted-foreground">
                  {testimonials[currentIndex].title}
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="mt-6 flex justify-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 w-2 rounded-full transition-all ${
                  index === currentIndex ? 'w-8 bg-primary' : 'bg-muted-foreground/30'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
