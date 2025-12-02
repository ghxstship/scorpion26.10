import { Check, X } from 'lucide-react'

/**
 * Is 456AF Right For You? Section
 * Two-column layout showing who this is for and who it isn't for
 */
export function FitCheckSection() {
  const forYou = [
    'You\'re done with programs that promise everything and deliver nothing',
    'You want coaching, not cheerleading',
    'You\'re ready to be held accountable—not just encouraged',
    'You understand that results require consistency, not motivation',
  ]

  const notForYou = [
    'You\'re looking for shortcuts or quick fixes',
    'You need constant validation to keep going',
    'You think showing up is the same as putting in work',
    'You\'re allergic to being coached',
  ]

  return (
    <section className="bg-[var(--grey-950)] py-24 md:py-32">
      <div className="container px-6">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-[family-name:var(--font-bebas)] text-4xl font-black uppercase tracking-wider text-[var(--grey-100)] md:text-5xl">
            Is 456AF <span className="text-[var(--gold-600)]">Right For You?</span>
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-[var(--grey-300)] md:text-xl">
            Let&apos;s save us both some time.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
          {/* This is for you */}
          <div className="rounded-sm border-2 border-[var(--gold-600)] bg-[var(--grey-900)] p-8">
            <h3 className="font-[family-name:var(--font-bebas)] text-2xl font-bold uppercase tracking-wide text-[var(--gold-600)] mb-6">
              This is for you if:
            </h3>
            <ul className="space-y-4">
              {forYou.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-[var(--gold-600)] flex-shrink-0 mt-0.5" />
                  <span className="text-[var(--grey-300)]">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* This isn't for you */}
          <div className="rounded-sm border border-[var(--grey-700)] bg-[var(--grey-850)] p-8">
            <h3 className="font-[family-name:var(--font-bebas)] text-2xl font-bold uppercase tracking-wide text-[var(--grey-400)] mb-6">
              This isn&apos;t for you if:
            </h3>
            <ul className="space-y-4">
              {notForYou.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <X className="h-6 w-6 text-[var(--red-600)] flex-shrink-0 mt-0.5" />
                  <span className="text-[var(--grey-400)]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
