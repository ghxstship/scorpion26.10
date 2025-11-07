'use client'

import { useState } from 'react'
import { BlogCard } from './BlogCard'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import type { Database } from '@/types/database'

type BlogPost = Database['public']['Tables']['blog_posts']['Row']

interface BlogListProps {
  initialPosts: BlogPost[]
  authors?: Record<string, { full_name: string | null }>
  hasMore?: boolean
  onLoadMore?: () => Promise<BlogPost[]>
}

export function BlogList({ 
  initialPosts, 
  authors = {}, 
  hasMore = false,
  onLoadMore 
}: BlogListProps) {
  const [posts, setPosts] = useState(initialPosts)
  const [loading, setLoading] = useState(false)
  const [hasMorePosts, setHasMorePosts] = useState(hasMore)

  const handleLoadMore = async () => {
    if (!onLoadMore || loading) return

    setLoading(true)
    try {
      const newPosts = await onLoadMore()
      setPosts([...posts, ...newPosts])
      if (newPosts.length === 0) {
        setHasMorePosts(false)
      }
    } catch (error) {
      console.error('Error loading more posts:', error)
    } finally {
      setLoading(false)
    }
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-2xl font-semibold mb-2">No posts yet</h3>
        <p className="text-muted-foreground">
          Check back soon for new content!
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard
            key={post.id}
            post={post}
            author={authors[post.author_id]}
          />
        ))}
      </div>

      {hasMorePosts && onLoadMore && (
        <div className="flex justify-center pt-4">
          <Button
            onClick={handleLoadMore}
            disabled={loading}
            size="lg"
            variant="outline"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              'Load More'
            )}
          </Button>
        </div>
      )}
    </div>
  )
}
