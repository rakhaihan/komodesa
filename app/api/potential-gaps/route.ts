import { NextRequest, NextResponse } from 'next/server'
import { supabase, isSupabaseConfigured, notConfiguredError } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

// SKELETON — GET /api/potential-gaps?commodity=<id>&region=<id>
// CQ1: potensi belum tergarap — pasokan tersedia yang belum terserap buyer.
// TODO: query view `unclaimed_supply` (lihat supabase/migrations/0002_unclaimed_supply.sql),
// filter opsional by commodity/region.
export async function GET(req: NextRequest) {
  if (!isSupabaseConfigured)
    return NextResponse.json({ error: notConfiguredError }, { status: 503 })

  return NextResponse.json({ error: 'Not implemented' }, { status: 501 })
}
