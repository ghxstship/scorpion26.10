import { AboutSection } from '@/components/sections/AboutSection'

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">About Us</h1>
        <AboutSection />
        
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-600">
              We empower individuals and organizations to build their personal brand
              and share their expertise with the world.
            </p>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
            <p className="text-gray-600">
              To be the leading platform for personal brand development and
              professional growth.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
