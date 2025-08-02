'use client'

import React, { useState, useEffect } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/lib/database.types'
import DashboardWrapper from '@/components/dashboard-wrapper'
import DashboardContent from '@/components/dashboard-content'

interface SelectedAsset {
  id: string;
  asset_identifier: string;
  asset_type: string | null;
  asset_name: string | null;
  notes: string | null;
  selected_at: string;
}

export default function DashboardPage() {
  const [selectedAssets, setSelectedAssets] = useState<SelectedAsset[]>([])
  const [session, setSession] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initSupabase = async () => {
      const supabase = createBrowserClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )

      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        window.location.href = '/login'
        return
      }

      setSession(session)

      // Fetch user assets
      const { data: assets, error } = await supabase
        .from('user_selected_assets')
        .select('*')
        .eq('user_id', session.user.id)
        .not('asset_identifier', 'is', null)
        .order('selected_at', { ascending: false })

      if (error) {
        console.error('Error fetching selected assets:', error.message)
      } else {
        setSelectedAssets(assets || [])
      }

      setLoading(false)
    }

    initSupabase()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null // Will redirect to login
  }

  return (
    <DashboardWrapper 
      selectedAssets={selectedAssets.map((asset: SelectedAsset) => asset.asset_identifier)}
    >
      <DashboardContent
        selectedAssets={selectedAssets}
        session={session}
      />
    </DashboardWrapper>
  )
}
