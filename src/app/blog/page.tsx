import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { formatDate } from '@/lib/utils'
import { Calendar, User, ArrowRight } from 'lucide-react'

// Mock data - will be replaced with actual database queries
const blogPosts = [
  {
    id: '1',
    title: 'The Path to Excellence: 5 Key Principles',
    slug: 'path-to-excellence-5-key-principles',
    excerpt: 'Discover the fundamental principles that separate good from great and learn how to apply them in your daily life.',
    featured_image: null,
    author: 'Admin',
    published_at: new Date('2024-01-15'),
    category: 'Performance',
  },
  {
    id: '2',
    title: 'Building Mental Resilience in High-Pressure Situations',
    slug: 'building-mental-resilience',
    excerpt: 'Learn proven strategies for maintaining composure and peak performance when the stakes are highest.',
    featured_image: null,
    author: 'Admin',
    published_at: new Date('2024-01-10'),
    category: 'Mindset',
  },
  {
    id: '3',
    title: 'The Science of Habit Formation',
    slug: 'science-of-habit-formation',
    excerpt: 'Understanding how habits work and how to leverage them for lasting transformation.',
    featured_image: null,
    author: 'Admin',
    published_at: new Date('2024-01-05'),
    category: 'Growth',
  },
]

const categories = ['All', 'Performance', 'Mindset', 'Growth', 'Leadership']

export default function BlogPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="mx-auto max-w-4xl text-center mb-12">
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Blog & Insights
        </h1>
        <p className="text-lg text-muted-foreground md:text-xl">
          Strategies, insights, and stories to help you achieve peak performance
        </p>
      </div>

      <div className="mb-8 flex flex-wrap gap-2 justify-center">
        {categories.map((category) => (
          <button
            key={category}
            className="px-4 py-2 rounded-full border hover:bg-accent transition-colors"
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <Card key={post.id} className="flex flex-col hover:shadow-lg transition-shadow">
            <div className="h-48 bg-muted rounded-t-xl" />
            <CardHeader>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {formatDate(post.published_at)}
                </span>
                <span className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {post.author}
                </span>
              </div>
              <CardTitle className="line-clamp-2">{post.title}</CardTitle>
              <CardDescription className="line-clamp-3">
                {post.excerpt}
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-auto">
              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center text-primary hover:underline"
              >
                Read More
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center">
        <button className="px-6 py-3 border rounded-md hover:bg-accent transition-colors">
          Load More Articles
        </button>
      </div>
    </div>
  )
}
