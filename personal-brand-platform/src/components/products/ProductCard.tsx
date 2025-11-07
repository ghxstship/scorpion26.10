'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Card, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ShoppingCart } from 'lucide-react'
import type { Database } from '@/types/database'

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

  return (
    <Card className="group h-full flex flex-col overflow-hidden transition-all hover:shadow-lg">
      <Link href={`/products/${product.id}`} className="relative aspect-square overflow-hidden">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <span className="text-muted-foreground">No image</span>
          </div>
        )}
        <Badge 
          variant={getProductTypeBadge(product.type)} 
          className="absolute top-2 right-2"
        >
          {product.type}
        </Badge>
      </Link>

      <CardHeader className="flex-1">
        <Link 
          href={`/products/${product.id}`}
          className="hover:underline"
        >
          <h3 className="font-semibold text-lg line-clamp-2">
            {product.title}
          </h3>
        </Link>
        {product.description && (
          <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
            {product.description}
          </p>
        )}
      </CardHeader>

      <CardFooter className="flex items-center justify-between gap-2">
        <div className="flex flex-col">
          <span className="text-2xl font-bold">
            {formatPrice(product.price)}
          </span>
          {product.type === 'subscription' && (
            <span className="text-xs text-muted-foreground">per month</span>
          )}
        </div>
        
        <Button
          onClick={() => onAddToCart?.(product)}
          size="sm"
          className="gap-2"
          disabled={!product.is_active}
        >
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}
