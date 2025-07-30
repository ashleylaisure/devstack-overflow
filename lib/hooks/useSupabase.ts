'use client'

import { useState, useEffect } from 'react'
import { createSupabaseBrowserClient } from '@/lib/supabase'
import type { SupabaseClient } from '@supabase/supabase-js'

export function useSupabase() {
  const [supabase] = useState(() => createSupabaseBrowserClient())
  
  return supabase
}

export function useSupabaseAuth() {
  const supabase = useSupabase()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
      setLoading(false)
    }

    getSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [supabase])

  return {
    user,
    loading,
    signOut: () => supabase.auth.signOut(),
    supabase
  }
}