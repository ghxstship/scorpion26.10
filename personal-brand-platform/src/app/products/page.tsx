import Link from 'next/link'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BookOpen, Video, Users, Zap } from 'lucide-react'

// Mock data - will be replaced with actual database queries
const products = [
  {
    id: '1',
    title: 'The Excellence Blueprint',
    description: 'A comprehensive guide to achieving peak performance in every aspect of your life.',
    type: 'digital',
    price: 4999,
    image: null,
    icon: BookOpen,
  },
  {
    id: '2',
    title: 'Elite Performance Masterclass',
    description: '12-week intensive program with video lessons, worksheets, and live coaching sessions.',
    type: 'subscription',
    price: 29999,
    image: null,
    icon: Video,
  },
  {
    id: '3',
    title: 'Group Coaching Program',
    description: 'Join a community of high achievers in monthly group coaching sessions.',
    type: 'subscription',
    price: 19999,
    image: null,
    icon: Users,
  },
  {
    id: '4',
    title: '1-on-1 Coaching Session',
    description: 'Personal coaching session tailored to your specific goals and challenges.',
    type: 'service',
    price: 49999,
    image: null,
    icon: Zap,
  },
]

export default function ProductsPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Programs & Products
        </h1>
        <p className="mb-12 text-lg text-muted-foreground md:text-xl">
          Choose the right program to accelerate your journey to excellence
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
        {products.map((product) => {
          const Icon = product.icon
          return (
            <Card key={product.id} className="flex flex-col">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">{product.title}</CardTitle>
                <CardDescription className="text-base">
                  {product.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="mb-4">
                  <span className="text-3xl font-bold">
                    ${(product.price / 100).toFixed(0)}
                  </span>
                  {product.type === 'subscription' && (
                    <span className="text-muted-foreground">/month</span>
                  )}
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  {product.type === 'digital' && (
                    <>
                      <p>✓ Instant digital download</p>
                      <p>✓ Lifetime access</p>
                      <p>✓ Bonus resources included</p>
                    </>
                  )}
                  {product.type === 'subscription' && (
                    <>
                      <p>✓ Cancel anytime</p>
                      <p>✓ New content monthly</p>
                      <p>✓ Community access</p>
                    </>
                  )}
                  {product.type === 'service' && (
                    <>
                      <p>✓ 60-minute session</p>
                      <p>✓ Personalized action plan</p>
                      <p>✓ Follow-up resources</p>
                    </>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={`/products/${product.id}`}>Learn More</Link>
                </Button>
              </CardFooter>
            </Card>
          )
        })}
      </div>

      <div className="mt-16 rounded-2xl bg-muted/50 p-8 text-center md:p-12">
        <h2 className="mb-4 text-2xl font-bold md:text-3xl">
          Not sure which program is right for you?
        </h2>
        <p className="mb-6 text-muted-foreground">
          Schedule a free consultation to discuss your goals and find the perfect fit.
        </p>
        <Button size="lg" asChild>
          <Link href="/contact">Schedule Free Consultation</Link>
        </Button>
      </div>
    </div>
  )
}
