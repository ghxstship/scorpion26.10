import { formatDate } from '@/lib/utils'
import { Calendar, User, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

// Mock data - will be replaced with actual database query
const blogPost = {
  id: '1',
  title: 'The Path to Excellence: 5 Key Principles',
  content: `
    <h2>Introduction</h2>
    <p>Excellence isn't achieved overnight. It's the result of consistent effort, strategic thinking, and unwavering commitment to growth. In this article, we'll explore five fundamental principles that separate good from great.</p>
    
    <h2>1. Clarity of Purpose</h2>
    <p>The first step toward excellence is knowing exactly what you're working toward. Without a clear purpose, effort becomes scattered and ineffective. Define your goals with precision and revisit them regularly.</p>
    
    <h2>2. Disciplined Execution</h2>
    <p>Knowing what to do isn't enough—you must do it consistently. Excellence requires discipline, especially when motivation wanes. Build systems and habits that support your goals.</p>
    
    <h2>3. Continuous Learning</h2>
    <p>The pursuit of excellence is never complete. Commit to lifelong learning, seek feedback actively, and remain open to new perspectives. Your willingness to learn determines your ceiling.</p>
    
    <h2>4. Resilience Under Pressure</h2>
    <p>Setbacks are inevitable. What matters is how you respond. Develop mental toughness, learn from failures, and use challenges as opportunities for growth.</p>
    
    <h2>5. Strategic Rest</h2>
    <p>Peak performance requires recovery. Excellence isn't about working harder—it's about working smarter. Prioritize rest, recovery, and renewal to sustain long-term performance.</p>
    
    <h2>Conclusion</h2>
    <p>These five principles form the foundation of excellence. Apply them consistently, and you'll see transformation in every area of your life.</p>
  `,
  excerpt: 'Discover the fundamental principles that separate good from great.',
  featured_image: null,
  author: 'Admin',
  published_at: new Date('2024-01-15'),
  category: 'Performance',
}

export default function BlogPostPage() {
  return (
    <article className="container py-12 md:py-20">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/blog"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {formatDate(blogPost.published_at)}
            </span>
            <span className="flex items-center gap-1">
              <User className="h-4 w-4" />
              {blogPost.author}
            </span>
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs">
              {blogPost.category}
            </span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
            {blogPost.title}
          </h1>

          <p className="text-xl text-muted-foreground">{blogPost.excerpt}</p>
        </div>

        <div className="h-96 bg-muted rounded-xl mb-8" />

        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: blogPost.content }}
        />

        <div className="mt-12 border-t pt-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Share this article</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Twitter</Button>
                <Button variant="outline" size="sm">LinkedIn</Button>
                <Button variant="outline" size="sm">Facebook</Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-muted/50 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Performance?</h3>
          <p className="text-muted-foreground mb-6">
            Explore our programs and start your journey to excellence today.
          </p>
          <Button size="lg" asChild>
            <Link href="/products">View Programs</Link>
          </Button>
        </div>
      </div>
    </article>
  )
}
