import { HeroSection } from '@/components/sections/HeroSection'
import { AboutSection } from '@/components/sections/AboutSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { CTASection } from '@/components/sections/CTASection'

export default function Home() {
  return (
    <div role="main">
      <HeroSection />
      <AboutSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  )
}
