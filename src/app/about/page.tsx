/**
 * About Page - Meet Your Coach
 * Full biography of Head Coach Matthew Alarcon
 */
export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[var(--grey-950)]">
      <div className="container mx-auto px-6 py-24">
        {/* Page Header */}
        <div className="mx-auto max-w-4xl mb-16 text-center">
          <h1 className="mb-4 font-[family-name:var(--font-bebas)] text-6xl font-black uppercase tracking-wider text-[var(--grey-100)] md:text-7xl lg:text-8xl">
            Meet Your <span className="text-[var(--gold-600)]">Coach</span>
          </h1>
        </div>

        {/* Full Bio */}
        <div className="mx-auto max-w-4xl rounded-sm border-2 border-[var(--gold-600)] bg-[var(--grey-900)] p-12 md:p-16">
          <div className="text-center mb-12">
            <h2 className="mb-2 font-[family-name:var(--font-bebas)] text-4xl font-bold uppercase tracking-wide text-[var(--grey-100)] md:text-5xl">
              Head Coach Matthew Alarcon
            </h2>
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
      </div>
    </main>
  )
}
