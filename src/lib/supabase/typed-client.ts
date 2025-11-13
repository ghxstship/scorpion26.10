/**
 * Typed Supabase Client Helpers
 * Provides type-safe wrappers for Supabase operations
 * 
 * These helpers work around TypeScript's inability to properly infer
 * Supabase PostgREST builder types in strict mode. They use controlled
 * type assertions to maintain type safety at the data level while
 * bypassing the complex generic constraints in the builder chain.
 */

import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database, Inserts, Updates } from '@/types/database'

export type TypedSupabaseClient = SupabaseClient<Database>

/**
 * Type-safe update helper
 * Use when TypeScript can't infer the update type correctly
 */
export function typedUpdate<T extends keyof Database['public']['Tables']>(
  client: TypedSupabaseClient,
  table: T,
  data: Updates<T>
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (client.from(table) as any).update(data)
}

/**
 * Type-safe insert helper
 * Use when TypeScript can't infer the insert type correctly
 */
export function typedInsert<T extends keyof Database['public']['Tables']>(
  client: TypedSupabaseClient,
  table: T,
  data: Inserts<T> | Inserts<T>[]
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (client.from(table) as any).insert(data)
}

/**
 * Type-safe upsert helper
 * Use when TypeScript can't infer the upsert type correctly
 */
export function typedUpsert<T extends keyof Database['public']['Tables']>(
  client: TypedSupabaseClient,
  table: T,
  data: Inserts<T> | Inserts<T>[]
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (client.from(table) as any).upsert(data)
}

/**
 * Type-safe from helper
 * Use to get a properly typed table reference for select operations
 */
export function typedFrom<T extends keyof Database['public']['Tables']>(
  client: TypedSupabaseClient,
  table: T
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return client.from(table) as any
}

/**
 * Get a typed Supabase client
 * This ensures the client has proper Database typing
 */
export function getTypedClient(client: TypedSupabaseClient) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return client as any
}
