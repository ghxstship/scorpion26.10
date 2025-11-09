'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Lock, Play } from 'lucide-react'
import Link from 'next/link'

interface VideoPlayerProps {
  video: {
    id: string
    title: string
    description?: string
    url: string
    provider: 'youtube' | 'vimeo' | 'custom'
    is_premium: boolean
    thumbnail_url?: string
  }
  hasAccess?: boolean
}

export function VideoPlayer({ video, hasAccess = true }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  // If premium video and user doesn't have access, show lock screen
  if (video.is_premium && !hasAccess) {
    return (
      <div className="relative aspect-video bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg overflow-hidden">
        {video.thumbnail_url && (
          <img
            src={video.thumbnail_url}
            alt={video.title}
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
        )}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-full p-6 mb-4">
            <Lock className="h-12 w-12 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">{video.title}</h3>
          <p className="text-gray-300 mb-6 max-w-md">
            This is premium content. Subscribe or purchase to unlock access.
          </p>
          <div className="flex gap-3">
            <Button asChild size="lg">
              <Link href="/products">View Plans</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // YouTube embed
  if (video.provider === 'youtube') {
    const videoId = extractYouTubeId(video.url)
    if (!videoId) {
      return <div className="text-red-500">Invalid YouTube URL</div>
    }

    return (
      <div className="relative aspect-video rounded-lg overflow-hidden">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=${isPlaying ? 1 : 0}`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>
    )
  }

  // Vimeo embed
  if (video.provider === 'vimeo') {
    const videoId = extractVimeoId(video.url)
    if (!videoId) {
      return <div className="text-red-500">Invalid Vimeo URL</div>
    }

    return (
      <div className="relative aspect-video rounded-lg overflow-hidden">
        <iframe
          src={`https://player.vimeo.com/video/${videoId}?autoplay=${isPlaying ? 1 : 0}`}
          title={video.title}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>
    )
  }

  // Custom video (direct URL)
  return (
    <div className="relative aspect-video rounded-lg overflow-hidden bg-black">
      <video
        src={video.url}
        controls
        autoPlay={isPlaying}
        className="w-full h-full"
        poster={video.thumbnail_url}
      >
        Your browser does not support the video tag.
      </video>
    </div>
  )
}

/**
 * Extract YouTube video ID from URL
 */
function extractYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
    /youtube\.com\/embed\/([^&\n?#]+)/,
  ]

  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match && match[1]) {
      return match[1]
    }
  }

  return null
}

/**
 * Extract Vimeo video ID from URL
 */
function extractVimeoId(url: string): string | null {
  const pattern = /vimeo\.com\/(?:video\/)?(\d+)/
  const match = url.match(pattern)
  return match && match[1] ? match[1] : null
}

/**
 * Video grid component for displaying multiple videos
 */
interface VideoGridProps {
  videos: Array<{
    id: string
    title: string
    description?: string
    url: string
    provider: 'youtube' | 'vimeo' | 'custom'
    is_premium: boolean
    thumbnail_url?: string
  }>
  hasAccess?: boolean
}

export function VideoGrid({ videos, hasAccess = true }: VideoGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {videos.map((video) => (
        <div key={video.id} className="space-y-3">
          <VideoPlayer video={video} hasAccess={hasAccess} />
          <div>
            <h3 className="font-semibold">{video.title}</h3>
            {video.description && (
              <p className="text-sm text-muted-foreground line-clamp-2">
                {video.description}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
