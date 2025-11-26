import { formatDate } from '@/lib/utils'
export const dynamic = 'force-dynamic'

import { Calendar, User, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/server'
import { typedFrom } from '@/lib/supabase/typed-client'
import { notFound } from 'next/navigation'
import { ContentRenderer } from '@/components/content/ContentRenderer'
import { generateSEO, generateArticleSchema } from '@/lib/utils/seo'
import type { Metadata } from 'next'
import Image from 'next/image'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const supabase = await createClient()
  
  const { data: post } = await typedFrom(supabase, 'blog_posts')
    .select('title, excerpt, featured_image')
    .eq('slug', params.slug)
    .eq('is_published', true)
    .single()
  
  if (!post) {
    return {}
  }
  
  return generateSEO({
    title: post.title,
    description: post.excerpt || '',
    path: `/blog/${params.slug}`,
    image: post.featured_image || undefined,
  })
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const supabase = await createClient()
  
  const { data: post, error } = await typedFrom(supabase, 'blog_posts')
    .select(`
      *,
      author:users(full_name)
    `)
    .eq('slug', params.slug)
    .eq('is_published', true)
    .single()
  
  if (error || !post) {
    notFound()
  }
  
  const articleSchema = generateArticleSchema({
    title: post.title,
    description: post.excerpt || '',
    author: post.author?.full_name || 'Admin',
    publishedDate: post.published_at || post.created_at,
    modifiedDate: post.created_at,
    image: post.featured_image || '',
    url: `/blog/${params.slug}`,
  })
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

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />

        <div className="mb-8">
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {formatDate(new Date(post.published_at || post.created_at))}
            </span>
            <span className="flex items-center gap-1">
              <User className="h-4 w-4" />
              {post.author?.full_name || 'Admin'}
            </span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-xl text-muted-foreground">{post.excerpt}</p>
          )}
        </div>

        {post.featured_image && (
          <div className="mb-8">
            <Image
              src={post.featured_image}
              alt={post.title}
              width={1200}
              height={630}
              className="rounded-xl w-full"
            />
          </div>
        )}

        <ContentRenderer content={post.content} />

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
          <p className="text-foreground/80 mb-6">
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
