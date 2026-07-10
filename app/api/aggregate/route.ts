import { NextRequest, NextResponse } from 'next/server'
import { supabase, isSupabaseConfigured, notConfiguredError } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

// SKELETON — GET /api/aggregate?commodity=<id>&region=<id>
// Membaca dari view `supply_aggregate` (lihat supabase/migrations/0001_init.sql).
// TODO: query supabase.from('supply_aggregate'), filter opsional by commodity/region.
export async function GET(req: NextRequest) {
  if (!isSupabaseConfigured)
    return NextResponse.json({ error: notConfiguredError }, { status: 503 })

  return NextResponse.json({ error: 'Not implemented' }, { status: 501 })
}
