import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export function CTASection() {
  return (
    <section className="py-20 md:py-32">
      <div className="container">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-primary/80 px-8 py-16 text-center md:px-16 md:py-24">
          <div className="relative z-10 mx-auto max-w-3xl">
            <h2 className="mb-6 text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl md:text-5xl">
              Ready to Unlock Your Full Potential?
            </h2>
            <p className="mb-8 text-lg text-primary-foreground/90 md:text-xl">
              Join thousands of high performers who have transformed their lives through proven
              strategies and expert guidance.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button
                size="lg"
                variant="secondary"
                asChild
                className="bg-background text-foreground hover:bg-background/90"
              >
                <Link href="/products">
                  Explore Programs
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
              >
                <Link href="/contact">Schedule a Call</Link>
              </Button>
            </div>
          </div>
          <div 
            className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:24px_24px]"
            aria-hidden="true"
          ></div>
        </div>
      </div>
    </section>
  )
}
