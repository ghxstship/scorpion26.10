import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function SpeakingPage() {
  const topics = [
    {
      title: 'Leadership Excellence',
      description: 'Transform your leadership approach and inspire your team to achieve extraordinary results.',
    },
    {
      title: 'Personal Branding',
      description: 'Build a powerful personal brand that opens doors and creates opportunities.',
    },
    {
      title: 'Peak Performance',
      description: 'Unlock your full potential and achieve consistent high-level performance.',
    },
  ]

  return (
    <main className="min-h-screen">
      <div className="bg-black text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">Speaking Engagements</h1>
          <p className="text-xl text-gray-300">
            Book me for your next event and inspire your audience
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8">Speaking Topics</h2>
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {topics.map((topic) => (
            <div key={topic.title} className="border rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">{topic.title}</h3>
              <p className="text-gray-600">{topic.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Book a Speaking Engagement</h2>
          <p className="text-gray-600 mb-6">
            Interested in having me speak at your event? Get in touch to discuss availability.
          </p>
          <Button asChild size="lg">
            <Link href="/contact">Contact Me</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
