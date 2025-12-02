import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function SpeakingPage() {
  const topics = [
    {
      title: 'Leadership Excellence',
      description: 'Lead from the front. Build teams that execute, not just participate.',
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
          <h1 className="font-[family-name:var(--font-bebas)] text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-wider text-[var(--grey-100)] mb-4">Speaking <span className="text-[var(--gold-600)]">Engagements</span></h1>
          <p className="text-xl text-gray-300">
            Book me for your next event and inspire your audience
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <h2 className="font-[family-name:var(--font-bebas)] text-4xl md:text-5xl font-black uppercase tracking-wider text-[var(--grey-100)] mb-8">Speaking <span className="text-[var(--gold-600)]">Topics</span></h2>
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {topics.map((topic) => (
            <div key={topic.title} className="border rounded-sm p-6">
              <h3 className="text-xl font-bold mb-2">{topic.title}</h3>
              <p className="text-gray-600">{topic.description}</p>
            </div>
          ))}
        </div>

        <div className="rounded-sm border-2 border-[var(--gold-600)] bg-[var(--grey-900)] p-12 text-center md:p-16">
          <h2 className="font-[family-name:var(--font-bebas)] text-4xl md:text-5xl font-black uppercase tracking-wider text-[var(--grey-100)] mb-4">Book Coach <span className="text-[var(--gold-600)]">Alarcon</span></h2>
          <p className="text-[var(--grey-300)] mb-8 text-lg">
            Your audience deserves more than motivational fluff. Let&apos;s talk real performance.
          </p>
          <Button asChild size="lg">
            <Link href="/contact">Contact Me</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
