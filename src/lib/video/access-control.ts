import { createClient } from '@/lib/supabase/server'

/**
 * Check if user has access to a premium video
 * Access is granted if:
 * 1. Video is not premium
 * 2. User has an active subscription
 * 3. User has purchased the video/product
 */
export async function checkVideoAccess(
  videoId: string,
  userId: string | null
): Promise<boolean> {
  const supabase = await createClient()

  // Get video details
  const { data: video } = await (supabase as any)
    .from('videos')
    .select('is_premium, tenant_id')
    .eq('id', videoId)
    .single()

  if (!video) {
    return false
  }

  const vid = video as any

  // If not premium, everyone has access
  if (!vid.is_premium) {
    return true
  }

  // If no user, no access to premium content
  if (!userId) {
    return false
  }

  // Check if user has active subscription
  const { data: subscription } = await (supabase as any)
    .from('subscriptions')
    .select('status')
    .eq('user_id', userId)
    .eq('tenant_id', video.tenant_id)
    .eq('status', 'active')
    .single()

  if (subscription) {
    return true
  }

  // Check if user has purchased access (via orders)
  // This would require a video_access or product_videos junction table
  // For now, return false if no subscription
  return false
}

/**
 * Get accessible videos for a user
 */
export async function getAccessibleVideos(
  tenantId: string,
  userId: string | null
) {
  const supabase = await createClient()

  // Get all non-premium videos
  let query = supabase
    .from('videos')
    .select('*')
    .eq('tenant_id', tenantId)

  if (!userId) {
    // Only show non-premium videos for non-authenticated users
    query = query.eq('is_premium', false)
  }

  const { data: videos } = await query

  if (!videos || !userId) {
    return videos || []
  }

  // Check subscription status
  const { data: subscription } = await (supabase as any)
    .from('subscriptions')
    .select('status')
    .eq('user_id', userId)
    .eq('tenant_id', tenantId)
    .eq('status', 'active')
    .single()

  // If has subscription, return all videos
  if (subscription) {
    return videos
  }

  // Otherwise, filter to only non-premium
  return videos.filter((v: any) => !v.is_premium)
}
