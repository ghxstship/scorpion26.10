import Link from 'next/link'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Package, Shirt, Dumbbell, Watch, ShoppingBag, Sparkles } from 'lucide-react'

export default function CustomsPage() {
  const productCategories = [
    {
      icon: Shirt,
      title: 'Apparel',
      description: 'Premium training wear designed for performance',
      items: ['Training shirts', 'Performance shorts', 'Hoodies & jackets', 'Compression gear'],
    },
    {
      icon: Dumbbell,
      title: 'Equipment',
      description: 'Professional-grade training equipment',
      items: ['Resistance bands', 'Training accessories', 'Recovery tools', 'Custom weights'],
    },
    {
      icon: Watch,
      title: 'Tech & Accessories',
      description: 'Smart gear to track and optimize performance',
      items: ['Fitness trackers', 'Training journals', 'Water bottles', 'Gym bags'],
    },
  ]

  const featuredProducts = [
    {
      id: '1',
      name: '456Pro Performance Tee',
      description: 'Moisture-wicking, breathable fabric designed for intense training sessions',
      price: 4500,
      category: 'Apparel',
      icon: Shirt,
    },
    {
      id: '2',
      name: '456Pro Resistance Band Set',
      description: 'Complete set of 5 resistance bands for all fitness levels',
      price: 7900,
      category: 'Equipment',
      icon: Dumbbell,
    },
    {
      id: '3',
      name: '456Pro Training Journal',
      description: 'Track your progress with our custom-designed training journal',
      price: 2900,
      category: 'Accessories',
      icon: Package,
    },
    {
      id: '4',
      name: '456Pro Elite Gym Bag',
      description: 'Spacious, durable bag with compartments for all your training gear',
      price: 8900,
      category: 'Accessories',
      icon: ShoppingBag,
    },
  ]

  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <Package className="h-20 w-20 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">456Customs</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Premium fitness products customized for the 456Pro training methodology.
            Gear that performs as hard as you do.
          </p>
        </div>

        {/* Why 456Customs */}
        <div className="mb-16 bg-muted/50 rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-8 text-center">Why Choose 456Customs?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Sparkles className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
              <p className="text-muted-foreground">
                Every product is crafted with the highest quality materials and tested by our
                coaches
              </p>
            </div>
            <div className="text-center">
              <Dumbbell className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Performance-Driven</h3>
              <p className="text-muted-foreground">
                Designed specifically to enhance your training across all 456Pro verticals
              </p>
            </div>
            <div className="text-center">
              <Package className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Custom Designed</h3>
              <p className="text-muted-foreground">
                Exclusive 456Pro branding and designs you won&apos;t find anywhere else
              </p>
            </div>
          </div>
        </div>

        {/* Product Categories */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Product Categories</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {productCategories.map((category, index) => (
              <Card key={index}>
                <CardHeader>
                  <category.icon className="h-12 w-12 text-primary mb-4" />
                  <CardTitle className="text-2xl">{category.title}</CardTitle>
                  <CardDescription className="text-base">{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.items.map((item, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground">
                        • {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Featured Products */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Products</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => {
              const Icon = product.icon
              return (
                <Card key={product.id} className="flex flex-col">
                  <CardHeader>
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <CardDescription className="text-sm">
                      {product.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="text-2xl font-bold">
                      ${(product.price / 100).toFixed(2)}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {product.category}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full" variant="outline">
                      <Link href="/contact">Pre-Order</Link>
                    </Button>
                  </CardFooter>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Club456 Member Benefits */}
        <div className="mb-16 bg-primary/5 rounded-2xl p-8 md:p-12 border-2 border-primary/20">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Club456 Member Exclusive</h2>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              Club456 members receive special discounts on all 456Customs products.
              Plus members get 15% off, Elite members get 25% off!
            </p>
            <Button size="lg" asChild>
              <Link href="/community">Join Club456</Link>
            </Button>
          </div>
        </div>

        {/* Custom Orders */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Custom Team Orders</h2>
          <Card className="max-w-3xl mx-auto">
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground mb-6">
                Looking to outfit your team, gym, or organization with custom 456Pro gear?
                We offer bulk ordering with custom branding options.
              </p>
              <div className="grid md:grid-cols-3 gap-4 text-center mb-6">
                <div>
                  <div className="text-2xl font-bold text-primary mb-1">10+</div>
                  <div className="text-sm text-muted-foreground">Minimum Order</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary mb-1">20%</div>
                  <div className="text-sm text-muted-foreground">Bulk Discount</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary mb-1">Free</div>
                  <div className="text-sm text-muted-foreground">Custom Branding</div>
                </div>
              </div>
              <div className="text-center">
                <Button asChild>
                  <Link href="/contact">Request Custom Quote</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Gear Up?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Elevate your training with 456Customs. Premium products designed for champions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/contact">Shop Now</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/products">View Training Programs</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
