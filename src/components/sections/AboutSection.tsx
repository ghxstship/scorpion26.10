/**
 * Meet Head Coach Matthew Alarcon Section
 * Short bio for homepage
 */
export function AboutSection() {
  return (
    <section className="bg-[var(--grey-950)]">
      <div className="mx-auto max-w-4xl">
        {/* Page Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 font-[family-name:var(--font-bebas)] text-6xl font-black uppercase tracking-wider text-[var(--grey-100)] md:text-7xl lg:text-8xl">
            Meet Head Coach <span className="text-[var(--gold-600)]">Matthew Alarcon</span>
          </h1>
        </div>

        {/* Bio Content */}
        <div className="space-y-6 text-lg leading-relaxed text-[var(--grey-300)]">
          <p className="text-2xl font-bold text-[var(--grey-100)]">
            20 years. Four continents. NBA players, Olympians, Euro League pros, and everyone in between.
          </p>
          
          <p>
            Matthew Alarcon has built his career training athletes who actually have to perform—not just look good doing it. From the NBA Combine to a championship run in China to strength programs for Gold Medal Olympians, he&apos;s been in the rooms where results matter and excuses don&apos;t fly.
          </p>
          
          <p>
            He founded 456AF in 2025 with a simple mission: bring pro-level training to athletes who are serious about getting better. No fluff. No gimmicks. Just two decades of experience packed into programs that work.
          </p>
          
          <p className="font-bold text-[var(--grey-100)]">
            Based in Orlando. Certified to coach. Proven to deliver.
          </p>
        </div>
      </div>
    </section>
  )
}
