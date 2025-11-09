'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Card, CardHeader, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, User } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import type { Database } from '@/types/database'

type BlogPost = Database['public']['Tables']['blog_posts']['Row']

interface BlogCardProps {
  post: BlogPost
  author?: {
    full_name: string | null
  }
}

export function BlogCard({ post, author }: BlogCardProps) {
  const readingTime = Math.ceil((post.content?.length || 0) / 1000) // ~200 words per minute
  
  return (
    <Card className="group h-full flex flex-col overflow-hidden transition-all hover:shadow-lg">
      <Link href={`/blog/${post.slug}`} className="relative aspect-[16/9] overflow-hidden">
        {post.featured_image ? (
          <Image
            src={post.featured_image}
            alt={post.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <span className="text-muted-foreground">No image</span>
          </div>
        )}
        {!post.is_published && (
          <Badge variant="secondary" className="absolute top-2 right-2">
            Draft
          </Badge>
        )}
      </Link>

      <CardHeader className="flex-1 space-y-3">
        <Link 
          href={`/blog/${post.slug}`}
          className="hover:underline"
        >
          <h3 className="font-semibold text-xl line-clamp-2">
            {post.title}
          </h3>
        </Link>
        
        {post.excerpt && (
          <p className="text-sm text-muted-foreground line-clamp-3">
            {post.excerpt}
          </p>
        )}
      </CardHeader>

      <CardFooter className="flex items-center justify-between text-sm text-muted-foreground border-t pt-4">
        <div className="flex items-center gap-4">
          {author?.full_name && (
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>{author.full_name}</span>
            </div>
          )}
          {post.published_at && (
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDistanceToNow(new Date(post.published_at), { addSuffix: true })}</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          <span>{readingTime} min read</span>
        </div>
      </CardFooter>
    </Card>
  )
}
