import { createClient } from '@supabase/supabase-js'
import { createBrowserClient, createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

// Environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Browser client (for client-side operations)
export const createSupabaseBrowserClient = () => {
  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}

// Server client (for server-side operations)
export const createSupabaseServerClient = () => {
  const cookieStore = cookies()
  
  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  })
}

// Legacy client (for backwards compatibility)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types (you can generate these later with Supabase CLI)
export type Database = {
  // Add your database types here
  // You can generate these with: npx supabase gen types typescript --project-id YOUR_PROJECT_ID
}