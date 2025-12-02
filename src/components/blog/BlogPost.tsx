'use client'

import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Calendar, Clock, User, Share2 } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { Button } from '@/components/ui/button'
import type { Database } from '@/types/database'

type BlogPost = Database['public']['Tables']['blog_posts']['Row']

interface BlogPostProps {
  post: BlogPost
  author?: {
    full_name: string | null
    email: string
  }
}

export function BlogPost({ post, author }: BlogPostProps) {
  const readingTime = Math.ceil((post.content?.length || 0) / 1000)

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt || '',
          url: window.location.href,
        })
      } catch (err) {
        console.error('Error sharing:', err)
      }
    }
  }

  return (
    <article className="max-w-4xl mx-auto">
      {/* Header */}
      <header className="space-y-6 mb-8">
        {!post.is_published && (
          <Badge variant="secondary">Draft</Badge>
        )}
        
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          {post.title}
        </h1>

        {post.excerpt && (
          <p className="text-xl text-muted-foreground">
            {post.excerpt}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          {author?.full_name && (
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{author.full_name}</span>
            </div>
          )}
          {post.published_at && (
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <time dateTime={post.published_at}>
                {formatDistanceToNow(new Date(post.published_at), { addSuffix: true })}
              </time>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{readingTime} min read</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleShare}
            className="ml-auto gap-2"
          >
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        </div>

        <Separator />
      </header>

      {/* Featured Image */}
      {post.featured_image && (
        <div className="relative aspect-[21/9] rounded-sm overflow-hidden mb-8">
          <Image
            src={post.featured_image}
            alt={post.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
          />
        </div>
      )}

      {/* Content */}
      <div 
        className="prose prose-lg dark:prose-invert max-w-none mb-12"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Footer */}
      <footer className="border-t pt-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium">Written by</p>
            <p className="text-lg font-semibold">{author?.full_name || 'Anonymous'}</p>
          </div>
          <Button
            variant="outline"
            onClick={handleShare}
            className="gap-2"
          >
            <Share2 className="h-4 w-4" />
            Share Article
          </Button>
        </div>
      </footer>
    </article>
  )
}
