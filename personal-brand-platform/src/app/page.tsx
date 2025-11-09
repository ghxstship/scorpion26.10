import { HeroSection } from '@/components/sections/HeroSection'
import { FeatureGrid } from '@/components/sections/FeatureGrid'
import { AboutSection } from '@/components/sections/AboutSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { CTASection } from '@/components/sections/CTASection'

/**
 * Homepage - Spartan Warrior Design
 * Showcases the bold, impactful aesthetic with hero, features, and social proof
 */
export default function Home() {
  return (
    <div role="main">
      <HeroSection />
      <FeatureGrid />
      <AboutSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  )
}
