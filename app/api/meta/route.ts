import { NextResponse } from 'next/server'
import { supabase, isSupabaseConfigured, notConfiguredError } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

// SKELETON — GET /api/meta -> data master untuk dropdown form (anggota, komoditas, wilayah)
// TODO: Promise.all query members/commodities/regions, kembalikan ketiganya.
export async function GET() {
  if (!isSupabaseConfigured)
    return NextResponse.json({ error: notConfiguredError }, { status: 503 })

  return NextResponse.json({ error: 'Not implemented' }, { status: 501 })
}
