import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

/**
 * About Page - 456AF Story + Meet Your Coach
 * Brand story and full biography of Head Coach Matthew Alarcon
 */
export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[var(--grey-950)]">
      <div className="container mx-auto px-6 py-24">
        {/* The 456AF Story */}
        <section className="mx-auto max-w-4xl mb-24">
          <div className="mb-12 text-center">
            <h1 className="mb-4 font-[family-name:var(--font-bebas)] text-6xl font-black uppercase tracking-wider text-[var(--grey-100)] md:text-7xl lg:text-8xl">
              The 456AF <span className="text-[var(--gold-600)]">Story</span>
            </h1>
          </div>

          <div className="space-y-6 text-lg leading-relaxed text-[var(--grey-300)]">
            <p className="text-2xl font-bold text-[var(--grey-100)]">Listen up.</p>
            
            <p>
              456AF was founded in 2025 by Head Coach Matthew Alarcon in Orlando, FL, with one mission: build athletes who perform, not posers who take mirror selfies between sets.
            </p>
            
            <p>
              This isn&apos;t a place to &quot;find yourself.&quot; You&apos;re not here for vibes. You&apos;re here because you&apos;re ready to put in work that actually moves the needle—and you want coaches who know the difference between training and just sweating.
            </p>
            
            <p>
              We run a full ecosystem: elite coaching programs, ProAFU certification academy for those ready to lead, and Team456—a community where accountability isn&apos;t optional and excuses get left at the door.
            </p>
            
            <p>
              Your comfort zone? Not our concern. Your results? That&apos;s the only thing that matters.
            </p>
            
            <p>
              So if you&apos;re ready to stop playing and start performing, welcome to the team.
            </p>
            
            <p className="text-[var(--grey-400)] italic">
              If not, there&apos;s a smoothie bar down the street. They&apos;d love to have you. Local AF.
            </p>
          </div>
        </section>

        {/* Why 456? */}
        <section className="mx-auto max-w-4xl mb-24">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-[family-name:var(--font-bebas)] text-5xl font-black uppercase tracking-wider text-[var(--grey-100)] md:text-6xl">
              Why <span className="text-[var(--gold-600)]">456?</span>
            </h2>
            <p className="text-xl text-[var(--grey-400)] italic">If you know, you know.</p>
          </div>

          <div className="space-y-6 text-lg leading-relaxed text-[var(--grey-300)]">
            <p>
              In the dice game Cee-lo, rolling 4-5-6 is an instant win. Game over. Collect your money. No debate.
            </p>
            
            <p>
              That&apos;s the standard we train to. Not &quot;pretty good.&quot; Not &quot;almost.&quot; The outcome that ends the conversation.
            </p>
            
            <p className="text-xl font-bold text-[var(--grey-100)]">
              You don&apos;t come here to compete. You come here to win.
            </p>
          </div>
        </section>

        {/* Meet Your Coach */}
        <div className="mx-auto max-w-4xl rounded-sm border-2 border-[var(--gold-600)] bg-[var(--grey-900)] p-12 md:p-16">
          <div className="text-center mb-12">
            <h2 className="mb-2 font-[family-name:var(--font-bebas)] text-5xl font-bold uppercase tracking-wide text-[var(--grey-100)] md:text-6xl">
              Meet Your <span className="text-[var(--gold-600)]">Coach</span>
            </h2>
            <h3 className="font-[family-name:var(--font-bebas)] text-3xl font-bold uppercase tracking-wide text-[var(--grey-300)] md:text-4xl">
              Head Coach Matthew Alarcon
            </h3>
          </div>

          <div className="space-y-6 text-lg leading-relaxed text-[var(--grey-300)]">
            <p className="text-xl font-bold text-[var(--grey-100)]">
              Matthew Alarcon has spent 20 years training athletes at the highest levels of competition—and he&apos;s got the receipts to prove it.
            </p>
            
            <p>
              His client list reads like a sports passport: NBA players, NCAA standouts, Euro League pros, USA Deaf Olympic Team members (Gold Medalists), USA Olympic Wheelchair Team members (Gold Medalists), and Senior National Team athletes from the USA, Sweden, Bosnia, and Turkey. He&apos;s worked with Under-20 National Team prospects and helped prepare three NBA pre-draft classes for the NBA Combine during his time at Attack Athletics in Chicago.
            </p>
            
            <p>
              In 2013, Matthew joined Galatasaray Sports Club in Istanbul—a Top 8 Euroleague team—where he designed their pre-season strength and conditioning program and shifted the organization&apos;s philosophy toward recovery and performance optimization. The following year in China, he built a program for the Shanxi Flames focused on maximum recovery during a brutal postseason stretch: 11 games in 16 days. The result? Undefeated. Championship. One-point margin. Job done.
            </p>
            
            <p>
              Earlier in his career, Matthew served as Head Strength and Conditioning Coach for the Florida Thundercats (ABA) and helped transform the women&apos;s basketball program at Manhattan College—reducing player games missed due to injury by 13.4% in a single season by implementing original fitness protocols designed to protect athletes from repetitive task injuries.
            </p>
            
            <p>
              He holds a Bachelor of Science with a Minor in Applied Human Nutrition from Mount Saint Vincent University in Halifax, Nova Scotia. His certifications include CSCS, USAW Sports Performance Coach, IASTM Smart Tools, and CrossFit Level 1 and Mobility—because credentials matter when you&apos;re telling someone to trust the process.
            </p>
            
            <p>
              Matthew founded 456AF in 2025 in Orlando, FL, to bring everything he&apos;s learned at the pro level to athletes who are ready to train like it. His philosophy is simple: show up, do the work, earn the results. No shortcuts. No hand-holding. Just proven methodology from someone who&apos;s been in the trenches with the best in the world.
            </p>
            
            <p className="text-xl font-bold text-[var(--gold-600)] pt-4">
              You&apos;re not hiring a trainer. You&apos;re hiring a coach who&apos;s built champions—and knows exactly what it takes to build you into one.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mx-auto mt-24 max-w-4xl rounded-sm border-2 border-[var(--gold-600)] bg-[var(--grey-900)] p-12 text-center md:p-16">
          <h2 className="mb-6 font-[family-name:var(--font-bebas)] text-4xl font-black uppercase tracking-wider text-[var(--grey-100)] md:text-5xl">
            Ready to <span className="text-[var(--gold-600)]">Train?</span>
          </h2>
          <p className="mb-8 text-lg text-[var(--grey-300)] max-w-2xl mx-auto">
            Stop reading about results. Start earning them.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-6">
            <Button size="lg" asChild>
              <Link href="/products">
                View Programs
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
