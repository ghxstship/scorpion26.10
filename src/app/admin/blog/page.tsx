import { Suspense } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { formatDistanceToNow } from 'date-fns'

export const metadata = {
  title: 'Blog Posts | Admin',
  description: 'Manage your blog posts',
}

async function BlogPostsList() {
  const supabase = await createClient()
  
  const { data: posts, error } = await supabase
    .from('blog_posts')
    .select('*, users(full_name)')
    .order('created_at', { ascending: false })

  if (error) {
    return <div className="text-destructive">Error loading posts: {error.message}</div>
  }

  return (
    <div className="space-y-4">
      {posts?.map((post: any) => (
        <Link key={post.id} href={`/admin/blog/${post.id}`}>
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1 flex-1">
                  <CardTitle className="line-clamp-1">{post.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {post.excerpt}
                  </CardDescription>
                </div>
                <Badge variant={post.is_published ? 'default' : 'secondary'}>
                  {post.is_published ? 'Published' : 'Draft'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>By {post.users?.full_name || 'Unknown'}</span>
                <span>•</span>
                <span>
                  {post.published_at
                    ? formatDistanceToNow(new Date(post.published_at), { addSuffix: true })
                    : 'Not published'}
                </span>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}

export default function BlogPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Blog Posts</h1>
          <p className="text-muted-foreground">
            Create and manage your blog content
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/blog/new">
            <Plus className="mr-2 h-4 w-4" />
            New Post
          </Link>
        </Button>
      </div>

      <Suspense fallback={<BlogPostsListSkeleton />}>
        <BlogPostsList />
      </Suspense>
    </div>
  )
}

function BlogPostsListSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <Card key={i}>
          <CardHeader>
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full mt-2" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-1/2" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
