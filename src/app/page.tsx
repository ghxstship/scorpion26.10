import { HeroSection } from '@/components/sections/HeroSection'
import { FeatureGrid } from '@/components/sections/FeatureGrid'
import { FitCheckSection } from '@/components/sections/FitCheckSection'
import { ProgramTiersSection } from '@/components/sections/ProgramTiersSection'
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
      <FitCheckSection />
      <ProgramTiersSection />
      <AboutSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  )
}
