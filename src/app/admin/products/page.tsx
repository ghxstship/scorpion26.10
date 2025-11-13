import { Suspense } from 'react'
export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Tables } from '@/types/database'

export const metadata = {
  title: 'Products | Admin',
  description: 'Manage your products',
}

async function ProductsList() {
  const supabase = await createClient()
  
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return <div className="text-destructive">Error loading products: {error.message}</div>
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price)
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {products?.map((product: Tables<'products'>) => (
        <Link key={product.id} href={`/admin/products/${product.id}`}>
          <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="line-clamp-1">{product.title}</CardTitle>
                <Badge variant={product.is_active ? 'default' : 'secondary'}>
                  {product.is_active ? 'Active' : 'Inactive'}
                </Badge>
              </div>
              <CardDescription className="line-clamp-2">
                {product.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{formatPrice(product.price)}</span>
                <Badge variant="outline">{product.type}</Badge>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground">
            Manage your products and inventory
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/products/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Link>
        </Button>
      </div>

      <Suspense fallback={<ProductsListSkeleton />}>
        <ProductsList />
      </Suspense>
    </div>
  )
}

function ProductsListSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <Card key={i}>
          <CardHeader>
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full mt-2" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-24" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
