'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CarouselItem {
  id: string
  title: string
  description: string
  imageUrl: string
  link: string
  linkText?: string
}

interface FeaturedCarouselProps {
  items: CarouselItem[]
  autoPlay?: boolean
  interval?: number
}

export function FeaturedCarousel({
  items,
  autoPlay = true,
  interval = 5000,
}: FeaturedCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (!autoPlay || items.length <= 1) return

    const timer = setInterval(() => {
      setCurrentIndex((current) => (current + 1) % items.length)
    }, interval)

    return () => clearInterval(timer)
  }, [autoPlay, interval, items.length])

  const goToSlide = (index: number) => setCurrentIndex(index)
  const goToPrevious = () => setCurrentIndex((c) => (c === 0 ? items.length - 1 : c - 1))
  const goToNext = () => setCurrentIndex((c) => (c + 1) % items.length)

  if (items.length === 0) return null

  const currentItem = items[currentIndex]

  return (
    <div className="relative w-full overflow-hidden rounded-lg bg-muted">
      <div className="relative aspect-[21/9] md:aspect-[21/7]">
        <Image
          src={currentItem.imageUrl}
          alt={currentItem.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
        
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl space-y-4 text-white">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                {currentItem.title}
              </h2>
              <p className="text-lg md:text-xl text-white/90">
                {currentItem.description}
              </p>
              <Button asChild size="lg" variant="secondary">
                <Link href={currentItem.link}>
                  {currentItem.linkText || 'Learn More'}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {items.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white"
            onClick={goToPrevious}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white"
            onClick={goToNext}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  'h-2 rounded-full transition-all',
                  index === currentIndex ? 'w-8 bg-white' : 'w-2 bg-white/50'
                )}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
