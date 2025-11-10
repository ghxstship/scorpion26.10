import { createClient } from '@/lib/supabase/server'
export const dynamic = 'force-dynamic'

import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import { ShoppingCart, Check, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

/**
 * Product Detail Page - Spartan Warrior Design
 * Full product information with large images and detailed specs
 */

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const supabase = await createClient()
  
  const { data: product, error } = await (supabase as any)
    .from('products')
    .select('*')
    .eq('id', params.id)
    .eq('is_active', true)
    .single()

  if (error || !product) {
    notFound()
  }
  
  const prod = product as any

  // Mock features for demo (in production, these would come from the database)
  const features = [
    'Premium quality materials',
    'Expert guidance included',
    'Money-back guarantee',
    'Lifetime support access',
  ]

  return (
    <main className="min-h-screen bg-[var(--grey-950)]">
      <div className="container mx-auto px-6 py-24">
        {/* Back Button */}
        <Link 
          href="/products" 
          className="mb-8 inline-flex items-center gap-2 text-[var(--gold-600)] transition-colors hover:text-[var(--gold-500)]"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="font-bold uppercase tracking-wide">Back to Programs</span>
        </Link>

        <div className="grid gap-12 md:grid-cols-2">
          {/* Product Image */}
          <div className="relative">
            {(product && typeof product === 'object' && 'image_url' in product && (product as any).image_url) ? (
              <div className="relative aspect-square overflow-hidden rounded-sm border-2 border-[var(--grey-800)]">
                <Image
                  src={String(prod.image_url)}
                  alt={(product && typeof product === 'object' && 'title' in product) ? String(prod.title) : 'Product'}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            ) : (
              <div className="flex aspect-square items-center justify-center rounded-sm border-2 border-[var(--grey-800)] bg-[var(--grey-900)]">
                <span className="font-[family-name:var(--font-bebas)] text-4xl uppercase text-[var(--grey-700)]">
                  No Image
                </span>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            {/* Type Badge */}
            <div className="mb-6">
              <Badge className="font-[family-name:var(--font-bebas)] uppercase tracking-wide">
                {(product && typeof product === 'object' && 'type' in product) ? String(prod.type) : 'Product'}
              </Badge>
            </div>

            {/* Title */}
            <h1 className="mb-6 font-[family-name:var(--font-bebas)] text-5xl font-black uppercase tracking-wider text-[var(--grey-100)] md:text-6xl lg:text-7xl">
              {(product && typeof product === 'object' && 'title' in product) ? String(prod.title) : 'Product'}
            </h1>
            
            {/* Price */}
            <div className="mb-8 border-b border-[var(--grey-800)] pb-8">
              <span className="font-[family-name:var(--font-bebas)] text-6xl font-black text-[var(--gold-600)]">
                ${(product && typeof product === 'object' && 'price' in product) ? (Number(prod.price) / 100).toFixed(0) : '0'}
              </span>
              {(product && typeof product === 'object' && 'type' in product && String(prod.type) === 'subscription') && (
                <span className="ml-2 text-sm uppercase tracking-wide text-[var(--grey-500)]">/month</span>
              )}
            </div>

            {/* Description */}
            <p className="mb-8 text-lg leading-relaxed text-[var(--grey-300)]">
              {(product && typeof product === 'object' && 'description' in product && prod.description) ? String(prod.description) : 'No description available.'}
            </p>

            {/* Features */}
            <div className="mb-8 space-y-3">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-[var(--gold-600)]" />
                  <span className="text-[var(--grey-300)]">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <Button size="lg" className="w-full gap-2 md:w-auto">
              <ShoppingCart className="h-5 w-5" />
              Add to Cart
            </Button>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="mt-24 rounded-sm border-2 border-[var(--gold-600)] bg-[var(--grey-900)] p-12 md:p-16">
          <h2 className="mb-6 text-center font-[family-name:var(--font-bebas)] text-4xl font-black uppercase tracking-wider text-[var(--grey-100)] md:text-5xl">
            Ready to <span className="text-[var(--gold-600)]">Transform?</span>
          </h2>
          <p className="mb-8 text-center text-lg text-[var(--grey-300)]">
            Join thousands of athletes who have achieved their fitness goals with 456Pro.
          </p>
          <div className="flex justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">Schedule Consultation</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
