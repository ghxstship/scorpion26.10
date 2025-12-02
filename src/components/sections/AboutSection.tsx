/**
 * The 456AF Story Section
 * Brand origin story with direct, no-nonsense messaging
 */
export function AboutSection() {
  return (
    <section className="bg-[var(--grey-950)]">
      <div className="mx-auto max-w-4xl">
        {/* Page Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 font-[family-name:var(--font-bebas)] text-6xl font-black uppercase tracking-wider text-[var(--grey-100)] md:text-7xl lg:text-8xl">
            The 456AF <span className="text-[var(--gold-600)]">Story</span>
          </h1>
        </div>

        {/* Story Content */}
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
            If not, there&apos;s a smoothie bar down the street. They&apos;d love to have you.
          </p>
        </div>
      </div>
    </section>
  )
}
