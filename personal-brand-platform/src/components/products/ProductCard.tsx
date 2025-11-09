'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Card, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ShoppingCart, Flame } from 'lucide-react'
import type { Database } from '@/types/database'

/**
 * Spartan Warrior Product Card Component
 * REDCON1-inspired design with high contrast and bold typography
 */

type Product = Database['public']['Tables']['products']['Row']

interface ProductCardProps {
  product: Product
  onAddToCart?: (product: Product) => void
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price)
  }

  const getProductTypeBadge = (type: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'outline'> = {
      digital: 'default',
      physical: 'secondary',
      service: 'outline',
      subscription: 'default',
    }
    return variants[type] || 'default'
  }

  // Check if product is new (created within last 30 days)
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
  const isNew = product.created_at 
    ? new Date(product.created_at) > thirtyDaysAgo
    : false

  return (
    <Card className="group h-full flex flex-col overflow-hidden">
      {/* Product Image */}
      <Link href={`/products/${product.id}`} className="relative aspect-square overflow-hidden bg-[var(--grey-900)]">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.title}
            fill
            className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-[var(--grey-800)] flex items-center justify-center">
            <span className="font-[family-name:var(--font-bebas)] text-2xl uppercase text-[var(--grey-600)]">No Image</span>
          </div>
        )}
        
        {/* Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          {isNew && (
            <Badge className="bg-[var(--red-700)] border-2 border-[var(--red-900)] text-[var(--grey-50)] font-[family-name:var(--font-bebas)] uppercase tracking-wide shadow-[var(--glow-red)]">
              <Flame className="mr-1 h-3 w-3" />
              New
            </Badge>
          )}
          <Badge 
            variant={getProductTypeBadge(product.type)} 
            className="font-[family-name:var(--font-bebas)] uppercase tracking-wide"
          >
            {product.type}
          </Badge>
        </div>

        {/* Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--grey-950)] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </Link>

      {/* Product Info */}
      <CardHeader className="flex-1 space-y-3">
        <Link 
          href={`/products/${product.id}`}
          className="group/link"
        >
          <h3 className="font-[family-name:var(--font-bebas)] text-2xl font-bold uppercase leading-tight tracking-wide text-[var(--grey-100)] transition-colors group-hover/link:text-[var(--gold-600)] line-clamp-2">
            {product.title}
          </h3>
        </Link>
        {product.description && (
          <p className="text-sm text-[var(--grey-400)] leading-relaxed line-clamp-3">
            {product.description}
          </p>
        )}
      </CardHeader>

      {/* Footer with Price and CTA */}
      <CardFooter className="flex items-center justify-between gap-4 border-t-0">
        <div className="flex flex-col">
          <span className="font-[family-name:var(--font-bebas)] text-3xl font-black text-[var(--gold-600)]">
            {formatPrice(product.price)}
          </span>
          {product.type === 'subscription' && (
            <span className="text-xs uppercase tracking-wide text-[var(--grey-500)]">per month</span>
          )}
        </div>
        
        <Button
          onClick={() => onAddToCart?.(product)}
          size="sm"
          className="gap-2"
          disabled={!product.is_active}
        >
          <ShoppingCart className="h-4 w-4" />
          Add
        </Button>
      </CardFooter>
    </Card>
  )
}
