import { NextRequest, NextResponse } from 'next/server'
import { supabase, isSupabaseConfigured, notConfiguredError } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

// GET /api/potential-gaps?commodity=<id>&region=<id>
// CQ1: potensi belum tergarap — pasokan tersedia yang belum terserap buyer.
// Membaca dari view `unclaimed_supply` (lihat supabase/migrations/0002_unclaimed_supply.sql)
export async function GET(req: NextRequest) {
  if (!isSupabaseConfigured)
    return NextResponse.json({ error: notConfiguredError }, { status: 503 })

  const commodityId = req.nextUrl.searchParams.get('commodity')
  const regionId = req.nextUrl.searchParams.get('region')

  let query = supabase.from('unclaimed_supply').select('*')
  if (commodityId) query = query.eq('commodity_id', commodityId)
  if (regionId) query = query.eq('region_id', regionId)

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ data })
}