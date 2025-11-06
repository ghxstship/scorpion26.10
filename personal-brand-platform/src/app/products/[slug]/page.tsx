import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const supabase = await createClient()
  
  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', params.slug)
    .eq('is_active', true)
    .single()

  if (error || !product) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            {(product as any).image_url ? (
              <Image
                src={(product as any).image_url}
                alt={(product as any).title}
                width={600}
                height={600}
                className="rounded-lg w-full"
              />
            ) : (
              <div className="bg-gray-200 rounded-lg aspect-square flex items-center justify-center">
                <span className="text-gray-400">No image</span>
              </div>
            )}
          </div>

          <div>
            <h1 className="text-4xl font-bold mb-4">{(product as any).title}</h1>
            
            <div className="mb-6">
              <span className="text-3xl font-bold">${(product as any).price}</span>
            </div>

            <p className="text-gray-600 mb-8">
              {(product as any).description || 'No description available.'}
            </p>

            <div className="mb-6">
              <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm">
                {(product as any).type}
              </span>
            </div>

            <Button size="lg" className="w-full md:w-auto">
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
