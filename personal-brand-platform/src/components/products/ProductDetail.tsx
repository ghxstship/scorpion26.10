'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ShoppingCart, Heart, Share2, Check } from 'lucide-react'
import type { Database } from '@/types/database'

type Product = Database['public']['Tables']['products']['Row']
type ProductVariant = Database['public']['Tables']['product_variants']['Row']

interface ProductDetailProps {
  product: Product
  variants?: ProductVariant[]
  onAddToCart?: (product: Product, variant?: ProductVariant) => void
}

export function ProductDetail({ product, variants = [], onAddToCart }: ProductDetailProps) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    variants[0]
  )
  const [isFavorite, setIsFavorite] = useState(false)

  const currentPrice = selectedVariant?.price || product.price

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price)
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.title,
          text: product.description || '',
          url: window.location.href,
        })
      } catch (err) {
        console.error('Error sharing:', err)
      }
    }
  }

  const features = [
    'Instant digital delivery',
    'Lifetime access',
    '30-day money-back guarantee',
    'Premium support included',
  ]

  return (
    <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
      {/* Product Images */}
      <div className="space-y-4">
        <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-muted-foreground">No image available</span>
            </div>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary">{product.type}</Badge>
            {!product.is_active && (
              <Badge variant="destructive">Unavailable</Badge>
            )}
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            {product.title}
          </h1>
          <p className="text-xl text-muted-foreground">
            {product.description}
          </p>
        </div>

        <Separator />

        {/* Price */}
        <div className="space-y-2">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold">
              {formatPrice(currentPrice)}
            </span>
            {product.type === 'subscription' && (
              <span className="text-muted-foreground">/ month</span>
            )}
          </div>
        </div>

        {/* Variants */}
        {variants.length > 0 && (
          <div className="space-y-3">
            <label className="text-sm font-medium">Select Option:</label>
            <div className="flex flex-wrap gap-2">
              {variants.map((variant) => (
                <Button
                  key={variant.id}
                  variant={selectedVariant?.id === variant.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedVariant(variant)}
                  disabled={!variant.is_active}
                >
                  {variant.name}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            size="lg"
            className="flex-1 gap-2"
            onClick={() => onAddToCart?.(product, selectedVariant)}
            disabled={!product.is_active}
          >
            <ShoppingCart className="h-5 w-5" />
            Add to Cart
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => setIsFavorite(!isFavorite)}
          >
            <Heart className={isFavorite ? 'fill-current' : ''} />
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={handleShare}
          >
            <Share2 />
          </Button>
        </div>

        {/* Features */}
        <div className="space-y-3 pt-4">
          <h3 className="font-semibold">What&apos;s included:</h3>
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-green-600" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Additional Info Tabs */}
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="description" className="flex-1">Description</TabsTrigger>
            <TabsTrigger value="details" className="flex-1">Details</TabsTrigger>
            <TabsTrigger value="reviews" className="flex-1">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="space-y-4 pt-4">
            <p className="text-muted-foreground">
              {product.description || 'No description available.'}
            </p>
          </TabsContent>
          <TabsContent value="details" className="space-y-4 pt-4">
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Type:</dt>
                <dd className="font-medium">{product.type}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">SKU:</dt>
                <dd className="font-medium">{product.id.slice(0, 8)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Status:</dt>
                <dd className="font-medium">
                  {product.is_active ? 'Available' : 'Unavailable'}
                </dd>
              </div>
            </dl>
          </TabsContent>
          <TabsContent value="reviews" className="space-y-4 pt-4">
            <p className="text-muted-foreground text-center py-8">
              No reviews yet. Be the first to review this product!
            </p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
